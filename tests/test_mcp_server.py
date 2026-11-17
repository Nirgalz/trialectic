"""Offline MCP protocol regression tests; no API keys, model calls or network."""
import importlib.util
import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SERVER = ROOT / "applications" / "tria-mcp" / "server.py"
spec = importlib.util.spec_from_file_location("tria_mcp_server", SERVER)
mcp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mcp)


def modern(method, identifier, extra=None):
    params = {"_meta": {
        "io.modelcontextprotocol/protocolVersion": "2026-07-28",
        "io.modelcontextprotocol/clientCapabilities": {},
    }}
    params.update(extra or {})
    return {"jsonrpc": "2.0", "id": identifier, "method": method, "params": params}


class MCPIntegrationTests(unittest.TestCase):
    def setUp(self):
        self.proc = subprocess.Popen(
            [sys.executable, "-u", str(SERVER)], cwd=str(ROOT),
            stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        self.addCleanup(self.close)

    def close(self):
        if self.proc.poll() is None:
            self.proc.stdin.close()
            self.proc.terminate()
            self.proc.wait(timeout=5)
        self.assertEqual(self.proc.stderr.read(), b"", "MCP must not log data to stderr")

    def send(self, body):
        payload = json.dumps(body, ensure_ascii=False).encode("utf-8") + b"\n"
        self.proc.stdin.write(payload)
        self.proc.stdin.flush()
        result = self.proc.stdout.readline()
        self.assertTrue(result, "MCP server closed unexpectedly")
        return json.loads(result.decode("utf-8"))

    def test_modern_discovery_listing_and_read(self):
        discovered = self.send(modern("server/discover", "d"))
        self.assertIn("2026-07-28", discovered["result"]["supportedVersions"])
        self.assertEqual(discovered["result"]["resultType"], "complete")
        self.assertEqual(discovered["result"]["_meta"]["io.modelcontextprotocol/serverInfo"]["name"],
                         "tria-reference")
        listed = self.send(modern("resources/list", 1))
        self.assertGreaterEqual(len(listed["result"]["resources"]), 8)
        self.assertEqual(listed["result"]["resultType"], "complete")
        read = self.send(modern("resources/read", 2, {"uri": "tria://method/reference"}))
        content = read["result"]["contents"][0]
        self.assertIn("Understand", content["text"])
        self.assertEqual(content["uri"], "tria://method/reference")
        self.assertEqual(content["text"], (ROOT / "reference/trialectic-method.md").read_text("utf-8"))

    def test_modern_tool_access(self):
        listed = self.send(modern("tools/list", 1))
        names = {tool["name"] for tool in listed["result"]["tools"]}
        self.assertEqual(names, {"tria_read_reference", "tria_list_references"})
        called = self.send(modern("tools/call", 2, {
            "name": "tria_read_reference",
            "arguments": {"uri": "tria://method/fr/overview"},
        }))
        self.assertFalse(called["result"]["isError"])
        self.assertIn("Méthode", called["result"]["content"][0]["text"])
        catalog = self.send(modern("tools/call", 3, {"name": "tria_list_references", "arguments": {}}))
        self.assertEqual(len(json.loads(catalog["result"]["content"][0]["text"])), 8)

    def test_modern_assembled_schema_consistency(self):
        analysis = self.send(modern("resources/read", 1, {"uri": "tria://schema/analysis-v2"}))
        power = self.send(modern("resources/read", 2, {"uri": "tria://schema/power-evaluation-v2"}))
        a = json.loads(analysis["result"]["contents"][0]["text"])
        p = json.loads(power["result"]["contents"][0]["text"])
        from tools.validate_analysis import load_schemas
        self.assertEqual((a, p), load_schemas())
        self.assertIn("$defs", a)
        self.assertIn("$defs", p)

    def test_legacy_initialize_notification_tools(self):
        init = self.send({"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {
            "protocolVersion": "2025-11-25", "capabilities": {},
            "clientInfo": {"name": "test", "version": "0"}}})
        self.assertEqual(init["result"]["protocolVersion"], "2025-11-25")
        self.proc.stdin.write(b'{"jsonrpc":"2.0","method":"notifications/initialized"}\n')
        self.proc.stdin.flush()
        lst = self.send({"jsonrpc": "2.0", "id": 2, "method": "tools/list"})
        self.assertNotIn("resultType", lst["result"])
        response = self.send({"jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": {
            "name": "tria_read_reference", "arguments": {"uri": "tria://method/en/overview"}}})
        self.assertIn("Trialectic", response["result"]["content"][0]["text"])
        self.assertEqual(self.send({"jsonrpc": "2.0", "id": 4, "method": "ping"})["result"], {})

    def test_unknown_paths_and_mutations_rejected(self):
        for uri in ("file:///etc/passwd", "tria://method/../../secrets", "tria://method/nonexistent"):
            res = self.send(modern("resources/read", 4, {"uri": uri}))
            self.assertEqual(res["error"]["code"], -32602)
        bad = self.send(modern("tools/call", 5, {
            "name": "tria_read_reference",
            "arguments": {"uri": "tria://method/reference", "document": {"secret": "not accepted"}},
        }))
        self.assertEqual(bad["error"]["code"], -32602)
        self.assertEqual(self.send(modern("analysis/write", 6))["error"]["code"], -32601)

    def test_input_validation_and_recovery(self):
        self.assertEqual(self.send({"jsonrpc": "2.0", "id": 1, "method": "tools/list"})["error"]["code"], -32600)
        self.assertEqual(self.send(modern("tools/list", 2, {"cursor": "future"}))["error"]["code"], -32602)
        broken = modern("tools/list", 3)
        del broken["params"]["_meta"]["io.modelcontextprotocol/clientCapabilities"]
        self.assertEqual(self.send(broken)["error"]["code"], -32602)
        self.proc.stdin.write(b"not-json\n")
        self.proc.stdin.flush()
        self.assertEqual(json.loads(self.proc.stdout.readline())["error"]["code"], -32700)
        self.assertIn("result", self.send(modern("tools/list", 4)))

    def test_oversized_message_rejected_without_stopping_server(self):
        self.proc.stdin.write(b"x" * 70000 + b"\n")
        self.proc.stdin.flush()
        self.assertEqual(json.loads(self.proc.stdout.readline())["error"]["code"], -32600)
        self.assertIn("result", self.send(modern("tools/list", 8)))


if __name__ == "__main__":
    unittest.main()
