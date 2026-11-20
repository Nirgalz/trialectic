# trIA protocol boundaries

The **approved adaptive conversation design** remains in
[applications/tria/ai/dialogue-protocol.md](../../applications/tria/ai/dialogue-protocol.md),
with operational assistant instructions in
[applications/tria/ai/AGENTS.md](../../applications/tria/ai/AGENTS.md).
This directory does **not** replace or reapprove that design.

## Experimental map-response transport

[map-response-contract.md](map-response-contract.md) describes the
`tria-map-response-v2` JSON envelope for **provisional map patches** sent to
[ai-chat](../../applications/ai-chat/README.md). The
[companion local-shape schema](../../schemas/transport/tria-map-response-v2.schema.json)
captures its structural constraints. Contextual checks (ID conflicts, source
references, proposed concept kind, first-turn acknowledgement and continuation
self-report) belong to the browser's
[map-protocol.js](../../applications/shared/map-protocol.js).

This contract neither replaces [Analysis v2](../../schemas/global-model.md)
nor creates any approved Method Object, Scenario, Inference or assessment.
Accepted overlays are **temporary human-reviewed suggestions**, not persisted
normative records.

## Portable first-turn instruction assembly

The [behavioral instructions](../../applications/tria/ai/portable-instructions.md)
describe what an AI should do. The multi-provider browser client fetches
those instructions **plus** the map-response contract and joins them, in that
order, for the first request of a provider conversation. Its existing
acknowledgement/continuation behavior is unchanged. The two files can evolve
independently in their respective concern; transport changes must be checked
against the JS validator and regression fixtures, not silently duplicated in
the Method reference.

The actual first-turn payload is complete without the AI having to follow
repository links. Neither a self-reported acknowledgement nor a well-shaped
response proves compliance, scientific soundness or causal truth.

## Explicit non-goals

- No schema change to `schemas/model/`.
- No automatic import of a map patch as a normative Analysis revision.
- No inference/causal-validation engine in the visualization client.
- No automatic synchronization among the browser, local Work bridge and MCP.
