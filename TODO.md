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

**Scope:** Formalize the now validated permanent Object ID, provisional 'Definition' as a versioned list of constituent Object references **plus** associated properties and NEED/CAN relations, Parent (null or parent Object), Temporary Children and Actualised Children. Distinguish normal Definition updates from contradictory branches; model temporary simulation branches, promotion at effective Actualization (same ID), historical snapshots, shared-Object propagation and simulation isolation. Include conceptual vs functional existence, the contextual necessity test and relevant Semantic Pyramids, focal Subject selection, the NEED-or-CAN Focus/Stage cycle and unresolved actionability–Power relations. Do not silently finalize identity/necessity tests, CAN 'attribution' category or statistical calibration.

**Closure criterion:** An explicitly versioned architecture specification and worked NEED- and CAN-focused examples show IDs, Definition versions, Parent/Children lineage, isolated simulations, actualization, shared references, history, qualified uncertainty and Stage transitions. All unresolved semantics and failure cases are listed; independent review confirms compliance with the validated principles.

## T-01 · Formalize identification of NEEDs and contextually relevant CANs
**Type:** Conceptual / experimental | **Priority:** P0 | **Status:** **To experiment**

**Dependencies:** T-30 (shared Object model); coordinate with T-05.

**Scope:** Specify the necessity test 'Without this constituent Object, can the Subject still exist?' while distinguishing conceptual vs functional existence, existential vs structural status, and Semantic-Pyramid assistance only where relevant. Develop how partially known NEEDs/CANs and absence of evidence vs evidence of absence are represented qualitatively and/or statistically. Select CANs and granularity by Focus context; distinguish Group/System CANs requiring Actualizations by multiple constituent Objects. A CAN may be modeled as a conceptual Object with its own NEEDs only when relevant. The author has questioned whether 'attributable CAN' should remain a separate category: keep that decision OPEN; legacy A/B/C tests remain hypotheses.

**Closure criterion:** Operational identification criteria support documented synthetic and held-out examples; independent reviewers distinguish conceptual/functional necessity, evidence gaps and contextually relevant CANs, including group/system examples. The need for any separate 'attributable CAN' status is explicitly resolved before closure.

## T-02 · Define CAN actionability, NEED satisfaction and complete Power conditions
**Type:** Conceptual / experimental | **Priority:** P0 | **Status:** **To resolve**

**Dependencies:** T-30, T-01.

**Scope:** Formalize **CAN actionable**, complete Conditions of Power, and NEED satisfaction separately. Under D-31, test how **correspondence**, **causal contribution**, **conditional sufficiency** and **Scenario-relative necessity** relate to actionability and Power: a CAN or set of CANs may be conditionally sufficient for a NEED while action conditions remain missing; a CAN may be necessary to one pathway but not across alternatives. Represent single-CAN, jointly necessary, and enabling-CAN scenarios; apply an explicit within-Scenario removal test and document assumptions, unknown conditions, cross-Object relationships and statistical uncertainty. Keep possible Actualization distinct from effective NEED satisfaction.

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

**Scope:** Develop a reproducible protocol for contextual NEED/CAN evaluation, versioned Object Definitions, stable IDs, isolated branches, AND/OR/enabling networks, D-31 sufficiency/necessity tests and four evidential qualifications. **[D-32]** Trace discovery of initially unknown NEED–CAN relations separately from exploitation of known ones, preserving hypothetical status and search limits; record a NEED's temporal satisfaction constraints separately from Scenario-specific time-indexed observations and CAN time-related properties. A common shared temporal data schema for NEEDs and CANs is a **proposal pending validation**. Maintain generation/evaluation/optional selection separation and independent analyst assessments.

**Closure criterion:** Independent reproductions agree on graph identities, versioned snapshots, temporary vs actualized branches, shared-reference propagation and relevant decisions; any divergent interpretations and unresolved operational definitions are documented.

**Preliminary evidence (not task closure):** Preliminary local pilot reported on 2026-11-14: 20 executable assertions and 60 action-order robustness tests; NOT independent human or multi-model replication; artifacts are not yet archived in this repository.

## T-16 · Generate NEED- and CAN-focused Resolution Scenarios
**Type:** Protocol / computational | **Priority:** P0 | **Status:** **To develop**

**Dependencies:** T-02, T-03; coordinate with T-18.

**Scope:** In default Advanced Mode compare non-satisfied NEEDs with contextual CANs, distinguishing correspondence, contribution, conditionally sufficient CANs, jointly required CANs, and enabling CANs; document missing action conditions and generate alternatives recursively. **[D-32 validated]** Separate exploration of known NEED–CAN relations from **discovery of currently unidentified** candidate CANs/Objects/relations by expanding relevant Object Definitions and the Environment, marking any new match hypothetical and evaluating it through the D-31 relation tests. Distinguish no path identified, hypothetical paths and infeasibility under stated conditions without inferring absolute impossibility. Evaluate proposed Scenarios against the NEED's **temporal satisfaction requirement**, not only a final state, maintaining evidence and temporal resolution limits. Reassess non-monotone outcomes in temporary branches; generation/evaluation/optional selection are separate. Shared NEED/CAN temporal data structure remains **PROPOSED**, not validated.

**Closure criterion:** A reproducible prototype finds and evaluates distinct one-CAN, joint-CAN and enabling-CAN pathways, reports missing conditions, and can expand beyond an incomplete initial inventory when justified. Include counterexamples for undiscovered valid relations, no-result versus context-specific infeasibility, false matching and temporal violations despite satisfied final states, without claiming continuity at unsupported temporal resolution. Retain temporary simulation histories and independent comparisons.

**Preliminary evidence (not task closure):** Preliminary local monotone dependency-graph planner demonstrated scenarios and third-Object breakouts; NOT a full implementation of the revised Method.

## T-18 · Reassess Scenarios and effects with non-monotone state transitions
**Type:** Experimental / computational | **Priority:** P0 | **Status:** **To experiment**

**Dependencies:** T-16, T-02; coordinate with T-24 and T-29.

**Scope:** Model Actualizations as **time-dependent, non-monotone** transformations of affected Objects' versioned Definitions, including shared constituent references, newly satisfied or invalidated NEEDs and altered CANs or Conditions. **[D-32 validated]** Check the NEED's temporal satisfaction requirement **throughout the relevant periods**, distinguishing compliance over a whole transition from satisfaction only in its final state. Record whether available event granularity suffices to determine continuous satisfaction. Preserve isolation of hypothetical branches, stable IDs on actualized promotion, factual/simulated separation and causal uncertainty.

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

**Scope:** Test misleading correspondence, partial contribution, conditional single-/joint-CAN sufficiency, enabling dependencies, unknown CANs and relations omitted from the initial inventory, false universal impossibility inferred from no match, and the three statuses **no known solution / hypothetical relation / infeasible under explicit conditions**. Include NEED temporal requirements for final-only satisfaction versus uninterrupted satisfaction, within-action gaps, event-resolution limitations, and non-monotone loss of a satisfied NEED; keep tests of object IDs, shared Definition history, isolated branches, circular dependencies, Power and uncertainty.

**Closure criterion:** A versioned suite has explicit expected outputs for branch promotion, shared Objects, historical versions, actionability/Power and uncertainty, with regression reports and unresolved conceptual disagreements.

**Preliminary evidence (not task closure):** Preliminary local checks passed 20 selected assertions but exposed one non-monotone planning defect; these tests are not scientific or independent validation.


# P1 — Comparative evidence, semantics, scenarios and AI

## T-04 · Test comparative usefulness against non-trialectic analyses
**Type:** Comparative / experimental | **Priority:** P1 | **Status:** **To experiment**

**Dependencies:** T-03; initial experiments can run alongside T-16 and T-21.

**Scope:** Compare the **default trialectic Advanced Mode** against free-form and generic structured controls using matched problems, information, compute budgets and independent scoring. Measure relevant scenario diversity, accuracy of consequences and dependencies, feasibility/cost/complexity separation, uncertainty calibration and total cost of building and maintaining versioned Definitions. **Simple Mode evaluation is deferred** until usefulness is reconsidered after Method stabilization; do not include it as a presently implemented or required comparison arm.

**Closure criterion:** Controlled and independently judged matched comparisons of the default Advanced Mode with appropriate non-trialectic baselines report effect estimates, uncertainty, errors, per-case coverage and generation/evaluation costs; no distinct Method-specific benefit is asserted without evidence.

**Preliminary evidence (not task closure):** Preliminary local Python simulation: 60 base worlds × four distractor levels; both a generic heuristic and relevance-pruned graph search solved all 47 solvable base worlds at each level. NO controlled LLM-with/without-Method evaluation has been run.

## T-17 · Compare Resolution Scenarios under interacting constraints
**Type:** Comparative / protocol | **Priority:** P1 | **Status:** **To develop**

**Dependencies:** T-16, T-18; coordinate with T-23 and T-29.

**Scope:** Assess each relevant Scenario through **separate feasibility, uncertainty of feasibility, complexity, cost/resources, temporality, expected effectiveness, probability of success and potential consequences** on the focal Subject and other Environment Objects, including qualitative possibility when numerical probability is unjustified. Compare alternative Definitions, shared constituents, cross-Object NEED impacts, non-monotone and delayed effects, synergies and serious adverse consequences. **Do not select a universal winner or silently require ranking.** Optional selection is a distinct operation only under explicitly stated criteria.

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

# Known limits of the current test evidence

A local exploratory report in the conversation (November 14, 2026) describes 20 passing executable checks, 200 exploratory synthetic worlds, and 240 paired synthetic instances. Its main limitation is a **monotone simulator**, with a non-monotone counterexample discovered. A generic heuristic matched relevance-pruned graph search on the solvable pilot instances; **no Method-specific quality benefit or controlled LLM-with/without-Method advantage was demonstrated**. These pilot files have **not** been placed in this GitHub repository, and these findings are not scientific validation. Related tasks: T-03, T-04, T-16, T-18, T-21, T-24, T-27.
