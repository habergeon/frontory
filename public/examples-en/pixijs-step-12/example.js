// Event Modes and Hit Areas
// Experiment: hitArea: Image size → Expand 10px in each direction
// The selection region grows without changing the visible size
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export async function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Event Modes and Hit Areas","display002":"hitArea: Image size ↔ Expand 10px in each direction","display003":"Hit count ","display004":"Red outline = input bounds; sprite pixels unchanged"}:{"display001":"이벤트 모드와 히트 영역","display002":"hitArea: 이미지 크기 ↔ 각 방향 10px 확장","display003":"Hit count ","display004":"Red outline = input bounds; sprite pixels unchanged"};
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
  const app=new PIXI.Application();await app.init({preference:'webgl',width:400,height:260,resolution:1,autoDensity:true,background:'#edf2f7'});app.canvas.style.cssText='display:block;max-width:100%;touch-action:none';ui.append(app.canvas);
  const source=document.createElement('canvas');source.width=source.height=64;const sourceContext=source.getContext('2d');['#2563eb','#f97316','#fbbf24','#22c55e'].forEach((color,i)=>{sourceContext.fillStyle=color;sourceContext.fillRect(i%2*32,Math.floor(i/2)*32,32,32);sourceContext.fillStyle='#fff';sourceContext.font='18px sans-serif';sourceContext.fillText(String(i+1),i%2*32+10,Math.floor(i/2)*32+24);});
  const texture=PIXI.Texture.from(source);let tick=(_dt,_ticker)=>{};const ownedTickerUpdate=ticker=>tick(Math.min(ticker.deltaMS/1000,.1),ticker);app.ticker.add(ownedTickerUpdate);
  disposers.push(()=>{app.ticker.remove(ownedTickerUpdate);app.destroy(true,{children:true});texture.destroy(true);});
  const sprite=new PIXI.Sprite(texture);sprite.anchor.set(.5);sprite.position.set(200,130);sprite.eventMode='static';sprite.cursor='pointer';app.stage.addChild(sprite);let hits=0;const outline=new PIXI.Graphics();app.stage.addChild(outline);sprite.on('pointertap',()=>status.textContent=messages.display003+ ++hits);function draw(){const pad=changed?10:0;sprite.hitArea=new PIXI.Rectangle(-32-pad,-32-pad,64+pad*2,64+pad*2);outline.clear().rect(168-pad,98-pad,64+pad*2,64+pad*2).stroke({color:0xef4444,width:1});status.textContent=messages.display004;}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
