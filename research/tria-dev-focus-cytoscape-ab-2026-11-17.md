# trIA-dev — Cytoscape A/B experiment: inspection vs retained navigation Focus

**Date:** 2026-11-17  
**Branch:** `dev`  
**Status:** EXPERIMENTAL PROTOTYPE IMPLEMENTATION; **NOT** a validated change to the Trialectic Method, D-17 Focus, Stage schema or `PowerEvaluation.Focus`.  
**Tasks:** T-03, T-04, T-20, T-26, T-27, T-30.  
**Source:** existing D-90 `applications/triad-graph/` interactive Cytoscape prototype.  
**Prior exercises:** [Focus vs Stage](tria-dev-focus-vs-stage-2026-11-17.md), [three edge cases](tria-dev-focus-navigation-control-pilot-2026-11-17.md).

## 1. Comparison question

Is an **explicit, retained navigation Focus** useful to an Analyst beyond the existing **single-click local inspection** of a Cytoscape node?

The experiment keeps the original read-only Analysis, Objects, relations, scenarios, Power evaluations, phase conventions and D-89 global relevance principle. The trial involves **UI navigation only**, not an execution of actual Trialectic analytical Stages.

## 2. Implemented A/B controls

In `applications/triad-graph/index.html`, a small independent control area offers:

- **A — Inspection ponctuelle:** clicking a node inspects its source record and centers local neighbors; no persisted Analyst-selection pointer. Switch inspection, view or Scenario without retaining a separate Focus.
- **B — Focus de navigation:** clicking a node still only inspects it; a **second explicit button** pins that Object or Scenario as a temporary Analyst-selected Focus. Inspecting another node, changing displayed phase, switching process/Objects view, and changing the displayed Scenario do **not** silently overwrite the pin. `Revenir au Focus` navigates back; `Effacer le Focus` removes the pin.
- An in-memory sequence log distinguishes `inspect`, `select`, `clear`, `mode` and `ui_operation`. The status shows the active Focus separately from the latest inspection. Switching to mode A or importing/loading a new Analysis resets the experimental navigation state.

The UI-only state logic is isolated in `applications/triad-graph/focus-navigation.js`. CSS indicates the selected Focus only when its node is in the current conceptual projection. Navigation does **not** edit `documentModel` or `PowerEvaluation` records. A copied conversation handoff labels the *source Analysis.focus* and the *Analyst navigation Focus* separately.

**Scope of node selection:** this pilot permits Objects and Scenarios, not relation-record intermediaries, Condition nodes, or process-phase nodes. Stage target(s) remain independent and may be multiple, as in previous pilot. No multi-analyst, multi-active-Focus, delegated AI selection or historical-version compatibility engine is introduced.

## 3. Reproduction

From the repository root:

```powershell
python -m pip install -r requirements-test.txt
python applications/triad-graph/server.py
```

Open `http://127.0.0.1:8765`. Start with any synthetic fixture, for example `generator`. **These bundled fixtures are not the six-schools case**, and the graph does not automatically read this chat.

**A:** Use one-click mode, inspect two distinct Object nodes, change the phase to Explorer, switch to the Process view and back, or use Vue générale. No Analyst Focus should be retained.

**B:** Switch to Focus mode; inspect an Object or current Scenario node, explicitly pin it, inspect a different Object, change the phase and Process view, and optionally change the displayed Scenario. Status must still name the original Focus. Use `Revenir au Focus` to return, then `Effacer le Focus`. Check the local event log to distinguish inspection and explicit pin. Reload another Analysis to verify the Focus is reset.

Both modes retain D-89's methodological obligation to consider other affected Subjects; the UI **does not implement an automatic D-89 completeness detector**.

## 4. Checks performed in the current execution

- **Actual repo source inspected via GitHub connector:** app.js, index.html, style.css, existing tests, server and README.
- **GitHub files created/edited:** `focus-navigation.js`, `index.html`, `style.css`, `app.js`, `test-focus-navigation.cjs`, README and existing GitHub regression workflow.
- **Syntax:** a V8 function-compilation check succeeded for the current JavaScript app, navigation module and test script (3/3).
- **State-behavior:** an in-isolate execution of the fetched UMD `focus-navigation.js` passed 7 direct state and source-integration assertions: inspection without pin, preservation across interface operations and another inspection, invalid relation pin rejection, required control wiring, clearing, reset and avoidance of source `Analysis.focus` assignment.
- **Stored Node test executed under an equivalent constrained JS shim:** the actual fetched `test-focus-navigation.cjs` completed successfully using in-memory mocks for Node's `assert`, `fs` and `path`. This is **not a claim that Node CLI or browser interaction was run** on the deployed repository. The GitHub workflow now includes the Node test; an Actions run matching these commits has **not yet been verified**.

**Important limitation:** The actual Cytoscape UI has **not** been exercised end-to-end in a browser or visually inspected on these commits. The test is therefore a *code-based A/B interface implementation and partial verification*, **not a completed user-experience comparison**.

## 5. What the prototype is designed to discriminate

| Question | Mode A | Mode B |
| --- | --- | --- |
| Can the Analyst inspect different nodes? | Yes | Yes |
| Can one selection be retained while examining other nodes? | No separately named navigation state | Yes, by explicit action |
| Is the local inspection itself a selection? | No | Still no |
| Is the source Analysis mutated? | No | No |
| Are Scenarios or Objects automatically Actualized? | No | No |
| Are actual method Stages or PowerEvaluation recomputed? | No | No |
| Can source Focus and Analyst navigation Focus be distinguished? | Source is only read | Yes, separately labelled |
| Is one mode empirically better? | **Not measured** | **Not measured** |

**Provisional inference:** The retained Focus can support orientation, explicit user intent and return navigation, but the UI intervention alone does not show that a separate Focus domain concept is required. It might be implemented equally well as selected-node UI state. Avoid making a conceptual decision based on this prototype alone.

## 6. Next valid evidence

1. Browser-level testing on the actual local server, including keyboard accessibility, switching views/Scenarios, missing or obsolete targets, and no source mutation on export.
2. User comparison on the same task order: retrieve a previously inspected Object after several intervening operations, explain which node is currently inspected versus intentionally selected, and record time/error/subjective clarity.
3. If empirically useful, decide whether Focus remains merely **optional presentation/navigation state**, a reusable general trIA client concept or a Method-level term. **No changes to `PowerEvaluation.Focus` are implied.**

**No new validated D-number decision is recorded here.** D-89 and D-90 remain the currently validated relevant principles/conventions.
