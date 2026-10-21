// keyed each와 카드 정체성
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({writable,container}){
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent="keyed each와 카드 정체성";
el('p').textContent='DOM/store harness — App.svelte is the actual compiler experiment.';
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
const list=el('div');let ids=[1,2,3];const rows=new Map(ids.map(id=>{const row=document.createElement('label');row.textContent='Card '+id;const input=document.createElement('input');input.setAttribute('aria-label','Memo '+id);row.append(input);return [id,row];}));function render(){ids.forEach(id=>list.append(rows.get(id)));}control('Reverse keyed DOM nodes',()=>{ids.reverse();render();});render();
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
