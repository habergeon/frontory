// Dragging and Global Pointers
// Experiment: Parent scale: 1 → 2
// With correct conversion, the grabbed point stays under the pointer
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export async function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Dragging and Global Pointers","display002":"Parent scale: 1 ↔ 2","display003":"Drag with local offset; parent scale "}:{"display001":"드래그와 전역 포인터","display002":"부모 scale: 1 ↔ 2","display003":"Drag with local offset; parent scale "};
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
  const group=new PIXI.Container();group.position.set(60,35);app.stage.addChild(group);const sprite=new PIXI.Sprite(texture);sprite.anchor.set(.5);sprite.position.set(110,70);sprite.eventMode='static';group.addChild(sprite);app.stage.eventMode='static';app.stage.hitArea=new PIXI.Rectangle(0,0,400,260);let offset=null;sprite.on('pointerdown',e=>{const p=group.toLocal(e.global);offset={x:p.x-sprite.x,y:p.y-sprite.y};});app.stage.on('globalpointermove',e=>{if(!offset)return;const p=group.toLocal(e.global);sprite.position.set(p.x-offset.x,p.y-offset.y);});const stop=()=>offset=null;app.stage.on('pointerup',stop);sprite.on('pointerupoutside',stop);on(app.canvas,'pointercancel',stop);function draw(){group.scale.set(changed?2:1);status.textContent=messages.display003+group.scale.x;}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
