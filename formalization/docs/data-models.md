# Trialectic Method — Data models, roles and rationale

> **Ownership:** computational formalization and the meaning/limits of its data records. The [Method reference](../../reference/trialectic-method.md) alone owns the underlying methodological definitions. Preserved from the legacy file without changing conceptual or schema approvals.


**Scope and source-of-truth boundary:** This is a catalogue of model roles,
not an alternative field contract. The adopted v2.0–v2.2 Analysis and
PowerEvaluation exchange profiles are specified in
[schemas/global-model.md](../../schemas/global-model.md) and implemented in
[schemas/model/](../../schemas/model/README.md). Earlier statements below describing
the global envelope or Scenario serialization as OPEN predate D-77/D-78 and are
superseded for the adopted v2 profiles. Semantic, lifecycle, causal and empirical
verification remain separate work.

**Status:** reference **catalogue and explanatory map** for the `dev` branch, established 2026-11-16 after D-74. **This document is not a new data-model decision, a normative JSON Schema, a new ontology, or scientific validation.** It records what the existing Method models, *why each distinction exists*, its level of approval and where its authoritative specification is maintained.

**Language:** English explanations, consistent with the maintained repository reference; preserve exact identifiers from the existing definitions and JSON. The original author-approved French NEED definition is reproduced verbatim, while all explanatory English text is a working rendering, **not** an independently approved bilingual equivalence.

**Authority by concern:** [Validated decisions](../../DECISIONS.md) and the maintained [Method reference](../../reference/trialectic-method.md) govern concepts; [schemas/model/](../../schemas/model/README.md) governs the adopted v2 exchange shapes; this catalogue and the [PowerEvaluation companion](power-evaluation.md) explain why the models are distinct. [Historical schema experiments](https://github.com/Nirgalz/trialectic/blob/7fc676586a85be504bf145d313b19fefadfb9761/schemas/power-evaluation.boundaries.schema.json), [proposals](https://github.com/Nirgalz/trialectic/blob/05c17bb6936ef1bc063eec56caed361f41f56f31/schemas/proposal-v0/README.md) and [synthetic fixtures](../../tests/README.md) are not higher-priority current specifications. Resolve discrepancies against validated decisions and current contracts; do not silently infer new normative rules.

## 0. How to read the models

- **VALIDATED (concept):** the purpose and conceptual distinctions were explicitly approved; a general principle is not necessarily an approved serialization.
- **VALIDATED (fields):** specific fields, requiredness, enum values or structure were approved (sometimes only within one limited data model).
- **PARTIAL SCHEMA:** some fields are enforced by a runnable JSON Schema Draft 2020-12; this **does not** guarantee reference existence, correct context, causal truth, completeness or empirical validity.
- **PROVISIONAL / OPEN:** a proposed record or illustrative JSON shape, an unapproved field name, an unresolved invariant or a research/engineering task.
- **SYNTHETIC:** an example or test case, **never** evidence that a real Object, CAN or causal mechanism behaves as described.

**A recurring mistake to avoid:** identifying an Object or relation, assessing it in a context, and recording an Actualization are **three different operations**. The Method must preserve these separate layers:

1. **Definitions** — identities, versioned properties, proposed relations, conditions and temporal requirements;
2. **Contextual assessments** — what is known/unknown about NEED satisfaction, CAN Actualizability, conditions, correspondence, Power and Scenarios;
3. **Scenario histories / actual events** — observed or expressly simulated changes and their effects, with provenance;
4. **Epistemic records** — claims, evidence, reviews, justifications, uncertainty and revisions about the three preceding layers.

The Method is an analytical framework, not a claim that Object types all behave alike or that three perspectives are symmetrical universal causes.

## 1. Model map

| Model / record family | Why it exists | Maturity and authoritative location |
| --- | --- | --- |
| Analysis context, Subject, Environment, Focus, Stage | Say *who/what is examined, from which perspective and for what purpose* | Concept VALIDATED; Analysis v2 envelope VALIDATED (D-77) — [canonical §§1–2](../../reference/trialectic-method.md) |
| Object identity, lineage and versioned Definition | Reidentify an Object across changing knowledge, time, composition and Scenario branches | Principles VALIDATED; full storage layout OPEN — canonical §2.1.1 |
| NEED and CAN Objects; origin-anchored relation | Express necessity and potential Actualization without conflating bearer, target and relationship | D-36/D-50 VALIDATED; identity reconciliation OPEN — canonical §3 |
| `relation` characteristics, `relation.links`, `affects`, weights | Qualify individual connections, logical groups, enabling/inhibition and possible interactions | D-37/D-38 validated representation; dynamics D-39; full schema OPEN |
| Temporal requirements, estimates, exceptions | Preserve *when* satisfaction/action is required; do not overwrite actual events | D-33–D-35 VALIDATED principles/working structure; exceptions schema OPEN |
| Condition Definition and condition evaluation | Separate *what must hold* from *whether it holds now* | D-40 VALIDATED; full predicate syntax OPEN |
| Pathway, inventory, recursive expression | Represent multiple AND/OR routes and different kinds of incompleteness | D-41–D-43 VALIDATED semantics; full recursive JSON OPEN |
| Versioned, typed references and multiple graph kinds | Prevent mistaken joins between Objects, relations, conditions, logical dependencies and causal hypotheses | D-39/D-42–D-44 VALIDATED; normalized identifiers OPEN |
| Resolution Scenario and branch | Compare hypotheses without treating them as realized histories | Object lineage, D-31–D-35/D-44 VALIDATED; Scenario exchange fields VALIDATED (D-77/D-78); behavioral semantics remain distinct |
| Object state, Actualization event, state change | Track what was assumed, simulated or observed and what actually changed | D-40/D-44 VALIDATED distinctions; event JSON provisional |
| Effect, competing-effect diagnosis | Preserve positive/negative, direct/indirect, immediate/delayed consequences and unresolved contradictions | D-39/D-45 and canonical §7 VALIDATED; effect/conflict JSON OPEN |
| Claim, evidence item, method review, claim assessment | Keep model-internal inference distinct from independently supported empirical claims | D-46/D-47 VALIDATED principles; normalized JSON OPEN |
| `PowerEvaluation` and three Focus-specific `Results` shapes | Make contextual Power analysis explicit, versioned, revisable and composable | D-57–D-74 approved conceptual/partial field contracts — [companion](power-evaluation.md) |
| Semantic Landscape/Object/Network/Pyramid | Support Meaning interpretation and candidate conceptual NEED identification | Concepts VALIDATED; data serialization and semantic equivalence OPEN — canonical §8 |
| Potency, Plasticity and Actualization feedback | Describe potentialities and changes over time without reducing possibilities to currently active events | Concepts VALIDATED; no universal independent record/schema approved — canonical §§3, 5, 7 |

**Diagram of conceptual relationships (not a database schema):**

```text
Analysis context (Main Subject, Environment, Focus)
      ├── references Object IDs ──> versioned Object Definitions
      │                              ├── constituents (other Objects)
      │                              ├── NEED/CAN Objects and relation records
      │                              │    └── relation.links / conditions / temporal
      │                              └── Parent / Temporary Children / Actualised Children
      ├── chooses NEED, CAN or Scenario as assessment Focus
      │       └── PowerEvaluation ──> analytic Dependencies, version pins, Results
      └── explores Resolution Scenarios
              ├── versioned pathway Definitions / inventories
              ├── time-specific Object states and condition assessments
              ├── contemplated CAN Actualizations (not events)
              ├── explicitly simulated OR observed Actualization events
              └── effects, contradictions, re-evaluations and branch histories

Claim + evidence + review + claim assessment qualify assertions about any layer.
```

## 2. Context of an analysis: Subject, Environment, Focus, Stage

**Rationale.** A CAN or NEED does not have a universally valid evaluation independent of its bearer, the specified contemplated Actualization, the Environment, the time, the available information and the analytical goal. A *Subject* is an **Object selected for attention**, not another universal kind of entity.

**Approved concepts:** Main Subject (first chosen Object), optional Secondary Subjects, contextual Environment of relevant Objects and relationships, direct `accessible` interaction as narrower than environmental relevance, Stage (analytical operation), Focus (object of attention during a Stage), relevant but non-symmetric perspectives Subject / Environment / Semantics. The default **Advanced Mode** generates and compares several relevant Resolution Scenarios; selection of a winner is optional.

**Storage status:** D-77 now adopts the versioned [Analysis v2 exchange contract](../../schemas/global-model.md). Its root keys and model-family collections are normative for this profile. Historical proposal-v0 remains unapproved as an alternative contract. These profile keys are not universal ontological properties of every analysis; evaluation Subject/Focus retain D-67/D-68 distinctions.

**Why a Focus is separate from the Subject:** the *same* Object may be the Subject while attention shifts among a NEED, CAN and a Scenario, and another Object may become a Secondary Subject during a recursive analysis. Changing Focus does not automatically change Object identity or its Definition.

## 3. Object identity, Definition, composition and branching

**Rationale.** Preserve continuity of an Object while its description and actual state evolve; distinguish persistent identity from competing hypothetical futures; prevent shared constituents from silently being duplicated or retroactively mutated.

**Approved model-level properties:**

- An Object has a **unique permanent ID** and a versioned **Definition** describing constituents **plus** properties, NEED/CAN relationships and knowledge/uncertainty. A list of constituents alone is not a full Definition.
- Object classes contemplated by the Method: **Individual, Group, Technical Object, System, Semantic Object**. Their identity/agency tests are not presumed identical.
- **`Parent`**, **`Temporary Children`**, **`Actualised Children`** record **lineage**. This is **not** the same as constituent/composition references.
- Contradictory hypothetical Actualizations can lead to distinct temporary child Objects and isolated Definitions. Effective Actualization preserves the corresponding child ID when moving it from Temporary to Actualised Children; historical Definitions stay intact.
- A constituent Object may be **shared by reference**; changes relevant to other current Definitions can propagate, while simulated modifications remain isolated to their Scenario.
- Definition versions and references to constituent versions must preserve historical meaning; a new observation does not automatically mean the Definition changed.

**Serialization status:** the notation `{ID, Definition_version, Parent, Temporary_Children, Actualised_Children}` in canonical §9 is illustrative. [Proposal-v0 `object`/`definition`](https://github.com/Nirgalz/trialectic/blob/05c17bb6936ef1bc063eec56caed361f41f56f31/schemas/proposal-v0/trialectic.schema.json) uses `id`, `category`, `parent_id`, child-ID lists, `constituents`, `properties` and `relation_refs`: **OPEN TECHNICAL PROPOSAL**, not a second approved schema. The precise meaning of one Object ID across physical instantiation, alternative descriptions, versions and branches remains an open implementation matter.

**Do not confuse:** parentage vs composition; actual change vs new knowledge; simulated branch vs observed event; shared reference vs copied constituent; branch identity vs evaluation-revision lineage.

## 4. NEED and CAN: Object identities and origin-anchored relational records

**Rationale.** A NEED specifies an attributable necessity; a CAN represents a Potentiality for a contemplated Actualization. They may be connected to multiple other Objects and serve as different roles within distinct contexts. The model must not treat a bare `NEEDs`/`CANs` inventory entry as proof of necessity or causal sufficiency.

**Approved NEED definition (French wording reproduced from canonical §3.1):**

> NEED : nécessité attribuable à un Objet, dont la satisfaction est requise pour l'existence, le maintien ou la réalisation d'un état déterminé de cet Objet. Un NEED peut être existentiel, structurel ou les deux. Sa satisfaction peut résulter d'un état existant ou impliquer l'Actualisation d'un ou plusieurs CANs

**CAN:** Potentiality of an Object that may be Actualized in specified circumstances; autonomous action is not universally required. A CAN may be identified without being currently actualizable.

**Identity clarification (D-50):** a NEED is an **Object** with its own Object ID; a CAN is likewise an **Object** with its own ID. When NEED Object N appears in Object O's `NEEDs` list, O is contextually attributed that NEED. The possessing O is **not** identical to N. Whether the separately identified **D-36 relational record** *is* the underlying NEED/CAN Object or represents it through a separate record **remains unresolved**. This is explicitly tracked as O-01 in [proposal-v0 OPEN](https://github.com/Nirgalz/trialectic/blob/05c17bb6936ef1bc063eec56caed361f41f56f31/schemas/proposal-v0/OPEN.md); do **not** silently merge Object IDs and relation IDs.

**Validated D-36 minimal working relation record** (field names approved at this level):

```json
{
  "ID": "R-001",
  "Type": "NEED",
  "OriginObject": "O-001",
  "NEEDs": ["O-002", "O-003"],
  "CANs": ["O-004"]
}
```

- `Type` = `NEED` or `CAN`. `OriginObject` identifies the source Object. `NEEDs` and `CANs` are **nullable lists of Object references** that refine the parent relation; they are not automatically nested relation records and do not retype all their members.
- A relation may have multiple participants. A separate universal `TargetObject` is **not** required: participants already appear in the two inventories.
- A NEED exists regardless of its *current* satisfaction. A NEED can already be satisfied by an existing state without identifiable CAN Actualization.
- Some existential, structural and functional qualifiers may apply jointly; context and explicit criteria matter.

**Do not confuse:** Object ID vs relation-record ID, origin Object vs target/linked Object, relation Definition vs contextual satisfaction, candidate correspondence vs established effect.

### D-83 — Independent identification and qualified attribution (normative v2.1 extension)

An Object has at most one immutable NEED/CAN conceptual kind per permanent ID. A CAN may itself possess NEEDs. Identification as NEED or CAN is independent of attribution to an Object. Pending identification remains a qualified claim, not a definitive Object kind; pending or refuted attribution does not contribute to the bearer's established Puissance. A requalification requires a new Object ID, historical provenance and reassessment.

The transport profile 2.1.0 adds optional `Object.concept_kind`, `Object.requalification` and version-required `Relation.attribution`, explicitly separating concept identity from context-specific attribution. Earlier 2.0.0 documents remain valid but their unqualified relations are **not** established by default. Details: [global-model.md](../../schemas/global-model.md), D-83 and the scoped semantic checker. Operational completeness and empirical evidence are still OPEN.

### D-84 — CAN affiliations: specialization and composition (Analysis v2.2)

A CAN can have child CANs through *specialization* (more specific Potentiality) or *composition* (complex Potentiality involving child CANs), with multiple parents permitted. Each CAN is an independently identified Object, can possess NEEDs and can itself have children. CAN affiliations are **not** D-83 attributions or D-25 historical Object branching; they do not automatically establish possession, actionability, necessity or sufficiency.

The `2.2.0` exchange profile records these relations as independent `can_affiliations[]` entries containing versioned parent/child CAN Object refs, a specialized/composed kind and an epistemically scoped, versioned Claim. The two earlier `2.0.0` and `2.1.0` profiles remain unchanged and forbid the new collection. Semantic checks of references and kinds are implemented, but cycles have only advisory detection and compositional/inheritance rules remain OPEN. See [global-model.md](../../schemas/global-model.md), D-84 and the dedicated synthetic tests.

## 5. `relation`, `relation.links`, interactions and weights

**Rationale.** Plain lists of Object IDs conceal *why* a link matters. Links need individual roles, conditions, causal hypotheses, relative importance and possible link-to-link effects; logical composition must be explicit rather than inferred from list membership.

### 5.1 Relation-level structure — D-37

The D-36 record can contain a structured `relation` with `nature` and `composition`. Contextual origin natures include `existential`, `structural`, `functional` for NEEDs and `contributive`, `enabling`, `inhibitory`, `transformative` for CANs; these are **not exclusive intrinsic types**. Relationship qualifiers such as `alternative`, `complementary`, `substitutive`, `sequential`, `synergistic`, `antagonistic`, `reciprocal` express context-dependent roles.

In the approved working representation, `relation.composition[]` can use grouped `objects` and `operator: all|any` for **Object-reference composition**. How multiple groups combine and what they establish causally remains OPEN. This composition is **different** from temporal requirement composition and condition/pathway expression composition.

### 5.2 Qualified link record — D-38

| `relation.links[]` field | Meaning | Required |
| --- | --- | --- |
| `id` | Scoped link identity | **yes** |
| `object_id` | Referenced Object | **yes** |
| `source_list` | Exactly the parent inventory `NEEDs` or `CANs` containing that Object | **yes** |
| `roles` | Contextual possible roles, not causal proof | optional |
| `conditions` | Qualified conditions under which a role/link applies | optional |
| `mechanism` | Mechanistic explanation/hypothesis | optional |
| `causality` | `direct`, `indirect`, `indeterminate`, where supportable | optional |
| `evidence` | Qualification and justification | optional |
| `affects` | IDs of **other links** potentially affected | optional |
| `weight` | Relative weight of a linked NEED dependency | optional |

**Consistency rule:** if `source_list: NEEDs`, `object_id` must already appear in the parent's `NEEDs` inventory (analogously for CANs). Each link has a distinct `id` **within its relation**; a globally stable cross-record addressing convention remains OPEN. `affects` is an hypothesized **link-to-link** influence, not necessarily an effect on the linked Object's observed state. D-39's optional `effect_details` is a **provisional extension**, not part of the D-38 required contract.

**Weights (D-50):** optional nonnegative `weight` is contextual to a parent NEED→NEED or CAN→NEED dependency link. The working, conditional weighted mean for a parent NEED's comparable justified degrees is `sum(wᵢ × dᵢ) / sum(wᵢ)` when total weight is positive. This is **not** CAN Actualizability, necessary-condition logic, probability, or proof of overall satisfaction. Missing weights, comparability, zero sum and cycles remain OPEN.

## 6. Shared temporal model — D-33–D-35

**Rationale.** Final-state satisfaction does not suffice where duration, continuity, deadlines or recurrence matter. A real/simulated interruption must remain visible even if an **authorized exception** yields compliant temporal assessment.

**Approved working field family:** `temporal` for NEED/CAN Definitions, with `requirements` (normative time constraints), `estimates` (execution duration, effect delay/duration) and `time_zone` (IANA civil time zone). A requirement has a `target` and a `mode` of `point`, `continuous`, `deadline`, `recurring` or `cumulative`. Requirements can have `id`, `at`, `window`, `deadline`, `recurrence`, `min_duration`, as appropriate. Estimates concern predicted durations, *not* observed execution.

**Composition D-34:** all recorded requirements apply with implicit `all` unless `temporal.composition` states `operator: all|any` and references requirement IDs. Explicit authorized exceptions must be justified, period/constraint-scoped and versioned; violations are not automatically exceptions. Inconsistent overlapping constraints require a distinct Definition diagnostic.

**Time conventions:** ISO 8601 instants with explicit UTC offset; IANA zone when applicable; ISO 8601 durations; start-inclusive/end-exclusive intervals; avoid double counting overlapping intervals for cumulative duration. Full recurrence, exception precedence, nested groups and boundary/DST algorithms remain OPEN.

**Separate contextual answers (D-35/D-69/D-70):**
1. `effective_satisfaction` — was the NEED's required state effectively present?
2. `temporal_compliance` — were the applicable temporal requirements complied with, including duly authorized exceptions?

Compliance may be `satisfied` while effective satisfaction is `unsatisfied` during an authorized interruption. Neither answer rewrites the original temporal Definition, observed interruptions or effects. See §13.1 for the *currently approved PowerEvaluation result fields*; an exception's complete record schema is OPEN.

## 7. Conditions, evaluations and predicates — D-40/D-73

**Rationale.** The same Condition Definition can be satisfied in one Scenario and unsatisfied in another. Separating its predicate from its contextual evaluation avoids rewriting a requirement merely because the world, a simulation or available evidence changed.

- **Condition Definition (VALIDATED principle):** stable ID **within its owning NEED/CAN relation**, owner, target/purpose (actionability, NEED satisfaction or relation applicability), predicate about relevant Object property/properties, optional time restrictions and logical grouping. **Full JSON predicate schema OPEN.**
- **Condition evaluation (VALIDATED principle):** `satisfied` / `unsatisfied` / `indeterminate`, qualified by Scenario, time/interval, versioned Definition and evidence. A missing assessment is not equivalent to an explicit `indeterminate` one.
- **Composite Condition reference (VALIDATED identity principle):** owner relation + condition ID, qualified by Definition version when needed. An arbitrary bare `condition_id` is not globally unique.
- **D-73 approved local reference shape** inside CAN `Results.prerequisites.conditions[]`: required nonempty `owner_relation_id` + `condition_id`, optional three-valued `status`. That entry is **not** a stand-alone universal Condition schema.

**Provisional only:** D-40 illustrates `relation.conditions[]` with `id`, `target`, `predicate: {object_id, property, operator, value}`. This is *not* a final field-level approval. State changes may cause reevaluations; change of the predicate itself needs an explicit versioned Definition revision.

## 8. Pathways, inventory and recursive logic — D-41–D-43/D-73

**Rationale.** A CAN can have **several routes to Actualization**, each with its own possibly incomplete necessary conditions. Failing one known route is not proof that all potential routes fail. The model must identify **two completeness levels**.

| Unit | Reason and role | Status |
| --- | --- | --- |
| Pathway Definition | A named, versioned route with composable Conditions and evidence; other routes may reuse its reference | D-41/D-42 principle VALIDATED; full JSON OPEN |
| Pathway `coverage` | Completeness of **conditions within that pathway** | D-41 VALIDATED; D-73 has an approved local `pathways[].coverage` field |
| Documentary inventory | Which possible relevant pathways have actually been identified; may validly have **zero** known routes | D-43 VALIDATED concept; full schema OPEN |
| `inventory_coverage` | Completeness of the **set of possible relevant pathways within an explicitly declared scope** | D-41 VALIDATED; D-73 local field approved |
| Recursive logical expression | Explicit nested `all`/`any` groups with reusable named/versioned references | D-42 **structural principle** VALIDATED; exact expression JSON OPEN |
| Logical-reference graph | Dependencies among versioned Conditions/pathways, including detectable cycles | D-42/D-43 principles VALIDATED |
| Potential-causal graph | Hypothesized influences between CAN Actualizations, triggers, conditions, states and links | D-39/D-43/D-44 principles VALIDATED |

**Critical distinctions:**

- **Three different uncertainties:** unknown value of an identified Condition; unidentified required Condition within a known route; additional route not yet discovered.
- `all` of identified Conditions is not universally true when the inventory of required Conditions is incomplete. `any` of identified routes is not universally false when alternatives remain unknown.
- An inventory with no known routes is valid **documentary knowledge**, not an empty Boolean expression; `{op:"any",items:[]}` is not automatically false and `{op:"all",items:[]}` is not automatically true.
- Reusable versioned pathway references and cycles are allowed, but cycles must be **detected**, not naively expanded or called impossible by structure alone.
- Evaluation of an expression does **not** cause an Actualization event; a hypothesized causal edge does **not** establish a logically sufficient route. Handle non-monotone/delayed dynamics through Scenario analysis.

**Provisional JSON:** D-42 proposes leaf `{ref:{kind:"condition"|"pathway", ...}}` and group `{op:"all"|"any",items:[...]}`. D-43 illustrates `expression: null` in a documentary inventory. Their **principles**, not these complete machine-readable layouts or any global `search_status` vocabulary, are approved. The already-approved `search_status` vocabulary in D-71/D-74 applies **specifically to those candidate inventories**.

## 9. Scenarios, branch state, events, effects and conflict records

### 9.1 Resolution Scenario — why a separate model exists

A Scenario is a **contextual alternative**, with relevant Object/Definition versions, Conditions, contemplated CAN Actualizations, dependencies, timing, anticipated effects and its own hypothetical state/history. It enables comparison and recursive inquiry *without claiming the Scenario occurred*. The default Advanced Mode explores multiple suitable alternatives; generation, evaluation and optional selection remain separate. Version pins and histories must stay isolated across branches; an eventual effective Actualization needs an explicit promotion/action.

**VALIDATED principles:** D-31–D-35, D-39–D-45, D-63, Object branching in canonical §2.1.1. **OPEN:** complete Scenario Definition, ordering/dependency/parallelism serialization, merge/split semantics, and final JSON Schema.

### 9.2 Object state, Actualization event, state change — why three records

| Concept | What it records | Must never imply |
| --- | --- | --- |
| Object state | Values/knowledge of Object properties in Scenario and at a time | That a change or causal event occurred |
| Actualization event | Distinct, identifiable **simulated** or **observed** undertaking of a CAN's Actualization, with source CAN Definition, Scenario, time, epistemic provenance | That a planned action is already real, successful or beneficial |
| State change | Before/after (as supportable), changed Object/property, time and **triggering event** | That every observed change was caused by the candidate CAN |

Effects can be delayed, temporary, adverse or absent. The D-44 example of `event_id`, `scenario_id`, `kind`, `at`, `can_ref`, `mode` is **provisional serialization**, not an approved uniform event schema. `state_changes` in proposal-v0 is also technical proposal only.

**Why version pins and event IDs matter:** they permit condition reevaluation against the relevant state at the correct time, trace effects back to triggers and distinguish hypothetical from observed timelines. Simulated effects are confined to their own Scenario; they must not automatically mutate shared effective Object Definitions.

### 9.3 Effect and contradiction

An effect can be favorable/unfavorable/mixed/uncertain, **direct or indirect** (causal mediation), independently **immediate or delayed** (time). Keep **anticipated**, **observed** and **causally attributed** distinct; observation alone does not prove cause. Probability of an effect, qualitative possibility, magnitude and value are **not the same measurement**. Effects can transform Object NEED/CAN inventories, Definitions, conditions, Power and Environment. Non-favorable effects on other Objects must remain visible, not canceled by a single score.

When effects or accounts assign incompatible values to the same property/time/context, use a **conflict/diagnostic record concept** (D-45) to preserve competing sources, versions, mechanisms, evidence, alternatives and handling. Do not choose by file/list order; if unresolved, suspend **only** dependent transitions/assessments and allow independent analysis to continue. A conflict in knowledge is **not** a physical `null` transition. The `conflict_id`, `sources`, `diagnosis`, `strategy` JSON example in canonical §2.1.11 is **PROVISIONAL**.

## 10. Claims, evidence, method reviews and revisions — D-46/D-47

**Rationale.** A conclusion may be derivable *inside the declared model* while its premises, data or causal interpretation remain empirically unverified. Evidence provenance and methodological adequacy must therefore be traceable **independently of logical correctness**.

- **Claim:** identifiable, version/scenario/time/scope-bound proposition about an Object state, relation, condition, pathway, Scenario or causal effect. Its identity should not be lost when it is reconsidered.
- **Evidence item:** an identifiable source/report/measurement/observation, with origin, method, relevant collection/observation times, scope, limitations and provenance; evidence may support, contradict or merely inform a claim. Multiple publications of the same underlying dataset are not automatically independent.
- **Evidence method review:** applied quality criteria appropriate to the evidence's *method* and the particular claim (relevance, reliability, traceability, independence, discriminating power). Whether criteria are satisfied is **separate** from the claim being adequately supported (D-47).
- **Claim assessment:** contextual and revisable assessment referring to the claim, model assumptions/inference and supportive/contradictory/informative evidence, preserving a distinction between **`established_in_model`** and **empirically warranted** conclusions. Unjustified confidence probabilities or universal credibility scores are not to be invented.
- **Revision history:** retain earlier assessments, evidence as known at the time, source independence and any contrary evidence; new data do not retroactively alter observed Object states or Definitions. Provide user-inspectable justifications without asserting access to hidden AI reasoning.

**Status:** conceptual separation D-46/D-47 **VALIDATED**. Exact record types `claim`, `evidence`, `evidenceReview`, `claimAssessment` in proposal-v0 are **OPEN technical proposal**, not approved global identifiers. A new PowerEvaluation revision follows the **separate validated D-58–D-60 lineage** (§12).

## 11. Semantic models and Plasticity

**Rationale.** The semantic perspective helps identify conceptual dependence, Meaning and candidate NEEDs without turning linguistic resemblance into proof of physical, social or functional necessity.

- **Semantic Landscape**: evolving knowledge, values, beliefs, interpretations, representations and Meaning relationships; a reconstruction remains partial.
- **Semantic Object**: Meaning, one or more Expressions, and a Conceptual Network contributing to that Meaning; whether it has autonomous agency is unresolved.
- **Semantic Pyramid**: hierarchical inspection of the network's dependencies relative to a Meaning/focal concept; the underlying network need not be a tree. Distinguish *constitutive* concepts (loss abolishes a specified Meaning) from *significant* concepts (loss changes but need not abolish it).
- **Semantic Plasticity**: aptitude to change the Landscape; not every such change modifies Potency.
- **Potency / Plasticity (broader):** collections of potentialities and aptitude to develop/modify/lose them remain analytically relevant, with time and feedback recorded through evolving Object Definitions and actual/simulated histories.

**Status:** conceptual definitions in canonical §§3, 7–9 **VALIDATED/FORMALIZED as indicated there**. No independent canonical JSON classes for the Landscape, Pyramid or Plasticity are currently established. Do not invent a compulsory semantic dimension on every Technical Object or require three equal perspectives.

## 12. `PowerEvaluation`: the validated integrated assessment record (D-52–D-74)

### 12.1 Why a dedicated assessment record

**Rationale.** Power is a **contextual analytical operation** comparing a Focus with relevant NEEDs/CANs, Object states, Conditions, alternatives and the Environment. A stored evaluation is neither the original Object Definition nor the event it considers. The same CAN may be partially actualizable in one Scenario, indeterminate in another; its earlier evaluations must stay independently traceable.

**The exactly six top-level fields, mandatory and closed (D-57/D-64/D-66):**

| Field | Validated function |
| --- | --- |
| `ID` | Unique identity of this specific assessment; revisions receive **new** IDs |
| `Subject` | The Object for which the analysis is performed, distinct from assessed Focus |
| `Focus` | The NEED/CAN/Scenario currently assessed |
| `Context` | Definition version pins, optional Scenario, provenance and relevant contextual information |
| `Dependencies` | References to *other analytical evaluations used as inputs*, **not** conceptual dependencies |
| `Results` | Focus-specific distinct assessment sections |

**D-67/D-68 approved local shapes:** `Subject` is an object with required nonempty `object_id`. `Focus.type` is exactly `NEED`, `CAN` or `Scenario`; NEED/CAN require `Focus.object_id` and Scenario requires `Focus.scenario_id`, rejecting a contradictory identifier. `Context` is an object requiring a **nonempty** `definition_versions` mapping of nonempty Object IDs to nonempty version strings; optional nonempty `scenario_id`; optional `provenance` object with nonempty `revises` when present. `Dependencies` is an array (possibly empty) of objects each requiring a nonempty `evaluation_id`.

**Revision rule D-58–D-60:** changing an evaluation's result, **justification or uncertainty**, even with unchanged numerical result, requires a new evaluation ID, preservation of the previous record and `Context.provenance.revises` pointing to the previous evaluation. An independent different-Scenario assessment is **not automatically a revision**. Object Parent/Children lineage, analytical Dependencies, and assessment `revises` are three separate link families.

**Reuse/recursion D-53–D-56:** reusable assessments must pass Focus, context/time/Scenario, Definition version and available-evidence compatibility checks; downstream impacted results/justifications/uncertainty may need **selective recursive reevaluation**. Detect cycles among analytical Dependencies, assess the coupled group contextually and preserve indeterminate/conditional outcomes where necessary. Cycles do not imply causal impossibility.

**Two validators (D-65):** Draft 2020-12 checks the **local shape**, and a separate semantic validator would check existence, Object/Focus type, version/context/evidence compatibility, justified inferences and revision/dependency consistency. The latter is **not fully implemented**, and neither validator establishes empirical truth. The currently executable [partial JSON boundary schema](https://github.com/Nirgalz/trialectic/blob/7fc676586a85be504bf145d313b19fefadfb9761/schemas/power-evaluation.boundaries.schema.json) enforces approved local rules, not the full final schema.

### 12.2 NEED Focus — three separately evaluated result models (D-61, D-69–D-71)

| `Results` child | Mandatory local field structure | Why it exists / must not imply |
| --- | --- | --- |
| `effective_satisfaction` | Required object; required `status` = `satisfied`/`unsatisfied`/`indeterminate`, nonempty `justification`; optional `degree:{value:number,measure:string,basis:string}`, optional `evidence:string[]`, optional `uncertainty:object` | Did the NEED's required state **actually** hold? Partial satisfaction does not add a fourth status; degree is not probability or proportion of satisfied Conditions. |
| `temporal_compliance` | Required object; required `applicability` = `applicable`/`not_applicable`/`indeterminate`, required nonempty `justification`; conditional `status`; optional `applied_exceptions:string[]`, `evidence:string[]`, `uncertainty:object` | Keep time-obligation conformity distinct from effective fulfillment. An authorized exception cannot erase a factual interruption. |
| `candidate_cans` | Required object; required `identified[]` (each `object_id`, nonempty `justification`, optional evidence), `search_status`, `coverage`, nonempty `scope`, `justification`; optional `evidence`, `uncertainty` | Which CANs **might** help satisfy the NEED? A candidate is not a proved contribution; an empty inventory is not impossibility. |

**D-70 conditional status:** if `applicability=applicable`, a three-state `status` is required; if `not_applicable`, `status` must be absent; if `indeterminate`, it may be absent or only `indeterminate`. Non-applicability is **not** a fourth compliance status.

**D-71 search/coverage:** `search_status` is `not_searched` or `searched`; `coverage` is `complete`, `incomplete` or `indeterminate`; `not_searched` cannot pair with `complete`. Each candidate `object_id` must semantically identify a CAN Object. Completeness claims require contextual evidence.

**Degree convention:** if a `degree` is present, **all three fields** `value`, `measure`, `basis` are required; numerical values have **no universal mandated range** and must be justified in their own unit/basis. Optional evidence is an array of **nonempty string references** (possibly empty); optional uncertainty is an **object** whose inner structure is not yet standardized. Nested additional fields generally remain OPEN, not globally rejected.

### 12.3 CAN Focus — three separately evaluated result models (D-62, D-72–D-74)

| `Results` child | Mandatory local field structure | Why it exists / must not imply |
| --- | --- | --- |
| `actualizability` | Required object; `status` exactly `actualizable`/`partially_actualizable`/`not_actualizable`/`indeterminate`, required nonempty `justification`; optional `degree:{value,measure,basis}`, `evidence`, `uncertainty` | Can the **specified contemplated** CAN Actualization be undertaken in context? A partial status needs no numeric degree, and possibility is not actual success. |
| `prerequisites` | Required object; required possibly empty `needs[]`, `cans[]`, `conditions[]`, `pathways[]`; `inventory_coverage`, nonempty `scope`, nonempty `justification`; optional `evidence`, `uncertainty` | Expose required/dependent Objects, Conditions and pathways without assuming every listed item must be met jointly or all possible paths are known. |
| `potential_contributions` | Required object; `needs[]` with required per-item `object_id`, literal `relationship:"candidate"`, nonempty `justification`; required `search_status`, `coverage`, nonempty `scope`, `justification`; optional evidence/uncertainty | Which NEEDs *might* benefit from CAN Actualization or its resulting state? Candidate matches are not causal proof, sufficiency or effective NEED satisfaction. |

**D-73 prerequisite item details:** each `needs[]` or `cans[]` item requires nonempty `object_id` with optional nonempty `evaluation_id`; if used analytically, the evaluation reference must also occur in top-level `Dependencies` and pass semantic checks. Each `conditions[]` item requires nonempty `owner_relation_id` + `condition_id`, optional `status` = `satisfied`/`unsatisfied`/`indeterminate`; absence of a status is *not* the same as an indeterminate result. Each `pathways[]` item requires nonempty `pathway_id`, `definition_version`, and `coverage` = `complete`/`incomplete`/`indeterminate`. This per-pathway completeness is **distinct** from `inventory_coverage`. These entries are references to Definition-level elements, not an approved recursive logical expression embedded in the result.

**D-74 candidate details:** `search_status` = `not_searched`/`searched`; `coverage` = `complete`/`incomplete`/`indeterminate`, with `not_searched` + `complete` invalid. Each proposed NEED entry has required `object_id`, exact `relationship:"candidate"`, and nonempty `justification`; optional evidence array. A semantic check must verify that `object_id` really identifies a NEED Object. D-71's NEED→CAN and D-74's CAN→NEED candidate searches are **complementary, not necessarily symmetric or cross-context interchangeable**.

**DO NOT conflate:** `actualizability` with satisfaction of listed prerequisites or a success probability; `potential_contributions` with causal contribution; a successful individual route with full inventory completeness; a CAN enabling another CAN with direct satisfaction of the final NEED.

### 12.4 Scenario Focus — named models D-63 and typed nested contract D-78

`PowerEvaluation.Focus.type: "Scenario"` requires a `scenario_id`. The following sections are **required typed objects in v2**. Their exact fields are adopted under D-78 in the [normative global/Scenario contract](../../schemas/global-model.md#d-78-scenario-results). The table explains their analytical roles:

| `Results` child | Analytical responsibility / rationale |
| --- | --- |
| `actualization_assessments` | References/evaluations of **contemplated** CAN Actualizations participating in Scenario; ordering and dependencies belong to the versioned Scenario model. Do not log these evaluations as simulated/observed events. |
| `scenario_assessment` | Keep distinct **feasibility**, epistemic uncertainty, complexity, costs/resources, temporality and expected effectiveness; no mandatory winner or aggregate scalar. |
| `effects` | Consider anticipated, simulated and observed consequences on Subject and other Objects, NEEDs/CANs and relations; distinguish direct/indirect, immediate/delayed, favorable/adverse, observed/causally attributed. |
| `comparisons` | Compare relevant alternatives by explicit criteria and context, without compulsory ranking or selection. |

D-78 now specifies the nested contract: scoped inventories of contemplated CAN evaluation references, five independent justified assessment dimensions and uncertainty, effect references, and criterion-based comparisons with optional justified selection. [Scenario v2 fixture](../../tests/cases/scenario_results_v2.json) is synthetic. Earlier fixtures and prospective-D-75 discussions are historical; they do not override D-78.

## 13. Identity, dependency and provenance distinctions — quick audit guide

| If you see… | It refers to… | It must not be treated as… |
| --- | --- | --- |
| Object ID / Definition version | Entity identity and a historical description | A Power evaluation ID |
| `Parent` / Temporary / Actualised Children | Object branch lineage | Component/constituent relation |
| `OriginObject` | Object from which a NEED/CAN relation originates | Automatically the Object linked via `NEEDs`/`CANs` |
| Relation ID | Origin-anchored NEED/CAN relational record | Automatically identical to the NEED/CAN Object ID |
| `relation.links[].id` | A particular qualified link within one relation | Globally unique condition, Object or event ID |
| Condition owner + condition ID | Identifiable predicate/requirement in owning relation | An intrinsic property with fixed satisfaction status |
| Pathway ID + version | Defined possible route | Proof of actionability or effective Actualization |
| `PowerEvaluation.ID` | One contextual analytical assessment | Actualization event or Object Definition |
| `Dependencies[].evaluation_id` | Another assessment used analytically | Conceptual or causal dependency by itself |
| `Context.provenance.revises` | Earlier assessment whose result/justification/uncertainty is revised | An Object Parent or a prerequisite |
| Scenario ID | One hypothetical/observed analytical branch context | Proof a contemplated action occurred |
| Event ID | An explicitly recorded simulated or observed event | The planned CAN or its Power assessment |
| Claim/Evidence ID | A statement / information source | Real-world truth guaranteed by structure |
| `coverage: complete` | Scoped, justified **inventory/completeness claim** | Proof of all logically possible alternatives |
| `status: indeterminate` | Insufficient analytical information | Physical third-state, proof of failure or zero possibility |

**Four relationships often wrongly collapsed (D-31):** correspondence / causal contribution / conditional sufficiency / necessity *within a specified Scenario*. Actionability/Power and effective Actualization each answer a further, different question. Even a conditional proof **within a model** is not empirical validation.

## 14. Existing JSON files and their real authority

### 14.1 Normative v2 and historical v1 schemas — implementer contracts

- [Analysis v2](../../schemas/model/analysis.json) and [PowerEvaluation v2](../../schemas/model/power-evaluation.json) are normative under D-77/D-78. See [the exact contract](../../schemas/global-model.md).
- The following boundary artifacts are retained as historical v1 contracts:

- [`schemas/power-evaluation.boundaries.schema.json`](https://github.com/Nirgalz/trialectic/blob/7fc676586a85be504bf145d313b19fefadfb9761/schemas/power-evaluation.boundaries.schema.json): **Draft 2020-12**, implementing the D-57/D-61–D-74 approved **partial structural boundary**, including exact six top-level fields and the minimum NEED/CAN result shapes; Scenario internals remain OPEN.
- [`schemas/README.md`](../../schemas/README.md): enforcement scope and omissions.
- [`tests/cases/power_evaluation.json`](../../tests/cases/power_evaluation.json) and [schema tests](../../tests/test_power_evaluation_schema.py): **synthetic regression evidence**, not new normative field approvals.
- [`tests/reference_model.py`](../../tests/reference_model.py) and [core fixtures](../../tests/cases/core.json): narrow experimental logic/Scenario tests, not a general production engine.

### 14.2 Global normalized schema proposal v0.1 — inventory, NOT normative

The separate [`schemas/proposal-v0/trialectic.schema.json`](https://github.com/Nirgalz/trialectic/blob/05c17bb6936ef1bc063eec56caed361f41f56f31/schemas/proposal-v0/trialectic.schema.json) is explicitly an **OPEN technical proposal**, accompanying [README](https://github.com/Nirgalz/trialectic/blob/05c17bb6936ef1bc063eec56caed361f41f56f31/schemas/proposal-v0/README.md), [OPEN questions](https://github.com/Nirgalz/trialectic/blob/05c17bb6936ef1bc063eec56caed361f41f56f31/schemas/proposal-v0/OPEN.md) and an [illustrative example](https://github.com/Nirgalz/trialectic/blob/05c17bb6936ef1bc063eec56caed361f41f56f31/schemas/proposal-v0/example.json). It proposes one exchange envelope containing:

```text
schema_version, analysis_id, main_subject, secondary_subjects,
focus, environment, objects, definitions, relations,
conditions, pathways, inventories, scenarios, events,
condition_assessments, need_assessments, power_assessments,
effects, claims, evidence_items, evidence_reviews, claim_assessments
```

For completeness, its **proposed** `$defs` model families and their purpose are catalogued below. **Every field in this table is proposal-v0 notation**, not a newly validated rule. Existing approved conceptual content should be implemented only after reconciling proposals with subsequent D-57–D-74 decisions.

| Proposed `$defs` | Why the proposal includes it |
| --- | --- |
| `id`, `version`, `time`, `status`, `coverage` | Reusable primitive IDs, version pins, offset-aware instants, analytical statuses and scope-dependent completeness |
| `objectRef`, `relationRef`, `typedRef`, `focus` | Avoid using an unqualified string for different entity kinds, owners or versioned Scenarios |
| `measure` | Separate value, unit/method, justification and evidence; **not** interchangeable with D-69/D-72 `degree:{value,measure,basis}` |
| `object`, `definition` | Distinguish stable Object/lineage record from versioned constituents, properties and relations |
| `logic` | Candidate reusable recursive condition/pathway grammar (not final D-42 serialization) |
| `link`, `relation` | Represent D-36–D-39 origin, participants, qualified roles and hypothesized effects; reconciliation of relation/Object identity OPEN |
| `temporalRequirement`, `temporalEstimate`, `temporal` | Define required timing separately from predicted execution/effect times |
| `predicate`, `condition`, `conditionAssessment` | Separate requirement Definition and state/time-specific truth assessment |
| `pathway`, `inventory` | Distinguish routes and completeness of their condition sets from completeness of discovered routes |
| `objectState`, `scenario`, `stateChange`, `event` | Isolate Scenario assumptions, time-indexed Object states and simulated/observed transitions |
| `needAssessment`, `powerAssessment` | Experimental independent NEED and Power assessment records; **not** a substitute for D-57–D-74 `PowerEvaluation` |
| `effect` | Qualify consequences by target, valence, causal mediation, temporal relation, epistemic basis |
| `claim`, `evidence`, `evidenceReview`, `claimAssessment` | Keep assertions, information and method-sensitive support assessments independently inspectable |

**Important incompatibility to remember:** proposal-v0's `powerAssessment` is **not** equivalent to the now author-validated **six-field `PowerEvaluation`**. It has a different top-level record shape (e.g. `scenario_id`, `at`, `need_assessment_ids`, `candidate_can_relations`), so **do not combine them without a new, explicit reconciliation decision and tests**. Likewise, proposal-v0's `measure:{value,unit,method,justification}` is not D-69/D-72's validated `degree:{value,measure,basis}`, and proposal-v0's various `id` and owner fields are not automatically the approved D-36/D-50 identity scheme.

## 15. Open reconciliation items (do not silently decide)

1. **Object vs relation identity (D-36/D-50):** whether a NEED/CAN relation record *is* its represented NEED/CAN Object or a distinct representation; normalized identifier/version ownership (proposal-v0 O-01).
2. **Definitions and versions:** exact shared-constituent historical snapshots, relation/condition/link ownership, effective versus temporary branch promotion, change propagation and audit.
3. **Relations and logic:** composition of separate `all`/`any` groups; validated D-42 recursive-expression *principle* vs its still-provisional JSON; empty documentary inventories and cycle analysis.
4. **Temporal constraints:** exception object, authorization, precedence/overlap, recurrence/DST semantics, validation of real continuous satisfaction and observed violation intervals.
5. **PowerEvaluation:** complete semantic validator, referential/context compatibility, stable exact identity of contemplated Actualization, meaningful quantitative degrees, evidence adequacy, recursive cycle analysis and proper revision handling.
6. **Scenario result models:** D-78 now validates nested fields, types and requiredness in v2. Contextual adequacy, reference resolution, effect causality, evidence and comparison criteria still require separate semantic/empirical assessment.
7. **Empirical warrants:** mechanisms, source provenance and independence, causal counterfactuals, real effects, expertise, cross-context generalization and objective assessment of completeness remain unproven by syntactic tests.
8. **Proposal synchronization:** after an approved decision, reconcile any overlapping provisional `schemas/proposal-v0` structures **without implying that the entire v0 proposal was approved**; preserve old versions/decision history.

## 16. Checklist for an AI or contributor returning to this repository

1. **Read** the newest `dev` [canonical reference](../../reference/trialectic-method.md), this catalogue, the [PowerEvaluation companion](power-evaluation.md) and [DECISIONS.md](../../DECISIONS.md). Check the Git branch and history before asserting a field is approved.
2. **Name the unit**: Object, versioned Definition, NEED/CAN relation, Condition, Pathway/Inventory, PowerEvaluation, Scenario, State/Event/Effect, Claim/Evidence. Always ask conceptually *why that unit is distinct*.
3. **Classify each claim** as validated concept, validated field contract, illustrative proposal, synthetic test or OPEN; cite its D-number and source. **Never turn an illustrative key into a normative field by repetition.**
4. **Respect scope and chronology**: Object ID ≠ relation ID ≠ evaluation ID ≠ event ID; version and Scenario/time references matter; no implicit historical overwrite or cross-branch propagation.
5. **Respect uncertainty**: no candidate ≠ impossible; unknown ≠ false; model-established ≠ empirically established; satisfaction ≠ temporal compliance; logical truth ≠ actual causal Actualization.
6. **When editing**, first obtain explicit author approval for conceptual/normative changes, record a new D-number, update corresponding reference and schemas/fixtures/tests/TODO, then verify CI on the final `dev` commit. Leave `main` untouched unless separately requested.

**Maintenance rule:** append or revise this **explanatory catalogue** whenever a validated data-model decision changes the inventory or its rationale. It is a navigational memory aid, not a source for silently creating new Method rules. Where a status changes from OPEN to VALIDATED, update the relevant row, cross-link the new decision and keep the earlier historical context traceable.


**Normative local schema implementation (November 16, 2026):**
[`power-evaluation.schema.json`](https://github.com/Nirgalz/trialectic/blob/7fc676586a85be504bf145d313b19fefadfb9761/schemas/power-evaluation.schema.json) implements
the approved local PowerEvaluation constraints through D-74. Its
[conformance and exclusions](https://github.com/Nirgalz/trialectic/blob/7fc676586a85be504bf145d313b19fefadfb9761/schemas/power-evaluation.normative.md) are normative
only within that limited structural scope. The existing boundary schema remains
compatible. This implementation does not approve the global normalized proposal,
Object/relation identity, recursive grammar, Scenario result internals or D-75.
