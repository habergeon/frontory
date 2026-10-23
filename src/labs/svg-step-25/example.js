// Canvas 대조 렌더러
// 실험: 렌더러: SVG → Canvas 2D
// 선택 기능의 구현 책임과 DOM 수가 달라집니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Canvas Comparison Renderer","display002":"Renderer: SVG ↔ Canvas 2D","display003":"Selected ","display004":"manual distance test","display005":"DOM event target"}:{"display001":"Canvas 대조 렌더러","display002":"렌더러: SVG ↔ Canvas 2D","display003":"Selected ","display004":"manual distance test","display005":"DOM event target"};
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
  const canvas=document.createElement('canvas');canvas.width=400;canvas.height=260;canvas.style.cssText='max-width:100%;display:none';ui.append(canvas);const ctx=canvas.getContext('2d'),points=Array.from({length:100},(_,i)=>({x:(i*79)%390+5,y:(i*43)%250+5}));let selected=-1;points.forEach((p,i)=>{const c=el('circle',{cx:p.x,cy:p.y,r:5,fill:'#2563eb'});on(c,'pointerdown',()=>{selected=i;draw();});});on(canvas,'pointerdown',e=>{const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*400/r.width,y=(e.clientY-r.top)*260/r.height;selected=points.findIndex(p=>Math.hypot(x-p.x,y-p.y)<7);draw();});function draw(){svg.style.display=changed?'none':'block';canvas.style.display=changed?'block':'none';ctx.clearRect(0,0,400,260);points.forEach((p,i)=>{const color=i===selected?'#f97316':'#2563eb';svg.children[i].setAttribute('fill',color);ctx.fillStyle=color;ctx.beginPath();ctx.arc(p.x,p.y,5,0,Math.PI*2);ctx.fill();});status.textContent=messages.display003+selected+'; '+(changed?messages.display004:messages.display005);}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
