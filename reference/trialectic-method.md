# Trialectic Method — Reference

**Current serialization authority — D-77/D-78, November 16, 2026:** The
[global Analysis model and Scenario Results v2](../schemas/global-model.md) are now
**normative, adopted under the author's explicit instruction**. Use
[Analysis v2](../schemas/model/analysis.json) and
[PowerEvaluation v2](../schemas/model/power-evaluation.json). All root keys,
record-family contracts and nested Scenario fields are specified there; the five
Scenario dimensions stay independent and no winner or aggregate score is required.
D-75's separate Object/relation identities and D-76's reconciliation remain in force.
Earlier statements below that the global envelope or Scenario serialization is OPEN
are superseded for v2; v0/v1 remain historical profiles. Complete semantic/reference,
lifecycle, temporal and causal algorithms and empirical validation are still separate
work, not guarantees provided by these structural contracts.



**Status:** working reference, not scientifically validated. **Reference file:** `reference/trialectic-method.md`. **Versioning:** released snapshots are identified by **Git tags**, not by version-specific filenames. This text originated in the alpha 0.4 consolidation of November 14, 2026; no Git tag is presumed to exist unless explicitly created.
Sources: earlier alpha 0.3 content (retrievable in Git history), the [decision log](../DECISIONS.md) (D-01–D-27), and explicit decisions from the November 14–15, 2026 Object / Subject / NEED / CAN / Definition discussions, including Object branching, actionable CANs, uncertainty, and shared Definitions. Earlier version-specific reference files are removed from the current tree; Git history preserves their committed contents.

**Companion index:** [Data models — roles, rationale, approval status and authoritative sources](data-models.md) documents why each record family exists and which field shapes remain OPEN. It is an explanatory navigation aid, **not a new normative schema**. For the integrated Power evaluation, also read [PowerEvaluation](power-evaluation.md).

## Reading convention and editorial scope

- **VALIDATED** — a concept or distinction explicitly approved by the author. Validation here is **conceptual**, not experimental or scientific.
- **FORMALIZATION** — an explanatory organization or working formulation of approved material; not necessarily approved word for word.
- **OPEN** — an unresolved definition, test, procedure, threshold, or possible implication.
- **POTENTIAL APPLICATION** — a use case to explore; its effectiveness has not been demonstrated.
- A newly adopted concept takes precedence in this version over an older formulation where they conflict. Historical terms are preserved for traceability rather than silently deleted.
- The source language of maintained reference documents is English. The exact French author-approved definition of NEED is reproduced verbatim below; its English rendering is a **working translation**, not an independently approved bilingual equivalence.

# 1. Definition, scope, and purpose

**[VALIDATED — D-85, November 17, 2026]** The **Trialectic Method** is an interdisciplinary, contextual, systemic and recursive **method of structured analysis**. Its complete process accompanies an analyst in **understanding a problem, exploring different possibilities, and making an informed decision**. It does not promise to identify one objectively or universally best decision. Each of the first two phases may also be a sufficient outcome for a particular analyst; performing the third phase is not required on every occasion.

Its conceptual instruments include **Objects**, their **NEEDs** and **CANs**, conditions relevant to Actualization, possible effects, and relationships within and between Objects. An analysis examines an Object as a **Subject situated in its Environment** and may examine others as secondary Subjects. **[VALIDATED components; the use of each instrument depends on relevance.]**

The relevant perspectives of **Subject, Environment, and Semantics** are mobilized according to the case. They are neither three universal causes nor three necessarily symmetrical or equally weighted components. The Method is **not a universal ontology**. **[VALIDATED]**

Objects include **Individuals, Groups, Technical Objects, Systems, and Semantic Objects**. These are categories within the proposed analytical framework, not a claim that each has identical functioning, autonomy, or attribution criteria. The autonomous status of Semantic Objects as acting Subjects, and the precise criteria for distinguishing Object types, remain **OPEN**; autonomous action is not universally required for attribution of a CAN. **[VALIDATED / OPEN]**

One possible normative purpose is to reveal contradictions, seek alternatives, and examine how individuals may increase their Potency, Power, and Actualizations without reducing those of others. Such normative ambitions must be separated from descriptive results and empirically established effects. **[VALIDATED orientation / FORMALIZATION]**

**[VALIDATED operational objective, November 15; clarified by D-85, November 17, 2026]** In problem-solving uses, the Method's **default Advanced Mode** explores and compares multiple relevant Resolution Scenarios, estimates their possible effects on Subjects and Environment Objects, and makes feasibility, complexity, cost, temporality, expected effectiveness and uncertainty explicit. **Decide is now recognized as the third essential phase of the complete Method**, but explicit recommendation or selection is **not mandatory in a particular analysis**. A possible Simple Mode remains **deferred** until the Method is better stabilized; this is a presentation/use-mode question, distinct from the three conceptual phases.

## 1.1 Validated methodological phases: Understand, Explore, Decide (D-85)

**[VALIDATED BY AUTHOR, November 17, 2026]** The complete Method consists of three **fundamental, progressive and recursive analytical phases**:

1. **Understand / Comprendre** — examine and contextualize the **Subject**, its **Environment**, their relations, and the **semantic dimensions** relevant to how the problem is represented and interpreted. Clarify the initial question, hypotheses, mechanisms, contradictions, evidence, unknowns and uncertainty. The useful result can be a reformulated, more explicit and revisable understanding.
2. **Explore / Explorer** — generate and examine multiple possibilities, transformations, alternatives and, where pertinent, **Resolution Scenarios**. Examine relevant NEED/CAN relationships, conditions, dependencies, hypothetical effects and uncertainties without prematurely assuming a single solution.
3. **Decide / Décider** — assess the explored possibilities against **explicit goals, criteria, constraints, values and remaining uncertainties** to make and explain an informed orientation or choice, when justified. The result can also be a reasoned decision to **defer action or withhold selection** where the available information is inadequate. A universal optimum is not presumed.

These are **phases of the complete Method**, not an obligation to complete all three every time. A valid use can end after **Understand**, or after **Understand + Explore**, if that meets the analyst's needs. The phases are **not strictly linear**: exploration and decision assessment may reveal new information or questionable interpretations that require returning to Understand or revisiting alternatives.

**Cross-cutting perspectives:** Subject, Environment and Semantics are mobilized **according to relevance**, not as three equal, compulsory steps; Semantics can question the conceptual categories and interpretations shaping the problem. The broad **analytical focal concern** can be a question, phenomenon, situation, relation, contradiction or particular CAN/NEED; an explicitly selected **Potentiality focal** is therefore one possible case, not the universal starting point.

**[VALIDATED RELEVANCE SAFEGUARD — D-89, November 17, 2026]** Evaluate the potential relevance of an Object, relation, hypothesis, effect or analytical investigation against **both (a) the current Focus, if used, and (b) the overall problem/question, analytical aims and other Subjects potentially affected**. A narrow Focus must not silently exclude relevant indirect effects, contradictions, previously unidentified Secondary Subjects or severe risks. Relevance is contextual, revisable and epistemically qualified; it is **not** proof of CAN/NEED identification, attribution or causal contribution. A broad problem-oriented evaluation can identify reasons to change or temporarily set aside the current Focus.

**[FOCUS UTILITY — OPEN, D-89]** Although `Focus` currently denotes the Method's object of attention during a `Stage` (D-17), **its incremental value as a distinct concept remains to be tested**, separately from the already validated Focus field of the scoped `PowerEvaluation` data contract. A manual trIA-dev comparison with an explicit Focus versus a problem-centered analysis **without a separately named Focus** should examine what it adds to investigation discipline, omissions, traceability, clarity, effort and recursion. An initial [same-author, synthetic three-case pilot](../research/tria-dev-relevance-focus-pilot-2026-11-17.md) provides **exploratory observations only**, not independent comparative validation. Do not delete, redefine or make the concept universally mandatory on the basis of one illustrative trial; detailed selection and termination rules remain **PROPOSED / OPEN**.


**Relationship to technical representation [WORKING]:** the existing `Stage` and `Focus` records, the Subject → NEED/CAN → Actualization workflow, Power evaluations and Analysis JSON Schemas are **specific instruments/implementations**, not equivalent to the three phases. A Stage remains a **local methodological operation** within or across phases. The computer/data model should formalize the functioning, reasoning trace, uncertainty and revision of the Method *after* the pertinent operations have been specified. Specific phase inputs, outputs, stopping conditions, iteration rules, decision criteria and serialization remain **OPEN**; D-85 does **not** approve a new schema or automated decision optimizer.

# 2. Objects, Subjects, Environment, Focus and Stages

## 2.1 Object and Subject

- **Object [VALIDATED]**: the general type of entity considered by the Method, including an Individual, Group, Technical Object, System, or Semantic Object.
- **Subject [VALIDATED, clarified November 15]**: an Object at the center of the attention of the Method **or of the analyst**. In alpha 0.3, “Subject” was also a generic name for an analyzable entity; that generic role is now taken by **Object**.
- **Main Subject [VALIDATED]**: the Subject chosen during the first Stage of the Method.
- **Secondary Subject [VALIDATED]**: another Object selected for a parallel or embedded application of the Method, for example to examine its role in an Actualization Scenario.
- **Situated Subject [FORMALIZATION retaining the validated contextual insight]**: the selected Subject considered with the relevant elements and relationships of its Environment. Its precise place as a separate named concept under the revised terminology remains **OPEN**.

An Object has a **permanent, unique ID** and an evolving, versioned **Definition** (a provisional technical name). The Definition comprises a **list of constituent Objects plus associated properties and relations** describing its NEEDs, CANs, interactions and available knowledge. **[UPDATED — D-36, November 15]** NEED and CAN entries are now modeled as typed, origin-anchored **relational records connecting Objects**, rather than only as stand-alone Object properties. The older statement that NEED/CAN records are merely properties and CANs are only optionally represented through conceptual Objects is **superseded as a data-representation rule**. This change does not itself imply that the record is an independently instantiated Object, or that every Object referenced by a NEED/CAN relation inherits a NEED/CAN status globally. An Object may have other Objects as existential or structural constituents, and its Definition may include partially known properties and explicit uncertainty. **[VALIDATED, November 15]**

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

**[D-85 clarification]** The following previously adopted recursive sequence is **a specialized NEED/CAN- and Actualization-focused workflow**, not a requirement to begin all problem analyses with a NEED or CAN. It can be used within **Understand** and **Explore**, and can inform **Decide** when needed. The broader methodological sequence is defined in §1.1. The specialized workflow is:

1. **Stage 1 — Focus on the Subject**: select a Main Subject (an Object); delimit and contextualize it.
2. **Stage 2 — Focus on a NEED or a CAN**: select a NEED **or** CAN for analysis, examine relevant Objects, properties, and dependencies. The older exclusive focus on a Focal Potentiality is no longer mandatory.
3. **Stage 3 — Focus on Actualization**: examine the relevant Actualization, action conditions, NEED satisfaction, Power, possible Scenarios, and effects. **[VALIDATED clarification]** When a focal NEED is already satisfied without any identifiable Actualization, examine its maintenance, possible transformations or the absence of any required intervention; do not force an unnecessary action.
4. **Return to the Subject**: reassess the Subject, its current or branched Definition and the relevant NEEDs, CANs, conditions, effects and Environment; revisit the sequence as relevant. Secondary Subjects can be examined in parallel or recursively.

**[VALIDATED sequence; FORMALIZATION of operational descriptions]**

**OPEN:** Detailed operations and evidence thresholds of each Stage, beyond the accepted maintenance/no-intervention handling of a satisfied NEED; selection and switching between Main and Secondary Subjects; timing and termination of parallel branches. The sequence is an analytical guide rather than a claim that every actual process is linear.

# 3. NEEDs and CANs — attributable properties and relations

### 2.1.2 Origin-anchored NEED and CAN relational records

**[VALIDATED — November 15, 2026; D-36, reformulation]** The author defines a NEED or CAN as a **relation between Objects**, with an explicit origin Object and one or more other Objects referred to through `NEEDs` and `CANs`. The latest agreed minimal working structure is:

```json
{
  "ID": "R-001",
  "Type": "NEED",
  "NEEDs": ["O-002", "O-003"],
  "CANs": ["O-004"],
  "OriginObject": "O-001"
}
```

- `ID`: identifier of the relational record (precise persistence/identity guarantees still to be specified).
- `Type`: `NEED` or `CAN`, describing the relation's type.
- `OriginObject`: reference to the Object from which the NEED or CAN originates.
- `NEEDs`: nullable list of **Object references**, used for more granular specification, particularly of a parent NEED.
- `CANs`: nullable list of **Object references**, used for more granular specification of the parent NEED or CAN.
- `NEEDs` and `CANs` are **not necessarily themselves lists of instantiated NEED/CAN relational records**, but lists of Objects as explicitly specified by the author. These are role-labeled links and do not automatically change the referenced Objects' global types.
- **[VALIDATED — November 16, 2026]** A NEED is itself an Object with a unique Object ID; a CAN is likewise an Object with its own unique Object ID. Contextual attribution follows list membership: when NEED Object N appears in Object O's `NEEDs` list, O has NEED N. `object_id` can directly identify N; an additional `need_id` is not necessary for that relationship. This does not imply that N becomes the same Object as O. The distinction between the possessing Object and the NEED Object is contextual to the recorded relationship.
- A single referenced Object across the two lists yields one target participant; multiple references yield several target participants. **No mandatory separate `TargetObject` field** is required, because the participants are already represented by `NEEDs` and `CANs`.
- The relation can be modeled, descriptively, as an **origin-anchored multi-participant relation / directed hyperrelation** rather than obligatorily a binary relation. This mathematical characterization is a formalization, not a separately adopted ontology.

**[UPDATED BY D-37]** The new `relation` field permits explicitly describing the parent/origin nature and logical composition of links, rather than inferring their meaning from list membership. **[STILL OPEN]** Exact grouping semantics when both lists contain Objects, identity and recursion of parent/child relation records, whether duplicate Objects can occur across roles, behavior when both lists are null or empty, cycle handling, preservation/versioning of relation IDs and `OriginObject` during branching, and integration with D-33 temporal metadata. Do **not** assume that a `CANs` link proves actionability or NEED satisfaction, or that membership in a `NEEDs` list establishes logical necessity. Earlier conceptual NEED and CAN definitions remain in force unless explicitly revised.

### 2.1.3 Characterizing relationships with `relation`

**[VALIDATED — November 15, 2026; D-37]** Add a `relation` field to the D-36 NEED/CAN relational record. The field is a **structured container**, not one exclusive label. Distinguish **(a)** the nature of the relation to `OriginObject`, **(b)** the role of each referenced Object or link, and **(c)** logical composition of references. These facets cannot be inferred from membership in `NEEDs` or `CANs` alone. `OriginObject` remains the existing origin link; do **not** use the unrelated Object-lineage `Parent` field as a synonym.

**[VALIDATED — nature relative to origin, contextual and possibly non-exclusive]**
- **NEED-oriented**: `existential` (necessary for an explicitly specified mode of existence), `structural` (necessary for a specified organization/configuration), `functional` (necessary for functioning/maintenance of a specified state). A NEED may be both existential and structural, and these labels do not determine its current effective satisfaction.
- **CAN-oriented**: `contributive` (favors an outcome without by itself proving sufficiency), `enabling` (can help satisfy another CAN's action condition), `inhibitory` (may restrict action/outcomes), `transformative` (may alter an Object's constitution, NEEDs or CANs). Roles are context-dependent, and a CAN may have multiple roles.
- **Not additional intrinsic labels**: necessary and sufficient in a Scenario remain **D-31 tested claims** under stated conditions; they are not unconditional global tags.

**[VALIDATED — relations among referenced Objects or contributions, context-sensitive]**
- `alternative`: distinct possible pathways, without automatically assuming equal effect or individual sufficiency.
- `complementary`: joint contribution; this does not prove that every participant is individually necessary.
- `substitutive`: a participant can replace another for a specified function/role; distinct from perfect interchangeability or an unspecified alternative.
- `sequential`: a contextually required or considered order of contributions.
- `synergistic`: joint effect differs from the separate contributions (mechanism and outcome require evaluation).
- `antagonistic`: one contribution conflicts with, inhibits or limits another.
- `reciprocal`: mutually dependent contributions or relations.
These describe **link/pathway roles**, not a universal closed partition of Objects or CANs.

**[VALIDATED — additional qualifications of relationships]** Record, where relevant, **conditionality**, **temporality**, **direct or indirect causality**, and **epistemic evidence/status**. Keep the pre-existing distinctions in D-31 (model-established vs plausible vs refuted in context vs indeterminate), D-33–D-35 (time requirements, evaluations and exceptions), and anticipated vs observed/causally attributed effects. A semantic similarity is not causal proof.

**[VALIDATED — initial `relation` JSON representation from the author's approval]** The `relation` container can include `nature` and `composition`, with groups of referenced Objects and an `operator`. For example:

```json
{
  "ID": "R-001",
  "Type": "NEED",
  "OriginObject": "O-001",
  "NEEDs": ["O-002", "O-003"],
  "CANs": ["O-004", "O-005"],
  "relation": {
    "nature": ["existential", "structural"],
    "composition": [
      {"objects": ["O-002", "O-003"], "operator": "all"},
      {"objects": ["O-004", "O-005"], "operator": "any"}
    ]
  }
}
```

In this illustration the listed participant groupings express **asserted analysis conditions**, not experimentally established causal sufficiency or absolute necessity. `all` and `any` convey the intended grouping, but **how separate groups combine into a final condition remains OPEN** until specified. The `composition` above is a composition of *Object references in a relational record*, distinct in scope from the D-34 `temporal.composition` that combines temporal requirements.

**[SUPERSEDED BY D-38 — November 15, 2026]** The D-37 design recommendation was subsequently validated as the specific `relation.links` data structure, described below. Each linked Object can have a distinct role; never silently propagate the origin relationship's `nature` to every reference.

### 2.1.4 Qualified individual Object links (`relation.links`)

**[VALIDATED — November 15, 2026; D-38]** The author approved proposals A–E for individually qualified links, complementing the D-36/D-37 origin-anchored record. `relation.links` is a list of **link records**, one for each explicitly qualified relation to an Object referenced in the parent's `NEEDs` or `CANs` list. The approved working fields are:

| Field | Meaning | Required in each link? |
| --- | --- | --- |
| `id` | Distinct link identifier, allowing other links to refer to it | Yes |
| `object_id` | ID of referenced Object | Yes |
| `source_list` | `NEEDs` or `CANs`: list in the parent relation containing `object_id` | Yes |
| `roles` | Zero or more context-dependent relationship qualifications, e.g. `contributive`, `enabling`, `inhibitory` | Optional |
| `conditions` | Conditions under which the claimed role/link is relevant | Optional |
| `mechanism` | Explained or hypothesized relationship mechanism | Optional |
| `causality` | `direct`, `indirect` or `indeterminate` qualification, where justified | Optional |
| `evidence` | Evidential qualification and justification; existing D-31 labels apply | Optional |
| `affects` | IDs of **other link records affected** by this link | Optional |
| `weight` | Non-negative relative weight of the linked NEED in a parent NEED's or CAN's dependency on NEEDs | Optional |

**[VALIDATED — November 16, 2026]** The optional `weight` applies to links representing a **NEED dependency of a NEED**, and equally to links representing a **NEED dependency of a CAN**. A weight characterizes the dependency link, not an intrinsic global importance of the NEED Object. Different parent NEEDs or CANs may therefore assign different weights to the same linked NEED. A weight does not by itself establish logical necessity, satisfaction, CAN actionability or causal sufficiency. Its value is distinct from the linked NEED's measured degree of satisfaction, and from uncertainty about that measure.

For a parent NEED whose relevant dependency NEEDs have justified numerical satisfaction degrees and known non-negative weights with positive sum, the **working aggregation formalization** is a weighted arithmetic mean of the child NEEDs' global satisfaction degrees: `sum(weight_i * degree_i) / sum(weight_i)`. Each child's degree is assessed independently before aggregation, recursively where appropriate. How to handle missing weights/degrees, zero total weights, cycles, non-comparable measures, indispensable dependencies and the exact semantics of weights for a CAN's dependency on NEEDs remains **OPEN**. In particular, this averaging formula is **not automatically a measure of a CAN's Actualization probability, actionability or Power**.

**[ILLUSTRATIVE EXTENSION — field placement approved, example not an enforced JSON Schema]** In a parent NEED or CAN record, `relation.links` may include `{"id":"L-1","object_id":"O-need-1","source_list":"NEEDs","weight":3}` alongside another linked NEED Object with its own weight. Both targets are Objects identified by Object IDs, not secondarily identified via an invented `need_id` field.

The first **three fields are mandatory** in any explicitly recorded link; `affects` was separately approved as an optional field (proposal C). Role fields can remain unknown when the referenced Object is identified but the nature or evidence of its relation is not yet determined. Link identifiers must distinguish different links **within a relational record**; global uniqueness of link IDs, stable identity across branching, and cross-record link addressing are still **OPEN**.

**[VALIDATED referential consistency]** If `source_list` is `NEEDs`, the link's `object_id` must occur in the enclosing record's `NEEDs`; if it is `CANs`, it must occur in `CANs`. The link must not silently introduce an Object absent from the declared list. A previously unlisted Object requires **explicit expansion of the corresponding inventory** or an appropriate separate relation. Do not infer that every listed Object must already have a qualified link with all optional fields known; inventories and knowledge remain potentially incomplete.

**[VALIDATED relation-of-relations]** `affects` makes it possible to describe a link that **enables, inhibits or otherwise changes** another link. It records a **candidate structural interaction**, not proved causal sufficiency, necessity, actionability or Actualization. The effect mechanism, its exact affected condition, time sequence and possible recursive/circular dependencies still need operational tests. Explicitly distinguish the *link* being affected from the linked *Object* itself.

**[VALIDATED causal/evidential safeguard]** A stored link role is an analytical classification, **not proof** of contribution, conditional sufficiency, Scenario-relative necessity or positive Power. Apply D-31 tests under specified conditions, track plausible/indeterminate/refuted/model-established evidence, and keep Scenario-level outcome assessments separate from the Definition-level link metadata. Nor does a linked Object's `roles` automatically imply the same role for the parent relation.

**[VALIDATED working example; hypothetical, not independently demonstrated]**

```json
{
  "ID": "R-heat",
  "Type": "NEED",
  "OriginObject": "O-home",
  "NEEDs": null,
  "CANs": ["O-heat-pump", "O-boiler", "O-technician"],
  "relation": {
    "nature": ["functional"],
    "links": [
      {
        "id": "L-heat-pump",
        "object_id": "O-heat-pump",
        "source_list": "CANs",
        "roles": ["contributive"],
        "conditions": ["Electricity supply available"],
        "mechanism": "Heat production",
        "causality": "direct",
        "evidence": {"status": "plausible"}
      },
      {
        "id": "L-boiler",
        "object_id": "O-boiler",
        "source_list": "CANs",
        "roles": ["contributive"],
        "conditions": ["Fuel supply available"],
        "mechanism": "Heat production",
        "causality": "direct",
        "evidence": {"status": "plausible"}
      },
      {
        "id": "L-technician",
        "object_id": "O-technician",
        "source_list": "CANs",
        "roles": ["enabling"],
        "affects": ["L-heat-pump"]
      }
    ],
    "composition": [
      {"objects": ["O-heat-pump", "O-boiler"], "operator": "any"}
    ]
  }
}
```

The example combines hypothesized alternative heating pathways with an enabling relationship from a technician to the heat-pump link. The `composition` does **not** assert that either pathway is in fact sufficient, and `affects` does **not** show that the technician is necessary. Unrepresented interactions among groups and enabling links are not silently assigned a Boolean meaning.

**[OPEN]** Detailed machine-enforced JSON Schema, permissible vocabulary and formal semantics of `roles` and `conditions`, `affects` graph addressing beyond a single relation, cycle detection, handling of changing effects across versions and Scenarios, evidence provenance and confidence, link ID uniqueness across the repository, duplicate references in the two inventories, and interaction between link graph and `relation.composition`. This is an approved **representation**, not a validated causal-inference engine.

**[UPDATED D-38 / STILL OPEN]** Qualified link field names and mandatory/optional split are now validated, but a complete JSON Schema/parser, cross-group composition and mixed AND/OR precedence, formal conditions, link-to-link cycles, relation evidence standards, existential/structural/functional borderline tests, reference/branch versioning, empirical tests and reproducibility remain OPEN.

### 2.1.5 Link-to-link effects and circular dependencies

**[VALIDATED — November 15, 2026; D-39 principles A–E]** Extend the interpretation of D-38 `relation.links[].affects` while retaining its **optional list of referenced link IDs**. The presence of an `affects` edge expresses an asserted or hypothesized structural relationship, not an effective cause or observed state transition.

**A. Affected aspect.** Qualify, where relevant, **what** one link may change about another: its linked CAN's **action conditions**, its contribution to **NEED satisfaction conditions**, the **availability/emergence/change/disappearance of a CAN or Potentiality**, or the **validity/applicability** of the linked relationship. These aspects may be improved, inhibited or transformed. They are contextual analytical distinctions, not new mutually exclusive intrinsic CAN types. Other affected Objects and adverse effects must not be erased.

**B. Structural cycles versus actual blockage.** Cyclic `affects` references are **not** inherently invalid, contradictory or impossible. Depending on the specified Object states, timing, conditions and effects, distinguish a **currently blocked** cycle (missing prerequisite conditions, with no known feasible initiation path), an **already initiated or self-sustaining** cycle, an **externally initiable** cycle, and a potentially **antagonistic or unstable** cycle. The cycle's operational classification belongs to its assessed **Scenario** and may change with time and contextual definitions. "No route identified" is not "proved impossible."

**C. Recursive search for initiating CANs.** For a cycle that currently appears blocked, recursively inspect the CANs of relevant Objects in the cycle and Environment for an **independently actionable candidate** that could supply a missing condition or transform the dependency. Discovering such a CAN or a plausible relation **does not** by itself establish sufficient Power, actual NEED satisfaction, timely Actualization or successful resolution. Preserve unknown candidate searches, explicit conditions and recursive relevance/stopping limits.

**D. Three-part distinction.** Keep separate:
1. the **Definition-level relation** (potential `affects` link and mechanism);
2. the **triggering event/conditions** that might activate an effect; and
3. **observed or simulated state transitions** and consequences within an isolated Scenario and temporal history.
Do not let predicted or observed status automatically rewrite the parent relation's historical Definition, or equate a link being present with its claimed effect being realized.

**[PROVISIONAL IMPLEMENTATION FORM; not a finalized schema]** The author accepted considering optional `effect_details` as a way to qualify an existing `affects` edge; its exact fields, enums, cardinality, reference scope and verification rules are **NOT YET VALIDATED**. Example nested in a qualified link record:

```json
{
  "id": "L-C",
  "object_id": "O-external-power",
  "source_list": "CANs",
  "roles": ["enabling"],
  "affects": ["L-A"],
  "effect_details": [
    {
      "target_link_id": "L-A",
      "effect": "satisfies_action_condition",
      "condition_id": "C-A-startup",
      "trigger": {
        "event": "actualization_of_can",
        "can_id": "R-C"
      },
      "evidence": {"status": "plausible"}
    }
  ]
}
```

`object_id` references an Object, `can_id` is illustratively the ID of a CAN **relational record**, and `target_link_id` is a link reference: these must not be conflated. The triggering Actualization, its temporal conditions and the resulting effective or simulated modifications belong in Scenario evidence/evaluations, not in the static relation label. This illustrative `effect_details` entry is *not* an additional required D-38 link field. Unknown conditions remain unknown rather than silently satisfied.

**E. Two-stage cycle analysis.** **Detect** graph cycles using directed `affects` edges (e.g. strongly connected components), then **evaluate** each cycle dynamically within the considered Scenario: initial state; actionability of possible first actions; trigger and effect chronology; positive/negative and non-monotone transformations; environmental alternatives; evidential uncertainty; D-33/D-34 time constraints; and D-35 separate effective NEED satisfaction versus temporal compliance. Structural graph cycles must not be labeled blocking merely because they are cycles. Any proposed third-CAN initiation is conditional until assessed.

**[OPEN]** Machine-enforced `effect_details` shape and compatibility; link ID scope across different NEED/CAN records; condition-ID attribution and versioning; cyclic dependency resolution with delayed, inhibitory or non-monotone effects; alternative source conditions and competing Scenarios; algorithmic complexity and recursion limits; reproducible examples and independent validation. This does not close T-02, T-03, T-16, T-18, T-24 or T-30.

### 2.1.6 Identified conditions and time-indexed satisfaction (D-40)

**[VALIDATED — November 15, 2026, D-40]** A **condition** is an identifiable, contextualized **requirement** whose satisfaction may be necessary for a CAN's **actionability**, a NEED's **satisfaction**, or the **applicability of a relation**. It is **not automatically an independent Object**. Preserve three separate layers: **(1) the condition's Definition**, **(2) its status in a given Scenario and at a given time/interval**, **(3) an Actualization or event and its possible effect on the relevant Object states or condition Definition**.

**A. Conditions' definitions and references [VALIDATED PRINCIPLE].** A condition should have an **ID**, an associated **owning NEED/CAN relational record**, a specified **target/purpose**, a **predicate or requirement** concerning one or several Objects, and—where relevant—logical grouping and temporal restrictions. A qualified `relation.links[].conditions` entry may **reference a defined condition by ID** instead of repeating an unqualified prose description; the exact normalization and field types remain OPEN.

**B. Evaluate, do not overwrite [VALIDATED].** Determine the status of a condition from relevant **observed or simulated Object property values and applicable context** in the particular **Scenario and time/interval**. Its evaluated status is kept **separate from the versioned condition Definition**; a cached or reported result requires Scenario, time, Definition version and evidence context. A change in observed state does not itself change the original condition's definition.

**C. Three valued outcomes and composition [VALIDATED].** Use `satisfied`, `unsatisfied`, `indeterminate` for evaluations. Under `all`: any unsatisfied → unsatisfied; otherwise an indeterminate → indeterminate; all satisfied → satisfied. Under `any`: any satisfied → satisfied; otherwise an indeterminate → indeterminate; all unsatisfied → unsatisfied. **Unknown evidence is not negative evidence** and an incomplete list of recorded conditions does not prove all necessary conditions have been discovered. These operations apply to **specified groups** only. Condition satisfaction does not automatically establish overall Power, empirical NEED satisfaction or successful Actualization.

**D. Effect of Actualization [VALIDATED].** A CAN's effective or simulated Actualization can modify **an Object's state** (or multiple Objects' states), thereby changing the result of evaluating a predicate. If an Actualization genuinely changes the **required predicate or its ownership/logic**, record an **explicit versioned Definition change** rather than disguising it as a satisfaction change. Capture the trigger/event, changed Object state(s), time, and the resulting reevaluations in the Scenario's trace; preserve original and alternative branch histories, uncertain causality, delayed effects and D-35 distinction between effective satisfaction and temporal compliance.

**E. Scoped stable identities [VALIDATED].** A condition's ID is stable **within its owning NEED/CAN relation**. A composite reference such as `R-A / C-external`, supplemented by the **appropriate Definition version** for historical evaluations, disambiguates the condition without requiring a globally autonomous condition Object. Cross-record `affects` or experimental `effect_details` targeting conditions must preserve **owner, condition ID and version context**, rather than assuming a bare string can identify every condition across the whole model. Precisely how cross-branch references are serialized remains OPEN.

**[PROVISIONAL JSON DATA SHAPE — NOT A FINAL, MACHINE-ENFORCED SCHEMA]** The author approved the **conceptual principles A–E** but did **not** finalize the sample layout below:

```json
{
  "ID": "R-A",
  "Type": "CAN",
  "OriginObject": "O-generator",
  "NEEDs": null,
  "CANs": ["O-battery", "O-external-source"],
  "relation": {
    "conditions": [
      {
        "id": "C-battery",
        "target": "actionability",
        "predicate": {
          "object_id": "O-battery",
          "property": "charged",
          "operator": "equals",
          "value": true
        }
      },
      {
        "id": "C-external",
        "target": "actionability",
        "predicate": {
          "object_id": "O-external-source",
          "property": "available",
          "operator": "equals",
          "value": true
        }
      }
    ],
    "condition_composition": {
      "operator": "any",
      "condition_ids": ["C-battery", "C-external"]
    },
    "links": [
      {
        "id": "L-battery",
        "object_id": "O-battery",
        "source_list": "CANs",
        "conditions": ["C-battery"]
      },
      {
        "id": "L-external",
        "object_id": "O-external-source",
        "source_list": "CANs",
        "conditions": ["C-external"]
      }
    ]
  }
}
```

Here `relation.condition_composition` combines **conditions** rather than the **linked Object references** of D-37 `relation.composition` or the **time requirements** of D-34 `temporal.composition`. This example expresses a modeled alternative starting-power requirement, without asserting an exhaustive inventory of conditions or real generator feasibility.

**[OPEN]** Machine-readable predicate and condition schema, validation of heterogeneous Object properties, exact ownership and state property versioning, incomplete-inventory effects on aggregate actionability, temporal condition windows and effect delays, how persistent/temporary effects change conditions, graph/circular-reference stability, contradictory observations and provenance, caching, and independent comparison with D-39 synthetic tests. No empirical validation or TODO closure is implied.

### 2.1.7 Pathway completeness, inventory completeness and nested conditions (D-41)

**[VALIDATED — November 15, 2026; D-41]** Distinguish **(i) internal completeness of the conditions identified for a specified Actualization pathway**, and **(ii) completeness of the inventory of contextually relevant pathways to a CAN**. A set of fully specified known pathways does not imply all possible relevant pathways have been discovered. Completeness is specific to **scope, version, assumptions and evidence**, not an absolute intrinsic global CAN label.

**[VALIDATED]** Provide identifiable pathways with a composable set of conditions, individually assessed **coverage** and supporting evidence, and a separately assessed **inventory coverage**. Allow explicit **nested `all`/`any` groups** for conditions within a pathway and pathways within an inventory. An expression tree's logical correctness is not by itself D-31 causal sufficiency, true actionability/Power, or effective Actualization. The three epistemic uncertainties remain distinct: an **unknown Object property/condition evaluation**, an **unknown unlisted necessary condition of an identified pathway**, and an **unknown additional pathway**.

**[VALIDATED semantic rules for evaluation relative to modeled scope]** A specified and defensibly complete pathway evaluated as satisfied provides an identified possible route; if a known necessary condition fails, that pathway can be unsatisfied even if further necessary conditions remain undiscovered. If all **known** conditions of an incompletely specified pathway pass, that pathway remains indeterminate. A complete and justified inventory whose pathways all fail can be unsatisfied (in the scoped evaluation). An **incomplete inventory** for which all known pathways fail is **indeterminate globally**, not proof the CAN cannot be made actionable by some unexamined path. A confirmed satisfying pathway within an open inventory may still make the evaluated inventory satisfied **for that modeled route**, subject to the established sufficiency/actionability checks. Unknown inferences must never silently become false.

**[STRUCTURAL PRINCIPLE VALIDATED — November 15, 2026; D-42 / SERIALIZATION STILL PROVISIONAL]** The author validated **one recursive Boolean-expression structure** for the composition of condition/pathway expressions, with reusable **explicitly versioned** pathway references, non-truth-valued empty groups and permitted but safely detected cyclic references. The example **JSON field names and exact representation** below remain proposed, not a normative schema:

- A **reference leaf** is `{"ref":{"kind":"condition","id":"C-command"}}` (or, where allowed, `kind:"pathway"` and a pathway identifier).
- A **group** is `{"op":"all"|"any","items":[<expression>,...]}`. The `items` entries may themselves be leaves or arbitrarily nested groups. Logical grouping is explicit; no inferred operator precedence.
- **Metadata** on a named group, such as `id`, `kind:"pathway"|"inventory"`, `coverage:"complete"|"incomplete"|"indeterminate"`, `scope`, `version` and `evidence`, is separate from `op` and does not create a new truth operator.
- Under incomplete/indeterminate coverage, an `all` expression with a known false conjunct may still be **unsatisfied**, otherwise it is **indeterminate** even if all identified members are true; an `any` expression with a confirmed true member may still be **satisfied**, otherwise it is **indeterminate** even if all identified members are false.
- **[D-42 VALIDATED]** Named pathway references must be reusable rather than duplicating expressions, with **explicit identity and Definition version**. Empty `all`/`any` groups must be **flagged as incomplete/invalid**, not assigned Boolean true/false identities. Cyclic references may be **stored**, but must be **detected**, never evaluated by naïve unrestricted recursive descent, and routed to D-39's context-specific dynamic analysis. **[OPEN]** Exact compound reference field names, representation of zero known pathways without an empty Boolean group, cycles' logical fixed-point semantics, a final JSON Schema, and proof/validation of causality or complete Power.

**[ILLUSTRATIVE D-41 PROPOSAL ONLY]** `C-command`, `C-battery`, and `C-external` below are separately defined condition IDs scoped to an owning CAN relation; their evaluated statuses are Scenario/time-specific, **not** stored as fixed truths in the expression:

```json
{
  "id": "I-start",
  "kind": "inventory",
  "coverage": "incomplete",
  "scope": "R-A starting in scenario context",
  "op": "any",
  "items": [
    {
      "id": "P-battery",
      "kind": "pathway",
      "coverage": "complete",
      "op": "all",
      "items": [
        {"ref": {"kind": "condition", "id": "C-command"}},
        {"ref": {"kind": "condition", "id": "C-battery"}}
      ]
    },
    {
      "id": "P-external",
      "kind": "pathway",
      "coverage": "complete",
      "op": "all",
      "items": [
        {"ref": {"kind": "condition", "id": "C-command"}},
        {"ref": {"kind": "condition", "id": "C-external"}}
      ]
    }
  ]
}
```

**[OPEN AFTER D-42]** Final JSON Schema of expression nodes, completeness provenance and falsification, representation of open inventories with no known pathways, cross-record references/version ownership, dynamic treatment of cyclic path references (D-39), interaction with D-37 **Object-reference relation composition** and D-34 **temporal requirement composition**, and semantic/causal interpretation of AND/OR. D-40 `relation.conditions` / `predicate` field layout remains provisional.

### 2.1.8 Evaluation of versioned recursive references and cycles (D-42)

**[VALIDATED — D-42, November 15, 2026]** The author approved all three further rules:
1. **Reusable paths**: another group can refer to a named pathway by identifier **and version**, instead of copying its body. Exact scoped serialization remains a technical proposal.
2. **Empty groups**: `all`/`any` with `items: []` must not silently evaluate to true/false. A model validator must explicitly identify an incomplete or invalid expression. **[OPEN]** An inventory with **zero known pathways** still needs a separate, meaningful representation that is not an empty Boolean group.
3. **Circular references**: named pathways may reference each other cyclically. Detect these graphs (e.g. by strongly connected components) without naïve recursion. A static value derived from Boolean reference equations never proves a feasible causal Actualization; actual blocking, enabling, inhibition and chronology require D-39 dynamic Scenario analysis.

**[ENGINEERING EXPERIMENT — NOT A SCIENTIFIC VALIDATION]** Synthetic D-42 prototype evaluated **413 assertions**, including **90** comparisons to a separate brute-force Boolean fixed-point oracle for circular reference equations and **189** comparisons to exhaustive truth-table completions of nested/open AND/OR groups. All passed for the specified fixtures (27 three-state shared-reference configurations, six primary Scenario snapshots, 180-node chain and 180-node cycle). The prototype tested the **provisional serialization** using named groups and typed leaves of the shape:

```json
{
  "ref": {
    "kind": "pathway",
    "relation_id": "R-A",
    "id": "P-battery",
    "version": "v2"
  }
}
```

In this test, group coverage was `complete`, `incomplete` or `indeterminate`; open-world coverage was handled conservatively under D-41. For **positive** Boolean `all`/`any` recursive equations, it used a **three-valued information fixed-point iteration**, initialized to `indeterminate`, rather than recursively expanding named references. Every cycle remains flagged for **D-39 dynamic review**, even if a static condition equation is `satisfied`.

**[LIMITS]** Test outcomes are internally reproducible in one environment and use synthetic predicates. An oracle implemented by the same author is a useful cross-check but **not independently replicated evidence**. The prototype does not execute CAN Actualizations, D-39 non-monotone causal events, or D-35 temporal-compliance evaluations. A structurally valid recursive expression is not proof of a complete causal pathway or positive Power. The exact JSON Schema, cross-branch/version scope and valid "no known path" state remain OPEN; relevant tasks remain open.

### 2.1.9 Documentary empty inventories and distinct logical/causal graphs (D-43)

**[VALIDATED — November 15, 2026; D-43 A–E]** The user explicitly approved the five principles separating **(1) the documentary state of knowledge of pathways**, **(2) recursive logical references** and **(3) hypothesized/observed causal dependencies and Actualization effects**.

**A. Valid inventory with no known pathway.** An inventory may be meaningfully represented before a pathway has been identified, **without** constructing `{"op":"any","items":[]}`, which D-42 treats as a diagnostically invalid/undefined logical group. Preserve independently the inventory's *knowledge/search status*, its coverage within a stated scope, and any logical expression that can actually be evaluated. **[PROVISIONAL JSON]** A documentary `expression: null` and `search_status: "not_searched"|"searched_no_match"` are examples, **not a newly finalized schema**.

**B. Absence of known pathways is not impossibility.** If an inventory contains no discovered pathways, absent a substantiated exclusion proof within the specified scope, report the overall possible actionability as **indeterminate**, not as a globally `unsatisfied` CAN. A claim that no pathways exist requires separate contextual assumptions, versioned evidence and an independently reviewable argument. A label such as `coverage: "complete"` or an empty expression alone does not constitute such a proof. Keep a "searched without a match" outcome distinct from "no pathway exists under these assumptions."

**C. Two graph types.** The **logical graph** links named, versioned expressions/conditions/pathways through D-42 references, including permitted detected cycles; it determines **evaluations of the specified conditions**. The **potential-causal graph** relates CAN Actualizations, triggers, state changes, conditions and other links through D-39 qualified `affects` and proposed `effect_details` semantics; it determines **what might change after an event**. A logical cycle does not imply a causal cycle and vice versa.

**D. No automatic graph translation.** A logical `satisfied` evaluation does **not** produce an event, mutate an Object state or establish Actualization. A potential causal link does **not** itself prove necessary/sufficient action conditions or enable a CAN. Any asserted relationship between the two graph types needs explicit conditions, mechanisms, epistemic qualification and D-31 tests. Keep D-35 effective NEED satisfaction distinct from both CAN pathway evaluation and temporal compliance.

**E. Coupled Scenario protocol.** Evaluate time-indexed Object states (D-40); evaluate relevant recursive pathways (D-41/D-42); identify possibly actionable CANs for the modeled role; consider/execute **explicitly simulated or actually observed** events and their qualified time-delayed, inhibiting or enabling effects (D-39); then recompute changed condition/predicate and pathway evaluations, documenting version, uncertainty and recursion limits. **Do not merge** the Definition, the evaluation of a possible path, the hypothesized causal mechanism and the Actualization history.

**[PROVISIONAL DOCUMENTARY INVENTORY EXAMPLE — not a Boolean group or finalized schema]**

```json
{
  "id": "I-energy",
  "kind": "inventory",
  "scope": {"relation_id": "R-energy"},
  "coverage": "incomplete",
  "search_status": "searched_no_match",
  "expression": null,
  "evidence": {"status": "indeterminate"}
}
```

The field names, exhaustive negative findings, allowed search-status vocabulary, proof checking, owners and cross-branch version references remain **OPEN**. The single recursive `all`/`any` expression **principle** remains VALIDATED (D-42); this inventory envelope does not introduce a new truth operator.

**[TESTED SYNTHETICALLY, NOT EMPIRICALLY]** A reproducible pilot with the archived D-42 logical evaluator plus a separate, event-driven toy state-transition simulator passed **218/218 assertions**, including **27** combinations of three-valued battery/external-source/technician states and **4** limited brute-force reachability cases. The logical-only cycle is detected with **zero Actualizations**, even with a statically `satisfied` expression. The separate potential-causal graph includes the cycle `L-A ↔ L-B` though the relevant actionability expressions are **acyclic**; three scenario branches show an initially blocked pathway, an initially charged battery, and an independently actionable **third CAN C** enabling C → A → B through explicit modeled events and subsequent reevaluation. Negative inhibition, temporary expiry, overlapping supply intervals, missing effect rules and unknown states were also tested. Synthetic assertions are not independently verified real-world mechanisms; the simulator is not the final D-39 event/temporal engine or a D-35 compliance evaluator.

**[OPEN]** Audit standard for exhaustive negative evidence; preservation of distinctions between documentary inventory, logical graph and potential causal graph; reproducible formal event/condition linking; variant/branch definitions; time/delay semantics; causal inference and counterfactual validation; CI integration and third-party reproduction. Related open work: T-02, T-03, T-16, T-18, T-24 and T-30.

### 2.1.10 Cross-graph typed references, Actualization events and Scenario history (D-44)

**[VALIDATED — November 15, 2026; D-44 A–E]** The five principles below specify **how distinct logical and causal layers interface**. They do **not** imply any final implementation schema or promote a hypothesized causal effect to a proven one.

**A. Typed, versioned and situated references.** Cross-graph references must distinguish the identities of an Object, NEED/CAN relational record, Condition, Link, and where relevant a named pathway, with an explicit owner for locally scoped records and the relevant **Definition version**. Evaluated states and derived statuses belong to a **Scenario and time/interval**. Resolve references exactly; do not silently substitute a newer version or a similarly named record from a different owner. Branch qualification remains to formalize.

**B. Declared causal mechanism versus effect.** An `affects` / provisional `effect_details` statement can describe a source CAN/event, source link and target link, affected Object property/condition, possible mechanism, trigger, evidence and temporal parameters, without producing any Actualization. Linking the causal description to a condition requires an **explicit reference and evidential justification**, not automatic equivalence of graph edges or causal sufficiency.

**C. Scenario event history.** An actually observed or explicitly **simulated** CAN Actualization is a distinct identifiable, time-indexed event pinned to its CAN Definition, Scenario, and epistemic provenance; its documented effects may be absent, delayed, incomplete, adverse or temporary. Records of effects and state changes must link back to corresponding trigger events. Simulated results are not historical observations and must not be written to the real-world Object Definition automatically.

**D. Reevaluate from changed Object states.** For each registered state change, find dependent condition predicates, recalculate their Scenario/time-specific satisfaction and then recalculate any logically dependent pathway/inventory expressions. Retain original and derived evaluations and timestamps. Property-to-condition dependency indexes are an implementation accelerator, **not a new causal claim**. Contradictory effects must be reported, not silently resolved by list ordering; the correct conflict semantics remain OPEN.

**E. Branch isolation.** Different Scenarios retain independent states, event histories, Definition version pins and derived evaluations; distinct values under common Definitions need not conflict. A Scenario using `v2` for a CAN cannot silently action a `v1` reference. Actualization and Definition-version promotion/merges across branches require explicit actions and separate rules. D-31 conditional sufficiency and complete Power and D-35 actual NEED satisfaction/time compliance remain distinct from pathway satisfaction.

**[PROVISIONAL CROSS-GRAPH SERIALIZATION, not a normative JSON Schema]** The following illustrates one directly traceable event:

```json
{
  "event_id": "S-auxiliary:E-0001",
  "scenario_id": "S-auxiliary",
  "kind": "simulated_actualization",
  "at": "2026-11-15T15:00:00+01:00",
  "can_ref": {
    "kind": "can",
    "relation_id": "R-C",
    "id": "R-C",
    "version": "v1"
  },
  "mode": "simulated"
}
```

A potential effect would refer to this CAN (and optionally its source/target link refs), a versioned target condition and Object property and, if simulated as taking effect, link the **effect event** to `event_id` before reevaluation. The exact field names for referential integrity across branches and event histories are **OPEN**.

**[PRELIMINARY SYNTHETIC TEST EVIDENCE — D-44]** A Python pilot using the unchanged D-42 recursive logic engine with an independent layer for proposed causal-effect scheduling passed **190/190 assertions**, including **27** combinations of three ternary Object properties checked against explicit v1/v2 Boolean formula expectations. In a synthetic generator example, CAN C explicitly simulated at t=0 caused temporary power **only after 2 minutes**, enabling A then B; the source expired at t=5 but B had recharged the battery. Distinct branches maintained v1/v2 condition pins and isolated logs; wrong owners/versions, modified effect definitions and missing identifiers were rejected. Tested simultaneously opposed effects, overlapping delays and expiry, and a direct time jump past a temporary effect's expiry. A scheduling bug found in an initial prototype was corrected, and two program runs yielded identical output hashes.

**[OPEN ENGINEERING CHOICE]** The pilot **rejected a contradictory simultaneous effect batch**, marked the affected property **epistemically indeterminate**, and logged the uncertainty as distinct from an effective physical change. **This conflict policy is not yet validated by the author**; alternatives include suspending the Scenario or branching into candidate event orders, and its interaction with time/observational evidence needs investigation.

**[LIMITS / OPEN]** The test uses synthetic Boolean predicates and direct same-property effect mappings, a minute-resolution clock, and author-generated fixtures. It does not establish real causal mechanisms, completeness of CAN conditions, general indirect effects, Definition mutations during simulation, cross-branch reference schemas, independent replication or full D-33–D-35 NEED/time assessments. Sample `source_can`, `state_effect`, `affected_condition`, event and typed-reference fields remain **illustrative**. The related TODOs stay open.

### 2.1.11 Diagnosing and handling competing effects (D-45)

**[VALIDATED — November 15, 2026; D-45 proposals A–E and localized-suspension rule]** When two effects, observed accounts or modeled rules assign incompatible consequences to the same relevant Object property/time/context, do **not** silently choose an effect by recording order. First identify the **kind of contradiction**, sources, versions, causal assumptions and applicable evidence. An apparent conflict may have a justified contextual ordering or priority; conflicting evidence may instead concern **knowledge of a state**, not actual competing physical changes.

**A. Diagnose** opposing causal predictions, incompatible observations/evidence, under-specified model interaction rules, and apparent conflicts resolved by a justified mechanism. Preserve targets, timestamps, source CAN/Event/Link IDs and evidence. D-39 hypothesized `affects` relationships are not independently validated causes.

**B. Resolution, if justified.** Investigate explicit and context-specific priorities, physical interaction mechanisms and temporal ordering **before** suspending or branching. A rule is admissible only if its applicability and evidence are sufficiently justified. A list order or ungrounded winner is not a mechanism. The required external evidential quality is **OPEN**; `established_in_model` is not equivalent to `empirically established`.

**C. Hypothetical branch outcomes.** Where compatible alternative hypotheses can be articulated, create separate Scenarios with explicit assumed outcomes and source-conflict provenance; **never** infer they are exhaustive or equally probable. Do not replace one shared observed historical event with alternative invented observations. Child Scenarios have independent states and subsequent histories; preserve shared versioned Definitions.

**D. Physical state versus epistemic status.** An indeterminate assessment represents **uncertain knowledge**, not a new physical property. Do not encode an unresolved contradiction as a physical `null` *transition* or log it as a successful Actualization. A simulator may preserve the last committed state separately from a **knowledge overlay** marked indeterminate, with the caveat that the last determined value need not represent the unknown current real state. Condition and pathway evaluations use the knowledge-qualified view when the evidence is conflicted.

**E. Historicize diagnosis and treatment.** Record each conflict and its versioned target, provenance, sources, hypothesis/rule, applied handling and downstream assessment changes, without deleting earlier uncertainty when later evidence appears. Exact record layout is NOT approved.

**F. Localized suspension (additional VALIDATED rule).** If no justified resolution rule is available, suspend only those action/state transitions and dependent assessments requiring the contested property; continue independent parts of the Scenario. A second sufficient, confirmed alternative path may remain satisfied even when another required property is epistemically unknown, according to D-41/42's scoped three-valued logic. Exhaustiveness of paths and complete Power still require separate evidence.

**[PROVISIONAL STRUCTURE, not a finalized JSON Schema]** Example of an explanatory conflict object:

```json
{
  "conflict_id": "S0:K-001",
  "scenario_id": "S0",
  "at": "2026-11-15T15:02:00+01:00",
  "target": {
    "object_ref": {"kind": "object", "id": "O-external", "version": "v1"},
    "property": "available"
  },
  "sources": [
    {"effect_id": "H-C", "actualization_event_id": "S0:E-001", "proposed_value": true},
    {"effect_id": "H-E", "actualization_event_id": "S0:E-002", "proposed_value": false}
  ],
  "diagnosis": "unresolved_effect_conflict",
  "strategy": "branch",
  "hypotheses_exhaustive": false,
  "physical_transition": false
}
```

The fields are illustrative, and no final conflict taxonomy, evidence schema or priority proof standard is hereby adopted. An event may be a **simulated** Actualization; a conflict of observational evidence should refer instead to **evidence IDs**, not fictitious Actualizations.

**[PRELIMINARY SYNTHETIC D-45 EVIDENCE — 173/173 checks passed]** Using the D-42 recursive evaluator and D-44 fictitious CAN/Object Definition catalog, a Python test compared 27 ternary input sets and four strategies:
- an **explicitly recorded, scoped, versioned priority** picked H-C over H-E, independent of event order; six mismatched/unjustified rule variants did not select a winner;
- **branching** produced isolated alternative `available=false`/`available=true` hypotheses; no claim of exhaustion or probability, and later A Actualization/temporary effect expiry were confined to one child;
- **conflicting evidence** caused an epistemic unknown evaluation but no physical state change or Actualization; earlier evidence and revisions were retained;
- **localized suspension** left the external-source condition unresolved but permitted unrelated CAN D and, in a separate synchronous-event fixture, battery recharging by B to proceed; a confirmed battery pathway could still satisfy A. A v2 start condition testing `connected` remained insulated from the v1 availability conflict.

The suite also verified time advancement over delayed effect expiry, immutable versioned shared Definitions, and identical JSON outputs on a rerun from the extracted reproducibility ZIP. **These synthetic checks do not prove external priority mechanisms or factual resolution of contrary observations.** The prototype accepted a nonempty `evidence_id` when closing an uncertainty, but **did not independently verify that evidence**; this is an explicitly outstanding safety requirement, not a validated evidence policy.

**[OPEN]** justified priority criteria; formal partial-order and concurrent event semantics; proof-based resolution of contradicting observations; multiple simultaneous conflicts and existing active temporary overlays; branch search/explosion and causal completeness; cross-branch version merge, D-33–D-35 temporal constraints, schema normalization, repository CI and independent reproduction. T-02, T-03, T-16, T-18, T-24 and T-30 remain open.

### 2.1.12 Claim-centered evidence qualification, revision and user-checkable justifications (D-46)

**[VALIDATED — November 15, 2026; D-46 A–E]** The author validated five complementary principles regarding **what authorizes the Method and an assisting AI to justify a claim**. Preserve D-31's previously approved epistemic qualifications—**established within the considered model**, **plausible**, **refuted in the considered context** and **indeterminate**—while distinguishing *logical derivation relative to assumptions* from *real-world evidential support*. This does not introduce a fifth degree of intrinsic truth in an Object, NEED or CAN.

**A. Claim, evidence, assessment.** Identify and contextually scope consequential **claims** about Object properties, NEEDs, CANs, conditions, causal mechanisms, pathway/inventory completeness or Scenarios. Preserve distinct references to the **claim being tested**, each **item of supporting/contradicting/informative evidence**, and the **assessment made at a given time**. Qualified claims may depend on versioned Object/relation/condition/pathway Definitions and Scenario/time.

**B. Model-internal derivation versus empirical warrant.** A result following a rule and stated premises may be labeled `established_in_model`, but this **must not** automatically count as empirical confirmation. Record separately (i) which model assumptions/rules permit the inference, (ii) what empirical observations or other probative elements, if any, support the premises and conclusion, and (iii) the scope/time limits. Missing a premise is not itself a refutation of its conclusion. Numerical confidence probabilities may be used only if independently justified and calibrated.

**C. Evidence quality and provenance.** Consider for the particular claim: **relevance**, **reliability**, **traceability**, **independence** and **discriminating power** against alternative hypotheses. Preserve provenance and collection method, context, limitations and whether evidence supports, contradicts or merely informs the claim. Multiple reports sourced from the same underlying measurement or source should **not be counted as independent confirmations**. Source format or a declared review label alone is not proof of trustworthiness; different evidence methods require context-specific standards, not one universal ladder.

**D. Revisable, historized assessments.** New observations, contradictory evidence, revised assumptions or changed Definition versions may lead to a **new, dated assessment** while earlier versions and their then-available evidence remain intact. The mere presence of a new source—even an apparently authoritative one—must not automatically resolve a conflict (D-45); review pertinence and discriminating relevance. Distinguish change of knowledge from Actualization-induced Object state changes (D-40/D-44/D-45).

**E. Inspectable user-facing justifications.** When communicating important claims, provide a checkable explanation of *the stated claim, its scope and assumptions; model inference; relevant source IDs and contradictory sources; limitations; epistemic status; and missing potentially discriminating checks*. These **external justifications** do not expose hidden internal reasoning, and no arbitrary score or certainty should be invented. Minimize unnecessary information and protect unrelated data.

**[PROVISIONAL JSON EXAMPLE — NOT A FINAL SCHEMA]**

```json
{
  "claim_ref": {
    "kind": "claim",
    "scenario_id": "S-alpha",
    "id": "CL-external-effect",
    "version": "v1"
  },
  "assessment_at": "2026-11-15T15:07:00+01:00",
  "model_validity": "established_in_model",
  "empirical_status": "indeterminate",
  "supporting_evidence": ["EV-001"],
  "contradicting_evidence": ["EV-002"],
  "assumptions": ["AS-001"],
  "limitations": ["causal_mechanism_not_empirically_established"]
}
```

This example demonstrates **simultaneous model derivation and empirical uncertainty**, not a redefinition of D-31 or proof of a true causal effect. Exact IDs, qualifiers, statuses, threshold rules, model-proof formalism and scenario/time semantics remain OPEN.

**[SYNTHETIC TEST — 898/898 assertions passed, November 15, 2026]** A locally reproducible standard-library Python prototype:
- Declared five synthetic claims, two differently versioned logical/condition claims, one causal claim reused in another Scenario, model derivation rules and contextual evidence;
- detected and grouped three documentary items with a **common underlying source** as one dependence cluster, versus two declared distinct origin clusters (not proof of statistical independence);
- preserved D-31's `established_in_model` while leaving the claim's empirical assessment `indeterminate`; version v1's premises did not silently satisfy v2;
- evaluated **27** combinations of absent / insufficiently discriminating / qualified fixture support, contradiction and purported falsifier; a non-discriminating addition did not erase a contested claim, and a qualified opposing source made a one-sided contextual synthetic refutation indeterminate;
- preserved immutable historical assessments and used distinct ISO 8601 **observation time** versus **registration time** so a retrospective assessment could not use future-recorded evidence;
- rejected incorrectly scoped/unversioned claims, missing/derived-from-invalid sources, observations outside the claim's time window and inconsistent provenance chronology;
- selected qualitatively **non-dominated** hypothetical checks by the pairs of hypotheses they could discriminate and an explicitly given low/medium/high burden, without inventing probabilities. The selected check was invariant over **720 permutations** of six candidates; incomparable admissible checks were retained;
- verified against a D-45 Scenario fixture that assessing evidence does **not** mutate simulated Object state, event history or Definition versions.

The ZIP was extracted and the script rerun; output JSON was byte-identical (SHA-256 `4bb788e652670c205f55216ad7ba40a04e07669823ce4d06eec871e9e4fe6fc6`). These checks are **self-authored synthetic engineering tests**: source reviews including the label `checked_in_fixture` and the `falsifies` indicator are **stipulated**, not an independent assessment of real-world truth or source reliability. Counting source origins from explicit provenance does not prove actual independence; 720 permutations check order invariance rather than 720 independent experiments.

**[OPEN]** Provenance beyond declared inputs, source-specific methodological standards, missing/correlated evidence, falsification versus contradictions with uncertain observation quality, source retraction and post-hoc version changes, calibrated epistemic or quantitative confidence, values of information with unverified predictions, privacy of source disclosures, real-world empirical trials, final JSON Schema and repository CI/integrated independent replication. T-01, T-02, T-03, T-16, T-18, T-24, T-30 remain OPEN.

### 2.1.13 Method-sensitive evidential assessment (D-47)

**[VALIDATED — November 15, 2026; D-47 A–E]** The author approved a **context-dependent evaluation of evidence quality and sufficiency**, rather than a universal source hierarchy or numeric credibility score. This extends D-46's five dimensions of evidence quality, preserves the distinct D-31 epistemic labels, and respects D-45's separation of knowledge contradictions from Object state changes.

**A. Method- and claim-sensitive criteria.** Judge a source against the methodological checks appropriate both to how its information was produced **and** the exact affirmation being examined. Observation/measurement can require instrument, calibration and error checks; experimentation can require interventions, comparisons and controls; statistical studies may require sample, bias, confounding and uncertainty checks; simulations require internal verification distinct from empirical validity and sensitivity; formal derivations require valid inferences and supported premises. These illustrative families can overlap and are not a universal hierarchy.

**B. Requirements separate from their evaluation.** Represent the applicable methodological criteria separately from assessments that they are satisfied, unsatisfied or indeterminate, where suitable. These statuses concern **criterion compliance**, NOT the intrinsic truth of the evidential claim, causal actionability, Power or NEED satisfaction. An undocumented criterion does not prove that it passes or fails.

**C. Method quality distinct from probative sufficiency.** A correctly executed measurement, simulation or deduction may remain insufficient to support the considered causal/empirical claim. Examine the tested claim, scope, alternative explanations, discriminating power, empirical validation and any unverified premises.

**D. No arbitrary aggregation across evidence.** Consider qualified supporting/contradicting sources, independent/common underlying origins, heterogeneous methods, complementary findings and disjoint or overlapping scopes; repeated publications of one dataset are not independent replications. Do not add qualitative grades into a numeric confidence score, infer probabilistic certainty or pool sources without a specifically justified synthesis method.

**E. Verification proportional to stakes and recursive relevance.** Decision importance and consequences may increase the depth of verification before taking action, but **do not change the truth** of a claim or transform weak evidence into strong evidence. Choose relevant, discriminating and feasible checks without forcing infinite inquiry or arbitrary numeric scoring.

**[SYNTHETIC TEST EVIDENCE — not empirical validation]** A standalone Python-standard-library prototype passed **612/612 assertions**, involving **five** illustrative evidence-method families, **seven** adversarial cases, **243** exhaustive ternary methodological-compliance configurations (486 assertions compared with a separately written reference rule) and **24** evidence source-order permutations (48 consistency assertions). It correctly kept methodological compliance separate from claim adequacy for precision-versus-causality, experimental-control failures, statistical association versus causation, internally reproducible simulations lacking empirical validity, formal deduction from unverified premises, repeated-source provenance and contextually non-comparable studies. Missing checks remained indeterminate. Competing same-context evidence was not averaged; a high-stakes hypothetical check plan required additional review **without changing claim status**.

**[PROVISIONAL IMPLEMENTATION LIMITS]** The specific criterion labels, JSON fields, reduction rule for criteria, conservatively exact context equality on population/setting/period, and example stakes-based verification plans are **not validated as normative Method rules**. Scientific judgments in test cases were supplied by their author, not derived from independent real-world source review. Common-origin groups are determined by declared source roots, which need external confirmation for actual independence. There is no real causal validation, quantitative synthesis, empirical refutation or general quality grade. Reexecution from an extracted ZIP gave byte-identical results with SHA-256 b26fefe621f44b9733f2d88674bb5a5bb6933c24595b25a8a952001c7373208c.

**[OPEN]** Domain-specific expert checklists and held-out real studies, review of source credibility/provenance, valid comparisons and transportability across contexts, causal inference and calibrated statistical synthesis, handling retracted/missing sources, decision-stakes verification criteria, D-46 revision history integration, independently authored test oracles, final JSON Schema and repository CI. Related tasks T-01, T-02, T-03, T-16, T-18, T-24, T-30 remain OPEN.

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
- **[UPDATED representation — D-36]** NEEDs remain attributable to the Object identified by `OriginObject`, but their current **data representation is a typed relational record** connected to one or more referenced Objects. This replaces the earlier representation-only description as free-standing Object properties; their conceptual status as necessities and separate satisfaction state is retained.

**[VALIDATED, November 15]** Distinguish conceptual from functional existence when identifying necessary constituents and the states required for a NEED. The Definition may include partially known NEEDs: mark lack/absence of information separately from evidence of absence of necessity. The analyst may qualify uncertainty **qualitatively** and/or **quantitatively (statistically)** where supportable; do not treat missing information as a zero probability.

**[VALIDATED — November 15, 2026; D-32] Temporal satisfaction requirements:** The required state of a NEED may have an explicit **temporal requirement**: specify, where relevant, **when** it must be satisfied and **for how long**, including whether satisfaction must be maintained throughout a defined part of a Scenario. The presence of a satisfied **final state** does not establish compliance with a requirement of **continuous satisfaction throughout the Scenario**. This is a temporal specification of the NEED's required state, not a newly adopted intrinsic class of NEEDs. A Scenario's satisfaction evaluations are **context- and time-specific**, and must remain distinct from the NEED's definition and its versioned requirements.

**[VALIDATED — November 15, 2026; D-33]** NEEDs and CANs may both use a common structured `temporal` field, with separate `requirements` (temporal constraints) and `estimates` (estimated action/effect times and durations). The temporal requirement of a NEED is part of its versioned Definition; Scenario-specific satisfaction and time-indexed observations belong to a **separate Scenario evaluation**, not to the `temporal` requirements themselves. See §3.2.1 for the approved format and conventions. **[OPEN]** Full schema validation and semantics for combining/recurring/relative constraints remain to be operationalized.

**[OPEN]** Operational criteria distinguishing a NEED from a merely favorable property; conceptual versus functional necessity across Object types; identity and granularity of required states; evidential standards, statistical calibration and the exact role of the Semantic Pyramid in non-semantic cases.

## 3.2 CAN — Potentiality of an Object

- **CAN [VALIDATED terminology; REPRESENTATION UPDATED D-36]**: a Potentiality originating from an Object, selected and described according to the **relevance and granularity of the analysis**. A CAN may depend on other Objects for its Actualization; independent autonomous action is not always required. **Current data representation:** `Type: CAN` relational record, with `OriginObject` and nullable `NEEDs` / `CANs` lists of Object references. The prior optional conceptual-Object representation is not the current default schema.
- An Object's **CANs** form a contextually selected, potentially **non-exhaustive** inventory of relational records originating from that Object. A CAN may correspond to NEEDs of the same Object or of others; **a link in `CANs` alone does not establish correspondence, sufficiency or actionability** without D-31 verification. A CAN is not equivalent to a NEED or to Power.
- **Actionable CAN [VALIDATED, November 15]**: a CAN whose **conditions of action are met**. A distinct classification of *mobilizable CAN* is no longer used in the current terminology. The relationship between action conditions in a specific contribution and full sufficient Conditions of Power of the considered Actualization requires careful specification in T-02.
- For **Groups and Systems**, distinguish CANs of constituent Objects from CANs of the Group/System that require Actualizations by multiple constituent Objects. Those CANs are not automatically identical.
- **Potentiality / Potentialité [VALIDATED — November 16, 2026]**: an operational concept equivalent to a **CAN**, not to a NEED; it is not merely a popularized label.
- **Potency / Puissance [VALIDATED — November 16, 2026]**: the list of an Object's CANs at a given time. NEEDs are not included in Potency.
- **Focal Potentiality [VALIDATED legacy term; FORMALIZATION]**: a CAN selected when the Stage-2 Focus is a CAN. A Stage-2 Focus on a NEED must not be silently relabeled as a Focal Potentiality.
- **Plasticity [VALIDATED]**: an Object's aptitude for its Potentialities to emerge, change, or disappear; this is distinct from a change actually observed. How to extend the concept to changes of NEEDs in the revised architecture remains **OPEN**.

The perspectives of **Subject, Environment, and Semantics** may be used to determine and analyze NEEDs and CANs; their relevance and weight depend on the case. The exact operations corresponding to each perspective remain **OPEN**. **[VALIDATED principle / OPEN operationalization]**

### 3.2.1 Common temporal data format for NEEDs and CANs

**[VALIDATED — November 15, 2026; D-33]** A NEED and a CAN can each have a common structured `temporal` field. This **does not** introduce new ontological categories of NEED or CAN. The field distinguishes:
- `requirements`: **when** satisfaction or action is required, including mandatory times, deadlines, continuity, recurrence and cumulative-duration constraints.
- `estimates`: estimated **execution duration**, **delay until effects**, and **duration of effects** (where relevant).
- `time_zone`: an IANA time-zone identifier for interpreting the relevant civil time; timestamp values should also carry their **explicit UTC offset**.

**[VALIDATED modes and working field identifiers]** A `requirements` entry uses a `target` and one of these `mode` values:
- `point`: a required state at a given `at` instant.
- `continuous`: a required state throughout a `window` interval.
- `deadline`: a required state or action by `deadline`.
- `recurring`: an obligation repeating according to `recurrence`.
- `cumulative`: a minimum accumulated duration `min_duration` during a given `window`.

**[VALIDATED — November 15, 2026; D-34]** Modes may coexist within a NEED or CAN. **All listed requirements apply conjunctively by default** unless an explicit alternative composition is given. The approved composition operators are `all` (every referenced requirement must be satisfied) and `any` (at least one referenced requirement must be satisfied). `composition` can refer to individual requirements by stable `id` through its `requirements` array. **If no `composition` is supplied, the listed requirements are combined using `all`.** Logical grouping/nesting is conceptually permitted, but its full machine-readable recursive representation, validation and handling of conflicts remain OPEN. An empty or incomplete list of recorded requirements must not be treated as proof that no additional requirements exist.

**[VALIDATED — D-34]** Explicitly distinguish **authorized exceptions** from violations observed in a Scenario. An exception must be intentional, justified, scoped to a specific period and constraint, and represented in version history. Observed non-compliance does not retroactively create an exception; the exception must not silently bypass other applicable constraints. An operational exception object/schema and its precedence with overlapping requirements remain OPEN.

**[VALIDATED — D-34]** Check for **incompatible requirements applying to the same state, Object and context over overlapping times**; report an inconsistency of the specified requirements separately from a Scenario failing to satisfy a coherent requirement, and from an indeterminate assessment. Do not promote a Definition inconsistency to a fourth intrinsic NEED satisfaction state.

**[VALIDATED — D-34]** For a group of assessed requirements, aggregate the three analytical outcomes as follows:
- `all`: **satisfied** if all assessed requirements are satisfied; **unsatisfied** if at least one is unsatisfied; **indeterminate** if none is unsatisfied but at least one is indeterminate.
- `any`: **satisfied** if at least one is satisfied; **unsatisfied** if all are unsatisfied; **indeterminate** if none is satisfied but at least one is indeterminate.
A report of structurally contradictory requirements remains a **separate consistency diagnostic**, not a new intrinsic satisfaction state. Unknown information is not silently counted as false or as true.

**[VALIDATED — D-34]** For `cumulative` requirements, overlapping satisfied subintervals are counted **only once** when computing total duration. The exact time-domain semantics of recurrence, exceptions, overlapping groups, within-action changes and uncertainty still require tests.

**[VALIDATED conventions]** Use ISO 8601 date-times including explicit UTC offsets, and ISO 8601 duration strings (e.g. `PT30M` and `PT2H`). Model intervals as **start-inclusive, end-exclusive**. Distinguish an **absent/unknown** duration from a **zero** duration; empty arrays do not prove that no unrecorded requirement exists. When relevant, represent durations as ranges (e.g. `min` and `max`), without treating estimates as certain outcomes.

Illustrative **NEED**:

```json
{
  "id": "N-001",
  "required_state": {"property": "air_quality_acceptable", "value": true},
  "temporal": {
    "time_zone": "Europe/Paris",
    "requirements": [
      {
        "target": "satisfaction",
        "mode": "continuous",
        "window": {
          "start": "2026-11-15T08:00:00+01:00",
          "end": "2026-11-15T18:00:00+01:00"
        }
      }
    ],
    "estimates": []
  }
}
```

Illustrative **CAN**:

```json
{
  "id": "C-001",
  "description": "Install an air filter",
  "temporal": {
    "time_zone": "Europe/Paris",
    "requirements": [
      {
        "target": "action_start",
        "mode": "deadline",
        "deadline": "2026-11-15T09:00:00+01:00"
      }
    ],
    "estimates": [
      {
        "target": "execution",
        "duration": {"min": "PT15M", "max": "PT30M"}
      },
      {
        "target": "effect",
        "start_delay": {"min": "PT0M", "max": "PT5M"},
        "duration": {"min": "PT6H", "max": "PT8H"}
      }
    ]
  }
}
```

**[VALIDATED separation]** For each Scenario, retain **evaluations and observations separately** from the NEED/CAN Definition, so changing the assessed status does not silently rewrite a NEED's requirements. Example (illustrative evaluation, not an Actualization of the original Object):

```json
{
  "scenario_id": "S-002",
  "need_id": "N-001",
  "evaluation": {
    "status": "unsatisfied",
    "violations": [
      {
        "start": "2026-11-15T10:00:00+01:00",
        "end": "2026-11-15T10:20:00+01:00"
      }
    ],
    "evidence": "established_in_model"
  }
}
```

**[VALIDATED — D-34] Example of combined constraints:** the proposed `composition` structure was accepted:

```json
{
  "temporal": {
    "time_zone": "Europe/Paris",
    "requirements": [
      {
        "id": "R1",
        "target": "satisfaction",
        "mode": "continuous",
        "window": {
          "start": "2026-11-15T08:00:00+01:00",
          "end": "2026-11-15T12:00:00+01:00"
        }
      },
      {
        "id": "R2",
        "target": "satisfaction",
        "mode": "cumulative",
        "window": {
          "start": "2026-11-15T08:00:00+01:00",
          "end": "2026-11-15T18:00:00+01:00"
        },
        "min_duration": "PT8H"
      }
    ],
    "composition": {
      "operator": "all",
      "requirements": ["R1", "R2"]
    },
    "estimates": []
  }
}
```

In this example, a ten-minute interruption between 08:00 and 12:00 breaches `R1`, regardless of whether the eight-hour cumulative minimum of `R2` is met. The combination is **unsatisfied** if `R1` is unsatisfied. The `composition` field is optional: its absence means an implicit conjunction of recorded requirements. The distinction between **requirements as part of an Object's versioned Definition** and **evaluated time-indexed Scenario outcomes** remains mandatory.

### 3.2.2 Distinct NEED evaluations: effective satisfaction and temporal compliance

**[VALIDATED — November 15, 2026; D-35]** For each relevant NEED and Scenario, distinguish two **separately evaluated** questions:

1. **Effective satisfaction**: is the NEED's required material, functional, conceptual or other state **actually present** at the times considered, regardless of whether an exception authorizes non-compliance with a time requirement?
2. **Temporal compliance**: does the Scenario meet the **applicable temporal requirements**, taking into account only those **exceptions that have been explicitly authorized, justified, scoped and versioned**?

**[VALIDATED]** An exception modifies which **temporal requirements apply for compliance assessment**, not the factual/simulated state of the Object, its consequences or the existence/identity of the NEED itself. In particular, a compliant Scenario can include an interval during which effective satisfaction is **unsatisfied**; never silently relabel that interval as effectively satisfied. An authorized exception is **not** evidence that an interrupted supply, pollution, or other adverse effect did not occur. This holds for NEEDs of the Main Subject and affected Objects of its Environment.

**[VALIDATED]** Each evaluation uses the existing three **analytical** statuses (`satisfied`, `unsatisfied`, `indeterminate`), with its own evidence and uncertainty as appropriate. Versioned Object Definitions record temporal constraints; **Scenario-specific evaluation** records effective satisfaction, temporal compliance and the IDs of exceptions actually applied. A temporal constraint inconsistency remains a separate Definition diagnostic, not a fourth intrinsic NEED state. Effective satisfaction and temporal compliance must never be collapsed into one status.

**[VALIDATED — November 16, 2026] Partial satisfaction of a NEED.** A NEED may be **partially satisfied**, but its **degree of satisfaction is quantified only when a pertinent and justifiable measure is available**. Preserve the existing analytical statuses (`satisfied`, `unsatisfied`, `indeterminate`); a partial degree is optional additional information, not an automatic fourth status. A partial degree of satisfaction is distinct from uncertainty or the probability that a NEED is satisfied. Distinguish partial satisfaction of the NEED itself from partial satisfaction of its conditions: the latter does not necessarily entail the former. Some NEEDs may be assessed only discretely. A general numerical scale, aggregation procedure, field names, and validation rules remain **OPEN**; a suggested `degree` field is illustrative, **not an approved JSON Schema**.

Example of the **approved working Scenario evaluation structure**; these illustrative outcomes are **established only within the stated hypothetical model**:

```json
{
  "scenario_id": "S-001",
  "need_id": "N-001",
  "evaluation": {
    "effective_satisfaction": {
      "status": "unsatisfied",
      "violations": [
        {
          "start": "2026-11-15T09:00:00+01:00",
          "end": "2026-11-15T09:20:00+01:00"
        }
      ]
    },
    "temporal_compliance": {
      "status": "satisfied",
      "applied_exceptions": ["EX-001"]
    },
    "evidence": "established_in_model"
  }
}
```

**[OPEN]** A full machine-validatable Scenario evaluation schema; distinct provenance and epistemic uncertainty for each sub-assessment; how to evaluate effective satisfaction when the NEED's required state itself evolves; incomplete observation intervals; authorized exception provenance/authority, validity and conflict checks; cross-Object impacts and empirical testing. A status of `satisfied` in `temporal_compliance` must be read as **conformity**, not actual fulfillment during exempt intervals.

**[SCOPE / OPEN]** These examples document the **approved format**, not a final JSON Schema or a complete run-time model. In particular: robust definitions for recurring schedules and their exceptions, relative event references, time-zone daylight-saving transitions, recursive/nested `composition` representation and validation, consistency-check algorithms, ambiguous boundaries, provenance and uncertainty of estimates, cross-Scenario evaluation links, and within-action monitoring resolution remain to be designed/tested. `temporal` does not by itself establish CAN actionability or positive Power.

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

**[UPDATED D-82]** The standalone 'attributable CAN' category has now been explicitly retired by the author (T-01-K); attribution as an analytical operation and its justification remain mandatory. The practical inventory now selects CANs at contextually relevant granularity. Existing constitutive-foundation principles and three earlier tests remain **OPEN** research hypotheses, not a new mandatory status or definitive criteria:

- **A — Present foundation**: identify constitutive properties at T without assuming a necessary future transformation.
- **B — Discriminating contribution**: verify that the foundation is sufficiently specific to the Actualization to avoid attribution of every CAN to every Object.
- **C — Individualized attribution**: distinguish collective Object CANs from individual contributions without automatic transfer.

**OPEN after D-82:** Operational threshold of relevant constitutive contribution; boundary between constitution and action conditions; evidence, uncertainty, and inter-analyst reproducibility; differentiated CAN identification criteria by Object type. The separate 'attributable CAN' category is **retired** (T-01-K). Contextual granularity is validated, but operational selection rules remain to be tested.

## 3.5 Validated operational identification principles T-01-A–M (D-82)

**Status: author-validated methodological principles (November 16, 2026; D-82).** The French formulations below are the approved text. B, H and J reproduce the subsequently approved revised versions, not the superseded originals. These criteria guide identification and qualification; they do not alter D-18's NEED definition, D-48's definitions of CAN/Potency/Power, the D-31 relation taxonomy, D-50 Object/NEED/CAN identity, or the normative v2 transport schema. T-01 remains **OPEN** for operational, multi-analyst and empirical verification. The terms "established in the model" and "indeterminate" qualify knowledge and must not be conflated with empirical proof or intrinsic Object states.

**Attribution / representation boundary:** an attributed NEED or CAN has its own Object identity and can be represented in an origin-anchored relation; the possessing Object, represented NEED/CAN Object and relation record remain distinct (D-36, D-50, D-75–D-77). A NEED may remain unsatisfied; a CAN may remain non-actionable or not currently actualizable. No candidate correspondence is automatically causal, sufficient or necessary (D-31/D-74).

**Status of classification:** T-01-K retires *attributable CAN* as an autonomous category prospectively; D-27 remains historical. Attribution itself remains required as an analytical operation, including justification and epistemic qualification.

### T-01-A — Identification contextualisée d’un NEED

Un NEED est toujours identifié relativement à un Objet, à un état déterminé et à un contexte explicites. Son attribution nécessite une justification de la relation de nécessité entre sa satisfaction et cet état. La pertinence de l'état déterminé est évaluée séparément de la nécessité du NEED.

### T-01-B — Vérification contextualisée de la nécessité

La nécessité d'un NEED candidat doit être vérifiée relativement à l'Objet, à l'état déterminé et au contexte de l'analyse, en mobilisant les modes de justification appropriés à sa nature.

Pour les nécessités fonctionnelles, l'analyse examine notamment si l'état demeure atteignable ou maintenable sans satisfaction du NEED candidat, en considérant les alternatives pertinentes.

Pour les nécessités constitutives ou conceptuelles, elle examine les relations de définition et d'identité, sans supposer qu'une suppression contrefactuelle puisse préserver l'Objet étudié.

L'analyse distingue les conclusions établies dans le modèle, réfutées dans le contexte ou indéterminées, sans présumer l'exhaustivité des alternatives ni la validité empirique des hypothèses.

### T-01-C — Distinction entre nécessité et moyen de satisfaction

L'identification d'un NEED doit distinguer l'état ou la condition nécessaire à l'Objet des moyens susceptibles d'en assurer la satisfaction.

Un moyen particulier ne peut être qualifié de nécessaire que relativement à un état déterminé, un contexte et des alternatives examinées. Sa nécessité dans un Scénario ne démontre pas sa nécessité dans tous les Scénarios possibles.

### T-01-D — Caractérisation de l’état requis

Un NEED doit être caractérisé par un état requis suffisamment précis pour permettre d'évaluer sa satisfaction.

Cette caractérisation explicite, selon leur pertinence, les propriétés concernées, les exigences qualitatives ou quantitatives, les seuils de satisfaction et les contraintes temporelles.

Les critères retenus doivent être justifiés. Lorsqu'ils sont insuffisamment connus, cette incertitude doit être conservée plutôt que remplacée par des valeurs arbitraires.

### T-01-E — Complétude contextuelle de l’identification

L'identification des NEED d'un Objet constitue un processus contextualisé et potentiellement non exhaustif.

L'analyse doit expliciter le périmètre des Objets et Sujets considérés, les critères ayant guidé leur sélection et les limites de l'identification.

La complétude peut être évaluée relativement à ce périmètre, sans présumer une exhaustivité universelle.

L'absence de NEED identifié ne démontre pas son inexistence.

La découverte de nouveaux NEED ou d'Objets pertinents peut nécessiter une réévaluation des analyses qui en dépendent, sans modifier rétroactivement les faits observés.

### T-01-F — Attribution et interdépendance des NEED

Chaque NEED doit être attribué explicitement à l'Objet auquel il appartient.

Un NEED attribué à un Objet peut constituer une condition nécessaire à l'existence, au maintien, au fonctionnement ou à l'Actualisation d'un autre Objet, sans que cette dépendance entraîne automatiquement une attribution du même NEED à ce dernier.

Les NEED d'un groupe ou d'un système ne doivent pas être assimilés automatiquement à l'ensemble des NEED de leurs constituants, ni inversement.

L'analyse doit identifier les interdépendances pertinentes et préserver la distinction entre les Objets concernés.

### T-01-G — Identification contextualisée d’un CAN

Un CAN est identifié relativement à un Objet, à une Actualisation déterminée et à un contexte explicite.

Son attribution doit être justifiée par des propriétés identifiables de l'Objet qui fondent une possibilité d'Actualisation, y compris lorsque celle-ci dépend d'interventions extérieures.

L'identification d'un CAN est indépendante de la satisfaction actuelle de ses conditions d'Actualisation.

Une Potentialité déjà présente mais non identifiée doit être distinguée d'une Potentialité dont l'émergence nécessite une transformation de l'Objet.

Lorsque les informations disponibles ne permettent pas de déterminer si le CAN est actuellement présent, cette incertitude doit être conservée.

### T-01-H — Fondement discriminant du CAN

L'attribution actuelle d'un CAN exige l'identification de propriétés ou de relations constitutives de l'Objet, dont la pertinence pour l'Actualisation considérée est explicitement justifiée.

Cette justification doit distinguer le fondement actuel de la Potentialité, les interventions extérieures nécessaires à son Actualisation et les transformations constitutives préalables qui feraient éventuellement émerger une autre Potentialité.

Une possibilité générale de transformation future ne constitue pas, à elle seule, un fondement suffisant pour attribuer actuellement le CAN correspondant.

### T-01-I — Attribution des Potentialités collectives

Un CAN peut être attribué à un groupe ou à un système lorsque sa constitution, incluant les propriétés de ses constituants et leurs relations, fonde la possibilité de l'Actualisation considérée.

Les CAN du groupe ou du système ne correspondent pas nécessairement à la simple réunion des CAN individuels de ses constituants.

Inversement, l'attribution d'un CAN à un groupe ou à un système n'implique pas que chacun de ses constituants possède individuellement ce CAN.

L'analyse doit identifier les contributions et interdépendances pertinentes, sans confondre l'existence du CAN collectif avec la satisfaction de ses conditions d'Actualisation.

### T-01-J — Identification et qualification des relations NEED–CAN

L'analyse identifie les relations candidates entre NEED et CAN, les Objets concernés, leur contexte, leurs mécanismes supposés et leur qualification épistémique.

La correspondance est distinguée de la contribution causale, de la suffisance conditionnelle et de la nécessité relative à un Scénario. Ces dernières exigent des vérifications propres, sans être déduites de la seule identification.

L'analyse conserve également les relations inhibitrices ou les effets défavorables pertinents, sans les assimiler à des contributions favorables.

Les conclusions doivent rester relatives aux Scénarios, aux conditions et aux connaissances disponibles, en séparant validité interne du modèle et justification empirique.

### T-01-K — Attribution sans statut supplémentaire

L'attribution d'un CAN à un Objet constitue une opération d'identification fondée sur sa constitution actuelle, l'Actualisation envisagée et le contexte d'analyse.

Elle ne nécessite pas de catégorie autonome « attributable CAN ».

Lorsque cette attribution est incertaine, l'analyse doit conserver les justifications, informations manquantes et qualifications épistémiques pertinentes.

L'attribution d'un CAN reste distincte de son actualisabilité et de son Actualisation effective.

### T-01-L — Pertinence du périmètre de contextualisation

La contextualisation doit justifier la sélection des Objets, Sujets, états déterminés et relations considérés comme pertinents pour l'analyse.

La pertinence du périmètre doit être examinée indépendamment de la complétude des NEED identifiés à l'intérieur de celui-ci.

Lorsqu'un Objet ou Sujet initialement exclu pourrait modifier significativement l'identification des NEED, leurs conditions de satisfaction ou les conclusions de l'analyse, cette exclusion doit être réexaminée.

La contextualisation demeure révisable. Toute extension pertinente entraîne une réévaluation des conclusions concernées, sans modifier rétroactivement les faits observés.

### T-01-M — Non-compensation des exigences indispensables

Lorsqu'un NEED dépend de plusieurs exigences, l'analyse doit distinguer leur importance relative de leur caractère nécessaire.

Une pondération ou une agrégation des degrés de satisfaction ne peut pas, à elle seule, établir la satisfaction globale d'un NEED lorsque certaines exigences sont indispensables.

Les exigences conjointement nécessaires doivent être vérifiées selon leurs conditions propres, indépendamment des indicateurs agrégés.

Lorsqu'une exigence indispensable est insatisfaite ou indéterminée, cette information doit être conservée explicitement dans l'évaluation globale.

**Tests and limits:** Synthetic, hand-authored discriminating cases and v2-projection checks are maintained at [tests/cases/t01-identification-v1.json](../tests/cases/t01-identification-v1.json), with executable tests in [tests/test_t01_identification.py](../tests/test_t01_identification.py). Passing these checks shows only stated structural/invariant properties, not correctness of causal assertions or inter-analyst reproducibility. T-01's closure criteria in [TODO.md](../TODO.md) remain in force.

## 3.6 Immutable conceptual identification and contextual attribution (D-83)

**[VALIDATED BY AUTHOR — conceptual principles]**

- A NEED and a CAN are Objects with distinct identities; a CAN can have its own NEEDs. **Identification** of an Object as NEED or CAN is independent of any **attribution** to another Object.
- The conceptual identities NEED and CAN are **mutually exclusive and immutable for one Object ID**: contextual changes do not turn the same Object from NEED into CAN or vice versa.
- Until the identification is sufficiently justified, it is an **hypothesis recorded and epistemically qualified in claims and assessments**, not a definitive NEED/CAN identity. This is uncertainty concerning an assertion, not a new kind of NEED/CAN.
- Attribution is a separate, context-dependent relation: an identified CAN does **not** automatically belong to the Puissance of a given bearer Object. The present constitutive grounding of the CAN's attribution must be justified independently of the satisfaction of its NEEDs, actionability, Power and Actualization (T-01-G/H/K).
- The Puissance of an Object contains the CANs whose attribution is established within the relevant model/context. Hypothetical, refuted or indeterminate attributions must not silently enter that inventory.
- Requalification between NEED and CAN requires a new Object ID with historical traceability and reassessment of affected analyses. Distinguish correcting mistaken *knowledge* from transforming the Object; normal changes of its Definition, NEEDs and relations do not alter its immutable conceptual identity.

**[IMPLEMENTATION — versioned exchange profile]** `schemas/global-model.md` describes how v2 transport may express an immutable `concept_kind` on an Object and an independent contextual attribution assessment on a relation. In pre-extension documents, the absence of these annotations must not be taken as proof of an established attribution. The established/rejected/indeterminate determination and any cross-document requalification history require semantic checks separate from JSON Schema.

**[OPEN]** Operational identification criteria, evidence sufficiency thresholds, semantic engine, cross-analysis identity registry, full historical migration and blind/empirical tests. T-01/T-02/T-24/T-27/T-30 remain open.

## 3.7 CAN affiliation: specialization and composition (D-84)

**[VALIDATED BY AUTHOR — conceptual principles, November 17, 2026]**

A CAN (Potentialité) can have **child CANs**. The parent–child relation supports two distinct meanings:

- **Specialization**: a child CAN expresses a more specific Potentiality within a more general parent CAN (e.g. programming → programming in Python).
- **Composition**: a parent CAN expresses a complex Potentiality involving several child CANs (e.g. developing an application → interface design, programming and testing); the actual combination may involve indispensable, alternative, complementary or otherwise context-dependent contributions.

Each parent/child CAN remains an **independently identified Object**, with its own Definition, possible NEEDs and possible child CANs. One CAN may have **multiple affiliated parents**; the structure is therefore potentially a graph rather than a rooted tree.

**Independent inferences and safeguards:** affiliation alone does not establish that (i) the child is necessary or sufficient to actualize the parent, (ii) the parent and child are both attributable to a Subject, (iii) all children are possessed when a parent is possessed, or (iv) any NEED is satisfied or Actualization performed. An implication from possession of a specialized CAN to possession of a more general CAN may be demonstrated from explicit Definitions, **not automatically** from the affiliation edge. Distinguish CAN conceptual affiliation from both NEED prerequisites and contextual attribution (D-83).

**[MODEL BOUNDARY]** The existing `Object.parent_id` and other child lineage fields represent historical branching/lineage, **not** conceptual CAN child affiliation. The exchange profile `2.2.0` now represents versioned, separately typed CAN affiliations with multiple parents, and scoped structural and referential tests; complete specialization/composition inference and validation have **not** been implemented or demonstrated. Graph cycles, exact composition inference and interaction with D-36–D-38 relation records remain **OPEN**; this validated principle alone does not establish empirical or causal correctness.

# 4. NEED–CAN relations and dependencies

## 4.1 Relational principles

**[VALIDATED — REPRESENTATION UPDATED D-36–D-37]**
- NEEDs and CANs are attributed via **origin-anchored, typed relational records** connecting one or several Objects; their relevant relations can be **intra-Object** or **inter-Object**, and reciprocal dependencies are possible. The record's new structured `relation` field separates the origin relationship, each Object link's role, and the logical combination of linked Objects.
- A NEED of Object A may correspond to a CAN of A or of another Object B.
- A CAN of A may correspond to a NEED of A or B.
- A NEED that must be satisfied for an Actualization relevant to **Object B** may be a NEED attributed to **Object A in B's Environment**. The owner of a NEED need not be the Object whose Actualization depends on it.
- The existence of a possible NEED–CAN match does not prove that the CAN is **actionable**, that a NEED is actually satisfied, that overall Power is positive, or that an Actualization will succeed.
- **[VALIDATED, November 15]** Where multiple CANs may satisfy one NEED, or one CAN contributes to multiple NEEDs, create and compare relevant Scenarios. When A's NEED is involved in B's Actualization, evaluate consequences for both and other affected Objects.

**[VALIDATED — November 15, 2026; T-16]** For a **non-satisfied NEED**, compare it with relevant **CANs of the focal Subject and Objects in its Environment**. Identify potential **correspondences** and **complementarities** for generating candidate Resolution Scenarios. Distinguish:
- **Alternative CANs**: different CANs may be candidate paths for the same NEED, without presuming they are each sufficient.
- **Complementary CANs**: satisfaction of a NEED may require the coordinated or sequential contribution of multiple CANs.
- **[VALIDATED distinction, November 15, 2026] Three cases must be represented separately** when constructing candidate Scenarios:
  1. **Single-CAN satisfaction path**: one CAN is assessed as sufficient **under specified conditions** to satisfy the focal NEED through an envisaged Actualization; neither correspondence nor actionability alone proves the NEED will actually be satisfied.
  2. **Joint-CAN satisfaction path**: two or more CANs must contribute **together** (possibly in sequence, in parallel or conditionally) to satisfy the focal NEED; evaluating only one CAN as an isolated path would be incomplete.
  3. **Enabling-CAN dependency**: a CAN does **not directly satisfy** the focal NEED, but can help meet a missing action condition of another CAN that may contribute to its satisfaction. This dependency is examined recursively and the missing condition remains documented until resolved.
- **[FORMALIZATION]** These three cases classify the **role of CANs in a particular Scenario/pathway**, not three mutually exclusive permanent types of CAN. One CAN may play different roles for different NEEDs or contexts; composite Scenarios may combine enabling and joint-satisfaction dependencies. The exact sufficiency and causal-evidence tests remain **OPEN**.
- **Correspondence**: a CAN appears relevant to a NEED; this does **not** yet establish that its action conditions are met or that the NEED will be satisfied.
- **Complementarity**: one or more NEED–CAN relations support constructing a candidate pathway; the necessary conditions must still be examined.
- **Evaluated Scenario**: a candidate pathway whose conditions, dependencies, consequences and uncertainty have been examined; 'evaluated' does **not** mean feasible, successful or actualized.

A candidate CAN is **not excluded merely because it is not currently actionable**. Retain it as a conditional candidate and **document the missing action conditions**; these may themselves require other NEEDs to be satisfied and other CANs to be considered. NEED satisfaction may also result from an **already existing state**, without an identifiable CAN Actualization.

### 4.1.1 Correspondence, contribution, sufficiency and necessity

**[VALIDATED — November 15, 2026; D-31]** Four distinct, context-sensitive NEED–CAN relations must be kept separate:

1. **Correspondence:** a CAN has a relevant and explainable relationship to the NEED under consideration. This establishes a **candidate match**, not a demonstrated causal effect.
2. **Contribution:** Actualization of the CAN can **favorably modify** the conditions of satisfaction of that NEED, under identified assumptions. A contribution need not be sufficient or necessary.
3. **Conditional sufficiency:** a CAN, or an identified set of CANs, is **sufficient for satisfying a NEED when its envisaged Actualization permits the required NEED state to be reached in an explicitly specified context and under explicitly specified conditions**. Conditional sufficiency is **not** a claim that the CAN is presently actionable, that Power is positive, or that an Actualization has occurred.
4. **Scenario-relative necessity:** a CAN is **necessary for a particular Scenario** if, in its absence, that Scenario cannot satisfy the NEED in question. Do not silently replace the removed CAN with a new alternative while conducting this test; explicitly model a different Scenario instead.

**[VALIDATED]** Distinguish necessity **within a specified Scenario** from necessity **across all identified relevant Scenarios**. An Object/CAN may be necessary in one Scenario and dispensable in another. Necessity across the currently identified paths is **not** absolute necessity across all possible unknown paths. This is not a statement about whether the CAN is intrinsically necessary for the Object's existence.

**[VALIDATED]** For verifying a NEED–CAN relationship, document and inspect five questions:
1. Is there an explainable **correspondence**, including the supposed mechanism, rather than merely linguistic similarity?
2. Could the CAN **contribute causally** to satisfaction? Compare states **with and without its envisaged Actualization**, holding the other relevant assumptions explicit.
3. Is this CAN, or the considered combination, **conditionally sufficient** for the target NEED state under specified conditions, period and context?
4. Is this CAN **necessary to the specified Scenario**? Re-evaluate the same pathway without it, instead of silently substituting another CAN.
5. Is the CAN **actionable** in the specified role? Record satisfied, missing and uncertain action conditions; investigate unresolved dependencies recursively.

The **actionability check** does not replace the sufficiency/necessity checks: the first concerns undertaking the action; the others concern satisfaction of the specified NEED.

**[VALIDATED analytical representation]** Alternative Scenario pathways can be represented by logical **OR**; CANs jointly required by a Scenario can be represented by **AND**; an enabling CAN can be represented as a **dependency supplying an action condition** of another CAN. These operators express candidate pathway relations, **not** proof of empirical outcomes. Timing, changing Definitions, non-monotone effects and interactions must also be considered.

**[VALIDATED epistemic qualifications]** Record a defensible evidential qualification of an assessed relation:
- **Established within the considered model**: follows under the model's explicit assumptions; not necessarily empirically established.
- **Plausible**: a relevant mechanism has been identified, but supporting evidence is insufficient for a conclusion.
- **Refuted in the considered context**: evidence contradicts the proposed relation in that context.
- **Indeterminate**: the available evidence does not permit a conclusion.

These labels describe **the analyst's state of knowledge about the relation**, not intrinsic NEED/CAN states. Use statistical probabilities only with justified evidence and calibration; avoid implying numeric certainty from these qualitative labels.

**[OPEN]** Exact causal and counterfactual evidence standards; modeling joint and alternative sufficiency; limits of same-Scenario removal tests when non-monotone effects occur; uncertainty calibration; computational criteria for minimal sets and OR/AND/dependency graphs; duplicate-path detection, recursion limits and independent reproducibility.


## 4.2 Action conditions, NEED satisfaction and Power

**[D-40 VALIDATED STRUCTURAL CLARIFICATION]** Action/satisfaction/applicability **conditions have identifiable versioned Definitions**, while their **satisfied/unsatisfied/indeterminate status is a Scenario- and time-indexed evaluation derived from relevant Object states**. Distinguish any trigger/event, ensuing Object state or Definition change, and the subsequent reevaluation. Conditions are identified by owning NEED/CAN record plus local condition ID and version context; see §2.1.6. An example JSON representation is PROVISIONAL, not a finalized schema.


**[VALIDATED current terminology, November 15; D-20–D-21 retained historically]**
- **Action condition:** the relevant CAN must be **actionable**, meaning its conditions of action are fulfilled for the specified role or contribution.
- **Satisfaction condition:** a relevant NEED must actually be satisfied when its satisfaction is required to undertake the considered Actualization.
- A NEED–CAN correspondence does not itself prove actionability, NEED satisfaction, positive Power or actual success.
- The Method distinguishes **actionability for a given contribution/relationship** from whether the **complete sufficient pathway for the considered Actualization** has all its Conditions of Power satisfied.
- The formerly distinct label **mobilizable CAN** is not maintained as a separate CAN category. Earlier D-20/D-21 statements about mobilizability remain in the historical decision record; they must be interpreted under this later terminology, not silently deleted.

**[VALIDATED — November 15]** A candidate CAN with unmet action conditions can be included in a **conditional Resolution Scenario**, provided the unmet conditions are explicitly documented; identifying the CAN alone does not make it actionable or prove Power positive. **[FORMALIZATION / OPEN under T-02]** Precisely delimit the action conditions of a CAN from a sufficient pathway for an identified Actualization. An actionable CAN in one relationship must **not** automatically settle Power for a broader Actualization with other necessary conditions. Conversely, when 'actionable' and 'positive Power' refer to exactly the **same** full set of action conditions, they may be operationally equivalent; whether this occurs and how it should be expressed must be explicitly tested, not assumed.

Keep analytically separate: CAN identification; NEED–CAN correspondence; actionability in the specified role; actual NEED satisfaction; assessment of complete Power; effective Actualization; observed and causally attributed effects. Unknown evidence is not proof of nonexistence.

## 4.3 Circular dependencies

**[VALIDATED]** If two Objects exhibit a circular NEED–CAN dependency, the Method should **seek a third Object** able to satisfy a NEED of either of the initial two Objects, potentially breaking the cycle.

Finding a third Object does not by itself establish that its CAN is actionable, that the NEED has become satisfied, or that the circular dependency has been resolved. **[FORMALIZATION consistent with adopted distinctions]**

**OPEN:** Cases where no suitable third Object is found; indirect or longer cycles involving more than two Objects; what counts as a resolved dependency; potential cascades and alternative paths.

# 5. Power and Actualization

## 5.1 Power as a comparative analytical operation

**[VALIDATED — November 16, 2026; D-64] Integrated PowerEvaluation model.** The author validated the **coherent conceptual data model of `PowerEvaluation` as a whole**, consolidating D-52–D-63 (in particular D-57's six top-level fields, D-58–D-60 revision history, and D-61/D-62/D-63's Focus-specific `Results` structures), following a linked synthetic NEED/CAN/Scenario test exercise. The integrated model is documented in [`reference/power-evaluation.md`](power-evaluation.md), a scoped companion to this canonical working reference. The tested, versioned fixture and verification cases are in [`tests/cases/power_evaluation.json`](../tests/cases/power_evaluation.json) and [`tests/test_power_evaluation.py`](../tests/test_power_evaluation.py).

**[VALIDATED meaning / OPEN detail]** The **model architecture, semantic distinctions, and named structural layers** are now approved for use in `dev`; this is **not** a blanket approval of all provisional nested JSON attributes, exact types, mandatory/optional fields, a complete JSON Schema, a Power calculation engine, causal outcome predictions or scientific validation. Earlier OPEN annotations in this section about whether the **whole conceptual structure** is approved should be read as **partly resolved by D-64**, while explicitly unresolved representation/algorithm questions remain OPEN. The latest synthetic baseline ran **35/35 unit tests** in the [GitHub Actions execution 43823308169](https://github.com/Nirgalz/trialectic/actions/runs/43823308169) on November 16, 2026; this checks specified fixture invariants rather than general model correctness.


**[VALIDATED — November 16, 2026; D-65] Two-level PowerEvaluation validation.** Distinguish **(1) structural validity**, which a strict JSON Schema checks against the validated six-field architecture, Focus-specific `Results` and eventually specified local field constraints, from **(2) semantic validity**, which an additional validator checks against referenced Objects, evaluation/Scenario identities, Definition versions, contextual compatibility, analytical dependencies, provenance/revision history, and the supported interpretation of Results, evidence and uncertainties. **Passing the structural schema is not proof of the assessment's semantic correctness**. Semantic checks may return a missing-information/indeterminate outcome; they do not by themselves establish empirical truth or scientifically validate the Method. The [integrated companion specification](power-evaluation.md#4-two-complementary-validation-levels-d-65) describes the distinction.

**[OPEN]** The chosen JSON Schema dialect, precise nested serialization, structural constraints, semantic-check algorithms, return statuses and error formats, external-reference resolution, test oracles and implementation remain to be defined and approved; D-65 validates the **separation of responsibilities**, not those details.

**[VALIDATED — November 16, 2026; D-66] Strict JSON Schema foundations.** The structural validation of `PowerEvaluation` shall use **JSON Schema Draft 2020-12**, enforce **exactly** the six D-57/D-64 top-level fields (`ID`, `Subject`, `Focus`, `Context`, `Dependencies`, `Results`), **reject undeclared additional top-level properties**, and condition the `Results` structure on the selected NEED, CAN or Resolution Scenario Focus (D-61–D-63). The separate semantic validator remains responsible for cross-evaluation reference identity, contextual/Definition-version consistency and revision/dependency coherence (D-65). The [companion D-66 specification](power-evaluation.md#5-strict-json-schema-foundations-d-66) documents these boundaries. **[OPEN]** Detailed subfield types, exact `Focus` discriminator representation, required/optional nested fields, nullability, format conventions, nested additional-properties rules, and runnable schema/test design remain to be approved; no finished JSON Schema is implied.

**[VALIDATED — November 16, 2026; D-67] Focus discriminator and identifier references.** In the `PowerEvaluation.Focus` field, the `type` property is **mandatory** and takes exactly one of the **case-sensitive** values `NEED`, `CAN` or `Scenario`. A NEED or CAN Focus requires an `object_id` pointing to the corresponding NEED/CAN Object; a Scenario Focus requires a `scenario_id` pointing to the Resolution Scenario. The mismatched identifier type cannot replace the required identifier; contradictory identifier combinations are rejected. This representation selects the compatible D-61–D-63 `Results` shape under JSON Schema Draft 2020-12 (D-66). Target existence, type compatibility in the Object repository, contextual matching and relevant Definition versions are **semantic** checks under D-65. **[OPEN]** Identifier syntax, further Focus metadata, and the remaining nested JSON Schema rules. See [D-67 in the integrated model](power-evaluation.md#51-strict-focus-serialization-d-67).

**[VALIDATED — November 16, 2026; D-68] Subject, Context and Dependencies serialization.** Under the Draft 2020-12 structural contract (D-66–D-67), `Subject` is a required object with a required nonempty-string `object_id`; `Context` is a required object with a required **nonempty map** `definition_versions` from nonempty Object identifiers to nonempty Definition-version strings; `Context.scenario_id` is **optional** and must be a nonempty string when present; `Context.provenance` is **optional**, but when present must be an object whose optional `revises` is a nonempty string. **D-60 requires `Context.provenance.revises` whenever this is a genuine revision**, detected through the separate semantic validator. `Dependencies` is a required **array**, possibly empty, of objects each with a required nonempty-string `evaluation_id` referencing an **analytical** evaluation, not a conceptual NEED/CAN relationship. The structural schema can enforce the stated local shapes; identity, completeness, compatibility, historical and cross-reference requirements remain **semantic** checks (D-65). No universal temporal serialization, compulsory Scenario, additional-metadata closure, or identifier naming pattern is adopted. The [integrated model documents D-68](power-evaluation.md#52-subject-context-and-dependencies-serialization-d-68). Detailed `Results` serialization and a complete strict schema remain **OPEN**.

**[VALIDATED — November 16, 2026; D-69] NEED effective satisfaction field contract.** In a NEED-focused `PowerEvaluation`, `Results.effective_satisfaction` is a required **object** with mandatory `status` (exactly `satisfied`, `unsatisfied` or `indeterminate`) and `justification` (nonempty string). The optional `degree`, when present, is an object containing required `value` (number), `measure` (nonempty string) and `basis` (nonempty string); it is not a universally bounded scale, a probability or automatically inferred from condition satisfaction. Optional `evidence` is an array of nonempty string references (possibly empty), and optional `uncertainty` is an object whose internal schema remains OPEN. The justification is required even for `indeterminate`; an absent `uncertainty` field is not proof of certainty. Partial NEED satisfaction is compatible with the existing status vocabulary and is not a fourth status (D-49). Effective satisfaction remains separate from temporal compliance (D-35), and no causal/evidential adequacy follows from structural validity (D-65). See the [D-69 specification](power-evaluation.md#53-need-effective-satisfaction-serialization-d-69).

**[VALIDATED — November 16, 2026; D-70] NEED temporal compliance field contract.** In a NEED-focused `PowerEvaluation`, `Results.temporal_compliance` is a required object with **`applicability`** (required enum `applicable`, `not_applicable`, `indeterminate`) and **`justification`** (required nonempty string). Its **`status`** uses the existing three-valued compliance vocabulary (`satisfied`, `unsatisfied`, `indeterminate`): it is **required** if applicability is `applicable`; **absent** if `not_applicable`; and **optional but restricted to `indeterminate`** if applicability itself is `indeterminate`. Non-applicability is **not** a fourth compliance status. Optional `applied_exceptions` and `evidence` are arrays of nonempty reference strings (possibly empty); optional `uncertainty` is an object with detailed fields still OPEN. Local JSON Schema validates these field types/conditionals, while the D-65 semantic validator must verify that an applied exception was explicitly authorized, justified, properly versioned and time-/constraint-scoped, and that assessed requirements are truly applicable. Preserve D-35: `temporal_compliance.status: satisfied` under a valid exception **does not** turn effective NEED dissatisfaction into satisfaction or erase observed/simulated interruptions. Keep D-33/D-34 requirement modes and compositions in versioned NEED Definitions rather than duplicating them in the result; references to individual assessments, intervals and exception-record serialization remain OPEN. See [D-70 companion specification](power-evaluation.md#54-need-temporal-compliance-serialization-d-70).

**[VALIDATED — November 16, 2026; D-71] NEED candidate CAN search and inventory contract.** In a NEED-focused `PowerEvaluation`, `Results.candidate_cans` is a required object containing: mandatory `identified` (possibly empty array of candidate objects, each with required nonempty-string `object_id` and `justification`, optional evidence-reference string array), `search_status` (exactly `not_searched` or `searched`), `coverage` (exactly `complete`, `incomplete`, `indeterminate`), `scope` (required nonempty string) and `justification` (required nonempty string), with optional `evidence` array of nonempty references and optional `uncertainty` object. A record with no search must not claim `complete` coverage; `complete` following a search still requires semantic evidence for *scoped*, not universal, exhaustiveness. A zero-candidate inventory does not prove impossibility. Per D-31, a candidate **correspondence** does not establish contribution, sufficiency, necessity, actionability/Power or actualization; candidates may belong to the Subject or the Environment. The separate D-65 semantic validator resolves references, source integrity and coverage justification, and D-54 determines compatibility of later evaluation reuse. Additional metadata, coverage algorithms, evidence and uncertainty internals remain OPEN. See [D-71 companion specification](power-evaluation.md#55-need-candidate-can-inventory-serialization-d-71). With D-69/D-70, this establishes the **minimum nested NEED Results schema**, not a complete PowerEvaluation schema or evaluation engine.

**[VALIDATED — November 16, 2026; D-72] CAN actualizability field contract.** A CAN-focused `PowerEvaluation.Results.actualizability` is a required object with mandatory `status` (one of the four case-sensitive D-51 values `actualizable`, `partially_actualizable`, `not_actualizable`, `indeterminate`) and `justification` (nonempty string even for `indeterminate`); optional `degree` is an object with required `value` (number), `measure` (nonempty string) and `basis` (nonempty string); optional `evidence` is an array of nonempty reference strings (possibly empty); and optional `uncertainty` is an object with detailed schema still OPEN. A partial CAN Actualization may be assessed **without** a numeric degree. A degree is justified only for an appropriate measure and is **not** universally bounded, equal to success probability, inferred from weighted prerequisite NEED satisfaction or proof of effective Actualization. The status is **contextual to the contemplated Actualization**; the stable schema for referring to that precise contemplated Actualization, thresholds, partiality criteria, temporal horizon and evidence/uncertainty semantics remain OPEN. Keep `prerequisites`, `potential_contributions`, and actual simulated/observed events distinct. See [D-72 companion specification](power-evaluation.md#56-can-actualizability-serialization-d-72).

**[VALIDATED — November 16, 2026; D-73] CAN prerequisites structure and distinct coverage.** For a CAN-focused `PowerEvaluation`, `Results.prerequisites` is a required object with four required, possibly empty arrays: `needs`, `cans`, `conditions`, `pathways`. `needs[]` and `cans[]` require nonempty `object_id` with optional nonempty `evaluation_id` linked through enclosing analytical `Dependencies` when used (D-53/D-54); `conditions[]` require nonempty `owner_relation_id` and `condition_id`, with optional three-state `status` (`satisfied`/`unsatisfied`/`indeterminate`) referring to a distinct contextual evaluation; `pathways[]` require nonempty `pathway_id`, `definition_version`, and `coverage` (`complete`/`incomplete`/`indeterminate`). The required `inventory_coverage` uses those same three values for the **inventory of relevant pathways**, a distinct scope from each pathway's completeness of **its conditions** (D-41). Required `scope` and `justification` are nonempty strings; optional `evidence` is an array of nonempty references and optional `uncertainty` is an object. The arrays are **inventories, not an implicit conjunction** and may be empty without establishing impossibility. `pathways[]` are references to **versioned Definitions**, not a duplicated `all`/`any` logical tree. Reusable recursive expressions (D-42/D-43), condition owner/version resolution and cycles require separately defined validation; a listed prerequisite is not assumed satisfied, causal, necessary across unknown paths or sufficient for Actualization. No observed Actualization or final Power is inferred from this structure. The D-65 semantic validator must assess referents, version/context compatibility and coverage justification. See the [D-73 detailed specification](power-evaluation.md#57-can-prerequisites-serialization-d-73). Further normalization, precise semantics and full CAN/Scenario `Results` remain OPEN.

**[VALIDATED — November 16, 2026; D-74] CAN potential contributions candidate-only contract.** In a CAN-focused `PowerEvaluation`, `Results.potential_contributions` is a required object containing **`needs`** (required, possibly empty array of candidate NEED entries, each requiring nonempty `object_id`, `relationship` exactly `candidate`, and nonempty `justification`, with optional `evidence` array of nonempty references); required **`search_status`** (`not_searched`/`searched`), **`coverage`** (`complete`/`incomplete`/`indeterminate`), **`scope`** and **`justification`** (nonempty strings); optional inventory **`evidence`** (nonempty string-reference array, possibly empty) and **`uncertainty`** (object, internals OPEN). Do not claim `complete` when no search occurred; a `searched`/`complete` claim is relative to the declared scope and must be justified semantically. An empty NEED list is no proof of absence/impossibility. The `candidate` value expresses only a plausible **correspondence** (D-31), not established causal contribution, conditional sufficiency, Scenario-relative necessity, possible/actual CAN Actualization or effective NEED satisfaction. Joint CANs, enabling CANs, indirect chains and adverse effects remain separately traceable in relevant recursive and Scenario analyses, with no automatic inference of direct positive effects. CAN-to-NEED candidate inventory D-74 is complementary to but not automatically symmetric or context-compatible with NEED-to-CAN inventory D-71 (D-54). The D-65 semantic validator checks Object type/existence, relevance, scope and evidence; it is not replaced by local Draft 2020-12 schema. See [D-74 companion specification](power-evaluation.md#58-can-potential-contributions-serialization-d-74). This completes the **minimum typed CAN `Results` shape** alongside D-72/D-73 without establishing the entire final PowerEvaluation contract or causal evaluation engine.

**[VALIDATED — November 16, 2026]** **Power / Pouvoir** is an **analytical operation** comparing (i) the NEEDs of the Object, (ii) the NEEDs of its CANs, and (iii) the NEEDs and CANs of Objects in its Environment. This analysis jointly produces:

1. an evaluation of the possibility of Actualization;
2. identification of satisfied and unsatisfied NEEDs;
3. identification of CANs that may satisfy those NEEDs.

Power is therefore **not defined solely as a positive/negative binary outcome**. It is necessary to distinguish the comparison operation from its outputs, as well as identifying a candidate CAN–NEED match from proving satisfaction or feasible Actualization. Missing information must not be interpreted as negative feasibility. The specific comparison criteria, granularity, handling of unknowns, and outputs for NEED-focused, CAN-focused or Scenario-focused analyses remain **OPEN** under T-02 and T-30.

**[VALIDATED — November 16, 2026] Focus-centered Power assessment.** Each contextual Power evaluation is centered on **one explicitly selected Focus**—a NEED, a CAN, or a Resolution Scenario—and may reference other relevant assessments, including recursively dependent NEEDs/CANs and related Scenarios. Several such evaluations may be grouped to present a broader analysis of the Subject. The group is a way to organize and synthesize evaluations, not a replacement for their independently identified Focus, context, evidence, or results. Preserve versioned Object Definitions separately from time-/Scenario-indexed assessments; evaluating a Focus does not by itself modify an Object's Definition.

**[OPEN, partly resolved by D-57]** The six-field top-level `PowerEvaluation` structure is now validated as a **working structural baseline** (see below), while detailed machine-readable field semantics, assessment ID formats and reference fields, rules for composing/grouping results, caching and invalidation, cross-Focus consistency, cycle handling, and uncertainty propagation remain unapproved. Earlier illustrative `Power`/`PowerEvaluation` JSON examples are not normative schemas.

**[VALIDATED — November 16, 2026; D-57] PowerEvaluation top-level structure.** Use the following **six top-level fields as the shared working structural baseline** for a Focus-centered Power assessment: `ID`, `Subject`, `Focus`, `Context`, `Dependencies`, and `Results`. Their high-level roles are:
- `ID`: identity of the Power evaluation, distinct from Object and relationship-record identities;
- `Subject`: Object at the center of the analysis;
- `Focus`: the selected NEED, CAN or Resolution Scenario;
- `Context`: the circumstances and references required to interpret the assessment, including applicable time/Scenario and relevant Definition versions;
- `Dependencies`: analytical references to assessments used, **not** Object-level conceptual dependency records;
- `Results`: the contextual Power findings, **specialized to the type of Focus**, while maintaining the common top-level architecture.

**[VALIDATED distinction]** NEED-focused results concern NEED satisfaction (including effective satisfaction and applicable temporal compliance), CAN-focused results concern possibilities and degrees of Actualization where justifiable, and Scenario-focused results concern Scenario evaluation/comparison. The examples are focus-sensitive applications of previously adopted principles, not approval of particular nested field names or universal numerical measures. Definitions, assessment results, and Actualization events remain separate, version-aware layers. The approved structure is a **foundation for subsequent specification and testing**, **not a final JSON Schema**.

**[OPEN]** Required versus optional nested fields, exact data types, reference normalization, identity/version semantics, evidence and uncertainty serialization, specialized result schemas, cross-Focus validation, cyclic evaluation implementation, and worked NEED/CAN/Scenario test cases remain to be formalized. Previously shown JSON fragments are illustrative unless separately approved.

**[VALIDATED — November 16, 2026; D-61] NEED-focused PowerEvaluation Results.** For a `PowerEvaluation` whose `Focus` is a NEED, organize `Results` into **three distinct substructures**:
1. **`effective_satisfaction`**: assessment of whether the NEED is effectively satisfied under the stated context, with a **satisfaction degree only where pertinent and justifiable**. Retain the existing analytical satisfaction statuses (`satisfied`, `unsatisfied`, `indeterminate`), and do not impose `partially_satisfied` as a fourth status. A quantitative degree is not an epistemic probability or necessarily a measure of condition satisfaction.
2. **`temporal_compliance`**: a **separate** assessment of the applicable temporal requirements **when relevant**, accounting for explicitly authorized and scoped exceptions without altering effective satisfaction. Keep a compliant Scenario distinct from a NEED being continuously satisfied.
3. **`candidate_cans`**: the CANs identified as potentially contributing, **through their Actualizations or resulting states**, to satisfying the NEED, with the ability to express the **potential incompleteness of the candidate search/inventory**. An empty candidate list does not establish that no CAN exists or that satisfaction is impossible.

Each component must be able to retain **its own evidence, justification and epistemic uncertainties**; these must not be collapsed into an undifferentiated overall status. This is a **validated organization of the nested Results structure**, not an assertion that all three categories always contain observed data or applicable temporal requirements. It does not modify the D-57 six-field top-level architecture, the D-35 distinction between effective satisfaction and temporal compliance, D-49 partial satisfaction, or the D-31 distinction between candidate correspondence and proven contribution/sufficiency.

**[OPEN]** Exact nested keys beyond the three validated substructure names, which values must be populated versus marked not applicable/unknown, field types, status/degree interoperability, time-interval representation, evidence and uncertainty schemas, temporal exception references, candidate-inventory coverage vocabulary, cross-assessment linking and machine-enforced JSON Schema remain to be specified. The full example shown during discussion is **illustrative only**.

**[VALIDATED — November 16, 2026; D-62] CAN-focused PowerEvaluation Results.** For a `PowerEvaluation` whose `Focus` is a CAN, organize `Results` into **three distinct substructures**:
1. **`actualizability`**: assess the **contextual possibility of the contemplated CAN Actualization**, distinguishing `actualizable`, `partially_actualizable`, `not_actualizable`, and `indeterminate`. A quantitative degree is **optional and only justified where a meaningful measure exists**. This degree must not be inferred directly from the weighted satisfaction of prerequisite NEEDs, confused with a probability of success, or equated with effective Actualization.
2. **`prerequisites`**: identify the **NEEDs, CANs and relevant conditions** on which the contemplated Actualization depends, together with their evaluations where available and the incompleteness/uncertainty of the known prerequisites. A listed prerequisite is not necessarily satisfied, and known prerequisites must not be presumed exhaustive.
3. **`potential_contributions`**: identify **NEEDs that the CAN's Actualization or its resulting states might contribute to satisfying**. Candidate contributions must remain distinct from established causal contribution, conditional sufficiency and effective NEED satisfaction. A CAN may contribute to several NEEDs, act jointly with other CANs, or enable another CAN without itself directly satisfying the focal NEED.

Each substructure must be able to retain **its own evidence, justification and uncertainty**, without collapsing them into a single overall confidence or verdict. Consider adverse effects on other Objects in the broader Actualization/Scenario analysis rather than silently interpreting them as favorable NEED contributions. These results are context-bound and use the six-field `PowerEvaluation` baseline of D-57, without replacing the separate Definition, evaluation and effective Actualization layers.

**[OPEN]** Exact nested field names beyond the three validated substructure names, types and requiredness, temporal and Scenario scope, completeness criteria, reference conventions, measurement/threshold semantics, evidence/uncertainty format, treatment of adverse effects and cross-Object interactions in a finalized schema, and executable validation remain to be specified. The JSON example discussed is illustrative, **not a normative JSON Schema**.

**[VALIDATED — November 16, 2026; D-63] Scenario-focused PowerEvaluation Results.** For a `PowerEvaluation` whose `Focus` is a **Resolution Scenario**, organize `Results` into **four distinct substructures**:
1. **`actualization_assessments`**: evaluations/references for the contemplated CAN Actualizations participating in the Scenario, including their relevant ordering, dependencies and conditional relationships **by reference to the Scenario model**. Distinguish contemplated Actualizations from independently identified **simulated or observed Actualization events**; an evaluation is not itself an event.
2. **`scenario_assessment`**: assess **feasibility (and its uncertainty), complexity, costs/resources, temporality and expected effectiveness** as separate relevant dimensions, with no mandatory global score or ranking. Feasibility, difficulty, success probability and consequence probability must not be conflated.
3. **`effects`**: identify anticipated, simulated or observed consequences on the focal Subject, other Environment Objects and their NEEDs, CANs and relations. Preserve **favorable/unfavorable** effects; distinguish **direct/indirect** causal mediation from **immediate/delayed** temporality, and separate **anticipated**, **observed**, and **causally attributed** statuses with defensible evidence. When NEEDs are affected, preserve distinct effective satisfaction versus temporal compliance evaluations. Different Scenario branches and their hypothetical versus effective Actualizations remain isolated.
4. **`comparisons`**: enable contextual comparisons with other relevant Resolution Scenarios, by references where appropriate, without requiring a unique winner or mandatory selection. Separate Scenario generation, evaluation and optional selection; any criteria, contextual weights or scores must be explicit and justified rather than universally imposed.

Each substructure must be able to retain **its own evidence, justifications and uncertainties** without collapsing trade-offs, adverse impacts or unknown effects into one mandatory scalar. Preserve the D-57 **six-field top-level** `PowerEvaluation` structure. A Scenario's own Definition, sequence and branch history are not duplicated or silently rewritten inside the assessment. This is validation of the **organization of Scenario-specific Results**, not of the complete illustrative example or any final machine-readable JSON Schema.

**[OPEN]** Detailed field types and requiredness, contextualized references and version pins, nested effect and comparison models, treatment of non-applicable dimensions, conditions for complete coverage, probability calibration, uncertainty/provenance representations, ordering/event history interfaces, validation tests and final machine-readable JSON Schema remain to be formalized.

**[VALIDATED — November 16, 2026; D-58] Identity and revision history of Power evaluations.** Whenever a new Power evaluation **produces a revised result** relative to an earlier evaluation, assign the new evaluation a **new unique `ID`**, retain the earlier evaluation as an identifiable historical record, and provide an **explicit reference linking the new evaluation to the evaluation it revises**. Do not overwrite the earlier evaluation's original context, findings or historical identity. A revision lineage is distinct from (a) `Dependencies` referring to analytical evaluations used as inputs, and (b) the Parent/Children lineage of Objects. This principle applies irrespective of whether the Focus is a NEED, a CAN or a Resolution Scenario.

**[OPEN]** The name and structure of the revision-reference field, whether additional evidence/justification-only revisions with unchanged substantive results also require a new evaluation `ID`, treatment of parallel revisions and competing assessments, chain resolution, timestamps, persistence and immutable storage guarantees remain to be specified. The validated D-57 top-level structure remains the working baseline; this decision does not finalize its nested schema or create an unapproved seventh top-level field.

**[VALIDATED — November 16, 2026; D-59] Epistemic changes are revisions.** Extend D-58: **any modification of an evaluation's result, justification, or uncertainty** requires creation of a **new Power evaluation with a new unique `ID`**, even if the substantive conclusion or numerical value remains unchanged. Preserve the previous evaluation, its original evidential basis and contextual interpretation, and an explicit link identifying which previous evaluation the new one revises. The resulting evaluation history must therefore trace **epistemic revisions** as well as changes in conclusions. This rule applies to NEED-, CAN- and Scenario-focused evaluations, and does not itself assert any change to the underlying Object Definitions or that a revised assessment is an effective Actualization.

**[OPEN]** The revision-link serialization within the approved D-57 six-field structure, whether and how purely editorial or metadata-only changes should be represented, treatment of parallel revisions and conflicting assessments, storage integrity, and audit representation remain to be formalized. The earlier D-58 open question about revisions limited to justification/uncertainty is **resolved by D-59**; other open questions remain.

**[VALIDATED — November 16, 2026; D-60] Revision provenance within Context.** Preserve the six validated top-level `PowerEvaluation` fields (`ID`, `Subject`, `Focus`, `Context`, `Dependencies`, `Results`). Record **evaluation-revision history** inside **`Context.provenance`**, separate from **`Dependencies`**, which identifies evaluations used as analytical inputs. In a new evaluation that **revises** an earlier evaluation, **`Context.provenance.revises` explicitly references the earlier evaluation's unique ID and is required**. When a Power evaluation is **not a revision**, `revises` is optional/absent: for example, independently evaluating the same CAN under a different Scenario does not automatically create a revision relationship. Revision lineage is different from analytical-dependency references, Object Parent/Children lineage and effective Actualization history. Under D-58–D-59, a revised result, justification or uncertainty creates a new evaluation `ID`, preserving the earlier evaluation's context and history.

**[ILLUSTRATIVE ONLY]** `Context.provenance.revision_reason: "new_evidence"` is a possible explanatory attribute, **not a validated required field or controlled vocabulary**. A concrete representation of the provenance object, uniqueness/referential-integrity checks, temporal distinction between assessment creation and Scenario time, simultaneous revisions and audit metadata remain **OPEN**. This decision **resolves the general placement of the revision link** left open by D-58–D-59 but does not finalize the nested JSON Schema.

**[VALIDATED — November 16, 2026] Conceptual versus analytical dependency.** Distinguish two separate kinds of dependency: **conceptual dependency** connects Objects, NEEDs, and CANs as modeled in their versioned Definitions and relationship records; **analytical dependency** connects a Focus-centered Power evaluation to other evaluations whose results it uses. Analytical reuse must not be mistaken for an Object's constitutive NEED/CAN relationship, and a conceptual dependency need not automatically require a separately persisted Power evaluation. The two layers may refer to each other by explicit version-aware references while retaining independent identities, contexts and uncertainty.

**[HISTORICAL OPEN — superseded in part by D-57 and D-64]** The former five-field illustrative list predates the **validated six-field** `PowerEvaluation` model (including `Subject`). The current architecture is validated; the **machine-enforced JSON Schema**, exact cross-assessment reference types, context compatibility checks, recursive cycle algorithms, caching and invalidation still require formalization and tests.

**[VALIDATED — November 16, 2026] Reusing a Power evaluation.** A previously produced Focus-centered Power evaluation may be reused by another analysis **only after checking at least** (1) the compatibility of the **Focus**, (2) the **context** of the evaluated Actualization (including relevant Scenario and time), (3) the **versions of the relevant Object Definitions**, and (4) the **information available**, including relevant evidence, assumptions and uncertainty. Compatibility must be **demonstrated rather than assumed**. The checks do not automatically require byte-for-byte identity: the criteria for showing that a difference is immaterial remain **OPEN**. Where compatibility cannot be established, do not silently reuse the former conclusion; qualify the result or perform a new evaluation. Preserve the prior evaluation as a historical, context-specific result, rather than overwriting it.

**[OPEN]** Precise compatibility tests, handling of new evidence, dependency-graph invalidation, partial reuse of sub-results, cross-Scenario transfer, time-sensitive changes, cache keys, and machine-readable representation are not yet approved. This validation does **not** adopt the illustrative `PowerEvaluation` JSON fields as a final schema.

**[VALIDATED — November 16, 2026] Selective recursive reevaluation and propagation.** When source data, context, relevant Object Definition(s), or a Power evaluation changes, identify the **analytically dependent evaluations** and examine whether the changed information affects their outputs or justifications. Reevaluate only the affected evaluations; propagate pertinent changes recursively to their dependents until no further relevant reevaluation is required. Changes to the assessment's **satisfaction degree, actualizability, evidence, reasoning, or uncertainty** may all be pertinent: equality of a numerical result alone does not prove that downstream conclusions remain valid. An unaffected evaluation need not be recomputed merely because it shares a Subject or a graph ancestor. Preserve previous evaluations and their context as historical records. Detect circular analytical dependencies and handle them separately rather than recursing indefinitely or assuming that the cycle itself implies impossibility. This is a selective **reassessment** rule, not permission to overwrite conceptual relationships or historical Definitions.

**[OPEN]** Detailed impact predicates, dependency-index representation, scheduler/order, change-significance criteria, termination and convergence rules for cycles, cache invalidation, partial results, and a machine-readable propagation trace remain to be specified and tested. The `PowerEvaluation` JSON example remains provisional.

**[VALIDATED — November 16, 2026] Joint assessment of circular analytical dependencies.** When a cycle is detected **between Power evaluations**, identify and group the mutually dependent evaluations for a **joint contextual assessment** instead of following their references by unbounded recursion. Start from available information that does not depend on the cycle itself, including already observed Object states, satisfied prerequisites, independently evaluable CANs or NEEDs, relevant Environment Objects and temporally prior events. Examine feasible contextual changes or initiating Actualizations in distinct Scenarios as relevant; propagate justified changes among the grouped evaluations and continue until their results stabilize **or** the limits of what can be justified become apparent. If no adequately supported conclusion can be reached, preserve **indeterminate or conditional assessments** rather than labeling the cycle impossible.

**[VALIDATED distinction]** A **cycle in the analytical dependency graph** means evaluations mutually use each other's results. It does **not**, by itself, prove any circular **conceptual dependency or causal mechanism** among the underlying NEEDs, CANs or Objects. A jointly assessed analytical cycle must not be turned into a causal assertion without separately justified evidence. An apparently blocked cycle, an externally initiable cycle, an already active/self-sustaining cycle, and a possibly antagonistic or unstable cycle can require different **Scenario/time-specific** analysis; structural cyclicity alone settles none of these classifications. This extends the prior D-39 / D-42 treatment of model cycles and D-55's selective propagation without replacing them.

**[OPEN]** Formal criteria for cycle grouping, joint evaluation order, convergence and termination, oscillatory or contradictory outcomes, scenario branching, epistemic thresholds, version-aware references and a machine-readable audit trail remain to be designed and tested. No final `PowerEvaluation` schema or complete execution algorithm is approved.

**[VALIDATED — November 16, 2026] Contextual and partial CAN actualizability.** The possibility of Actualization of a CAN is **always evaluated relative to a specified context and envisaged Actualization**. Where relevant, the assessment may distinguish **actualizable**, **partially actualizable**, and **not actualizable**. Partial actualizability means that only part of the contemplated Actualization can be undertaken under the considered conditions. **Quantify the degree of possible Actualization only when a pertinent and justifiable measure is available**; do not impose a numerical percentage for every CAN. Indeterminate assessment remains available when evidence or contextual specification is insufficient, and is not synonymous with non-actualizability.

**[FORMALIZATION / ILLUSTRATION]** A car's CAN to travel 1,000 km may be evaluated using a context-dependent estimated attainable distance relative to that target (battery state, model-specific estimated full-charge range, route and recharge opportunities, etc.). A proportional state-of-charge calculation is only a simplifying hypothesis, not a general physical rule. A zero battery charge does not alone prove non-actualizability if recharge is available within the evaluated context. The degree of CAN actualizability is **not automatically equal** to the weighted satisfaction degree of that CAN's NEED dependencies; it also differs from the actual degree of a CAN's subsequent effective Actualization and from epistemic probability or confidence.

**[OPEN]** Criteria and boundaries for full versus partial actualizability, contextual comparison of alternative pathways, metric selection for non-scalar CANs, condition thresholds, degree aggregation and the eventual machine-readable assessment schema remain to be specified and tested.

**[HISTORICAL — SUPERSEDED AS THE DEFINITION OF POWER]** Earlier versions defined Power as a binary state for each CAN: positive when at least one sufficient pathway of Conditions of Actualization is satisfied, negative otherwise, with indeterminate assessment expressing analyst uncertainty. These distinctions may still be useful as **candidate output indicators** where appropriate, but their status and thresholds under the newly validated operational definition require further examination. In particular, a positive feasibility assessment does not guarantee successful Actualization, and CAN actionability for a particular role must not be silently equated with a complete Scenario assessment.

**[RETAINED DISTINCTIONS]** Statistical uncertainty about conditions, probability of successful Actualization, actual NEED satisfaction, and temporal compliance are separate questions. Alternative pathways can depend on NEEDs and CANs of other Objects; do not assume a complete inventory of alternatives.

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

### 6.1.1 NEED-focused generation and recursive resolution

**[VALIDATED procedural principles — November 15, 2026]** For a selected **non-satisfied NEED**, apply the following candidate-generation operations within the current contextual Environment:

1. **Compare** that NEED with contextually relevant CANs of the focal Subject **and of Objects in its Environment**; retain plausible matches with explicit uncertainty.
2. **Classify distinct NEED–CAN pathway roles**: (i) a single CAN that may suffice for NEED satisfaction under specified conditions, (ii) multiple CANs jointly required for satisfaction, and (iii) an enabling CAN that contributes to another CAN's **actionability** rather than directly satisfying the focal NEED. Keep alternative candidates distinct from jointly required combinations; a CAN can serve multiple roles depending on the Scenario.
3. **Form candidate Scenarios** from relevant NEED–CAN correspondences and complementary combinations, explicitly identifying which conditions are known, satisfied, missing or uncertain.
4. **Inspect the action conditions and relevant NEEDs** of each participating CAN. When a necessary condition is missing, recursively look for other relevant CANs and Objects that could satisfy it or make the CAN actionable, including potential solutions to circular dependencies.
5. **Keep non-actionable CANs as conditional candidates** when they may become actionable through additional steps, and **document their missing conditions**. Never represent a candidate or simulated step as an effective Actualization.
6. **Evaluate** the resulting candidate Scenarios separately: assess actionability, complete Power, possible NEED satisfaction, dependencies, anticipated effects on the focal Subject and Environment Objects, and uncertainties; do not impose a best-Scenario selection.
7. **Reassess** relevant Object Definitions, NEEDs and CANs in each isolated hypothetical branch as anticipated changes are explored, using recursive relevance and complexity limits.

**[VALIDATED role distinction and tests — D-30–D-31]** Distinguish the three pathway cases; assess the related CAN–NEED relationships through **correspondence, contribution, conditional sufficiency and Scenario-relative necessity**. For each candidate Scenario, document the mechanism, compare envisaged states with and without the CAN, specify satisfaction conditions, perform a within-Scenario necessity check, and investigate actionability and missing conditions. Label evidential support as **established within the model**, **plausible**, **refuted in context**, or **indeterminate**, without equating model support with empirical proof. The **OR / AND / enabling-dependency** representation is permitted, but does not by itself handle sequencing or non-monotone effects. **[OPEN implementation]** Actual causal tests, minimal combinations, contextual sufficiency and independent validation remain to be developed.

**[VALIDATED — D-32]** When no known CAN or NEED–CAN relation resolves an unmet NEED or a missing action condition, distinguish **use of known relationships** from **exploratory discovery** of currently unrecorded or uncertain Objects, CANs and relationships. When relevant, the Method may recursively broaden the inspected Object Definitions and Environment, proposing new **hypothetical** relations to be subjected to the previously validated tests of correspondence, contribution, conditional sufficiency, Scenario-relative necessity and actionability. Apply recursive relevance and complexity constraints; the Semantic perspective can suggest candidates without proving causal validity.

**[VALIDATED distinctions]** Explicitly separate:
- **No solution identified**: nothing found in the inspected inventory; this is **not** evidence of impossibility.
- **Hypothetical candidate**: one or more plausible or indeterminate relationships that require further verification.
- **Known candidate pathways assessed infeasible or impossible under specified conditions**: a **context-bound** evaluation, not a universal proof that the NEED cannot be satisfied.

**[VALIDATED temporal consequence]** A Scenario cannot be assessed solely by whether its final state satisfies a NEED if its temporal requirement also demands continuity or an interval of satisfaction. Time-aware evaluation should inspect the relevant transition history, and should not claim continuous compliance if its observation granularity cannot detect a possible within-action violation. **The exact temporal data format is still PROPOSED**.

**[SCOPE / FORMALIZATION]** This is a validated **NEED-focused** generation route, **not** an exclusive rule that every analysis must start from an unsatisfied NEED: the approved Stage-2 Focus can also be a **CAN**, and an already satisfied NEED may warrant maintenance analysis or no intervention. Detailed input/output schema, sufficient-condition tests, stop criteria, and implementation remain **OPEN**.

## 6.2 Scenario evaluation and comparison

**[VALIDATED, consolidated November 15, 2026]** Each relevant Scenario is assessed without assuming it must receive an overall score or be ranked as the best. Analyze at least the following **distinct** dimensions, according to the context:

1. **Feasibility and its uncertainty:** whether Conditions of Actualization can be met, separating this assessment from the difficulty of implementation; where defensible, estimate the **probability that feasibility conditions are met**.
2. **Complexity:** dependencies, implementation difficulty, coordination and analytical burdens, **separately from cost and feasibility**.
3. **Cost and resources:** financial, material, human and other relevant resource costs, not conflated with complexity.
4. **Temporality:** implementation delays, urgency, sequencing, time horizon and persistence of consequences.
5. **Expected effectiveness:** the anticipated improvement or result relative to the focal NEED or CAN, separately from the chance of actual success.
6. **Consequences on Objects:** anticipated favorable and unfavorable, direct and indirect, immediate and delayed effects on the **initial Subject**, other relevant **Objects in its Environment**, their NEEDs, CANs and relations.

**[VALIDATED — D-35]** For each NEED affected by a Scenario, **assess effective satisfaction separately from compliance with applicable temporal requirements**, including authorized exceptions. Record actual/simulated violations and their effects even if temporal compliance is reported as satisfied under an exception. Persist both evaluations and their uncertainty/evidence with the Scenario, not as silent changes to the Object's versioned NEED Definition.

**[VALIDATED uncertainty distinctions]** Keep separate (a) uncertainty about whether a Scenario is **feasible** (its conditions can be met), (b) the **probability of success** if it is undertaken, and (c) the **probability of each anticipated consequence**. Quantitative probabilities are provided **only where statistically justified**; otherwise indicate qualitative uncertainty or degree of possibility, rather than manufacturing numerical precision. These are distinct from binary Power and from uncertainty about whether Power is positive.

Compare internal coherence, robustness, adaptability, complementarities, synergies, competition for resources and risks. Consequences affecting other Objects must not be hidden by an aggregate score or silently offset by gains elsewhere. Optional criteria or weights are **contextual**, not universally prescribed.

**[VALIDATED operational distinction]** Scenario **generation** creates candidate alternatives, **evaluation** explains their consequences and trade-offs, and **selection** (if explicitly desired) applies stated decision criteria. The **default Advanced Mode presents multiple evaluated Scenarios without prescribing a single winner**. Even where a choice is eventually requested, any recommendation is conditional on the declared criteria, not an objectively universal optimum.

**[FORMALIZATION — optional and not mandatory]** A weighted score such as Σ(weight × rating) / Σ(weights), using conventional ratings from 0 to 5, may be explored if an explicit ranking problem warrants it; it is not a probability, objective truth or a required Advanced Mode output. Calibration, double counting, ranking stability, scenario diversity and empirical evaluation remain **OPEN**.

## 6.3 Recursive analytical workflow

**[FORMALIZATION — revised synthesis of the alpha 0.3 protocol and validated Focus sequence; scoped after D-85]** This is a **NEED/CAN-focused example**, not a compulsory complete-process checklist for analyses ending after Understand or Explore. The overarching method phases are defined in §1.1; phase-3 decision deliberation must be explicitly justified if the analyst proceeds that far.

1. Choose and contextualize the **Main Subject** (Object), with its relevant parts, Environment and relationships.
2. Inventory relevant **NEEDs and CANs**, including uncertainty and gaps; choose one **NEED or CAN** as Focus.
3. If the Focus is a CAN, identify its contextually relevant role, granularity and available evidence (former independent 'attributable CAN' terminology is OPEN); if a NEED, identify the required conceptual or functional state and its present satisfaction without presupposing a CAN Actualization.
4. Identify relevant NEED–CAN correspondences, **action** and satisfaction conditions, sufficient pathways, dependencies, and missing information, taking other Objects into account.
5. Assess Power where a particular CAN's Actualization is considered; distinguish **actionability in a specified role** from full sufficient-pathway Power, and distinguish statistical uncertainty about positive Power from success probability.
6. **Generate several relevant and materially distinct** Improving Actualizations, alternative states and Resolution Scenarios when the problem warrants alternatives. For a **non-satisfied NEED Focus**, search for alternative and complementary CANs of the focal Subject and Environment Objects; retain conditionally non-actionable CANs while documenting missing conditions, and recursively search for pathways that may satisfy them. Select Secondary Subjects for parallel analyses if dependencies warrant it.
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

**[FORMALIZATION adapting to the November 15 architecture]** Effects may change NEED satisfaction, emergence or disappearance of CANs, Power, Plasticity, **versioned Definitions**, composition of Objects, and their Environments.

**[VALIDATED — D-32]** A NEED's satisfaction criterion may require the specified state to hold at a particular time or over a particular interval; adequacy of a Scenario therefore depends on its time course, not exclusively its final state. If uninterrupted satisfaction is required, an intermediate violation can invalidate an otherwise acceptable final outcome. A model with insufficient temporal resolution must report uncertainty rather than claim full continuity. Detailed NEED/CAN temporal data encoding is not yet selected.

**[VALIDATED — D-32]** The Method distinguishes recursively **searching known NEED–CAN dependencies** from **exploring missing or unknown ones** by appropriately expanding contextual Object Definitions and Environment, explicitly marking hypotheses and preserving uncertainty. Failing to discover a candidate is not a proof of its nonexistence or universal impossibility. They can affect both the Main Subject and Secondary Subjects; alterations should be evaluated rather than assumed beneficial.

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

**[D-85 clarification, November 17, 2026]** **Understand → Explore → Decide** defines the complete Method's phases. **Decide is fundamental but not always executed**; an analyst may stop at a documented understanding or after comparing possibilities. A final choice, when sought, is reasoned against declared criteria and uncertainty, not claimed as an objectively optimum solution. The existing Advanced Mode concerns the depth of Scenario analysis within this framework; it is **not a substitute for the three-phase definition**.

**[VALIDATED, November 15, 2026]** **Advanced Mode is the current default operation.** It explores and compares multiple relevant Resolution Scenarios for complex problems, with assessed effects on the initial Subject and its Environment, uncertainty, feasibility, complexity, cost, temporality and effectiveness; users may inspect and adjust scenarios, dependencies and indirect effects. It does **not** seek to identify one universally best solution or require a final selection. The shared methodological core is not to be weakened merely to simplify presentation.

**[VALIDATED current scope decision]** The previously contemplated **Simple Mode is suspended**, with its usefulness to be reconsidered **after the Method is stabilized**. No separate Simple Mode protocol, default ranking criterion or Simple Mode implementation is presumed active. If revisited later, it should preserve the same analytical rigor rather than omit material dependencies or consequences.

**[VALIDATED NAMING CONVENTION — D-86, November 17, 2026]** **trIA** (exact capitalization) is the shorthand for **the Trialectic Method assisted by AI** (*Méthode trialectique assistée par IA*). It refers to applying **the same Method** with AI assistance, not a distinct methodology. AI-assisted case analyses may help *critically examine* the Method's principles and practical behavior, but do not alone establish empirical validation. The specific assistance and testing protocol remain to be developed (T-03/T-04/T-20/T-27).

**[VALIDATED INVOCATION AND DEVELOPMENT DISPLAY — D-87, November 17, 2026]** trIA has two **user-selectable presentation/analysis-assistance modes** using the **same conceptual Method**:

- **`use trIA` → trIA (standard)**: apply the AI-assisted Trialectic Method and present the analysis at a useful, user-appropriate level of detail.
- **`use trIAd` or `use trIA-dev` → trIA-dev (development)**: apply the same Method but expose the user-facing analytical representation more explicitly, including, **when relevant**, Objects (identities, Definitions, context), relational NEED/CAN and dependencies, Semantics, current phases/operations/Focus, conditions/Power/Scenarios/effects and decision criteria, plus assumptions, justifications, uncertainties, contradictions and **issues encountered in the Method itself**. Both commands select the same development mode; a later mode invocation switches the current mode.

The development view is intended for **concrete case-testing and conceptual stabilization**, not proof of empirical validity. It must distinguish hypotheses from established claims and never impose inapplicable NEED/CAN or Semantics classifications. It communicates **structured representations and a concise audit trail of methodological operations**, not a claim of access to private underlying AI deliberation. The distinction between modes is **presentation/transparency**, not methodology, a separately approved software product or an alteration of D-85's recursive **Understand → Explore → Decide** phases. A given use may finish after understanding or exploration. Detailed trace format, technical implementation and persistence across distinct sessions remain **OPEN** (T-03/T-20/T-24/T-26).

**[VALIDATED VISUALIZATION CONVENTION — D-88, November 17, 2026]** For the time being, the **trIA-dev** development view uses **two separate Mermaid graphs** when relevant:

1. The **conceptual Object graph** displays the analysis's relevant Objects and contextual relationships (Subject/Environment, NEED/CAN identities and qualified attribution, dependencies or affiliations when justified). Nodes and edges must remain epistemically qualified; their appearance in a graph does **not** prove identity, attribution, causality, satisfaction or Actualization.
2. The **methodological process graph** displays *how* the Method is applied: the **Understand → Explore → Decide** phases, analytical operations, Focus, branches and recursive returns. It should not imply that all three phases must be completed in a particular use.

These visualizations represent **different levels**, and should not merge the domain of studied Objects with the analyst's methodological operations. Keep them proportionate and case-relevant, with a legend or accompanying qualifications for assumptions, unresolved claims and uncertainty. Mermaid is a **provisional presentation choice**, not a mandatory feature of the Method itself and not a change to the underlying Object/NEED/CAN schema. Diagram grammar, automated generation and evaluation of visualization effectiveness remain **OPEN** (T-03/T-20/T-26/T-27).

**[POTENTIAL APPLICATIONS, NOT VALIDATED USE CASES]** Analysis of individual behavior and group dynamics; clarification of conflicts; individual support; institutions and public policy; organizational and technical design; philosophical and semantic clarification; and AI systems able to conduct adaptive trialectic dialogue.

The Method's comparative value, reproducibility, benefits and limitations remain research questions. Conceptual approval must not be represented as scientific validation.

# 11. Open problems and validation program

## 11.1 Highest-priority dependencies

- **T-30 — Object / Subject / NEED / CAN / Definition architecture:** implement the newly **VALIDATED** unique IDs, versioned Definitions, Parent/Temporary Children/Actualised Children, branch promotion, shared constituents, conceptual versus functional existence and contextual CANs; formalize boundary tests, actionability/Power interface, uncertainty, historical simulation isolation and full Focus/Stage protocol. **[OPEN operationalization]**
- **T-01 — NEED and CAN identification:** test existential/structural necessity, conceptual/functional existence, contextual CAN selection and group/System CANs; the separate 'attributable CAN' category is retired under D-82; test the retained identification criteria and legacy A/B/C hypotheses operationally. **[OPEN operationalization]**
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

**[D-82 RESOLVED]** The distinct 'attributable CAN' category is retired; **[OPEN]** calibrated assessment of uncertainty; versioned graph propagation and conflicts; precise actionability/Power logic; Object boundary tests and complete operational protocol. Nothing in this revision represents experimental or scientific validation.

## November 15, 2026 — Default Advanced Mode and scenario objectives

**[VALIDATED author decisions; D-28]** Advanced Mode is the **default** and explores **multiple relevant, diverse Resolution Scenarios** for a complex problem. Scenarios are compared through anticipated effects on the focal Subject and Objects in its Environment, feasibility, complexity, cost, temporality, effectiveness and appropriately represented uncertainty. Distinguish feasibility uncertainty, success probability and consequence-specific probabilities, using statistics only where supportable. Generation, evaluation and any optional selection are separate operations; the Method does not inherently choose the best solution. The **Simple Mode is deferred** until stabilization of the Method and must not be treated as an active default or a current evaluation target. Operational tests of diversity, uncertainty calibration and usefulness remain **OPEN**.

## November 15, 2026 — NEED–CAN-based candidate Scenario generation

**[VALIDATED author decisions; D-29]** Starting from a **non-satisfied NEED**, compare CANs of the focal Subject and its Environment; distinguish alternatives from complementary combinations; build candidate Resolution Scenarios from relevant NEED–CAN relations; recursively identify and investigate action conditions, supporting NEEDs and CANs; and evaluate complete scenarios separately. CANs whose action conditions are currently unmet **remain conditional candidates** if the missing conditions are documented and may themselves be addressed through recursive analysis. Preserve the distinctions between correspondence, complementarity, evaluated Scenario, actionability, Power and Actualization. This route does not supersede CAN-focused analysis or the principle that a satisfied NEED may require no new Actualization. Detailed algorithms and validation tests remain **OPEN**.

## November 15, 2026 — Three distinct NEED–CAN pathway roles

**[VALIDATED author distinction; D-30]** Scenario generation must distinguish: **(1)** a single CAN that can satisfy a NEED under relevant conditions, **(2)** a combination of several CANs jointly needed for satisfaction, and **(3)** a CAN that does not satisfy the focal NEED directly but may make another CAN actionable. The third case introduces an explicit recursive enabling dependency with missing conditions recorded. **[FORMALIZATION]** These describe relationships and roles in Scenarios, not necessarily exclusive kinds of Objects or CANs. Their exact determination, empirical evidence, and sufficiency tests are **OPEN**.

## November 15, 2026 — Validated criteria for NEED–CAN sufficiency and necessity

**[VALIDATED — D-31]** Distinguish correspondence, contribution, conditional sufficiency and Scenario-relative necessity, with necessity of a CAN within one Scenario kept separate from its necessity among all *identified* Scenarios. A CAN or combination is conditionally sufficient only if the required NEED state is attainable through its Actualization under **explicit context and conditions**; a CAN is necessary in a given Scenario only if removing it makes that same Scenario unable to satisfy the NEED. Five relationship checks (correspondence mechanism, contribution, sufficiency, within-Scenario necessity, actionability), **OR/AND/enabling-dependency** pathway representation and four **epistemic** evidence categories (established within model, plausible, refuted in context, indeterminate) are validated. Sufficiency does not imply actionability or observed Actualization; model-supported conclusions are not empirical proofs. Detailed causal/counterfactual tests and computational implementation remain **OPEN**.

## November 15, 2026 — Temporal NEED compliance and exploration of unknown NEED–CAN relations

**[VALIDATED — D-32]** Evaluate NEED satisfaction against its required state **and relevant temporal requirement**, which may demand maintaining that state during part or all of a Scenario. Final-state success alone is not enough to establish uninterrupted satisfaction. Keep the temporal specification in the NEED's Definition distinct from time-dependent Scenario observations and simulation assessments. **[VALIDATED]** When known CANs do not satisfy a NEED or missing action condition, the Method may recursively extend relevant Object Definitions/Environment to identify **hypothetical, initially unrecorded CANs and relations**, with evidential evaluation and relevance-based limits. Distinguish **no solution currently identified**, **an unverified hypothetical solution**, and **assessed infeasibility within explicitly specified conditions**. **[SUPERSEDED by validated D-33]** The shared `temporal` / `requirements` / `estimates` structure and five modes were subsequently approved; detailed composition semantics and validation rules remain open.

## November 15, 2026 — Approved common temporal representation

**[VALIDATED — D-33]** A NEED or CAN may carry a common `temporal` object with `time_zone`, `requirements` and `estimates`. Five temporal constraint modes are approved in the working JSON representation: `point`, `continuous`, `deadline`, `recurring`, `cumulative`. ISO 8601 dates/durations, explicit UTC offsets, start-inclusive/end-exclusive intervals and an explicit distinction between absent versus zero duration are approved conventions. Scenario-specific satisfaction and time-indexed observations stay **outside** the versioned NEED/CAN requirement metadata. Exact rules for overlapping requirements, relative event times, recurrence and schema enforcement are **OPEN**; the illustrative JSON format is approved, not a completed or independently tested implementation.

## November 15, 2026 — Approved combination semantics for temporal requirements

**[VALIDATED — D-34]** For NEEDs and CANs, temporally applicable `requirements` are **conjunctive by default**. The approved `composition` field can explicitly combine identified requirements with `all` and `any`; absent `composition`, assume `all` for the documented requirements, without treating an incomplete inventory as exhaustive. Exceptions must be intentional, time-scoped, justified and versioned, and must not arise retroactively from observed violations. Identify contradictory requirements for the same Object/state/context/time separately from negative or indeterminate satisfaction. Three-valued aggregation is fixed: `all` satisfies iff all components satisfy and fails iff any component fails; `any` satisfies iff any component satisfies and fails iff all components fail; otherwise the result is indeterminate. Overlapping satisfaction intervals count once for cumulative duration. The author explicitly accepted the illustrated JSON `composition` structure. **[OPEN]** Exceptions schema, nesting serialization and precedence, recurring calendars, formal contradiction solver, daylight-saving and fine-grained temporal testing.

## November 15, 2026 — Validated distinction between effective NEED satisfaction and temporal compliance

**[VALIDATED — D-35]** Evaluate separately whether a NEED's required state is effectively present and whether the applicable temporal requirements are met. A justified, time-scoped and versioned exception can alter **temporal compliance**, but never retroactively changes the Object's observed/simulated states, consequences or the NEED itself. Preserve separate three-valued results, uncertainty/evidence, exception IDs and violations in the **Scenario evaluation**, keeping requirements in the versioned Definition. The illustrative `effective_satisfaction` / `temporal_compliance` JSON is adopted as a working example, not yet a complete implementation schema. **[OPEN]** Independent evidence, partial observations, exception authorization workflow and time-indexed multi-Object regression tests.

## November 15, 2026 — Relational NEED/CAN structure

**[VALIDATED — D-36]** NEED/CAN data are now typed origin-anchored relational records containing `ID`, `Type` (`NEED`/`CAN`), `NEEDs` (nullable list of Object references), `CANs` (nullable list of Object references), and `OriginObject`. The second Object participant is recovered from the lists; there may be one or multiple participants, so `TargetObject` is unnecessary. Both lists support finer granularity without asserting AND/OR/satisfaction semantics. This is an update to representation, preserving validated conceptual NEED/CAN distinctions and D-31 relation tests. **[OPEN]** Multiple-participant logic, list co-presence, no-participant cases, relation ID lineage/versioning and nested decomposition semantics.

## November 15, 2026 — Validated relation characterization (D-37)

**[VALIDATED — D-37]** The D-36 NEED/CAN record gains a structured `relation` field. The accepted dimensions are: **nature relative to `OriginObject`**, **individual role of each referenced Object**, **composition of references** (alternative, complementary, substitutive, sequential, synergistic, antagonistic or reciprocal as justified), and relevant **conditionality, temporality, causality and epistemic qualification**. The approved initial example uses `relation.nature` and `relation.composition` with `objects` groups and `all`/`any` operators. Origin nature may include existential, structural, functional for NEED; contributive, enabling, inhibitory, transformative for CAN. These terms are context-dependent and not necessarily exclusive. Necessary/sufficient claims still require D-31 tests; labels and references do not prove causal outcomes. **[VALIDATED DESIGN RECOMMENDATION, OPEN SCHEMA]** Each reference must be able to carry its own role; an exact per-link data substructure is not yet approved. The `relation.composition` refers to linked Objects and is distinct from D-34 `temporal.composition` on time requirements. Keep outstanding grouping, versions, identity and uncertainty questions OPEN.

## November 15, 2026 — Validated qualified individual links (D-38)

**[VALIDATED — D-38]** The NEED/CAN relational record's `relation.links` array now holds individually qualified links with **mandatory** `id`, `object_id` and `source_list` (`NEEDs`/`CANs`), plus **optional** `roles`, `conditions`, `mechanism`, `causality`, `evidence` and `affects`. A link `object_id` must be present in the enclosing record's corresponding source list; missing references require deliberate inventory extension or explicit separate relations. `affects` references other link IDs and permits describing enabling/inhibiting interactions between links without proving an effect. A role label is never a substitute for D-31 necessity/sufficiency tests. **[OPEN]** Link-graph recursion/cycles, cross-record addresses, complete schema, composition interactions, versions and independent reproducibility.

## November 15, 2026 — Validated effect/cycle semantics (D-39)

**[VALIDATED — D-39]** `affects` link-to-link edges now have explicit analytical scope for which condition or relation aspect they may change (CAN action condition, NEED satisfaction, CAN availability/Plasticity, or relation applicability). Distinguish structural dependency cycles from their Scenario-specific functional/blocking effects, and recursively consider external CANs able to initiate blocked pathways without claiming automatic sufficiency. Separate the potential link, its triggering event/conditions and the observed or simulated state transition. Detect structural cycles first, then analyze their dynamics, temporal effects and evidential uncertainty. **[PROVISIONAL]** An optional `effect_details` format illustrates target link, affected condition, CAN Actualization trigger and evidence; exact schema is OPEN. Retain D-31–D-35 safeguards and the 30 open tasks.

## November 15, 2026 — Identified conditions and state-based evaluation (D-40)

**[VALIDATED — D-40]** Conditions are contextual identifiable requirements attached to NEED/CAN relations or qualified links; they are not necessarily independent Objects. A condition Definition (predicate, purpose, and possible composition/time restrictions) is separate from its **three-state**, evidence-qualified **Scenario/time evaluation**. Actualizations change Object states, and sometimes explicitly versioned Definitions; then evaluate affected conditions rather than changing their requirements implicitly. Reference conditions by owner NEED/CAN relation ID and local condition ID, with Definition-version context for historical/Scenario assessments. `all`/`any` condition grouping reuses the validated three-valued logic, without assuming a complete inventory. **[PROVISIONAL]** `relation.conditions`, `predicate`, `condition_composition`, and links pointing to condition IDs are illustrative; the exact schema and independent validation remain OPEN.

## November 15, 2026 — Validated completeness distinctions and nested pathways (D-41)

**[VALIDATED — D-41]** Separate completeness of conditions within an identified Actualization pathway from completeness of the whole contextually relevant inventory of pathways, each justified and version-scoped. Permit nested Boolean groupings and three-state evaluation of individual pathways versus the whole inventory, without mistaking an incomplete inventory for a globally negative CAN assessment. Introduce identifiable pathways with evidence/coverage metadata. **[PROPOSED, NOT VALIDATED]** A unified recursive expression language with `op: all|any`, nested `items` and typed reference leaves; exact serialization and treatment of empty groups/cycles remain OPEN.

## November 15, 2026 — D-42 validated recursive expressions and first synthetic tests

**[VALIDATED]** One recursive logical structure with explicitly versioned reusable pathway references; empty AND/OR groups do not receive automatic truth values; cyclic references are representable but must be detected and analyzed dynamically under D-39 rather than evaluated by naïve recursive expansion. **[TESTED, LIMITED]** A synthetic Python evaluator completed 413 assertions, 90 exhaustive cyclic Boolean checks and 189 exhaustive open/nested group checks; no external empirical validity is claimed. Open: an explicit representation of zero discovered paths, typed cross-branch reference schema, negative/delayed causal cycles, and independent reproduction.

## November 15, 2026 — Empty documentary inventories and distinct logical/causal graphs (D-43)

**[VALIDATED A–E]** Represent an inventory without any identified pathway without constructing an invalid empty `all`/`any` expression, and never equate unsuccessful discovery with impossibility. Require separately justified, scoped negative evidence for a closed-world claim. Distinguish recursive logical reference graphs from potential causal dependency graphs; neither implies the other without justified mechanisms/conditions. Couple them only through a Scenario's traceable condition evaluation, explicit CAN Actualization event, state/Definition effects and subsequent reevaluation. **[PROVISIONAL]** JSON with `expression: null` / `search_status` and the separate causal simulator remain to be normalized. Synthetic D-43 prototype: 218/218 checks passed; no task closed.

## November 15, 2026 — Typed cross-graph references and event-trace verification (D-44)

**[VALIDATED A–E]** Type/version/owner-qualified references link potential causal rules to conditions and links without equating either layer to actual causality; observed/simulated Actualizations are separate traceable events; Object state changes cause time-indexed condition and pathway reassessment; branches and Definition versions remain isolated. **[SYNTHETIC TEST ONLY]** 190/190 assertions passed (27 three-state cases compared across v1/v2), with an initial delayed-expiry bug found and corrected before rerun. **[OPEN]** The pilot's simultaneous-conflict handling (reject incompatible effects, mark property indeterminate) is not yet author-approved; final typed JSON Schema, CI and D-35 temporal completeness remain unresolved.

## November 15, 2026 — D-45 competing-effect policies and localized suspension

**[VALIDATED]** Diagnose the conflict's origin, examine justified applicable priorities, permit isolated non-exhaustive hypothetical branches, represent epistemic uncertainty without inventing physical transitions, preserve provenance and history, and suspend **only conflict-dependent analyses/actions**. **[SYNTHETIC TEST]** 173/173 local assertions passed over four policies and 27 ternary configurations; source evidence and assumed priority are not externally verified. **[PROVISIONAL]** Priority/evidence standards and conflict JSON field names remain open. Related TODOs not closed.

## November 15, 2026 — D-46 epistemic claim/evidence/revision model

**[VALIDATED A–E]** Treat claims, evidence and assessments as distinct; separate model-internal validity from empirical warrant and scope; assess provenance, relevance, reliability, traceability, independence and discriminating power; preserve versioned/time-indexed assessment history; make important conclusions' verifiable justifications and remaining tests inspectable. **[SYNTHETIC TEST ONLY]** 898/898 assertions, including 27 ternary evidence combinations and 720 permutations of check ordering, passed with byte-identical results after ZIP re-extraction. **[OPEN]** Source quality flags and even synthetic falsification labels are unverified and no general confidence ranking, factual claim verification or final JSON Schema is authorized.

## November 15, 2026 — D-47 method-sensitive evidence review

**[VALIDATED A–E]** Source-method and claim-specific appraisal; distinguish applicable requirements from evaluated compliance, methodological quality from probative sufficiency, joint evidence interpretation without arbitrary aggregation, and verification-depth proportionality without converting stakes into truth. **[SYNTHETIC TEST]** 612/612 assertions passed, five method families, seven adversarial cases, 243 ternary combinations and 24 input permutations, reproduced byte-identically from extracted archive. Example criteria/check algorithms and synthetic source labels remain unapproved; no tasks closed.


**Normative local schema implementation (November 16, 2026):**
[`power-evaluation.schema.json`](https://github.com/Nirgalz/trialectic/blob/7fc676586a85be504bf145d313b19fefadfb9761/schemas/power-evaluation.schema.json) implements
the approved local PowerEvaluation constraints through D-74. Its
[conformance and exclusions](https://github.com/Nirgalz/trialectic/blob/7fc676586a85be504bf145d313b19fefadfb9761/schemas/power-evaluation.normative.md) are normative
only within that limited structural scope. The existing boundary schema remains
compatible. This implementation does not approve the global normalized proposal,
Object/relation identity, recursive grammar, Scenario result internals or D-75.
