// 공유 저장소의 범위
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const createWorkspace=()=>Vue.reactive({draft:''});const shared=createWorkspace(),isolated=Vue.ref(true),first=createWorkspace(),second=createWorkspace();return ()=>{const a=isolated.value?first:shared,b=isolated.value?second:shared;return [button('Isolated '+isolated.value,()=>isolated.value=!isolated.value),input(a.draft,v=>a.draft=v),input(b.draft,v=>b.draft=v),out({A:a.draft,B:b.draft})];};
}});
app.mount(container);return ()=>app.unmount();
}
