# TODO — Trialectic Method

**trIA Work Local bridge (2026-11-17; implemented but end-to-end permission test OPEN):** `applications/triad-graph/server.py` now exposes `POST /api/work/request` and `GET /api/work/status/<id>`. The server writes a request JSON containing source Analysis, Focus, C+ mode and SHA-256 to the Git-ignored, non-served `.tria-work/requests/` folder. An explicitly initiated **ChatGPT Work Local** turn may read the file and write a validated response JSON to `.tria-work/responses/`; Cytoscape can display it via **Vérifier la réponse**. There is no AI API call, MCP bridge, auto-trigger, source Analysis mutation or paid API key. Existing generic loopback/Host/Origin/hidden-path safeguards remain. **Reverted at author's explicit request:** API-key-specific ignore rules, `ai_bridge.py`, credential launcher, secret scanning tools and CI checks, and API-specific tests. A new file-queue integrity regression and UI check replace them. **OPEN:** actual Work Local file permissions on user Windows machine, user-driven first end-to-end Focus and C+ exchanges, response semantic quality, validated source Analysis updates and selective Scenario refresh. See `applications/triad-graph/README.md`. Relevant T-20/T-24/T-26/T-27/T-28/T-30.

**D-97 code progress (2026-11-17; source-only pilot, NOT live-AI integration):** In `applications/triad-graph/`, `focus-cycle.js` now derives direct/two-step Object Environment connections, source Definitions/semantic wording, relevant conditions and candidate Scenarios for review without changing the imported Analysis. The UI has a **Carte simple (A) / Carte détaillée (B)** selector, an explicit **adopt Object as Focus** button, return to the general map, and **Améliorer la résolution de la carte (C+)**. The C+ button currently expands the source-derived presentation, reports candidate omitted Objects and unevaluated conditions and prepares an AI handoff; it does **not** execute an AI discovery, create verified relations or recalculate Scenario assessments. The previous navigation A/B pilot remains separate from the new production A/B. A deterministic regression `test-focus-cycle.cjs` and corresponding CI step were added. **Verification:** V8 syntax/core invariant and static UI wiring checks passed (24 targeted checks); Node-based CI completion, real browser clicks/accessibility, host AI connection, user-value comparisons, revised Analysis import and selective AI-driven Scenario reevaluation remain OPEN. Avoid presenting the generated graph as a live conversation map without the missing host integration. Related tasks: T-20/T-24/T-26/T-27/T-28/T-30.

**D-97 approved trIA behavior (2026-11-17; author-validated design, implementation PARTIAL; trIA-specific P0):** The graph is named **carte** (FR) / **map** (EN). At the first request the user chooses **Carte simple / Simple map** (protocol **A**: answer then concise map) or **Carte détaillée / Detailed map** (protocol **B**: explicit Object/relation structuring then answer/map). After display, **Améliorer la résolution de la carte / Improve map resolution** requests **C+**: proportionate search for omitted relevant Objects, relations, Subjects, contextual ambiguities and materially different Scenarios. Neither map choice changes the Method or implies a guaranteed internal model reasoning order; D-28's deferred Simple Mode is unchanged. When an **Object is adopted as Focus**, the AI examines it as **Focal Subject**, recontextualizes **Environment** (initially connected Objects, potentially broader) and relevant **Semantics**, deepens *explicit* knowledge proportionately, and selectively reviews global relations/Scenarios affected by discoveries on return. Preserve Object identity, history, uncertainty, affected-Subject/global relevance (D-89) and epistemic-revision-vs-Actualization distinctions. **Do not conflate** this behavior with mere node inspection, a Scenario navigation Focus (still eligible under D-92), or the normative `PowerEvaluation.Focus`. No automatic sync or verified AI execution exists in the current prototype.

**Next D-97 experiment (PLANNED, not implemented):** In both A and B, load the *same* synthetic initial analysis of commune A and B, then (1) set the Object B as Focus, (2) have the AI review B's Subject/Environment/Semantics and reveal a previously unexamined shared electricity dependency, (3) record the novel relation with provenance/uncertainty and preserve existing IDs, (4) return to A and assess *only* dependent Scenario conclusions while leaving independent branches unchanged, (5) request C+ explicitly and compare new paths/omissions, (6) revisit history and switch Focus without confusing selection with evaluation; negative controls: no new information, no valid NEED/CAN, and an eligible Scenario Focus not reclassified as an Object. Record UI state, clarity, error/omission counts, limits of persistence, host/browser actions and a text/Mermaid fallback. Existing manually authored water-case traces are illustrative, **not** a browser or live-AI implementation test. Related tasks: T-03/T-04/T-15/T-20/T-21/T-24/T-26/T-27/T-28/T-30.

## trIA-specific workstream — AI response and explicit trialectic representation (2026-11-17; OPEN design question)

**Priority for trIA: P0 (proposed work ordering, not a change to the Method's P0–P3 priorities or a newly validated conceptual rule).** The next investigation asks: **How should an AI be instructed to produce (A) a useful natural-language answer and (B) a distinct, aligned trIA representation of the *explicitly articulated justification* for that answer, using relevant Objects, Subjects, NEED/CAN and contextual relations?** Start with how the AI normally answers; do not assume the graph or a complete v2 Analysis must be generated first.

- **A — User-facing answer:** natural-language explanation, conclusions, conditions, alternatives and qualifications proportionate to the question. Not every response requires a NEED/CAN classification, a Scenario or a decision.
- **B — trIA explanatory representation:** selectively identify referenced Objects/Subjects, their relevant NEEDs/CANs where warranted, contextual relationships, dependencies, assumptions, uncertainty and competing alternatives. Each represented assertion must be attributable to an *explicit statement or justification the AI makes available*, not to inaccessible private model deliberation. Represent omissions and unknowns honestly; a displayed edge is not proof of necessity, sufficiency, causality or correctness.
- **Alignment question:** determine how a reader can move from a passage or claim in A to the relevant Object(s), relations and qualifiers in B, and back; how to expose contradictions, unsupported extra graph content, context differences and cases where A/B cannot be faithfully aligned. Do not invent sources, evidence or hidden reasoning to fill gaps.
- **Production modes (D-97 validated as user-facing options; comparative efficacy OPEN):** A: text-first, then simple map; B: relevant Object/relation structure before text, then detailed map. C+ is explicitly invoked by the user after a map is shown. Compare text-first, structure-first and jointly drafted productions without assuming superiority or access to private model deliberations. Test whether one strategy induces fabricated NEED/CAN attributions, omitted qualifications, anchoring, unnecessary complexity or misleading certainty. Keep the distinction between *requiring an explainable output* and *imposing an internal cognitive process on the AI*.
- **Minimal output contract to investigate:** a readable answer; an optional scoped explanation map with stable local references linking explicit claims to relevant nodes/links; inspection details for relation meaning and epistemic status; an explicit "not represented / not established" marker when appropriate. Use the normative v2 exchange only when requested or technically needed, not as the default conversational payload. Preserve a text/Mermaid fallback.
- **Initial tests:** (1) a simple answer with one alternative; (2) several Subjects and branching dependencies; (3) contextual cycles that must remain visible without self-validating; (4) an explanation where NEED/CAN is unnecessary or inappropriate; (5) an uncertain/contradictory case. Compare text-only answers with two-output variants for fidelity, unsupported claims, contextual understanding, navigation cost, cognitive overhead and human correction of errors.
- **Implementation boundary:** the AI performs the explanation and any critical analysis; trIA represents the reasoning it explicitly supplies. No autonomous proof engine, cycle solver, mandatory Inference scoring, new provenance engine, new Object kind or schema revision is implied. D-93/D-94 remain within the Method's scope. **No code change or performance benefit is claimed by this planning entry.**

**Immediate next step:** draft and test the smallest portable AI instruction that requests A+B from an ordinary question, then assess whether the resulting structure can be faithfully rendered by the existing Cytoscape prototype; do not design additional UI elements before the output contract is understood. Related tasks: T-20 (prompt/dialogue protocol), T-26 (presentation), T-24 (fidelity checks), T-27 (case corpus), T-04 (comparative comprehension), T-28 (documentation).

**D-95 trIA scope clarification (2026-11-17; author-validated):** Prioritize a **simple, navigable Object/NEED/CAN representation** of reasoning explicitly presented by an AI, with contextual qualifications and more detailed records available on inspection. trIA does **not** require automated Inference grading, justificatory-cycle resolution, proof of independent support or a new provenance engine. Preserve the Method's D-93/D-94 research scope and existing schemas separately. **NEXT:** compare minimal-map comprehension with optional inspection in simple, branching and cyclical examples; identify only demonstrated interface overhead before proposing code or schema removal. Related tasks: T-20/T-26/T-27/T-28.

**Cytoscape A/B navigation pilot (2026-11-17; implementation exploratory, usability OPEN):** [Prototype in `applications/triad-graph/`](applications/triad-graph/README.md) now provides **A: one-click inspection** and **B: an explicitly pinned, temporary Analyst navigation Focus** that remains identifiable while inspecting other nodes or changing displayed phases, views and Scenarios. Returning to and clearing the pin are independent UI actions; import/reset clears it. Navigation state is **outside Analysis, Objects, Stages and PowerEvaluation**, and no Actualization/evaluation is inferred. [Research/verification report](research/tria-dev-focus-cytoscape-ab-2026-11-17.md) documents partial source-level/synthetic state checks and a Node regression added to CI. **No real browser interaction, current Actions success, independent user comparison or scientific improvement has been verified.** **NEXT:** browser E2E, accessibility, dataset/version edge cases and direct user A/B comprehension/error/time testing; evaluate whether the same function is just UI selected-node state rather than a necessary Method-level Focus. Existing D-17/D-89/D-90 remain unchanged; no data schema is approved by this prototype. Related tasks: T-03/T-04/T-20/T-26/T-27/T-30.

**Focus navigation control pilot (2026-11-17; exploratory, no new normative decision):** The [three-edge-case trIA-dev pilot](research/tria-dev-focus-navigation-control-pilot-2026-11-17.md) examined **multiple candidate targets/Stage targets, AI proposals vs Analyst selections, isolated per-Analyst/branch navigation, and resuming historical vs current versioned investigations**. A same-author ephemeral JS mock passed **14/14 self-authored structural assertions**, not real application/UI, concurrent persistence, empirical/independent validation or PowerEvaluation engine tests. **Working hypothesis:** Analyst-controlled Focus is optional **steering/navigation state**, while Stages preserve their actual examination targets and evaluation revision/propagation mechanisms remain separate. **OPEN:** several simultaneous active Focus selections, authority/delegation to AI, stale reference conflict resolution, session persistence, graph auto-synchronization and comparative user value. Respect the already approved D-90 Cytoscape prototype but do not claim its host/runtime supports these new features. Preserve D-17 and `PowerEvaluation.Focus` as currently validated. Related tasks: T-03/T-04/T-20/T-21/T-24/T-27/T-30.

**D-90 Cytoscape prototype (2026-11-17; author-approved interface and invocation):** Integrate `applications/triad-graph/` into `dev`. `use trIA-c` and `use trIAd-c` select the approved interactive presentation; node centering, local relation inspection and return to the overview are implemented. Repository instructions preserve the convention where loaded; actual sidebar placement depends on the host. **OPEN:** automatic conversation synchronization, full graph projection, causal inference, persistent cross-session integration and independent usability evaluation. Existing schema contracts are unchanged; T-20/T-26 remain open.

**Focus versus Stage pilot (2026-11-17; exploratory, not a decision):** [A synthetic seven-Stage and four-selection trace](research/tria-dev-focus-vs-stage-2026-11-17.md) compared (A) explicit target reference(s) on each Stage against (B) a distinct optional Analyst-controlled navigation Focus. A deterministic mock walk passed five authored structural assertions; **solely inferring a Stage's targets from its active Focus failed in ST-04 (two targets), ST-06 (global relevance), and ST-07 (no active Focus)**. This is not execution of real analysis engines or independently validated evidence. **NEXT:** test multi-target and parallel branches, per-Analyst selection, stale references, AI proposals versus Analyst selections, and compare usefulness against a simple UI selection without new domain semantics. Preserve D-17 and typed `PowerEvaluation.Focus` until new explicit validation. Related tasks: T-03/T-04/T-20/T-21/T-27/T-30.

**Focus A/B/C walkthrough (2026-11-17; exploratory, NOT independently validated):** A [three-configuration manual trIA-dev pilot](research/tria-dev-focus-three-mode-pilot-2026-11-17.md) held the same fictional schools case and the D-89 global relevance safeguard fixed while contrasting **A: no distinct Focus**, **B: optional local Focus**, and **C: mandatory Focus for each local Stage**. All three walkthroughs addressed the same seven predeclared considerations; the same assistant wrote all conditions, so coverage, overhead and utility are **not comparative performance evidence**. The optional local Focus appears worth further testing for selective traceability, whereas mandatory labeling may add overhead or force categorization. **No change to D-17 Focus or the PowerEvaluation.Focus contract is approved.** **NEXT:** independent pre-registered A/B/C cases and clarity/omission/time rubrics; examine whether a mere local question label captures the same benefit. Related tasks: T-03/T-04/T-15/T-21/T-27/T-30.

**D-89 relevance and Focus review (2026-11-17; principle VALIDATED, protocol/utility OPEN):** Relevance must be considered **both against current Focus (when used) and against the overall problem, analytical objectives and potentially affected Subjects**, including initially hidden Secondary Subjects and important indirect/severe effects. Focus as a distinct conceptual notion is **not yet justified by comparative usefulness**: preserve D-17 and scoped `PowerEvaluation.Focus` contracts without assuming they are identical to D-85's broad analytical concern. A **same-author, synthetic trIA-dev walkthrough** (simple reading, school heat, critical water omission) is recorded in [the exploratory pilot](research/tria-dev-relevance-focus-pilot-2026-11-17.md); it is **not independent or empirical validation**. **NEXT:** refine T-15/T-21 human relevance and stopping protocol, compare explicit Focus/no separately named Focus using frozen cases and independent analysts (T-04/T-27), and examine the overhead/traceability tradeoff. Six criteria, four investigation actions and stopping language remain **PROPOSED**, not author-validated; no schema edit is authorized by D-89. Related tasks: T-03/T-04/T-15/T-19/T-20/T-21/T-24/T-27/T-30.

**D-88 trIA-dev visualization (2026-11-17; user-validated, implementation details OPEN):** Use **two Mermaid diagrams** in relevant trIA-dev analyses: (1) a **conceptual Object/relations graph** representing justified Subject/Environment/NEED/CAN/dependency links with epistemic qualifications; and (2) a **methodological process graph** showing relevant Understand/Explore/Decide operations, Focus, branches and recursive returns. Keep the views conceptually distinct, case-relevant and legible. **NEXT:** test Mermaid diagrams on simple, intermediate and difficult cases; document minimal consistent IDs, edge labels, uncertainty notation and layout/legibility guidance; inspect whether the diagrams improve analyst understanding or expose conceptual gaps. **OPEN:** stable diagram grammar, automatic generation, schema-to-graph mapping and comparative usability evaluation. No JSON schema revision or external plugin is implied. Related tasks: T-03/T-04/T-20/T-24/T-26/T-27/T-28.

**D-87 trIA modes (2026-11-17; naming and invocation VALIDATED, concrete protocol OPEN):** `use trIA` invokes standard AI-assisted Trialectic analysis; `use trIAd` and `use trIA-dev` both invoke **trIA-dev**, a development view that displays the Method's **relevant** Objects, IDs/Definitions, Subject/Environment, NEED/CAN relations and affiliations, Semantics, phases, Focus, operations, assessments, Scenarios and epistemic qualifications, alongside ambiguities or failures discovered through concrete testing. Both apply the **same Method** and the same D-85 recursive Understand → Explore → Decide process, without imposing every concept or a final decision on every case. **NEXT:** design a readable, minimal standard trIA output and a sufficiently detailed but selective trIA-dev representation; collect diverse examples (including cases without NEED/CAN or final decision); evaluate user comprehension and whether the development view helps identify genuine conceptual gaps. **OPEN:** technical invocation/persistence, trace representation, empirical validation and independent comparisons. No new schema contract or automatic success claim is authorized. Related tasks: T-03/T-04/T-20/T-24/T-26/T-27/T-28.

**D-85 methodological priority (2026-11-17; three phases VALIDATED, detailed protocol OPEN):** The complete Method comprises **Understand → Explore → Decide**, as **recursive phases**; any individual analysis may legitimately conclude after Understand or after Explore. The goal of the full process is a **reasoned, contextual and revisable decision**, not guaranteed universal optimization. Use Subject, Environment and relevant Semantics to understand an analytical concern; NEED/CAN/Power/Actualization are pertinent instruments rather than obligatory steps in every problem. **P0 next:** formalize the human-auditable operations, information needs, outputs, stopping/reopening criteria and uncertainty safeguards of **each phase** (T-03/T-15/T-21), using critical case studies including understanding-only, exploration-only and decision-oriented examples (T-04/T-19/T-27). Revisit old Subject → NEED/CAN → Actualization workflow as a **specialized procedure**, not a universal entry point. The data model should formalize this process **after** conceptual stabilization; existing v2.0–v2.2 schemas/tests are scoped exploratory engineering artifacts and **must not set the Method's purpose**. Do not present synthetic test conformance as methodological or scientific validation. No new JSON schema, tool or decision optimizer was approved by D-85.

**D-84 CAN child affiliations (2026-11-17; conceptual decision VALIDATED, v2.2 transport/tests ADDED, behavioral semantics OPEN):** CAN specialization and composition are represented separately in the `2.2.0` exchange profile by versioned `can_affiliations[]` edges with distinct, version-pinned parent/child CAN Objects, a scope/status/Claim qualification, and support for several parents. D-83 attribution and `Object.parent_id` historical lineage remain separate. A synthetic fixture and 12 regression test functions cover structure, local referential constraints, non-transmission of attribution, compatibility and advisory cycle detection. **OPEN:** confirm actual Python/CI results, resolve graph cycle policy, establish definition-based specialization entailments and composition/alternative/mandatory reasoning, review versioned edge history and empirical evidence, and test cross-analysis reuse. No automatic NEED satisfaction or actualization follows. Relevant tasks: T-01/T-02/T-03/T-16/T-24/T-27/T-30.

**D-83 scoped v2.1 implementation (2026-11-16; tests authored, official CI result unconfirmed):** The 2.1 exchange extension adds `Object.concept_kind`, optional requalification provenance and `Relation.attribution` with a version gate preserving 2.0.0 documents. `tools/validate_semantics.py` and `tests/test_identity_attribution_v21.py` implement limited semantic/reference checks, including established-only CAN possession and new-ID requalification. Corpus T-01 v1.1 explicitly categorizes its 26 Subjects. Targeted schema checks were performed against the modular definitions; the complete Python suite and CI are not confirmed, and full causal/epistemic validation remains OPEN.

**D-83 immutable NEED/CAN identity and separate attribution (2026-11-16; NOT task closure):** NEED and CAN Object identities are exclusive and permanent per ID. Candidate identification remains an epistemically qualified assertion; attribution to a bearer Object is separate and cannot silently establish Puissance, Power or Actualization. Reclassification requires a new ID with historical traceability and affected-analysis review. Continue T-01/T-02/T-24/T-27/T-30: semantic validation, formal identity/reclassification checks, attribution evidence criteria, versioned migration and non-empirical regressions remain open.

**D-77/D-78 global and Scenario contracts adopted (2026-11-16):** [Analysis/Scenario v2](schemas/global-model.md) specifies the global exchange profile and nested Scenario results. New synthetic fixtures, offline validation and CI tests implement the field contracts. Full semantic/reference/temporal/causal engines and empirical research remain open; no research task is closed wholesale. Earlier serialization-OPEN statements below refer to prior profiles.

**D-76 reconciliation implemented (2026-11-16; no task closure):** C-01–C-10 resolutions are author-approved. [normalized-v1](https://github.com/Nirgalz/trialectic/blob/7fc676586a85be504bf145d313b19fefadfb9761/schemas/normalized-v1/README.md) embeds normative PowerEvaluation items, preserves approved compositions and provides an explicit source-preserving migration with regression tests. Global envelope, full semantic checks and Scenario internals remain OPEN.

**D-75 partial proposal approval (2026-11-16; no task closure):** V-01–V-06 approve compatible identity/transport/expression/record-family choices. [C-01–C-10](https://github.com/Nirgalz/trialectic/blob/05c17bb6936ef1bc063eec56caed361f41f56f31/schemas/proposal-v0/RECONCILIATION.md) require reviewed PowerEvaluation reconciliation, loss-aware migration, scoped composition and metadata handling (T-30/T-03/T-24). Proposed resolutions are not approved; Scenario nested results and remaining semantic rules stay OPEN.

**Working register** · Updated: November 16, 2026 · **30 tracked task IDs (29 open work items and 1 ongoing governance process)** · Canonical reference: [`reference/trialectic-method.md`](reference/trialectic-method.md) · Branch: `dev`

This file specifies **what remains to do**. It does **not** introduce or validate concepts: validated decisions remain in [`DECISIONS.md`](DECISIONS.md), and the canonical Method definitions remain in the reference. Historical IDs T-01–T-30 are stable even when two tasks share a research workstream; none has been closed.

## Cross-cutting RD — author-approved directions, operational and empirical work OPEN (2026-11-20)

Central index: [research/README.md](research/README.md). These tasks **extend** existing T-03/T-04/T-20/T-21/T-26/T-27; they do not make research stages mandatory or replace validated conceptual distinctions.

### T-31 · Assess analytical relevance and justifiable effort (RD-01)
**Type:** Conceptual / comparative | **Priority:** P1 | **Status:** To investigate
**Scope:** Compare Sperber/Wilson relevance, bounded rationality, value of information and resource-rational reasoning with D-89/D-93. Test qualitative prioritization of analytical operations by expected benefit, analyst/AI/external effort, uncertainty and affected Subjects. Distinguish immediate from delayed learning value and preserve rare major risks.
**Closure criterion:** On fixed counterexamples, justify continuation/deferral without hidden omissions or fictitious numerical relevance scores. [Research](research/methodology/analytical-relevance-and-effort.md).

### T-32 · Explore Semantic Objects/sets and hierarchical map granularity (RD-02)
**Type:** Conceptual / UI experiment | **Priority:** P1 | **Status:** To experiment
**Scope:** Test author-approved working definition, potential Semantic Object function, and reversible group/expand views in the **single reference Cytoscape renderer**. Preserve source IDs and qualifications. Compare set-to-set semantic relations versus display-only aggregation; do not infer NEED/CAN between sets. Test overlap, nesting, misleading summaries and user understanding; whether a grouping becomes an independently identifiable Object remains OPEN.
**Closure criterion:** A documented, scoped prototype plus at least one falsifying case; distinguish visual usefulness from conceptual identity and verified semantics. [Research](research/representation/semantic-objects-and-sets.md).

### T-33 · Test progressive, pedagogical, immediate-value interactions (RD-03)
**Type:** Interaction / experimental | **Priority:** P1 | **Status:** To experiment
**Scope:** Explain anticipated benefit before inviting additional analyst effort while retaining productive reasoning. Compare technical-first and value-explained prompts; observe comprehension, omissions, autonomy and reasons to continue/stop. Keep the two author-approved French principles visible and preserve D-85/D-89 safeguards.
**Closure criterion:** Comparative scenarios distinguish reduced unproductive effort from loss of useful thought; report negative cases. [Research](research/interaction/progressive-analyst-experience.md).

### T-34 · Separate human-facing and technical trIA terminology (RD-04)
**Type:** Terminology / interaction | **Priority:** P1 | **Status:** To develop
**Scope:** Experiment with ordinary language in human UI (notably « Potentialité » for the established CAN concept) alongside stable technical AI/data identities and precise constraints; assess confusion risks for NEED, Power, Focus and Semantic Object. No schema enum changes or universal equivalence assumptions.
**Closure criterion:** Reversible example mappings and a small comprehension comparison, with context-sensitive ambiguous terms documented. [Research](research/interaction/human-and-technical-terminology.md).

## Tracking rules

1. Each entry records **Type / Priority / Status / Dependencies / Scope / Closure criterion**. `Scope` describes the durable objective and principal unresolved questions, **not** the chronological history of tests.
2. A validated principle is not proof of operational completion. Synthetic software checks, real-source documentary pilots, independent scientific review and AI-vs-baseline evaluations have different evidential roles.
3. Keep conceptual/empirical uncertainties explicitly **OPEN**. No task is closed by this reorganization. A closure claim needs its own evidence and author decision.
4. Dependencies guide sequencing without requiring all upstream research to be complete before useful pilots start. A shared workstream can retain separate IDs and acceptance criteria.
5. **T-28 is continuous maintenance**; the other 29 tasks remain open. No Git tag, CI integration or empirical validation should be claimed without verification.

## Priority overview

| Priority | Purpose | Items |
|---|---|---|
| **P0** | Object/NEED/CAN architecture, Power, protocol, simulation, regression and **versioned case corpus** | T-30, T-01, T-02, T-05, T-15, T-03, T-16, T-18, T-21, T-24, **T-27** |
| **P1** | Independent comparative evaluation, Scenario interpretation, adaptive AI, theoretical and relevant semantic research | T-04, T-19 *(joint with T-04)*, T-17, T-25, T-20, T-06–T-12, T-14 |
| **P2** | Complementary Power measures, normative/distributive analysis, **deferred** semantic reconstruction | T-13, T-22, T-23, T-29 |
| **P3** | Practical Advanced Mode tools and continuous documentation/version governance | T-26, T-28 |

**Workstream coordination:** T-04/T-19 share one comparative experiment with a dedicated problem-class subgroup analysis. T-07/T-12 share semantic identity/equivalence research. T-08/T-09/T-10 share a conceptual-dependency corpus. T-11 remains an **optional** semantic instrument, not a prerequisite for all Object analyses. T-13 is deferred pending demonstrated benefit. Exploratory baseline studies under T-04 may start alongside architecture and corpus development, but must not be called definitive validation.

## Evaluation and test evidence — concise state of play

D-39–D-47 motivated a sequence of **synthetic executable prototypes**, including versioned references, recursive logic, competing effects, evidential claims and methodological evidence checks. These provide engineering regression material but **do not validate external causal claims**, nor prove that using the Method improves an AI's answers. A later five-publication D-47 documentary pilot exposed excessive conservatism (all ten claim assessments indeterminate); a follow-up experimental reading adapter represented source attribution separately from independent empirical proof. No scientific expert review, controlled AI comparison or repository CI integration has been established through those conversation-level pilots. Complete experimental narratives should not be copied repeatedly into individual tasks; the Git history and supplied test archives retain their provenance.

## Manual stress-test findings to operationalize (2026-11-16; proposed test work only)

Two **synthetic, manually reasoned** case studies examined conceptual coherence, not an executable v2 Analysis/PowerEvaluation run, independent replication or scientific effectiveness. They do not add or validate normative Method rules, prove causal mechanisms or close tasks. The test descriptions need versioned fixtures and independently reviewed expected results before they count as regressions.

| Case / adversarial change | Required discriminating behavior | Work items |
| --- | --- | --- |
| **One-hour lighting:** 70-minute battery assumption revised to 20 minutes by new information | Revise assessments without inventing physical Actualization; keep partial CAN actionability distinct from whole-hour NEED satisfaction and retain alternatives with unknown conditions | T-02, T-03, T-18, T-24, T-27 |
| **Water crisis:** overlooked care-center NEED changes residential requirement from 10 to 12 m³/h | Detect and record contextual incompleteness; independently reassess relevant NEED/Scenario results without changing already observed physical states | T-01, T-15, T-03, T-24, T-27 |
| **Water crisis:** 60 m³ tanker delivery moves from 15:00 to 16:00 | Detect reserve minimum violation (40 m³ just before delivery in the stipulated case) even though final reserve is 60 m³; distinguish effective satisfaction from authorized temporal compliance | T-02, T-17, T-18, T-24, T-27 |
| **Water crisis:** emergency pumping drops from 10 to 8 m³/h | Preserve actionable CAN where justified while rejecting its insufficient contribution to the focal continuous reserve NEED | T-02, T-16, T-18, T-24 |
| **Water crisis:** supplier with 130 m³ transfers 60 m³ despite 100 m³ reserve NEED | Report adverse effect on Secondary Subject separately from primary benefit; examine other sources and normative trade-offs without an automatic winner | T-15, T-17, T-23, T-29, T-24 |
| **Water crisis:** fuel-power cycle and inconsistent external availability evidence | Find contextual initiating options; do not equate cycles with impossibility; keep contested assessments indeterminate, suspend only dependent transitions and preserve independent alternatives | T-16, T-18, T-21, T-24 |
| **Both cases:** alternate analysts and non-trialectic baselines | Quantify reproducibility, overlooked NEEDs/impacts, erroneous certainty and analysis cost; do not assume benefit from additional modeling | T-03, T-04, T-24, T-27 |

**Suggested immediate order (without changing existing statuses):** (1) stabilize T-01/T-02/T-15 discriminating questions and measurement criteria; (2) record two versioned, non-empirical cases and expected invariants under T-27/T-24; (3) test cross-Focus revisions, selective propagation, time and Scenario isolation under T-03/T-16/T-18; (4) run independent analyst and baseline comparisons under T-04/T-19. Review documentation consistency under T-28. **None of these tests has been implemented by this TODO update.**

# P0 — Foundational architecture, protocol and evaluation corpus

**D-74 CAN potential contributions implementation (2026-11-16; NOT task closure):** The author validated `Results.potential_contributions` for CAN Focus as a required object with required, possibly empty `needs` candidate list (each NEED item has nonempty `object_id`, `relationship: candidate` only, nonempty `justification`, optional evidence-reference array); required `search_status` (`not_searched`/`searched`), `coverage` (`complete`/`incomplete`/`indeterminate`), nonempty `scope` and `justification`; optional inventory `evidence` array of nonempty references and `uncertainty` object. The local Draft 2020-12 schema and negative/positive tests reject unsearched yet complete inventories and unsupported promotion of candidate relations to established contribution/sufficiency. Synthetic CAN fixtures and the provisional semantic adapter were updated. **OPEN:** verifying Object/NEED reference and scope compatibility, causal mechanisms and with/without comparisons (D-31), conditional sufficiency, joint and enabling CANs, indirect/direct favorable and adverse effects, research/coverage completeness, temporal/Definition compatibility, Scenario `Results`, production semantic validation and empirical substantiation. D-72–D-74 provide minimum typed CAN Results only; no TODO work item is closed.

**D-73 CAN prerequisites implementation (2026-11-16; NOT task closure):** Author-validated CAN `Results.prerequisites` now requires four possibly empty arrays `needs`, `cans`, `conditions`, `pathways` with the minimum typed Object/evaluation, owning-relation/Condition and versioned-pathway reference fields; each pathway reference has its own `coverage`, distinct from required `inventory_coverage` of contextually relevant pathways. Required nonempty `scope` and `justification`, optional evidence-reference array and uncertainty object complete the local D-73 contract. The partial Draft 2020-12 schema, synthetic fixture and negative/positive regression tests enforce local types and fields. The fixture currently registers **no versioned pathway Definitions**, so `pathways: []` with `inventory_coverage: incomplete` remains an intentionally non-exhaustive example. The test-only adapter checks some NEED/CAN Object identity and declared analytical references, but is **not** a production semantic validator. **OPEN:** real versioned pathway/condition Definition registration, recursive `all`/`any` expression schema, contextual requirement and pathway resolution, qualified coverage/exhaustiveness, cycles, alternative paths, causal sufficiency, CAN `potential_contributions`, full Scenario results, empirical verification. No task is closed.

**D-72 CAN actualizability implementation (2026-11-16; NOT task closure):** Author-validated `Results.actualizability` for CAN Focus requires `status` in `actualizable`/`partially_actualizable`/`not_actualizable`/`indeterminate` and nonempty `justification`; optional `degree` has numeric `value` plus nonempty `measure` and `basis`, optional `evidence` a list of nonempty references, optional `uncertainty` an object. A partial result need not be numerically quantified. The Draft 2020-12 partial schema, synthetic CAN fixture and regression tests enforce these **local field contracts** without universal [0,1] degree bounds. The existing fixture-specific `distance_ratio` check remains a **declared measure-specific experimental restriction only**, not a global Method rule. **OPEN:** stable reference/definition of the contemplated Actualization, partiality criteria and meaningful measure scales, semantic justification of the evaluation, CAN `prerequisites` and `potential_contributions` internals, Scenario `Results` and empirical tests. No task is closed by D-72.

**D-71 candidate CAN inventory implementation (2026-11-16; NOT task closure):** The author validated the NEED `Results.candidate_cans` contract: required possibly empty `identified` array with each CAN candidate `object_id` and correspondence `justification` (optional `evidence` array), required `search_status` (`not_searched`/`searched`), `coverage` (`complete`/`incomplete`/`indeterminate`), nonempty `scope` and `justification`, optional evidence-reference array and uncertainty object. An unsearched inventory cannot claim complete coverage. The partial Draft 2020-12 schema and positive/negative tests enforce these **local constraints only**. **OPEN:** justified scope-limited completeness, reference resolution and evidence quality, D-31 correspondence vs causal contribution/sufficiency, CAN actualizability/Power, cross-Scenario reuse, CAN/Scenario nested `Results`, complete semantic validator and empirical testing. A zero-candidate inventory is not proof of impossibility, and no T-01/T-02/T-03/T-30 work item is closed.

**D-70 temporal compliance implementation (2026-11-16; NOT task closure):** The author validated a separate temporal **`applicability`** (`applicable`/`not_applicable`/`indeterminate`) for NEED `Results.temporal_compliance`. A nonempty `justification` is mandatory. A three-state compliance `status` is required when applicable, forbidden when not applicable, and optional but restricted to `indeterminate` when applicability is indeterminate. Optional `applied_exceptions` and `evidence` are arrays of nonempty references; optional `uncertainty` is an object. The partial Draft 2020-12 schema and positive/negative tests implement these **local structural boundaries**, while **authorization, versioned temporal scope and validity of exceptions, individual requirement compliance, observed/simulated interruption tracking and D-35 effective satisfaction separation** remain semantic/time-engine tasks. **OPEN:** `candidate_cans` inner shape, temporal event/interval/exception schemas and full analytic/empirical validation; no task closure.

**D-69 NEED effective satisfaction (2026-11-16; NOT task closure):** `PowerEvaluation.Results.effective_satisfaction` now requires `status` (three analytical values) and a nonempty `justification`; optional `degree` requires numeric `value`, nonempty `measure` and `basis`; optional `evidence` is an array of nonempty reference strings, and optional `uncertainty` is an object. The executable Draft 2020-12 boundary schema and negative/positive tests now cover these fields **without** a universal numerical scale, new partial-satisfaction status, or the presumption that absent uncertainty means certainty. The NEED temporal-compliance and candidate-CAN internals, measurement validity, evidence semantics, full CAN/Scenario fields and a production validator all remain OPEN.

**D-68 implemented nested boundary (2026-11-16; NOT task closure):** The author validated `Subject` as an object with required nonempty `object_id`; `Context` as an object with required nonempty `definition_versions` map (nonempty keys/values), optional `scenario_id`, and optional object `provenance` with nonempty `revises` when present; and `Dependencies` as a possibly empty array of objects each with a required nonempty `evaluation_id`. The Draft 2020-12 `schemas/power-evaluation.boundaries.schema.json` implements these **local** constraints, with dedicated positive/negative cases in `tests/test_power_evaluation_schema.py`. Revisions require `provenance.revises` under D-60, but identifying genuine revisions still needs a **semantic** cross-record check. **OPEN:** fully specified `Results` internals, universal temporal encoding, extended metadata/identifier policies, semantic completeness, causal algorithms and independent empirical tests; neither final schema nor T-30 is closed.

**D-67 executable boundary prototype (2026-11-16; NOT task closure):** `schemas/power-evaluation.boundaries.schema.json` implements the **approved structural boundaries** in JSON Schema Draft 2020-12. `tests/test_power_evaluation_schema.py` provides 11 dedicated positive/negative checks, executed under GitHub Actions after installing the pinned test validator (`requirements-test.txt`). **Not a complete schema:** `Subject`, `Context`, `Dependencies`, identifier formats, inner `Results` contracts and cross-record semantics remain OPEN. Do not treat partial schema acceptance as complete structural or semantic validity.

**D-67 Focus serialization (2026-11-16; NOT task closure):** The `PowerEvaluation.Focus` discriminator is now fixed as required `type: "NEED" | "CAN" | "Scenario"` with mandatory `object_id` for NEED/CAN or mandatory `scenario_id` for Scenario. The corresponding opposing reference type is not a substitute, and contradictory reference keys are disallowed. The schema may now enforce these **approved boundaries** while leaving all unapproved nested properties and data types open. Next propose a detailed `Subject`/`Context`/`Dependencies` contract; keep D-65 semantic cross-record validation separate. Do not mark the final strict JSON Schema or T-30 completed.

**D-66 schema foundations (2026-11-16; NOT task closure):** Draft 2020-12 is the **approved JSON Schema dialect** for `PowerEvaluation`. The structural validator must require exactly the six D-57 top-level fields, reject unknown extra top-level properties, and validate the appropriate D-61–D-63 `Results` structure conditional on the Focus. The semantic validator remains separate under D-65. **Next:** explicitly decide the `Focus` discriminator encoding, nested field types and requiredness, then implement and test the schema without promoting provisional fixture conventions into unapproved requirements.

**D-65 validation implementation note (2026-11-16; NOT task closure):** Separate two testable contracts: (1) **strict structural JSON Schema validation** for the approved `PowerEvaluation` shape and eventually agreed nested types and values; (2) **semantic validation** for identity, reference existence, Definition version pins, contextual compatibility, analytical dependency/revision integrity and evidenced findings. Implement distinct diagnostics and independent test cases; do **not** infer empirical accuracy from either check. Schema dialect, nested typing, failure/indeterminacy taxonomy and cross-record validation algorithms remain OPEN.

## T-30 · Operationalize Object identity, Definitions, branching and NEED/CAN/Focus architecture

**D-89 Focus usefulness research (OPEN):** Test whether `Focus` adds necessary conceptual content beyond the **overall analytical question**, the **D-85 phase** and temporary local attention. Keep this distinct from the already validated **typed `PowerEvaluation.Focus`** field of the current data contract. Do not change or remove existing Focus architecture until a new explicit decision is validated; include simplification/null-result possibilities in trials.
**Type:** Conceptual / protocol | **Priority:** P0 | **Status:** **To develop**

**Dependencies:** Foundational; coordinate with T-01, T-02, T-05, T-15.

**Scope:** Specify the shared Object / Subject / Environment / Focus architecture and the full lifecycle of versioned Definitions, identity, Parent/Children branching, shared constituent references, NEED/CAN origin-anchored relations, condition/pathway references, Actualization events, Scenario isolation and history (D-17, D-25–D-45). Integrate the **validated conceptual `PowerEvaluation` data model (D-57–D-64)**, its specialized `Results`, provenance, and evaluation-vs-event separation; do not assume the provisional nested fixture fields are final. Identify the stable contracts and unresolved semantics across conceptual, logical and causal layers. Treat D-46/D-47 evidence provenance and qualification as cross-cutting interfaces, not the sole purpose of this foundational task. **OPEN:** canonical identities, conflict and revision semantics, full example schema, branch promotion, interoperability, and independent verification.

**Closure criterion:** An explicitly versioned architecture specification and worked NEED- and CAN-focused examples show IDs, Definition versions, Parent/Children lineage, isolated simulations, actualization, shared references, history, qualified uncertainty and Stage transitions. All unresolved semantics and failure cases are listed; independent review confirms compliance with the validated principles.

## T-01 · Formalize identification of NEEDs and contextually relevant CANs
**Type:** Conceptual / experimental | **Priority:** P0 | **Status:** **To experiment**

**Dependencies:** T-30 (shared Object model); coordinate with T-05.

**Scope:** Define reproducible criteria for discovering, identifying and attributing NEED and CAN relations to an origin Object (D-18, D-27, D-31, D-36–D-38), with their relevant linked Objects, roles, conditional mechanisms and contextual granularity. Distinguish existential/structural/functional NEED claims, conceptual versus functional necessity, correspondence/contribution from sufficient/necessary relationships, and incomplete discovery from impossibility. The separate 'attributable CAN' classification was explicitly retired under D-82 (T-01-K); continue testing whether current constitutive attribution criteria discriminate reliably. Qualify source evidence using D-46/D-47 without redefining the relation types. Explicitly test whether an alleged NEED is a necessary functional state, a safety margin, a legal constraint or a preference; specify measurable thresholds and separate volume/quality/continuous-availability criteria. Include cases where aggregated populations conceal a distinct secondary Subject's NEED.

**Closure criterion:** Operational identification criteria support documented synthetic and held-out examples; independent reviewers distinguish conceptual/functional necessity, evidence gaps and contextually relevant CANs, including group/system examples. D-82/T-01-K resolves the 'attributable CAN' category question; verify that attribution remains justified without an extra status. Include blinded cross-analyst checks for omitted vulnerable stakeholders, contested thresholds, and false necessity claims; report disagreements rather than silently choosing one taxonomy.


**D-82 validated operating criteria (2026-11-16; T-01 remains OPEN):** The author approved T-01-A–M, including revised B/H/J and safeguards L/M. The prospective stand-alone `attributable CAN` category is retired by T-01-K; attribution itself is not retired. Full wording lives in [§3.5 of the reference](reference/trialectic-method.md) and [D-82](DECISIONS.md). A versioned, synthetic discriminating corpus and v2 structural projections are in [tests/cases/t01-identification-v1.json](tests/cases/t01-identification-v1.json), exercised by [tests/test_t01_identification.py](tests/test_t01_identification.py). These do not constitute independent research or close T-01; maintain the blinded cross-analyst and empirically grounded closure requirements.

## T-02 · Define CAN actionability, NEED satisfaction and contextual Power evaluation criteria
**Type:** Conceptual / experimental | **Priority:** P0 | **Status:** **To resolve**

**Dependencies:** T-30, T-01.

**Scope:** Operationalize the difference among a CAN's identified action conditions, actionability for a specified relationship, **the contextual Power comparison and its NEED/CAN/Scenario-focused evaluation outputs** (D-48, D-51–D-64), NEED effective satisfaction, and temporal compliance (D-27, D-31, D-33–D-35, D-40–D-43). Specify how incomplete/unknown inventories, alternative and joint pathways, contextual necessity/sufficiency and circular dependencies affect each conclusion. Preserve epistemic indeterminacy distinct from a binary property when all relevant conditions are known. Methodological evidence checks (D-46/D-47) must not be confused with Object/condition states. Test CAN actionability versus partial actualizability versus conditional sufficiency when a functioning resource delivers less than required (e.g. a lamp with 20 rather than 70 minutes of autonomy, or a pump delivering 8 rather than 10 m³/h). Specify time-indexed joint conditions and distinguish known insufficiency from unknown output/NEED quality.

**Closure criterion:** A documented model with explicit counterexamples shows when actionability does or does not settle the **contextual possibility of a specified Actualization**, separates NEED satisfaction from candidate matching, and handles unknown and circular pathways. Statistical estimation method and its limits are specified without ungrounded numerical certainty. Demonstrate counterexamples in which a CAN remains actionable while the focal NEED is unmet, and where final-state sufficiency fails a continuous NEED; document the assumptions and epistemic status of each conclusion.

## T-05 · Clarify boundaries and identities of Object types
**Type:** Conceptual / experimental | **Priority:** P0 | **Status:** **To resolve**

**Dependencies:** T-30; coordinate with T-01.

**Scope:** Test Object boundaries and persistence of identity across Individuals, Groups, Technical Objects, Systems and Semantic Objects, using stable IDs, versioned Definitions, existential and structural constituent references, shared constituents and Parent/Children lineage. Distinguish conceptual from functional existence, contextual changes preserving identity from changes requiring a branch, and optional conceptual-Object representations of CANs. Record ambiguous examples and their unresolved criteria.

**Closure criterion:** Category-sensitive tests document which Definition changes preserve Object ID, which contradictory changes create descendants, and when a constituent is necessary for conceptual or functional existence; ambiguous cases and the status of semantic Objects are explicitly retained.

## T-15 · Formalize Subject contextualization and Environment selection

**D-89 (VALIDATED principle; protocol OPEN):** Context expansion/relevance decisions must consider **the current Focus AND the overall problem, the analytical purposes and other potentially affected Subjects**; neither the initial Subject/Environment inventory nor a narrow Focus can exclude those considerations. Pilot a human-readable relevance record for justifying inclusions/omissions without pretending to exhaust all affected Subjects; see [D-89 exploratory pilot](research/tria-dev-relevance-focus-pilot-2026-11-17.md).
**Type:** Conceptual / protocol | **Priority:** P0 | **Status:** **To resolve**

**Dependencies:** T-30, T-05; coordinate with T-03.

**Scope:** Define a reproducible procedure for selecting the focal Subject (an Object), identifying initially relevant constituents, NEEDs, CANs, relations and Environment Objects, and expanding context iteratively in response to the selected Focus. Distinguish constituent, accessible and indirectly relevant Objects; specify transitions to Secondary Subjects, shared Objects and later Stages. Do not require equal emphasis on Subject, Environment and Semantics. Clarify the remaining terminological role of 'Situated Subject' without silently changing a validated definition. Add an explicit search/check for hidden or aggregated Secondary Subjects and affected external Objects (such as vulnerable residents and a supplying neighboring system), plus an audit of which consequential NEEDs and externalities were omitted during initial contextualization.

**Closure criterion:** Case traces justify initial identification, contextual Definition expansion and Subject/Environment choices, including transitions to shared constituents and Secondary Subjects, without conflating conceptual and functional necessity. Include independently reviewed context-expansion cases in which newly discovered affected Subjects materially change the Scenario assessment; record both omitted and deliberately excluded Objects.

## T-03 · Make the analysis protocol reproducible
**Type:** Protocol / experimental | **Priority:** P0 | **Status:** **To develop**

**Dependencies:** T-30, T-01, T-02, T-15 (iterative interfaces).

**D-85 priority / conceptual first:** Map the **three phases**—Understand, Explore, Decide—to explicit human-auditable operations: inputs, analytical focal question, Subject/Environment/Semantics considerations, premises and evidence, information gaps, candidate possibilities, criteria, decisions (including deferral), and recursive revision. Define legitimate **exit points** after Understand or Explore as well as the complete path; distinguish overarching phases from local `Stage` and `Focus` operations. Test readability and usefulness with examples before imposing another data/schema layer. The existing NEED/CAN–Actualization implementation below is **a specialized subworkflow, not a universal prerequisite**.

**Legacy technical scope, to be re-scoped under D-85 rather than discarded:** Specify an end-to-end executable and human-auditable analysis protocol: select Subject and Focus; contextualize Objects; identify NEED/CAN relations and conditions; evaluate Power, pathways and inventory completeness; generate and compare Scenarios; register simulated/observed Actualization, state changes, uncertainty and recursive reassessment. Define inputs, versioned identities, assumptions, deterministic or explicitly qualified results, decision points and histories. Integrate D-42–D-47 logical/causal graphs and evidence assessments as protocol components. **OPEN:** implementation schemas, independent reproductions, source-auditable proof review and CI. Define a human-readable and machine-checkable minimal trace that maps one case through the normative Analysis v2 and PowerEvaluation v2 records, including versioned NEED/CAN assessments, compatible dependencies, candidate Scenarios, independent branches and evidence-only revisions.

**Closure criterion:** Independent reproductions agree on graph identities, versioned snapshots, temporary vs actualized branches, shared-reference propagation and relevant decisions; any divergent interpretations and unresolved operational definitions are documented. Two independent analysts must be able to reconstruct the same declared-case inputs, decisive condition checks and Scenario revisions; divergence must be preserved and diagnosed, not resolved by undocumented analyst judgment.

**Implementation progress (2026-11-16; NOT task closure):** The test-only Python reference model and ten original decision-linked golden JSON cases remain in `tests/`. A linked seven-evaluation synthetic `PowerEvaluation` fixture and 20 dedicated cross-Focus checks were added under D-57–D-64. [GitHub Actions run 43823308169](https://github.com/Nirgalz/trialectic/actions/runs/43823308169) passed 35 tests before the consolidated D-64 documentation updates. These are synthetic structural checks, not a production Power engine, full JSON Schema, validated recursive propagation algorithm, independent reproduction or scientific validation.


## T-16 · Generate NEED- and CAN-focused Resolution Scenarios
**Type:** Protocol / computational | **Priority:** P0 | **Status:** **To develop**

**Dependencies:** T-02, T-03; coordinate with T-18.

**Scope:** Generate distinct, relevant Resolution Scenarios for a selected NEED or CAN: direct CAN, joint CANs, alternative pathways, enabling dependencies and third-Object intervention in cycles (D-29–D-43). Evaluate actionability and conditional sufficiency, discover potentially unrecorded relations when justified, distinguish failure to find from impossibility, and retain unresolved or conflicting effects as hypotheses or localized suspensions (D-44/45). Preserve temporal constraints, adverse feedback, version-pinned events, and D-46/47-qualified evidence without presuming exhaustive or equally likely branches. Add with/without-CAN counterfactual tests for necessity within one Scenario versus alternatives across Scenarios, plus a deliberate check that a candidate correspondence is not promoted to causal sufficiency. Cover joint restrictions-plus-generator, conditional tanker supply and cycle-breaking fuel alternatives.

**Closure criterion:** A reproducible prototype finds and evaluates distinct one-CAN, joint-CAN and enabling-CAN pathways, reports missing conditions, and can expand beyond an incomplete initial inventory when justified. Include counterexamples for undiscovered valid relations, no-result versus context-specific infeasibility, false matching and temporal violations despite satisfied final states, without claiming continuity at unsupported temporal resolution. Retain temporary simulation histories and independent comparisons. Show complete/incomplete pathway coverage, Scenario-relative necessity and conditional sufficiency on both synthetic stress cases; preserve unverified external sourcing as an unknown rather than a successful branch.

## T-18 · Reassess Scenarios and effects with non-monotone state transitions
**Type:** Experimental / computational | **Priority:** P0 | **Status:** **To experiment**

**Dependencies:** T-16, T-02; coordinate with T-24 and T-29.

**Scope:** Build and test non-monotone Scenario reevaluation following Actualizations: favorable and unfavorable effects, delayed/temporary transitions, expirations, dependency-driven condition/pathway updates, changes to shared Objects, and isolated versioned histories (D-33–D-45). Implement explicit competing-effect diagnosis, justified priority or hypothetical branches, localized suspension, temporal NEED satisfaction/compliance and event-time ordering. Keep a knowledge/evidence revision separate from a registered simulated/observed Object transition; test time jumps, multiple conflicts and independent unaffected actions. Include delayed deliveries that produce a temporary NEED violation despite an acceptable final stock, non-monotone output degradation, and new evidence that changes an evaluation without altering any effective Object state. Reassess only dependent evaluations, leaving independent branches and histories unchanged.

**Closure criterion:** An independent transition oracle checks historically immutable snapshots, shared component changes, branch isolation/promotion, non-monotone and delayed effects, and both final-state and interval/continuity-specific NEED satisfaction. Report indeterminate temporal compliance when internal action effects cannot be resolved. Reproduce time-indexed minimum-state checks (including within-interval violations), revisions of justification/uncertainty without physical events, and selective propagation after an input correction.

## T-21 · Operationalize recursive relevance and complexity management

**D-89 (VALIDATED safeguard; operational questions OPEN):** Explore six **provisional** selection dimensions—problem/Focus connection, expected analytical contribution, impact severity, evidence uncertainty, investigation cost and omission risk—with optional actions **investigate / monitor / suspend / exclude-in-scope**. Do **not** treat these as approved requirements, numeric scores or a safe automatic stopping rule. Record reentry triggers and scope-limited termination with retained severe/uncertain omissions. Compare analyses with and without an explicit Focus, holding the global relevance safeguard fixed; document what is gained or lost. See [synthetic trIA-dev pilot](research/tria-dev-relevance-focus-pilot-2026-11-17.md).
**Type:** Computational / experimental | **Priority:** P0 | **Status:** **To develop**

**Dependencies:** T-03, T-16; coordinate with T-04.

**Scope:** Formalize recursive relevance and stopping criteria for known dependency exploration and discovery of unrecorded NEED–CAN links, across expanded Definitions, Subjects and Environments. Account for attention/compute limits, uncertainty, evidence quality, probability only where justified, possible severity of omitted consequences, combinatorial Scenario branching and time costs. Preserve traceable reasons for pruning; finding no solution in the explored scope never proves global impossibility. Add adversarial omission tests for low-frequency/high-magnitude harms, hidden secondary Subjects and unverified quality constraints; the stopping decision must expose what was not checked and when such omissions could reverse a Scenario conclusion.

**Closure criterion:** Cost/quality analysis demonstrates safe or documented trade-offs under shared-component propagation, competing branches and recursive Subject changes, and identifies cases where pruning misses important effects. Document resource costs and known missed critical effects under alternative stopping budgets, including an explicit 'indeterminate' outcome when analytical completeness is not defensible.

## T-24 · Test edge cases, falsifying examples and implementation failures
**Type:** Experimental / quality | **Priority:** P0 | **Status:** **To experiment**

**Dependencies:** T-01, T-02, T-03 (iterative); coordinate with T-18.

**Scope:** Maintain adversarial, reproducible regression tests covering the **whole validated architecture** (D-25–D-47), not just the latest evidence-model pilots: Object identity/versions, NEED/CAN and Power, incomplete inventories, three-valued nested logic and cycles, temporal constraints, adverse Actualization effects, Scenario isolation, contradictory effects and localized suspension, epistemic/physical separation, evidence provenance, methodological applicability and claim overreach. Include synthetic counterexamples and held-out real cases, independent oracles/reviews, regression reports and CI. Distinguish software invariants from scientific evidence and task closure. Add proposed adversarial fixtures for the simple lighting case and the multi-Object water-supply crisis: outdated battery information, partial CAN output, hidden secondary NEEDs, final-state versus continuous satisfaction, resource depletion, delayed tanker delivery, neighboring-system harm, circular fuel/energy dependency and conflicting evidence with localized suspension. Test both v2 structural validation and separate semantic/causal expected results; do not count a passing schema as proof of correct inference.

**Closure criterion:** A versioned suite has explicit expected outputs for branch promotion, shared Objects, historical versions, actionability/Power and uncertainty, with regression reports and unresolved conceptual disagreements. Publish versioned expected outputs and negative cases for each perturbation, including preserved original evaluations/Definition snapshots, no fabricated Actualization events, and no unsupported feasibility or causal claims; distinguish implemented checks from planned tests.

**trIA representation checks (PLANNED, not implemented):** Add D-97 regressions for Object Focus selection versus mere inspection, local-to-global selective Scenario revisions, preservation of untouched results, epistemic versus physical updates, no fabricated Objects and Scenario Focus eligibility. For paired AI answer/explicit-map outputs, test unsupported extra graph nodes or links, mismatch between prose qualifiers and displayed certainty, dropped premises/context, inverted relation roles, missing cross-references, forced NEED/CAN where not applicable, and confusion between a justificatory cycle and an Object-domain cycle. These are *faithfulness and interpretability tests*, not automated proof of correctness.

**Implementation progress (2026-11-15; NOT task closure):** `tests/test_core.py` includes golden-case, truth-table, ordering-invariance, versioned-reference, branch-isolation, temporal and epistemic/physical non-regression checks. `tests/test_traceability.py` checks that case decision references exist. GitHub Actions is configured; source text changes are NOT automatically semantically interpreted, and live-AI tests remain OPEN.


## T-27 · Assemble and maintain case-study and benchmark corpora
**Type:** Corpus / experimental | **Priority:** P0 | **Status:** **To develop**

**Dependencies:** Start early with T-03 and T-24; coordinate with T-04, T-16, T-19.

**Scope:** Assemble a versioned, traceable corpus of **synthetic and real-world cases** used across T-03, T-04, T-16 and T-24: identified Objects and shared constituents, versioned Definitions, NEED/CAN pathways, alternate Scenarios, delayed/adverse effects, uncertainty and source provenance. Include positive, negative, no-benefit and harmful cases, comparative baseline prompts, independent expert rubrics, held-out sets and discriminating tests; do not treat the five manually annotated D-47 publications or internally generated test oracles as validated ground truth. Prepare a minimal usable benchmark early and expand iteratively. Seed the next benchmark increment with two explicitly synthetic, source-labeled worked cases: (i) one-hour lighting with alternative pathways and an evidence-only autonomy correction; (ii) twelve-hour water supply with multiple affected Subjects, time-dependent stock, quality uncertainty, generator/fuel limits, conditional tanker supply, third-party reserve loss, cycles and contradictory evidence. Include baseline assumptions, perturbation variants, expected invariants, disputed decisions and non-exhaustive inventory labels; mark these cases PLANNED until fixtures exist.

**Closure criterion:** A versioned synthetic/real case corpus includes traceable provenance, branch/interaction histories, expert criteria or independently validated reference outcomes, and a held-out evaluation split suitable for T-04 and T-24. Provide independently checkable reference calculations, explicit uncertainty labels and held-out perturbations for both cases, plus a cross-analyst agreement protocol; registering the cases is not evidence of empirical validity.

**trIA paired-output benchmark (PLANNED):** Add D-97 same-input trials for initial A/B map choices, Object-Focus return traces including shared dependencies, semantic clarification and negative controls, C+ explicitly requested versus absent, and unaffected-Scenario preservation. Add matched sets of (a) a frozen user question, (b) a natural-language AI answer, (c) the AI's explicitly stated justification/structured representation, and (d) expected and disputed text-to-graph correspondences. Include simple, branching, cyclical, uncertain, and non-NEED/CAN examples; compare text-first, structure-first and jointly produced outputs, including no-benefit and failure cases. Record human comprehensibility and unsupported graph assertions separately from Method-level analytical correctness.

**Implementation progress (2026-11-15; NOT task closure):** `tests/cases/core.json` provides ten minimal synthetic golden cases MT-01–MT-10 with decision links and expectations recorded separately from the test-only reference model. A case corpus with independent ground truth, real-world cases, held-out splits and AI comparison remains OPEN.


# P1 — Comparative evaluation, Scenario interpretation and AI

## T-04 · Test comparative usefulness against non-trialectic analyses
**Type:** Comparative / experimental | **Priority:** P1 | **Status:** **To experiment**

**Dependencies:** T-03 and T-27; start exploratory baselines before completion of T-16/T-21 when a comparable test protocol is available; coordinate with T-19 and T-20.

**trIA representation evaluation (PLANNED, separate from Method-level benefit):** Compare text-only explanations against paired text + trIA representation on the *same frozen questions and disclosed evidence*. Measure whether readers better understand relations and uncertainty, locate and challenge a weak assumption, and notice inconsistencies; count additional unsupported claims, time and workload. Do not infer that better graph navigation proves better analysis or that requiring structured output improves AI reasoning.

**D-85 research update:** Compare three legitimate usage depths—**Understand**, **Understand + Explore**, and **Understand + Explore + Decide**—against equally scoped baselines. Evaluate problem reformulation, relevant relationship discovery, interpretive/semantic awareness, explicit uncertainty, alternative diversity, transparent decision rationale and analysis effort. Not all exercises should have a mandated decision or single known best answer.

**Scope:** Measure whether default **Advanced Mode** actually improves problem understanding, accurate dependency/consequence reasoning, justified Scenario diversity, uncertainty treatment and user comprehension versus free-form and generic structured baselines. Use comparable tasks, information, compute budgets, independent ratings and adverse/no-gain cases, with T-27 benchmark cases. **T-19 is the problem-class subgroup analysis within this evaluation.** Begin limited pilot comparisons as soon as defensible protocols exist; do not infer superiority from self-authored tests. Simple Mode remains deferred under D-28. Add a controlled reproducibility arm in which at least two independent analysts apply the same Method specification to identical cases before comparing with free-form and generic structured baselines. Measure stakeholder/NEED recall, internal consistency, overlooked temporal and adverse effects, unjustified causal claims, analysis time and inter-analyst disagreement.

**Closure criterion:** A preregistered or transparently documented, reproducible and independently assessed comparison against non-trialectic baselines reports outcomes, uncertainties, limitations, error classes, negative findings and generation/evaluation costs. Include the T-19 problem-class subgroup analysis; do not claim unique benefit without evidence. Report analyst agreement and error severity alongside accuracy, coverage and effort; include cases where the Method adds no benefit or increases overhead.

## T-19 · Identify problem classes where the Method adds value
**Type:** Comparative / experimental | **Priority:** P1 | **Status:** **To experiment**

**Dependencies:** Joint workstream within T-04, using T-27 cases; subgroup design should be fixed before assessing comparative results.

**Scope:** **Joint workstream under T-04 (not a second autonomous experiment).** Segment the controlled comparative results by problem class—networked dependencies, circular effects, multi-Subject conflicts, heterogeneous evidence, adverse feedback and uncertainty—to identify when Advanced Mode helps, adds no value or performs worse. Use the same test protocol, benchmark and independent ratings as T-04; retain this historical task ID and its separate subgroup-analysis deliverable.

**Closure criterion:** The T-04 comparative results include explicit, reproducible subgroup findings on supported, neutral and harmful problem classes, with uncertainty and no assumption of a single best solution.

## T-17 · Compare Resolution Scenarios under interacting constraints
**Type:** Comparative / protocol | **Priority:** P1 | **Status:** **To develop**

**Dependencies:** T-16, T-18; coordinate with T-23 and T-29.

**Scope:** Compare generated Scenarios without collapsing feasibility, uncertainty about conditions, complexity, resource costs, temporality, expected effectiveness, successful Actualization and particular favorable/adverse effects into one score. Preserve D-35 NEED effective satisfaction versus temporal compliance, explicit exceptions, non-monotone feedback, affected Objects and source/evidence limits. Selection, when requested, is conditional on openly stated criteria, not an automatically universal optimum. Include explicit per-Subject and time-indexed outcome matrices: minimum reserve during an interval versus final reserve, partial contribution versus whole-NEED sufficiency, and water volume versus unverified potability. Evaluate qualitative cross-Subject harms without converting them into an unsupported aggregate score.

**Closure criterion:** Reproducible evaluation reports for multiple Scenarios present their trade-offs, qualified probability/uncertainty, coherence and affected Objects without assuming a unique optimum; any optional ranking is labeled with the governing decision criteria and its instability. Comparisons must expose a scenario that meets the focal final-volume target but breaches continuity or harms a supplying third party, without automatically selecting a winner.

## T-25 · Compare relevant theoretical and algorithmic approaches
**Type:** Theoretical / comparative | **Priority:** P1 | **Status:** **To investigate further**

**Dependencies:** T-30; coordinate with T-04 and T-19.

**Scope:** Compare the Method's assumptions and operations against relevant existing frameworks (capability/affordance approaches, systems thinking, theory of constraints, graph search, planning and dependency analysis, structured prompting and evidence-appraisal methods). Identify genuine differences and overlapping techniques using primary sources, reproducible examples and observed usefulness rather than asserted originality; coordinate testable propositions with T-04/T-19.

**Closure criterion:** A comparison matrix of assumptions, operations, scope, empirical performance and differences is supported by primary sources and reproducible examples; originality is not asserted without evidence.

## T-20 · Design adaptive trialectic dialogue for AI

**D-95 priority correction:** The trIA-facing deliverable is a readable representation of the AI's explicit reasoning: Objects, contextual NEED/CAN connections, navigation and selectively inspectable context. Critical examination and Scenario evaluation remain AI/Method activities where relevant, **not obligations of the graph renderer**. Test legibility and loss of contextual meaning before proposing new evaluative structures.

**trIA P0 investigation (initial A/B choices validated under D-97; implementations OPEN, 2026-11-17):** Study how an AI normally composes a natural-language answer and how a portable instruction can request a *second*, aligned explanation using trIA's relevant Object/NEED/CAN concepts and contextual relationships. Compare text-first, graph-structure-first and coordinated production without asserting access to private model reasoning or forcing every topic into NEED/CAN. Specify cross-references from claims/passages to nodes/relations, the handling of uncertain or unsupported mappings and a text-only fallback. Deliver a small testable instruction plus paired response/representation examples before proposing mandatory schemas or changes to the renderer; see the trIA-specific workstream at the top of this TODO.

**Type:** Applied / experimental | **Priority:** P1 | **Status:** **To develop**

**Dependencies:** T-03, T-15; coordinate with T-04.

**D-80 design milestone (November 16, 2026):** The AI-assisted dialogue protocol at [applications/ai-assisted-analysis/dialogue-protocol.md](applications/ai-assisted-analysis/dialogue-protocol.md) is author-approved as an interaction design aligned with the normative v2 `schemas/model/` records. Standalone instruction packaging, operational host integration, structural/semantic fidelity tests and controlled usability/learning comparisons remain to be implemented and evaluated; T-20 is not closed.

**Scope:** Design an adaptive AI dialogue for the default Advanced Mode that identifies the Subject, NEED/CAN Focus, context and uncertainty, presents multiple defensible Scenarios and their trade-offs, and lets a user inspect stated assumptions, source support, missing conditions and consequences. Balance relevance and conversational economy with traceability, D-46/47 evidence distinctions and iterative Definition expansion. Evaluate usability with T-04 without pretending Simple Mode is implemented or automatically selecting one best answer.

**Closure criterion:** A prototype enables users to inspect and compare distinct Scenario alternatives and trace consequences and uncertainty without fabricating observations, imposing one best Scenario or confusing temporary branches with actualized Objects.

# P1 — Contextual semantic research

## T-06 · Distinguish constitutive, significant and associated concepts
**Type:** Conceptual / experimental | **Priority:** P1 | **Status:** **To experiment**

**Dependencies:** T-30; coordinate with T-11 and T-01.

**Scope:** Characterize constitutive, meaning-significant and merely associated concepts using explicit counterexamples; distinguish semantic/meaning necessity from actual existential, structural or functional NEEDs of non-semantic Objects. **Semantic program A:** coordinate identity/equivalence work T-07/T-12 and structural dependencies T-08–T-11; do not assume every Object requires a Semantic Pyramid.

**Closure criterion:** Discriminating tests and counterexamples distinguish the three relations with documented uncertainty.

## T-07 · Establish an independent criterion for identity of Meaning
**Type:** Conceptual / experimental | **Priority:** P1 | **Status:** **To resolve**

**Dependencies:** T-06; work jointly with T-12.

**Scope:** **Semantic program A — jointly with T-12:** develop non-circular criteria for whether a Meaning remains the same despite changes of Expression, conceptual network and context. Separate identity from degrees or scopes of equivalence; test independent positive/negative examples and avoid defining the answer by an already assumed equivalence.

**Closure criterion:** Independent semantic-identity criteria discriminate relevant positive and negative cases without circular assumptions.

## T-12 · Establish criteria for semantic equivalence
**Type:** Conceptual / experimental | **Priority:** P1 | **Status:** **To experiment**

**Dependencies:** T-07 (joint semantic identity/equivalence workstream), T-08 where concept-network differences matter.

**Scope:** **Semantic program A — jointly with T-07:** operationalize semantic equivalence, contextual compatibility and incompatibility across expressions or conceptual networks; test the criteria derived in T-07 with blind or multi-analyst cases. Keep the two historical IDs for distinct identity and equivalence acceptance criteria, but avoid parallel duplicate corpora.

**Closure criterion:** Blind or multi-analyst examples show explicit decisions and uncertainty on equivalence.

## T-08 · Examine alternative and joint conceptual dependencies
**Type:** Conceptual / experimental | **Priority:** P1 | **Status:** **To resolve**

**Dependencies:** T-06, T-07; coordinated with T-09/T-10.

**Scope:** **Semantic program B — coordinated with T-09/T-10:** test joint, alternative and redundant conceptual prerequisites for a specified Meaning. Use shared examples and clearly separate conceptual structural constraints from empirically measured NEED–CAN causal dependencies.

**Closure criterion:** Representative cases distinguish alternative, joint and redundant conceptual prerequisites.

## T-09 · Examine circular conceptual dependencies
**Type:** Conceptual / experimental | **Priority:** P1 | **Status:** **To resolve**

**Dependencies:** T-06, T-07; coordinated with T-08/T-10.

**Scope:** **Semantic program B — coordinated with T-08/T-10:** examine circular conceptual necessity, mutual definitions and semantic-identity reference loops; distinguish actual constitutive circularity from a merely mutually referential description. Do not transfer causal third-Object cycle-breaking rules automatically to semantic relationships.

**Closure criterion:** A typology and controlled cases distinguish genuine circular constitution from mutual reference and non-essential association.

## T-10 · Examine direct and indirect constitutive dependencies
**Type:** Conceptual / experimental | **Priority:** P1 | **Status:** **To resolve**

**Dependencies:** T-06, T-08; coordinated with T-09.

**Scope:** **Semantic program B — coordinated with T-08/T-09:** evaluate direct, mediated and nested constitutive relations, their importance to Meaning and the difference between necessary versus significant indirect concepts. Do not infer physical or social causal influence from a short or long semantic-network path.

**Closure criterion:** Test cases identify nested dependencies and justify whether an indirect link is constitutive or merely significant.

## T-11 · Operationalize the Semantic Pyramid where appropriate
**Type:** Conceptual / protocol | **Priority:** P1 | **Status:** **To experiment**

**Dependencies:** T-06–T-10; coordinate with T-01.

**Scope:** **Optional semantic instrument — coordinated with T-06–T-10:** define when a Semantic Pyramid is useful for discovering candidate NEEDs of suitably modeled Objects, and when it should *not* be used. Treat it as a structured conceptual network that need not form a literal tree. Distinguish conceptual dependency, empirical existence conditions and functional-maintenance needs, with positive/negative example cases.

**Closure criterion:** A documented relevance criterion and procedure handle meaningful positive and negative use cases, including cases where a Pyramid should NOT be used.

## T-14 · Clarify Plasticity and Semantic Plasticity under NEED/CAN changes
**Type:** Conceptual / experimental | **Priority:** P1 | **Status:** **To resolve**

**Dependencies:** T-30, T-01; coordinate with T-18.

**Scope:** Distinguish Plasticity (aptitude to change CANs) from effective evolution, Definition revisions, semantic transformations, changes to NEED satisfaction and branching Object identity. Test emergence, modification, disappearance and discovery of Potentialities, including conceptual Objects when analytically useful. Whether the Plasticity concept extends to NEED transformations remains an explicit open question, not a preapproved extension.

**Closure criterion:** Worked cases distinguish changes in the same Object's versioned Definition from contradictory branches and from mere discovery or uncertainty revision, without silently changing the validated Plasticity concept.

# P2 — Complementary measures, normative analysis and deferred semantic application

## T-13 · Reconstruct individual Semantic Pyramids
**Type:** Protocol / experimental | **Priority:** P2 | **Status:** **To experiment**

**Dependencies:** T-11, T-12; activate only after relevance/usefulness is established for this specialized application.

**Scope:** **Deferred specialized semantic application**, pending demonstrated usefulness of T-11/T-12 in concrete dialogue or analysis. When justified, test partial evidence-based reconstruction of an individual's Semantic Landscape/Pyramids with consent and a clear separation between the person's statements and the analyst's projections; define situations where reconstruction is inappropriate or too costly. This is not a prerequisite to general architecture or first Advanced Mode benchmarks.

**Closure criterion:** A documented evidence-based reconstruction process is applied to consented examples with recorded disagreements and limitations.

## T-22 · Specify complementary measures of Power without redefining it
**Type:** Conceptual / quantitative | **Priority:** P2 | **Status:** **To resolve**

**Dependencies:** T-02; coordinate with T-17.

**Scope:** Treat any binary sufficient-pathway indicator as a possible contextual **output of the Power analysis**, not as the validated definition of Power (D-48). Preserve separate indeterminate assessments where evidence is incomplete. Investigate probability of positive Power distinct from probability of successful Actualization, and complementary nonprobabilistic qualitative indicators. Require explicit models, statistical calibration and counterexamples; avoid converting unverified data to invented confidence percentages. Defer numerical methods until suitable data exist.

**Closure criterion:** Statistical and non-statistical measures are clearly named, justified and tested with counterexamples showing distinct actionability, contextual Power outputs and outcome uncertainty.

## T-23 · Formalize normative trade-offs among Objects and Subjects
**Type:** Normative / conceptual | **Priority:** P2 | **Status:** **To resolve**

**Dependencies:** T-17, T-29.

**Scope:** Develop transparent **normative evaluation criteria** for conflicts among Objects and Subjects, unacceptable exploitation/exclusion/superiorism, acceptable harm, compensation and alternatives. Distinguish observed distributive effects (T-29) from values and criteria used to judge them; do not presume one universally optimal balance or automatically aggregate dissimilar harms. Use the water-transfer stress case to define how to document an unresolved conflict between the focal community's water NEED and a neighbor's minimum reserve, while keeping value judgments distinct from observed or simulated physical effects.

**Closure criterion:** A comparative decision protocol identifies whose NEEDs and CANs are affected, justifies criteria and acknowledges irreducible conflicts. Include an explicit irreducible-trade-off case and show how decision criteria and affected Subjects are declared without inferring a universal optimum.

## T-29 · Evaluate distributive effects of Actualizations on NEEDs, CANs, Potency and Power
**Type:** Normative / experimental | **Priority:** P2 | **Status:** **To resolve**

**Dependencies:** T-18, T-17; coordinate with T-23.

**Scope:** Trace **descriptive distributive consequences** of simulated/observed Actualizations across Subjects and shared or dependent Objects: NEED satisfaction, CANs, Potency, Power, indirect/delayed harms and possible compensations. Compare alternative Scenarios with contextual uncertainty, preserving time, version and provenance. Normative acceptability is evaluated separately under T-23. Add the intermunicipal transfer counterexample: a 60 m³ delivery can improve the focal system while violating a 100 m³ reserve requirement in a supplier starting with 130 m³. Track the distribution by Subject, interval and quality condition; do not silently treat an unverified water source as a satisfied NEED.

**Closure criterion:** Multi-Object case analyses trace effects through shared references and distinguish simulated distributional outcomes from observed ones. Demonstrate that both beneficiary and supplying Object retain distinct effective NEED evaluations, with their own uncertainties and temporally scoped consequences.

# P3 — Practical tools and ongoing governance

## T-26 · Create practical tools and use modes
**Type:** Tooling / design | **Priority:** P3 | **Status:** **To develop**

**Dependencies:** T-03, T-16; coordinate with T-20.

**D-85 design boundary:** Prototype the user's ability to **stop, resume and revise** at Understand or Explore, and to enter Decide only when warranted. Preserve traces of questions, competing interpretations, alternatives, criteria, justifications and uncertainty; do not force an automated winner or encode unresolved phases as a final standard.

**trIA-specific priority: P0 for the minimal presentation surface only (D-97 behaviors author-validated; implementation OPEN):** Offer an initial Simple/Detailed map choice, a working user-requested C+ refinement action, and a deliberate Object-Focus deepening action with Subject/Environment/Semantics contextualization and return-to-overview selective review. Render, inspect and navigate the explicit structured justification associated with the AI's natural-language answer, with understandable links between text passages and relevant graph nodes/relations. Preserve original qualifications, distinguish unsupported/absent mapping from negative findings, and keep output independent from user navigation state. Do not make advanced editors, a new data model, auto-inference or persistence prerequisites for a useful prototype. This trIA priority does not replace T-26's existing project-level P3 ranking.

**Prior specialized tooling scope:** Develop practical tools for the default Advanced Mode: transparent Definition and version editors; stable Object/NEED/CAN references; Subject/Focus selection; alternative Scenario exploration, timelines, dependency views and user-readable provenance/uncertainty. Validate alignment with T-03/T-16/T-20 before treating a prototype as normative. **Simple Mode remains deferred** and is neither implemented nor a current requirement (D-28).

**Closure criterion:** Advanced Mode tools demonstrate a transparent multi-Scenario, versioned-Definition workflow with correct state separation and understandable trade-offs; any later Simple Mode is a new separately evaluated decision.

## T-28 · Maintain the reference, TODO, decisions and Git tag-based releases
**Type:** Governance / tooling | **Priority:** P3 | **Status:** **Ongoing**

**Dependencies:** Continuous; coordinate with all tasks and decisions, especially T-03 and T-24.

**Scope:** **Ongoing governance process, not a one-time research hypothesis:** keep the canonical English reference in `reference/trialectic-method.md`, the validated decision history in `DECISIONS.md` and actionable work in `TODO.md`. Keep experimental results concise in TODO rather than accumulating duplicate narrative reports. Document and, when explicitly authorized, execute a Git-tag release process with verifiable commits; maintain stable IDs and accurate links. Do not claim tags, CI coverage or independent validation without verification. Audit current French practical guidance and legacy TODO wording for divergence from D-48's validated definition of Power as a contextual comparative analytical operation; keep any binary pathway indicator identified as an output rather than the definition of Power. Align references to the normative v2 structural profile without implying that semantic/causal engines are complete.

**Closure criterion:** The canonical reference, decision log and work register remain linked and consistent; release procedure and Git tags are documented and verified when executed. Continuous checks are performed at each relevant change rather than treating governance as a once-only closure. When the guidance is revised, verify that both language versions distinguish Power operations, possible binary outputs, CAN actualizability and effective NEED satisfaction; record document synchronization separately from conceptual validation.

