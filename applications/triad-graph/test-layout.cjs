const assert=require('node:assert/strict');
const {hierarchyPositions,separatedEdgeRoutes}=require('./hierarchy-layout.js');
const nodes=[{id:'subject',kind:'object'},{id:'can',kind:'CAN'},{id:'need',kind:'NEED'},
  {id:'r-can',kind:'relation'},{id:'r-need',kind:'relation'},
  {id:'context',kind:'object'},{id:'scenario',kind:'scenario'}];
const relations=[{id:'r-can',origin:'subject',target:'can',type:'CAN'},
  {id:'r-need',origin:'subject',target:'need',type:'NEED'}];
const edges=relations.flatMap(r=>[{source:r.origin,target:r.id},{source:r.id,target:r.target}]);
// A cycle cannot move the primary Subject out of the center.
relations.push({id:'cycle',origin:'can',target:'subject',type:'NEED'});
const positions=hierarchyPositions(nodes,edges,relations,'subject');
assert.deepEqual(positions.get('subject'),{x:0,y:0});
assert(positions.get('can').y<positions.get('r-can').y);
assert(positions.get('r-can').y<positions.get('subject').y);
assert(positions.get('need').y>positions.get('r-need').y);
assert(positions.get('r-need').y>positions.get('subject').y);
for(const p of positions.values())assert(Number.isFinite(p.x)&&Number.isFinite(p.y));
for(const [id,p]of positions)for(const [other,q]of positions)if(id!==other&&p.y===q.y)assert(Math.abs(p.x-q.x)>=200);
assert.deepEqual(hierarchyPositions(nodes,edges,relations,'subject'),positions);
// An inspected subset may omit the global Subject or relation record.
assert.equal(hierarchyPositions([{id:'can',kind:'CAN'}],[],relations,'can').get('can').y,0);
console.log('Hierarchy: center, CAN/NEED ranks, spacing, cycles and determinism OK.');
// Historical 2.0 Objects may lack concept_kind and belong to secondary Subjects.
// Every displayed NEED still goes below the trunk in the overview.
const treeNodes=[...nodes,{id:'secondary',kind:'object'},{id:'legacy-need',kind:'object'},
  {id:'nested-need',kind:'NEED'},{id:'r-legacy',kind:'relation'},{id:'r-nested',kind:'relation'}];
const treeRelations=[...relations,{id:'r-legacy',origin:'secondary',target:'legacy-need',type:'NEED'},
  {id:'r-nested',origin:'can',target:'nested-need',type:'NEED'}];
const tree=hierarchyPositions(treeNodes,edges,treeRelations,'subject',{tree:true});
assert.equal(tree.get('subject').y,0);
for(const id of ['need','legacy-need','nested-need','r-legacy','r-nested'])assert(tree.get(id).y>0,id);
assert(tree.get('can').y<0);
console.log('Overview tree: secondary and nested NEEDs remain below the trunk.');
const routingPositions=new Map([['a',{x:0,y:0}],['b',{x:300,y:0}],['c',{x:300,y:12}]]);
const parallel=[{id:'e1',source:'a',target:'b'},{id:'e2',source:'a',target:'b'},{id:'e3',source:'b',target:'a'}];
const routes=separatedEdgeRoutes(routingPositions,parallel);
const midpoints=parallel.map(e=>routes.get(e.id).distance*(e.source==='a'?1:-1)/2);
for(let i=0;i<midpoints.length;i++)for(let j=i+1;j<midpoints.length;j++)assert(Math.abs(midpoints[i]-midpoints[j])>=20);
const fan=separatedEdgeRoutes(routingPositions,[{id:'f1',source:'a',target:'b'},{id:'f2',source:'a',target:'c'}]);
assert.notEqual(fan.get('f1').distance,fan.get('f2').distance);
assert.deepEqual(separatedEdgeRoutes(routingPositions,parallel),routes);
assert.equal(separatedEdgeRoutes(routingPositions,[{id:'missing',source:'a',target:'absent'}]).size,0);
console.log('Routing: separated parallel/reverse links, junction fan-out and determinism OK.');
const {conditionSymbol,linkAppearance}=require('../tria-map-data/semantics.js');
assert.equal(conditionSymbol([{status:'satisfied'}]),'✓');
assert.equal(conditionSymbol([{status:'unsatisfied'}]),'×');
assert.equal(conditionSymbol([]),'?');
assert.equal(conditionSymbol([{status:'satisfied'},{status:'unsatisfied'}]),'?');
assert.equal(linkAppearance({roles:['enabling']},'CAN').arrowEnd,'source');
assert.equal(linkAppearance({roles:['contributive']},'NEED').arrowEnd,'source');
assert.equal(linkAppearance({roles:['contributive']},'CAN').arrowEnd,'target');
assert.equal(linkAppearance({roles:['enabling','inhibitory']},'CAN').functionName,'qualified');
assert.equal(linkAppearance({},'CAN').functionName,'qualified');
console.log('Symbols: absent/conflicting assessments stay unknown; mixed roles keep qualifications.');
const {scenarioAssociatedObjects}=require('../tria-map-data/semantics.js');
const associated=scenarioAssociatedObjects({effects:[{scenario_id:'S-a',target_object:{id:'affected'}},{scenario_id:'S-b',target_object:{id:'other'}}]},
 {id:'S-a',object_heads:[{id:'a',version:'v1'}],states:[{object:{id:'b',version:'v1'}}]});
assert.deepEqual([...associated].sort(),['a','affected','b']);
assert(!associated.has('other'));
assert.equal(scenarioAssociatedObjects({}, {id:'empty'}).size,0);
console.log('Scenario scope: heads, states and effects without cross-branch leakage OK.');
