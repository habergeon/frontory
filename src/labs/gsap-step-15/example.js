// gsap-step-15: MatchMedia 분기
export function mount({container,gsap,animate,React,createRoot,Motion,ScrollTrigger}) {
 const root=document.createElement('section');root.style.cssText='padding:18px;font:14px system-ui;color:#172b46';container.append(root);root.innerHTML="<h3>MatchMedia 분기</h3><p>반응형 모션 / 거리 단위</p><button>Run experiment</button> <output aria-live=\"polite\"></output><div class=\"stage\" style=\"position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden\"></div>";
 const button=root.querySelector('button'),out=root.querySelector('output'),stage=/** @type {HTMLDivElement} */ (root.querySelector('.stage'));let dead=false;const stops=[];
 const box=document.createElement('div');box.textContent='GSAP';box.style.cssText='width:64px;height:48px;background:#76d3de;display:grid;place-items:center';stage.append(box);stops.push(()=>gsap.killTweensOf(box));
 const mm=gsap.matchMedia();mm.add({wide:'(min-width:600px)',reduce:'(prefers-reduced-motion:reduce)'},ctx=>{gsap.to(box,{x:ctx.conditions.wide?220:80,duration:ctx.conditions.reduce?0:1});out.textContent=JSON.stringify(ctx.conditions)});button.onclick=()=>gsap.matchMediaRefresh();stops.push(()=>mm.revert());
 return()=>{dead=true;stops.reverse().forEach(fn=>fn());root.remove()};
}
