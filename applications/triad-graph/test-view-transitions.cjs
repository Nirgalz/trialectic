const assert=require('node:assert/strict');
const {planTransition,assignVisualParents}=require('./view-transitions.js');
const node=(id,x,y,opacity=1)=>({id,parentId:id==='a'?null:'a',position:{x,y},opacity,style:{width:30}});
const edge=(id,source,target)=>({id,source,target,opacity:1,style:{width:2}});
const before={nodes:[node('a',10,20),node('b',30,40,.4)],edges:[edge('ab','a','b')],width:100,height:100};
const after={nodes:[node('a',60,70),node('c',80,90)],edges:[edge('ac','a','c')],width:100,height:100};
const original=structuredClone({before,after});
const plan=planTransition(before,after),byId=new Map(plan.nodes.map(n=>[n.id,n]));
assert.deepEqual(byId.get('a').from,{x:10,y:20});
assert.deepEqual(byId.get('a').to,{x:60,y:70});
assert.deepEqual(byId.get('b').to,{x:10,y:30});
assert.equal(byId.get('b').fromOpacity,.4);assert.equal(byId.get('b').toOpacity,0);
assert.deepEqual(byId.get('c').from,{x:10,y:20});
assert.equal(byId.get('c').fromOpacity,0);assert.equal(byId.get('c').toOpacity,1);
assert.equal(plan.edges.find(e=>e.id==='ab').leaving,true);
assert.equal(plan.edges.find(e=>e.id==='ac').entering,true);
assert.deepEqual({before,after},original);
const empty={nodes:[],edges:[],width:100,height:100};
assert.ok(planTransition(empty,after).nodes.every(n=>n.entering&&n.fromOpacity===0));
assert.ok(planTransition(before,empty).nodes.every(n=>n.leaving&&n.toOpacity===0));
assert.deepEqual(planTransition(empty,empty),{nodes:[],edges:[]});
console.log('View transitions: geometry, fades, interruption opacity, empty views and source immutability passed.');

// Explicit parent wins over an unrelated alphabetically earlier neighbour.
const branching={nodes:[node('a',10,20),node('z',90,80)],edges:[],width:100,height:100};
const child={...node('child',40,50),parentId:'z'};
let anchored=planTransition(branching,{...branching,nodes:[...branching.nodes,child],edges:[edge('ca','child','a'),edge('cz','child','z')]});
assert.deepEqual(anchored.nodes.find(n=>n.id==='child').from,{x:90,y:80});
anchored=planTransition({...branching,nodes:[...branching.nodes,child]},branching);
assert.deepEqual(anchored.nodes.find(n=>n.id==='child').to,{x:30,y:50});
const nested={...child,id:'nested',parentId:'child'};
anchored=planTransition(branching,{...branching,nodes:[...branching.nodes,child,nested]});
assert.deepEqual(anchored.nodes.find(n=>n.id==='nested').from,{x:90,y:80});
const tree=assignVisualParents([node('a',0,0),{...node('r',1,1),parentId:null},{...node('b',2,2),parentId:null}],[edge('ar','a','r'),edge('rb','r','b')],'a');
assert.equal(tree.find(n=>n.id==='b').parentId,'r');
assert.equal(tree.find(n=>n.id==='a').parentId,null);
console.log('Parent origin, movement away from the map centre, nested ancestry and view tree passed.');

// Exercise the actual renderer controller with a delayed first browser frame.
// A wall-clock cleanup used to be able to remove the layer before its fade ran.
const {createTransitions}=require('./view-transitions.js');
let frame,scene,removed=false;
global.requestAnimationFrame=callback=>{frame=callback;return 1;};
global.cancelAnimationFrame=()=>{frame=null;};
global.matchMedia=()=>({matches:false});
const rect={left:0,top:0,width:100,height:100};
global.document={createElement:()=>({style:{},dataset:{},setAttribute(){},addEventListener(){},remove(){removed=true;}})};
const container={dataset:{},style:{},setAttribute(){},removeAttribute(){},getBoundingClientRect:()=>rect,parentElement:{getBoundingClientRect:()=>rect,append(){}}};
const fakeCy=options=>{
 const items=new Map(options.elements.map(e=>[e.data.id,{p:e.position,s:{},position(p){if(!p)return this.p;Object.assign(this.p,p);return this;},style(s){if(typeof s==='string')return this.s[s];Object.assign(this.s,s);return this;}}]));
 options.style.forEach(rule=>Object.assign(items.get(rule.selector.slice(1)).s,rule.style));
 scene={items,destroyed:false,getElementById:id=>items.get(id),batch:fn=>fn(),destroy(){this.destroyed=true;}};return scene;
};
const transitions=createTransitions(fakeCy,container);
transitions.play(before,after);
assert.equal(container.style.opacity,'0');
frame(5000); // first frame can arrive arbitrarily late
const departing=scene.items.get('transitionNode1');
assert.equal(departing.s.opacity,.4);assert.equal(departing.s.width,30);
frame(5125);
assert.equal(departing.s.opacity,.4);assert.equal(departing.s.width,22.5);
assert.deepEqual(departing.p,{x:25,y:37.5});
assert.equal(scene.items.get('transitionNode0').s.width,'30');
frame(5250);
assert.equal(departing.s.width,15);
assert.deepEqual(departing.p,{x:20,y:35});
assert.equal(scene.items.get('transitionNode2').s.opacity,.5);
assert.equal(scene.destroyed,false);
frame(5375);
assert.equal(departing.s.width,7.5);
frame(5500);
assert.equal(departing.s.opacity,.4);assert.equal(departing.s.width,0);
assert.deepEqual(departing.p,{x:10,y:30});
assert.equal(scene.items.get('transitionNode2').s.opacity,1);
assert.equal(departing.s.width,0);assert.equal(departing.s.opacity,.4);
assert.equal(scene.destroyed,true);assert.equal(removed,true);assert.equal(container.style.opacity,'');
console.log('Renderer: shrink and appearance in 500 ms, delayed paint and completion cleanup passed.');

// Regression with the bundled Cytoscape, not a simulated visibility predicate.
const cytoscape=require('./cytoscape.min.js');
const cy=cytoscape({headless:true,styleEnabled:true,elements:[{data:{id:'kept'}},{data:{id:'excluded'}},{data:{id:'link',source:'kept',target:'excluded'}}],style:[{selector:'node',style:{width:32,height:32}},{selector:'.outside-neighborhood',style:{display:'none'}}]});
const capture=createTransitions(cytoscape,container).capture;
const initial=capture(cy);
cy.batch(()=>cy.getElementById('excluded').addClass('outside-neighborhood'));
const updated=capture(cy);
assert.deepEqual(updated.nodes.map(n=>n.id),['kept']);
assert.equal(updated.edges.length,0);
const excluded=planTransition(initial,updated).nodes.find(n=>n.id==='excluded');
assert.equal(excluded.leaving,true);
assert.equal(excluded.startStyle.width,'32');
cy.destroy();
console.log('Bundled Cytoscape regression: excluded nodes are classified as departures after display:none.');

const resized=planTransition(before,{...empty,width:640,height:480});
assert.deepEqual(resized.nodes.find(n=>n.id==='b').to,{x:10,y:30});
assert.deepEqual(plan.nodes.filter(n=>n.leaving).map(n=>n.id),['b']);
assert.equal(plan.nodes.find(n=>n.id==='a').leaving,false);


// Real Cytoscape mutates the position object supplied at element creation.
// Ensure renderer origins remain fixed rather than accelerating each frame.
let actualScene;
const actualTransitions=createTransitions(options=>{
 actualScene=cytoscape({...options,container:undefined,headless:true,styleEnabled:true});return actualScene;
},container);
actualTransitions.play(before,after);
frame(10000);frame(10125);
assert.deepEqual(actualScene.getElementById('transitionNode1').position(),{x:25,y:37.5});
assert.deepEqual({before,after},original);
frame(10250);
assert.deepEqual(actualScene.getElementById('transitionNode1').position(),{x:20,y:35});
frame(10375);
assert.deepEqual(actualScene.getElementById('transitionNode1').position(),{x:15,y:32.5});
frame(10500);
assert.deepEqual({before,after},original);
console.log('Bundled renderer: immutable origins and correct outward positions at 125/250/375 ms.');
