// gsap-step-03: Ease의 시간 곡선
export function mount({container,gsap,animate,React,createRoot,Motion,ScrollTrigger}) {
 const root=document.createElement('section');root.style.cssText='padding:18px;font:14px system-ui;color:#172b46';container.append(root);root.innerHTML="<h3>Ease의 시간 곡선</h3><p>정규화 시간 / 속도 분포</p><button>Run experiment</button> <output aria-live=\"polite\"></output><div class=\"stage\" style=\"position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden\"></div>";
 const button=root.querySelector('button'),out=root.querySelector('output'),stage=/** @type {HTMLDivElement} */ (root.querySelector('.stage'));let dead=false;const stops=[];
 const box=document.createElement('div');box.textContent='GSAP';box.style.cssText='width:64px;height:48px;background:#76d3de;display:grid;place-items:center';stage.append(box);stops.push(()=>gsap.killTweensOf(box));
 stage.innerHTML='';['none','power2.in','power2.out','bounce.out'].forEach(ease=>{const b=document.createElement('div');b.textContent=ease;b.style.cssText='width:90px;background:#76d3de;margin:9px;padding:8px';stage.append(b);stops.push(()=>gsap.killTweensOf(b));button.addEventListener('click',()=>gsap.fromTo(b,{x:0},{x:230,duration:1.5,ease}))});
 return()=>{dead=true;stops.reverse().forEach(fn=>fn());root.remove()};
}
