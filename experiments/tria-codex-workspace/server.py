"""Serve the reference map with the development-only Codex adapter."""

from hashlib import sha256
import json
from pathlib import Path
import re
import sys
from urllib.parse import urlsplit

from codex_bridge import CodexBridgeError, run_turn, status

WORKSPACE = Path(__file__).resolve().parent
REFERENCE = WORKSPACE.parents[1] / 'applications/triad-graph'
sys.path.insert(0, str(REFERENCE))
from server import ASSETS, Handler, serve, validate

UI_ASSETS = {
    '/workspace/codex.css': ('codex.css', 'text/css'),
    '/workspace/codex-ui.js': ('codex-ui.js', 'text/javascript'),
    '/workspace/method-tests.js': ('method-tests.js', 'text/javascript'),
    '/workspace/instruction-map.js': ('instruction-map.js', 'text/javascript'),
    '/workspace/live-reload.js': ('live-reload.js', 'text/javascript'),
}

class MethodCatalogError(ValueError):
    pass


def load_method_catalog():
    try:
        catalog = json.loads((WORKSPACE / 'trIA-prompts.json').read_text(encoding='utf-8'))
    except json.JSONDecodeError as exc:
        raise MethodCatalogError(f'Invalid trIA-prompts.json at line {exc.lineno}, column {exc.colno}.') from exc
    except (OSError, UnicodeError) as exc:
        raise MethodCatalogError('Could not read the test catalog as UTF-8.') from exc

    cases = catalog.get('cases') if isinstance(catalog, dict) else None
    if not isinstance(cases, list) or not cases:
        raise MethodCatalogError('trIA-prompts.json must contain a nonempty cases array.')
    reasoning_tests = catalog.get('reasoning_tests', [])
    if not isinstance(reasoning_tests, list):
        raise MethodCatalogError('reasoning_tests must be an array.')
    instructions = load_method_instructions()

    case_ids = set()
    linked_instructions = set()
    for index, case in enumerate([*cases, *reasoning_tests], 1):
        if not isinstance(case, dict) or any(
            not isinstance(case.get(field), str) or not case[field].strip()
            for field in ('id', 'name', 'instruction_id', 'message')
        ):
            raise MethodCatalogError(f'Test case {index} requires id, name, instruction_id and message.')
        case_id, key = case['id'], case['instruction_id']
        if case_id in case_ids:
            raise MethodCatalogError(f'Duplicate test case ID: {case_id}.')
        if key not in instructions:
            raise MethodCatalogError(f'Test case {case_id} references an unknown instruction: {key}.')
        case_ids.add(case_id)
        linked_instructions.add(key)
    missing = instructions.keys() - linked_instructions
    if missing:
        raise MethodCatalogError('Instructions without a test case: ' + ', '.join(sorted(missing)) + '.')
    positions = {key: index for index, key in enumerate(instructions)}
    return {
        **catalog,
        'cases': sorted(cases, key=lambda case: positions[case['instruction_id']]),
        'reasoning_tests': sorted(reasoning_tests, key=lambda case: positions[case['instruction_id']]),
        'instruction_order': list(instructions),
    }, instructions


def load_method_instructions():
    try:
        source = (WORKSPACE / 'trIA-instructions.md').read_text(encoding='utf-8')
    except (OSError, UnicodeError) as exc:
        raise MethodCatalogError('Could not read the Method instructions as UTF-8.') from exc
    sections = re.split(r'^## ([\w-]+)[ \t]*$', source, flags=re.MULTILINE)
    instructions = {}
    for key, text in zip(sections[1::2], sections[2::2]):
        if key in instructions:
            raise MethodCatalogError(f'Duplicate instruction heading: {key}.')
        if not text.strip():
            raise MethodCatalogError(f'Empty instruction: {key}.')
        instructions[key] = text.strip()
    if not instructions:
        raise MethodCatalogError('No Method instructions were found.')
    return instructions


def method_bundle(instructions, instruction_ids):
    return 'Apply the instructions relevant to the analyst’s request.\n\n' + '\n\n'.join(
        f'## {key}\n\n{instructions[key]}' for key in instruction_ids
    )


def ui_revision():
    files = set(ASSETS.values())
    files.update(WORKSPACE / name for name in ('trIA-prompts.json', 'trIA-instructions.md'))
    for directory in (REFERENCE, WORKSPACE):
        files.update(path for path in directory.iterdir()
                     if path.suffix in {'.html', '.css', '.js'} and path.is_file())
    revision = sha256()
    for path in sorted(files):
        try:
            info = path.stat()
        except FileNotFoundError:
            continue
        revision.update(f'{path.name}:{info.st_mtime_ns}:{info.st_size}\n'.encode())
    return revision.hexdigest()


class WorkspaceHandler(Handler):
    def render_page(self):
        revision = ui_revision()
        page = super().render_page()
        head = (
            '<link rel="stylesheet" href="/workspace/codex.css">'
            '<script defer src="/workspace/method-tests.js"></script>'
            '<script defer src="/workspace/instruction-map.js"></script>'
            '<script defer src="/workspace/codex-ui.js"></script>'
            '<script defer src="/workspace/live-reload.js"></script>'
        )
        panel = (WORKSPACE / 'panel.html').read_text(encoding='utf-8')
        instruction_map = (WORKSPACE / 'instruction-map.html').read_text(encoding='utf-8')
        page = (
            page.replace('</head>', head + '</head>', 1)
            .replace('<main>', '<main class="codex-workspace">' + panel + '<div class="codex-map">', 1)
            .replace('<section class="workspace">', instruction_map + '<section class="workspace">', 1)
            .replace('</main>', '</div></main>', 1)
        )
        # A new revision uses fresh URLs even for assets served by the base handler.
        return re.sub(r'((?:src|href)=")([^":?#]+\.(?:js|css))"',
                      lambda match: f'{match[1]}{match[2]}?v={revision}"', page)

    def do_GET(self):
        path = urlsplit(self.path).path
        if path not in UI_ASSETS and path not in {
            '/api/codex/status', '/workspace/revision', '/workspace/trIA-prompts.json'
        }:
            return super().do_GET()
        if not self.trusted_request():
            return
        if path == '/api/codex/status':
            return self.reply(status())
        if path == '/workspace/revision':
            return self.reply({'revision': ui_revision()})
        if path == '/workspace/trIA-prompts.json':
            try:
                catalog, _ = load_method_catalog()
            except MethodCatalogError as exc:
                return self.reply({'error': str(exc)}, 422)
            return self.reply(catalog)
        name, mime = UI_ASSETS[path]
        return self.serve_asset((WORKSPACE / name).read_bytes(), mime)

    def do_POST(self):
        if self.path not in {'/api/codex/turn', '/api/codex/test', '/api/codex/instructions'}:
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
            if self.path == '/api/codex/instructions':
                return self.acknowledge_method()
            if self.path == '/api/codex/test':
                return self.run_method_test(body)
            if not isinstance(body, dict) or 'document' not in body:
                return self.reply({'error': 'An Analysis document or null is required.'}, 400)
            document = body['document']
            if document is not None and not isinstance(document, dict):
                return self.reply({'error': 'Invalid Analysis document.'}, 400)
            if document is not None and any(issue.get('severity') == 'error' for issue in validate(document)):
                return self.reply({'error': 'Invalid Analysis document.'}, 400)
            instruction = ''
            if body.get('use_method_instructions') is True:
                instructions = load_method_instructions()
                instruction = method_bundle(instructions, instructions)
            return self.reply(run_turn(body, instruction=instruction))
        except CodexBridgeError as exc:
            return self.reply({'error': str(exc)}, exc.status)
        except MethodCatalogError as exc:
            return self.reply({'error': str(exc)}, 422)
        except (ValueError, TypeError, KeyError):
            return self.reply({'error': 'Invalid JSON request.'}, 400)
        except Exception:
            return self.reply({'error': 'Local server error. The Analysis was unchanged.'}, 500)

    def acknowledge_method(self):
        instructions = load_method_instructions()
        result = run_turn({
            'document': None, 'focus_id': None, 'scenario_id': None, 'history': [],
            'phase': 'Comprendre',
            'question': 'Acknowledge receipt of the supplied trIA Method instructions. '
                        'Set tria_instruction_check.status to acknowledged, briefly confirm receipt, '
                        'and return empty objects and relations arrays.',
        }, instruction=method_bundle(instructions, instructions))
        report = (result.get('envelope') or {}).get('tria_instruction_check')
        if not isinstance(report, dict) or report.get('status') != 'acknowledged':
            return self.reply({'error': 'Codex did not acknowledge the trIA instructions.'}, 502)
        return self.reply({'acknowledged': True})

    def run_method_test(self, body):
        catalog, instructions = load_method_catalog()
        case_id = body.get('case_id') if isinstance(body, dict) else None
        case = next((item for item in catalog['cases'] if item['id'] == case_id), None)
        if case is None:
            if any(item['id'] == case_id for item in catalog['reasoning_tests']):
                return self.reply({'error': 'This case is deferred in Reasoning tests.'}, 409)
            return self.reply({'error': 'Unknown test case.'}, 404)
        instruction = instructions.get(case['instruction_id'])
        if not instruction:
            return self.reply({'error': 'The instruction associated with this test is empty or missing.'}, 409)
        through = body.get('instruction_prefix') is True
        if through or body.get('all_instructions') is True:
            instruction_ids = list(instructions)
            if through:
                instruction_ids = instruction_ids[:instruction_ids.index(case['instruction_id']) + 1]
            instruction = method_bundle(instructions, instruction_ids)
        request = {
            'document': None, 'focus_id': None, 'scenario_id': None,
            'history': [], 'phase': 'Comprendre', 'question': case['message'],
        }
        if through:
            working_map = case.get('starting_map')
            if working_map is not None:
                request['question'] = case['follow_up']['message']
            result = run_turn(request, instruction=instruction, working_map=working_map)
            return self.reply({**result, 'instruction_ids': instruction_ids})
        follow_up = case.get('follow_up') if body.get('follow_up') is True else None
        first = run_turn(request, instruction=instruction)
        if follow_up is None:
            return self.reply(first)
        report = ((first.get('envelope') or {}).get('tria_instruction_check') or {})
        message = report.get('message') if isinstance(report, dict) else None
        previous_objects = ((first.get('envelope') or {}).get('map_patch') or {}).get('objects', [])
        identity_test = follow_up.get('preserve_object_ids') is True
        second_request = {
            **request, 'question': follow_up['message'],
            'history': [
                {'role': 'user', 'text': case['message']},
                {'role': 'assistant', 'text': first['answer'][:4500],
                 'instruction_report': message[:1200] if isinstance(message, str) else ''},
            ],
        }
        if identity_test:
            second = run_turn(second_request, instruction=instruction, working_map={'objects': previous_objects})
        else:
            second = run_turn(second_request)
        return self.reply({'turns': [first, second]})


if __name__ == '__main__':
    serve(WorkspaceHandler)
