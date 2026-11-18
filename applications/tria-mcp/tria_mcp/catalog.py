"""Allowlisted, read-only access to this checkout and existing validators."""
import hashlib
import json
import subprocess
import sys
from pathlib import Path
from typing import Literal

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT))
from tools.validate_analysis import load_schemas

DocumentType = Literal['analysis', 'power-evaluation']
Mode = Literal['tria', 'tria-dev']
Language = Literal['fr', 'en']
MapMode = Literal['simple', 'detailed']
REFERENCES = {
    'method': 'reference/trialectic-method.md',
    'dialogue-protocol': 'applications/ai-assisted-analysis/dialogue-protocol.md',
    'operational-guidance': 'applications/ai-assisted-analysis/AGENTS.md',
}
LIMITS = [
    'Resource distribution only: no analytical input, validation endpoint or storage.',
    'The synthetic UI probe needs host WebMCP support; actual integration must be tested.',
    'Privacy excludes the chosen AI host/provider; no claim of end-to-end local inference.',
]


def source(path):
    content = (ROOT / path).read_bytes()
    return {'path': path, 'sha256': hashlib.sha256(content).hexdigest()}


def revision():
    try:
        return subprocess.run(['git', '-C', str(ROOT), 'rev-parse', 'HEAD'],
                              capture_output=True, text=True, check=True, timeout=5).stdout.strip()
    except (OSError, subprocess.SubprocessError):
        return None


def result(data, paths=()):
    return {'contract_version': '0.3.0', 'repository_revision': revision(),
            'sources': [source(p) for p in paths], 'limitations': LIMITS, 'data': data}


def capabilities():
    return result({'analysis_versions': ['2.0.0', '2.1.0', '2.2.0'],
                   'document_types': ['analysis', 'power-evaluation'],
                   'persistence': False, 'graph_sync': False,
                   'accepts_analytical_data': False,
                   'ui_probe': 'ui://tria/direct-channel-v1',
                   'host_channel_status': 'requires_actual_host_test',
                   'reference_ids': list(REFERENCES)})


def read_reference(document_id, section=None):
    if document_id not in REFERENCES:
        raise ValueError('Unknown reference identifier')
    path = REFERENCES[document_id]
    text = (ROOT / path).read_text('utf-8')
    if section is not None:
        lines = text.splitlines(keepends=True)
        start = next((i for i, line in enumerate(lines) if line.rstrip() == section
                      and line.startswith('#')), None)
        if start is None:
            raise ValueError('Section must match a complete Markdown heading')
        level = len(lines[start]) - len(lines[start].lstrip('#'))
        end = next((i for i in range(start + 1, len(lines))
                    if lines[i].startswith('#') and
                    len(lines[i]) - len(lines[i].lstrip('#')) <= level), len(lines))
        text = ''.join(lines[start:end])
    return result({'document_id': document_id, 'text': text}, [path])


def schema(document_type):
    if document_type not in ('analysis', 'power-evaluation'):
        raise ValueError('Unknown document type')
    analysis, power = load_schemas()
    # Both schemas are needed: Analysis references the PowerEvaluation identifier.
    return result({'document_type': document_type,
                   'schema': analysis if document_type == 'analysis' else power,
                   'registry': {s['$id']: s for s in (analysis, power)}},
                  [p.relative_to(ROOT).as_posix() for p in sorted((ROOT / 'schemas/model').rglob('*.json'))])


def guidance(mode='tria', language='fr', map_mode='simple'):
    if mode not in ('tria', 'tria-dev') or language not in ('fr', 'en') or map_mode not in ('simple', 'detailed'):
        raise ValueError('Unsupported mode, language or map mode')
    text = (ROOT / REFERENCES['operational-guidance']).read_text('utf-8')
    protocol = (ROOT / REFERENCES['dialogue-protocol']).read_text('utf-8')
    return result({'mode': mode, 'language': language, 'map_mode': map_mode,
                   'instruction': f'Respond in {language}. Use {mode}. Map: {map_mode}. '
                   'Apply the following approved guidance proportionately. '
                   'Preserve the separate authority of the canonical Method. '
                   'Never send analytical data to MCP server tools or prompts. '
                   'The direct UI channel is a synthetic probe, not yet an integrated map. ',
                   'operational_guidance': text, 'dialogue_protocol': protocol},
                  [REFERENCES['operational-guidance'], REFERENCES['dialogue-protocol']])
