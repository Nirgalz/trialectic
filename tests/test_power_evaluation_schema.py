"""Draft 2020-12 boundary/schema checks; deliberately NOT a complete nested data contract.

The schema enforces only approved D-57/D-61-D-67 boundaries. The older
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

    def test_nonapproved_nested_serialization_remains_unconstrained(self):
        obj = copy.deepcopy(self.records[0])
        obj["Context"] = 4  # NOT endorsed; intentionally outside D-66/D-67 scope
        self.assert_valid(obj)
        # Once Context shape is approved, this must become invalid.


if __name__ == "__main__":
    unittest.main()
