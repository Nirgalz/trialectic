/* Analysis -> renderer-neutral map. No DOM, network or Cytoscape dependency. */
(function(root,factory){
 const api=factory(typeof module!=='undefined'&&module.exports?require('./semantics.js'):root);
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TriaMapProjection=api;
})(globalThis,function({conditionSymbol,linkAppearance,scenarioAssociatedObjects}){
 const key=(family,id,version='')=>`${family}:${id}@${version}`;
 function projectAnalysis(source,{view='objects',scenarioId,translate=s=>s}={}){
  const documentModel=JSON.parse(JSON.stringify(source));let records=new Map();
  const currentScenario=()=>documentModel.scenarios.find(s=>s.id===(scenarioId||documentModel.scenarios[0]?.id));
  const UII18n={translate};

function addNode(elements, family, id, label, raw, kind=family, version='') {
  const uid=key(family,id,version); records.set(uid,{family,id,raw});
  const animationParent=family==='object'&&raw.parent_id?key('object',raw.parent_id):family==='scenario'&&raw.parent_scenario_id?key('scenario',raw.parent_scenario_id):family==='relation'?key('object',raw.origin_object.id):family==='condition'?key('relation',raw.condition.owner_relation.id,raw.condition.owner_relation.version):null;
  elements.push({data:{id:uid,label,kind,animationParent}}); return uid;
}
function projection(a) {
  records = new Map(); const es=[], obj = new Map();
  a.objects.forEach(o=>{
    obj.set(o.id,addNode(es,'object',o.id,o.label||o.id,o,o.concept_kind||'object'));
    const roles=[...new Set(a.relations.filter(r=>r.represented_object.id===o.id).map(r=>r.type))];
    es[es.length-1].data.visualKind=o.concept_kind||(roles.length===1?roles[0]:'object');
  });
  let edgeCount=0;
  function edge(source,target,label,raw,kind='context',appearance={}) {
    if(!source||!target)return;
    const id='edge:'+(++edgeCount); records.set(id,{family:kind,id:raw.id||id,raw});
    es.push({data:{id,source,target,label:UII18n.translate(label),sourceLabel:label,kind,...appearance}});
  }
  a.relations.forEach(r=>{
    const uncertain=!r.attribution||r.attribution.status==='indeterminate';
    const n=addNode(es,'relation',r.id,`${uncertain?'? ':''}${r.type} · ${r.id}`,r,'relation',r.version);
    edge(obj.get(r.origin_object.id),n,'attribution'+(uncertain?' ?':''),r,'attribution');
    edge(n,obj.get(r.represented_object.id),'Objet représenté',r,'representation');
    r.relation.links.forEach(l=>{
      const appearance=linkAppearance(l,r.type);
      edge(n,obj.get(l.object_id),`${appearance.label}${uncertain?' ?':''}`,{...l,relation_record:{id:r.id,version:r.version}},'qualified',appearance);
    });
  });
  (a.can_affiliations||[]).forEach(f=>edge(obj.get(f.parent_can.id),obj.get(f.child_can.id),`${f.kind}${f.qualification.status==='indeterminate'?' ?':''}`,f,'affiliation',{functionName:f.kind}));
  a.definitions.forEach(d=>d.constituents.forEach(c=>edge(obj.get(d.object_id),obj.get(c.id),`constituant · ${d.version}`,d,'composition')));
  const s=currentScenario();
  a.conditions.forEach(c=>{ const assessments=a.condition_assessments.filter(x=>x.scenario_id===s?.id&&x.condition.id===c.id&&x.condition.owner_id===c.owner_relation.id); const mark=conditionSymbol(assessments); const n=addNode(es,'condition',`${c.owner_relation.id}/${c.id}`,`${mark} ${c.id}\n${assessments.map(x=>x.status).join(', ')||'non évaluée'}`,{condition:c,assessments}); es[es.length-1].data.statusTone=mark==='✓'?'positive':mark==='×'?'negative':'unknown'; edge(n,key('relation',c.owner_relation.id,c.owner_relation.version),c.target,c,'condition'); });
  return es;
}
function scenariosProjection() {
  records=new Map();const es=[];
  documentModel.scenarios.forEach(s=>addNode(es,'scenario',s.id,`${s.id} · ${s.mode}\n${(s.assumptions?.find(t=>!t.startsWith('Tout le cas'))||s.notes||'').slice(0,90)}`,s));
  documentModel.scenarios.forEach(s=>{if(s.parent_scenario_id&&documentModel.scenarios.some(p=>p.id===s.parent_scenario_id)){
    const id='branch:'+s.id;records.set(id,{family:'scenario_branch',id,raw:s});
    es.push({data:{id,source:key('scenario',s.parent_scenario_id),target:key('scenario',s.id),label:'branche',kind:'membership'}});
  }});return es;
}
function scenarioProjection() {
  const s=currentScenario();if(!s)return [];
  const associated=scenarioAssociatedObjects(documentModel,s);
  const pins=new Map(s.object_heads.map(h=>[h.id,h.version]));
  const relations=documentModel.relations.filter(r=>associated.has(r.origin_object.id)&&associated.has(r.represented_object.id));
  const relationPins=new Set(relations.map(r=>r.id+'@'+r.version));
  const es=projection({...documentModel,objects:documentModel.objects.filter(o=>associated.has(o.id)),
    definitions:documentModel.definitions.filter(d=>associated.has(d.object_id)&&(!pins.has(d.object_id)||pins.get(d.object_id)===d.version)),
    relations,can_affiliations:(documentModel.can_affiliations||[]).filter(f=>associated.has(f.parent_can.id)&&associated.has(f.child_can.id)),
    conditions:documentModel.conditions.filter(c=>relationPins.has(c.owner_relation.id+'@'+c.owner_relation.version))});
  const nodes=new Set(es.filter(e=>!e.data.source).map(e=>e.data.id));
  return es.filter(e=>!e.data.source||(nodes.has(e.data.source)&&nodes.has(e.data.target)));
}

  const elements=view==='objects'?projection(documentModel):view==='scenario'?scenarioProjection():scenariosProjection();
  return {schema:'tria-map-v1',nodes:elements.filter(e=>!e.data.source).map(e=>e.data),
   edges:elements.filter(e=>e.data.source).map(e=>e.data),records:[...records]};
 }
 return {key,projectAnalysis};
});
