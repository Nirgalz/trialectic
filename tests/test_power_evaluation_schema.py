"""Draft 2020-12 boundary/schema checks; deliberately NOT a complete nested data contract.

The schema enforces only approved D-57/D-61-D-69 boundaries. The older
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

    def test_d69_need_satisfaction_status_required(self):
        for idx in [0, 6]:
            for change in ["missing", None, "", 4, "partially_satisfied", "Satisfied"]:
                with self.subTest(need=self.records[idx]["ID"], change=change):
                    obj = copy.deepcopy(self.records[idx])
                    item = obj["Results"]["effective_satisfaction"]
                    if change == "missing":
                        item.pop("status")
                    else:
                        item["status"] = change
                    self.assert_invalid(obj)

    def test_d69_justification_is_required_nonempty_even_when_indeterminate(self):
        for change in ["missing", None, "", 22, []]:
            with self.subTest(justification=change):
                obj = copy.deepcopy(self.records[0])
                item = obj["Results"]["effective_satisfaction"]
                item["status"] = "indeterminate"
                if change == "missing":
                    item.pop("justification")
                else:
                    item["justification"] = change
                self.assert_invalid(obj)
        obj = copy.deepcopy(self.records[0])
        obj["Results"]["effective_satisfaction"].update(
            status="indeterminate",
            justification="Need satisfaction cannot be inferred from these measurements."
        )
        self.assert_valid(obj)

    def test_d69_optional_degree_with_justified_basis_and_no_universal_scale(self):
        obj = copy.deepcopy(self.records[0])
        result = obj["Results"]["effective_satisfaction"]
        result["status"] = "unsatisfied"
        result["degree"] = {
            "value": 60,
            "measure": "percentage_of_required_volume",
            "basis": "Synthetic illustration: 6 litres / 10 litres required"
        }
        self.assert_valid(obj)
        # No universal 0-1 bound or fourth partial status is being asserted.
        result["status"] = "indeterminate"
        result["degree"] = {
            "value": 1500,
            "measure": "measured_volume_ml",
            "basis": "Hypothetical measurement whose sufficiency threshold is not established"
        }
        result["justification"] = "Measured value exists but the satisfaction criterion is unresolved."
        self.assert_valid(obj)

    def test_d69_malformed_degree_is_invalid(self):
        invalid = [
            None, False, 0, "", [], {},
            {"value": 1},
            {"value": 1, "measure": "litres"},
            {"value": 1, "basis": "illustrative"},
            {"value": True, "measure": "litres", "basis": "illustrative"},
            {"value": "60", "measure": "percent", "basis": "illustrative"},
            {"value": 1, "measure": "", "basis": "illustrative"},
            {"value": 1, "measure": "litres", "basis": ""},
            {"value": 1, "measure": "litres", "basis": None}
        ]
        for degree in invalid:
            with self.subTest(degree=degree):
                obj = copy.deepcopy(self.records[0])
                obj["Results"]["effective_satisfaction"]["degree"] = degree
                self.assert_invalid(obj)

    def test_d69_evidence_optional_empty_or_nonempty_reference_array(self):
        obj = copy.deepcopy(self.records[0])
        item = obj["Results"]["effective_satisfaction"]
        item.pop("evidence")
        self.assert_valid(obj)
        item["evidence"] = []
        self.assert_valid(obj)
        item["evidence"] = ["EV-001", "EV-002"]
        self.assert_valid(obj)
        for evidence in [None, "", "EV-001", [""], [None], [23], {}, [True]]:
            with self.subTest(evidence=evidence):
                item["evidence"] = evidence
                self.assert_invalid(obj)

    def test_d69_uncertainty_optional_object_no_certainty_inference(self):
        obj = copy.deepcopy(self.records[0])
        item = obj["Results"]["effective_satisfaction"]
        item.pop("uncertainty", None)
        self.assert_valid(obj)
        item["uncertainty"] = {}
        self.assert_valid(obj)
        item["uncertainty"] = {
            "description": "No verified calibration", "source": "model assumption"
        }
        self.assert_valid(obj)
        for uncertainty in [None, False, 5, [], "certain"]:
            with self.subTest(uncertainty=uncertainty):
                item["uncertainty"] = uncertainty
                self.assert_invalid(obj)

    def test_d69_temporal_compliance_kept_separate(self):
        obj = copy.deepcopy(self.records[6])
        self.assertEqual(
            obj["Results"]["effective_satisfaction"]["status"], "unsatisfied"
        )
        self.assertEqual(
            obj["Results"]["temporal_compliance"]["status"], "satisfied"
        )
        self.assert_valid(obj)

    def test_d69_unapproved_nested_metadata_remains_allowed(self):
        obj = copy.deepcopy(self.records[6])
        obj["Results"]["effective_satisfaction"]["violations"] = [
            {"start": "2026-11-16T09:20+01:00", "end": "2026-11-16T09:40+01:00"}
        ]
        obj["Results"]["effective_satisfaction"]["undecided_metadata"] = {"x": 1}
        self.assert_valid(obj)  # additionalProperties closure has not been approved

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
