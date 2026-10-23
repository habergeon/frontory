// 2D 장면 편집기 완성
// 실험: 재실행: 1회 → 5회
// 정리가 맞으면 입력당 명령 수와 ticker 콜백 수가 증가하지 않습니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
/** @param {any} context */
export async function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Completing the 2D Scene Editor","display002":"Reruns: 1 run ↔ 5 runs","display003":"Rebuild","display004":"Move selected","display005":"Import JSON","display006":"Builds ","display007":"; selected ","display008":"; one application ticker"}:{"display001":"2D 장면 편집기 완성","display002":"재실행: 1회 ↔ 5회","display003":"Rebuild","display004":"Move selected","display005":"Import JSON","display006":"Builds ","display007":"; selected ","display008":"; one application ticker"};
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
  let records=[{id:'a',x:100,y:100},{id:'b',x:270,y:100}],world=new PIXI.Container(),selected='a',builds=0;app.stage.addChild(world);const input=document.createElement('textarea');ui.append(input);function rebuild(){for(let i=0;i<(changed?5:1);i++){world.destroy({children:true});world=new PIXI.Container();app.stage.addChild(world);records.forEach(record=>{const sprite=new PIXI.Sprite(texture);sprite.position.set(record.x,record.y);sprite.eventMode='static';sprite.on('pointertap',()=>{selected=record.id;draw();});world.addChild(sprite);});builds++;}draw();}button(messages.display003,rebuild);button(messages.display004,()=>{records.find(r=>r.id===selected).x+=10;rebuild();});button(messages.display005,()=>{try{const next=JSON.parse(input.value);if(!Array.isArray(next)||new Set(next.map(n=>n.id)).size!==next.length||!next.every(n=>typeof n.id==='string'&&Number.isFinite(n.x)&&Number.isFinite(n.y)))throw Error('Invalid records');records=next;selected=records[0]?.id;rebuild();}catch(error){status.textContent=String(error);}});function draw(){world.children.forEach((sprite,i)=>sprite.tint=records[i].id===selected?0xf97316:0xffffff);input.value=JSON.stringify(records);status.textContent=messages.display006+builds+messages.display007+selected+messages.display008;}rebuild();
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
