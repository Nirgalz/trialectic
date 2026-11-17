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

When the environment supports local execution, start or reuse the prototype
server and open its preview beside the conversation when possible. Verify the
actual result; a queued request is not proof that a sidebar is visible. Do not
promise automatic synchronization or persistence that the host does not expose.
If interactive display is unavailable, explain the limitation and use the
documented text/Mermaid fallback. Commands without `-c` retain their existing
presentation convention.

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
- **Scoped changes after approval:** work only on the designated branch (use `dev` for development experiments unless otherwise directed), modify only the approved files and preserve unrelated content. Do not add reports, commits or tracking entries for every intermediate conversation.
- **Relevant verification:** check changed material in proportion to impact; use appropriate tests for technical/model changes, but avoid repeated or unrelated regression runs. Report what was verified and what was not; never equate syntax/schema checks with functional or scientific validation.
- **Traceability without noise:** identify substantive changes, affected files and resulting commit(s) concisely. Preserve historical decisions and versioned records; do not silently rewrite normative models. New conceptual decisions require explicit author validation.

### Response and closure

- Answer directly in French or the user's chosen language; use precise, non-repetitive reasoning and challenge weak assumptions.
- Do not request redundant confirmations when the intent is clear; however, writing to GitHub always requires the authorization described above.
- When a topic appears ready to close, briefly communicate **conclusion, status, remaining reservations, and (if useful) proposed GitHub file updates**. The Analyst decides whether those updates are made.
- Revisit this workflow only when the Analyst requests or approves changes to it. Keep the operational workflow separate from the Method's conceptual reference and from claims of scientific validation.
