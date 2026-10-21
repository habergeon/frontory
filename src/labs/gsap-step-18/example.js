// gsap-step-18: 키보드 단계 이동
export function mount({container,gsap,animate,React,createRoot,Motion,ScrollTrigger}) {
 const root=document.createElement('section');root.style.cssText='padding:18px;font:14px system-ui;color:#172b46';container.append(root);root.innerHTML="<h3>키보드 단계 이동</h3><p>동등한 조작 / 포커스</p><button>Run experiment</button> <output aria-live=\"polite\"></output><div class=\"stage\" style=\"position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden\"></div>";
 const button=root.querySelector('button'),out=root.querySelector('output'),stage=/** @type {HTMLDivElement} */ (root.querySelector('.stage'));let dead=false;const stops=[];
 const box=document.createElement('div');box.textContent='GSAP';box.style.cssText='width:64px;height:48px;background:#76d3de;display:grid;place-items:center';stage.append(box);stops.push(()=>gsap.killTweensOf(box));
 let index=0;const move=d=>{index=Math.max(0,Math.min(4,index+d));gsap.to(box,{x:index*50,duration:.3,overwrite:true});out.textContent='Step '+(index+1)+' / 5'};button.textContent='Next step';button.onclick=()=>move(1);root.tabIndex=0;root.onkeydown=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}};
 return()=>{dead=true;stops.reverse().forEach(fn=>fn());root.remove()};
}
