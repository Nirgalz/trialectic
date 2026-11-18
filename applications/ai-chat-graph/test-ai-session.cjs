// Run: node applications/ai-chat-graph/test-ai-session.cjs
// Browserless client contract test: fake API replies; not a live provider test.
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const TriaMapProtocol = require("./map-protocol.js");
const source = fs.readFileSync(path.join(__dirname, "app.js"), "utf8");
const method = fs.readFileSync(path.join(__dirname, "../../reference/tria-ai-instructions.md"), "utf8");

class Element {
  constructor(id) {
    Object.assign(this, { id, value: "", textContent: "", type: "text", hidden: false,
      disabled: false, checked: false, children: [], handlers: {}, attrs: {}, files: [] });
    this.classList = { toggle() {}, add() {}, remove() {} };
  }
  addEventListener(event, fn) { this.handlers[event] = fn; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  setAttribute(key, value) { this.attrs[key] = value; }
  remove() { this.removed = true; }
  focus() {}
  click() {}
  get scrollHeight() { return 1; }
  set scrollTop(value) { this.lastScroll = value; }
  requestSubmit() { return this.handlers.submit?.({ preventDefault() {} }); }
}
async function verifyProvider(provider, instructionsField) {
  const elements = new Map();
  const byId = id => {
    if (!elements.has(id)) elements.set(id, new Element(id));
    return elements.get(id);
  };
  const document = {
    getElementById: byId,
    createElement: tag => new Element(tag),
    createTextNode: text => ({ textContent: text }),
    body: { setAttribute() {} }
  };
  const sent = [];
  let replyIndex = 0;
  const replies = ["acknowledged", "confirmed", "non_compliant", "acknowledged"];
  const fixture = {
    analysis_id: "A-test", schema_version: "2.0.0", main_subject: { id: "O-main" },
    objects: [{ id: "O-main", label: "Main Subject", category: "system" }],
    relations: [], definitions: []
  };
  const fetch = async (url, options) => {
    if (url.endsWith("tria-ai-instructions.md"))
      return { ok: true, text: async () => method };
    if (url.endsWith("focus-pilot.json"))
      return { ok: true, json: async () => fixture };
    assert.ok(url.includes("generativelanguage.googleapis.com") ||
      url.includes("api.openai.com") || url.includes("api.anthropic.com"));
    sent.push(JSON.parse(options.body));
    const response = {
      schema: "tria-map-response-v2", analysis_id: "A-test",
      answer: "Example answer.",
      tria_instruction_check: {
        status: replies[replyIndex++],
        message: "I understand / I still follow trIA instructions."
      },
      map_patch: { objects: [], relations: [] }
    };
    if (replyIndex === 1) {
      response.map_patch = {
        objects: [{ id: "AI-O-1", label: "Candidate", category: "semantic_object",
          concept_kind: "CAN", justification: "Candidate requiring review." }],
        relations: [{ id: "AI-R-1", type: "CAN", origin_object_id: "O-main",
          represented_object_id: "AI-O-1", can_object_ids: [], need_object_ids: [],
          description: "Candidate relation", justification: "Unverified mechanism." }]
      };
    }
    const responseText = JSON.stringify(response);
    const result = provider === "gemini"
      ? { candidates: [{ content: { parts: [{ text: responseText }] } }] }
      : provider === "openai"
        ? { output: [{ content: [{ type: "output_text", text: responseText }] }] }
        : { content: [{ type: "text", text: responseText }] };
    return { ok: true, json: async () => result };
  };
  class Controller {
    constructor() { this.signal = {}; }
    abort() {}
  }
  const initialize = new Function("document", "fetch", "TriaMapProtocol",
    "cytoscape", "AbortController", "setTimeout", "clearTimeout",
    "requestAnimationFrame", source);
  initialize(document, fetch, TriaMapProtocol, undefined, Controller,
    setTimeout, clearTimeout, () => {});
  for (let i = 0; i < 10; i++) await Promise.resolve();
  if (provider !== "gemini") {
    byId("provider").value = provider;
    byId("provider").handlers.change({ target: { value: provider } });
  }
  byId("model").value = { gemini: "gemini-2.5-flash", openai: "gpt-5.4-mini",
    anthropic: "claude-sonnet-4-6" }[provider];
  byId("api-key").value = "FAKE_KEY";
  async function submit(prompt) {
    byId("prompt").value = prompt;
    await byId("chat-form").handlers.submit({ preventDefault() {} });
  }
  await submit("First request");
  assert.equal(sent.length, 1);
  const instructionPayload = provider === "gemini"
    ? sent[0].systemInstruction.parts[0].text
    : sent[0][instructionsField];
  assert.equal(instructionPayload, method, provider + ": first request must send the full method");
  assert.match(byId("status").textContent, /Instructions trIA reconnues/);
  byId("proposal-accept").handlers.click();
  assert.match(byId("status").textContent, /Propositions ajoutées/);
  await submit("Second request");
  assert.equal(sent.length, 2);
  assert.equal(Object.hasOwn(sent[1], instructionsField), false,
    provider + ": subsequent requests must omit the method");
  const requestContent = provider === "gemini" ? sent[1].contents.at(-1).parts[0].text
    : provider === "openai" ? sent[1].input.at(-1).content
      : sent[1].messages.at(-1).content;
  assert.match(requestContent, /Contrôle trIA/);
  assert.match(byId("status").textContent, /Respect trIA déclaré/);
  await submit("Third request");
  assert.equal(sent.length, 3);
  assert.equal(Object.hasOwn(sent[2], instructionsField), false);
  assert.match(byId("status").textContent, /Erreur trIA/);
  byId("chat-reset").handlers.click();
  await submit("New discussion");
  assert.equal(sent.length, 4);
  assert.ok(Object.hasOwn(sent[3], instructionsField), "Reset must allow a new initialization");
}
(async () => {
  await verifyProvider("gemini", "systemInstruction");
  await verifyProvider("openai", "instructions");
  await verifyProvider("anthropic", "system");
  console.log("trIA session tests passed for Gemini, OpenAI and Claude (mocked API responses only).");
})().catch(error => { console.error(error); process.exitCode = 1; });
