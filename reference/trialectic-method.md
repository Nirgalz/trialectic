# Trialectic Method — Reference

**Status:** working reference, not scientifically validated. **Reference file:** `reference/trialectic-method.md`. **Versioning:** released snapshots are identified by **Git tags**, not by version-specific filenames. This text originated in the alpha 0.4 consolidation of November 14, 2026; no Git tag is presumed to exist unless explicitly created.
Sources: earlier alpha 0.3 content (retrievable in Git history), the [decision log](../DECISIONS.md) (D-01–D-27), and explicit decisions from the November 14–15, 2026 Object / Subject / NEED / CAN / Definition discussions, including Object branching, actionable CANs, uncertainty, and shared Definitions. Earlier version-specific reference files are removed from the current tree; Git history preserves their committed contents.

## Reading convention and editorial scope

- **VALIDATED** — a concept or distinction explicitly approved by the author. Validation here is **conceptual**, not experimental or scientific.
- **FORMALIZATION** — an explanatory organization or working formulation of approved material; not necessarily approved word for word.
- **OPEN** — an unresolved definition, test, procedure, threshold, or possible implication.
- **POTENTIAL APPLICATION** — a use case to explore; its effectiveness has not been demonstrated.
- A newly adopted concept takes precedence in this version over an older formulation where they conflict. Historical terms are preserved for traceability rather than silently deleted.
- The source language of maintained reference documents is English. The exact French author-approved definition of NEED is reproduced verbatim below; its English rendering is a **working translation**, not an independently approved bilingual equivalence.

# 1. Definition, scope, and purpose

The **Trialectic Method** is an interdisciplinary, contextual, systemic, and recursive analytical framework for examining **Objects**, their **NEEDs** and **CANs**, the conditions under which relevant Actualizations can be undertaken, the resulting effects, and relationships within and between Objects. A given analysis selects an Object as its **Subject** and may recursively examine other Objects as secondary Subjects. **[VALIDATED components; FORMALIZATION of the unified definition]**

The relevant perspectives of **Subject, Environment, and Semantics** are mobilized according to the case. They are neither three universal causes nor three necessarily symmetrical or equally weighted components. The Method is **not a universal ontology**. **[VALIDATED]**

Objects include **Individuals, Groups, Technical Objects, Systems, and Semantic Objects**. These are categories within the proposed analytical framework, not a claim that each has identical functioning, autonomy, or attribution criteria. The autonomous status of Semantic Objects as acting Subjects, and the precise criteria for distinguishing Object types, remain **OPEN**; autonomous action is not universally required for attribution of a CAN. **[VALIDATED / OPEN]**

One possible normative purpose is to reveal contradictions, seek alternatives, and examine how individuals may increase their Potency, Power, and Actualizations without reducing those of others. Such normative ambitions must be separated from descriptive results and empirically established effects. **[VALIDATED orientation / FORMALIZATION]**

**[VALIDATED operational objective, November 15, 2026]** The Method's **default operation is Advanced Mode**: explore and present multiple relevant, diverse Resolution Scenarios for a complex problem, estimate their effects on the focal Subject and Objects in its Environment, compare feasibility, complexity, cost, temporality and expected effectiveness, and communicate uncertainty. The goal is **not** to impose a uniquely best Scenario. Explicit recommendation or selection is **optional**, dependent on declared decision criteria; it is not a mandatory methodological Stage. A possible Simple Mode is **deferred** for reassessment once the Method is stabilized, not part of the current default workflow.

# 2. Objects, Subjects, Environment, Focus and Stages

## 2.1 Object and Subject

- **Object [VALIDATED]**: the general type of entity considered by the Method, including an Individual, Group, Technical Object, System, or Semantic Object.
- **Subject [VALIDATED, clarified November 15]**: an Object at the center of the attention of the Method **or of the analyst**. In alpha 0.3, “Subject” was also a generic name for an analyzable entity; that generic role is now taken by **Object**.
- **Main Subject [VALIDATED]**: the Subject chosen during the first Stage of the Method.
- **Secondary Subject [VALIDATED]**: another Object selected for a parallel or embedded application of the Method, for example to examine its role in an Actualization Scenario.
- **Situated Subject [FORMALIZATION retaining the validated contextual insight]**: the selected Subject considered with the relevant elements and relationships of its Environment. Its precise place as a separate named concept under the revised terminology remains **OPEN**.

An Object has a **permanent, unique ID** and an evolving, versioned **Definition** (a provisional technical name). The Definition comprises a **list of constituent Objects plus associated properties and relations** describing its NEEDs, CANs, interactions and available knowledge; NEEDs and CANs do not automatically become independent conceptual Objects. An Object may have other Objects as existential or structural constituents, and its Definition may include partially known properties and explicit uncertainty. **[VALIDATED, November 15]**

The earlier three-part boundary proposal (existential/structural NEEDs, constituent Objects, actionable CANs) remains historical context; the current operational architecture is the **Definition** described below. Exact boundary tests and category-specific identity criteria remain **OPEN**.

A group CAN belongs to the **Group as Object**, not automatically to each individual member. Conversely, an individual CAN may contribute to a collective Actualization without becoming identical to a group CAN. Multiple Objects may have justifiably attributable CANs relevant to one Actualization; attribution is not necessarily exclusive. **[VALIDATED]**

### 2.1.1 Object identity, Definition, lineage and versioning

**[VALIDATED — November 15, 2026; name "Definition" provisional]**

- Each Object has a unique, permanent **ID**. An ordinary change to its Definition does not by itself change its ID.
- Its **Definition** is a versioned list of constituent Object references together with associated properties and relations, including contextually relevant NEEDs and CANs, their relationships, and the analyst's information and uncertainty. The constituent Object list is not, alone, the entire Definition.
- Each Object has a **Parent** reference, which is either `null` or the Object from which it branches, a **Temporary Children** list of its temporary branches, and an **Actualised Children** list of its actualized branches. **Parent** (lineage) is not equivalent to **constituent Object** (composition).
- Contradictory Actualizations affecting the same Object create distinct descendant Objects with unique IDs and their own Definitions; the parent/original Object and its initial Definition are preserved as reference. This branching applies to contemplated Scenarios and to effective Actualizations.
- A Scenario may create a **temporary branch** without asserting that its anticipated effects have actually occurred. When that branch is effectively Actualized, its ID is **preserved** and its reference moves from the parent's **Temporary Children** list to **Actualised Children**. An unactualized alternative remains temporary.
- **Historical Definition versions** retain the referenced constituent Object versions at the relevant historical state; changes to a shared Object must not retroactively alter earlier versions.
- Shared constituent Objects are referenced rather than independently copied. When a shared Object is actually modified, the change is reflected in the current Definitions of other Objects that reference it, and their relevant NEEDs, CANs and Conditions may need reassessment; this does not imply every unrelated property changes.
- **Simulated modifications** to a shared Object propagate **within the same simulation**, not to effective states or other isolated Scenarios. Actualization propagates the relevant effective modifications while retaining history.
- A branch may be assessed as temporary, actualized, or otherwise epistemically uncertain; **a simulated Actualization is not an effective Actualization**.

**[VALIDATED distinction; FORMALIZATION of the test]** Two Actualizations are contradictory when their effects assign mutually incompatible states to the same property of the relevant Object **in the same reference context** (including time and conditions). Mere change over time is not necessarily contradictory.

**[OPEN]** Branch identifiers and cross-simulation namespaces; reconciliation of multiple effective but apparently incompatible observations; physical instantiation versus alternative descriptions; conflict resolution for concurrent modifications of shared Objects; the exact persistence and snapshot representation of historical constituent versions. The validated lineage rules do not alone establish that every simulated or contradictory branch denotes a distinct physical entity.

### 2.1.2 Constitutive necessity and initial identification

**[VALIDATED]** An Object is initially identified as part of the **focal Subject's Environment**; the initial candidates include the focal Subject's **existential and structural constituent Objects**. Its Definition can be expanded as required by the Method, including reassessment when that Object is Actualized. Initial identification is provisional and may be refined recursively using its constituent Objects, NEEDs and CANs.

For a candidate constituent Object, the adopted necessity question is: **"Without this Object, can the Subject still exist?"** The Method distinguishes **conceptual existence** and **functional existence** when asking this. The **Semantic Pyramid** is used to investigate necessity when relevant, but conceptual dependence must not silently be presented as an empirically demonstrated functional or physical NEED.

**[OPEN]** What counts as continued conceptual versus functional existence, the exact necessity test for each Object type, the initial choice of the focal Subject before its Environment is known, and the interaction of identity, historical Definition versions and loss of existential/structural constituents.

## 2.2 Environment and accessibility

- **Environment [VALIDATED]**: the contextualized set of Objects and relationships that may affect the Subject's NEEDs, CANs, or Actualizations.
- **Accessible Object [VALIDATED]**: an Object in the Subject's Environment with which the Subject can interact **directly**. Accessibility is thus a narrower criterion than environmental relevance.
- Objects and relationships with **indirect** effects may belong to the Environment even when direct interaction is unavailable.
- **[VALIDATED]** For initial exploration of a focal Subject, prioritize its existential and structural constituent Objects; extend the Definition and contextual Environment when analysis or Actualization warrants it. Objects may be shared across multiple Definitions.
- The analysis is contextualized, not necessarily exhaustive. The selection of properties, Objects, and relationships depends on the current Focus and the purposes of analysis. **[VALIDATED / FORMALIZATION]**

## 2.3 Focus and Stage

- **Stage [VALIDATED]**: a methodological operation.
- **Focus [VALIDATED]**: what receives the Method's attention during a Stage.

The adopted recursive sequence is:

1. **Stage 1 — Focus on the Subject**: select a Main Subject (an Object); delimit and contextualize it.
2. **Stage 2 — Focus on a NEED or a CAN**: select a NEED **or** CAN for analysis, examine relevant Objects, properties, and dependencies. The older exclusive focus on a Focal Potentiality is no longer mandatory.
3. **Stage 3 — Focus on Actualization**: examine the relevant Actualization, action conditions, NEED satisfaction, Power, possible Scenarios, and effects. **[VALIDATED clarification]** When a focal NEED is already satisfied without any identifiable Actualization, examine its maintenance, possible transformations or the absence of any required intervention; do not force an unnecessary action.
4. **Return to the Subject**: reassess the Subject, its current or branched Definition and the relevant NEEDs, CANs, conditions, effects and Environment; revisit the sequence as relevant. Secondary Subjects can be examined in parallel or recursively.

**[VALIDATED sequence; FORMALIZATION of operational descriptions]**

**OPEN:** Detailed operations and evidence thresholds of each Stage, beyond the accepted maintenance/no-intervention handling of a satisfied NEED; selection and switching between Main and Secondary Subjects; timing and termination of parallel branches. The sequence is an analytical guide rather than a claim that every actual process is linear.

# 3. NEEDs and CANs — attributable properties and relations

## 3.1 NEED — explicitly approved definition

**[VALIDATED — exact author-approved French wording]**

> **NEED :** nécessité attribuable à un Objet, dont la satisfaction est requise pour l'existence, le maintien ou la réalisation d'un état déterminé de cet Objet. Un NEED peut être existentiel, structurel ou les deux. Sa satisfaction peut résulter d'un état existant ou impliquer l'Actualisation d'un ou plusieurs CANs

**[FORMALIZATION — working English rendering]** A NEED is a necessity attributable to an Object whose satisfaction is required for the existence, maintenance, or realization of a determinate state of that Object. A NEED may be existential, structural, or both. Its satisfaction may follow from an existing state or involve the Actualization of one or more CANs.

**[VALIDATED]**
- An Object's NEEDs form a potentially **non-exhaustive** inventory.
- **Existential** and **structural** are not mutually exclusive qualifications.
- A NEED **exists independently of whether it is currently satisfied**.
- Distinguish a **NEED**, its **satisfaction state**, and a **NEED–CAN relation**; they are not interchangeable.
- Satisfaction of a NEED does **not** always require any identifiable Actualization of a CAN. An existing state may suffice.
- For analysis, record **satisfied**, **unsatisfied**, or **satisfaction indeterminate**. The third outcome marks missing or inconclusive information about satisfaction, not a third intrinsic state of the NEED.
- NEEDs are properties attributable to Objects, although their satisfaction may involve relationships with other Objects.

**[VALIDATED, November 15]** Distinguish conceptual from functional existence when identifying necessary constituents and the states required for a NEED. The Definition may include partially known NEEDs: mark lack/absence of information separately from evidence of absence of necessity. The analyst may qualify uncertainty **qualitatively** and/or **quantitatively (statistically)** where supportable; do not treat missing information as a zero probability.

**[OPEN]** Operational criteria distinguishing a NEED from a merely favorable property; conceptual versus functional necessity across Object types; identity and granularity of required states; evidential standards, statistical calibration and the exact role of the Semantic Pyramid in non-semantic cases.

## 3.2 CAN — Potentiality of an Object

- **CAN [VALIDATED, terminology updated]**: a Potentiality of an Object, selected and described according to the **relevance and granularity of the analysis**. A CAN may depend on other Objects for its Actualization; independent autonomous action is not always required. A CAN **may itself be represented as a conceptual Object with its own NEEDs, but only where that representation is relevant**.
- An Object's **CANs** form a contextually selected, potentially **non-exhaustive** inventory. A CAN may correspond to one or more NEEDs of the same Object or of other Objects. A CAN is not equivalent to a NEED or to Power.
- **Actionable CAN [VALIDATED, November 15]**: a CAN whose **conditions of action are met**. A distinct classification of *mobilizable CAN* is no longer used in the current terminology. The relationship between action conditions in a specific contribution and full sufficient Conditions of Power of the considered Actualization requires careful specification in T-02.
- For **Groups and Systems**, distinguish CANs of constituent Objects from CANs of the Group/System that require Actualizations by multiple constituent Objects. Those CANs are not automatically identical.
- **Potency [VALIDATED earlier definition; FORMALIZATION under the new lexicon]**: the set of an Object's attributable CANs at time T. The earlier term **Puissance / Potency** remains traceable; whether it should be retained as a named concept or replaced by “CANs” has **not** been separately decided.
- **Focal Potentiality [VALIDATED legacy term; FORMALIZATION]**: a CAN selected when the Stage-2 Focus is a CAN. A Stage-2 Focus on a NEED must not be silently relabeled as a Focal Potentiality.
- **Plasticity [VALIDATED]**: an Object's aptitude for its Potentialities to emerge, change, or disappear; this is distinct from a change actually observed. How to extend the concept to changes of NEEDs in the revised architecture remains **OPEN**.

The perspectives of **Subject, Environment, and Semantics** may be used to determine and analyze NEEDs and CANs; their relevance and weight depend on the case. The exact operations corresponding to each perspective remain **OPEN**. **[VALIDATED principle / OPEN operationalization]**

## 3.3 Intrinsicality, specificity and origin

The alpha 0.3 distinctions remain applicable to CANs. **[VALIDATED concepts; FORMALIZATION of terminology update]**

- **Intrinsicality**: being inherent in the Object's category or particular constitution. A categorical intrinsic Potentiality belongs to the category's definition without guaranteeing immutable manifestation by every concrete Object; a specific intrinsic Potentiality can evolve with the Object's constitution.
- **Specificity**: a property particularly characteristic of an Object, not necessarily of every member of its category.
- **Origin**: a separate dimension from intrinsicality. A CAN may be initially present, acquired or emergent; an acquired CAN may become intrinsic to the Object's current constitution.

## 3.4 Historical attribution criteria and current CAN identification (T-01)

**[HISTORICAL VALIDATED PRINCIPLE / OPEN OPERATIONAL CRITERIA]**

A CAN is attributable to an Object when one or more identifiable properties of its constitution ground a **determinate possibility of Actualization**. Attribution does **not** require autonomous action, current satisfaction of Conditions of Actualization, or exclusivity. The constitutive contribution must be relevant; an abstract possibility of future transformation alone is insufficient to attribute today every CAN that might later be acquired.

A CAN currently attributable must be distinguished from a CAN that could emerge only **after a transformation** of the Object's constitution. Example: a person may have the CAN to **learn piano playing** without already having the CAN to **play piano** at the specified level; learning may change the constitution and make the latter attributable. No particular motor pathway is presumed universally necessary.

**[FORMALIZATION]** Distinguish:
- **Discovery** of a previously present but unidentified CAN;
- **Development** changing constitution or Potency so a CAN may emerge or change;
- **Redefinition** of the selected NEED or CAN Focus.

The earlier 'attributable CAN' category has been **questioned by the author as potentially unnecessary**, rather than explicitly retained as an independent current status. The practical inventory now selects CANs at contextually relevant granularity. Existing constitutive-foundation principles and three earlier tests remain **OPEN** research hypotheses, not a new mandatory status or definitive criteria:

- **A — Present foundation**: identify constitutive properties at T without assuming a necessary future transformation.
- **B — Discriminating contribution**: verify that the foundation is sufficiently specific to the Actualization to avoid attribution of every CAN to every Object.
- **C — Individualized attribution**: distinguish collective Object CANs from individual contributions without automatic transfer.

**OPEN:** Whether 'attributable CAN' should remain a separate technical category; threshold of relevant constitutive contribution; boundary between constitution and action conditions; evidence, uncertainty, and inter-analyst reproducibility; differentiated CAN identification criteria by Object type. Contextual granularity is validated, but operational selection rules remain to be tested.

# 4. NEED–CAN relations and dependencies

## 4.1 Relational principles

**[VALIDATED]**
- NEEDs and CANs are **attributable properties** of Objects; their relationships can be **intra-Object** or **inter-Object**, and reciprocal dependencies are possible.
- A NEED of Object A may correspond to a CAN of A or of another Object B.
- A CAN of A may correspond to a NEED of A or B.
- A NEED that must be satisfied for an Actualization relevant to **Object B** may be a NEED attributed to **Object A in B's Environment**. The owner of a NEED need not be the Object whose Actualization depends on it.
- The existence of a possible NEED–CAN match does not prove that the CAN is **actionable**, that a NEED is actually satisfied, that overall Power is positive, or that an Actualization will succeed.
- **[VALIDATED, November 15]** Where multiple CANs may satisfy one NEED, or one CAN contributes to multiple NEEDs, create and compare relevant Scenarios. When A's NEED is involved in B's Actualization, evaluate consequences for both and other affected Objects.

**[OPEN]** Identity, direction, multiplicity, timing, strength, and evidential criteria of a valid NEED–CAN correspondence; whether and how a NEED can be addressed by multiple CANs or by non-CAN states.

## 4.2 Action conditions, NEED satisfaction and Power

**[VALIDATED current terminology, November 15; D-20–D-21 retained historically]**
- **Action condition:** the relevant CAN must be **actionable**, meaning its conditions of action are fulfilled for the specified role or contribution.
- **Satisfaction condition:** a relevant NEED must actually be satisfied when its satisfaction is required to undertake the considered Actualization.
- A NEED–CAN correspondence does not itself prove actionability, NEED satisfaction, positive Power or actual success.
- The Method distinguishes **actionability for a given contribution/relationship** from whether the **complete sufficient pathway for the considered Actualization** has all its Conditions of Power satisfied.
- The formerly distinct label **mobilizable CAN** is not maintained as a separate CAN category. Earlier D-20/D-21 statements about mobilizability remain in the historical decision record; they must be interpreted under this later terminology, not silently deleted.

**[FORMALIZATION / OPEN under T-02]** Precisely delimit the action conditions of a CAN from a sufficient pathway for an identified Actualization. An actionable CAN in one relationship must **not** automatically settle Power for a broader Actualization with other necessary conditions. Conversely, when 'actionable' and 'positive Power' refer to exactly the **same** full set of action conditions, they may be operationally equivalent; whether this occurs and how it should be expressed must be explicitly tested, not assumed.

Keep analytically separate: CAN identification; NEED–CAN correspondence; actionability in the specified role; actual NEED satisfaction; assessment of complete Power; effective Actualization; observed and causally attributed effects. Unknown evidence is not proof of nonexistence.

## 4.3 Circular dependencies

**[VALIDATED]** If two Objects exhibit a circular NEED–CAN dependency, the Method should **seek a third Object** able to satisfy a NEED of either of the initial two Objects, potentially breaking the cycle.

Finding a third Object does not by itself establish that its CAN is actionable, that the NEED has become satisfied, or that the circular dependency has been resolved. **[FORMALIZATION consistent with adopted distinctions]**

**OPEN:** Cases where no suitable third Object is found; indirect or longer cycles involving more than two Objects; what counts as a resolved dependency; potential cascades and alternative paths.

# 5. Power and Actualization

## 5.1 Power remains distinct

**[VALIDATED]** **Power** is assessed for each CAN at T:
- **Positive Power** when at least one **sufficient pathway** of Conditions of Actualization is satisfied, so its Actualization can be **undertaken**;
- **Negative Power** otherwise;
- **Indeterminate assessment** when information is insufficient: this records **analyst uncertainty**, not a third ontological state of Power.
- **[VALIDATED, November 15]** With uncertainty, Power may be assessed **statistically** where an informative assessment is supportable. Distinguish the probability that **Power is positive given available information** from the probability that an **Actualization succeeds given available information**; the latter is not Power. Maintain qualitative uncertainty where a credible quantitative estimate is not available.

A CAN can belong to an Object's Potency while its Power is negative. Never call this “negative Potency”. A positive Power assessment permits undertaking an Actualization; **it does not guarantee successful outcome**.

**Important:** actionability for an identified CAN's specific role must not be substituted for the full sufficient-pathway Power test of a broader Actualization. Under the revised terminology the label 'mobilizable CAN' is historical; the exact scope of actionability and its relation to Power still require operational testing under T-02. **[VALIDATED distinction / OPEN criteria]**

Alternative sufficient pathways may satisfy the same goal through different conditions, including dependencies on the NEEDs or CANs of other Objects. The tests for conditions and pathways remain **OPEN**.

## 5.2 Actualization and improvement

- **Actualization [VALIDATED]**: the effective implementation of a CAN and resulting effects, including possible feedback on Potency, Power, Plasticity, NEEDs, other Objects, and Environment. Mention of NEEDs here adapts the prior feedback framework; its detailed mechanisms are **FORMALIZATION / OPEN**.
- **Focal Actualization [VALIDATED prior terminology]**: Actualization of the selected Focal Potentiality/CAN when the Focus is a CAN.
- **Improving Actualization [VALIDATED]**: Actualization envisaged or undertaken to improve the Power or prospects of success of another CAN; it may be relevant even if the latter's Power is already positive.
- NEED satisfaction can exist without any identifiable CAN Actualization; do not assume every NEED-focused analysis must culminate in a new Actualization. **[VALIDATED]**
- **[VALIDATED, November 15]** Effective Actualization updates the **versioned Definitions of all affected Objects**, including changes transmitted through shared constituent references. Simulations may prepare **temporary** branches; an effective Actualization makes the relevant branch **actualized** while retaining its ID and parent lineage. Actualization may satisfy or invalidate NEEDs or change available CANs; do not use monotone-state assumptions as universal rules.

A CAN-focused analysis with negative Power may identify missing conditions, new relevant environmental Objects, alternative CANs, potential development of CANs, or a different Focus. If attribution of the CAN itself is **not established**, this is distinct from a validly attributed CAN with negative Power. **[VALIDATED underlying distinction; FORMALIZATION in the revised vocabulary]**

# 6. Resolution Scenarios and recursive planning

## 6.1 Scenarios

**[VALIDATED]** A **Resolution Scenario** organizes one or more Improving Actualizations sequentially, in parallel, or conditionally, with dependencies, alternative pathways, multiple Objects, and reassessment. In alpha 0.4, a Scenario may engage analyses of **Secondary Subjects**, their NEEDs and CANs, and their role in satisfying conditions relevant to a Main Subject. **[FORMALIZATION of the new architecture]**

A candidate Improving Actualization with negative Power may be retained as a future option if missing conditions are identified. A positive focal Power does not prevent pursuit of a Scenario that improves prospects of success.

For a NEED-focused cycle, possible pathways for satisfying or maintaining a NEED may involve an already satisfied state, intra-Object relations, or inter-Object CANs. **[FORMALIZATION]** Multiple CANs corresponding to one NEED, or multiple NEEDs corresponding to one CAN, motivate **Scenarios and comparison**. **[VALIDATED]** Alternative contradictory Scenarios may have **isolated temporary Object branches**; their Definitions remain independent until one is effectively Actualized. **[VALIDATED default objective, November 15]** Generate **multiple relevant and materially distinct** alternatives rather than targeting a single best solution. Their **generation, evaluation, and optional selection** are separate operations; selection is not compulsory. The exact operational NEED-focused Scenario protocol and diversity criteria remain **OPEN**.

## 6.2 Scenario evaluation and comparison

**[VALIDATED, consolidated November 15, 2026]** Each relevant Scenario is assessed without assuming it must receive an overall score or be ranked as the best. Analyze at least the following **distinct** dimensions, according to the context:

1. **Feasibility and its uncertainty:** whether Conditions of Actualization can be met, separating this assessment from the difficulty of implementation; where defensible, estimate the **probability that feasibility conditions are met**.
2. **Complexity:** dependencies, implementation difficulty, coordination and analytical burdens, **separately from cost and feasibility**.
3. **Cost and resources:** financial, material, human and other relevant resource costs, not conflated with complexity.
4. **Temporality:** implementation delays, urgency, sequencing, time horizon and persistence of consequences.
5. **Expected effectiveness:** the anticipated improvement or result relative to the focal NEED or CAN, separately from the chance of actual success.
6. **Consequences on Objects:** anticipated favorable and unfavorable, direct and indirect, immediate and delayed effects on the **initial Subject**, other relevant **Objects in its Environment**, their NEEDs, CANs and relations.

**[VALIDATED uncertainty distinctions]** Keep separate (a) uncertainty about whether a Scenario is **feasible** (its conditions can be met), (b) the **probability of success** if it is undertaken, and (c) the **probability of each anticipated consequence**. Quantitative probabilities are provided **only where statistically justified**; otherwise indicate qualitative uncertainty or degree of possibility, rather than manufacturing numerical precision. These are distinct from binary Power and from uncertainty about whether Power is positive.

Compare internal coherence, robustness, adaptability, complementarities, synergies, competition for resources and risks. Consequences affecting other Objects must not be hidden by an aggregate score or silently offset by gains elsewhere. Optional criteria or weights are **contextual**, not universally prescribed.

**[VALIDATED operational distinction]** Scenario **generation** creates candidate alternatives, **evaluation** explains their consequences and trade-offs, and **selection** (if explicitly desired) applies stated decision criteria. The **default Advanced Mode presents multiple evaluated Scenarios without prescribing a single winner**. Even where a choice is eventually requested, any recommendation is conditional on the declared criteria, not an objectively universal optimum.

**[FORMALIZATION — optional and not mandatory]** A weighted score such as Σ(weight × rating) / Σ(weights), using conventional ratings from 0 to 5, may be explored if an explicit ranking problem warrants it; it is not a probability, objective truth or a required Advanced Mode output. Calibration, double counting, ranking stability, scenario diversity and empirical evaluation remain **OPEN**.

## 6.3 Recursive analytical workflow

**[FORMALIZATION — revised synthesis of the alpha 0.3 protocol and validated Focus sequence]**

1. Choose and contextualize the **Main Subject** (Object), with its relevant parts, Environment and relationships.
2. Inventory relevant **NEEDs and CANs**, including uncertainty and gaps; choose one **NEED or CAN** as Focus.
3. If the Focus is a CAN, identify its contextually relevant role, granularity and available evidence (former independent 'attributable CAN' terminology is OPEN); if a NEED, identify the required conceptual or functional state and its present satisfaction without presupposing a CAN Actualization.
4. Identify relevant NEED–CAN correspondences, **action** and satisfaction conditions, sufficient pathways, dependencies, and missing information, taking other Objects into account.
5. Assess Power where a particular CAN's Actualization is considered; distinguish **actionability in a specified role** from full sufficient-pathway Power, and distinguish statistical uncertainty about positive Power from success probability.
6. **Generate several relevant and materially distinct** Improving Actualizations, alternative states and Resolution Scenarios when the problem warrants alternatives; select Secondary Subjects for parallel analyses if dependencies warrant it.
7. **Evaluate and compare** the Scenarios' feasibility and its uncertainty, complexity, cost, temporality, expected effectiveness, probabilities or qualitative possibility of consequences, risks, interactions and impacts on the focal Subject and other Objects. **Do not require selection of a single best Scenario.**
8. Undertake selected Actualizations when their Power permits; **version the affected Object Definitions**, actualize relevant temporary branches without changing their IDs, propagate changes to shared constituent references in the effective context, and observe separately which NEEDs are satisfied, which effects occurred, and what can actually be causally attributed.
9. Return the Focus to the Subject and reassess its NEEDs, CANs, Potency, Power, constitution, relationships and Environment; revise Focus or Scenario as needed.

The exact stage-specific workflow is **OPEN**. Simulations and anticipated effects are **not Actualizations**. Recursive investigation may reveal CANs already present but previously unidentified; not all discoveries entail a change of Potency.

# 7. Effects, time, complexity and feedback

**[VALIDATED from alpha 0.3]**
- **Direct / indirect** describes causal mediation; **immediate / delayed** describes temporality. The dimensions are independent: a direct effect may be delayed and an indirect effect immediate.
- Distinguish **probability** (likelihood), **degree of possibility** (non-probabilistic plausibility), **magnitude** (importance of the change), and **value** (favorable or unfavorable assessment by an explicit criterion).
- Distinguish **anticipated**, **observed**, and **causally attributed** effects. An observed change does not by itself prove causality.
- The **principle of recursive relevance** supports investigating indirect effects while their possibility, magnitude and relevance to Objects and purposes justify continued analysis; rare, severe risks should not be overlooked.
- The **principle of complexity management** permits explicit simplification or suspension where analysis is too uncertain or costly, without claiming unexamined effects do not exist.

**[FORMALIZATION adapting to the November 15 architecture]** Effects may change NEED satisfaction, emergence or disappearance of CANs, Power, Plasticity, **versioned Definitions**, composition of Objects, and their Environments. They can affect both the Main Subject and Secondary Subjects; alterations should be evaluated rather than assumed beneficial.

# 8. Semantics, Semantic Objects and NEED identification

**[VALIDATED concepts retained]**
- **Semantic Landscape**: the structured and evolving set of an individual's knowledge, beliefs, representations, values, interpretations, and relationships of Meaning; reconstructing it is necessarily partial.
- **Semantic Object**: a unit of meaning identified through a **Meaning**, one or more **Expressions**, and a **Conceptual Network** contributing to that Meaning. Different Expressions or conceptual networks may convey similar Meanings.
- **Semantic Pyramid**: a hierarchical organization of dependencies within a Conceptual Network relative to a Meaning or focal concept; a network need not be tree-shaped.
- **Constitutive concept**: removing it makes the specified Meaning impossible. **Significant concept**: removing it substantially changes Meaning without abolishing it. Non-circular criteria are still to be tested.
- **Semantic Plasticity**: the aptitude to transform the Semantic Landscape without claiming that every such change modifies Potency.

**[VALIDATED in the restructuring]**
- A Semantic Pyramid may be used to help identify an Object's **existential and structural NEEDs**, but **only for Objects to which this analytical device is suited**; it is not mandatory for every Object.
- Dependencies in the Semantic Pyramid of a **Semantic Object** are **conceptual**.
- Distinguish **conceptual dependencies**, **conditions of actual existence**, and **conditions of functioning or maintenance**. A conceptual dependency does **not automatically establish** a physical, biological, social, or other empirically satisfied or unsatisfied NEED.
- A Pyramid may help identify and organize candidate NEEDs; evidence for a non-semantic Object's actual needs must be assessed in the relevant domain. **[FORMALIZATION of the accepted distinction]**
- **[VALIDATED, November 15]** To test whether a constituent Object is necessary to a Subject's Definition, ask: **without that Object, can the Subject still exist?** Specify whether the question concerns **conceptual** or **functional existence**. Semantic tools may help where relevant, but a conceptual dependency alone is not empirical proof of functional necessity.

**OPEN:** semantic equivalence, identity of Meaning, joint/alternative/circular/indirect dependencies, hierarchical versus structural importance, reconstruction without analyst projection, and relevance criteria for applying Pyramids to different Object types.

# 9. Minimal formalization and analytical safeguards

**[FORMALIZATION — notation is illustrative, not an additional approved ontology]**

Let O be an Object, S the Object currently selected as Subject, T the observation time, C(O,T) the set of contextually identified CANs of O, and N(O,T) the set of identified NEEDs of O. These lists may be partial; **'attributed CAN' as a separate technical status is OPEN**.

- **C(O,T) = {c1, c2, …}** is the contextually identified set of CANs (not necessarily exhaustive). Its relationship to **Potency** remains a legacy formalization to reconcile with the current language.
- **N(O,T) = {n1, n2, …}** is the set of attributed NEEDs; its members may be existential, structural, or both.
- For an identified NEED n, record its actual satisfaction state as **satisfied / unsatisfied** where known, or an **indeterminate assessment** where not known.
- For a CAN c, let Vj(c) be an alternative pathway sufficient to **undertake** an Actualization, with required Conditions of Power. **Power(c,T) = positive** if at least one such pathway is satisfied at T; otherwise it is **negative**. Documentary uncertainty is separate.
- Conditions may involve an **actionable CAN in the specified role** or an **actually satisfied NEED**, possibly belonging to a different Object. Actionability for one contribution does not by itself establish a complete sufficient pathway for a broader Actualization.
- A cross-Object relation may link a NEED of A with a CAN of B. It does not logically imply satisfaction, successful Actualization, or positive Power without further evidence.
- **[ILLUSTRATIVE formalization]** An Object record may be represented as `O = {ID, Definition_version, Parent, Temporary_Children, Actualised_Children}`; a Definition contains references to constituent Objects **plus** associated properties and relations, potentially with qualitative and/or statistical uncertainty. Historical references must identify the appropriate referenced versions. This notation is not a separate approved ontology.
- **[FORMALIZATION]** With evidence `I`, keep `P(Power(c,T)=positive | I)` distinct from `P(Actualization succeeds | I)`; the statistical model, calibration and applicability remain **OPEN**.

**[FORMALIZATION retained from alpha 0.3]** Illustrative pathway-condition satisfaction index:
**I = 100 × Σ(wi × si) / Σ(wi)** for wi ≥ 0, 0 ≤ si ≤ 1 and Σ(wi) > 0.
This index is **not** a probability and does not replace binary Power. Criteria, calibration, interactions, dependencies and aggregation remain **OPEN**.

**[OPEN — important consistency question]** Define the exact scope of **CAN actionable** and its action conditions in a particular relationship versus full **Power** for an identified Actualization. Earlier 'mobilizable CAN' was superseded as a separate current label, but historical D-20/D-21 distinctions must be preserved without silently defining actionable as positive Power. Also resolve meaningful statistical uncertainty measures, shared-Object propagation through branched historical Definitions, and branch ID allocation.

# 10. Use modes and possible applications

**[VALIDATED, November 15, 2026]** **Advanced Mode is the current default operation.** It explores and compares multiple relevant Resolution Scenarios for complex problems, with assessed effects on the initial Subject and its Environment, uncertainty, feasibility, complexity, cost, temporality and effectiveness; users may inspect and adjust scenarios, dependencies and indirect effects. It does **not** seek to identify one universally best solution or require a final selection. The shared methodological core is not to be weakened merely to simplify presentation.

**[VALIDATED current scope decision]** The previously contemplated **Simple Mode is suspended**, with its usefulness to be reconsidered **after the Method is stabilized**. No separate Simple Mode protocol, default ranking criterion or Simple Mode implementation is presumed active. If revisited later, it should preserve the same analytical rigor rather than omit material dependencies or consequences.

**[POTENTIAL APPLICATIONS, NOT VALIDATED USE CASES]** Analysis of individual behavior and group dynamics; clarification of conflicts; individual support; institutions and public policy; organizational and technical design; philosophical and semantic clarification; and AI systems able to conduct adaptive trialectic dialogue.

The Method's comparative value, reproducibility, benefits and limitations remain research questions. Conceptual approval must not be represented as scientific validation.

# 11. Open problems and validation program

## 11.1 Highest-priority dependencies

- **T-30 — Object / Subject / NEED / CAN / Definition architecture:** implement the newly **VALIDATED** unique IDs, versioned Definitions, Parent/Temporary Children/Actualised Children, branch promotion, shared constituents, conceptual versus functional existence and contextual CANs; formalize boundary tests, actionability/Power interface, uncertainty, historical simulation isolation and full Focus/Stage protocol. **[OPEN operationalization]**
- **T-01 — NEED and CAN identification:** test existential/structural necessity, conceptual/functional existence, contextual CAN selection and group/System CANs; decide whether a distinct 'attributable CAN' category or legacy tests A/B/C remain useful. **[OPEN operationalization]**
- **T-02 — Conditions of Power:** specify actionable CANs, action conditions versus global sufficient pathways, NEED satisfaction, inter-Object dependency, binary Power and statistical assessment of uncertainty. **[OPEN]**
- **T-03 — Reproducible protocol:** define contextualization, evidence recording, uncertainty, analyst agreement and parallel Subject analysis, including separate Scenario generation/evaluation and optional selection. **[OPEN]**
- **T-04 — Comparative usefulness:** compare the **default Advanced Mode** to free-form and generic structured analyses; previously proposed Simple Mode comparisons are deferred. **[OPEN]**
- **T-05 — Object-type boundaries:** examine Individuals, Groups, Technical Objects, Systems and experimental roles of Semantic Objects, including shared constituent Objects, ID/lineage and conceptual versus functional existence. **[OPEN]**

## 11.2 Further research (all OPEN)

- **Semantics (T-06–T-14)**: constitutive versus significant concepts; identity and equivalence of Meaning; alternative/joint/circular/indirect dependencies; Semantic Pyramids; Semantic Plasticity.
- **Context and scenarios (T-15–T-19)**: Situated Subject contextualization; generation, comparison, empirical reassessment of Scenarios; identify classes of problems where the Method adds value.
- **Adaptive AI dialogue (T-20)**: relevance, conversational economy and revision.
- **Recursion, measures and trade-offs (T-21–T-25, T-29)**: stopping rules and complexity; supplemental Power measures; normative and distributive effects; edge cases; theoretical comparisons.
- **Documentation and deployment (T-26–T-28)**: practical tools, cases and versioned decisions.

The [TODO](../TODO.md) remains the task registry; this section summarizes it rather than silently closing or renumbering tasks.

## 11.3 Proposed tests, not executed

**[PROPOSED PROTOCOL, NOT EXECUTED]** Build a corpus of positive, negative, boundary and circular-dependency cases, including individuals, collective Subjects, technical Objects and Semantic Objects. Have several independent analysts apply the draft criteria, document their disagreements, and compare results with free-form analysis and existing structured methods. Assess consistency, relevant coverage, quality of alternatives, anticipation of effects and analytical cost. A single model's comparison is not independent validation.

# 12. Terminology, continuity and unresolved renaming

| Alpha 0.3 wording | Alpha 0.4 treatment | Status |
|---|---|---|
| Subject (generic analyzed entity) | **Object** (generic entity); **Subject** (attention center of the Method or analyst) | VALIDATED change |
| Situated Subject | Subject contextualized in its Environment | VALIDATED contextual principle; separate term OPEN |
| Object Definition | Versioned list of constituent Objects **and** associated properties/relations | VALIDATED; name provisional |
| Object identity/branches | Permanent ID; Parent; Temporary Children and Actualised Children; same ID on promotion | VALIDATED; implementation details OPEN |
| Potentiality | **CAN**, a contextually identified Potentiality; separate 'attributable CAN' status questioned | VALIDATED contextualization; OPEN legacy-status removal |
| Potency / Puissance | Set of an Object's CANs at T | FORMALIZATION; retention of the term OPEN |
| Focal Potentiality | Selected CAN **only when the Focus is a CAN** | FORMALIZATION; NEED Focus also VALIDATED |
| Focus | Subject → selected NEED or CAN → Actualization → Subject | VALIDATED sequence; procedures OPEN |
| Power | Distinct assessment of sufficient Conditions of Actualization | VALIDATED retention |
| Conditions of Power | Include **action conditions for actionable CANs** and NEED satisfaction; former mobilizable-CAN terminology historical | VALIDATED terminology update; criteria OPEN |
| Actualization / Improving Actualization | Retained; relationships to NEED satisfaction made explicit | VALIDATED foundations; refinements OPEN |
| Plasticity | Retained for changing CANs; NEED-related extensions OPEN | VALIDATED foundation / OPEN extension |
| Semantic Pyramid | Optional device for identifying NEEDs where suitable | VALIDATED restriction; procedure OPEN |

The author-used terms **Object**, **NEED**, **CAN**, **Focus**, **Stage** and the provisional **Definition** are used here as technical vocabulary consolidated through November 15, 2026. The approved bilingual glossary's nine established translations have **not been silently revoked**; any new official cross-language equivalents require review.

# 13. Version and decision history

## Alpha 0.3 — retained historical foundations (November 14, 2026)

Alpha 0.3 consolidated the constitutive attribution rule; distinguished current from learnable or future Potentialities; separated group Potentialities from those of members; exposed dependencies on other Subjects; corrected “negative Potency” to **negative Power**; allowed focal redefinition, development and contextual expansion; kept tests A/B/C **OPEN**; and refused to introduce a new positive/negative status of Potentiality attribution. The earlier complete reference is recoverable from the repository's Git history under its former path `reference/trialectic-method-alpha-0.3.md`.

## Alpha 0.4 — structural revision (November 14, 2026)

**New or restructured conceptual decisions**:
1. Generic **Object** replaces generic **Subject**; **Subject** now marks the chosen analytical center, with Main and possible Secondary Subjects.
2. Explicit methodological **Stages** and shifting **Focus**: Subject → NEED **or** CAN → Actualization → Subject.
3. Non-exhaustive **NEEDs** and **CANs** attributed to Objects, with internal and cross-Object relations.
4. Author-approved **NEED** definition, overlapping existential/structural statuses, and satisfaction distinct from need existence; satisfaction can occur without identifiable Actualization.
5. Contextual **Environment** includes relevant Objects and relationships; **accessible** refers specifically to direct interaction.
6. Semantic Pyramids are used **only when suitable**, and conceptual dependencies are distinguished from real-world existence and functioning conditions.
7. **Mobilization** and **satisfaction** Conditions of Actualization are distinct; need–CAN matches require further tests, and a **mobilizable CAN need not have positive Power**.
8. A NEED constitutive of **Object A** may simultaneously be a Condition of Actualization for **Object B**.
9. Circular dependencies between two Objects call for searching a **third Object** that can satisfy a NEED of either.
10. The existing framework for Power, Actualization, scenarios, Semantics, effects, recursion, research status and uncertainty remains in force where not superseded, with operational reconciliation explicitly **OPEN**.

**Governance:** This canonical reference was initialized from the alpha 0.4 consolidation and continues to distinguish author-approved choices, explanatory formalizations, and unresolved questions. It is **not a declaration that T-01, T-02 or T-30 is finished**, nor scientific validation. Future snapshots should use Git tags (created explicitly against the intended commit); earlier contents remain available through Git history, even when old filenames have been deleted.


## November 15, 2026 — Object Definition, branching and actionable CAN refinements

**[VALIDATED author decisions; see D-25–D-27]** Each Object has a stable unique ID, a versioned Definition comprising constituent Object references plus associated properties/relations, and a Parent (`null` or a parent Object) with **Temporary Children** and **Actualised Children**. Branches are created for contradictory Actualizations in both simulated and effective settings. Promotion of a temporary branch to effective Actualization retains its ID and updates the parent's lists. Historical Definition versions preserve past states; shared constituent Object modifications propagate to current referencing Definitions in the relevant context, while simulations remain isolated from the actual state.

Initial Object identification is relative to the focal Subject and its existential/structural constituents; Definition expansion is contextual and recursive. Conceptual existence is distinguished from functional existence. A Semantic Pyramid may assist a necessity test where relevant, not serve as universal empirical proof. NEEDs and CANs may be recorded with qualified uncertainty; a CAN is represented as a conceptual Object with its own NEEDs only where useful.

**[VALIDATED terminology]** Use **CAN actionable** in place of a distinct **CAN mobilizable** category. The relationship between an actionable CAN's conditions and full Power remains a targeted OPEN question. Statistical assessment of Power uncertainty is distinguished from probability of successful Actualization. Actualization updates affected Object Definitions and may entail harmful or non-monotone changes.

**[OPEN]** Whether to formally retire 'attributable CAN' as a distinct category; calibrated assessment of uncertainty; versioned graph propagation and conflicts; precise actionability/Power logic; Object boundary tests and complete operational protocol. Nothing in this revision represents experimental or scientific validation.

## November 15, 2026 — Default Advanced Mode and scenario objectives

**[VALIDATED author decisions; D-28]** Advanced Mode is the **default** and explores **multiple relevant, diverse Resolution Scenarios** for a complex problem. Scenarios are compared through anticipated effects on the focal Subject and Objects in its Environment, feasibility, complexity, cost, temporality, effectiveness and appropriately represented uncertainty. Distinguish feasibility uncertainty, success probability and consequence-specific probabilities, using statistics only where supportable. Generation, evaluation and any optional selection are separate operations; the Method does not inherently choose the best solution. The **Simple Mode is deferred** until stabilization of the Method and must not be treated as an active default or a current evaluation target. Operational tests of diversity, uncertainty calibration and usefulness remain **OPEN**.
