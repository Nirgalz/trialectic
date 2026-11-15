# D-47 — Pilot audit of published real-world evidence (2026-11-15)

**Status: preliminary experimental evaluation, NOT a new validated Method decision.** The user authorized performing a first real-publication test after D-47. This note preserves its results and limitations, but neither settles quality criteria nor closes any TODO.

## Design and actual execution

A **purposive, adversarial, nonrepresentative corpus** was manually annotated from published sources and scientific critiques: **five methodological families, ten source notices and ten narrowly scoped claim probes** (five source-aligned claims and five deliberately overextended claims).

The unchanged Python D-47 evaluator produced **`indeterminate` on all ten probes**. A companion set of **162/162 internal assertions passed**; the program does not independently audit the actual publication text or raw scientific data. The five overextended claims were not promoted, but **none of the five narrowly reported claims was assigned `plausible` either**. This is a *conservatism/coverage limitation*, NOT a 100% accuracy claim. All ten probes have at least one undocumented method check. The test's adjudication labels were **authored from published texts**, not independently blind-rated by domain experts. The extracted local archive rerun produced identical JSON, SHA-256 `9be0c64e0d43ee32ea0370b11eacdc3cb247b25e1bf2aca7185f9f7970efe76a`.

The ten case claim IDs are:
- **M1–M2 — measurement:** pulse-oximetry differences reported among two US hospital cohorts versus an unjustified single-cause inference from reported racial categories. Sjoding et al., 2020, DOI `10.1056/NEJMc2029240`; independent regulator information on pulse-oximeter limitations, FDA.
- **E1–E2 — trials and systematic review:** the Cochrane 2013 vitamin C review reports RR 0.48 (95% CI 0.35–0.64) in five intense-physical-stress trials of 598 participants; this is not transferable automatically to the general population (29 trial comparisons, 11,306 participants, RR 0.97 [0.94–1.00]). DOI `10.1002/14651858.CD000980.pub4`.
- **S1–S2 — statistics:** country-level chocolate consumption/Nobel prize association (Messerli 2012) versus unsupported individual-level causal interpretation; critiques by Maurage et al. 2013 and subsequent 2020 reanalysis. DOI `10.1056/NEJMon1211064`, `10.3945/jn.113.174813`, `10.1016/j.ssaho.2020.100082`.
- **P1–P2 — prediction model:** early Google Flu Trends estimates (Ginsberg et al. 2009) versus incorrect assumption of persistent accuracy; later out-of-sample critique by Lazer et al. 2014. DOI `10.1038/nature07634`, `10.1126/science.1248506`.
- **F1–F2 — formal reasoning:** Gonthier's reported Coq-checked four-colour proof and publicly available formal artifacts versus the false assertion that **this pilot** independently reran the proof in Coq. The Cornell Nuprl summary and public `rocq-community/fourcolor` repository provide documentation, not a local new formal verification.

## Stable source URLs

1. Sjoding: https://pubmed.ncbi.nlm.nih.gov/33326721/
2. FDA device-context: https://www.fda.gov/medical-devices/products-and-medical-procedures/pulse-oximeters
3. Cochrane: https://www.cochrane.org/fr/evidence/CD000980_vitamin-c-preventing-and-treating-common-cold
4. Messerli: https://pubmed.ncbi.nlm.nih.gov/23050509/
5. Maurage critique: https://pubmed.ncbi.nlm.nih.gov/23616517/
6. Statistical reanalysis: https://www.sciencedirect.com/science/article/pii/S2590291120300711
7. Google Flu initial: https://www.nature.com/articles/nature07634
8. Lazer critique: https://gking.harvard.edu/publication/the-parable-of-google-flu-traps-in-big-data-analysis/
9. Gonthier proof report: https://nuprl-web.cs.cornell.edu/KB/show.php?ID=627
10. Public formal artifacts: https://github.com/rocq-community/fourcolor/blob/master/README.md

## Identified limitations

1. **Overconjunctive methodological gates.** The engine demands `satisfied` for every hard-coded family criterion, so a relevant but unreported detail blocks all source eligibility; missing information must not be turned into a true/false claim.
2. **Applicability and formal claims.** The engine requires an empirically supported premise even for a *report of formal proof checking*; `not_applicable` is currently absent. A published report of a proof is not the same as this pilot having executed the prover.
3. **Crude context equality.** The prototype compares population, setting and period as exact strings, rather than evaluating justified transportability.
4. **No expert-independent ground truth.** Regulatory discussion is not an audit of the specific pulse-oximeter paper; a Cochrane review is a systematic appraisal of included trials, not external adjudication of the review; the public proof source is not a new local execution. Scientific check labels are manually assigned.
5. **No empirical performance benchmark.** The local assertions are programming checks; the sample has no probabilistic or representative sampling, no blind judges, no raw-data reanalysis and no matched comparison of AI with/without the Method. Do not report them as statistical evidence of a scientific accuracy gain.

**Follow-up:** develop a structured `reported_in_source` versus `methodologically_reviewed` versus `empirically_supported` distinction; design (subject to approval) applicability handling separately from `indeterminate`; assemble a 20–30 case real corpus with at least two independently blinded domain-method reviewers; test paired AI responses and inter-rater consistency. Test code, JSON corpus, report and exact runtime outputs were supplied as an archive in the conversation, **not installed in repository CI**.

Related work: T-03, T-24, T-30, and evidence quality criteria D-46 / D-47. No new conceptual rule is asserted as validated.
