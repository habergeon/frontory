// 컴포넌트 v-model
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const draft=Vue.ref('Shared draft');const Editor={props:['modelValue'],emits:['update:modelValue'],setup:(props,{emit})=>()=>input(props.modelValue,value=>emit('update:modelValue',value))};return ()=>[h(Editor,{modelValue:draft.value,'onUpdate:modelValue':value=>draft.value=value}),h(Editor,{modelValue:draft.value,'onUpdate:modelValue':value=>draft.value=value}),out(draft.value)];
}});
app.mount(container);return ()=>app.unmount();
}
