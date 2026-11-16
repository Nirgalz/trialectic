"""D-76 loss-aware reconciliation. No inferred evidence, versions or applicability.

The output envelope is experimental; its PowerEvaluation items are normative.
Run: python tools/reconcile_proposal_v0.py SOURCE PLAN OUTPUT
"""
from __future__ import annotations

import argparse
import copy
import json
from pathlib import Path

from jsonschema import Draft202012Validator

ROOT = Path(__file__).resolve().parents[1]
POWER = json.loads((ROOT / 'schemas/power-evaluation.schema.json').read_text(encoding='utf-8'))


class ReconciliationError(ValueError):
    """Source data or explicit supplemental information is inadequate."""


def reconcile(source, plan):
    """Return a new document, or fail without changing either argument.

    Plan evaluations are keyed by legacy ID and supply Context, Results and
    Dependencies; Subject is also required for old NEED records. These are
    explicit source supplements, not defaults or a claim of empirical truth.
    """
    if source.get('schema_version') != '0.1.0-proposal':
        raise ReconciliationError('Expected source version 0.1.0-proposal')
    result = copy.deepcopy(source)
    records = source.get('need_assessments', []) + source.get('power_assessments', [])
    ids = [r['id'] for r in records]
    if len(ids) != len(set(ids)):
        raise ReconciliationError('Ambiguous duplicate legacy evaluation IDs')
    if set(plan.get('evaluations', {})) != set(ids):
        raise ReconciliationError('Supply one explicit evaluation supplement per legacy record')
    definitions = {(d['object_id'], d['version']) for d in source.get('definitions', [])}
    relations = {}
    for relation in source.get('relations', []):
        key = (relation['id'], relation['version'])
        if key in relations:
            raise ReconciliationError('Ambiguous relation version: ' + str(key))
        relations[key] = relation

    def object_focus(ref, kind):
        relation = relations.get((ref.get('id'), ref.get('version')))
        if not relation or relation.get('type') != kind:
            raise ReconciliationError('Missing or mismatched Focus relation')
        target = relation.get('represented_object')
        if not target or (target.get('id'), target.get('version')) not in definitions:
            raise ReconciliationError('Missing represented Object or historical version')
        return {'type': kind, 'object_id': target['id']}, target

    converted = []
    for old in records:
        supplement = copy.deepcopy(plan['evaluations'][old['id']])
        for key in ['Context', 'Results', 'Dependencies']:
            if key not in supplement:
                raise ReconciliationError(old['id'] + ': missing explicit ' + key)
        target = None
        if 'need_relation' in old:
            focus, target = object_focus(old['need_relation'], 'NEED')
        else:
            legacy_focus = old.get('focus', {})
            kind = legacy_focus.get('kind')
            if kind in ('NEED', 'CAN'):
                focus, target = object_focus(legacy_focus.get('relation', {}), kind)
            elif kind == 'SCENARIO' and legacy_focus.get('scenario_id'):
                focus = {'type': 'Scenario', 'scenario_id': legacy_focus['scenario_id']}
            else:
                raise ReconciliationError('Unresolved Focus: ' + old['id'])
        subject = supplement.get('Subject')
        if 'subject' in old:
            derived = {'object_id': old['subject']['id']}
            if subject is not None and subject.get('object_id') != derived['object_id']:
                raise ReconciliationError('Subject identity cannot change during migration')
            subject = subject or derived
        if subject is None:
            raise ReconciliationError('Supply missing Subject: ' + old['id'])
        context = supplement['Context']
        pins = context.get('definition_versions', {})
        if not pins or any((k, v) not in definitions for k, v in pins.items()):
            raise ReconciliationError('Missing or unknown historical version pins')
        for ref in [target, old.get('subject')]:
            if ref and pins.get(ref['id']) != ref['version']:
                raise ReconciliationError('Focus/Subject version pin mismatch')
        if subject.get('object_id') not in pins:
            raise ReconciliationError('Subject version pin missing')
        if 'scenario_id' in old:
            if context.get('scenario_id', old['scenario_id']) != old['scenario_id']:
                raise ReconciliationError('Scenario change is not a migration')
            context['scenario_id'] = old['scenario_id']
        if focus['type'] == 'Scenario' and context.get('scenario_id', focus['scenario_id']) != focus['scenario_id']:
            raise ReconciliationError('Scenario Focus/context mismatch')
        if 'at' in old:
            if context.get('at', old['at']) != old['at']:
                raise ReconciliationError('Timestamp change is not a migration')
            context['at'] = old['at']
        provenance = context.setdefault('provenance', {})
        if 'legacy_record' in provenance:
            raise ReconciliationError('Reserved migration provenance key')
        provenance['legacy_record'] = copy.deepcopy(old)
        provenance['migration'] = 'proposal-v0-to-reconciled-v1/D-76'
        evaluation_id = supplement.get('ID', old['id'])
        dependencies = supplement['Dependencies']
        links = set(old.get('related_power_assessment_ids', []) + old.get('need_assessment_ids', []))
        classifications = supplement.get('link_classifications', {})
        if set(classifications) != links:
            raise ReconciliationError('Classify every legacy analytical/revision link')
        for link, classification in classifications.items():
            target_id = plan['evaluations'].get(link, {}).get('ID', link)
            if classification not in ('input', 'revision', 'input_and_revision'):
                raise ReconciliationError('Unclassified legacy link: ' + link)
            if classification in ('input', 'input_and_revision'):
                if not any(d.get('evaluation_id') == target_id for d in dependencies):
                    raise ReconciliationError('Analytical input missing from Dependencies')
            if classification in ('revision', 'input_and_revision'):
                if provenance.get('revises') != target_id:
                    raise ReconciliationError('Revision predecessor missing or inconsistent')
        if 'revises' in provenance and evaluation_id == old['id']:
            raise ReconciliationError('Revision requires a new evaluation ID')
        results = supplement['Results']
        if focus['type'] == 'CAN' and 'actualizability' in old:
            if results.get('actualizability', {}).get('status') != old['actualizability']:
                raise ReconciliationError('Do not silently revise Actualizability')
        if 'need_relation' in old:
            if results.get('effective_satisfaction', {}).get('status') != old['effective_satisfaction']:
                raise ReconciliationError('Do not silently revise effective satisfaction')
            temporal = results.get('temporal_compliance', {})
            if temporal.get('status') != old['temporal_compliance'] and old['temporal_compliance'] != 'indeterminate':
                raise ReconciliationError('Temporal status requires an explicit revision, not migration')
        if 'degree' in old:
            if focus['type'] not in ('NEED', 'CAN'):
                raise ReconciliationError('No approved Scenario degree target')
            degree = results.get('effective_satisfaction' if focus['type'] == 'NEED' else 'actualizability', {}).get('degree')
            equivalence = supplement.get('degree_equivalence')
            if not degree or not isinstance(equivalence, str) or not equivalence.strip():
                raise ReconciliationError('Degree requires documented unit/basis equivalence')
            if degree.get('value') != old['degree']['value']:
                raise ReconciliationError('Numeric conversion requires a separate reviewed adapter')
            provenance['degree_equivalence'] = equivalence
        record = dict(ID=evaluation_id, Subject=subject, Focus=focus, Context=context,
                      Dependencies=dependencies, Results=results)
        try:
            Draft202012Validator(POWER).validate(record)
        except Exception as error:
            raise ReconciliationError(old['id'] + ': ' + str(error)) from error
        converted.append(record)
    new_ids = [r['ID'] for r in converted]
    if any(new_ids.count(i) != 1 for i in new_ids):
        raise ReconciliationError('Duplicate output evaluation identity')
    for relation in result.get('relations', []):
        key = relation['id'] + '@' + relation['version']
        composition = relation.get('relation', {}).get('composition')
        if composition is not None and not isinstance(composition, list):
            replacement = plan.get('relation_compositions', {}).get(key)
            if not replacement or not isinstance(replacement.get('justification'), str) or not replacement['justification'].strip():
                raise ReconciliationError('Explicit approved Object composition needed: ' + key)
            relation['relation']['composition'] = copy.deepcopy(replacement['value'])
    for family in ('relations', 'conditions'):
        for index, owner in enumerate(result.get(family, [])):
            temporal = owner.get('temporal', {})
            if 'composition' in temporal and 'op' in temporal['composition']:
                key = '/' + family + '/' + str(index) + '/temporal'
                replacement = plan.get('temporal_compositions', {}).get(key)
                if not replacement or not isinstance(replacement.get('justification'), str) or not replacement['justification'].strip():
                    raise ReconciliationError('Explicit approved temporal composition needed: ' + key)
                temporal['composition'] = copy.deepcopy(replacement['value'])
    result['schema_version'] = '1.0.0-reconciled-proposal'
    result['legacy_assessments'] = {key: result.pop(key, []) for key in ['need_assessments', 'power_assessments']}
    result['power_assessments'] = converted
    result['migration_provenance'] = {'source_version': source['schema_version'], 'plan': copy.deepcopy(plan),
                                      'source_document': copy.deepcopy(source)}
    # Resolve the normative profile locally; never fetch schemas from the network.
    from referencing import Registry, Resource
    schema = json.loads((ROOT / 'schemas/normalized-v1/trialectic.schema.json').read_text(encoding='utf-8'))
    registry = Registry().with_resource(POWER['$id'], Resource.from_contents(POWER))
    try:
        Draft202012Validator(schema, registry=registry).validate(result)
    except Exception as error:
        raise ReconciliationError('Reconciled envelope: ' + str(error)) from error
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    parser.add_argument('plan', type=Path)
    parser.add_argument('output', type=Path)
    args = parser.parse_args()
    try:
        result = reconcile(json.loads(args.source.read_text(encoding='utf-8')),
                           json.loads(args.plan.read_text(encoding='utf-8')))
        # Exclusive create: never overwrite an existing source, plan or output.
        with args.output.open('x', encoding='utf-8') as stream:
            json.dump(result, stream, ensure_ascii=False, indent=2)
            stream.write('\n')
    except (ValueError, KeyError, TypeError, OSError) as error:
        parser.exit(1, 'Reconciliation blocked: ' + str(error) + '\n')


if __name__ == '__main__':
    main()
