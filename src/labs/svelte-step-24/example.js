// 전환 중 수명 확인
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({writable,container}){
const cleanups=[];
/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}
el('h2').textContent="전환 중 수명 확인";
el('p').textContent='DOM/store harness — App.svelte is the actual compiler experiment.';
const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);
function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}
function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}
const panel=el('p');panel.textContent='Persistent draft panel';let duration=300,visible=true;control('Duration 300 / 0ms',()=>{duration=duration?0:300;show({duration});});control('Toggle transition',()=>{visible=!visible;panel.style.transition='opacity '+duration+'ms';panel.style.opacity=visible?'1':'0';});field('Preserved draft','',value=>show({draft:value,duration}));
return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};
}
