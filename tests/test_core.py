"""Automatic regression checks anchored to independently recorded fixture outcomes.

These checks cover only narrow consequences of approved decisions, NOT the entire
Method, an external source audit, a real causal simulation or a live LLM.
"""

import itertools
import json
import pathlib
import unittest

from reference_model import (
    Definition, DependencyAnalysisNeeded, InvalidDefinition, Scenario,
    can_assessment, declared_origin_groups, expression, group, inventory,
    pathway, relation_qualifications, temporal_need,
)

CASES = pathlib.Path(__file__).parent / "cases" / "core.json"
KEY = ("O1", "available")


def run_case(case):
    """Test adapter; expected results are read only by the caller, not this code."""
    x, op = case["input"], case["operation"]
    if op == "can":
        return can_assessment(x["action_conditions"], x["pathway_completeness"])
    if op == "relation":
        return relation_qualifications(x["explicit"])
    if op == "group":
        return group(x["op"], x["members"])
    if op == "inventory":
        return inventory(x["pathways"], x["completeness"])
    if op == "fork":
        defs = {x["object_id"]: Definition(x["object_id"], x["version"])}
        parent = Scenario(x["parent"], defs, {(x["object_id"], "ready"): x["initial"]})
        child = parent.fork(x["child"])
        child.actualize("EV-1", {(x["object_id"], "ready"): x["child_new"]})
        return {
            "parent_state": parent.physical[(x["object_id"], "ready")],
            "child_state": child.physical[(x["object_id"], "ready")],
            "parent_version": parent.definitions[x["object_id"]].version,
            "child_version": child.definitions[x["object_id"]].version,
            "parent_events": parent.events,
            "child_events": child.events,
        }
    if op == "reevaluation":
        defs = {x["object_id"]: Definition(x["object_id"], x["version"])}
        key = (x["object_id"], "ready")
        scenario = Scenario("S0", defs, {key: x["initial"]})
        before = scenario.observed_condition(key)
        scenario.actualize("EV-2", {key: x["new_state"]})
        return {"before": before, "after": scenario.observed_condition(key),
                "events": scenario.events,
                "definition_version": scenario.definitions[x["object_id"]].version}
    if op == "temporal":
        return temporal_need(x["observations"])
    if op == "evidence_conflict":
        key = (x["object_id"], x["property"])
        scenario = Scenario("S0", {x["object_id"]: Definition(x["object_id"], x["version"])},
                            {key: x["physical"]})
        scenario.dispute_evidence(key)
        return {"physical": scenario.physical[key],
                "epistemic_condition": scenario.observed_condition(key),
                "events": scenario.events}
    if op == "local_suspension":
        object_id = x["object_id"]
        contested = (object_id, x["contested_property"])
        independent = (object_id, x["independent_property"])
        scenario = Scenario("S0", {object_id: Definition(object_id, x["version"])},
                            {contested: True, independent: False})
        scenario.dispute_evidence(contested)
        blocked = scenario.actualize("EV-dependent", {contested: False}, depends_on=[contested])
        applied = scenario.actualize("EV-independent", {independent: True}, depends_on=[independent])
        return {"dependent_event": blocked, "independent_event": applied,
                "physical_available": scenario.physical[contested],
                "physical_lamp_on": scenario.physical[independent],
                "events": scenario.events}
    if op == "claim":
        scenario = Scenario("S0", {}, {})
        entry = scenario.register_assessment(x["claim_id"], x["model_status"], x["empirical_status"],
                                             [r["id"] for r in x["reports"]])
        return {"model_status": entry.model_status, "empirical_status": entry.empirical_status,
                "declared_origin_count": len(declared_origin_groups(x["reports"])),
                "events": scenario.events}
    raise AssertionError(f"Case operation not implemented: {op}")


class GoldenCases(unittest.TestCase):
    def test_approved_cases(self):
        data = json.loads(CASES.read_text(encoding="utf-8"))
        self.assertEqual(data["schema"], "trialectic-regression-fixtures-v0-experimental")
        ids = [c["id"] for c in data["cases"]]
        self.assertEqual(ids, [f"MT-{i:02d}" for i in range(1, 11)])
        for case in data["cases"]:
            with self.subTest(id=case["id"], decisions=case["decisions"]):
                self.assertTrue(case["decisions"])
                self.assertTrue(all(s.startswith("D-") for s in case["decisions"]))
                self.assertEqual(run_case(case), case["expected"])


class LogicalUnitTests(unittest.TestCase):
    def test_independent_truth_tables(self):
        # Literal oracles, not values produced by the reference_model module.
        options = ("satisfied", "unsatisfied", "indeterminate")
        expected_all = (
            ("satisfied", "unsatisfied", "indeterminate"),
            ("unsatisfied", "unsatisfied", "unsatisfied"),
            ("indeterminate", "unsatisfied", "indeterminate"),
        )
        expected_any = (
            ("satisfied", "satisfied", "satisfied"),
            ("satisfied", "unsatisfied", "indeterminate"),
            ("satisfied", "indeterminate", "indeterminate"),
        )
        for i, a in enumerate(options):
            for j, b in enumerate(options):
                with self.subTest(a=a, b=b):
                    self.assertEqual(group("all", [a, b]), expected_all[i][j])
                    self.assertEqual(group("any", [a, b]), expected_any[i][j])

    def test_order_invariance_for_all_four_conditions(self):
        options = ("satisfied", "unsatisfied", "indeterminate")
        for values in itertools.product(options, repeat=4):
            for operator in ("all", "any"):
                baseline = group(operator, list(values))
                for permutation in set(itertools.permutations(values)):
                    self.assertEqual(group(operator, list(permutation)), baseline)

    def test_invalid_empty_or_unrecognized_expression(self):
        for operator in ("all", "any"):
            with self.subTest(operator=operator):
                with self.assertRaises(InvalidDefinition):
                    group(operator, [])
                with self.assertRaises(InvalidDefinition):
                    expression({"op": operator, "items": []})
        with self.assertRaises(InvalidDefinition):
            group("xor", ["satisfied"])
        with self.assertRaises(InvalidDefinition):
            group("any", ["true"])

    def test_versioned_reference_does_not_resolve_by_name(self):
        reg = {("P", "v1"): {"state": "satisfied"},
               ("P", "v2"): {"state": "unsatisfied"}}
        self.assertEqual(expression({"ref": {"id": "P", "version": "v1"}}, reg), "satisfied")
        self.assertEqual(expression({"ref": {"id": "P", "version": "v2"}}, reg), "unsatisfied")
        with self.assertRaises(InvalidDefinition):
            expression({"ref": {"id": "P"}}, reg)
        with self.assertRaises(InvalidDefinition):
            expression({"ref": {"id": "P", "version": "v3"}}, reg)

    def test_cycle_is_detected_not_assumed_impossible(self):
        reg = {("P", "v1"): {"ref": {"id": "Q", "version": "v1"}},
               ("Q", "v1"): {"ref": {"id": "P", "version": "v1"}}}
        with self.assertRaises(DependencyAnalysisNeeded):
            expression({"ref": {"id": "P", "version": "v1"}}, reg)

    def test_missing_conditions_are_not_invented(self):
        self.assertEqual(pathway(["satisfied"], "incomplete"), "indeterminate")
        self.assertEqual(pathway(["unsatisfied"], "incomplete"), "unsatisfied")
        self.assertEqual(inventory([], "complete"), "indeterminate")
        self.assertEqual(inventory(["unsatisfied"], "incomplete"), "indeterminate")
        self.assertEqual(inventory(["unsatisfied"], "complete"), "unsatisfied")
        self.assertEqual(inventory(["satisfied", "indeterminate"], "incomplete"), "satisfied")


class ScenarioAndEvidenceTests(unittest.TestCase):
    def setUp(self):
        self.definition = Definition("O1", "v1")
        self.original = Scenario("S0", {"O1": self.definition}, {KEY: True, ("O1", "lamp"): False})

    def test_evidence_change_does_not_trigger_actualization(self):
        before = self.original.physical.copy()
        self.original.dispute_evidence(KEY)
        a = self.original.register_assessment("C1", "established_in_model", "indeterminate", ("EV-1",))
        self.assertEqual(self.original.physical, before)
        self.assertEqual(self.original.events, [])
        self.assertEqual(self.original.observed_condition(KEY), "indeterminate")
        self.assertEqual(a.model_status, "established_in_model")
        self.assertEqual(a.empirical_status, "indeterminate")
        self.assertIs(self.original.definitions["O1"], self.definition)

    def test_fork_changes_only_child_and_not_definitions(self):
        child = self.original.fork("S1")
        self.assertEqual(child.actualize("EV-1", {("O1", "lamp"): True}), "applied")
        self.assertFalse(self.original.physical[("O1", "lamp")])
        self.assertTrue(child.physical[("O1", "lamp")])
        self.assertEqual(self.original.events, [])
        self.assertEqual(child.events, ["EV-1"])
        self.assertEqual(child.definitions["O1"].version, "v1")

    def test_unknown_dependency_suspends_only_its_dependent_event(self):
        self.original.dispute_evidence(KEY)
        self.assertEqual(self.original.actualize("blocked", {KEY: False}, depends_on=(KEY,)), "suspended")
        self.assertEqual(self.original.actualize("free", {("O1", "lamp"): True}), "applied")
        self.assertEqual(self.original.events, ["free"])
        self.assertTrue(self.original.physical[KEY])
        self.assertTrue(self.original.physical[("O1", "lamp")])

    def test_historical_assessment_snapshots(self):
        first = self.original.register_assessment("C1", "not_derived", "indeterminate", ("S1",))
        second = self.original.register_assessment("C1", "established_in_model", "indeterminate", ("S1", "S2"))
        self.assertNotEqual(first.model_status, second.model_status)
        self.assertEqual(first.evidence_ids, ("S1",))
        self.assertEqual(self.original.assessments[0], first)
        self.assertEqual(self.original.events, [])

    def test_temporal_samples_do_not_establish_continuous_satisfaction(self):
        events = [(0, "satisfied"), (10, "satisfied")]
        self.assertEqual(temporal_need(events)["temporal_compliance"], "indeterminate")
        self.assertEqual(temporal_need(events, continuous_coverage=True)["temporal_compliance"], "satisfied")
        events.insert(1, (5, "unsatisfied"))
        self.assertEqual(temporal_need(events)["effective_at_end"], "satisfied")
        self.assertEqual(temporal_need(events)["temporal_compliance"], "unsatisfied")

    def test_duplicate_documentary_reports_are_one_declared_root(self):
        reports = [{"id": "A", "root": "D1"}, {"id": "B", "root": "D1"},
                   {"id": "C", "root": "D2"}]
        self.assertEqual(len(declared_origin_groups(reports)), 2)
        self.assertEqual(declared_origin_groups(list(reversed(reports))),
                         declared_origin_groups(reports))
        # This does not prove that D1 and D2 are empirically independent.


if __name__ == "__main__":
    unittest.main()
