# Normative PowerEvaluation local structural contract v1

**Scope:** [power-evaluation.schema.json](power-evaluation.schema.json) is the
normative executable Draft 2020-12 contract **only for approved local constraints
through D-74**. It does not claim to be the final global Method schema.
This implementation follows the author's request to make a normative schema;
it introduces no new Method rule or approval of a previously OPEN field.

## Authority and traceability

Read the [canonical Method](../reference/trialectic-method.md),
[decision log](../DECISIONS.md), [PowerEvaluation companion](../reference/power-evaluation.md)
and [data-model catalogue](../reference/data-models.md). The catalogue explains
rationale; it does not independently approve serializations.

| Approved source | Enforced location / responsibility |
| --- | --- |
| D-57, D-66 | Exactly six required top-level fields; no additional top-level properties |
| D-61–D-63, D-66 | Focus-specific required Results names; other Focus families excluded |
| D-67 | Case-sensitive NEED/CAN/Scenario discriminator; required reference key and contradictory key exclusion |
| D-68 | Subject object reference, nonempty Definition-version map, optional Scenario/provenance, analytical Dependencies |
| D-69 | NEED effective satisfaction; optional justified degree without universal numeric bounds |
| D-70 | Temporal applicability and conditional status, separate from effective satisfaction |
| D-71 | Candidate CAN inventory, search state and scoped coverage |
| D-72 | CAN Actualizability statuses, justification and optional degree |
| D-73 | Prerequisite references and distinct inventory/per-pathway coverage |
| D-74 | Candidate NEED contributions, exact candidate relationship, search and coverage |
| D-65 | Semantic validation remains separate and incomplete |

## Conformance and use

A document conforms to **this local structural profile** iff a Draft 2020-12
validator accepts the complete document against `power-evaluation.schema.json`.
Its root is **one PowerEvaluation**, not an Analysis envelope or an array.
Validation MUST NOT be reported as full Method, semantic or empirical validity.
No external schema retrieval or format checker is required; all references are local.

Requiredness is not a type assertion: `ID` must occur, but its JSON type/format
is OPEN. Likewise D-67 requires the appropriate Focus reference key without yet
approving its value type. Nested additional properties remain allowed except
for explicitly forbidden contradictory reference keys and other-Focus Results
names. A nonempty string means `minLength: 1`; whitespace normalization is not
an approved constraint. Do not impose UUIDs, prefixes, deduplication, universal
degree ranges, or recursive expression syntax inferred from examples.

The four Scenario Results keys are required, but their **values accept every
JSON type**, including null. This permissiveness records an unresolved contract;
it does not approve null as a final Scenario representation. The minimal Scenario
fixture uses null solely to avoid inventing a nested structure.

## Compatibility and exclusions

The existing [boundary schema](power-evaluation.boundaries.schema.json) remains
available at its original path and `$id`. The normative schema has its own stable
`$id`, `urn:trialectic:schema:power-evaluation:normative-v1`, and the same validation
assertions; tests lock assertion parity. The new annotations document its scope.
Future assertion changes require an approved source decision and compatibility review.

The [normalized proposal](proposal-v0/README.md) remains **OPEN**. This profile does
not import it or settle Object versus relation identity (O-01), the final global
model, Condition predicates, recursive expression grammar, temporal exceptions,
or Scenario nested results (prospective D-75 is unapproved). D-36–D-44 concepts
and working structures are not promoted into a global exchange contract here.

Separate semantic checks are still needed for reference existence/type, ID
uniqueness, relevant version pins, context compatibility, prerequisite evaluation
membership in Dependencies, revision history/immutability, cycles, evidence
adequacy, justified completeness and causal claims. Structural acceptance can
therefore coexist with unresolved or invalid semantic claims.

## Executable examples and verification

[Minimal fixtures](../tests/cases/power_evaluation_minimal.json) contain three
independent synthetic records (NEED, CAN, Scenario), in a test-only array. They
are local-shape examples, not a semantically linked dataset or empirical evidence.
Existing richer fixtures remain synthetic and do not approve additional fields.

Run from the repository root with Python 3.11+:

```sh
python -m pip install -r requirements-test.txt
python -m unittest discover -s tests -p 'test_*.py' -v
```

[Normative tests](../tests/test_normative_schema.py) rerun the existing positive
and negative boundary suite against this schema, check assertion parity and
minimal fixtures, and guard OPEN areas against accidental tightening.
The regression workflow runs these on pushes and pull requests to `dev`.
