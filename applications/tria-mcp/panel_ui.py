"""Experimental read-only trIA MCP Apps Conversation Panel.

The resource is a self-contained HTML document: Cytoscape.js is included from
the repository's existing vendored copy, without CDN or HTML server.
The panel only displays a synthetic fixture and prepares user-controlled
requests. It does not edit an Analysis or evaluate NEED/CAN claims.
"""
import json

UI_URI = "ui://tria/focus-panel"
UI_MIME = "text/html;profile=mcp-app"
MARKER = "/*__TRIA_CYTOSCAPE__*/"

PANEL_TOOL = {
    "name": "tria_open_focus_panel",
    "title": "trIA — Focus panel",
    "description": (
        "Open a synthetic three-Object trIA navigation panel beside the "
        "conversation. The panel does not access private analyses, "
        "establish CAN attribution or automatically apply changes."
    ),
    "inputSchema": {"type": "object", "properties": {}, "additionalProperties": False},
    "annotations": {
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": False,
    },
    "_meta": {
        "ui": {"resourceUri": UI_URI},
        "openai/ui": {"entrypoints": [{"type": "thread"}]},
    },
}

DEMO = {
    "source": "synthetic-demo",
    "objects": [
        {"id": "O-association", "label": "Association", "kind": "group"},
        {"id": "O-mairie", "label": "Mairie", "kind": "system"},
        {"id": "O-habitants", "label": "Habitants", "kind": "group"},
    ],
    "relations": [
        {"source": "O-association", "target": "O-mairie", "status": "hypothesis"},
        {"source": "O-association", "target": "O-habitants", "status": "hypothesis"},
    ],
    "requires_human_review": True,
    "persistent_analysis_modified": False,
}


def panel_html(safe_read, repository_root):
    """Create one HTML resource with a bundled, local Cytoscape.js build."""
    template = safe_read(repository_root / "applications" / "tria-mcp" / "panel.html")
    cytoscape = safe_read(repository_root / "applications" / "triad-graph" / "cytoscape.min.js")
    if template.count(MARKER) != 1:
        raise ValueError("Missing or repeated Cytoscape placeholder")
    # Avoid an accidental closing script element in the vendored bundle.
    cytoscape = cytoscape.replace("</script", "<\\/script").replace("</SCRIPT", "<\\/SCRIPT")
    html = template.replace(MARKER, cytoscape)
    if len(html.encode("utf-8")) > 750000:
        raise ValueError("Panel resource exceeds size limit")
    return html


def panel_resource(safe_read, repository_root):
    return {
        "uri": UI_URI,
        "mimeType": UI_MIME,
        "text": panel_html(safe_read, repository_root),
        "_meta": {"ui": {"prefersBorder": False}},
    }


def panel_tool_result():
    return {
        "content": [{
            "type": "text",
            "text": "Opened the synthetic trIA Focus panel. Select an Object in the "
                    "panel to request an investigation. No Analysis was changed.",
        }],
        "structuredContent": json.loads(json.dumps(DEMO, ensure_ascii=False)),
        "isError": False,
    }
