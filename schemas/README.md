# Trialectic exchange schemas

The modular files in [model/](model/README.md) define the adopted **Analysis**
exchange profiles `2.0.0` (historical), `2.1.0` (D-83 identity/attribution)
and `2.2.0` (D-84 CAN affiliations). All three remain accepted.
`can_affiliations` is required for Analysis 2.2.0 and forbidden in the
earlier profiles. Do not silently reinterpret old unqualified attribution as
established possession. The separate **PowerEvaluation** document retains
its six-field contract and its existing schema URI.

The human-readable [global-model reference](global-model.md) explains field
roles, version boundaries and semantic obligations. The JSON files, assembled
from the modular sources in [model/](model/README.md), are the executable
**local-shape** contracts for this exchange profile, not a full analytical or
empirical verifier. Shared assembly lives in
[`core/schema_loader.py`](../core/schema_loader.py); callers supply their own
file-reader and authorization policy.

| Document | Schema entry | Offline command |
| --- | --- | --- |
| Complete Analysis | [Analysis](model/analysis.json) | `python tools/validate_analysis.py document.json` |
| NEED, CAN or Scenario assessment | [PowerEvaluation](model/power-evaluation.json) | `python tools/validate_analysis.py document.json --evaluation` |

After the structural check, use `python tools/validate_semantics.py document.json`
for the currently implemented **partial** semantic checks. These do not prove
causal correctness, evidence adequacy or completeness.

The earlier [proposal-v0](https://github.com/Nirgalz/trialectic/blob/05c17bb6936ef1bc063eec56caed361f41f56f31/schemas/proposal-v0/README.md)
and [normalized-v1](https://github.com/Nirgalz/trialectic/blob/7fc676586a85be504bf145d313b19fefadfb9761/schemas/normalized-v1/README.md)
documents remain historical design records, not competing current contracts.
**Separate experimental UI transport:** [tria-map-response-v2](transport/tria-map-response-v2.schema.json) specifies only the local shape of provisional graph proposals. It is **not** an Analysis or PowerEvaluation schema; see the [separate transport contract](../protocols/tria/map-response-contract.md).

See [repository responsibilities](../docs/architecture.md).
