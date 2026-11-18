/* View snapshots are separate from analytical records and browser history. */
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
 // Some mouse drivers invoke browser traversal without a cancelable DOM event.
 // Reserve adjacent entries in this document so either direction reaches popstate.
 function bindNativeTraversal(view,overMap,move){
  if(!view?.navigation||!view.navigator.userActivation||!view.crypto?.randomUUID)return null;
  const {history,navigation}=view, key='triaMapTraversal';
  let marker=history.state?.[key];
  let slot=marker?.slot??null, returning=false, handled=null;
  function recenter(){
   if(!slot||returning)return;
   returning=true;
   history.go(-slot);
  }
  function arm(){
   if(marker){recenter();return;}
   // A new same-document branch would discard real forward pages.
   if(navigation.canGoForward||!view.navigator.userActivation.hasBeenActive)return;
   const id=view.crypto.randomUUID(), initial=history.state;
   const entry=slot=>({...initial,[key]:{id,slot}});
   history.replaceState(entry(-1),'');
   marker={id,slot:-1};slot=-1;
   history.pushState(entry(0),'');slot=0;
   history.pushState(entry(1),'');slot=1;
   recenter();
  }
  function pop(e){
   const destination=e.state?.[key];
   if(!marker||destination?.id!==marker.id)return;
   const origin=slot;
   slot=destination.slot;
   returning=false;
   if(origin!==0||slot===0)return;
   const alreadyHandled=handled?.direction===slot&&view.performance.now()-handled.time<400;
   handled=null;
   if(alreadyHandled||overMap()){
    if(!alreadyHandled)move(slot);
    recenter();
   }else if(slot<0||navigation.canGoForward){
    history.go(slot);
   }else{
    recenter();
   }
  }
  view.addEventListener('popstate',pop);
  return {
   arm,
   handled(direction){handled={direction,time:view.performance.now()};},
   unbind(){view.removeEventListener('popstate',pop);}
  };
 }
 function bindGraphMouseHistory(element,move){
  const target=element.ownerDocument||element;
  const gestures=new Map();
  let pointer=null;
  function overMap(event,point=event??pointer){
   if(element.closest?.('[hidden]'))return false;
   if(event?.composedPath().includes(element)||element.matches?.(':hover'))return true;
   const rect=element.getBoundingClientRect?.();
   return Boolean(point&&rect&&rect.width&&rect.height&&point.clientX>=rect.left&&
    point.clientX<rect.right&&point.clientY>=rect.top&&point.clientY<rect.bottom);
  }
  const native=bindNativeTraversal(target.defaultView,()=>overMap(),move);
  function suppress(e){
   e.preventDefault();
   e.stopPropagation();
  }
  function sideButton(e){
   if(e.button!==3&&e.button!==4)return;
   const pressed=e.type==='pointerdown'||e.type==='mousedown';
   const previous=gestures.get(e.button);
   const duplicate=previous&&!previous.types.has('auxclick')&&!previous.types.has(e.type)&&(
    pressed?e.type==='mousedown'&&!previous.released&&previous.types.has('pointerdown'):
    !previous.released||e.timeStamp-previous.time<=120
   );
   const inside=overMap(e);
   if(duplicate){
    if(previous.inside||inside)suppress(e);
    if(previous.inside)native?.handled(e.button===3?-1:1);
    previous.types.add(e.type);
    previous.time=e.timeStamp;
    if(!pressed)previous.released=true;
    return;
   }
   gestures.set(e.button,{inside,released:!pressed,time:e.timeStamp,types:new Set([e.type])});
   if(inside){
    const direction=e.button===3?-1:1;
    suppress(e);native?.handled(direction);move(direction);
   }
  }
  function pointAt(e){pointer=e;if(native&&overMap(e))native.arm();}
  function activate(e){if(native&&overMap(e))native.arm();}
  function leave(e){if(!e.relatedTarget)pointer=null;}
  function cancel(){gestures.clear();}
  function browserKey(e){
   if(!overMap(e,pointer))return;
   const direction=e.key==='BrowserBack'||(e.altKey&&e.key==='ArrowLeft')?-1
    :e.key==='BrowserForward'||(e.altKey&&e.key==='ArrowRight')?1:0;
   if(!direction)return;
   suppress(e);
   if(!e.repeat){native?.handled(direction);move(direction);}
  }
  const events=['pointerdown','mousedown','pointerup','mouseup','auxclick'].map(name=>[name,sideButton]);
  events.push(['pointermove',pointAt],['pointerout',leave],['pointercancel',cancel],['keydown',browserKey],['click',activate]);
  events.forEach(([name,handler])=>target.addEventListener(name,handler,{capture:true,passive:false}));
  return()=>{
   native?.unbind();
   events.forEach(([name,handler])=>target.removeEventListener(name,handler,{capture:true}));
  };
 }
 const api={createGraphHistory,bindGraphMouseHistory};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TriaGraphHistory=api;
})(typeof window==='undefined'?globalThis:window);
