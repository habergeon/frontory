// 프레임 계측과 병목
// 실험: 입자 수: 500 → 2000
// 갱신과 그리기 중 어느 구간이 증가하는지 구별할 수 있습니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
const TITLE="프레임 계측과 병목";
const VARIABLE="입자 수: 500 ↔ 2000";
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
  const canvas=document.createElement('canvas');canvas.width=400;canvas.height=260;canvas.style.cssText='display:block;max-width:100%;width:400px;height:auto;touch-action:none';canvas.setAttribute('aria-label',TITLE);ui.append(canvas);const ctx=canvas.getContext('2d');
  function clear(){ctx.resetTransform();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.clearRect(0,0,400,260);ctx.fillStyle='#edf2f7';ctx.fillRect(0,0,400,260);}
  function circle(x,y,r,color='#2563eb'){ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
  function point(e){const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*400/r.width,y:(e.clientY-r.top)*260/r.height};}
  const particles=Array.from({length:2000},(_,i)=>({x:(i*73)%400,y:(i*37)%260}));const samples=[];let updateMS=0,drawMS=0;function draw(){clear();for(let i=0;i<(changed?2000:500);i++)circle(particles[i].x,particles[i].y,2);}loop(dt=>{const a=performance.now();for(let i=0;i<(changed?2000:500);i++)particles[i].x=(particles[i].x+dt*30)%400;const b=performance.now();draw();const c=performance.now();updateMS=b-a;drawMS=c-b;samples.push(dt*1000);if(samples.length>180)samples.shift();const sorted=[...samples].sort((a,b)=>a-b);status.textContent='CPU update '+updateMS.toFixed(2)+'ms / draw submission '+drawMS.toFixed(2)+'ms; frame median '+sorted[Math.floor(sorted.length*.5)].toFixed(1)+'ms / p95 '+sorted[Math.floor(sorted.length*.95)].toFixed(1)+'ms (not GPU time)';});
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
