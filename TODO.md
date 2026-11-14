# TODO — Trialectic Method

**Working register** · Updated: November 14, 2026 · **30 open tasks** · Canonical reference: [`reference/trialectic-method.md`](reference/trialectic-method.md) · Branch: `dev`

This is a **work plan**, not a source of new conceptual validation. Changes to task descriptions and priorities are approved as tracking decisions only; unsettled concepts remain **OPEN** in the reference. The program follows the adopted Object / Subject / NEED / CAN / Focus architecture. Keep historical task IDs stable.

## Tracking rules and fields

1. At each author validation, record implications for the TODO and Decision Log. Do not silently change conceptual decisions or close tasks.
2. **Type** identifies whether the work is conceptual, experimental, protocol, comparison, tooling or governance. **Priority** reflects the revised sequence of work, not scientific certainty.
3. **Status** preserves earlier labels (`To develop`, `To resolve`, `To experiment`, `To investigate further`). No task is considered completed by merely documenting or simulating it.
4. **Dependencies** guide the order of work; some tasks can progress in parallel before upstream questions are completely resolved. Distinguish task dependencies from validated conceptual principles.
5. **Closure criterion** is a proposed measurable output, not evidence that the criterion has already been met. Independent review and explicit author approval are needed to close relevant conceptual tasks.
6. **Preliminary evidence** may document experiments, but distinguish synthetic-world results, implementation checks, controlled LLM comparisons and independent/real-world validation. Clearly mark evidence that has not been committed to the repository.
7. Git **tags** will identify released versions of the stable filename `reference/trialectic-method.md`; no tag is presumed created without verification.

## Priority overview

| Priority | Main objective | Tasks |
|---|---|---|
| P0 | Architecture, attribution, Power, reproducible simulation, counterexamples and computation budgets | T-30, T-01, T-02, T-05, T-15, T-03, T-16, T-18, T-21, T-24 |
| P1 | Comparative testing, scenario comparison, case corpus, semantic research, applied AI | T-04, T-17, T-19, T-25, T-27, T-06–T-14, T-20 |
| P2 | Supplementary Power measures, normative and distributive effects | T-22, T-23, T-29 |
| P3 | Practical tools and Git-based documentation | T-26, T-28 |

**Execution note:** Conceptual formalization and empirical evaluation should overlap. Do not interpret placement in P1 as a ban on early baseline measurements: they should start as soon as comparable protocols are available.


# P0 — Conceptual architecture and reproducible simulation

## T-30 · Operationalize the Object / Subject / NEED / CAN architecture
**Type:** Conceptual / protocol | **Priority:** P0 | **Status:** **To develop**

**Dependencies:** Foundational; coordinate with T-01, T-02, T-05, T-15.

**Scope:** Specify the five Object categories, Main and Secondary Subjects, Object boundaries and identity through change, Focus/Stage transitions (Subject → NEED or CAN → Actualization → Subject), partial inventories, intra-/inter-Object relations, Environment and accessible Objects. Preserve approved NEED definition, non-exclusive existential/structural categories, Power distinct from CAN mobilizability, and the limited use of Semantic Pyramids. Treat unsettled procedures as OPEN rather than validated.

**Closure criterion:** A versioned architectural specification defines the objects, relations, assumptions, and open issues; at least one worked NEED-focused and CAN-focused trace shows each Stage and Subject transition without contradicting validated concepts.

## T-01 · Formalize attribution and identification of NEEDs and CANs
**Type:** Conceptual / experimental | **Priority:** P0 | **Status:** **To experiment**

**Dependencies:** T-30 (shared Object model); coordinate with T-05.

**Scope:** Define independent tests for NEED necessity (existential, structural, or both), required state and evidence; separate need existence, satisfaction and epistemic uncertainty. Test CAN attribution by relevant current constitutive foundation, specificity and group/individual attribution; retain provisional tests A/B/C as hypotheses. Separate present CANs, developmental CANs, and external Conditions of Power.

**Closure criterion:** Operational criteria and explicit counterexamples distinguish NEED from a beneficial property, and attributable CAN from hypothetical future acquisition; independent reviewers can apply them to a held-out case set and disagreements are documented.

## T-02 · Formalize Conditions of Actualization and Power
**Type:** Conceptual / experimental | **Priority:** P0 | **Status:** **To resolve**

**Dependencies:** T-30, T-01.

**Scope:** Specify mobilization conditions (CAN effectively mobilizable) versus satisfaction conditions (NEED actually satisfied), cross-Object ownership of NEEDs, sufficient alternative pathways, uncertain conditions and negative Power. Preserve the validated rule that a mobilizable CAN does NOT necessarily have positive Power. Define valid NEED–CAN correspondences without conflating correspondence, mobilizability, satisfaction, Power and successful Actualization.

**Closure criterion:** An explicit condition-evaluation procedure produces consistent Power assessments on positive, negative, unknown and circular-dependency cases, including a mobilizable-CAN/negative-Power counterexample and a NEED owned by another Object.

## T-05 · Clarify boundaries and identities of Object types
**Type:** Conceptual / experimental | **Priority:** P0 | **Status:** **To resolve**

**Dependencies:** T-30; coordinate with T-01.

**Scope:** Distinguish Individuals, Groups, Technical Objects, Systems and Semantic Objects; address parts, composition, existential/structural NEEDs, actionable CANs and persistence of Object identity under change. Preserve experimental status of Semantic Objects as autonomous Subjects; do not conflate individual and collective CAN attribution.

**Closure criterion:** Category-specific boundary tests and counterexamples delimit each Object type and specify unresolved ambiguous cases rather than assigning a type by default.

## T-15 · Formalize Subject contextualization and Environment selection
**Type:** Conceptual / protocol | **Priority:** P0 | **Status:** **To resolve**

**Dependencies:** T-30, T-05; coordinate with T-03.

**Scope:** Specify selection of the Main Subject, scope of its Environment (relevant direct and indirect effects), directly accessible Objects, relevant properties and relations for a NEED or CAN Focus, and when to analyze Secondary Subjects. Reconsider the separate terminological status of Situated Subject without presuming it has been discontinued.

**Closure criterion:** A repeatable contextualization checklist yields traceable inclusion/exclusion justifications and consistent Subject/Environment selections on representative cases.

## T-03 · Make the analysis protocol reproducible
**Type:** Protocol / experimental | **Priority:** P0 | **Status:** **To develop**

**Dependencies:** T-30, T-01, T-02, T-15 (iterative interfaces).

**Scope:** Provide input schema, Stage/Focus traces, data provenance, evidence for NEED/CAN attribution, uncertain or missing relations, state transitions, selection of Secondary Subjects and analyst decision logs. Compare independent analysts and/or models on common cases; distinguish agreement in judgments from textual similarity.

**Closure criterion:** A documented protocol, case rubric and independent replicate study quantify agreement and clearly state unresolved discrepancies. Pilot-only executable checks do not satisfy the independent-reproducibility criterion.

**Preliminary evidence (not task closure):** Preliminary local pilot reported on 2026-11-14: 20 executable assertions and 60 action-order robustness tests; NOT independent human or multi-model replication; artifacts are not yet archived in this repository.

## T-16 · Generate NEED- and CAN-focused Resolution Scenarios
**Type:** Protocol / computational | **Priority:** P0 | **Status:** **To develop**

**Dependencies:** T-02, T-03; coordinate with T-18.

**Scope:** Generate multiple relevant scenarios using NEED–CAN links, alternative sufficient pathways, Secondary Subjects, circular dependencies and possible third-Object intervention. Support sequences, parallel and conditional Actualizations, resource requirements and both satisfied and unsatisfied NEED Focuses; avoid combinatorial explosion.

**Closure criterion:** Prototype outputs a traceable set of valid and materially distinct Scenarios on a held-out corpus, correctly reports unsatisfiable dependencies and identifies missing conditions. Negative and destructive effects are handled through T-18.

**Preliminary evidence (not task closure):** Preliminary local monotone dependency-graph planner demonstrated scenarios and third-Object breakouts; NOT a full implementation of the revised Method.

## T-18 · Reassess Scenarios and effects with non-monotone state transitions
**Type:** Experimental / computational | **Priority:** P0 | **Status:** **To experiment**

**Dependencies:** T-16, T-02; coordinate with T-24 and T-29.

**Scope:** Represent Actualizations that may satisfy OR invalidate NEEDs, create or remove CANs, change conditions, consume resources, affect multiple Objects, and produce direct/indirect or immediate/delayed effects. Reassess Power, environments and alternative paths after each transition. Distinguish predicted, observed and causally attributed changes, and empirical reassessment from simulation.

**Closure criterion:** A simulator passes reversible/non-monotone counterexamples and a reproducible comparison against an independent state-transition oracle; realistic evaluation plans keep observational claims separate.

**Preliminary evidence (not task closure):** Preliminary local test found a destructive-effect counterexample: a monotone planner falsely accepted a plan after an action destroyed a later prerequisite. This is an implementation limitation, not an established contradiction of the Method.

## T-21 · Operationalize recursive relevance and complexity management
**Type:** Computational / experimental | **Priority:** P0 | **Status:** **To develop**

**Dependencies:** T-03, T-16; coordinate with T-04.

**Scope:** Specify explicit exploration/stop criteria based on Focus relevance, possible impact, uncertainty, resource budgets and the cost of Secondary-Subject recursion. Measure growth with Objects, links, branching, depth, circularity and distractors; compare adaptive, fixed-depth and exhaustive search. Record missed high-impact effects.

**Closure criterion:** A documented stopping policy exhibits measurable cost/coverage trade-offs and reports cases where pruning loses a critical dependency.

**Preliminary evidence (not task closure):** Preliminary local monotone simulations with 240 paired instances found large state-search savings from relevance pruning against unfiltered breadth-first search; a generic heuristic also solved the same solvable cases, so no specifically trialectic gain was shown.

## T-24 · Test edge cases, falsifying examples and implementation failures
**Type:** Experimental / quality | **Priority:** P0 | **Status:** **To experiment**

**Dependencies:** T-01, T-02, T-03 (iterative); coordinate with T-18.

**Scope:** Build and maintain adversarial cases: already-satisfied NEEDs, mobilizable CAN/negative Power, cross-Object NEEDs, multiple sufficiency pathways, unbreakable circular dependencies, semantic versus empirical necessity, changing Object boundaries, non-monotone effects, contradictory evidence and analytic overload. Record conceptual contradictions separately from model or code defects.

**Closure criterion:** A versioned counterexample suite reports expected behaviors, confirmed failures, regressions and unresolved issues; critical cases are run after each reference or simulator change.

**Preliminary evidence (not task closure):** Preliminary local checks passed 20 selected assertions but exposed one non-monotone planning defect; these tests are not scientific or independent validation.


# P1 — Comparative evidence, semantics, scenarios and AI

## T-04 · Test comparative usefulness against non-trialectic analyses
**Type:** Comparative / experimental | **Priority:** P1 | **Status:** **To experiment**

**Dependencies:** T-03; initial experiments can run alongside T-16 and T-21.

**Scope:** Compare matched problems under free-form analysis, generic structured analysis, trialectic simple mode and trialectic advanced mode. Fix model/data, control information and compute budgets, anonymize outputs where possible, assess correctness, relevant coverage, scenario feasibility, critical errors and total costs including initial Object/NEED/CAN elicitation; compare both equal-budget and equal-quality targets.

**Closure criterion:** A pre-registered matched evaluation on held-out tasks reports effects and uncertainty, failure modes, per-problem results, and independent judging. Do not infer an original contribution solely from graph-search speed.

**Preliminary evidence (not task closure):** Preliminary local Python simulation: 60 base worlds × four distractor levels; both a generic heuristic and relevance-pruned graph search solved all 47 solvable base worlds at each level. NO controlled LLM-with/without-Method evaluation has been run.

## T-17 · Compare Resolution Scenarios under interacting constraints
**Type:** Comparative / protocol | **Priority:** P1 | **Status:** **To develop**

**Dependencies:** T-16, T-18; coordinate with T-23 and T-29.

**Scope:** Compare feasibility versus difficulty, temporality, expected effectiveness and broader consequences; test sequences, simultaneous actions, dependencies, resource competition, synergies, alternatives, robustness, compensations, and double counting. Reassess rankings when a Scenario changes the NEEDs, CANs or conditions of other Objects.

**Closure criterion:** A reproducible multicriteria comparison justifies rankings and tradeoffs, detects incoherent plans and reports instability under reasonable assumptions.

## T-19 · Identify problem classes where the Method adds value
**Type:** Comparative / experimental | **Priority:** P1 | **Status:** **To experiment**

**Dependencies:** T-04, T-27.

**Scope:** Compare performance on simple vs networked problems, social/technical/semantic contexts, uncertain states, multiple interacting Subjects, circular dependencies and destructive effects. Include no-benefit and harm cases; estimate quality gain relative to cost and a generic structured control.

**Closure criterion:** Results identify supported, unsupported and harmful use cases with replicable criteria and independent evaluation.

## T-25 · Compare relevant theoretical and algorithmic approaches
**Type:** Theoretical / comparative | **Priority:** P1 | **Status:** **To investigate further**

**Dependencies:** T-30; coordinate with T-04 and T-19.

**Scope:** Compare with capabilities/affordances, theory of constraints, systems thinking, graph search, planning and dependency analysis. Distinguish truly new contributions from generic graph-relevance filtering, alternative pathway reasoning or ordinary structured prompting.

**Closure criterion:** A comparison matrix of assumptions, operations, scope, empirical performance and differences is supported by primary sources and reproducible examples; originality is not asserted without evidence.

## T-27 · Assemble and maintain case-study and benchmark corpora
**Type:** Corpus / experimental | **Priority:** P1 | **Status:** **To develop**

**Dependencies:** T-03; coordinate with T-04, T-19 and T-24.

**Scope:** Build versioned synthetic and real-world cases across Object categories and Focus types, including solvable/unsolvable, harmful-side-effect and adversarial cases. Separate training/development from held-out evaluation; maintain consent/privacy safeguards and ground truth or expert-rubric provenance.

**Closure criterion:** A diverse, documented, versioned corpus has an independent holdout, case provenance, ground-truth or scoring rubrics, and documented known limitations.

## T-06 · Distinguish constitutive, significant and associated concepts
**Type:** Conceptual / experimental | **Priority:** P1 | **Status:** **To experiment**

**Dependencies:** T-30; coordinate with T-11 and T-01.

**Scope:** Test meaning-essential versus meaning-significant versus associated concepts without assuming these are automatically existential or structural NEEDs of non-semantic Objects.

**Closure criterion:** Discriminating tests and counterexamples distinguish the three relations with documented uncertainty.

## T-07 · Establish an independent criterion for identity of Meaning
**Type:** Conceptual / experimental | **Priority:** P1 | **Status:** **To resolve**

**Dependencies:** T-06; coordinate with T-12.

**Scope:** Characterize identity of Meaning without defining equivalence through the expected conclusion; handle expression variation and context.

**Closure criterion:** Independent semantic-identity criteria discriminate relevant positive and negative cases without circular assumptions.

## T-08 · Examine alternative and joint conceptual dependencies
**Type:** Conceptual / experimental | **Priority:** P1 | **Status:** **To resolve**

**Dependencies:** T-06, T-07.

**Scope:** Test whether a Meaning depends on alternative or jointly necessary concepts, separately from empirical NEED–CAN dependencies.

**Closure criterion:** Representative cases distinguish alternative, joint and redundant conceptual prerequisites.

## T-09 · Examine circular conceptual dependencies
**Type:** Conceptual / experimental | **Priority:** P1 | **Status:** **To resolve**

**Dependencies:** T-06, T-07; coordinate with T-08.

**Scope:** Investigate cycles of conceptual necessity, mutual definition and semantic identity. Do not automatically apply the third-Object intervention rule for causal NEED–CAN cycles to purely conceptual dependencies.

**Closure criterion:** A typology and controlled cases distinguish genuine circular constitution from mutual reference and non-essential association.

## T-10 · Examine direct and indirect constitutive dependencies
**Type:** Conceptual / experimental | **Priority:** P1 | **Status:** **To resolve**

**Dependencies:** T-06, T-08.

**Scope:** Identify direct versus mediated semantic dependencies and their importance in network representations; do not infer empirical causal links merely from semantic distance.

**Closure criterion:** Test cases identify nested dependencies and justify whether an indirect link is constitutive or merely significant.

## T-11 · Operationalize the Semantic Pyramid where appropriate
**Type:** Conceptual / protocol | **Priority:** P1 | **Status:** **To experiment**

**Dependencies:** T-06–T-10; coordinate with T-01.

**Scope:** Specify when a Semantic Pyramid is relevant for identifying candidate existential/structural NEEDs; maintain the distinction between conceptual dependencies of Semantic Objects and empirical conditions of existence/functioning for other Object types. Test hierarchy and structural importance without requiring the network to be a tree.

**Closure criterion:** A documented relevance criterion and procedure handle meaningful positive and negative use cases, including cases where a Pyramid should NOT be used.

## T-12 · Establish criteria for semantic equivalence
**Type:** Conceptual / experimental | **Priority:** P1 | **Status:** **To experiment**

**Dependencies:** T-07, T-08.

**Scope:** Distinguish expression variation, conceptual network variation, contextual equivalence and incompatibility.

**Closure criterion:** Blind or multi-analyst examples show explicit decisions and uncertainty on equivalence.

## T-13 · Reconstruct individual Semantic Pyramids
**Type:** Protocol / experimental | **Priority:** P1 | **Status:** **To experiment**

**Dependencies:** T-11, T-12.

**Scope:** Investigate methods for partial reconstruction of an individual's Semantic Landscape, keeping subject statements apart from analyst projections, and specifying when reconstruction is inappropriate or too costly.

**Closure criterion:** A documented evidence-based reconstruction process is applied to consented examples with recorded disagreements and limitations.

## T-14 · Clarify Plasticity and Semantic Plasticity under NEED/CAN changes
**Type:** Conceptual / experimental | **Priority:** P1 | **Status:** **To resolve**

**Dependencies:** T-30, T-01; coordinate with T-18.

**Scope:** Separate Plasticity (aptitude to change CANs) from actual changes, semantic transformations and potential changes of NEEDs or Object identity. Treat any extension of the validated Plasticity definition to NEEDs as OPEN until approved.

**Closure criterion:** Examples and counterexamples delimit which transformations affect CANs, NEED satisfaction, attribution, Semantic Landscape and the Object's identity without silently redefining Plasticity.

## T-20 · Design adaptive trialectic dialogue for AI
**Type:** Applied / experimental | **Priority:** P1 | **Status:** **To develop**

**Dependencies:** T-03, T-15; coordinate with T-04.

**Scope:** Support clarification and revision of a NEED or CAN Focus, Main/Secondary Subjects, uncertainty and missing evidence; assess conversational economy, usefulness and user control without treating exploratory claims as validated diagnoses.

**Closure criterion:** A runnable dialogue prototype and matched conversation tests measure correctness, cognitive burden, cost and utility, with explicit user controls.


# P2 — Complementary measures and normative questions

## T-22 · Specify complementary measures of Power without redefining it
**Type:** Conceptual / quantitative | **Priority:** P2 | **Status:** **To resolve**

**Dependencies:** T-02; coordinate with T-17.

**Scope:** Retain binary positive/negative Power and separate uncertain assessment; evaluate optional measures of readiness, difficulty, prospects of success or resource cost. Never replace Power with CAN mobilizability or collapse a NEED's satisfaction into an aggregate score.

**Closure criterion:** Any proposed scale is defined, calibrated, demonstrably not equivalent to probability or binary Power, and tested against counterexamples.

## T-23 · Formalize normative trade-offs among Objects and Subjects
**Type:** Normative / conceptual | **Priority:** P2 | **Status:** **To resolve**

**Dependencies:** T-17, T-29.

**Scope:** State explicit evaluation criteria for conflicts, acceptable harm, constraints on exclusion/exploitation/superiority, alternatives and compensation. Separate normative priorities from descriptive dependencies and do not assume one universal weighting.

**Closure criterion:** A comparative decision protocol identifies whose NEEDs and CANs are affected, justifies criteria and acknowledges irreducible conflicts.

## T-29 · Evaluate distributive effects of Actualizations on NEEDs, CANs, Potency and Power
**Type:** Normative / experimental | **Priority:** P2 | **Status:** **To resolve**

**Dependencies:** T-18, T-17; coordinate with T-23.

**Scope:** Evaluate how Actualizations change NEED satisfaction and attributed CANs for different Objects, in addition to Potency and Power; examine indirect and delayed harm, inequality, acceptable harm thresholds, mitigation and possible compensation without assuming benefits for one Object offset every loss to another.

**Closure criterion:** Multi-Object case analyses trace distributive effects, identify uncertainty and show how different explicit normative criteria affect judgments.


# P3 — Practical tooling and version governance

## T-26 · Create practical tools and use modes
**Type:** Tooling / design | **Priority:** P3 | **Status:** **To develop**

**Dependencies:** T-03, T-16; coordinate with T-20.

**Scope:** Create usable simple/advanced analysis templates, data schemas, diagrams, decision aids, error checking and accessible output formats based on the stable canonical reference.

**Closure criterion:** Working tools demonstrate both NEED- and CAN-focused analyses on representative cases and document limitations.

## T-28 · Maintain the reference, TODO, decisions and Git tag-based releases
**Type:** Governance / tooling | **Priority:** P3 | **Status:** **To develop**

**Dependencies:** Ongoing; coordinate with all tasks.

**Scope:** Keep `reference/trialectic-method.md` as the canonical English reference, track changes in DECISIONS.md and TODO.md, preserve validated/formalization/open distinctions, define tag naming/release procedure and create tags explicitly on intended commits when authorized. Record test artifacts/version provenance without treating draft findings as approval.

**Closure criterion:** A documented workflow makes every decision and release reproducible with immutable Git commit/tag references and consistent links. No tag is claimed created until verified.

# TODO history

- 2026-11-13 — Consolidated initial task register and subsequent experimental, AI, documentation and distributive-effects workstreams (T-19, T-20, T-28, T-29).
- 2026-11-14 — Adopted English as the working reference language; GitHub became the sole active documentation repository.
- 2026-11-14 — Added T-30 and consolidated the validated Object / Subject / NEED / CAN / Focus restructuring (D-17–D-22); no research task closed.
- 2026-11-14 — Switched to the stable `reference/trialectic-method.md` filename and decided to use Git tags for version snapshots (D-23). Historical reference files remain available in Git history.
- 2026-11-14 — Restructured **all 30 existing tasks** without renumbering or closing any. Extended T-01 to NEEDs and CANs; reinforced T-02; reframed T-15 and T-30; reprioritized protocol, non-monotone simulation, complexity control and counterexamples; updated semantic, scenario and normative scopes; added type, dependencies and proposed closure criteria. The local pilot's reported findings are recorded as **preliminary, not independently validated**. New conceptual definitions were not approved by this tracking change.

# Known limits of the current test evidence

A local exploratory report in the conversation (November 14, 2026) describes 20 passing executable checks, 200 exploratory synthetic worlds, and 240 paired synthetic instances. Its main limitation is a **monotone simulator**, with a non-monotone counterexample discovered. A generic heuristic matched relevance-pruned graph search on the solvable pilot instances; **no Method-specific quality benefit or controlled LLM-with/without-Method advantage was demonstrated**. These pilot files have **not** been placed in this GitHub repository, and these findings are not scientific validation. Related tasks: T-03, T-04, T-16, T-18, T-21, T-24, T-27.
