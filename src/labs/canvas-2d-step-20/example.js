// 정적 레이어와 캐시
// 실험: 캐시 갱신: 매 프레임 → 리사이즈 때만
// 정적 경로 생성 횟수가 줄어듭니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Static Layers and Caching","display002":"Cache Updates: every frame ↔ only on resize","display003":"Background builds: "}:{"display001":"정적 레이어와 캐시","display002":"캐시 갱신: 매 프레임 ↔ 리사이즈 때만","display003":"Background builds: "};
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
  const cache=document.createElement('canvas');cache.width=400;cache.height=260;const bg=cache.getContext('2d');let builds=0,t=0;function build(){builds++;bg.fillStyle='#e2e8f0';bg.fillRect(0,0,400,260);bg.strokeStyle='#94a3b8';for(let x=0;x<400;x+=10){bg.beginPath();bg.moveTo(x,0);bg.lineTo(400-x,260);bg.stroke();}}build();function draw(){if(!changed)build();ctx.drawImage(cache,0,0);circle(200+Math.sin(t)*130,130,20);status.textContent=messages.display003+builds;}const observer=new ResizeObserver(build);observer.observe(container);disposers.push(()=>observer.disconnect());loop(dt=>{t+=dt;draw();});
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
