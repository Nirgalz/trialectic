"""Protocol checks for the opt-in trIA Conversation Panel (no model/API calls)."""
import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SERVER = ROOT / "applications" / "tria-mcp" / "server.py"
UI_URI = "ui://tria/focus-panel"


def modern(method, request_id, params=None):
    p = {
        "_meta": {
            "io.modelcontextprotocol/protocolVersion": "2026-07-28",
            "io.modelcontextprotocol/clientCapabilities": {},
        }
    }
    p.update(params or {})
    return {"jsonrpc": "2.0", "id": request_id, "method": method, "params": p}


class Scripts(HTMLParser):
    def __init__(self):
        super().__init__()
        self.reading = False
        self.scripts = []

    def handle_starttag(self, tag, attrs):
        if tag == "script":
            self.reading = True
            self.scripts.append("")

    def handle_endtag(self, tag):
        if tag == "script":
            self.reading = False

    def handle_data(self, data):
        if self.reading:
            self.scripts[-1] += data


class MCPPanelTests(unittest.TestCase):
    def process(self, enabled):
        args = [sys.executable, "-u", str(SERVER)]
        if enabled:
            args.append("--enable-panel")
        p = subprocess.Popen(args, cwd=ROOT, stdin=subprocess.PIPE,
                             stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        self.addCleanup(self.close, p)
        return p

    def close(self, p):
        if p.poll() is None:
            p.stdin.close()
            p.terminate()
            p.wait(timeout=5)
        self.assertEqual(p.stderr.read(), b"", "MCP server must not log data to stderr")

    def send(self, p, request):
        p.stdin.write(json.dumps(request, ensure_ascii=False).encode("utf-8") + b"\n")
        p.stdin.flush()
        line = p.stdout.readline()
        self.assertTrue(line, "Server closed before responding")
        return json.loads(line.decode("utf-8"))

    def test_panel_disabled_by_default(self):
        p = self.process(False)
        resources = self.send(p, modern("resources/list", 1))["result"]["resources"]
        self.assertEqual(len(resources), 8)
        self.assertNotIn(UI_URI, {r["uri"] for r in resources})
        tools = self.send(p, modern("tools/list", 2))["result"]["tools"]
        self.assertNotIn("tria_open_focus_panel", {t["name"] for t in tools})
        denied = self.send(p, modern("resources/read", 3, {"uri": UI_URI}))
        self.assertEqual(denied["error"]["code"], -32602)

    def test_opt_in_registers_thread_entrypoint_and_self_contained_ui(self):
        p = self.process(True)
        resources = self.send(p, modern("resources/list", 1))["result"]["resources"]
        item = next(r for r in resources if r["uri"] == UI_URI)
        self.assertEqual(item["mimeType"], "text/html;profile=mcp-app")
        self.assertEqual(len(resources), 9)
        tools = self.send(p, modern("tools/list", 2))["result"]["tools"]
        tool = next(t for t in tools if t["name"] == "tria_open_focus_panel")
        self.assertEqual(tool["_meta"]["ui"]["resourceUri"], UI_URI)
        self.assertEqual(tool["_meta"]["openai/ui"]["entrypoints"], [{"type": "thread"}])
        self.assertTrue(tool["annotations"]["readOnlyHint"])
        response = self.send(p, modern("resources/read", 3, {"uri": UI_URI}))
        resource = response["result"]["contents"][0]
        self.assertEqual(resource["mimeType"], "text/html;profile=mcp-app")
        html = resource["text"]
        self.assertGreater(len(html), 350000)
        self.assertLess(len(html.encode("utf-8")), 750000)
        self.assertNotIn("/*__TRIA_CYTOSCAPE__*/", html)
        self.assertNotIn("https://cdn", html.lower())
        for piece in ("ui/initialize", "ui/message", "ui/update-model-context",
                      "window.parent.postMessage", "O-mairie", "O-habitants",
                      "aucune modification automatique", "tria-candidate-preview",
                      "Simuler un CAN candidat",
                      'content:[{type:"text",text:prompt()}]'):
            self.assertIn(piece, html)

    def test_panel_tool_requires_explicit_enablement_and_no_arguments(self):
        p = self.process(True)
        result = self.send(p, modern("tools/call", 1, {
            "name": "tria_open_focus_panel", "arguments": {},
        }))["result"]
        self.assertFalse(result["isError"])
        self.assertEqual(result["structuredContent"]["source"], "synthetic-demo")
        self.assertEqual(len(result["structuredContent"]["objects"]), 3)
        self.assertTrue(result["structuredContent"]["requires_human_review"])
        self.assertFalse(result["structuredContent"]["persistent_analysis_modified"])
        denied = self.send(p, modern("tools/call", 2, {
            "name": "tria_open_focus_panel", "arguments": {"write": True},
        }))
        self.assertEqual(denied["error"]["code"], -32602)

    def test_legacy_panel_discovery(self):
        p = self.process(True)
        initialized = self.send(p, {"jsonrpc": "2.0", "id": 1, "method": "initialize",
                                    "params": {"protocolVersion": "2025-11-25",
                                               "capabilities": {},
                                               "clientInfo": {"name": "test", "version": "1"}}})
        self.assertEqual(initialized["result"]["protocolVersion"], "2025-11-25")
        p.stdin.write(b'{"jsonrpc":"2.0","method":"notifications/initialized"}\n')
        p.stdin.flush()
        tools = self.send(p, {"jsonrpc": "2.0", "id": 2, "method": "tools/list"})["result"]["tools"]
        self.assertIn("tria_open_focus_panel", {t["name"] for t in tools})

    @unittest.skipUnless(shutil.which("node"), "Node.js not available for JavaScript syntax check")
    def test_panel_embedded_javascript_syntax(self):
        # Validate the actual shipped browser scripts, including vendored Cytoscape.
        p = self.process(True)
        resource = self.send(p, modern("resources/read", 1, {"uri": UI_URI}))
        html = resource["result"]["contents"][0]["text"]
        parser = Scripts()
        parser.feed(html)
        self.assertEqual(len(parser.scripts), 2)
        with tempfile.TemporaryDirectory() as d:
            for i, script in enumerate(parser.scripts):
                path = Path(d) / f"script{i}.js"
                path.write_text(script, encoding="utf-8")
                run = subprocess.run(["node", "--check", str(path)],
                                     capture_output=True, text=True, timeout=15)
                self.assertEqual(run.returncode, 0, run.stderr)


if __name__ == "__main__":
    unittest.main()
