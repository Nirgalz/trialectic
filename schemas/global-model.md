# Normative Analysis and Scenario data contracts v2.0 / v2.1 / v2.2

**Status: adopted under the author's instruction to validate the global model and
Scenario Results, November 16, 2026 (D-77/D-78).** The new serialization choices
below are recorded explicitly as this implementation's decisions, not attributed
retroactively to D-63 or earlier approvals. Normative applies to this **versioned
exchange profile**, not a claim that every Method application uses this storage
layout or that structural validity proves analytical/empirical truth.

## Entry points and versioning

| Document | Schema | Identity |
| --- | --- | --- |
| One complete Analysis exchange document | [analysis.json](model/analysis.json) | `urn:trialectic:schema:analysis:normative-v2` |
| One NEED, CAN or Scenario evaluation | [power-evaluation.json](model/power-evaluation.json) | `urn:trialectic:schema:power-evaluation:normative-v2` |

Both use Draft 2020-12. The global Analysis document accepts `schema_version: "2.0.0"` (unchanged historical contract) and `"2.1.0"` (D-83 identity/attribution extension), and `"2.2.0"` (D-84 CAN affiliations extension). The PowerEvaluation six-field contract is unchanged. Old v2.0 records are accepted without inferring an established attribution.
PowerEvaluation retains exactly its six fields and is selected by its schema URI,
without adding a seventh version field. The accepted Analysis exchange versions are 2.0.0, 2.1.0, and 2.2.0; the PowerEvaluation document schema remains independent.

## D-77 global Analysis envelope

The root is a closed object. These keys are **all required**:

```text
schema_version, analysis_id, main_subject, secondary_subjects, focus, environment,
objects, definitions, relations, conditions, pathways, inventories, scenarios,
events, condition_assessments, power_assessments, effects, claims, evidence_items,
evidence_reviews, claim_assessments
```

`analysis_id` is a profile ID. `main_subject` is one `{id,version}` Object
reference. `secondary_subjects` and `environment` are arrays of such references;
an empty array asserts no recorded entries, not an exhaustive environment.
`focus` uses the approved evaluation discriminator (`type` NEED/CAN/Scenario and
`object_id`/`scenario_id`). It records the analysis's current attention; it need
not equal every historical evaluation's Focus. All remaining family collections
are arrays, possibly empty. No Scenario, event, comparison winner, evidence item
or completed assessment is fabricated merely to fill a required array.

Optional `legacy_assessments` and `migration_provenance` are objects containing
historical data, not substitute evaluations. Their inner content is intentionally
unstandardized metadata. Undeclared top-level keys are rejected.

### Record families adopted for this profile

The complete field sets, types, enum domains, requiredness and closed-property
rules in the v2 schema's `$defs` are the executable serialization contract.
D-77 explicitly adopts the inherited reconciled record shapes **for this profile**;
they no longer have merely experimental status in v2. Important boundaries:

| Family | Identity / role |
| --- | --- |
| Object | Permanent `id`, category and Parent/Children lineage; NEED/CAN attribution is not a category change |
| Definition | `(object_id,version)`, constituent version refs, property descriptions and relation refs |
| Relation | `(id,version)`, separate `represented_object` and bearer `origin_object`, nullable NEEDs/CANs Object-ref inventories |
| Link | `id` scoped to relation version, referenced Object and source inventory; roles/conditions/affects/weight optional |
| Condition | Owning relation version + local `id`, target and property predicate; no contextual truth stored in its Definition |
| Pathway / inventory | Versioned, owned references and scoped coverage; recursive `ref` or nonempty `op/items`; inventory null is no supplied expression, not logical false |
| Scenario / state | Branch ID, parent, mode, Definition heads, time-indexed observed/simulated/assumed states and event refs |
| Event / state change | Explicit actualization versus observation/knowledge/Definition revision; epistemic events cannot contain physical state changes |
| Condition assessment | Contextual owner/version/time reference and three-state result |
| PowerEvaluation | Unmodified NEED/CAN contracts and D-78 Scenario Results, using the v2 schema URI |
| Effect | Independent causality, timing and evidence-status axes; `anticipated`, `simulated`, `observed`, `causally_attributed` distinguished |
| Claim / evidence / review / assessment | Versioned claims, source-root provenance, method-specific reviews, separate model and empirical status |

Outside evaluations, transport IDs follow `^[A-Za-z][A-Za-z0-9._:-]*$` and
version strings are nonempty. This is a profile transport constraint, not a
universal Object identity rule. Evaluation ID/Focus values are intentionally permissive for compatibility; this
is an explicit profile boundary, not a claim that arbitrary values identify real
entities. Additional nested
evaluation metadata retain their prior approved permissiveness. D-34 temporal
`operator/requirements` and D-37 `objects/operator` arrays stay distinct from
recursive condition/pathway expressions. Multiple Object groups have no inferred
cross-group operator. The property-predicate operator vocabulary is a bounded
transport vocabulary, not a universal theory of Conditions.

### D-83 identity and attribution extension — v2.1.0

**Normative transport choices adopted for this implementation; conceptual rules are author-validated in D-83.** This is a backward-compatible extension of the v2 domain record families with explicit version discrimination:

- `Object.concept_kind`, when present, is exactly one of `NEED` or `CAN`, **never both**. It identifies the Object's established conceptual kind, not the category `semantic_object`. Ordinary Objects omit the field. It is immutable per permanent Object ID, even when Definitions evolve; this cross-analysis obligation needs semantic validation.
- A not-yet-established identification remains a `claim` and can have a separate `claimAssessment`, without assigning the hypothesis as the Object's validated `concept_kind`.
- `Object.requalification`, when used, records `previous_object_id` (different from the new Object ID), `reason` (`correction` or `transformation`), nonempty `justification` and version-pinned `claim_id` / `claim_version` documenting the transition. The old Object and its history remain; cross-document predecessor resolution is a semantic obligation.
- `Relation.attribution` distinguishes the represented NEED/CAN Object from the contextual claim that it belongs to `origin_object`. It has required `status` (`established_in_model`, `refuted_in_context`, `indeterminate`), `scope`, `justification` and version-pinned `claim_id` / `claim_version`. This is **not** a new CAN subtype and does not establish satisfaction, actionability, Power, Actualization or empirical truth.
- In v2.1 every encoded NEED/CAN relation must contain `attribution`; the separately represented NEED/CAN Object must have the matching `concept_kind`, checked semantically. A CAN can itself be the `origin_object` of a relation representing one of its own NEEDs.
- Old v2.0 records cannot contain `concept_kind`, `requalification` or `attribution`, preventing a document from falsely claiming the old version while using new fields. Their unqualified relations are **not** silently promoted to established possession or Puissance.
- Established Puissance for a bearer Object may enumerate only CANs with an explicit `established_in_model` attribution and matching `concept_kind` within the considered model; the status is epistemic, not a substitute for real-world evidence.

**Validation boundary:** the Draft 2020-12 schema verifies local types, version gates and required fields. `tools/validate_semantics.py` adds limited reference-resolution, owner/type consistency, claim links and cross-document identity-change checks. Neither constitutes exhaustive semantic, causal, temporal or empirical validation. Compatibility with historical unannotated Documents requires review, not an inference of attribution.

### D-84 CAN affiliation extension — v2.2.0

**Transport implementation of the author's validated D-84 distinction, not an additional philosophical decision.** Analysis `2.2.0` adds the required (possibly empty) top-level collection `can_affiliations`, whose entries use the modular type [`canAffiliation`](model/types/can-affiliations.json). The collection is forbidden in `2.0.0` and `2.1.0`, which continue to validate unchanged.

A CAN affiliation has separate versioned identity `id` / `version`, two version-pinned Object references `parent_can` and `child_can`, and `kind` in `specialization` / `composition`. Its `qualification` contains a scoped `status` (`established_in_model`, `refuted_in_context` or `indeterminate`), `justification`, and version-pinned `claim_id` / `claim_version`. Both Object endpoints must have `concept_kind: "CAN"` and resolve to existing Definition versions; the separate semantic validator checks this. **Several parent edges can point to the same child.**

This conceptual relationship is **not** historical Object lineage (`parent_id` and child-ID fields), a D-36 NEED/CAN attribution record, a CAN's prerequisite NEED, a proof of causal contribution, or a rule automatically transferring Subject possession. The optional future ability to determine whether child CANs are necessary, sufficient, jointly required or alternative contributors is **not** built into this affiliation edge. Those claims require separately justified Conditions, Pathways, Scenarios or evaluations.

The scoped semantic validator rejects invalid/missing CAN endpoint references, incorrect conceptual kinds, missing versioned claims and duplicate affiliation IDs/versions; it **warns** about cycles in established affiliation edges but does **not** declare them impossible or automatically invalid. Full treatment of cycles, transitivity, semantic equivalence, closure of compositions, evidence adequacy and historical edge revision remains **OPEN**.

Synthetic test case: [`can_affiliations_v22.json`](../tests/cases/can_affiliations_v22.json). Tests: [`test_can_affiliations_v22.py`](../tests/test_can_affiliations_v22.py). Neither creates empirical evidence or actualizes a CAN.

### Semantic obligations remain distinct from local shape

IDs must identify the correct entity kind; versions must be historically real;
Object, relation, Condition, pathway, Scenario, event, evidence and evaluation
references must resolve in the intended scope. Definition and relation identities
are distinct; a link's Object must belong to its specified source inventory.
Lineage, shared-state isolation, revision immutability and input compatibility
must be preserved. These are obligations of valid use, **not claims that JSON
Schema or the supplied structural validator checks all of them**.

No universal branch promotion algorithm, exhaustive predicate language, recurrence/
DST/exception engine, causal inference or empirical evaluator is adopted here.
Those behavioral/research limits do not leave the v2 envelope or Scenario field
contract unspecified. Date-time/duration annotations and coarse patterns in this
structural profile are not full temporal validity checks.

## D-78 Scenario Results

The four existing section names are required **objects**, with the following
mandatory internal fields. Additional nested metadata remains allowed.

| Section | Required fields |
| --- | --- |
| `actualization_assessments` | `items`, `coverage`, `scope`, `justification` |
| `scenario_assessment` | `feasibility`, `complexity`, `costs_resources`, `temporality`, `expected_effectiveness`, `uncertainty`, `justification` |
| `effects` | `items`, `coverage`, `scope`, `justification` |
| `comparisons` | `items`, `coverage`, `scope`, `justification` |

For the three inventory sections, `items` is a possibly empty array, `coverage`
is complete/incomplete/indeterminate, and `scope`/`justification` are nonempty
strings. Coverage is scoped knowledge, not proof of physical completeness. Optional
`evidence` contains nonempty reference strings; optional `uncertainty` requires a
nonempty `justification` and may include evidence references.

### Contemplated actualizations

Each item requires nonempty strings `can_object_id`, `evaluation_id`,
`contemplated_actualization` and `justification`; optional `step_id` refers to the
Scenario's ordering model, optional `evidence` qualifies the correspondence.
The description identifies the specified contemplated action; it is not an event.
The evaluation must semantically be a compatible CAN evaluation. If used as an
input it must also appear in top-level Dependencies. Lists do not imply sequential
order, universal joint necessity, feasibility or effective Actualization.

### Five independent assessment dimensions

Each dimension is an object with required `status` and nonempty `justification`.
`status` is **assessed**, **not_assessed**, **indeterminate** or **not_applicable**.
These describe analytical completion, not physical feasibility. `assessed` requires
a nonempty textual `finding`, which states the contextual conclusion. No automatic
physical outcome follows from a status. Nonapplicability must be justified.

Each dimension may carry its own `evidence`, `uncertainty`, and contextual
`degree:{value,measure,basis}` without a universal numeric range. A cost or duration
measure is not a probability or an aggregate Power score. The required overall
`uncertainty` object requires a nonempty `justification` and permits evidence;
it does not replace per-dimension uncertainty. A separate overall `justification`
explains how the dimensions were considered without imposing scalar aggregation.

### Effects and comparisons

Each `effects.items` entry requires nonempty `effect_id` and `justification`, with
optional evidence. The referenced global Effect record supplies target, timing,
causality and anticipated/simulated/observed/attributed status. Recording an effect
reference does not establish causal attribution or make a simulated effect real.

Each comparison item requires `scenario_id`, `justification` and a nonempty
`criteria` array. Each criterion requires nonempty `criterion`, `finding`,
`justification`, and may include evidence/uncertainty. No ranking is mandatory.
Optional `comparisons.selection` requires `scenario_id` and `justification`; it
records an explicitly justified choice, not an automatic best-Scenario theorem.
Scenario reference existence, matching comparison context, criteria suitability
and any selection's consistency require semantic assessment.

## Fixtures and verification

[Analysis fixture](../tests/cases/analysis_v2.json) and
[Scenario fixture](../tests/cases/scenario_results_v2.json) are synthetic examples,
not migrated empirical claims. The extra Scenario assessment is newly stipulated.
Run offline from the repository root:

```sh
python -m pip install -r requirements-test.txt
python tools/validate_analysis.py tests/cases/analysis_v2.json
python tools/validate_analysis.py tests/cases/scenario_results_v2.json --evaluation
python -m unittest discover -s tests -p 'test_*.py' -v
```

The validator resolves both schemas locally and reports **local structural
conformance only**. Tests cover required sections, rejected shapes, independent
dimensions, partial/unassessed findings, no mandatory numeric score/winner,
effect references, comparison criteria, typed Scenario sections. CI runs them on pushes and pull requests to `dev`.
