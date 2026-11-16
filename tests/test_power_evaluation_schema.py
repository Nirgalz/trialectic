"""Draft 2020-12 boundary/schema checks; deliberately NOT a complete nested data contract.

The schema enforces only approved D-57/D-61-D-68 boundaries. The older
test_power_evaluation.py adapter supplies separate, provisional semantic checks.
"""
from __future__ import annotations

import copy
import json
import pathlib
import unittest

from jsonschema import Draft202012Validator
from jsonschema.exceptions import ValidationError

from test_power_evaluation import validate_fixture

ROOT = pathlib.Path(__file__).resolve().parents[1]
SCHEMA = ROOT / "schemas" / "power-evaluation.boundaries.schema.json"
CASES = ROOT / "tests" / "cases" / "power_evaluation.json"


class PowerEvaluationBoundarySchemaTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.schema = json.loads(SCHEMA.read_text(encoding="utf-8"))
        Draft202012Validator.check_schema(cls.schema)
        cls.validator = Draft202012Validator(cls.schema)
        cls.fixture = json.loads(CASES.read_text(encoding="utf-8"))
        cls.records = cls.fixture["evaluations"]

    def assert_valid(self, obj):
        self.validator.validate(obj)

    def assert_invalid(self, obj):
        with self.assertRaises(ValidationError):
            self.validator.validate(obj)

    def test_schema_declares_draft_2020_12(self):
        self.assertEqual(self.schema["$schema"], "https://json-schema.org/draft/2020-12/schema")

    def test_all_seven_linked_records_validate_structurally(self):
        for record in self.records:
            with self.subTest(evaluation=record["ID"]):
                self.assert_valid(record)

    def test_exactly_six_top_level_fields(self):
        for field in ["ID", "Subject", "Focus", "Context", "Dependencies", "Results"]:
            with self.subTest(missing=field):
                obj = copy.deepcopy(self.records[0])
                del obj[field]
                self.assert_invalid(obj)
        obj = copy.deepcopy(self.records[0])
        obj["NewTopLevelField"] = True
        self.assert_invalid(obj)

    def test_focus_type_required_case_sensitive(self):
        for value in [None, "need", "CAN2", "scenario", "UNKNOWN"]:
            with self.subTest(value=value):
                obj = copy.deepcopy(self.records[0])
                if value is None:
                    del obj["Focus"]["type"]
                else:
                    obj["Focus"]["type"] = value
                self.assert_invalid(obj)

    def test_focus_needs_correct_reference(self):
        for i, reference in [(0, "object_id"), (1, "object_id"),
                             (2, "scenario_id")]:
            with self.subTest(kind=self.records[i]["Focus"]["type"]):
                obj = copy.deepcopy(self.records[i])
                del obj["Focus"][reference]
                self.assert_invalid(obj)

    def test_contradictory_focus_reference_rejected(self):
        for i, wrong_ref in [(0, "scenario_id"), (1, "scenario_id"),
                             (2, "object_id")]:
            with self.subTest(kind=self.records[i]["Focus"]["type"]):
                obj = copy.deepcopy(self.records[i])
                obj["Focus"][wrong_ref] = "conflicting-reference"
                self.assert_invalid(obj)

    def test_wrong_results_sections_rejected(self):
        for source, target in [(0, 1), (1, 0), (2, 0)]:
            with self.subTest(source=source, target=target):
                obj = copy.deepcopy(self.records[source])
                obj["Results"] = copy.deepcopy(self.records[target]["Results"])
                self.assert_invalid(obj)

    def test_one_required_result_section_missing_is_invalid(self):
        for i in [0, 1, 2]:
            obj = copy.deepcopy(self.records[i])
            section = next(iter(obj["Results"]))
            with self.subTest(kind=obj["Focus"]["type"], section=section):
                del obj["Results"][section]
                self.assert_invalid(obj)

    def test_cross_focus_result_sections_cannot_mix(self):
        obj = copy.deepcopy(self.records[0])
        obj["Results"]["actualizability"] = {}
        self.assert_invalid(obj)

    def test_structure_cannot_prove_reference_existence(self):
        obj = copy.deepcopy(self.records[1])
        obj["Focus"]["object_id"] = "UNREGISTERED-NONEXISTENT-OBJECT"
        self.assert_valid(obj)  # structural conformity alone is insufficient
        synthetic = copy.deepcopy(self.fixture)
        synthetic["evaluations"][1] = obj
        with self.assertRaises(ValueError):
            validate_fixture(synthetic)

    def test_subject_requires_object_and_nonempty_object_id(self):
        for invalid in [None, 12, [], {}, {"object_id": ""}, {"object_id": None},
                        {"object_id": 17}]:
            with self.subTest(subject=invalid):
                obj = copy.deepcopy(self.records[0])
                obj["Subject"] = invalid
                self.assert_invalid(obj)

    def test_context_requires_object_and_nonempty_version_map(self):
        for invalid in [None, 4, [], {}, {"definition_versions": {}},
                        {"definition_versions": {"": "v1"}},
                        {"definition_versions": {"O-CAR": ""}},
                        {"definition_versions": {"O-CAR": None}},
                        {"definition_versions": []}]:
            with self.subTest(context=invalid):
                obj = copy.deepcopy(self.records[0])
                obj["Context"] = invalid
                self.assert_invalid(obj)

    def test_missing_context_definition_versions_is_invalid(self):
        obj = copy.deepcopy(self.records[0])
        del obj["Context"]["definition_versions"]
        self.assert_invalid(obj)

    def test_context_scenario_and_provenance_are_optional(self):
        obj = copy.deepcopy(self.records[0])
        obj["Context"].pop("scenario_id")
        obj["Context"].pop("provenance")
        self.assert_valid(obj)
        obj["Context"]["provenance"] = {}
        self.assert_valid(obj)

    def test_present_context_scenario_is_nonempty_string(self):
        for invalid in [None, "", 0, False, []]:
            with self.subTest(scenario=invalid):
                obj = copy.deepcopy(self.records[0])
                obj["Context"]["scenario_id"] = invalid
                self.assert_invalid(obj)

    def test_provenance_object_and_revision_link_types(self):
        for invalid in [None, "", [], 17, False]:
            with self.subTest(provenance=invalid):
                obj = copy.deepcopy(self.records[0])
                obj["Context"]["provenance"] = invalid
                self.assert_invalid(obj)
        for invalid in [None, "", [], 10, False]:
            with self.subTest(revises=invalid):
                obj = copy.deepcopy(self.records[3])
                obj["Context"]["provenance"]["revises"] = invalid
                self.assert_invalid(obj)

    def test_revision_link_requirement_is_semantic_when_revision_known(self):
        obj = copy.deepcopy(self.records[3])
        obj["Context"]["provenance"].pop("revises")
        self.assert_valid(obj)  # D-68: schema has no "is_revision" proof
        data = copy.deepcopy(self.fixture)
        data["evaluations"][3] = obj
        with self.assertRaises(ValueError):
            validate_fixture(data)  # D-60 applied as an inter-record constraint

    def test_dependencies_array_and_reference_fields(self):
        for invalid in [None, "", 0, {}, [None], ["PE-NEED-001"], [{}],
                        [{"evaluation_id": ""}], [{"evaluation_id": 4}],
                        [{"evaluation_id": None}]]:
            with self.subTest(dependencies=invalid):
                obj = copy.deepcopy(self.records[0])
                obj["Dependencies"] = invalid
                self.assert_invalid(obj)

    def test_empty_dependencies_does_not_imply_no_conceptual_dependencies(self):
        obj = copy.deepcopy(self.records[1])
        obj["Dependencies"] = []
        self.assert_valid(obj)  # structural check only; semantics differ

    def test_unapproved_nested_metadata_remains_open(self):
        obj = copy.deepcopy(self.records[1])
        obj["Subject"]["unvalidated_metadata"] = {"extra": 1}
        obj["Context"]["provenance"]["unvalidated_metadata"] = [1, 2]
        obj["Dependencies"][0]["unvalidated_metadata"] = False
        self.assert_valid(obj)  # nested additionalProperties closure remains OPEN

    def test_structurally_valid_missing_dependencies_and_versions_not_semantic(self):
        obj = copy.deepcopy(self.records[1])
        obj["Dependencies"][0]["evaluation_id"] = "MISSING-EVALUATION"
        obj["Context"]["definition_versions"] = {"UNKNOWN-OBJECT": "unknown-version"}
        self.assert_valid(obj)
        data = copy.deepcopy(self.fixture)
        data["evaluations"][1] = obj
        with self.assertRaises(ValueError):
            validate_fixture(data)


if __name__ == "__main__":
    unittest.main()
