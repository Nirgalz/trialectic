/* Presentation constraints only: attribution remains in the source records. */
(function(root){
  function hierarchyPositions(nodes, edges, relations, rootId, {tree=false}={}) {
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
    if(tree){
      // In the overview, roots and branches occupy distinct hemispheres,
      // including historical Objects whose kind exists only on a relation.
      // This is presentation, not a new conceptual identity annotation.
      const roles=new Map();relations.forEach(r=>{if(!roles.has(r.target))roles.set(r.target,r.type);});
      nodes.forEach(n=>{
        if(n.id===rootId)return;
        const kind=['NEED','CAN'].includes(n.kind)?n.kind:roles.get(n.id);
        if(kind)rank.set(n.id,(kind==='NEED'?1:-1)*Math.max(2,Math.abs(rank.get(n.id)||0)));
      });
    }
    relations.forEach(r=>{
      if(byId.has(r.id))rank.set(r.id,tree?
        (r.type==='NEED'?1:-1)*Math.max(1,Math.abs(rank.get(r.target)||2)-1):
        ((rank.get(r.origin)||0)+(rank.get(r.target)??(r.type==='CAN'?-2:2)))/2);
    });
    nodes.forEach(n=>{
      if(!rank.has(n.id)){
        const owner=(neighbors.get(n.id)||[]).find(id=>byId.get(id)?.kind==='relation');
        rank.set(n.id,owner?(rank.get(owner)||0)+(rank.get(owner)<0?-.55:.55):0);
      }
    });
    const rows=new Map();nodes.filter(n=>n.kind!=='scenario').forEach(n=>{const r=rank.get(n.id);if(!rows.has(r))rows.set(r,[]);rows.get(r).push(n.id);});
    const levels=[...rows.keys()].sort((a,b)=>a-b),positions=new Map();
    function place(){rows.forEach(ids=>{const middle=ids.includes(rootId)?ids.indexOf(rootId):(ids.length-1)/2;ids.forEach((id,i)=>positions.set(id,{x:(i-middle)*205*(tree?1+Math.abs(rank.get(id))*.1:1),y:rank.get(id)*125}));});}
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
  function separatedEdgeRoutes(positions,edges) {
    const routes=new Map(),accepted=[];
    const pointSegment=(p,a,b)=>{
      const dx=b.x-a.x,dy=b.y-a.y,den=dx*dx+dy*dy;
      const t=den?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/den)):0;
      return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy);
    };
    // Route busy junctions first; stable IDs keep identical graphs reproducible.
    const degree=new Map();edges.forEach(e=>[e.source,e.target].forEach(id=>degree.set(id,(degree.get(id)||0)+1)));
    const ordered=[...edges].sort((a,b)=>(degree.get(b.source)+degree.get(b.target))-(degree.get(a.source)+degree.get(a.target))||a.id.localeCompare(b.id));
    ordered.forEach(e=>{
      const a=positions.get(e.source),b=positions.get(e.target);if(!a||!b)return;
      const length=Math.hypot(b.x-a.x,b.y-a.y)||1,nx=-(b.y-a.y)/length,ny=(b.x-a.x)/length;
      let best;
      for(const offset of [0,32,-32,64,-64,96,-96,128,-128,160,-160,192,-192]){
        const c={x:(a.x+b.x)/2+nx*offset,y:(a.y+b.y)/2+ny*offset};
        const points=Array.from({length:17},(_,i)=>{const t=i/16;return{x:(1-t)**2*a.x+2*(1-t)*t*c.x+t*t*b.x,y:(1-t)**2*a.y+2*(1-t)*t*c.y+t*t*b.y};});
        let score=offset*offset*.003;
        // Penalize sustained proximity, not just intersections. Shared exact
        // endpoints are exempt: edges must still meet their actual Objects.
        points.slice(3,-3).forEach(p=>{
          accepted.forEach(path=>{
            let distance=Infinity;
            for(let i=2;i<path.length-3;i++)distance=Math.min(distance,pointSegment(p,path[i],path[i+1]));
            score+=Math.max(0,26-distance)**2;
          });
          positions.forEach((node,id)=>{if(id!==e.source&&id!==e.target)score+=Math.max(0,42-Math.hypot(p.x-node.x,p.y-node.y))**2*3;});
        });
        if(!best||score<best.score)best={score,points,offset};
      }
      routes.set(e.id,{distance:best.offset,weight:.5});accepted.push(best.points);
    });
    return routes;
  }
  if(typeof module!=='undefined'&&module.exports)module.exports={hierarchyPositions,separatedEdgeRoutes};
  else {root.hierarchyPositions=hierarchyPositions;root.separatedEdgeRoutes=separatedEdgeRoutes;}
})(typeof window==='undefined'?globalThis:window);
