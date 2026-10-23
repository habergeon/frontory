// 입자 재사용과 할당
// 실험: 할당 정책: 매 방출 새 객체 → 비활성 슬롯 재사용
// 할당량은 줄지만 프레임 개선 정도는 측정이 필요합니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Particle Reuse and Allocation","display002":"Allocation Policy: new object for every emission ↔ reuse inactive slots","display003":"New allocations: ","display004":"; active: ","display005":"; pool capacity 100 (drop when full)"}:{"display001":"입자 재사용과 할당","display002":"할당 정책: 매 방출 새 객체 ↔ 비활성 슬롯 재사용","display003":"New allocations: ","display004":"; active: ","display005":"; pool capacity 100 (drop when full)"};
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
  const pool=Array.from({length:100},()=>({active:false,x:0,y:0,age:0}));let particles=[],allocations=0,emission=0;function draw(){clear();particles.forEach(p=>circle(p.x,p.y,4));status.textContent=messages.display003+allocations+messages.display004+particles.length+messages.display005;}loop(dt=>{emission+=30*dt;while(emission>=1){let p=changed?pool.find(p=>!p.active):{active:false,x:0,y:0,age:0};if(p){if(!changed)allocations++;Object.assign(p,{active:true,x:200,y:240,age:0});particles.push(p);}emission--;}for(const p of particles){p.age+=dt;p.y-=80*dt;if(p.age>2)p.active=false;}particles=particles.filter(p=>p.active);draw();});
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
