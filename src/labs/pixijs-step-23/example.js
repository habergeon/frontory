// 대량 입자와 기능 경계
// 실험: rotation 설정: 정적 → 동적
// 회전이 매 프레임 변할 때 갱신 경로와 업로드 범위가 달라집니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
const TITLE="대량 입자와 기능 경계";
const VARIABLE="rotation 설정: 정적 ↔ 동적";
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
  const staticContainer=new PIXI.ParticleContainer({dynamicProperties:{position:true,rotation:false}}),dynamicContainer=new PIXI.ParticleContainer({dynamicProperties:{position:true,rotation:true}});app.stage.addChild(staticContainer,dynamicContainer);const particles=[];for(const container of [staticContainer,dynamicContainer]){const list=[];for(let i=0;i<100;i++){const p=new PIXI.Particle({texture,x:20+(i%10)*38,y:20+Math.floor(i/10)*23,scaleX:.2,scaleY:.12});container.addParticle(p);list.push(p);}particles.push(list);}tick=dt=>{for(const list of particles)for(const p of list)p.rotation+=dt;};function draw(){staticContainer.visible=!changed;dynamicContainer.visible=changed;status.textContent='rotation '+(changed?'dynamic: uploaded every frame':'static: values mutate but buffer needs update()');}button('Upload static rotation',()=>staticContainer.update());
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
