// writable과 구독 계약
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({locale='ko',writable,container}){
const messages=locale==='en'?{"display01":"writable and the Subscription Contract","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Store","display04":"Subscribe","display05":"Unsubscribe","display06":"Unsubscribed: edits no longer update output"}:{"display01":"writable과 구독 계약","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Store","display04":"Subscribe","display05":"Unsubscribe","display06":"Unsubscribed: edits no longer update output"};
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent=messages.display01;
el('p').textContent=messages.display02;
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
const store=writable('Store value');let unsub=null;field(messages.display03,'Store value',v=>store.set(v));control(messages.display04,()=>{if(!unsub)unsub=store.subscribe(value=>show({subscribed:true,value}));});control(messages.display05,()=>{unsub?.();unsub=null;show(messages.display06);});cleanups.push(()=>unsub?.());
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
