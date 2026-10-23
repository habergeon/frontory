// Caching Static UI
// Experiment: Cache refresh: No refresh call → Call when content changes
// New content appears instead of the stale label
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export async function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Caching Static UI","display002":"Cache refresh: No refresh call ↔ Call when content changes","display003":"Change cached label","display004":"Data count ","display005":"; cache ","display006":"refreshed","display007":"unchanged","display008":"Change label with or without explicit updateCacheTexture"}:{"display001":"정적 UI 캐시","display002":"캐시 갱신: 갱신 호출 없음 ↔ 내용 변경 시 호출","display003":"Change cached label","display004":"Data count ","display005":"; cache ","display006":"refreshed","display007":"unchanged","display008":"Change label with or without explicit updateCacheTexture"};
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
  const panel=new PIXI.Container();panel.position.set(80,70);panel.addChild(new PIXI.Graphics().roundRect(0,0,240,120,16).fill(0x2563eb));const label=new PIXI.Text({text:'Count 0',style:{fontSize:28,fill:0xffffff}});label.position.set(25,40);panel.addChild(label);app.stage.addChild(panel);panel.cacheAsTexture(true);let count=0;button(messages.display003,()=>{count++;label.text='Count '+count;if(changed)panel.updateCacheTexture();status.textContent=messages.display004+count+messages.display005+(changed?messages.display006:messages.display007);});function draw(){status.textContent=messages.display008;}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
