"""Exercise real upstream validation and branch isolation, not UI snapshots."""
import copy
import unittest
import json
from pathlib import Path
from server import fixture, validate

class PrototypeChecks(unittest.TestCase):
    def test_focus_case_is_structural_and_keeps_unknowns(self):
        doc = json.loads((Path(__file__).parent / 'examples/focus-pilot.json').read_text('utf-8'))
        self.assertFalse([x for x in validate(doc) if x['severity'] == 'error'])
        self.assertEqual(doc['focus'], {'type': 'Scenario', 'scenario_id': 'S-02'})
        self.assertEqual(len(doc['scenarios']), 4)
        scopes={s['id']:{h['id'] for h in s['object_heads']} for s in doc['scenarios']}
        self.assertIn('C-clim', scopes['S-02'])
        self.assertNotIn('C-horaires', scopes['S-02'])
        self.assertTrue({'O-riverains','O-reseau'} <= scopes['S-02'])
        self.assertIn('C-horaires', scopes['S-01'])
        self.assertNotIn('C-clim', scopes['S-01'])
        for name in ('events', 'effects', 'power_assessments'):
            self.assertEqual(doc[name], [])
        self.assertTrue(any(c['status'] == 'indeterminate' for c in doc['condition_assessments']))

    def test_examples_and_branch_isolation(self):
        for name in ('generator', 'identity', 'affiliations'):
            doc = fixture(name)
            self.assertFalse([x for x in validate(doc) if x['severity'] == 'error'])
        doc = fixture('generator')
        self.assertEqual(doc['scenarios'][0]['states'][0]['values']['charged'], True)
        self.assertEqual(doc['scenarios'][1]['states'][0]['values']['charged'], False)
        self.assertFalse([e for e in doc['power_assessments'] if e['Context'].get('scenario_id') == 'S-ui-grid'])

    def test_invalid_documents_are_rejected(self):
        doc = fixture('affiliations')
        bad = copy.deepcopy(doc)
        bad['objects'][0]['concept_kind'] = 'BOTH'
        self.assertTrue(validate(bad))
        bad = copy.deepcopy(doc)
        bad['relations'][0]['represented_object']['id'] = 'O-missing'
        self.assertTrue(any(x['severity']=='error' for x in validate(bad)))

if __name__ == '__main__':
    unittest.main()
