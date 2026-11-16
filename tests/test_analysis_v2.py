"""D-77 global and D-78 Scenario contracts."""
import copy
import json
import unittest
from pathlib import Path

from jsonschema import Draft202012Validator
from tools.validate_analysis import validator

ROOT = Path(__file__).resolve().parents[1]


def read(path):
    return json.loads((ROOT / path).read_text(encoding='utf-8'))


class AnalysisV2Tests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.analysis_validator = validator()
        cls.power_validator = validator(evaluation=True)

    def setUp(self):
        self.analysis = read('tests/cases/analysis_v2.json')
        self.scenario = read('tests/cases/scenario_results_v2.json')

    def test_complete_example_and_three_focus_kinds(self):
        self.analysis_validator.validate(self.analysis)
        self.assertEqual({e['Focus']['type'] for e in self.analysis['power_assessments']}, {'NEED', 'CAN', 'Scenario'})
        self.power_validator.validate(self.scenario)

    def test_global_required_collections_and_context(self):
        schema = read('schemas/trialectic.schema.json')
        for key in schema['required']:
            with self.subTest(missing=key):
                record = copy.deepcopy(self.analysis)
                del record[key]
                self.assertFalse(self.analysis_validator.is_valid(record))

    def test_global_extra_keys_and_wrong_version_rejected(self):
        self.analysis['extra'] = True
        self.assertFalse(self.analysis_validator.is_valid(self.analysis))
        del self.analysis['extra']
        self.analysis['schema_version'] = '1.0.0-reconciled-proposal'
        self.assertFalse(self.analysis_validator.is_valid(self.analysis))

    def test_analysis_focus_uses_approved_object_target(self):
        self.analysis['focus'] = {'type': 'CAN', 'object_id': 'O-start'}
        self.analysis_validator.validate(self.analysis)
        self.analysis['focus'] = {'kind': 'CAN', 'relation': {'id': 'R-start', 'version': 'v1'}}
        self.assertFalse(self.analysis_validator.is_valid(self.analysis))

    def test_empty_collections_and_no_scenario_do_not_imply_impossibility(self):
        schema = read('schemas/trialectic.schema.json')
        for key, value in schema['properties'].items():
            if value.get('type') == 'array':
                self.analysis[key] = []
        self.analysis_validator.validate(self.analysis)  # local shape, not reference validity

    def test_minimal_evaluations(self):
        for record in read('tests/cases/power_evaluation_minimal.json'):
            self.power_validator.validate(record)

    def test_global_collection_types_version_and_discriminator(self):
        original = copy.deepcopy(self.analysis)
        for key, value in [('schema_version', '1.0.0-reconciled-proposal'),
                           ('objects', {}), ('environment', None),
                           ('focus', {'kind': 'SCENARIO', 'scenario_id': 'S0'})]:
            with self.subTest(field=key):
                document = copy.deepcopy(original)
                document[key] = value
                self.assertFalse(self.analysis_validator.is_valid(document))

    def test_scenario_sections_are_objects_with_required_fields(self):
        for key in self.scenario['Results']:
            for value in (None, [], 0, False, '', {}):
                with self.subTest(section=key, value=value):
                    record = copy.deepcopy(self.scenario)
                    record['Results'][key] = value
                    self.assertFalse(self.power_validator.is_valid(record))

    def test_all_five_dimensions_and_uncertainty_are_required(self):
        for key in self.scenario['Results']['scenario_assessment']:
            record = copy.deepcopy(self.scenario)
            del record['Results']['scenario_assessment'][key]
            self.assertFalse(self.power_validator.is_valid(record))

    def test_dimension_assessed_requires_finding_without_numeric_score(self):
        dimension = self.scenario['Results']['scenario_assessment']['feasibility']
        dimension['status'] = 'assessed'
        self.assertFalse(self.power_validator.is_valid(self.scenario))
        dimension['finding'] = 'Feasible only under the explicitly assumed starting conditions.'
        self.power_validator.validate(self.scenario)
        dimension['status'] = 'feasible'
        self.assertFalse(self.power_validator.is_valid(self.scenario))

    def test_unknown_applicability_does_not_force_result_or_winner(self):
        assessment = self.scenario['Results']['scenario_assessment']
        for dimension in ['feasibility', 'complexity', 'costs_resources', 'temporality', 'expected_effectiveness']:
            assessment[dimension]['status'] = 'not_assessed'
        self.power_validator.validate(self.scenario)
        self.assertNotIn('selection', self.scenario['Results']['comparisons'])

    def test_actualization_reference_is_distinct_from_event(self):
        item = self.scenario['Results']['actualization_assessments']['items'][0]
        for key in ('can_object_id', 'evaluation_id', 'contemplated_actualization', 'justification'):
            record = copy.deepcopy(self.scenario)
            del record['Results']['actualization_assessments']['items'][0][key]
            self.assertFalse(self.power_validator.is_valid(record))
        item['contemplated_actualization'] = ''
        self.assertFalse(self.power_validator.is_valid(self.scenario))

    def test_effects_are_justified_references_with_scoped_coverage(self):
        section = self.scenario['Results']['effects']
        section['items'] = [{'effect_id': 'E-hypothesis', 'justification': 'Anticipated only.'}]
        self.power_validator.validate(self.scenario)
        section['items'] = ['E-hypothesis']
        self.assertFalse(self.power_validator.is_valid(self.scenario))

    def test_comparison_criteria_and_optional_selection(self):
        section = self.scenario['Results']['comparisons']
        section['items'] = [{'scenario_id': 'S-other', 'criteria': [
            {'criterion': 'resources', 'finding': 'Unknown relative cost.', 'justification': 'No cost data.'}],
            'justification': 'Explicit alternative, no global ranking.'}]
        self.power_validator.validate(self.scenario)
        section['selection'] = {'scenario_id': 'S-other', 'justification': 'Illustrative explicit preference.'}
        self.power_validator.validate(self.scenario)
        section['items'][0]['criteria'] = []
        self.assertFalse(self.power_validator.is_valid(self.scenario))

    def test_degrees_require_basis_but_have_no_universal_range(self):
        dimension = self.scenario['Results']['scenario_assessment']['costs_resources']
        dimension['degree'] = {'value': 25000, 'measure': 'EUR', 'basis': 'Synthetic budget assumption.'}
        self.power_validator.validate(self.scenario)
        del dimension['degree']['basis']
        self.assertFalse(self.power_validator.is_valid(self.scenario))

    def test_effect_simulation_is_not_observation(self):
        schema = read('schemas/trialectic.schema.json')
        check = Draft202012Validator({'$schema': schema['$schema'], '$defs': schema['$defs'], '$ref': '#/$defs/effect'})
        effect = dict(id='FX-1', scenario_id='S0', target_object={'id': 'O-room', 'version': 'v1'},
                      description='Hypothetical effect.', causality='direct', timing='delayed', evidence_status='simulated')
        check.validate(effect)
        effect['evidence_status'] = 'proven'
        self.assertFalse(check.is_valid(effect))

    def test_extensions_and_identifiers_are_not_tightened_in_evaluations(self):
        self.scenario['ID'] = {'legacy': 'identity'}
        self.scenario['Results']['scenario_assessment']['feasibility']['extension'] = []
        self.power_validator.validate(self.scenario)


if __name__ == '__main__':
    unittest.main()
