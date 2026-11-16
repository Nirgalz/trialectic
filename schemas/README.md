# PowerEvaluation schemas — phased structural validation

The **author-validated model** is described in [`reference/power-evaluation.md`](../reference/power-evaluation.md) (D-57–D-67). JSON Schema Draft **2020-12** was approved in D-66; the Focus discriminator/reference contract in D-67.

## Current executable schema

[`power-evaluation.boundaries.schema.json`](power-evaluation.boundaries.schema.json) is a **limited structural boundary contract**, not the finished strict schema for all nested data:

- Enforces **exactly** the six required top-level fields `ID`, `Subject`, `Focus`, `Context`, `Dependencies`, `Results`; rejects all extra **top-level** fields.
- Enforces `Focus.type` values **`NEED`, `CAN`, `Scenario`**, with `object_id` for NEED/CAN or `scenario_id` for Scenario, and rejects the contradictory alternative reference key.
- Enforces presence of the D-61–D-63 **Focus-specific result substructure names**, rejecting named result sections reserved for another Focus kind.
- **Deliberately does not** yet constrain internal `Subject`, `Context`, `Dependencies`, ID string syntax, internal reference formats, degree bounds, evidence, uncertainty and `Results` nested value types. These remain **OPEN** and the schema may accept placeholder values that the final schema must reject.
- Provides **no cross-record semantic validation**, referential integrity, historical immutability enforcement, causal analysis, empirical truth checking, or calculation of Power. The test-only fixture adapter in [`tests/test_power_evaluation.py`](../tests/test_power_evaluation.py) checks some separate semantic constraints but is likewise provisional.

The schema's file name and `$id` deliberately mark it as a **boundary-level prototype**. Do not label it the finalized D-66 strict schema or treat its partial acceptance as approval of unvalidated nested serializations.

## Run the tests

From the repository root with Python 3.11+:

```sh
python -m pip install -r requirements-test.txt
python -m unittest discover -s tests -p 'test_*.py' -v
```

[`tests/test_power_evaluation_schema.py`](../tests/test_power_evaluation_schema.py) uses a pinned Draft 2020-12-capable `jsonschema` validator for **positive and negative** tests. A dedicated negative test illustrates a **structurally valid but semantically non-resolving** Focus ID, in line with D-65.

**Next open decisions:** types and requiredness for `ID`, `Subject`, `Context`, `Dependencies`; ID normalization and time/provenance formats; nested `Results` validity, nullable/not-applicable values, and complete semantic cross-reference resolution. Implement these incrementally rather than converting illustrative fixture details into mandatory requirements.
