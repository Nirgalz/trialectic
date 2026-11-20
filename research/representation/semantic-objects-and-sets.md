# RD-02 — Semantic Objects, semantic sets and levels of granularity

**Date:** 2026-11-20 · **Status:** semantic-set working definition and possible Semantic Object function APPROVED BY AUTHOR (D-98); identity, formal relations, generalization and measured usefulness OPEN.
**Links:** [research index](../README.md), [Method §8](../../reference/trialectic-method.md), [data-model distinctions](../../reference/data-models.md), [reference UI](../../applications/triad-graph/README.md).

## Approved conceptual direction

**Working term:** *ensemble sémantique* / *semantic set* (also proposed as *nœud sémantique*). The name remains provisional.

**Author-approved working definition (French):**
> Un ensemble sémantique est un regroupement contextualisé d'Objets, de relations et éventuellement d'autres ensembles, dont l'organisation exprime une signification identifiable et synthétisable. Il constitue une unité d'abstraction permettant de représenter, explorer et approfondir un sous-ensemble cohérent d'une analyse, tout en conservant l'accès à ses éléments constitutifs et à leurs relations.

**Approved possible function of the existing Semantic Object:** A Semantic Object may provide an intelligible *unit of meaning* that summarizes a coherent combination of Objects and relationships, allowing an analyst to inspect an initially simple representation, then progressively examine its components and internal relations. This is a possible analytical/presentational function of the existing concept, **not** a claim that each grouping is a newly established Semantic Object.

The existing validated Semantic Object identity remains grounded in **Meaning, Expression(s), and a Conceptual Network**. The Semantic Pyramid concerns conceptual dependency and is not automatically a general UI grouping model. Existing Object Definition/constituents, NEED/CAN attribution, and CAN specialization/composition remain separate and unchanged.

## Two layers that must remain distinguishable

1. **Presentation grouping:** a reversible, analyst-chosen (or AI-suggested and analyst-approved) view of existing Object IDs and qualified links. May be temporary and should not acquire a permanent Object identity just because the UI draws a node.
2. **Semantic Object as analytically identified entity:** a claimed unit of Meaning with a defensible identity/Expression/Conceptual Network, provenance and potentially its own Object identity if independently warranted by the Method. This requires investigation; rendering must not instantiate it automatically.

A semantic set can be *represented* as a node even when it remains a view-specific abstraction. Whether it coincides with a Semantic Object, and what qualifies the identity, remain OPEN.

## Proposed representational behavior

- Show a set using a short, comprehensible summary sentence and accessible label, not merely a list of opaque IDs.
- Click to expand into constituent Objects/NEEDs/CANs and internal qualified relations; allow several nested levels.
- Allow overlapping sets through shared references where useful, avoiding forced duplication of Object identities.
- Preserve graph/source separation: collapsing should not delete an Object, invalidate its relationships, change a NEED/CAN attribution, create a Power assessment or actualize a CAN.
- Show provenance, uncertainty, version/context and where the summary may be incomplete or disputable.
- Preserve a path to an **unaggregated map** and permit inspection of important exceptions or contradictory relations.

## Semantics between sets — OPEN (explicitly NOT predefined NEED/CAN)

Candidate distinctions to evaluate:
- a **semantic relation** between meanings, e.g. conceptual association, interpretation, opposition, inclusion, overlap, or conceptual dependence;
- a **presentation-level summary** of underlying ordinary Object relations (which must not pretend to be a new factual edge);
- a **contextual NEED/CAN relation**, but only if independently justified for the relevant Objects/claims, not inferred by collapsing nodes.

Example failure: If a single constituent of A has an attributed NEED involving one constituent of B, this alone does not justify displaying **A NEED B**. A safe pilot can show `related recorded links — inspect` with traceable underlying references and **no asserted operator**.

## Identity and relation questions to resolve

- When does the set's summary express a new Meaning versus a convenient label?
- Can the same Object belong to several sets, and how do nested/shared references avoid cycles and duplicate attribution?
- What is a meaningful criterion for identity, equivalence, version and changes of a Semantic Object?
- What are the semantics and direction of inter-set links? Are set-to-set connections propositions, conceptual dependencies or only an index of cross-boundary relations?
- How should uncertainty, temporal context, Scenario branches and alternative interpretations be retained?
- What important meanings or adverse effects become obscured when details are collapsed?

**Implementation status (2026-11-20):** a first [reversible grouping pilot](semantic-group-prototype-pilot.md) is present in the single reference UI, with manual set creation, nested group membership, open/collapse actions and qualified source-link summaries. It is NOT an independent semantic Object identity or an empirical evaluation. The research questions below remain OPEN.

## Pilot for trIA

Use the sole existing Cytoscape reference renderer; experiment with **optional, local, reversible semantic groupings**. Do not amend normative Analysis/PowerEvaluation JSON Schema or introduce an independent permanent map.

A first pilot may support named sets, a one-sentence Meaning, explicit referenced member Object IDs, optional nested sets, collapsed nodes and on-demand expansion. Cross-set edges, if shown, must remain **qualified visual summaries**, not automatically NEED/CAN or causal claims. An experimental view can begin with manual grouping and only later test AI-suggested group composition.

**Compare:** source Object map vs collapsed sets on identical frozen cases. Observe analyst comprehension, ability to find relevant contradictions, time/effort, confidence calibration, clarity of relations and ability to return to original evidence. Include an intentionally misleading grouping as a negative control.

**Success is not:** fewer nodes alone, one author's synthetic examples, or matching a JSON schema. The purpose is an intuitively understandable *unit of meaning* that can be opened without losing analytical rigor.
