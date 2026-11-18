# AI-assisted Trialectic analysis

For requests using `use trIA-c` or `use trIAd-c`, apply the corresponding
`trIA` or `trIA-dev` mode with the approved Cytoscape.js prototype in
`applications/triad-graph/`. The `-c` suffix selects this interactive
presentation; it does not change the Method, normative schemas, or evidence
standards. `use trIA-dev-c` is the long-form equivalent of `use trIAd-c`.

Read the prototype README and the AI-assisted dialogue protocol. Use the
current analysis records as the graph's data, rather than presenting a demo
fixture as the user's analysis. Keep the conceptual Object graph separate from
the methodological process graph. Clicking a node centers its local relations;
the Overview button returns to the full graph.

Open `applications/triad-graph/index.html` directly when the host supports
local HTML. Show the preview alongside the conversation when possible and
verify that it is visible. The reference map, data and AI exchange modules run
without a server. Hosts that disallow local files may use an authorized static
preview or the documented text/Mermaid fallback. Commands without `-c` retain
their existing presentation convention.

When opening the prototype, pass `?lang=fr` or `?lang=en` in its URL to match
the current discussion language, unless the Analyst explicitly chooses another
interface language. The FR/EN button changes the interface without changing
the analytical records, active Focus or theme. The prototype cannot read chat
language itself; the launch URL supplies this context. Explicit button choices
are retained in that preview's URL across reloads.

The author's approval covers the prototype and these invocation conventions,
not unrequested changes to normative models, automated causal inference, or
empirical validation. Preserve unknowns, provenance, scenario isolation, and
the distinction between knowledge revisions and effective Actualization.

## Reference graphical interface and experiments (approved 2026-11-18)

- The **only** reference graphical/Cytoscape application is
  `applications/triad-graph/` (retaining its animated transitions).
  Other transports and experiments must consume it rather than own a second
  permanent map. Follow [docs/ui-reference.md](docs/ui-reference.md).
- All new graphical experimentation belongs in isolated `experiments/`
  adapters or reference UI extensions. Integrate only explicitly approved
  improvements, then remove redundant prototypes. Git history preserves
  prior versions.
- A UI import of `tria-map-response-v2` is a temporary, human-controlled
  **proposal display**, never a normative Analysis write or a truth verdict.
- MCP integration depends on host capabilities and permissions; do not claim
  the standalone reference UI automatically runs inside ChatGPT/MCP.

- The Codex development workspace in `experiments/tria-codex-workspace/`
  consumes the reference map through its provider-neutral interface. Provider
  clients, routes, authentication, and provider-specific panels belong to the
  workspace that needs them.

## Collaboration workflow (author-approved, 2026-11-17)

This is an **operational collaboration convention**, not a new conceptual rule of the Trialectic Method. Prefer **analysis first, formalization second**. Work efficiently, with proportional effort and without making GitHub activity the default response to conceptual discussions.

### Working on a topic

1. **Frame** the question, purpose, relevant concepts and intended depth; do not impose a form or exhaustive plan on straightforward questions.
2. **Analyze** proposals, objections, alternatives and contradictions directly. Use examples and counterexamples where useful.
3. **Test only as needed** to resolve material uncertainties. A conceptual question normally calls for conceptual testing, not code changes, full regression suites or repeated repository checks.
4. **Conclude when justified**: summarize findings and explicitly distinguish author-validated decisions, working proposals, unresolved questions and the limited significance of synthetic/empirical tests. A topic may remain open or stop after understanding/exploration.
5. **Propose GitHub changes at the appropriate point**: once a topic can be concluded and documentation would be useful, name the relevant files and describe the proposed changes. **Wait for explicit authorization before writing.** Do not propose updates merely to create paperwork.

### GitHub access and changes

- **Read only when necessary:** consult the repository when its exact current content materially affects the response; prefer the smallest set of directly relevant files, and avoid repeating reads when reliable context is already available.
- **No automatic writes:** discussion, exploratory analysis, tests, and generic acknowledgements such as `ok`, `continue`, or `test it` do **not** authorize GitHub modifications. Require an explicit editing request or approval of a concrete proposal that specifies the intended file changes.
- **Integration scope:** before editing, state where the integration lives, which way dependencies point, and which entry points the approval covers. Approval for a development workspace covers that workspace. Promotion into the shared reference requires its own explicit decision.
- **Scoped changes after approval:** work only on the designated branch (use `dev` for development experiments unless otherwise directed), modify only the approved files and preserve unrelated content. Do not add reports, commits or tracking entries for every intermediate conversation.
- **Relevant verification:** use the lightest check that addresses a concrete, material risk. Exploratory changes do **not** imply automatic new tests, regression suites, CI checks or repeated repository reads. Preserve targeted safeguards where security, permissions, data loss or interoperability risks make them necessary. Report what was verified and what was not; never equate syntax/schema checks with functional or scientific validation.
- **Traceability without noise:** identify substantive changes, affected files and resulting commit(s) concisely. Preserve historical decisions and versioned records; do not silently rewrite normative models. New conceptual decisions require explicit author validation.

### Exploration-first development policy (author-approved, 2026-11-18)

This **operational choice for the current exploratory stage** supersedes any implied
default of systematic regression testing or exhaustive technical documentation.
It does not remove the existing tests, amend the Method, or certify prototypes.

- **Priority:** explore the coherence of concepts, counterexamples, competing
  models and architectural alternatives before hardening implementations. The
  current code and interface behaviors are provisional and may be replaced.
- **No automatic test creation:** do not introduce unit, integration,
  non-regression or CI tests merely because code, documentation or a schema
  has changed. First identify the concrete uncertainty or risk that a test
  would resolve. Prefer a brief direct check or a targeted experiment when
  sufficient; defer broad regression coverage until a contract is stabilized.
- **Proportionate exceptions:** perform a narrowly scoped check when it is
  materially necessary to avoid an immediate security, permission, data-loss,
  execution or interoperability failure. Disclose any remaining unverified
  behavior; do not promise compatibility without evidence.
- **Conceptual stress tests remain valuable now:** use simulations,
  contradictions, counterexamples and comparison with alternatives to reveal
  what the Method should change, not to freeze its current interpretation.
- **Minimize GitHub overhead:** read only files needed for the decision;
  group coherent edits, avoid granular commits and successive status checks,
  and write documentation only when it preserves a substantive decision,
  clarifies a real boundary or supports immediate work.
- **Stabilize deliberately later:** when the author judges a conceptual or
  technical contract sufficiently stable, propose relevant automated tests and
  regression guarantees **for that contract**, rather than retrofitting tests
  throughout the exploratory phase.

These principles refine the 2026-11-17 collaboration workflow; its explicit
authorization requirement, branch scope, historical traceability and epistemic
safeguards remain in force.

### Response and closure

- Answer directly in French or the user's chosen language; use precise, non-repetitive reasoning and challenge weak assumptions.
- Do not request redundant confirmations when the intent is clear; however, writing to GitHub always requires the authorization described above.
- When a topic appears ready to close, briefly communicate **conclusion, status, remaining reservations, and (if useful) proposed GitHub file updates**. The Analyst decides whether those updates are made.
- Revisit this workflow only when the Analyst requests or approves changes to it. Keep the operational workflow separate from the Method's conceptual reference and from claims of scientific validation.
