// 상태 끌어올리기
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({locale='ko',React,createRoot,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Detail: ","display03":"Lifting State Up"}:{"display01":"Experiment input","display02":"Detail: ","display03":"상태 끌어올리기"};
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [items,setItems]=React.useState(fixture),[selectedId,setSelectedId]=React.useState(1);const selected=items.find(item=>item.id===selectedId);return h('div',null,...items.map(item=>button(item.title,()=>setSelectedId(item.id))),h('h3',null,messages.display02+selected.title),input(selected.title,title=>setItems(items.map(item=>item.id===selectedId?{...item,title}:item))));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,messages.display03),h(Experiment)));
return ()=>root.unmount();
}
