/* Display projection only. Source Analysis records are never mutated. */
const $ = id => document.getElementById(id);
let documentModel, cy, view = 'objects', selected = null, issues = [], records = new Map();
let centeredNode = null, overviewPositions = new Map();
let activeLayout = null;
function frameGraph(elements, anchor=null) {
  if(!anchor){cy.fit(elements,45);return;}
  const b=elements.boundingBox(),p=anchor.position();
  const halfWidth=Math.max(p.x-b.x1,b.x2-p.x,60);
  const halfHeight=Math.max(p.y-b.y1,b.y2-p.y,60);
  cy.zoom(Math.max(.05,Math.min(1.35,(cy.width()-90)/(2*halfWidth),(cy.height()-90)/(2*halfHeight))));
  cy.center(anchor);
}
function organicLayout(elements, anchor=null) {
  activeLayout?.stop(); cy.stop();
  if(view==='process') {
    const positions=[{x:-150,y:50},{x:20,y:-115},{x:165,y:90}];
    elements.nodes().forEach((n,i)=>n.position(positions[i]));
    frameGraph(elements,anchor);return;
  }
  const subject=anchor&&records.get(anchor.id())?.family==='object'?anchor.id():key('object',documentModel.main_subject.id);
  cy.nodes().removeClass('layout-center');cy.getElementById(subject).addClass('layout-center');
  const positions=hierarchyPositions(elements.nodes().map(n=>({id:n.id(),kind:n.data('kind')})),
    elements.edges().map(e=>({source:e.source().id(),target:e.target().id()})),
    documentModel.relations.map(r=>({id:key('relation',r.id,r.version),origin:key('object',r.origin_object.id),target:key('object',r.represented_object.id),type:r.type})),subject);
  const origin=anchor?positions.get(anchor.id()):{x:0,y:0};
  elements.nodes().forEach(n=>{const p=positions.get(n.id());n.position({x:p.x-(origin?.x||0),y:p.y-(origin?.y||0)});});
  // Distinct curved lanes for parallel edges; opposite directions share a group.
  const lanes=new Map();
  elements.edges().forEach(e=>{const pair=[e.source().id(),e.target().id()].sort().join('|');if(!lanes.has(pair))lanes.set(pair,[]);lanes.get(pair).push(e);});
  lanes.forEach(group=>group.forEach((e,i)=>{
    const direction=e.source().id()<e.target().id()?1:-1;
    e.style({'control-point-distances':direction*(22+(i-(group.length-1)/2)*42),'control-point-weights':.4+(i%3)*.1,'text-margin-y':i%2?-9:9});
  }));
  frameGraph(elements,anchor||cy.getElementById(subject));
}
const text = (parent, tag, value, cls) => { const e = document.createElement(tag); e.textContent = value; if(cls)e.className=cls; parent.append(e); return e; };
const pretty = x => JSON.stringify(x, null, 2);
const currentScenario = () => documentModel.scenarios.find(s => s.id === $('scenario').value);
const key = (family, id, version='') => `${family}:${id}@${version}`;
function addNode(elements, family, id, label, raw, kind=family, version='') {
  const uid=key(family,id,version); records.set(uid,{family,id,raw});
  elements.push({data:{id:uid,label,kind}}); return uid;
}
function projection(a) {
  records = new Map(); const es=[], obj = new Map();
  a.objects.forEach(o=>obj.set(o.id,addNode(es,'object',o.id,o.label||o.id,o,o.concept_kind||'object')));
  let edgeCount=0;
  function edge(source,target,label,raw,kind='context') {
    if(!source||!target)return;
    const id='edge:'+(++edgeCount); records.set(id,{family:kind,id:raw.id||id,raw});
    es.push({data:{id,source,target,label,kind}});
  }
  a.relations.forEach(r=>{
    const n=addNode(es,'relation',r.id,`${r.type} · ${r.id}\n${r.attribution?.status||'attribution non qualifiée'}`,r,'relation',r.version);
    edge(obj.get(r.origin_object.id),n,'porteur',r);
    edge(n,obj.get(r.represented_object.id),'Objet représenté',r);
    r.relation.links.forEach(l=>edge(n,obj.get(l.object_id),`${l.source_list}: ${(l.roles||[]).join(', ')||'rôle non précisé'}`,{...l,relation_record:{id:r.id,version:r.version}},'qualified'));
  });
  (a.can_affiliations||[]).forEach(f=>edge(obj.get(f.parent_can.id),obj.get(f.child_can.id),`${f.kind} · ${f.qualification.status}`,f,'affiliation'));
  a.definitions.forEach(d=>d.constituents.forEach(c=>edge(obj.get(d.object_id),obj.get(c.id),`constituant · ${d.version}`,d)));
  const s=currentScenario();
  if(s){const n=addNode(es,'scenario',s.id,`${s.id} · ${s.mode}`,s);s.object_heads.forEach(h=>edge(n,obj.get(h.id),`tête · ${h.version}`,h));}
  a.conditions.forEach(c=>{ const assessments=a.condition_assessments.filter(x=>x.scenario_id===s?.id&&x.condition.id===c.id&&x.condition.owner_id===c.owner_relation.id); const n=addNode(es,'condition',`${c.owner_relation.id}/${c.id}`,`${c.id}\n${assessments.map(x=>x.status).join(', ')||'non évaluée'}`,{condition:c,assessments}); edge(n,key('relation',c.owner_relation.id,c.owner_relation.version),c.target,c); });
  return es;
}
function processProjection() {
  records=new Map(); const phases=['Comprendre','Explorer','Décider'];
  const es=phases.map((p,i)=>{records.set('phase'+i,{family:'process',id:p,raw:{phase:p,status:p===$('phase').value?'affichée':'non exécutée par le prototype',scope:'Métadonnée de présentation locale ; aucun champ normatif ajouté.'}});return{data:{id:'phase'+i,label:p,kind:'process'}};});
  es.push({data:{id:'p01',source:'phase0',target:'phase1',label:'alternatives à explorer'}},{data:{id:'p12',source:'phase1',target:'phase2',label:'décision facultative dans cet usage'}},{data:{id:'p20',source:'phase2',target:'phase0',label:'réévaluation possible'}});return es;
}
function render() {
  centeredNode=null; overviewPositions=new Map();
  $('overview').disabled=true; $('scope').textContent='Tous les éléments';
  const es=view==='objects'?projection(documentModel):processProjection();
  activeLayout?.stop(); activeLayout=null;
  if(cy)cy.destroy();
  const css=getComputedStyle(document.documentElement),color=n=>css.getPropertyValue(n).trim();
  cy=cytoscape({container:$('cy'),elements:es,layout:{name:'preset'},style:[
    {selector:'node',style:{'label':'data(label)','background-color':color('--accent'),'color':color('--ink'),'font-size':12,'text-wrap':'wrap','text-max-width':155,'text-valign':'bottom','text-margin-y':8,'width':32,'height':32}},
    {selector:'node[kind="NEED"]',style:{shape:'diamond','background-color':color('--need')}},
    {selector:'node[kind="CAN"]',style:{shape:'hexagon','background-color':color('--can')}},
    {selector:'node[kind="relation"]',style:{shape:'round-rectangle',width:24,height:24,'background-color':color('--muted')}},
    {selector:'node[kind="scenario"],node[kind="process"]',style:{shape:'round-rectangle',width:100,height:38}},
    {selector:'node[kind="condition"]',style:{shape:'triangle','background-color':color('--need')}},
    {selector:'edge',style:{label:'data(label)','font-size':10,'color':color('--muted'),'text-wrap':'wrap','text-max-width':120,'text-background-color':color('--panel'),'text-background-opacity':.85,'text-background-padding':4,'curve-style':'unbundled-bezier','control-point-distances':24,'control-point-weights':.5,'line-cap':'round',width:1.5,'line-color':color('--muted'),'line-opacity':.55,'target-arrow-color':color('--muted'),'target-arrow-shape':'triangle','arrow-scale':.75}},
    {selector:'edge[kind="context"]',style:{'line-style':'dashed','label':'','line-opacity':.3}},
    {selector:'node.layout-center',style:{width:46,height:46,'border-width':2,'border-color':color('--can'),'font-weight':'bold'}},
    {selector:'edge:selected',style:{label:'data(label)','text-background-opacity':1}},
    {selector:'node[kind="process"]',style:{'text-valign':'center','text-margin-y':0,'background-opacity':.18,'border-width':1,'border-color':color('--accent')}},
    {selector:'edge#p01, edge#p12, edge#p20',style:{'control-point-distances':-50,'text-margin-y':-12,'text-background-opacity':1}},
    {selector:'.outside-neighborhood',style:{display:'none'}},
    {selector:':selected',style:{'border-width':3,'border-color':color('--can'),'line-color':color('--can'),'target-arrow-color':color('--can')}}
  ]});
  organicLayout(cy.elements());
  cy.on('tap','node',e=>{inspect(e.target.id()); focusNode(e.target.id());});
  cy.on('tap','edge',e=>inspect(e.target.id()));
  $('entity').replaceChildren(new Option('Choisir une entité…',''));
  for(const [id,r] of records)$('entity').add(new Option(`${r.family} · ${r.id}`,id));
  selected=null; orientation(); analyticalSummary();
}
function focusNode(uid) {
  const node=cy.getElementById(uid); if(!node.isNode())return;
  if(!centeredNode)cy.nodes().forEach(n=>overviewPositions.set(n.id(),{...n.position()}));
  // Relation records are intermediary nodes, not Objects: include the Objects
  // attached to the selected Object's relations, without expanding recursively.
  let visible=node.closedNeighborhood();
  if(records.get(uid)?.family==='object') {
    const relationNodes=node.neighborhood('node[kind="relation"]');
    let objects=node.union(node.neighborhood('node').filter(n=>records.get(n.id())?.family==='object'));
    relationNodes.forEach(r=>{objects=objects.union(r.neighborhood('node').filter(n=>records.get(n.id())?.family==='object'));});
    const nodes=objects.union(relationNodes);
    visible=nodes.union(nodes.edgesWith(nodes));
  }
  cy.batch(()=>{
    cy.elements().addClass('outside-neighborhood');visible.removeClass('outside-neighborhood');
  });
  centeredNode=uid; $('overview').disabled=false;
  $('scope').textContent=`Autour de ${records.get(uid)?.id||uid} · ${visible.nodes().length-1} voisin(s)`;
  organicLayout(visible,node);
}
function showOverview(){
  activeLayout?.stop();cy.stop();
  cy.batch(()=>{cy.elements().removeClass('outside-neighborhood');cy.nodes().forEach(n=>{const p=overviewPositions.get(n.id());if(p)n.position(p);});});
  centeredNode=null;overviewPositions.clear();$('overview').disabled=true;$('scope').textContent='Tous les éléments';
  const subject=cy.getElementById(key('object',documentModel.main_subject.id));
  cy.nodes().removeClass('layout-center');if(view==='objects')subject.addClass('layout-center');
  frameGraph(cy.elements(),view==='objects'?subject:null);
}
function orientation(){
  $('inspect-title').textContent='Orientation';$('inspector').replaceChildren();
  text($('inspector'),'p',`Sujet principal : ${documentModel.main_subject.id} @ ${documentModel.main_subject.version}`);
  text($('inspector'),'p',`Focus source : ${pretty(documentModel.focus)}`);
  text($('inspector'),'p',`${documentModel.objects.length} Objets · ${documentModel.relations.length} relations · ${documentModel.scenarios.length} scénarios`);
  text($('inspector'),'p','Sélectionnez un nœud ou un lien pour examiner les qualifications et les références.');
  $('raw').textContent='';
}
function inspect(uid){
  const r=records.get(uid);if(!r)return;selected=uid;
  $('entity').value=uid;cy.elements().unselect();cy.getElementById(uid).select();
  $('inspect-title').textContent=`${r.family} · ${r.id}`;$('inspector').replaceChildren();
  const raw=r.raw;text($('inspector'),'p',raw.label||raw.description||raw.mechanism||raw.notes||'Enregistrement inspectable ci-dessous.');
  if(r.family==='object'){
    text($('inspector'),'p',`Identité conceptuelle : ${raw.concept_kind||'non déclarée (ne pas inférer depuis le libellé)'}`);
    documentModel.definitions.filter(d=>d.object_id===r.id).forEach(d=>text($('inspector'),'p',`Définition ${d.version} · ${Object.keys(d.properties).join(', ')||'sans propriétés enregistrées'}`));
    (currentScenario()?.states||[]).filter(s=>s.object.id===r.id).forEach(s=>text($('inspector'),'p',`${s.at} · ${s.basis} · ${pretty(s.values)}`));
  }
  if(raw.attribution)text($('inspector'),'p',`Attribution : ${pretty(raw.attribution)}`);
  if(raw.roles)text($('inspector'),'p',`Rôles : ${raw.roles.join(', ')} · causalité : ${raw.causality||'non renseignée'}`);
  if(raw.qualification)text($('inspector'),'p',pretty(raw.qualification));
  $('raw').textContent=pretty(raw);
}
function analyticalSummary(){
  const p=$('analysis');p.replaceChildren();const s=currentScenario();
  text(p,'p',s?`${s.id} · ${s.mode} · ${(s.assumptions||[]).join(' / ')}`:'Aucun scénario enregistré : aucune absence globale inférée.');
  documentModel.power_assessments.filter(e=>e.Context.scenario_id===s?.id).forEach(e=>{
    const row=text(p,'div',`${e.ID} · ${e.Focus.type}`,'item');
    for(const name of ['actualizability','effective_satisfaction','temporal_compliance'])if(e.Results[name])text(row,'p',`${name}: ${e.Results[name].status} — ${e.Results[name].justification}`);
    if(e.Results.scenario_assessment)for(const [k,v]of Object.entries(e.Results.scenario_assessment))text(row,'p',`${k}: ${typeof v==='object'?`${v.status||''} ${v.finding||''} — ${v.justification}`:v}`);
    const b=text(row,'button','Inspecter');b.onclick=()=>{$('inspect-title').textContent=e.ID;$('inspector').replaceChildren();text($('inspector'),'p','Évaluation source ; dépendances analytiques distinctes des liens NEED/CAN.');$('raw').textContent=pretty(e);};
  });
  if(!p.querySelector('.item'))text(p,'p','Aucune évaluation enregistrée dans ce contexte. Aucun score ni résultat causal calculé.');
}
function handoff(challenge=false){
  const r=records.get(selected),s=currentScenario();
  $('handoff').value=[`use trIAd`,`Analyse : ${documentModel.analysis_id} (profil ${documentModel.schema_version}).`,`Sujet : ${documentModel.main_subject.id}@${documentModel.main_subject.version}.`,`Phase de présentation : ${$('phase').value}. Focus source : ${pretty(documentModel.focus)}.`,`Scénario : ${s?.id||'aucun'} (${s?.mode||'non renseigné'}).`,r?`Inspection demandée : ${r.family} ${r.id}\n${pretty(r.raw)}`:'',challenge?'Examine les qualifications, les hypothèses et les informations manquantes de cette sélection.':'',`Question / correction utilisateur : ${$('note').value||'À préciser.'}`,`Conserver les IDs, versions et distinctions fait/hypothèse. Évaluer aussi les effets sur les autres Sujets et le problème global. Aucun événement effectif ne doit être déduit de cette interaction.`, `Source dev : 5449b52b49baf56f8e62b185d74b6e10b45a4abd. ${issues.length} signalements du validateur (voir prototype).`].filter(Boolean).join('\n\n');
}
async function install(doc,reported){
  documentModel=doc;issues=reported;
  $('scenario').replaceChildren(...doc.scenarios.map(s=>new Option(`${s.id} · ${s.mode}`,s.id)));
  $('status').textContent=`${doc.analysis_id} · profil ${doc.schema_version} · structure acceptée · ${issues.length} avertissement(s) sémantique(s). Contrôles limités ; aucune preuve empirique.`;
  $('status').title=pretty(issues);render();handoff();
}
async function load(){try{const r=await fetch('/api/fixture/'+$('dataset').value);if(!r.ok)throw Error('Chargement impossible');const p=await r.json();if(p.issues.some(x=>x.severity==='error'))throw Error(pretty(p.issues));await install(p.document,p.issues);}catch(e){$('status').textContent=e.message;}}
$('dataset').onchange=load;$('scenario').onchange=()=>{render();handoff();};
$('objects').onclick=()=>switchView('objects');$('process').onclick=()=>switchView('process');
function switchView(v){view=v;$('objects').setAttribute('aria-pressed',v==='objects');$('process').setAttribute('aria-pressed',v==='process');render();}
$('fit').onclick=()=>frameGraph(cy.elements(':visible'),centeredNode?cy.getElementById(centeredNode):null);
$('overview').onclick=showOverview;
$('entity').onchange=()=>{const uid=$('entity').value;inspect(uid);if(cy.getElementById(uid).isNode())focusNode(uid);};
$('phase').onchange=()=>{if(view==='process')render();handoff();};
$('challenge').onclick=()=>handoff(true);$('summary').onclick=()=>handoff();
$('copy').onclick=async()=>{try{await navigator.clipboard.writeText($('handoff').value);$('copy').textContent='Copié';}catch{$('handoff').focus();$('handoff').select();$('copy').textContent='Sélectionné : Ctrl+C';}};
$('import').onclick=()=>$('file').click();
$('file').onchange=async()=>{try{const f=$('file').files[0];if(!f)return;if(f.size>2000000)throw Error('Limite : 2 Mo');const doc=JSON.parse(await f.text());const r=await fetch('/api/validate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(doc)});const p=await r.json();if(!r.ok||p.error)throw Error(p.error||'Validation impossible');if(p.issues.some(x=>x.severity==='error'))throw Error(pretty(p.issues));await install(doc,p.issues);}catch(e){$('status').textContent='Import refusé ; analyse conservée. '+e.message;}finally{$('file').value='';}};
$('export').onclick=()=>{const blob=new Blob([pretty(documentModel)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='triad-analysis.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
new ResizeObserver(()=>cy?.resize()).observe($('cy'));
if(typeof cytoscape==='undefined')$('status').textContent='Cytoscape.js absent : vérifier la copie locale.';else load();
