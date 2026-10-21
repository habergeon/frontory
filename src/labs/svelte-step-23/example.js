// 스타일 범위와 접근성
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({writable,container}){
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent="스타일 범위와 접근성";
el('p').textContent='DOM/store harness — App.svelte is the actual compiler experiment.';
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
let selected=false;const b=control('Select card with mouse, Space, or Enter',()=>{selected=!selected;b.setAttribute('aria-pressed',String(selected));b.style.background=selected?'#9bdfff':'';show({selected});});b.setAttribute('aria-pressed','false');
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
