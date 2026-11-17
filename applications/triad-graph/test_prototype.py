"""Exercise real upstream validation and branch isolation, not UI snapshots."""
import copy
import unittest
from server import fixture, validate

class PrototypeChecks(unittest.TestCase):
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
