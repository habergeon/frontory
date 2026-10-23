// Dragging and Capture
// Experiment: Starting position: Node center → Node edge
// Keeping the offset prevents the node from jumping
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Dragging and Capture","display002":"Starting position: Node center ↔ Node edge","display003":"Drag an edge; offset retained at "}:{"display001":"드래그와 캡처","display002":"시작 위치: 노드 중앙 ↔ 노드 가장자리","display003":"Drag an edge; offset retained at "};
const TITLE=messages.display001;
const VARIABLE=messages.display002;
  const ui=document.createElement('section');ui.style.cssText='font:13px system-ui;color:#16324a;background:#f8fafc;padding:12px;box-sizing:border-box;max-height:100%;overflow:auto';container.append(ui);
  const heading=document.createElement('strong');heading.textContent=TITLE;ui.append(heading);
  const status=document.createElement('output');status.style.cssText='display:block;margin:8px 0;white-space:pre-wrap';status.setAttribute('aria-live','polite');ui.append(status);
  let changed=false,closed=false;const disposers=[];
  function on(target,type,fn){target.addEventListener(type,fn);disposers.push(()=>target.removeEventListener(type,fn));}
  function button(text,fn){const b=document.createElement('button');b.textContent=text;b.style.margin='4px';on(b,'click',fn);ui.append(b);return b;}
  const toggle=button(VARIABLE,()=>{changed=!changed;toggle.setAttribute('aria-pressed',String(changed));draw();});toggle.setAttribute('aria-pressed','false');
  let frame=0;function loop(fn){let last=performance.now();const tick=now=>{if(closed)return;const dt=Math.min((now-last)/1000,.1);last=now;fn(dt,now/1000);frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);}
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 400 260');svg.setAttribute('xmlns','http://www.w3.org/2000/svg');svg.style.cssText='display:block;width:400px;max-width:100%;background:#edf2f7;touch-action:none';ui.append(svg);
  /** @param {string} tag @param {any} attrs @param {any} [parent] @param {string} [text] @returns {any} */
  function el(tag,attrs,parent=svg,text=''){const node=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));if(text)node.textContent=text;parent.append(node);return node;}
  let p={x:200,y:130},offset=null;const dot=el('circle',{r:35,fill:'#2563eb'});function local(e){return new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.getScreenCTM().inverse());}on(dot,'pointerdown',e=>{const q=local(e);offset={x:q.x-p.x,y:q.y-p.y};dot.setPointerCapture(e.pointerId);});on(dot,'pointermove',e=>{if(!offset)return;const q=local(e);p={x:q.x-offset.x,y:q.y-offset.y};draw();});for(const type of ['pointerup','pointercancel'])on(dot,type,e=>{offset=null;if(dot.hasPointerCapture(e.pointerId))dot.releasePointerCapture(e.pointerId);});function draw(){dot.setAttribute('cx',String(p.x));dot.setAttribute('cy',String(p.y));status.textContent=messages.display003+p.x.toFixed(0)+','+p.y.toFixed(0);}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
