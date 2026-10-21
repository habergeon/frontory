// 공유 runes 모듈
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({writable,container}){
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent="공유 runes 모듈";
el('p').textContent='DOM/store harness — App.svelte is the actual compiler experiment.';
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
function createWorkspace(){return writable({draft:''});}const a=createWorkspace(),b=createWorkspace();field('Workspace A','',draft=>a.set({draft}));field('Workspace B','',draft=>b.set({draft}));let state={A:'',B:''};cleanups.push(a.subscribe(v=>{state.A=v.draft;show(state);}),b.subscribe(v=>{state.B=v.draft;show(state);}));
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
