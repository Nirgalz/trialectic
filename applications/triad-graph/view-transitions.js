/* Visual interpolation only: target graph/history records stay synchronous. */
(function(root){
 function planTransition(before,after){
  const old=new Map(before.nodes.map(n=>[n.id,n])),next=new Map(after.nodes.map(n=>[n.id,n]));
  function anchor(node,tree,others,size){
   const visited=new Set([node.id]);let parentId=node.parentId;
   while(parentId&&!visited.has(parentId)){
    if(others.has(parentId))return {...others.get(parentId).position};
    visited.add(parentId);parentId=tree.get(parentId)?.parentId;
   }
   return {x:size.width/2,y:size.height/2};
  }
  const nodes=[...new Set([...old.keys(),...next.keys()])].map(id=>{
   const a=old.get(id),b=next.get(id);
   return {id,parentId:(b||a).parentId,from:a?.position||anchor(b,next,old,before),to:b?.position||{x:2*a.position.x-before.width/2,y:2*a.position.y-before.height/2},
    startStyle:a?.style||b.style,endStyle:b?.style||a.style,
    fromOpacity:a?.opacity??0,toOpacity:b?1:0,entering:!a,leaving:!b};
  });
  const oldEdges=new Map(before.edges.map(e=>[e.id,e])),newEdges=new Map(after.edges.map(e=>[e.id,e]));
  const edges=[...new Set([...oldEdges.keys(),...newEdges.keys()])].map(id=>{
   const a=oldEdges.get(id),b=newEdges.get(id),edge=b||a;
   return {...edge,startStyle:a?.style||b.style,endStyle:b?.style||a.style,fromOpacity:a?.opacity??0,toOpacity:b?1:0,entering:!a,leaving:!b};
  });
  return {nodes,edges};
 }
 // A presentation tree rooted in the current view; never changes model ancestry.
 function assignVisualParents(nodes,edges,rootId){
  const byId=new Map(nodes.map(n=>[n.id,n])),adjacent=new Map(nodes.map(n=>[n.id,[]]));
  edges.forEach(e=>{adjacent.get(e.source)?.push(e.target);adjacent.get(e.target)?.push(e.source);});
  const parents=new Map(),roots=[rootId,...nodes.map(n=>n.id)].filter(id=>byId.has(id));
  roots.forEach(root=>{
   if(parents.has(root))return;parents.set(root,null);const queue=[root];
   for(let i=0;i<queue.length;i++)for(const id of adjacent.get(queue[i]).sort()){
    if(parents.has(id))continue;parents.set(id,queue[i]);queue.push(id);
   }
  });
  return nodes.map(n=>({...n,parentId:n.id===rootId?null:(n.parentId||parents.get(n.id))}));
 }
 function createTransitions(cytoscape,container){
  let layer=null,overlay=null,frameId=null,trace=null;
  const nodeProps=['shape','shape-polygon-points','background-color','background-opacity','border-color','border-style','border-width','width','height','label','color','font-size','font-weight','font-family','text-wrap','text-max-width','text-valign','text-halign','text-margin-x','text-margin-y'];
  const edgeProps=['label','color','font-size','font-family','text-wrap','text-max-width','text-margin-x','text-margin-y','text-background-color','text-background-opacity','text-background-padding','curve-style','control-point-distances','control-point-weights','width','line-color','line-opacity','line-style','line-cap','source-arrow-shape','target-arrow-shape','source-arrow-fill','target-arrow-fill','source-arrow-color','target-arrow-color','arrow-scale'];
  const scaled=new Set(['border-width','width','height','font-size','text-max-width','text-margin-x','text-margin-y','text-background-padding','control-point-distances']);
  function snapshot(cy,identity=false){
   const zoom=cy.zoom();
   const style=(e,props)=>Object.fromEntries(props.map(p=>{let value=e.style(p);if(scaled.has(p))value=String(value).split(/\s+/).map(v=>parseFloat(v)*zoom).join(' ');return[p,value];}));
   // Cytoscape 3.30.4 may cache :visible across display:none changes.
   // Read the current display style so excluded nodes become actual departures.
   const displayed=e=>e.style('display')!=='none'&&e.style('visibility')!=='hidden'&&parseFloat(e.style('opacity'))>.001;
   let nodes=cy.nodes().filter(displayed).map(n=>({id:identity?n.data('semanticId'):n.id(),parentId:n.data('animationParent')||null,position:{...n.renderedPosition()},opacity:parseFloat(n.style('opacity')),style:style(n,nodeProps)}));
   const ids=new Set(nodes.map(n=>n.id));
   const edges=cy.edges().filter(displayed).map(e=>{
    const source=identity?e.data('actualSource'):e.source().id(),target=identity?e.data('actualTarget'):e.target().id();
    const id=identity?e.data('semanticId'):JSON.stringify([source,target,e.data('kind'),e.data('sourceLabel')||e.data('label')]);
    return {id,source,target,opacity:parseFloat(e.style('opacity')),style:style(e,edgeProps)};
   }).filter(e=>ids.has(e.source)&&ids.has(e.target)&&e.opacity>.001);
   if(!identity){const root=cy.nodes('.layout-center:visible')[0]||cy.nodes('.main-subject:visible')[0];nodes=assignVisualParents(nodes,edges,root?.id());}
   return {nodes,edges,width:cy.width(),height:cy.height()};
  }
  function finish(){
   if(trace){trace.reason=typeof reason==='string'?reason:'input';container.dataset.transitionTrace=JSON.stringify(trace);}
   if(frameId!==null)cancelAnimationFrame(frameId);frameId=null;
   if(overlay){overlay.destroy();overlay=null;}if(layer){layer.remove();layer=null;}
   container.style.opacity='';container.removeAttribute('aria-busy');
  }
  function capture(cy){return overlay?snapshot(overlay,true):snapshot(cy);}
  function play(before,after){
   finish();if(!before||!after||(!before.nodes.length&&!after.nodes.length)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   const plan=planTransition(before,after);
   if(!plan.nodes.some(n=>n.entering||n.leaving||Math.hypot(n.from.x-n.to.x,n.from.y-n.to.y)>.5))return;
   const rect=container.getBoundingClientRect(),parent=container.parentElement.getBoundingClientRect();
   layer=document.createElement('div');layer.className='graph-transition-layer';layer.dataset.leavingCount=String(plan.nodes.filter(n=>n.leaving).length);layer.setAttribute('aria-hidden','true');
   Object.assign(layer.style,{left:(rect.left-parent.left)+'px',top:(rect.top-parent.top)+'px',width:rect.width+'px',height:rect.height+'px'});
   container.parentElement.append(layer);layer.addEventListener('pointerdown',finish);layer.addEventListener('wheel',event=>{event.preventDefault();finish();},{passive:false});
   const nodeIds=new Map(plan.nodes.map((n,i)=>[n.id,'transitionNode'+i]));
   const stylesheet=[],elements=[];
   plan.nodes.forEach(n=>{
    const id=nodeIds.get(n.id);elements.push({data:{id,semanticId:n.id,animationParent:n.parentId},position:{...n.from}});
    stylesheet.push({selector:'#'+id,style:{...n.endStyle,...n.startStyle,opacity:n.fromOpacity}});
   });
   plan.edges.forEach((e,i)=>{
    const id='transitionEdge'+i;elements.push({data:{id,semanticId:e.id,source:nodeIds.get(e.source),target:nodeIds.get(e.target),actualSource:e.source,actualTarget:e.target}});
    stylesheet.push({selector:'#'+id,style:{...e.endStyle,...e.startStyle,opacity:e.fromOpacity,width:e.entering?0:e.startStyle.width}});
   });
   overlay=cytoscape({container:layer,elements,style:stylesheet,layout:{name:'preset',fit:false},zoom:1,pan:{x:0,y:0},userZoomingEnabled:false,userPanningEnabled:false,autoungrabify:true});
   container.style.opacity='0';container.setAttribute('aria-busy','true');
   // Keep shrinking nodes until the final rendering frame before removing them.
   const duration=500,disappearanceDuration=500;let started=null;
   const blend=(a,b,t)=>a+(b-a)*t;
   const geometry=(a,b,t)=>Object.fromEntries(['width','height','border-width','font-size','text-max-width','text-margin-x','text-margin-y','control-point-distances','control-point-weights'].flatMap(p=>{
    if(a[p]===undefined||b[p]===undefined)return [];
    const from=String(a[p]).split(/\s+/).map(parseFloat),to=String(b[p]).split(/\s+/).map(parseFloat);
    if(from.length!==to.length||![...from,...to].every(Number.isFinite))return [];
    return [[p,to.map((v,i)=>blend(from[i],v,t)).join(' ')]];
   }));
   function tick(now){
    if(!overlay)return;
    if(started===null)started=now;
    const disappearanceProgress=Math.min(1,(now-started)/disappearanceDuration);
    const progress=Math.min(1,(now-started)/duration),motion=progress<.5?4*progress**3:1-(-2*progress+2)**3/2;
    overlay.batch(()=>{
     plan.nodes.forEach(n=>{
      const shrinking=n.leaving?Object.fromEntries(['width','height','border-width','font-size','text-max-width','text-margin-x','text-margin-y'].filter(p=>Number.isFinite(parseFloat(n.startStyle[p]))).map(p=>[p,parseFloat(n.startStyle[p])*(1-disappearanceProgress)])):{};
      // Only nodes absent from the next view get the outward exit movement.
      // Start it immediately, on the same linear clock as their shrink.
      const nodeMotion=n.leaving?disappearanceProgress:motion;
      overlay.getElementById(nodeIds.get(n.id))
       .position({x:blend(n.from.x,n.to.x,nodeMotion),y:blend(n.from.y,n.to.y,nodeMotion)})
       .style({...geometry(n.startStyle,n.endStyle,motion),...shrinking,opacity:n.leaving?n.fromOpacity:blend(n.fromOpacity,n.toOpacity,progress)});
     });
     plan.edges.forEach((e,i)=>overlay.getElementById('transitionEdge'+i)
      .style({...geometry(e.startStyle,e.endStyle,motion),opacity:blend(e.fromOpacity,e.toOpacity,progress),width:blend(e.entering?0:parseFloat(e.startStyle.width),e.leaving?0:parseFloat(e.endStyle.width),motion)}));
    });
    layer.dataset.progress=String(progress);
    if(progress<1)frameId=requestAnimationFrame(tick);else finish();
   }
   frameId=requestAnimationFrame(tick);
  }
  return {capture,finish,play};
 }
 const api={planTransition,assignVisualParents,createTransitions};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TriaViewTransitions=api;
})(typeof window==='undefined'?globalThis:window);
