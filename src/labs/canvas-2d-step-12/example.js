// 도형 선택과 히트 테스트
// 실험: 검사 순서: 앞에서 뒤 → 뒤에서 앞
// 겹침 영역에서 화면 위쪽 도형이 선택됩니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Shape Selection and Hit Testing","display002":"Test Order: front to back ↔ back to front","display003":"Selected: ","display004":"; click overlap"}:{"display001":"도형 선택과 히트 테스트","display002":"검사 순서: 앞에서 뒤 ↔ 뒤에서 앞","display003":"Selected: ","display004":"; click overlap"};
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
  const canvas=document.createElement('canvas');canvas.width=400;canvas.height=260;canvas.style.cssText='display:block;max-width:100%;width:400px;height:auto;touch-action:none';canvas.setAttribute('aria-label',TITLE);ui.append(canvas);const ctx=canvas.getContext('2d');
  function clear(){ctx.resetTransform();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.clearRect(0,0,400,260);ctx.fillStyle='#edf2f7';ctx.fillRect(0,0,400,260);}
  function circle(x,y,r,color='#2563eb'){ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
  function point(e){const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*400/r.width,y:(e.clientY-r.top)*260/r.height};}
  const shapes=[{id:'blue',x:100,color:'#2563eb'},{id:'orange',x:180,color:'#f97316'}].map(s=>{const p=new Path2D();p.rect(s.x,70,140,130);return {...s,path:p};});let selected='none';on(canvas,'pointerdown',e=>{const p=point(e);const ordered=changed?[...shapes].reverse():shapes;selected=ordered.find(s=>ctx.isPointInPath(s.path,p.x,p.y))?.id||'none';draw();});function draw(){clear();for(const s of shapes){ctx.fillStyle=s.color;ctx.fill(s.path);}status.textContent=messages.display003+selected+messages.display004;}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
