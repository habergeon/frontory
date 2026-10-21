// Frame interval is observed; it is NOT GPU time or an inferred draw-call count.
export async function mount({ PIXI, container }) {
  const ui=document.createElement('div');ui.innerHTML='<label><input type="checkbox"> Blur</label> <label><input type="checkbox"> Alternate textures</label> <label>DPR <select><option>1</option><option>2</option></select></label> <button>Record</button><pre></pre>';container.append(ui)
  const [blur,alternate]=ui.querySelectorAll('input'),dpr=ui.querySelector('select'),log=ui.querySelector('pre')
  const app=new PIXI.Application();await app.init({preference:'webgl',width:Math.max(1,container.clientWidth),height:Math.max(1,container.clientHeight-100),background:'#edf2f7'});container.append(app.canvas)
  const textures=['#3179bf','#e97645'].map(color=>{const c=document.createElement('canvas');c.width=c.height=24;const x=c.getContext('2d');x.fillStyle=color;x.beginPath();x.arc(12,12,10,0,Math.PI*2);x.fill();return PIXI.Texture.from(c)})
  const group=new PIXI.Container();app.stage.addChild(group);const sprites=Array.from({length:600},(_,i)=>{const s=new PIXI.Sprite(textures[0]);s.position.set((i*37)%app.screen.width,(i*61)%app.screen.height);group.addChild(s);return s});const filter=new PIXI.BlurFilter({strength:3,quality:4});let elapsed=0,frames=0
  const reset=()=>{elapsed=frames=0};blur.onchange=()=>{group.filters=blur.checked?[filter]:[];reset()};alternate.onchange=()=>{sprites.forEach((s,i)=>s.texture=textures[alternate.checked?i%2:0]);reset()};dpr.onchange=()=>{app.renderer.resolution=Number(dpr.value);app.renderer.resize(app.screen.width,app.screen.height);reset()}
  ui.querySelector('button').onclick=()=>{log.textContent+=`600 sprites · blur ${blur.checked} · textures ${alternate.checked?2:1} · DPR ${dpr.value} · ${frames} samples · rAF ${(elapsed/Math.max(1,frames)).toFixed(2)} ms\n`}
  app.ticker.add(t=>{elapsed+=t.elapsedMS;frames++;sprites.forEach((s,i)=>{s.y=(s.y+t.deltaMS*.015*(1+i%3))%app.screen.height})})
  const observer=new ResizeObserver(()=>app.renderer.resize(Math.max(1,container.clientWidth),Math.max(1,container.clientHeight-120)));observer.observe(container)
  return()=>{observer.disconnect();app.destroy(true,{children:true,texture:false,textureSource:false});filter.destroy();textures.forEach(t=>t.destroy(true));container.replaceChildren()}
}
