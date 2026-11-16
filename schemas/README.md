# PowerEvaluation schemas — phased structural validation

The **author-validated model** is described in [`reference/power-evaluation.md`](../reference/power-evaluation.md) (D-57–D-70). JSON Schema Draft **2020-12** was approved in D-66; the Focus discriminator/reference contract in D-67.

## Current executable schema

[`power-evaluation.boundaries.schema.json`](power-evaluation.boundaries.schema.json) is a **limited structural boundary contract**, not the finished strict schema for all nested data:

- Enforces **exactly** the six required top-level fields `ID`, `Subject`, `Focus`, `Context`, `Dependencies`, `Results`; rejects all extra **top-level** fields.
- Enforces `Focus.type` values **`NEED`, `CAN`, `Scenario`**, with `object_id` for NEED/CAN or `scenario_id` for Scenario, and rejects the contradictory alternative reference key.
- Enforces presence of the D-61–D-63 **Focus-specific result substructure names**, rejecting named result sections reserved for another Focus kind.
- Enforces **D-68 minimum types and fields**: `Subject` is an object with nonempty-string `object_id`; `Context` is an object with a nonempty map `definition_versions` (nonempty keys and nonempty version strings), optional nonempty-string `scenario_id`, and optional object `provenance` with nonempty-string `revises` if present; `Dependencies` is an array (possibly empty) of objects each with nonempty-string `evaluation_id`.
- Enforces **D-69 NEED `Results.effective_satisfaction`** as an object with required `status` (`satisfied`, `unsatisfied`, `indeterminate`) and nonempty `justification`; optional `degree` containing number `value`, nonempty `measure` and `basis`; optional `evidence` array of nonempty reference strings; optional `uncertainty` object. No universal numerical degree bounds are imposed, and extra nested metadata remains open.
- Enforces **D-70 NEED `Results.temporal_compliance`** as an object with required `applicability` (`applicable`, `not_applicable`, `indeterminate`) and nonempty `justification`; requires `status` (`satisfied`, `unsatisfied`, `indeterminate`) when applicable, forbids it when not applicable, and allows it only as `indeterminate` when applicability is itself indeterminate. Optional `applied_exceptions`/`evidence` arrays of nonempty reference strings and optional `uncertainty` object are checked locally. The references do **not** establish a valid authorized exception or an observed requirement violation.
- **Deliberately does not** yet constrain top-level `ID` string syntax, Focus identifier syntax/types beyond D-67, the completeness of relevant `definition_versions`, time/intervals, branch representation, context assumptions, additional nested metadata, or the full internals of `Results` (in particular `candidate_cans`, CAN and Scenario). The inner representation of evidence/uncertainty and **semantic adequacy of any measured degree** remain **OPEN**. The conditional obligation to include `provenance.revises` for an actual revision is a **semantic**, cross-record requirement under D-60/D-65.
- Provides **no cross-record semantic validation**, referential integrity, historical immutability enforcement, causal analysis, empirical truth checking, or calculation of Power. The test-only fixture adapter in [`tests/test_power_evaluation.py`](../tests/test_power_evaluation.py) checks some separate semantic constraints but is likewise provisional.

The schema's file name and `$id` deliberately mark it as a **boundary-level prototype**. Do not label it the finalized D-66 strict schema or treat its partial acceptance as approval of unvalidated nested serializations.

## Run the tests

From the repository root with Python 3.11+:

```sh
python -m pip install -r requirements-test.txt
python -m unittest discover -s tests -p 'test_*.py' -v
```

[`tests/test_power_evaluation_schema.py`](../tests/test_power_evaluation_schema.py) uses a pinned Draft 2020-12-capable `jsonschema` validator for **positive and negative** tests. A dedicated negative test illustrates a **structurally valid but semantically non-resolving** Focus ID, in line with D-65.

**Next open decisions:** `ID` type/format; ID normalization and time/extended provenance formats; detailed constraints beyond D-68 for `Subject`, `Context`, `Dependencies`; remaining nested `Results` validity (especially NEED `candidate_cans` and CAN/Scenario; time/requirement/exception subrecords for `temporal_compliance`), nullable/not-applicable values, degree/evidence interpretation, and complete semantic cross-reference resolution. Implement these incrementally rather than converting illustrative fixture details into mandatory requirements.
