"""Resource-only MCP distributor. Analytical data belongs to the host/UI."""
import argparse
import json
from pathlib import Path
from typing import Any, Literal
from mcp.server import MCPServer
from mcp.types import ToolAnnotations
from . import catalog as c

UI_URI = 'ui://tria/direct-channel-v1'
server = MCPServer('trIA', version='0.3.0', instructions=(
    'Resource-only trIA distributor. Never send questions, analyses, snapshots or '
    'selected Objects to this MCP server. Consult tria_get_guidance. '
    'tria_open_probe opens a synthetic direct host/UI channel test with no data arguments. '
    'Use its browser-local WebMCP tools only after they become available. '
    'No analytical storage or server-side document validation is provided.'))
READ_ONLY = ToolAnnotations(readOnlyHint=True, destructiveHint=False,
                            idempotentHint=True, openWorldHint=False)
Reference = Literal['method', 'dialogue-protocol', 'operational-guidance']

@server.tool(annotations=READ_ONLY, structured_output=True)
def tria_get_capabilities() -> dict[str, Any]:
    """Read distribution capabilities and explicitly unverified host integration status."""
    return c.capabilities()

@server.tool(annotations=READ_ONLY, structured_output=True)
def tria_read_reference(document_id: Reference) -> dict[str, Any]:
    """Read a public reference by its fixed identifier. No question or analysis input."""
    return c.read_reference(document_id)

@server.tool(annotations=READ_ONLY, structured_output=True)
def tria_get_schema(document_type: c.DocumentType) -> dict[str, Any]:
    """Read public assembled schema and registry; validation must run outside this server."""
    return c.schema(document_type)

@server.tool(annotations=READ_ONLY, structured_output=True)
def tria_get_guidance(mode: c.Mode = 'tria', language: c.Language = 'fr',
                      map_mode: c.MapMode = 'simple') -> dict[str, Any]:
    """Read public guidance using only fixed mode/language options."""
    return c.guidance(mode, language, map_mode)

@server.tool(title='trIA · Test du canal direct', annotations=READ_ONLY,
    meta={'ui': {'resourceUri': UI_URI},
          'openai/ui': {'entrypoints': [{'type': 'thread'}]}}, structured_output=True)
def tria_open_probe() -> dict[str, Any]:
    """Open the empty synthetic channel test. No analytical data is accepted by this tool."""
    return {'status': 'open-interface', 'version': '0.3.0',
            'next_step': 'Expand the app; discover tria_probe_set_marker and tria_probe_get_state '
                         'in its browser-local tools. Do not send the marker to any server tool.'}

@server.resource(UI_URI, mime_type='text/html;profile=mcp-app',
    meta={'ui': {'csp': {'connectDomains': [], 'resourceDomains': []}},
          'openai/ui': {'preferredDisplayMode': 'fullscreen',
                        'availableDisplayModes': ['fullscreen']}})
def probe_resource() -> str:
    return (Path(__file__).resolve().parents[1] / 'ui/probe.html').read_text('utf-8')

def register_reference(identifier):
    @server.resource('tria://reference/' + identifier)
    def resource() -> str:
        return json.dumps(c.read_reference(identifier), ensure_ascii=False)

def register_schema(kind):
    @server.resource('tria://schemas/' + kind)
    def resource() -> str:
        return json.dumps(c.schema(kind), ensure_ascii=False)

for identifier in c.REFERENCES:
    register_reference(identifier)
for kind in ('analysis', 'power-evaluation'):
    register_schema(kind)

@server.resource('tria://server/capabilities')
def capabilities_resource() -> str:
    return json.dumps(c.capabilities(), ensure_ascii=False)

@server.prompt()
def tria_instructions(language: c.Language = 'fr', mode: c.Mode = 'tria',
                       map_mode: c.MapMode = 'simple') -> str:
    """Load public instructions; the user's question stays in the host conversation."""
    return json.dumps(c.guidance(mode, language, map_mode), ensure_ascii=False)

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--transport', choices=['stdio', 'streamable-http'], default='stdio')
    parser.add_argument('--port', type=int, default=8766)
    args = parser.parse_args()
    if args.transport == 'stdio':
        server.run(transport='stdio')
    else:
        server.run(transport='streamable-http', host='127.0.0.1', port=args.port)

if __name__ == '__main__':
    main()
