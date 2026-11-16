# Trialectic schemas

Use **2.0.0** for new analyses and evaluations. The validator reads the [modular definitions](model/README.md) directly.

| Document | Model entry | Offline command |
| --- | --- | --- |
| Complete Analysis | [Analysis](model/analysis.json) | `python tools/validate_analysis.py document.json` |
| One NEED, CAN or Scenario assessment | [PowerEvaluation](model/power-evaluation.json) | `python tools/validate_analysis.py document.json --evaluation` |

See the [field reference](global-model.md).

Only version 2.0.0 is supported. The [original proposal](https://github.com/Nirgalz/trialectic/blob/05c17bb6936ef1bc063eec56caed361f41f56f31/schemas/proposal-v0/README.md) records the design history.
