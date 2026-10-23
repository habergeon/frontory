// 합성으로 지우개 만들기
// 실험: 지우개 알파: 1 → 0.3
// 완전 삭제 대신 여러 번 지나가며 점차 옅어집니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Making an Eraser with Compositing","display002":"Eraser Alpha: 1 ↔ 0.3","display003":"Refill"}:{"display001":"합성으로 지우개 만들기","display002":"지우개 알파: 1 ↔ 0.3","display003":"Refill"};
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
  canvas.style.background='repeating-conic-gradient(#ddd 0 25%, white 0 50%) 0/20px 20px';let erasing=false;function draw(){ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.fillStyle='#2563eb';ctx.fillRect(0,0,400,260);}on(canvas,'pointerdown',e=>{erasing=true;canvas.setPointerCapture(e.pointerId);erase(e);});on(canvas,'pointermove',e=>{if(erasing)erase(e);});for(const type of ['pointerup','pointercancel'])on(canvas,type,()=>erasing=false);function erase(e){const p=point(e);ctx.save();ctx.globalCompositeOperation='destination-out';ctx.globalAlpha=changed?0.3:1;ctx.beginPath();ctx.arc(p.x,p.y,20,0,Math.PI*2);ctx.fill();ctx.restore();}button(messages.display003,draw);
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
