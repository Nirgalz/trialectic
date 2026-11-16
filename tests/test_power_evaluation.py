"""Synthetic cross-Focus PowerEvaluation consistency checks (D-35, D-49, D-51–D-63).

These are *provisional serialization checks*, not a final JSON Schema, a causal
simulation, a scientifically verified method, or an implementation of Power.
The expected results live in a separate JSON fixture. The checks enforce the
validated six-field and Focus-specific structure and exercise negative cases.
"""
from __future__ import annotations

import copy
import json
import pathlib
import unittest

FIXTURE = pathlib.Path(__file__).parent / "cases" / "power_evaluation.json"
SIX_FIELDS = {"ID", "Subject", "Focus", "Context", "Dependencies", "Results"}
RESULT_SECTIONS = {
    "NEED": {"effective_satisfaction", "temporal_compliance", "candidate_cans"},
    "CAN": {"actualizability", "prerequisites", "potential_contributions"},
    "Scenario": {"actualization_assessments", "scenario_assessment", "effects", "comparisons"},
}
ACTUALIZABILITY = {
    "actualizable", "partially_actualizable", "not_actualizable", "indeterminate"
}
NEED_STATES = {"satisfied", "unsatisfied", "indeterminate"}
COVERAGE = {"complete", "incomplete", "indeterminate"}


def load_fixture():
    return json.loads(FIXTURE.read_text(encoding="utf-8"))


def validate_fixture(f):
    """Minimal *test-only* structural/integrity adapter.

    Does not implement uncertain semantic equivalences, partial-reuse rules,
    scenario execution, or a final normative nested schema.
    """
    if f["schema"] != "power-evaluation-fixtures-v0-provisional":
        raise ValueError("Wrong provisional fixture schema")
    objects, scenarios, evaluations = f["objects"], f["scenarios"], f["evaluations"]
    ids = [e.get("ID") for e in evaluations]
    if len(ids) != len(set(ids)) or not all(isinstance(i, str) and i for i in ids):
        raise ValueError("Evaluation IDs must be nonempty and unique")
    by_id = {e["ID"]: e for e in evaluations}
    actual_revisions = {}

    for e in evaluations:
        if set(e) != SIX_FIELDS:
            raise ValueError("PowerEvaluation has invalid six-field top level")
        sid = e["Subject"]["object_id"]
        focus, ctx = e["Focus"], e["Context"]
        kind = focus["type"]
        if kind not in RESULT_SECTIONS:
            raise ValueError("Unknown Focus type")
        if sid not in objects:
            raise ValueError("Unknown Subject Object")
        scenario_id = ctx.get("scenario_id")
        if scenario_id not in scenarios:
            raise ValueError("Unknown Scenario context")
        if scenarios[scenario_id]["subject"] != sid:
            raise ValueError("Subject does not match Scenario subject")
        pinned = ctx["definition_versions"]
        if not pinned or sid not in pinned:
            raise ValueError("Missing Subject Definition pin")
        if any(key not in objects or objects[key]["version"] != version
               for key, version in pinned.items()):
            raise ValueError("Missing or mismatched Object Definition version")

        if kind == "Scenario":
            if focus["scenario_id"] != scenario_id:
                raise ValueError("Scenario Focus must match Context")
        else:
            fid = focus["object_id"]
            if fid not in objects or objects[fid]["type"] != kind:
                raise ValueError("Focus must identify an Object of the requested kind")
            if fid not in pinned:
                raise ValueError("Focus Definition version must be pinned")
            owner_list = "NEEDs" if kind == "NEED" else "CANs"
            if fid not in objects[sid][owner_list]:
                raise ValueError("Focus Object must be attributed to the Subject in the fixture")

        if set(e["Results"]) != RESULT_SECTIONS[kind]:
            raise ValueError("Wrong Focus-specific Results section names")

        d_ids = [item["evaluation_id"] for item in e["Dependencies"]]
        if len(d_ids) != len(set(d_ids)):
            raise ValueError("Duplicate analytical dependency")
        for dep in d_ids:
            if dep not in by_id:
                raise ValueError("Dangling analytical evaluation reference")
            if by_id[dep]["Context"]["scenario_id"] != scenario_id:
                # Deliberately fail closed: cross-Scenario compatibility is not
                # demonstrated anywhere in these synthetic fixtures (D-54).
                raise ValueError("Cross-Scenario evaluation reuse is not justified")

        provenance = ctx.get("provenance", {})
        if not isinstance(provenance, dict):
            raise ValueError("Provenance must be an object")
        previous = provenance.get("revises")
        if previous is not None:
            if previous not in by_id or previous == e["ID"]:
                raise ValueError("Invalid revision reference")
            old = by_id[previous]
            if old["Focus"] != focus or old["Subject"] != e["Subject"]:
                raise ValueError("Revision must refer to same Subject and Focus in fixture")
            if old["Context"]["scenario_id"] != scenario_id:
                raise ValueError("Cross-Scenario evaluation is not automatically a revision")
            if old["Results"] == e["Results"]:
                raise ValueError("Fixture revision must change result, reasoning or uncertainty")
            actual_revisions[e["ID"]] = previous

        if kind == "NEED":
            result = e["Results"]
            if result["effective_satisfaction"]["status"] not in NEED_STATES:
                raise ValueError("Invalid effective NEED satisfaction status")
            if result["temporal_compliance"]["status"] not in NEED_STATES:
                raise ValueError("Invalid temporal compliance status")
            if result["candidate_cans"]["coverage"] not in COVERAGE:
                raise ValueError("Invalid CAN candidate inventory coverage")
            if not isinstance(result["candidate_cans"]["identified"], list):
                raise ValueError("Candidate CAN inventory should be a list")
            for candidate in result["candidate_cans"]["identified"]:
                oid = candidate["object_id"]
                if oid not in objects or objects[oid]["type"] != "CAN":
                    raise ValueError("Candidate CAN link must point to a CAN Object")

        elif kind == "CAN":
            result = e["Results"]
            ability = result["actualizability"]
            if ability["status"] not in ACTUALIZABILITY:
                raise ValueError("Invalid CAN actualizability")
            if (not isinstance(ability.get("justification"), str) or
                    not ability["justification"]):
                raise ValueError("CAN actualizability requires a justification (D-72)")
            if "uncertainty" in ability and not isinstance(ability["uncertainty"], dict):
                raise ValueError("CAN uncertainty must be an object (D-72)")
            if "evidence" in ability:
                evidence = ability["evidence"]
                if (not isinstance(evidence, list) or
                        any(not isinstance(ref, str) or not ref for ref in evidence)):
                    raise ValueError("CAN actualizability evidence references invalid (D-72)")
            if "degree" in ability:
                degree = ability["degree"]
                if (not isinstance(degree, dict) or
                    not isinstance(degree.get("value"), (float, int)) or
                    isinstance(degree.get("value"), bool) or
                    not isinstance(degree.get("measure"), str) or
                    not degree["measure"] or
                    not isinstance(degree.get("basis"), str) or
                    not degree["basis"]):
                    raise ValueError("D-72 degree requires value, measure and basis")
                # A bounded distance_ratio is a hypothesis for this fixture's
                # *particular measurement*, NOT a universal D-72 degree scale.
                if degree["measure"] == "distance_ratio" and not 0 <= degree["value"] <= 1:
                    raise ValueError("Fixture distance_ratio must be within 0 and 1")
            pre = result["prerequisites"]
            if pre["inventory_coverage"] not in COVERAGE:
                raise ValueError("Prerequisite pathway inventory coverage invalid")
            # D-73: Object references and analytical evaluation dependencies
            # remain different relationship types (D-53/D-54).
            for collection, expected_kind in (("needs", "NEED"), ("cans", "CAN")):
                for item in pre[collection]:
                    oid = item["object_id"]
                    if oid not in objects or objects[oid]["type"] != expected_kind:
                        raise ValueError("Prerequisite must reference the correct Object type")
                    if "evaluation_id" in item:
                        depid = item["evaluation_id"]
                        if depid not in d_ids or depid not in by_id:
                            raise ValueError("Referenced prerequisite evaluation must be an analytical Dependency")
                        focus = by_id[depid]["Focus"]
                        if focus["type"] != expected_kind or focus.get("object_id") != oid:
                            raise ValueError("Prerequisite evaluation must match Object and Focus")
            for item in pre["conditions"]:
                if "status" in item and item["status"] not in NEED_STATES:
                    raise ValueError("Invalid contextual Condition status")
            # The fixture has no registered versioned pathway Definitions;
            # relation ownership, pathway resolution, logical composition and
            # completeness justification are not proved by this adapter.
            contributions = result["potential_contributions"]
            if contributions["search_status"] not in {"searched", "not_searched"}:
                raise ValueError("Invalid D-74 candidate NEED search state")
            if contributions["coverage"] not in COVERAGE:
                raise ValueError("Invalid D-74 candidate NEED inventory coverage")
            if (contributions["search_status"] == "not_searched" and
                    contributions["coverage"] == "complete"):
                raise ValueError("Unsearched inventory cannot be complete")
            if not isinstance(contributions["scope"], str) or not contributions["scope"]:
                raise ValueError("Candidate NEED inventory must state a scope")
            if (not isinstance(contributions["justification"], str) or
                    not contributions["justification"]):
                raise ValueError("Candidate NEED inventory must explain findings")
            for candidate in contributions["needs"]:
                oid = candidate["object_id"]
                if oid not in objects or objects[oid]["type"] != "NEED":
                    raise ValueError("Potential contribution MUST reference a NEED Object")
                if candidate.get("relationship") != "candidate":
                    raise ValueError("Do not promote hypothetical CAN/NEED match to proof")
                if (not isinstance(candidate.get("justification"), str) or
                        not candidate["justification"]):
                    raise ValueError("Candidate NEED correspondence requires a justification")

        else:  # Scenario
            result = e["Results"]
            if not isinstance(result["actualization_assessments"], list):
                raise ValueError("Scenario actualization assessments must be a list")
            for item in result["actualization_assessments"]:
                depid = item["evaluation_id"]
                if depid not in d_ids:
                    raise ValueError("Scenario actualization needs declared analytical dependency")
                target = by_id[depid]["Focus"]
                if target["type"] != "CAN" or target["object_id"] != item["can_id"]:
                    raise ValueError("Scenario assessment points to wrong CAN Focus")
            for effect in result["effects"]:
                if effect["target_object_id"] not in objects:
                    raise ValueError("Unknown affected Object")
                if effect["epistemic_status"] not in {"anticipated", "observed", "causally_attributed"}:
                    raise ValueError("Effect status must not conflate prediction and observation")
                if effect["valence"] not in {"favorable", "unfavorable", "mixed", "indeterminate"}:
                    raise ValueError("Undeclared effect valence")
            if not isinstance(result["comparisons"], list):
                raise ValueError("Scenario comparisons must be a list")

    if actual_revisions != f["expected_revisions"]:
        raise ValueError("Revision lineage missing, misdirected or unanticipated")
    return by_id


def find_cycles(graph):
    """Detect cycles only. Classification/causal feasibility remains OPEN."""
    visiting, visited, detected = set(), set(), set()

    def visit(node):
        if node in visiting:
            detected.add(node)
            return
        if node in visited:
            return
        visiting.add(node)
        for dep in graph.get(node, ()):
            visit(dep)
        visiting.remove(node)
        visited.add(node)

    for node in graph:
        visit(node)
    return detected


class CrossFocusPowerEvaluationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.fixture = load_fixture()
        cls.by_id = validate_fixture(cls.fixture)

    def test_complete_positive_fixture(self):
        self.assertEqual(len(self.by_id), 7)
        self.assertEqual(set(self.by_id["PE-SCENARIO-001"]), SIX_FIELDS)
        self.assertTrue({"D-57", "D-61", "D-62", "D-63", "D-64"} <= set(self.fixture["decisions"]))

    def test_fixture_decisions_reference_existing_journal_entries(self):
        import re
        decisions_text = (FIXTURE.parents[2] / "DECISIONS.md").read_text(encoding="utf-8")
        documented = set(re.findall(r"^## (D-\d+) ·", decisions_text, re.M))
        self.assertTrue(set(self.fixture["decisions"]) <= documented)

    def test_linked_need_can_scenario_graph(self):
        self.assertEqual(self.by_id["PE-NEED-001"]["Focus"]["type"], "NEED")
        self.assertEqual(self.by_id["PE-CAN-001"]["Focus"]["type"], "CAN")
        self.assertEqual(self.by_id["PE-SCENARIO-001"]["Focus"]["type"], "Scenario")
        self.assertEqual(self.by_id["PE-CAN-001"]["Dependencies"][0]["evaluation_id"],
                         "PE-NEED-001")
        self.assertEqual({d["evaluation_id"] for d in
                          self.by_id["PE-SCENARIO-001"]["Dependencies"]},
                         {"PE-NEED-001", "PE-CAN-001"})

    def test_need_effective_satisfaction_independent_of_temporal_compliance(self):
        e = self.by_id["PE-NEED-EXCEPTION"]
        self.assertEqual(e["Results"]["effective_satisfaction"]["status"], "unsatisfied")
        self.assertEqual(e["Results"]["temporal_compliance"]["status"], "satisfied")
        self.assertEqual(e["Results"]["temporal_compliance"]["applied_exceptions"], ["EX-001"])

    def test_partial_actualizability_and_non_exhaustive_cans(self):
        can = self.by_id["PE-CAN-001"]["Results"]
        self.assertEqual(can["actualizability"]["status"], "partially_actualizable")
        self.assertEqual(can["actualizability"]["degree"]["value"], .1)
        degree = can["actualizability"]["degree"]
        self.assertAlmostEqual(degree["estimated_distance_km"] /
                               degree["target_distance_km"], degree["value"])

        self.assertNotIn("degree", self.by_id["PE-NEED-001"]["Results"]["effective_satisfaction"])
        self.assertEqual(self.by_id["PE-NEED-001"]["Results"]["candidate_cans"]["identified"], [])
        self.assertEqual(self.by_id["PE-NEED-001"]["Results"]["candidate_cans"]["coverage"],
                         "incomplete")
        self.assertEqual(can["potential_contributions"]["needs"][0]["relationship"], "candidate")

    def test_revision_retains_original_and_references_it(self):
        old, new = self.by_id["PE-CAN-001"], self.by_id["PE-CAN-002"]
        self.assertEqual(new["Context"]["provenance"]["revises"], old["ID"])
        self.assertEqual(new["Results"]["actualizability"]["status"],
                         old["Results"]["actualizability"]["status"])
        self.assertEqual(new["Results"]["actualizability"]["degree"],
                         old["Results"]["actualizability"]["degree"])
        self.assertNotEqual(new["Results"]["actualizability"]["uncertainty"],
                            old["Results"]["actualizability"]["uncertainty"])
        self.assertEqual({d["evaluation_id"] for d in new["Dependencies"]},
                         {d["evaluation_id"] for d in old["Dependencies"]})
        self.assertNotIn("revises", old["Context"]["provenance"])

    def test_revised_dependency_requires_new_scenario_assessment(self):
        old, new = self.by_id["PE-SCENARIO-001"], self.by_id["PE-SCENARIO-002"]
        self.assertEqual(new["Context"]["provenance"]["revises"], old["ID"])
        self.assertEqual(new["Results"]["scenario_assessment"]["feasibility"]["status"],
                         old["Results"]["scenario_assessment"]["feasibility"]["status"])
        self.assertIn("PE-CAN-002", [d["evaluation_id"] for d in new["Dependencies"]])
        self.assertIn("PE-CAN-001", [d["evaluation_id"] for d in old["Dependencies"]])
        self.assertNotIn("PE-CAN-002", [d["evaluation_id"] for d in old["Dependencies"]])

    def test_independent_scenario_does_not_auto_revise(self):
        self.assertIn("PE-CAN-003", self.fixture["expected_scenario_independence"])
        independent = self.by_id["PE-CAN-003"]
        self.assertEqual(independent["Context"]["scenario_id"], "S-WITH-RECHARGE")
        self.assertEqual(independent["Results"]["actualizability"]["status"], "indeterminate")
        self.assertNotIn("revises", independent["Context"]["provenance"])

    def test_scenario_effect_is_hypothesized_not_actualized(self):
        scenario = self.by_id["PE-SCENARIO-001"]
        self.assertEqual(scenario["Results"]["effects"][0]["epistemic_status"], "anticipated")
        self.assertNotIn("event_id", scenario["Results"]["effects"][0])
        self.assertEqual(scenario["Results"]["comparisons"], [])

    def test_cycle_detection_does_not_infer_impossibility(self):
        acyclic = {row["ID"]: [d["evaluation_id"] for d in row["Dependencies"]]
                   for row in self.fixture["evaluations"]}
        self.assertFalse(find_cycles(acyclic))
        hypothetical_cycle = {"PE-A": ["PE-B"], "PE-B": ["PE-A"]}
        self.assertTrue(find_cycles(hypothetical_cycle))
        # No actionability or CAN status is assigned by the detector.
        self.assertFalse(any("not_actualizable" in str(k) for k in find_cycles(hypothetical_cycle)))

    def assert_invalid(self, change):
        data = copy.deepcopy(self.fixture)
        change(data)
        with self.assertRaises(ValueError):
            validate_fixture(data)

    def test_duplicate_evaluation_id_rejected(self):
        self.assert_invalid(lambda f: f["evaluations"][1].update(ID="PE-NEED-001"))

    def test_missing_dependency_reference_rejected(self):
        self.assert_invalid(lambda f: f["evaluations"][1]["Dependencies"][0].update(
            evaluation_id="PE-DOES-NOT-EXIST"))

    def test_wrong_focus_object_rejected(self):
        self.assert_invalid(lambda f: f["evaluations"][1]["Focus"].update(
            object_id="O-NEED-ENERGY"))

    def test_unpinned_version_rejected(self):
        self.assert_invalid(lambda f: f["evaluations"][1]["Context"]["definition_versions"].update(
            {"O-CAN-TRAVEL": "v999"}))

    def test_cross_scenario_reuse_without_compatibility_proof_rejected(self):
        self.assert_invalid(lambda f: f["evaluations"][5]["Dependencies"].append(
            {"evaluation_id": "PE-CAN-001"}))

    def test_revision_of_missing_evaluation_rejected(self):
        self.assert_invalid(lambda f: f["evaluations"][3]["Context"]["provenance"].update(
            revises="PE-NONE"))

    def test_missing_revision_link_rejected(self):
        self.assert_invalid(lambda f: f["evaluations"][3]["Context"]["provenance"].clear())

    def test_incorrect_results_type_rejected(self):
        self.assert_invalid(lambda f: f["evaluations"][1]["Results"].pop("prerequisites"))

    def test_invalid_distance_ratio_rejected_under_fixture_measure_only(self):
        # The declared synthetic ratio is bounded, not all possible degrees.
        self.assert_invalid(lambda f: f["evaluations"][1]["Results"]["actualizability"][
            "degree"].update(value=1.2))

    def test_d72_non_ratio_measure_is_not_universally_bounded(self):
        data = copy.deepcopy(self.fixture)
        data["evaluations"][5]["Results"]["actualizability"]["degree"] = {
            "value": 1250,
            "measure": "hypothetical_distance_m",
            "basis": "Model-only travel distance, without an established sufficiency threshold"
        }
        validate_fixture(data)

    def test_d72_basis_required_and_uncertainty_object(self):
        self.assert_invalid(lambda f: f["evaluations"][1]["Results"]["actualizability"][
            "degree"].pop("basis"))
        self.assert_invalid(lambda f: f["evaluations"][1][
            "Results"]["actualizability"].update(uncertainty="not-an-object"))

    def test_d73_prerequisites_inventory_distinct_from_pathway_coverage(self):
        pre = self.by_id["PE-CAN-001"]["Results"]["prerequisites"]
        self.assertEqual(pre["inventory_coverage"], "incomplete")
        self.assertEqual(pre["pathways"], [])
        self.assertIn("owner_relation_id", pre["conditions"][0])
        self.assertNotIn("coverage", pre)
        # This non-exhaustive inventory cannot establish that the CAN is impossible.

    def test_d73_analytical_reference_must_be_a_declared_dependency(self):
        def change(data):
            pre = data["evaluations"][1]["Results"]["prerequisites"]
            pre["needs"][0]["evaluation_id"] = "PE-NEED-EXCEPTION"
        self.assert_invalid(change)

    def test_d73_mistyped_can_prerequisite_rejected(self):
        self.assert_invalid(lambda data: data["evaluations"][1]["Results"][
            "prerequisites"]["cans"].append({"object_id": "O-NEED-ENERGY"}))

    def test_d74_candidate_need_inventory_remains_a_scoped_hypothesis(self):
        potential = self.by_id["PE-CAN-001"]["Results"]["potential_contributions"]
        self.assertEqual(potential["search_status"], "searched")
        self.assertEqual(potential["coverage"], "incomplete")
        self.assertEqual(potential["needs"][0]["relationship"], "candidate")
        self.assertTrue(potential["needs"][0]["justification"])

    def test_d74_wrong_candidate_promotion_rejected(self):
        self.assert_invalid(lambda data: data["evaluations"][1]["Results"][
            "potential_contributions"]["needs"][0].update(
                relationship="causally_established"))

    def test_d74_unsearched_inventory_cannot_claim_complete_coverage(self):
        self.assert_invalid(lambda data: data["evaluations"][1]["Results"][
            "potential_contributions"].update(
                search_status="not_searched", coverage="complete"))

    def test_actualizability_unknown_not_equivalent_to_negative(self):
        r = self.by_id["PE-CAN-003"]["Results"]["actualizability"]
        self.assertEqual(r["status"], "indeterminate")
        self.assertNotIn("degree", r)


if __name__ == "__main__":
    unittest.main()
