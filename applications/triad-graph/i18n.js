/* UI translations only. Source records, JSON, identifiers and form values stay intact. */
(function(root){
 const pairs=[
 ['Jeu d’exemple','Example dataset'],
 ['Choisir un exemple…','Choose an example…'],
 ['Charger l’exemple','Load example'],
 ['Aucune analyse chargée. Choisis un jeu d’exemple ou importe une analyse.','No analysis loaded. Choose an example dataset or import an analysis.'],
 ['Carte vide','Empty map'],
 ['Échange local avec ChatGPT Work','Local exchange with ChatGPT Work'],
 ['PONT DE FICHIERS LOCAL · SANS API NI MCP','LOCAL FILE BRIDGE · NO API OR MCP'],
 ['Approfondir avec ChatGPT Work','Deepen with ChatGPT Work'],
 ['Préparer le Focus pour Work','Prepare Focus for Work'],
 ['Préparer C+ pour Work','Prepare C+ for Work'],
 ['Vérifier la réponse','Check response'],
 ['Copier les instructions Work','Copy Work instructions'],
 ['Préparation du pont local…','Preparing local bridge…'],
 ["Créer une demande enregistrée sur ton PC, puis demander explicitement à ChatGPT Work Local de la traiter. Le serveur Python ne peut pas déclencher lui-même GPT.",
  "Create a request on your PC, then explicitly ask ChatGPT Work Local to process it. The Python server cannot trigger GPT itself."],
 ["Work doit disposer d'un accès autorisé au dossier local du dépôt. L'échange est manuel côté Work et n'entraîne aucune modification automatique du document Analysis, des évaluations ou des Scénarios.",
  "Work needs authorized access to the local repository folder. The Work step is manual and does not automatically change the Analysis document, assessments or Scenarios."],
 ['Vues de la carte','Map views'],['Carte des Objets et relations','Object and relationship map'],['Carte des scénarios','Scenario map'],['Carte interactive des Objets et des relations qualifiées','Interactive Object and qualified relationship map'],
 ['Carte détaillée · Objets et relations','Detailed map · Objects and relationships'],['Carte simple · sélection non exhaustive','Simple map · non-exhaustive selection'],
 ['Première réponse · carte','First response · map'],['Choisir une carte simple ou détaillée','Choose a simple or detailed map'],['Carte simple · A (texte puis carte)','Simple map · A (text then map)'],['Carte détaillée · B (structure puis texte)','Detailed map · B (structure then text)'],
 ["Adopter l'Objet inspecté comme Focus",'Adopt the inspected Object as Focus'],['Retour à la carte générale','Return to the map overview'],['Améliorer la résolution de la carte · C+','Improve map resolution · C+'],["Préparer l'approfondissement pour l'IA",'Prepare further exploration for AI'],['Explorer un Sujet Focal','Explore a Focal Subject'],

 ['Survoler pour un aperçu · cliquer pour explorer les liens.','Hover for a preview · click to explore relationships.'],
 ["L'atelier des possibles",'The possibilities workshop'],['Explorer. Relier. Comprendre.','Explore. Connect. Understand.'],['Prototype · mode exploratoire','Prototype · exploratory mode'],['IA · aucune connexion (carte seule)','AI · no connection (map only)'],['Aucun adaptateur IA actif dans cette interface.','No AI adapter is active in this interface.'],
 ['Contexte de travail','Working context'],['Terrain d’exploration','Exploration case'],['Scénario','Scenario'],['Scénarios','Scenarios'],['Comprendre/Explorer','Understand/Explore'],
 ['Pilote Focus · six écoles · fictif','Focus pilot · six schools · fictional'],['Générateur · conditions et scénarios · 2.0','Generator · conditions and scenarios · 2.0'],['Capacités · affiliations CAN · 2.2','Capabilities · CAN affiliations · 2.2'],['Identité et attribution · 2.1','Identity and attribution · 2.1'],
 ['Importer / exporter','Import / export'],['Importer une analyse','Import analysis'],['Exporter l’analyse','Export analysis'],['Vues du graphe','Graph views'],['Piloter le Focus ↗','Steer the Focus ↗'],
 ['Tous les éléments','All elements'],['Branches CAN ↑ · Racines NEED ↓','CAN branches ↑ · NEED roots ↓'],['Contexte du scénario choisi','Selected scenario context'],['Cliquer pour choisir un Focus','Click to choose a Focus'],
 ['Graphe des Objets et relations','Object and relationship graph'],['Objets associés au scénario choisi','Objects associated with the selected scenario'],['Graphe des scénarios','Scenario graph'],['Graphe interactif des Objets et des relations qualifiées','Interactive Object and qualified relationship graph'],
 ['Vue précédente','Previous view'],['Vue suivante','Next view'],['Zoom avant','Zoom in'],['Zoom arrière','Zoom out'],['Recentrer','Center view'],['Vue générale','Overview'],['Clique sur un objet pour explorer ses liens.','Click an Object to explore its relationships.'],['Lire les symboles et les liens','Read symbols and links'],
 ['Sujet','Subject'],['Objet','Object'],['Condition (','Condition ('],['✓ satisfaite','✓ satisfied'],['× non satisfaite','× unsatisfied'],['? inconnue','? unknown'],['Scénario · • Connecteur','Scenario · • Connector'],
 ['→ contribue · ⇢ permet · ⊣ inhibe · ▷ spécialisation · ◇ composition · ··· scénario','→ contributes · ⇢ enables · ⊣ inhibits · ▷ specialization · ◇ composition · ··· scenario'],
 ['? = qualification incertaine ou non renseignée (inspecter le lien)','? = uncertain or unspecified qualification (inspect the relationship)'],
 ['Vue générale : Objet principal = tronc · CANs = branches vers le haut · NEEDs = racines vers le bas.','Overview: main Object = trunk · CANs = branches above · NEEDs = roots below.'],
 ['Un lien visible ne prouve ni possession, ni causalité, ni Puissance.','A visible relationship does not establish possession, causality or Power.'],
 ['Accéder à un objet ou un lien','Go to an Object or relationship'],['Choisir une entité…','Choose an entity…'],['● Inspection · à la demande','● On-demand inspection'],['Orientation','Orientation'],['Préparer une question','Prepare a question'],['Données et provenance','Data and provenance'],
 ['Inspection / Focus conservé · comparaison A/B','Inspection / retained Focus · A/B comparison'],['Comparaison expérimentale des modes de navigation','Experimental navigation mode comparison'],['Comparaison A/B · Inspection ou Focus conservé','A/B comparison · Inspection or retained Focus'],
 ["A : inspection ponctuelle, sans sélection conservée · B : sélection explicite conservée entre les opérations d'interface.",'A: one-off inspection, no retained selection · B: explicit selection retained across interface operations.'],
 ['Mode de navigation','Navigation mode'],['A · Inspection ponctuelle','A · One-off inspection'],['B · Focus de navigation','B · Navigation Focus'],['Conserver le nœud inspecté comme Focus','Retain inspected node as Focus'],['Revenir au Focus','Return to Focus'],['Effacer le Focus','Clear Focus'],
 ['Mode A : inspection ponctuelle, sans Focus conservé.','Mode A: one-off inspection, no retained Focus.'],['Mode A : aucune sélection conservée.','Mode A: no retained selection.'],['Mode B : aucun Focus sélectionné. Inspecter un Objet ou un Scénario, puis utiliser « Conserver ».','Mode B: no selected Focus. Inspect an Object or Scenario, then choose “Retain”.'],
 ['Journal local de navigation (sans modification du modèle)','Local navigation log (no model changes)'],
 ["Le Focus de navigation est distinct du Focus source et de PowerEvaluation.Focus. Les actions affichées n'entraînent aucune Actualisation ni révision d'évaluation.",'Navigation Focus is separate from source Focus and PowerEvaluation.Focus. These actions do not cause Actualization or evaluation revisions.'],
 ['COMPRENDRE LE CONTEXTE','UNDERSTAND THE CONTEXT'],['Ce que l’on examine','What we are examining'],['Phase affichée','Displayed phase'],['Comprendre','Understand'],['Explorer','Explore'],['Décider','Decide'],
 ['Phase de présentation locale, hors contrat Analysis. Décider peut rester non engagé. Le Focus ne limite pas la pertinence au seul objet sélectionné.','Local presentation phase, outside the Analysis contract. Decision can remain pending. Relevance extends beyond the selected Object.'],
 ['POURSUIVRE L’EXPLORATION','CONTINUE EXPLORING'],['Revenir à la conversation','Return to the conversation'],['Question ou correction','Question or correction'],['Quelle hypothèse faut-il vérifier ?','Which assumption should we check?'],['Préparer le résumé','Prepare summary'],['Copier le texte','Copy text'],['Copié','Copied'],['Sélectionné : Ctrl+C','Selected: Ctrl+C'],['Texte à transmettre à la conversation','Text to take back to the conversation'],
 ['Échange manuel : aucune lecture du chat, aucun envoi automatique, aucun moteur d’inférence connecté.','Manual exchange: no chat access, automatic messages or connected inference engine.'],
 ['Adaptation expérimentale de la','Experimental adaptation of the'],['· sources CC BY 4.0 · Cytoscape.js 3.30.4, MIT. Les constats synthétiques ne constituent pas une validation empirique.','· sources CC BY 4.0 · Cytoscape.js 3.30.4, MIT. Synthetic findings are not empirical validation.'],
 ['TESTER LE PILOTAGE · CAS FICTIF','TEST THE CONTROLS · FICTIONAL CASE'],['Où porter ton attention ?','Where should attention go?'],
 ['Six écoles face à la chaleur : protéger les élèves tout en préservant les agents, les riverains et le réseau.','Six schools facing heat: protect pupils while considering staff, neighbours and the grid.'],
 ['Choisir le prochain point d’attention','Choose the next point of attention'],['Adopter ce Focus','Adopt this Focus'],['Explorer un nœud est une inspection. Adopter un Focus est un choix explicite ; les évaluations restent inchangées.','Exploring a node is an inspection. Adopting a Focus is an explicit choice; evaluations stay unchanged.'],
 ['Opération en cours : comparer les effets','Current operation: compare effects'],["Cibles de l'opération (sélection multiple)",'Operation targets (multiple selection)'],['Appliquer les cibles','Apply targets'],['UNE PISTE À EXAMINER','A POSSIBILITY TO EXAMINE'],["Proposition de l'IA",'AI suggestion'],
 ['Je propose O-eleves : vérifier les 120 élèves supposés vulnérables et l’efficacité des solutions avant de privilégier les contraintes techniques. Ce changement attend ton choix.','I suggest O-eleves: examine the 120 pupils assumed to be vulnerable and the effectiveness of solutions before prioritising technical constraints. This change awaits your choice.'],
 ['Accepter : élèves','Accept: pupils'],['Refuser','Reject'],['Revoir la proposition','Reopen suggestion'],['Acceptée explicitement par l’Analyste.','Explicitly accepted by the Analyst.'],['Refusée : Focus précédent conservé.','Rejected: previous Focus retained.'],
 ['Historique de navigation et reprise','Navigation history and revisit'],['Contexte enregistré','Recorded context'],['Reprise historique','Historical revisit'],['Reprise dans le contexte actuel','Revisit in the current context'],
 ["Garde-fou global : agents, riverains, réseau, budget et délais restent pertinents même hors du Focus. Aucun scénario n'est sélectionné comme gagnant.",'Global safeguard: staff, neighbours, grid, budget and deadlines remain relevant outside the Focus. No scenario is selected as the winner.'],
 ['À propos de cet essai','About this trial'],["Couche de pilotage expérimentale et locale. Pas de moteur IA, de calcul de Puissance, de collaboration multi-analyste ni de sauvegarde durable. Une reprise historique relit une sélection, pas un ancien état du monde.",'Experimental local steering layer. No AI engine, Power computation, multi-analyst collaboration or durable storage. Historical revisit reads a selection, not an earlier state of the world.'],
 ['Inspecter','Inspect'],['Enregistrement inspectable ci-dessous.','Inspectable record below.'],['Sélectionnez un nœud ou un lien pour examiner les qualifications et les références.','Select a node or relationship to inspect qualifications and references.'],
 ['Aucune évaluation enregistrée dans ce contexte. Aucun score ni résultat causal calculé.','No evaluation recorded in this context. No score or causal result computed.'],['Aucun scénario enregistré : aucune absence globale inférée.','No scenario recorded: no global absence inferred.'],
 ['Évaluation source ; dépendances analytiques distinctes des liens NEED/CAN.','Source evaluation; analytical dependencies are separate from NEED/CAN relationships.'],
 ['Chargement impossible','Unable to load'],['Validation impossible','Unable to validate'],['Limite : 2 Mo','Limit: 2 MB'],['Cytoscape.js absent : vérifier la copie locale.','Cytoscape.js missing: check the local copy.'],['Scénario du Focus absent du document.','Focus scenario is absent from the document.'],['Focus introuvable dans cette projection : vérifier son identité et sa version.','Focus not found in this projection: check its identity and version.'],
 ['☀ Clair','☀ Light'],['☾ Sombre','☾ Dark'],['Activer le thème clair','Switch to light theme'],['Activer le thème sombre','Switch to dark theme'],
 ['contribue','contributes'],['permet','enables'],['inhibe','inhibits'],['rôle non précisé','unspecified role'],['attribution','attribution'],['Objet représenté','Represented Object'],['branche','branch'],['non évaluée','not assessed'],
 ['Focus choisi','Chosen Focus'],['Focus effacé','Cleared Focus'],['Inspection','Inspection'],['Mode','Mode'],['Opération d’interface','Interface operation'],['aucun','none'],['Aucun','None'],
 ['Sujet ·','Subject ·'],['Objet ·','Object ·'],['CAN · ◇ Condition (','CAN · ◇ Condition ('],[') · ▭ Scénario · • Connecteur',') · ▭ Scenario · • Connector'],
 ['non déclarée (ne pas inférer depuis le libellé)','not declared (do not infer from the label)'],['sans propriétés enregistrées','no recorded properties']
 ];
 const patterns=[
 ['Comprendre/Explorer · Objets et relations','Understand/Explore · Objects and relationships'],
 ['Scénario : {id} · {count} Objets dans le périmètre','Scenario: {id} · {count} Objects in scope'],['{count} scénarios · cliquer pour explorer','{count} scenarios · click to explore'],
 ['Autour de {id} · {count} voisin(s)','Around {id} · {count} neighbour(s)'],['Sujet principal : {value}','Main Subject: {value}'],['Focus source : {value}','Source Focus: {value}'],
 ['{objects} Objets · {relations} relations · {scenarios} scénarios','{objects} Objects · {relations} relationships · {scenarios} scenarios'],
 ['Identité conceptuelle : {value}','Conceptual identity: {value}'],['Définition {version} · {value}','Definition {version} · {value}'],['Rôles : {roles} · causalité : {value}','Roles: {roles} · causality: {value}'],
 ['Cibles conservées : {targets}','Retained targets: {targets}'],['Focus choisi : {id} · contexte actuel · contexte enregistré : {scenario}.','Chosen Focus: {id} · current context · recorded context: {scenario}.'],
 ['Focus choisi : {id} · relecture historique · contexte enregistré : {scenario}.','Chosen Focus: {id} · historical revisit · recorded context: {scenario}.'],
 ['{id} · profil {version} · structure acceptée · {count} avertissement(s) sémantique(s). Contrôles limités ; aucune preuve empirique.','{id} · profile {version} · structure accepted · {count} semantic warning(s). Limited checks; no empirical proof.'],
 ['Objet {id}','Object {id}'],['Scénario {id}','Scenario {id}'],
 ['Mode B : Focus de navigation = {ref} (présent dans le graphe) · {count} sélection(s) explicite(s) dans cette session.','Mode B: navigation Focus = {ref} (shown in graph) · {count} explicit selection(s) in this session.'],
 ['Mode B : Focus de navigation = {ref} (hors de la vue courante) · {count} sélection(s) explicite(s) dans cette session.','Mode B: navigation Focus = {ref} (outside current view) · {count} explicit selection(s) in this session.'],
 ['Mode B : Focus de navigation = {ref} (contexte affiché, sans nœud scénario) · {count} sélection(s) explicite(s) dans cette session.','Mode B: navigation Focus = {ref} (context displayed, without scenario node) · {count} explicit selection(s) in this session.'],
 ['{value}\nnon évaluée','{value}\nnot assessed'],
 ['S-01 · Horaires décalés','S-01 · Adjusted school hours'],['S-02 · Refroidissement actif','S-02 · Active cooling'],['S-03 · Ombrage et ventilation','S-03 · Shading and ventilation'],['S-04 · Combinaison ciblée','S-04 · Targeted combination'],
 ['Import refusé ; analyse conservée. {error}','Import rejected; previous analysis retained. {error}']
 ];
 const exact=new Map(pairs);
 const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const compiled=patterns.map(([fr,en])=>{const names=[];const parts=fr.split(/(\{\w+\})/g);const regex=new RegExp('^'+parts.map(p=>p.startsWith('{')?(names.push(p.slice(1,-1)),'([\\s\\S]*?)'):escape(p)).join('')+'$');return{regex,names,en};});
 let language='fr';
 function translate(input,lang=language){
  const value=String(input??'');if(lang==='fr')return value;
  if(exact.has(value))return exact.get(value);
  for(const p of compiled){const match=value.match(p.regex);if(match){const args=Object.fromEntries(p.names.map((n,i)=>[n,translate(match[i+1],lang)]));return p.en.replace(/\{(\w+)\}/g,(_,n)=>args[n]);}}
  // Separators are authored UI labels, not free-text model content.
  if(value.endsWith(' ?')&&exact.has(value.slice(0,-2)))return exact.get(value.slice(0,-2))+' ?';
  if(value.includes(' · ')){const parts=value.split(' · ');if(parts.some(p=>exact.has(p)))return parts.map(p=>exact.get(p)||p).join(' · ');}
  return value;
 }
 function initialLanguage(url,fallback='fr'){
  const requested=new URL(url).searchParams.get('lang');return ['fr','en'].includes(requested)?requested:fallback==='en'?'en':'fr';
 }
 const api={translate,initialLanguage,get language(){return language;}};
 if(typeof module!=='undefined'&&module.exports){module.exports=api;return;}
 root.UII18n=api;
 language=initialLanguage(location.href,document.documentElement.dataset.discussionLanguage||document.documentElement.lang);
 const originals=new WeakMap(),attributes=new WeakMap();let observer;
 function excluded(element){return !element||!!element.closest('script,style,pre,textarea,input,[data-source-text]');}
 function apply(){
  observer?.disconnect();
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;
  while((node=walker.nextNode())){
   if(excluded(node.parentElement)||!node.nodeValue.trim())continue;
   const previous=originals.get(node);
   const original=previous&&node.nodeValue===previous.rendered?previous.original:node.nodeValue;
   const core=original.trim(),leading=original.slice(0,original.indexOf(core)),trailing=original.slice(original.indexOf(core)+core.length);
   if(node.parentElement.tagName==='OPTION'&&!node.parentElement.hasAttribute('value'))node.parentElement.value=core;
   const rendered=leading+translate(core)+trailing;
   if(node.nodeValue!==rendered)node.nodeValue=rendered;
   originals.set(node,{original,rendered});
  }
  document.querySelectorAll('[aria-label],[placeholder],[title]').forEach(el=>{
   if(el.closest('script,style,pre,[data-source-text]'))return;
   const saved=attributes.get(el)||{};
   for(const attr of ['aria-label','placeholder','title']){
    if(!el.hasAttribute(attr))continue;const current=el.getAttribute(attr),prior=saved[attr];
    const original=prior&&current===prior.rendered?prior.original:current,rendered=translate(original);
    if(current!==rendered)el.setAttribute(attr,rendered);saved[attr]={original,rendered};
   }attributes.set(el,saved);
  });
  document.documentElement.lang=language;
  document.title=language==='fr'?'trIAd · Atelier de cartes':'trIAd · Map workshop';
  const button=document.getElementById('language-toggle');
  if(button){button.textContent=language==='fr'?'EN':'FR';button.setAttribute('aria-label',language==='fr'?'Switch interface to English':'Passer l’interface en français');}
  observer?.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','placeholder','title']});
 }
 api.setLanguage=lang=>{
  language=lang==='en'?'en':'fr';
  const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(history.state,'',url);
  apply();document.dispatchEvent(new CustomEvent('tria-language-changed',{detail:{language}}));
 };
 observer=new MutationObserver(()=>apply());
 document.getElementById('language-toggle').onclick=()=>api.setLanguage(language==='fr'?'en':'fr');
 apply();
})(typeof window==='undefined'?globalThis:window);
