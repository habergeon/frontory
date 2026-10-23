// Pure Computation with computed
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({locale='ko',Vue,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Theme "}:{"display01":"Experiment input","display02":"Theme "};
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const query=Vue.ref(''),theme=Vue.ref('light');let evaluations=0;const matches=Vue.computed(()=>{evaluations++;return fixture.filter(item=>item.title.includes(query.value));});return ()=>[input(query.value,v=>query.value=v),button(messages.display02+theme.value,()=>theme.value=theme.value==='light'?'dark':'light'),out({matches:matches.value,evaluations,theme:theme.value})];
}});
app.mount(container);return ()=>app.unmount();
}
