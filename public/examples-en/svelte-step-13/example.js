// onMount and Initial Resources
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({locale='ko',writable,container}){
const messages=locale==='en'?{"display01":"onMount and Initial Resources","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Mount / unmount pointer listener"}:{"display01":"onMount와 초기 자원","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":"Mount / unmount pointer listener"};
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent=messages.display01;
el('p').textContent=messages.display02;
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
let enabled=false,events=0;const handler=()=>show({events:++events,activeListeners:1});function toggle(){enabled=!enabled;window.removeEventListener('pointermove',handler);if(enabled)window.addEventListener('pointermove',handler);show({events,activeListeners:enabled?1:0});}control(messages.display03,toggle);cleanups.push(()=>window.removeEventListener('pointermove',handler));toggle();
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
