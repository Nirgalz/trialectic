# Trialectic Method

**The Trialectic Method** is an interdisciplinary, contextual, systemic, and recursive analytical framework for examining **Objects**, their **NEEDs** and **CANs**, relevant Conditions of Actualization, and effects on Objects and their relationships. The Method selects an **Object as Subject**, and can examine other Objects as Secondary Subjects. Subject, Environment, and Semantics are relevant, non-symmetrical analytical perspectives rather than universal causes.

The Method is **an analytical framework, not a universal ontology**. Its **default Advanced Mode explores and compares multiple relevant Resolution Scenarios** for complex problems, rather than prescribing a uniquely best solution. The working reference is maintained at the stable path **`reference/trialectic-method.md`**, with **Git tags** intended to identify versioned snapshots. The Method has **not been scientifically validated**; previous versions remain recoverable through Git history.

## Start here / Commencer ici

The public-facing documentation is available in **English and French**. The overview introduces the framework; the practical guide offers a proposed, step-by-step way to use it. Both are educational adaptations of the [working reference](reference/trialectic-method.md), not separate authoritative specifications or evidence of scientific validation.

| Language | Overview / Présentation | Practical guide / Guide pratique |
|---|---|---|
| English | [Overview](docs/en/overview.md) | [Practical guide](docs/en/practical-guide.md) |
| Français | [Présentation](docs/fr/presentation.md) | [Guide pratique](docs/fr/guide-pratique.md) |

## How it works

A methodological **Stage** determines the current **Focus**. The adopted analytical sequence is: **Subject** (Main Subject selected) → **NEED or CAN** → **Actualization** → reassessment of the **Subject**, with parallel analyses of Secondary Subjects where useful.

- **Object:** an Individual, Group, Technical Object, System, or Semantic Object.
- **NEED:** a necessity attributable to an Object for the existence, maintenance, or realization of a specified state. It may be existential, structural, or both, and may be satisfied without any identifiable CAN Actualization.
- **CAN:** an Object's Potentiality, identified with its own unique Object ID and contextually attributed through the relevant NEED/CAN relationship records. Each NEED is likewise an Object with a unique ID; their reference identities must not be conflated with relation-record IDs.
- **Conditions:** distinguish a CAN's actionability for a specified contribution from NEED satisfaction and the **contextual possibility of the contemplated Actualization**. Identified conditions, unknown pathways and actual outcomes remain separate; the exact operational criteria are still being formalized.
- **Power and Actualization:** **Power is a contextual comparative analytical operation**, not merely a binary positive/negative state. It analyzes relevant NEEDs/CANs of an Object and its Environment to identify satisfied/unsatisfied NEEDs, candidate contributing CANs and possible (including partially possible) Actualizations. **Actualization** is effective implementation and its effects, which prompt reassessment.
- **Dependencies:** conceptual NEED/CAN relations differ from **analytical dependencies among Power evaluations**. A dependency cycle is not automatically an impossibility; its contextual initiating conditions and possible interventions require joint analysis.

- **Object identity and Definition:** an Object has a stable unique ID and a versioned Definition of constituent Objects **plus** relevant properties and relationships. Temporary and Actualised Children track contradictory Scenario branches; historical Definition versions remain recoverable.

The exact procedures for contextual NEED/CAN identification, actionability/Power, Focus transitions, sufficient pathways, branch propagation and scenario comparisons remain research tasks, **not settled tests**.

- **PowerEvaluation data model (D-64):** the validated common six-field structure (`ID`, `Subject`, `Focus`, `Context`, `Dependencies`, `Results`) has specialized NEED, CAN and Resolution Scenario results, explicit revision provenance and context-aware reuse. See the [integrated model](reference/power-evaluation.md) and the [synthetic regression fixtures](tests/cases/power_evaluation.json). The [normative local JSON Schema](schemas/power-evaluation.schema.json) implements approved structural constraints through D-74; see its [scope and exclusions](schemas/power-evaluation.normative.md). The [global Analysis and Scenario Results v2 contracts](schemas/global-model.md) are now normative under D-77/D-78. The semantic/causal Power computation engine and empirical evaluation remain separate work.

## Current development

The Method is currently being **developed, formalized, and critically examined** through:
- Conceptual clarification and documentation of definitions, distinctions, and decisions.
- Construction of a reproducible analytical protocol, including contextual NEED/CAN identification, actionability, assessment of Power and separate Scenario generation/evaluation.
- Exploration and comparison of multiple Resolution Scenarios, recursive effects, semantic dependencies, and illustrative cases.
- Preparation of comparative and empirical tests to determine when the framework provides useful results.

These are **development and research activities**, not demonstrated practical effectiveness.

## Potential applications

Subject to further development and evaluation, the Method could support:
- **Individuals and social groups:** analysis of behavior, relationships, and conflicts.
- **Institutions and public policy:** examination of constraints, alternatives, and distributive consequences.
- **Organizations and technical systems:** analysis of dependencies, design choices, and effects on stakeholders.
- **Philosophy and semantics:** clarification of meanings, conceptual structures, and disagreements.
- **Artificial intelligence:** adaptive dialogue that identifies relevant Potentialities, conditions, uncertainties, and possible revisions.

These are **potential applications, not validated use cases**. Comparative value, reproducibility, and practical limits remain open research questions.

## Repository documents

- [Canonical reference](reference/trialectic-method.md) — current working document; distinguishes **VALIDATED**, **FORMALIZATION**, and **OPEN** statements. Version snapshots are managed with Git tags rather than numbered filenames; prior revisions can be recovered from Git history.
- [Data models and rationale](reference/data-models.md) — comprehensive cross-reference of current conceptual and data models, why each is distinct, their validation status, and open serialization questions. An explanatory catalogue, **not a new normative schema**.
- [TODO](TODO.md) — 30 research and development tasks and their statuses.
- [Decision log](DECISIONS.md) — decisions and validation history.
- [Contribution guidelines](CONTRIBUTING.md) — how to propose changes, submit pull requests, and document decisions.
- [License](LICENSE) — Creative Commons Attribution 4.0 International (CC BY 4.0).
- [French–English terminology](terminology/french-english-glossary.md) — approved core translations and additional working equivalents.

## Working conventions

- **Explicit approval:** no conceptual modification is integrated into the main reference without the author's explicit validation.
- **Language:** English is the reference-document language; discussion may take place in French or English.
- **Evidence:** conceptual approval is not scientific validation. Hypotheses, formalizations, and unresolved questions remain clearly distinguished.
- **Documentation workflow:** GitHub is the sole repository for reference documents, decisions, tasks, and version history. Keep the reference filename stable; record version snapshots through Git tags at explicit commits (tag creation is a separate action).

## License and reuse

Unless otherwise stated, the original non-software content of this repository is
licensed under the [Creative Commons Attribution 4.0 International license (CC BY 4.0)](LICENSE).
You may copy, redistribute, translate, and adapt it, including for commercial
purposes, provided you give appropriate credit, link to the license, and indicate
changes. Adaptations do **not** have to use the same license.

For attribution, identify the **Trialectic Method** and the relevant credited
authors or contributors, link to this repository and the license where
reasonably practicable, and state whether you made changes. Attribution does
not imply endorsement by the authors or maintainers.

The license applies to copyrightable expressions in the repository, not to
abstract ideas or methodological principles as such. Third-party materials
retain their own rights; future software should carry a separate software license.

Independent adaptations are welcome but must not be presented as approved
official versions without authorization. Only explicitly validated changes
become part of the maintained reference.
