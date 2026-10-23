// Visible Regions and Level of Detail
// Experiment: Scale: 1 → 0.2
// Reducing labels may ease overlap and reduce DOM work
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Visible Regions and Level of Detail","display002":"Scale: 1 ↔ 0.2","display003":"Visible ","display004":" / 1000; labels ","display005":"; scale "}:{"display001":"가시 영역과 세부 수준","display002":"축척: 1 ↔ 0.2","display003":"Visible ","display004":" / 1000; labels ","display005":"; scale "};
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
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 400 260');svg.setAttribute('xmlns','http://www.w3.org/2000/svg');svg.style.cssText='display:block;width:400px;max-width:100%;background:#edf2f7;touch-action:none';ui.append(svg);
  /** @param {string} tag @param {any} attrs @param {any} [parent] @param {string} [text] @returns {any} */
  function el(tag,attrs,parent=svg,text=''){const node=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));if(text)node.textContent=text;parent.append(node);return node;}
  function draw(){svg.replaceChildren();const scale=changed?.2:1;svg.setAttribute('viewBox','0 0 '+400/scale+' '+260/scale);let visible=0,labels=0;for(let i=0;i<1000;i++){const x=(i%40)*50+20,y=Math.floor(i/40)*50+20;if(x>400/scale||y>260/scale)continue;visible++;el('circle',{cx:x,cy:y,r:8,fill:'#2563eb'});if(scale>.5){el('text',{x:x+10,y:y+4,'font-size':10},svg,String(i));labels++;}}status.textContent=messages.display003+visible+messages.display004+labels+messages.display005+scale;}
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
