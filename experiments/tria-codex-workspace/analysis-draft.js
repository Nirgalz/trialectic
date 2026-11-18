/* Adapt a first-turn Codex proposal to an in-session Analysis, without recording evidence. */
(function (root) {
  "use strict";
  const schema = "tria-codex-analysis-draft-v1";
  const version = "v1";
  const source = "Codex-generated working draft from the analyst's message; pending analyst review.";
  const ref = id => ({ id, version });

  function build(envelope, mapProtocol, analysisId) {
    const draft = envelope.analysis_draft;
    const { map_patch: patch } = mapProtocol.validate({ analysis_id: analysisId }, {
      schema: "tria-map-response-v2", analysis_id: analysisId, answer: envelope.answer,
      tria_instruction_check: envelope.tria_instruction_check, map_patch: envelope.map_patch
    });
    const objectIds = new Set(patch.objects.map(object => object.id));
    if (!objectIds.has(draft?.main_subject_id)) throw Error("The draft must identify a Main Subject from its Objects.");
    function references(ids, label) {
      if (!Array.isArray(ids) || new Set(ids).size !== ids.length || ids.some(id => !objectIds.has(id)))
        throw Error(label + " must reference distinct Objects from the draft.");
      return ids.map(ref);
    }
    const environment = references(draft.environment_object_ids, "Environment");
    if (!Array.isArray(draft.scenarios) || !draft.scenarios.length || draft.scenarios.length > 12)
      throw Error("The draft must contain between 1 and 12 hypothetical Scenarios.");
    const scenarios = draft.scenarios.map((scenario, index) => {
      const objects = references(scenario?.object_ids, "Scenario " + (index + 1));
      if (!objects.length || !Array.isArray(scenario.assumptions) || !scenario.assumptions.length ||
          scenario.assumptions.length > 12 || scenario.assumptions.some(
            text => typeof text !== "string" || !text.trim() || text.length > 500
          )) throw Error("Each Scenario needs Objects and short assumptions.");
      return {
        id: "S-" + (index + 1), parent_scenario_id: null, mode: "hypothetical",
        object_heads: objects, states: [], event_ids: [], assumptions: scenario.assumptions, notes: source
      };
    });
    const objects = patch.objects.map(object => ({
      id: object.id, label: object.label, category: object.category,
      parent_id: null, temporary_child_ids: [], actualised_child_ids: [],
      ...(object.concept_kind ? { concept_kind: object.concept_kind } : {})
    }));
    const claims = [], byBearer = new Map(objects.map(object => [object.id, []]));
    const relations = patch.relations.map(relation => {
      const claim = { id: "CL-" + relation.id, version, statement: relation.description, scope: source };
      claims.push(claim);
      byBearer.get(relation.origin_object_id).push(ref(relation.id));
      const links = [
        ...relation.need_object_ids.map(id => [id, "NEEDs"]),
        ...relation.can_object_ids.map(id => [id, "CANs"])
      ].map(([id, list], index) => ({
        id: `L-${relation.id}-${index + 1}`, object_id: id, source_list: list, causality: "indeterminate"
      }));
      return {
        id: relation.id, version, type: relation.type, description: relation.description,
        origin_object: ref(relation.origin_object_id), represented_object: ref(relation.represented_object_id),
        NEEDs: relation.need_object_ids.length ? relation.need_object_ids.map(ref) : null,
        CANs: relation.can_object_ids.length ? relation.can_object_ids.map(ref) : null,
        relation: { nature: [], links }, attribution: {
          status: "indeterminate", scope: source, justification: relation.justification,
          claim_id: claim.id, claim_version: version
        }
      };
    });
    const definitions = patch.objects.map(object => ({
      object_id: object.id, version, constituents: [], properties: {}, relation_refs: byBearer.get(object.id),
      notes: source + " " + object.justification
    }));
    return {
      schema_version: "2.2.0", analysis_id: analysisId, main_subject: ref(draft.main_subject_id),
      secondary_subjects: [], environment, focus: { type: "Scenario", scenario_id: scenarios[0].id },
      objects, definitions, relations, scenarios, claims, can_affiliations: [], conditions: [],
      pathways: [], inventories: [], events: [], condition_assessments: [], power_assessments: [],
      effects: [], evidence_items: [], evidence_reviews: [], claim_assessments: []
    };
  }

  const api = { schema, build };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.TriaAnalysisDraft = api;
})(typeof window === "undefined" ? globalThis : window);
