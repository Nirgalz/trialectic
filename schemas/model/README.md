# Unified model sources

Version 2.0.0 is the current exchange contract. Analysis and PowerEvaluation are its two document types. The schema files one directory above are published artifacts.

| Source | Responsibility |
| --- | --- |
| analysis.json | Analysis envelope and collections |
| power-evaluation.json, evaluation-context.json | Evaluation envelope, Focus dispatch, Subject, Focus, Context and Dependencies |
| types/evaluation/ | Shared field types and separate NEED, CAN and Scenario Results |
| types/ | Domain families, including Objects, relations, temporal requirements, conditions and pathways, Scenarios, events and effects, and evidence and claims |

The type files are maps of named definitions. Their local references resolve inside the assembled resource. Use the published entry points with external validators. Each family is edited in one place. From the repository root, run:

```sh
python tools/build_schemas.py
python tools/build_schemas.py --check
python -m unittest discover -s tests -p 'test_*.py'
```

The build compares parsed JSON and preserves existing files when only property ordering differs. CI checks the published outputs against the sources.
