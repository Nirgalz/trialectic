# trIA-dev pilot — Stage target versus a separate navigation Focus

**Date:** November 17, 2026  
**Status:** EXPLORATORY, not an author-validated conceptual decision, formal schema, independent usability assessment or empirical validation.  
**Branch:** `dev`  
**Dependencies:** D-17, D-58–D-60, D-85, D-88, D-89; T-03, T-04, T-20, T-21, T-27, T-30.  
**Case:** fictional six-school heat adaptation problem; overall Subject O-01 municipality, potentially affected Subject O-03 pupils, candidate Scenario S-02 active cooling.

## 1. Question

Does retaining **Focus as a separate object/concept** add necessary methodological information beyond an analytical **Stage's explicit target references**, or is Focus better understood as optional navigation state controlled by the Analyst?

Distinguish:
- **Problem / analytical concern**: global purpose and other potentially affected Subjects; D-89 global relevance safeguard is always active.
- **Stage**: an analytical operation (D-17), potentially involving more than one Object/Scenario as a working formalization.
- **Stage target(s)**: the reference(s) needed to interpret the particular operation; **not a newly approved canonical schema field**.
- **Navigation Focus**: a provisional optional single active reference selected by the Analyst; **not a new Object**, not by itself a PowerEvaluation, and not a revision-trigger.
- **PowerEvaluation.Focus**: a distinct already-validated, typed NEED/CAN/Scenario identifier with its own six-field contract, not interchangeable with navigation Focus.

## 2. Two candidate architectures

**A. Stage carries its target(s).** An operation is self-describing: `(stage id, operation, target refs, context)`. Analyst selection may be represented as an optional separately recorded navigation event rather than a persistent Focus construct. Without such events, historical intentional selections may be hard to distinguish from merely examined Objects.

**B. Separate current Focus.** The Analyst can select a single Object/Scenario and keep it active across several Stages. Each Stage still needs explicit, interpretable target reference(s) when it examines multiple entities, serves D-89 globally, or when no navigation Focus is active. Focus is proposed as a lightweight UI/session pointer, not a domain Object or automatic analytical filter. A stage must not silently inherit Focus as its only referent when that is incomplete.

Both retain the same immutable conceptual Object identities, versioned Definitions, contextual uncertainty and assessment revision rules.

## 3. Frozen navigation and Stage trace

| Event | Active navigation Focus | Stage operation and explicit examined targets |
| --- | --- | --- |
| NAV-01 | S-02 | Select only, no Stage or PowerEvaluation revision |
| ST-01 | S-02 | Explore conditions: S-02 |
| ST-02 | S-02 | Evaluate: S-02 |
| NAV-02 | O-03 | Select only |
| ST-03 | O-03 | Understand pupils: O-03 |
| ST-04 | O-03 | Compare effects: S-02 and O-03 |
| NAV-03 | S-02 | Select only |
| ST-05 | S-02 | Reassess: S-02 |
| ST-06 | S-02 | Global relevance check: O-01, S-02 and O-03 |
| NAV-04 | none | Clear local selection |
| ST-07 | none | Global synthesis: O-01 |

All hypothetical informational findings and Scenario conclusions remain unverified; the trace itself only identifies choices and operations. The same sequence can be represented under A by retaining Stage target references and, if desired, the NAV event log.

## 4. Executed synthetic structural check

A deterministic JS walk of the 11 fictional events (4 navigation selections, 7 Stages) checked five simple invariants:

1. Navigation selections alone do not produce a `PowerEvaluation` revision.
2. All seven Stages retain explicit targets in A.
3. Deriving targets **solely** from current Focus fails in ST-04, ST-06 and ST-07.
4. ST-04 requires both the Scenario and the pupils although Focus stays on pupils.
5. ST-06 includes affected pupils notwithstanding the Scenario Focus, as required by D-89.

**Result:** five authored assertions passed. These are transparent invariants of a deliberately constructed mock trace, not execution of the repository's PowerEvaluation or global model tests, nor proof that a real engine discovers relevant targets.

**Counterexamples:** ST-04 has two genuine targets despite one selected Focus; ST-06 examines the main Subject and affected Subject alongside S-02; ST-07 has no local Focus but remains a legitimate Stage. Conversely, ST-01 and ST-02 share the same selected S-02, illustrating the potential efficiency of persistent navigation state.

## 5. What this pilot supports and what it does not

- **No independent domain necessity demonstrated.** Architecture A can represent all seven operations without a standalone Focus construct, and can additionally preserve user selections with NAV events. Architecture B can support convenience and persistent user orientation. The difference mainly concerns usability, navigation state and trace encoding, not the Method's basic ability to analyze.
- **Separation of responsibilities is useful.** Selection controls attention; Stage defines operation; analytical dependency/revision machinery determines which evaluations to revisit. Switching the selected Focus does not alter actual Object states or a PowerEvaluation.
- **A single focus may be narrower than a Stage's actual context.** D-89 and multi-target stages prevent treating the selected entity as the sole allowable input; an operation must retain adequate explicit target/context references.
- **Analyst vs AI:** A manually selected navigation Focus may be distinguished from temporary internal attention changes during an AI investigation, but how to persist this distinction and how an analyst delegates control remain unvalidated.
- **No retroactive schema changes:** Do not rename or broaden `PowerEvaluation.Focus`; do not equate an optional navigation pointer with an Object or a mandatory Stage parameter. An existing `Focus` term in D-17 remains valid pending author decision.

## 6. Proposed interpretation for discussion (NOT validated)

Prefer **two separate levels without imposing a new top-level domain entity**:

1. **Analytical core:** Stages have the relevant targets/context of their operations; assessments and their dependencies are separate versioned records. Their exact transport schema is open.
2. **Optional Analyst navigation layer:** a selected `Focus` acts as a temporary Object/Scenario reference and a UI/session state that may carry provenance and user intent, with optional selection-event history. It may persist across several Stages and be cleared without terminating the analysis.

This is **not yet evidence that Focus merits permanent status as an independent conceptual primitive**. Compare with a plain selected-target UI pointer plus ordinary Stage references; inspect whether naming it Focus improves Analyst comprehension and control enough to justify the additional terminology.

## 7. Next discriminating tests

- Analyst switches Focus while a multi-target Stage is active: preserve target semantics and explicit approval/attention state.
- Multiple analysis branches and concurrent Analysts: determine whether current Focus is per Analyst/session/branch, not global to an Object.
- Focus points to an obsolete or historical Object/Scenario version: clarify that target identity, version and current applicability remain distinct.
- AI proposes a new focus while Analyst has an explicit selection: distinguish recommendation from actual manual selection.
- Low-stakes, no-Focus exploration: prove no mandatory extra label.
- Independent two-condition test comparing navigation without named Focus to navigation with optional Focus on the same frozen cases, with time, errors, trace retrieval and workload measured.

**Conclusion:** The experiment favors keeping Stage targets explicit and testing a **lightweight, optional Analyst navigation Focus**. The term's unique necessity and detailed formalization remain OPEN. No author approval or conceptual/model revision is inferred from this pilot.
