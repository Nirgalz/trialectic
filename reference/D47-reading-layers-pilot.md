# D-47 — Experimental representation of scientific-reading results

**2026-11-15 | EXPERIMENT, NOT A NEW VALIDATED METHOD DECISION**

This work carries out **only step 1** proposed after the five-publication D-47 corpus: improve how the analysis represents **what a publication reports**, the coverage of its **methodological examination**, the status of **independent empirical support**, and the status of any **causal or formal establishment**. There is **no AI-with/without-Method evaluation**, new expert panel, or corpus expansion in this step.

## Why an experimental adapter was needed

The earlier D-47 real-source pilot, documented at [D47-real-sources-pilot.md](D47-real-sources-pilot.md), evaluated ten scoped/generalized claim probes from five published-method cases. The existing D-47 engine marked **all ten `indeterminate`** due to conjunction of methodological requirements; it could not tell a correctly *attributed documentary report* from an empirically verified real-world claim. The original pilot's five narrow claims were manually annotated as closely following what publications report, but those annotations **are not independent scientific truth labels**.

## Four distinct, non-ordered registers (EXPERIMENTAL)

1. **Documentary attribution** — `reported_in_source_notice` when an explicitly linked *manual paraphrase from the previous corpus* exists, or `not_documented_in_pilot_notes` otherwise. No annotation means **not documented in this finite set**, NOT refuted or absent in the literature. A source-attributed report never establishes its underlying empirical proposition.
2. **Methodological review** — separate *coverage of examination* (`partial` / `complete` / `unreviewed`) and specific requirements assessed as satisfied, unsatisfied or indeterminate. An explicit, justified **not-applicable** marker is a proposed *applicability dimension*, **not a new truth value** of D-40 conditions. A `complete` fixture review is not an external source certification.
3. **Empirical support** — `not_independently_adjudicated` for all ten probes: the experiment performed no independent reanalysis, scholarly peer review or authenticating source audit. No automatic promotion arises from manual attribution, a passed software check or a descriptive publication.
4. **Causal/formal establishment** — do not infer causality from associations, subgroup estimates or a report about a predictive model. For Gonthier's four-colour proof, distinguish **the author's report of Coq verification** from **a new, independently executed Coq/Rocq run**; the latter was **not performed**.

These are **different assertions**, not automatically successive confidence levels. Exact field names, reviewer standards and status-coupling rules are **experimental only**, NOT approved D-48 or a normative JSON Schema.

## Reproducible execution and limits

An 8-file, standard-library Python archive was created and executed in an independent extracted directory. The prior D-47 evaluator and the **same original five cases, ten claims and ten source notices** are included unchanged. A separate manually annotated registry supplies **five explicit source-attribution witnesses** and a justified `not_applicable` case for empirical-premise checking *of a documentary report about a formal proof*, while its still-relevant unknown formal criteria remain indeterminate.

**320/320 software assertions passed**, including:
- 120 permutations of the order of the five documentary notices; no status drift;
- removal of one manual notice changes only the documentary attribution, not methodological or empirical assessment;
- a deliberately fabricated documentary witness on a causal overclaim does **not** establish causality or empirical truth;
- reversing the original `reported_scoped` / `overreach` benchmark labels does not change the output (the adapter does not read those labels);
- invalid source IDs, mismatched claim-source links, unsupported claims of full-text verification, duplicate witnesses and unjustified `not_applicable` are rejected;
- original D-47 remains **ten `indeterminate`**; all ten new empirical determinations remain **not independently adjudicated**, with zero independent formal executions.

Result JSON SHA-256: `396217ef72e519f880ded349a0348ed972858e25868a945fde3338717a719a1b` (identical after ZIP extraction and execution).

**Result:** five claims have **prior manually recorded source-attribution notices**, five are **not documented by those notices**, all ten have only **partial methodological review**. These numbers are not autonomous semantic-recognition successes, ground truth accuracy measures, scientifically verified conclusions or an AI quality improvement estimate.

**Limitations:** no network or full-publication text was read by the test executable; the five positive source witnesses were authored based on the previous pilot's reading notes, not independently extracted or expert reviewed; absence of annotation is not falsification; the original criterion labels and source scopes remain human-provided and unverified; applicability checks are a narrow proposed design, not comprehensive method-specific schema. There was no new statistical analysis, no actual Coq check and no comparison of AI output quality.

**Archive supplied in the conversation**, not installed in CI. Related OPEN tasks: T-03, T-24, T-30. **No D-48 decision and no task closure.**
