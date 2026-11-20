/* Display projection only. Source Analysis records are never mutated. */
const $ = id => document.getElementById(id);
const analysisPanels = document.querySelectorAll('.workspace, #semantic-groups, #d97-focus, #local-ai, .navigation-experiment, .bottom');
const mapWorkspace = document.querySelector('.workspace');
const analysisControls = ['map-depth','scenario','export','import-proposals'];
analysisPanels.forEach(panel=>{panel.inert=true;});
analysisControls.forEach(id=>{$(id).disabled=true;});
let documentModel, cy, view = 'objects', selected = null, issues = [], records = new Map();
let centeredNode = null, overviewPositions = new Map();
let activeLayout = null, scenarioFocus = null;
let analysisRevision=0;
let semanticGroups=[],nextSemanticGroupNumber=1; // reversible, presentation-only RD-02 pilot
let acceptedOverlay={objects:[],relations:[]}; // Propositions graphiques non normatives
let previewOverlay=null;
const viewTransitions=TriaViewTransitions.createTransitions(cytoscape,$('cy'));
const objectTooltip=document.createElement('div');
objectTooltip.id='object-tooltip';objectTooltip.setAttribute('role','tooltip');objectTooltip.setAttribute('data-source-text','');objectTooltip.hidden=true;document.body.append(objectTooltip);
let hoverTimer=null,hoveredObject=null,hoverPoint=null;
function hideObjectTooltip(){
 clearTimeout(hoverTimer);hoverTimer=null;hoveredObject=null;objectTooltip.hidden=true;$('cy').removeAttribute('aria-describedby');
}
function placeObjectTooltip(){
 if(!hoverPoint||objectTooltip.hidden)return;
 const p=TriaObjectPreview.tooltipPosition(hoverPoint,{width:objectTooltip.offsetWidth,height:objectTooltip.offsetHeight},{width:document.documentElement.clientWidth,height:innerHeight});
 objectTooltip.style.left=p.left+'px';objectTooltip.style.top=p.top+'px';
}
function currentAnalystCard(record){
 return TriaObjectPreview.analystCard(documentModel,record,currentScenario(),UII18n.language);
}
function drawObjectTooltip(){
 const record=records.get(hoveredObject);if(!['object','condition'].includes(record?.family))return;
 const description=TriaObjectPreview.contextualDescription(documentModel,record,{view,scenario:currentScenario(),centerId:records.get(centeredNode)?.family==='object'?records.get(centeredNode).id:null},UII18n.language);
 if(!description)return;
 objectTooltip.replaceChildren();text(objectTooltip,'p',description,'tooltip-narrative');
 objectTooltip.hidden=false;$('cy').setAttribute('aria-describedby',objectTooltip.id);placeObjectTooltip();
}
function hoverObject(event){
 hideObjectTooltip();if(!['object','condition'].includes(records.get(event.target.id())?.family))return;
 hoveredObject=event.target.id();const rect=$('cy').getBoundingClientRect(),p=event.target.renderedPosition();
 hoverPoint={x:event.originalEvent?.clientX??rect.left+p.x,y:event.originalEvent?.clientY??rect.top+p.y};
 hoverTimer=setTimeout(drawObjectTooltip,180);
}
document.addEventListener('keydown',event=>{if(event.key==='Escape')hideObjectTooltip();});
window.addEventListener('scroll',hideObjectTooltip,{capture:true,passive:true});
window.addEventListener('resize',hideObjectTooltip);
const navigation = TriaFocusNavigation.createNavigationState();
const graphHistory=TriaGraphHistory.createGraphHistory();
let historyDepth=0,restoringGraph=false,renderedScenario=null;
function graphSnapshot(){
 if(!documentModel)return {previewOverlay,zoom:cy?.zoom(),pan:cy?{...cy.pan()}:null};
 if(!cy)return null;
 return {view,scenarioFocus,scenario:renderedScenario,selected,centeredNode,
  overview:[...overviewPositions],semanticGroups:structuredClone(semanticGroups),positions:cy.nodes().map(n=>[n.id(),{...n.position()}]),
  hidden:cy.elements('.outside-neighborhood').map(e=>e.id()),centers:cy.nodes('.layout-center').map(n=>n.id()),
  zoom:cy.zoom(),pan:{...cy.pan()},focus:navigation.focus,mode:navigation.mode,
  focusCycle:focusCycle?.snapshotPresentation(),focusCycleReport:structuredClone(focusCycleReport)};
}
function updateGraphHistoryControls(){
 $('graph-back').disabled=!graphHistory.canBack;$('graph-forward').disabled=!graphHistory.canForward;
 if(!documentModel)mapWorkspace.inert=!previewOverlay&&!graphHistory.canBack&&!graphHistory.canForward;
 for(const id of ['objects','scenarios','entity','challenge'])$(id).disabled=!documentModel;
}
function visitGraph(action){
 if(restoringGraph||historyDepth||!cy||!documentModel)return action();
 const before=graphSnapshot(),visualBefore=viewTransitions.capture(cy);viewTransitions.finish();historyDepth++;
 try{const result=action();graphHistory.commit(before,graphSnapshot());updateGraphHistoryControls();viewTransitions.play(visualBefore,viewTransitions.capture(cy));return result;}
 finally{historyDepth--;}
}
function moveGraphHistory(direction){
 if(!documentModel){
  const saved=graphHistory.move(direction,graphSnapshot());if(!saved)return;
  previewOverlay=saved.previewOverlay;
  refreshProposalOverlay(saved.pan?{zoom:saved.zoom,pan:saved.pan}:null);
  updateGraphHistoryControls();
  notifyProposalPreview();
  return;
 }
 if(!cy)return;
 const saved=graphHistory.move(direction,graphSnapshot());if(!saved)return;
 const visualBefore=viewTransitions.capture(cy);viewTransitions.finish();
 restoringGraph=true;
 try{
  view=saved.view;scenarioFocus=saved.scenarioFocus;$('scenario').value=saved.scenario;
  $('objects').setAttribute('aria-pressed',view==='objects');$('scenarios').setAttribute('aria-pressed',view==='scenarios');
  navigation.setMode(saved.mode);
  if(JSON.stringify(navigation.focus)!==JSON.stringify(saved.focus)){
   if(saved.focus)navigation.select(saved.focus);else navigation.clear();
  }
  navigation.operation(direction<0?'vue précédente':'vue suivante');
  if(saved.focusCycle)focusCycle.restorePresentation(saved.focusCycle);focusCycleReport=structuredClone(saved.focusCycleReport);
  semanticGroups=structuredClone(saved.semanticGroups||[]);
  render();
  cy.batch(()=>{
   saved.positions.forEach(([id,p])=>cy.getElementById(id).position(p));
   saved.hidden.forEach(id=>cy.getElementById(id).addClass('outside-neighborhood'));
   cy.nodes().removeClass('layout-center');saved.centers.forEach(id=>cy.getElementById(id).addClass('layout-center'));
  });
  centeredNode=saved.centeredNode;overviewPositions=new Map(saved.overview);
  routeVisibleEdges(cy.elements(':visible'));
  cy.viewport({zoom:saved.zoom,pan:saved.pan});
  if(saved.selected&&records.has(saved.selected))inspect(saved.selected,false);
  else if(scenarioFocus){
   const scenario=currentScenario();$('inspect-title').textContent=`Focus : ${scenarioFocus}`;$('inspector').replaceChildren();
   text($('inspector'),'p',`${scenario.mode} · ${(scenario.assumptions||[]).join(' / ')}`);$('raw').textContent=pretty(scenario);
  }
  if(centeredNode)$('scope').textContent=`Autour de ${records.get(centeredNode)?.id||centeredNode} · ${cy.nodes(':visible').length-1} voisin(s)`;
  $('overview').disabled=!(centeredNode||(view==='scenarios'&&scenarioFocus));
  window.focusPilot?.syncNavigation(navigation.focus);refreshNavigationControls();handoff();
 }finally{restoringGraph=false;updateGraphHistoryControls();}
 viewTransitions.play(visualBefore,viewTransitions.capture(cy));
}
let focusCycle = null, focusCycleReport = null; // D-97 read-only analytical steering, separate from legacy navigation.

/* D-97: only the source Analysis is projected; no results or new facts are fabricated. */
function simpleMapElements(elements) {
  const main=documentModel.main_subject.id;
  const chosen=documentModel.relations.filter(r=>r.origin_object?.id===main ||
    r.represented_object?.id===main);
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
function returnToNavigationFocus() {return visitGraph(()=>{
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
});}
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
const key=TriaMapProjection.key;
function mapElements(){
 const map=TriaMapProjection.projectAnalysis(documentModel,{view:view==='objects'?'objects':scenarioFocus?'scenario':'scenarios',scenarioId:$('scenario').value,translate:UII18n.translate});
 records=new Map(map.records);
 return [...map.nodes,...map.edges].map(data=>({data}));
}
function openScenario(id,adopt=true){return visitGraph(()=>{
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
});}
function activateNode(uid){return visitGraph(()=>{
  const r=records.get(uid);
  if(r?.family==='semantic-group'){
    const g=semanticGroups.find(x=>x.id===r.id);
    if(g){g.collapsed=false;render();$('semantic-status').textContent='Ensemble ouvert : '+g.label+' · tous les détails source redeviennent inspectables.';}
    return;
  }
  if(r?.family==='scenario'){openScenario(r.id);return;}
  inspect(uid);if(cy.getElementById(uid).isNode())focusNode(uid);
});}
function render() {
  hideObjectTooltip();
  renderedScenario=$('scenario').value;
  centeredNode=null; overviewPositions=new Map();
  $('overview').disabled=true; $('scope').textContent='Tous les éléments';
  const discovery=!documentModel;
  if(discovery)records=new Map();
  const all=discovery?[]:mapElements();
  const baseElements=view==='objects'&&focusCycle?.mode==='simple'&&!focusCycle.refined?simpleMapElements(all):all;
  const proposals=view==='objects'?TriaCandidateOverlay.elements({
    objects:[...acceptedOverlay.objects,...(previewOverlay?.objects??[])],
    relations:[...acceptedOverlay.relations,...(previewOverlay?.relations??[])]
  },records):[];
  const baseIds=new Set(baseElements.map(element=>element.data.id));
  const endpoints=new Set(proposals.flatMap(({data})=>data.source?[data.source,data.target]:[]));
  const additionalObjects=all.filter(({data})=>!data.source&&endpoints.has(data.id)&&!baseIds.has(data.id));
  let es=baseElements.concat(additionalObjects,proposals);
  const semanticProjection=!discovery&&view==='objects'?TriaSemanticGroups.project(es,documentModel.relations,semanticGroups,key):null;
  if(semanticProjection){es=semanticProjection.elements;for(const [uid,rec] of semanticProjection.records)records.set(uid,rec);}
  $('overview').disabled=!(view==='scenarios'&&scenarioFocus);
  $('scope').textContent=discovery?(previewOverlay?'Aperçu provisoire des propositions IA':'Carte vide'):view==='objects'?(focusCycle?.mode==='simple'&&!focusCycle.refined?'Carte simple · sélection non exhaustive':'Carte détaillée · Objets et relations'):scenarioFocus?`Scénario : ${scenarioFocus} · ${es.filter(e=>!e.data.source&&records.get(e.data.id)?.family==='object').length} Objets dans le périmètre`:`${documentModel.scenarios.length} scénarios · cliquer pour explorer`;
  $('cy').setAttribute('aria-label',discovery?'Aperçu de la carte':view==='objects'?'Carte des Objets et relations':scenarioFocus?'Objets associés au scénario choisi':'Carte des scénarios');
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
    {selector:'node[kind="semantic-set"]',style:{shape:'round-rectangle',width:158,height:76,'text-valign':'center','text-margin-y':0,'text-max-width':142,'background-color':color('--raised'),'border-width':3,'border-style':'dashed','border-color':color('--accent'),'font-weight':'bold'}},
    {selector:'edge[kind="semantic-summary"]',style:{'line-style':'dotted','source-arrow-shape':'none','target-arrow-shape':'none','line-width':2,'line-opacity':.85,'label':'data(label)'}},
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
    {selector:'node[proposed="yes"]',style:{'border-width':4,'border-color':color('--unknown'),'border-style':'dashed'}},
    {selector:'edge[proposed="yes"]',style:{'line-style':'dashed','line-color':color('--unknown'),'line-opacity':.9}},
    {selector:'node.main-subject',style:{shape:'ellipse','border-style':'double','border-width':6,'border-color':color('--accent'),width:48,height:48}},
    {selector:'edge:selected',style:{label:'data(label)','text-background-opacity':1}},
    {selector:'.outside-neighborhood',style:{display:'none'}},
    {selector:':selected',style:{'border-width':3,'border-color':color('--can'),'line-color':color('--can'),'target-arrow-color':color('--can')}}
  ]});
  if(discovery){
    if(es.length){
      cy.elements().layout({name:'grid',avoidOverlap:true,nodeDimensionsIncludeLabels:true,fit:false}).run();
      routeVisibleEdges(cy.elements());frameGraph(cy.elements());
    }
    return;
  }
  if(view==='objects'||scenarioFocus)cy.getElementById(key('object',documentModel.main_subject.id)).addClass('main-subject');
  if(semanticProjection?.activeIds.length){
    cy.elements().layout({name:'cose',animate:false,fit:false,nodeDimensionsIncludeLabels:true,padding:48}).run();
    routeVisibleEdges(cy.elements());frameGraph(cy.elements());
    $('scope').textContent+=' · '+semanticProjection.activeIds.length+' ensemble(s) réduit(s) · liens résumés';
  }else organicLayout(cy.elements());
  cy.on('tap','node',e=>activateNode(e.target.id()));
  cy.on('mouseover','node',hoverObject);
  cy.on('mouseout','node',hideObjectTooltip);
  cy.on('mousemove','node',event=>{if(hoveredObject===event.target.id()&&event.originalEvent){hoverPoint={x:event.originalEvent.clientX,y:event.originalEvent.clientY};placeObjectTooltip();}});
  cy.on('grab pan zoom tapstart',hideObjectTooltip);
  cy.on('tap','edge',e=>inspect(e.target.id()));
  cy.on('dragfree','node',()=>routeVisibleEdges(cy.elements(':visible')));
  $('entity').replaceChildren(new Option('Choisir une entité…',''));
  for(const [id,r] of records)if(cy.getElementById(id).length)$('entity').add(new Option(`${r.family} · ${r.id}`,id));
  selected=null; orientation(); analyticalSummary();refreshNavigationControls();renderFocusCycle();renderSemanticGroupsControls();
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
function showOverview(){return visitGraph(()=>{
  if(view==='scenarios'){scenarioFocus=null;render();handoff();return;}
  activeLayout?.stop();cy.stop();
  cy.batch(()=>{cy.elements().removeClass('outside-neighborhood');cy.nodes().forEach(n=>{const p=overviewPositions.get(n.id());if(p)n.position(p);});});
  centeredNode=null;overviewPositions.clear();$('overview').disabled=true;$('scope').textContent='Tous les éléments';
  const subject=cy.getElementById(key('object',documentModel.main_subject.id));
  cy.nodes().removeClass('layout-center');if(view==='objects')subject.addClass('layout-center');
  routeVisibleEdges(cy.elements());
  frameGraph(cy.elements(),view==='objects'?subject:null);
  renderFocusCycle();
});}
function orientation(){
  $('inspect-title').textContent='Orientation';$('inspector').replaceChildren();
  text($('inspector'),'p',`Sujet principal : ${documentModel.main_subject.id} @ ${documentModel.main_subject.version}`);
  text($('inspector'),'p',`Focus source : ${pretty(documentModel.focus)}`);
  text($('inspector'),'p',`${documentModel.objects.length} Objets · ${documentModel.relations.length} relations · ${documentModel.scenarios.length} scénarios`);
  text($('inspector'),'p','Sélectionnez un nœud ou un lien pour examiner les qualifications et les références.');
  $('raw').textContent='';
}
function inspect(uid,recordInspection=true){
  const r=records.get(uid);if(!r)return;selected=uid;
  $('entity').value=uid;cy.elements().unselect();cy.getElementById(uid).select();
  $('inspect-title').textContent=`${r.family} · ${r.id}`;$('inspector').replaceChildren();
  const raw=r.raw;text($('inspector'),'p',raw.label||raw.description||raw.mechanism||raw.notes||'Enregistrement inspectable ci-dessous.');
  if(r.family==='object'){
    text($('inspector'),'p',currentAnalystCard(r).summary,'object-preview-description');
    text($('inspector'),'p',`Identité conceptuelle : ${raw.concept_kind||'non déclarée (ne pas inférer depuis le libellé)'}`);
    documentModel.definitions.filter(d=>d.object_id===r.id).forEach(d=>text($('inspector'),'p',`Définition ${d.version} · ${Object.keys(d.properties).join(', ')||'sans propriétés enregistrées'}`));
    (currentScenario()?.states||[]).filter(s=>s.object.id===r.id).forEach(s=>text($('inspector'),'p',`${s.at} · ${s.basis} · ${pretty(s.values)}`));
  }
  if(['object','condition'].includes(r.family)){
    const card=currentAnalystCard(r);
    if(r.family==='condition')text($('inspector'),'p',card.summary,'object-preview-description');
    const content=text($('inspector'),'div','','analyst-inspector-card');content.setAttribute('data-source-text','');
    card.sections.forEach(section=>{text(content,'strong',section.heading);text(content,'p',section.body,section.tone?'sign-'+section.tone:'');});
  }
  if(raw.attribution)text($('inspector'),'p',`Attribution : ${pretty(raw.attribution)}`);
  if(raw.roles)text($('inspector'),'p',`Rôles : ${raw.roles.join(', ')} · causalité : ${raw.causality||'non renseignée'}`);
  if(raw.qualification)text($('inspector'),'p',pretty(raw.qualification));
  $('raw').textContent=pretty(raw);if(recordInspection)navigation.inspect({family:r.family,id:r.id});refreshNavigationControls();renderFocusCycle();
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
 $('handoff').value=TriaAIBridge.formatHandoff({analysis:documentModel,record:records.get(selected),scenario:currentScenario(),phase:$('phase').value,note:$('note').value,navigation,scenarioFocus,issues,language:UII18n.language,translate:UII18n.translate,challenge,
  pilotSummary:window.focusPilot?.summary(),pilotSummaryEnglish:window.focusPilot?.summaryEnglish(),
  focusContext:focusCycle?TriaAIBridge.formatFocusContext({analysis:documentModel,context:focusCycle.local||TriaFocusCycle.explore(documentModel,documentModel.main_subject.id),mode:focusCycle.mode,report:focusCycleReport}):''});
}
async function install(doc,reported){
  viewTransitions.finish();
  analysisRevision++;documentModel=doc;issues=reported;view='objects';scenarioFocus=null;navigation.reset();
  semanticGroups=[];nextSemanticGroupNumber=1;
  acceptedOverlay={objects:[],relations:[]};previewOverlay=null;$('clear-proposals').disabled=true;
  const selectedDepth=$('map-depth').value||'detailed';
  focusCycle=TriaFocusCycle.createCycle(doc);focusCycle.setMode(selectedDepth);focusCycleReport=null;
  if(doc.analysis_id==='A-focus-six-ecoles-pilot'){navigation.setMode('persistent');navigation.select({family:'scenario',id:'S-02'});}
  $('objects').setAttribute('aria-pressed','true');$('scenarios').setAttribute('aria-pressed','false');
  if(doc.analysis_id==='A-focus-six-ecoles-pilot')$('phase').value='Explorer';
  $('scenario').replaceChildren(...doc.scenarios.map(s=>new Option(`${s.id} · ${s.mode}`,s.id)));
  if(doc.focus.type==='Scenario')$('scenario').value=doc.focus.scenario_id;
  $('status').textContent=`${doc.analysis_id} · profil ${doc.schema_version} · structure acceptée · ${issues.length} avertissement(s) sémantique(s). Contrôles limités ; aucune preuve empirique.`;
  $('status').title=pretty(issues);render();
  window.focusPilot?.install(doc,{transaction:visitGraph,adopt:(id)=>{navigation.setMode('persistent');navigation.select({family:doc.scenarios.some(s=>s.id===id)?'scenario':'object',id});refreshNavigationControls();},scenario:()=>$('scenario').value,summary:()=>handoff(),navigate:(id,historicalScenario)=>visitGraph(()=>{
    const scenario=doc.scenarios.find(s=>s.id===id);
    if(scenario)$('scenario').value=scenario.id;
    else if(historicalScenario)$('scenario').value=historicalScenario;
    if(scenario){openScenario(id,false);return;}
    switchView('objects');const uid=key('object',id);inspect(uid);focusNode(uid);
  })});handoff();graphHistory.reset(graphSnapshot());updateGraphHistoryControls();
  analysisPanels.forEach(panel=>{panel.inert=false;});
  analysisControls.forEach(id=>{$(id).disabled=false;});
  document.dispatchEvent(new Event('tria-analysis-loaded'));
}
async function loadExample(example){try{
 if(typeof cytoscape==='undefined')throw Error('Cytoscape.js absent : vérifier la copie locale.');
 const input=TriaMapExamples[example];
 if(!input)throw Error('Exemple introuvable');
 const parsed=TriaMapData.parseAnalysis(input);await install(parsed.document,parsed.issues);
 }catch(e){$('status').textContent=e.message;}}


// RD-02 local experiment: manually assigned meanings, not source Object creation.
function renderSemanticGroupsControls(){
  const select=$('semantic-members'),list=$('semantic-list');
  select.replaceChildren();list.replaceChildren();
  if(!documentModel)return;
  const groupedObjectIds=new Set(semanticGroups.flatMap(g=>g.members.filter(m=>m.type==='object').map(m=>m.id)));
  const childSets=new Set(semanticGroups.flatMap(g=>g.members.filter(m=>m.type==='set').map(m=>m.id)));
  for(const obj of documentModel.objects.filter(o=>!groupedObjectIds.has(o.id)))
    select.add(new Option((obj.label||obj.id)+' ['+obj.id+']','object:'+obj.id));
  for(const group of semanticGroups.filter(g=>!childSets.has(g.id)))
    select.add(new Option('Ensemble : '+group.label+' ['+group.id+']','set:'+group.id));
  function show(g,depth=0){
    const item=document.createElement('div');item.className='semantic-list-item';item.style.marginLeft=Math.min(depth*16,48)+'px';
    const title=text(item,'strong',g.label+' · '+(g.collapsed?'réduit':'développé'));
    text(item,'p',g.meaning,'muted');
    const actions=text(item,'div','','button-row');
    const toggle=text(actions,'button',g.collapsed?'Ouvrir':'Réduire');
    toggle.onclick=()=>visitGraph(()=>{g.collapsed=!g.collapsed;render();});
    const remove=text(actions,'button','Retirer le regroupement');
    remove.onclick=()=>visitGraph(()=>{semanticGroups=semanticGroups.filter(x=>x.id!==g.id);render();});
    list.append(item);
    for(const member of g.members||[])if(member.type==='set'){
      const child=semanticGroups.find(x=>x.id===member.id);
      if(child)show(child,depth+1);
    }
  }
  semanticGroups.filter(g=>!childSets.has(g.id)).forEach(g=>show(g));
  $('semantic-status').textContent=semanticGroups.length
    ?semanticGroups.length+' ensemble(s) local(aux) · cliquer sur un ensemble dans la carte pour développer. Les relations regroupées restent à inspecter.'
    :'Aucun ensemble créé. Choisir au moins deux éléments, puis écrire leur signification en une phrase.';
}
$('semantic-create').onclick=()=>{
  if(!documentModel)return;
  const label=$('semantic-title').value.trim(),meaning=$('semantic-meaning').value.trim();
  const members=[...$('semantic-members').selectedOptions].map(o=>{
    const [type,...parts]=o.value.split(':');return {type,id:parts.join(':')};
  });
  if(!label||meaning.length<12||members.length<2){
    $('semantic-status').textContent='Indiquer un nom, une phrase de signification (12 caractères minimum) et au moins deux éléments.';return;
  }
  if(semanticGroups.length>=30){$('semantic-status').textContent='Pilote limité à 30 ensembles.';return;}
  visitGraph(()=>{
    const id='SG-'+String(nextSemanticGroupNumber++).padStart(3,'0');
    semanticGroups.push({id,label,meaning,members,collapsed:true});
    $('semantic-title').value='';$('semantic-meaning').value='';
    if(view!=='objects'){view='objects';scenarioFocus=null;$('objects').setAttribute('aria-pressed','true');$('scenarios').setAttribute('aria-pressed','false');}
    render();
    $('semantic-status').textContent='Ensemble créé : '+label+' · représentation locale non normative.';
  });
};

$('map-depth').onchange=()=>visitGraph(()=>{
  if(!focusCycle)return;
  focusCycle.setMode($('map-depth').value);
  focusCycleReport=null;render();handoff();
});
$('adopt-object-focus').onclick=()=>visitGraph(()=>{
  const r=records.get(selected);
  if(!r||r.family!=='object'||!focusCycle?.adopt(r.id))return;
  if(view!=='objects')switchView('objects');
  const uid=key('object',r.id);
  if(cy.getElementById(uid).isNode()){inspect(uid);focusNode(uid);}
  renderFocusCycle();handoff();
});
$('return-object-overview').onclick=()=>visitGraph(()=>{
  if(!focusCycle)return;
  focusCycle.returnOverview();
  if(view!=='objects')switchView('objects');
  else showOverview();
  renderFocusCycle();handoff();
});
$('improve-resolution').onclick=()=>visitGraph(()=>{
  if(!focusCycle)return;
  focusCycleReport=focusCycle.refine();
  const active=focusCycle.focus;
  render();
  if(active){
    const uid=key('object',active);
    if(cy.getElementById(uid).isNode()){inspect(uid);focusNode(uid);}
  }
  renderFocusCycle();handoff();
});
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
$('dataset').onchange=event=>{
 $('load-example').disabled=!event.target.value;
};
$('load-example').onclick=()=>loadExample($('dataset').value);
$('scenario').onchange=()=>{if(view==='scenarios')openScenario($('scenario').value);else{visitGraph(()=>{render();handoff();});}};
$('objects').onclick=()=>switchView('objects');$('scenarios').onclick=()=>switchView('scenarios');
function switchView(v){return visitGraph(()=>{navigation.operation('vue '+v);view=v;scenarioFocus=null;$('objects').setAttribute('aria-pressed',v==='objects');$('scenarios').setAttribute('aria-pressed',v==='scenarios');render();});}
$('fit').onclick=()=>frameGraph(cy.elements(':visible'),centeredNode?cy.getElementById(centeredNode):null);
$('overview').onclick=()=>{navigation.operation('vue générale');showOverview();refreshNavigationControls();};
$('zoom-in').onclick=()=>cy.zoom({level:cy.zoom()*1.25,renderedPosition:{x:cy.width()/2,y:cy.height()/2}});
$('zoom-out').onclick=()=>cy.zoom({level:cy.zoom()/1.25,renderedPosition:{x:cy.width()/2,y:cy.height()/2}});
$('entity').onchange=()=>activateNode($('entity').value);
$('phase').onchange=()=>{navigation.operation('phase '+$('phase').value);refreshNavigationControls();handoff();};
$('challenge').onclick=()=>{navigation.operation('préparer une question');handoff(true);refreshNavigationControls();};$('summary').onclick=()=>{navigation.operation('préparer un résumé');handoff();refreshNavigationControls();};
$('copy').onclick=async()=>{try{await navigator.clipboard.writeText($('handoff').value);$('copy').textContent='Copié';}catch{$('handoff').focus();$('handoff').select();$('copy').textContent='Sélectionné : Ctrl+C';}};
function refreshProposalOverlay(viewport=null){
  const visualBefore=cy?viewTransitions.capture(cy):null;
  viewTransitions.finish();
  render();
  if(viewport)cy.viewport(viewport);
  // Graphical proposals share the reference view's entrance/exit animation;
  // they never enter the source Analysis or effective-event history.
  if(visualBefore)viewTransitions.play(visualBefore,viewTransitions.capture(cy));
}
function previewCandidateEnvelope(envelope){
 const source=documentModel??{analysis_id:envelope?.analysis_id};
 const {map_patch:patch}=TriaMapProtocol.validate(source,envelope,acceptedOverlay);
 if(!patch.objects.length&&!patch.relations.length)return false;
 const before=documentModel?null:graphSnapshot();
 previewOverlay=structuredClone(patch);
 view='objects';scenarioFocus=null;
 $('objects').setAttribute('aria-pressed','true');$('scenarios').setAttribute('aria-pressed','false');
 refreshProposalOverlay();
 if(before){graphHistory.commit(before,graphSnapshot());updateGraphHistoryControls();}
 notifyProposalPreview();
 return true;
}
function notifyProposalPreview(){
 const detail=previewOverlay?{objects:previewOverlay.objects.length,relations:previewOverlay.relations.length}:null;
 document.dispatchEvent(new CustomEvent('tria-proposal-preview-changed',{detail}));
}
function forgetProposalPreview(){
 if(!previewOverlay)return false;
 previewOverlay=null;
 notifyProposalPreview();
 return true;
}
function clearProposalPreview(){
 if(forgetProposalPreview())refreshProposalOverlay();
 if(!documentModel){graphHistory.reset(graphSnapshot());updateGraphHistoryControls();}
}
function stageCandidateEnvelope(envelope){
 if(!documentModel)throw Error('Aucune Analysis chargée.');
 TriaMapProtocol.validate(documentModel,envelope,acceptedOverlay);
 if(!envelope.map_patch.objects.length&&!envelope.map_patch.relations.length)
  throw Error('Aucune proposition à afficher.');
 forgetProposalPreview();
 acceptedOverlay.objects.push(...envelope.map_patch.objects);
 acceptedOverlay.relations.push(...envelope.map_patch.relations);
 $('clear-proposals').disabled=false;
 refreshProposalOverlay();
}
$('import-proposals').onclick=()=>$('proposals-file').click();
$('proposals-file').onchange=async()=>{
 try {
  const file=$('proposals-file').files?.[0];
  if(!file)return;
  if(file.size>200000)throw Error('Fichier de propositions supérieur à 200 Ko.');
  if(!documentModel)throw Error('Importer une Analysis avant ses propositions.');
  const envelope=JSON.parse(await file.text());
  stageCandidateEnvelope(envelope);
  $('status').textContent='Propositions IA importées pour inspection uniquement. Ni l’Analysis ni les évaluations n’ont été modifiées.';
 } catch(e){
  $('status').textContent='Import des propositions refusé : '+String(e.message||e);
 } finally {$('proposals-file').value='';}
};
$('clear-proposals').onclick=()=>{
 acceptedOverlay={objects:[],relations:[]};$('clear-proposals').disabled=true;
 forgetProposalPreview();
 refreshProposalOverlay();
 $('status').textContent='Propositions provisoires retirées. Analysis inchangée.';
};
$('import').onclick=()=>$('file').click();
$('file').onchange=async()=>{try{const f=$('file').files[0];if(!f)return;if(f.size>TriaMapData.MAX_BYTES)throw Error('Limite : 2 Mo');
 const parsed=TriaMapData.parseAnalysis(await f.text());await install(parsed.document,parsed.issues);
 }catch(e){$('status').textContent='Import refusé ; analyse conservée. '+e.message;}finally{$('file').value='';}};
$('export').onclick=()=>{const blob=new Blob([pretty(documentModel)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='triad-analysis.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
new ResizeObserver(()=>{viewTransitions.finish();cy?.resize();}).observe($('cy'));
if(typeof cytoscape==='undefined')$('status').textContent='Cytoscape.js absent : vérifier la copie locale.';

function setTheme(theme,remember=true){
 viewTransitions.finish();
 const oldSelected=selected,oldCentered=centeredNode,camera=cy?{zoom:cy.zoom(),pan:{...cy.pan()}}:null;
 document.documentElement.dataset.theme=theme;
 $('theme-toggle').textContent=theme==='dark'?'☀ Clair':'☾ Sombre';
 $('theme-toggle').setAttribute('aria-label',theme==='dark'?'Activer le thème clair':'Activer le thème sombre');
 if(remember)try{localStorage.setItem('triad-theme',theme);}catch{}
 if(documentModel||previewOverlay){render();if(oldCentered&&records.has(oldCentered))focusNode(oldCentered);if(oldSelected&&records.has(oldSelected))inspect(oldSelected);if(camera)cy.viewport(camera);}
}
$('theme-toggle').onclick=()=>setTheme(document.documentElement.dataset.theme==='light'?'dark':'light');
let savedTheme='dark';try{savedTheme=localStorage.getItem('triad-theme')||'dark';}catch{}
setTheme(savedTheme==='light'?'light':'dark',false);

document.addEventListener('tria-language-changed',()=>{
 viewTransitions.finish();
 const r=records.get(selected),description=document.querySelector('.object-preview-description');
 if(description&&['object','condition'].includes(r?.family)){
  const card=currentAnalystCard(r);description.textContent=card.summary;
  const content=document.querySelector('.analyst-inspector-card');
  if(content){content.replaceChildren();card.sections.forEach(section=>{text(content,'strong',section.heading);text(content,'p',section.body,section.tone?'sign-'+section.tone:'');});}
 }
 if(!objectTooltip.hidden)drawObjectTooltip();
 if(cy){cy.batch(()=>cy.elements().forEach(e=>{const source=e.data('sourceLabel');if(source!==undefined)e.data('label',UII18n.translate(source));}));cy.resize();}
 if(documentModel)handoff();
});

$('graph-back').onclick=()=>moveGraphHistory(-1);
$('graph-forward').onclick=()=>moveGraphHistory(1);
TriaGraphHistory.bindGraphMouseHistory(document.querySelector('.map'),moveGraphHistory);

window.TriaGraph=Object.freeze({
 async loadAnalysis(input){
  const parsed=TriaMapData.parseAnalysis(input);
  await install(parsed.document,parsed.issues);
  return {analysis_id:documentModel.analysis_id,issues:parsed.issues};
 },
 getAnalysis(){return documentModel?structuredClone(documentModel):null;},
 getContext(){
  const inspected=records.get(selected);
  return {
   analysisRevision,
   focusId:focusCycle?.focus||null,
   inspectedObjectId:inspected?.family==='object'&&!inspected.raw.proposed?inspected.id:null,
   subjectId:documentModel?.main_subject.id,
   scenarioId:$('scenario').value||null,
   mapMode:focusCycle?.mode||'detailed',
   note:$('note').value
  };
 },
 stageProposals:stageCandidateEnvelope,
 previewProposals:previewCandidateEnvelope,
 clearProposalPreview
});
