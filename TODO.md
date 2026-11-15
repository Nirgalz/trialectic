# TODO — Trialectic Method

**Working register** · Updated: November 15, 2026 · **30 open tasks** · Canonical reference: [`reference/trialectic-method.md`](reference/trialectic-method.md) · Branch: `dev`

This is a **work plan**, not a source of new conceptual validation. Changes to task descriptions and priorities are approved as tracking decisions only; unsettled concepts remain **OPEN** in the reference. The program follows the adopted Object / Subject / NEED / CAN / Definition / Focus architecture. Keep historical task IDs stable.

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
| P0 | Object identity and Definitions, NEED/CAN identification, Power, reproducible simulation, counterexamples and computation budgets | T-30, T-01, T-02, T-05, T-15, T-03, T-16, T-18, T-21, T-24 |
| P1 | Comparative testing, scenario comparison, case corpus, semantic research, applied AI | T-04, T-17, T-19, T-25, T-27, T-06–T-14, T-20 |
| P2 | Supplementary Power measures, normative and distributive effects | T-22, T-23, T-29 |
| P3 | Practical tools and Git-based documentation | T-26, T-28 |

**Execution note:** Newly approved T-30 principles do not close any task; the exact CAN actionable / Power relationship, 'attributable CAN' status, necessity tests and simulation propagation algorithms remain OPEN. Conceptual formalization and empirical evaluation should overlap. Do not interpret placement in P1 as a ban on early baseline measurements: they should start as soon as comparable protocols are available.


# P0 — Conceptual architecture and reproducible simulation

## T-30 · Operationalize Object identity, Definitions, branching and NEED/CAN/Focus architecture
**Type:** Conceptual / protocol | **Priority:** P0 | **Status:** **To develop**

**Dependencies:** Foundational; coordinate with T-01, T-02, T-05, T-15.

**Scope:** Integrate D-47 source-method- and claim-specific methodological reviews with D-46 typed versioned claims/evidence/assessments, without confusing the satisfaction of a review criterion with the truth of a CAN/NEED claim. Distinguish provenance/relevance/independence of pieces of evidence, production quality, probative sufficiency, conflicting evidence and scoped contexts. Avoid pseudo-numeric confidence aggregation; proportion checks to risk without changing claim truth. The Python sample uses a provisional family-check registry, exact-context comparator and stakes-check planner, **none author-approved as final schema or universal policy**. Resolve canonical review IDs, real evidence-quality standards, branch/time consistency, expert validation and CI.

**Closure criterion:** An explicitly versioned architecture specification and worked NEED- and CAN-focused examples show IDs, Definition versions, Parent/Children lineage, isolated simulations, actualization, shared references, history, qualified uncertainty and Stage transitions. All unresolved semantics and failure cases are listed; independent review confirms compliance with the validated principles.

**D-47 real-source pilot 2026-11-15 (experimental, not task closure):** Evidence-layer pilot disclosed that the current code's all-criteria gate and simple empirical premise rule do not model reported mathematical proof claims or method-specific inapplicability well. Proposed future design must separate documentary report, evidential appraisal, causal sufficiency and decision use, subject to new author approval. Do not standardize current JSON/logic or claim scientific validation from the 162 passed checks. See `reference/D47-real-sources-pilot.md`.

**D-47 layered reading experiment 2026-11-15 (not a validated decision):** An experimental four-register representation separates documentary publication reporting, methodological examination, independent empirical support and causal/formal establishment. Source report claims must not be treated as verified causal conclusions; a manuscript that reports a Coq proof does not mean this program reran Coq. Provisional justified non-applicability is distinct from unknown methodological criterion status. **No new JSON schema or author-approved D-48**; final identities, source evidence audit, and normative applicability/quality rules remain OPEN. See `reference/D47-reading-layers-pilot.md`.

## T-01 · Formalize identification of NEEDs and contextually relevant CANs
**Type:** Conceptual / experimental | **Priority:** P0 | **Status:** **To experiment**

**Dependencies:** T-30 (shared Object model); coordinate with T-05.

**Scope:** Test D-47 method-sensitive assessment of the evidence supporting NEED/CAN identification: separate assertions about source Objects from source production quality, applicable methodological checks, and claim-specific probative adequacy. Consider measurement, experimental, statistical, simulation and formal evidence as relevant without a universal hierarchy or default inferred causal truth. Verify source provenance and contextual applicability before asserting structural or causal NEED/CAN properties. Synthetic D-47 cases are not a replacement for independent expert appraisal.

**Closure criterion:** Operational identification criteria support documented synthetic and held-out examples; independent reviewers distinguish conceptual/functional necessity, evidence gaps and contextually relevant CANs, including group/system examples. The need for any separate 'attributable CAN' status is explicitly resolved before closure.

## T-02 · Define CAN actionability, NEED satisfaction and complete Power conditions
**Type:** Conceptual / experimental | **Priority:** P0 | **Status:** **To resolve**

**Dependencies:** T-30, T-01.

**Scope:** Apply D-47 criteria to claims about actionability, Power, NEED satisfaction and causal or conditional sufficiency, separately checking the methodology of supporting information and its probative role in the specific claim. An internally valid model, precise measurement, statistical association or reproducible simulation does not establish causal truth. Preserve D-40 three-state condition evaluations as separate from methodological compliance checks, D-41 incomplete pathway coverage and D-35 temporal NEED satisfaction. Increase verification depth with decision stakes without treating risk as proof strength.

**Closure criterion:** A documented model with explicit counterexamples shows when actionability does or does not settle Power, separates NEED satisfaction from matching, and handles unknown and circular pathways. Statistical estimation method and its limits are specified without ungrounded numerical certainty.

## T-05 · Clarify boundaries and identities of Object types
**Type:** Conceptual / experimental | **Priority:** P0 | **Status:** **To resolve**

**Dependencies:** T-30; coordinate with T-01.

**Scope:** Test boundaries and identities of Individuals, Groups, Technical Objects, Systems and Semantic Objects using their permanent IDs, versioned Definitions and existential/structural constituent Objects. Distinguish conceptual from functional existence and Object lineage (Parent) from composition (Definition). Examine shared constituent references, history, contradictory branches and the special status of CANs optionally modeled as conceptual Objects.

**Closure criterion:** Category-sensitive tests document which Definition changes preserve Object ID, which contradictory changes create descendants, and when a constituent is necessary for conceptual or functional existence; ambiguous cases and the status of semantic Objects are explicitly retained.

## T-15 · Formalize Subject contextualization and Environment selection
**Type:** Conceptual / protocol | **Priority:** P0 | **Status:** **To resolve**

**Dependencies:** T-30, T-05; coordinate with T-03.

**Scope:** Select the focal Subject as the Object receiving the Method's or analyst's attention; initially identify its relevant existential/structural constituent Objects within its Environment, then extend the Definition and context recursively when needed. Distinguish constituent Objects, indirectly relevant Environment and directly accessible Objects; define when to analyze Secondary Subjects, CAN Objects and shared constituents. The distinct terminological status of Situated Subject remains OPEN.

**Closure criterion:** Case traces justify initial identification, contextual Definition expansion and Subject/Environment choices, including transitions to shared constituents and Secondary Subjects, without conflating conceptual and functional necessity.

## T-03 · Make the analysis protocol reproducible
**Type:** Protocol / experimental | **Priority:** P0 | **Status:** **To develop**

**Dependencies:** T-30, T-01, T-02, T-15 (iterative interfaces).

**Scope:** Normalize the D-47 method-specific checks and their assessed compliance, distinct from D-46 claim/evidence evaluations, source and methodological provenance, applicable context and probative sufficiency. Support mixed method families, indeterminate missing methodological information and bodies of evidence with shared source roots, contradictory findings, complementary methods and context differences. Preliminary standard-library synthetic experiment passed **612/612 assertions**, including 243 exhaustive ternary criteria combinations and 24 source permutations; outcomes were byte-identical on archive extraction/rerun. **OPEN:** expert-certified source checklists, real-source auditing, nuanced transportability, causal sufficiency, normative JSON, independent replication and CI.

**Closure criterion:** Independent reproductions agree on graph identities, versioned snapshots, temporary vs actualized branches, shared-reference propagation and relevant decisions; any divergent interpretations and unresolved operational definitions are documented.

**Preliminary evidence (not task closure):** Preliminary local pilot reported on 2026-11-14: 20 executable assertions and 60 action-order robustness tests; NOT independent human or multi-model replication; artifacts are not yet archived in this repository.

**D-47 real-source pilot 2026-11-15 (experimental, not task closure):** A documentary corpus of five published research cases, ten source notices and ten scoped/overextended claim probes was evaluated by the unchanged D-47 engine. 162/162 internal checks passed, but all ten claim verdicts were indeterminate, including all five source-aligned narrow statements. Inadequate review coverage is **not scientific accuracy**. Exact method-check conjunction, nonapplicability, source-specific claim type, temporal context and independent expert labels remain OPEN. See `reference/D47-real-sources-pilot.md`.

**D-47 layered reading experiment 2026-11-15 (not a validated decision):** A reproducible adapter distinguishes source-attributed documentary reports, methodological review, independent empirical evidence and causal/formal verification, without replacing D-31 epistemic statuses. It reuses the same ten claims and five cases; 320/320 internal checks passed. Five prior manual source-report witnesses are recorded, all ten empirical statuses remain unadjudicated, and Coq was not executed. Keep context/source applicability, qualified `not_applicable`, reliable manual source extraction and versioning OPEN. See `reference/D47-reading-layers-pilot.md`.

## T-16 · Generate NEED- and CAN-focused Resolution Scenarios
**Type:** Protocol / computational | **Priority:** P0 | **Status:** **To develop**

**Dependencies:** T-02, T-03; coordinate with T-18.

**Scope:** Select Scenario hypotheses and verification steps under D-47 by examining actual methodological reliability and what evidence can discriminate the competing causal possibilities; do not infer a CAN's actionability from only internally consistent models or statistical associations. Synthesize conflicting and complementary evidence without arbitrary scores, track dependent sources and uncertainty, proportion work to consequences and recursive relevance. Preserve D-46 audit histories, D-45 conflict handling, D-31 necessity/sufficiency, D-35 temporal compliance and documented pathway-inventory limitations.

**Closure criterion:** A reproducible prototype finds and evaluates distinct one-CAN, joint-CAN and enabling-CAN pathways, reports missing conditions, and can expand beyond an incomplete initial inventory when justified. Include counterexamples for undiscovered valid relations, no-result versus context-specific infeasibility, false matching and temporal violations despite satisfied final states, without claiming continuity at unsupported temporal resolution. Retain temporary simulation histories and independent comparisons.

**Preliminary evidence (not task closure):** Preliminary local monotone dependency-graph planner demonstrated scenarios and third-Object breakouts; NOT a full implementation of the revised Method.

## T-18 · Reassess Scenarios and effects with non-monotone state transitions
**Type:** Experimental / computational | **Priority:** P0 | **Status:** **To experiment**

**Dependencies:** T-16, T-02; coordinate with T-24 and T-29.

**Scope:** Extend D-46 epistemic timeline with D-47 contextual methodological evidence reviews: separately track methodological criteria satisfaction and target-claim probative adequacy, retain disputed and cross-context evidence without merging inapplicable findings, and allow updates when real review results or source provenance change. Never turn a methodological-status revision into a physical Object state transition or silently change past Scenario evaluations. Investigate quality reviews over time, source retraction, temporal transportability and high-stakes contexts, beyond synthetic source labels.

**Closure criterion:** An independent transition oracle checks historically immutable snapshots, shared component changes, branch isolation/promotion, non-monotone and delayed effects, and both final-state and interval/continuity-specific NEED satisfaction. Report indeterminate temporal compliance when internal action effects cannot be resolved.

**Preliminary evidence (not task closure):** Preliminary local test found a destructive-effect counterexample: a monotone planner falsely accepted a plan after an action destroyed a later prerequisite. This is an implementation limitation, not an established contradiction of the Method.

## T-21 · Operationalize recursive relevance and complexity management
**Type:** Computational / experimental | **Priority:** P0 | **Status:** **To develop**

**Dependencies:** T-03, T-16; coordinate with T-04.

**Scope:** Operationalize recursive relevance and stopping criteria for exploring **known** dependencies and discovering **unrecorded** NEED–CAN links and Objects within appropriately expanded Definitions/Environment. Account for attention, uncertainty, evidence quality, likelihood and severity of missed consequences, combinatorial growth, competing Scenarios, historical versions and temporal monitoring cost. Report when no solution was identified **without** implying absence of any possible solution.

**Closure criterion:** Cost/quality analysis demonstrates safe or documented trade-offs under shared-component propagation, competing branches and recursive Subject changes, and identifies cases where pruning misses important effects.

**Preliminary evidence (not task closure):** Preliminary local monotone simulations with 240 paired instances found large state-search savings from relevance pruning against unfiltered breadth-first search; a generic heuristic also solved the same solvable cases, so no specifically trialectic gain was shown.

## T-24 · Test edge cases, falsifying examples and implementation failures
**Type:** Experimental / quality | **Priority:** P0 | **Status:** **To experiment**

**Dependencies:** T-01, T-02, T-03 (iterative); coordinate with T-18.

**Scope:** Build CI adversarial D-47 regression cases for (1) precise but causally irrelevant measurements, (2) experiments with defective controls, (3) association-vs-causation, (4) reproducible but empirically unvalidated simulations, (5) formal proofs from unsupported premises, (6) repeated-source publications falsely counted as independent, and (7) apparent contradiction across non-comparable contexts. Test five overlapping method families, missing and unsatisfied methodological requirements, separation of quality from probative adequacy, nonaggregation and evidence provenance, and stakes-invariant claim status. Pilot **612/612 synthetic assertions**, 243 ternary configurations checked against a separate rule and 24 provenance-order permutations, byte-for-byte reproduced after extracting ZIP. **OPEN:** expert-adjudicated real-world corpus, independently authored reference outcomes, empirical proof criteria, CI integration and D-35 conditions.

**Closure criterion:** A versioned suite has explicit expected outputs for branch promotion, shared Objects, historical versions, actionability/Power and uncertainty, with regression reports and unresolved conceptual disagreements.

**Preliminary evidence (not task closure):** Preliminary local checks passed 20 selected assertions but exposed one non-monotone planning defect; these tests are not scientific or independent validation.


# P1 — Comparative evidence, semantics, scenarios and AI

**D-47 real-source pilot 2026-11-15 (experimental, not task closure):** Five publication-based methodological families examined (pulse oximetry, vitamin C Cochrane review, ecological chocolate/Nobel analysis, Google Flu Trends, Coq formal proof). The D-47 engine declined to promote five annotated overextensions, **but also failed to recognize any of five narrow source-aligned reports as plausible**; 162 internal assertion checks passed. No raw-study replication, independently blinded expert labels or statistically meaningful AI quality benchmark. Add adversarial tests for `not_applicable` vs missing criteria, report-vs-empirical support, context transportability and overconservative evidence exclusion. See `reference/D47-real-sources-pilot.md`.

**D-47 layered reading experiment 2026-11-15 (not a validated decision):** Tested 320 software invariants (including 120 permutations, claim-source ID failures, label-leakage prevention, fake causal attribution and review/empirical separation). Original D-47 remains ten indeterminate; the new adapter restores five **manually annotated** source-attribution notices WITHOUT promoting empirical truth. The sample and results were reexecuted byte-identically from ZIP; this is not independent accuracy validation. Add regression cases for source-excerpt verification, uncertain applicability, scope transport and source retractions. See `reference/D47-reading-layers-pilot.md`.

## T-04 · Test comparative usefulness against non-trialectic analyses
**Type:** Comparative / experimental | **Priority:** P1 | **Status:** **To experiment**

**Dependencies:** T-03; initial experiments can run alongside T-16 and T-21.

**Scope:** Compare the **default trialectic Advanced Mode** against free-form and generic structured controls using matched problems, information, compute budgets and independent scoring. Measure relevant scenario diversity, accuracy of consequences and dependencies, feasibility/cost/complexity separation, uncertainty calibration and total cost of building and maintaining versioned Definitions. **Simple Mode evaluation is deferred** until usefulness is reconsidered after Method stabilization; do not include it as a presently implemented or required comparison arm.

**Closure criterion:** Controlled and independently judged matched comparisons of the default Advanced Mode with appropriate non-trialectic baselines report effect estimates, uncertainty, errors, per-case coverage and generation/evaluation costs; no distinct Method-specific benefit is asserted without evidence.

**Preliminary evidence (not task closure):** Preliminary local Python simulation: 60 base worlds × four distractor levels; both a generic heuristic and relevance-pruned graph search solved all 47 solvable base worlds at each level. NO controlled LLM-with/without-Method evaluation has been run.

## T-17 · Compare Resolution Scenarios under interacting constraints
**Type:** Comparative / protocol | **Priority:** P1 | **Status:** **To develop**

**Dependencies:** T-16, T-18; coordinate with T-23 and T-29.

**Scope:** Assess each Scenario through separate feasibility, feasibility uncertainty, complexity, cost/resources, temporality, effectiveness, success/consequence uncertainty and effects on the focal Subject and relevant Environment Objects. **[D-35]** Display per-NEED **effective satisfaction** and **temporal compliance** independently, along with adverse effects and applied exceptions: conformity must not mask observed or simulated non-satisfaction. Report the evidence/uncertainty associated with each assessment, while respecting D-34 constraint contradiction diagnostics. Compare non-monotone, delayed and cross-Object impacts; do not impose a universal best Scenario or a mandatory aggregate score. Optional selection requires explicit decision criteria.

**Closure criterion:** Reproducible evaluation reports for multiple Scenarios present their trade-offs, qualified probability/uncertainty, coherence and affected Objects without assuming a unique optimum; any optional ranking is labeled with the governing decision criteria and its instability.

## T-19 · Identify problem classes where the Method adds value
**Type:** Comparative / experimental | **Priority:** P1 | **Status:** **To experiment**

**Dependencies:** T-04, T-27.

**Scope:** Identify where **default Advanced Mode** adds value to problem understanding and multiple-Scenario exploration versus generic baselines, particularly for networked problems, interacting Subjects, circular dependencies, adverse effects and uncertain consequences. Include no-benefit and harmful cases; measure analysis quality and compute burden, not presumed ability to select one 'best' solution.

**Closure criterion:** Results identify supported, unsupported and harmful use cases with replicable criteria and independent evaluation.

## T-25 · Compare relevant theoretical and algorithmic approaches
**Type:** Theoretical / comparative | **Priority:** P1 | **Status:** **To investigate further**

**Dependencies:** T-30; coordinate with T-04 and T-19.

**Scope:** Compare with capabilities/affordances, theory of constraints, systems thinking, graph search, planning and dependency analysis. Distinguish truly new contributions from generic graph-relevance filtering, alternative pathway reasoning or ordinary structured prompting.

**Closure criterion:** A comparison matrix of assumptions, operations, scope, empirical performance and differences is supported by primary sources and reproducible examples; originality is not asserted without evidence.

## T-27 · Assemble and maintain case-study and benchmark corpora
**Type:** Corpus / experimental | **Priority:** P1 | **Status:** **To develop**

**Dependencies:** T-03; coordinate with T-04, T-19 and T-24.

**Scope:** Maintain versioned synthetic and real-world case corpora with permanent Object IDs, shared constituents, historical Definitions, branching and conceptual/functional necessity. Include cases with **multiple non-dominated Scenarios**, separable feasibility/complexity/cost, probability or qualitative uncertainty of effects, and no justified uniquely best Scenario, plus held-out evaluation sets and provenance.

**Closure criterion:** The corpus includes documented branch history and shared-component ground truth or expert rubrics, reproducible traces and a held-out evaluation set.

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

**Scope:** Separate Plasticity as aptitude for CAN evolution from actual Definition changes, semantic transformation, NEED satisfaction, emergence/disappearance of CANs and branching of Object identity. A CAN may be a conceptual Object when relevant. Extending Plasticity to NEED changes remains OPEN.

**Closure criterion:** Worked cases distinguish changes in the same Object's versioned Definition from contradictory branches and from mere discovery or uncertainty revision, without silently changing the validated Plasticity concept.

## T-20 · Design adaptive trialectic dialogue for AI
**Type:** Applied / experimental | **Priority:** P1 | **Status:** **To develop**

**Dependencies:** T-03, T-15; coordinate with T-04.

**Scope:** Design AI dialogue for the **default Advanced Mode**: identify NEED/CAN Focus and relevant Subjects; expose multiple evaluated Scenarios and their impacts, distinguish feasibility uncertainty from success and consequence probabilities, enable exploration of assumptions and uncertain claims, and support Definition expansion and branch history. Do not require automated ranking or include a working Simple Mode before its usefulness is reassessed after stabilization.

**Closure criterion:** A prototype enables users to inspect and compare distinct Scenario alternatives and trace consequences and uncertainty without fabricating observations, imposing one best Scenario or confusing temporary branches with actualized Objects.


# P2 — Complementary measures and normative questions

## T-22 · Specify complementary measures of Power without redefining it
**Type:** Conceptual / quantitative | **Priority:** P2 | **Status:** **To resolve**

**Dependencies:** T-02; coordinate with T-17.

**Scope:** Retain binary Power when conditions are known, explicitly represent indeterminate assessments, and investigate statistically supported evaluation of probability of **positive Power** separately from probability of **successful Actualization**. Respect current CAN actionable terminology and specify relation to complete sufficient pathways; avoid uncalibrated numerical confidence.

**Closure criterion:** Statistical and non-statistical measures are clearly named, justified and tested with counterexamples showing distinct actionability, positive Power and outcome uncertainty.

## T-23 · Formalize normative trade-offs among Objects and Subjects
**Type:** Normative / conceptual | **Priority:** P2 | **Status:** **To resolve**

**Dependencies:** T-17, T-29.

**Scope:** State explicit evaluation criteria for conflicts, acceptable harm, constraints on exclusion/exploitation/superiority, alternatives and compensation. Separate normative priorities from descriptive dependencies and do not assume one universal weighting.

**Closure criterion:** A comparative decision protocol identifies whose NEEDs and CANs are affected, justifies criteria and acknowledges irreducible conflicts.

## T-29 · Evaluate distributive effects of Actualizations on NEEDs, CANs, Potency and Power
**Type:** Normative / experimental | **Priority:** P2 | **Status:** **To resolve**

**Dependencies:** T-18, T-17; coordinate with T-23.

**Scope:** Assess how Actualizations update Definitions of affected and shared constituent Objects, altering NEED satisfaction and CANs, including conceptual versus functional states. Compare distributive effects across Subjects and branching alternative Scenarios, including uncertainty, indirect/delayed harm and compensation.

**Closure criterion:** Multi-Object case analyses trace effects through shared references and distinguish simulated distributional outcomes from observed ones.


# P3 — Practical tooling and version governance

## T-26 · Create practical tools and use modes
**Type:** Tooling / design | **Priority:** P3 | **Status:** **To develop**

**Dependencies:** T-03, T-16; coordinate with T-20.

**Scope:** Focus on **tools for the default Advanced Mode**, including multi-Scenario exploration/comparison, Definition editors, stable IDs, Parent/Children lineage, isolated simulations, shared constituents, uncertainty presentation and NEED/CAN Focus views. **Defer Simple Mode design and evaluation** until the Method is stabilized and its usefulness reassessed; do not treat it as a current deliverable.

**Closure criterion:** Advanced Mode tools demonstrate a transparent multi-Scenario, versioned-Definition workflow with correct state separation and understandable trade-offs; any later Simple Mode is a new separately evaluated decision.

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

- 2026-11-15 — Integrated author-validated T-30 decisions (D-25–D-27): permanent Object IDs; provisional versioned Definitions with constituent Object lists **and** associated properties/relations; Parent, Temporary Children and Actualised Children; stable-ID branch promotion; isolation of simulation; shared-Object propagation; conceptual/functional existence; contextually selected CANs and optional CAN conceptual Objects; actionable terminology; and statistical Power uncertainty. Updated 18 existing task descriptions and closure criteria. No task closed, no new ID created.

- 2026-11-15 — Adopted **Advanced Mode as default** (D-28): generate and evaluate multiple relevant Scenarios without a mandatory best-solution selection; distinguish feasibility, complexity, cost, temporality, expected effectiveness and appropriately supported uncertainty (feasibility, success and specific effects). **Simple Mode suspended** until the Method is stabilized. Updated the existing comparative, protocol, scenario, corpus, AI and tooling tasks; no tasks closed.

- 2026-11-15 — Validated **NEED–CAN-driven Scenario generation** (D-29): search the focal Subject and Environment for alternative or complementary CANs addressing unsatisfied NEEDs; keep non-actionable CANs in conditional candidate Scenarios with missing conditions documented; recursively seek support for those conditions. Preserve CAN-focused and already-satisfied-NEED paths. Refined T-16, T-02 and T-24; all tasks remain OPEN.

- 2026-11-15 — D-30 validated the **three distinct scenario-pathway cases**: one CAN conditionally sufficient for NEED satisfaction, several CANs jointly necessary, and a CAN enabling another CAN's actionability without directly satisfying the NEED. The criteria of sufficiency and empirical verification remain OPEN. Updated T-16, T-02 and T-24 without closing tasks.

- 2026-11-15 — D-31 validated four NEED–CAN relation levels (correspondence, contribution, conditional sufficiency and Scenario-relative necessity), distinction between within-Scenario and across-known-Scenarios necessity, five verification questions, OR/AND/enabling-path notation and four epistemic support categories. Updated T-16, T-02, T-03 and T-24; specific causal and sufficiency tests remain OPEN.

- 2026-11-15 — D-32 validated **temporal satisfaction requirements** for NEEDs (including continuous compliance, not merely a final state), recursive discovery of missing NEED–CAN links by extending contextual Definitions/Environment, and the distinction between no solution identified, hypothetical candidates and contextual infeasibility. The common NEED/CAN temporal data structure is only **PROPOSED**, awaiting explicit author approval. Updated T-16, T-18, T-03, T-24 and T-21; all remain OPEN.

- 2026-11-15 — D-33 **validated** the common NEED/CAN `temporal` format (`time_zone`, `requirements`, `estimates`), its five modes (point, continuous, deadline, recurring, cumulative), ISO 8601 timestamps/durations and half-open interval convention, with Scenario-specific evaluation stored separately. Detailed combination, recurrence and schema-verification semantics remain OPEN; refined T-03, T-16, T-18, T-24. All tasks remain OPEN.

- 2026-11-15 — D-34 validated temporal requirement **conjunction by default**, explicit `all`/`any` composition and example JSON, justified/versioned exceptions, detection of incompatible requirements separately from Scenario non-satisfaction, three-valued aggregation, and no double-counting overlapping intervals in cumulative time. Detailed schema for exceptions/nesting, recurrence and time-zone edge cases remains OPEN. T-03, T-16, T-18 and T-24 updated; all tasks still OPEN.

- 2026-11-15 — D-35 validated **separate assessments of effective NEED satisfaction and temporal compliance** per Scenario. An authorized exception may preserve compliance but does not alter the observed/simulated state, consequences or NEED itself. The accepted illustrative Scenario JSON keeps the two results, evidence/uncertainty and applied exception IDs separate from versioned Object Definitions. Updated T-03, T-16, T-17, T-18 and T-24; all tasks remain OPEN.

- 2026-11-15 — D-36 revised the NEED/CAN **data model** to origin-anchored typed relational records (`ID`, `Type`, nullable `NEEDs` and `CANs` lists of **Object references**, `OriginObject`), allowing one or multiple other Object participants without a separate `TargetObject`. No AND/OR, sufficiency or causal assumptions are implied by list membership. Updated T-30, T-01, T-03 and T-16 to reconcile the former property model and test unresolved identity, recursion and cardinality semantics; all tasks remain OPEN.

- 2026-11-15 — D-37 validated adding structured `relation` to origin-anchored NEED/CAN records: origin classification (NEED existential/structural/functional; CAN contributive/enabling/inhibitory/transformative), per-referenced-Object link semantics, and contextual alternative/complementary/substitutive/sequential/synergistic/antagonistic/reciprocal relationships. The user approved `relation.nature` and Object-group `relation.composition` in the example, and the design recommendation to keep distinct per-link roles; **exact per-link schema not yet validated**. This does not replace D-31 causal or sufficiency tests and is distinct from D-34 temporal composition. Updated T-30, T-01, T-02, T-03, T-16 and T-24; no tasks closed.

- 2026-11-15 — D-38 validated the qualified-link `relation.links` representation with required `id`, `object_id`, `source_list` and optional `roles`, `conditions`, `mechanism`, `causality`, `evidence`, `affects`; the Object must be present in the corresponding NEEDs/CANs list, and `affects` can describe link-to-link interactions without proving causal effects. Updated T-30, T-02, T-03, T-16 and T-24. Full schema validation and graph/cycle/version semantics remain OPEN; no tasks closed.

- 2026-11-15 — D-39 validated A–E on `affects` semantics: identify which action/satisfaction/CAN-availability/relation-applicability property may be affected, distinguish structural cycles from Scenario-specific blockage or functioning, recursively explore candidate external CANs that might initialize a blocked cycle, separate link relation vs triggering event vs effective/simulated change, and combine graph cycle detection with dynamic Scenario evaluation. Optional `effect_details` remains **provisional, not a machine-enforced schema**. Updated T-02, T-03, T-16, T-18, T-24 and T-30; no task closed.

- 2026-11-15 — D-40 validated A–E on **condition identities and state changes**: distinguish an identifiable condition Definition from its Scenario/time-indexed three-state evaluation, combine specified conditions with `all`/`any`, reevaluate after Actualization-triggered Object state changes (or explicit versioned Definition changes), and identify conditions by owner relation + local ID + relevant Definition version. `relation.conditions`, `predicate` and `condition_composition` are **provisional JSON choices**, not a finalized schema. Updated T-02, T-03, T-16, T-18, T-24 and T-30; all tasks OPEN.

- 2026-11-15 — D-41 validated A–E distinguishing completeness within identified Actualization pathways from completeness of their scoped inventory, justified coverage/version evidence, nested `all`/`any`, separate three-valued evaluation and identifiable paths. The **unified recursive expression AST** (`op`, `items`, typed `ref` leaves and coverage metadata) is **PROPOSED ONLY**, not yet approved or tested. Updated T-02, T-03, T-16, T-18, T-24 and T-30; no task closure.

- 2026-11-15 — D-42 validated the **single recursive expression principle and A–C**: reusable versioned named pathways, no automatic truth values for empty `all`/`any`, and permitted circular references with explicit detection and D-39 dynamic-review requirement. Preliminary synthetic Python pilot: **413/413 assertions passed**; 90 exhaustive Boolean fixed-point checks for cyclic groups and 189 exhaustive flat/nested/open-group checks, plus a 180-node reuse chain and cycle. These are **single-author, single-environment implementation checks**, NOT independent scientific validation. Unresolved: meaningful representation of zero discovered pathways (empty group is invalid), branch-scoped IDs, temporal/causal effects, final JSON Schema and code integration in repository CI. Updated T-02, T-03, T-16, T-18, T-24, T-30; no tasks closed.

- 2026-11-15 — D-43 validated A–E: documentary inventory may exist without an identified pathway or a logical expression (distinct from invalid empty Boolean groups); no discovery does not prove impossibility; logical reference and potential-causal effect graphs remain distinct and do not automatically imply each other; Scenario iteration couples condition evaluation, explicit event/Actualization, effects and reevaluation. **Synthetic D-43 test: 218/218 internal assertions passed** (27 ternary states, 4 three-step reachability cases, no-event logical cycle, potential causal cycle initiated by third CAN C, expiry/overlap and inhibition). `expression: null`/`search_status` and simulator remain proposals, not final schema/causal proof. Updated T-02, T-03, T-16, T-18, T-24, T-30; no closure.

- 2026-11-15 — D-44 validated five principles: type/owner/version-qualified references connecting logical and potential causal graph layers; explicit mechanisms versus event-triggered effects; Scenario-specific Actualization histories; dependency-driven condition/pathway reevaluation; isolated branches. **190/190 synthetic tests passed**, including 27 ternary configurations across two pinned versions, effect/condition references, delayed and overlapping effects, conflicting events and branch histories. A large-time-jump expiration defect was detected and corrected before final rerun; output SHA-256 was identical across two local runs. **Unapproved policy under test:** reject contradictory same-time effect batch and mark affected property epistemically indeterminate (not a physical transition); final schema, causal verification and CI remain OPEN. Updated T-02, T-03, T-16, T-18, T-24, T-30; no task closed.

- 2026-11-15 — D-45 validated A–E and additional localized-suspension rule: diagnose conflict before treatment; require justified contextual priority rather than arbitrary order; model alternative non-exhaustive hypothetical branches without invented probabilities; separate epistemic uncertainty from effective Object transitions; preserve event/evidence conflict provenance; suspend only actually conflict-dependent pathways while independent actions may continue. **Synthetic pilot 173/173 assertions passed** with 27 ternary configurations, explicit priority and negative priority tests, isolated branches, contradictory observations, simultaneous independent battery recharge, v1/v2 condition isolation, and effect expiry. Extracted archive rerun reproduced byte-identical JSON. **OPEN:** proof quality for priority and observations, simultaneous multi-property/active-overlay conflicts, formal conflict schema, D-35 compliance, CI and independent replication. Updated T-02, T-03, T-16, T-18, T-24 and T-30; no task closed.

- 2026-11-15 — D-46 validated five claim/evidence methodological principles A–E: identified scope/versioned claims; separate logical validity within a stated model from empirical evidence; source relevance, reliability, traceability, independence and discriminating role; immutable revisionable assessments; checkable explanations and prioritized missing evidence. **Synthetic D-46 pilot: 898/898 assertions**, 27 ternary proof-role configurations and 720 invariance permutations for six proposed tests, reexecuted from extracted ZIP with identical SHA-256 output. Findings: composite claim references need Scenario context to avoid tested collisions; a retrospective evaluation must separate observed-at versus registered-at to exclude future evidence. **OPEN:** reviews and “falsifies” tags only stipulated in fixture, not external verification; real source dependence/quality, CI, independent replication, calibrated and causal evidence thresholds, final JSON Schema. Updated T-01, T-02, T-03, T-16, T-18, T-24, T-30; no tasks closed.

- 2026-11-15 — D-47 validated A–E: evaluate evidence according to production method and the specific claim; separate applicable criteria from their three-state compliance; distinguish method quality from claim-specific probative sufficiency; assess a body of evidence without arbitrary addition or independence claims; adapt review depth to stakes but not epistemic truth. **D-47 synthetic pilot: 612/612 passing assertions**, five method families, seven adversarial cases, 243 exhaustive ternary controls (486 assertions) and 24 evidence-order permutations (48 consistency assertions), rerun from independently extracted ZIP with identical SHA-256 results. **OPEN:** real expert-audited studies, reliability/independence of underlying sources, comparability and causal identification, final JSON Schema, independent oracle/CI and defensible high-stakes review policy. Updated T-01, T-02, T-03, T-16, T-18, T-24 and T-30; no task closed.

- 2026-11-15 — **D-47 real-publication experiment, no new validated decision**: five selected cases (pulse oximetry, Cochrane vitamin C, chocolate/Nobel statistics, Google Flu Trends and Coq four-colour theorem), ten source records, five narrowly reported claims and five deliberately overextended claims. Existing evaluator returned **indeterminate for all ten claims**; 162/162 internal invariants passed. Source-based manual reference annotation is NOT independent expert gold truth. The experiment reveals excessive hard-coded methodological conjunction, inability to mark criteria not applicable, and over-strict source context equality; no empirical correctness or AI-vs-baseline gain was established. Archive delivered to conversation; reproducible documentary note added at `reference/D47-real-sources-pilot.md`. T-03, T-24, T-30 elaborated; no task closed.

- 2026-11-15 — **D-47 experimental layered-reading representation, first step only; no new conceptual decision**: same five published-source cases, ten claims, prior manually compiled documentary notes. Prototype separates (1) reported-in-source notice, (2) method review coverage and criterion checks, (3) independently adjudicated empirical warrant, (4) causal or formally executed establishment. It passes **320/320 internal checks** (including 120 witness-order permutations) and produces five manually attributed documentary reports, five not documented in this pilot's notices, **zero empirically validated claims** and **zero independent Coq executions**. Original D-47 remains 10/10 indeterminate; no AI comparison or independent expert review was performed. Output reproduced byte-identically after ZIP extraction. Written up at `reference/D47-reading-layers-pilot.md`; T-03, T-24, T-30 expanded, no tasks closed.

# Known limits of the current test evidence

A local exploratory report in the conversation (November 14, 2026) describes 20 passing executable checks, 200 exploratory synthetic worlds, and 240 paired synthetic instances. Its main limitation is a **monotone simulator**, with a non-monotone counterexample discovered. A generic heuristic matched relevance-pruned graph search on the solvable pilot instances; **no Method-specific quality benefit or controlled LLM-with/without-Method advantage was demonstrated**. These pilot files have **not** been placed in this GitHub repository, and these findings are not scientific validation. Related tasks: T-03, T-04, T-16, T-18, T-21, T-24, T-27.
