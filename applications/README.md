# trIA components

| Component | Responsibility |
| --- | --- |
| [tria-map-data](tria-map-data/README.md) | Parse Analysis, check structure and map references, derive context, project a renderer-neutral map |
| [triad-graph](triad-graph/README.md) | Render and navigate the single animated reference map, including provisional overlays |
| [tria-ai-bridge](tria-ai-bridge/README.md) | Prepare requests and verify file responses independently of provider |

Open `triad-graph/index.html` for the portable reference map. Its synthetic
examples, imported records and AI files are processed in the browser.
The optional Work Local file queue uses `triad-graph/server.py`.

The [Codex development workspace](../docs/local-codex-workspace.md) uses
the same map with a workspace-specific panel and CLI adapter. MCP is a
separate, read-only transport.
