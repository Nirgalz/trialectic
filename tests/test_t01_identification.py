"""T-01 discriminating corpus v1: synthetic oracles and normative-v2 structure.

These are explicitly scoped, hand-authored expected conclusions, not scientific
verification, independent analyst replication or a complete semantic engine.
"""
import copy
import json
import unittest
from pathlib import Path

from tools.validate_analysis import validator

ROOT = Path(__file__).resolve().parents[1]
CORPUS_PATH = ROOT / "tests/cases/t01-identification-v1.json"
SEED_PATH = ROOT / "tests/cases/analysis_without_scenario.json"
LETTERS = set("ABCDEFGHIJKLM")


def load_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def discriminate(facts):
    """Small rule-driven regression oracle for specifically stipulated cases.

    This does NOT discover NEEDs/CANs from the world, assess causal evidence,
    establish the scope of an inventory, or infer Power.
    """
    rule = facts["rule"]
    if rule == "necessity":
        if facts["mode"] == "conceptual":
            if facts["identity_essential"] is True:
                return "necessary_in_definition"
            if facts["identity_essential"] is False:
                return "not_necessary"
            return "indeterminate"
        if facts["mode"] == "functional":
            if facts["alternative"] is True:
                return "not_necessary"
            if facts["alternative"] is False and facts["coverage"] == "complete":
                return "necessary_in_scope"
            return "indeterminate"
        raise ValueError("Unrecognized necessity mode")
    if rule == "goal":
        return "goal_unjustified" if facts["goal_relevance"] == "unjustified" else "goal_justified_in_scope"
    if rule == "threshold":
        return "indeterminate" if not facts["threshold_justified"] else "threshold_justified_in_model"
    if rule == "aggregation":
        required = facts["essential"]
        # Deliberately ignore weighted_degree for necessary conditions (T-01-M).
        if "unsatisfied" in required:
            return "unsatisfied"
        if "indeterminate" in required:
            return "indeterminate"
        return "satisfied_in_model"
    if rule == "scope":
        return "scope_inadequate" if facts["materially_omitted"] else "scoped_coverage_only"
    if rule == "ownership":
        return "distinct_ownership" if facts["need_owner"] != facts["dependent_subject"] else "same_owner"
    if rule == "can":
        if facts["prior_constitutive_change"]:
            return "not_yet_attributable"
        if facts["basis"] != "established":
            return "indeterminate"
        if facts["action_conditions"] == "satisfied":
            return "attributable_actionable_in_role"
        if facts["action_conditions"] == "unsatisfied":
            return "attributable_not_actionable"
        return "attributable_actionability_indeterminate"
    if rule == "collective":
        if facts["coordination"] == "established" and facts["joint_foundation"] == "established":
            return "collective_can_attributable"
        return "indeterminate"
    if rule == "relation":
        if facts["adverse"]:
            return "adverse_effect_to_examine"
        if facts["correspondence"] and facts["causal"] == "supported_in_model":
            return "contributive_not_sufficient" if facts["sufficiency"] is False else "candidate_only"
        return "candidate_only"
    if rule == "scenario_necessity":
        return "necessary_only_in_scenario" if (
            facts["same_scenario_required"] and facts["identified_alternative"]
        ) else "indeterminate"
    if rule == "inventory":
        return "no_impossibility_inference"
    raise ValueError("Unrecognized discriminating-rule family: " + rule)


def project_to_v2(case, seed):
    """Create a deliberately minimal, case-labelled NEED/CAN v2 projection.

    Results use epistemically indeterminate states. The oracle's hypothetical
    conclusion is NOT encoded as observed satisfaction, proven causation or an
    Actualization event; the v2 projection checks the current transport boundary.
    """
    record = copy.deepcopy(seed)
    tag = case["id"]
    subject_id, focus_id, relation_id = (
        f"O-{tag}-subject", f"O-{tag}-focus", f"R-{tag}"
    )
    focus = case["focus"]
    # The scenario explicitly stipulates the Subject category; no generic
    # technical_object fallback may misclassify individuals.
    category = case["subject_category"]
    record["schema_version"] = "2.1.0"

    def obj(oid, kind, label, concept_kind=None):
        result = {
            "id": oid, "category": kind, "label": label,
            "parent_id": None, "temporary_child_ids": [],
            "actualised_child_ids": [],
        }
        if concept_kind is not None:
            result["concept_kind"] = concept_kind
        return result
    def dfn(oid, refs):
        return {
            "object_id": oid, "version": "v1", "constituents": [],
            "properties": {}, "relation_refs": refs,
        }
    subject_ref = {"id": subject_id, "version": "v1"}
    focus_ref = {"id": focus_id, "version": "v1"}
    relation_ref = {"id": relation_id, "version": "v1"}
    record["analysis_id"] = "A-" + tag
    record["main_subject"] = subject_ref
    record["focus"] = {"type": focus, "object_id": focus_id}
    record["objects"] = [
        obj(subject_id, category, "Origin: " + case["scenario"]),
        obj(focus_id, "semantic_object", f"{focus} candidate for {tag}", focus),
    ]
    record["definitions"] = [
        dfn(subject_id, [relation_ref]),
        dfn(focus_id, []),
    ]
    # Status here is synthetic model attribution, NOT effective satisfaction,
    # CAN actionability, empirical proof, or a new subtype of CAN.
    facts = case["facts"]
    attribution_status = "indeterminate"
    if focus == "CAN":
        if facts["rule"] == "can":
            if facts["prior_constitutive_change"]:
                attribution_status = "refuted_in_context"
            elif facts["basis"] == "established":
                attribution_status = "established_in_model"
        elif facts["rule"] == "collective":
            if facts["coordination"] == facts["joint_foundation"] == "established":
                attribution_status = "established_in_model"
    elif facts["rule"] == "necessity":
        if facts["mode"] == "conceptual":
            if facts["identity_essential"] is True:
                attribution_status = "established_in_model"
            elif facts["identity_essential"] is False:
                attribution_status = "refuted_in_context"
        elif facts["mode"] == "functional":
            if facts["alternative"] is True:
                attribution_status = "refuted_in_context"
            elif facts["alternative"] is False and facts["coverage"] == "complete":
                attribution_status = "established_in_model"
    elif facts["rule"] == "ownership":
        attribution_status = "established_in_model"

    claim_id = "CL-" + tag + "-attribution"
    claim_statement = (
        f"In synthetic {tag}, {focus} {focus_id} is NOT attributable to {subject_id}."
        if attribution_status == "refuted_in_context"
        else f"In synthetic {tag}, {focus} {focus_id} is attributable to {subject_id}."
    )
    record["claims"] = [{
        "id": claim_id, "version": "v1",
        "statement": claim_statement,
        "scope": "Synthetic stipulated case only; no empirical verification.",
    }]
    record["claim_assessments"] = [{
        "id": "AS-" + tag + "-attribution",
        "claim_id": claim_id, "claim_version": "v1",
        "at": "2026-11-16T09:00:00+01:00",
        "model_status": (
            "established_in_model"
            if attribution_status in ("established_in_model", "refuted_in_context")
            else "indeterminate"
        ),
        "empirical_status": "indeterminate",
        "supporting_evidence_ids": [], "contradicting_evidence_ids": [],
        "informative_evidence_ids": [],
        "assumptions": [case["scenario"]],
        "limitations": ["No independently verified evidence or universal causality."],
    }]
    record["relations"] = [{
        "id": relation_id, "version": "v1", "type": focus,
        "origin_object": subject_ref, "represented_object": focus_ref,
        "NEEDs": None, "CANs": None,
        "attribution": {
            "status": attribution_status,
            "scope": tag,
            "justification": case["expected"]["justification"],
            "claim_id": claim_id,
        },
        "relation": {
            "nature": ["functional"] if focus == "NEED" else ["contributive"],
            "links": [],
        },
    }]
    assert not record["events"] and not record["scenarios"]
    assessment = {
        "ID": "PE-" + tag,
        "Subject": {"object_id": subject_id},
        "Focus": {"type": focus, "object_id": focus_id},
        "Context": {"definition_versions": {
            subject_id: "v1", focus_id: "v1",
        }},
        "Dependencies": [],
    }
    note = "Synthetic identification exercise; no empirical state or causal proof supplied."
    if focus == "NEED":
        assessment["Results"] = {
            "effective_satisfaction": {
                "status": "indeterminate", "justification": note,
            },
            "temporal_compliance": {
                "applicability": "indeterminate",
                "justification": "No scoped temporal evaluation has been undertaken.",
            },
            "candidate_cans": {
                "identified": [], "search_status": "not_searched",
                "coverage": "indeterminate", "scope": case["id"],
                "justification": "No exhaustive CAN inventory follows from the synthetic oracle.",
            },
        }
    else:
        assessment["Results"] = {
            "actualizability": {
                "status": "indeterminate", "justification": note,
            },
            "prerequisites": {
                "needs": [], "cans": [], "conditions": [], "pathways": [],
                "inventory_coverage": "indeterminate",
                "scope": case["id"],
                "justification": "Prerequisites have not been exhaustively assessed.",
            },
            "potential_contributions": {
                "needs": [], "search_status": "not_searched",
                "coverage": "indeterminate", "scope": case["id"],
                "justification": "No verified NEED contributions inferred.",
            },
        }
    record["power_assessments"] = [assessment]
    return record


class T01IdentificationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.corpus = load_json(CORPUS_PATH)
        cls.seed = load_json(SEED_PATH)
        cls.analysis_validator = validator()
        cls.eval_validator = validator(evaluation=True)

    def test_corpus_version_types_and_traceable_oracles(self):
        self.assertEqual(self.corpus["corpus_version"], "1.1.0")
        self.assertEqual(self.corpus["profile"]["version"], "2.1.0")
        cases = self.corpus["cases"]
        self.assertEqual(len(cases), 26)
        self.assertEqual(len({c["id"] for c in cases}), len(cases))
        self.assertEqual(set(c["kind"] for c in cases), {"positive", "negative", "boundary"})
        self.assertEqual(set.union(*(set(c["principles"]) for c in cases)), LETTERS)
        for case in cases:
            with self.subTest(case=case["id"]):
                self.assertTrue(case["scenario"].strip())
                self.assertTrue(case["expected"]["justification"].strip())
                self.assertTrue(case["limitations"].strip())
                self.assertTrue(set(case["principles"]) <= LETTERS)
                self.assertIn(case["focus"], ("NEED", "CAN"))
                self.assertIn(case["subject_category"], (
                    "individual", "group", "technical_object", "system",
                    "semantic_object",
                ))

    def test_discriminating_cases_match_independently_authored_expectations(self):
        for case in self.corpus["cases"]:
            with self.subTest(case=case["id"]):
                self.assertEqual(
                    discriminate(case["facts"]), case["expected"]["outcome"],
                    msg=case["expected"]["justification"],
                )

    def test_all_26_case_projections_validate_against_v2_analysis_and_power(self):
        for case in self.corpus["cases"]:
            with self.subTest(case=case["id"]):
                projected = project_to_v2(case, self.seed)
                self.analysis_validator.validate(projected)
                self.eval_validator.validate(projected["power_assessments"][0])
                focus = projected["focus"]
                assessment = projected["power_assessments"][0]
                self.assertEqual(focus, assessment["Focus"])
                self.assertEqual(projected["main_subject"]["id"], assessment["Subject"]["object_id"])
                refs = {d["object_id"] for d in projected["definitions"]}
                self.assertIn(focus["object_id"], refs)
                self.assertIn(projected["main_subject"]["id"], refs)
                self.assertEqual(projected["relations"][0]["represented_object"]["id"], focus["object_id"])
                self.assertEqual(projected["relations"][0]["origin_object"], projected["main_subject"])
                self.assertEqual(projected["events"], [])  # no actualization invented
                self.assertEqual(projected["schema_version"], "2.1.0")
                self.assertEqual(projected["objects"][0]["category"], case["subject_category"])
                self.assertEqual(projected["objects"][1]["concept_kind"], case["focus"])
                claim_id = projected["relations"][0]["attribution"]["claim_id"]
                self.assertTrue(any(c["id"] == claim_id for c in projected["claims"]))
                self.assertTrue(projected["relations"][0]["attribution"]["justification"])

    def test_patient_and_pianist_subjects_are_individuals(self):
        # Explicit independent regression oracle for the five prior category errors.
        cases = {c["id"]: c for c in self.corpus["cases"]}
        for case_id in ("T01-12", "T01-13", "T01-15", "T01-16", "T01-17"):
            with self.subTest(case=case_id):
                self.assertEqual(cases[case_id]["subject_category"], "individual")
                doc = project_to_v2(cases[case_id], self.seed)
                self.assertEqual(doc["objects"][0]["category"], "individual")

    def test_candidate_can_attribution_is_distinct_from_identity(self):
        by_id = {c["id"]: c for c in self.corpus["cases"]}
        expectations = {
            "T01-13": ("individual", "established_in_model"),
            "T01-14": ("technical_object", "refuted_in_context"),
            "T01-17": ("individual", "indeterminate"),
            "T01-18": ("group", "established_in_model"),
            "T01-19": ("group", "indeterminate"),
        }
        for case_id, (subject_category, attribution_status) in expectations.items():
            with self.subTest(case=case_id):
                doc = project_to_v2(by_id[case_id], self.seed)
                self.assertEqual(doc["objects"][0]["category"], subject_category)
                self.assertEqual(doc["objects"][1]["concept_kind"], "CAN")
                self.assertEqual(
                    doc["relations"][0]["attribution"]["status"],
                    attribution_status,
                )
                self.assertEqual(
                    doc["claim_assessments"][0]["empirical_status"],
                    "indeterminate",
                )

    def test_no_oracle_is_silently_promoted_to_observed_satisfaction_or_causation(self):
        for case in self.corpus["cases"]:
            with self.subTest(case=case["id"]):
                doc = project_to_v2(case, self.seed)
                results = doc["power_assessments"][0]["Results"]
                if case["focus"] == "NEED":
                    self.assertEqual(results["effective_satisfaction"]["status"], "indeterminate")
                    self.assertEqual(results["candidate_cans"]["identified"], [])
                    self.assertEqual(results["candidate_cans"]["coverage"], "indeterminate")
                else:
                    self.assertEqual(results["actualizability"]["status"], "indeterminate")
                    self.assertEqual(results["potential_contributions"]["needs"], [])
                    self.assertEqual(results["prerequisites"]["inventory_coverage"], "indeterminate")

    def test_v2_negative_mutations_are_rejected(self):
        doc = project_to_v2(self.corpus["cases"][0], self.seed)
        changed = copy.deepcopy(doc)
        changed["schema_version"] = "1.0.0"
        self.assertFalse(self.analysis_validator.is_valid(changed))
        changed = copy.deepcopy(doc)
        changed["invented_empirical_truth"] = True
        self.assertFalse(self.analysis_validator.is_valid(changed))
        changed = copy.deepcopy(doc)
        changed["focus"] = {"type": "NEED", "scenario_id": "S-fake"}
        self.assertFalse(self.analysis_validator.is_valid(changed))
        changed = copy.deepcopy(doc)
        changed["power_assessments"][0]["Results"]["candidate_cans"]["coverage"] = "complete"
        self.assertFalse(self.analysis_validator.is_valid(changed))
        can_case = next(c for c in self.corpus["cases"] if c["focus"] == "CAN")
        changed = project_to_v2(can_case, self.seed)
        changed["power_assessments"][0]["Results"]["potential_contributions"]["needs"] = [{
            "object_id": "O-NEED", "relationship": "sufficient",
            "justification": "Incorrect promotion of candidate to sufficiency.",
        }]
        self.assertFalse(self.eval_validator.is_valid(changed))

    def test_structural_conformance_is_not_referential_semantic_proof(self):
        case = self.corpus["cases"][0]
        doc = project_to_v2(case, self.seed)
        doc["focus"]["object_id"] = "O-not-in-objects"
        # The structural schema validates a well-formed string, not its referent.
        self.assertTrue(self.analysis_validator.is_valid(doc))
        object_ids = {o["id"] for o in doc["objects"]}
        self.assertNotIn(doc["focus"]["object_id"], object_ids)

    def test_explicit_no_compensation_and_unknowns(self):
        examples = {
            c["id"]: c for c in self.corpus["cases"]
            if c["facts"]["rule"] == "aggregation"
        }
        self.assertGreaterEqual(len(examples), 4)
        for c in examples.values():
            with self.subTest(case=c["id"]):
                self.assertEqual(discriminate(c["facts"]), c["expected"]["outcome"])
                if "unsatisfied" in c["facts"]["essential"]:
                    self.assertEqual(c["expected"]["outcome"], "unsatisfied")
                elif "indeterminate" in c["facts"]["essential"]:
                    self.assertEqual(c["expected"]["outcome"], "indeterminate")

    def test_prior_author_approval_appears_in_both_canonical_documents(self):
        ref = (ROOT / "reference/trialectic-method.md").read_text(encoding="utf-8")
        log = (ROOT / "DECISIONS.md").read_text(encoding="utf-8")
        self.assertIn("## D-82 ·", log)
        self.assertIn("## 3.5 Validated operational identification principles", ref)
        for letter in LETTERS:
            with self.subTest(principle=letter):
                self.assertIn(f"### T-01-{letter} —", ref)
                self.assertIn(f"### T-01-{letter} —", log)
        for phrase in [
            "Pour les nécessités constitutives ou conceptuelles",
            "Une possibilité générale de transformation future",
            "relations inhibitrices ou les effets défavorables",
        ]:
            self.assertIn(phrase, ref)
            self.assertIn(phrase, log)


if __name__ == "__main__":
    unittest.main()
