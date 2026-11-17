/* D-97: deterministic, read-only contextual Focus exploration.
   This module does NOT call an AI, assert new facts, or mutate Analysis. */
(function(root, factory) {
  const api=factory();
  if(typeof module!=='undefined' && module.exports) module.exports=api;
  else root.TriaFocusCycle=api;
})(typeof globalThis!=='undefined'?globalThis:this,function() {
  const clone=value=>JSON.parse(JSON.stringify(value));
  function graph(doc) {
    const edges=new Map((doc.objects||[]).map(o=>[o.id,[]]));
    const known=new Set(edges.keys());
    function connect(a,b,reason){
      if(!known.has(a)||!known.has(b)||a===b)return;
      edges.get(a).push({id:b,reason});
      edges.get(b).push({id:a,reason});
    }
    for(const r of doc.relations||[]){
      const origin=r.origin_object?.id, represented=r.represented_object?.id;
      connect(origin,represented,`${r.id} · ${r.type} · attribution/representation`);
      for(const link of r.relation?.links||[]) {
        connect(represented,link.object_id,`${r.id} · ${(link.roles||[]).join('/')||'lien qualifié'}`);
      }
    }
    for(const d of doc.definitions||[])for(const c of d.constituents||[])
      connect(d.object_id,c.id,`constituant · ${d.version}`);
    for(const c of doc.conditions||[]){
      const r=(doc.relations||[]).find(r=>r.id===c.owner_relation?.id &&
        r.version===c.owner_relation?.version);
      if(r)connect(r.represented_object?.id,c.predicate?.object?.id,`condition ${c.id} · ${c.target}`);
    }
    return edges;
  }
  function explore(doc,id) {
    const objects=new Map((doc.objects||[]).map(o=>[o.id,o]));
    if(!objects.has(id))return null;
    const edges=graph(doc), visited=new Map([[id,{distance:0,via:[]}]]), queue=[id];
    for(let i=0;i<queue.length;i++){
      const from=queue[i], current=visited.get(from);
      if(current.distance>=2)continue;
      for(const edge of edges.get(from)||[]){
        if(visited.has(edge.id))continue;
        visited.set(edge.id,{distance:current.distance+1,via:[...current.via,{from,to:edge.id,reason:edge.reason}]});
        queue.push(edge.id);
      }
    }
    const describe=id=>({id,label:objects.get(id)?.label||id,
      distance:visited.get(id).distance,via:visited.get(id).via});
    const direct=[],indirect=[];
    for(const key of visited.keys())if(key!==id)(visited.get(key).distance===1?direct:indirect).push(describe(key));
    const definitions=(doc.definitions||[]).filter(d=>d.object_id===id);
    const relevantRelations=(doc.relations||[]).filter(r=>r.origin_object?.id===id ||
      r.represented_object?.id===id || (r.relation?.links||[]).some(l=>l.object_id===id));
    const semantics={
      label:objects.get(id).label||id,
      definitions:definitions.map(d=>({version:d.version,notes:d.notes||'',
        properties:Object.entries(d.properties||{}).map(([name,value])=>({name,description:value?.description||''}))})),
      relationStatements:relevantRelations.map(r=>({id:r.id,type:r.type,
        description:r.description||'',qualified:r.attribution?.status||'non précisée'}))
    };
    const relevantIds=new Set(visited.keys());
    const needsReview=(doc.scenarios||[]).filter(s=>{
      const assoc=new Set([...(s.object_heads||[]).map(x=>x.id),
        ...(s.states||[]).map(x=>x.object?.id),
        ...(doc.effects||[]).filter(e=>e.scenario_id===s.id).map(e=>e.target_object?.id)]);
      return [...relevantIds].some(id=>assoc.has(id));
    }).map(s=>({id:s.id,reason:'Présence du Sujet Focal ou de son contexte dans le Scénario ; réexamen seulement si une connaissance pertinente évolue.'}));
    const conditions=(doc.conditions||[]).filter(c=>relevantIds.has(c.predicate?.object?.id) ||
      relevantRelations.some(r=>r.id===c.owner_relation?.id))
      .map(c=>({id:c.id,owner:c.owner_relation?.id,
        description:c.notes||c.target||'Qualification à consulter',
        assessed:(doc.condition_assessments||[]).some(a=>a.condition?.id===c.id &&
          a.condition?.owner_id===c.owner_relation?.id)}));
    return {subject:{id,label:objects.get(id).label||id,concept_kind:objects.get(id).concept_kind||null},
      direct,indirect,semantics,conditions,scenarios:needsReview};
  }
  function createCycle(doc) {
    if(!doc||!Array.isArray(doc.objects)||!doc.main_subject?.id)
      throw Error('Analysis requires Objects and a main Subject');
    let mode='detailed',focus=null,refined=false,local=null,review=[],history=[];
    const discovered=new Map();
    function record(type,detail) {
      history.push({seq:history.length+1,type,detail});
    }
    function adopt(id){
      const next=explore(doc,id);if(!next)return false;
      focus=id;local=next;discovered.set(id,next);
      record('adopt',{object_id:id,direct:next.direct.map(x=>x.id),
        indirect:next.indirect.map(x=>x.id)});
      return true;
    }
    function returnOverview() {
      const previous=focus;
      focus=null;local=null;
      const ids=new Set();
      for(const a of discovered.values())for(const sc of a.scenarios)ids.add(sc.id);
      review=[...ids].map(id=>({id,status:'requires_human_or_AI_review',
        reason:'Contexte examiné sous un Focus Object ; aucune conclusion réévaluée automatiquement.'}));
      record('overview',{from:previous,review:review.map(x=>x.id)});
      return review.map(x=>({...x}));
    }
    function setMode(value) {
      if(!['simple','detailed'].includes(value))throw Error('Unknown map mode');
      if(value===mode)return;
      mode=value;refined=false;focus=null;local=null;review=[];discovered.clear();
      record('mode',value);
    }
    function refine(){
      refined=true;
      const seed=focus||doc.main_subject.id;
      const global=explore(doc,seed);
      const shown=new Set([seed,...(global?.direct||[]).map(x=>x.id)]);
      const candidates=(doc.objects||[]).filter(x=>!shown.has(x.id))
        .map(x=>({id:x.id,label:x.label||x.id,reason:'Présent dans la source, pas dans le voisinage immédiat ; pertinence à vérifier.'}));
      const scenarios=(doc.scenarios||[]).map(s=>s.id);
      const missing=(doc.conditions||[]).filter(c=>!(doc.condition_assessments||[]).some(a=>a.condition?.id===c.id &&
        a.condition?.owner_id===c.owner_relation?.id))
        .map(c=>({id:c.id,reason:'Condition sans évaluation enregistrée ; absence de preuve, non échec.'}));
      const report={seed,candidates,scenarios,unassessedConditions:missing,
        disclaimer:'Pistes tirées des données chargées, pas de nouvelles connaissances ni de Scénarios générés par une IA.'};
      record('refine',{seed,candidates:candidates.length,unassessedConditions:missing.length});
      return report;
    }
    function handoff(report) {
      const body=local||explore(doc,doc.main_subject.id);
      return [
        'use trIAd-c',
        `Analyse : ${doc.analysis_id}; mode carte : ${mode}; objet focal : ${body.subject.id}.`,
        'Demande à l\'IA : approfondis explicitement ce Sujet Focal, son Environnement et sa Sémantique.',
        'Évalue la pertinence locale ET pour le problème global et les autres Sujets affectés (D-89).',
        `Sujet focal : ${JSON.stringify(body.subject)}.`,
        `Environnement direct (enregistrements source) : ${JSON.stringify(body.direct)}.`,
        `Connexions indirectes candidates : ${JSON.stringify(body.indirect)}.`,
        `Sémantique déclarée dans les données : ${JSON.stringify(body.semantics)}.`,
        `Conditions liées : ${JSON.stringify(body.conditions)}.`,
        `Scénarios à examiner en cas de nouvelle connaissance pertinente : ${JSON.stringify(body.scenarios)}.`,
        report?`Exploration C+ demandée : ${JSON.stringify(report)}.`:'',
        'N\'invente ni fait, ni causalité, ni nouvelle Actualisation ; distingue hypothèses, omissions et confirmations.',
        'Explique toute révision et ses liens avec le texte de la réponse ; conserve les identités, versions, résultats indépendants et historique.',
        'L\'interface est une projection locale sans moteur IA ; propose les mises à jour justifiées à importer après contrôle.'
      ].filter(Boolean).join('\n\n');
    }
    return {
      get mode(){return mode;},get focus(){return focus;},get refined(){return refined;},
      get local(){return local?clone(local):null;},
      get review(){return clone(review);},
      get history(){return clone(history);},
      setMode,adopt,returnOverview,refine,handoff,
      reset(){mode='detailed';focus=null;refined=false;local=null;review=[];history=[];discovered.clear();}
    };
  }
  return {graph,explore,createCycle};
});
