"""D-76 real migration regressions, including incomplete/ambiguous source data."""
import copy
import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
import unittest

from jsonschema import Draft202012Validator
from tools import reconcile_proposal_v0 as migration

ROOT = Path(__file__).resolve().parents[1]
from referencing import Registry, Resource

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('reconcile', ROOT / 'tools/reconcile_proposal_v0.py')
migration = importlib.util.module_from_spec(spec)
spec.loader.exec_module(migration)


def read(path):
    return json.loads((ROOT / path).read_text(encoding='utf-8'))


class ReconciliationTests(unittest.TestCase):
    def setUp(self):
        self.source = read('schemas/proposal-v0/example.json')
        self.plan = read('schemas/normalized-v1/migration-plan.example.json')
        self.schema = read('schemas/normalized-v1/trialectic.schema.json')
        power = read('schemas/power-evaluation.schema.json')
        self.registry = Registry().with_resource(power['$id'], Resource.from_contents(power))
        self.validator = Draft202012Validator(self.schema, registry=self.registry)

    def run_migration(self):
        return migration.reconcile(self.source, self.plan)

    def test_example_is_reproducible_and_inputs_are_immutable(self):
        before = copy.deepcopy((self.source, self.plan))
        output = self.run_migration()
        self.assertEqual(output, read('schemas/normalized-v1/example.json'))
        self.assertEqual((self.source, self.plan), before)
        self.assertEqual(output['migration_provenance']['source_document'], self.source)
        Draft202012Validator.check_schema(self.schema)
        self.validator.validate(output)

    def test_identity_targets_represented_object_not_bearer_or_relation(self):
        records = self.run_migration()['power_assessments']
        self.assertEqual(records[0]['Focus'], {'type': 'NEED', 'object_id': 'O-continuity'})
        self.assertEqual(records[1]['Focus'], {'type': 'CAN', 'object_id': 'O-start'})
        self.assertEqual(records[1]['Subject']['object_id'], 'O-generator')
        self.assertNotIn('actualizability', records[0]['Results'])

    def test_no_scenario_or_timestamp_is_fabricated(self):
        for key in ('need_assessments', 'power_assessments'):
            for record in self.source[key]:
                record.pop('scenario_id', None)
                record.pop('at', None)
        for record in self.run_migration()['power_assessments']:
            self.assertNotIn('scenario_id', record['Context'])
            self.assertNotIn('at', record['Context'])

    def test_missing_unknown_or_wrong_version_pins_block(self):
        for pins in ({}, {'O-start': 'not-known'}, {'O-start': 'v1'}):
            with self.subTest(pins=pins):
                self.plan['evaluations']['PA-start']['Context']['definition_versions'] = pins
                with self.assertRaises(migration.ReconciliationError):
                    self.run_migration()

    def test_missing_or_ambiguous_relation_blocks(self):
        for mode in ('missing', 'duplicate', 'wrong_kind', 'no_object'):
            with self.subTest(mode=mode):
                original = copy.deepcopy(self.source)
                if mode == 'missing':
                    self.source['relations'] = []
                elif mode == 'duplicate':
                    self.source['relations'].append(copy.deepcopy(self.source['relations'][0]))
                elif mode == 'wrong_kind':
                    self.source['relations'][0]['type'] = 'NEED'
                else:
                    del self.source['relations'][0]['represented_object']
                with self.assertRaises(migration.ReconciliationError):
                    self.run_migration()
                self.source = original

    def test_scalar_unknown_compliance_requires_explicit_applicability(self):
        self.source['need_assessments'][0]['temporal_compliance'] = 'indeterminate'
        result = self.plan['evaluations']['NA-room']['Results']['temporal_compliance']
        result.clear()
        result.update(applicability='not_applicable', justification='Explicit synthetic source supplement: no time obligation.')
        self.run_migration()
        del result['applicability']
        with self.assertRaises(migration.ReconciliationError):
            self.run_migration()

    def test_authorized_interruption_keeps_effective_and_temporal_results_separate(self):
        self.source['need_assessments'][0]['temporal_compliance'] = 'satisfied'
        results = self.plan['evaluations']['NA-room']['Results']
        results['temporal_compliance'].update(applicability='applicable', status='satisfied',
                                             applied_exceptions=['EX-synthetic'])
        record = self.run_migration()['power_assessments'][0]
        self.assertEqual(record['Results']['effective_satisfaction']['status'], 'unsatisfied')
        self.assertEqual(record['Results']['temporal_compliance']['status'], 'satisfied')

    def test_no_default_justification_search_or_coverage(self):
        for field in ('justification', 'search_status', 'coverage'):
            with self.subTest(field=field):
                result = self.plan['evaluations']['PA-start']['Results']['potential_contributions']
                value = result.pop(field)
                with self.assertRaises(migration.ReconciliationError):
                    self.run_migration()
                result[field] = value

    def test_unclassified_link_blocks_then_input_and_revision_are_distinguished(self):
        old = self.source['power_assessments'][0]
        old['related_power_assessment_ids'] = ['NA-room']
        supplement = self.plan['evaluations']['PA-start']
        with self.assertRaises(migration.ReconciliationError):
            self.run_migration()
        supplement['link_classifications'] = {'NA-room': 'input'}
        supplement['Dependencies'] = [{'evaluation_id': 'NA-room'}]
        record = self.run_migration()['power_assessments'][1]
        self.assertNotIn('revises', record['Context']['provenance'])
        prior = copy.deepcopy(old)
        prior['id'] = 'PA-earlier'
        prior.pop('related_power_assessment_ids')
        self.source['power_assessments'].append(prior)
        prior_plan = copy.deepcopy(supplement)
        prior_plan.pop('link_classifications')
        prior_plan['Dependencies'] = []
        self.plan['evaluations']['PA-earlier'] = prior_plan
        old['related_power_assessment_ids'] = ['PA-earlier']
        supplement['link_classifications'] = {'PA-earlier': 'revision'}
        supplement['Dependencies'] = []
        supplement['Context']['provenance'] = {'revises': 'PA-earlier'}
        with self.assertRaises(migration.ReconciliationError):
            self.run_migration()
        supplement['ID'] = 'PA-new'
        record = self.run_migration()['power_assessments'][1]
        self.assertEqual(record['Context']['provenance']['revises'], 'PA-earlier')
        self.assertEqual(record['Dependencies'], [])

    def test_degree_needs_documented_equivalence_and_preserves_source(self):
        old = self.source['power_assessments'][0]
        old['degree'] = dict(value=12, unit='km', method='stipulated', justification='Synthetic only.')
        supplement = self.plan['evaluations']['PA-start']
        with self.assertRaises(migration.ReconciliationError):
            self.run_migration()
        supplement['Results']['actualizability']['degree'] = dict(value=12, measure='km', basis='Stipulated illustrative measure.')
        supplement['degree_equivalence'] = 'Same value and km unit; basis preserves the stipulated method.'
        record = self.run_migration()['power_assessments'][1]
        self.assertEqual(record['Context']['provenance']['legacy_record']['degree'], old['degree'])
        self.assertEqual(record['Results']['actualizability']['degree']['value'], 12)

    def test_composition_needs_explicit_adapter_and_keeps_d37_shape(self):
        self.plan['relation_compositions'] = {}
        with self.assertRaises(migration.ReconciliationError):
            self.run_migration()

    def test_recursive_condition_grammar_is_not_temporal_grammar(self):
        output = self.run_migration()
        relation = output['relations'][0]
        self.assertEqual(relation['relation']['composition'], [{'objects': ['O-battery', 'O-grid'], 'operator': 'any'}])
        relation['temporal'] = {'time_zone': 'UTC', 'requirements': [], 'estimates': [],
                                'composition': {'operator': 'all', 'requirements': ['R1']}}
        self.validator.validate(output)
        relation['temporal']['composition'] = {'op': 'all', 'items': [{'ref': {'kind': 'temporal_requirement', 'id': 'R1', 'version': 'v1'}}]}
        self.assertFalse(self.validator.is_valid(output))

    def test_temporal_condition_conversion_requires_explicit_plan(self):
        self.source['conditions'][0]['temporal'] = {
            'time_zone': 'UTC', 'requirements': [], 'estimates': [],
            'composition': {'op': 'all', 'items': [{'ref': {'kind': 'temporal_requirement', 'id': 'R1', 'version': 'v1'}}]}}
        with self.assertRaises(migration.ReconciliationError):
            self.run_migration()
        self.plan['temporal_compositions'] = {'/conditions/0/temporal': {
            'value': {'operator': 'all', 'requirements': ['R1']},
            'justification': 'Explicit synthetic group conversion; reference existence remains semantic.'}}
        self.assertEqual(self.run_migration()['conditions'][0]['temporal']['composition']['operator'], 'all')

    def test_embedded_evaluation_is_not_tightened_by_transport_profile(self):
        output = self.run_migration()
        record = output['power_assessments'][0]
        record['ID'] = {'unstandardized': 'value'}
        record['Focus']['object_id'] = None
        record['Subject']['object_id'] = 'an ID outside the transport regex'
        record['Subject']['extra_metadata'] = True
        self.validator.validate(output)  # local profile acceptance, no semantic claim

    def test_scenario_sections_are_required_but_internals_remain_open(self):
        output = self.run_migration()
        output['power_assessments'] = read('tests/cases/power_evaluation_minimal.json')[2:]
        self.validator.validate(output)
        del output['power_assessments'][0]['Results']['effects']
        self.assertFalse(self.validator.is_valid(output))

    def test_missing_supplement_and_duplicate_ids_block(self):
        saved = copy.deepcopy(self.plan)
        del self.plan['evaluations']['NA-room']
        with self.assertRaises(migration.ReconciliationError):
            self.run_migration()
        self.plan = saved
        self.source['power_assessments'].append(copy.deepcopy(self.source['power_assessments'][0]))
        with self.assertRaises(migration.ReconciliationError):
            self.run_migration()

    def test_cli_creates_output_and_refuses_overwrite_or_incomplete_plan(self):
        with tempfile.TemporaryDirectory(dir=ROOT) as directory:
            output = Path(directory) / 'result.json'
            command = [sys.executable, str(ROOT / 'tools/reconcile_proposal_v0.py'),
                       str(ROOT / 'schemas/proposal-v0/example.json'),
                       str(ROOT / 'schemas/normalized-v1/migration-plan.example.json'), str(output)]
            first = subprocess.run(command, capture_output=True, text=True)
            self.assertEqual(first.returncode, 0, first.stderr)
            saved = output.read_bytes()
            second = subprocess.run(command, capture_output=True, text=True)
            self.assertNotEqual(second.returncode, 0)
            self.assertEqual(saved, output.read_bytes())
            bad_plan = Path(directory) / 'bad-plan.json'
            bad_plan.write_text('{}', encoding='utf-8')
            absent_output = Path(directory) / 'absent.json'
            command[-2:] = [str(bad_plan), str(absent_output)]
            blocked = subprocess.run(command, capture_output=True, text=True)
            self.assertNotEqual(blocked.returncode, 0)
            self.assertFalse(absent_output.exists())


if __name__ == '__main__':
    unittest.main()
