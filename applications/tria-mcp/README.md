# trIA — Local MCP reference server (prototype 0.1.0)

**Status:** technical prototype on the `dev` branch; no endorsement as scientific validation, universal AI integration, or live trIA/Cytoscape synchronization.

This is a deliberately narrow first interoperability slice. It exposes the **current public Method reference**, supporting documentation, and **assembled Analysis/PowerEvaluation JSON Schemas v2** to MCP-compatible AI clients. It is read-only: it does **not** analyze or validate user documents, invoke an AI, access conversations, synchronize the interactive map, execute code received from clients, or modify local files.

## Start

Requires **Python 3.11+**, using the standard library only:

```sh
python applications/tria-mcp/server.py
```

The server runs over **stdio**. A normal launch prints **nothing**; the MCP client communicates by newline-delimited JSON-RPC over stdin/stdout. It is not an HTTP endpoint and should be launched by the MCP host application. It needs neither an OpenAI API key nor a GitHub token. It reads the local checkout of this repository.

Example desktop MCP client configuration (adapt the absolute path; consult your client’s own setup instructions):

```json
{
  "mcpServers": {
    "tria-reference": {
      "command": "python",
      "args": ["/absolute/path/to/trialectic/applications/tria-mcp/server.py"]
    }
  }
}
```

## Operations

- **MCP resources:** `resources/list`, `resources/read` — fixed `tria://` URI catalogue.
- **MCP tools:** `tria_list_references`, `tria_read_reference` — tool equivalents for clients that do not surface resources.
- **Protocol revisions:** modern stateless **2026-07-28** (`server/discover`, per-request metadata, `resultType`) and legacy **2025-11-25** (`initialize`, `notifications/initialized`).
- **Data boundaries:** a strict static allowlist of repository files; no arbitrary paths, no access to `.tria-work` queue files, no user Analysis document parameters, no AI/model/network API. JSON Schemas are assembled in memory from the same modular sources used by `tools/validate_analysis.py`; their shape does not prove semantic or causal correctness.

Currently available URIs:

```text
tria://method/reference
tria://method/data-models
tria://method/power-evaluation
tria://method/dialogue-protocol
tria://method/fr/overview
tria://method/en/overview
tria://schema/analysis-v2
tria://schema/power-evaluation-v2
```

The source of conceptual authority is `reference/trialectic-method.md`. The v2 schema files are normative **for their exchange profile**, not a complete computational specification of Understand → Explore → Decide. In particular, the older 2026-11-12 glossary alone does not reflect all later decisions.

## Tests

From the repository root, with project test dependencies installed:

```sh
python -m pip install -r requirements-test.txt
python -m unittest tests.test_mcp_server -v
```

If the `tests` directory is not importable as a package, use the portable form:

```sh
python -m unittest discover -s tests -p 'test_mcp_server.py' -v
```

The existing `dev` GitHub Actions regression workflow discovers this test automatically. Tests check modern and legacy negotiation, resource/tool reads, schema assembly equivalence, invalid URI and mutation rejection, malformed input, oversized frames, and recovery. This is protocol-level testing; real client integration, multi-platform launch, privacy behavior of external AI clients and interface synchronization remain **OPEN**.

## Next steps (proposed, not validated)

1. Test the stdio server against at least two real MCP clients, including a 2025-era and a 2026-era client.
2. Define a **separate opt-in** interface for the user's Analysis records: local access policy, consent, payload minimization, revision traceability and explicit distinction between AI suggestions and applied changes.
3. Integrate trIA Focus/C+ exploration only after formalizing non-destructive read/update boundaries with the existing Work bridge, without claiming access to private reasoning.

**Licensing:** consult the repository's root license and contribution policy. This prototype is not a new conceptual decision.
