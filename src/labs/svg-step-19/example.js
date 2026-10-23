// 데이터와 DOM 갱신
// 실험: 갱신 방식: 전체 교체 → id 기반 속성 수정
// 변경되지 않은 요소의 정체성과 포커스가 유지됩니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Data and DOM Updates","display002":"Update method: Full replacement ↔ id-based attribute updates","display003":"Move B","display004":"Updates ","display005":"; identity ","display006":"retained","display007":"recreated","display008":" — focus a circle before changing data"}:{"display001":"데이터와 DOM 갱신","display002":"갱신 방식: 전체 교체 ↔ id 기반 속성 수정","display003":"Move B","display004":"Updates ","display005":"; identity ","display006":"retained","display007":"recreated","display008":" — focus a circle before changing data"};
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
  const nodes=new Map();let data=[{id:'a',x:70},{id:'b',x:200},{id:'c',x:330}],updates=0;button(messages.display003,()=>{data[1].x+=10;updates++;draw();});function draw(){if(!changed){svg.replaceChildren();nodes.clear();}for(const item of data){if(!nodes.has(item.id)){const node=el('circle',{cy:130,r:25,fill:'#2563eb',tabindex:0,'aria-label':item.id});nodes.set(item.id,node);}nodes.get(item.id).setAttribute('cx',String(item.x));}status.textContent=messages.display004+updates+messages.display005+(changed?messages.display006:messages.display007)+messages.display008;}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
