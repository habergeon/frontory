// 포인터 이벤트 영역
// 실험: 선택 폭: 2px → 16px
// 보이는 선은 그대로 두면서 조작 가능한 범위가 넓어집니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
const TITLE="포인터 이벤트 영역";
const VARIABLE="선택 폭: 2px ↔ 16px";
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
  let count=0;const visible=el('path',{d:'M 30 210 Q 200 20 370 180',fill:'none',stroke:'#2563eb','stroke-width':2}),hit=el('path',{d:visible.getAttribute('d'),fill:'none',stroke:'transparent','pointer-events':'stroke'});on(hit,'pointerdown',()=>{count++;status.textContent='Line selected '+count+' times';});function draw(){hit.setAttribute('stroke-width',String(changed?16:2));status.textContent='Visible 2px; hit width '+(changed?16:2)+'px';}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
