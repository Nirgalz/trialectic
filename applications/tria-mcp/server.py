"""Read-only trIA MCP server (stdio, Python standard library only).

Exposes public Method references, assembled schemas and optional, explicitly
approved local Analysis snapshots. The optional --enable-panel flag exposes a
synthetic Cytoscape MCP Apps conversation panel. The server never changes user
Analysis files, runs language models or makes external AI requests.
Supports MCP 2026-07-28 and the 2025-11-25 initialization protocol.
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from local_analysis import ApprovedAnalyses, AnalysisError
from panel_ui import UI_URI, UI_MIME, PANEL_TOOL, panel_resource, panel_tool_result

ROOT = Path(__file__).resolve().parents[2]
MODEL = ROOT / "schemas" / "model"
VERSION = "0.2.0"
MODERN = "2026-07-28"
LEGACY = "2025-11-25"
SUPPORTED = [MODERN, LEGACY]
MAX_FRAME = 65536
MAX_RESOURCE = 750000
SERVER_INFO = {"name": "tria-reference", "version": "0.2.0"}
APPROVED = ApprovedAnalyses()
PANEL_ENABLED = False  # Opt-in; the default reference-only behavior is unchanged.
INSTRUCTIONS = (
    "Only analyses selected at launch may be read. MCP clients may forward their content to an external AI. "
    "Proposed revisions are previews only, never applied or persisted. "
    "Use these public, version-controlled documents as source material. "
    "Understand, Explore and Decide are recursive phases, not compulsory "
    "steps in every analysis. Subject, Environment and Semantics are contextual "
    "perspectives, not symmetric causes. Distinguish validated definitions, "
    "working formalizations and open questions. trIA represents explicitly "
    "communicated reasoning, not private model deliberation. Neither these "
    "references nor their JSON schemas establish empirical correctness."
)

# No user-supplied filesystem path is accepted. A schema URI returns the
# assembled normative v2 schema, not an incomplete source fragment.
CATALOG = (
    ("tria://method/reference", "Working Trialectic Method reference",
     "reference/trialectic-method.md", "text/markdown"),
    ("tria://method/data-models", "Data model rationale",
     "reference/data-models.md", "text/markdown"),
    ("tria://method/power-evaluation", "PowerEvaluation reference",
     "reference/power-evaluation.md", "text/markdown"),
    ("tria://method/dialogue-protocol", "AI-assisted dialogue protocol",
     "applications/ai-assisted-analysis/dialogue-protocol.md", "text/markdown"),
    ("tria://method/fr/overview", "Présentation de la Méthode",
     "docs/fr/presentation.md", "text/markdown"),
    ("tria://method/en/overview", "Trialectic Method overview",
     "docs/en/overview.md", "text/markdown"),
    ("tria://schema/analysis-v2", "Assembled Analysis JSON Schema v2",
     None, "application/schema+json"),
    ("tria://schema/power-evaluation-v2", "Assembled PowerEvaluation JSON Schema v2",
     None, "application/schema+json"),
)
ENTRIES = {uri: (name, rel, mime) for uri, name, rel, mime in CATALOG}


class ProtocolError(Exception):
    def __init__(self, code, message):
        self.code = code
        self.message = message


def safe_read(path):
    """Read allowlisted local repository files only; never follow outside links."""
    base = ROOT.resolve()
    resolved = path.resolve()
    if not resolved.is_relative_to(base) or not resolved.is_file():
        raise ProtocolError(-32603, "Reference file unavailable")
    if resolved.stat().st_size > MAX_RESOURCE:
        raise ProtocolError(-32603, "Reference exceeds size limit")
    return resolved.read_text(encoding="utf-8")


def assembled_schemas():
    analysis = json.loads(safe_read(MODEL / "analysis.json"))
    power = json.loads(safe_read(MODEL / "power-evaluation.json"))
    power["properties"].update(json.loads(safe_read(MODEL / "evaluation-context.json")))
    analysis_defs, evaluation_defs = {}, {}
    for path in sorted((MODEL / "types").rglob("*.json")):
        target = evaluation_defs if path.parent.name == "evaluation" else analysis_defs
        for key, definition in json.loads(safe_read(path)).items():
            if key in target:
                raise ProtocolError(-32603, "Duplicate schema definition")
            target[key] = definition
    analysis["$defs"] = analysis_defs
    power["$defs"] = evaluation_defs
    return analysis, power


def read_resource(uri):
    if PANEL_ENABLED and uri == UI_URI:
        return panel_resource(safe_read, ROOT)
    if not isinstance(uri, str) or uri not in ENTRIES:
        raise ProtocolError(-32602, "Unknown resource URI")
    _, rel, mime = ENTRIES[uri]
    if rel is None:
        schemas = assembled_schemas()
        content = schemas[0] if uri == "tria://schema/analysis-v2" else schemas[1]
        content = json.dumps(content, ensure_ascii=False, sort_keys=True, indent=2)
    else:
        content = safe_read(ROOT / rel)
    return {"uri": uri, "mimeType": mime, "text": content}


def resources():
    items = [{"uri": uri, "name": name, "mimeType": mime,
              "description": "Public read-only repository reference"}
             for uri, name, _, mime in CATALOG]
    if PANEL_ENABLED:
        items.append({"uri": UI_URI, "name": "trIA navigation Focus panel",
                      "mimeType": UI_MIME,
                      "description": "Self-contained experimental Cytoscape MCP App"})
    return items


TOOLS = [
    {
        "name": "tria_list_references",
        "title": "List trIA references",
        "description": "List public Method references and assembled normative schemas. No user analysis is read.",
        "inputSchema": {"type": "object", "additionalProperties": False},
        "annotations": {"readOnlyHint": True, "destructiveHint": False,
                        "idempotentHint": True, "openWorldHint": False},
    },
    {
        "name": "tria_read_reference",
        "title": "Read a trIA reference",
        "description": "Read one allowlisted public Method reference or assembled v2 schema by its exact URI.",
        "inputSchema": {
            "type": "object",
            "properties": {"uri": {"type": "string", "enum": list(ENTRIES)}},
            "required": ["uri"], "additionalProperties": False,
        },
        "annotations": {"readOnlyHint": True, "destructiveHint": False,
                        "idempotentHint": True, "openWorldHint": False},
    },
]


# These tools are visible even when no files have been allowed. In that case
# list returns [], and all reads are rejected. No path is accepted from the client.
TOOLS.extend([
    {
        "name": "tria_list_analyses",
        "description": "List only locally approved Analysis snapshots and their hashes; no arbitrary file discovery.",
        "inputSchema": {"type": "object", "additionalProperties": False},
    },
    {
        "name": "tria_read_analysis_section",
        "description": "Read a bounded section of an explicitly approved Analysis at the exact snapshot hash. Use header or an approved v2 collection name.",
        "inputSchema": {"type": "object", "required": ["analysis_ref", "snapshot_hash", "section"],
                        "properties": {
                            "analysis_ref": {"type": "string"},
                            "snapshot_hash": {"type": "string"},
                            "section": {"type": "string", "enum": [
                                "header", "objects", "definitions", "relations", "can_affiliations",
                                "conditions", "pathways", "inventories", "scenarios", "events",
                                "condition_assessments", "power_assessments", "effects",
                                "claims", "evidence_items", "evidence_reviews", "claim_assessments"]},
                            "offset": {"type": "integer", "minimum": 0},
                            "limit": {"type": "integer", "minimum": 1, "maximum": 25},
                        }, "additionalProperties": False},
    },
    {
        "name": "tria_explore_focus",
        "description": "Read a structurally related Object Focus (versioned Definitions, linked NEED/CAN Relations and candidate Scenarios) without making a new causal claim.",
        "inputSchema": {"type": "object", "required": ["analysis_ref", "snapshot_hash", "object_id"],
                        "properties": {
                            "analysis_ref": {"type": "string"},
                            "snapshot_hash": {"type": "string"},
                            "object_id": {"type": "string"},
                        }, "additionalProperties": False},
    },
    {
        "name": "tria_prepare_proposal",
        "description": "Return an ephemeral, explicitly hypothetical revision proposal preview for human review. Does not store or apply changes.",
        "inputSchema": {"type": "object", "required": [
                            "analysis_ref", "snapshot_hash", "kind", "description",
                            "epistemic_status", "rationale"],
                        "properties": {
                            "analysis_ref": {"type": "string"},
                            "snapshot_hash": {"type": "string"},
                            "kind": {"type": "string", "enum": ["object", "relation", "condition", "scenario", "other"]},
                            "target_id": {"type": ["string", "null"]},
                            "description": {"type": "string", "minLength": 1, "maxLength": 3000},
                            "epistemic_status": {"type": "string", "enum": ["hypothesis", "question", "interpretation"]},
                            "rationale": {"type": "string", "minLength": 1, "maxLength": 3000},
                        }, "additionalProperties": False},
    },
])
for tool in TOOLS[2:]:
    tool["annotations"] = {"readOnlyHint": True, "destructiveHint": False,
                           "idempotentHint": True, "openWorldHint": False}



def result_for_era(payload, modern):
    if modern:
        return {
            "resultType": "complete",
            **payload,
            "_meta": {"io.modelcontextprotocol/serverInfo": SERVER_INFO},
        }
    return payload


def response(identifier, result=None, error=None):
    envelope = {"jsonrpc": "2.0", "id": identifier}
    if error is None:
        envelope["result"] = result
    else:
        envelope["error"] = {"code": error.code, "message": error.message}
    return envelope


def require_object(value, name):
    if not isinstance(value, dict):
        raise ProtocolError(-32602, name + " must be an object")
    return value


def is_modern(params, initialized):
    meta = params.get("_meta", {})
    if isinstance(meta, dict) and "io.modelcontextprotocol/protocolVersion" in meta:
        if meta["io.modelcontextprotocol/protocolVersion"] != MODERN:
            raise ProtocolError(-32602, "Unsupported protocol version; supported: " + ", ".join(SUPPORTED))
        if not isinstance(meta.get("io.modelcontextprotocol/clientCapabilities"), dict):
            raise ProtocolError(-32602, "Missing clientCapabilities metadata")
        return True
    if initialized:
        return False
    raise ProtocolError(-32600, "Initialize a legacy session or provide modern request metadata")


def handle(message, state):
    if not isinstance(message, dict) or message.get("jsonrpc") != "2.0":
        return response(None, error=ProtocolError(-32600, "Invalid JSON-RPC request"))
    method = message.get("method")
    identifier = message.get("id")
    if not isinstance(method, str):
        return response(None, error=ProtocolError(-32600, "Missing JSON-RPC method"))
    if "id" not in message:  # Notifications are never acknowledged.
        if method == "notifications/initialized" and state["pending_legacy"]:
            state["initialized"] = True
        return None
    if isinstance(identifier, bool) or not isinstance(identifier, (str, int)):
        return response(None, error=ProtocolError(-32600, "Invalid request id"))

    try:
        params = require_object(message.get("params", {}), "params")
        if method == "initialize":
            if state["initialized"]:
                raise ProtocolError(-32600, "Legacy session already initialized")
            if not isinstance(params.get("protocolVersion"), str):
                raise ProtocolError(-32602, "Missing protocolVersion")
            state["pending_legacy"] = True
            return response(identifier, {
                "protocolVersion": LEGACY,
                "capabilities": {"resources": {"subscribe": False, "listChanged": False},
                                 "tools": {"listChanged": False}},
                "serverInfo": SERVER_INFO,
                "instructions": INSTRUCTIONS,
            })
        if method == "server/discover":
            if not is_modern(params, False):
                raise ProtocolError(-32602, "Modern protocol metadata required")
            return response(identifier, result_for_era({
                "supportedVersions": SUPPORTED,
                "capabilities": {"resources": {}, "tools": {}},
                "instructions": INSTRUCTIONS,
            }, True))

        modern = is_modern(params, state["initialized"])
        if method == "ping" and not modern:
            return response(identifier, {})
        if method == "resources/list":
            if params.get("cursor") is not None:
                raise ProtocolError(-32602, "Pagination is not supported")
            payload = {"resources": resources()}
        elif method == "resources/read":
            payload = {"contents": [read_resource(params.get("uri"))]}
        elif method == "tools/list":
            if params.get("cursor") is not None:
                raise ProtocolError(-32602, "Pagination is not supported")
            payload = {"tools": TOOLS + ([PANEL_TOOL] if PANEL_ENABLED else [])}
        elif method == "tools/call":
            name = params.get("name")
            arguments = require_object(params.get("arguments", {}), "arguments")
            if PANEL_ENABLED and name == PANEL_TOOL["name"] and not arguments:
                return response(identifier, result_for_era(panel_tool_result(), modern))
            if name == "tria_list_references" and not arguments:
                text = json.dumps(resources(), ensure_ascii=False, indent=2)
            elif name == "tria_read_reference" and set(arguments) == {"uri"}:
                text = read_resource(arguments["uri"])["text"]
            elif name == "tria_list_analyses" and not arguments:
                text = json.dumps(APPROVED.list_analyses(), ensure_ascii=False)
            elif name == "tria_read_analysis_section" and {"analysis_ref", "snapshot_hash", "section"} <= set(arguments) and set(arguments) <= {"analysis_ref", "snapshot_hash", "section", "offset", "limit"}:
                text = json.dumps(APPROVED.section(arguments["analysis_ref"], arguments["snapshot_hash"],
                    arguments["section"], arguments.get("offset", 0), arguments.get("limit", 20)), ensure_ascii=False)
            elif name == "tria_explore_focus" and set(arguments) == {"analysis_ref", "snapshot_hash", "object_id"}:
                text = json.dumps(APPROVED.focus(arguments["analysis_ref"], arguments["snapshot_hash"],
                    arguments["object_id"]), ensure_ascii=False)
            elif name == "tria_prepare_proposal" and {"analysis_ref", "snapshot_hash", "kind", "description", "epistemic_status", "rationale"} <= set(arguments) and set(arguments) <= {"analysis_ref", "snapshot_hash", "kind", "target_id", "description", "epistemic_status", "rationale"}:
                text = json.dumps(APPROVED.proposal(arguments["analysis_ref"], arguments["snapshot_hash"],
                    arguments["kind"], arguments.get("target_id"), arguments["description"],
                    arguments["epistemic_status"], arguments["rationale"]), ensure_ascii=False)
            else:
                raise ProtocolError(-32602, "Unknown tool or invalid arguments")
            payload = {"content": [{"type": "text", "text": text}], "isError": False}
        else:
            raise ProtocolError(-32601, "Method not found")
        return response(identifier, result_for_era(payload, modern))
    except AnalysisError as exc:
        return response(identifier, error=ProtocolError(-32602, str(exc)))
    except ProtocolError as exc:
        return response(identifier, error=exc)
    except (OSError, ValueError, UnicodeError, TypeError, KeyError):
        return response(identifier, error=ProtocolError(-32603, "Reference unavailable"))


def serve(stdin=None, stdout=None):
    # The stdout channel contains exclusively newline-delimited JSON-RPC.
    source = stdin or sys.stdin.buffer
    sink = stdout or sys.stdout.buffer
    state = {"initialized": False, "pending_legacy": False}
    while True:
        frame = source.readline(MAX_FRAME + 1)
        if not frame:
            break
        if len(frame) > MAX_FRAME:
            # Drain one oversized frame without unbounded memory consumption.
            while frame and not frame.endswith(b"\n"):
                frame = source.readline(MAX_FRAME + 1)
            answer = response(None, error=ProtocolError(-32600, "Frame too large"))
        else:
            try:
                message = json.loads(frame.decode("utf-8"))
            except (ValueError, UnicodeError):
                answer = response(None, error=ProtocolError(-32700, "Parse error"))
            else:
                answer = handle(message, state)
        if answer is not None:
            sink.write((json.dumps(answer, ensure_ascii=False, separators=(",", ":")) + "\n").encode("utf-8"))
            sink.flush()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--enable-panel", action="store_true",
                        help="Expose experimental trIA MCP Apps thread panel")
    parser.add_argument("--allow-analysis", action="append", default=[],
                        metavar="ABSOLUTE_FILE.json",
                        help="Explicitly authorize one local Analysis JSON file; repeat as needed")
    args = parser.parse_args()
    if len(args.allow_analysis) > 10:
        parser.error("At most ten Analysis files can be allowed per MCP process")
    try:
        APPROVED = ApprovedAnalyses(args.allow_analysis)
    except AnalysisError as exc:
        parser.error(str(exc))
    PANEL_ENABLED = args.enable_panel
    serve()
