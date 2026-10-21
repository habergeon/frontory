// 그라디언트 좌표
// 실험: gradientUnits: objectBoundingBox → userSpaceOnUse
// 도형마다 늘어나던 색 띠가 공통 좌표에 정렬됩니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
const TITLE="그라디언트 좌표";
const VARIABLE="gradientUnits: objectBoundingBox ↔ userSpaceOnUse";
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI}=context;
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
  function draw(){svg.replaceChildren();const defs=el('defs',{}),gradient=el('linearGradient',{id:'lesson-gradient',gradientUnits:changed?'userSpaceOnUse':'objectBoundingBox',x1:0,x2:changed?380:1,y1:0,y2:0},defs);el('stop',{offset:0,'stop-color':'#2563eb'},gradient);el('stop',{offset:1,'stop-color':'#f97316'},gradient);el('rect',{x:20,y:40,width:150,height:70,fill:'url(#lesson-gradient)'});el('rect',{x:20,y:140,width:360,height:70,fill:'url(#lesson-gradient)'});}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
