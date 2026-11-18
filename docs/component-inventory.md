# trIA application overlap inventory — separation of concerns

**Scope:** Read-only architectural findings on `dev`, 18 November 2026,
following the separation of the experimental map-response format from the
portable assistant instructions. This is an engineering inventory, **not**
a decision to merge applications or alter normative schemas or the Method.

| Concern | Existing implementations | Genuine overlap | Distinct contract and safe next action |
| --- | --- | --- | --- |
| Browser Gemini provider | [gemini-chat/index.html](../applications/gemini-chat/index.html) and [ai-chat-graph/app.js](../applications/ai-chat-graph/app.js) | Both call Gemini `generateContent`, parse `candidates[].content.parts`, manage request and error flow | The former is a minimal plain-text single-provider experiment; the latter requires first-turn Method instructions and JSON proposals, plus OpenAI/Claude adapters. Do not move the newer client back onto the older request shape. Candidate for **provider transport adapter extraction** only after parity tests. |
| Graph projection | [ai-chat-graph/app.js](../applications/ai-chat-graph/app.js) `graphElements()`; [triad-graph/app.js](../applications/triad-graph/app.js) `projection()` / `scenariosProjection()`; [tria-mcp/panel.html](../applications/tria-mcp/panel.html) | All draw graphs using Cytoscape.js and Object relationships | The first adds an unvalidated proposal overlay; the second projects versioned relations, conditions, CAN affiliations and Scenarios; the third uses a fixed **synthetic** three-Object demo. Do **not** merge projections or give them an inferred common domain contract. Later compare on one validated fixture and specify separate projection profiles. |
| Navigation and Focus | [triad-graph/focus-navigation.js](../applications/triad-graph/focus-navigation.js), [focus-cycle.js](../applications/triad-graph/focus-cycle.js), and the MCP panel's local `select()` | Selection/highlighting and moving attention to an Object | Persistent/optional navigation, a local D-97 Focus cycle, and a synthetic MCP UI selection do not imply identical host capabilities. Reuse an explicit `{family,id}` target model **only** after testing Object/Scenario selection and protecting the distinction from `PowerEvaluation.Focus`. |
| AI conversation | `gemini-chat` and `ai-chat-graph` (direct browser/provider calls); [triad-graph/ai-ui.js](../applications/triad-graph/ai-ui.js) (local Work request status); [tria-mcp/server.py](../applications/tria-mcp/server.py) (MCP stdio) | All support workflows involving an AI | **Different transports and trust boundaries**: provider APIs, a local human-mediated file bridge, and a read-only MCP server. Do not combine controllers, credentials, permissions, or claims of automatic synchronization. |
| Analysis/validation | [tools/validate_analysis.py](../tools/validate_analysis.py), [tools/validate_semantics.py](../tools/validate_semantics.py), local Cytoscape validation and [map-protocol.js](../applications/ai-chat-graph/map-protocol.js) | All inspect structures called an Analysis or graph | The pure shared schema assembly is already in [core/schema_loader.py](../core/schema_loader.py). Structural normative checks, partial semantic checks, and provisional map-patch checks must **remain distinct**. |
| Transport and persisted data | [schemas/model/](../schemas/model/README.md), [tria-map-response-v2](../schemas/transport/tria-map-response-v2.schema.json), local Work request/response envelopes, MCP resource URIs | JSON is used throughout | Common syntax does not mean common semantics. Only the first is the adopted normative exchange profile; UI proposals, queues and resource transport are adapter-specific. |

## Candidate for the next low-risk extraction

1. **Gemini provider adapter (not yet extracted).** Define a pure interface
   `send({model, turns, instructions?, signal, apiKey}) → text` with explicit
   versioned response mode and error mapping. Compare current text-chat and
   structured-map behavior separately. Ensure no credential persistence,
   no hidden server-side state assumption and no impact on first-turn trIA
   instructions. Test requests and mocked failures before changing the two apps.
2. **Graph projection contracts (design first).** Use identical source Analysis
   fixtures, require distinct profiles for full documented projections and
   provisional overlays, compare node IDs, edge direction, version handling,
   uncertain attribution and Scenario visibility. A shared low-level Cytoscape
   helper is plausible **only after** a behaviorally equivalent contract exists.
3. **MCP integration boundary (defer).** An Analysis-aware MCP panel must
   declare permissions, snapshot hashes, host-specific capabilities,
   navigation-only actions, human authorization of revisions and fallbacks.
   Do not replace the synthetic demo with a pretend live chat map.

## Implementation order and acceptance criteria

**Now implemented:** split prompt + response-contract source files, separate
local-shape UI JSON Schema, preserve first-turn assembly in the multi-provider
client, extend mocked transport/session regression checks. No application was
removed, archived, merged or made authoritative by this work.

**Before extracting any application-common JS:**
- Freeze example input/output pairs for *each* existing app rather than
  assuming the same graph, AI reply or Focus concept.
- Verify mock provider responses, error propagation, cancellation, initialization,
  local-only edits, graph overlay rejection, and no inadvertent normative writes.
- Keep the security policies of direct browser keys, local HTTP/Work queues and
  MCP allowlisted file reads independent.
- Only then choose a shared module, migration and fallback; retain compatibility
  until the old entry point is demonstrated redundant.

This inventory documents **potential** reuse, not an assertion that current
apps have been fully tested in browsers, real MCP hosts or live model providers.
