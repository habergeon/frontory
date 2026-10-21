// 내보내기와 원본 데이터
// 실험: 입력 JSON: 유효 좌표 → x에 문자열
// 잘못된 데이터는 거부되고 기존 장면은 유지됩니다
// PNG는 미리보기로 생성하고 JSON은 입력란으로 가져옵니다. 파일 다운로드는 iframe 정책에 따라 외부 환경이 필요할 수 있습니다.
const TITLE="내보내기와 원본 데이터";
const VARIABLE="입력 JSON: 유효 좌표 ↔ x에 문자열";
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
  let objects=[{x:100,y:130},{x:280,y:130}];const input=document.createElement('textarea');input.value=JSON.stringify(objects);ui.append(input);button('Import JSON',()=>{try{const data=JSON.parse(input.value);if(!Array.isArray(data)||!data.every(s=>Number.isFinite(s.x)&&Number.isFinite(s.y)))throw Error('Coordinates must be finite numbers');objects=data;draw();status.textContent='Valid scene imported';}catch(e){status.textContent=String(e);}});button('PNG preview',()=>canvas.toBlob(blob=>{if(!blob||closed)return;const url=URL.createObjectURL(blob);const img=document.createElement('img');img.src=url;img.width=160;ui.append(img);disposers.push(()=>URL.revokeObjectURL(url));}));function draw(){clear();objects.forEach(s=>circle(s.x,s.y,25));input.value=JSON.stringify(changed?[{x:'invalid',y:130}]:objects);}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
