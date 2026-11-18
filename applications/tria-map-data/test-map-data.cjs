const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const {parseAnalysis}=require('./analysis.js'),{projectAnalysis}=require('./projection.js'),examples=require('./examples.js');
for(const source of Object.values(examples)){
 const frozen=JSON.stringify(source),parsed=parseAnalysis(JSON.stringify(source)),map=projectAnalysis(parsed.document);
 assert.equal(map.schema,'tria-map-v1');assert(map.nodes.length>0);
 const nodes=new Set(map.nodes.map(n=>n.id));
 assert(map.edges.every(e=>nodes.has(e.source)&&nodes.has(e.target)));
 assert(map.nodes.every(n=>!n.data&&!n.position&&!n.style));
 assert.equal(JSON.stringify(source),frozen);
 parsed.document.objects[0].label='new label';assert.equal(JSON.stringify(source),frozen);
}
const pilot=examples['focus-pilot'],initial=JSON.stringify(pilot);
const detail=projectAnalysis(pilot,{view:'scenario',scenarioId:'S-02'});
assert.equal(detail.nodes.filter(n=>n.kind==='scenario').length,0);
const objectIds=detail.records.filter(([id,r])=>r.family==='object').map(([id,r])=>r.id);
assert.equal(objectIds.length,12);assert(objectIds.includes('C-clim'));assert(!objectIds.includes('C-horaires'));assert(objectIds.includes('O-riverains'));
assert.equal(projectAnalysis(pilot,{view:'scenarios'}).nodes.length,4);
const map=projectAnalysis(pilot);map.records[0][1].raw.label='changed copy';assert.equal(JSON.stringify(pilot),initial);
assert.throws(()=>parseAnalysis('{broken'));
assert.throws(()=>parseAnalysis({...pilot,objects:'wrong type'}));
assert.throws(()=>parseAnalysis({...pilot,unexpected:true}));
const unknown=JSON.parse(initial);unknown.relations[0].represented_object.id='missing';assert.throws(()=>parseAnalysis(unknown),/inconnu/);
const wrongProfile=JSON.parse(initial);wrongProfile.objects[0].concept_kind='BOTH';assert.throws(()=>parseAnalysis(wrongProfile),/structure/);
assert.throws(()=>parseAnalysis(' '.repeat(2_000_001)),/limite/);
// Browser globals with networking and DOM absent: no hidden server prerequisite.
const context=vm.createContext({TextEncoder});
for(const name of ['schema-validator.js','analysis.js','semantics.js','projection.js','examples.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,name),'utf8'),context,{filename:name});
assert.equal(vm.runInContext('TriaMapProjection.projectAnalysis(TriaMapData.parseAnalysis(TriaMapExamples["focus-pilot"]).document).nodes.length',context),34);
// Detect stale generated validation whenever the normative sources evolve.
const root=path.resolve(__dirname,'../..'),model=path.join(root,'schemas/model'),inputs=[];
function collect(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())collect(p);else if(p.endsWith('.json'))inputs.push(p);}}
collect(path.join(model,'types'));inputs.push(...['analysis.json','power-evaluation.json','evaluation-context.json'].map(p=>path.join(model,p)));
const hash=crypto.createHash('sha256');for(const p of inputs.sort())hash.update(path.relative(root,p).replaceAll('\\','/')).update(fs.readFileSync(p,'utf8').replace(/\r\n/g,'\n'));
assert.equal(hash.digest('hex'),require('./schema-manifest.json').sha256,'Rebuild the offline validator after schema changes.');
console.log('Map data: offline schema checks, isolated neutral projection, source immutability and generated-source freshness OK.');
