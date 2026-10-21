// 얕은 반응성과 외부 객체
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const external=Vue.shallowRef({position:{x:0}});const displayed=Vue.computed(()=>external.value.position.x);return ()=>[button('Mutate nested x',()=>external.value.position.x++),button('triggerRef',()=>Vue.triggerRef(external)),button('Replace object',()=>external.value={position:{x:external.value.position.x+1}}),out({observed:displayed.value,proxy:Vue.isProxy(external.value)})];
}});
app.mount(container);return ()=>app.unmount();
}
