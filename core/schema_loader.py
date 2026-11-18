"""Pure assembly of the existing modular Analysis/PowerEvaluation JSON Schemas.

The caller controls file access with a read_json callback. This module does not
read private Analysis data, validate documents, or make conceptual decisions.
The shape and order of the assembled schemas are preserved from the original
tools/validate_analysis.py and applications/tria-mcp/server.py implementations.
"""
from pathlib import Path


class DuplicateSchemaDefinition(ValueError):
    """Two source files define the same name within one schema namespace."""


def assemble_schemas(model_dir, read_json):
    """Build (Analysis, PowerEvaluation) from existing modular sources.

    read_json(path: Path) must return decoded JSON. In particular, the MCP
    adapter retains its allowlisted, size-limited reader: no filesystem
    access policy is bypassed by this shared assembly function.
    """
    model_dir = Path(model_dir)
    analysis = read_json(model_dir / "analysis.json")
    evaluation = read_json(model_dir / "power-evaluation.json")
    evaluation["properties"].update(read_json(model_dir / "evaluation-context.json"))
    analysis_defs = {}
    evaluation_defs = {}
    for path in sorted((model_dir / "types").rglob("*.json")):
        target = evaluation_defs if path.parent.name == "evaluation" else analysis_defs
        for key, value in read_json(path).items():
            if key in target:
                raise DuplicateSchemaDefinition(f"Duplicate definition {key} in {path}")
            target[key] = value
    analysis["$defs"] = analysis_defs
    evaluation["$defs"] = evaluation_defs
    return analysis, evaluation
