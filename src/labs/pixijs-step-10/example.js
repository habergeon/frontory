// Assets 비동기 로딩
// 실험: URL: 정상 로컬 경로 → 없는 이미지
// 오류 상태가 표시되고 재시도 버튼은 유지됩니다
// 로컬 data URL을 Assets로 로드합니다. 오류 상태는 손상된 이미지로 재현하며 외부 서버/CORS는 별도 환경에서 확인하세요.
const TITLE="Assets 비동기 로딩";
const VARIABLE="URL: 정상 로컬 경로 ↔ 없는 이미지";
/** @param {any} context */
export async function mount(context){
  const {container,THREE,OrbitControls,PIXI}=context;
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
  let current=null,generation=0;const assetURL=source.toDataURL();const owned=new Set();async function load(){const token=++generation,url=changed?'data:image/png;base64,INVALID':assetURL;status.textContent='Loading';try{const loaded=await PIXI.Assets.load({src:url,parser:'loadTextures'});owned.add(url);if(closed||token!==generation){await PIXI.Assets.unload(url);owned.delete(url);return;}if(current){app.stage.removeChild(current);current.destroy();}current=new PIXI.Sprite(loaded);current.position.set(160,100);app.stage.addChild(current);status.textContent='Loaded asset; Assets owns cached texture';}catch(error){if(!closed)status.textContent='Load failed; retry is available: '+String(error);}}button('Load / retry',load);disposers.push(()=>{generation++;owned.forEach(url=>{PIXI.Assets.unload(url).catch(()=>{});});});function draw(){status.textContent='Choose valid local data URL or invalid image, then Load';}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
