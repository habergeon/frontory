// 세 프레임워크 비교 준비
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({writable,container}){
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent="세 프레임워크 비교 준비";
el('p').textContent='DOM/store harness — App.svelte is the actual compiler experiment.';
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Canvas',done:false}];const store=writable(fixture);cleanups.push(store.subscribe(items=>show({total:items.length,done:items.filter(v=>v.done).length,items})));fixture.forEach(item=>control('Toggle id '+item.id,()=>store.update(items=>items.map(v=>v.id===item.id?{...v,done:!v.done}:v))));
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
