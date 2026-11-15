# Executable Trialectic regression baseline

**Status: preliminary deterministic test/reference harness, NOT a production engine or a validated full JSON Schema.** This test layer does **not** change the canonical Method, and it is deliberately separate from `reference/trialectic-method.md`.

## Execute

Python 3.11 or later; standard library only:

```sh
python -m unittest discover -s tests -p 'test_*.py' -v
```

`.github/workflows/method-regression.yml` runs the same command on pushes and pull requests to `dev` and via manual workflow dispatch. CI results must be checked in GitHub; presence of this workflow alone does not prove that a run passed.

## Files and sources of expectations

- `cases/core.json`: ten fixed golden fixtures **MT-01 … MT-10**, each naming the decisions supporting its expected outcome.
- `reference_model.py`: intentionally minimal provisional functions for three-valued logic, scoped pathway/inventory assessments, versioned references/cycle detection, simulated states and event history, temporal effective-vs-compliance, and evidence provenance.
- `test_core.py`: golden-case comparisons, explicit independent truth tables for `all`/`any`, exhaustive permutations of four condition states, malformed/empty/cyclic version references, branch isolation, epistemic-vs-physical invariants and declared evidence roots.

**Do not let the reference model generate the expected golden results.** The JSON fixture expectations are authored separately from implementation, tied to validated decisions, and should change only after a documented conceptual decision or correction of an erroneous fixture.

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
