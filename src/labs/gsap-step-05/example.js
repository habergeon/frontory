// gsap-step-05: Stagger 순서
export function mount({container,gsap,animate,React,createRoot,Motion,ScrollTrigger}) {
 const root=document.createElement('section');root.style.cssText='padding:18px;font:14px system-ui;color:#172b46';container.append(root);root.innerHTML="<h3>Stagger 순서</h3><p>시작 간격 / 순서</p><button>Run experiment</button> <output aria-live=\"polite\"></output><div class=\"stage\" style=\"position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden\"></div>";
 const button=root.querySelector('button'),out=root.querySelector('output'),stage=/** @type {HTMLDivElement} */ (root.querySelector('.stage'));let dead=false;const stops=[];
 const box=document.createElement('div');box.textContent='GSAP';box.style.cssText='width:64px;height:48px;background:#76d3de;display:grid;place-items:center';stage.append(box);stops.push(()=>gsap.killTweensOf(box));
 stage.innerHTML='';for(let i=0;i<7;i++){const b=document.createElement('span');b.textContent=String(i);b.style.cssText='display:inline-block;padding:15px;margin:4px;background:#76d3de';stage.append(b)}let from='start';button.onclick=()=>{from=from==='start'?'center':'start';gsap.fromTo(stage.children,{y:0},{y:70,duration:.5,stagger:{each:.12,from},yoyo:true,repeat:1});out.textContent='Stagger from '+from};stops.push(()=>gsap.killTweensOf(stage.children));
 return()=>{dead=true;stops.reverse().forEach(fn=>fn());root.remove()};
}
