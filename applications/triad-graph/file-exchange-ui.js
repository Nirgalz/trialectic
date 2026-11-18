/* UI adapter for the transport-independent AI bridge. No polling or fetch. */
(function(){
 const $=id=>document.getElementById(id);let active=null,result=null;
 const status=message=>$('local-ai-status').textContent=message;
 const paragraph=(parent,value)=>{const p=document.createElement('p');p.textContent=value;parent.append(p);};
 function download(value,name){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 async function prepare(action){try{
  const source=TriaGraph.getAnalysis(),context=TriaGraph.getContext();
  if(!source)throw Error('Charger une analyse.');
  const request=await TriaAIBridge.prepareRequest(source,{action,...context,focusId:context.focusId||context.subjectId});
  if(TriaGraph.getContext().analysisRevision!==context.analysisRevision)throw Error('L’analyse a changé ; relancer la demande.');
  active=request;result=null;$('ai-apply').disabled=true;
  $('local-ai-request').replaceChildren();paragraph($('local-ai-request'),request.request_id+' · '+request.focus_id);
  $('local-ai-results').replaceChildren();download(request,'tria-ai-request.json');
  status('Demande exportée. La transmettre à l’IA de ton choix, puis importer sa réponse JSON.');
 }catch(e){status(e.message);}}
 $('ai-focus').onclick=()=>prepare('focus');$('ai-refine').onclick=()=>prepare('refine');
 $('ai-check').onclick=()=>$('ai-response-file').click();
 $('ai-response-file').onchange=async()=>{try{
  const file=$('ai-response-file').files[0];if(!file)return;
  if(!active)throw Error('Préparer une demande avant d’importer une réponse.');
  if(file.size>2_000_000)throw Error('Réponse trop volumineuse.');
  const response=await TriaAIBridge.parseResponse(await file.text(),active,TriaGraph.getAnalysis());
  if(response.revised_analysis)TriaMapData.parseAnalysis(response.revised_analysis);
  result=response;$('local-ai-results').replaceChildren();paragraph($('local-ai-results'),response.summary);
  for(const key of ['semantic_findings','proposals','scenario_reviews','open_questions'])for(const entry of response[key])paragraph($('local-ai-results'),typeof entry==='string'?entry:JSON.stringify(entry));
  $('ai-apply').disabled=!response.revised_analysis;
  status('Réponse liée à la demande et à la version source. Propositions à examiner ; carte inchangée.');
 }catch(e){result=null;$('ai-apply').disabled=true;status(e.message);}finally{$('ai-response-file').value='';}};
 $('ai-apply').onclick=async()=>{try{
  if(!result?.revised_analysis)return;
  const revision=TriaGraph.getContext().analysisRevision, proposal=result;
  await TriaAIBridge.parseResponse(proposal,active,TriaGraph.getAnalysis());
  if(TriaGraph.getContext().analysisRevision!==revision||result!==proposal)throw Error('L’analyse ou la proposition a changé.');
  await TriaGraph.loadAnalysis(proposal.revised_analysis);result=null;$('ai-apply').disabled=true;
  status('Analysis révisée adoptée explicitement et chargée dans la carte. Aucune validation empirique inférée.');
 }catch(e){status(e.message);}};
 $('ai-copy').onclick=async()=>{if(!active){status('Préparer une demande.');return;}try{await navigator.clipboard.writeText(JSON.stringify(active,null,2));status('Demande copiée.');}catch{download(active,'tria-ai-request.json');status('Copie indisponible ; demande téléchargée.');}};
 status('Échange par fichiers JSON, sans serveur ni envoi automatique à une IA.');
})();
