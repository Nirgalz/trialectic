# Separation of concerns — repository responsibilities and migration plan

**Branch:** `dev` · **Inventory date:** 2026-11-20 · **Status:** Wave 1 documentation/instruction ownership migration IMPLEMENTED; remaining target layout PROPOSED.
Author-approved scope: **inventory and planning before any file move or
terminological standardization**. The target tree and placements below are
candidates, **not author-validated restructuring decisions**. The inventory below records the **pre-migration** paths. Subsequent scoped
commits relocated documentation and trIA instructions, updated application
loader/MCP paths and retained legacy pointers; see the implementation log
below. No normative schema or conceptual definition was changed.

Related: [current architectural authority map](architecture.md),
[existing graphical consolidation inventory](component-inventory.md),
[Method](../reference/trialectic-method.md),
[exchange profiles](../schemas/global-model.md),
[RD-04](../research/interaction/human-and-technical-terminology.md),
[FR/EN interface glossary](../terminology/analyst-interface-glossary.md).
This document complements, rather than supersedes, those sources.

## 1. Why separate these concerns?

The **Trialectic Method** specifies analytical concepts, distinctions and
principles; its usefulness and conceptual validity must be explored
independently of any software representation. A **computational formalization**
represents selected aspects of the Method with explicit data types, identifiers,
serialization, constraints, operations and their limits. It is intentionally
reusable **without** trIA, Cytoscape, a particular LLM or an MCP host.
**Presentation** transforms the formalized information into intelligible
language, views and navigation. An **application** assembles capabilities,
adapters, transport and user interaction for a specific environment.
**Research** may investigate any of these without automatically promoting its
findings into normative definitions or data contracts.

The Method's conceptual **NEED** and **CAN** terminology already has a validated
role: `CAN` corresponds to *Potentialité / Potentiality*. Do not claim they
are merely low-level API names, or silently rename Method concepts on the
grounds that an analyst-facing synonym is easier to read.

**Distinct authorities:**

| Layer / cross-cutting concern | Owns | May depend on | Must not decide |
| --- | --- | --- | --- |
| Method / Méthode | Conceptual definitions, analytical operations, assumptions, limits, approved methodological decisions | Its conceptual sources and methodological research | JSON property names, UI widget behavior, LLM/provider specifics |
| Computational formalization / Formalisation | Versioned domain representations, exchange contracts, reference/identity semantics, technical validation, neutral operations | Approved Method concepts and explicitly scoped engineering decisions | What the Method *means*, UI vocabulary, application workflows |
| Presentation / Présentation | Human-facing FR/EN wordings, explanations, visualization abstractions, accessibility guidelines | Method concepts and formalized references when applicable | Factual existence of an Object, truth of a Claim, new NEED/CAN attributions |
| Applications / Applications | trIA assistance, UI runtime, file/work queues, LLM adapters, MCP resources, security/permissions, application transports | Versioned formalization and presentation assets | Universal Method principles or arbitrary changes to shared formalization |
| Research / RD | Hypotheses, comparative experiments, negative cases, recorded limitations | Any concern it is investigating | Normative authority from an unapproved pilot |
| Governance / Gouvernance | Historic decision trail, coordination, contributor rules, release records | All concerns | Automatic conceptual validation merely through a commit or successful test |

**Dependency direction (target):**

```text
Method concepts and decisions
            |
            v
Reusable computational formalization  <--- method-concept cross-reference
            |
       +----+------------------+
       v                       v
Presentation vocabulary       Application transports/adapters
and reusable view projections   (AI, MCP, files, host permissions)
       |                       |
       +----------+------------+
                  v
          trIA (and future applications)

Research investigates every layer; governance records approval and changes.
No dependency upward from the formalization into trIA UI or provider code.
```

Presentation can also use Method definitions directly for plain-language
explanations, but **must not replace** the formalization's authoritative
identifiers with translated labels. Application-specific transport schemas
are not automatically reusable domain schemas.

## 2. Baseline inventory (before Wave 1): source paths and proposed ownership

Current path descriptions derive from inspected `dev` files, entry points,
documentation and import references. **Target destinations are proposed,
not yet created.** Related files are grouped where their responsibility is
similar. "Mixed" flags areas to divide by function **before** moving.

| Current location / representative files | Observed responsibility | Proposed owner / eventual location | Critical dependency or caveat |
| --- | --- | --- | --- |
| `reference/trialectic-method.md` | Current conceptual Method reference | **Method** → `method/reference/` | Existing historical path and links are widely used; don't change without a transition |
| `reference/data-models.md`, `reference/power-evaluation.md` | Explanations connecting concepts, data records and approved profiles — **mixed** | Split conceptual commentary into **Method** and technical contract explanation into **Formalization** → `formalization/docs/` | No second competing definition of Power, NEED or CAN |
| `terminology/french-english-glossary.md` | Conceptual FR/EN equivalents with some technical notes — **mixed** | **Method** vocabulary → `method/terminology/`; technical mappings by link | Keep author-approved translations and historical statuses |
| `terminology/analyst-interface-glossary.md` | Candidate plain-language UI equivalents in FR/EN, technical anchors | **Presentation** → `presentation/terminology/` | The term list is proposed, not a schema enum mapping or concept redefinition |
| `docs/fr/`, `docs/en/` | Explanations of Method for readers | **Method education** → `method/docs/{fr,en}/` | Maintain source reference and keep translations non-authoritative |
| `schemas/model/`, `schemas/global-model.md`, `schemas/README.md` | Adopted versioned Analysis and PowerEvaluation **exchange profiles**, contract explanation | **Formalization** → `formalization/schemas/model/`, `formalization/docs/` | Preserve schema `$id` / URIs, supported 2.0/2.1/2.2 behavior and assembly dependencies |
| `core/schema_loader.py` | Pure assembly of shared schema definitions | **Formalization** → `formalization/core/` | Existing Python imports are public entry points; retain adapters until replaced |
| `tools/validate_analysis.py`, `tools/validate_semantics.py` | Structural validation and **partial** semantic checks | **Formalization** → `formalization/validation/` or CLI facade | Must not advertise full analytical/causal verification |
| `applications/tria-map-data/analysis.js`, `schema-validator.js` | Source Analysis parsing, bounded validation, browser schema bundle | **Candidate Formalization** (parsing/validation); bundle generated for consumers | Browser globals, build scripts and schema sources need an explicit migration map |
| `applications/tria-map-data/focus-cycle.js`, parts of `semantics.js` | Read-only contextual traversal and domain-derived display helpers — **mixed** | Evaluate for **Formalization** only when independent of UI-specific navigation/display | Focus control and analytical Focus must not be conflated; inspect helpers separately |
| `applications/tria-map-data/projection.js`, `object-preview.js` | Renderer-neutral *map projection*, analyst-facing textual inspection | **Presentation / neutral application view adapters**, not the conceptual formalization by default | Even without DOM/Cytoscape, graph layout data and human labels remain a presentation concern |
| `applications/tria-map-data/examples.js`, `build.cjs`, related tests | Demo fixtures, browser schema build, package assembly | **Application experiments** / build tooling; shared source fixtures if reusable | Do not move or split before auditing generated assets and script paths |
| `applications/triad-graph/` | Sole reference Cytoscape interface, navigation, animated transitions, optional Work Local bridge and semantic-set pilot | **Application trIA** → possibly `applications/tria/ui/`; reusable display guides in Presentation | Preserve one reference graph renderer (D-90), local server entry point and current UI behavior |
| `applications/tria-ai-bridge/` | Provider-neutral request/response preparation for trIA | **Application/integration adapter**; review generic extraction only if another consumer needs it | Provider-neutral ≠ independent of trIA's current request semantics |
| `applications/shared/map-protocol.js` | Experimental UI map-patch validation and interpretation | **trIA transport/presentation adapter**, not Formalization domain validation | Temporary proposals never become canonical Analysis records merely by import |
| `schemas/transport/tria-map-response-v2.schema.json`, `protocols/tria/` | trIA provisional map proposal transport, dialogue instructions composition | **trIA transport** → `applications/tria/protocols/` (candidate) | Distinct from accepted Analysis/PowerEvaluation exchange schemas |
| `reference/tria-ai-instructions.md` | Experimental instructions for AI-assisted trIA behavior — **misleading location** | **trIA application instructions** → `applications/tria/ai/` (candidate) | `ai-chat/app.js` fetches the current path; moving breaks startup without adapter |
| `applications/ai-assisted-analysis/` | AI-assisted dialogue protocol and app-specific instructions | **trIA application behavior** → `applications/tria/ai/` | Preserve existing invocation contract; not Method reference |
| `applications/ai-chat/`, `applications/gemini-chat/`, `applications/shared/gemini-client.js` | Multi-provider and historical provider-specific browser adapters | **Applications/integrations** → `applications/tria/adapters/` (candidate) | Do not remove historical client before comparing its remaining uses |
| `applications/tria-mcp/` and its `ui/` probe | Read-only MCP resource distribution, optional host integration/probe | **trIA/integration adapter** → `applications/tria/mcp/` (candidate) | Host security/permissions and resource URIs cannot be delegated to shared domain library |
| `experiments/tria-codex-workspace/` | Codex-specific development workspace, adapted reference map | **Application experiment** under `experiments/` for now | Imports `triad-graph/server.py`; not a second permanent renderer |
| `research/methodology/`, semantic research | Conceptual Method research | **RD** → keep `research/`, classify by thematic concern | Research not normative without approval |
| `research/interaction/`, `research/representation/`, existing Focus pilots | Cognitive, UX and representation pilots; synthetic observations | **RD** → keep `research/`, with links to Presentation/Application | No independent empirical validation inferred from synthetic tests |
| `tests/` and `requirements-test.txt` | Mostly shared schema/validation fixtures and tests, with some transport and integration coverage — **mixed** | Eventually **tests beside each owner**, retaining shared fixture access; defer move | Keep root test entry points/CI valid and cases stable |
| `docs/ui-reference.md`, `docs/component-inventory.md`, `docs/local-codex-workspace.md` | UI reference and experiment integration guidance | **Application/Presentation documentation**, possibly split | `component-inventory.md` already records approved one-renderer boundary |
| `DECISIONS.md`, `TODO.md`, `AGENTS.md`, `README.md`, `CONTRIBUTING.md`, `.github/` | History, project operation, automation and project discovery | **Cross-cutting governance**, keep root while mapping authority by concern | Historic decision IDs must remain stable; no rewriting history to simulate a new module layout |

There is deliberately no universal "formalization = all data-processing JavaScript"
rule. Some pure transformations are **display projections** (therefore
Presentation), whereas a JSON parser or identity/reference validator can be
a reusable domain component (Formalization). Ownership depends on the
**meaning of an operation**, not whether it has a DOM or a network call.

## 2a. Applied Wave 1 changes and remaining boundaries

**Implemented on `dev` (2026-11-20):**

| Concern | Canonical file after migration | Compatibility |
| --- | --- | --- |
| Conceptual Method entry point | [`method/README.md`](../method/README.md) | Full canonical Method remains at stable [`reference/trialectic-method.md`](../reference/trialectic-method.md), **not** duplicated |
| Explanatory model catalogue | [`formalization/docs/data-models.md`](../formalization/docs/data-models.md) | `reference/data-models.md` retained as pointer |
| Explanatory PowerEvaluation specification | [`formalization/docs/power-evaluation.md`](../formalization/docs/power-evaluation.md) | `reference/power-evaluation.md` retained as pointer |
| trIA portable AI prompt | [`applications/tria/ai/portable-instructions.md`](../applications/tria/ai/portable-instructions.md) | `reference/tria-ai-instructions.md` retained as pointer; client fetch now reads full new path |
| trIA approved dialogue design | [`applications/tria/ai/dialogue-protocol.md`](../applications/tria/ai/dialogue-protocol.md) | Old dialogue file is pointer; both MCP implementations load new full file |
| trIA scoped operational guidance | [`applications/tria/ai/AGENTS.md`](../applications/tria/ai/AGENTS.md) | Old AGENTS file is a scoped pointer; current `tria_mcp/catalog.py` loads new full file |

**Not moved yet:** executable `schemas/model/`, `core/schema_loader.py`,
validators, `tria-map-data/`, the reference Cytoscape app, experimental
Codex prompts and Method working reference itself. These preserve versioned
contract, import, test and public-reference compatibility.

**Path compatibility caveat:** old Markdown document URLs remain navigable
but **return a pointer rather than the full previous content**. Consumers
that require complete raw text must switch to the new owner paths. The
known browser AI client and both MCP implementations have been adjusted.
An exhaustive audit of external links, third-party raw-file clients and
host-specific behavior is not yet established.

## 3. Verified current coupling / migration risk points

These are specific observed edges; this is a **focused inventory, not a
complete executable call graph**.

| Consumer | Current dependency | Consequence of an uncoordinated move |
| --- | --- | --- |
| `applications/triad-graph/index.html` | Browser scripts from `../tria-map-data/`, `../tria-ai-bridge/`, `../shared/`, plus local styles/JS and Cytoscape | Relative script URLs break; Browser globals and script order matter |
| `applications/triad-graph/server.py` | Imports `tools.validate_analysis`, `tools.validate_semantics`; serves paths for shared browser assets | Import paths and static asset routing must be updated together |
| `applications/ai-chat/app.js` | Fetches `../../reference/tria-ai-instructions.md` and `../../protocols/tria/map-response-contract.md` | Existing first-turn prompt assembly breaks if files move without rewriting fetch paths |
| `experiments/tria-codex-workspace/server.py` | Imports and serves the reference graph's server, with workspace adapter scripts | A move can break development workspace behavior |
| `core/schema_loader.py` consumers | Shared schema assembly in Python validator and MCP resources | Schema assembly and Python import compatibility need simultaneous checks |
| `schemas/model/` and generated browser schema | Modular `$defs`, shared URIs and versioned Analysis / PowerEvaluation contracts | A file move may affect bundle generation, schema resolution, sample data or consumers despite stable logical schemas |
| `applications/triad-graph/semantic-groups.js` | View-local sets built from source Object IDs | Do not promote display sets to normative Semantic Objects during a refactor |
| `schemas/transport/` and `applications/shared/map-protocol.js` | Temporary proposal format and contextual browser checks | Do not transfer acceptance/approval to canonical records by changing folders |

**Important:** a successful file move, import resolution, or JSON validation
does not establish sound semantic inference, causal attribution, evidence
adequacy or improved accessibility. Separate these claims when reporting work.

## 4. Proposed target tree (not yet created)

```text
trialectic/
  method/
    reference/                 # Conceptual Method, non-software definition
    terminology/               # Validated conceptual vocabulary FR/EN
    docs/{fr,en}/              # Method teaching and explanations
  formalization/
    model/                     # Computational domain model only
    schemas/model/             # Versioned reusable exchange contracts
    core/                      # Shared pure schema/model utilities
    validation/                # Structural and partial semantic verification
    docs/                      # Contract semantics, caveats, compatibility
  presentation/
    terminology/               # Candidate human-facing FR/EN vocabulary
    guidelines/                # Clarity, accessibility, granularity
    projections/               # Optional reusable view models, if warranted
  applications/
    tria/
      ui/                      # Single reference Cytoscape renderer
      ai/                      # AI dialogue and portable prompts
      protocols/               # trIA-specific proposal and host exchanges
      adapters/                # Provider integrations, file/work bridges
      mcp/                     # Read-only host/MCP adapter
  research/                    # Method, formalization, presentation, app RD
  experiments/                 # Isolated, time-bounded experiments
  docs/                        # Repository architecture / governance navigation
  DECISIONS.md                 # Historical shared decisions (do not rewrite)
  TODO.md                      # Cross-cutting coordination
  AGENTS.md                    # Repository-wide operating conventions
```

**Not proposed now:** splitting the repository into several repositories,
reassigning existing normative schema IDs, introducing an automatic
semantic-identity engine, adding duplicate graph renderers or changing
validated concept names simply to match UI words.

## 5. Migration plan: small, independently reviewable steps

| Wave | Purpose / smallest change | Gate before promotion |
| --- | --- | --- |
| 0 — **Completed: map only** | Initial inventory and cross-linking completed before the migration. | Identify significant mixed owners and real consumers. **No code tests required** for documentation-only change. |
| 1 — **Partially implemented**: clarify conceptual vs technical prose | Review `reference/data-models.md`, `reference/power-evaluation.md`, `reference/tria-ai-instructions.md` and bilingual glossaries; decide authoritative conceptual vs contract vs UI passages. | Author approves **specific** ownership and content moves; preserve conceptual and historic sources. |
| 2 — Extract reusable formalization | Establish `formalization/` only after deciding its supported APIs; migrate schema sources, pure assembly and appropriate validators, with path-compatible wrappers/redirects where possible. | Versioned schema IDs, Python CLI/import behavior, MCP schema resources and existing Analysis examples still work; run targeted checks related to changed paths. |
| 3 — Untangle data processing and presentation | Split `tria-map-data/` by purpose: model parser/neutral checks vs projection, descriptions and Focus UI exploration; separate generated browser bundles and source contracts. | Check intended consumers, browser globals, source record immutability, referenced versions and map IDs; do not implement a second renderer. |
| 4 — Collect trIA-specific integrations | Move AI instructions, dialogue protocol, map proposal transport and adapters under an application-specific boundary *only if* paths/host contracts can migrate safely. | Check provider first-turn fetch, map patch review, Work Local endpoints, MCP resource URIs and Codex workspace integration. |
| 5 — Promote selected presentation terminology | Choose FR/EN labels from the candidate glossary and map stable concept IDs to localized labels; evaluate meaningful comprehension. | No schema enum or factual semantic change; verify reverse traceability and accessibility on representative cases. |
| 6 — Consider independent packaging later | Re-evaluate monorepo vs packages/repos if genuinely independent applications consume formalization. | A practical external consumer, stable versioned API, clear maintenance/release strategy; don't split for visual folder symmetry. |

**Operational rule:** no broad move without a separately authorized migration
slice and an inventory of import paths, schema references, service routes and
existing consumers. Prefer compatibility facades first, then removal by
explicit approval. Relevant verification is proportional to what changed;
exploration does not mandate new CI/regression suites.

## 6. Recommended immediate decision points (OPEN)

1. **Confirm layer ownership**, particularly whether generic
   `PowerEvaluation` descriptions belong wholly in Formalization or retain
   a distinct conceptual discussion in Method.
2. **Define the boundary between domain evaluation and UI projection**:
   context traversal may be reusable; layout data, preview wording and semantic
   grouping views generally belong to Presentation.
3. **Decide schema compatibility policy** for versioned public
   `Analysis`/`PowerEvaluation` profiles, URIs and validation APIs before
   renaming directories.
4. **Decide what needs to be shared across applications**: technical domain
   model and schemas first; presentation terminology and rendering are
   optional shared assets with separate lifecycles.
5. **Preserve provisional status of accessible labels**: selecting
   `Potentialité` on a card does not redefine `CAN` nor commit any
   other proposed `NEED` wording as normative.

**Recommendation:** confirm this responsibility matrix as the working
baseline, then tackle **Wave 1**, the split of mixed conceptual/technical
documentation, before a large code relocation. A final naming or package
decision should follow that boundary clarification, not precede it.
