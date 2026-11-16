# Trialectic schemas

Use **2.0.0** for new analyses and evaluations. Edit the shared [model sources](model/README.md) to maintain the published JSON Schemas.

| Document | Published schema | Offline command |
| --- | --- | --- |
| Complete Analysis | [Analysis](trialectic.schema.json) | `python tools/validate_analysis.py document.json` |
| One NEED, CAN or Scenario assessment | [PowerEvaluation](power-evaluation.v2.schema.json) | `python tools/validate_analysis.py document.json --evaluation` |

See the [field and migration guide](global-model.md).

Only version 2.0.0 is supported. The [original proposal](proposal-v0/README.md) records the design history.
