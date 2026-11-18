# Unified model sources

Versions 2.0.0 (historical and unchanged), 2.1.0 (D-83 identity/attribution extension) and 2.2.0 (D-84 conceptual CAN affiliations) are accepted Analysis exchange profiles. Missing attribution annotations in old v2.0 records are not proof of possession. Analysis and PowerEvaluation are its two document types. The offline validator assembles both schemas in memory from this directory.

| Source | Responsibility |
| --- | --- |
| analysis.json | Analysis envelope and collections |
| power-evaluation.json, evaluation-context.json | Evaluation envelope, Focus dispatch, Subject, Focus, Context and Dependencies |
| types/evaluation/ | Shared field types and separate NEED, CAN and Scenario Results |
| types/can-affiliations.json | Versioned D-84 CAN↔CAN specialization/composition edges |
| types/ | Domain families, including Objects, relations, temporal requirements, conditions and pathways, Scenarios, events and effects, and evidence and claims |

Each type file maps names to definitions. The shared [`core/schema_loader.py`](../../core/schema_loader.py) assembler merges the context fields into PowerEvaluation and attaches each family to the appropriate schema under `$defs`. The offline validator then registers both schema identifiers locally so Analysis can reference PowerEvaluation. The MCP adapter uses the same assembly function with its restricted file reader. The entry files depend on this assembly step.

From the repository root, install the test requirements and validate either document type:

```sh
python -m pip install -r requirements-test.txt
python tools/validate_analysis.py tests/cases/analysis_v2.json
python tools/validate_analysis.py tests/cases/scenario_results_v2.json --evaluation
```

For the D-83 extension and limited semantic consistency checks:

```sh
python tools/validate_analysis.py tests/cases/identity_attribution_v21.json
python tools/validate_semantics.py tests/cases/identity_attribution_v21.json
python -m unittest discover -s tests -p 'test_identity_attribution_v21.py' -v
```

These semantic tests check reference identity, type/owner consistency and documented attribution boundaries, not factual evidence or complete causal correctness. Historical 2.0.0 documents remain readable and must not be upgraded by silently assuming attribution.

For the D-84 affiliation graph extension, separately from attribution and historical lineage:

```sh
python tools/validate_analysis.py tests/cases/can_affiliations_v22.json
python tools/validate_semantics.py tests/cases/can_affiliations_v22.json
python -m unittest discover -s tests -p 'test_can_affiliations_v22.py' -v
```

The D-84 checker checks CAN-only endpoints, version-pinned references, documented claims and duplicate edge identities. Cycles are reported as **warnings**, not automatically forbidden. Neither specialization nor composition automatically conveys CAN possession or sufficiency. The old 2.0/2.1 profiles cannot contain `can_affiliations`.

Python consumers can call `tools.validate_analysis.validator()` for Analysis or `validator(evaluation=True)` for PowerEvaluation. See the [field reference](../global-model.md) for the contract and [test guide](../../tests/README.md) for regressions.
