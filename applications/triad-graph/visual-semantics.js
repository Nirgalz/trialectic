/* Visual vocabulary; never modifies Analysis or infers empirical validity. */
(function(root){
  function conditionSymbol(assessments){
    const statuses=[...new Set(assessments.map(a=>a.status))];
    return statuses.length===1?({satisfied:'✓',unsatisfied:'×'}[statuses[0]]||'?'):'?';
  }
  function linkAppearance(link,relationType){
    const roles=link.roles||[], labels={contributive:'contribue',enabling:'permet',inhibitory:'inhibe'};
    const directional=roles.filter(r=>r in labels);
    const functionName=directional.length===1?directional[0]:'qualified';
    // A link's Object enables/inhibits the relation being analyzed. A CAN
    // contributes towards its listed NEED; a NEED receives listed CAN support.
    const atSource=functionName==='enabling'||functionName==='inhibitory'||(functionName==='contributive'&&relationType==='NEED');
    return {functionName,arrowEnd:atSource?'source':'target',
      label:roles.length?roles.map(r=>labels[r]||r).join(' · '):'rôle non précisé'};
  }
  function scenarioAssociatedObjects(doc,scenario){
    return new Set([...(scenario.object_heads||[]).map(h=>h.id),...(scenario.states||[]).map(s=>s.object.id),
      ...(doc.effects||[]).filter(e=>e.scenario_id===scenario.id).map(e=>e.target_object.id)]);
  }
  const api={conditionSymbol,linkAppearance,scenarioAssociatedObjects};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else Object.assign(root,api);
})(typeof window==='undefined'?globalThis:window);
