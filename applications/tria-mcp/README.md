# trIA — Local MCP server (prototype 0.2.0)

**Status:** technical experiment on the `dev` branch. It does not prove scientific validity, correctness of inferred relations, suitability for all MCP clients, or live trIA/Cytoscape integration.

This server exposes (1) publicly maintained Trialectic Method references and assembled v2 exchange schemas, and (2) **only if the operator opts in**, a bounded, read-only view of specified local Analysis files. It uses standard-library Python 3.11+, with **no external AI or GitHub API key**. The server never writes an Analysis, updates an evaluation, triggers an Actualization, invokes a model, or automatically approves a proposal.

## Run it

**References only** (the default; no private file access):

```sh
python applications/tria-mcp/server.py
```

**Explicitly authorize one or more Analysis JSON files** at launch:

```sh
python applications/tria-mcp/server.py --allow-analysis "/absolute/path/to/analysis.json"
```

Windows example (replace with a file you explicitly choose):

```powershell
python applications/tria-mcp/server.py --allow-analysis "C:\\Users\\your-user\\Documents\\analysis.json"
```

Multiple files require repeating `--allow-analysis` (maximum 10). Only absolute filenames are accepted. No automatic folder scans occur; symbolic links in approved paths are refused. To revoke access, stop this MCP process and relaunch without that argument. There is no network listener or local HTTP endpoint: the MCP client starts the server as a **stdio** child process. Normal stdout carries only newline-delimited JSON-RPC.

Example generic MCP client configuration (replace with your absolute paths):

```json
{
  "mcpServers": {
    "tria-local": {
      "command": "python",
      "args": [
        "/absolute/path/to/trialectic/applications/tria-mcp/server.py",
        "--allow-analysis",
        "/absolute/path/to/selected-analysis.json"
      ]
    }
  }
}
```

**Privacy warning:** granting access to a file means an MCP-connected AI client can request its contents and may send returned content to its model provider. The absence of a network call **from this server** is not a guarantee that data stay offline in the client. Only approve files you are willing to expose to that configured AI client. Review its privacy, confirmation and tool-call policies. Do not place private Analysis files in the public repository.

## Experimental Conversation Panel (opt-in)

Start the same read-only MCP server with an **optional** three-Object Cytoscape
MCP Apps interface:

```sh
python applications/tria-mcp/server.py --enable-panel
```

With this flag, the server additionally advertises:

- MCP resource `ui://tria/focus-panel` with MIME type
  `text/html;profile=mcp-app`: **one self-contained HTML document** with the
  repository's existing Cytoscape.js 3.30.4 library embedded at resource-read
  time. No CDN, npm install, Node.js runtime, or separate HTML server is needed.
- Tool `tria_open_focus_panel`, with an OpenAI MCP extension
  `_meta["openai/ui"]["entrypoints"] = [{"type": "thread"}]`.
  Supported clients may offer a conversation side-panel tab for this tool.
  The tool accepts `{}` and returns a clearly labeled **synthetic** fixture.

The prototype's graph contains only **Association**, **Mairie** and
**Habitants**; dashed links are hypotheses. A click changes the *navigation*
Focus locally and attempts `ui/update-model-context` after a successful MCP Apps
handshake. Only clicking **Approfondir ce Focus dans ChatGPT** explicitly sends
a `ui/message` request. This request asks for a qualified investigation,
preserving the distinction between the navigation Focus and a typed
PowerEvaluation Focus. **No response is automatically applied to the graph**.
No user Analysis file is required or read for this demonstration. The existing
six MCP tools and eight public resources are unchanged.

The panel communicates over MCP Apps `postMessage` and requires a **compatible
MCP Apps host** with the server correctly installed/connected. It cannot
independently control ChatGPT's window layout, guarantee that the host enables
its conversation-tab entrypoint or claim support in ordinary ChatGPT Web. In
the current OpenAI MCP Extensions specification, Web support refers to the
**Work browser**, not classic ChatGPT. Test in an eligible ChatGPT Desktop/Work
environment; do not equate this protocol-level test with a real-client test.

When the panel is disabled (the default), `tools/list` and `resources/list`
continue to expose precisely the same items as v0.2.0, without a UI entrypoint.

Run deterministic protocol and embedded JavaScript syntax checks with:

```sh
python -m unittest discover -s tests -p 'test_mcp*.py' -v
```

A future iteration may handle approved candidate proposals via an explicit
host-to-app update contract, but must not silently conflate a candidate,
epistemic assessment or simulated Scenario with an Actualization.

## Tools

| Tool | Behavior |
| --- | --- |
| `tria_list_references` | Lists 8 public references/schemas |
| `tria_read_reference` | Reads an exact allowlisted `tria://` URI |
| `tria_list_analyses` | Lists only explicitly authorized snapshots and their SHA-256 hashes; without opt-in returns `[]` |
| `tria_read_analysis_section` | Reads a `header` or one selected v2 collection (Objects, Definitions, relations, Scenarios, claims, evidence, etc.) with pagination |
| `tria_explore_focus` | Extracts the selected Object, Definitions, directly related NEED/CAN records and neighboring Objects; identifies Scenarios whose recorded Objects overlap the local context |
| `tria_prepare_proposal` | Returns an ephemeral, qualified proposal with `requires_human_review`; **no file writing, approval or automatic merge** |

All Analysis reading tools require the `analysis_ref` returned by `tria_list_analyses` and the **same exact `snapshot_hash`**. Each call rereads the chosen file; if it changed, the old hash is refused. Re-list and review changes instead of silently carrying forward earlier conclusions. `analysis_ref` is a per-process opaque file selector (`a1`, `a2`, etc.), never a filesystem path provided by the model.

The `tria_explore_focus` operation performs **structural extraction** only. It preserves recorded relation types, versions, attribution and claims as they appear. A Scenario listed for review is not proved to be affected. Finding a neighbor is not a new causal Inference, nor does inspecting a node change the normative `PowerEvaluation.Focus`. A client AI must distinguish facts, recorded hypotheses, unknowns and suggested revisions. The `tria_prepare_proposal` preview deliberately supports only `hypothesis`, `question` and `interpretation` statuses; its result is not persisted.

## Public resources

- `tria://method/reference` — current conceptual reference (not merely the November 12 snapshot)
- `tria://method/data-models`
- `tria://method/power-evaluation`
- `tria://method/dialogue-protocol`
- `tria://method/fr/overview`
- `tria://method/en/overview`
- `tria://schema/analysis-v2`
- `tria://schema/power-evaluation-v2`

The Analysis reader checks only a limited envelope and collection types; it **does not** run full JSON Schema validation, referential integrity checks or semantic verification. Validate source files separately with `tools/validate_analysis.py` and `tools/validate_semantics.py` before drawing conclusions.

The JSON Schemas are assembled in memory from the modular sources used by `tools/validate_analysis.py`. They are **normative for the v2 exchange profile**, not a complete computational implementation of the three recursive phases **Understand → Explore → Decide**. Validation of a schema alone never establishes semantic or factual correctness.

## Protocol and tests

Supported transports: **stdio only**. Protocol revisions supported in this experiment: stateless **2026-07-28** (`server/discover`, per-request metadata) and handshake-era **2025-11-25** (`initialize`, `notifications/initialized`). Different hosts may support different revisions.

Run from the checkout root:

```sh
python -m pip install -r requirements-test.txt
python -m unittest discover -s tests -p 'test_mcp*.py' -v
```

The existing `dev` workflow runs the added tests via the repository's full test discovery. Tests cover default-deny, approved-file opt-in, read-only Focus extraction, bounded section reads, snapshots changing between calls, invalid references and proposal previews, as well as both MCP protocol revisions. They are protocol-level regressions, not real-client acceptance tests.

## Next boundaries to specify

1. Test with real MCP desktop clients and check negotiated protocol, tool approvals and Windows path handling.
2. Decide whether to support a **separate, revocable user approval for each requested Analysis read**, rather than launch-time approval of selected files.
3. Define non-destructive mapping of AI Focus suggestions to the Cytoscape representation and a human-approved, versioned revision workflow. This must avoid silently changing unrelated Scenarios, inventing evidence, or conflating a changed assessment with an actual Actualization.

Related decisions: D-85 (phases), D-89 (global relevance), D-95 (representation rather than access to private reasoning) and D-97 (user-driven Focus and C+).
