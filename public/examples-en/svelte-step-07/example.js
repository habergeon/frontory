// Form Bindings and Validation
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({locale='ko',writable,container}){
const messages=locale==='en'?{"display01":"Form Bindings and Validation","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Title","display04":"Submit","display05":"Rejected: blank title"}:{"display01":"폼 바인딩과 검증","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Title","display04":"Submit","display05":"Rejected: blank title"};
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent=messages.display01;
el('p').textContent=messages.display02;
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
let title='';const items=[];const input=field(messages.display03,'',v=>title=v);control(messages.display04,()=>{if(!title.trim()){show(messages.display05);return;}items.push(title.trim());title='';input.value='';show(items);});
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
