// gsap-step-21: 중첩 타임라인
export function mount({container,gsap,animate,React,createRoot,Motion,ScrollTrigger}) {
 const root=document.createElement('section');root.style.cssText='padding:18px;font:14px system-ui;color:#172b46';container.append(root);root.innerHTML="<h3>중첩 타임라인</h3><p>합성 / Defaults</p><button>Run experiment</button> <output aria-live=\"polite\"></output><div class=\"stage\" style=\"position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden\"></div>";
 const button=root.querySelector('button'),out=root.querySelector('output'),stage=/** @type {HTMLDivElement} */ (root.querySelector('.stage'));let dead=false;const stops=[];
 const box=document.createElement('div');box.textContent='GSAP';box.style.cssText='width:64px;height:48px;background:#76d3de;display:grid;place-items:center';stage.append(box);stops.push(()=>gsap.killTweensOf(box));
 const parent=gsap.timeline({paused:true,defaults:{duration:.5}});const child=gsap.timeline().to(box,{x:200}).to(box,{rotation:90});parent.add(child).to(box,{opacity:.3});button.onclick=()=>parent.restart();stops.push(()=>parent.kill());
 return()=>{dead=true;stops.reverse().forEach(fn=>fn());root.remove()};
}
