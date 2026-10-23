// Regression Scenarios for the Same Contract
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({locale='ko',writable,container}){
const messages=locale==='en'?{"display01":"Regression Scenarios for the Same Contract","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Draft","display04":"Seed fixture","display05":"Switch","display06":"Check isolation"}:{"display01":"동일 계약의 회귀 시나리오","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Draft","display04":"Seed fixture","display05":"Switch","display06":"Check isolation"};
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent=messages.display01;
el('p').textContent=messages.display02;
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
const drafts={A:'',B:''};let unit='A';const input=field(messages.display03,'',v=>{drafts[unit]=v;show({unit,drafts});});control(messages.display04,()=>{drafts.A='Saved A';drafts.B='';unit='A';input.value=drafts.A;show(drafts);});control(messages.display05,()=>{unit=unit==='A'?'B':'A';input.value=drafts[unit];show({unit,drafts});});control(messages.display06,()=>show({pass:drafts.A!==drafts.B,drafts}));
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
