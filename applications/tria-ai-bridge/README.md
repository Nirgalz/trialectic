# tria-ai-bridge

Pure request/response contracts, independent of renderer, HTTP server, filesystem
queue and model provider. No request is sent automatically.

```js
const bridge = require('./bridge.js');
const request = await bridge.prepareRequest(analysis, {
  action: 'focus', focusId: 'O-eleves', mapMode: 'detailed', note: 'Question'
});
// Exchange JSON files manually, or inject an explicitly chosen transport:
const raw = await bridge.dispatch(request, send);
const proposal = await bridge.parseResponse(raw, request, currentAnalysis);
```

In a browser, load `bridge.js` as a local script and use `TriaAIBridge`.
SHA-256 and request IDs use Web Crypto (available in current local-file browser
contexts and Node 20+). The component has no DOM dependency.

`tria-ai-request-v1` includes a detached Analysis, request ID, Analysis ID,
canonical SHA-256 fingerprint, Focus, action, map mode, question, instructions
and a `response_contract`. The response uses `tria-ai-response-v1` and must
echo the request ID, Analysis ID and fingerprint; responses for an older Analysis
are rejected. Lists and sizes are bounded. JSON text is returned as data.

An optional `revised_analysis` contains a complete proposed Analysis. The bridge
does not validate it against the normative schema, patch records or update the
map. The caller must pass it through `tria-map-data.parseAnalysis`, present it
for review and explicitly adopt it. The current UI offers a separate adoption
button; importing a response alone never changes the Analysis.

`formatHandoff` and `formatFocusContext` prepare conversation text from supplied
data. The optional Work file queue in `applications/triad-graph/server.py`
uses a separately versioned protocol.

Run `node test-bridge.cjs` without a server, provider or API key.
