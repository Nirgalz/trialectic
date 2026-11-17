"""Small, local-only OpenAI Responses bridge; never exposes or persists credentials."""
import json
import os
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

API_URL = "https://api.openai.com/v1/responses"
DEFAULT_MODEL = "gpt-6-luna"
MAX_CONTEXT_CHARACTERS = 24000


class BridgeError(Exception):
    def __init__(self, message, status=502):
        super().__init__(message)
        self.status = status


def configured():
    return bool(os.environ.get("OPENAI_API_KEY", "").strip())


def make_context(doc, action, focus_id, map_mode, note=""):
    objects = {o["id"]: o for o in doc.get("objects", []) if isinstance(o, dict) and "id" in o}
    if focus_id not in objects:
        raise BridgeError("Le Sujet Focal n'existe pas dans l'analyse chargée.", 400)
    if action not in ("focus", "refine") or map_mode not in ("simple", "detailed"):
        raise BridgeError("Action ou mode de carte non reconnu.", 400)
    if not isinstance(note, str) or len(note) > 1500:
        raise BridgeError("Note trop longue ou invalide.", 400)
    selected_ids = {focus_id, doc.get("main_subject", {}).get("id")}
    selected_relations = []
    relations = doc.get("relations", [])
    # Two bounded passes find potentially relevant direct and indirect relations.
    for _ in range(2):
        for r in relations:
            endpoints = {r.get("origin_object", {}).get("id"),
                         r.get("represented_object", {}).get("id")}
            endpoints.update(l.get("object_id") for l in r.get("relation", {}).get("links", []))
            if selected_ids.intersection(endpoints):
                selected_ids.update(endpoints.intersection(objects))
                if r not in selected_relations:
                    selected_relations.append(r)
    # Retain an overview of all Objects so C+ can suggest omitted Subjects.
    overview = [{"id": o["id"], "label": str(o.get("label", ""))[:110]}
                for o in list(objects.values())[:80]]
    focus_defs = [d for d in doc.get("definitions", [])
                  if d.get("object_id") in selected_ids][:30]
    scenarios = [{"id": s.get("id"), "mode": s.get("mode"),
                  "notes": str(s.get("notes", ""))[:240],
                  "assumptions": s.get("assumptions", [])[:5],
                  "object_heads": [x.get("id") for x in s.get("object_heads", [])[:30]]}
                 for s in doc.get("scenarios", [])[:20]]
    relevant_conditions = [c for c in doc.get("conditions", [])
                           if c.get("predicate", {}).get("object", {}).get("id") in selected_ids or
                           any(r.get("id") == c.get("owner_relation", {}).get("id")
                               for r in selected_relations)][:30]
    context = {"analysis_id": doc.get("analysis_id"),
               "main_subject": doc.get("main_subject"),
               "focus": {"id": focus_id, "label": objects[focus_id].get("label")},
               "action": action, "map_mode": map_mode,
               "question": note, "objects_overview": overview,
               "connected_objects": [objects[k] for k in selected_ids if k in objects][:35],
               "connected_relations": selected_relations[:35],
               "definitions": focus_defs,
               "conditions": relevant_conditions,
               "scenarios": scenarios}
    encoded = json.dumps(context, ensure_ascii=False)
    if len(encoded) > MAX_CONTEXT_CHARACTERS:
        # No silent truncation of material conditions or sources.
        raise BridgeError("Analyse trop volumineuse pour ce premier pont API ; réduire le contexte.", 413)
    return context


INSTRUCTIONS = """Tu es l'assistant expérimental trIA, appliquant la Méthode trialectique.
Réponds en français. Tu analyses ; la carte représente exclusivement tes explications explicites.
Le Sujet Focal est l'Objet choisi. Examine le Sujet, l'Environnement pertinent, la Sémantique
et leurs dépendances. Conserve le problème global et les Sujets indirectement affectés.
Distinguе faits présents dans les données, hypothèses, déductions conditionnelles et inconnues.
N'invente ni preuve, ni Objet réel, ni Actualisation effective. Les CAN et NEED ne doivent
être imposés que lorsqu'ils sont pertinents. Les connexions ne prouvent pas la causalité.
Si mode simple (A), donne une explication concise puis ses relations explicites.
Si mode détaillé (B), identifie les éléments et relations pertinents, puis conclus.
Pour action 'refine' (C+), examine les omissions pertinentes, alternatives, relations
indirectes et contradictions sans prétendre à l'exhaustivité.
Retourne uniquement un objet JSON avec les champs:
summary (texte), semantic_findings (liste de textes), proposals (liste d'objets avec
kind, object_id, description, epistemic_status), scenario_reviews (liste d'objets avec
scenario_id, impact, status), open_questions (liste de textes).
Toutes les propositions sont des pistes soumises à examen humain, jamais des
modifications automatiques du document Analysis."""


def extract_text(response):
    pieces = []
    for item in response.get("output", []):
        if item.get("type") == "message":
            for part in item.get("content", []):
                if part.get("type") == "output_text":
                    pieces.append(part.get("text", ""))
    return "\n".join(pieces).strip()


def sanitize_result(raw):
    content = extract_text(raw)
    if not content:
        raise BridgeError("L'API n'a retourné aucun texte exploitable.", 502)
    try:
        data = json.loads(content)
    except (ValueError, TypeError):
        # Keep plain-text responses inspectable rather than pretending a valid contract.
        data = {"summary": content[:14000], "semantic_findings": [], "proposals": [],
                "scenario_reviews": [], "open_questions": [],
                "parse_warning": "Réponse non structurée ; aucune proposition appliquée."}
    if not isinstance(data, dict) or not isinstance(data.get("summary"), str):
        raise BridgeError("Format de réponse non conforme ; aucune modification appliquée.", 502)
    result = {"summary": data["summary"][:14000]}
    for key in ("semantic_findings", "proposals", "scenario_reviews", "open_questions"):
        v = data.get(key, [])
        result[key] = v[:30] if isinstance(v, list) else []
    result["parse_warning"] = str(data.get("parse_warning", ""))[:240]
    return result


def analyze(doc, action, focus_id, map_mode, note=""):
    key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not key:
        raise BridgeError("Clé API absente du processus serveur. Utiliser le lanceur local sécurisé.", 503)
    context = make_context(doc, action, focus_id, map_mode, note)
    model = os.environ.get("TRIA_OPENAI_MODEL", DEFAULT_MODEL).strip() or DEFAULT_MODEL
    payload = {"model": model, "instructions": INSTRUCTIONS,
               "input": json.dumps(context, ensure_ascii=False),
               "max_output_tokens": 1800, "store": False}
    req = Request(API_URL, data=json.dumps(payload).encode("utf-8"),
                  headers={"Authorization": "Bearer " + key,
                           "Content-Type": "application/json"}, method="POST")
    try:
        with urlopen(req, timeout=65) as resp:
            raw = json.loads(resp.read(350000))
    except HTTPError as err:
        # Never forward OpenAI's raw error body or outbound authorization header.
        if err.code in (401, 403):
            raise BridgeError("Clé API refusée ou accès au modèle non autorisé.", 502) from None
        if err.code == 429:
            raise BridgeError("Quota ou limite de débit API atteint.", 429) from None
        raise BridgeError(f"Appel API impossible (code HTTP {err.code}).", 502) from None
    except (URLError, TimeoutError, ValueError):
        raise BridgeError("Connexion API indisponible ou réponse invalide.", 502) from None
    result = sanitize_result(raw)
    result["model"] = model
    # Usage is numeric metadata, not a key or prompt body.
    usage = raw.get("usage", {})
    result["usage"] = {k: usage.get(k) for k in ("input_tokens", "output_tokens")
                       if isinstance(usage.get(k), int)}
    return result
