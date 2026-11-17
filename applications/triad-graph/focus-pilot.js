/* Experimental Analyst steering state, deliberately outside Analysis. */
(function(){
 let nav=null,api=null,model=null;
 const panel=document.createElement('section');panel.id='focus-pilot';panel.hidden=true;
 panel.innerHTML=`<div class="pilot-header"><div class="eyebrow">TESTER LE PILOTAGE · CAS FICTIF</div><h2>Où porter ton attention ?</h2>
 <p>Six écoles face à la chaleur : protéger les élèves tout en préservant les agents, les riverains et le réseau.</p></div>
 <p id="pilot-active" role="status"></p>
 <div class="toolbar"><label>Choisir le prochain point d’attention<select id="pilot-candidate"></select></label><button id="pilot-adopt" class="primary">Adopter ce Focus</button></div>
 <p class="pilot-note">Explorer un nœud est une inspection. Adopter un Focus est un choix explicite ; les évaluations restent inchangées.</p>
 <div class="pilot-columns"><div><h3>Opération en cours : comparer les effets</h3><label>Cibles de l'opération (sélection multiple)<select id="pilot-targets" multiple size="5"></select></label><button id="pilot-targets-apply">Appliquer les cibles</button><p id="pilot-target-list"></p></div>
 <div class="suggestion"><div class="eyebrow">UNE PISTE À EXAMINER</div><h3>Proposition de l'IA</h3><p id="pilot-proposal"></p><div class="button-row"><button id="pilot-accept" class="primary">Accepter : élèves</button><button id="pilot-reject">Refuser</button><button id="pilot-propose">Revoir la proposition</button></div></div></div>
 <details><summary>Historique de navigation et reprise</summary><label>Contexte enregistré<select id="pilot-history"></select></label><button id="pilot-historical">Reprise historique</button><button id="pilot-current">Reprise dans le contexte actuel</button><pre id="pilot-log"></pre></details>
 <p id="pilot-global">Garde-fou global : agents, riverains, réseau, budget et délais restent pertinents même hors du Focus. Aucun scénario n'est sélectionné comme gagnant.</p>
 <details><summary>À propos de cet essai</summary><p class="muted">Couche de pilotage expérimentale et locale. Pas de moteur IA, de calcul de Puissance, de collaboration multi-analyste ni de sauvegarde durable. Une reprise historique relit une sélection, pas un ancien état du monde.</p></details>`;
 const el=id=>document.getElementById(id);
 function context(){return{scenario_id:api.scenario(),definition_versions:Object.fromEntries(model.definitions.map(d=>[d.object_id,d.version]))};}
 function record(action,detail){nav.log.push({action,detail,at:new Date().toISOString()});}
 function select(id,reason,mode='current',saved=null){
   nav.selected=id;nav.mode=mode;nav.context=saved||context();
   nav.history.push({id,mode,context:structuredClone(nav.context)});record(reason,id);
   api.navigate(id,mode==='historical'?nav.context.scenario_id:null);draw();api.summary();
 }
 function draw(){
   el('pilot-active').textContent=`Focus choisi : ${nav.selected} · ${nav.mode==='historical'?'relecture historique':'contexte actuel'} · contexte enregistré : ${nav.context.scenario_id}.`;
   el('pilot-candidate').value=nav.selected;
   el('pilot-target-list').textContent='Cibles conservées : '+nav.targets.join(', ');
   el('pilot-proposal').textContent=nav.pending?'Je propose O-eleves : vérifier les 120 élèves supposés vulnérables et l’efficacité des solutions avant de privilégier les contraintes techniques. Ce changement attend ton choix.':nav.proposalStatus;
   el('pilot-accept').disabled=el('pilot-reject').disabled=!nav.pending;
   el('pilot-history').replaceChildren(...nav.history.map((h,i)=>new Option(`${i+1} · ${h.id} · ${h.context.scenario_id} · ${h.mode}`,String(i))));
   el('pilot-history').value=String(nav.history.length-1);
   el('pilot-log').textContent=JSON.stringify(nav.log,null,2);
 }
 window.focusPilot={
  adoptScenario(id){if(!nav)return false;select(id,'analyst_scenario_graph_selection');return true;},
  install(doc,callbacks){
    model=doc;api=callbacks;nav=null;
    if(!panel.isConnected)document.querySelector('.workspace').after(panel);
    panel.hidden=doc.analysis_id!=='A-focus-six-ecoles-pilot';if(panel.hidden)return;
    const names={'S-01':'Horaires décalés','S-02':'Refroidissement actif','S-03':'Ombrage et ventilation','S-04':'Combinaison ciblée'};
    const options=[...doc.scenarios.map(s=>[s.id,`${s.id} · ${names[s.id]||s.id}`]),...doc.objects.map(o=>[o.id,`${o.id} · ${o.label}`])];
    el('pilot-candidate').replaceChildren(...options.map(([id,label])=>new Option(label,id)));
    el('pilot-targets').replaceChildren(...options.map(([id,label])=>{const o=new Option(label,id);o.selected=['S-02','O-eleves'].includes(id);return o;}));
    nav={selected:'S-02',mode:'current',context:context(),targets:['S-02','O-eleves'],pending:true,proposalStatus:'',history:[],log:[]};
    nav.history.push({id:'S-02',mode:'current',context:structuredClone(nav.context)});
    record('initial_selection','S-02');record('ai_suggestion_pending','O-eleves');draw();
  },
  summary(){return nav?`Pilotage expérimental (hors Analysis) : Focus Analyste ${nav.selected}, mode ${nav.mode}, contexte ${nav.context.scenario_id}. Cibles de comparaison : ${nav.targets.join(', ')}. Proposition élèves : ${nav.pending?'en attente':nav.proposalStatus}. Les autres Sujets restent à examiner.\nJournal : ${JSON.stringify(nav.log)}`:'';}
 };
 // Wire after the panel is first inserted; delegation also survives reloads.
 panel.addEventListener('click',event=>{
   const id=event.target.id;if(!nav)return;
   if(id==='pilot-adopt')select(el('pilot-candidate').value,'analyst_manual_selection');
   if(id==='pilot-targets-apply'){nav.targets=[...el('pilot-targets').selectedOptions].map(o=>o.value);record('operation_targets_changed',nav.targets);draw();api.summary();}
   if(id==='pilot-accept'){nav.pending=false;nav.proposalStatus='Acceptée explicitement par l’Analyste.';select('O-eleves','analyst_accepts_ai_suggestion');}
   if(id==='pilot-reject'){nav.pending=false;nav.proposalStatus='Refusée : Focus précédent conservé.';record('analyst_rejects_ai_suggestion',nav.selected);draw();api.summary();}
   if(id==='pilot-propose'){nav.pending=true;record('ai_suggestion_pending','O-eleves');draw();api.summary();}
   if(id==='pilot-historical'||id==='pilot-current'){
     const h=nav.history[Number(el('pilot-history').value)];if(!h)return;
     const mode=id==='pilot-historical'?'historical':'current';
     if(mode==='current')record('assessment_reuse_requires_review','Aucune évaluation antérieure réutilisée automatiquement ; vérifier scénario, date, versions et preuves.');
     select(h.id,mode==='historical'?'historical_navigation_revisit':'current_navigation_revisit',mode,mode==='historical'?structuredClone(h.context):null);
   }
 });
})();
