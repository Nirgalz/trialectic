# Executable Trialectic regression baseline

**Status: preliminary deterministic test/reference harness, NOT a production engine or a validated full JSON Schema.** This test layer does **not** change the canonical Method, and it is deliberately separate from `reference/trialectic-method.md`.

## Execute

Python 3.11 or later. The core regression harness uses the standard library; Draft 2020-12 boundary-schema tests additionally use the pinned `jsonschema` test dependency:

```sh
python -m pip install -r requirements-test.txt
python -m unittest discover -s tests -p 'test_*.py' -v
```

`.github/workflows/method-regression.yml` runs the same command on pushes and pull requests to `dev` and via manual workflow dispatch. CI results must be checked in GitHub; presence of this workflow alone does not prove that a run passed.

## Files and sources of expectations

- `cases/core.json`: ten fixed golden fixtures **MT-01 … MT-10**, each naming the decisions supporting its expected outcome.
- `reference_model.py`: intentionally minimal provisional functions for three-valued logic, scoped pathway/inventory assessments, versioned references/cycle detection, simulated states and event history, temporal effective-vs-compliance, and evidence provenance.
- `test_traceability.py`: structural checks that every golden fixture cites existing decision IDs in `DECISIONS.md` and that the canonical reference exists; **not** a semantic consistency proof.
- `test_core.py`: golden-case comparisons, explicit independent truth tables for `all`/`any`, exhaustive permutations of four condition states, malformed/empty/cyclic version references, branch isolation, epistemic-vs-physical invariants and declared evidence roots.

**Do not let the reference model generate the expected golden results.** The JSON fixture expectations are authored separately from implementation, tied to validated decisions, and should change only after a documented conceptual decision or correction of an erroneous fixture.

## Cross-Focus PowerEvaluation fixtures (D-35, D-49, D-51–D-64)

- `cases/power_evaluation.json`: **seven synthetic, linked assessments** of a car journey, energy NEED, travel CAN and Resolution Scenario; includes unchanged-conclusion epistemic revisions, a separate Scenario where recharging may be available, and an authorized temporal exception. Object IDs, version pins and all effects are **hypothetical fixture data**, not validated claims about electric-car engineering.
- `test_power_evaluation.py`: **provisional integrity checks** for the approved six top-level `PowerEvaluation` fields (D-57), NEED/CAN/Scenario-specific `Results` sections (D-61–D-63), links between evaluations, contextual Definition pins, revision provenance (D-58–D-60), Scenario isolation, indeterminate/partial findings, and cycle detection. Negative cases mutate valid fixtures to confirm rejection of dangling references, invalid types, unsupported statuses, inconsistent versions and unsafe cross-Scenario reuse.
- **Deliberate boundary:** the subfield serialization, hard-coded fixture contexts, and test adapter's constraints (including the exemplary `distance_ratio` scale and strict same-Scenario references) are **not normative Method rules**. D-54 permits compatibility-based reuse when supported; these tests reject cross-Scenario links **only because the example lacks any documented compatibility proof**.
- Cycles are merely detected, not mathematically solved or causally classified; propagation is illustrated through explicit revised records, not independently computed by a dependency engine. Scenario consequences remain *anticipated* and no effective Actualization events are inferred.
- Tests do not yet establish a final JSON Schema, a causal sufficiency/Power computation, complete pathway inventories, trustworthy probabilities, meaningful empirical validity or a calibrated comparison among Scenario alternatives.

## D-66–D-74 Draft 2020-12 boundary-schema checks

The executable [`schemas/power-evaluation.boundaries.schema.json`](../schemas/power-evaluation.boundaries.schema.json) is **partial**. It enforces six closed top-level fields; the D-67 `Focus.type` discriminator with type-specific required reference; Focus-dependent D-61–D-63 `Results` **section presence**; and the **D-68 minimum local types** of `Subject`, `Context`, `Dependencies`; plus **D-69 NEED `effective_satisfaction`** required status/justification, optional justified degree, evidence references and uncertainty object. **D-70** adds NEED `temporal_compliance` applicability, its conditional three-state status, mandatory justification and optional applied exception/evidence references and uncertainty object. **D-71** adds NEED `candidate_cans` with a possibly empty `identified` CAN-object-reference list, required candidate justifications, `search_status`, scoped `coverage`, mandatory `scope` and `justification`, and optional evidence/uncertainty; it rejects a `complete` search inventory if `not_searched`. No candidate correspondence proves actual contribution, sufficiency or actionability. **D-72** adds CAN `actualizability`: four contextual statuses, mandatory justification, optional measurable degree with required `value`/`measure`/`basis`, optional evidence references and uncertainty object; no universal bounds, no automatic prerequisite aggregation and no inferred effective Actualization. The provisional fixture adapter validates its illustrative `distance_ratio` in [0, 1] **as a measure-specific example only**, not a universal degree rule. **D-73** adds CAN `prerequisites` with four required, possibly empty arrays of NEED/CAN Object references, relation-scoped Conditions and versioned pathway references; required `inventory_coverage`, `scope`, `justification`, and optional evidence/uncertainty. Per-pathway coverage is distinct from inventory completeness; a list is not an implicit `all`/`any` group or proof of Power. The provisional fixture adapter additionally checks declared analytical dependencies for referenced NEED/CAN evaluations, while full versioned pathway resolution and semantics remain unimplemented. **D-74** adds CAN `potential_contributions` with a possibly empty `needs` list of only `relationship: candidate` NEED Object references with mandatory justifications, a separate `search_status` and scoped `coverage`, mandatory inventory `scope` and `justification`, and optional evidence/uncertainty. A search not undertaken cannot claim completeness, and a candidate is not a proven contribution, sufficiency or observed effect. The fixture adapter performs limited type and search-state checks but no causal proof. The NEED and CAN minimum nested shapes are now structurally covered. It does **not** implement the full Scenario `Results`, final causal/epistemic semantics or a production cross-record semantic validator.

[`test_power_evaluation_schema.py`](test_power_evaluation_schema.py) adds **95 executable JSON Schema test methods** using `jsonschema==4.23.0`, including negative cases for missing top-level fields, conflicting Focus references, incorrectly selected `Results`, and a distinction between structural validity and semantic reference resolution. **This is not a final strict JSON Schema.** Unapproved nested shapes and evidence validation remain open; see [`schemas/README.md`](../schemas/README.md).

## What tests can and cannot show

- **PASS**: the executable *reference harness* conforms to these scoped fixture expectations, for the tested cases; no implementation-specific contradiction was observed in them.
- **FAIL**: inspect the failing case, source decision and implementation; do not auto-edit fixture outcomes just to make a run green.
- **UNRESOLVED**: mark an undecided semantic issue in the reference/TODO and write a future test when the rule is validated; do not silently make it a required `PASS`.
- No Python production engine existed in the repository when this suite was introduced. **These tests exercise a new test-only model, not a separate production implementation.** They are groundwork for tests against a real engine when one exists.
- `actualize` is a controlled **simulated** transition of declared properties, not a demonstration of the real causal effects of a CAN. `declared_origin_groups` groups **declared roots** and cannot audit true independence.
- The full adequacy of Power, Scenario actionability, independent scientific evidence, causal resolution rules, formal semantics for all temporal intervals and general graph/Definition version identities remain OPEN.
- **No live AI calls are made**; a future AI application can reuse these fixtures via an adapter but requires a defined response contract, evaluation rubric and reproducibility protocol. This suite is not a comparative AI-with/without-Method experiment.
- The number of unit checks and generated permutations is an **engineering coverage** measure, never evidence of the Method's empirical validity or an increase in AI reasoning accuracy.

Related tracked work: T-03, T-24 and T-27 in `TODO.md`. Preserve the validated conceptual distinctions from D-27, D-31, D-35 and D-40–D-47.

## Normative local profile

`test_normative_schema.py` runs the boundary regression suite against the normative
[PowerEvaluation schema](../schemas/power-evaluation.schema.json), checks assertion
parity, and protects OPEN identifier and Scenario value types.
`cases/power_evaluation_minimal.json` supplies three independent synthetic records;
the surrounding array is test packaging, not an approved Analysis envelope.
See [conformance and exclusions](../schemas/power-evaluation.normative.md).
