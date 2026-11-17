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

- Author-approved visual vocabulary: double-contour main Subject, circular
  Objects, upward NEED triangles, downward CAN triangles, condition diamonds
  with explicit green ✓ / red × / amber ? marks, Scenario cards and small
  relation connectors. Historical
  relation-derived shapes are contextual presentation, not added concept_kind
  annotations. Missing/conflicting condition assessments display `?`.
- Solid undirected attribution; full arrows for contribution, open arrows for
  enabling, bars for inhibition, hollow triangles towards general CANs for
  specialization, diamonds at the whole for composition, dotted Scenario
  membership. Mixed roles keep their full labels
  without selecting a single directional glyph. `?` marks unqualified or
  indeterminate attributions and stays distinct from Scenario dotted lines.

- Default **Comprendre/Explorer** view shows Objects and relations without Scenario nodes.
- **Scénarios** replaces the former process view: Scenario cards and their explicit parent branches form the overview. Clicking a Scenario adopts it as navigation Focus and shows only associated Objects (heads, states, effects), internal relations and conditions. The chosen Scenario remains named as Focus, without a Scenario node or membership spokes in the detail graph. **Vue générale** returns to Scenario cards. This does not modify normative Analysis.focus or evaluations.
- Dark/light toggle with saved local preference and theme-aware canvas. Dark uses neutral anthracite styling inspired by Codex; the host does not expose its exact custom theme tokens, so automatic theme matching is not asserted. Theme changes preserve the active view and navigation.
- Constrained Object hierarchy: main Subject centered, CANs above their bearer,
  NEEDs below, relation records in intermediate layers and metadata to the side.
  Repeated barycenter ordering reduces crossings, with minimum node spacing and
  separate curved lanes for parallel links. Local inspection uses the selected
  Object as center. Context edge labels appear on selection to reduce clutter.
  Cycles and shared Objects retain a single identity; placement is a display
  convention, not proof of attribution, an acyclic ontology or a causal order.
  Scenario view does not imply a causal or chronological order between unrelated Scenarios.
- The overview uses a tree metaphor: the main Subject is the trunk, all
  recorded NEEDs form roots below it and CANs form branches above it, including
  NEEDs of secondary Subjects and historical relation-identified Objects.
  Layers fan out away from the trunk. A NEED attributed to a CAN still appears
  below the trunk in the overview; its actual bearer remains inspectable.
  Cross-links, shared identities and cycles are preserved, so this view is not
  a claim that the analytical graph is a mathematical tree.
- Edge routing penalizes paths running close together and paths approaching
  other nodes. Busy junctions are routed first, with distinct curved trajectories
  for parallel, reverse and nearly aligned links. Routes are recalculated after
  dragging a node, changing the local view or returning to the overview. The
  clearance target is a soft constraint; shared endpoints and dense graphs
  cannot guarantee separation everywhere.
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

### Exploratory Focus steering pilot (local working implementation)

The selector includes **Pilote Focus · six écoles · fictif**, generated by
`examples/build_focus_pilot.py` as `examples/focus-pilot.json`. This is a
synthetic case with 17 Objects, ten relation records, seven conditions and four
hypothetical Scenarios. All figures, attributions and proposed mechanisms are
authored assumptions. No Power evaluation, effective event or measured effect
is asserted. Structural and scoped semantic validation pass.

`focus-pilot.js` keeps optional Analyst navigation state outside Analysis. The
panel distinguishes inspection, explicit Focus adoption, multiple operation
targets and a pending AI-authored suggestion (a fixed test suggestion, not an
inference service). Accept/refuse controls, local navigation history and
historical/current revisits are implemented only for this pilot. Historical
revisit rereads a navigation snapshot with version pins, not an older world or
a stored revision of the Analysis. Current revisit explicitly requires review
before reusing assessments; it performs no compatibility proof or recomputation.
Reloading the page resets this state. Export Analysis excludes navigation;
the copyable conversation text includes its separate journal.

Browser checks exercised refusal preserving S-02, acceptance selecting pupils,
inspection leaving navigation unchanged, preservation of the two operation
targets, and historical/current revisit. These are exploratory interface checks,
not independent validation of Focus usefulness or of a new Method rule. The
page was then reset to S-02 with the pupils suggestion pending for the user.

Suggested trial: refuse the pupils suggestion once; inspect a CAN; verify the
chosen Focus remains S-02; reopen and accept the suggestion; confirm pupils
become the navigation Focus while comparison targets remain S-02 and pupils.
Then compare S-04, revisit earlier navigation and challenge an assumption.
Keep agents, residents, budget, deadlines and grid effects in global scope.

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

