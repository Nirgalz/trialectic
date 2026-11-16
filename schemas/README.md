# PowerEvaluation schemas — phased structural validation

The **author-validated model** is described in [`reference/power-evaluation.md`](../reference/power-evaluation.md) (D-57–D-68). JSON Schema Draft **2020-12** was approved in D-66; the Focus discriminator/reference contract in D-67.

## Current executable schema

[`power-evaluation.boundaries.schema.json`](power-evaluation.boundaries.schema.json) is a **limited structural boundary contract**, not the finished strict schema for all nested data:

- Enforces **exactly** the six required top-level fields `ID`, `Subject`, `Focus`, `Context`, `Dependencies`, `Results`; rejects all extra **top-level** fields.
- Enforces `Focus.type` values **`NEED`, `CAN`, `Scenario`**, with `object_id` for NEED/CAN or `scenario_id` for Scenario, and rejects the contradictory alternative reference key.
- Enforces presence of the D-61–D-63 **Focus-specific result substructure names**, rejecting named result sections reserved for another Focus kind.
- Enforces **D-68 minimum types and fields**: `Subject` is an object with nonempty-string `object_id`; `Context` is an object with a nonempty map `definition_versions` (nonempty keys and nonempty version strings), optional nonempty-string `scenario_id`, and optional object `provenance` with nonempty-string `revises` if present; `Dependencies` is an array (possibly empty) of objects each with nonempty-string `evaluation_id`.
- **Deliberately does not** yet constrain top-level `ID` string syntax, Focus identifier syntax/types beyond D-67, the completeness of relevant `definition_versions`, time/intervals, branch representation, context assumptions, additional nested metadata, degree bounds, evidence/uncertainty and `Results` nested value types. These remain **OPEN**. The conditional obligation to include `provenance.revises` for an actual revision is a **semantic**, cross-record requirement under D-60/D-65.
- Provides **no cross-record semantic validation**, referential integrity, historical immutability enforcement, causal analysis, empirical truth checking, or calculation of Power. The test-only fixture adapter in [`tests/test_power_evaluation.py`](../tests/test_power_evaluation.py) checks some separate semantic constraints but is likewise provisional.

The schema's file name and `$id` deliberately mark it as a **boundary-level prototype**. Do not label it the finalized D-66 strict schema or treat its partial acceptance as approval of unvalidated nested serializations.

## Run the tests

From the repository root with Python 3.11+:

```sh
python -m pip install -r requirements-test.txt
python -m unittest discover -s tests -p 'test_*.py' -v
```

[`tests/test_power_evaluation_schema.py`](../tests/test_power_evaluation_schema.py) uses a pinned Draft 2020-12-capable `jsonschema` validator for **positive and negative** tests. A dedicated negative test illustrates a **structurally valid but semantically non-resolving** Focus ID, in line with D-65.

**Next open decisions:** `ID` type/format; ID normalization and time/extended provenance formats; detailed constraints beyond D-68 for `Subject`, `Context`, `Dependencies`; nested `Results` validity, nullable/not-applicable values, and complete semantic cross-reference resolution. Implement these incrementally rather than converting illustrative fixture details into mandatory requirements.
