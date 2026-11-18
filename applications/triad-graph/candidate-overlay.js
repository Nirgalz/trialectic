/* Experimental proposal overlay for the ONE graphical reference.
   Convert human-imported trIA UI proposals into display-only Cytoscape elements.
   Never mutate the normative Analysis, its history, Scenarios or evaluations. */
(function(root,factory){
  "use strict";
  const api=Object.freeze(factory());
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.TriaCandidateOverlay=api;
})(typeof window==="undefined"?null:window,function(){
  "use strict";
  const key=(family,id,version="")=>family+":"+id+"@"+version;
  function elements(patch,records){
    const nodes=[],edges=[];
    for(const o of patch.objects){
      const uid=key("object",o.id);
      const raw={...o,proposed:true};
      records.set(uid,{family:"object",id:o.id,raw});
      nodes.push({data:{id:uid,label:o.label,kind:"object",
        visualKind:o.concept_kind||"object",proposed:"yes"}});
    }
    for(const r of patch.relations){
      const uid=key("relation",r.id,"candidate");
      const raw={...r,version:"candidate",proposed:true};
      records.set(uid,{family:"relation",id:r.id,raw});
      nodes.push({data:{id:uid,label:"? "+r.type+" · "+r.id,
        kind:"relation",proposed:"yes"}});
      const edge=(suffix,source,target,label)=>edges.push({data:{
        id:"proposal-edge:"+r.id+":"+suffix,source,target,label,
        sourceLabel:label,kind:"candidate",proposed:"yes"
      }});
      edge("origin",key("object",r.origin_object_id),uid,"Attribution proposée");
      edge("represented",uid,key("object",r.represented_object_id),"Objet représenté");
      for(const id of r.can_object_ids)edge("can:"+id,uid,key("object",id),"CAN lié · hypothèse");
      for(const id of r.need_object_ids)edge("need:"+id,uid,key("object",id),"NEED lié · hypothèse");
    }
    return nodes.concat(edges);
  }
  return {elements};
});
