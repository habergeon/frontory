// $props와 변경 콜백
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({writable,container}){
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent="$props와 변경 콜백";
el('p').textContent='DOM/store harness — App.svelte is the actual compiler experiment.';
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
let items=[{id:1,title:'State',done:false},{id:2,title:'Canvas',done:false}];const list=el('div');function toggle(id){items=items.map(v=>v.id===id?{...v,done:!v.done}:v);render();}function render(){list.replaceChildren();items.forEach(item=>{const b=document.createElement('button');b.textContent=item.id+' '+item.title+': '+item.done;b.onclick=()=>toggle(item.id);list.append(b);});}control('Reverse',()=>{items.reverse();render();});render();
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
