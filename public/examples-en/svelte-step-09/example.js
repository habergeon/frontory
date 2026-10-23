// $bindable and the Editor Contract
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({locale='ko',writable,container}){
const messages=locale==='en'?{"display01":"$bindable and the Editor Contract","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Editor A","display04":"Editor B"}:{"display01":"$bindable과 편집기 계약","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Editor A","display04":"Editor B"};
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent=messages.display01;
el('p').textContent=messages.display02;
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
const draft=writable('Shared draft');const a=field(messages.display03,'',v=>draft.set(v)),b=field(messages.display04,'',v=>draft.set(v));cleanups.push(draft.subscribe(value=>{a.value=value;b.value=value;show({parentDraft:value});}));
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
