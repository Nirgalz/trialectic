"""Regression of shared schema assembly and caller-owned file access."""
import json
import tempfile
import unittest
from pathlib import Path

from core.schema_loader import assemble_schemas, DuplicateSchemaDefinition
from tools.validate_analysis import load_schemas

ROOT = Path(__file__).resolve().parents[1]
MODEL = ROOT / "schemas" / "model"


class SchemaAssemblyTests(unittest.TestCase):
    def test_shared_assembly_is_same_as_offline_validator(self):
        seen = []

        def controlled_read(path):
            self.assertTrue(path.is_relative_to(MODEL))
            seen.append(path)
            return json.loads(path.read_text(encoding="utf-8"))

        actual = assemble_schemas(MODEL, controlled_read)
        self.assertEqual(actual, load_schemas())
        expected_reads = [
            MODEL / "analysis.json",
            MODEL / "power-evaluation.json",
            MODEL / "evaluation-context.json",
            *sorted((MODEL / "types").rglob("*.json")),
        ]
        self.assertEqual(seen, expected_reads)
        self.assertIn("$defs", actual[0])
        self.assertIn("$defs", actual[1])

    def test_duplicate_names_within_one_namespace_are_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            model = Path(tmp)
            (model / "types").mkdir()
            for name in ("analysis.json", "power-evaluation.json"):
                (model / name).write_text('{"properties":{}}', encoding="utf-8")
            (model / "evaluation-context.json").write_text("{}", encoding="utf-8")
            (model / "types" / "a.json").write_text('{"duplicate":{}}', encoding="utf-8")
            (model / "types" / "b.json").write_text('{"duplicate":{}}', encoding="utf-8")

            def read(path):
                return json.loads(path.read_text(encoding="utf-8"))

            with self.assertRaisesRegex(DuplicateSchemaDefinition, "duplicate"):
                assemble_schemas(model, read)

    def test_analysis_and_evaluation_definition_namespaces_stay_separate(self):
        with tempfile.TemporaryDirectory() as tmp:
            model = Path(tmp)
            (model / "types" / "evaluation").mkdir(parents=True)
            for name in ("analysis.json", "power-evaluation.json"):
                (model / name).write_text('{"properties":{}}', encoding="utf-8")
            (model / "evaluation-context.json").write_text("{}", encoding="utf-8")
            (model / "types" / "a.json").write_text('{"shared": {"type":"string"}}', encoding="utf-8")
            (model / "types" / "evaluation" / "b.json").write_text('{"shared": {"type":"number"}}', encoding="utf-8")
            a, p = assemble_schemas(model, lambda path: json.loads(path.read_text("utf-8")))
            self.assertEqual(a["$defs"]["shared"]["type"], "string")
            self.assertEqual(p["$defs"]["shared"]["type"], "number")


if __name__ == "__main__":
    unittest.main()
