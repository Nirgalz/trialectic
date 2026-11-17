# trIAd graph prototype

Experimental Cytoscape.js interface, based on `Nirgalz/trialectic` dev commit
`5449b52b49baf56f8e62b185d74b6e10b45a4abd` (17 November 2026).
The author approved this prototype and its integration into `dev` on
17 November 2026 (D-90). The server uses this checkout's schemas, validators
and synthetic fixtures; no duplicate repository snapshot is shipped.
Approval covers the interface and invocation convention, not new methodological
rules or empirical validation. Existing normative schemas remain unchanged.

## Invocation convention (D-90)

`use trIA-c` invokes standard trIA with this interactive Cytoscape presentation.
`use trIAd-c` invokes trIA-dev with the same prototype, as in the present
environment. `use trIA-dev-c` is the equivalent long form. The suffix changes
presentation, not the Method. Unsuffixed commands keep their existing behavior,
including D-88's temporary Mermaid convention where applicable.

An assistant honoring these commands should load the current analysis into the
prototype, reuse or start its server, and open the preview alongside the chat
when supported. The bundled demos are clearly synthetic and must not stand in
for the user's analysis. If execution/display is unavailable, report the limit
and provide text/Mermaid fallback. Repository instructions make this convention
discoverable in future sessions; they cannot configure unrelated chats that do
not load the repository or these instructions.

From the repository root, run:

```powershell
python -m pip install -r requirements-test.txt
python applications/triad-graph/server.py
```

Open http://127.0.0.1:8765 in a browser. Requires Python and jsonschema /
referencing (the existing `.test-deps` directory is supported). Cytoscape.js
3.30.4 is bundled locally; no runtime CDN or external AI calls are required.
Keep this local server running while using the prototype.

## Implemented

- Separate conceptual and methodological process views (D-85–D-89).
- Constrained Object hierarchy: main Subject centered, CANs above their bearer,
  NEEDs below, relation records in intermediate layers and metadata to the side.
  Repeated barycenter ordering reduces crossings, with minimum node spacing and
  separate curved lanes for parallel links. Local inspection uses the selected
  Object as center. Context edge labels appear on selection to reduce clutter.
  Cycles and shared Objects retain a single identity; placement is a display
  convention, not proof of attribution, an acyclic ontology or a causal order.
  The methodological process remains a separate, relaxed arrangement.
- Objects, immutable explicit NEED/CAN concept kinds where present, versioned
  relation records, bearer/represented Object distinction, qualified links,
  conditions, constituent references, CAN affiliations and Scenario heads.
- Inspect source records, versions, attribution, mechanisms, conditions,
  assumptions, scenario states and source PowerEvaluation results.
- Click a node to center it and show its immediate relations and linked Objects.
  NEED/CAN relation-record intermediaries are retained, without recursively
  expanding unrelated Objects or Scenario heads. Click a neighbor to navigate;
  **Vue générale** restores the full graph and its prior node positions.
- Three synthetic upstream examples for profiles 2.0, 2.1 and 2.2. The generator
  example adds an explicitly hypothetical `S-ui-grid` branch in memory. Its
  assumed state values differ from S0; no evaluations are inherited or fabricated.
  Switching scenarios does not mutate an ancestor or imply Actualization.
- Imported Analysis documents are checked with the pinned upstream structural
  and scoped semantic validators. Errors reject import; source records and
  unknown fields are never silently discarded. Export preserves the loaded
  document; UI phase and selection are separate presentation metadata.
- Copyable inspection/question/summary text links analysis and conversation.
  It contains selected IDs and source records. Copying does not send a message.

## Limits and observed host behavior

The local browser successfully displayed the graph and inspection UI. Relation
inspection, question preparation, data switching and process-view switching
were exercised. Three fixtures passed structural and scoped semantic checks.
This is not complete semantic, causal, temporal or empirical verification.

`open_in_codex` with placement `right` returned `queued`, not proof of a visible
Codex sidebar. A visible in-app browser preview was subsequently opened and
retained. Placement beside the chat depends on the host; it cannot be guaranteed.
The initial preview timed out while the server was inaccessible; restarting the
local server with network permission enabled resolved browser access.

No automatic chat reading, model inference, automatic corrections, live chat
synchronization, cross-session persistence, ranking, Power calculation or
scientific validation is implemented. Imported records are inspected, not
automatically analyzed. Historical 2.0 labels are not promoted to established
concept kinds. Missing data is not a negative finding. Full evidence/event/effect
graph projections, editing/revision workflows and automated comparison remain
future work. The five Scenario dimensions are shown independently when recorded.

## Attribution

Trialectic Method, Nirgalz and repository contributors, sources under CC BY 4.0:
https://github.com/Nirgalz/trialectic/tree/5449b52b49baf56f8e62b185d74b6e10b45a4abd
This interface and its extra synthetic branch are adaptations, without implied
endorsement. Cytoscape.js by Max Franz and contributors is MIT licensed; its
license notice is retained in `cytoscape.min.js`.
