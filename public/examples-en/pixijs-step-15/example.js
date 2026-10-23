// Keyboard Input and Accessibility
// Experiment: Input: Pointer → Keyboard
// The same Sprite can be selected and its position changed
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export async function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Keyboard Input and Accessibility","display002":"Input: Pointer ↔ Keyboard","display003":"Select sprite ","display004":"Move selected right","display005":"Selected sprite ","display006":" at x="}:{"display001":"키보드와 접근성","display002":"입력: 포인터 ↔ 키보드","display003":"Select sprite ","display004":"Move selected right","display005":"Selected sprite ","display006":" at x="};
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
  let selected=0;const sprites=[100,270].map((x,i)=>{const s=new PIXI.Sprite(texture);s.position.set(x,100);s.eventMode='static';s.on('pointertap',()=>select(i));app.stage.addChild(s);button(messages.display003+i,()=>select(i));return s;});function select(i){selected=i;draw();}button(messages.display004,()=>{sprites[selected].x+=10;draw();});function draw(){sprites.forEach((s,i)=>s.tint=i===selected?0xf97316:0xffffff);status.textContent=messages.display005+selected+messages.display006+sprites[selected].x;}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
