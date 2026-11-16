"""Normative local profile: approved assertions, compatibility and OPEN guards."""
import copy
import json

from jsonschema import Draft202012Validator
import test_power_evaluation_schema as boundary

ROOT = boundary.ROOT


class NormativeSchemaTests(boundary.PowerEvaluationBoundarySchemaTests):
    """Inherit every positive/negative regression against the normative artifact."""

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.schema = json.loads((ROOT / 'schemas/power-evaluation.schema.json').read_text(encoding='utf-8'))
        Draft202012Validator.check_schema(cls.schema)
        cls.validator = Draft202012Validator(cls.schema)
        cls.minimal = json.loads((ROOT / 'tests/cases/power_evaluation_minimal.json').read_text(encoding='utf-8'))

    def test_minimal_examples(self):
        self.assertEqual([r['Focus']['type'] for r in self.minimal], ['NEED', 'CAN', 'Scenario'])
        for record in self.minimal:
            with self.subTest(focus=record['Focus']['type']):
                self.assert_valid(record)

    def test_assertion_parity_with_legacy_schema(self):
        def assertions(value):
            if isinstance(value, dict):
                # Empty / annotation-only schemas are equivalent to true.
                result = {k: assertions(v) for k, v in value.items()
                          if k not in ('$id', '$comment', 'title', 'description')}
                if 'properties' in result:
                    result['properties'] = {k: v for k, v in result['properties'].items() if v != {}}
                    if not result['properties']:
                        del result['properties']
                return result
            if isinstance(value, list):
                return [assertions(v) for v in value]
            return {} if value is True else value
        legacy = json.loads((ROOT / 'schemas/power-evaluation.boundaries.schema.json').read_text(encoding='utf-8'))
        self.assertEqual(assertions(self.schema), assertions(legacy))

    def test_scenario_inner_types_remain_open(self):
        for value in [None, False, 0, '', [], {}, {'unapproved': [1]}]:
            record = copy.deepcopy(self.minimal[2])
            record['Results'] = {k: value for k in record['Results']}
            self.assert_valid(record)

    def test_id_and_focus_reference_value_types_remain_open(self):
        for template in self.minimal:
            for value in [None, False, 0, '', [], {}]:
                record = copy.deepcopy(template)
                record['ID'] = value
                key = 'scenario_id' if record['Focus']['type'] == 'Scenario' else 'object_id'
                record['Focus'][key] = value
                self.assert_valid(record)

    def test_minimal_required_sections_cannot_be_omitted(self):
        for template in self.minimal:
            for key in template['Results']:
                record = copy.deepcopy(template)
                del record['Results'][key]
                self.assert_invalid(record)
