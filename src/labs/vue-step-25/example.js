// Vue 성능 관찰
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({locale='ko',Vue,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":" renders ","display03":"Select next","display04":"Per-row selected "}:{"display01":"Experiment input","display02":" renders ","display03":"Select next","display04":"Per-row selected "};
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const selected=Vue.ref(1),stable=Vue.ref(true);const Row={props:['item','selected','selectedId'],setup:props=>{let renders=0;return ()=>h('p',(props.selected||props.selectedId===props.item.id?'● ':'○ ')+props.item.title+messages.display02+(++renders));}};return ()=>[button(messages.display03,()=>selected.value=selected.value%3+1),button(messages.display04+stable.value,()=>stable.value=!stable.value),...fixture.map(item=>h(Row,{key:item.id,item,...(stable.value?{selected:selected.value===item.id}:{selectedId:selected.value})}))];
}});
app.mount(container);return ()=>app.unmount();
}
