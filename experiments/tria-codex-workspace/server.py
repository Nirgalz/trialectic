"""Serve the reference map with the development-only Codex adapter."""

import json
from pathlib import Path
import sys
from urllib.parse import urlsplit

from codex_bridge import CodexBridgeError, run_turn, status

WORKSPACE = Path(__file__).resolve().parent
REFERENCE = WORKSPACE.parents[1] / 'applications/triad-graph'
sys.path.insert(0, str(REFERENCE))
from server import Handler, serve, validate


class WorkspaceHandler(Handler):
    def render_page(self):
        page = super().render_page()
        head = (
            '<link rel="stylesheet" href="/workspace/codex.css">'
            '<script defer src="/workspace/codex-ui.js"></script>'
        )
        panel = (WORKSPACE / 'panel.html').read_text(encoding='utf-8')
        return page.replace('</head>', head + '</head>', 1).replace('<footer>', panel + '<footer>', 1)

    def do_GET(self):
        path = urlsplit(self.path).path
        assets = {
            '/workspace/codex.css': ('codex.css', 'text/css'),
            '/workspace/codex-ui.js': ('codex-ui.js', 'text/javascript'),
        }
        if path not in assets and path != '/api/codex/status':
            return super().do_GET()
        if not self.trusted_request():
            return
        if path == '/api/codex/status':
            return self.reply(status())
        name, mime = assets[path]
        return self.serve_asset((WORKSPACE / name).read_bytes(), mime)

    def do_POST(self):
        if self.path != '/api/codex/turn':
            return super().do_POST()
        if not self.trusted_request():
            return
        if self.headers.get('Content-Type', '').split(';')[0].strip() != 'application/json':
            return self.reply({'error': 'JSON content type required'}, 415)
        try:
            size = int(self.headers.get('Content-Length', 0))
            if not 0 < size <= 500_000:
                return self.reply({'error': 'Request too large or empty'}, 413)
            body = json.loads(self.rfile.read(size))
            if not isinstance(body, dict) or not isinstance(body.get('document'), dict):
                return self.reply({'error': 'Document Analysis required'}, 400)
            if any(issue.get('severity') == 'error' for issue in validate(body['document'])):
                return self.reply({'error': 'Document Analysis invalide.'}, 400)
            return self.reply(run_turn(body))
        except CodexBridgeError as exc:
            return self.reply({'error': str(exc)}, exc.status)
        except (ValueError, TypeError, KeyError):
            return self.reply({'error': 'Requête JSON invalide.'}, 400)
        except Exception:
            return self.reply({'error': 'Erreur locale ; aucune analyse modifiée.'}, 500)


if __name__ == '__main__':
    serve(WorkspaceHandler)
