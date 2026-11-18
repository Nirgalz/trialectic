# trIA — Multi-provider chat adapter

**Experiment, not a second graph.** This client calls Gemini, OpenAI or
Claude and exports provisional `tria-map-response-v2` responses.
The only authoritative graphical interface is
[triad-graph](../triad-graph/README.md), including animated node transitions.

Use a static HTTP server rooted at the repository (not `file://`).
Import the same Analysis JSON as in the reference map; the pilot example is
synthetic. Ask the AI a question and optionally select an Object to attach
its local details. **Exporter pour la carte de référence** saves the complete
candidate response envelope to JSON. In `triad-graph`, load the same
Analysis and use **Importer propositions IA**; proposed objects and relations
appear as temporary candidates and can be removed. Import dependent patches
in order.

There is no automatic synchronization or validation of epistemic truth.
API keys are not stored but are exposed to scripts/extensions in this browser
prototype and sent directly to the chosen provider. Avoid confidential data.
See [UI reference](../../docs/ui-reference.md) and
[response protocol](../../protocols/tria/map-response-contract.md).
