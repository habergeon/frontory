// SFC와 템플릿 바인딩
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const disabled=Vue.ref(false);return ()=>[button('Toggle disabled',()=>disabled.value=!disabled.value),h('button',{disabled:disabled.value,onClick:()=>message.value='Action received'},'Bound action'),out({disabled:disabled.value,message:message.value})];
}});
app.mount(container);return ()=>app.unmount();
}
