"""Detect orphaned test fixtures when the documented decision registry changes.

This is a *structural* check only. It cannot prove that changed prose still
entails the previously approved test expectations.
"""

import json
import pathlib
import re
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]


class TraceabilityTests(unittest.TestCase):
    def test_golden_cases_reference_existing_decisions(self):
        decisions_file = ROOT / "DECISIONS.md"
        self.assertTrue(decisions_file.is_file(), "Repository decision log is required")
        actual = set(re.findall(r"^## (D-\d+) ·", decisions_file.read_text(encoding="utf-8"), re.M))
        self.assertTrue(actual, "Could not parse decision IDs")
        fixture = json.loads((ROOT / "tests/cases/core.json").read_text(encoding="utf-8"))
        for case in fixture["cases"]:
            with self.subTest(case=case["id"]):
                self.assertTrue(set(case["decisions"]) <= actual,
                                f"Orphaned decisions for {case['id']}: {set(case['decisions']) - actual}")

    def test_canonical_reference_is_present(self):
        self.assertTrue((ROOT / "reference/trialectic-method.md").is_file())


if __name__ == "__main__":
    unittest.main()
