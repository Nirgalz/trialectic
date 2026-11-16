# PowerEvaluation schemas — phased structural validation

## Current normative global and Scenario profile — v2

D-77/D-78 adopt [Analysis v2](trialectic.schema.json) and [PowerEvaluation v2](power-evaluation.v2.schema.json). See the [complete contract](global-model.md) for exact fields, migration, offline validation and remaining semantic limits. Scenario nested fields are now specified. The v1 descriptions below document the retained historical compatibility profile.

The **author-validated model** is described in [`reference/power-evaluation.md`](../reference/power-evaluation.md) (D-57–D-74). JSON Schema Draft **2020-12** was approved in D-66; the Focus discriminator/reference contract in D-67.

## Normative local profile

[`power-evaluation.schema.json`](power-evaluation.schema.json) is now the **normative local structural profile through D-74**. See the [conformance, authority and exclusions](power-evaluation.normative.md). It preserves the boundary schema's assertions and leaves all unapproved details OPEN. It is not a final global Method contract.

## Compatible boundary schema

[`power-evaluation.boundaries.schema.json`](power-evaluation.boundaries.schema.json) is a **limited structural boundary contract**, not the finished strict schema for all nested data:

- Enforces **exactly** the six required top-level fields `ID`, `Subject`, `Focus`, `Context`, `Dependencies`, `Results`; rejects all extra **top-level** fields.
- Enforces `Focus.type` values **`NEED`, `CAN`, `Scenario`**, with `object_id` for NEED/CAN or `scenario_id` for Scenario, and rejects the contradictory alternative reference key.
- Enforces presence of the D-61–D-63 **Focus-specific result substructure names**, rejecting named result sections reserved for another Focus kind.
- Enforces **D-68 minimum types and fields**: `Subject` is an object with nonempty-string `object_id`; `Context` is an object with a nonempty map `definition_versions` (nonempty keys and nonempty version strings), optional nonempty-string `scenario_id`, and optional object `provenance` with nonempty-string `revises` if present; `Dependencies` is an array (possibly empty) of objects each with nonempty-string `evaluation_id`.
- Enforces **D-69 NEED `Results.effective_satisfaction`** as an object with required `status` (`satisfied`, `unsatisfied`, `indeterminate`) and nonempty `justification`; optional `degree` containing number `value`, nonempty `measure` and `basis`; optional `evidence` array of nonempty reference strings; optional `uncertainty` object. No universal numerical degree bounds are imposed, and extra nested metadata remains open.
- Enforces **D-70 NEED `Results.temporal_compliance`** as an object with required `applicability` (`applicable`, `not_applicable`, `indeterminate`) and nonempty `justification`; requires `status` (`satisfied`, `unsatisfied`, `indeterminate`) when applicable, forbids it when not applicable, and allows it only as `indeterminate` when applicability is itself indeterminate. Optional `applied_exceptions`/`evidence` arrays of nonempty reference strings and optional `uncertainty` object are checked locally. The references do **not** establish a valid authorized exception or an observed requirement violation.
- Enforces **D-71 NEED `Results.candidate_cans`** with required `identified` list (each candidate object has nonempty `object_id` and `justification`, plus optional evidence-reference array), required `search_status` (`not_searched`/`searched`), `coverage` (`complete`/`incomplete`/`indeterminate`), nonempty `scope` and `justification`, optional evidence-reference array and optional `uncertainty` object. A `not_searched` inventory cannot claim `complete` coverage. An empty candidate list does **not** establish impossibility, and scoped completeness is a claim requiring separate semantic evidence; identified correspondence is not causal contribution, sufficiency or Power.
- Enforces **D-72 CAN `Results.actualizability`** as a required object with mandatory `status` (`actualizable`, `partially_actualizable`, `not_actualizable`, `indeterminate`) and nonempty `justification`. Optional `degree` requires numeric `value` and nonempty `measure`/`basis` (without any universal range), optional `evidence` is an array of nonempty references, and optional `uncertainty` is an object. Structural compliance neither establishes a contemplated CAN's success probability nor proves a simulated/observed Actualization.
- Enforces **D-73 CAN `Results.prerequisites`** as a required object with four required, possibly empty arrays: `needs`, `cans` (each with required nonempty `object_id`, optional nonempty `evaluation_id`), `conditions` (required nonempty `owner_relation_id`/`condition_id` and optional three-state `status`), and `pathways` (required nonempty `pathway_id`/`definition_version` and individual `coverage`). Required `inventory_coverage` distinguishes *inventory-of-pathways* completeness from *one pathway's condition* completeness; required `scope`/`justification` are nonempty strings, with optional evidence-reference array and uncertainty object. **No versioned pathway Definition or logical expression is inferred from an empty `pathways` array**; correct shapes are not proof of reachability, completeness, prerequisite necessity/satisfaction, actionability or Power.
- Enforces **D-74 CAN `Results.potential_contributions`** as a required object containing a possibly empty `needs` array of candidate NEED Object references (required nonempty `object_id`, literal `relationship: candidate`, nonempty `justification`, optional evidence-reference array), required `search_status` (`not_searched`/`searched`), `coverage` (`complete`/`incomplete`/`indeterminate`), nonempty `scope` and `justification`, optional evidence-reference array and optional `uncertainty` object. A `not_searched` inventory cannot claim `complete` coverage. Structural validity does **not** establish causal contribution, conditional sufficiency, necessity, effective satisfaction, completeness or correspondence validity. Adverse and indirect effects are not automatically modeled as direct positive contributions.
- **Deliberately does not** yet constrain top-level `ID` string syntax, Focus identifier syntax/types beyond D-67, the completeness of relevant `definition_versions`, time/intervals, branch representation, context assumptions, additional nested metadata, or the full internals of `Results` (in particular Scenario, and the causal-contribution model, versioned pathway-expression / condition-Definition details, and nonlocal semantic checks absent from D-73/D-74). The inner representation of evidence/uncertainty and **semantic adequacy of any measured degree** remain **OPEN**. The conditional obligation to include `provenance.revises` for an actual revision is a **semantic**, cross-record requirement under D-60/D-65.
- Provides **no cross-record semantic validation**, referential integrity, historical immutability enforcement, causal analysis, empirical truth checking, or calculation of Power. The test-only fixture adapter in [`tests/test_power_evaluation.py`](../tests/test_power_evaluation.py) checks some separate semantic constraints but is likewise provisional.

The schema's file name and `$id` deliberately mark it as a **boundary-level prototype**. Do not label it the finalized D-66 strict schema or treat its partial acceptance as approval of unvalidated nested serializations.

## Run the tests

From the repository root with Python 3.11+:

```sh
python -m pip install -r requirements-test.txt
python -m unittest discover -s tests -p 'test_*.py' -v
```

[`tests/test_power_evaluation_schema.py`](../tests/test_power_evaluation_schema.py) uses a pinned Draft 2020-12-capable `jsonschema` validator for **positive and negative** tests. A dedicated negative test illustrates a **structurally valid but semantically non-resolving** Focus ID, in line with D-65.

**Next open decisions:** `ID` type/format; ID normalization and time/extended provenance formats; detailed constraints beyond D-68 for `Subject`, `Context`, `Dependencies`; remaining nested `Results` validity (especially Scenario; causal-contribution modeling and full condition-pathway expression serialization and detailed CAN inventory/provenance semantics and time/requirement/exception subrecords for NEED), nullable/not-applicable values, degree/evidence interpretation, and complete semantic cross-reference resolution. Implement these incrementally rather than converting illustrative fixture details into mandatory requirements.

## D-76 reconciled exchange implementation

[normalized-v1](normalized-v1/README.md) implements the approved C-01–C-10 resolutions, reuses normative PowerEvaluation items, and supplies an explicit migration adapter plus synthetic plan/example. The surrounding global envelope remains experimental; proposal-v0 is preserved as history.
