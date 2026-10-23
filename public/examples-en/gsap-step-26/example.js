// gsap-step-26: Motion Tokens
export function mount({locale='ko',container,gsap,animate,React,createRoot,Motion,ScrollTrigger}) {
const messages=locale==='en'?{"display001":"<h3>Motion Tokens</h3><p>Meaning / Impact of Changes</p><button>Run experiment</button> <output aria-live=\"polite\"></output><div class=\"stage\" style=\"position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden\"></div>","display002":"GSAP","display003":" token = ","display004":" seconds"}:{"display001":"<h3>모션 토큰</h3><p>의미 / 변경 영향</p><button>Run experiment</button> <output aria-live=\"polite\"></output><div class=\"stage\" style=\"position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden\"></div>","display002":"GSAP","display003":" token = ","display004":" seconds"};
 const root=document.createElement('section');root.style.cssText='padding:18px;font:14px system-ui;color:#172b46';container.append(root);root.innerHTML=messages.display001;
 const button=root.querySelector('button'),out=root.querySelector('output'),stage=/** @type {HTMLDivElement} */ (root.querySelector('.stage'));let dead=false;const stops=[];
 const box=document.createElement('div');box.textContent='GSAP';box.style.cssText='width:64px;height:48px;background:#76d3de;display:grid;place-items:center';stage.append(box);stops.push(()=>gsap.killTweensOf(box));
 const tokens={feedback:.15,navigation:.5,emphasis:1.2};let i=0;button.onclick=()=>{const name=Object.keys(tokens)[i++%3];gsap.fromTo(box,{x:0},{x:220,duration:tokens[name],ease:'power2.out'});out.textContent=name+' token = '+tokens[name]+' seconds'};
 return()=>{dead=true;stops.reverse().forEach(fn=>fn());root.remove()};
}
