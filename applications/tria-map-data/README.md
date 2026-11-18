# tria-map-data

Pure data processing: no DOM, Cytoscape, HTTP, file reads or AI calls at runtime.

```js
const {parseAnalysis} = require('./analysis.js');
const {projectAnalysis} = require('./projection.js');
const {document, issues} = parseAnalysis(jsonText);
const map = projectAnalysis(document, {view: 'scenario', scenarioId: 'S-02'});
```

Browser globals are `TriaMapData`, `TriaMapProjection`, `TriaFocusCycle` and
`TriaObjectPreview`. Load `schema-validator.js`, `analysis.js`, `semantics.js`
and `projection.js` as ordinary local scripts. No module server is required.

`parseAnalysis` accepts JSON text or a JSON object, enforces a 2 MB limit,
validates the assembled existing `schemas/model` structure and checks map
references. It returns a detached document; rejection never replaces the active
Analysis. JSON Schema format annotations are not assertions, matching the
existing Python structural validator without a format checker. These checks do
not replace all `tools/validate_semantics.py` checks and establish no causal or
empirical validity.

`projectAnalysis` takes a validated document and returns:

```text
{ schema: "tria-map-v1", nodes: [...], edges: [...], records: [[id, record], ...] }
```

Nodes carry stable `id`, `label`, `kind`, optional `visualKind` and
`animationParent`. Edges carry stable endpoints, labels and qualifications.
`records` preserves source IDs, families and JSON for inspection. There are no
Cytoscape element wrappers, positions, DOM elements or executable callbacks in
the result. Source records are not mutated. Views are `objects`, `scenarios`
and `scenario`; the last respects the selected Scenario's associated Objects
and Definition heads and excludes the Scenario card itself.

`focus-cycle.js` derives source context and presentation state; it does not
invoke an AI or prepare provider messages. `object-preview.js` supplies
contextual descriptions; `semantics.js` retains explicit qualifications and
uncertainties. A few pure display helpers remain here for compatibility.

## Build and tests

The generated validator and examples are committed: end users need no package
manager or build. Developers regenerate them after source-schema changes:

```sh
pnpm install --frozen-lockfile
pnpm build
node test-map-data.cjs
node test-focus-cycle.cjs
node test-object-preview.cjs
```

Ajv and esbuild are build dependencies only. `build.cjs` assembles the same
Analysis and PowerEvaluation definitions as `tools/validate_analysis.py` and
bundles standalone validation code. `schema-manifest.json` records a source
fingerprint; tests reject stale generated validation. Generated synthetic
examples are never a substitute for the user's analysis. Ajv is MIT licensed;
see `AJV-LICENSE`. Trialectic schemas and records retain repository CC BY 4.0
attribution. Sources: https://ajv.js.org/standalone.html and
https://esbuild.github.io/api/#bundle.
