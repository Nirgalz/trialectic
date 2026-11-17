/* Display projection only. Source Analysis records are never mutated. */
const $ = id => document.getElementById(id);
let documentModel, cy, view = 'objects', selected = null, issues = [], records = new Map();
let centeredNode = null, overviewPositions = new Map();
let activeLayout = null, scenarioFocus = null;
const navigation = TriaFocusNavigation.createNavigationState();
let focusCycle = null, focusCycleReport = null; // D-97 read-only analytical steering, separate from legacy navigation.

/* D-97: only the source Analysis is projected; no results or new facts are fabricated. */
function simpleMapElements(elements) {
  const main=documentModel.main_subject.id;
  const chosen=documentModel.relations.filter(r=>r.origin_object?.id===main ||
    r.represented_object?.id===main).slice(0,3);
  const allowed=new Set([key('object',main)]);
  for(const r of chosen){
    allowed.add(key('relation',r.id,r.version));
    allowed.add(key('object',r.origin_object.id));
    allowed.add(key('object',r.represented_object.id));
    for(const link of r.relation?.links||[])allowed.add(key('object',link.object_id));
    for(const c of documentModel.conditions.filter(c=>c.owner_relation.id===r.id &&
      c.owner_relation.version===r.version))allowed.add(key('condition',r.id+'/'+c.id));
  }
  return elements.filter(e=>allowed.has(e.data.id)||
    (e.data.source&&allowed.has(e.data.source)&&allowed.has(e.data.target)));
}
function renderFocusCycle() {
  if(!focusCycle)return;
  const selectedRecord=records.get(selected);
  const adoptable=selectedRecord?.family==='object' && documentModel.objects.some(o=>o.id===selectedRecord.id);
  $('adopt-object-focus').disabled=!adoptable;
  $('return-object-overview').disabled=!focusCycle.focus;
  $('map-depth').value=focusCycle.mode;
  const active=focusCycle.local,ctx=$('focus-cycle-context'),review=$('focus-cycle-review');
  ctx.replaceChildren();review.replaceChildren();
  const title=active?active.subject.label:'Aucun Objet adopté comme Sujet Focal';
  $('focus-cycle-status').textContent=`Mode ${focusCycle.mode==='simple'?'Carte simple (A)':'Carte détaillée (B)'} · ${title} · ${focusCycle.refined?'résolution C+ demandée':'résolution initiale'}. Projection déterministe : aucune inférence IA exécutée.`;
  function block(parent,heading,items,format) {
    const section=document.createElement('div');section.className='focus-cycle-piece';
    text(section,'h3',heading);
    if(!items.length)text(section,'p','Aucune donnée source pertinente enregistrée ; ne pas inférer une impossibilité.','muted');
    const list=document.createElement('ul');
    items.slice(0,14).forEach(x=>text(list,'li',format(x)));
    if(items.length)section.append(list);
    if(items.length>14)text(section,'p',`${items.length-14} autre(s) élément(s) ; ouvrir les données source pour inspection.`,'muted');
    parent.append(section);
  }
  if(active){
    block(ctx,'Sujet Focal',[active.subject],x=>`${x.id} · ${x.label} · type : ${x.concept_kind||'non renseigné'}`);
    block(ctx,'Environnement direct',active.direct,x=>`${x.id} · ${x.label} (${x.via.map(y=>y.reason).join('; ')})`);
    block(ctx,'Environnement indirect (à examiner)',active.indirect,x=>`${x.label} · via ${x.via.map(y=>y.to).join(' → ')} (relation connue dans les données, pertinence à vérifier)`);
    const semantics=[...active.semantics.definitions.map(d=>`Définition ${d.version} : ${d.notes||'aucune note'}; propriétés : ${d.properties.map(p=>p.name+' ('+p.description+')').join(', ')||'aucune'}`),
      ...active.semantics.relationStatements.map(r=>`${r.id} · ${r.type} : ${r.description||'aucune précision'} · qualification : ${r.qualified}`)];
    block(ctx,'Sémantique et Définitions déclarées',semantics,x=>x);
    block(ctx,'Conditions et incertitudes',active.conditions,x=>`${x.id} (${x.owner}) · ${x.description} · ${x.assessed?'au moins une évaluation source':'aucune évaluation source'}`);
    block(review,'Scénarios possiblement concernés (sans réévaluation)',active.scenarios,x=>`${x.id} · ${x.reason}`);
  }else{
    text(ctx,'p','Inspecter un Objet sur la carte, puis cliquer sur « Adopter … comme Focus ». Un simple clic ne déclenche ni approfondissement ni changement du Focus des évaluations.','muted');
    if(focusCycle.review.length)block(review,'Retour global · candidats à réexaminer',focusCycle.review,x=>`${x.id} · ${x.reason}`);
  }
  if(focusCycleReport){
    const rep=focusCycleReport;
    text(review,'h3','Contrôle C+ · pistes présentes dans les données');
    text(review,'p',`${rep.candidates.length} Object(s) hors voisinage immédiat du Sujet choisi · ${rep.unassessedConditions.length} condition(s) sans évaluation enregistrée · ${rep.scenarios.length} Scénario(s) dans la source. Ces nombres ne mesurent ni des découvertes IA ni la pertinence effective.`);
    block(review,'Objects à examiner selon la question',rep.candidates,x=>`${x.id} · ${x.label} — ${x.reason}`);
  }
  $('focus-cycle-history').replaceChildren(...focusCycle.history.slice(-14).map(event=>{
    const li=document.createElement('li');
    li.textContent=`#${event.seq} · ${event.type} · ${JSON.stringify(event.detail)}`;return li;
  }));
  if(cy){
    cy.nodes().removeClass('analytic-focus context-candidate');
    if(active){
      const node=cy.getElementById(key('object',active.subject.id));
      if(node.isNode())node.addClass('analytic-focus');
      for(const indirect of active.indirect){
        const other=cy.getElementById(key('object',indirect.id));
        if(other.isNode())other.addClass('context-candidate');
      }
    }
  }
}

function navigationRefLabel(ref) {
  return ref ? `${ref.family === 'object' ? 'Objet' : 'Scénario'} ${ref.id}${ref.version ? '@' + ref.version : ''}` : 'Aucun';
}
function refreshNavigationControls() {
  const enabled = navigation.mode === 'persistent';
  const focus = navigation.focus, inspected = records.get(selected);
  const validInspected = inspected && ['object','scenario'].includes(inspected.family);
  $('navigation-mode').value = navigation.mode;
  $('pin-focus').disabled = !enabled || !validInspected;
  $('return-focus').disabled = !enabled || !focus;
  $('clear-focus').disabled = !enabled || !focus;
  const visible = focus && cy &&
    cy.getElementById(key(focus.family, focus.id)).isNode();
  $('focus-status').textContent = !enabled
    ? 'Mode A : inspection ponctuelle, sans Focus conservé.'
    : focus ? `Mode B : Focus de navigation = ${navigationRefLabel(focus)}${focus.family==='scenario'&&scenarioFocus===focus.id?' (contexte affiché, sans nœud scénario)':visible ? ' (présent dans le graphe)' : ' (hors de la vue courante)'} · ${navigation.selectionCount} sélection(s) explicite(s) dans cette session.`
      : 'Mode B : aucun Focus sélectionné. Inspecter un Objet ou un Scénario, puis utiliser « Conserver ».';
  if(cy) {
    cy.nodes().removeClass('nav-focus');
    if(enabled && visible) cy.getElementById(key(focus.family, focus.id)).addClass('nav-focus');
  }
  const list = $('focus-history');list.replaceChildren();
  const labels = {select:'Focus choisi',clear:'Focus effacé',inspect:'Inspection',mode:'Mode',ui_operation:'Opération d’interface'};
  navigation.history.slice(-8).forEach(event => {
    const item=document.createElement('li');
    item.textContent = `#${event.seq} · ${labels[event.type] || event.type}${event.target ? ' · '+navigationRefLabel(event.target) : ''}${event.detail ? ' · '+event.detail : ''}`;
    list.append(item);
  });
}
function returnToNavigationFocus() {
  const focus=navigation.focus;
  if(!focus || navigation.mode !== 'persistent') return;
  if(focus.family === 'scenario') {
    if(!documentModel.scenarios.some(s=>s.id===focus.id)){$('focus-status').textContent='Scénario du Focus absent du document.';return;}
    navigation.operation('retour au Focus scénario');openScenario(focus.id,false);refreshNavigationControls();return;
  }
  if(view!=='objects')switchView('objects');
  const uid=key(focus.family,focus.id);
  if(!cy.getElementById(uid).isNode()) {
    $('focus-status').textContent='Focus introuvable dans cette projection : vérifier son identité et sa version.';
    return;
  }
  navigation.operation('retour au Focus');
  inspect(uid);
  focusNode(uid);
  refreshNavigationControls();
  handoff();
}
function routeVisibleEdges(elements) {
  const positions=new Map(elements.nodes().map(n=>[n.id(),{...n.position()}]));
  const routes=separatedEdgeRoutes(positions,elements.edges().map(e=>({id:e.id(),source:e.source().id(),target:e.target().id()})));
  elements.edges().forEach((e,i)=>{const r=routes.get(e.id());if(r)e.style({'control-point-distances':r.distance,'control-point-weights':r.weight,'text-margin-y':i%2?-10:10});});
}
function frameGraph(elements, anchor=null) {
  if(!anchor||!anchor.length){cy.fit(elements,45);return;}
  const b=elements.boundingBox(),p=anchor.position();
  const halfWidth=Math.max(p.x-b.x1,b.x2-p.x,60);
  const halfHeight=Math.max(p.y-b.y1,b.y2-p.y,60);
  cy.zoom(Math.max(.05,Math.min(1.35,(cy.width()-90)/(2*halfWidth),(cy.height()-90)/(2*halfHeight))));
  cy.center(anchor);
}
function organicLayout(elements, anchor=null) {
  activeLayout?.stop(); cy.stop();
  if(view==='scenarios'&&!scenarioFocus) {
    elements.layout({name:'grid',cols:2,spacingFactor:1.4,avoidOverlap:true,nodeDimensionsIncludeLabels:true,padding:55}).run();
    routeVisibleEdges(elements);frameGraph(elements);return;
  }
  const subject=anchor&&records.get(anchor.id())?.family==='object'?anchor.id():key('object',documentModel.main_subject.id);
  cy.nodes().removeClass('layout-center');cy.getElementById(subject).addClass('layout-center');
  const positions=hierarchyPositions(elements.nodes().map(n=>({id:n.id(),kind:n.data('kind')})),
    elements.edges().map(e=>({source:e.source().id(),target:e.target().id()})),
    documentModel.relations.map(r=>({id:key('relation',r.id,r.version),origin:key('object',r.origin_object.id),target:key('object',r.represented_object.id),type:r.type})),subject,{tree:!anchor});
  const origin=anchor?positions.get(anchor.id()):{x:0,y:0};
  elements.nodes().forEach(n=>{const p=positions.get(n.id());n.position({x:p.x-(origin?.x||0),y:p.y-(origin?.y||0)});});
  routeVisibleEdges(elements);
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
  a.objects.forEach(o=>{
    obj.set(o.id,addNode(es,'object',o.id,o.label||o.id,o,o.concept_kind||'object'));
    const roles=[...new Set(a.relations.filter(r=>r.represented_object.id===o.id).map(r=>r.type))];
    es[es.length-1].data.visualKind=o.concept_kind||(roles.length===1?roles[0]:'object');
  });
  let edgeCount=0;
  function edge(source,target,label,raw,kind='context',appearance={}) {
    if(!source||!target)return;
    const id='edge:'+(++edgeCount); records.set(id,{family:kind,id:raw.id||id,raw});
    es.push({data:{id,source,target,label,kind,...appearance}});
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
function openScenario(id,adopt=true){
  if(!documentModel.scenarios.some(s=>s.id===id))return;
  if(adopt&&window.focusPilot?.adoptScenario(id))return;
  view='scenarios';scenarioFocus=id;$('scenario').value=id;
  $('objects').setAttribute('aria-pressed','false');$('scenarios').setAttribute('aria-pressed','true');
  render();
  if(adopt){navigation.setMode('persistent');navigation.select({family:'scenario',id});}
  const scenario=currentScenario();
  $('inspect-title').textContent=`Focus : ${id}`;$('inspector').replaceChildren();
  text($('inspector'),'p',`${scenario.mode} · ${(scenario.assumptions||[]).join(' / ')}`);
  $('raw').textContent=pretty(scenario);refreshNavigationControls();handoff();
}
function activateNode(uid){
  const r=records.get(uid);if(r?.family==='scenario'){openScenario(r.id);return;}
  inspect(uid);if(cy.getElementById(uid).isNode())focusNode(uid);
}
function render() {
  centeredNode=null; overviewPositions=new Map();
  $('overview').disabled=true; $('scope').textContent='Tous les éléments';
  const all=view==='objects'?projection(documentModel):scenarioFocus?scenarioProjection():scenariosProjection();
  const es=view==='objects'&&focusCycle?.mode==='simple'&&!focusCycle.refined?simpleMapElements(all):all;
  $('overview').disabled=!(view==='scenarios'&&scenarioFocus);
  $('scope').textContent=view==='objects'?(focusCycle?.mode==='simple'&&!focusCycle.refined?'Carte simple · sélection non exhaustive':'Carte détaillée · Objets et relations'):scenarioFocus?`Scénario : ${scenarioFocus} · ${es.filter(e=>!e.data.source&&records.get(e.data.id)?.family==='object').length} Objets dans le périmètre`:`${documentModel.scenarios.length} scénarios · cliquer pour explorer`;
  $('cy').setAttribute('aria-label',view==='objects'?'Graphe des Objets et relations':scenarioFocus?'Objets associés au scénario choisi':'Graphe des scénarios');
  $('view-guide').textContent=view==='objects'?'Branches CAN ↑ · Racines NEED ↓':scenarioFocus?'Contexte du scénario choisi':'Cliquer pour choisir un Focus';
  activeLayout?.stop(); activeLayout=null;
  if(cy)cy.destroy();
  const css=getComputedStyle(document.documentElement),color=n=>css.getPropertyValue(n).trim();
  cy=cytoscape({container:$('cy'),elements:es,layout:{name:'preset'},style:[
    {selector:'node',style:{'label':'data(label)','background-color':color('--accent'),'color':color('--ink'),'font-size':12,'text-wrap':'wrap','text-max-width':155,'text-valign':'bottom','text-margin-y':8,'width':32,'height':32}},
    {selector:'node[visualKind="NEED"]',style:{shape:'triangle',width:36,height:38,'background-color':color('--need')}},
    {selector:'node[visualKind="CAN"]',style:{shape:'polygon','shape-polygon-points':'-1 -1 1 -1 0 1',width:36,height:38,'background-color':color('--can')}},
    {selector:'node[kind="relation"]',style:{shape:'ellipse',width:12,height:12,'background-color':color('--muted')}},
    {selector:'node[kind="scenario"]',style:{shape:'round-rectangle',width:190,height:115,'text-valign':'center','text-margin-y':0,'text-max-width':170,'background-color':color('--raised'),'border-width':1,'border-color':color('--accent')}},
    {selector:'node[kind="condition"]',style:{shape:'diamond',width:28,height:32,'background-color':color('--need')}},
    {selector:'node[statusTone="positive"]',style:{color:color('--positive')}},
    {selector:'node[statusTone="negative"]',style:{color:color('--negative')}},
    {selector:'node[statusTone="unknown"]',style:{color:color('--unknown')}},
    {selector:'edge',style:{label:'data(label)','font-size':10,'color':color('--muted'),'text-wrap':'wrap','text-max-width':120,'text-background-color':color('--panel'),'text-background-opacity':.85,'text-background-padding':4,'curve-style':'unbundled-bezier','control-point-distances':24,'control-point-weights':.5,'line-cap':'round',width:1.5,'line-color':color('--muted'),'line-opacity':.55,'target-arrow-color':color('--muted'),'target-arrow-shape':'triangle','arrow-scale':.75}},
    {selector:'edge',style:{'target-arrow-shape':'none','source-arrow-shape':'none','source-arrow-color':color('--muted')}},
    {selector:'edge[kind="attribution"],edge[kind="representation"]',style:{'line-style':'solid','label':'','line-opacity':.4,width:1}},
    {selector:'edge[kind="membership"]',style:{'line-style':'dotted','label':'','line-opacity':.25,width:1}},
    {selector:'edge[kind="composition"],edge[functionName="composition"]',style:{'source-arrow-shape':'diamond','source-arrow-fill':'hollow'}},
    {selector:'edge[functionName="specialization"]',style:{'source-arrow-shape':'triangle','source-arrow-fill':'hollow'}},
    {selector:'edge[functionName="contributive"][arrowEnd="source"]',style:{'source-arrow-shape':'triangle','source-arrow-fill':'filled'}},
    {selector:'edge[functionName="contributive"][arrowEnd="target"]',style:{'target-arrow-shape':'triangle','target-arrow-fill':'filled'}},
    {selector:'edge[functionName="enabling"]',style:{'source-arrow-shape':'chevron','source-arrow-fill':'hollow'}},
    {selector:'edge[functionName="inhibitory"]',style:{'source-arrow-shape':'tee'}},
    {selector:'edge[kind="condition"]',style:{'target-arrow-shape':'chevron','target-arrow-fill':'hollow','label':''}},
    {selector:'node.layout-center',style:{width:46,height:46,'border-width':2,'border-color':color('--can'),'font-weight':'bold'}},
    {selector:'node.nav-focus',style:{'border-width':5,'border-color':color('--unknown'),'border-style':'dashed'}},
    {selector:'node.analytic-focus',style:{'border-width':6,'border-color':color('--positive'),'border-style':'double'}},
    {selector:'node.context-candidate',style:{'border-width':3,'border-color':color('--unknown'),'border-style':'dotted'}},
    {selector:'node.main-subject',style:{shape:'ellipse','border-style':'double','border-width':6,'border-color':color('--accent'),width:48,height:48}},
    {selector:'edge:selected',style:{label:'data(label)','text-background-opacity':1}},
    {selector:'.outside-neighborhood',style:{display:'none'}},
    {selector:':selected',style:{'border-width':3,'border-color':color('--can'),'line-color':color('--can'),'target-arrow-color':color('--can')}}
  ]});
  if(view==='objects'||scenarioFocus)cy.getElementById(key('object',documentModel.main_subject.id)).addClass('main-subject');
  organicLayout(cy.elements());
  cy.on('tap','node',e=>activateNode(e.target.id()));
  cy.on('tap','edge',e=>inspect(e.target.id()));
  cy.on('dragfree','node',()=>routeVisibleEdges(cy.elements(':visible')));
  $('entity').replaceChildren(new Option('Choisir une entité…',''));
  for(const [id,r] of records)if(cy.getElementById(id).length)$('entity').add(new Option(`${r.family} · ${r.id}`,id));
  selected=null; orientation(); analyticalSummary();refreshNavigationControls();renderFocusCycle();
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
  if(view==='scenarios'){scenarioFocus=null;render();handoff();return;}
  activeLayout?.stop();cy.stop();
  cy.batch(()=>{cy.elements().removeClass('outside-neighborhood');cy.nodes().forEach(n=>{const p=overviewPositions.get(n.id());if(p)n.position(p);});});
  centeredNode=null;overviewPositions.clear();$('overview').disabled=true;$('scope').textContent='Tous les éléments';
  const subject=cy.getElementById(key('object',documentModel.main_subject.id));
  cy.nodes().removeClass('layout-center');if(view==='objects')subject.addClass('layout-center');
  routeVisibleEdges(cy.elements());
  frameGraph(cy.elements(),view==='objects'?subject:null);
  renderFocusCycle();
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
  $('raw').textContent=pretty(raw);navigation.inspect({family:r.family,id:r.id});refreshNavigationControls();renderFocusCycle();
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
  $('handoff').value=[`use trIAd-c`,`Analyse : ${documentModel.analysis_id} (profil ${documentModel.schema_version}).`,`Sujet : ${documentModel.main_subject.id}@${documentModel.main_subject.version}.`,`Phase de présentation : ${$('phase').value}. Focus source : ${pretty(documentModel.focus)}.`,`Scénario : ${s?.id||'aucun'} (${s?.mode||'non renseigné'}).`,r?`Inspection demandée : ${r.family} ${r.id}\n${pretty(r.raw)}`:'',`Mode de navigation : ${navigation.mode}. Focus choisi par l’Analyste : ${navigation.mode==='persistent'?navigationRefLabel(navigation.focus):'aucun'}.`,window.focusPilot?.summary(),focusCycle?focusCycle.handoff(focusCycleReport):'',scenarioFocus?`Contexte graphique : Scénario ${scenarioFocus}.`:'',challenge?'Examine les qualifications, les hypothèses et les informations manquantes de cette sélection.':'',`Question / correction utilisateur : ${$('note').value||'À préciser.'}`,`Conserver les IDs, versions et distinctions fait/hypothèse. Évaluer aussi les effets sur les autres Sujets et le problème global. Aucun événement effectif ne doit être déduit de cette interaction.`, `Source dev : 5449b52b49baf56f8e62b185d74b6e10b45a4abd. ${issues.length} signalements du validateur (voir prototype).`].filter(Boolean).join('\n\n');
}
async function install(doc,reported){
  documentModel=doc;issues=reported;view='objects';scenarioFocus=null;navigation.reset();
  const selectedDepth=$('map-depth').value||'detailed';
  focusCycle=TriaFocusCycle.createCycle(doc);focusCycle.setMode(selectedDepth);focusCycleReport=null;
  if(doc.analysis_id==='A-focus-six-ecoles-pilot'){navigation.setMode('persistent');navigation.select({family:'scenario',id:'S-02'});}
  $('objects').setAttribute('aria-pressed','true');$('scenarios').setAttribute('aria-pressed','false');
  $('focus-link').hidden=doc.analysis_id!=='A-focus-six-ecoles-pilot';
  if(doc.analysis_id==='A-focus-six-ecoles-pilot')$('phase').value='Explorer';
  $('scenario').replaceChildren(...doc.scenarios.map(s=>new Option(`${s.id} · ${s.mode}`,s.id)));
  if(doc.focus.type==='Scenario')$('scenario').value=doc.focus.scenario_id;
  $('status').textContent=`${doc.analysis_id} · profil ${doc.schema_version} · structure acceptée · ${issues.length} avertissement(s) sémantique(s). Contrôles limités ; aucune preuve empirique.`;
  $('status').title=pretty(issues);render();
  window.focusPilot?.install(doc,{adopt:(id)=>{navigation.setMode('persistent');navigation.select({family:doc.scenarios.some(s=>s.id===id)?'scenario':'object',id});refreshNavigationControls();},scenario:()=>$('scenario').value,summary:()=>handoff(),navigate:(id,historicalScenario)=>{
    const scenario=doc.scenarios.find(s=>s.id===id);
    if(scenario)$('scenario').value=scenario.id;
    else if(historicalScenario)$('scenario').value=historicalScenario;
    if(scenario){openScenario(id,false);return;}
    switchView('objects');const uid=key('object',id);inspect(uid);focusNode(uid);
  }});handoff();
}
async function load(){try{
 const pilot=$('dataset').value==='focus-pilot';
 const r=await fetch(pilot?'/examples/focus-pilot.json':'/api/fixture/'+$('dataset').value);if(!r.ok)throw Error('Chargement impossible');
 let p=await r.json();
 if(pilot){const document=p;const check=await fetch('/api/validate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(document)});const result=await check.json();if(!check.ok)throw Error(result.error||'Validation impossible');p={document,issues:result.issues};}
 if(p.issues.some(x=>x.severity==='error'))throw Error(pretty(p.issues));await install(p.document,p.issues);
 }catch(e){$('status').textContent=e.message;}}


$('map-depth').onchange=()=>{
  if(!focusCycle)return;
  focusCycle.setMode($('map-depth').value);
  focusCycleReport=null;render();handoff();
};
$('adopt-object-focus').onclick=()=>{
  const r=records.get(selected);
  if(!r||r.family!=='object'||!focusCycle?.adopt(r.id))return;
  if(view!=='objects')switchView('objects');
  const uid=key('object',r.id);
  if(cy.getElementById(uid).isNode()){inspect(uid);focusNode(uid);}
  renderFocusCycle();handoff();
};
$('return-object-overview').onclick=()=>{
  if(!focusCycle)return;
  focusCycle.returnOverview();
  if(view!=='objects')switchView('objects');
  else showOverview();
  renderFocusCycle();handoff();
};
$('improve-resolution').onclick=()=>{
  if(!focusCycle)return;
  focusCycleReport=focusCycle.refine();
  const active=focusCycle.focus;
  render();
  if(active){
    const uid=key('object',active);
    if(cy.getElementById(uid).isNode()){inspect(uid);focusNode(uid);}
  }
  renderFocusCycle();handoff();
};
$('focus-ai-handoff').onclick=()=>{
  if(!focusCycle)return;
  handoff(true);
  $('handoff').focus();$('handoff').select();
  $('focus-cycle-status').textContent='Demande structurée préparée dans « Revenir à la conversation ». Copier le texte et le soumettre à une IA. Aucune requête IA n’a été exécutée ici.';
};

$('navigation-mode').onchange=()=>{navigation.setMode($('navigation-mode').value);window.focusPilot?.syncNavigation(navigation.focus);refreshNavigationControls();handoff();};
$('pin-focus').onclick=()=>{
 const r=records.get(selected);if(!r||!navigation.select({family:r.family,id:r.id}))return;
 window.focusPilot?.syncNavigation(navigation.focus);refreshNavigationControls();handoff();
};
$('clear-focus').onclick=()=>{navigation.clear();window.focusPilot?.syncNavigation(null);refreshNavigationControls();handoff();};
$('return-focus').onclick=returnToNavigationFocus;
$('dataset').onchange=load;$('scenario').onchange=()=>{if(view==='scenarios')openScenario($('scenario').value);else{render();handoff();}};
$('objects').onclick=()=>switchView('objects');$('scenarios').onclick=()=>switchView('scenarios');
function switchView(v){navigation.operation('vue '+v);view=v;scenarioFocus=null;$('objects').setAttribute('aria-pressed',v==='objects');$('scenarios').setAttribute('aria-pressed',v==='scenarios');render();}
$('fit').onclick=()=>frameGraph(cy.elements(':visible'),centeredNode?cy.getElementById(centeredNode):null);
$('overview').onclick=()=>{navigation.operation('vue générale');showOverview();refreshNavigationControls();};
$('zoom-in').onclick=()=>cy.zoom({level:cy.zoom()*1.25,renderedPosition:{x:cy.width()/2,y:cy.height()/2}});
$('zoom-out').onclick=()=>cy.zoom({level:cy.zoom()/1.25,renderedPosition:{x:cy.width()/2,y:cy.height()/2}});
$('entity').onchange=()=>activateNode($('entity').value);
$('phase').onchange=()=>{navigation.operation('phase '+$('phase').value);refreshNavigationControls();handoff();};
$('challenge').onclick=()=>{navigation.operation('préparer une question');handoff(true);refreshNavigationControls();};$('summary').onclick=()=>{navigation.operation('préparer un résumé');handoff();refreshNavigationControls();};
$('copy').onclick=async()=>{try{await navigator.clipboard.writeText($('handoff').value);$('copy').textContent='Copié';}catch{$('handoff').focus();$('handoff').select();$('copy').textContent='Sélectionné : Ctrl+C';}};
$('import').onclick=()=>$('file').click();
$('file').onchange=async()=>{try{const f=$('file').files[0];if(!f)return;if(f.size>2000000)throw Error('Limite : 2 Mo');const doc=JSON.parse(await f.text());const r=await fetch('/api/validate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(doc)});const p=await r.json();if(!r.ok||p.error)throw Error(p.error||'Validation impossible');if(p.issues.some(x=>x.severity==='error'))throw Error(pretty(p.issues));await install(doc,p.issues);}catch(e){$('status').textContent='Import refusé ; analyse conservée. '+e.message;}finally{$('file').value='';}};
$('export').onclick=()=>{const blob=new Blob([pretty(documentModel)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='triad-analysis.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
new ResizeObserver(()=>cy?.resize()).observe($('cy'));
if(typeof cytoscape==='undefined')$('status').textContent='Cytoscape.js absent : vérifier la copie locale.';else load();

function setTheme(theme,remember=true){
 const oldSelected=selected,oldCentered=centeredNode,camera=cy?{zoom:cy.zoom(),pan:{...cy.pan()}}:null;
 document.documentElement.dataset.theme=theme;
 $('theme-toggle').textContent=theme==='dark'?'☀ Clair':'☾ Sombre';
 $('theme-toggle').setAttribute('aria-label',theme==='dark'?'Activer le thème clair':'Activer le thème sombre');
 if(remember)try{localStorage.setItem('triad-theme',theme);}catch{}
 if(documentModel){render();if(oldCentered&&records.has(oldCentered))focusNode(oldCentered);if(oldSelected&&records.has(oldSelected))inspect(oldSelected);if(camera)cy.viewport(camera);}
}
$('theme-toggle').onclick=()=>setTheme(document.documentElement.dataset.theme==='light'?'dark':'light');
let savedTheme='dark';try{savedTheme=localStorage.getItem('triad-theme')||'dark';}catch{}
setTheme(savedTheme==='light'?'light':'dark',false);
