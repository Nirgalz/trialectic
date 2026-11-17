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

- Hover boxes now contain a single contextual paragraph instead of headings,
  metadata and lists. It describes the Object's meaning and connections in
  Understand/Explore, a local Object view or the chosen Scenario. Conditions
  describe their criterion, affected intervention, contextual assessment and
  what remains to check. FR/EN wording is assembled from source relationships;
  it does not invent a new model definition. Structured facts remain available
  in the inspector.

- Hover cards now foreground analytical issues rather than category/version
  metadata: attributed NEEDs/CANs, relationships, recorded findings, attribution
  qualifications, unmet/unknown conditions and questions to investigate.
  Condition nodes use the same cards, with a readable predicate, the affected
  relation, scenario-scoped assessment, linked evidence, assessment dates and a
  suggested next check. Condition assessments match owner, version and Scenario;
  missing or divergent evaluations remain unknown/divergent. An unmet condition
  does not automatically establish global impossibility or exclude alternatives.

- Hover an Object (including NEED/CAN Objects) for a small, theme-aware preview:
  label, ID, category, analytical role, contextual/declared kind, version and
  a brief description derived from existing records. Scenario Definition pins
  take precedence; missing information is not fabricated. The popup appears
  after a short dwell, stays within the viewport and closes on exit, drag,
  zoom/pan, scroll or Escape. It never changes inspection, navigation Focus or
  history. The same description is available in the Object inspector for
  keyboard/touch use. UI descriptions follow FR/EN; source notes stay verbatim.

- Session-local graph Back/Next history. Mouse buttons 3/4 are intercepted only
  over the graph/map area; visible arrows use the same navigation function.
  Each explored view retains its projection, displayed Scenario, inspected
  entity, hidden elements, node positions, navigation pointer, zoom and pan.
  Zooming/panning updates that view's saved camera on departure rather than
  creating a step for every wheel movement. Back/Next restores snapshots rather
  than replaying model operations. New exploration after Back drops the forward
  branch; loading another Analysis or reloading resets the history (up to 100
  views retained). Theme and interface language remain current. Returning to a
  saved navigation pointer adds a navigation log entry without rewinding the
  analytical records or investigation targets. Unit tests cover exact zoom/pan
  restoration and one action per mouse gesture; browser checks cover two-level
  Object exploration and Scenario transitions through the visible arrows.
  Physical side-button delivery still depends on the host browser forwarding
  those events to the page; native hardware presses are not automation-tested.

- French and English interface with an FR/EN switch, including accessible
  labels, navigation status, the Focus pilot and conversation summary. Launch
  using `?lang=fr` or `?lang=en` according to the discussion language. Explicit
  URL language overrides the document's French fallback; button choices update
  the same URL for reloads. There is no automatic reading of chat content or
  browser-language substitution. Theme, Focus, graph view and form values stay
  independent. Source narratives, imported data, JSON and IDs are preserved in
  their original language. `i18n.js` only translates registered UI phrases and
  templates; unknown source text is left unchanged.

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

## Experimental A/B navigation comparison — 17 November 2026

**Status: exploratory interface behavior, not author validation of a new conceptual Focus rule.** The comparison intentionally operates on the **loaded validated synthetic Analysis fixture** (for example the `generator` case), **not** an automatically synchronized six-schools case. No new Object, Scenario, Actualization or `PowerEvaluation` is written to the source record.

Use the **Mode de navigation** selector above the graph:

- **A · Inspection ponctuelle:** click an Object or a Scenario node to inspect its source record and display its local relations. Clicking elsewhere or changing the view does not retain a separately selected navigation Focus. `Vue générale` restores the complete graph.
- **B · Focus de navigation:** click an Object or Scenario node, then press **Conserver le nœud inspecté comme Focus**. Subsequent UI operations, including inspecting another Object, switching to the process view, changing the displayed phase or Scenario, leave the explicitly chosen navigation Focus in place. Its identity is visible independently of the current inspection; the local journal distinguishes `inspect`, `select`, `clear`, and presentation operations.
- Press **Revenir au Focus** to navigate back to the pinned Object or Scenario. If the stored Scenario differs from the currently displayed Scenario, the prototype restores its displayed Scenario. **Effacer le Focus** clears the explicit selection. Switching to A also clears it. Loading/importing another Analysis resets the experiment.

**Comparison procedure:** Choose A, inspect two nodes, switch phases/views, and observe that there is no pinned Focus. Choose B, inspect a node, explicitly pin it, inspect a second node and change phases/views; observe that the original Focus remains independently identifiable and can be revisited. Repeat with a displayed Scenario node. Note interaction count and conceptual clarity rather than treating UI event counts as proof of analytical utility.

**Layer separation:** This navigation Focus is **temporary client UI state**, not the source `Analysis.focus`, the typed `PowerEvaluation.Focus` field, a new Stage target contract, an Object, or an evaluation-revision trigger. Imported `Analysis` is not modified by navigation; exporting preserves source data. D-89's broader problem and affected-Subjects relevance remains a methodological responsibility, not a guaranteed inference implemented by clicking a node.

**Limits:** No cross-session persistence, automatic conversation or graph synchronization, multi-user concurrency, real analytical Stage execution, automated re-evaluation, source version compatibility checking or real-world usability measurement is implemented. An absent/stale target in the current projection may not be navigable until its reference is made available. The journal is local and ephemeral.

**Regression checks:** `node applications/triad-graph/test-focus-navigation.cjs` exercises navigation state and static UI wiring. The GitHub workflow also runs this alongside the previous hierarchy and Python fixture checks; browser interaction and comparative Analyst studies remain OPEN.

## Limits and observed host behavior

The A/B navigation controls from `dev` are retained in a collapsible section
and use the same active navigation pointer as the six-school pilot. Explicit
pinning/clearing and pilot adoption stay synchronized. Returning to a Scenario
opens its scoped Object view without restoring a Scenario node. The displayed
Scenario context can remain on screen even when navigation Focus is cleared;
display context and active Analyst selection are separate.

### Exploratory Focus steering pilot (local working implementation)

**Current presentation:** the dedicated “TEST THE CONTROLS” / “TESTER LE
PILOTAGE” panel and its shortcut were removed at the Analyst's request. Its
script is retained as an earlier experiment but is no longer loaded. The
six-school example, Scenario selection, graph Back/Next and the separate A/B
Focus controls remain available. The panel-specific checks below describe the
earlier implementation, not controls currently displayed.

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


## Animated view changes

Object neighbourhoods, overview, Scenario views and previous/next navigation
interpolate for 500 ms. Nodes move between their rendered positions, emerging
from their parent in the view hierarchy (explicit parent
when recorded; otherwise the presentation tree rooted at the central Object).
When a whole subtree appears, its nearest retained ancestor supplies the anchor,
with progressive opacity. Nodes present in the old view but absent from the next view move radially
away from the old map viewport centre and shrink linearly
to zero over 500 ms, including their labels and borders, while retaining their
opacity. Outward movement starts immediately and shares the shrink clock;
retained nodes only follow their new layout positions. Departing nodes are removed after the final rendering frame. Appearance still
uses movement and progressive opacity over 500 ms.
Edges follow their endpoints while their width and visibility interpolate.
The final graph and history snapshots remain independent of the animation.
Cytoscape receives detached position objects so its internal updates cannot
move the stored interpolation origins and accelerate departures.
Rapid navigation continues from the currently displayed intermediate frame.
Clicking or scrolling the animation finishes it immediately; reduced-motion
preferences skip animation. Source Analysis records are unchanged.

Check interpolation rules with `node applications/triad-graph/test-view-transitions.cjs`.

Visibility snapshots read current `display` and `visibility` styles explicitly:
the bundled Cytoscape can retain a stale `:visible` result after filtering.
The regression test uses the bundled library to check that excluded nodes
remain in the outgoing animation and never remain in its target snapshot.
