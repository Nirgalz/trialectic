"""Offline Work Local queue tests. No ChatGPT, network or API-key access."""
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import work_bridge as bridge

PILOT = json.loads((HERE / "examples/focus-pilot.json").read_text(encoding="utf-8"))


class WorkBridgeTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name) / ".tria-work"
        self.patches = [
            patch.object(bridge, "ROOT", self.base),
            patch.object(bridge, "REQUESTS", self.base / "requests"),
            patch.object(bridge, "RESPONSES", self.base / "responses")
        ]
        for part in self.patches:
            part.start()
            self.addCleanup(part.stop)

    def request(self):
        return bridge.create_request(PILOT, "focus", "O-eleves", "detailed")

    def response(self, request):
        return {
            "schema": "tria-work-response-v1",
            "request_id": request["request_id"],
            "analysis_id": request["analysis_id"],
            "analysis_hash": request["analysis_hash"],
            "summary": "Hypothèse conditionnelle à examiner.",
            "semantic_findings": ["Continuité : terme à préciser."],
            "proposals": [
                {"kind": "relation", "object_id": "O-eleves",
                 "description": "Relation possible", "epistemic_status": "hypothesis"}
            ],
            "scenario_reviews": [{"scenario_id": "S-02",
                                  "impact": "possible", "status": "requires_review"}],
            "open_questions": ["Quelles données manquent ?"]
        }

    def test_round_trip(self):
        original = json.dumps(PILOT, sort_keys=True)
        request = self.request()
        self.assertEqual(bridge.request_status(request["request_id"])["status"], "pending")
        req = json.loads((bridge.REQUESTS / (request["request_id"] + ".json")).read_text("utf-8"))
        self.assertEqual(req["focus_id"], "O-eleves")
        self.assertEqual(req["analysis_hash"], bridge.digest(PILOT))
        self.assertIn("response_contract", req)
        answer = self.response(request)
        (bridge.RESPONSES / (request["request_id"] + ".json")).write_text(
            json.dumps(answer), encoding="utf-8")
        status = bridge.request_status(request["request_id"])
        self.assertEqual(status["status"], "completed")
        self.assertEqual(status["result"]["proposals"][0]["epistemic_status"], "hypothesis")
        self.assertEqual(json.dumps(PILOT, sort_keys=True), original)

    def test_wrong_analysis_hash_refused(self):
        req = self.request()
        answer = self.response(req)
        answer["analysis_hash"] = "0" * 64
        (bridge.RESPONSES / (req["request_id"] + ".json")).write_text(
            json.dumps(answer), encoding="utf-8")
        with self.assertRaises(bridge.WorkBridgeError) as err:
            bridge.request_status(req["request_id"])
        self.assertEqual(err.exception.status, 409)

    def test_untrusted_html_is_data(self):
        req = self.request()
        answer = self.response(req)
        answer["summary"] = "<script>alert('not executed')</script>"
        (bridge.RESPONSES / (req["request_id"] + ".json")).write_text(
            json.dumps(answer), encoding="utf-8")
        self.assertEqual(bridge.request_status(req["request_id"])["result"]["summary"],
                         answer["summary"])

    def test_unknown_id_and_focus_rejected(self):
        with self.assertRaises(bridge.WorkBridgeError):
            bridge.request_status("../secrets")
        with self.assertRaises(bridge.WorkBridgeError):
            bridge.create_request(PILOT, "focus", "UNKNOWN", "detailed")
        with self.assertRaises(bridge.WorkBridgeError):
            bridge.create_request(PILOT, "automatic", "O-eleves", "detailed")

    def test_bad_result_type_rejected(self):
        req = self.request()
        answer = self.response(req)
        answer["proposals"] = ["unstructured"]
        (bridge.RESPONSES / (req["request_id"] + ".json")).write_text(
            json.dumps(answer), encoding="utf-8")
        with self.assertRaises(bridge.WorkBridgeError):
            bridge.request_status(req["request_id"])

    def test_symlink_response_rejected(self):
        req = self.request()
        outside = Path(self.temp.name) / "elsewhere.json"
        outside.write_text(json.dumps(self.response(req)), encoding="utf-8")
        link = bridge.RESPONSES / (req["request_id"] + ".json")
        try:
            link.symlink_to(outside)
        except (OSError, NotImplementedError):
            self.skipTest("Symlinks unavailable on this platform")
        with self.assertRaises(bridge.WorkBridgeError):
            bridge.request_status(req["request_id"])


if __name__ == "__main__":
    unittest.main()
