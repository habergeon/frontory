// 접근 가능한 캔버스 조작
// 실험: 입력 방식: 포인터 → 키보드만
// 동일 id가 선택되고 같은 이동 명령이 적용됩니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Accessible Canvas Controls","display002":"Input Method: pointer ↔ keyboard only","display003":"Select ","display004":"Move selected right","display005":"Selected ","display006":" at "}:{"display001":"접근 가능한 캔버스 조작","display002":"입력 방식: 포인터 ↔ 키보드만","display003":"Select ","display004":"Move selected right","display005":"Selected ","display006":" at "};
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
  let selected=0;const objects=[{id:'A',x:90},{id:'B',x:270}];function select(i){selected=i;draw();}objects.forEach((s,i)=>button(messages.display003+s.id,()=>select(i)));button(messages.display004,()=>{objects[selected].x+=10;draw();});on(canvas,'pointerdown',e=>{const p=point(e);const i=objects.findIndex(s=>Math.abs(s.x-p.x)<35);if(i>=0)select(i);});function draw(){clear();objects.forEach((s,i)=>circle(s.x,130,30,i===selected?'#f97316':'#2563eb'));status.textContent=messages.display005+objects[selected].id+messages.display006+objects[selected].x;}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
