// 장면 전환과 상태 보존
// 실험: 완료 순서: 현재 요청 먼저 → 이전 요청 나중
// 이전 결과가 새 화면에 Sprite를 추가하지 않습니다
// 타이머로 비동기 장면 완료 순서를 재현합니다. 실제 서버 로딩 없이 세대 토큰을 관찰할 수 있습니다.
const TITLE="장면 전환과 상태 보존";
const VARIABLE="완료 순서: 현재 요청 먼저 ↔ 이전 요청 나중";
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
  let generation=0,current=new PIXI.Container(),data={x:120},committed=0;app.stage.addChild(current);function request(id,delay){const token=++generation;const timer=setTimeout(()=>{if(closed||token!==generation)return;current.destroy({children:true});current=new PIXI.Container();app.stage.addChild(current);const sprite=new PIXI.Sprite(texture);sprite.position.set(data.x,100);sprite.tint=id===1?0x2563eb:0xf97316;current.addChild(sprite);committed=id;draw();},delay);disposers.push(()=>clearTimeout(timer));}button('Switch A then B',()=>{request(1,changed?800:100);request(2,changed?100:800);});button('Move saved position',()=>{data.x+=10;current.children.forEach(s=>s.x=data.x);draw();});function draw(){status.textContent='Committed scene '+committed+'; saved x='+data.x+'; generation '+generation;}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
