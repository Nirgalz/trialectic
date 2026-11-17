"""Local read-only trIAd prototype. No normative source is written."""
import json
import copy
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parents[1]
sys.path.insert(0, str(SOURCE))
sys.path.insert(0, str(ROOT.parents[1] / '.test-deps'))
from tools.validate_analysis import validator
from tools.validate_semantics import validate_semantics

CHECK = validator()
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
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        key = self.path.removeprefix('/api/fixture/')
        if self.path.startswith('/api/fixture/'):
            if key not in FIXTURES:
                return self.reply({'error': 'Unknown fixture'}, 404)
            doc = fixture(key)
            return self.reply({'document': doc, 'issues': validate(doc)})
        return super().do_GET()

    def do_POST(self):
        # Only same-origin requests; this service has no filesystem mutation API.
        origin = self.headers.get('Origin')
        if origin and origin != 'http://' + self.headers.get('Host', ''):
            return self.reply({'error': 'Cross-origin request denied'}, 403)
        if self.path != '/api/validate':
            return self.reply({'error': 'Unknown endpoint'}, 404)
        try:
            size = int(self.headers.get('Content-Length', 0))
            if not 0 < size <= 2_000_000:
                return self.reply({'error': 'Document limit: 2 MB'}, 413)
            doc = json.loads(self.rfile.read(size))
            return self.reply({'issues': validate(doc)})
        except (ValueError, TypeError, KeyError) as exc:
            return self.reply({'error': str(exc)}, 400)

if __name__ == '__main__':
    print('trIAd: http://127.0.0.1:8765', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 8765), partial(Handler, directory=str(ROOT))).serve_forever()
