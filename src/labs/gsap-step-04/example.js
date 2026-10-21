// gsap-step-04: Transform과 배치
export function mount({container,gsap,animate,React,createRoot,Motion,ScrollTrigger}) {
 const root=document.createElement('section');root.style.cssText='padding:18px;font:14px system-ui;color:#172b46';container.append(root);root.innerHTML="<h3>Transform과 배치</h3><p>Transform / 측정</p><button>Run experiment</button> <output aria-live=\"polite\"></output><div class=\"stage\" style=\"position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden\"></div>";
 const button=root.querySelector('button'),out=root.querySelector('output'),stage=/** @type {HTMLDivElement} */ (root.querySelector('.stage'));let dead=false;const stops=[];
 const box=document.createElement('div');box.textContent='GSAP';box.style.cssText='width:64px;height:48px;background:#76d3de;display:grid;place-items:center';stage.append(box);stops.push(()=>gsap.killTweensOf(box));
 button.onclick=()=>{const before=box.getBoundingClientRect();gsap.to(box,{x:180,rotation:25,duration:1,onComplete:()=>{const after=box.getBoundingClientRect();out.textContent='Layout offsetLeft '+box.offsetLeft+'; visual left '+before.left.toFixed(0)+' → '+after.left.toFixed(0)}})};
 return()=>{dead=true;stops.reverse().forEach(fn=>fn());root.remove()};
}
