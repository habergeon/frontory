// Identical seeded points. Times measure synchronous construction/draw, NOT GPU paint.
export function mount({ container }) {
  container.innerHTML='<label>Points <select><option>100</option><option>1000</option><option>5000</option></select></label> <label>Zoom <input type="range" min="1" max="3" step=".25" value="1"></label><p role="status"></p><div style="display:flex;gap:8px"></div><pre></pre>'
  const count=container.querySelector('select'),zoom=container.querySelector('input'),status=container.querySelector('[role=status]'),log=container.querySelector('pre'),row=container.querySelector('div')
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg'), canvas=document.createElement('canvas')
  svg.setAttribute('viewBox','0 0 300 300');svg.setAttribute('aria-label','SVG points');canvas.width=canvas.height=300;canvas.setAttribute('aria-label','Canvas points: use SVG dots for keyboard selection')
  svg.style.cssText=canvas.style.cssText='width:48%;height:auto;background:#edf2f7';row.append(svg,canvas)
  const ctx=canvas.getContext('2d');if(!ctx) throw new Error('Canvas unavailable')
  let points=[],selected=-1
  const draw=()=>{ const z=Number(zoom.value);const start=performance.now();svg.replaceChildren();points=Array.from({length:Number(count.value)},(_,i)=>({x:(i*73.37)%300,y:(i*47.17)%300}));points.forEach((p,i)=>{const c=document.createElementNS(svg.namespaceURI,'circle');c.setAttribute('cx',String(p.x*z));c.setAttribute('cy',String(p.y*z));c.setAttribute('r','3');c.setAttribute('fill',i===selected?'#e97645':'#3179bf');c.setAttribute('tabindex','0');c.setAttribute('role','button');c.setAttribute('aria-label',`Point ${i}`);c.addEventListener('click',()=>pick(i));c.addEventListener('keydown',e=>{if(e['key']==='Enter'||e['key']===' '){e.preventDefault();pick(i)}});svg.append(c)});const svgMs=performance.now()-start; const t=performance.now();ctx.clearRect(0,0,300,300);points.forEach((p,i)=>{ctx.fillStyle=i===selected?'#e97645':'#3179bf';ctx.beginPath();ctx.arc(p.x*z,p.y*z,3,0,Math.PI*2);ctx.fill()});log.textContent=`${points.length} points · zoom ${z}\nSVG DOM ${svgMs.toFixed(2)} ms · Canvas draw ${(performance.now()-t).toFixed(2)} ms\nSVG has per-dot DOM/keyboard targets; Canvas uses manual hit testing. Timings exclude browser paint.` }
  const pick=i=>{selected=i;status.textContent=`Selected point ${i}`;draw()}
  canvas.onclick=e=>{const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*300/r.width,y=(e.clientY-r.top)*300/r.height,z=Number(zoom.value);let best=-1,d=100;points.forEach((p,i)=>{const v=(p.x*z-x)**2+(p.y*z-y)**2;if(v<d){best=i;d=v}});if(best>=0)pick(best)}
  count.onchange=zoom.oninput=draw;draw();return()=>container.replaceChildren()
}
