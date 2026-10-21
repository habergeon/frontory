// gsap-step-09: 기본 스크롤 연결
export function mount({container,gsap,animate,React,createRoot,Motion,ScrollTrigger}) {
 const root=document.createElement('section');root.style.cssText='padding:18px;font:14px system-ui;color:#172b46';container.append(root);root.innerHTML="<h3>기본 스크롤 연결</h3><p>진행도 / 수동 연결</p><button>Run experiment</button> <output aria-live=\"polite\"></output><div class=\"stage\" style=\"position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden\"></div>";
 const button=root.querySelector('button'),out=root.querySelector('output'),stage=/** @type {HTMLDivElement} */ (root.querySelector('.stage'));let dead=false;const stops=[];
 const box=document.createElement('div');box.textContent='GSAP';box.style.cssText='width:64px;height:48px;background:#76d3de;display:grid;place-items:center';stage.append(box);stops.push(()=>gsap.killTweensOf(box));
 stage.style.height='180px';stage.style.overflow='auto';const spacer=document.createElement('div');spacer.style.height='700px';stage.append(spacer);box.style.position='sticky';box.style.top='0';const tween=gsap.to(box,{x:220,rotation:180,paused:true});stage.addEventListener('scroll',()=>{const p=stage.scrollTop/(stage.scrollHeight-stage.clientHeight);tween.progress(p);out.textContent=p.toFixed(2)});button.onclick=()=>stage.scrollTo({top:stage.scrollHeight,behavior:'smooth'});stops.push(()=>tween.kill());
 return()=>{dead=true;stops.reverse().forEach(fn=>fn());root.remove()};
}
