"""Synthetic software checks; not conceptual or empirical validation."""
import asyncio
import hashlib
import json
import os
from pathlib import Path
import socket
import subprocess
import sys
import unittest
from mcp import Client, StdioServerParameters
from tria_mcp import catalog as c

APP = Path(__file__).resolve().parents[1]


def source_snapshot():
    return {str(p): hashlib.sha256(p.read_bytes()).hexdigest()
            for folder in ['reference', 'schemas', 'applications/ai-assisted-analysis',
                           'applications/triad-graph']
            for p in (c.ROOT / folder).rglob('*') if p.is_file() and '__pycache__' not in str(p)}


class AdapterTests(unittest.TestCase):
    def test_catalog_preserves_sources_and_reports_scope(self):
        before = source_snapshot()
        data = c.capabilities()['data']
        self.assertFalse(data['accepts_analytical_data'])
        self.assertFalse(data['persistence'])
        self.assertEqual(data['host_channel_status'], 'requires_actual_host_test')
        for identifier in data['reference_ids']:
            self.assertTrue(c.read_reference(identifier)['data']['text'])
        self.assertEqual(before, source_snapshot())

    def test_allowlist(self):
        for identifier in ['../../AGENTS.md', 'C:/Windows/win.ini', 'https://example.org']:
            with self.assertRaises(ValueError):
                c.read_reference(identifier)
        with self.assertRaises(ValueError):
            c.guidance(mode='unknown')

    def test_schema_registry_and_exact_section(self):
        data = c.schema('analysis')['data']
        self.assertEqual(set(data['registry']), {
            'urn:trialectic:schema:analysis:normative-v2',
            'urn:trialectic:schema:power-evaluation:normative-v2'})
        text = c.read_reference('dialogue-protocol', '## 1. Purpose and scope')['data']['text']
        self.assertTrue(text.startswith('## 1. Purpose and scope'))
        self.assertNotIn('## 2.', text)


class ProtocolTests(unittest.IsolatedAsyncioTestCase):
    async def exercise(self, client):
        async with client:
            tools = await client.list_tools()
            self.assertEqual(len(tools.tools), 5)
            self.assertTrue(all(t.annotations.read_only_hint for t in tools.tools))
            result = await client.call_tool('tria_get_capabilities', {})
            self.assertFalse(result.is_error)
            self.assertFalse(result.structured_content['data']['persistence'])
            self.assertTrue(result.content)
            self.assertEqual(json.loads(result.content[0].text), result.structured_content)
            schema = await client.call_tool('tria_get_schema', {'document_type': 'analysis'})
            self.assertIn('registry', schema.structured_content['data'])
            guidance = await client.call_tool('tria_get_guidance', {'language': 'en', 'mode': 'tria-dev'})
            self.assertEqual(guidance.structured_content['data']['language'], 'en')
            self.assertNotIn('tria_validate_document', {tool.name for tool in tools.tools})
            probe = await client.call_tool('tria_open_probe', {})
            self.assertEqual(probe.structured_content['status'], 'open-interface')
            resource = await client.read_resource('ui://tria/direct-channel-v1')
            self.assertIn('TEST SYNTHÉTIQUE', resource.contents[0].text)
            denied = await client.call_tool('tria_read_reference', {'document_id': '../AGENTS.md'})
            self.assertTrue(denied.is_error)
            resources = await client.list_resources()
            self.assertIn('tria://server/capabilities', [str(r.uri) for r in resources.resources])
            resource = await client.read_resource('tria://reference/method')
            self.assertIn('text', json.loads(resource.contents[0].text)['data'])
            prompts = await client.list_prompts()
            self.assertEqual({p.name for p in prompts.prompts}, {'tria_instructions'})
            prompt = await client.get_prompt('tria_instructions', {'language': 'en'})
            self.assertEqual(json.loads(prompt.messages[0].content.text)['data']['language'], 'en')

    async def test_stdio(self):
        params = StdioServerParameters(command=sys.executable,
            args=['-m', 'tria_mcp.server'], cwd=str(APP),
            env={**os.environ, 'PYTHONDONTWRITEBYTECODE': '1'})
        for mode in ['auto', 'legacy']:
            with self.subTest(mode=mode):
                await asyncio.wait_for(self.exercise(Client(params, mode=mode)), timeout=30)

    async def test_streamable_http(self):
        with socket.socket() as sock:
            sock.bind(('127.0.0.1', 0))
            port = sock.getsockname()[1]
        process = subprocess.Popen([sys.executable, '-m', 'tria_mcp.server',
            '--transport', 'streamable-http', '--port', str(port)], cwd=APP,
            env={**os.environ, 'PYTHONDONTWRITEBYTECODE': '1'},
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
            creationflags=getattr(subprocess, 'CREATE_NO_WINDOW', 0))
        try:
            for _ in range(100):
                if process.poll() is not None:
                    self.fail('HTTP server exited before accepting connections')
                try:
                    reader, writer = await asyncio.open_connection('127.0.0.1', port)
                    writer.close()
                    await writer.wait_closed()
                    break
                except OSError:
                    await asyncio.sleep(.1)
            else:
                self.fail('HTTP startup timeout')
            for mode in ['auto', 'legacy']:
                with self.subTest(mode=mode):
                    await asyncio.wait_for(self.exercise(Client(f'http://127.0.0.1:{port}/mcp', mode=mode)), timeout=30)
        finally:
            process.terminate()
            await asyncio.to_thread(process.wait, timeout=10)


if __name__ == '__main__':
    unittest.main()
