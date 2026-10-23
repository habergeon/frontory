// emits로 변경 의도 전달
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({locale='ko',Vue,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Reverse"}:{"display01":"Experiment input","display02":"Reverse"};
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const items=Vue.ref(fixture);const Card={props:['item'],emits:['toggle'],setup:(props,{emit})=>()=>button(props.item.title+': '+props.item.done,()=>emit('toggle',props.item.id))};return ()=>[button(messages.display02,()=>items.value=[...items.value].reverse()),...items.value.map(item=>h(Card,{key:item.id,item,onToggle:id=>items.value=items.value.map(row=>row.id===id?{...row,done:!row.done}:row)}))];
}});
app.mount(container);return ()=>app.unmount();
}
