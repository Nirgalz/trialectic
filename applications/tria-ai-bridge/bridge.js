/* Request/response contracts only. No DOM, HTTP, filesystem or model invocation. */
(function(root,factory){const api=factory();if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TriaAIBridge=api;})(globalThis,function(){
 const clone=x=>JSON.parse(JSON.stringify(x));
 function canonical(x){
  if(Array.isArray(x))return '['+x.map(canonical).join(',')+']';
  if(x&&typeof x==='object')return '{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+canonical(x[k])).join(',')+'}';
  return JSON.stringify(x);
 }
 async function fingerprint(analysis){
  const bytes=new TextEncoder().encode(canonical(analysis));
  if(!globalThis.crypto?.subtle)throw Error('SHA-256 indisponible dans cet environnement.');
  return Array.from(new Uint8Array(await globalThis.crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
 }
 async function prepareRequest(source,{action='focus',focusId=source.main_subject?.id,mapMode='detailed',note=''}={}){
  if(!['focus','refine'].includes(action)||!['simple','detailed'].includes(mapMode))throw Error('Action ou mode invalide.');
  if(!source.objects?.some(o=>o.id===focusId))throw Error('Objet Focal inconnu.');
  if(typeof note!=='string'||note.length>1500)throw Error('Note trop longue ou invalide.');
  const document=clone(source),request_id=globalThis.crypto.randomUUID(),analysis_hash=await fingerprint(document);
  const request={schema:'tria-ai-request-v1',request_id,analysis_id:document.analysis_id,analysis_hash,action,focus_id:focusId,map_mode:mapMode,note,document,
   instructions:["Examiner le Sujet Focal, son Environnement et sa Sémantique, selon la Méthode trialectique.","Préserver les identités, versions, inconnues, hypothèses, provenance, autres Sujets et portée globale.","Distinguer une révision des connaissances d’une Actualisation. Proposer des changements pour examen, sans prétendre les avoir appliqués."],
   response_contract:{schema:'tria-ai-response-v1',request_id,analysis_id:document.analysis_id,analysis_hash,summary:'Synthèse à remplacer',semantic_findings:[],proposals:[],scenario_reviews:[],open_questions:[]}};
  if(new TextEncoder().encode(JSON.stringify(request)).length>2_000_000)throw Error('Demande trop volumineuse.');
  return request;
 }
 async function parseResponse(input,request,currentAnalysis){
  const text=typeof input==='string'?input:JSON.stringify(input);
  if(typeof text!=='string'||new TextEncoder().encode(text).length>2_000_000)throw Error('Réponse trop volumineuse.');
  let response;try{response=JSON.parse(text.replace(/^\uFEFF/,''));}catch{throw Error('Réponse JSON invalide.');}
  for(const [field,value] of Object.entries({schema:'tria-ai-response-v1',request_id:request.request_id,analysis_id:request.analysis_id,analysis_hash:request.analysis_hash}))
   if(response?.[field]!==value)throw Error('Réponse incompatible : '+field);
  if(await fingerprint(currentAnalysis)!==request.analysis_hash)throw Error('L’analyse a changé depuis la demande.');
  if(typeof response.summary!=='string'||response.summary.length>14000)throw Error('Synthèse invalide.');
  for(const field of ['semantic_findings','proposals','scenario_reviews','open_questions']){
   if(!Array.isArray(response[field])||response[field].length>100||response[field].some(x=>typeof x!=='string'&&(!x||typeof x!=='object'||Array.isArray(x))))throw Error('Liste de réponse invalide : '+field);
  }
  if(response.revised_analysis!==undefined&&(!response.revised_analysis||typeof response.revised_analysis!=='object'||Array.isArray(response.revised_analysis)))throw Error('Analysis révisée invalide.');
  return response; // A proposal only: validation and explicit adoption belong to the caller.
 }
 async function dispatch(request,send){
  if(typeof send!=='function')throw Error('Fournir explicitement un moyen de communication.');
  return send(clone(request));
 }
    function formatFocusContext({analysis:doc,context:body,mode,report}) {
      if(!body)return "";
      return [
        'use trIAd-c',
        `Analyse : ${doc.analysis_id}; mode carte : ${mode}; objet focal : ${body.subject.id}.`,
        mode==='simple' ? 'Carte simple / A : réponds d’abord en langage naturel, puis représente une sélection fidèle des Objects et relations explicitement justifiés par ta réponse.' : 'Carte détaillée / B : expose d’abord les Objects, relations et qualifications pertinents à la question, puis rédige la réponse correspondante et sa carte détaillée.',
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
 function formatHandoff({analysis:documentModel,record:r,scenario:s,phase,note='',navigation,scenarioFocus,focusContext='',pilotSummary='',pilotSummaryEnglish='',issues=[],language='fr',translate=x=>x,challenge=false}){
  const pretty=x=>JSON.stringify(x,null,2);
  const navigationRefLabel=ref=>ref?`${ref.family==='object'?'Objet':'Scénario'} ${ref.id}${ref.version?'@'+ref.version:''}`:'Aucun';
  let output;

  output=[`use trIAd-c`,`Analyse : ${documentModel.analysis_id} (profil ${documentModel.schema_version}).`,`Sujet : ${documentModel.main_subject.id}@${documentModel.main_subject.version}.`,`Phase de présentation : ${phase}. Focus source : ${pretty(documentModel.focus)}.`,`Scénario : ${s?.id||'aucun'} (${s?.mode||'non renseigné'}).`,r?`Inspection demandée : ${r.family} ${r.id}\n${pretty(r.raw)}`:'',`Mode de navigation : ${navigation.mode}. Focus choisi par l’Analyste : ${navigation.mode==='persistent'?navigationRefLabel(navigation.focus):'aucun'}.`,pilotSummary,focusContext,scenarioFocus?`Contexte graphique : Scénario ${scenarioFocus}.`:'',challenge?'Examine les qualifications, les hypothèses et les informations manquantes de cette sélection.':'',`Question / correction utilisateur : ${note||'À préciser.'}`,`Conserver les IDs, versions et distinctions fait/hypothèse. Évaluer aussi les effets sur les autres Sujets et le problème global. Aucun événement effectif ne doit être déduit de cette interaction.`, `Source dev : 5449b52b49baf56f8e62b185d74b6e10b45a4abd. ${issues.length} signalements du validateur (voir prototype).`].filter(Boolean).join('\n\n');
  if(language==='en'){
    output=[`use trIAd-c`,`Analysis: ${documentModel.analysis_id} (profile ${documentModel.schema_version}).`,
      `Subject: ${documentModel.main_subject.id}@${documentModel.main_subject.version}.`,
      `Displayed phase: ${translate(phase)}. Source Focus: ${pretty(documentModel.focus)}.`,
      `Scenario: ${s?.id||'none'} (${s?.mode||'unspecified'}).`,
      r?`Requested inspection: ${r.family} ${r.id}\n${pretty(r.raw)}`:'',
      `Navigation mode: ${navigation.mode}. Analyst Focus: ${navigation.mode==='persistent'?translate(navigationRefLabel(navigation.focus)):'none'}.`,
      pilotSummaryEnglish,focusContext,scenarioFocus?`Graph context: Scenario ${scenarioFocus}.`:'',
      challenge?'Examine the qualifications, assumptions and missing information for this selection.':'',
      `User question / correction: ${note||'To be specified.'}`,
      'Preserve IDs, versions and distinctions between facts and assumptions. Consider other Subjects and the overall problem. Do not infer an effective event from this interaction.',
      `Source dev: 5449b52b49baf56f8e62b185d74b6e10b45a4abd. ${issues.length} validator findings (see prototype).`].filter(Boolean).join('\n\n');
  }

  return output;
 }
 return {prepareRequest,parseResponse,dispatch,fingerprint,formatFocusContext,formatHandoff};
});
