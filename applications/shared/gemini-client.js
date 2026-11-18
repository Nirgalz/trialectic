/* Shared browser-only Gemini generateContent transport. No Method/UI state.
   The caller owns conversation history, error wording, response format,
   authentication scope, and cancellation. No key is persisted here. */
(function (root, factory) {
  "use strict";
  const api = Object.freeze(factory());
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.TriaGeminiClient = api;
})(typeof window === "undefined" ? null : window, function () {
  "use strict";
  const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/";

  function extractText(data) {
    return (data.candidates?.[0]?.content?.parts || [])
      .filter(part => typeof part.text === "string")
      .map(part => part.text).join("\n").trim();
  }

  async function request({ apiKey, model, contents, signal, fetchImpl,
                           systemInstruction = null, responseMimeType = null,
                           onHttpError = null }) {
    const body = {
      ...(systemInstruction ? { systemInstruction: { parts: [{ text: systemInstruction }] } } : {}),
      ...(responseMimeType ? { generationConfig: { responseMimeType } } : {}),
      contents
    };
    const response = await fetchImpl(ENDPOINT + encodeURIComponent(model) + ":generateContent", {
      method: "POST", mode: "cors",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify(body), signal, cache: "no-store", credentials: "omit"
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = onHttpError ? onHttpError(response.status, data) : "Gemini HTTP " + response.status;
      throw new Error(message);
    }
    return { status: response.status, data, text: extractText(data) };
  }

  return { request, extractText };
});
