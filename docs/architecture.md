# Repository architecture — responsibilities and sources of truth

**Status:** Maintainer-oriented map of the existing `dev` repository. This
document explains boundaries and ownership; it does **not** approve new
conceptual rules, new schema fields, or a production analytical engine.
Read it alongside [the decision log](../DECISIONS.md), not in place of it.

## Authority is scoped to the concern

| Concern | Authoritative source | Other material is for |
| --- | --- | --- |
| Author-validated conceptual and methodological decisions | [DECISIONS.md](../DECISIONS.md), with the consolidated current definitions in [reference/trialectic-method.md](../reference/trialectic-method.md) | Historical trace and maintained explanation, respectively |
| Data-model roles and distinctions | [reference/data-models.md](../reference/data-models.md); focused [PowerEvaluation explanation](../reference/power-evaluation.md) | Explanation and cross-references, **not** alternative field contracts |
| Adopted v2 Analysis / PowerEvaluation exchange fields and local shape | [schemas/model/](../schemas/model/README.md), interpreted by [schemas/global-model.md](../schemas/global-model.md) | Executable schema definitions and human-readable exchange profile |
| AI-assisted dialogue and steering behavior | [applications/ai-assisted-analysis/dialogue-protocol.md](../applications/ai-assisted-analysis/dialogue-protocol.md), with operational scope in [AGENTS.md](../AGENTS.md) and [applications/ai-assisted-analysis/AGENTS.md](../applications/ai-assisted-analysis/AGENTS.md) | Interaction design and operating instructions, not changes to the Method |
| Experimental AI behavioral prompt | [reference/tria-ai-instructions.md](../reference/tria-ai-instructions.md) | Portable assistant behavior, not a duplicate dialogue specification or data schema |
| Experimental map-response contract | [protocols/tria/map-response-contract.md](../protocols/tria/map-response-contract.md), [local-shape schema](../schemas/transport/tria-map-response-v2.schema.json), and contextual [browser validator](../applications/ai-chat-graph/map-protocol.js) | Human-readable transport format, structural checks and document-aware checks respectively; **provisional UI proposals** only |
| Graphical presentation and navigation | [applications/triad-graph/](../applications/triad-graph/README.md) | **Sole reference animated Cytoscape interface**; no independent renderer in AI chat or MCP |
| External AI and MCP communication | Provider-specific adapters in applications; [applications/tria-mcp/](../applications/tria-mcp/README.md) | Transport, permissions, and interoperability, **not** conceptual inference |
| Structural and partial semantic verification | [tools/validate_analysis.py](../tools/validate_analysis.py), [tools/validate_semantics.py](../tools/validate_semantics.py), [tests/](../tests/README.md) | Implemented checks, not general causal or empirical validation |
| Open tasks and experimental findings | [TODO.md](../TODO.md), [research/](../research/) | Work tracking and evidence qualified by scope and provenance |
| Educational exposition and translation | [docs/en/](en/), [docs/fr/](fr/), [terminology/](../terminology/) | Accessible guides and vocabulary; no independent normative definitions |

A decision and the current reference can legitimately repeat a definition for
**different purposes**: one documents author approval and history, the other
states the maintained Method. If they conflict, identify the conflict and check
the relevant validated decision before proposing a correction; never silently
rewrite or elevate a historical hypothesis into an approved rule.

## Boundaries that must not be collapsed

1. **Method ≠ serialization.** A local schema constraint formalizes an exchange
   profile; it does not redefine an Object, NEED, CAN, Power or Inference.
2. **Definition ≠ assessment ≠ Actualization.** Versioned Object properties,
   contextual evaluations, hypothetical Scenarios, effective events and
   epistemic revisions remain distinct records.
3. **Object graph ≠ logical justification graph ≠ causal graph.** A visual edge
   is not proof of any of these relations, nor of sufficiency or necessity.
4. **Analytical Focus ≠ UI navigation Focus.** Selecting a node or Scenario in
   the interface is not a change to `Analysis`, `PowerEvaluation.Focus`,
   evidence, or an effective Actualization.
5. **Structural validation ≠ semantic/empirical correctness.** JSON Schema and
   the current semantic checks enforce limited contracts; evidence appraisal,
   inferential soundness and scientific usefulness need separate investigation.
6. **Provisional map patch ≠ normative Analysis.** `tria-map-response-v2`
   supplies human-reviewable graph overlay proposals. Approval in that UI does
   not upgrade or mutate a canonical Analysis document.

## Shared schema assembly

`schemas/model/` **owns** the modular JSON source definitions.
`core/schema_loader.py` is a pure implementation utility: it assembles the
existing **Analysis** and **PowerEvaluation** schemas and accepts a caller-owned
`read_json` callback. It neither reads an Analysis nor performs validation.
The two adapters use the same function:

- `tools/validate_analysis.py` performs Draft 2020-12 validation and retains
  its public `load_schemas()` / `validator()` entry points.
- `applications/tria-mcp/server.py` exposes assembled schema resources
  while retaining its own allowlisted, size-limited `safe_read()` security
  boundary; optional user-approved Analysis reads remain separate.

The tests in `tests/test_schema_loader.py` guard deterministic assembly,
file-reader delegation and separate Analysis/evaluation namespaces.
`tests/test_mcp_server.py` checks consistency across MCP and the validator.

## Application boundaries and maturity

- `applications/triad-graph/`: **sole reference Cytoscape interface** (author-approved 18 November 2026), experimental inspection,
  navigation, Focus-cycle pilot and local Work request bridge.
- `applications/ai-chat/`: experimental multi-provider conversations and
  provisional map-patch exports, **without an independent graph renderer**.
- `applications/tria-mcp/`: read-only MCP transport without an embedded
  synthetic panel; future graphical host adapter is still open.
- `applications/gemini-chat/`: earlier single-provider communication
  experiment. Do not remove it until its useful behavior/tests are compared
  with the multi-provider client.

Graphical display has one owner: the animated
[reference interface](ui-reference.md). The AI chat and MCP remain transport
adapters, with no competing graph implementation. Integrate experimental
behavior only after an explicit author choice; checks are targeted to actual
risks during this exploratory stage.

## How to change things without drift

1. Identify the concern and consult **its** authority before editing.
2. Keep approved concepts and exchange schemas unchanged unless the author
   explicitly validates a relevant change. Historical decisions stay traceable.
3. Prefer a cross-reference over re-specifying the same normative field,
   definition or instruction in multiple places. Duplicated explanations for
   different audiences are acceptable when clearly derivative.
4. Change shared pure utilities once; adapters remain responsible for their
   transport security, lifecycle and error contracts.
5. Use focused checks when concrete technical risks justify them; do not add or
   run broad regression tests by default during the exploratory phase.
6. Move or archive prototypes only after inventorying imports, entry points,
   compatibility needs and preserved tests. The Git history records former paths.

This ownership map documents the current architecture. A future monorepo or
package-level reorganization remains a separate proposal, not an implication
of the present cleanup.
