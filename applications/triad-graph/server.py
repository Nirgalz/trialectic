"""Local trIAd prototype with an opt-in, server-only AI bridge. No source Analysis is written."""
import json
import copy
import sys
import os
import threading
from urllib.parse import urlsplit, unquote
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parents[1]
sys.path.insert(0, str(SOURCE))
sys.path.insert(0, str(ROOT.parents[1] / '.test-deps'))
from tools.validate_analysis import validator
from tools.validate_semantics import validate_semantics
from ai_bridge import configured, analyze, BridgeError, DEFAULT_MODEL

CHECK = validator()
AI_SINGLE_REQUEST = threading.BoundedSemaphore(value=1)
ALLOWED_HOSTS = {'127.0.0.1:8765', 'localhost:8765'}
FIXTURES = {'generator': 'analysis_v2.json', 'affiliations': 'can_affiliations_v22.json',
            'identity': 'identity_attribution_v21.json'}

def fixture(key):
    doc = json.loads((SOURCE / 'tests/cases' / FIXTURES[key]).read_text('utf-8'))
    if key == 'generator':
        doc['analysis_id'] = 'A-ui-generator-demo'
        branch = copy.deepcopy(doc['scenarios'][0])
        branch.update(id='S-ui-grid', parent_scenario_id='S0',
                      notes='UI-only synthetic branch. No inherited assessments or effective events.',
                      assumptions=['Hypothesis for UI exploration: battery uncharged, external supply available. No causal result established.'])
        for state in branch['states']:
            if state['object']['id'] == 'O-battery':
                state['values']['charged'] = False
            if state['object']['id'] == 'O-grid':
                state['values']['available'] = True
        doc['scenarios'].append(branch)
    return doc

def validate(document):
    errors = [{'where': '/'.join(map(str, e.absolute_path)), 'detail': e.message,
               'severity': 'error'} for e in CHECK.iter_errors(document)]
    return errors or validate_semantics(document)

class Handler(SimpleHTTPRequestHandler):
    def reply(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.end_headers()
        self.wfile.write(body)

    def trusted_request(self):
        host = self.headers.get('Host', '')
        origin = self.headers.get('Origin')
        fetch_site = self.headers.get('Sec-Fetch-Site')
        if host not in ALLOWED_HOSTS:
            self.reply({'error': 'Untrusted local Host header'}, 403)
            return False
        if origin and origin != 'http://' + host:
            self.reply({'error': 'Cross-origin request denied'}, 403)
            return False
        if fetch_site and fetch_site not in ('same-origin', 'none'):
            self.reply({'error': 'Cross-site request denied'}, 403)
            return False
        return True

    def secret_path(self):
        path = unquote(urlsplit(self.path).path)
        return any(part.startswith('.') for part in path.split('/') if part) or any(
            part.lower() in {'credentials.json', 'secrets.json', 'credentials.local.json',
                             'secrets.local.json'} for part in path.split('/'))

    def list_directory(self, path):
        self.send_error(403, 'Directory browsing disabled')
        return None

    def log_message(self, format, *args):
        # Avoid echoing user-controlled paths, prompts or headers to the console.
        return

    def do_GET(self):
        if not self.trusted_request():
            return
        if self.secret_path():
            return self.reply({'error': 'Sensitive paths are not served'}, 403)
        if self.path == '/api/ai/status':
            return self.reply({'configured': configured(),
                               'model': os.environ.get('TRIA_OPENAI_MODEL', DEFAULT_MODEL)})
        key = self.path.removeprefix('/api/fixture/')
        if self.path.startswith('/api/fixture/'):
            if key not in FIXTURES:
                return self.reply({'error': 'Unknown fixture'}, 404)
            doc = fixture(key)
            return self.reply({'document': doc, 'issues': validate(doc)})
        return super().do_GET()

    def do_POST(self):
        if not self.trusted_request():
            return
        if self.path not in ('/api/validate', '/api/ai/analyze'):
            return self.reply({'error': 'Unknown endpoint'}, 404)
        if self.headers.get('Content-Type', '').split(';')[0].strip() != 'application/json':
            return self.reply({'error': 'JSON content type required'}, 415)
        try:
            size = int(self.headers.get('Content-Length', 0))
            maximum = 2_000_000 if self.path == '/api/validate' else 500_000
            if not 0 < size <= maximum:
                return self.reply({'error': 'Request too large or empty'}, 413)
            body = json.loads(self.rfile.read(size))
            if self.path == '/api/validate':
                return self.reply({'issues': validate(body)})
            if not configured():
                return self.reply({'error': 'Aucune clé API configurée dans le serveur local.'}, 503)
            if not isinstance(body, dict) or not isinstance(body.get('document'), dict):
                return self.reply({'error': 'Document Analysis required'}, 400)
            doc = body['document']
            detected = validate(doc)
            if any(x.get('severity') == 'error' for x in detected):
                return self.reply({'error': 'Document Analysis invalide.'}, 400)
            if not AI_SINGLE_REQUEST.acquire(blocking=False):
                return self.reply({'error': 'Une analyse API est déjà en cours.'}, 429)
            try:
                result = analyze(doc, body.get('action'), body.get('focus_id'),
                                 body.get('map_mode'), body.get('note', ''))
            finally:
                AI_SINGLE_REQUEST.release()
            return self.reply({'result': result,
                               'notice': "Hypothèses et suggestions de l'IA : aucune modification du document source."})
        except BridgeError as exc:
            return self.reply({'error': str(exc)}, exc.status)
        except (ValueError, TypeError, KeyError):
            return self.reply({'error': 'Requête JSON invalide.'}, 400)
        except Exception:
            # Do not expose outbound error objects, request bodies or credentials.
            return self.reply({'error': 'Erreur interne du pont API ; aucun document modifié.'}, 500)


if __name__ == '__main__':
    print('trIAd: http://127.0.0.1:8765', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 8765), partial(Handler, directory=str(ROOT))).serve_forever()
