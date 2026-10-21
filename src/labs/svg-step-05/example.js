// 호와 도넛 조각
// 실험: 진행률: 25% → 75%
// large-arc-flag를 바꿔 더 긴 호를 선택해야 합니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
const TITLE="호와 도넛 조각";
const VARIABLE="진행률: 25% ↔ 75%";
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI}=context;
  const ui=document.createElement('section');ui.style.cssText='font:13px system-ui;color:#16324a;background:#f8fafc;padding:12px;box-sizing:border-box;max-height:100%;overflow:auto';container.append(ui);
  const heading=document.createElement('strong');heading.textContent=TITLE;ui.append(heading);
  const status=document.createElement('output');status.style.cssText='display:block;margin:8px 0;white-space:pre-wrap';status.setAttribute('aria-live','polite');ui.append(status);
  let changed=false,closed=false;const disposers=[];
  function on(target,type,fn){target.addEventListener(type,fn);disposers.push(()=>target.removeEventListener(type,fn));}
  function button(text,fn){const b=document.createElement('button');b.textContent=text;b.style.margin='4px';on(b,'click',fn);ui.append(b);return b;}
  const toggle=button(VARIABLE,()=>{changed=!changed;toggle.setAttribute('aria-pressed',String(changed));draw();});toggle.setAttribute('aria-pressed','false');
  let frame=0;function loop(fn){let last=performance.now();const tick=now=>{if(closed)return;const dt=Math.min((now-last)/1000,.1);last=now;fn(dt,now/1000);frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);}
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 400 260');svg.setAttribute('xmlns','http://www.w3.org/2000/svg');svg.style.cssText='display:block;width:400px;max-width:100%;background:#edf2f7;touch-action:none';ui.append(svg);
  /** @param {string} tag @param {any} attrs @param {any} [parent] @param {string} [text] @returns {any} */
  function el(tag,attrs,parent=svg,text=''){const node=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));if(text)node.textContent=text;parent.append(node);return node;}
  function draw(){svg.replaceChildren();const progress=changed?.75:.25,a=progress*Math.PI*2-Math.PI/2,x=200+85*Math.cos(a),y=130+85*Math.sin(a),large=progress>.5?1:0;el('circle',{cx:200,cy:130,r:85,fill:'none',stroke:'#e2e8f0','stroke-width':26});el('path',{d:'M 200 45 A 85 85 0 '+large+' 1 '+x+' '+y,fill:'none',stroke:'#2563eb','stroke-width':26});el('text',{x:200,y:140,'text-anchor':'middle',fill:'#16324a'},svg,progress*100+'%');status.textContent='large-arc-flag = '+large;}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
