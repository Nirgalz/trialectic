# Reference graphical interface — adopted workflow

**Decision approved by the author, 18 November 2026.** The only reference
Cytoscape view is [applications/triad-graph/](../applications/triad-graph/).
Its `view-transitions.js` (appearance, departure and movement of nodes)
and existing navigation, Focus, Scenarios and history are retained. The
reference is an **interface**, not a new authority for Method concepts,
inferences, or normative Analysis records.

## Single-owner rule

- Graph appearance, interactions, navigation, animation and view projections
  belong to `applications/triad-graph/`. Other applications must not
  maintain separate permanent Cytoscape canvases.
- AI providers, local Work, and MCP remain separate **transport adapters**,
  with independent security permissions and lifecycles.
- Analysis v2 remains the source record; a UI proposal must never be treated
  as a normative revision, empirical fact or effective Actualization.
- Portable natural-language explanations may be presented without a map.
  The UI cannot reveal an AI's hidden internal reasoning.

## Current integration (manual, deliberate)

1. In trIAd, load an Analysis and use the normal map, including its animations.
2. An AI chat experiment can examine **that same Analysis** and return
   `tria-map-response-v2` with `map_patch` candidate Objects/relations.
3. Export the complete response envelope to JSON. In trIAd, select
   **Importer propositions IA** and choose the file.
4. The browser validates local structure, ID references, uniqueness and the
   matching `analysis_id`; the proposals are then displayed **provisionally**
   and visually distinguished on the **one reference map**.
5. Inspect or remove them with **Retirer propositions**. Reloading or
   changing the Analysis also discards them. There is no write to Analysis.

This transfer is manual by design. It is **not** a live AI integration,
synchronized MCP UI, permanent editing, adjudication of claims or a guarantee
that the proposed Objects are methodologically meaningful. An app-specific
Focus is not `PowerEvaluation.Focus`.

## Workflow for graphical experimentation

1. Start with the single reference UI and name the experiment's concern.
2. Prototype a **data source, adaptor or isolated experiment** in
   `experiments/`, not a copied graph implementation.
3. Compare the experiment's behavior/constraints conceptually and try it in
   the reference interface with a representative case.
4. After explicit author approval, move the retained feature into the
   reference UI (appearance/interaction) or its adapter (transport).
5. Remove superseded prototype code. Git preserves its history. Keep only
   proportionate checks for material risks; do not create regression tests by
   default while contracts are still exploratory.

## Local Codex cycle (exploratory)

The [Codex development workspace](local-codex-workspace.md) composes the
same animated map with a dedicated panel, local CLI transport and routes.
Its Comprendre → Explorer → Décider cycle uses ChatGPT sign-in through the
CLI. Open the reference HTML directly for the provider-neutral map.

## Future host adapters

- The current Work Local exchange is deliberately manual.
- MCP exposes read-only sources and approved files. An MCP App rendering the
  reference interface requires **explicit host capability assessment and a
  safe packaged distribution**; a synthetic embedded graph is not that.
- A future live bidirectional channel must specify trust, origin, permissions,
  object IDs, snapshot identity, approval boundaries and failure handling.
  Do not imply it exists before implementation.

**Reference entry point:** `applications/triad-graph/index.html`.
For the optional Work Local queue, use `python applications/triad-graph/server.py`.
The Codex workspace has its own launcher under `experiments/tria-codex-workspace/`.
