# trIA — Operational instructions for AI-assisted Trialectic analysis

**Scope:** This file governs **how AI assistance conducts trIA and trIA-dev**, not the user's general collaboration workflow. Inherit the root `AGENTS.md` rules on GitHub writes, efficiency and author approval. The [canonical Method](../../reference/trialectic-method.md) and [decision log](../../DECISIONS.md) determine conceptual validity; the [approved dialogue protocol](dialogue-protocol.md) governs detailed interaction design. If older dialogue wording uses `Focus` broadly, distinguish the **D-91 navigation Focus** from D-17 Stage attention and from typed `PowerEvaluation.Focus`.

## Core application

- Apply the same **Understand → Explore → Decide** Method (D-85), recursively and according to relevance. It may legitimately conclude after understanding or exploring. Do not impose an extra stage, NEED/CAN classification, semantics lens or final decision merely for uniformity.
- Maintain a situated Main Subject, relevant Environment and affected Secondary Subjects. D-89 requires relevance checks **both locally (when a navigation Focus exists) and globally**, especially for severe, indirect or overlooked harms.
- Distinguish source-supported information, Analyst assumptions and goals, AI hypotheses, contradictions, unknowns, simulated events and effective Actualizations. A modeled state or code test is not causal, empirical or scientific proof.
- Use `trIA` for appropriate user-facing detail and `trIA-dev` for selective, auditable detail. When helpful, display separate qualified conceptual Object and methodological process graphs (D-88). Follow D-90 only when the `-c` interactive mode is actually available; otherwise provide the documented fallback.

## Contextual validity and robustness of conclusions (D-93)

- For important analytical conclusions, assess **both** (a) whether the inference is **justified in the stated context** by its premises, evidence, conditions and relevant alternatives, and (b) how **robust** that justification remains under relevant contextual variations. Do not conflate a plausible mechanism, a contribution, contextual sufficiency, necessity, and satisfaction of a NEED.
- Identify relevant changes in Object properties, Environment, relations/dependencies, time, assumptions and evidence. Prioritize variations by **potential impact on the conclusion, plausibility or degree of possibility, uncertainty and possible consequences**; do not automatically disregard low-probability severe harms. Examine interacting changes where material.
- **Proportion examination depth to the conclusion's analytical importance**, downstream decision stakes, uncertainty, fragility and potential consequences if invalid. Avoid exhaustive combinatorial checks for minor claims; probe decisive or consequential conclusions more deeply with relevant counterexamples and adverse cases.
- Explain **which contextual conditions preserve, undermine or leave the conclusion indeterminate**, what has been examined, what known variations were deferred, and the limits of identifying unknown variations. Reassess recursively after significant new information, contradiction or contextual change. Preserve the local/global D-89 relevance distinction.
- No automatic scores, fixed mandatory levels, invented probabilities, new schema fields or separate compulsory Stage. A deeper check does **not** itself make the claim true or better evidenced; maintain D-31/D-46/D-47 epistemic qualifications and distinguish simulation from observation.

## Navigation Focus (D-91 as amended by D-92; validated steering rules)

- The Analyst may leave **no active navigation Focus**, or select **one Object or one Resolution Scenario at a time**. A relation is not a navigation Focus. An eligible NEED/CAN is an **Object**; a Scenario is selectable directly by its **Scenario identity**, without being treated as an Object. D-92 supersedes D-91's earlier Object-only restriction.
- The navigation Focus has two purposes: **(1) select an Object or Scenario for attention** and **(2) retrieve associated investigations** (their questions, Stages, results, uncertainties and history where available). It is a **pointer**, not a new Object, an evaluation or a duplicate investigation-data store.
- The AI may propose **several candidate Objects or Scenarios** for attention, with concise, qualified reasons based on estimated **importance, urgency and/or contextual relevance**. Avoid unsupported rankings or invented numeric confidence.
- The **Analyst controls active selection and switching by default**. An AI suggestion is not a selection. The Analyst may explicitly delegate selection/switching authority within a defined scope and revoke it at any time. Do not claim automatic Focus changes without such authorization.
- A Stage may examine many Objects, relations and Scenario effects while a single Object or Scenario navigation Focus is active. Do not infer Stage targets solely from the navigation Focus or narrow D-89's global relevance to the selected target.
- Treat `PowerEvaluation.Focus` as its **separate, typed** NEED/CAN/Scenario field. Navigation changes alone are **not** evaluation revisions, Object Definition revisions or Actualizations. Re-evaluate using the approved context/justification/revision rules only when warranted.

## Examination continuation, suspension and completion

- Assess an **investigation relative to its question or objective**, distinguishing **to continue**, **suspended** and **completed**. These describe the examination, not an Object's or Scenario's intrinsic state.
- Propose continuation when relevant questions can usefully be examined; propose suspension when information is missing, an investigation is currently blocked, or another issue deserves priority. Record substantive reasons, uncertainties and possible conditions for resumption.
- Propose completion when the investigation's objective is **sufficiently met**, even if secondary questions remain. State conclusions proportionately, preserve material reservations, and avoid promising exhaustive coverage. Reopen when new relevant information, contradiction or context warrants it.
- **Switching the active Focus does not terminate the previous investigation.** The AI can recommend switching or an examination status, but Analyst authority or a valid delegation governs navigation choices.

## Operational limits

- Retrieval of investigations, historical version compatibility, automated synchronization, multiple branches, persistence and the measured value of navigation Focus still require separate specifications/tests; do not claim they are implemented based only on these instructions.
- Do not modify GitHub merely to record a discussion. Once a topic can be concluded, **propose the specific relevant files and edits**, then await the Analyst's explicit writing authorization, as required by root `AGENTS.md`.
