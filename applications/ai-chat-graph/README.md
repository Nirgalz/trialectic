# trIA multi-provider chat + map prototype

**Status:** experimental browser client, not a production inference engine.
The UI supports Gemini, OpenAI and Anthropic requests and a local Cytoscape
projection. The AI supplies an ordinary explanation plus provisional Object
and NEED/CAN relation proposals; a user must explicitly accept those proposals
before they appear as a temporary overlay. No normative Analysis or Power
assessment is changed by this acceptance.

## Separation of responsibilities

| Source | Purpose |
| --- | --- |
| [AI behavioral instructions](../../reference/tria-ai-instructions.md) | Relevant Method and epistemic behavioral safeguards for the assistant |
| [approved dialogue protocol](../ai-assisted-analysis/dialogue-protocol.md) | Broader Analyst/AI interaction, not a transport schema |
| [map-response contract](../../protocols/tria/map-response-contract.md) | Experimental `tria-map-response-v2` response instructions |
| [JSON Schema](../../schemas/transport/tria-map-response-v2.schema.json) | Context-free local shape of the experimental response |
| [map-protocol.js](map-protocol.js) | Browser transport validation, source/overlay references, provisional constraints and turn-specific acknowledgement |
| [app.js](app.js) | Browser UI state, OpenAI/Claude requests, first-turn prompt assembly and graph interactions |
| [graph-projection.js](graph-projection.js) | Pure conversion of the active Objects, relations and provisional overlay into Cytoscape elements; no Method or UI state |
| [shared Gemini client](../shared/gemini-client.js) | Browser-only Gemini HTTP request/response transport reused by both chat prototypes, without conversation or Method state |
| [normative Analysis schema](../../schemas/model/analysis.json) | **Different** contract for versioned Analysis documents |

The browser fetches the behavioral instructions and transport contract, joins
them once for the first request to a selected provider, and sends later
requests without reattaching that payload. The user's conversation history
and a bounded current-map snapshot are submitted with each request. The
provider's compliance status is only a **self-report**. A new discussion or
provider/model/credential change follows the existing initialization rules.

Direct browser API calls have provider-specific CORS and credential exposure
considerations. Do not ship API keys in this repository or assume all
provider endpoints allow browser use. Imported maps and graph annotations are
data, not model instructions.

## Checks

```sh
node applications/ai-chat-graph/test-map-protocol.cjs
node applications/ai-chat-graph/test-ai-session.cjs
python -m unittest discover -s tests -p 'test_tria_transport_schema.py' -v
```

These are deterministic/mostly mocked tests, not live-provider,
browser-accessibility, usability or empirical validation.
