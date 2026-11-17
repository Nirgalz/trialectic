# AI-assisted Trialectic Method — Adaptive dialogue protocol

## Interactive presentation invocation (D-90, November 17, 2026)

The author-approved commands `use trIA-c` and `use trIAd-c` select the
[Cytoscape.js prototype](../triad-graph/README.md) for standard trIA and trIA-dev
respectively; `use trIA-dev-c` is the long-form development alias. The `-c`
suffix changes presentation only. Use the current analytical records, inspect
local relations by clicking a node, and restore the complete map with
**Vue générale**. Keep conceptual and methodological graphs separate.

Reuse/start the local prototype and request an adjacent preview when the host
permits it. Verify actual display; queued opening is not success. If interactive
execution is unavailable, disclose that limit and use text/Mermaid fallback.
There is no automatic conversation synchronization or universal persistence.
Commands without the suffix retain their existing visualization convention.
Prototype approval does not change the normative data contracts or validate
causal reasoning, scientific claims or general usability.

**Status: VALIDATED DIALOGUE DESIGN — revision 1.0, November 16, 2026 (D-80).** The author has approved this AI-assisted dialogue protocol for the **`dev`** branch. Its interaction requirements are adopted as design guidance; this does **not** certify a working AI implementation, demonstrate educational or analytical benefit, alter the Method's concepts, or resolve open evaluation algorithms. The [working reference](../../reference/trialectic-method.md) is the conceptual authority; the [normative v2 exchange contract](../../schemas/global-model.md) and modular [`schemas/model/`](../../schemas/model/README.md) files govern structured data. Related work: [T-20](../../TODO.md), T-03, T-04, T-15, T-16, T-21, T-24, T-27 and T-30.

## D-95 clarification — trIA representation versus AI analysis

trIA's primary task is to make **reasoning explicitly presented by an AI** understandable, navigable and usable by a human. The **AI**, not trIA's graphical layer, performs the underlying interpretation, critical examination and possible Scenario comparisons when relevant; the **human** controls the purpose and examination. A visualized explanation must never be presented as access to private model reasoning.

**Minimal default:** show the relevant Objects and their NEED/CAN connections, together with enough context to interpret each selected connection. NEED and CAN remain the Method's existing conceptual Objects; their **displayed relationships** can express different contextual roles. Show explanations, uncertainty, conditions, provenance, assessments, Scenarios or methodological steps selectively, through inspection or an explicit request, not as an obligatory full graph.

**No automatic auditor:** trIA is not required to grade Inferences, establish justificatory independence, compute validity or robustness, resolve cycles or propagate evidential verdicts. Cycles can remain visible and inspectable without being declared invalid or automatically corrected. The previously proposed specialized provenance/admissibility model (discussion D-96) is not adopted as a trIA requirement. These scope clarifications do **not** delete D-93/D-94 from the Method or change existing data contracts.

The detailed methodological instructions in sections 2–4 below guide an **AI using the full Method where relevant**; they are **not mandatory rendering fields** for trIA. Technical exchange/export guidance in section 6 applies only when such a structured export is explicitly requested or technically necessary, not for ordinary visual explanations.

## 1. Purpose and scope

Specify an **approved portable dialogue design**, suitable for adaptation into an instruction document supplied by a user to a capable conversational AI, that guides AI-assisted application of the Trialectic Method. The same guidance should work in an ordinary text interface and, where the host genuinely supports them, richer interactive interfaces.

The goals are (a) understanding complex systems and their interdependencies, (b) comparing materially distinct Resolution Scenarios and their consequences, and (c) helping the user progressively learn to reason about complex systems themselves. The AI assists analysis; it must not substitute an unwarranted claim of authority for the user's judgment. The approved protocol is a set of **requirements to implement and evaluate**, not a verified product or an empirical success claim.

**Design separation:** the canonical Method defines the analytical concepts and validated distinctions; this protocol specifies the approved user–AI interaction; optional UI components present or manipulate the results. Presentation depth is not a separate simplified analytical Method. **Advanced Mode remains the default**; Simple Mode remains deferred.

## 2. Invariants inherited from the canonical Method

The following are distinctions for **AI-assisted application of the Method when relevant**, not a requirement to render or automatically verify every item in trIA:

1. An **Object** can be an Individual, Group, Technical Object, System or Semantic Object. The **Main Subject** is the Object selected for attention; **Secondary Subjects** may be analyzed where relevant. Contextual Environment and Semantics are relevant non-symmetrical perspectives, not mandatory three-way causal partitions.
2. The adopted recursive Stages are **Subject → NEED or CAN → Actualization → reassessment of Subject**. A satisfied NEED may call only for maintenance or no intervention.
3. A **NEED** is a necessity attributable to an Object for the existence, maintenance or realization of a specified state. A **CAN** is a contextually relevant **Potentiality** (D-48); **Potency** is the Object's list of CANs, not NEEDs. A CAN may require interventions by other Objects. Inventories may be incomplete. A NEED differs from its effective satisfaction, temporal compliance and its relations to CANs.
4. Each NEED and CAN has its **own Object ID**; distinct versioned, origin-anchored **relation records** attribute and connect them to other Objects (D-36/D-50/D-75). The relation's `represented_object`, bearer `origin_object`, referenced Object, link ID and relation ID are not interchangeable. Roles, weights and qualified links require contextual justification. A recorded link is not proof of causal contribution, sufficiency, necessity, actionability or Power.
5. Distinguish **CAN identification**, NEED–CAN correspondence, contribution, conditional sufficiency, Scenario-relative necessity, **CAN actionability for a particular contribution**, **contextual CAN actualizability**, **NEED effective/partial satisfaction**, **NEED temporal compliance**, the broader **Power evaluation**, an **Actualization effectively undertaken**, and **observed versus causally attributed effects**. Unknown information is not a negative finding.
6. **Power** is a **Focus-centered comparative analytical operation** (D-48/D-52), comparing the Object's NEEDs, the NEEDs of its CANs, and relevant NEEDs/CANs of its Environment. Its assessments identify NEED satisfaction, candidate contributing CANs and contextual possibilities of Actualization. **It is not a universal positive/negative binary value.** NEED satisfaction uses `satisfied` / `unsatisfied` / `indeterminate` (with justified optional degree); CAN actualizability uses `actualizable` / `partially_actualizable` / `not_actualizable` / `indeterminate`. Do not infer success or an unjustified numeric probability.
7. Separate **NEED effective satisfaction** from **temporal compliance** with its requirements and explicitly authorized exceptions. A final satisfied state does not imply continuous satisfaction or erase intermediate violations.
8. Generate and evaluate several **materially distinct, relevant** Resolution Scenarios when supported by the case. Do not fabricate alternatives to meet a fixed count; state when the inventory permits no defensible candidates. Scenario generation, evaluation and optional selection are separate. No mandatory overall score or universally best answer.
9. For Scenario evaluations, keep **feasibility, complexity, costs/resources, temporality and expected effectiveness** as independent justified dimensions, with explicit overall and, where applicable, dimension-specific uncertainty. An assessment's `status` (e.g. `assessed` or `indeterminate`) describes analytical completion, not physical feasibility. Distinguish feasibility uncertainty, success probability and possibility/probability of consequences.
10. Preserve **Object IDs and versioned Definitions**, historical states, constituent references, Parent/Temporary Children/Actualised Children lineage, Scenario context and isolation of contradictory temporary branches. Distinguish `hypothetical` / `effective` Scenarios; `observed` / `simulated` / `assumed` states; and `simulated_actualization` / `effective_actualization` / `observation` / `knowledge_revision` / `definition_revision` events. Simulation is **not** effective Actualization; an epistemic update is **not** itself a physical state change.
11. Distinguish **direct/indirect** from **immediate/delayed** effects; possibility from probability, magnitude from value, and anticipated from observed or causally attributed effects. Use **recursive relevance** and explicit complexity limits.
12. Assess important claims through **claim/evidence/assessment** with provenance, alternative explanations, possible contradiction and context-sensitive methodological quality (D-46/D-47). Something established inside a model is not thereby empirically established. Offer checkable external justifications, without claiming to expose private internal reasoning.

The **v2 field contracts are adopted** (D-77/D-78/D-79); reference integrity, complete semantic/temporal/causal algorithms, empirical proof and usability testing remain **OPEN**, not silently settled by this dialogue approval.

## 3. Approved conversation contract

### 3.1 Beginning an analysis

- Accept a natural-language question without demanding a form or specialist terminology.
- Extract a *provisional* Main Subject, user concern, potential NEED or CAN Focus, relevant context and time horizon from the user's message.
- Distinguish **user-stated facts**, **source-backed observations**, **working assumptions**, **candidate inferences**, **unknowns**, and **user value judgments**.
- If a missing fact materially changes the analysis, ask a targeted, comprehensible question; otherwise proceed provisionally and invite correction. Do not turn every methodological Stage into a required user confirmation.
- If the proposed Focus is ambiguous, show the alternative framings (e.g., a NEED to maintain a state versus a CAN to perform an action) and state which provisional framing is being used.

### 3.2 Working cycle — optional analytical depth, not a mandatory graph pipeline

The steps below are available to the AI when the user's problem warrants them. trIA represents the relevant part of the resulting explanation; it does not run these evaluations merely because a graph is shown.

**A — Subject and context.** Delimit the Main Subject and relevant Environment, its constituent/accessible/indirectly influential Objects, current temporal frame and goal. Keep the current scope explicit and revise it when new relations matter. Identify Secondary Subjects only when justified by an analytical dependency.

**B — NEED/CAN inventory and relations.** Identify relevant NEEDs, CANs and origin Objects; distinguish actual identified entries from hypotheses. For each significant NEED–CAN candidate, identify its claimed mechanism, role (direct contribution, complementary pathway, enabling action, inhibitory effect, etc.), necessary conditions, alternative pathways, and uncertainties. Search both inside and outside the initial inventory when the current Focus justifies it.

**C — Contextual Power appraisal.** Test correspondence, contribution, Scenario-relative necessity and conditional sufficiency with stated context and counterfactual comparison where possible. Perform Focus-specific Power evaluations: NEED (effective satisfaction, temporal compliance, candidate CANs), CAN (actualizability, prerequisites, potential contributions), or Scenario (actualizations contemplated, independent dimensions, effects, comparisons). Distinguish actionability, possibility/partial possibility, NEED satisfaction and outcomes; preserve indeterminate assessments instead of inferring negatives.

**D — Scenario exploration.** Create multiple *materially different* conditional Resolution Scenarios when defensible: single CAN, joint CANs, enabling/development steps, alternative pathways, maintenance/no action, and intervention by another Object where relevant. If no candidate is supported, state **no candidate identified within inspected scope**, not global impossibility. Retain missing prerequisites and circular dependencies visibly.

**E — Independent Scenario appraisal.** For each, identify key assumptions, unsatisfied/unknown Conditions, scope and times, likely or merely possible consequences, potentially harmed or helped Objects, and sources. Record five independent, justified dimensions and their `assessed` / `not_assessed` / `indeterminate` / `not_applicable` analytical statuses; keep the resulting findings distinct from epistemic uncertainty. Compare scenarios by explicit criteria without an arbitrary blended score. A recommendation or selection, if requested, must name its conditions and justification.

**F — Recursive reassessment.** Inspect how contemplated effects may change Object Definitions, NEEDs, CANs, conditions, Power, relations and Environment. Keep hypothetical branches isolated. Incorporate user corrections and new evidence as **knowledge revisions**, distinct from effective Object-state transitions. Continue recursion only while expected analytical relevance (including severe low-likelihood impacts) warrants the complexity; state what remains unexamined.

This is an **approved dialogue orchestration design**, not a replacement for the Method or a claim that its remaining OPEN Stage-specific procedures have been implemented.

### 3.3 What trIA should show

Use **progressive disclosure**, preserving meaning without overwhelming the primary view:

1. **Simple map by default:** the relevant Objects and selected contextual NEED/CAN relationships. Clearly identify the main Object or current question if one is in use.
2. **Interpretation on inspection:** what a particular link means **in this context**, including any condition, assumption, qualification or uncertainty necessary to avoid misleading the reader.
3. **Optional depth on request:** Scenarios, alternatives, methodological operations, Inferences, historical versions, sources or assessments when the human needs them. These are not mandatory additional node types or automatic trIA verdicts.
4. **Human navigation:** inspect an Object/link, return to the overview, and follow another branch without altering the underlying analysis merely by navigating.

Do not infer missing information, force NEED/CAN categories or assert that a visible relation is proven. A cycle can be displayed without solving it. The AI may critically discuss the represented reasoning when asked, but trIA itself does not verify it.

### 3.4 Interaction rules (approved design)

- Each turn should advance the user's actual question: answer directly when enough information exists; ask only clarification questions that can change an inference or next step.
- Users can revise the Main Subject, switch NEED/CAN Focus, inspect a dependency, challenge a claim, alter a Scenario assumption, compare branches, request sources, or request a concise/exportable state summary.
- **User corrections should be acknowledged and applied** to affected claims, Object/Scenario descriptions and conclusions. Preserve material distinctions between revised knowledge and changed states.
- Never label a hypothetical observation as measured, a scenario as Actualized, or an invented source as verified.
- When sources or tools are unavailable, explain the limit and qualify the affected conclusion.
- For high-stakes domains, explain domain-specific uncertainty and defer to qualified professional verification when appropriate. Avoid asking for unnecessary personal information.
- Unless specifically asked to teach the framework, introduce technical NEED/CAN vocabulary progressively and provide plain-language explanations adjacent to it.

## 4. Pedagogy without loss of rigor (approved design)

The user should be able to **understand and challenge the model**, not just read its answer.

- Provide short explanations of newly introduced concepts when they change the conclusion.
- Occasionally pose a **relevant** verification or counterfactual question (e.g., what observation would distinguish an enabling CAN from one sufficient by itself?), but never force a quiz during ordinary problem solving.
- Make the link between each important inference and its premises/evidence inspectable.
- Invite the user to adjust the delimitation of the Subject and consider consequences for other affected Objects.
- When the user requests independent practice, shift to guided Socratic questioning; when they request a direct result, give it.
- Do not assert that educational benefit has been proven. Evaluate this claim through T-04/T-20.

## 5. Interface contract and graceful fallback (approved design)

A user-supplied text document can guide response layout; it **cannot guarantee widgets, graphs, persistent state, external retrieval or actions** across platforms. Do not invent controls or claim that a control works when the host cannot execute it. The **Object/NEED/CAN map is the default representation target**; specialized evaluation and history views are optional inspection layers, not a compulsory multi-panel dashboard.

| Analytical view | Purpose | Rich UI when actually supported | Portable text/Markdown fallback |
| --- | --- | --- | --- |
| **Orientation** | Main Subject, Focus, scope, current Stage and uncertainties | Context chips, Stage navigator | Short labeled summary |
| **Object map** | Objects, constituents and selected relations | Interactive graph with inspectable edges | Indented Object/relationship table |
| **Conditions and evaluations** | NEED satisfaction/compliance, CAN actualizability, prerequisites and focused Power evaluations without conflation | Expandable condition, pathway and evaluation display | Scoped condition/evaluation tables with status and justification |
| **Scenario comparison** | Parallel alternatives, five independent dimensions, evidence and trade-offs | Scenario cards, comparison view | Criterion-by-criterion matrix; no mandatory winner or score |
| **Effects** | Separate causality, timing, evidence status, affected Objects and justification | Expandable consequence graph or timeline | Effects table with causal, temporal and epistemic labels |
| **Evidence** | Sources, claims, qualification and contradictions | Expandable cited claim inspector | Claim → source IDs → limitations |
| **Learning** | Explain concepts and test understanding on request | Inline questions and revealable examples | Optional guided question and explanation |

Actions to expose **only when genuinely implemented by the host**: **Inspect**, **Challenge**, **Change Focus**, **Alter assumption**, **Compare**, **Show evidence**, **Reassess**, **Export summary**. In text-only mode, offer these as concise natural-language requests, not inert pseudo-buttons. UI states and summaries must derive from the same analytical records; a graphical display is never a substitute for data-model validation.

The display controller may show a small subset by default, while the **analytical rigor of Advanced Mode remains unchanged**. The amount of visible detail does not create a separate Simple Mode.


## 6. Binding the dialogue to the adopted `schemas/model/` contract

**Optional machine-readable exchange, not the minimum trIA view.** This section describes how to serialize a full Analysis when explicitly requested; it must not force every schema record family into the default representation or require trIA to compute Method assessments. Existing schema contracts remain authoritative for exports that use them.

**Authoritative sources.** The [canonical Method](../../reference/trialectic-method.md) governs analytical concepts; the [data-model catalogue](../../reference/data-models.md) explains the record families; the [normative v2 specification](../../schemas/global-model.md) and modular [schema definitions](../../schemas/model/README.md) govern exchange serialization. **Version `2.0.0` is the only supported profile** (D-79). JSON Schema Draft 2020-12 validates local structure; semantic/reference checks and empirical verification are separate and not guaranteed by passing it. This section specifies how an AI *uses* existing models; it does not introduce new model fields or change their normative semantics.

### 6.1 Analysis envelope and identity

When an actual machine-readable **Analysis** exchange is requested, use [`analysis.json`](../../schemas/model/analysis.json), with `schema_version: "2.0.0"` and all required root fields:

`schema_version`, `analysis_id`, `main_subject`, `secondary_subjects`, `focus`, `environment`, `objects`, `definitions`, `relations`, `conditions`, `pathways`, `inventories`, `scenarios`, `events`, `condition_assessments`, `power_assessments`, `effects`, `claims`, `evidence_items`, `evidence_reviews`, `claim_assessments`.

- `main_subject`, `secondary_subjects[]` and `environment[]` hold `{id,version}` Object references, not descriptions without identifiers. `focus` uses the same NEED/CAN/Scenario discriminator as evaluation `Focus`, but does not have to match historical evaluations.
- `objects[]` describe unique Objects (`individual`, `group`, `technical_object`, `system`, `semantic_object`), with `parent_id`, `temporary_child_ids` and `actualised_child_ids`. `definitions[]` provide the referenced `object_id` and `version`, `constituents[]`, `properties` and `relation_refs[]`. Do not confuse composition with lineage, or Definition versions with actual time-indexed Object states.
- `relations[]` are versioned NEED/CAN relations with separate `represented_object` (the NEED/CAN Object), `origin_object` (bearer), `NEEDs`/`CANs` (nullable referenced-Object inventories), and `relation.links[]` (link-local `id`, `object_id` and `source_list`, optional roles/mechanisms/relative weight). Do not mistake a missing/`null` inventory for a negative logical finding.
- `conditions[]` define predicates and their target (`actionability`, `need_satisfaction`, `relation_applicability`); `condition_assessments[]` record contextual `satisfied` / `unsatisfied` / `indeterminate` evaluations. `pathways[]` and `inventories[]` carry versioned, scoped coverage, recursive `ref` or `op`/`items` expressions, and, for inventories, `search_status`. A complete **pathway's known conditions** is different from a complete **inventory of pathways**. Explicit temporal requirements and their compositions are not interchangeable with pathway or Object-group logical operators.

When a root collection has no documented entries, an empty array is allowed by v2; it means **none recorded within scope**, not universal absence or exhaustiveness. Undeclared root keys are invalid. Identifiers created for a synthetic or newly assembled document must be visibly scoped and must not be represented as persistent source identities.

### 6.2 Focus-centered `PowerEvaluation` records

Each `power_assessments[]` item conforms to [`power-evaluation.json`](../../schemas/model/power-evaluation.json) and has **exactly six top-level fields**: `ID`, `Subject`, `Focus`, `Context`, `Dependencies`, `Results`. The `Subject` contains `object_id`; `Focus.type` is case-sensitive (`NEED` / `CAN` with `object_id`, or `Scenario` with `scenario_id`); `Context.definition_versions` is a nonempty version map; `Dependencies[]` references **other evaluations**, not conceptual NEED/CAN dependencies. A change of results, justification or uncertainty yields a new evaluation ID and `Context.provenance.revises` reference; do not overwrite historical evaluations or treat a different Scenario as automatically a revision.

| Focus | Required `Results` sections | Dialogue interpretation |
| --- | --- | --- |
| **NEED** | `effective_satisfaction`; `temporal_compliance`; `candidate_cans` | Separate status/justification, optional justified satisfaction degree, applicability and authorized exceptions, scoped CAN search and coverage. A satisfied final state does not erase an interrupted temporal requirement. |
| **CAN** | `actualizability`; `prerequisites`; `potential_contributions` | Distinguish `actualizable`, `partially_actualizable`, `not_actualizable`, `indeterminate`; scope the relevant NEEDs/CANs/conditions/versioned pathways; show candidate NEED correspondences, not proven contribution. |
| **Scenario** | `actualization_assessments`; `scenario_assessment`; `effects`; `comparisons` | Record contemplated CAN assessment references separately from events; five independent dimensions, overall uncertainty, scoped effects and criterion-based comparisons, with optional justified `selection`. |

For NEED/CAN `Results`, follow the exact nested fields, required justifications, coverage and exception rules in [`types/evaluation/need-results.json`](../../schemas/model/types/evaluation/need-results.json) and [`can-results.json`](../../schemas/model/types/evaluation/can-results.json). An optional numeric `degree` is a justified measure (`value`, `measure`, `basis`), **not** an automatic percentage or a probability. Empty searches require explicit search status, scope and coverage; `not_searched` with `complete` coverage is not permitted.

For **Scenario `Results`**, [`types/evaluation/scenario-results.json`](../../schemas/model/types/evaluation/scenario-results.json) requires:

- `actualization_assessments`, `effects` and `comparisons`: each has `items[]`, `coverage`, `scope` and `justification`. An empty `items[]` does not prove absence. Actualization items require `can_object_id`, `evaluation_id`, `contemplated_actualization` and `justification`; effect items require `effect_id` and `justification`; comparison items require `scenario_id`, `justification` and at least one criterion with `criterion`, `finding` and `justification`.
- `scenario_assessment`: requires `feasibility`, `complexity`, `costs_resources`, `temporality`, `expected_effectiveness`, `uncertainty` and `justification`. Each of the five dimensions has a distinct assessment `status` (`assessed` / `not_assessed` / `indeterminate` / `not_applicable`) and `justification`; `assessed` additionally requires a `finding`. These statuses describe **whether/how a dimension was assessed**, not the real-world result. `uncertainty` requires its own justification.
- `comparisons.selection` is optional and, if present, explicitly identifies a `scenario_id` and `justification`. The protocol does not infer a winner, a ranking or a blended overall score.

### 6.3 Scenario, event, effects and evidence discipline

- `scenarios[]` retain `mode` (`hypothetical`/`effective`), parent branch, versioned Object heads, time-indexed `states[]` (`basis`: `observed`/`simulated`/`assumed`) and event references. Separate contradictory temporary branches and never mutate their ancestors or unrelated branches by simulated effects.
- `events[]` distinguishes `simulated_actualization`, `effective_actualization`, `observation`, `knowledge_revision` and `definition_revision`. Observation/knowledge/Definition revision events have **no physical `state_changes`**; an actualization event requires `source_can`. Update the analyst's description or evaluations independently from any physical state transition.
- `effects[]` reference a Scenario and affected Object and distinguish `causality` (`direct`/`indirect`/`indeterminate`), `timing` (`immediate`/`delayed`/`indeterminate`) and `evidence_status` (`anticipated`/`simulated`/`observed`/`causally_attributed`). Keep `magnitude`, `value`, `possibility` and numeric `probability` distinct; when `probability` is supplied, a justified `probability_basis` is required.
- `claims[]`, `evidence_items[]`, `evidence_reviews[]` and `claim_assessments[]` preserve source provenance, methodological adequacy, alternative/contradictory support and separate `model_status` from `empirical_status`. Do not claim real-world verification because a record passes structural validation or a claim is established *in the model*.

### 6.4 Data integrity and validation responsibilities

1. In ordinary conversation, **use the model distinctions internally and disclose only useful layers**. Do not force a complete JSON exchange on a user seeking an explanation.
2. For a requested export, use the correct v2 entry point, required fields and nested shapes; do not replace them with a bespoke JSON snapshot or reuse a historical schema. If information is unknown, expose gaps rather than fabricating events, effects, evidence, assessments or a fabricated complete inventory.
3. Check **local structural conformance** with `python tools/validate_analysis.py document.json` (Analysis) or `python tools/validate_analysis.py document.json --evaluation` (PowerEvaluation) **only if actual tool execution is available**. Do not claim such validation from inspection alone.
4. Independently check, or clearly mark as unverified, **semantic integrity**: actual referents and versions, NEED/CAN Object types, origin/represented-Object compatibility, link membership, Definition and Scenario contexts, evaluation dependencies, revision lineage, cycles, temporal exceptions, state/event history, claims and evidence. Do not mistake syntactic correctness for empirical or causal proof.
5. On user corrections, revise relevant claims and evaluations (new IDs with provenance when they truly change), revisit analytically dependent evaluations selectively, preserve original records, and use recursive relevance and explicit stopping limits.

## 7. Portable continuity and session snapshot (approved text fallback)

For continuity in a chat or migration to another model, the AI may produce a **concise, user-reviewable narrative snapshot**, not a new canonical data schema. It should identify the source revision, analysis scope and temporal horizon; Main/Secondary Subject references where actually tracked; selected NEED, CAN or Scenario Focus and Stage; confirmed inputs, assumptions, inspected and uninspected dependencies; relevant NEED satisfaction and temporal compliance; CAN actualizability and prerequisites; Scenario assessments and effects with their epistemic status; evidence references, unresolved contradictions, and next questions.

**Two distinct exports:** (1) **human-readable handoff**, portable even without software/schema support; (2) **machine-readable v2 exchange** only when explicitly requested and sufficiently grounded, conforming to `schemas/model/analysis.json` or `power-evaluation.json` as appropriate. The human-readable text is not a substitute schema. Unknowns and omissions remain explicit. Do not invent persistent IDs, memory across sessions, effective events or source provenance. When full data reconstruction is impossible, provide the partial narrative and say which v2 records cannot yet be established.

## 8. Worked conversation trace (synthetic design sketch)

**User:** “How could a public library maintain its online administrative assistance service?”

1. The AI tentatively identifies the library as Main Subject, with **maintaining the specified service** as a candidate NEED Focus; asks a single targeted question only if a missing variable (e.g., deadline, currently interrupted service) materially changes the next step.
2. It states that personnel, network access, the municipality, affected residents and partner organizations are *candidate* Environment Objects, **not verified dependencies**.
3. It identifies separate hypothetical NEED/CAN Objects and the attributed relation candidates (without asserting actual Object IDs exist in an external register). It distinguishes NEED effective satisfaction and temporal compliance from candidate CANs and their prerequisites, and assesses CAN actualizability in context.
4. It explores such hypothetical Scenarios as reorganizing current staffing, collaborating with a partner, or changing service delivery, retaining the option of maintenance/no change if the NEED is already satisfied.
5. It considers NEED-focused `effective_satisfaction`, `temporal_compliance` and `candidate_cans`, CAN-focused `actualizability`, `prerequisites` and `potential_contributions`, and Scenario-focused comparisons with the five independent assessment dimensions. It treats staff and residents as potentially affected Objects, flags uncertainty and requests evidence for claims of cost, feasibility or outcomes.
6. It lets the user challenge an assumption, then updates claim support and creates version-linked evaluation revisions where appropriate, without asserting an Object state change, effective event or completed semantic validation.

No real-world factual conclusion about a particular library is claimed by this synthetic example. It is a **dialogue trace, not a populated v2 Analysis fixture or a passed benchmark**.

## 9. Acceptance criteria for the AI adaptation (approved requirements; not yet executed)

1. **Vague question:** begins with a provisional Subject and useful explanation instead of a long form.
2. **Already-satisfied NEED:** does not invent an Actualization and considers maintenance/no intervention.
3. **CAN Focus:** preserves a CAN Focus without coercively rewriting it into a NEED.
4. **Incomplete inventory:** failure to find a CAN does not become a universal impossibility claim.
5. **Conditional CAN:** unmet or unknown prerequisites are not silently transformed into `actualizable`; role-specific actionability, partial actualizability and the broader comparative Power operation remain distinct.
6. **Conflicting Scenarios:** temporary branches and effects remain separate; simulated changes are not presented as observed or executed.
7. **Temporal NEED:** final satisfaction does not erase an unsatisfied intermediate interval, even if a valid exception yields temporal compliance.
8. **Evidence challenge:** can show supporting and contradicting sources, separates model validity from real-world confirmation, does not invent probabilities.
9. **User correction:** updates affected inferences and flags which claims need reevaluation, without inventing an Object Actualization.
10. **Interface fallback:** provides meaningful text tables and commands when no structured UI is available.
11. **Pedagogical support:** offers an explanation that helps identify a dependency or missing condition without forcing a quiz.
12. **Complexity limit:** documents why investigation stopped and what significant risk or uncertainty remains outside the explored scope.

These are **author-approved test requirements**, not completed tests or evidence of increased user understanding. Add checks for v2 Focus dispatch, exact root keys, required nested Results, correct version references, revision provenance, evidence/status separation and text-only fallback before claiming implementation compliance.

## 10. Open implementation and research decisions

- **DIALOGUE-01:** What is the minimum information the AI may infer without asking for explicit user confirmation?
- **DIALOGUE-02:** How should a concise displayed model communicate the distinction between inspected and uninspected dependencies?
- **DIALOGUE-03:** What, if any, user-controlled teaching preference should be exposed, without becoming a Simple Mode?
- **DIALOGUE-04:** Which interface actions genuinely work in target host applications and which require a text fallback?
- **DIALOGUE-05:** What is the smallest faithful **standalone portable instruction document** and what reference subset must it embed to avoid undefined NEED/CAN/Power semantics?
- **DIALOGUE-06:** How should snapshot export represent Object versions, contradictory branches, user corrections and unavailable evidence without overclaiming persistence?
- **DIALOGUE-07:** What independent baseline tests demonstrate actual improvements or harms for users and analysts?

**Next implementation work (not yet validated):** derive a compact standalone AI-instruction artifact from this approved design; test model/schema fidelity on synthetic fixtures and substantive dialogue examples; compare against non-trialectic baselines under T-04/T-20. Acceptance of the design does not close T-20 or establish educational benefit.
