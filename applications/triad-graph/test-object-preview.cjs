const assert=require('node:assert/strict');
const {objectPreview,previewDescription,tooltipPosition}=require('../tria-map-data/object-preview.js');
const doc={main_subject:{id:'A',version:'v1'},secondary_subjects:[],environment:[],
 objects:[{id:'A',category:'system',label:'System A'},{id:'N',category:'semantic_object',label:'Need'}],
 definitions:[{object_id:'A',version:'v1',properties:{ready:{}},notes:'Earlier definition.'},{object_id:'A',version:'v2',properties:{},notes:'Current scenario definition.'}],
 relations:[{id:'R',type:'NEED',origin_object:{id:'A',version:'v2'},represented_object:{id:'N',version:'v1'}}]};
const before=JSON.stringify(doc);
const p=objectPreview(doc,'A',{id:'S',object_heads:[{id:'A',version:'v2'}]});
assert.deepEqual(p.versions,['v2']);assert.equal(p.description,'Current scenario definition.');assert.equal(p.needs,1);assert.equal(p.role,'main');
const n=objectPreview(doc,'N',null);assert.equal(n.concept,null);assert.equal(n.contextualKind,'NEED');assert.deepEqual(n.bearers,['System A']);
assert(previewDescription(p,'en').startsWith('Main Subject'));assert(previewDescription(p,'fr').startsWith('Sujet principal'));
assert.equal(objectPreview(doc,'missing',null),null);assert.equal(JSON.stringify(doc),before);
const box={width:310,height:230},screen={width:640,height:480};
for(const point of [{x:0,y:0},{x:635,y:470},{x:300,y:260}]){
 const pos=tooltipPosition(point,box,screen);
 assert(pos.left>=12&&pos.top>=12);assert(pos.left+box.width<=screen.width-12);assert(pos.top+box.height<=screen.height-12);
}
console.log('Object preview: scenario version pins, contextual identity, FR/EN descriptions, missing Objects, source immutability and viewport bounds OK.');
const {analystCard,conditionPreview}=require('../tria-map-data/object-preview.js');
const condition={id:'K',owner_relation:{id:'R',version:'v1'},target:'actionability',predicate:{object:{id:'A',version:'v1'},property:'ready',operator:'equals',value:true}};
const conditionsDoc={...doc,relations:[{id:'R',version:'v1',type:'CAN',origin_object:{id:'A'},represented_object:{id:'N'},relation:{links:[]}}],conditions:[condition],
 condition_assessments:[{scenario_id:'S',condition:{id:'K',owner_id:'R',version:'v1'},status:'unsatisfied',evidence_ids:[]},
 {scenario_id:'other',condition:{id:'K',owner_id:'R',version:'v1'},status:'satisfied'},
 {scenario_id:'S',condition:{id:'K',owner_id:'R',version:'v2'},status:'satisfied'}]};
assert.equal(conditionPreview(conditionsDoc,condition,{id:'S'}).status,'unsatisfied');
assert.equal(conditionPreview(conditionsDoc,condition,{id:'missing'}).status,'not_assessed');
const card=analystCard(conditionsDoc,{family:'condition',raw:{condition}},{id:'S'},'en');
assert(card.summary.includes('ready must equal yes'));assert(card.sections.some(s=>s.body.includes('alternative pathway')));
conditionsDoc.condition_assessments.push({scenario_id:'S',condition:{id:'K',owner_id:'R',version:'v1'},status:'satisfied'});
assert.equal(conditionPreview(conditionsDoc,condition,{id:'S'}).status,'mixed');
assert(analystCard(conditionsDoc,{family:'object',id:'A'},null,'fr').sections.some(s=>s.body.includes('Need')));
console.log('Analyst cards: actionable questions, current-scenario condition status, conflicting assessments and strict owner/version matching OK.');
const {contextualDescription}=require('../tria-map-data/object-preview.js');
const narrative=contextualDescription(conditionsDoc,{family:'object',id:'N'},{view:'scenarios',scenario:{id:'S',object_heads:[{id:'N',version:'v1'}]},centerId:'A'},'fr');
assert(narrative.includes('scénario S'));assert(narrative.includes('System A'));assert(narrative.includes('capacité potentielle'));
const globalNarrative=contextualDescription(conditionsDoc,{family:'object',id:'A'},{view:'objects',scenario:{id:'S'}},'en');
assert(globalNarrative.includes('Understand/Explore'));assert(!globalNarrative.includes('In scenario S'));
const conditionNarrative=contextualDescription(conditionsDoc,{family:'condition',raw:{condition}},{view:'scenarios',scenario:{id:'S'}},'en');
assert(conditionNarrative.includes('divergent assessments'));assert(conditionNarrative.includes('ready'));
console.log('Contextual narratives: Object meaning follows overall/local/scenario view; conditions retain contextual uncertainty.');
