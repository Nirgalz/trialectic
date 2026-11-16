# Unified model sources

Version 2.0.0 is the current exchange contract. Analysis and PowerEvaluation are its two document types. The offline validator assembles both schemas in memory from this directory.

| Source | Responsibility |
| --- | --- |
| analysis.json | Analysis envelope and collections |
| power-evaluation.json, evaluation-context.json | Evaluation envelope, Focus dispatch, Subject, Focus, Context and Dependencies |
| types/evaluation/ | Shared field types and separate NEED, CAN and Scenario Results |
| types/ | Domain families, including Objects, relations, temporal requirements, conditions and pathways, Scenarios, events and effects, and evidence and claims |

Each type file maps names to definitions. The loader merges the context fields into PowerEvaluation and attaches each family to the appropriate schema under `$defs`. It registers both schema identifiers locally so Analysis can reference PowerEvaluation. The entry files depend on this assembly step.

From the repository root, install the test requirements and validate either document type:

```sh
python -m pip install -r requirements-test.txt
python tools/validate_analysis.py tests/cases/analysis_v2.json
python tools/validate_analysis.py tests/cases/scenario_results_v2.json --evaluation
```

Python consumers can call `tools.validate_analysis.validator()` for Analysis or `validator(evaluation=True)` for PowerEvaluation. See the [field reference](../global-model.md) for the contract and [test guide](../../tests/README.md) for regressions.
