"""Experimental trIA UI envelope: local shape only, never normative Analysis."""
import copy
import json
import unittest
from pathlib import Path

from jsonschema import Draft202012Validator

ROOT = Path(__file__).resolve().parents[1]
CONTRACT = ROOT / "schemas/transport/tria-map-response-v2.schema.json"
ANALYSIS = ROOT / "schemas/model/analysis.json"


def example():
    return {
        "schema": "tria-map-response-v2",
        "analysis_id": "A-test",
        "answer": "A qualified statement.",
        "tria_instruction_check": {"status": "acknowledged", "message": "Understood."},
        "map_patch": {
            "objects": [{"id": "AI-O-1", "label": "Candidate", "category": "semantic_object",
                         "concept_kind": "CAN", "justification": "Unverified candidate."}],
            "relations": [{"id": "AI-R-1", "type": "CAN", "origin_object_id": "O-source",
                           "represented_object_id": "AI-O-1", "can_object_ids": [],
                           "need_object_ids": [], "description": "Provisional attribution.",
                           "justification": "The link needs review."}]
        },
    }


class MapResponseTransportSchemaTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.schema = json.loads(CONTRACT.read_text(encoding="utf-8"))
        Draft202012Validator.check_schema(cls.schema)
        cls.check = Draft202012Validator(cls.schema)

    def assert_rejects(self, change):
        item = copy.deepcopy(example())
        change(item)
        self.assertFalse(self.check.is_valid(item), item)

    def test_separate_identity_and_accepted_local_shape(self):
        analysis = json.loads(ANALYSIS.read_text(encoding="utf-8"))
        self.assertNotEqual(self.schema["$id"], analysis["$id"])
        self.assertEqual(self.schema["properties"]["schema"]["const"], "tria-map-response-v2")
        self.check.validate(example())
        empty = example()
        empty["map_patch"] = {"objects": [], "relations": []}
        self.check.validate(empty)
        empty["tria_instruction_check"]["status"] = "confirmed"
        self.check.validate(empty)

    def test_exact_envelope_fields_and_status(self):
        self.assert_rejects(lambda x: x.update(extra=True))
        self.assert_rejects(lambda x: x.pop("tria_instruction_check"))
        self.assert_rejects(lambda x: x["tria_instruction_check"].update(status="invalid"))
        self.assert_rejects(lambda x: x["tria_instruction_check"].update(message="   "))
        self.assert_rejects(lambda x: x.update(answer="\t  "))
        self.assert_rejects(lambda x: x.update(schema="Analysis-v2"))

    def test_candidate_fields_are_provisional_and_bounded(self):
        self.assert_rejects(lambda x: x["map_patch"]["objects"][0].update(id="O-existing"))
        self.assert_rejects(lambda x: x["map_patch"]["objects"][0].update(category="unknown"))
        self.assert_rejects(lambda x: x["map_patch"]["objects"][0].update(label="  "))
        self.assert_rejects(lambda x: x["map_patch"]["objects"][0].update(concept_kind="BOTH"))
        self.assert_rejects(lambda x: x["map_patch"]["relations"][0].update(type="causes"))
        self.assert_rejects(lambda x: x["map_patch"]["relations"][0].update(id="R-existing"))
        self.assert_rejects(lambda x: x["map_patch"]["relations"][0].update(description=""))
        self.assert_rejects(lambda x: x["map_patch"]["relations"][0].update(can_object_ids=["X", "X"]))
        self.assert_rejects(lambda x: x["map_patch"]["relations"][0].update(unknown=True))

        def too_many(x):
            x["map_patch"]["objects"] = [
                dict(x["map_patch"]["objects"][0], id=f"AI-O-{i}") for i in range(21)]
        self.assert_rejects(too_many)

    def test_reference_resolution_and_turn_checks_are_not_schema_claims(self):
        # JSON Schema cannot know whether a source Object ID exists or
        # whether an acknowledgement is correct for a given dialogue turn.
        item = example()
        item["map_patch"]["relations"][0]["origin_object_id"] = "NOT-IN-SOURCE"
        self.check.validate(item)
        # The contextual JS validator rejects this when used with a real document.
        self.assertIn("client", self.schema["description"].lower())


if __name__ == "__main__":
    unittest.main()
