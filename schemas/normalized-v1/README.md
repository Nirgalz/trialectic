# Reconciled normalized exchange v1 (D-76)

**Historical profile:** D-77/D-78 now adopt [normative Analysis and Scenario v2](../global-model.md). This v1 artifact and its migration remain unchanged in scope; its experimental status does not describe the new v2 contract.

**Approved:** C-01–C-10 resolutions in [D-76](../../DECISIONS.md), implementing
the compatible D-75 choices. **Still experimental:** the global Analysis envelope
and all inherited field requirements not specifically approved by D-75/D-76.
Approval of these resolutions is not approval of the complete normalized model.

## Implementation and authority

`trialectic.schema.json` is a new version of the historical proposal. Its
`power_assessments` items reference the **unchanged normative PowerEvaluation**
schema by `$id`, not a copy with stricter identifiers or metadata restrictions.
The test runner/adapter registers that schema locally; no network resolution is
needed. Other inherited proposal definitions retain their experimental status.

| Resolution | Implementation |
| --- | --- |
| C-01 | `$defs.powerAssessment` references `urn:trialectic:schema:power-evaluation:normative-v1`; six-field envelope |
| C-02 | Migration resolves relation `(id,version)` to `represented_object`; produces `Focus.type/object_id` or `Scenario/scenario_id` |
| C-03 | The normative schema dispatches Results by Focus; no CAN Actualizability is fabricated for NEED/Scenario |
| C-04 | Explicit known `definition_versions`; Scenario optional; existing time/Scenario preserved |
| C-05 | NEED records require supplied applicability and distinct justified result objects; old scalar record retained |
| C-06 | Normative candidate/prerequisite contracts; no automatic search, completeness or justification defaults |
| C-07 | Generic measures stay separate; explicit documented same-value unit/basis equivalence needed for `degree`; numerical conversions require a separately reviewed adapter |
| C-08 | D-37 Object composition is an array of `{objects,operator}` groups; D-34 time composition uses `{operator,requirements}`. `logic` remains for condition/pathway definitions. No inter-group operator is invented |
| C-09 | Transport ID patterns/closed records do not wrap or tighten evaluation internals; source identity retained. Existing nonconforming transport identities require a future explicit alias map, never silent rewriting |
| C-10 | Explicit link classification as input/revision/both; input membership checked in Dependencies, predecessor in provenance.revises; revision requires new ID and retained source |

The two scalar NEED result fields are no longer presented as a complete approved
evaluation. Historical assessments are retained in `legacy_assessments`; converted
NEED and CAN/Scenario evaluations share `power_assessments`. The entire original
document and supplement plan are retained in `migration_provenance`.

## Migration

Install the existing test requirements, then run from the repository root:

```sh
python -m pip install -r requirements-test.txt
python tools/reconcile_proposal_v0.py schemas/proposal-v0/example.json schemas/normalized-v1/migration-plan.example.json output.json
python -m unittest discover -s tests -p 'test_*.py' -v
```

The CLI creates a separate output file only after successful validation. Source
files are never edited by the migration. Use a distinct output path. It blocks
when supplemental information is missing or ambiguous; it does not manufacture
versions, evidence, applicability, justified searches or relationship types.

The plan has an `evaluations` map keyed by each legacy assessment ID. Each entry
supplies `Context`, `Dependencies`, `Results`, and a missing `Subject` if needed.
An optional new `ID` is required for a revision. `link_classifications` must classify
each `related_power_assessment_ids` and `need_assessment_ids` entry as `input`,
`revision` or `input_and_revision`. Corresponding target IDs must be used in the
supplied Dependencies/provenance, including explicit renamed IDs in the same plan.
`degree_equivalence` documents a measure conversion; the original measure remains
in `Context.provenance.legacy_record`.

`relation_compositions` is keyed by `relation-id@version`; entries supply `value`
and `justification`. `temporal_compositions` uses source owner paths such as
`/conditions/0/temporal` or `/relations/0/temporal`. These are explicit supplements,
not a general conversion algorithm for unresolved nested or mixed groups.

`migration-plan.example.json` supplies **declared synthetic data** for the generator
example. Its justifications/applicability are newly stipulated example inputs,
not facts recovered from the historical fixture. `example.json` is reproducible
from that source and plan. Empty candidate lists make no impossibility claim.

## Limits and regression

The adapter makes selected local source/target consistency checks, not complete
semantic validation. Existence of every dependency/evidence/temporal reference,
compatibility of revisions and reused assessments, completeness, predicates,
causality, branch lifecycle and empirical truth still need separate assessment.
Scenario section names remain approved with **all nested value types OPEN**.

Tests cover lossless provenance, reproducibility, missing/ambiguous references,
version pins, no-Scenario/time records, temporal applicability and exceptions,
search omissions, degree equivalence, dependency/revision classification, approved
composition shapes and evaluation extension/identifier compatibility. The existing
CI discovers these tests on `dev`. `proposal-v0` schema/example remain historical.
