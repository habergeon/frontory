// 목록 key와 조건부 수명
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const visible=Vue.ref(true),remove=Vue.ref(false);const Row={setup(){const note=Vue.ref('');return ()=>input(note.value,v=>note.value=v);}};return ()=>[button('Visible '+visible.value,()=>visible.value=!visible.value),button('Policy '+(remove.value?'v-if':'v-show'),()=>remove.value=!remove.value),remove.value?(visible.value?h(Row):null):h('div',{style:{display:visible.value?'block':'none'}},[h(Row)])];
}});
app.mount(container);return ()=>app.unmount();
}
