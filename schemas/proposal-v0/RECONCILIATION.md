# Proposal v0.1 — approval and conflict register

Date: November 16, 2026. Authority: **D-75**, following the author's instruction
to validate compatible proposals and list conflicts with proposed resolutions.
The original JSON schema/example remain an historical proposal, not a conforming
replacement for the approved PowerEvaluation profile.

## Validated compatible choices (D-75)

| ID | Approved choice | Exact boundary of approval |
| --- | --- | --- |
| V-01 | Separate NEED/CAN Object identity from its relational representation | `represented_object` references the NEED/CAN Object; `origin_object` references its bearer. A relation-record identity is separate. This resolves O-01's choice A; cardinality, lifecycle and migration rules still need specification. |
| V-02 | Normalized version-pinned references | `{id, version}` for Object and relation references; typed references may distinguish `kind`, `id`, `version`, and owner. This approves a transport representation, not replacement of D-36 or D-67 keys. Historical versions must be known, never fabricated. |
| V-03 | Recursive expression representation for condition/pathway definitions | A leaf `{"ref":{...}}` and groups `{"op":"all" or "any","items":[...]}`; groups contain at least one item. Inventory `expression:null` records no supplied evaluable expression, not falsehood/impossibility. This does not assign semantics to heterogeneous leaves or replace the separately approved relation/temporal compositions. |
| V-04 | Strictness as a scoped transport design | Versioned normalized records may use closed property sets and the proposal's string-ID pattern. These are profile-specific technical choices, not universal Method ID rules or permission to close PowerEvaluation nested metadata. |
| V-05 | Distinct normalized record families | Object/Definition, relation/link, Condition/evaluation, pathway/inventory, Scenario/state/event/effect, claim/evidence/review/assessment remain distinct. Version pins and evidence provenance support traceability. This approves the architecture, not every proposed enum, mandatory field, predicate operator, Scenario mode or assessment algorithm. |
| V-06 | Separate measures and evidential dimensions | Contextual measures need an explicit unit/method/justification; source provenance, methodological review and model/empirical claim assessment remain separate. The standalone `measure` proposal cannot replace the approved PowerEvaluation `degree` contract. |

Approval is technical/conceptual within these boundaries, not empirical validation.
The global envelope and complete set of required collections remain unapproved.
Do not infer approval of every JSON assertion from a validated architectural choice.

## Conflicts and resolutions — VALIDATED by D-76

| ID | Conflict / incompatible overlap | Approved authority | Resolution approved by D-76 |
| --- | --- | --- | --- |
| C-01 | `$defs.powerAssessment` is flat, uses different fields and lacks the six-field envelope | D-57, D-66 | Replace assessment items in a future normalized schema with the normative `PowerEvaluation` schema; preserve old records through an explicit versioned migration. Keep the global Analysis envelope a separate proposal. |
| C-02 | `focus.kind`, `SCENARIO`, NEED/CAN `relation` target | D-50, D-67 | Use `Focus.type` = NEED/CAN/Scenario and `object_id`/`scenario_id`. Resolve a legacy relation target through validated V-01 `represented_object`; never substitute the relation ID or origin ID. Ambiguous/missing targets block migration. The Analysis-level focus remains separately scoped. |
| C-03 | `actualizability` is required for every Focus | D-61–D-63, D-72 | Dispatch Results by Focus: NEED satisfaction/compliance/candidates; CAN Actualizability/prerequisites/contributions; Scenario four required names with internals still OPEN. Never synthesize a CAN judgment for NEED or Scenario. |
| C-04 | Every power assessment requires Scenario and timestamp; version map absent | D-68 | Require `Context.definition_versions`; make Scenario optional. Preserve known temporal information as context without making one timestamp universal. Missing historical pins require source recovery, not guessed defaults. |
| C-05 | Two scalar NEED statuses cannot represent applicability or separate result justifications | D-69, D-70 | Use the approved effective-satisfaction and temporal-compliance objects. Recover applicability and justification from source records; a legacy `indeterminate` compliance value alone cannot distinguish unknown applicability from unknown compliance. |
| C-06 | Justifications optional/empty; search, coverage and reference structures missing | D-71–D-74 | Adopt approved candidate/prerequisite sections, scope and nonempty justifications. Retain separate inventory/pathway coverage. Do not infer `searched`, `complete`, candidate type or causal proof from list membership. |
| C-07 | Generic `measure` uses `unit/method/justification`, whereas evaluation `degree` requires `value/measure/basis` | D-69, D-72 | Retain generic measurements separately; map to `degree` only with documented unit and basis equivalence. Preserve extra source information in allowed metadata; do not rename blindly or impose a universal numeric range. |
| C-08 | Shared `logic` replaces D-37 grouped `objects/operator` and D-34 temporal `operator`/requirement references | D-34, D-37 | Restrict V-03 to condition/pathway definitions initially. Preserve approved relation and temporal formats. Any conversion needs a separately reviewed adapter and explicit multiple-group semantics. |
| C-09 | Closed normalized records and ID regex would reject allowed evaluation metadata or identifiers if applied universally | D-67, D-68–D-74 | Keep V-04 scoped outside the existing evaluation contract. Embed evaluations without tightening them; use a namespaced transport alias/adapter only where needed and preserve original identity. |
| C-10 | `related_power_assessment_ids` does not distinguish analytical inputs from revision lineage; no approved version/context contract | D-52–D-60, D-68 | Classify each legacy link from provenance: analytical input becomes `Dependencies[].evaluation_id`; revision becomes `Context.provenance.revises` with a new evaluation ID and preserved predecessor. Unclassified links remain unresolved. |

These are conflicts **if the overlapping proposal records are used as the approved
contracts**, not a claim that every separate auxiliary record is forbidden.
A scalar historical observation can remain auxiliary; it cannot stand in for a
complete approved evaluation.

## Still unresolved, rather than conflicting

Object physical identity, version/branch lifecycle, reference owner requirements,
unknown versus empty inventories, interpretation of mixed logical leaves, complete
predicate syntax, temporal exceptions/DST, evidence adequacy, effect valuation,
Scenario nested results and global envelope requiredness remain OPEN. V-01–V-06
do not settle these by implication. In particular D-75 does **not** formalize the
Scenario result fields previously anticipated under that decision number.

## Implementation order (D-76)

1. Reuse the approved PowerEvaluation contract and resolve Focus identity (C-01–C-04).
2. Define loss-aware migration of results, degree and dependency/revision links (C-05–C-07, C-10).
3. Build scoped normalized components from V-01–V-06, preserving approved compositions and evaluation extensions (C-08–C-09).
4. Test valid no-Scenario evaluations, NEED without CAN Actualizability, authorized
   interruption, unknown applicability, empty candidate search, missing version pins,
   ambiguous represented Objects, and revision/input-link separation.

**D-76 update:** The author has approved C-01–C-10. Their implementation and
regression tests are in [normalized-v1](https://github.com/Nirgalz/trialectic/blob/7fc676586a85be504bf145d313b19fefadfb9761/schemas/normalized-v1/README.md) and the
[migration adapter](https://github.com/Nirgalz/trialectic/blob/7fc676586a85be504bf145d313b19fefadfb9761/tools/reconcile_proposal_v0.py). The normative
PowerEvaluation assertions are unchanged; the global envelope remains experimental.
Earlier statements of unapproved resolutions describe the pre-D-76 status.
