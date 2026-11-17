"""Local file inbox/outbox for an explicitly user-triggered ChatGPT Work turn.

Never calls an AI or sends requests to the network. Never mutates Analysis.
All queue files are outside the HTTP document root and ignored by Git.
"""
import hashlib
import json
import os
import re
import threading
import uuid
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / ".tria-work"
REQUESTS = ROOT / "requests"
RESPONSES = ROOT / "responses"
ID_RE = re.compile(r"^[0-9a-f]{32}$")
ALLOWED_ACTIONS = {"focus", "refine"}
ALLOWED_MODES = {"simple", "detailed"}
MAX_REQUEST = 500_000
MAX_RESULT = 128_000
LOCK = threading.Lock()


class WorkBridgeError(Exception):
    def __init__(self, message, status=400):
        super().__init__(message)
        self.status = status


def canonical(doc):
    return json.dumps(doc, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def digest(doc):
    return hashlib.sha256(canonical(doc).encode("utf-8")).hexdigest()


def bounded_str(value, length=10000):
    return isinstance(value, str) and len(value) <= length


def validated_id(identifier):
    if not isinstance(identifier, str) or ID_RE.fullmatch(identifier) is None:
        raise WorkBridgeError("Identifiant de requête invalide.", 400)
    return identifier


def queue_dirs():
    REQUESTS.mkdir(parents=True, exist_ok=True)
    RESPONSES.mkdir(parents=True, exist_ok=True)
    for folder in (ROOT, REQUESTS, RESPONSES):
        if folder.is_symlink():
            raise WorkBridgeError("Répertoire de travail non fiable.", 500)


def safe_file(folder, identifier):
    validated_id(identifier)
    path = folder / (identifier + ".json")
    if path.is_symlink():
        raise WorkBridgeError("Lien symbolique interdit dans la file.", 400)
    return path


def create_request(document, action, focus_id, map_mode, note=""):
    if action not in ALLOWED_ACTIONS or map_mode not in ALLOWED_MODES:
        raise WorkBridgeError("Action ou mode de carte invalide.")
    if not isinstance(document, dict):
        raise WorkBridgeError("Document Analysis requis.")
    if not bounded_str(note, 1500):
        raise WorkBridgeError("Note invalide ou trop longue.")
    if not isinstance(focus_id, str) or focus_id not in {
            o.get("id") for o in document.get("objects", []) if isinstance(o, dict)}:
        raise WorkBridgeError("Objet Focal inconnu dans le document.")
    if not isinstance(document.get("analysis_id"), str):
        raise WorkBridgeError("Identifiant d'analyse invalide.")
    request_id = uuid.uuid4().hex
    context = {
        "schema": "tria-work-request-v1",
        "request_id": request_id,
        "analysis_id": document["analysis_id"],
        "analysis_hash": digest(document),
        "action": action,
        "focus_id": focus_id,
        "map_mode": map_mode,
        "note": note,
        "document": document,
        "instructions": [
            "Analyse à partir du document et du Focus, en distinguant données source, hypothèses et inconnues.",
            "Sujet, Environnement et Sémantique sont des perspectives non symétriques.",
            "Conserver le problème global, les autres Sujets affectés et les scénarios indépendants.",
            "Pour refine : rechercher proportionnellement Objects/relations/Scénarios négligés et ambiguïtés.",
            "Ne pas modifier le document Analysis ni présenter une Actualisation comme réalisée.",
            "Toutes les révisions proposées doivent rester des suggestions pour examen humain."
        ],
        "response_contract": {
            "schema": "tria-work-response-v1",
            "request_id": request_id,
            "analysis_id": document["analysis_id"],
            "analysis_hash": digest(document),
            "summary": "Synthèse française de l'analyse.",
            "semantic_findings": ["Clarification sémantique"],
            "proposals": [{"kind": "object|relation|condition|scenario|other",
                           "object_id": focus_id, "description": "Piste à vérifier",
                           "epistemic_status": "hypothesis"}],
            "scenario_reviews": [{"scenario_id": "identifiant", "impact": "à vérifier",
                                  "status": "requires_review"}],
            "open_questions": ["Question à approfondir"]
        }
    }
    data = canonical(context).encode("utf-8")
    if len(data) > MAX_REQUEST:
        raise WorkBridgeError("Analyse trop volumineuse pour cette file de test.", 413)
    with LOCK:
        queue_dirs()
        dest = safe_file(REQUESTS, request_id)
        tmp = REQUESTS / ("." + request_id + ".tmp")
        # Exclusive file creation, no ambiguous overwrites.
        try:
            with tmp.open("xb") as fp:
                fp.write(data)
            os.replace(tmp, dest)
        finally:
            tmp.unlink(missing_ok=True)
    return {"request_id": request_id, "analysis_id": document["analysis_id"],
            "analysis_hash": context["analysis_hash"], "action": action,
            "focus_id": focus_id, "status": "pending",
            "relative_request_path": str(Path(".tria-work") / "requests" / (request_id + ".json")),
            "relative_response_path": str(Path(".tria-work") / "responses" / (request_id + ".json"))}


def verify_result(data, request):
    if not isinstance(data, dict):
        raise WorkBridgeError("Réponse Work : objet JSON attendu.", 422)
    for name, expected in (("schema", "tria-work-response-v1"),
                           ("request_id", request["request_id"]),
                           ("analysis_id", request["analysis_id"]),
                           ("analysis_hash", request["analysis_hash"])):
        if data.get(name) != expected:
            raise WorkBridgeError("Réponse Work : identité ou version incompatible (" + name + ").", 409)
    if not bounded_str(data.get("summary"), 14000):
        raise WorkBridgeError("Réponse Work : synthèse manquante ou trop longue.", 422)
    result = {"summary": data["summary"]}
    for field in ("semantic_findings", "open_questions"):
        values = data.get(field, [])
        if not isinstance(values, list) or len(values) > 30 or not all(
                bounded_str(item, 1800) for item in values):
            raise WorkBridgeError("Réponse Work : liste invalide (" + field + ").", 422)
        result[field] = values
    for field in ("proposals", "scenario_reviews"):
        values = data.get(field, [])
        if not isinstance(values, list) or len(values) > 30 or not all(
                isinstance(item, dict) and all(bounded_str(k, 200) and
                    bounded_str(v, 4000) for k, v in item.items()) for item in values):
            raise WorkBridgeError("Réponse Work : propositions invalides (" + field + ").", 422)
        result[field] = values
    return result


def request_status(identifier):
    identifier = validated_id(identifier)
    # A response written by Work must never introduce executable content:
    # JSON only, strict shape, exact Analysis hash, bounded file size.
    with LOCK:
        queue_dirs()
        reqpath = safe_file(REQUESTS, identifier)
        if not reqpath.is_file():
            raise WorkBridgeError("Demande inconnue.", 404)
        request = json.loads(reqpath.read_text(encoding="utf-8"))
        response = safe_file(RESPONSES, identifier)
        if not response.exists():
            return {"request_id": identifier, "status": "pending"}
        if not response.is_file() or response.stat().st_size > MAX_RESULT:
            raise WorkBridgeError("Réponse Work trop volumineuse ou invalide.", 422)
        try:
            raw = json.loads(response.read_text(encoding="utf-8"))
        except (ValueError, UnicodeError):
            raise WorkBridgeError("Réponse Work JSON incomplète ou illisible.", 422) from None
        return {"request_id": identifier, "status": "completed",
                "analysis_id": request["analysis_id"],
                "analysis_hash": request["analysis_hash"],
                "result": verify_result(raw, request),
                "notice": "Suggestions Work, non appliquées au document Analysis."}
