/* Deterministic UI-state contract test. No empirical usability claim. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {createNavigationState}=require('./focus-navigation.js');

const source=Object.freeze({id:'Analysis-demo',focus:Object.freeze({type:'Scenario',scenario_id:'S0'})});
const s=createNavigationState();

// A: click-to-inspect remains an inspection; no persistent user Focus.
assert.equal(s.mode,'simple');
s.inspect({family:'object',id:'O-03'});
s.operation('phase Explorer');
assert.equal(s.focus,null);
assert.equal(s.select({family:'object',id:'O-03'}),false);
assert.equal(s.selectionCount,0);

// B: explicit user selection; later UI work and inspecting another entity must not overwrite it.
s.setMode('persistent');
assert.equal(s.select({family:'object',id:'O-03'}),true);
s.inspect({family:'object',id:'O-05'});
s.operation('scenario changed');
s.operation('process view');
assert.deepEqual(s.focus,{family:'object',id:'O-03',version:null});
assert.equal(s.selectionCount,1);
assert.deepEqual(source.focus,{type:'Scenario',scenario_id:'S0'});

// Distinguish Object and Scenario. Relation/Condition cannot be pinned in this experiment.
assert.equal(s.select({family:'relation',id:'R-1'}),false);
assert.equal(s.select({family:'scenario',id:'S-02'}),true);
assert.deepEqual(s.focus,{family:'scenario',id:'S-02',version:null});
assert.equal(s.select({family:'object',id:' ' }),false);

// Defensive read: outside mutation must not alter saved focus or event log.
const exposed=s.focus;exposed.id='changed';
assert.equal(s.focus.id,'S-02');
const historic=s.history;historic[0].detail='tampered';
assert.notEqual(s.history[0].detail,'tampered');

assert.equal(s.clear(),true);
assert.equal(s.clear(),false);
assert.equal(s.focus,null);
s.select({family:'object',id:'O-03',version:'v1'});
assert.equal(s.focus.version,'v1');
s.setMode('simple');
assert.equal(s.focus,null);
s.setMode('persistent');
assert.equal(s.focus,null); // no silent restoration of stale UI state
s.reset();
assert.equal(s.mode,'simple');
assert.equal(s.history.length,0);
assert.equal(s.focus,null);

// Static integration guard: controls exist and browser glue does not mutate Analysis.
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const app=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
for(const id of ['navigation-mode','pin-focus','return-focus','clear-focus','focus-status','focus-history']){
  assert(html.includes('id="'+id+'"'),'Missing HTML control: '+id);
  assert(app.includes("'"+id+"'"),'Missing JS control integration: '+id);
}
assert(html.includes('src="focus-navigation.js"'));
assert(app.includes('navigation.reset()'));
assert(app.includes('navigation.operation('));
assert(app.includes('navigation.inspect('));
assert(app.includes("navigation.mode==='persistent'"));
assert(app.includes('navigationRefLabel(navigation.focus)'));
// A read-only DOM-only intervention; no newly writable endpoint or schema changes.
assert(!app.includes('documentModel.focus ='));
console.log('Focus navigation: mode A/B, explicit pin, independent inspection, UI operations, clearing, reset and static wiring OK.');
