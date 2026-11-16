"""Offline structural validation of D-77/D-78 Analysis/PowerEvaluation v2.

This command does not establish referential integrity, causal or empirical truth.
Run: python tools/validate_analysis.py DOCUMENT [--evaluation]
"""
import argparse
import json
from pathlib import Path

from jsonschema import Draft202012Validator
from referencing import Registry, Resource

ROOT = Path(__file__).resolve().parents[1]


MODEL = ROOT / "schemas" / "model"


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def load_schemas():
    analysis = read(MODEL / "analysis.json")
    evaluation = read(MODEL / "power-evaluation.json")
    evaluation["properties"].update(read(MODEL / "evaluation-context.json"))
    analysis_defs = {}
    evaluation_defs = {}
    for path in sorted((MODEL / "types").rglob("*.json")):
        target = evaluation_defs if path.parent.name == "evaluation" else analysis_defs
        for key, value in read(path).items():
            if key in target:
                raise ValueError(f"Duplicate definition {key} in {path}")
            target[key] = value
    analysis["$defs"] = analysis_defs
    evaluation["$defs"] = evaluation_defs
    return analysis, evaluation


def validator(evaluation=False):
    analysis, power = load_schemas()
    for schema in (power, analysis):
        Draft202012Validator.check_schema(schema)
    registry = Registry().with_resources((s['$id'], Resource.from_contents(s)) for s in (power, analysis))
    return Draft202012Validator(power if evaluation else analysis, registry=registry)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('document', type=Path)
    parser.add_argument('--evaluation', action='store_true')
    args = parser.parse_args()
    try:
        document = json.loads(args.document.read_text(encoding='utf-8'))
        errors = list(validator(args.evaluation).iter_errors(document))
        if errors:
            for error in errors:
                print('/' + '/'.join(map(str, error.absolute_path)) + ': ' + error.message)
            parser.exit(1)
    except (OSError, ValueError) as error:
        parser.exit(1, str(error) + '\n')
    print('Valid v2 local structure; semantic and empirical validation not asserted.')


if __name__ == '__main__':
    main()
