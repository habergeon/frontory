// reactive와 참조 유지
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const state=Vue.reactive({title:'State'});const detached=state.title;const {title}=Vue.toRefs(state);return ()=>[input(state.title,v=>state.title=v),out({detached,linked:title.value})];
}});
app.mount(container);return ()=>app.unmount();
}
