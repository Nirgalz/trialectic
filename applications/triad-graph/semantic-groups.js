/* Experimental, non-normative semantic grouping projection.
   Does NOT modify the source Analysis or assert a new NEED/CAN relation.
   Group identifiers belong to this UI only and are not Object IDs. */
(function(root,factory) {
  const api=factory();
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.TriaSemanticGroups=api;
})(globalThis,function() {
  const objectUid=id=>'object:'+id+'@';
  const setUid=id=>'semantic-set:'+id;
  function objectDescendants(group,byId,seen=new Set()) {
    if(seen.has(group.id))return []; // A cycle must not recurse forever.
    const visited=new Set(seen);visited.add(group.id);
    const found=[];
    for(const child of group.members||[]) {
      if(child.type==='object')found.push(child.id);
      else if(child.type==='set'&&byId.has(child.id))found.push(...objectDescendants(byId.get(child.id),byId,visited));
    }
    return [...new Set(found)];
  }
  function project(elements,relations,groups,versionedKey) {
    const byId=new Map(groups.map(group=>[group.id,group]));
    const referencedGroups=new Set(groups.flatMap(g=>(g.members||[]).filter(m=>m.type==='set').map(m=>m.id)));
    const roots=groups.filter(g=>!referencedGroups.has(g.id));
    const owner=new Map(), active=[];
    function assign(g,ancestor=null,stack=new Set()) {
      if(stack.has(g.id))return;
      const seen=new Set(stack);seen.add(g.id);
      const selected=ancestor||(g.collapsed?g:null);
      if(g.collapsed&&!ancestor)active.push(g);
      for(const member of g.members||[]) {
        if(member.type==='object') {
          if(selected)owner.set(objectUid(member.id),setUid(selected.id));
        } else if(member.type==='set'&&byId.has(member.id))assign(byId.get(member.id),selected,seen);
      }
    }
    roots.forEach(g=>assign(g));
    if(!owner.size)return {elements,records:[],activeIds:[]};
    const nodes=new Set(elements.filter(e=>!e.data.source).map(e=>e.data.id));
    const touched=new Set();const summary=new Map();
    const proxy=id=>owner.get(objectUid(id))||objectUid(id);
    function addSummary(a,b,reference) {
      if(a===b||!nodes.has(a)&&!a.startsWith('semantic-set:')||!nodes.has(b)&&!b.startsWith('semantic-set:'))return;
      if(!a.startsWith('semantic-set:')&&!b.startsWith('semantic-set:'))return;
      const [from,to]=[a,b].sort(),id=from+'|'+to;
      const item=summary.get(id)||{from,to,references:new Set()};
      item.references.add(reference);summary.set(id,item);
    }
    for(const r of relations) {
      const relId=versionedKey('relation',r.id,r.version);
      if(!nodes.has(relId))continue; // Do not reveal omitted records in A/simple view.
      const members=[r.origin_object.id,r.represented_object.id,...(r.relation?.links||[]).map(l=>l.object_id)];
      if(!members.some(id=>owner.has(objectUid(id))))continue;
      touched.add(relId);
      members.forEach((id,i)=>members.slice(i+1).forEach(id2=>addSummary(proxy(id),proxy(id2),r.id+'@'+r.version)));
    }
    const hidden=new Set(owner.keys());
    for(const relId of touched) {
      hidden.add(relId);
      const rel=relations.find(r=>versionedKey('relation',r.id,r.version)===relId);
      if(rel)for(const nodeId of nodes)if(nodeId.startsWith('condition:'+rel.id+'/'))hidden.add(nodeId);
    }
    // Direct Object-to-Object source edges (e.g. composition, CAN affiliation) also need a qualified summary.
    for(const element of elements) {
      const d=element.data;
      if(!d.source)continue;
      const from=owner.get(d.source)||d.source,to=owner.get(d.target)||d.target;
      if((from!==d.source||to!==d.target)&&d.source.startsWith('object:')&&d.target.startsWith('object:'))
        addSummary(from,to,d.kind+' · '+d.id);
    }
    const output=elements.filter(({data:d})=>!hidden.has(d.id)&&(!d.source||!hidden.has(d.source)&&!hidden.has(d.target)));
    const additional=[];
    for(const group of active) {
      const uid=setUid(group.id);
      // A collapsed group must contain at least one Object in the currently projected map.
      if(![...owner.entries()].some(([id,proxyId])=>proxyId===uid&&nodes.has(id)))continue;
      const members=objectDescendants(group,byId);
      output.push({data:{id:uid,label:group.label,kind:'semantic-set',visualKind:'semantic-set'}});
      additional.push([uid,{family:'semantic-group',id:group.id,raw:{
        label:group.label,meaning:group.meaning,memberObjectIds:members,
        presentation_only:true,notice:'Unité de sens proposée par l\'analyste ; ce groupe n\'est pas un Objet normatif.'}}]);
    }
    const available=new Set(output.filter(e=>!e.data.source).map(e=>e.data.id));
    let n=0;
    for(const item of summary.values()) {
      if(!available.has(item.from)||!available.has(item.to))continue;
      const id='semantic-link:'+(++n);
      output.push({data:{id,source:item.from,target:item.to,
        label:'liens à examiner ('+item.references.size+')',kind:'semantic-summary'}});
      additional.push([id,{family:'semantic-link-summary',id,raw:{
        source:item.from,target:item.to,sourceReferences:[...item.references],
        qualification:'display-only; source links to inspect; not NEED/CAN or causal attribution'}}]);
    }
    return {elements:output,records:additional,activeIds:active.map(g=>g.id)};
  }
  return {project,objectDescendants};
});