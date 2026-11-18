/* Adapt a first-turn Codex proposal to an in-session Analysis. */
(function (root) {
  "use strict";
  const schema = "tria-codex-analysis-draft-v1";
  const version = "v1";
  const source = "Codex-generated working draft from the analyst's message; pending analyst review.";
  const ref = id => ({ id, version });
  const targets = new Set(["actionability", "need_satisfaction", "relation_applicability"]);
  const comparisons = new Set(["greater_than", "greater_or_equal", "less_than", "less_or_equal"]);
  const operators = new Set(["equals", "not_equals", "exists", ...comparisons]);
  const statuses = new Set(["satisfied", "unsatisfied", "indeterminate"]);
  const offsetTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

  function conditionRecords(drafts, relations, objectIds, scenarios, question) {
    if (!Array.isArray(drafts) || drafts.length > 30) throw Error("A draft may contain up to 30 conditions.");
    const relationById = new Map(relations.map(relation => [relation.id, relation]));
    const usedIds = new Set();
    const conditions = [], conditionAssessments = [], evidenceItems = [];
    const recordedAt = new Date().toISOString();
    for (const draft of drafts) {
      const { id, owner_relation_id, target, object_id, property, operator, value, description,
        assessments = [] } = draft ?? {};
      const relation = relationById.get(owner_relation_id);
      if (typeof id !== "string" || !/^AI-K-[A-Za-z0-9][A-Za-z0-9._:-]{0,83}$/.test(id) || usedIds.has(id))
        throw Error("Draft conditions need distinct AI-K- identifiers.");
      if (!relation || !objectIds.has(object_id) || !targets.has(target) ||
          (target === "actionability" && relation.type !== "CAN") ||
          (target === "need_satisfaction" && relation.type !== "NEED"))
        throw Error(`${id} must target a compatible draft relation and reference a draft Object.`);
      const scalar = value === null || ["boolean", "string"].includes(typeof value) || Number.isFinite(value);
      if (typeof property !== "string" || !property.trim() || property.length > 160 ||
          typeof description !== "string" || !description.trim() || description.length > 1600 ||
          !operators.has(operator) || (operator !== "exists" && !scalar) ||
          (comparisons.has(operator) && !Number.isFinite(value)))
        throw Error(`${id} must describe a valid condition predicate.`);
      usedIds.add(id);
      const predicate = { object: ref(object_id), property, operator };
      if (operator !== "exists") predicate.value = value;
      conditions.push({ id, owner_relation: ref(owner_relation_id), target, predicate, notes: description });

      if (!Array.isArray(assessments) || assessments.length > scenarios.length)
        throw Error(`${id} may contain at most one reported assessment per Scenario.`);
      const assessedScenarios = new Set();
      for (const assessment of assessments) {
        const { scenario_index, at, status, evidence_quote } = assessment ?? {};
        const scenario = Number.isInteger(scenario_index) ? scenarios[scenario_index - 1] : undefined;
        if (!scenario || assessedScenarios.has(scenario.id) || !statuses.has(status) || typeof at !== "string" ||
            !offsetTime.test(at) || !Number.isFinite(Date.parse(at)) || typeof evidence_quote !== "string" ||
            evidence_quote.length > 1200 || !evidence_quote.includes(at) || !question.includes(evidence_quote)) continue;
        const ids = new Set(scenario.object_heads.map(head => head.id));
        if (![object_id, relation.origin_object.id, relation.represented_object.id].every(id => ids.has(id))) continue;
        assessedScenarios.add(scenario.id);
        const evidenceId = `EV-${id}-${scenario.id}`;
        evidenceItems.push({
          id: evidenceId, root_id: evidenceId, method: "unknown", recorded_at: recordedAt,
          source: evidence_quote, context: scenario.id,
          provenance: "Verbatim report from the analyst's message; pending review."
        });
        conditionAssessments.push({
          id: `CA-${id}-${scenario.id}`, scenario_id: scenario.id,
          condition: { ...ref(id), kind: "condition", owner_id: owner_relation_id },
          at, status, evidence_ids: [evidenceId]
        });
      }
    }
    return { conditions, condition_assessments: conditionAssessments, evidence_items: evidenceItems };
  }

  function build(envelope, mapProtocol, analysisId, question = "") {
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
    const assessments = conditionRecords(draft.conditions === undefined ? [] : draft.conditions,
      relations, objectIds, scenarios, question);
    return {
      schema_version: "2.2.0", analysis_id: analysisId, main_subject: ref(draft.main_subject_id),
      secondary_subjects: [], environment, focus: { type: "Scenario", scenario_id: scenarios[0].id },
      objects, definitions, relations, scenarios, claims, ...assessments, can_affiliations: [],
      pathways: [], inventories: [], events: [], power_assessments: [],
      effects: [], evidence_reviews: [], claim_assessments: []
    };
  }

  const api = { schema, build };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.TriaAnalysisDraft = api;
})(typeof window === "undefined" ? globalThis : window);
