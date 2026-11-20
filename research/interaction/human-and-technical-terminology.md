# RD-04 — Human-facing vocabulary and technical AI/data language

**Date:** 2026-11-20 · **Status:** dual-language-interface R&D direction APPROVED BY AUTHOR (D-98); exact vocabulary and translation rules OPEN.
**Links:** [research index](../README.md), [existing French–English glossary](../../terminology/french-english-glossary.md), [reference data models](../../reference/data-models.md), [RD-03](progressive-analyst-experience.md).

## Goal

Separate **the language used to help a human understand an analysis** from **the precise technical language used by trIA and AI exchanges**. The former should use everyday words whenever they preserve the needed meaning; the latter maintains stable identifiers, types, schemas, conditions and evidence qualifications.

This is **not** a proposal to create two independent conceptual Methods, reinterpret the existing canonical definitions, or change the validated v2 JSON exchange profile.

## Provisional interface mapping for experiments (NOT normative redefinitions)

| Technical/source vocabulary | Possible human-facing wording (FR) | Guardrail |
| --- | --- | --- |
| `CAN` (Potentiality Object / attributable Potentiality) | **Potentialité**; sometimes « ce que cet Objet pourrait faire / permettre » | A CAN is not necessarily autonomous, actionable or successfully actualized. Preserve Object identity and contextual attribution. |
| `NEED` (attributable necessity) | **Besoin** or **condition nécessaire** according to meaning | The two ordinary phrases are *not* always interchangeable; an actual NEED may be existential, structural or require more precise wording. |
| `Object` | **Élément**, **objet étudié**, or a concrete domain noun | Do not hide its stable ID or confuse Object with current Subject. |
| `Focus` (navigation) | **Ce que j'examine** | Never silently equate navigation selection with `PowerEvaluation.Focus`. |
| `PowerEvaluation` | **Évaluation des possibilités et des conditions** | Do not turn Power into a simple binary status or promise success. |
| `Scenario` | **Scénario**, **possibilité envisagée** | Hypothetical future is not observed Actualization. |
| `Semantic Object` | **Ensemble d'idées**, **unité de sens** (where appropriate) | A graphical set is not necessarily an independently identified Semantic Object. |
| `Relation` / link qualification | **Lien**, « comment ces éléments sont liés » | Preserve type, source, status, context, and underlying relation IDs inspectably. |

**Author's concrete example:** `Potentialité` is usually more intelligible to a human novice than the `CAN` identifier. Terminology must still respect the approved `CAN` = `Potentiality` conceptual correspondence and current distinctions of `NEED`, `Power` and `Actualization`.

## Rules to test

1. Show an accessible label and optional plain-language explanation at first encounter; show original technical identifier/type on inspection.
2. Preserve a **reversible mapping** from UI label to normative identity/reference and contextual qualifications. Avoid one-to-one lexical assumptions where meanings are context-specific.
3. Keep source identifiers, version, provenance and uncertainty unchanged in JSON and exchanges. Language/locale switches are presentation only.
4. Test polysemy, contradictory wording, translations and cases where the ordinary term conceals a formal distinction.
5. Do not put reader-friendly synonyms into schema enum fields merely for display, and do not imply all future UI labels are currently approved.

## Next experiment

On the same synthetic case, compare technical labels with human-readable wording. Measure comprehension, conceptual confusion, time/effort, and ability to find the original NEED/CAN/Scenario record. Consider a quick switch or inspection affordance for expert analysts; avoid adding UI complexity if it offers no observed benefit.
