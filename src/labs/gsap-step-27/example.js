// gsap-step-27: 실패 경로의 해제
export function mount({container,gsap,animate,React,createRoot,Motion,ScrollTrigger}) {
 const root=document.createElement('section');root.style.cssText='padding:18px;font:14px system-ui;color:#172b46';container.append(root);root.innerHTML="<h3>실패 경로의 해제</h3><p>자원 목록 / 반복 해제</p><button>Run experiment</button> <output aria-live=\"polite\"></output><div class=\"stage\" style=\"position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden\"></div>";
 const button=root.querySelector('button'),out=root.querySelector('output'),stage=/** @type {HTMLDivElement} */ (root.querySelector('.stage'));let dead=false;const stops=[];
 const box=document.createElement('div');box.textContent='GSAP';box.style.cssText='width:64px;height:48px;background:#76d3de;display:grid;place-items:center';stage.append(box);stops.push(()=>gsap.killTweensOf(box));
 let ctx;const dispose=()=>{ctx?.revert();ctx=null;out.textContent='Disposed safely (repeatable)'};button.onclick=()=>{dispose();try{ctx=gsap.context(()=>gsap.to(box,{x:200,duration:2}),root);throw Error('Injected setup failure')}catch(error){dispose();out.textContent=String(error)+'; context reverted'}};stops.push(dispose);
 return()=>{dead=true;stops.reverse().forEach(fn=>fn());root.remove()};
}
