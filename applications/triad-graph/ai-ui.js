/* Opt-in, same-origin API bridge UI. No API keys are ever read by browser code. */
(function () {
  const byId = id => document.getElementById(id);
  let configured = false, busy = false;
  let currentResultAnalysis = null;
  function node(parent, tag, label, cls) {
    const el = document.createElement(tag);
    el.textContent = label;
    if (cls) el.className = cls;
    parent.append(el);
    return el;
  }
  function currentFocus() {
    return focusCycle?.focus || null;
  }
  function updateButtons() {
    const hasAnalysis = Boolean(documentModel && focusCycle);
    byId('ai-focus').disabled = !configured || busy || !hasAnalysis || !currentFocus();
    byId('ai-refine').disabled = !configured || busy || !hasAnalysis;
  }
  function status(text) { byId('local-ai-status').textContent = text; }
  async function refreshStatus() {
    try {
      const response = await fetch('/api/ai/status', {cache:'no-store'});
      const data = await response.json();
      configured = Boolean(response.ok && data.configured);
      status(configured
        ? 'API locale configurée : ' + data.model + '. Une action volontaire lancera un appel facturable.'
        : 'Clé API absente. Lancer run-local.ps1 depuis une copie locale de dev, sans saisir de clé dans cette page.');
    } catch {
      configured = false;
      status('Serveur API local indisponible. Démarrer le serveur depuis votre ordinateur.');
    }
    updateButtons();
  }
  async function analyze(action) {
    if (!configured || busy || !documentModel) return;
    const snapshotId = documentModel.analysis_id;
    const focusId = focusCycle?.focus || documentModel.main_subject.id;
    if (action === 'focus' && !focusCycle?.focus) return;
    busy = true;
    updateButtons();
    status('Analyse en cours… La carte source reste inchangée.');
    const panel = byId('local-ai-results');
    panel.replaceChildren();
    try {
      const response = await fetch('/api/ai/analyze', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          document:documentModel, action, focus_id:focusId,
          map_mode:focusCycle.mode, note:byId('note')?.value||''
        })
      });
      const answer = await response.json();
      if (!response.ok) throw new Error(answer.error || 'Appel API impossible.');
      // Never render a result of another imported/selected Analysis as current.
      if (!documentModel || documentModel.analysis_id !== snapshotId ||
          (action==='focus' && focusCycle?.focus !== focusId)) {
        status('Réponse reçue après un changement de contexte : résultat écarté.');
        return;
      }
      const result = answer.result;
      currentResultAnalysis = snapshotId;
      node(panel,'h3','Réponse de l’IA · suggestions non intégrées');
      node(panel,'p',result.summary||'Aucune synthèse disponible.','ai-answer');
      const sections = [
        ['Clarifications sémantiques',result.semantic_findings],
        ['Propositions à examiner',result.proposals],
        ['Scénarios à réexaminer',result.scenario_reviews],
        ['Questions ouvertes',result.open_questions]
      ];
      for (const [heading,items] of sections) {
        if (!Array.isArray(items) || !items.length) continue;
        node(panel,'h3',heading);
        const list=document.createElement('ul');
        for(const item of items.slice(0,30)) {
          const label=typeof item==='string'?item:JSON.stringify(item);
          node(list,'li',label);
        }
        panel.append(list);
      }
      if (result.parse_warning) node(panel,'p',result.parse_warning,'muted');
      if (result.usage) node(panel,'p','Tokens API (entrée/sortie) : '+
          [result.usage.input_tokens ?? '?',result.usage.output_tokens ?? '?'].join(' / '),'muted');
      status('Réponse API reçue. Vérifier les hypothèses avant tout changement de carte.');
    } catch(error) {
      status('Échec : ' + error.message);
    } finally {
      busy=false;updateButtons();
    }
  }
  byId('ai-focus').addEventListener('click',()=>analyze('focus'));
  byId('ai-refine').addEventListener('click',()=>analyze('refine'));
  // The host interface owns these state transitions; observe without modifying them.
  for(const id of ['adopt-object-focus','return-object-overview','map-depth','dataset','scenario','improve-resolution','file']) {
    const control=byId(id);
    if(control)for(const event of ['click','change'])
      control.addEventListener(event,()=>queueMicrotask(()=>{
        if(!documentModel || currentResultAnalysis!==documentModel.analysis_id) {
          byId('local-ai-results').replaceChildren();
          currentResultAnalysis=documentModel?.analysis_id||null;
        }
        updateButtons();
      }));
  }
  refreshStatus();
})();
