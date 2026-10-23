// Separating Canvas Loops from Reactivity
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({locale='ko',writable,container}){
const messages=locale==='en'?{"display01":"Separating Canvas Loops from Reactivity","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Speed 1 / 2"}:{"display01":"Canvas 루프와 반응성 분리","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Speed 1 / 2"};
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent=messages.display01;
el('p').textContent=messages.display02;
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
const canvas=el('canvas');canvas.width=300;canvas.height=180;const ctx=canvas.getContext('2d');let speed=1,last=0,angle=0,frame;control(messages.display03,()=>{speed=speed===1?2:1;show({speed});});function draw(time){if(last)angle+=(time-last)/1000*speed;last=time;ctx.clearRect(0,0,300,180);ctx.save();ctx.translate(150,90);ctx.rotate(angle);ctx.fillRect(-40,-10,80,20);ctx.restore();frame=requestAnimationFrame(draw);}frame=requestAnimationFrame(draw);cleanups.push(()=>cancelAnimationFrame(frame));
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
