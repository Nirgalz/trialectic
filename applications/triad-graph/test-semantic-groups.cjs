// Targeted structural safeguards for the experimental, source-only grouping projection.
const assert=require('node:assert/strict');
const {project,objectDescendants}=require('./semantic-groups.js');
const key=(kind,id,v='')=>kind+':'+id+'@'+v;
const source=[
 {data:{id:key('object','A'),label:'A'}},
 {data:{id:key('object','B'),label:'B'}},
 {data:{id:key('object','C'),label:'C'}},
 {data:{id:key('relation','R','1'),label:'R'}},
 {data:{id:'e1',source:key('object','A'),target:key('relation','R','1')}},
 {data:{id:'e2',source:key('relation','R','1'),target:key('object','C')}}
];
const relations=[{id:'R',version:'1',origin_object:{id:'A'},represented_object:{id:'C'},relation:{links:[]}}];
const groups=[{id:'1',label:'Ensemble AB',meaning:'A et B participent à la même question.',members:[{type:'object',id:'A'},{type:'object',id:'B'}],collapsed:true}];
const before=JSON.stringify(source),relationsBefore=JSON.stringify(relations);
const grouped=project(source,relations,groups,key);
assert(grouped.elements.some(x=>x.data.id==='semantic-set:1'));
assert(!grouped.elements.some(x=>x.data.id===key('object','A')));
assert(grouped.elements.some(x=>x.data.id===key('object','C')));
assert(!grouped.elements.some(x=>x.data.id===key('relation','R','1')));
assert(grouped.elements.some(x=>x.data.kind==='semantic-summary'));
assert(grouped.records.some(([id,x])=>x.family==='semantic-link-summary'&&x.raw.sourceReferences.includes('R@1')));
assert(!grouped.elements.some(x=>x.data.kind==='semantic-summary'&&x.data.label.includes('NEED')));
assert.equal(JSON.stringify(source),before);assert.equal(JSON.stringify(relations),relationsBefore);
groups[0].collapsed=false;
assert.equal(project(source,relations,groups,key).elements,source);
groups[0].collapsed=true;
const parent={id:'2',label:'Grand ensemble',meaning:'Plusieurs ensembles sous un même thème.',members:[{type:'set',id:'1'},{type:'object',id:'C'}],collapsed:true};
const nested=project(source,relations,[groups[0],parent],key);
assert(nested.elements.some(x=>x.data.id==='semantic-set:2'));
assert(!nested.elements.some(x=>x.data.id==='semantic-set:1'));
assert.deepEqual(objectDescendants(parent,new Map([[groups[0].id,groups[0]],[parent.id,parent]])).sort(),['A','B','C']);
console.log('RD-02 semantic-group projection: targeted structural assertions passed (not browser or empirical evidence).');
