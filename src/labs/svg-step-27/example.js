// 재현 가능한 비교 실험
// 실험: 장면 크기: 1000점 → 5000점
// 렌더러별 비용 증가 양상이 다를 수 있습니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
const TITLE="재현 가능한 비교 실험";
const VARIABLE="장면 크기: 1000점 ↔ 5000점";
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
  const canvas=document.createElement('canvas');canvas.width=400;canvas.height=260;canvas.style.cssText='max-width:100%;display:block';ui.append(canvas);const ctx=canvas.getContext('2d');function draw(){const n=changed?5000:1000,data=Array.from({length:n},(_,i)=>({x:(i*7919%4000)/10,y:(i*3571%2600)/10}));let start=performance.now();svg.replaceChildren();data.forEach(p=>el('circle',{cx:p.x,cy:p.y,r:1.5,fill:'#2563eb'}));const svgMS=performance.now()-start;start=performance.now();ctx.clearRect(0,0,400,260);ctx.fillStyle='#2563eb';data.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,1.5,0,Math.PI*2);ctx.fill();});status.textContent=n+' fixed points — SVG construction '+svgMS.toFixed(2)+'ms / Canvas submission '+(performance.now()-start).toFixed(2)+'ms; excludes paint/GPU';}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
