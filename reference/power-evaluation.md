# PowerEvaluation — validated conceptual data model

**Status:** **VALIDATED by author — November 16, 2026 (D-64)**, consolidating D-48–D-63.  
**Branch:** `dev`.  
**Scope:** approved **conceptual data model and named data-structure layers**, **not a final machine-enforced JSON Schema**, production evaluator, exhaustive data contract, or scientific validation.

This companion document summarizes the applicable decisions from the [canonical working reference](trialectic-method.md). In case of ambiguity, consult that reference and [DECISIONS.md](../DECISIONS.md). [Synthetic executable fixtures](../tests/cases/power_evaluation.json) and [unit tests](../tests/test_power_evaluation.py) illustrate and check selected invariants without defining additional normative semantics.

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

**[IMPLEMENTATION — provisional D-66/D-67 boundary schema]** A first [executable Draft 2020-12 boundary schema](../schemas/power-evaluation.boundaries.schema.json) and [11 dedicated structural tests](../tests/test_power_evaluation_schema.py) now exercise the **approved** top-level, Focus and conditional `Results` **boundary rules**. The schema deliberately leaves unapproved nested attributes/types unconstrained, as documented in [`schemas/README.md`](../schemas/README.md). **Passing this partial schema is not a claim that a `PowerEvaluation` is fully structurally or semantically valid**. The full strict JSON Schema still requires further decisions.

### 5.2 Subject, Context and Dependencies serialization (D-68)

**[VALIDATED — November 16, 2026; D-68]** Extend the Draft 2020-12 structural contract with the following **minimum nested shapes**. All referenced identifiers and versions are nonempty strings, with **no prescribed naming prefix**.

- **`Subject`** is a required JSON **object** containing a required **`object_id`**, a nonempty string identifying the central Object.
- **`Context`** is a required JSON **object** containing required **`definition_versions`**, a **nonempty JSON object** mapping nonempty Object-ID keys to nonempty Definition-version strings. This map records the Definitions relevant to the analysis, but structural validation cannot establish that all relevant versions have been included. Optional **`scenario_id`**, when present, is a nonempty string; **a Resolution Scenario must not be required for every evaluation**. Optional **`provenance`**, when present, is an object; optional **`provenance.revises`**, when present, is a nonempty string referring to the earlier evaluation. In a genuine revision it **must be present under D-60**; detecting whether a record represents a revision requires **semantic checking**, not merely examination of the one document.
- **`Dependencies`** is a required JSON **array**, which **may be empty**. Each element is a JSON **object** containing a required **`evaluation_id`** as a nonempty string, referring to another analytical Power evaluation. `[]` means **no referenced analytical evaluation inputs**, **not** absence of conceptual Object/NEED/CAN dependencies.

**[VALIDATION BOUNDARY]** The JSON Schema can check local types, required keys, nonempty identifiers and nonempty version-map entries. The **separate D-65 semantic validator** must resolve referents, identity/versions, context compatibility and revision justification, and must assess whether the relevant versions and dependencies are sufficiently represented. In particular, a correctly shaped `Context.provenance.revises` link is not proof of a valid revision; a correctly shaped `Dependencies` entry is not proof that an evaluation can be reused under D-54.

**[OPEN]** The universal time/interval representation, context assumptions and evidence fields, branch-scoped references, additional metadata, ID normalization, rules to **close** these nested object shapes to extra properties, and the exact structure of `Results` internals remain to be decided. No default `scenario_id`, creation timestamp, mandatory `provenance`, or fixed `O-`/`PE-`/version-prefix formats are introduced. This validation is **not** a final complete JSON Schema.

## 6. Tested illustrative cross-Focus fixture

The [seven-record synthetic fixture](../tests/cases/power_evaluation.json) connects:

1. A car's energy **NEED** evaluation `PE-NEED-001`.
2. A travel **CAN** evaluation `PE-CAN-001` depending analytically on that NEED.
3. A no-recharge **Scenario** evaluation `PE-SCENARIO-001`, referencing the related evaluations.
4. A revised CAN evaluation `PE-CAN-002` retaining the numeric conclusion but revising its epistemic basis (and `PE-SCENARIO-002` as a downstream reassessment).
5. Independent `PE-CAN-003` in a distinct hypothetical recharge Scenario, without a revision link.
6. A separate NEED example `PE-NEED-EXCEPTION` showing **effective dissatisfaction** despite **satisfied temporal compliance** under a modeled authorized exception.

**Engineering test evidence:** GitHub Actions execution [43823308169](https://github.com/Nirgalz/trialectic/actions/runs/43823308169) reported **35 tests passing** (including 20 focused on these structures) on `dev` as of November 16, 2026. That evidence is about these **synthetic cases**, not a scientific or semantic proof of general correctness. CI should be verified again after changes; successful historical runs are not automatically current.

## 7. Still open — not silently approved by D-64–D-68

- Final **JSON Schema**, detailed nested attributes, field types, optionality, `not_applicable` versus `indeterminate`, reference normalization, revision-link integrity and creation timestamps.
- Quantitative degree semantics, thresholds, comparability and justified aggregation; exact Power calculation across nonexhaustive paths.
- Reuse compatibility proof, impact tests, cycle convergence, alternative-path completeness, version-sensitive cache invalidation and automatic recursive propagation.
- Verified causal sufficiency, actual effects, scenario execution and representative multi-Object examples beyond the synthetic car case.
- Independent reproductions, empirical evaluations, probability calibration, additional adversarial tests and use in real analyses.

**Meaning of D-64:** the author has validated `PowerEvaluation` as the **integrated conceptual data model** and approved its incorporation in the `dev` reference. D-64 **does not resolve** the explicitly OPEN details above or turn illustrative JSON subfields into mandatory rules.
