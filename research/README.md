# Recherche et Développement (RD) — Trialectic Method / trIA

**Status:** research index, not a parallel normative reference. Updated: 2026-11-20. **Working branch:** `dev`.

RD means **Recherche et Développement** (Research and Development). This directory centralizes hypotheses, theoretical references, conceptual proposals, UI experiments and their limitations. Author-approved concepts are recorded in [DECISIONS](../DECISIONS.md) and the maintained [Method reference](../reference/trialectic-method.md); an exploratory report never validates a concept on its own.

## Current cross-cutting axes

| Axis | Main question | Research document | Status |
| --- | --- | --- | --- |
| RD-01 — Analytical relevance and cognitive effort | Which additional analytical effort is worth making, for whom and why? | [methodology/analytical-relevance-and-effort.md](methodology/analytical-relevance-and-effort.md) | Accepted research direction; operational criteria OPEN |
| RD-02 — Semantic Objects, sets and granularity | Can meaningful units make Object/NEED/CAN relationships legible at several levels? | [representation/semantic-objects-and-sets.md](representation/semantic-objects-and-sets.md) | Meaningful grouping/function approved (D-98); identity/relationship semantics OPEN |
| RD-03 — Progressive, pedagogical and immediately useful interaction | Can trIA explain the value of the next step without removing productive thought? | [interaction/progressive-analyst-experience.md](interaction/progressive-analyst-experience.md) | Two guiding principles approved (D-98); impact UNTESTED |
| RD-04 — Human-facing vs technical terminology | Can familiar words be displayed without losing precise technical identities and constraints? | [interaction/human-and-technical-terminology.md](interaction/human-and-technical-terminology.md) | Research direction approved (D-98); vocabulary/contract OPEN |

**Shared principle 1 (author-approved wording):**
> Ne pas demander davantage d'effort à l'utilisateur avant de lui avoir rendu intelligible ce que cet effort pourrait lui apporter.

**Shared principle 2 (author-approved wording):**
> Ne pas supprimer les efforts qui contribuent effectivement à développer sa compréhension et son autonomie.

The second prevents a simplistic optimization for the shortest interaction. Both are design principles, not empirical findings or a fixed quantitative utility ratio.

## Existing research retained in place

The 2026-11-17 [relevance/Focus pilot](tria-dev-relevance-focus-pilot-2026-11-17.md) and the [navigation](tria-dev-focus-navigation-control-pilot-2026-11-17.md), [Focus vs Stage](tria-dev-focus-vs-stage-2026-11-17.md), [three-mode](tria-dev-focus-three-mode-pilot-2026-11-17.md) and [Cytoscape A/B](tria-dev-focus-cytoscape-ab-2026-11-17.md) pilots remain historical, limited, synthetic observations. None demonstrates cognitive benefit or empirical validity.

## How to record new research

- State **question**, **rationale**, **hypotheses**, **alternative interpretations**, **references**, **method**, **observations/limitations** and **decision status** only to the extent useful to the work.
- Mark claims **VALIDATED BY AUTHOR** (conceptual approval), **PROPOSED / OPEN**, **SYNTHETIC**, or **EMPIRICALLY EVALUATED** only when there really is independent evidence. Validation by the author is not scientific validation.
- Prefer cross-links to reference documents rather than copy/pasting normative definitions.
- Place implementation prototypes in the reference UI `applications/triad-graph/` or isolated adapters under `experiments/`, without introducing another permanent graph renderer. Preserve the raw Analysis, object identifiers, historical versions, uncertainty and relationship meaning.
- For decisions and status, use [DECISIONS.md](../DECISIONS.md) and [TODO.md](../TODO.md). No automatic new schemas, inference engines or recurring documentation chores follow from opening an RD axis.
