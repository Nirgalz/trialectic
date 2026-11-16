"""D-83: independent NEED/CAN identity, attribution and historical correction.

All fixtures are synthetic; tests do not prove attribution/causal truth.
"""
import copy
import json
import unittest
from pathlib import Path

from tools.validate_analysis import validator
from tools.validate_semantics import validate_semantics, established_cans

ROOT = Path(__file__).resolve().parents[1]


def load(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))


class IdentityAttributionV21(unittest.TestCase):
    def setUp(self):
        self.document = load("tests/cases/identity_attribution_v21.json")
        self.schema = validator()

    def issues(self, document=None, previous=()):
        return validate_semantics(
            self.document if document is None else document, previous
        )

    def errors(self, document=None, previous=()):
        return [x for x in self.issues(document, previous)
                if x["severity"] == "error"]

    def test_v21_is_structurally_and_semantically_valid(self):
        self.schema.validate(self.document)
        self.assertEqual(self.errors(), [])
        self.assertEqual(self.document["schema_version"], "2.1.0")

    def test_can_is_an_object_with_its_own_need(self):
        objects = {o["id"]: o for o in self.document["objects"]}
        self.assertEqual(objects["O-can-play-piano"]["concept_kind"], "CAN")
        self.assertEqual(objects["O-need-instrument"]["concept_kind"], "NEED")
        self.assertTrue(any(
            r["origin_object"]["id"] == "O-can-play-piano"
            and r["represented_object"]["id"] == "O-need-instrument"
            and r["type"] == "NEED"
            for r in self.document["relations"]
        ))

    def test_identification_does_not_imply_attribution(self):
        self.assertEqual(established_cans(self.document, "O-person-a"),
                         ["O-can-play-piano"])
        self.assertEqual(established_cans(self.document, "O-person-b"), [])
        other = copy.deepcopy(self.document)
        other["relations"][0]["attribution"]["status"] = "indeterminate"
        self.assertEqual(established_cans(other, "O-person-a"), [])
        other["relations"][0]["attribution"]["status"] = "refuted_in_context"
        self.assertEqual(established_cans(other, "O-person-a"), [])

    def test_legacy_v20_does_not_implicitly_establish_attribution(self):
        old = load("tests/cases/analysis_without_scenario.json")
        self.schema.validate(old)
        self.assertEqual(established_cans(old, "O-generator"), [])
        self.assertEqual(self.errors(old), [])

    def test_v20_rejects_v21_annotations_and_v21_requires_attribution(self):
        legacy = copy.deepcopy(self.document)
        legacy["schema_version"] = "2.0.0"
        self.assertFalse(self.schema.is_valid(legacy))
        incomplete = copy.deepcopy(self.document)
        del incomplete["relations"][0]["attribution"]
        self.assertFalse(self.schema.is_valid(incomplete))

    def test_exclusive_concept_kind_is_a_single_enum(self):
        contradictory = copy.deepcopy(self.document)
        contradictory["objects"][2]["concept_kind"] = ["NEED", "CAN"]
        self.assertFalse(self.schema.is_valid(contradictory))
        mismatch = copy.deepcopy(self.document)
        mismatch["objects"][2]["concept_kind"] = "NEED"
        self.assertTrue(self.schema.is_valid(mismatch))
        self.assertIn("relation_kind_mismatch",
                      [i["code"] for i in self.errors(mismatch)])

    def test_versions_references_and_attribution_claims_resolve(self):
        doc = copy.deepcopy(self.document)
        doc["relations"][0]["attribution"]["claim_id"] = "CL-missing"
        self.assertIn("attribution_claim_unresolved",
                      [i["code"] for i in self.errors(doc)])
        doc = copy.deepcopy(self.document)
        doc["relations"][0]["represented_object"]["version"] = "v404"
        self.assertIn("unresolved_definition_version",
                      [i["code"] for i in self.errors(doc)])
        doc = copy.deepcopy(self.document)
        doc["relations"][0]["attribution"]["claim_version"] = "v404"
        self.assertIn("attribution_claim_unresolved",
                      [i["code"] for i in self.errors(doc)])

    def test_claim_revisions_do_not_retarget_version_pinned_attributions(self):
        updated = copy.deepcopy(self.document)
        revised = copy.deepcopy(updated["claims"][0])
        revised["version"] = "v2"
        revised["statement"] = "Revised synthetic attribution claim."
        updated["claims"].append(revised)
        self.schema.validate(updated)
        self.assertEqual(self.errors(updated), [])
        self.assertEqual(
            updated["relations"][0]["attribution"]["claim_version"], "v1"
        )

    def test_identity_cannot_change_under_the_same_object_id(self):
        historical = copy.deepcopy(self.document)
        changed = copy.deepcopy(self.document)
        changed["objects"][2]["concept_kind"] = "NEED"
        self.assertIn("immutable_concept_kind_changed",
                      [i["code"] for i in self.errors(changed, [historical])])

    def test_requalification_requires_new_id_and_traceable_claim(self):
        doc = copy.deepcopy(self.document)
        newly_identified = copy.deepcopy(doc["objects"][2])
        newly_identified["id"] = "O-new-need"
        newly_identified["label"] = "Corrected NEED identity"
        newly_identified["concept_kind"] = "NEED"
        newly_identified["requalification"] = {
            "previous_object_id": "O-can-play-piano",
            "reason": "correction",
            "justification": "Correction of earlier synthetic identification.",
            "claim_id": "CL-new-need",
            "claim_version": "v1",
        }
        doc["objects"].append(newly_identified)
        doc["definitions"].append({
            "object_id": "O-new-need", "version": "v1",
            "constituents": [], "properties": {}, "relation_refs": [],
        })
        doc["claims"].append({
            "id": "CL-new-need", "version": "v1",
            "statement": "This distinct object corrects the identification.",
        })
        self.schema.validate(doc)
        self.assertEqual(self.errors(doc), [])
        bad = copy.deepcopy(doc)
        bad["objects"][-1]["requalification"]["previous_object_id"] = "O-new-need"
        self.assertIn("requalification_same_id",
                      [i["code"] for i in self.errors(bad)])

    def test_all_t01_projections_are_locally_semantically_coherent(self):
        from test_t01_identification import load_json, project_to_v2
        cases = load_json(ROOT / "tests/cases/t01-identification-v1.json")["cases"]
        seed = load("tests/cases/analysis_without_scenario.json")
        self.assertEqual(len(cases), 26)
        for case in cases:
            with self.subTest(case=case["id"]):
                doc = project_to_v2(case, seed)
                self.schema.validate(doc)
                self.assertEqual(self.errors(doc), [])

    def test_t01_candidates_can_be_indeterminate_without_extra_can_subtype(self):
        from test_t01_identification import load_json, project_to_v2
        cases = load_json(ROOT / "tests/cases/t01-identification-v1.json")["cases"]
        seed = load("tests/cases/analysis_without_scenario.json")
        required = {"T01-14": "refuted_in_context",
                    "T01-17": "indeterminate",
                    "T01-19": "indeterminate"}
        for case in cases:
            if case["id"] not in required:
                continue
            with self.subTest(case=case["id"]):
                doc = project_to_v2(case, seed)
                self.schema.validate(doc)
                self.assertEqual(self.errors(doc), [])
                focus_id = doc["focus"]["object_id"]
                self.assertEqual(next(o for o in doc["objects"]
                                      if o["id"] == focus_id)["concept_kind"], "CAN")
                self.assertEqual(doc["relations"][0]["attribution"]["status"],
                                 required[case["id"]])
                self.assertEqual(established_cans(doc,
                    doc["main_subject"]["id"]), [])


if __name__ == "__main__":
    unittest.main()
