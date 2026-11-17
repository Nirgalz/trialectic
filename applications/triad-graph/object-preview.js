/* A read-only preview assembled from existing Object and Definition records. */
(function(root){
 function objectPreview(doc,id,scenario){
  const object=doc.objects.find(o=>o.id===id);if(!object)return null;
  const pin=scenario?.object_heads?.find(h=>h.id===id)||[doc.main_subject,...(doc.secondary_subjects||[]),...(doc.environment||[])].find(h=>h?.id===id);
  const definitions=doc.definitions.filter(d=>d.object_id===id&&(!pin||d.version===pin.version));
  const represented=doc.relations.filter(r=>r.represented_object.id===id);
  const attributed=doc.relations.filter(r=>r.origin_object.id===id);
  const kinds=[...new Set(represented.map(r=>r.type))];
  return {id:object.id,label:object.label||object.id,category:object.category,
   concept:object.concept_kind||null,contextualKind:kinds.length===1?kinds[0]:null,
   role:doc.main_subject.id===id?'main':(doc.secondary_subjects||[]).some(s=>s.id===id)?'secondary':(doc.environment||[]).some(s=>s.id===id)?'environment':'other',
   versions:definitions.map(d=>d.version),description:definitions.length===1?definitions[0].notes||'':'',
   properties:[...new Set(definitions.flatMap(d=>Object.keys(d.properties)))],
   needs:attributed.filter(r=>r.type==='NEED').length,cans:attributed.filter(r=>r.type==='CAN').length,
   bearers:[...new Set(represented.map(r=>r.origin_object.id))].map(oid=>doc.objects.find(o=>o.id===oid)?.label||oid),
   scenario:scenario?.id||null};
 }
 function previewDescription(p,lang='fr'){
  if(lang==='en'){
   if(p.concept||p.contextualKind)return `${p.concept||p.contextualKind} represented in the model${p.bearers.length?' and attributed to '+p.bearers.join(', '):''}. This does not establish its actual satisfaction or implementation.`;
   return `${p.role==='main'?'Main Subject of this analysis':p.role==='secondary'?'Secondary Subject affected by the analysis':p.role==='environment'?'Object in the analytical environment':'Object included in the working model'}. ${p.needs} NEED and ${p.cans} CAN attribution record(s) available for inspection.`;
  }
  if(p.concept||p.contextualKind)return `${p.concept||p.contextualKind} représenté dans le modèle${p.bearers.length?' et attribué à '+p.bearers.join(', '):''}. Cela n’établit pas sa satisfaction ou sa réalisation effective.`;
  return `${p.role==='main'?'Sujet principal de cette analyse':p.role==='secondary'?'Sujet secondaire concerné par l’analyse':p.role==='environment'?'Objet de l’environnement analytique':'Objet inclus dans le modèle de travail'}. ${p.needs} enregistrement(s) d’attribution NEED et ${p.cans} CAN à inspecter.`;
 }
 function tooltipPosition(point,size,viewport){
  return {left:Math.max(12,Math.min(point.x+18+size.width>viewport.width-12?point.x-size.width-18:point.x+18,viewport.width-size.width-12)),
   top:Math.max(12,Math.min(point.y+16+size.height>viewport.height-12?point.y-size.height-16:point.y+16,viewport.height-size.height-12))};
 }
 function assessmentState(items){
  const states=[...new Set(items.map(a=>a.status))];
  return states.length===0?'not_assessed':states.length>1?'mixed':states[0];
 }
 function conditionPreview(doc,condition,scenario){
  if(!condition)return null;
  const owner=doc.relations.find(r=>r.id===condition.owner_relation.id&&r.version===condition.owner_relation.version);
  const assessments=(doc.condition_assessments||[]).filter(a=>a.scenario_id===scenario?.id&&a.condition.id===condition.id&&a.condition.owner_id===condition.owner_relation.id&&a.condition.version===condition.owner_relation.version);
  return {condition,owner,assessments,status:assessmentState(assessments)};
 }
 function analystCard(doc,record,scenario,lang='fr'){
  const en=lang==='en',label=id=>doc.objects.find(o=>o.id===id)?.label||id;
  const clip=(values,max=3)=>values.length>max?values.slice(0,max).join(' · ')+` (+${values.length-max})`:values.join(' · ');
  const statusNames=en?{satisfied:'satisfied',unsatisfied:'unsatisfied',indeterminate:'unknown',not_assessed:'not assessed',mixed:'divergent assessments'}:{satisfied:'satisfaite',unsatisfied:'non satisfaite',indeterminate:'inconnue',not_assessed:'non évaluée',mixed:'évaluations divergentes'};
  const statusText=s=>(s==='satisfied'?'✓ ':s==='unsatisfied'?'× ':'? ')+(statusNames[s]||s);
  if(record.family==='condition'){
   const p=conditionPreview(doc,record.raw.condition||record.raw,scenario);if(!p)return null;
   const c=p.condition,predicate=c.predicate;
   const operators=en?{equals:'must equal',not_equals:'must differ from',exists:'must exist',greater_than:'must be greater than',greater_or_equal:'must be at least',less_than:'must be less than',less_or_equal:'must be at most'}:{equals:'doit être égal à',not_equals:'doit être différent de',exists:'doit exister',greater_than:'doit dépasser',greater_or_equal:'doit être au moins',less_than:'doit être inférieur à',less_or_equal:'doit être au plus'};
   const value=predicate.value===true?(en?'yes':'oui'):predicate.value===false?(en?'no':'non'):JSON.stringify(predicate.value??null);
   const sections=[{heading:en?'Assessment in this scenario':'Évaluation dans ce scénario',body:statusText(p.status),tone:p.status==='satisfied'?'positive':p.status==='unsatisfied'?'negative':'unknown'}];
   if(p.owner)sections.push({heading:en?'Concerns':'Concerne',body:`${label(p.owner.represented_object.id)} · ${label(p.owner.origin_object.id)}`});
   const purposes=en?{actionability:'Condition examined for the contemplated implementation.',need_satisfaction:'Condition examined for NEED satisfaction.',relation_applicability:'Condition examined for relationship applicability.'}:{actionability:'Condition examinée pour l’actualisation envisagée.',need_satisfaction:'Condition examinée pour la satisfaction du NEED.',relation_applicability:'Condition examinée pour l’applicabilité de la relation.'};
   const questions=en?{satisfied:'Check whether the assessment is still current and examine the other conditions.',unsatisfied:'Examine what is missing and whether an alternative pathway exists.',mixed:'Clarify the dates and contexts behind these divergent assessments.',not_assessed:'Obtain a contextual assessment; absence of assessment does not mean failure.',indeterminate:'Identify the missing observation or evidence needed to decide.'}:{satisfied:'Vérifier si l’évaluation est toujours actuelle et examiner les autres conditions.',unsatisfied:'Examiner ce qui manque et l’existence éventuelle d’une voie alternative.',mixed:'Clarifier les dates et les contextes de ces évaluations divergentes.',not_assessed:'Obtenir une évaluation contextualisée ; son absence ne signifie pas un échec.',indeterminate:'Identifier l’observation ou la preuve manquante pour trancher.'};
   sections.push({heading:en?'What to check':'À vérifier',body:questions[p.status]||questions.indeterminate});
   const sources=[...new Set(p.assessments.flatMap(a=>a.evidence_ids||[]))];
   sections.push({heading:en?'Basis':'Appui',body:sources.length?clip(sources.map(id=>(doc.evidence_items||[]).find(e=>e.id===id)?.source||id)):en?'No source linked to this assessment.':'Aucune source reliée à cette évaluation.'});
   const dates=[...new Set(p.assessments.map(a=>a.at).filter(Boolean))].map(at=>Number.isFinite(Date.parse(at))?new Intl.DateTimeFormat(en?'en-GB':'fr-FR',{dateStyle:'short',timeStyle:'short',timeZone:'Europe/Paris'}).format(new Date(at)):at);
   return {title:predicate.property.replaceAll('_',' '),kicker:en?'Condition to examine':'Condition à examiner',summary:`${label(predicate.object.id)} : ${predicate.property.replaceAll('_',' ')} ${operators[predicate.operator]||predicate.operator}${predicate.operator==='exists'?'':' '+value}. ${purposes[c.target]||''}`,sections,footer:`${c.id} · ${scenario?.id||(en?'no scenario':'sans scénario')}${dates.length?' · '+clip(dates,2):''}`};
  }
  if(record.family!=='object')return null;
  const p=objectPreview(doc,record.id,scenario);if(!p)return null;
  const owned=doc.relations.filter(r=>r.origin_object.id===p.id),represented=doc.relations.filter(r=>r.represented_object.id===p.id);
  const ownerIds=new Set([...owned,...represented].map(r=>r.id+'@'+r.version));
  const sections=[];
  const needs=owned.filter(r=>r.type==='NEED').map(r=>label(r.represented_object.id));
  const cans=owned.filter(r=>r.type==='CAN').map(r=>label(r.represented_object.id));
  if(needs.length)sections.push({heading:en?'Needs to consider':'Besoins à considérer',body:clip(needs)});
  if(cans.length)sections.push({heading:en?'CANs attributed in the model':'CANs attribués dans le modèle',body:clip(cans)});
  const roleNames=en?{contributive:'contributes',enabling:'enables',inhibitory:'inhibits'}:{contributive:'contribue',enabling:'permet',inhibitory:'inhibe'};
  const links=represented.flatMap(r=>r.relation.links.map(l=>`${(l.roles||[]).map(role=>roleNames[role]||role).join(', ')||'—'} : ${label(l.object_id)}`));
  if(links.length)sections.push({heading:en?'Relationships to inspect':'Relations à examiner',body:clip(links)});
  const qualifications=[...new Set(represented.map(r=>r.attribution?.status||'unspecified'))];
  if(qualifications.some(q=>q!=='established_in_model'))sections.push({heading:en?'Attribution qualification':'Qualification de l’attribution',body:qualifications.map(q=>({unspecified:en?'Unqualified attribution':'Attribution non qualifiée',indeterminate:en?'Indeterminate':'Indéterminée',refuted_in_context:en?'Refuted in context':'Réfutée dans le contexte',established_in_model:en?'Established in the model':'Établie dans le modèle'}[q]||q)).join(' · '),tone:'unknown'});
  const assessments=(doc.power_assessments||[]).filter(a=>a.Context.scenario_id===scenario?.id&&a.Focus.object_id===p.id&&(!a.Context.definition_versions?.[p.id]||p.versions.includes(a.Context.definition_versions[p.id])));
  const findings=assessments.map(a=>{const result=a.Results.effective_satisfaction||a.Results.actualizability;return result?`${a.ID} : ${result.status} — ${result.justification}`:null;}).filter(Boolean);
  if(findings.length)sections.push({heading:en?'Recorded findings':'Constats enregistrés',body:clip(findings,2)});
  const attention={unsatisfied:0,mixed:1,indeterminate:2,not_assessed:2,satisfied:3};
  const conditions=(doc.conditions||[]).filter(c=>ownerIds.has(c.owner_relation.id+'@'+c.owner_relation.version)).map(c=>({c,p:conditionPreview(doc,c,scenario)})).sort((a,b)=>(attention[a.p.status]??2)-(attention[b.p.status]??2));
  if(conditions.length)sections.push({heading:en?'Conditions and uncertainties':'Conditions et incertitudes',body:clip(conditions.map(({c,p})=>`${c.predicate.property.replaceAll('_',' ')} : ${statusText(p.status)}`)),tone:conditions.some(x=>x.p.status==='unsatisfied')?'negative':conditions.some(x=>x.p.status!=='satisfied')?'unknown':'positive'});
  if(!findings.length&&(p.concept||p.contextualKind))sections.push({heading:en?'What to check':'À vérifier',body:(p.concept||p.contextualKind)==='NEED'?(en?'Satisfaction has not been evaluated in this scenario.':'La satisfaction n’est pas évaluée dans ce scénario.'):(en?'Actualizability has not been evaluated in this scenario.':'L’actualisabilité n’est pas évaluée dans ce scénario.'),tone:'unknown'});
  if(!sections.length)sections.push({heading:en?'What to investigate':'À examiner',body:en?'Clarify this Object’s role and relevant relationships; the model does not document them yet.':'Préciser le rôle de cet Objet et ses relations pertinentes, encore non documentées dans le modèle.'});
  return {title:p.label,kicker:en?'Analytical overview':'Repères pour l’analyse',summary:p.bearers.length?(en?'Attributed in the model to: ':'Attribué dans le modèle à : ')+p.bearers.join(', '):p.role==='main'?(en?'Main Subject: examine its needs, possible means and constraints.':'Sujet principal : examiner ses besoins, ses moyens possibles et ses contraintes.'):p.role==='secondary'?(en?'Affected Subject: examine the consequences for it.':'Sujet concerné : examiner les conséquences pour lui.'):(en?'Examine its contribution and dependencies in this context.':'Examiner sa contribution et ses dépendances dans ce contexte.'),sections,footer:`${p.id}${scenario?' · '+scenario.id:''}`};
 }
 function contextualDescription(doc,record,context={},lang='fr'){
  const en=lang==='en',scenario=context.view==='scenarios'?context.scenario:null;
  const name=id=>{const value=doc.objects.find(o=>o.id===id)?.label||id;return value.length>100?value.slice(0,97)+'…':value;};
  const quote=value=>en?'“'+value+'”':'« '+value+' »';
  const where=scenario?(en?` In scenario ${scenario.id}, `:` Dans le scénario ${scenario.id}, `):(en?' In the Understand/Explore view, ':' Dans la vue Comprendre/Explorer, ');
  if(record.family==='condition'){
   const c=record.raw.condition||record.raw,p=conditionPreview(doc,c,context.scenario),card=analystCard(doc,record,context.scenario,lang);
   if(!p||!card)return '';
   const state=en?{satisfied:'is assessed as satisfied',unsatisfied:'is assessed as unsatisfied',indeterminate:'remains indeterminate',not_assessed:'has not been assessed',mixed:'has divergent assessments'}:{satisfied:'est évaluée comme satisfaite',unsatisfied:'est évaluée comme non satisfaite',indeterminate:'reste indéterminée',not_assessed:'n’a pas été évaluée',mixed:'fait l’objet d’évaluations divergentes'};
   const relation=p.owner?(en?` It concerns ${quote(name(p.owner.represented_object.id))}.`:` Elle concerne ${quote(name(p.owner.represented_object.id))}.`):'';
   const check=card.sections.find(s=>s.heading===(en?'What to check':'À vérifier'))?.body||'';
   return `${card.summary}${relation} ${en?'This condition':'Cette condition'} ${state[p.status]||state.indeterminate}${context.scenario?(en?' in ':' dans ')+context.scenario.id:en?' without a selected scenario':' sans scénario sélectionné'}. ${check}`;
  }
  if(record.family!=='object')return '';
  const p=objectPreview(doc,record.id,scenario);if(!p)return '';
  const represented=doc.relations.filter(r=>r.represented_object.id===p.id);
  const owned=doc.relations.filter(r=>r.origin_object.id===p.id);
  const kind=p.concept||p.contextualKind;
  let intro;
  if(kind){
   intro=en?`${quote(name(p.id))} represents ${kind==='NEED'?'a need to consider':'a potential capability'} in the model.`:`${quote(name(p.id))} représente ${kind==='NEED'?'un besoin à considérer':'une capacité potentielle'} dans le modèle.`;
   if(p.bearers.length)intro+=en?` It is attributed to ${p.bearers.slice(0,2).map(quote).join(' and ')}.`:` Il est attribué à ${p.bearers.slice(0,2).map(quote).join(' et ')}.`;
  }else{
   const role=en?{main:'the main Subject of the analysis',secondary:'a secondary Subject whose situation matters to the analysis',environment:'an Object of the analytical environment',other:'an Object included in the working model'}:{main:'le Sujet principal de l’analyse',secondary:'un Sujet secondaire dont la situation compte pour l’analyse',environment:'un Objet de l’environnement analytique',other:'un Objet inclus dans le modèle de travail'};
   intro=en?`${quote(name(p.id))} is ${role[p.role]}.`:`${quote(name(p.id))} est ${role[p.role]}.`;
  }
  let significance;
  if(context.centerId&&context.centerId!==p.id){
   const connected=doc.relations.some(r=>{const members=[r.origin_object.id,r.represented_object.id,...r.relation.links.map(l=>l.object_id)];return members.includes(context.centerId)&&members.includes(p.id);});
   significance=connected?(en?`it helps examine the relationships involving ${quote(name(context.centerId))}.`:`il permet d’examiner les relations impliquant ${quote(name(context.centerId))}.`):(en?'it provides context for the Object being explored.':'il apporte du contexte à l’Objet exploré.');
  }else significance=scenario?(en?'it belongs to the explicitly defined scope of this possibility.':'il appartient au périmètre explicitement retenu pour cette possibilité.'):(en?'its documented relationships help identify needs, possible means and dependencies.':'ses relations documentées permettent d’examiner les besoins, les moyens possibles et les dépendances.');
  const related=kind?represented.flatMap(r=>r.relation.links.map(l=>l.object_id)):owned.map(r=>r.represented_object.id);
  const unique=[...new Set(related)].filter(id=>id!==p.id).slice(0,2);
  const links=unique.length?(en?' Relevant connections include ':' Les liens à examiner comprennent notamment ')+unique.map(id=>quote(name(id))).join(en?' and ':' et ')+'.':'';
  let qualification='';
  if(kind&&represented.some(r=>r.attribution?.status==='refuted_in_context'))qualification=en?' At least one attribution is refuted in its recorded context.':' Au moins une attribution est réfutée dans son contexte enregistré.';
  else if(kind&&represented.some(r=>!r.attribution||r.attribution.status!=='established_in_model'))qualification=en?' This attribution still needs qualification or verification.':' Cette attribution reste à qualifier ou à vérifier.';
  return intro+where+significance+links+qualification;
 }
 const api={objectPreview,previewDescription,tooltipPosition,conditionPreview,assessmentState,analystCard,contextualDescription};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TriaObjectPreview=api;
})(typeof window==='undefined'?globalThis:window);
