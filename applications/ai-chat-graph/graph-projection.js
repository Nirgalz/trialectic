/* Provisional, client-specific Cytoscape projection for the trIA chat/map UI.
   Pure mapping only: no UI, API, normative Analysis writes or Method inference.
   A different projection is deliberately retained by triad-graph. */
(function (root, factory) {
  "use strict";
  const api = Object.freeze(factory());
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.TriaGraphProjection = api;
})(typeof window === "undefined" ? null : window, function () {
  "use strict";
  function objectKind(item, mainSubjectId) {
    if (item.id === mainSubjectId) return "main";
    if (item.concept_kind === "CAN" || /^C-/.test(item.id)) return "can";
    if (item.concept_kind === "NEED" || /^N-/.test(item.id)) return "need";
    return "other";
  }
  function buildElements(objects, relations, mainSubjectId) {
    const ids = new Set(objects.map(item => item.id));
    const nodes = objects.map(item => ({
      data: { id: "obj:" + item.id, label: item.label || item.id, kind: objectKind(item, mainSubjectId), family: "object", recordId: item.id, proposed: item.proposed ? "yes" : "no" }
    }));
    const edges = [];
    let i = 0;
    for (const r of relations) {
      if (!r.id || !ids.has(r.origin_object?.id) || !ids.has(r.represented_object?.id)) continue;
      nodes.push({ data: {
        id: "rel:" + r.id, label: (r.type || "Relation") + "\n" + r.id,
        kind: "relation", family: "relation", recordId: r.id, proposed: r.proposed ? "yes" : "no"
      }});
      edges.push({ data: { id: "e:" + (++i), source: "obj:" + r.origin_object.id, target: "rel:" + r.id, kind: "origin", proposed: r.proposed ? "yes" : "no" } });
      edges.push({ data: { id: "e:" + (++i), source: "rel:" + r.id, target: "obj:" + r.represented_object.id, kind: "represented", proposed: r.proposed ? "yes" : "no" } });
      const linked = [...(r.CANs || []), ...(r.NEEDs || [])];
      const seen = new Set();
      for (const ref of linked) {
        if (!ids.has(ref.id) || seen.has(ref.id)) continue;
        seen.add(ref.id);
        const link = (r.relation?.links || []).find(l => l.object_id === ref.id);
        const roles = link?.roles || [];
        const kind = roles.includes("inhibitory") ? "inhibitory"
          : roles.includes("contributive") ? "contributive" : "linked";
        edges.push({ data: { id: "e:" + (++i), source: "obj:" + ref.id, target: "rel:" + r.id, kind, proposed: r.proposed ? "yes" : "no" } });
      }
    }
    return nodes.concat(edges);
  }

  return { buildElements };
});
