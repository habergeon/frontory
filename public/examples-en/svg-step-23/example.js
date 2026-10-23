// Large Datasets and Update Cost
// Experiment: Point count: 100 → 5000
// DOM creation and style update workloads may increase
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Large Datasets and Update Cost","display002":"Point count: 100 ↔ 5000","display003":" DOM circles created in ","display004":"ms (CPU submission)"}:{"display001":"큰 데이터와 갱신 비용","display002":"점 수: 100 ↔ 5000","display003":" DOM circles created in ","display004":"ms (CPU submission)"};
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
  function draw(){const count=changed?5000:100,start=performance.now();svg.replaceChildren();const fragment=document.createDocumentFragment();let seed=42;function random(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}for(let i=0;i<count;i++)el('circle',{cx:random()*400,cy:random()*260,r:2,fill:'#2563eb'},fragment);svg.append(fragment);status.textContent=count+messages.display003+(performance.now()-start).toFixed(2)+messages.display004;}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
