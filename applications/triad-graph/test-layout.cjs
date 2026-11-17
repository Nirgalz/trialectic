const assert=require('node:assert/strict');
const {hierarchyPositions}=require('./hierarchy-layout.js');
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
