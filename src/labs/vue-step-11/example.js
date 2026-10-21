// 슬롯으로 화면 조합하기
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const detail=Vue.ref(false);const List={props:['items'],setup:(props,{slots})=>()=>h('ul',props.items.map(item=>h('li',{key:item.id},slots.item?slots.item({item}):item.title)))};return ()=>[button('Detailed '+detail.value,()=>detail.value=!detail.value),h(List,{items:fixture},{item:({item})=>detail.value?item.title+' · id '+item.id:item.title})];
}});
app.mount(container);return ()=>app.unmount();
}
