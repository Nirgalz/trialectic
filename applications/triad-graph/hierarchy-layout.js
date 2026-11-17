/* Presentation constraints only: attribution remains in the source records. */
(function(root){
  function hierarchyPositions(nodes, edges, relations, rootId) {
    const byId=new Map(nodes.map(n=>[n.id,n]));
    const rank=new Map(), neighbors=new Map(nodes.map(n=>[n.id,[]]));
    edges.forEach(e=>{neighbors.get(e.source)?.push(e.target);neighbors.get(e.target)?.push(e.source);});
    if(byId.has(rootId))rank.set(rootId,0);
    // Each bearer has its own local NEED/CAN hierarchy. Never infer identity
    // from labels or inventory membership; only explicit relation endpoints.
    const queue=byId.has(rootId)?[rootId]:[];
    while(queue.length){
      const bearer=queue.shift();
      relations.filter(r=>r.origin===bearer).forEach(r=>{
        if(!byId.has(r.target)||r.target===rootId||rank.has(r.target))return;
        rank.set(r.target,rank.get(bearer)+(r.type==='CAN'?-2:2));queue.push(r.target);
      });
    }
    nodes.filter(n=>n.kind==='object'||n.kind==='CAN'||n.kind==='NEED').forEach(n=>{
      if(!rank.has(n.id))rank.set(n.id,n.kind==='CAN'?-2:n.kind==='NEED'?2:0);
    });
    relations.forEach(r=>{
      if(byId.has(r.id))rank.set(r.id,((rank.get(r.origin)||0)+(rank.get(r.target)??(r.type==='CAN'?-2:2)))/2);
    });
    nodes.forEach(n=>{
      if(!rank.has(n.id)){
        const owner=(neighbors.get(n.id)||[]).find(id=>byId.get(id)?.kind==='relation');
        rank.set(n.id,owner?(rank.get(owner)||0)+(rank.get(owner)<0?-.55:.55):0);
      }
    });
    const rows=new Map();nodes.filter(n=>n.kind!=='scenario').forEach(n=>{const r=rank.get(n.id);if(!rows.has(r))rows.set(r,[]);rows.get(r).push(n.id);});
    const levels=[...rows.keys()].sort((a,b)=>a-b),positions=new Map();
    function place(){rows.forEach(ids=>{const middle=ids.includes(rootId)?ids.indexOf(rootId):(ids.length-1)/2;ids.forEach((id,i)=>positions.set(id,{x:(i-middle)*205,y:rank.get(id)*125}));});}
    // Barycenter sweeps reduce crossings while keeping every vertical rank fixed.
    place();
    for(let sweep=0;sweep<8;sweep++){
      const order=sweep%2?[...levels].reverse():levels;
      order.forEach(level=>{
        const ids=rows.get(level),score=id=>{
          const linked=(neighbors.get(id)||[]).filter(other=>positions.has(other)&&rank.get(other)!==level);
          return linked.length?linked.reduce((sum,other)=>sum+positions.get(other).x,0)/linked.length:positions.get(id).x;
        };
        const scores=new Map(ids.map(id=>[id,score(id)]));
        ids.sort((a,b)=>scores.get(a)-scores.get(b)||a.localeCompare(b));
        // Keep context objects balanced on either side of the central Subject.
        const index=ids.indexOf(rootId);
        if(index>=0){ids.splice(index,1);ids.splice(Math.floor(ids.length/2),0,rootId);}
        place();
      });
    }
    // Metadata is placed outside the Object hierarchy rather than implying
    // that scenario membership is a NEED/CAN relationship.
    let metadataIndex=0;
    const right=Math.max(0,...[...positions.values()].map(p=>p.x))+240;
    nodes.filter(n=>n.kind==='scenario').forEach(n=>positions.set(n.id,{x:right,y:metadataIndex++*150}));
    return positions;
  }
  if(typeof module!=='undefined'&&module.exports)module.exports={hierarchyPositions};
  else root.hierarchyPositions=hierarchyPositions;
})(typeof window==='undefined'?globalThis:window);
