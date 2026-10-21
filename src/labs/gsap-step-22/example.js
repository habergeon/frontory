// gsap-step-22: SVG 속성 제어
export function mount({container,gsap,animate,React,createRoot,Motion,ScrollTrigger}) {
 const root=document.createElement('section');root.style.cssText='padding:18px;font:14px system-ui;color:#172b46';container.append(root);root.innerHTML="<h3>SVG 속성 제어</h3><p>Attr / ViewBox</p><button>Run experiment</button> <output aria-live=\"polite\"></output><div class=\"stage\" style=\"position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden\"></div>";
 const button=root.querySelector('button'),out=root.querySelector('output'),stage=/** @type {HTMLDivElement} */ (root.querySelector('.stage'));let dead=false;const stops=[];
 const box=document.createElement('div');box.textContent='GSAP';box.style.cssText='width:64px;height:48px;background:#76d3de;display:grid;place-items:center';stage.append(box);stops.push(()=>gsap.killTweensOf(box));
 stage.innerHTML='<svg viewBox="0 0 300 140" width="300"><circle cx="40" cy="70" r="20" fill="#168ca0"/></svg>';const circle=stage.querySelector('circle');button.onclick=()=>gsap.fromTo(circle,{attr:{cx:40,r:20}},{attr:{cx:250,r:45},duration:1,yoyo:true,repeat:1});stops.push(()=>gsap.killTweensOf(circle));
 return()=>{dead=true;stops.reverse().forEach(fn=>fn());root.remove()};
}
