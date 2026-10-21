// 클래스와 스타일의 상태 표현
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const done=Vue.ref(false),selected=Vue.ref(false);return ()=>[button('Done',()=>done.value=!done.value),button('Select',()=>selected.value=!selected.value),h('button',{'aria-pressed':selected.value,style:{border:selected.value?'3px solid #2563eb':'3px solid transparent',textDecoration:done.value?'line-through':'none'}},'Card '+(done.value?'complete':'incomplete'))];
}});
app.mount(container);return ()=>app.unmount();
}
