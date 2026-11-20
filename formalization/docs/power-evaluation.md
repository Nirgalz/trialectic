# PowerEvaluation — validated conceptual data model

> **Ownership:** computational formalization and the meaning/limits of its data records. The [Method reference](../../reference/trialectic-method.md) alone owns the underlying methodological definitions. Preserved from the legacy file without changing conceptual or schema approvals.


**Scope and source-of-truth boundary:** This companion explains the approved
conceptual distinctions of PowerEvaluation; it is not an independently
maintained serialization contract. The adopted v2 Analysis and
PowerEvaluation shapes are defined in
[schemas/global-model.md](../../schemas/global-model.md) and
[schemas/model/](../../schemas/model/README.md). Semantic, causal and empirical
evaluation remain separate from schema validation. Historical OPEN statements
about the v2 exchange shape are superseded by D-77/D-78.

**Status:** **VALIDATED by author — November 16, 2026 (D-64)**, consolidating D-48–D-63.  
**Branch:** `dev`.  
**Scope:** approved **conceptual data model and named data-structure layers**, **not a final machine-enforced JSON Schema**, production evaluator, exhaustive data contract, or scientific validation.

This companion document summarizes the applicable decisions from the [canonical working reference](../../reference/trialectic-method.md). In case of ambiguity, consult that reference and [DECISIONS.md](../../DECISIONS.md). [Synthetic executable fixtures](../../tests/cases/power_evaluation.json) and [unit tests](../../tests/test_power_evaluation.py) illustrate and check selected invariants without defining additional normative semantics.

## 1. Purpose and distinct layers

**Power / Pouvoir** is a **contextual comparative analytical operation** involving an Object's NEEDs, the NEEDs of its CANs, and the relevant NEEDs and CANs in its Environment. A `PowerEvaluation` records its **Focus-centered contextual results**. It does **not** constitute the Object, the NEED or CAN, an Actualization event, or the Definition of a Resolution Scenario.

Preserve separate identities for:
- **Object Definitions:** versioned composition, properties, NEED/CAN Object references and conceptual relations.
- **Power evaluations:** context-specific, historically traceable analytical conclusions and uncertainty.
- **Actualization events and Scenario history:** contemplated steps must remain distinct from simulated events and observed effects.

NEEDs and CANs have unique Object IDs (D-50). These are **not interchangeable** with IDs of relation records, conditions, links, Scenarios, or Power evaluations.

## 2. Common PowerEvaluation structure

A Focus-centered evaluation has these **six top-level fields** (D-57, validated again as a coherent whole by D-64):

| Field | Validated high-level contract |
| --- | --- |
| `ID` | A unique identifier of the **evaluation**, distinct from the Subject, Focus Object and relation-record IDs |
| `Subject` | The Object whose contextual situation is analyzed |
| `Focus` | Exactly the chosen NEED, CAN, or Resolution Scenario for this evaluation |
| `Context` | Information required to interpret the result: relevant Scenario, time or interval, assumptions, evidence context and applicable Object Definition versions |
| `Dependencies` | References to **analytical evaluations used** as inputs; not conceptual NEED/CAN links |
| `Results` | A Focus-specific results structure, with distinct evidence, reasons and uncertainty where applicable |

The precise JSON types, internal field keys beyond the named validated structures, requiredness of optional information, scope of identifiers, and formal serialization remain **OPEN**. The example JSON in the test fixtures is one explicitly **provisional serialization**, not a universal enforcement schema.

### 2.1 NEED Focus (D-35, D-49, D-61)

`Results` has these three named substructures:

| Substructure | Meaning |
| --- | --- |
| `effective_satisfaction` | Actual NEED satisfaction, with analytical `satisfied`, `unsatisfied`, `indeterminate` states and an **optional justified degree** when meaningful |
| `temporal_compliance` | Separate evaluation of applicable temporal requirements and duly authorized exceptions, when relevant |
| `candidate_cans` | CANs that may contribute **by Actualization or resulting states** to NEED satisfaction, including incomplete-search/coverage information |

Partial NEED satisfaction is not a fourth mandatory status, the degree is not a probability, and partial satisfaction of conditions is not necessarily partial satisfaction of the NEED. Temporal compliance does not erase factual interruptions or make a NEED effectively satisfied. No identified candidate CAN does not prove impossible satisfaction. Each part can have its **own** evidence, justification and uncertainty.

### 2.2 CAN Focus (D-51, D-62)

`Results` has these three named substructures:

| Substructure | Meaning |
| --- | --- |
| `actualizability` | Contextual possibility of the **specified contemplated Actualization**: `actualizable`, `partially_actualizable`, `not_actualizable`, or `indeterminate` |
| `prerequisites` | Identified NEEDs, CANs and conditions required for the contemplated Actualization, with scoped coverage and evaluation links as relevant |
| `potential_contributions` | NEEDs to which the CAN's Actualization or resulting states could contribute, **without presuming proven contribution or sufficiency** |

A degree of possible CAN Actualization is **optional**, only if its measure is relevant and justified. Do not infer it directly from the weighted satisfaction of prerequisite NEEDs or confuse it with probability of successful Actualization. Missing prerequisite evaluations do not prove impossibility; the list may be incomplete. Adverse effects on other Objects must be considered in the wider Actualization or Scenario assessment.

### 2.3 Resolution Scenario Focus (D-31–D-35, D-44, D-63)

`Results` has these four named substructures:

| Substructure | Meaning |
| --- | --- |
| `actualization_assessments` | References/evaluations for contemplated CAN Actualizations, with ordering and relations residing in the Scenario model |
| `scenario_assessment` | Distinct feasibility and its uncertainty, complexity, cost/resources, temporality and expected effectiveness dimensions |
| `effects` | Anticipated, simulated, observed or (if supported) causally attributed favorable/adverse effects on Subjects, Environment Objects and relevant NEEDs/CANs |
| `comparisons` | Contextual comparison with other alternatives; no compulsory winner, universal rank or aggregate score |

Preserve direct/indirect versus immediate/delayed as **independent axes**. Distinguish uncertainty about feasibility, probability of success, and possibility/probability of individual consequences. Keep Scenario branches isolated. Generation, assessment and optional selection are distinct. Each results part retains separable reasons, evidence and uncertainty.

## 3. Analytical dependencies, revisions and reuse (D-52–D-60)

**Different links have different meanings:**

- **Conceptual dependency:** Object/NEED/CAN relationship in the versioned Definition layer.
- **Analytical dependency:** `PowerEvaluation.Dependencies` refers to assessment(s) whose results are used; it does not itself assert a causal/constitutive relationship.
- **Revision lineage:** `PowerEvaluation.Context.provenance.revises` refers to the **earlier evaluation** whose results, justification or uncertainty are revised; it is required for a revision and absent/optional for independent evaluations.
- **Object Parent/Children lineage:** tracks Object branches, not assessment versions.

A change to **a result, its justification, or its uncertainty** creates an evaluation with **a new unique `ID`**, preserving the original record and linking to the evaluation revised (D-58–D-60). The same CAN evaluated independently under a distinct Scenario does **not automatically** revise the previous assessment.

Reusing an evaluation requires at least verifying compatibility of **Focus**, **context**, **relevant Definition versions**, and **available information/evidence/uncertainty** (D-54). Difference does not automatically mean incompatibility, but compatibility cannot be presumed; the rules proving it remain OPEN.

On changed input or evaluation, **selectively reexamine analytical dependents** and propagate pertinent differences in result, reasoning or uncertainty until no further relevant evaluation needs reassessment (D-55). Do not overwrite historical records.

**Analytical cycles** are detected and grouped for joint examination from independent information, temporal context and possible initiating changes, without unbounded recursion (D-56). An analytical reference cycle is **not proof** of a causal cycle, impossible Actualization or a unique solution. Unresolved results remain indeterminate/conditional.

## 4. Two complementary validation levels (D-65)

**[VALIDATED — November 16, 2026; D-65]** The validity of a `PowerEvaluation` must be assessed through **two distinct, complementary levels**, without treating successful data-format validation as evidence of analytical correctness:

1. **Structural validity** — checked against a **strict JSON Schema**: expected data shape, common six top-level fields, type-specific `Results` structures, declared JSON data types and allowed enumerated values, and other *locally decidable structural constraints* once their precise encodings have been approved. The selected JSON Schema draft and exact requirements are **not yet validated** by D-65.
2. **Semantic validity** — checked by an **additional validation mechanism** against relevant contextual/reference information and methodological rules: existence and identity of referenced Objects, assessments and Scenarios; applicable Definition versions; Focus/Subject/context compatibility; analytical dependency and revision-lineage integrity; and consistency of results with evidence, justifications and uncertainty. This second level can require information outside the document and cannot generally be settled by a JSON Schema alone.

A structurally valid evaluation may nevertheless be **semantically invalid, insufficiently substantiated or not yet decidable**. Absence of evidence must not be silently converted into a negative empirical conclusion. Semantic validation is distinct from actual empirical/scientific verification of consequences, the adequacy of causal assumptions, or proof that the Method improves analysis.

**[OPEN]** Formal status taxonomy (e.g. error vs indeterminate vs not assessed), selection/version of JSON Schema dialect, exact nested types, requiredness and nullability, referential integrity rules, handling of legitimate cross-Scenario evaluation reuse (D-54), scope and algorithms of semantic checks, provenance and evidence validation, deterministic error reporting, CI gates, validator implementation and complete test coverage. A strict schema and a validator may be designed as separate components with distinct test oracles; D-65 does **not** prematurely validate their particular implementation.

## 5. Strict JSON Schema foundations (D-66)

**[VALIDATED — November 16, 2026; D-66]** The strict structural schema for a `PowerEvaluation` will use **JSON Schema Draft 2020-12** as its dialect, and shall enforce the following structural principles:

1. **Exactly six top-level fields:** `ID`, `Subject`, `Focus`, `Context`, `Dependencies`, and `Results` (D-57 and D-64). The schema **rejects undeclared additional top-level properties**.
2. **Focus-conditioned `Results`:** the structural schema distinguishes NEED-, CAN-, and Resolution-Scenario-focused evaluations and requires their respective D-61, D-62, and D-63 **named Results substructures**; one type's `Results` layout must not silently substitute for another's.
3. **No cross-record semantic claims from structural validity:** referential existence, evaluation/context compatibility, Definition-version consistency, revision lineage, evidential adequacy, and other cross-evaluation consistency requirements remain for the **separate semantic validator** (D-65).

**[SCOPE / OPEN]** D-66 approves the chosen JSON Schema dialect and these *boundary rules*, **not** the exact internal JSON serialization of `Subject`, `Focus`, `Context`, `Dependencies`, or the interior of each `Results` substructure. In particular, the previously illustrated `Focus.type` discriminator and its precise string values, nested required/optional fields, additional-property policies *within* nested structures, nullability, formats and constraints, and how non-applicable results are represented still require separate decisions. A future Draft 2020-12 file must label any unapproved details as provisional and must be tested against valid and deliberately invalid cases before being described as a finished schema. This structural contract is not evidence of semantic or empirical validity.

### 5.1 Strict Focus serialization (D-67)

**[VALIDATED — November 16, 2026; D-67]** `Focus` is a **required object** with the following **Focus-dependent minimum shape**:

- For **NEED**: `{"type":"NEED","object_id":"<Object ID>"}`.
- For **CAN**: `{"type":"CAN","object_id":"<Object ID>"}`.
- For **Resolution Scenario**: `{"type":"Scenario","scenario_id":"<Scenario ID>"}`.

The discriminator `Focus.type` is **required**, with precisely those three **case-sensitive literal values**. The appropriate identifier reference (`object_id` for NEED/CAN or `scenario_id` for Scenario) is **required**. The alternative, mismatched reference key is **not accepted as a substitute**, and the schema must reject a contradictory pair of these two identifier fields. No other nested `Focus` metadata constraints are approved by this decision. This allows Draft 2020-12 to select the matching D-61–D-63 `Results` substructures. The Focus reference identifies its target in the model but **does not by itself prove that the target exists**, has the declared NEED/CAN category, or belongs to a compatible Subject/Scenario/Definition version; those are **semantic** validation responsibilities under D-65.

**[OPEN]** Exact identifier string syntax and global/scoped uniqueness, whether any additional future Focus metadata would require a versioned schema change, the more detailed nested field contracts of `Subject`, `Context`, `Dependencies` (partly resolved by D-68), and `Results`, and cross-record referential checks beyond D-68 remain unapproved. The examples' `O-...` and `S-...` identifier patterns are illustrative, **not validated mandatory prefixes**.

**[IMPLEMENTATION — provisional D-66–D-68 boundary schema]** An [executable Draft 2020-12 boundary schema](https://github.com/Nirgalz/trialectic/blob/7fc676586a85be504bf145d313b19fefadfb9761/schemas/power-evaluation.boundaries.schema.json) and [22 dedicated structural tests](../../tests/test_power_evaluation_schema.py) exercise the **approved** top-level, Focus, conditional `Results` section names, and D-68 typed minimums for `Subject`, `Context` and `Dependencies`. The schema still leaves unapproved nested `Results` attributes, metadata and formats unconstrained, as documented in [`schemas/README.md`](../../schemas/README.md). **Passing this partial schema is not a claim that a `PowerEvaluation` is fully structurally, semantically or empirically valid**. The full strict JSON Schema still requires further decisions.

### 5.2 Subject, Context and Dependencies serialization (D-68)

**[VALIDATED — November 16, 2026; D-68]** Extend the Draft 2020-12 structural contract with the following **minimum nested shapes**. All referenced identifiers and versions are nonempty strings, with **no prescribed naming prefix**.

- **`Subject`** is a required JSON **object** containing a required **`object_id`**, a nonempty string identifying the central Object.
- **`Context`** is a required JSON **object** containing required **`definition_versions`**, a **nonempty JSON object** mapping nonempty Object-ID keys to nonempty Definition-version strings. This map records the Definitions relevant to the analysis, but structural validation cannot establish that all relevant versions have been included. Optional **`scenario_id`**, when present, is a nonempty string; **a Resolution Scenario must not be required for every evaluation**. Optional **`provenance`**, when present, is an object; optional **`provenance.revises`**, when present, is a nonempty string referring to the earlier evaluation. In a genuine revision it **must be present under D-60**; detecting whether a record represents a revision requires **semantic checking**, not merely examination of the one document.
- **`Dependencies`** is a required JSON **array**, which **may be empty**. Each element is a JSON **object** containing a required **`evaluation_id`** as a nonempty string, referring to another analytical Power evaluation. `[]` means **no referenced analytical evaluation inputs**, **not** absence of conceptual Object/NEED/CAN dependencies.

**[VALIDATION BOUNDARY]** The JSON Schema can check local types, required keys, nonempty identifiers and nonempty version-map entries. The **separate D-65 semantic validator** must resolve referents, identity/versions, context compatibility and revision justification, and must assess whether the relevant versions and dependencies are sufficiently represented. In particular, a correctly shaped `Context.provenance.revises` link is not proof of a valid revision; a correctly shaped `Dependencies` entry is not proof that an evaluation can be reused under D-54.

**[OPEN]** The universal time/interval representation, context assumptions and evidence fields, branch-scoped references, additional metadata, ID normalization, rules to **close** these nested object shapes to extra properties, and the exact structure of `Results` internals remain to be decided. No default `scenario_id`, creation timestamp, mandatory `provenance`, or fixed `O-`/`PE-`/version-prefix formats are introduced. This validation is **not** a final complete JSON Schema.

### 5.3 NEED effective satisfaction serialization (D-69)

**[VALIDATED — November 16, 2026; D-69]** For a `PowerEvaluation` focused on a NEED, `Results.effective_satisfaction` is a required **object** with these **locally enforced** attributes:

| Attribute | Draft 2020-12 type and validation | Obligation |
| --- | --- | --- |
| `status` | String, one of `satisfied`, `unsatisfied`, `indeterminate` | **Required** |
| `justification` | Nonempty string explaining the finding or why it cannot be determined | **Required** |
| `degree` | Object, when used, with required `value` (number), `measure` (nonempty string), and `basis` (nonempty string) | Optional |
| `evidence` | Array of nonempty string **references** to evidence; may be empty | Optional |
| `uncertainty` | Object documenting uncertainty; its internal structure is not yet standardized | Optional |

**Meaning and limits:** A NEED may be **partially satisfied** (D-49) **without a fourth `partially_satisfied` status**. `unsatisfied` can coexist with a meaningful measured partial degree; `indeterminate` can coexist with measurements that do not settle the satisfaction criteria. A numerical `degree` is supplied **only if the method of measurement is relevant and justified**, and is **not** automatically a probability, an epistemic certainty or the fraction of satisfied prerequisite Conditions. **No universal numerical 0–1 or 0–100 scale or threshold is approved**, and a value alone cannot establish that a NEED is satisfied. A partial satisfaction of conditions does not prove partial satisfaction of the NEED.

`justification` is required even for `indeterminate`. `evidence` may be absent or empty (not proof of an absence of possible evidence); the referenced evidence must still be resolved and assessed semantically. `uncertainty` is distinct from both the status and the degree, and its **absence does not imply certainty**. The substructure does not replace the distinct `temporal_compliance` evaluation (D-35) or authorize changing the underlying NEED Definition. Other nested metadata including violation records are **not closed off** by D-69.

**[OPEN]** Standardized internal `uncertainty` representation, evidence references and provenance, numerical measure semantics and thresholds, `degree.basis` machine-readable metadata, additional-properties closure, time/interval encoding, partial-score aggregation, and causal/empirical validation are still to be specified. Passing the local schema does **not** establish that the degree or justification is scientifically warranted.

### 5.4 NEED temporal compliance serialization (D-70)

**[VALIDATED — November 16, 2026; D-70]** For a NEED-focused `PowerEvaluation`, `Results.temporal_compliance` is a required **object** that reports temporal **applicability** separately from the existing three-state **compliance** evaluation. The local Draft 2020-12 structural contract is:

| Field | Type and values | Requiredness |
| --- | --- | --- |
| `applicability` | Exactly `applicable`, `not_applicable`, `indeterminate` | **Required** |
| `status` | Exactly `satisfied`, `unsatisfied`, `indeterminate` | **Conditional**, as below |
| `justification` | Nonempty string | **Required**, including when status is indeterminate or requirements do not apply |
| `applied_exceptions` | Array of nonempty reference strings to exceptions actually applied | Optional; may be empty |
| `evidence` | Array of nonempty evidence-reference strings | Optional; may be empty |
| `uncertainty` | Object; inner structure OPEN | Optional |

**[VALIDATED applicability and status constraints]**

- **`applicable`**: `status` is **required** and uses one of the three approved compliance values.
- **`not_applicable`**: `status` is **absent**, and the reason for non-applicability is explained by `justification`. It does **not** mean that an obligation has been satisfied, or that it was evaluated but the result is unknown.
- **`indeterminate`**: `status` is **optional**; if present it must be **`indeterminate`**, not `satisfied` or `unsatisfied`. This is uncertainty over *whether a temporal requirement applies*, not an automatic compliance conclusion.

`not_applicable` is **not a fourth compliance status**. Applicability uncertainty differs from a known applicable requirement whose compliance outcome is `indeterminate`. An absent optional `uncertainty` does not prove confidence or certainty.

**[EXCEPTIONS AND EVENTS — semantic requirements]** Authorized exceptions are explicitly permitted, justified, time-/constraint-scoped and historically versioned under D-34/D-35. The `applied_exceptions` references identify exceptions *used by the assessment*, not merely exceptions that exist; **a syntactically valid ID does not establish authorization, applicability, valid version or interval coverage**. Only the semantic validator can establish that the exception's scope applies and that it does not bypass unrelated constraints. An observed or simulated interruption can remain **effectively unsatisfied** even when `temporal_compliance.status` is `satisfied` under a legitimate exception. No exception is inferred from an interruption and no historical Definition is silently changed.

**[REQUIREMENTS AND INTERVALS]** The D-33/D-34 temporal requirement modes (`point`, `continuous`, `deadline`, `recurring`, `cumulative`) and `all`/`any` compositions remain stored in their **versioned NEED Definition**, not duplicated as new rules in the compliance result. Relevant individual requirement assessments, permitted exceptions and observed/simulated violation intervals must be traceable at the applicable scope, without equating interrupted *effective* satisfaction with a violation of an *applicable* temporal requirement. Their precise linked-reference representation is **OPEN**.

**[OPEN]** A universal time/interval schema; the full exception record, authorization and precedence schema; requirement-assessment references and diagnostics for contradictory Definitions; `evidence` provenance/credibility; `uncertainty` subfields; applicability-determination and compliance algorithms, handling absent or incomplete requirement inventories; additional-properties closure and empirical validity. This D-70 decision formalizes the local result contract only, not a complete temporal reasoning engine or scientific proof.

### 5.5 NEED candidate CAN inventory serialization (D-71)

**[VALIDATED — November 16, 2026; D-71]** The required NEED `Results.candidate_cans` substructure is a JSON **object** whose minimum **local structural contract** is:

| Field | Type / allowed values | Obligation |
| --- | --- | --- |
| `identified` | Array (possibly empty) of objects with required nonempty `object_id` and nonempty `justification`; each may have optional `evidence` array of nonempty strings | **Required** |
| `search_status` | `not_searched` or `searched` | **Required** |
| `coverage` | `complete`, `incomplete` or `indeterminate` | **Required** |
| `scope` | Nonempty string delimiting the candidate inventory | **Required** |
| `justification` | Nonempty string explaining candidate-search scope, findings and limits | **Required** |
| `evidence` | Array (possibly empty) of nonempty evidence-reference strings | Optional |
| `uncertainty` | Object; internal schema OPEN | Optional |

**[SEARCH VS COVERAGE]** A search may have occurred without an exhaustive candidate inventory; likewise an empty `identified` array says only that **no CAN was recorded as a candidate** in this evaluation, **not** that no CAN exists or that NEED satisfaction is impossible. `coverage: complete` is a claim of completeness *relative to the stated `scope`, assumptions, evidence and versioned Definitions*, not global/universal exhaustiveness. A `not_searched` record must not claim `complete` coverage; the local schema rejects that contradictory pair. A claim of `complete` with `searched` still requires substantive **semantic** justification. Search/inventory status is distinct from whether any contemplated CAN is actualizable.

**[FOUR DISTINCT RELATION LEVELS — D-31]** An `identified[]` entry documents an **explainable correspondence** of a CAN Object to the focal NEED, supported by its per-entry justification and optional evidence; it is **not** a claim that the CAN's Actualization causally contributes, is conditionally sufficient (alone or together with other CANs), is necessary in a given Scenario, or has positive Power/actionability. CAN candidates may originate from the Subject **or** another Object in the Environment. Their Object identities and relevant Definition versions remain distinct from `PowerEvaluation` IDs. Subsequent CAN and Scenario evaluations use their own Focus and referential/analytical dependency checks (D-52–D-54).

**[VALIDATION BOUNDARY]** Draft 2020-12 checks object shape, local required keys, enum values and nonempty string references. The separate D-65 semantic validator must check that each `object_id` identifies an actual CAN, that the candidate match and claimed search coverage are adequately justified in context, and whether differing Scenarios, evidence or Definitions permit reuse. `uncertainty` absent is not proof of certainty. Nested additional-metadata restrictions, inventory completeness verification, evidence credibility and detailed correspondence/contribution models are **OPEN**.

### 5.6 CAN actualizability serialization (D-72)

**[VALIDATED — November 16, 2026; D-72]** For a CAN-focused `PowerEvaluation`, `Results.actualizability` is a required **object** with the following **local Draft 2020-12 structural contract**:

| Field | Type and meaning | Obligation |
| --- | --- | --- |
| `status` | Exactly `actualizable`, `partially_actualizable`, `not_actualizable`, `indeterminate` | **Required** |
| `justification` | Nonempty string explaining the finding, including an indeterminate one | **Required** |
| `degree` | Object with required `value` (number), `measure` (nonempty string), `basis` (nonempty string) | Optional |
| `evidence` | Array of nonempty evidence-reference strings; may be empty | Optional |
| `uncertainty` | Object, with internal representation yet to be standardized | Optional |

**[CONTEXT AND PARTIALITY]** The status evaluates the **possibility of a specified contemplated Actualization**, not an intrinsic property that is uniformly actualizable in all contexts. `partially_actualizable` may be justified qualitatively, without a `degree`; `not_actualizable` applies only when the established context/conditions support that conclusion; `indeterminate` must not be presented as impossibility. No universal numeric degree range, formula, threshold or automatic status mapping is approved. `degree` is **not** the probability of success or the weighted satisfaction of prerequisite NEEDs (D-51, D-62). Presence of any numeric measure does not establish effective Actualization.

`Results.prerequisites` separately captures identified NEEDs, CANs and conditions; `Results.potential_contributions` separately captures candidate favorable contributions to NEEDs; neither is collapsed into `actualizability`. A later observed or simulated Actualization belongs to a **distinct event/history layer**. `evidence` and `uncertainty` have their own epistemic roles; absence of either is not a proof of impossibility or certainty. Additional nested metadata, including contextual or measure-specific information, is not closed off by D-72.

**[OPEN]** A standard identity/reference for the **contemplated Actualization** beyond the existing `Focus` and `Context` (necessary to interpret the status), criteria for partiality, measure-specific range and interpretation, time/scenario scope, evidence quality, uncertainty subfields, thresholds, numerical aggregation, alternative pathways, causal sufficiency, nested additional-properties closure, cross-record semantics and empirical tests. A valid JSON Schema document does not prove that the stated CAN can actually be Actualized.

### 5.7 CAN prerequisites serialization (D-73)

**[VALIDATED — November 16, 2026; D-73]** For CAN Focus, `Results.prerequisites` is a required JSON **object** with the following **minimum local Draft 2020-12 field contract**:

| Field | Type and obligations |
| --- | --- |
| `needs` | Required **array**, possibly empty; each item is an object with required nonempty `object_id` referencing a NEED, optional nonempty `evaluation_id` |
| `cans` | Required **array**, possibly empty; same field contract, referencing CAN Objects |
| `conditions` | Required **array**, possibly empty; each item has required nonempty `owner_relation_id` and `condition_id`; optional `status` = `satisfied`, `unsatisfied` or `indeterminate` |
| `pathways` | Required **array**, possibly empty; each reference item requires nonempty `pathway_id`, nonempty `definition_version`, and `coverage` = `complete`, `incomplete` or `indeterminate` |
| `inventory_coverage` | Required `complete`, `incomplete` or `indeterminate`, scoped to the **inventory of relevant pathways** |
| `scope` | Required nonempty string |
| `justification` | Required nonempty string |
| `evidence` | Optional array of nonempty evidence-reference strings (possibly empty) |
| `uncertainty` | Optional object; detailed schema OPEN |

**[IDENTITY AND DEPENDENCIES — D-40/D-50/D-53/D-54]** `needs[]` and `cans[]` refer to *Object IDs*; they do not introduce independent artificial NEED/CAN ID classes. Each optional `evaluation_id` references a **separate analytical PowerEvaluation**; when the result is used, the referenced evaluation **must** appear in the enclosing `Dependencies`, and the semantic validator must establish Focus/Object/context/version/evidence compatibility. A prerequisite can be identified without an existing evaluation. A Condition is **not automatically an Object**: `owner_relation_id` plus `condition_id` identifies the scoped reference within an owning NEED/CAN relation. Its versioned Definition, time/Scenario and actual predicate evaluation remain separate. An omitted `status` is not an implicit `indeterminate`.

**[TWO DIFFERENT COMPLETENESS CLAIMS — D-41]** Each `pathways[].coverage` concerns completeness of **identified requirements of one pathway**. In contrast, `inventory_coverage` concerns completeness of **all contextually relevant pathways within `scope`**. Both completeness claims require semantic justification grounded in versions, assumptions and evidence; JSON Schema cannot demonstrate either. A fully described pathway does **not** prove an exhaustive inventory. Empty arrays do **not** establish that no other prerequisites or paths exist, and do not encode truth-valued empty logical expressions.

**[LOGICAL COMPOSITION — D-42/D-43]** Identifying NEEDs, CANs, Conditions and pathways in these arrays does **not** assert that they all apply conjunctively. `all`/`any` groups, recursively referenced pathways and their versioned Definitions remain **separate from this minimum result contract**. The recursive **principle** is validated, but the complete normative JSON expression tree and the semantics of cyclic references remain OPEN. A failed Condition in one known route cannot automatically make the whole CAN `not_actualizable`; unknown alternative routes and incomplete searches must be considered. Nor does a known satisfied Condition prove positive Power or effective Actualization.

**[OPEN]** Actual referent resolution, scoped relation/version/time keys, detailed Condition and pathway evaluation links, reference qualification, exhaustive search methodology, recursive expression schema, cycle solving, inferred necessity/sufficiency, duplicate/list ordering policies, additional metadata closure, evidence and uncertainty internals, and external causal/empirical validation.

### 5.8 CAN potential contributions serialization (D-74)

**[VALIDATED — November 16, 2026; D-74]** A CAN-focused `PowerEvaluation` requires `Results.potential_contributions` as a JSON **object** with the following minimum Draft 2020-12 locally enforceable structure:

| Field | Type / allowed values | Obligation |
| --- | --- | --- |
| `needs` | Array (possibly empty) of candidate NEED objects, each with `object_id` (nonempty string), `relationship: candidate` (exact literal), `justification` (nonempty string), optionally `evidence` (array of nonempty reference strings) | **Required** |
| `search_status` | `not_searched` or `searched` | **Required** |
| `coverage` | `complete`, `incomplete` or `indeterminate` | **Required** |
| `scope` | Nonempty string delimiting candidate NEED search | **Required** |
| `justification` | Nonempty string explaining candidates, search and limitations | **Required** |
| `evidence` | Array (possibly empty) of nonempty reference strings for the overall inventory | Optional |
| `uncertainty` | Object; exact internal schema OPEN | Optional |

**[CANDIDATES, NOT PROOFS — D-31/D-62]** A listed NEED is only a **candidate** for a favorable contribution from the CAN's **contemplated Actualization or its resulting state**. The field `relationship` has one approved value, **`candidate`**: `contribution`, `sufficient`, `necessary`, `observed`, etc. are **not** accepted as promoted values. Establishing causal contribution requires an additional, context-sensitive analysis (including possible with/without comparison); conditional sufficiency, Scenario-relative necessity, actualizability/Power and effectively observed NEED satisfaction are further **distinct** questions. An identified matching NEED is not an already satisfied NEED and does not prove an Actualization event.

**[SEARCH AND COVERAGE]** `search_status` says whether the relevant search was performed, while `coverage` makes a claim about completeness of the identified NEED inventory **within `scope`**. `not_searched` and `coverage: complete` are locally incompatible; even a `searched`/`complete` pair is not empirically confirmed by the JSON schema. Empty `needs: []` means only that no candidate NEED has been **recorded**; it is not evidence that none exists or that CAN contribution is impossible. The dual direction of D-71 `Results.candidate_cans` and D-74 `Results.potential_contributions` is **not** automatic symmetry: Context, Focus, assumptions, evidence and Definition versions may differ (D-54).

**[MULTIPLE NEEDs, ENABLING AND ADVERSE EFFECTS]** A CAN may correspond to multiple NEEDs, act jointly with other CANs, or change conditions enabling another CAN. These dependencies and any indirect causal chains require separately qualified, traceable analyses; they cannot be flattened into proved *direct* CAN-to-NEED causation. This section records candidate **favorable** NEED correspondences, not the complete positive/negative effects of Actualizations on Subject or Environment Objects. Potential adverse effects should be recorded in appropriate Scenario/Actualization analyses (D-62/D-63), including the distinct temporal/causal axes where relevant.

**[OPEN]** The causal contribution verification model and counterfactual evidence, sufficiency of joint CAN sets, enabling dependencies, stable representation of specific envisaged Actualizations, search algorithms and completeness proof, cross-Context reuse and target-ID resolution, indirect/adverse effect schemas, confidence/uncertainty representation, nested metadata restrictions and real-world validation. A local structural validation pass is **not** semantic or scientific validation.

## 6. Tested illustrative cross-Focus fixture

The [seven-record synthetic fixture](../../tests/cases/power_evaluation.json) connects:

1. A car's energy **NEED** evaluation `PE-NEED-001`.
2. A travel **CAN** evaluation `PE-CAN-001` depending analytically on that NEED.
3. A no-recharge **Scenario** evaluation `PE-SCENARIO-001`, referencing the related evaluations.
4. A revised CAN evaluation `PE-CAN-002` retaining the numeric conclusion but revising its epistemic basis (and `PE-SCENARIO-002` as a downstream reassessment).
5. Independent `PE-CAN-003` in a distinct hypothetical recharge Scenario, without a revision link.
6. A separate NEED example `PE-NEED-EXCEPTION` showing **effective dissatisfaction** despite **satisfied temporal compliance** under a modeled authorized exception.

**Engineering test evidence:** GitHub Actions execution [43823308169](https://github.com/Nirgalz/trialectic/actions/runs/43823308169) reported **35 tests passing** (including 20 focused on these structures) on `dev` as of November 16, 2026. That evidence is about these **synthetic cases**, not a scientific or semantic proof of general correctness. CI should be verified again after changes; successful historical runs are not automatically current.

## 7. Still open — not silently approved by D-64–D-74

- Final **JSON Schema**, remaining nested attributes, field types and optionality (including other Focus kinds); treatment of non-applicability outside the **D-70 temporal applicability** contract; reference normalization, revision-link integrity and creation timestamps.
- Quantitative degree semantics, thresholds, comparability and justified aggregation; exact Power calculation across nonexhaustive paths.
- Reuse compatibility proof, impact tests, cycle convergence, alternative-path completeness, version-sensitive cache invalidation and automatic recursive propagation.
- Verified causal sufficiency, actual effects, scenario execution and representative multi-Object examples beyond the synthetic car case.
- Independent reproductions, empirical evaluations, probability calibration, additional adversarial tests and use in real analyses.

**Meaning of D-64:** the author has validated `PowerEvaluation` as the **integrated conceptual data model** and approved its incorporation in the `dev` reference. D-64 **does not resolve** the explicitly OPEN details above or turn illustrative JSON subfields into mandatory rules.


**Normative local schema implementation (November 16, 2026):**
[`power-evaluation.schema.json`](https://github.com/Nirgalz/trialectic/blob/7fc676586a85be504bf145d313b19fefadfb9761/schemas/power-evaluation.schema.json) implements
the approved local PowerEvaluation constraints through D-74. Its
[conformance and exclusions](https://github.com/Nirgalz/trialectic/blob/7fc676586a85be504bf145d313b19fefadfb9761/schemas/power-evaluation.normative.md) are normative
only within that limited structural scope. The existing boundary schema remains
compatible. This implementation does not approve the global normalized proposal,
Object/relation identity, recursive grammar, Scenario result internals or D-75.
