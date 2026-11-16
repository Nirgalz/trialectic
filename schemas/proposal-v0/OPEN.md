# Open questions — canonical Trialectic data model proposal v0.1

**Current status (D-75):** The [reconciliation register](RECONCILIATION.md) supersedes the original status for V-01–V-06. O-01 choice A (separate relation record and represented Object) is validated; its cardinality/lifecycle/migration remains OPEN. O-03 transport references, O-05 condition/pathway expression syntax, O-14 scoped technical strictness and record-family architecture are partially settled. All remaining subquestions stay OPEN. C-01–C-10 resolutions are proposed only.

**Original status:** ALL ITEMS OPEN. These are not new conceptual decisions. The prototype files here are a testable proposal for `dev`. Every resolution must be explicitly approved and recorded separately in `DECISIONS.md`, with corresponding reference/TODO updates where warranted. Priorities denote sequencing, **not** settled importance or assigned work.

## P0 — Resolve before adopting a normative exchange contract

| ID | Open decision | Candidate in v0.1 | What must be settled/tested | Reference |
|---|---|---|---|---|
| O-01 | A NEED/CAN is an Object, yet D-36 stores origin-anchored relation records: is the relation record itself that Object or a distinct representation of one? | `relation.represented_object` explicitly references a separate Object identity | Confirm identity/attribution semantics, object categorization, one-to-many cases and migration from D-36 bare `ID` | D-36, November 16 revision, T-30 |
| O-02 | Object IDs, branch IDs and versions | Stable `object.id`; `(object_id, version)` Definition; independent `parent_id` | Physical entity vs alternative account; multiple effective incompatible branches, promotion, shared-Object propagation and historical pinning | D-25/26, D-44/45, T-05/T-30 |
| O-03 | Canonical reference serialization and naming | Typed `{id,version}`; lowercase technical keys except legacy `NEEDs/CANs` | Whether to preserve author-approved D-36 field capitalization and bare IDs in canonical files, or define a versioned adapter; cross-branch namespaces | D-36/37/42/44 |
| O-04 | Exact role meaning of NEEDs and CANs lists, unknown versus empty | Nullable arrays of Object references; `null` versus `[]` remain distinct syntactically | Semantics of each, dual membership, repeated reference, zero participants, existence of linked Objects vs asserted necessity and qualified relation identity | D-36/37/38, T-01 |
| O-05 | Nature/role and composition of heterogeneous links | A shared versioned `logic` syntax for explicit groups, and local link IDs | Whether multiple D-37 object composition groups combine by AND, OR or another rule; allowed typed leaves; preservation of original approved grouping format | D-37/38/42 |
| O-06 | Scope/version of Link, Condition and Pathway IDs | `(owner_relation,version,local_id)`; typed `owner_id` on references | Cross-record `affects`, owner pinning, stable local IDs across revisions, duplicate detection, cycles | D-38–D-44 |
| O-07 | Condition predicates, unknowns and completeness | Explicit property predicates + Scenario/time assessment; `coverage` for pathways/inventory | Heterogeneous and semantic predicates, undeclared properties, necessity/sufficiency proofs, partial search, uncovered prerequisites, no-path proof, logical versus causal cycle | D-40–D-43, T-02 |
| O-08 | Focus-centered Power operation and results | `power_assessment` referring to exactly one NEED/CAN/Scenario; distinct assessed NEEDs and candidate CANs | Exact comparison algorithm; distinction from actionability; whether/how conditional binary indicators remain; cross-Focus aggregation; incomplete information | November 16 Power revision, T-02/T-30 |
| O-09 | Partial NEED satisfaction vs partial CAN actualizability | Optional `measure` with units/method; statuses not replaced | Admissible contextual measures, thresholds, scalar vs non-scalar situations, influence of link weights, no unjustified inferred percent/probability | November 16 partial updates |
| O-10 | Physical, simulated and epistemic histories | Scenario-specific states, explicit event kinds, separate assessments | Scenario branching/promotions, event chronology, delayed/temporary/non-monotone effects, observation revisions, timestamp conflicts and local suspension | D-26, D-39/40/44/45, T-18 |
| O-11 | Temporal conditions, compliance and exceptions | Versioned temporal constraints; time-indexed NEED assessments | Machine-enforceable recurrence, time zones and DST, relative timing, intervals, overlapping requirements, authorized exception entity, historical validity | D-32–D-35 |
| O-12 | Evidence and claim assessment | Claim + Evidence + review + dated Assessment; stated root provenance | Method-specific criteria, contradictory reports, source dependence, retractions, discriminating tests, limitation of established-in-model; no fabricated numerical confidence | D-31/45/46/47 |
| O-13 | Normalized formal identity of a Condition | Separate `conditions` table, scoped to Relation and version | Does it need an independent Definition version, when underlying predicate changes, what updates Relation Definition and caches | D-40, T-30 |
| O-14 | Strict interface semantics and schema verification | JSON Schema Draft 2020-12 with `$defs` and a tiny illustrative fixture | Semantic validator, unique key constraints, foreign-key resolution, typed-reference target rules, contextual invariants, negative test cases, independent oracle | T-03/T-24/T-27 |

## P1 — Research and extensibility

| ID | Open question | Suggested investigation | Reference |
|---|---|---|---|
| O-15 | Plasticity and changing Potency with NEED/CAN Object identity | Trace discovery versus emergence/change/loss and how NEED changes relate to Plasticity | T-01/T-05/T-30 |
| O-16 | Context and Environment boundaries | Explicit contextual relevance and accessibility roles; reusable constituent references; changes of Subject and Focus | T-15 |
| O-17 | Semantic Landscape/Pyramid representation | Decide whether a typed semantic submodel is needed or whether generic Object relations suffice; do not force all Objects into semantic hierarchies | T-07–T-12 |
| O-18 | Scenario comparison without a universal score | Define separate feasibility, uncertainty, cost, complexity, time, effectiveness and impacts with evidence rather than an automatic winner | T-16/T-17 |
| O-19 | Effects and normative valuation | Explicitly reference evaluator, criterion and affected Objects for favorable/unfavorable effects; separate magnitude, possibility and probability | T-18/T-22/T-23 |
| O-20 | Recursive relevance and computational limits | Reproducible stopping/pruning trace, severity-sensitive exceptions, stress tests with cross-scenario shared Objects | T-21 |
| O-21 | Benchmark coverage and interoperability | Test complete CAN- and NEED-focused cases, incomplete search, false matches, two-way cycles, partial measures, simulated conflicts and independent replication | T-24/T-27 |
| O-22 | Schema evolution and interchange between applications | Define strict migration paths, revisions, Git tag release process, compatibility and deprecation windows | T-28/T-30 |
| O-23 | AI-dialogue adaptation | Maintain a clean separation of Method concepts, external structured output contract and conversational orchestration | T-20 |

## Non-negotiable regression examples (to add)

1. One NEED already satisfied without any CAN Actualization; no action should be fabricated.
2. One CAN with a confirmed modeled action condition, but overall Power left indeterminate.
3. Two CANs separately insufficient but jointly relevant, versus two alternative candidate paths; mark evidence and completeness separately.
4. One blocked circular causal dependency with an independently actionable possible third CAN; structural cycle alone must not be called impossible or solved.
5. Two historical Object Definitions sharing a constituent, then one simulated branch modifies it; all other branches remain unaffected.
6. Knowledge contradiction makes a predicate indeterminate without editing physical state; independent events are still permitted (localized suspension).
7. One NEED is effectively unsatisfied during an explicitly authorized exception while temporal compliance is satisfied.
8. A temporal final state is satisfied after an earlier breach; continuous compliance remains unsatisfied.
9. A partly satisfied NEED with a documented unit and method; CAN actualizability degree and Power assessment remain separate.
10. An experimentally unverified claim established within a hypothetical model has indeterminate empirical status despite repeated documents with one shared root source.
11. Time-delayed direct effect and immediate indirect effect, separately characterized without deterministic causal assertion.
12. Empty documentary pathway inventory evaluates as unknown, not as false `any([])` and not as universal impossibility.
13. Two effective contradictory observations require diagnosis and cannot be auto-merged solely by event arrival order.
14. The same Focus assessed in two Scenarios at different times retains separate evidence, object versions and evaluative outcomes.

## Suggested sequence for explicit decisions

**First gate:** O-01–O-06 (identity, roles and references). These decisions determine how every further file can be represented without ambiguous joins.

**Second gate:** O-07–O-09 and O-13 (Conditions, Power and partial measures), using synthetic counterexamples.

**Third gate:** O-10–O-12 (temporality, Scenario events and evidence), including branch isolation and causal/epistemic separation.

**Fourth gate:** O-14 and O-21–O-23 (validator, independent test corpus, interoperability and governance).

Approval of this format would only approve a **technical representation contract**. It would not validate causal claims, settle the research program, or scientifically validate the Method.
