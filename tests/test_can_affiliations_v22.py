"""D-84 CAN affiliations: scoped synthetic, non-empirical v2.2 regressions.

The affiliation graph distinguishes specialization from composition. Neither
form proves possession, parent/child necessity, sufficiency or Actualization.
Cycle findings are warnings pending a separately approved semantics policy.
"""
import copy
import json
import unittest
from pathlib import Path

from tools.validate_analysis import validator
from tools.validate_semantics import validate_semantics, established_cans

ROOT = Path(__file__).resolve().parents[1]


def load(name):
    return json.loads((ROOT / "tests" / "cases" / name).read_text(encoding="utf-8"))


class D84CanAffiliationTests(unittest.TestCase):
    def setUp(self):
        self.schema = validator()
        self.fixture = load("can_affiliations_v22.json")

    def issues(self, doc):
        return validate_semantics(doc)

    def codes(self, doc, severity="error"):
        return {x["code"] for x in self.issues(doc)
                if x["severity"] == severity}

    def test_v22_fixture_passes_structure_and_scoped_semantics(self):
        self.schema.validate(self.fixture)
        self.assertEqual(self.codes(self.fixture), set())
        self.assertEqual(self.fixture["schema_version"], "2.2.0")
        self.assertEqual(len(self.fixture["can_affiliations"]), 4)
        self.assertEqual(self.fixture["events"], [])

    def test_two_affiliation_kinds_and_multiple_parents(self):
        links = self.fixture["can_affiliations"]
        self.assertEqual({a["kind"] for a in links},
                         {"specialization", "composition"})
        python_parents = {a["parent_can"]["id"] for a in links
                          if a["child_can"]["id"] == "O-can-python"}
        self.assertEqual(python_parents, {"O-can-programming", "O-can-appdev"})
        self.assertEqual(len({(a["id"], a["version"]) for a in links}), 4)

    def test_can_objects_have_independent_identity_and_own_needs(self):
        by_id = {obj["id"]: obj for obj in self.fixture["objects"]}
        for edge in self.fixture["can_affiliations"]:
            self.assertEqual(by_id[edge["parent_can"]["id"]]["concept_kind"], "CAN")
            self.assertEqual(by_id[edge["child_can"]["id"]]["concept_kind"], "CAN")
        self.assertTrue(any(
            relation["origin_object"]["id"] == "O-can-play-piano"
            and relation["type"] == "NEED"
            for relation in self.fixture["relations"]
        ))
        for object_ in by_id.values():
            self.assertIsNone(object_["parent_id"])
            self.assertEqual(object_["temporary_child_ids"], [])
            self.assertEqual(object_["actualised_child_ids"], [])

    def test_parent_attribution_does_not_attribute_children(self):
        self.assertEqual(established_cans(self.fixture, "O-person-a"),
                         ["O-can-play-piano", "O-can-programming"])
        self.assertNotIn("O-can-python",
                         established_cans(self.fixture, "O-person-a"))
        self.assertNotIn("O-can-appdev",
                         established_cans(self.fixture, "O-person-a"))
        self.assertEqual(established_cans(self.fixture, "O-person-b"), [])

    def test_affiliation_is_not_a_requirement_or_sufficiency_assessment(self):
        for edge in self.fixture["can_affiliations"]:
            self.assertNotIn("actionable", edge)
            self.assertNotIn("necessary", edge)
            self.assertNotIn("sufficient", edge)
            self.assertNotIn("attribution", edge)
        self.assertEqual(self.fixture["power_assessments"], [])
        self.assertEqual(self.fixture["condition_assessments"], [])

    def test_v20_v21_documents_remain_valid_and_cannot_claim_v22_fields(self):
        legacy20 = load("analysis_without_scenario.json")
        legacy21 = load("identity_attribution_v21.json")
        self.schema.validate(legacy20)
        self.schema.validate(legacy21)
        for old in (legacy20, legacy21):
            changed = copy.deepcopy(old)
            changed["can_affiliations"] = []
            self.assertFalse(self.schema.is_valid(changed))

    def test_v22_requires_explicit_but_possibly_empty_affiliation_list(self):
        missing = copy.deepcopy(self.fixture)
        del missing["can_affiliations"]
        self.assertFalse(self.schema.is_valid(missing))
        empty = copy.deepcopy(self.fixture)
        empty["can_affiliations"] = []
        self.schema.validate(empty)
        self.assertEqual(self.codes(empty), set())

    def test_invalid_edge_shapes_rejected_by_json_schema(self):
        mutants = []
        wrong_kind = copy.deepcopy(self.fixture)
        wrong_kind["can_affiliations"][0]["kind"] = "mere_component"
        mutants.append(wrong_kind)
        missing_child = copy.deepcopy(self.fixture)
        del missing_child["can_affiliations"][0]["child_can"]
        mutants.append(missing_child)
        unversioned = copy.deepcopy(self.fixture)
        del unversioned["can_affiliations"][0]["qualification"]["claim_version"]
        mutants.append(unversioned)
        illegal_status = copy.deepcopy(self.fixture)
        illegal_status["can_affiliations"][0]["qualification"]["status"] = "actualized"
        mutants.append(illegal_status)
        extra_field = copy.deepcopy(self.fixture)
        extra_field["can_affiliations"][0]["necessary"] = True
        mutants.append(extra_field)
        for i, doc in enumerate(mutants):
            with self.subTest(mutation=i):
                self.assertFalse(self.schema.is_valid(doc))

    def test_non_can_endpoint_and_unresolved_version_are_semantic_errors(self):
        child_need = copy.deepcopy(self.fixture)
        child_need["can_affiliations"][0]["child_can"]["id"] = "O-need-instrument"
        self.schema.validate(child_need)
        self.assertIn("affiliation_endpoint_not_can", self.codes(child_need))
        dangling_version = copy.deepcopy(self.fixture)
        dangling_version["can_affiliations"][0]["parent_can"]["version"] = "v404"
        self.schema.validate(dangling_version)
        self.assertIn("unresolved_definition_version", self.codes(dangling_version))

    def test_claims_and_affiliation_ids_are_versioned_and_checked(self):
        bad_claim = copy.deepcopy(self.fixture)
        bad_claim["can_affiliations"][0]["qualification"]["claim_version"] = "v404"
        self.assertIn("affiliation_claim_unresolved", self.codes(bad_claim))
        duplicate = copy.deepcopy(self.fixture)
        duplicate["can_affiliations"].append(
            copy.deepcopy(duplicate["can_affiliations"][0])
        )
        self.schema.validate(duplicate)
        self.assertIn("duplicate_affiliation_version", self.codes(duplicate))

    def test_qualification_uncertainty_does_not_change_possession(self):
        unknown = copy.deepcopy(self.fixture)
        unknown["can_affiliations"][0]["qualification"]["status"] = "indeterminate"
        self.schema.validate(unknown)
        self.assertEqual(self.codes(unknown), set())
        self.assertEqual(established_cans(unknown, "O-person-a"),
                         established_cans(self.fixture, "O-person-a"))

    def test_cycles_are_reported_as_warnings_not_assumed_invalid(self):
        reversed_edge = copy.deepcopy(self.fixture)
        extra = copy.deepcopy(reversed_edge["can_affiliations"][0])
        extra["id"] = "AF-reverse-python"
        extra["parent_can"], extra["child_can"] = (
            extra["child_can"], extra["parent_can"]
        )
        reversed_edge["can_affiliations"].append(extra)
        self.schema.validate(reversed_edge)
        self.assertEqual(self.codes(reversed_edge), set())
        self.assertIn("can_affiliation_cycle",
                      self.codes(reversed_edge, severity="warning"))


if __name__ == "__main__":
    unittest.main()
