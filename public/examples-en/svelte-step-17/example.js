// Connecting Workspaces with Context
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({locale='ko',writable,container}){
const messages=locale==='en'?{"display01":"Connecting Workspaces with Context","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Outer provider","display04":"Nearest inner provider"}:{"display01":"Context로 작업공간 연결","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Outer provider","display04":"Nearest inner provider"};
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent=messages.display01;
el('p').textContent=messages.display02;
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
const contexts=[{draft:'Outer'},{draft:'Inner'}];field(messages.display03,contexts[0].draft,v=>{contexts[0].draft=v;show(contexts);});field(messages.display04,contexts[1].draft,v=>{contexts[1].draft=v;show(contexts);});show(contexts);
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
