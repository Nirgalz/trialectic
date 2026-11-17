"""Opt-in, read-only Analysis snapshots for the local trIA MCP server.

The operator explicitly allows each file via --allow-analysis /absolute/path.json.
No discovery of unrelated files, writes, live AI, or automatic causal judgement.
"""
import hashlib
import json
import os
from pathlib import Path

MAX_ANALYSIS_BYTES = 2_000_000
MAX_RETURN_BYTES = 140_000
SECTIONS = (
    "objects", "definitions", "relations", "can_affiliations",
    "conditions", "pathways", "inventories", "scenarios", "events",
    "condition_assessments", "power_assessments", "effects",
    "claims", "evidence_items", "evidence_reviews", "claim_assessments",
)
META_FIELDS = ("analysis_id", "schema_version", "main_subject",
               "secondary_subjects", "environment", "focus")


class AnalysisError(Exception):
    def __init__(self, message):
        super().__init__(message)


def _no_symlinks(path):
    current = Path(path.anchor)
    for part in path.parts[1:]:
        current = current / part
        if current.is_symlink():
            raise AnalysisError("Symbolic links are not allowed in approved paths")


def _read(path):
    # Recheck path on every request; do not use arbitrary client-provided paths.
    _no_symlinks(path)
    try:
        flags = os.O_RDONLY | getattr(os, "O_BINARY", 0) | getattr(os, "O_NOFOLLOW", 0)
        with os.fdopen(os.open(path, flags), "rb") as stream:
            stat = os.fstat(stream.fileno())
            if not 0 < stat.st_size <= MAX_ANALYSIS_BYTES:
                raise AnalysisError("Approved Analysis file size is invalid")
            raw = stream.read(MAX_ANALYSIS_BYTES + 1)
        if len(raw) > MAX_ANALYSIS_BYTES:
            raise AnalysisError("Approved Analysis exceeds the size limit")
        doc = json.loads(raw.decode("utf-8"))
    except (OSError, UnicodeError, ValueError) as exc:
        raise AnalysisError("Approved Analysis cannot be read as JSON") from exc
    if not isinstance(doc, dict) or not isinstance(doc.get("analysis_id"), str) or not isinstance(doc.get("objects"), list):
        raise AnalysisError("File is not a recognizable Analysis document")
    for field in SECTIONS:
        if field in doc and not isinstance(doc[field], list):
            raise AnalysisError("Invalid Analysis collection: " + field)
    return doc, hashlib.sha256(raw).hexdigest()


def _trim(payload):
    if len(json.dumps(payload, ensure_ascii=False).encode("utf-8")) > MAX_RETURN_BYTES:
        raise AnalysisError("Response too large; request a smaller section page")
    return payload


def _object_id(reference):
    return reference.get("id") if isinstance(reference, dict) else None


def _ids(value):
    return {v["id"] for v in value if isinstance(v, dict) and isinstance(v.get("id"), str)} if isinstance(value, list) else set()


def _linked_ids(record):
    ids = set()
    for field in ("origin_object", "represented_object"):
        value = _object_id(record.get(field))
        if value:
            ids.add(value)
    for field in ("NEEDs", "CANs"):
        ids.update(_ids(record.get(field)))
    relation = record.get("relation")
    if isinstance(relation, dict):
        for item in relation.get("links", []):
            if isinstance(item, dict):
                if isinstance(item.get("object_id"), str):
                    ids.add(item["object_id"])
                ids.update(v for v in item.get("affects", []) if isinstance(v, str))
    return ids


class ApprovedAnalyses:
    """Exactly the files explicitly selected by the local server operator."""

    def __init__(self, filenames=()):
        self.paths = {}
        for i, filename in enumerate(filenames, 1):
            path = Path(filename)
            if not path.is_absolute():
                raise AnalysisError("--allow-analysis requires absolute paths")
            _no_symlinks(path)
            if not path.is_file():
                raise AnalysisError("Approved Analysis file does not exist")
            self.paths["a" + str(i)] = path

    def _snapshot(self, analysis_ref, expected_hash=None):
        if not isinstance(analysis_ref, str) or analysis_ref not in self.paths:
            raise AnalysisError("Unknown or unapproved analysis_ref")
        doc, snapshot_hash = _read(self.paths[analysis_ref])
        if expected_hash is not None:
            if not isinstance(expected_hash, str) or snapshot_hash != expected_hash:
                raise AnalysisError("Analysis changed: list analyses and review the new hash")
        return doc, snapshot_hash

    def list_analyses(self):
        items = []
        for ref in self.paths:
            doc, snapshot_hash = self._snapshot(ref)
            items.append({
                "analysis_ref": ref,
                "analysis_id": doc["analysis_id"],
                "schema_version": doc.get("schema_version"),
                "snapshot_hash": snapshot_hash,
                "object_count": len(doc["objects"]),
                "relation_count": len(doc.get("relations", [])),
                "scenario_count": len(doc.get("scenarios", [])),
            })
        return {"access": "explicit_launch_allowlist", "analyses": items,
                "note": "Only files selected by the operator; the MCP client may forward returned data to an AI provider."}

    def section(self, analysis_ref, snapshot_hash, section, offset=0, limit=20):
        if not isinstance(snapshot_hash, str) or not snapshot_hash:
            raise AnalysisError("snapshot_hash is required")
        if section != "header" and section not in SECTIONS:
            raise AnalysisError("Unknown Analysis section")
        if isinstance(offset, bool) or not isinstance(offset, int) or offset < 0:
            raise AnalysisError("offset must be a nonnegative integer")
        if isinstance(limit, bool) or not isinstance(limit, int) or not 1 <= limit <= 25:
            raise AnalysisError("limit must be between 1 and 25")
        doc, actual_hash = self._snapshot(analysis_ref, snapshot_hash)
        base = {"analysis_ref": analysis_ref, "analysis_id": doc["analysis_id"],
                "snapshot_hash": actual_hash, "read_only": True}
        if section == "header":
            return _trim({**base, "section": section, "metadata": {
                key: doc.get(key) for key in META_FIELDS}})
        values = doc.get(section, [])
        return _trim({**base, "section": section, "offset": offset,
                      "total": len(values), "has_more": offset + limit < len(values),
                      "records": values[offset:offset + limit]})

    def focus(self, analysis_ref, snapshot_hash, object_id):
        if not isinstance(snapshot_hash, str) or not snapshot_hash:
            raise AnalysisError("snapshot_hash is required")
        if not isinstance(object_id, str) or not object_id:
            raise AnalysisError("An Object ID is required")
        doc, actual_hash = self._snapshot(analysis_ref, snapshot_hash)
        objects = {x["id"]: x for x in doc["objects"]
                   if isinstance(x, dict) and isinstance(x.get("id"), str)}
        if object_id not in objects:
            raise AnalysisError("Unknown Focus Object ID")
        definitions = [d for d in doc.get("definitions", [])
                       if isinstance(d, dict) and d.get("object_id") == object_id]
        connected = set()
        related = []
        for relation in doc.get("relations", []):
            if not isinstance(relation, dict):
                continue
            targets = _linked_ids(relation)
            if object_id in targets:
                related.append(relation)
                connected.update(targets - {object_id})
        focus = objects[object_id]
        connected.update(x for x in (focus.get("parent_id"),
                         *(focus.get("temporary_child_ids") or []),
                         *(focus.get("actualised_child_ids") or []))
                         if isinstance(x, str))
        for d in definitions:
            connected.update(_ids(d.get("constituents")))
        affiliations = [
            x for x in doc.get("can_affiliations", [])
            if isinstance(x, dict) and object_id in (
                _object_id(x.get("parent_can")), _object_id(x.get("child_can")))
        ]
        for affiliation in affiliations:
            connected.update(_ids([affiliation.get("parent_can"), affiliation.get("child_can")]))
        # Scenario co-occurrence is a review lead, never proof of effect/causality.
        scenario_candidates = []
        for scenario in doc.get("scenarios", []):
            if not isinstance(scenario, dict):
                continue
            mentioned = _ids(scenario.get("object_heads"))
            mentioned.update(_object_id(s.get("object")) for s in scenario.get("states", [])
                             if isinstance(s, dict))
            if object_id in mentioned or bool(connected.intersection(mentioned)):
                scenario_candidates.append(scenario.get("id"))
        return _trim({
            "analysis_ref": analysis_ref, "analysis_id": doc["analysis_id"],
            "snapshot_hash": actual_hash, "object_focus_id": object_id,
            "focus_object": focus, "focus_definitions": definitions,
            "direct_relation_records": related,
            "can_affiliations": affiliations,
            "neighbor_objects": [objects[k] for k in sorted(connected) if k in objects],
            "missing_reference_ids": sorted(connected - set(objects)),
            "global_context": {key: doc.get(key) for key in (
                "main_subject", "secondary_subjects", "environment", "focus")},
            "scenario_ids_to_review": [x for x in scenario_candidates if isinstance(x, str)],
            "qualification": (
                "Structural Focus extraction, not an AI inference or an Actualization. "
                "A relation's type, attribution, source and uncertainty remain as recorded. "
                "Scenario co-occurrence is a review candidate, not an established impact. "
                "The AI must mark new links and interpretations as hypotheses; no edits were made."
            ),
            "read_only": True,
        })

    def proposal(self, analysis_ref, snapshot_hash, kind, target_id, description,
                 epistemic_status, rationale):
        if not isinstance(snapshot_hash, str) or not snapshot_hash:
            raise AnalysisError("snapshot_hash is required")
        doc, actual_hash = self._snapshot(analysis_ref, snapshot_hash)
        if kind not in ("object", "relation", "condition", "scenario", "other"):
            raise AnalysisError("Unknown proposal kind")
        if epistemic_status not in ("hypothesis", "question", "interpretation"):
            raise AnalysisError("Use hypothesis, question or interpretation; do not assert a fact")
        if target_id is not None and (not isinstance(target_id, str) or not target_id):
            raise AnalysisError("target_id must be a nonempty ID or null")
        if not isinstance(description, str) or not 1 <= len(description) <= 3000:
            raise AnalysisError("Invalid description")
        if not isinstance(rationale, str) or not 1 <= len(rationale) <= 3000:
            raise AnalysisError("Rationale is required")
        # Never guess whether an ID denotes a constituent, Relation, or Scenario.
        existing = {x["id"] for name in SECTIONS for x in doc.get(name, [])
                    if isinstance(x, dict) and isinstance(x.get("id"), str)}
        if target_id is not None and target_id not in existing:
            raise AnalysisError("Unknown target ID; use null for a proposed new object")
        proposal = {
            "kind": kind, "target_id": target_id, "description": description,
            "epistemic_status": epistemic_status, "rationale": rationale,
            "review_status": "requires_human_review", "applied": False,
        }
        proposal_id = hashlib.sha256(json.dumps(
            {"analysis_ref": analysis_ref, "snapshot_hash": actual_hash, **proposal},
            ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()[:20]
        return {"analysis_ref": analysis_ref, "analysis_id": doc["analysis_id"],
                "snapshot_hash": actual_hash, "proposal_id": proposal_id,
                "proposal": proposal, "stored": False, "applied": False,
                "notice": "Preview only; no file or existing evaluation was altered."}
