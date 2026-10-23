// gaussian-splatting-step-08: deliberately small CPU teaching experiment, not a trained GS renderer.
export function mount({container,locale='ko'}) {
const messages=locale==='en'?{"display001":"Alpha Compositing and Order","display002":"CPU Canvas2D compositing fixture · no trained data · not a Spark/GPU renderer. Experiment with selected 3D Gaussian mathematics and loader contracts using small inputs.","display003":"Draw order","display004":"Red, then blue","display005":"Blue, then red","display006":"Run / reinitialize","display007":"Canvas2D unavailable","display008":"blue then red","display009":"red then blue","display010":"CPU canvas source-over. Compare only the order of two splats."}:{"display001":"알파 합성과 순서","display002":"CPU Canvas2D 합성 fixture · 학습 데이터 없음 · Spark/GPU 렌더러 아님. 3D Gaussian의 일부 수학과 로더 계약만 작은 입력으로 실험합니다.","display003":"그리기 순서","display004":"빨강 다음 파랑","display005":"파랑 다음 빨강","display006":"실행 / 다시 초기화","display007":"Canvas2D unavailable","display008":"blue then red","display009":"red then blue","display010":"CPU canvas source-over. 두 splat 순서만 비교합니다."};

  container.style.cssText = 'overflow:auto;background:#101827;color:#e5edf8;font:14px system-ui;padding:12px;box-sizing:border-box';
  const title=document.createElement('h3'); title.textContent=messages.display001;
  const help=document.createElement('p'); help.textContent=messages.display002;
  const choice=document.createElement('select'); choice.setAttribute('aria-label',messages.display003);
  for(const text of [messages.display004,messages.display005]) { const o=document.createElement('option');o.textContent=text;choice.append(o); }
  const button=document.createElement('button'); button.textContent=messages.display006;
  const output=document.createElement('pre'); output.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere'; output.setAttribute('aria-live','polite');
  const canvas=document.createElement('canvas'); canvas.width=640;canvas.height=360;canvas.style.cssText='width:100%;height:auto;max-height:360px;object-fit:contain';
  container.append(title,help,choice,button,canvas,output);

  const ctx=canvas.getContext('2d');if(!ctx)throw new Error(messages.display007);
  let active=true,generation=0,raf=0;const timers=new Set();
  function clear(background='#07111f'){ctx.globalCompositeOperation='source-over';ctx.fillStyle=background;ctx.fillRect(0,0,canvas.width,canvas.height);}
  function draw(p){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.scale(p.sx,p.sy);const gradient=ctx.createRadialGradient(0,0,0,0,0,3);for(let i=0;i<=24;i++){const r=i/8;gradient.addColorStop(i/24,'rgba('+p.color.map(x=>Math.round(x)).join(',')+','+(i===24?0:p.opacity*Math.exp(-.5*r*r))+')');}ctx.fillStyle=gradient;ctx.fillRect(-3,-3,6,6);ctx.restore();}
  function project(p,distance){const depth=Math.max(.1,distance+p.z);return {x:320+p.x*280/depth,y:180-p.y*280/depth,depth};}
  function makeData(count){return Array.from({length:count},(_,i)=>({id:i,x:Math.sin(i*2.399)*(.2+(i%17)/17),y:Math.cos(i*2.399)*(.2+(i%17)/17),z:Math.sin(i*.7)*.4,color:[50+(i*17)%190,80+(i*13)%170,130+(i*7)%125]}));}
  const data=makeData(256);
  function renderData(points,angle){clear();const scale=canvas.width/640;const list=points.map(p=>{const x=p.x*Math.cos(angle)-p.z*Math.sin(angle),z=p.x*Math.sin(angle)+p.z*Math.cos(angle);return {...p,...project({...p,x,z},3)};}).sort((a,b)=>b.depth-a.depth);ctx.save();ctx.scale(scale,scale);for(const p of list)draw({...p,sx:6,sy:3,angle:.3,opacity:.65});ctx.restore();}
  async function run(){generation++;const token=generation;cancelAnimationFrame(raf);canvas.onclick=null;canvas.onkeydown=null;canvas.width=640;canvas.height=360;clear();const variant=choice.selectedIndex;const isCurrent=()=>active&&token===generation;const log=value=>{if(isCurrent())output.textContent=JSON.stringify(value,null,2);};try{clear();const a={x:290,y:180,sx:65,sy:45,angle:0,color:[255,0,0],opacity:.6},b={...a,x:350,color:[0,0,255]};for(const p of variant?[b,a]:[a,b])draw(p);const center=ctx.getImageData(320,180,1,1).data;log({order:variant?messages.display008:messages.display009,centerRGBA:Array.from(center),formula:'Cout = Cs * alpha_s + Cd * (1-alpha_s)',note:messages.display010});}catch(error){log({error:String(error)});}}
  button.onclick=()=>{void run();};choice.onchange=()=>{void run();};void run();
  return ()=>{active=false;generation++;cancelAnimationFrame(raf);for(const timer of timers)clearTimeout(timer);timers.clear();canvas.onclick=null;canvas.onkeydown=null;button.onclick=null;choice.onchange=null;container.replaceChildren();};
}
