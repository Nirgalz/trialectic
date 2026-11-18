# Trialectic Method

**The Trialectic Method** is a structured, contextual and recursive analytical method to help an analyst **Understand → Explore → Decide**: understand a problem, explore relevant possibilities, and make an informed, argued decision when needed. The three phases form the **complete Method**, while a particular analysis may legitimately end after understanding or after exploration. It examines a **Subject situated in its Environment**, their relationships, and relevant **Semantics**. These perspectives are not three symmetrical or equally mandatory causes. **Objects**, their **NEEDs** and **CANs**, conditions of Actualization and effects are analytical instruments mobilized when relevant. **[D-85, validated November 17, 2026]**

The Method is **an analytical framework, not a universal ontology**. Its **default Advanced Mode explores and compares multiple relevant Resolution Scenarios** where warranted; decisions are supported by transparent reasons, **not** prescribed as uniquely best solutions. The computer/data model serves to **formalize the Method's operations**, not to dictate its purpose. The working reference is maintained at the stable path **`reference/trialectic-method.md`**, with **Git tags** intended to identify versioned snapshots. The Method has **not been scientifically validated**; previous versions remain recoverable through Git history.

## Start here / Commencer ici

The public-facing documentation is available in **English and French**. The overview introduces the framework; the practical guide offers a proposed, step-by-step way to use it. Both are educational adaptations of the [working reference](reference/trialectic-method.md), not separate authoritative specifications or evidence of scientific validation.

| Language | Overview / Présentation | Practical guide / Guide pratique |
|---|---|---|
| English | [Overview](docs/en/overview.md) | [Practical guide](docs/en/practical-guide.md) |
| Français | [Présentation](docs/fr/presentation.md) | [Guide pratique](docs/fr/guide-pratique.md) |

## How it works

The **three phases** are **Understand** (contextualize and critically examine the problem), **Explore** (develop and compare possibilities and Resolution Scenarios), and **Decide** (make a reasoned choice in light of explicit criteria, constraints and uncertainty, or justify deferral). The phases are **recursive**, so a later inquiry may reopen an earlier understanding. The earlier sequence **Subject → NEED/CAN → Actualization → Subject reassessment** remains a *specialized workflow* for relevant problems, not the definition of every analysis. A methodological **Stage** is a local operation; it is not synonymous with these three overarching phases.

- **Object:** an Individual, Group, Technical Object, System, or Semantic Object.
- **NEED:** a necessity attributable to an Object for the existence, maintenance, or realization of a specified state. It may be existential, structural, or both, and may be satisfied without any identifiable CAN Actualization.
- **CAN:** an Object's Potentiality, identified with its own unique Object ID and contextually attributed through the relevant NEED/CAN relationship records. Each NEED is likewise an Object with a unique ID; their reference identities must not be conflated with relation-record IDs.
- **Conditions:** distinguish a CAN's actionability for a specified contribution from NEED satisfaction and the **contextual possibility of the contemplated Actualization**. Identified conditions, unknown pathways and actual outcomes remain separate; the exact operational criteria are still being formalized.
- **Power and Actualization:** **Power is a contextual comparative analytical operation**, not merely a binary positive/negative state. It analyzes relevant NEEDs/CANs of an Object and its Environment to identify satisfied/unsatisfied NEEDs, candidate contributing CANs and possible (including partially possible) Actualizations. **Actualization** is effective implementation and its effects, which prompt reassessment.
- **Dependencies:** conceptual NEED/CAN relations differ from **analytical dependencies among Power evaluations**. A dependency cycle is not automatically an impossibility; its contextual initiating conditions and possible interventions require joint analysis.

- **Object identity and Definition:** an Object has a stable unique ID and a versioned Definition of constituent Objects **plus** relevant properties and relationships. Temporary and Actualised Children track contradictory Scenario branches; historical Definition versions remain recoverable.

The exact procedures for contextual NEED/CAN identification, actionability/Power, Focus transitions, sufficient pathways, branch propagation and scenario comparisons remain research tasks, **not settled tests**.

- **PowerEvaluation data model (D-64):** the validated common six-field structure (`ID`, `Subject`, `Focus`, `Context`, `Dependencies`, `Results`) has specialized NEED, CAN and Resolution Scenario results, explicit revision provenance and context-aware reuse. See the [integrated model](reference/power-evaluation.md) and the [synthetic regression fixtures](tests/cases/power_evaluation.json). The [global Analysis and Scenario Results v2 contracts](schemas/global-model.md) are now normative under D-77/D-78. The semantic/causal Power computation engine and empirical evaluation remain separate work.

## AI-assisted modes: trIA and trIA-dev (D-86/D-87)

**trIA** is the shorthand for the **AI-assisted Trialectic Method** (D-86). Its **representation layer** makes an AI's explicitly presented analysis easier for a human to read, navigate, question and reuse (D-95). The AI conducts and explains the analysis; trIA organizes its visible representation; the human interprets and steers it. This does not expose inaccessible private AI deliberation and does not turn trIA into a proof or inference-verification engine.

The primary view should be a **simple, contextual map of Objects and relevant NEED/CAN connections**. NEED and CAN retain their existing conceptual Object identities; the *meaning of a displayed connection* is clarified by its specific context rather than being reduced to a universally fixed logical operator. Provide qualifications, assumptions, conditions, sources and history **on inspection when useful**, instead of showing all record families by default. Loops may be displayed as such; detecting or solving justificatory circularity is not a prerequisite of the representation.

Both invocation modes use the same underlying Method, including its recursive **Understand → Explore → Decide** phases when relevant; an analysis may stop after understanding or exploration.

| Command | Mode | User-facing purpose |
|---|---|---|
| `use trIA` | **trIA** | Present the AI-assisted analysis with a readable, context-sensitive Object/NEED/CAN representation and selective explanation |
| `use trIAd` | **trIA-dev** | Inspect the same representation in greater technical detail to develop and test the Method and its interface |
| `use trIA-dev` | **trIA-dev** | Alias for `use trIAd` |

**trIA-dev** helps examine the Method during concrete case analyses by surfacing unresolved definitions, ambiguities, contradictions and representation difficulties, without making automated inference appraisal obligatory. It must not assume that structured data proves a claim, invent unnecessary NEED/CAN categories, or treat model compliance as scientific validation. These command conventions describe **AI-assisted use**, not an implemented standalone application or a finalized technical trace format.

### Mermaid visualizations in trIA-dev (D-88)

For the time being, trIA-dev presents **two separate Mermaid graphs** when relevant: a **conceptual graph** of the analyzed Objects and their qualified relationships, and a **methodological graph** of the Understand / Explore / Decide phases, operations, Focus and recursive returns. The two views keep *what is being analyzed* distinct from *how it is analyzed*. Labels, legends and accompanying text must distinguish established claims from assumptions and uncertainty. This is a provisional **visualization convention**, not a change in data models or a requirement to invent inapplicable Objects.

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

- [Repository architecture and sources of truth](docs/architecture.md) — responsibilities, document ownership, implementation boundaries and duplication policy.
- [Canonical reference](reference/trialectic-method.md) — current working document; distinguishes **VALIDATED**, **FORMALIZATION**, and **OPEN** statements. Version snapshots are managed with Git tags rather than numbered filenames; prior revisions can be recovered from Git history.
- [Data models and rationale](reference/data-models.md) — comprehensive cross-reference of current conceptual and data models, why each is distinct, their validation status, and open serialization questions. An explanatory catalogue, **not a new normative schema**.
- [AI-assisted dialogue protocol](applications/ai-assisted-analysis/dialogue-protocol.md) — approved AI interaction design aligned with the current Method and normative data models; implementation and empirical evaluation remain open.
- [trIA response transport](protocols/tria/README.md) — distinct behavioral instructions and experimental map-response contract, not the normative Analysis schema.
- [Application overlap inventory](docs/component-inventory.md) — shared-code candidates and boundaries that should remain separate.
- [AI collaboration workflow](AGENTS.md#collaboration-workflow-author-approved-2026-11-17) — approved working convention for discussing, testing, concluding, proposing and authorizing scoped GitHub updates; not a conceptual Method rule.
- [TODO](TODO.md) — 30 research and development tasks and their statuses.
- [Decision log](DECISIONS.md) — decisions and validation history.
- [Contribution guidelines](CONTRIBUTING.md) — how to propose changes, submit pull requests, and document decisions.
- [License](LICENSE) — Creative Commons Attribution 4.0 International (CC BY 4.0).
- [French–English terminology](terminology/french-english-glossary.md) — approved core translations and additional working equivalents.

## Experimental MCP interoperability (local, read-only)

The [trIA MCP server](applications/tria-mcp/README.md) on `dev` exposes the current reference, assembled v2 exchange schemas and, **only when the operator explicitly lists local files at launch**, version-pinned Analysis snapshots, Object Focus context and non-persistent proposal previews. This is an interoperability prototype, not autonomous AI reasoning, a live Cytoscape synchronization service or a scientific validation of the Method. It never modifies Analysis records; an MCP host may nevertheless transmit returned Analysis content to an external model.

See the [single reference map and graphical experimentation workflow](docs/ui-reference.md).

The [multi-provider AI chat adapter](applications/ai-chat/README.md) no longer
contains a separate Cytoscape renderer. Its provisional proposals can be
imported into the **single animated reference map**. The former synthetic
MCP graph was retired; MCP remains a read-only transport, not a live graph
synchronization engine.

## Working conventions

The author-approved [Cytoscape.js prototype](applications/triad-graph/README.md)
can inspect Objects, qualified relations and Scenarios. `use trIA-c` requests
standard trIA with this view; `use trIAd-c` (or `use trIA-dev-c`) requests
trIA-dev with it. The `-c` suffix selects presentation only (D-90). An interactive
preview beside the conversation depends on host capabilities; otherwise use the
documented fallback. No automatic chat synchronization or empirical validation
is implied. Unsuffixed commands retain their existing convention.

**Experimental UI comparison:** The prototype can now compare simple node inspection
with an explicitly retained Analyst navigation Focus. This is an optional
presentation-layer experiment, not a new approved Method-level Focus primitive,
not a change to `PowerEvaluation.Focus`, and not evidence of comparative usability.
See the [A/B protocol](applications/triad-graph/README.md) and
[exploratory report](research/tria-dev-focus-cytoscape-ab-2026-11-17.md).

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
