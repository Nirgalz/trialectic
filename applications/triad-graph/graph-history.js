/* View snapshots only, never browser history or analytical records. */
(function(root){
 function createGraphHistory(limit=100){
  let entries=[],cursor=-1;
  const copy=value=>structuredClone(value);
  return {
   get canBack(){return cursor>0;},get canForward(){return cursor>=0&&cursor<entries.length-1;},
   reset(initial){entries=[copy(initial)];cursor=0;},
   commit(before,after){
    if(cursor<0){entries=[copy(before)];cursor=0;}else entries[cursor]=copy(before);
    if(JSON.stringify(before)===JSON.stringify(after))return;
    entries.splice(cursor+1);entries.push(copy(after));cursor++;
    if(entries.length>limit){entries.shift();cursor--;}
   },
   move(direction,current){
    if(direction!==-1&&direction!==1)return null;
    const target=cursor+direction;if(target<0||target>=entries.length)return null;
    entries[cursor]=copy(current);cursor=target;return copy(entries[cursor]);
   }
  };
 }
 function bindGraphMouseHistory(element,move){
  let consumed=false;
  const side=e=>e.button===3||e.button===4;
  function down(e){if(!side(e))return;e.preventDefault();e.stopPropagation();consumed=false;}
  function up(e){if(!side(e))return;e.preventDefault();e.stopPropagation();if(!consumed){consumed=true;move(e.button===3?-1:1);}}
  const events=[['pointerdown',down],['mousedown',down],['pointerup',up],['mouseup',up],['auxclick',up]];
  events.forEach(([name,handler])=>element.addEventListener(name,handler,{capture:true,passive:false}));
  return()=>events.forEach(([name,handler])=>element.removeEventListener(name,handler,true));
 }
 const api={createGraphHistory,bindGraphMouseHistory};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TriaGraphHistory=api;
})(typeof window==='undefined'?globalThis:window);
