"""Draft 2020-12 boundary/schema checks; deliberately NOT a complete nested data contract.

The schema enforces only approved D-57/D-61-D-73 boundaries. The older
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

    def test_d70_applicability_is_required_and_enum_is_exact(self):
        for idx in [0, 6]:
            for change in ["missing", None, "", "Applicable", "not-applicable",
                           "unknown", "satisfied", 1, False, []]:
                with self.subTest(need=self.records[idx]["ID"], applicability=change):
                    obj = copy.deepcopy(self.records[idx])
                    tc = obj["Results"]["temporal_compliance"]
                    if change == "missing":
                        tc.pop("applicability")
                    else:
                        tc["applicability"] = change
                    self.assert_invalid(obj)

    def test_d70_applicable_requires_three_state_status(self):
        for valid in ["satisfied", "unsatisfied", "indeterminate"]:
            with self.subTest(status=valid):
                obj = copy.deepcopy(self.records[0])
                tc = obj["Results"]["temporal_compliance"]
                tc["applicability"] = "applicable"
                tc["status"] = valid
                self.assert_valid(obj)
        for invalid in [None, "", "Satisfied", "not_applicable", 0, False]:
            with self.subTest(status=invalid):
                obj = copy.deepcopy(self.records[0])
                obj["Results"]["temporal_compliance"]["status"] = invalid
                self.assert_invalid(obj)
        obj = copy.deepcopy(self.records[0])
        del obj["Results"]["temporal_compliance"]["status"]
        self.assert_invalid(obj)

    def test_d70_not_applicable_forbids_compliance_status(self):
        obj = copy.deepcopy(self.records[0])
        tc = obj["Results"]["temporal_compliance"]
        tc["applicability"] = "not_applicable"
        tc["justification"] = "No temporal requirement applies in this illustrative context."
        tc.pop("status")
        self.assert_valid(obj)
        for status in ["satisfied", "unsatisfied", "indeterminate", None]:
            with self.subTest(status=status):
                tc["status"] = status
                self.assert_invalid(obj)

    def test_d70_applicability_indeterminate_restricts_optional_status(self):
        obj = copy.deepcopy(self.records[0])
        tc = obj["Results"]["temporal_compliance"]
        tc["applicability"] = "indeterminate"
        tc["justification"] = "Whether the temporal requirement applies is unknown."
        tc.pop("status")
        self.assert_valid(obj)
        tc["status"] = "indeterminate"
        self.assert_valid(obj)
        for status in ["satisfied", "unsatisfied", None, "not_applicable"]:
            with self.subTest(status=status):
                tc["status"] = status
                self.assert_invalid(obj)

    def test_d70_nonempty_justification_required_for_all_applicabilities(self):
        for applicability in ["applicable", "not_applicable", "indeterminate"]:
            for invalid in ["missing", None, "", 12, [], False]:
                with self.subTest(applicability=applicability, justification=invalid):
                    obj = copy.deepcopy(self.records[0])
                    tc = obj["Results"]["temporal_compliance"]
                    tc["applicability"] = applicability
                    if applicability != "applicable":
                        tc.pop("status")
                    if invalid == "missing":
                        tc.pop("justification")
                    else:
                        tc["justification"] = invalid
                    self.assert_invalid(obj)

    def test_d70_applied_exceptions_optional_ref_array(self):
        obj = copy.deepcopy(self.records[6])
        tc = obj["Results"]["temporal_compliance"]
        tc.pop("applied_exceptions")
        self.assert_valid(obj)
        tc["applied_exceptions"] = []
        self.assert_valid(obj)
        tc["applied_exceptions"] = ["EX-001", "EX-002"]
        self.assert_valid(obj)
        for invalid in [None, "", 12, {}, [None], [""], [5], [False]]:
            with self.subTest(applied_exceptions=invalid):
                tc["applied_exceptions"] = invalid
                self.assert_invalid(obj)

    def test_d70_evidence_optional_ref_array(self):
        obj = copy.deepcopy(self.records[0])
        tc = obj["Results"]["temporal_compliance"]
        tc.pop("evidence", None)
        self.assert_valid(obj)
        tc["evidence"] = []
        self.assert_valid(obj)
        tc["evidence"] = ["EV-INTERRUPTION", "EV-AUTHORIZATION"]
        self.assert_valid(obj)
        for invalid in [None, "", {}, [None], [""], [42], [True]]:
            with self.subTest(evidence=invalid):
                tc["evidence"] = invalid
                self.assert_invalid(obj)

    def test_d70_uncertainty_optional_open_object(self):
        obj = copy.deepcopy(self.records[0])
        tc = obj["Results"]["temporal_compliance"]
        tc.pop("uncertainty", None)
        self.assert_valid(obj)
        tc["uncertainty"] = {}
        self.assert_valid(obj)
        tc["uncertainty"] = {"description": "Time of observation not verified"}
        self.assert_valid(obj)
        for invalid in [None, 5, "", False, []]:
            with self.subTest(uncertainty=invalid):
                tc["uncertainty"] = invalid
                self.assert_invalid(obj)

    def test_d70_authorized_exception_does_not_change_effective_status(self):
        obj = copy.deepcopy(self.records[6])
        self.assertEqual(
            obj["Results"]["effective_satisfaction"]["status"], "unsatisfied"
        )
        self.assertEqual(obj["Results"]["temporal_compliance"]["applicability"],
                         "applicable")
        self.assertEqual(obj["Results"]["temporal_compliance"]["status"],
                         "satisfied")
        self.assertEqual(obj["Results"]["temporal_compliance"]["applied_exceptions"],
                         ["EX-001"])
        self.assert_valid(obj)

    def test_d70_structural_exception_reference_does_not_prove_authorization(self):
        obj = copy.deepcopy(self.records[6])
        obj["Results"]["temporal_compliance"]["applied_exceptions"] = [
            "UNVERIFIED-EXCEPTION"
        ]
        self.assert_valid(obj)  # authorization and scoped validity remain semantic

    def test_d70_unapproved_temporal_metadata_is_open(self):
        obj = copy.deepcopy(self.records[0])
        obj["Results"]["temporal_compliance"]["requirement_assessments"] = {
            "documentation_only": True
        }
        self.assert_valid(obj)  # no extra-properties closure yet

    def test_d71_identified_required_and_array(self):
        for invalid in ["missing", None, 1, False, "", {}, "O-CAN-RECHARGE", [None], ["O-CAN-RECHARGE"]]:
            with self.subTest(value=invalid):
                obj = copy.deepcopy(self.records[0])
                candidate = obj["Results"]["candidate_cans"]
                if invalid == "missing":
                    candidate.pop("identified")
                else:
                    candidate["identified"] = invalid
                self.assert_invalid(obj)

    def test_d71_candidate_entry_requires_object_id_and_justification(self):
        invalid_entries = [
            {}, {"object_id": "O-CAN-RECHARGE"},
            {"justification": "Candidate match"},
            {"object_id": "", "justification": "Candidate match"},
            {"object_id": 7, "justification": "Candidate match"},
            {"object_id": None, "justification": "Candidate match"},
            {"object_id": "O-CAN-RECHARGE", "justification": ""},
            {"object_id": "O-CAN-RECHARGE", "justification": None},
            {"object_id": "O-CAN-RECHARGE", "justification": 11}
        ]
        for invalid in invalid_entries:
            with self.subTest(entry=invalid):
                obj = copy.deepcopy(self.records[0])
                obj["Results"]["candidate_cans"]["identified"] = [invalid]
                self.assert_invalid(obj)

    def test_d71_candidate_entry_optional_evidence_refs(self):
        obj = copy.deepcopy(self.records[0])
        candidate = obj["Results"]["candidate_cans"]
        entry = {
            "object_id": "O-CAN-RECHARGE",
            "justification": "A contemplated recharge could be relevant to the modeled energy NEED."
        }
        candidate["identified"] = [entry]
        self.assert_valid(obj)
        entry["evidence"] = []
        self.assert_valid(obj)
        entry["evidence"] = ["EV-RECHARGE-001"]
        self.assert_valid(obj)
        for invalid in [None, 42, "", "EV-RECHARGE-001", {}, [None], [""], [False]]:
            with self.subTest(evidence=invalid):
                entry["evidence"] = invalid
                self.assert_invalid(obj)

    def test_d71_search_status_required_enum(self):
        for invalid in ["missing", None, "", "Search", "not searched", "unknown", False, 0, []]:
            with self.subTest(search_status=invalid):
                obj = copy.deepcopy(self.records[0])
                candidate = obj["Results"]["candidate_cans"]
                if invalid == "missing":
                    candidate.pop("search_status")
                else:
                    candidate["search_status"] = invalid
                self.assert_invalid(obj)
        obj = copy.deepcopy(self.records[0])
        obj["Results"]["candidate_cans"]["search_status"] = "searched"
        self.assert_valid(obj)

    def test_d71_coverage_required_enum(self):
        for invalid in ["missing", None, "", "Complete", "unknown", "unlimited", False, [], 2]:
            with self.subTest(coverage=invalid):
                obj = copy.deepcopy(self.records[0])
                candidate = obj["Results"]["candidate_cans"]
                if invalid == "missing":
                    candidate.pop("coverage")
                else:
                    candidate["coverage"] = invalid
                self.assert_invalid(obj)
        for allowed in ["complete", "incomplete", "indeterminate"]:
            with self.subTest(coverage=allowed):
                obj = copy.deepcopy(self.records[0])
                candidate = obj["Results"]["candidate_cans"]
                candidate["search_status"] = "searched"
                candidate["coverage"] = allowed
                self.assert_valid(obj)

    def test_d71_no_search_cannot_claim_complete_coverage(self):
        obj = copy.deepcopy(self.records[0])
        candidate = obj["Results"]["candidate_cans"]
        candidate["search_status"] = "not_searched"
        candidate["coverage"] = "complete"
        self.assert_invalid(obj)
        for allowed in ["incomplete", "indeterminate"]:
            with self.subTest(coverage=allowed):
                candidate["coverage"] = allowed
                self.assert_valid(obj)

    def test_d71_scope_required_nonempty(self):
        for invalid in ["missing", None, "", False, 0, {}, []]:
            with self.subTest(scope=invalid):
                obj = copy.deepcopy(self.records[0])
                candidate = obj["Results"]["candidate_cans"]
                if invalid == "missing":
                    candidate.pop("scope")
                else:
                    candidate["scope"] = invalid
                self.assert_invalid(obj)

    def test_d71_justification_required_nonempty(self):
        for invalid in ["missing", None, "", False, 7, {}, []]:
            with self.subTest(justification=invalid):
                obj = copy.deepcopy(self.records[0])
                candidate = obj["Results"]["candidate_cans"]
                if invalid == "missing":
                    candidate.pop("justification")
                else:
                    candidate["justification"] = invalid
                self.assert_invalid(obj)

    def test_d71_inventory_evidence_optional_array(self):
        obj = copy.deepcopy(self.records[0])
        candidate = obj["Results"]["candidate_cans"]
        candidate.pop("evidence", None)
        self.assert_valid(obj)
        candidate["evidence"] = []
        self.assert_valid(obj)
        candidate["evidence"] = ["EV-SEARCH-001"]
        self.assert_valid(obj)
        for invalid in [None, "EV-SEARCH-001", "", 5, {}, [None], [""], [False]]:
            with self.subTest(evidence=invalid):
                candidate["evidence"] = invalid
                self.assert_invalid(obj)

    def test_d71_uncertainty_optional_object(self):
        obj = copy.deepcopy(self.records[0])
        candidate = obj["Results"]["candidate_cans"]
        candidate.pop("uncertainty", None)
        self.assert_valid(obj)
        candidate["uncertainty"] = {}
        self.assert_valid(obj)
        candidate["uncertainty"] = {"description": "Inventory was not independently verified"}
        self.assert_valid(obj)
        for invalid in [None, "not certain", 7, False, []]:
            with self.subTest(uncertainty=invalid):
                candidate["uncertainty"] = invalid
                self.assert_invalid(obj)

    def test_d71_empty_scoped_complete_inventory_not_proof_of_impossibility(self):
        obj = copy.deepcopy(self.records[0])
        c = obj["Results"]["candidate_cans"]
        c.update(
            identified=[],
            search_status="searched",
            coverage="complete",
            scope="Declared hypothetical candidate classes only",
            justification="Illustrative scoped inventory; no globally exhaustive claim."
        )
        self.assert_valid(obj)

    def test_d71_candidate_in_environment_not_an_actualization_proof(self):
        obj = copy.deepcopy(self.records[0])
        obj["Results"]["candidate_cans"]["identified"] = [{
            "object_id": "O-CAN-RECHARGE",
            "justification": "A different Object could contribute through a contemplated recharge."
        }]
        self.assert_valid(obj)  # structural matching only, no Power inference

    def test_d71_reference_target_type_needs_semantic_validation(self):
        obj = copy.deepcopy(self.records[0])
        obj["Results"]["candidate_cans"]["identified"] = [{
            "object_id": "O-NEED-ENERGY",
            "justification": "Syntactically valid but this Object is not a CAN."
        }]
        self.assert_valid(obj)
        data = copy.deepcopy(self.fixture)
        data["evaluations"][0] = obj
        with self.assertRaises(ValueError):
            validate_fixture(data)  # known wrong Object category

    def test_d71_extra_nested_metadata_remains_open(self):
        obj = copy.deepcopy(self.records[0])
        c = obj["Results"]["candidate_cans"]
        c["unapproved_future_metadata"] = {"content": "not standardized"}
        c["identified"] = [{
            "object_id": "O-CAN-RECHARGE",
            "justification": "Illustrative contextual match",
            "unapproved_candidate_metadata": True
        }]
        self.assert_valid(obj)

    def test_d72_status_required_exact_enum(self):
        for idx in [1, 3, 5]:
            for value in ["missing", None, "Actualizable", "partially_satisfied",
                          "not_applicable", "unknown", False, 2]:
                with self.subTest(can=self.records[idx]["ID"], value=value):
                    obj = copy.deepcopy(self.records[idx])
                    item = obj["Results"]["actualizability"]
                    if value == "missing":
                        item.pop("status")
                    else:
                        item["status"] = value
                    self.assert_invalid(obj)

    def test_d72_all_four_statuses_allowed_without_degree(self):
        for status in ["actualizable", "partially_actualizable",
                       "not_actualizable", "indeterminate"]:
            with self.subTest(status=status):
                obj = copy.deepcopy(self.records[5])
                item = obj["Results"]["actualizability"]
                item["status"] = status
                item.pop("degree", None)
                self.assert_valid(obj)

    def test_d72_justification_required_even_if_indeterminate(self):
        for value in ["missing", None, "", [], 0, False]:
            with self.subTest(value=value):
                obj = copy.deepcopy(self.records[5])
                item = obj["Results"]["actualizability"]
                if value == "missing":
                    item.pop("justification")
                else:
                    item["justification"] = value
                self.assert_invalid(obj)

    def test_d72_degree_object_all_fields_required(self):
        obj = copy.deepcopy(self.records[1])
        degree = obj["Results"]["actualizability"]["degree"]
        for key in ["value", "measure", "basis"]:
            with self.subTest(missing=key):
                case = copy.deepcopy(obj)
                case["Results"]["actualizability"]["degree"].pop(key)
                self.assert_invalid(case)
        for invalid in [None, False, "0.1", 0.2, []]:
            with self.subTest(degree=invalid):
                case = copy.deepcopy(obj)
                case["Results"]["actualizability"]["degree"] = invalid
                self.assert_invalid(case)
        self.assertTrue(degree["basis"])

    def test_d72_degree_value_must_be_numeric_and_strings_nonempty(self):
        obj = copy.deepcopy(self.records[1])
        for value in ["0.1", None, True, [], {}]:
            with self.subTest(value=value):
                case = copy.deepcopy(obj)
                case["Results"]["actualizability"]["degree"]["value"] = value
                self.assert_invalid(case)
        for key in ["measure", "basis"]:
            for value in ["", None, [], False, 2]:
                with self.subTest(field=key, value=value):
                    case = copy.deepcopy(obj)
                    case["Results"]["actualizability"]["degree"][key] = value
                    self.assert_invalid(case)

    def test_d72_no_universal_numeric_range(self):
        obj = copy.deepcopy(self.records[5])
        item = obj["Results"]["actualizability"]
        item["degree"] = {
            "value": 1250,
            "measure": "hypothetical_distance_m",
            "basis": "Distance in a model; satisfaction threshold unverified"
        }
        self.assert_valid(obj)
        item["degree"]["value"] = -50
        self.assert_valid(obj)  # no universal sign/range: measure-specific semantics are OPEN

    def test_d72_uncertainty_is_optional_object(self):
        obj = copy.deepcopy(self.records[1])
        item = obj["Results"]["actualizability"]
        item.pop("uncertainty")
        self.assert_valid(obj)
        item["uncertainty"] = {}
        self.assert_valid(obj)
        item["uncertainty"] = {"description": "Measure is an estimate"}
        self.assert_valid(obj)
        for invalid in ["uncertain", None, False, [], 7]:
            with self.subTest(value=invalid):
                item["uncertainty"] = invalid
                self.assert_invalid(obj)

    def test_d72_evidence_optional_array_of_nonempty_references(self):
        obj = copy.deepcopy(self.records[1])
        item = obj["Results"]["actualizability"]
        item.pop("evidence", None)
        self.assert_valid(obj)
        item["evidence"] = []
        self.assert_valid(obj)
        item["evidence"] = ["EV-MODEL", "EV-SOURCE"]
        self.assert_valid(obj)
        for invalid in [None, "EV-1", 42, {}, [""], [None], [True]]:
            with self.subTest(value=invalid):
                item["evidence"] = invalid
                self.assert_invalid(obj)

    def test_d72_unapproved_extra_degree_metadata_is_allowed(self):
        obj = copy.deepcopy(self.records[1])
        degree = obj["Results"]["actualizability"]["degree"]
        self.assertIn("estimated_distance_km", degree)
        degree["measure_assumptions"] = {"unverified": True}
        obj["Results"]["actualizability"]["time_horizon_proposal"] = "OPEN"
        self.assert_valid(obj)  # nested closure and contemplated-Actualization ID OPEN

    def test_d72_unknown_not_impossible_and_partial_without_numeric_degree(self):
        obj = copy.deepcopy(self.records[5])
        item = obj["Results"]["actualizability"]
        self.assertEqual(item["status"], "indeterminate")
        self.assertNotIn("degree", item)
        self.assert_valid(obj)
        item["status"] = "partially_actualizable"
        item["justification"] = "One qualitative component is possible; measure not meaningful."
        self.assert_valid(obj)

    def test_d72_schema_does_not_infer_actualization_from_status(self):
        obj = copy.deepcopy(self.records[5])
        item = obj["Results"]["actualizability"]
        item["status"] = "actualizable"
        item["justification"] = "Hypothetical possibility only; event not asserted"
        self.assert_valid(obj)
        self.assertNotIn("ActualizationEvent", obj)  # distinct layer

    def test_d73_required_prerequisite_fields(self):
        required = ["needs", "cans", "conditions", "pathways",
                    "inventory_coverage", "scope", "justification"]
        for field in required:
            with self.subTest(missing=field):
                obj = copy.deepcopy(self.records[1])
                obj["Results"]["prerequisites"].pop(field)
                self.assert_invalid(obj)

    def test_d73_prerequisites_must_be_object(self):
        for bad in [None, False, "", [], 0, {"needs": []}]:
            with self.subTest(value=bad):
                obj = copy.deepcopy(self.records[1])
                obj["Results"]["prerequisites"] = bad
                self.assert_invalid(obj)

    def test_d73_four_collections_are_arrays_and_can_be_empty(self):
        for key in ["needs", "cans", "conditions", "pathways"]:
            for bad in [None, False, 2, {}, "O-NEED-ENERGY"]:
                with self.subTest(key=key, value=bad):
                    obj = copy.deepcopy(self.records[1])
                    obj["Results"]["prerequisites"][key] = bad
                    self.assert_invalid(obj)
        obj = copy.deepcopy(self.records[1])
        for key in ["needs", "cans", "conditions", "pathways"]:
            obj["Results"]["prerequisites"][key] = []
        self.assert_valid(obj)  # empty inventory != proof no prerequisites exist

    def test_d73_need_and_can_refs_require_nonempty_object_id(self):
        for key in ["needs", "cans"]:
            for bad in [None, "id", False, 2, {}, {"evaluation_id": "PE-NEED-001"},
                        {"object_id": ""}, {"object_id": None},
                        {"object_id": 2}]:
                with self.subTest(key=key, ref=bad):
                    obj = copy.deepcopy(self.records[1])
                    obj["Results"]["prerequisites"][key] = [bad]
                    self.assert_invalid(obj)

    def test_d73_evaluation_id_optional_but_typed_when_present(self):
        for key in ["needs", "cans"]:
            obj = copy.deepcopy(self.records[1])
            p = obj["Results"]["prerequisites"]
            p[key] = [{"object_id": "O-CAN-RECHARGE" if key == "cans"
                       else "O-NEED-ENERGY"}]
            self.assert_valid(obj)
            p[key][0]["evaluation_id"] = "PE-NEED-001"
            self.assert_valid(obj)  # target kind and use are semantic
            for bad in [None, "", False, 0, [], {}]:
                with self.subTest(key=key, evaluation_id=bad):
                    p[key][0]["evaluation_id"] = bad
                    self.assert_invalid(obj)

    def test_d73_condition_scoped_identity_and_optional_status(self):
        obj = copy.deepcopy(self.records[1])
        p = obj["Results"]["prerequisites"]
        p["conditions"] = [{
            "owner_relation_id": "R-CAN-TRAVEL",
            "condition_id": "C-ENERGY-1000"
        }]
        self.assert_valid(obj)  # absence of status is not automatic indeterminate
        for status in ["satisfied", "unsatisfied", "indeterminate"]:
            p["conditions"][0]["status"] = status
            self.assert_valid(obj)
        for status in [None, "unknown", "partially_satisfied", 1, False]:
            with self.subTest(status=status):
                p["conditions"][0]["status"] = status
                self.assert_invalid(obj)

    def test_d73_condition_ref_rejects_unqualified_identity(self):
        bads = [{}, {"condition_id": "C-ENERGY-1000"},
                {"owner_relation_id": "R-CAN-TRAVEL"},
                {"owner_relation_id": "", "condition_id": "C"},
                {"owner_relation_id": "R", "condition_id": ""},
                {"owner_relation_id": None, "condition_id": "C"},
                {"owner_relation_id": "R", "condition_id": None},
                {"owner_relation_id": 5, "condition_id": "C"},
                "C-ENERGY-1000", None]
        for bad in bads:
            with self.subTest(condition=bad):
                obj = copy.deepcopy(self.records[1])
                obj["Results"]["prerequisites"]["conditions"] = [bad]
                self.assert_invalid(obj)

    def test_d73_pathway_version_and_per_pathway_coverage_required(self):
        obj = copy.deepcopy(self.records[1])
        p = obj["Results"]["prerequisites"]
        entry = {"pathway_id": "P-DIRECT", "definition_version": "v1",
                 "coverage": "complete"}
        p["pathways"] = [entry]
        self.assert_valid(obj)
        for field in ["pathway_id", "definition_version", "coverage"]:
            with self.subTest(missing=field):
                case = copy.deepcopy(obj)
                case["Results"]["prerequisites"]["pathways"][0].pop(field)
                self.assert_invalid(case)

    def test_d73_pathway_bad_types_and_coverage_rejected(self):
        bads = [None, 5, "P-DIRECT", {}, [],
                {"pathway_id": "", "definition_version": "v1", "coverage": "complete"},
                {"pathway_id": "P", "definition_version": "", "coverage": "complete"},
                {"pathway_id": "P", "definition_version": None, "coverage": "complete"},
                {"pathway_id": "P", "definition_version": "v1", "coverage": "unknown"},
                {"pathway_id": "P", "definition_version": "v1", "coverage": None}]
        for bad in bads:
            with self.subTest(entry=bad):
                obj = copy.deepcopy(self.records[1])
                obj["Results"]["prerequisites"]["pathways"] = [bad]
                self.assert_invalid(obj)

    def test_d73_two_coverage_levels_remain_independent(self):
        for inventory_coverage in ["complete", "incomplete", "indeterminate"]:
            for pathway_coverage in ["complete", "incomplete", "indeterminate"]:
                with self.subTest(inventory=inventory_coverage, pathway=pathway_coverage):
                    obj = copy.deepcopy(self.records[1])
                    p = obj["Results"]["prerequisites"]
                    p["inventory_coverage"] = inventory_coverage
                    p["pathways"] = [{
                        "pathway_id": "P-DIRECT",
                        "definition_version": "v1",
                        "coverage": pathway_coverage
                    }]
                    self.assert_valid(obj)  # completeness claim still needs semantic justification

    def test_d73_inventory_coverage_required_exact_enum(self):
        for bad in [None, "", "exhaustive", "not_searched", False, 4, []]:
            with self.subTest(value=bad):
                obj = copy.deepcopy(self.records[1])
                obj["Results"]["prerequisites"]["inventory_coverage"] = bad
                self.assert_invalid(obj)

    def test_d73_scope_and_justification_required_nonempty(self):
        for key in ["scope", "justification"]:
            for bad in [None, "", False, 3, [], {}]:
                with self.subTest(key=key, value=bad):
                    obj = copy.deepcopy(self.records[1])
                    obj["Results"]["prerequisites"][key] = bad
                    self.assert_invalid(obj)

    def test_d73_inventory_evidence_optional_reference_array(self):
        obj = copy.deepcopy(self.records[1])
        p = obj["Results"]["prerequisites"]
        p.pop("evidence", None)
        self.assert_valid(obj)
        p["evidence"] = []
        self.assert_valid(obj)
        p["evidence"] = ["EV-PRECONDITION-001"]
        self.assert_valid(obj)
        for bad in [None, "EV-1", [""], [None], [True], {}, 3]:
            with self.subTest(value=bad):
                p["evidence"] = bad
                self.assert_invalid(obj)

    def test_d73_uncertainty_optional_object(self):
        obj = copy.deepcopy(self.records[1])
        p = obj["Results"]["prerequisites"]
        p.pop("uncertainty", None)
        self.assert_valid(obj)
        p["uncertainty"] = {}
        self.assert_valid(obj)
        p["uncertainty"] = {"description": "Unexamined alternatives remain possible."}
        self.assert_valid(obj)
        for bad in [None, "", 3, [], False]:
            with self.subTest(value=bad):
                p["uncertainty"] = bad
                self.assert_invalid(obj)

    def test_d73_extra_metadata_open_and_no_logical_tree_imposed(self):
        obj = copy.deepcopy(self.records[1])
        p = obj["Results"]["prerequisites"]
        p["pathways"].append({
            "pathway_id": "P-DIRECT", "definition_version": "v1",
            "coverage": "incomplete", "unapproved_metadata": {"test": True}
        })
        p["unapproved_inventory_metadata"] = {"conjunction_not_assumed": True}
        self.assert_valid(obj)  # D-42 recursive expression serialization still OPEN

    def test_d73_analytical_link_validation_remains_separate(self):
        obj = copy.deepcopy(self.records[1])
        obj["Results"]["prerequisites"]["needs"][0]["evaluation_id"] = "PE-NOT-DECLARED"
        self.assert_valid(obj)  # JSON Schema validates only the reference shape
        fixture = copy.deepcopy(self.fixture)
        fixture["evaluations"][1] = obj
        with self.assertRaises(ValueError):
            validate_fixture(fixture)  # D-53/D-54 independent analytical resolution

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
