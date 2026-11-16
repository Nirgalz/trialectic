"""Scoped D-65/D-83 semantic consistency checks for Analysis v2.0/v2.1.

No empirical, causal, epistemic-sufficiency or complete temporal inference is
performed. Warning is not a rejection. Historical v2.0 lacks identity/attribution
annotations; absence of an assessment never establishes possession or Power.
"""
import argparse
import json
from pathlib import Path


def validate_semantics(document, previous_documents=()):
    """Return structured issues with code, location and error/warning severity."""
    issues = []

    def issue(code, where, detail, severity="error"):
        issues.append({"code": code, "where": where,
                       "detail": str(detail), "severity": severity})

    objects = {}
    definitions = set()
    relations = {}
    claims = set()
    for index, obj in enumerate(document.get("objects", [])):
        if obj["id"] in objects:
            issue("duplicate_object_id", f"objects[{index}]", obj["id"])
        objects[obj["id"]] = obj
        requal = obj.get("requalification")
        if requal:
            if requal["previous_object_id"] == obj["id"]:
                issue("requalification_same_id", f"objects[{index}]", obj["id"])
    for index, definition in enumerate(document.get("definitions", [])):
        key = (definition["object_id"], definition["version"])
        if key in definitions:
            issue("duplicate_definition", f"definitions[{index}]", key)
        definitions.add(key)
        if definition["object_id"] not in objects:
            issue("unknown_definition_object", f"definitions[{index}]", key)
    for index, relation in enumerate(document.get("relations", [])):
        key = (relation["id"], relation["version"])
        if key in relations:
            issue("duplicate_relation", f"relations[{index}]", key)
        relations[key] = relation
    for index, claim in enumerate(document.get("claims", [])):
        claim_key = (claim["id"], claim["version"])
        if claim_key in claims:
            issue("duplicate_claim_version", f"claims[{index}]", claim_key)
        claims.add(claim_key)

    history_objects = {}
    for previous in previous_documents:
        for obj in previous.get("objects", []):
            history_objects.setdefault(obj["id"], []).append(obj)
    for index, obj in enumerate(document.get("objects", [])):
        kind = obj.get("concept_kind")
        for predecessor in history_objects.get(obj["id"], []):
            old_kind = predecessor.get("concept_kind")
            if kind and old_kind and kind != old_kind:
                issue("immutable_concept_kind_changed", f"objects[{index}]",
                      obj["id"] + ": " + old_kind + " -> " + kind)
        requal = obj.get("requalification")
        if requal:
            predecessor = objects.get(requal["previous_object_id"])
            if predecessor is None:
                earlier = history_objects.get(requal["previous_object_id"], [])
                predecessor = earlier[-1] if earlier else None
            if predecessor is None:
                issue("unverified_requalification_predecessor",
                      f"objects[{index}]", requal["previous_object_id"],
                      "warning")
            elif (predecessor.get("concept_kind") == kind
                  and kind is not None):
                issue("requalification_without_identity_change",
                      f"objects[{index}]", obj["id"])
            if (requal["claim_id"], requal["claim_version"]) not in claims:
                issue("requalification_claim_unresolved",
                      f"objects[{index}]",
                      requal["claim_id"] + "@" + requal["claim_version"])

    def known_ref(ref, where):
        oid, version = ref["id"], ref["version"]
        if oid not in objects:
            issue("unresolved_object", where, oid)
        if (oid, version) not in definitions:
            issue("unresolved_definition_version", where,
                  oid + "@" + version)

    known_ref(document["main_subject"], "main_subject")
    for key in ("secondary_subjects", "environment"):
        for index, ref in enumerate(document.get(key, [])):
            known_ref(ref, f"{key}[{index}]")
    for index, definition in enumerate(document.get("definitions", [])):
        for j, ref in enumerate(definition["relation_refs"]):
            relation = relations.get((ref["id"], ref["version"]))
            if relation is None:
                issue("unresolved_relation", f"definitions[{index}].relation_refs[{j}]",
                      ref["id"])
            elif relation["origin_object"]["id"] != definition["object_id"]:
                issue("relation_wrong_bearer", f"definitions[{index}]",
                      ref["id"])

    for index, relation in enumerate(document.get("relations", [])):
        where = f"relations[{index}]"
        known_ref(relation["origin_object"], where + ".origin_object")
        known_ref(relation["represented_object"],
                  where + ".represented_object")
        target = objects.get(relation["represented_object"]["id"])
        if target:
            kind = target.get("concept_kind")
            if kind and kind != relation["type"]:
                issue("relation_kind_mismatch", where,
                      relation["type"] + " -> " + kind)
            if document["schema_version"] == "2.1.0" and kind is None:
                issue("unidentified_represented_object", where, target["id"])
        owner = relation["origin_object"]
        if (owner["id"], owner["version"]) in definitions:
            definition = next(
                d for d in document["definitions"]
                if d["object_id"] == owner["id"]
                and d["version"] == owner["version"]
            )
            ref = {"id": relation["id"], "version": relation["version"]}
            if ref not in definition["relation_refs"]:
                issue("unregistered_bearer_relation", where, relation["id"])
        attribution = relation.get("attribution")
        if attribution is not None:
            if (attribution["claim_id"], attribution["claim_version"]) not in claims:
                issue("attribution_claim_unresolved", where,
                      attribution["claim_id"] + "@" + attribution["claim_version"])
        if document["schema_version"] == "2.1.0" and attribution is None:
            issue("unqualified_v21_relation", where, relation["id"])
        for index_link, link in enumerate(relation["relation"]["links"]):
            inventory = relation.get(link["source_list"])
            if not isinstance(inventory, list) or not any(
                    x["id"] == link["object_id"] for x in inventory):
                issue("link_outside_source_inventory",
                      where + f".relation.links[{index_link}]",
                      link["object_id"])

    for index, evaluation in enumerate(document.get("power_assessments", [])):
        subject = evaluation["Subject"]["object_id"]
        if subject not in objects:
            issue("power_subject_unknown", f"power_assessments[{index}]", subject)
        focus = evaluation["Focus"]
        if focus["type"] in ("NEED", "CAN"):
            focus_obj = objects.get(focus["object_id"])
            if focus_obj is None:
                issue("power_focus_unknown", f"power_assessments[{index}]",
                      focus["object_id"])
            elif (document["schema_version"] == "2.1.0"
                  and focus_obj.get("concept_kind") != focus["type"]):
                issue("power_focus_kind_mismatch", f"power_assessments[{index}]",
                      focus["object_id"])
        for oid, version in evaluation["Context"].get(
                "definition_versions", {}).items():
            if (oid, version) not in definitions:
                issue("unresolved_power_definition_pin",
                      f"power_assessments[{index}]", oid + "@" + version)

    for index, assessment in enumerate(document.get("claim_assessments", [])):
        if (assessment["claim_id"], assessment["claim_version"]) not in claims:
            issue("unresolved_claim_assessment", f"claim_assessments[{index}]",
                  assessment["claim_id"] + "@" + assessment["claim_version"])
    return issues


def established_cans(document, bearer_id):
    """Only explicitly established, correctly typed CAN attributions enter Puissance."""
    kinds = {o["id"]: o.get("concept_kind") for o in document["objects"]}
    return sorted({
        relation["represented_object"]["id"]
        for relation in document["relations"]
        if relation["type"] == "CAN"
        and relation["origin_object"]["id"] == bearer_id
        and kinds.get(relation["represented_object"]["id"]) == "CAN"
        and relation.get("attribution", {}).get("status") == "established_in_model"
    })


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("document", type=Path)
    parser.add_argument("--history", type=Path, nargs="*", default=[])
    args = parser.parse_args()
    doc = json.loads(args.document.read_text(encoding="utf-8"))
    previous = [json.loads(p.read_text(encoding="utf-8"))
                for p in args.history]
    outcomes = validate_semantics(doc, previous)
    for result in outcomes:
        print(json.dumps(result, ensure_ascii=False))
    raise SystemExit(1 if any(x["severity"] == "error" for x in outcomes) else 0)
