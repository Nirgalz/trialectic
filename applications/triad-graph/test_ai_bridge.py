"""Tests for server-only API bridge; no live API key or network call."""
import json
import os
import sys
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT.parents[1] / 'tools'))
import ai_bridge
import check_secrets

PILOT = json.loads((ROOT / 'examples/focus-pilot.json').read_text(encoding='utf-8'))


class DummyResponse:
    def __enter__(self):
        return self

    def __exit__(self, *_):
        return False

    def read(self, maximum):
        return json.dumps({'output': [{'type': 'message', 'content': [
            {'type': 'output_text', 'text': json.dumps({
                'summary': 'Hypothèse à vérifier.',
                'semantic_findings': ['Continuité non définie.'],
                'proposals': [{'kind': 'relation', 'object_id': 'O-eleves',
                               'description': 'À examiner', 'epistemic_status': 'hypothesis'}],
                'scenario_reviews': [{'scenario_id': 'S-02', 'impact': 'possible',
                                      'status': 'requires_review'}],
                'open_questions': ['Quelles conditions ?']
            })}]}]}).encode('utf-8')


class BridgeTests(unittest.TestCase):
    def test_secret_path_protection(self):
        self.assertTrue(check_secrets.prohibited_path('applications/triad-graph/.env'))
        self.assertTrue(check_secrets.prohibited_path('.env.backup'))
        self.assertTrue(check_secrets.prohibited_path('credentials.local.json'))
        self.assertFalse(check_secrets.prohibited_path('applications/triad-graph/style.css'))
        synthetic = 'sk' + '-' + ('x' * 32)
        self.assertIsNotNone(check_secrets.check_bytes('example.txt', synthetic.encode()))
        self.assertIsNone(check_secrets.check_bytes('example.txt', b'OPENAI_API_KEY is read from env'))

    def test_no_credential_no_call(self):
        with patch.dict(os.environ, {}, clear=True):
            self.assertFalse(ai_bridge.configured())
            with self.assertRaises(ai_bridge.BridgeError) as ctx:
                ai_bridge.analyze(PILOT, 'focus', 'O-eleves', 'detailed')
            self.assertEqual(ctx.exception.status, 503)

    def test_context_does_not_include_key(self):
        context = ai_bridge.make_context(PILOT, 'focus', 'O-eleves', 'detailed')
        self.assertEqual(context['focus']['id'], 'O-eleves')
        self.assertIn('scenarios', context)
        self.assertNotIn('OPENAI_API_KEY', json.dumps(context))
        self.assertLessEqual(len(json.dumps(context, ensure_ascii=False)), ai_bridge.MAX_CONTEXT_CHARACTERS)

    def test_reject_unknown_focus(self):
        with self.assertRaises(ai_bridge.BridgeError):
            ai_bridge.make_context(PILOT, 'focus', 'DOES-NOT-EXIST', 'simple')

    def test_fake_api_call_does_not_expose_secret(self):
        key = 'fake-local-test-key-never-real'
        outbound = []
        def mock_open(req, timeout):
            outbound.append(req)
            return DummyResponse()
        with patch.dict(os.environ, {'OPENAI_API_KEY': key, 'TRIA_OPENAI_MODEL': 'test-model'}):
            with patch.object(ai_bridge, 'urlopen', mock_open):
                result = ai_bridge.analyze(PILOT, 'focus', 'O-eleves', 'detailed')
        self.assertEqual(result['summary'], 'Hypothèse à vérifier.')
        self.assertEqual(result['proposals'][0]['object_id'], 'O-eleves')
        self.assertNotIn(key, json.dumps(result))
        self.assertEqual(len(outbound), 1)
        payload = json.loads(outbound[0].data)
        self.assertFalse(payload['store'])
        self.assertEqual(payload['max_output_tokens'], 1800)
        self.assertNotIn(key, json.dumps(payload))
        self.assertEqual(outbound[0].full_url, ai_bridge.API_URL)

    def test_unstructured_output_is_not_applied(self):
        response = {'output': [{'type': 'message', 'content':
                    [{'type': 'output_text', 'text': 'Texte brut, pas JSON.'}]}]}
        result = ai_bridge.sanitize_result(response)
        self.assertEqual(result['proposals'], [])
        self.assertIn('non structurée', result['parse_warning'])


if __name__ == '__main__':
    unittest.main()
