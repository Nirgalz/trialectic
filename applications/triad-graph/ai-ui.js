/* Work Local handoff via a local file queue. It never calls a model or API. */
(function() {
  const byId = id => document.getElementById(id);
  let available=false, busy=false, active=null, sourceDoc=null, copiedText='';
  function node(parent, tag, value, className) {
    const el=document.createElement(tag);
    el.textContent=value;
    if(className) el.className=className;
    parent.append(el);
    return el;
  }
  function status(message){byId('local-ai-status').textContent=message;}
  function updateButtons() {
    const ready=available && !!documentModel && !!focusCycle;
    byId('ai-focus').disabled=busy||!ready||!focusCycle.focus;
    byId('ai-refine').disabled=busy||!ready;
    byId('ai-check').disabled=busy||!active;
    byId('ai-copy').disabled=!active;
  }
  async function ping(){
    try{
      const res=await fetch('/api/work/status/not-a-valid-id',{cache:'no-store'});
      // Status 400 means that the local queue handler exists.
      available=res.status===400||res.status===404;
    }catch{available=false;}
    status(available?'Pont local prêt. Une demande ne contacte pas automatiquement ChatGPT Work.':'Serveur de demandes Work indisponible ; démarrer server.py.');
    updateButtons();
  }
  function instructionsFor(request) {
    return [
      'Dans ChatGPT Work Local (avec accès autorisé au dossier local Nirgalz/trialectic) :',
      'Lis le fichier '+request.relative_request_path+' dans mon dépôt local.',
      'Analyse le Sujet Focal avec la Méthode trialectique selon instructions et action.',
      'Écris un JSON UTF-8 complet dans '+request.relative_response_path+'.',
      'Utilise response_contract comme modèle : respecte schema, request_id, analysis_id, analysis_hash EXACTEMENT.',
      'Remplace les exemples des champs summary, semantic_findings, proposals, scenario_reviews, open_questions par ton analyse.',
      "N’écris pas le résultat dans le dépôt Git versionné ni dans Analysis ; ne crée pas d’Actualisation fictive.",
      'Reviens me dire quand le fichier de réponse est écrit.'
    ].join('\n');
  }
  function drawRequest(req){
    const panel=byId('local-ai-request');panel.replaceChildren();
    node(panel,'h3','Demande Work prête · '+req.request_id.slice(0,8));
    node(panel,'p','Fichier demande : '+req.relative_request_path,'muted');
    node(panel,'p','Fichier réponse attendu : '+req.relative_response_path,'muted');
    node(panel,'pre',copiedText,'ai-work-instructions');
  }
  function renderResult(result) {
    const panel=byId('local-ai-results');panel.replaceChildren();
    node(panel,'h3','Réponse de ChatGPT Work · propositions à vérifier');
    node(panel,'p',result.summary||'','ai-answer');
    for(const [heading,items] of [
      ['Clarifications sémantiques',result.semantic_findings],
      ['Propositions à examiner',result.proposals],
      ['Scénarios candidats au réexamen',result.scenario_reviews],
      ['Questions ouvertes',result.open_questions]]) {
      if(!Array.isArray(items)||!items.length)continue;
      node(panel,'h3',heading);
      const list=document.createElement('ul');
      for(const item of items)node(list,'li',typeof item==='string'?item:JSON.stringify(item));
      panel.append(list);
    }
  }
  async function create(action) {
    if(!available||busy||!documentModel||!focusCycle)return;
    if(action==='focus'&&!focusCycle.focus)return;
    busy=true;updateButtons();
    status('Création d’une demande locale…');
    const doc=documentModel;
    const id=focusCycle.focus||doc.main_subject.id;
    try{
      const res=await fetch('/api/work/request',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({document:doc,action,focus_id:id,
          map_mode:focusCycle.mode,note:byId('note')?.value||''})
      });
      const response=await res.json();
      if(!res.ok)throw Error(response.error||'Enregistrement refusé.');
      if(doc!==documentModel){
        status('Le document a changé pendant la création ; demande non affichée.');
        return;
      }
      active=response;sourceDoc=doc;copiedText=instructionsFor(response);
      byId('local-ai-results').replaceChildren();
      drawRequest(response);
      status('Demande enregistrée. Copier les instructions et les envoyer à ChatGPT Work Local ; puis vérifier la réponse.');
    }catch(err){status('Erreur : '+err.message);}
    finally{busy=false;updateButtons();}
  }
  async function check(){
    if(!active||busy)return;
    busy=true;updateButtons();
    try{
      const res=await fetch('/api/work/status/'+encodeURIComponent(active.request_id),{cache:'no-store'});
      const data=await res.json();
      if(!res.ok)throw Error(data.error||'Réponse refusée.');
      if(documentModel!==sourceDoc){
        status('La carte a changé de document ; la réponse précédente n’est plus applicable.');
        return;
      }
      if(data.status==='pending') {
        status('Aucune réponse Work complète pour cette demande. Vérifier après traitement explicite dans Work.');
      }else if(data.status==='completed') {
        if(data.analysis_hash!==active.analysis_hash||data.analysis_id!==active.analysis_id)
          throw Error('Analyse ou version incompatible.');
        renderResult(data.result);
        status('Réponse Work reçue et vérifiée structurellement. Aucun changement de la carte source.');
      }
    }catch(err){status('Échec de lecture : '+err.message);}
    finally{busy=false;updateButtons();}
  }
  byId('ai-focus').addEventListener('click',()=>create('focus'));
  byId('ai-refine').addEventListener('click',()=>create('refine'));
  byId('ai-check').addEventListener('click',check);
  byId('ai-copy').addEventListener('click',async()=>{
    if(!active)return;
    try{
      await navigator.clipboard.writeText(copiedText);
      status('Instructions Work copiées. Colle-les dans un tour ChatGPT Work Local.');
    }catch{
      const pre=byId('local-ai-request').querySelector('pre');
      if(pre) {
        const range=document.createRange();range.selectNodeContents(pre);
        const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
      }
      status('Copie automatique indisponible : sélectionne le texte affiché et copie-le.');
    }
  });
  // Keep buttons synchronized with the D-97 controller without intercepting its events.
  for(const id of ['adopt-object-focus','return-object-overview','map-depth','dataset',
                   'scenario','improve-resolution','file']){
    const control=byId(id);
    if(!control)continue;
    for(const event of ['click','change'])
      control.addEventListener(event,()=>queueMicrotask(updateButtons));
  }
  setInterval(updateButtons,1500);
  ping();
})();
