# Reusable computational formalization / Formalisation informatique

This directory separates **representations and contracts** from the concepts
of the [Trialectic Method](../method/README.md) and from trIA's implementation.
It does not define a second Method or claim exhaustive coverage of the Method.

## Current documentation

- [Data models, roles, distinctions and status](docs/data-models.md)
- [PowerEvaluation model and serialized assessment contracts](docs/power-evaluation.md)
- [Adopted Analysis/PowerEvaluation exchange profiles v2](../schemas/global-model.md)
- [Executable model schemas](../schemas/model/README.md)
- [Current schema assembly](../core/schema_loader.py)
- [Current validators](../tools/validate_analysis.py) and
  [partial semantic checks](../tools/validate_semantics.py)

**Partial migration:** documentation is now owned here, but schema source code,
validators and Python import paths intentionally stay at their existing working
locations until a separate compatibility-tested migration. The named v2
profiles and their schema URIs are unchanged.

**Authority:** source schema files define the current approved exchange shapes
for their versions; the Method reference and recorded author decisions govern
conceptual definitions. Neither a structurally valid document nor a passing
test is empirical proof.
