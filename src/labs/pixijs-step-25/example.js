// 배칭 가설 만들기
// 실험: 그리기 순서: Sprite와 Graphics 교차 → 종류별 묶음
// 상태 전환 비용이 줄 가능성이 있으나 실제 측정으로 확인해야 합니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
/** @param {any} context */
export async function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Forming a Batching Hypothesis","display002":"Drawing order: Alternate Sprites and Graphics ↔ Group by type","display003":"Non-overlapping objects; reorder CPU ","display004":"ms. Measure actual GPU batching with profiler."}:{"display001":"배칭 가설 만들기","display002":"그리기 순서: Sprite와 Graphics 교차 ↔ 종류별 묶음","display003":"Non-overlapping objects; reorder CPU ","display004":"ms. Measure actual GPU batching with profiler."};
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
  const group=new PIXI.Container();app.stage.addChild(group);const sprites=[],graphics=[];for(let i=0;i<30;i++){const x=(i%10)*38+10,y=Math.floor(i/10)*75+15,s=new PIXI.Sprite(texture);s.position.set(x,y);s.scale.set(.35);sprites.push(s);const g=new PIXI.Graphics().circle(x+12,y+42,10).fill(0xf97316);graphics.push(g);}function draw(){const start=performance.now();group.removeChildren();if(changed)group.addChild(...sprites,...graphics);else for(let i=0;i<sprites.length;i++)group.addChild(sprites[i],graphics[i]);status.textContent=messages.display003+(performance.now()-start).toFixed(3)+messages.display004;}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
