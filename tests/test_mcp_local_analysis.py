"""Offline opt-in trIA MCP tests: real stdio transport, no AI or network."""
import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SERVER = ROOT / "applications" / "tria-mcp" / "server.py"
PILOT = ROOT / "applications" / "triad-graph" / "examples" / "focus-pilot.json"


def request(name, args=None, identifier=1):
    return {"jsonrpc": "2.0", "method": "tools/call", "id": identifier,
            "params": {"name": name, "arguments": args or {},
                       "_meta": {"io.modelcontextprotocol/protocolVersion": "2026-07-28",
                                 "io.modelcontextprotocol/clientCapabilities": {}}}}


class ApprovedAnalysisMCPTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.file = Path(self.temp.name) / "selected-analysis.json"
        shutil.copyfile(PILOT, self.file)
        self.original = self.file.read_bytes()
        self.processes = []

    def start(self, allowed=True):
        args = [sys.executable, "-u", str(SERVER)]
        if allowed:
            args += ["--allow-analysis", str(self.file.resolve())]
        proc = subprocess.Popen(args, cwd=ROOT, stdin=subprocess.PIPE,
                                stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        self.processes.append(proc)
        self.addCleanup(self.stop, proc)
        return proc

    def stop(self, proc):
        if proc.poll() is None:
            proc.stdin.close()
            proc.terminate()
            proc.wait(timeout=5)
        self.assertEqual(proc.stderr.read(), b"")

    def call(self, proc, name, args=None, identifier=1):
        proc.stdin.write(json.dumps(request(name, args, identifier), ensure_ascii=False).encode() + b"\n")
        proc.stdin.flush()
        raw = proc.stdout.readline()
        self.assertTrue(raw, "MCP server terminated")
        msg = json.loads(raw.decode("utf-8"))
        if "error" in msg:
            return msg
        self.assertEqual(msg["result"]["resultType"], "complete")
        return json.loads(msg["result"]["content"][0]["text"])

    def catalog(self, proc):
        result = self.call(proc, "tria_list_analyses")
        self.assertEqual(len(result["analyses"]), 1)
        return result["analyses"][0]

    def test_no_file_is_visible_unless_explicitly_allowed(self):
        proc = self.start(allowed=False)
        self.assertEqual(self.call(proc, "tria_list_analyses")["analyses"], [])
        result = self.call(proc, "tria_read_analysis_section", {
            "analysis_ref": "a1", "snapshot_hash": "unknown", "section": "objects"})
        self.assertEqual(result["error"]["code"], -32602)
        self.assertEqual(self.file.read_bytes(), self.original)

    def test_header_section_and_focus_preserve_source(self):
        proc = self.start()
        item = self.catalog(proc)
        self.assertEqual(item["analysis_id"], "A-focus-six-ecoles-pilot")
        self.assertNotIn(str(self.file), json.dumps(item))
        args = {"analysis_ref": item["analysis_ref"], "snapshot_hash": item["snapshot_hash"]}
        header = self.call(proc, "tria_read_analysis_section", {**args, "section": "header"})
        self.assertEqual(header["metadata"]["main_subject"]["id"], "O-commune")
        page = self.call(proc, "tria_read_analysis_section", {**args, "section": "objects", "limit": 2})
        self.assertEqual(len(page["records"]), 2)
        self.assertTrue(page["has_more"])
        self.assertGreater(page["total"], 2)
        focused = self.call(proc, "tria_explore_focus", {**args, "object_id": "O-eleves"})
        self.assertEqual(focused["focus_object"]["id"], "O-eleves")
        self.assertTrue(any("O-eleves" in str(r.get("origin_object")) for r in focused["direct_relation_records"]))
        self.assertTrue(focused["read_only"])
        self.assertIn("not an established impact", focused["qualification"])
        self.assertEqual(self.file.read_bytes(), self.original)

    def test_preview_requires_review_does_not_write(self):
        proc = self.start()
        item = self.catalog(proc)
        base = {"analysis_ref": "a1", "snapshot_hash": item["snapshot_hash"],
                "kind": "relation", "target_id": "R-sante",
                "description": "Possible additional link to examine",
                "rationale": "Working hypothesis requiring independent evidence",
                "epistemic_status": "hypothesis"}
        reply = self.call(proc, "tria_prepare_proposal", base)
        self.assertFalse(reply["stored"])
        self.assertFalse(reply["applied"])
        self.assertEqual(reply["proposal"]["review_status"], "requires_human_review")
        same = self.call(proc, "tria_prepare_proposal", base)
        self.assertEqual(reply["proposal_id"], same["proposal_id"])
        self.assertEqual(self.file.read_bytes(), self.original)

    def test_stale_hash_does_not_silently_update_snapshot(self):
        proc = self.start()
        item = self.catalog(proc)
        doc = json.loads(self.file.read_text(encoding="utf-8"))
        doc["analysis_id"] = "A-changed"
        self.file.write_text(json.dumps(doc), encoding="utf-8")
        rejected = self.call(proc, "tria_explore_focus", {
            "analysis_ref": "a1", "snapshot_hash": item["snapshot_hash"], "object_id": "O-eleves"})
        self.assertEqual(rejected["error"]["code"], -32602)
        self.assertIn("changed", rejected["error"]["message"])
        new = self.catalog(proc)
        self.assertNotEqual(new["snapshot_hash"], item["snapshot_hash"])
        self.assertEqual(new["analysis_id"], "A-changed")

    def test_unknown_focus_page_and_tool_input_rejected(self):
        proc = self.start()
        item = self.catalog(proc)
        base = {"analysis_ref": "a1", "snapshot_hash": item["snapshot_hash"]}
        for params in ({**base, "object_id": "unlisted"},
                       {**base, "object_id": "../secret"}):
            self.assertIn("error", self.call(proc, "tria_explore_focus", params))
        for pagination in ({"offset": -1}, {"limit": 0}, {"limit": 26},
                           {"section": "secrets"}, {"limit": True}):
            error = self.call(proc, "tria_read_analysis_section",
                              {**base, "section": "objects", **pagination})
            self.assertEqual(error["error"]["code"], -32602)
        unexpected = self.call(proc, "tria_explore_focus", {
            **base, "object_id": "O-eleves", "path": "/etc/passwd"})
        self.assertEqual(unexpected["error"]["code"], -32602)
        bad = self.call(proc, "tria_prepare_proposal", {
            **base, "kind": "object", "target_id": None,
            "epistemic_status": "established", "description": "unverified claim",
            "rationale": "none"})
        self.assertEqual(bad["error"]["code"], -32602)
        wrong_kind = self.call(proc, "tria_prepare_proposal", {
            **base, "kind": "object", "target_id": "R-sante",
            "epistemic_status": "hypothesis", "description": "wrong kind",
            "rationale": "The Relation ID is not an Object ID"})
        self.assertEqual(wrong_kind["error"]["code"], -32602)

    def test_approved_path_validation(self):
        sys.path.insert(0, str(SERVER.parent))
        from local_analysis import ApprovedAnalyses, AnalysisError
        with self.assertRaises(AnalysisError):
            ApprovedAnalyses(["relative.json"])
        try:
            link = Path(self.temp.name) / "linked.json"
            link.symlink_to(self.file)
        except (OSError, NotImplementedError):
            return
        with self.assertRaises(AnalysisError):
            ApprovedAnalyses([str(link)])


if __name__ == "__main__":
    unittest.main()
