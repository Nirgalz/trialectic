# RD-02 — Pilot: reversible semantic-set group view in trIA

**Date:** 2026-11-20 · **Status:** IMPLEMENTED EXPERIMENT; human value, correctness of analyst-chosen meanings, semantic group-to-group relation typing and browser interoperability **NOT empirically validated**.

Implementation: [single reference renderer](../../applications/triad-graph/README.md), module [semantic-groups.js](../../applications/triad-graph/semantic-groups.js), UI controller `app.js`, and [targeted structural assertions](../../applications/triad-graph/test-semantic-groups.cjs).

## What the experiment does

- The analyst supplies a short label, a one-sentence Meaning and two or more Object/group references. The UI does not infer them.
- Groups can be nested through previously created root groups. A **collapsed view** replaces visible member nodes with a local display node. Clicking the set opens it, recovering individual source nodes/links.
- Only existing source relationships contribute to cross-boundary summary lines. Their type is deliberately **not** transferred to the set level; inspect the line to find raw references.
- Semantic sets exist only in local presentation state; original Analysis remains untouched and normative schemas do not change.

## Negative controls and limitations

- A constituent's NEED cannot silently become an ensemble's NEED.
- Two Objects with a shared contextual relation do not automatically constitute a newly identified Semantic Object or prove the analyst's summary Meaning.
- The prototype currently excludes overlapping membership and does not persist groups across imported analyses. It does not yet implement a verified semantic-link taxonomy or AI-generated semantic units.
- The structural assertions verify limited projection invariants; **they do not test actual browser behavior, multi-user comprehension, autonomous semantic identity or empirical value**.

## Next discriminating usability experiment (OPEN)

For the same frozen analysis, compare full source map and grouped map with independent participants, including a misleading summary as negative control. Record time to answer a factual question, errors about inter-group links, ability to recover original relations, comprehension, perceived effort and independent reasoning after the interaction.
