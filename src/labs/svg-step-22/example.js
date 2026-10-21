// SVG 파일 내보내기
// 실험: 스타일 위치: 페이지 CSS만 → SVG 내부 style
// 독립 파일에서도 지정한 색과 선이 유지됩니다
// 독립 SVG 소스를 입력란에 출력합니다. 파일 저장은 복사한 소스를 .svg 파일로 저장하세요.
const TITLE="SVG 파일 내보내기";
const VARIABLE="스타일 위치: 페이지 CSS만 ↔ SVG 내부 style";
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
  const preview=document.createElement('textarea');preview.style.cssText='width:95%;height:75px';ui.append(preview);function draw(){svg.replaceChildren();el('style',{},svg,changed?'.export-shape{fill:#2563eb;stroke:#f97316;stroke-width:8}':'');el('circle',{class:'export-shape',cx:200,cy:130,r:80});}button('Serialize standalone SVG',()=>{const copy=svg.cloneNode(true);const source=new XMLSerializer().serializeToString(copy);preview.value=source;status.textContent='Standalone SVG source; internal styles survive export.';});
  draw();
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
