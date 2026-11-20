# trIA AI instructions — application-owned

The trIA application's AI instruction components are distinct from the
**Trialectic Method** and from the reusable **computational formalization**:

| File | Role | Status / authority |
| --- | --- | --- |
| [AGENTS.md](AGENTS.md) | Operational guidance for AI assistance working on trIA files in this scope | Scoped application guidance; inherits root AGENTS |
| [dialogue-protocol.md](dialogue-protocol.md) | Adaptive Analyst–AI dialogue and approved interaction design | Author-approved D-80, D-95, D-97; implementation completeness not guaranteed |
| [portable-instructions.md](portable-instructions.md) | Experimental provider-neutral instruction text loaded by the browser AI chat | Operational, non-normative; currently paired with a separate map response contract |

**Other separate concerns:**

- [Method reference](../../../reference/trialectic-method.md) — conceptual authority.
- [Analysis / PowerEvaluation exchange profiles](../../../schemas/global-model.md)
  — versioned generic data representation.
- [trIA-specific map response contract](../../../protocols/tria/map-response-contract.md)
  — *provisional* UI patch transport, never normative Analysis mutation.
- [Codex experiment's specialized instructions](../../../experiments/tria-codex-workspace/trIA-instructions.md)
  and [prompt tests](../../../experiments/tria-codex-workspace/trIA-prompts.json)
  — kept in the development experiment, not made general trIA requirements.

**Composition:** `applications/ai-chat/app.js` loads
`portable-instructions.md` and then the map-response contract into the
first-turn provider instructions. Do not paste the Method reference into this
file as a competing authority. Existing MCP resource URIs continue to read
the migrated full documents through the updated path allowlists.

**Compat:** historical `reference/tria-ai-instructions.md`,
`applications/ai-assisted-analysis/dialogue-protocol.md` and
`applications/ai-assisted-analysis/AGENTS.md` remain small human-readable
pointers. They are not suitable as the raw full-text payload for an AI host.
