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

The adopted recursive sequence is:

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

The earlier 'attributable CAN' category has been **questioned by the author as potentially unnecessary**, rather than explicitly retained as an independent current status. The practical inventory now selects CANs at contextually relevant granularity. Existing constitutive-foundation principles and three earlier tests remain **OPEN** research hypotheses, not a new mandatory status or definitive criteria:

- **A — Present foundation**: identify constitutive properties at T without assuming a necessary future transformation.
- **B — Discriminating contribution**: verify that the foundation is sufficiently specific to the Actualization to avoid attribution of every CAN to every Object.
- **C — Individualized attribution**: distinguish collective Object CANs from individual contributions without automatic transfer.

**OPEN:** Whether 'attributable CAN' should remain a separate technical category; threshold of relevant constitutive contribution; boundary between constitution and action conditions; evidence, uncertainty, and inter-analyst reproducibility; differentiated CAN identification criteria by Object type. Contextual granularity is validated, but operational selection rules remain to be tested.

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

**[VALIDATED — November 16, 2026]** **Power / Pouvoir** is an **analytical operation** comparing (i) the NEEDs of the Object, (ii) the NEEDs of its CANs, and (iii) the NEEDs and CANs of Objects in its Environment. This analysis jointly produces:

1. an evaluation of the possibility of Actualization;
2. identification of satisfied and unsatisfied NEEDs;
3. identification of CANs that may satisfy those NEEDs.

Power is therefore **not defined solely as a positive/negative binary outcome**. It is necessary to distinguish the comparison operation from its outputs, as well as identifying a candidate CAN–NEED match from proving satisfaction or feasible Actualization. Missing information must not be interpreted as negative feasibility. The specific comparison criteria, granularity, handling of unknowns, and outputs for NEED-focused, CAN-focused or Scenario-focused analyses remain **OPEN** under T-02 and T-30.

**[VALIDATED — November 16, 2026] Focus-centered Power assessment.** Each contextual Power evaluation is centered on **one explicitly selected Focus**—a NEED, a CAN, or a Resolution Scenario—and may reference other relevant assessments, including recursively dependent NEEDs/CANs and related Scenarios. Several such evaluations may be grouped to present a broader analysis of the Subject. The group is a way to organize and synthesize evaluations, not a replacement for their independently identified Focus, context, evidence, or results. Preserve versioned Object Definitions separately from time-/Scenario-indexed assessments; evaluating a Focus does not by itself modify an Object's Definition.

**[OPEN]** The exact machine-readable data structure, assessment IDs and reference fields, rules for composing/grouping results, caching and invalidation, cross-Focus consistency, cycle handling, and uncertainty propagation have not been approved. An illustrative `Power` JSON record shown during discussion is a proposal, not a normative schema.

**[VALIDATED — November 16, 2026] Conceptual versus analytical dependency.** Distinguish two separate kinds of dependency: **conceptual dependency** connects Objects, NEEDs, and CANs as modeled in their versioned Definitions and relationship records; **analytical dependency** connects a Focus-centered Power evaluation to other evaluations whose results it uses. Analytical reuse must not be mistaken for an Object's constitutive NEED/CAN relationship, and a conceptual dependency need not automatically require a separately persisted Power evaluation. The two layers may refer to each other by explicit version-aware references while retaining independent identities, contexts and uncertainty.

**[OPEN]** The proposed `PowerEvaluation` fields (`ID`, `Focus`, `Context`, `Dependencies`, `Results`) remain illustrative, not an approved machine-readable schema. Cross-assessment linking rules, context consistency, dependency recursion, cycle detection, caching and invalidation require further formalization.

**[VALIDATED — November 16, 2026] Reusing a Power evaluation.** A previously produced Focus-centered Power evaluation may be reused by another analysis **only after checking at least** (1) the compatibility of the **Focus**, (2) the **context** of the evaluated Actualization (including relevant Scenario and time), (3) the **versions of the relevant Object Definitions**, and (4) the **information available**, including relevant evidence, assumptions and uncertainty. Compatibility must be **demonstrated rather than assumed**. The checks do not automatically require byte-for-byte identity: the criteria for showing that a difference is immaterial remain **OPEN**. Where compatibility cannot be established, do not silently reuse the former conclusion; qualify the result or perform a new evaluation. Preserve the prior evaluation as a historical, context-specific result, rather than overwriting it.

**[OPEN]** Precise compatibility tests, handling of new evidence, dependency-graph invalidation, partial reuse of sub-results, cross-Scenario transfer, time-sensitive changes, cache keys, and machine-readable representation are not yet approved. This validation does **not** adopt the illustrative `PowerEvaluation` JSON fields as a final schema.

**[VALIDATED — November 16, 2026] Selective recursive reevaluation and propagation.** When source data, context, relevant Object Definition(s), or a Power evaluation changes, identify the **analytically dependent evaluations** and examine whether the changed information affects their outputs or justifications. Reevaluate only the affected evaluations; propagate pertinent changes recursively to their dependents until no further relevant reevaluation is required. Changes to the assessment's **satisfaction degree, actualizability, evidence, reasoning, or uncertainty** may all be pertinent: equality of a numerical result alone does not prove that downstream conclusions remain valid. An unaffected evaluation need not be recomputed merely because it shares a Subject or a graph ancestor. Preserve previous evaluations and their context as historical records. Detect circular analytical dependencies and handle them separately rather than recursing indefinitely or assuming that the cycle itself implies impossibility. This is a selective **reassessment** rule, not permission to overwrite conceptual relationships or historical Definitions.

**[OPEN]** Detailed impact predicates, dependency-index representation, scheduler/order, change-significance criteria, termination and convergence rules for cycles, cache invalidation, partial results, and a machine-readable propagation trace remain to be specified and tested. The `PowerEvaluation` JSON example remains provisional.

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

**[FORMALIZATION — revised synthesis of the alpha 0.3 protocol and validated Focus sequence]**

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
