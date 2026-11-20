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

## Ownership separation (partial migration)

The shared [computational formalization](../formalization/README.md) is distinct
from any application. The [trIA AI instructions](tria/ai/README.md) and
[approved dialogue design](tria/ai/dialogue-protocol.md) belong to the trIA
application, not the Method or a generic exchange schema. The [Method](../method/README.md)
retains independent conceptual authority. `tria-map-data` remains a mixed
parser/projection module pending the planned, reviewed split; no second graph
renderer is introduced.
