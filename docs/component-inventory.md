# Graphical consolidation — separation-of-concerns inventory

**Adopted by the author on 18 November 2026.** See the authoritative
[reference UI workflow](ui-reference.md). This document records the cleanup
rather than proposing competing graphical implementations.

| Concern | Owner | Boundary |
| --- | --- | --- |
| Single graphical display, interactions and animations | [triad-graph](../applications/triad-graph/README.md) | Only Cytoscape implementation; `view-transitions.js` retained |
| Multi-provider AI conversation | [ai-chat](../applications/ai-chat/README.md) | Gemini/OpenAI/Claude, prompt assembly and temporary map-patch JSON export; no map engine |
| Shared Gemini network adapter | [shared/gemini-client.js](../applications/shared/gemini-client.js) | HTTP transport only, no Method or graph state |
| Provisional map-response interpretation | [shared/map-protocol.js](../applications/shared/map-protocol.js) | UI proposal envelope, not normative Analysis |
| Read-only MCP transport | [tria-mcp](../applications/tria-mcp/README.md) | Approved file snapshots, references, Focus extraction; no duplicate synthetic graph |
| Manual local Work handoff | [triad-graph/ai-ui.js](../applications/triad-graph/ai-ui.js) | Explicit analyst-mediated requests, not autonomous chat synchronization |
| Normative data | [schemas/model](../schemas/model/README.md) | Independent of any temporary map overlay |

**Retired:** `applications/ai-chat-graph/`'s Cytoscape projection and
standalone page, and the synthetic `tria-mcp/panel.html` MCP Apps graph.
Useful provider interaction and `tria-map-response-v2` validation are retained
in the adapter and shared transport module. Historical sources remain in Git.

**Still open:** packaged MCP-host reuse of the reference map, a trusted live
two-way interface protocol, structured and approved normative revisions, and
evaluating usefulness of competing interaction patterns.

Do not create permanent forked maps for experiments. Work through
`experiments/` and integrate selected features into the one reference.
