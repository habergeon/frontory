// 템플릿 ref와 nextTick
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const shown=Vue.ref(false),field=Vue.ref(null);async function reveal(){shown.value=true;await Vue.nextTick();field.value?.focus();}return ()=>[button('Show and focus after nextTick',reveal),button('Remove',()=>shown.value=false),shown.value?h('textarea',{ref:field,'aria-label':'New editor'}):null];
}});
app.mount(container);return ()=>app.unmount();
}
