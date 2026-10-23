// Changing Row Presentation with Snippets
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({locale='ko',writable,container}){
const messages=locale==='en'?{"display01":"Changing Row Presentation with Snippets","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":" / id ","display04":"Toggle compact/detailed"}:{"display01":"snippet으로 행 표시 바꾸기","display02":"DOM/store harness — App.svelte is the actual compiler experiment.","display03":" / id ","display04":"Toggle compact/detailed"};
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent=messages.display01;
el('p').textContent=messages.display02;
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
let detailed=false;function render(){show([{id:1,title:'State'},{id:2,title:'Canvas'}].map(v=>detailed?v.title+messages.display03+v.id:v.title));}control(messages.display04,()=>{detailed=!detailed;render();});render();
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
