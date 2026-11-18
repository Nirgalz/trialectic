// Run: node applications/ai-chat-graph/test-map-protocol.cjs
// Pure transport checks: NOT normative Analysis validation or empirical Method tests.
"use strict";
const assert = require("node:assert/strict");
const { decode, interpret, validate, condensedMap } = require("./map-protocol.js");
const uiSchema = require("../../schemas/transport/tria-map-response-v2.schema.json");
const shape = uiSchema.properties.map_patch.properties;
assert.equal(uiSchema.properties.schema.const, "tria-map-response-v2");
assert.deepEqual(uiSchema.required, [
  "schema", "analysis_id", "answer", "tria_instruction_check", "map_patch"
]);
assert.equal(uiSchema.additionalProperties, false);
assert.equal(shape.objects.maxItems, 20);
assert.equal(shape.relations.maxItems, 30);
assert.equal(uiSchema.$defs.candidateObject.properties.id.maxLength, 90);
assert.equal(uiSchema.$defs.candidateRelation.properties.id.maxLength, 90);
assert.equal(uiSchema.$defs.candidateObject.properties.label.maxLength, 160);
assert.equal(uiSchema.$defs.candidateRelation.properties.description.maxLength, 1600);
assert.equal(uiSchema.properties.answer.maxLength, 20000);
assert.deepEqual(uiSchema.properties.tria_instruction_check.properties.status.enum,
  ["acknowledged", "confirmed", "non_compliant", "uncertain"]);
assert.equal(uiSchema.properties.tria_instruction_check.properties.message.maxLength, 1200);


const document = {
  analysis_id: "A-test",
  schema_version: "2.0.0",
  main_subject: { id: "O-1", version: "v1" },
  objects: [
    { id: "O-1", label: "Sujet", category: "system" },
    { id: "C-1", label: "CAN existant", category: "semantic_object" }
  ],
  relations: [
    { id: "R-1", type: "CAN", origin_object: { id: "O-1" },
      represented_object: { id: "C-1" }, CANs: [], NEEDs: [] }
  ]
};
const empty = () => ({ objects: [], relations: [] });
const response = {
  schema: "tria-map-response-v2",
  analysis_id: "A-test",
  answer: "Nouvelle hypothèse à discuter.",
  tria_instruction_check: { status: "confirmed", message: "I am still following trIA." },
  map_patch: {
    objects: [{
      id: "AI-O-1", label: "CAN candidat", category: "semantic_object",
      concept_kind: "CAN", justification: "Condition possible à examiner."
    }],
    relations: [{
      id: "AI-R-1", type: "CAN", origin_object_id: "O-1",
      represented_object_id: "AI-O-1", can_object_ids: ["C-1"], need_object_ids: [],
      description: "Attribution hypothétique.", justification: "Information manquante."
    }]
  }
};
const fresh = () => JSON.parse(JSON.stringify(response));
const snapshot = JSON.stringify(document);

assert.equal(validate(document, response, empty()).answer, response.answer);
assert.equal(interpret(JSON.stringify(response), document, empty()).count, 2);
const fence = String.fromCharCode(96,96,96);
assert.equal(interpret(fence+"json\n" + JSON.stringify(response) + "\n"+fence, document, empty()).kind, "structured");
assert.equal(interpret("Une réponse libre", document, empty()).kind, "plain");
assert.equal(decode("not JSON"), null);
assert.equal(JSON.parse(condensedMap(document, empty())).analysis_id, document.analysis_id);
assert.equal(interpret(JSON.stringify({ ...response, map_patch: empty() }), document, empty()).count, 0);

function rejects(edit, accepted = empty()) {
  const item = fresh();
  edit(item);
  assert.equal(interpret(JSON.stringify(item), document, accepted).kind, "invalid");
}
rejects(x => x.analysis_id = "A-mismatched");
rejects(x => x.schema = "bad");
rejects(x => x.map_patch.relations[0].origin_object_id = "UNKNOWN");
rejects(x => x.map_patch.relations[0].represented_object_id = "UNKNOWN");
rejects(x => x.map_patch.objects[0].id = "O-1");
rejects(x => x.map_patch.objects[0].concept_kind = "NEED");
rejects(x => x.map_patch.objects[0].justification = "");
rejects(x => x.map_patch.objects[0].category = "unsupported");
rejects(x => x.map_patch.relations[0].id = "R-1");
rejects(x => x.map_patch.relations[0].can_object_ids = ["UNKNOWN"]);
rejects(x => x.map_patch.relations[0].can_object_ids = ["C-1", "C-1"]);
rejects(x => x.extra = "unexpected");
rejects(x => x.map_patch.objects = Array.from({length:21},(_,i)=>({...x.map_patch.objects[0],id:"AI-O-"+(i+1)})));
rejects(_ => {}, response.map_patch);
// The first response must acknowledge the instructions and promise adherence.
const first = fresh();
first.tria_instruction_check = {
  status: "acknowledged", message: "I understand and will follow the trIA instructions during this discussion."
};
assert.equal(interpret(JSON.stringify(first), document, empty(), true).kind, "structured");
assert.equal(interpret(JSON.stringify(response), document, empty(), true).kind, "non_compliant");
assert.equal(interpret(JSON.stringify(first), document, empty(), false).kind, "non_compliant");
for (const status of ["non_compliant", "uncertain"]) {
  const item = fresh();
  item.tria_instruction_check = {status, message: "I cannot confirm compliance."};
  const found = interpret(JSON.stringify(item), document, empty(), false);
  assert.equal(found.kind, "non_compliant");
  assert.equal(found.patch, null, "Non-compliant replies must not update Cytoscape.");
}
rejects(x => delete x.tria_instruction_check);
rejects(x => x.tria_instruction_check = {status: "confirmed", message: ""});
rejects(x => x.tria_instruction_check = {status: "invalid_status", message: "Wrong"});
assert.equal(JSON.stringify(document), snapshot, "La validation ne doit pas modifier l'Analysis");
console.log("trIA map transport and first/follow-up compliance checks passed (self-report only).");
