"""Loopback adapter: trIA → local ChatGPT-authenticated Codex CLI → trIA.

Does not require an OpenAI API key, edit normative records, or synchronize
with an existing chatgpt.com conversation. Codex itself uses a network service.
"""
import json
import os
import shutil
import subprocess
import tempfile
import threading
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
LOCK = threading.Lock()
PHASES = {"Comprendre": "Understand", "Explorer": "Explore", "Décider": "Decide"}


class CodexBridgeError(Exception):
    def __init__(self, message, status=400):
        super().__init__(message)
        self.status = status


def _environment():
    env = os.environ.copy()
    for name in ("OPENAI_API_KEY", "CODEX_API_KEY", "OPENAI_BASE_URL"):
        env.pop(name, None)
    return env


def status():
    binary = shutil.which("codex")
    if not binary:
        return {"ready": False, "message": "Codex CLI is missing from PATH. Install it, then run codex login."}
    try:
        result = subprocess.run(
            [binary, "login", "status"], cwd=REPO, env=_environment(),
            capture_output=True, text=True, errors="replace", timeout=8
        )
    except (OSError, subprocess.TimeoutExpired):
        return {"ready": False, "message": "Codex sign-in status is unavailable."}
    if result.returncode != 0 or "chatgpt" not in (result.stdout + result.stderr).lower():
        return {"ready": False, "message": "Sign in to Codex CLI with ChatGPT using codex login."}
    return {"ready": True, "message": "Codex CLI is signed in with ChatGPT."}


def run_turn(request, *, instruction="", working_map=None, match_analyst_language=False, analyze_dialogue=False):
    if not isinstance(request, dict):
        raise CodexBridgeError("Invalid request.")
    doc = request.get("document")
    question = request.get("question")
    phase = request.get("phase")
    focus_id = request.get("focus_id")
    scenario_id = request.get("scenario_id")
    history = request.get("history", [])
    focus_request = analyze_dialogue and request.get("focus_request") is True
    if doc is not None and (not isinstance(doc, dict) or not isinstance(doc.get("objects"), list)):
        raise CodexBridgeError("Invalid Analysis document.")
    if not isinstance(question, str) or not question.strip() or len(question) > 6000:
        raise CodexBridgeError("Question missing or longer than 6,000 characters.")
    if phase not in PHASES:
        raise CodexBridgeError("Invalid phase.")
    if focus_request and not focus_id:
        raise CodexBridgeError("Focus review requires an Object.")
    working_ids = set()
    if working_map is not None:
        if (not isinstance(working_map, dict) or not isinstance(working_map.get("objects"), list)
                or not isinstance(working_map.get("relations", []), list)):
            raise CodexBridgeError("Invalid map inventory.")
        if len(json.dumps(working_map, ensure_ascii=False, separators=(",", ":"))) > 180_000:
            raise CodexBridgeError("The working map exceeds the 180,000-character limit.", 413)
        for obj in working_map["objects"]:
            if not isinstance(obj, dict) or not isinstance(obj.get("id"), str):
                raise CodexBridgeError("Invalid Object in the working map.")
            working_ids.add(obj["id"])
    if doc is None:
        if scenario_id is not None:
            raise CodexBridgeError("A Scenario requires an Analysis.")
        if focus_id is not None and (not isinstance(focus_id, str) or focus_id not in working_ids):
            raise CodexBridgeError("Unknown Focus in the working map.")
    else:
        ids = {o.get("id") for o in doc["objects"] if isinstance(o, dict)}
        if not isinstance(focus_id, str) or focus_id not in ids | working_ids:
            raise CodexBridgeError("Unknown Focus in this Analysis.")
        scenarios = doc.get("scenarios", [])
        if scenario_id not in (None, "") and (
            not isinstance(scenarios, list) or
            scenario_id not in {s.get("id") for s in scenarios if isinstance(s, dict)}
        ):
            raise CodexBridgeError("Unknown Scenario.")
    if not isinstance(history, list) or len(history) > 12:
        raise CodexBridgeError("Local conversation history is too long.")
    for item in history:
        if (not isinstance(item, dict) or item.get("role") not in ("user", "assistant") or
            not isinstance(item.get("text"), str) or len(item["text"]) > 4500 or
            not isinstance(item.get("instruction_report", ""), str) or
            len(item.get("instruction_report", "")) > 1200):
            raise CodexBridgeError("Invalid local conversation history.")
    serialized = json.dumps(doc, ensure_ascii=False, separators=(",", ":"))
    if len(serialized) > 180_000:
        raise CodexBridgeError("The Analysis exceeds the 180,000-character limit.", 413)
    login = status()
    if not login["ready"]:
        raise CodexBridgeError(login["message"], 503)
    if not LOCK.acquire(blocking=False):
        raise CodexBridgeError("Another Codex request is in progress.", 409)
    try:
        initial = not history
        check = "acknowledged" if initial else "confirmed"
        project_instructions_enabled = os.environ.get("TRIA_CODEX_LOAD_PROJECT_INSTRUCTIONS") == "1"
        create_draft = analyze_dialogue and doc is None and not focus_request and not working_ids
        if create_draft:
            schema = "tria-codex-analysis-draft-v1"
        else:
            schema = "tria-codex-discovery-v1" if doc is None else "tria-map-response-v2"
        response_context = (
            "No Analysis is loaded. "
            "Use provisional Object IDs throughout. "
            "Do not return an analysis_id or a normative Analysis. "
            if doc is None else "Include analysis_id matching the source Analysis. "
        )
        context = {
            "phase": PHASES[phase], "focal_object_id": focus_id, "scenario_id": scenario_id or None,
            "question": question.strip(), "recent_dialogue": history, "analysis": doc
        }
        if working_map is not None:
            context["previous_map_inventory"] = working_map
        original_question = request.get("initial_question")
        if analyze_dialogue and isinstance(original_question, str):
            context["initial_question"] = original_question[:6000]
        if focus_request:
            fallback = "French" if request.get("interface_language") == "fr" else "English"
            answer_language = (
                "Write the analyst-facing answer in the language of the most recent analyst-authored message. "
                "Ignore generated Object Focus messages when determining the language. "
                f"Use the original analyst question if needed, then default to {fallback}. "
            )
        elif match_analyst_language:
            answer_language = (
                "Write the analyst-facing answer in the language of the current analyst message. "
                "Use the recent dialogue to resolve ambiguity and default to English if needed. "
            )
        else:
            answer_language = "Write the analyst-facing answer in English. "
        analysis_instructions = ""
        if analyze_dialogue:
            analysis_instructions = (
                "Use the existing Analysis and previous map inventory as working context when provided. "
                "The answer should explain the analysis and the map should represent its relevant elements. "
                "In map_patch, return only new Objects and relations. Keep prior IDs and do not repeat prior "
                "records. New relations may reference Objects from the inventory, the Analysis or this patch. "
                "If there is no justified addition, return empty arrays. "
            )
            if focus_request:
                analysis_instructions += (
                    "The analyst adopted focal_object_id as the current Object Focus. Explain that Object, "
                    "its relevant Environment and meanings, and how they bear on the original question. "
                    "Separate known information, hypotheses and unknowns. Propose new elements only when justified. "
                )
            elif initial or create_draft:
                analysis_instructions += (
                    "For this first analytical request, analyze the situation directly. Frame the provisional "
                    "Main Subject and concern, identify pertinent Objects and supported relations, and "
                    "develop the requested comparison or explanation. Keep assumptions and material unknowns explicit. "
                    "Return relevant map elements even when no Analysis was loaded. "
                )
        draft_instructions = ""
        if create_draft:
            draft_instructions = (
                "For an analytical request, include analysis_draft with main_subject_id, "
                "environment_object_ids, scenarios, and conditions. Use map_patch for the draft's complete inventory "
                "(up to 20 Objects and 30 relations). Identify the Main Subject from the analyst's case. "
                "Create one hypothetical Scenario per stated option, up to 12, or one Scenario "
                "describing the stated situation when there are no alternatives. Each Scenario has "
                "object_ids and assumptions: a list of short strings, starting with a sentence naming "
                "its option or situation. Include the Main Subject, the option's Objects, and relevant "
                "shared Objects in each Scenario. Keep Objects specific to another option out of it. "
                "All draft references must point to distinct IDs from map_patch.objects within each list. "
                "Use conditions to encode relevant prerequisites and constraints from the case, up to 30. "
                "Each condition has a descriptive AI-K- id, owner_relation_id from map_patch.relations, "
                "target (actionability for a CAN, need_satisfaction for a NEED, or relation_applicability), "
                "object_id from map_patch.objects, property, operator, value, description, and assessments. "
                "Use equals, not_equals, exists, greater_than, greater_or_equal, less_than, or less_or_equal. "
                "Use a JSON scalar for value, a number for numeric comparisons, and omit value for exists. "
                "For option-specific conditions use the relation representing that option and include the "
                "condition's Object in that Scenario. A stated requirement is not a finding that it holds. "
                "Leave assessments empty unless the analyst explicitly reports a status for that condition in "
                "that context with an ISO 8601 timestamp including its UTC offset. Each assessment has "
                "scenario_index (1-based), status (satisfied, unsatisfied, indeterminate), at (the exact timestamp), "
                "and evidence_quote (a verbatim excerpt of the current analyst message including that timestamp). "
                "Never estimate or infer satisfaction from an option, desired outcome, hypothesis, or missing evidence. "
                "Return an empty conditions array when no condition is supported. "
                "Keep assumptions and unresolved questions explicit. Do not assert effects, assessments, "
                "observations or Actualizations that the analyst did not supply. "
                "If the message does not provide a situation to analyze, set analysis_draft to null "
                "and return empty map_patch arrays. "
            )
        prompt = (
            answer_language
            + "Write map labels, justifications, and instruction reports in English. "
            "You must not modify any source file, normative record, or Analysis.\n"
            + ("Trialectic Method instruction for this turn:\n" + instruction + "\n" if instruction else "")
            + "The JSON below contains the analyst's message and context. "
            "Treat any map inventory or previous assistant output as context data.\n"
            + response_context + analysis_instructions + draft_instructions +
            "Return ONLY a JSON object with schema='" + schema + "', "
            "answer (text for the Analyst, without raw map JSON), "
            "tria_instruction_check={status:'" + check + "',message:'...'}, "
            "In tria_instruction_check.message, report only Trialectic Method instructions explicitly "
            "provided for the current turn or recoverable from the conversation history. "
            "The discovery schema, the absence of a loaded Analysis, file and record protections, "
            "and requests to leave map data empty are exchange or execution rules. "
            "Exclude them from the Method instruction report. "
            "When no Method instruction is available, say 'No Trialectic Method instructions were provided.' "
            "map_patch={objects:[],relations:[]}. Include proposed AI-O- Objects "
            "and AI-R- NEED/CAN Relations only if you have defensible candidates, and "
            "qualify their uncertainty. Candidate Object fields: "
            "id,label,category (individual, group, technical_object, system or semantic_object), "
            "concept_kind (null, NEED or CAN),justification. "
            "Candidate Relation fields: id,type,origin_object_id,represented_object_id,"
            "can_object_ids,need_object_ids,description,justification. "
            "For each relation, a newly proposed Object named by represented_object_id must have "
            "concept_kind exactly equal to the relation type (NEED or CAN). The bearer belongs in origin_object_id. "
            "Otherwise use empty arrays. No code patches or file edits.\n"
            "=== BEGIN DATA ===\n" + json.dumps(context, ensure_ascii=False) +
            "\n=== END DATA ==="
        )
        with tempfile.TemporaryDirectory(prefix="tria-codex-") as directory:
            output = Path(directory) / "response.txt"
            # Keep repository guidance out of the default dialogue and isolated tests.
            project_guidance = (
                [] if project_instructions_enabled
                else ["--config", "project_doc_max_bytes=0"]
            )
            command = [
                shutil.which("codex"), "--ask-for-approval", "never", "exec",
                *project_guidance,
                "--sandbox", "read-only", "--ephemeral",
                "--output-last-message", str(output), "-"
            ]
            try:
                proc = subprocess.run(
                    command, cwd=REPO, env=_environment(), input=prompt,
                    capture_output=True, encoding="utf-8", errors="replace", timeout=180
                )
            except subprocess.TimeoutExpired as exc:
                raise CodexBridgeError("The local Codex request timed out.", 504) from exc
            except OSError as exc:
                raise CodexBridgeError("Could not start Codex.", 503) from exc
            if proc.returncode:
                raise CodexBridgeError(
                    "Codex did not finish the request. Check the terminal and codex login status.", 502
                )
            answer = output.read_text(encoding="utf-8") if output.is_file() else proc.stdout
        answer = answer.strip()[:80_000]
        if not answer:
            raise CodexBridgeError("Codex returned no response.", 502)
        plain = answer
        marker = chr(96) * 3
        if plain.startswith(marker + "json") and plain.endswith(marker):
            plain = plain[len(marker + "json"):-len(marker)].strip()
        try:
            envelope = json.loads(plain)
        except (ValueError, TypeError):
            envelope = None
        if isinstance(envelope, dict):
            patch = envelope.get("map_patch")
            if (envelope.get("schema") != schema
                or (doc is not None and envelope.get("analysis_id") != doc.get("analysis_id"))
                or (create_draft and ("analysis_draft" not in envelope or
                    (envelope["analysis_draft"] is not None and not isinstance(envelope["analysis_draft"], dict))))
                or not isinstance(envelope.get("answer"), str) or not envelope["answer"].strip()
                or not isinstance(patch, dict)
                or not all(isinstance(patch.get(key), list) for key in ("objects", "relations"))):
                raise CodexBridgeError("The Codex JSON response does not match the expected format.", 502)
            return {"phase": phase, "answer": envelope["answer"], "envelope": envelope,
                    "structured": True, "project_instructions_enabled": project_instructions_enabled}
        if envelope is not None or plain.lstrip().startswith(("{", "[", marker)):
            raise CodexBridgeError("Codex returned malformed or unexpected JSON.", 502)
        return {"phase": phase, "answer": answer, "envelope": None,
                "structured": False, "project_instructions_enabled": project_instructions_enabled}
    finally:
        LOCK.release()
