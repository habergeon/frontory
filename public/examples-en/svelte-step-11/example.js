// DOM References and tick
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({locale='ko',writable,container}){
const messages=locale==='en'?{"display01":"DOM References and tick","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Create then focus (DOM harness)","display04":"New editor"}:{"display01":"DOM 참조와 tick","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Create then focus (DOM harness)","display04":"New editor"};
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent=messages.display01;
el('p').textContent=messages.display02;
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
const host=el('div');control(messages.display03,()=>{host.replaceChildren();const input=document.createElement('textarea');input.setAttribute('aria-label',messages.display04);host.append(input);queueMicrotask(()=>{if(input.isConnected)input.focus();});});
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
