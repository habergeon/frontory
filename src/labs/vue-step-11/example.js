// 슬롯으로 화면 조합하기
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({locale='ko',Vue,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Detailed ","display03":" · id "}:{"display01":"Experiment input","display02":"Detailed ","display03":" · id "};
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const detail=Vue.ref(false);const List={props:['items'],setup:(props,{slots})=>()=>h('ul',props.items.map(item=>h('li',{key:item.id},slots.item?slots.item({item}):item.title)))};return ()=>[button(messages.display02+detail.value,()=>detail.value=!detail.value),h(List,{items:fixture},{item:({item})=>detail.value?item.title+messages.display03+item.id:item.title})];
}});
app.mount(container);return ()=>app.unmount();
}
