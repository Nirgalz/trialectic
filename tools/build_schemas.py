"""Build published Draft 2020-12 resources from the unified model sources."""
import argparse
import json
from pathlib import Path

SCHEMAS = Path(__file__).resolve().parents[1] / "schemas"
MODEL = SCHEMAS / "model"


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def build():
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
    return {"trialectic.schema.json": analysis, "power-evaluation.v2.schema.json": evaluation}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Fail if the published files differ")
    args = parser.parse_args()
    for name, content in build().items():
        path = SCHEMAS / name
        if path.exists() and read(path) == content:
            continue
        if args.check:
            parser.exit(1, f"Regenerate {name} with python tools/build_schemas.py\n")
        path.write_text(json.dumps(content, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
