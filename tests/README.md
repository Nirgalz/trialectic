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
- `test_power_evaluation_schema.py` validates each of the seven linked records against the modular PowerEvaluation schema. Both Scenario revisions use the D-78 sections and refer to the anticipated effect registered in the fixture. The fixture-specific `distance_ratio` scale and context checks apply only to this example. D-54 permits compatibility-based reuse where supported.
- Cycles are merely detected, not mathematically solved or causally classified; propagation is illustrated through explicit revised records, not independently computed by a dependency engine. Scenario consequences remain *anticipated* and no effective Actualization events are inferred.
- The schema tests cover the normative exchange format. Causal sufficiency, empirical validity and calibrated comparison among alternatives remain outside their scope.

## D-77/D-78 normative Analysis/Scenario v2

`test_analysis_v2.py` checks the D-77 required fields against an independent list. Alongside the full example and the standalone Scenario evaluation, `cases/analysis_without_scenario.json` exercises a CAN focus with a versioned subject, represented Object and relation, before any Scenario or PowerEvaluation is recorded. See [field contracts and offline validation](../schemas/global-model.md).
