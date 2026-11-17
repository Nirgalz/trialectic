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

## D-83 immutable concept identity and attribution (v2.1.0)

- `cases/identity_attribution_v21.json` models a CAN Object with its own NEED; two Subjects have differently qualified attribution relations to the same CAN without equating attribution with Power or actualization.
- `test_identity_attribution_v21.py` tests the 2.0.0/2.1.0 version gate, exclusive NEED/CAN identity, reference/type consistency, claims, established-only Puissance projections and requalification with a **new** Object ID.
- `tools/validate_semantics.py` is a **scoped, experimental consistency validator**. It supports local identity, version, relation and claim references plus a cross-document immutability check; no claims about complete semantics, factual source adequacy, causal mechanisms or empirical proof are made.

## D-84 CAN specialization and composition affiliations (Analysis v2.2.0)

- `cases/can_affiliations_v22.json`: synthetic CAN network of general programming, a specialized Python skill, application development and specialized development roles. The Python CAN has two parents with different affiliation kinds; only explicitly recorded relations establish Subject possession. The fixture also retains a CAN with its own NEED.
- `test_can_affiliations_v22.py`: twelve positive/negative tests for typed specialization/composition, several parents, independent CAN identity, absence of implicit child ownership or necessity/sufficiency, 2.0/2.1 compatibility, v2.2 required/empty affiliation collection, illegal shapes, dangling references, non-CAN endpoints, versioned claims/IDs, uncertainty and advisory cycles.
- `tools/validate_semantics.py`: scoped D-84 affiliation consistency on top of D-83 attribution rules. Cycles in asserted established edges yield warnings pending conceptual validation; **no** automated composition/transitivity/necessity inference is authorized.

The presence of these files is **not** evidence that the complete Python unittest suite or GitHub CI has passed. The synthetic corpus does not demonstrate empirical validity or complete semantic inference.

## T-01 identification corpus v1 (D-82; synthetic, non-empirical)

- `cases/t01-identification-v1.json` is the **versioned** source of 26 independently authored *expected* classifications (10 positive / 7 negative / 9 boundary). Corpus v1.1 adds per-case Subject category metadata to avoid guessing the type of a person from the test rule. Every case identifies its principles, scoped stipulated premises, expected outcome, justification and limits. All T-01-A–M appear in this corpus.
- `test_t01_identification.py` runs deterministic discriminating-rule comparisons, document/decision traceability, no-compensation and attribution/unknown-state invariants, and projects every case to a **minimal synthetic** Analysis + PowerEvaluation envelope conforming to the modular v2.1 JSON Schema, with explicit independent NEED/CAN Object identity and scoped attribution claims. Attribution may be established/refuted **within the stipulated model** or indeterminate; all NEED satisfaction and CAN actionability Power Results remain indeterminate. This is still a deliberately partial semantic encoding. Deliberate invalid mutations must fail; a valid but dangling reference demonstrates that structural validity does not imply semantic correctness.
- The projection is **not** a full causal or historical encoding of each synthetic scenario. In particular, it deliberately records no physical Actualization event, no established CAN contribution and no validated satisfaction outcome merely from an illustrative identification oracle. Tests do not independently confirm the conceptual truth of cases, causal mechanisms, actualizability, or real-world evidence.
- **Remaining T-01 research:** independently reviewed and blind cross-analyst cases (including contested thresholds and missing vulnerable Subjects), empirical source verification, case-specific semantic reference validation and controlled comparisons. These tests do not close T-01 or T-24/T-27.

To run the dedicated tests from the repository root:

```sh
python -m pip install -r requirements-test.txt
python -m unittest discover -s tests -p 'test_t01_identification.py' -v
```

The existing `method-regression.yml` workflow discovers this module automatically on pushes to `dev`. Verify the resulting GitHub Actions run before claiming CI success.
