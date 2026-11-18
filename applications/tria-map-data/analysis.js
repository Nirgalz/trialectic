/* Portable JSON boundary. Normative structure is checked without any server. */
(function(root,factory){
 const api=factory(typeof module!=='undefined'&&module.exports?require('./schema-validator.js'):root.TriaSchemaValidation);
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TriaMapData=api;
})(globalThis,function(validate){
 const MAX_BYTES=2_000_000;
 function parseAnalysis(input){
  const json=typeof input==='string'?input:JSON.stringify(input);
  if(typeof json!=='string'||new TextEncoder().encode(json).length>MAX_BYTES)throw Error('Analysis : limite de 2 Mo.');
  let document;try{document=JSON.parse(json.replace(/^\uFEFF/,''));}catch{throw Error('Analysis : JSON invalide.');}
  if(!validate(document))throw Error('Analysis : structure refusée. '+(validate.errors||[]).slice(0,6).map(e=>`${e.instancePath||'/'} ${e.message}`).join('; '));
  const issues=[],objects=new Set(document.objects.map(o=>o.id)),relations=new Set(document.relations.map(r=>`${r.id}@${r.version}`));
  function check(id,where){if(!objects.has(id))throw Error(`Analysis : Objet inconnu ${id} (${where}).`);}
  check(document.main_subject.id,'main_subject');
  for(const r of document.relations){check(r.origin_object.id,r.id);check(r.represented_object.id,r.id);for(const link of r.relation.links)check(link.object_id,r.id);}
  for(const d of document.definitions){check(d.object_id,'definition');for(const c of d.constituents)check(c.id,'constituent');}
  for(const s of document.scenarios){for(const h of s.object_heads)check(h.id,s.id);for(const state of s.states)check(state.object.id,s.id);}
  for(const c of document.conditions){if(!relations.has(`${c.owner_relation.id}@${c.owner_relation.version}`))throw Error(`Analysis : propriétaire de condition inconnu (${c.id}).`);check(c.predicate.object.id,c.id);}
  for(const a of document.can_affiliations||[]){check(a.parent_can.id,a.id);check(a.child_can.id,a.id);}
  if(new Set(document.objects.map(o=>o.id)).size!==document.objects.length)throw Error('Analysis : identifiants d’Objets dupliqués.');
  return {document,issues,validation:'normative-schema-and-map-references',notice:'Structure et références contrôlées ; ni causalité ni validité empirique établies.'};
 }
 return {parseAnalysis,MAX_BYTES};
});
