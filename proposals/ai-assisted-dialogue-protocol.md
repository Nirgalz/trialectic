# AI-assisted Trialectic Method — Adaptive dialogue protocol

**Status: OPEN PROPOSAL — draft 0.1, November 15, 2026.** This is a non-normative design proposal for the **dev** branch. It does not modify or validate any conceptual definition, implementation schema, or previously open operational test. The canonical source is [the working reference](../reference/trialectic-method.md); the relevant task is [T-20](../TODO.md), coordinated with T-03, T-04, T-15, T-16, T-21 and T-27.

## 1. Purpose and scope

Design a **portable instruction document**, supplied by a user to a capable conversational AI, that guides AI-assisted application of the Trialectic Method. The same guidance should work in an ordinary text interface and, where the host genuinely supports them, richer interactive interfaces.

The goals are (a) understanding complex systems and their interdependencies, (b) comparing materially distinct Resolution Scenarios and their consequences, and (c) helping the user progressively learn to reason about complex systems themselves. The AI assists analysis; it must not substitute an unwarranted claim of authority for the user's judgment.

**Design separation:** the canonical Method defines the analytical concepts and validated distinctions; this protocol proposes the user–AI interaction; optional UI components present or manipulate the results. Presentation depth is not a separate simplified analytical Method. **Advanced Mode remains the default**; Simple Mode remains deferred.

## 2. Invariants inherited from the canonical Method

The AI must preserve these reference constraints, irrespective of the interface:

1. An **Object** can be an Individual, Group, Technical Object, System or Semantic Object. The **Main Subject** is the Object selected for attention; **Secondary Subjects** may be analyzed where relevant. Contextual Environment and Semantics are relevant non-symmetrical perspectives, not mandatory three-way causal partitions.
2. The adopted recursive Stages are **Subject → NEED or CAN → Actualization → reassessment of Subject**. A satisfied NEED may call only for maintenance or no intervention.
3. A **NEED** is a necessity attributable to an Object for the existence, maintenance or realization of a specified state. A **CAN** is a contextually relevant Potentiality; a CAN may require interventions by other Objects. Inventories of NEEDs and CANs are potentially incomplete. A NEED is distinct from its satisfaction state and from a NEED–CAN relation.
4. NEED and CAN data are modeled as **origin-anchored relations among Objects**. Relation roles and qualified links require contextual justification. Do not infer empirical sufficiency, necessity, correspondence, actionability or Power from a stored link, a similar meaning, or a mere list entry.
5. Distinguish **CAN identification**, a NEED–CAN correspondence, **CAN actionability for its specific contribution**, **NEED effective satisfaction**, **complete Power for a contemplated Actualization**, the **Actualization actually undertaken**, and **causally attributable observed effects**. Unknown information is not a negative finding.
6. **Power** is binary when the relevant conditions are known: positive permits undertaking a CAN Actualization, without ensuring success. An **indeterminate assessment** is uncertainty about Power, not a third intrinsic value. Never use an unjustified numeric probability.
7. Separate **NEED effective satisfaction** from **temporal compliance** with its requirements and explicitly authorized exceptions. A final satisfied state does not imply continuous satisfaction or erase intermediate violations.
8. Generate and evaluate several **materially distinct, relevant** Resolution Scenarios when supported by the case. Do not fabricate alternatives to meet a fixed count; state when the inventory permits no defensible candidates. Scenario generation, evaluation and optional selection are separate. No mandatory overall score or universally best answer.
9. Compare, as relevant, **feasibility/uncertainty, complexity, resource cost, temporality, expected effectiveness and consequences on other Objects**. Distinguish feasibility uncertainty, success probability and possibility/probability of consequences.
10. Preserve **Object IDs and versioned Definitions**, historical states, constituent references, Parent/Temporary Children/Actualised Children lineage and isolation of contradictory temporary Scenario branches. A simulation is **not** an effective Actualization, and a change in the analyst's knowledge is **not** by itself a change in an Object's state.
11. Distinguish **direct/indirect** from **immediate/delayed** effects; possibility from probability, magnitude from value, and anticipated from observed or causally attributed effects. Use **recursive relevance** and explicit complexity limits.
12. Assess important claims through **claim/evidence/assessment** with provenance, alternative explanations, possible contradiction and context-sensitive methodological quality (D-46/D-47). Something established inside a model is not thereby empirically established. Offer checkable external justifications, without claiming to expose private internal reasoning.

The exact tests, algorithms and schemas unresolved in the reference remain **OPEN**, not silently settled here.

## 3. Proposed conversation contract

### 3.1 Beginning an analysis

- Accept a natural-language question without demanding a form or specialist terminology.
- Extract a *provisional* Main Subject, user concern, potential NEED or CAN Focus, relevant context and time horizon from the user's message.
- Distinguish **user-stated facts**, **source-backed observations**, **working assumptions**, **candidate inferences**, **unknowns**, and **user value judgments**.
- If a missing fact materially changes the analysis, ask a targeted, comprehensible question; otherwise proceed provisionally and invite correction. Do not turn every methodological Stage into a required user confirmation.
- If the proposed Focus is ambiguous, show the alternative framings (e.g., a NEED to maintain a state versus a CAN to perform an action) and state which provisional framing is being used.

### 3.2 Working cycle

**A — Subject and context.** Delimit the Main Subject and relevant Environment, its constituent/accessible/indirectly influential Objects, current temporal frame and goal. Keep the current scope explicit and revise it when new relations matter. Identify Secondary Subjects only when justified by an analytical dependency.

**B — NEED/CAN inventory and relations.** Identify relevant NEEDs, CANs and origin Objects; distinguish actual identified entries from hypotheses. For each significant NEED–CAN candidate, identify its claimed mechanism, role (direct contribution, complementary pathway, enabling action, inhibitory effect, etc.), necessary conditions, alternative pathways, and uncertainties. Search both inside and outside the initial inventory when the current Focus justifies it.

**C — Conditional appraisal.** Test correspondence, contribution, Scenario-relative necessity and conditional sufficiency with stated context and counterfactual comparison where possible. Distinguish CAN actionability, full Power, NEED satisfaction and temporal compliance; mark indeterminate assessments rather than inferring negatives.

**D — Scenario exploration.** Create multiple *materially different* conditional Resolution Scenarios when defensible: single CAN, joint CANs, enabling/development steps, alternative pathways, maintenance/no action, and intervention by another Object where relevant. If no candidate is supported, state **no candidate identified within inspected scope**, not global impossibility. Retain missing prerequisites and circular dependencies visibly.

**E — Independent Scenario appraisal.** For each, identify key assumptions, unsatisfied/unknown Conditions, Scope and times, likely or merely possible consequences, potentially harmed or helped Objects, and sources. Compare scenarios across distinct dimensions without an arbitrary blended score. An explicit recommendation, if requested, must name the criteria on which it is conditional.

**F — Recursive reassessment.** Inspect how contemplated effects may change Object Definitions, NEEDs, CANs, conditions, Power, relations and Environment. Keep hypothetical branches isolated. Incorporate user corrections and new evidence as **knowledge revisions**, distinct from effective Object-state transitions. Continue recursion only while expected analytical relevance (including severe low-likelihood impacts) warrants the complexity; state what remains unexamined.

This is a proposed *dialogue orchestration*, not a replacement or final implementation of the currently OPEN Stage-specific protocol in the canonical reference.

### 3.3 What the AI should show

Prefer a **layered answer**, not an unqualified flood of model details:

1. **Orientation:** what is being analyzed, what is known, what is uncertain and what the next meaningful question is.
2. **Working model:** selected Subject, Focus, Objects, NEED/CAN relations, action/NEED conditions, significant hypotheses and supporting evidence.
3. **Scenarios and implications:** alternative pathways, explanatory comparisons, foreseeable effects, missing checks and possible revisions.
4. **Inspect on demand:** Object versions, qualified links, assumptions, evidence provenance, causal/logical distinctions, Scenario history and unresolved contradictions.

Only expose layers that are relevant to the present user request. An accessible summary must not imply that omitted analysis has been verified. If complete analysis has not yet been performed, say so.

### 3.4 Interaction rules (proposed)

- Each turn should advance the user's actual question: answer directly when enough information exists; ask only clarification questions that can change an inference or next step.
- Users can revise the Main Subject, switch NEED/CAN Focus, inspect a dependency, challenge a claim, alter a Scenario assumption, compare branches, request sources, or request a concise/exportable state summary.
- **User corrections should be acknowledged and applied** to affected claims, Object/Scenario descriptions and conclusions. Preserve material distinctions between revised knowledge and changed states.
- Never label a hypothetical observation as measured, a scenario as Actualized, or an invented source as verified.
- When sources or tools are unavailable, explain the limit and qualify the affected conclusion.
- For high-stakes domains, explain domain-specific uncertainty and defer to qualified professional verification when appropriate. Avoid asking for unnecessary personal information.
- Unless specifically asked to teach the framework, introduce technical NEED/CAN vocabulary progressively and provide plain-language explanations adjacent to it.

## 4. Pedagogy without loss of rigor (proposed)

The user should be able to **understand and challenge the model**, not just read its answer.

- Provide short explanations of newly introduced concepts when they change the conclusion.
- Occasionally pose a **relevant** verification or counterfactual question (e.g., what observation would distinguish an enabling CAN from one sufficient by itself?), but never force a quiz during ordinary problem solving.
- Make the link between each important inference and its premises/evidence inspectable.
- Invite the user to adjust the delimitation of the Subject and consider consequences for other affected Objects.
- When the user requests independent practice, shift to guided Socratic questioning; when they request a direct result, give it.
- Do not assert that educational benefit has been proven. Evaluate this claim through T-04/T-20.

## 5. Interface contract and graceful fallback (proposed)

A user-supplied text document can guide response layout; it **cannot guarantee widgets, graphs, persistent state, external retrieval or actions** across platforms. Do not invent controls or claim that a control works when the host cannot execute it.

| Analytical view | Purpose | Rich UI when actually supported | Portable text/Markdown fallback |
| --- | --- | --- | --- |
| **Orientation** | Main Subject, Focus, scope, current Stage and uncertainties | Context chips, Stage navigator | Short labeled summary |
| **Object map** | Objects, constituents and selected relations | Interactive graph with inspectable edges | Indented Object/relationship table |
| **Conditions** | Need satisfaction, CAN actionability and Power without conflation | Expandable condition/pathway display | Condition table with scope and status |
| **Scenario comparison** | Parallel alternatives and trade-offs | Scenario cards, comparison view | Markdown comparison matrix |
| **Effects** | Direct/indirect, timing, affected Objects and evidence | Expandable consequence graph or timeline | Effects table with temporal and causal labels |
| **Evidence** | Sources, claims, qualification and contradictions | Expandable cited claim inspector | Claim → source IDs → limitations |
| **Learning** | Explain concepts and test understanding on request | Inline questions and revealable examples | Optional guided question and explanation |

Actions to expose (when implemented): **Inspect**, **Challenge**, **Change Focus**, **Alter assumption**, **Compare**, **Show evidence**, **Reassess**, **Export summary**. In text-only mode, offer these as concise natural-language requests rather than inert pseudo-buttons.

The display controller may show a small subset by default, while the **analytical rigor of Advanced Mode remains unchanged**. The amount of visible detail does not create a separate Simple Mode.

## 6. Portable continuity and session snapshot (proposed, NOT a canonical schema)

For portability between turns or models, the AI may produce a concise, user-reviewable **analysis snapshot** containing:

- Reference source and revision (when supplied), session label, time horizon and scope;
- Main/Secondary Subject IDs and version references where actually tracked;
- Focus type (**NEED** or **CAN**) and current Stage;
- Confirmed inputs versus tentative assumptions; examined Objects and relevant relation/link IDs;
- Important conditions and states, distinct NEED satisfaction / temporal compliance, CAN actionability / Power assessments;
- Separately identified hypothetical Scenarios with assumptions, risks, uncertainties and latest comparison;
- Evidence/claim IDs with provenance if available, unresolved contradictions and the next open questions.

This is **not** permission to invent permanent Object identifiers, reliable inter-session memory, an official JSON Schema, or complete history. If an AI session cannot preserve or reconstruct a reference, indicate that explicitly. Detailed graph/state machine implementation remains T-03/T-30 work.

## 7. Worked conversation trace (synthetic design sketch)

**User:** “How could a public library maintain its online administrative assistance service?”

1. The AI tentatively identifies the library as Main Subject, with **maintaining the specified service** as a candidate NEED Focus; asks a single targeted question only if a missing variable (e.g., deadline, currently interrupted service) materially changes the next step.
2. It states that personnel, network access, the municipality, affected residents and partner organizations are *candidate* Environment Objects, **not verified dependencies**.
3. It distinguishes NEED satisfaction at present from CANs that could contribute to maintaining it, checks action conditions and possible temporal continuity requirements.
4. It explores such hypothetical Scenarios as reorganizing current staffing, collaborating with a partner, or changing service delivery, retaining the option of maintenance/no change if the NEED is already satisfied.
5. It compares the conditions and effects on library staff and residents, flags uncertainty and requests evidence for claims of cost, feasibility or actual outcomes.
6. It lets the user challenge an assumption, then reassesses the affected relations and Scenario results without asserting that any hypothetical action has occurred.

No real-world factual conclusion about a particular library is claimed by this synthetic example.

## 8. Early acceptance tests for the AI adaptation (proposed)

1. **Vague question:** begins with a provisional Subject and useful explanation instead of a long form.
2. **Already-satisfied NEED:** does not invent an Actualization and considers maintenance/no intervention.
3. **CAN Focus:** preserves a CAN Focus without coercively rewriting it into a NEED.
4. **Incomplete inventory:** failure to find a CAN does not become a universal impossibility claim.
5. **Conditional CAN:** unfulfilled action conditions are not treated as positive Power, and role-specific actionability is not substituted for full Power.
6. **Conflicting Scenarios:** temporary branches and effects remain separate; simulated changes are not presented as observed or executed.
7. **Temporal NEED:** final satisfaction does not erase an unsatisfied intermediate interval, even if a valid exception yields temporal compliance.
8. **Evidence challenge:** can show supporting and contradicting sources, separates model validity from real-world confirmation, does not invent probabilities.
9. **User correction:** updates affected inferences and flags which claims need reevaluation, without inventing an Object Actualization.
10. **Interface fallback:** provides meaningful text tables and commands when no structured UI is available.
11. **Pedagogical support:** offers an explanation that helps identify a dependency or missing condition without forcing a quiz.
12. **Complexity limit:** documents why investigation stopped and what significant risk or uncertainty remains outside the explored scope.

These are **proposed test cases**, not completed evaluations or evidence of increased user understanding.

## 9. Open design decisions for review

- **DIALOGUE-01:** What is the minimum information the AI may infer without asking for explicit user confirmation?
- **DIALOGUE-02:** How should a concise displayed model communicate the distinction between inspected and uninspected dependencies?
- **DIALOGUE-03:** What, if any, user-controlled teaching preference should be exposed, without becoming a Simple Mode?
- **DIALOGUE-04:** Which interface actions genuinely work in target host applications and which require a text fallback?
- **DIALOGUE-05:** What is the smallest faithful **standalone portable instruction document** and what reference subset must it embed to avoid undefined NEED/CAN/Power semantics?
- **DIALOGUE-06:** How should snapshot export represent Object versions, contradictory branches, user corrections and unavailable evidence without overclaiming persistence?
- **DIALOGUE-07:** What independent baseline tests demonstrate actual improvements or harms for users and analysts?

**Next deliverable proposed:** derive an initial self-contained portable AI-instruction document from this protocol, explicitly label unresolved Method details, and run controlled examples against T-04/T-20 baselines before making performance claims.
