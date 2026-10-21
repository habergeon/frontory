// 객체와 배열 갱신
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({React,createRoot,container}){
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [items,setItems]=React.useState(fixture),[audit,setAudit]=React.useState('Choose a target');
function toggle(id){const next=items.map(item=>item.id===id?{...item,done:!item.done}:item);setAudit(JSON.stringify(items.map((old,i)=>({id:old.id,sameReference:old===next[i],oldDone:old.done,newDone:next[i].done}))));setItems(next);}
return h('div',null,...items.map(item=>button(item.title+': '+item.done,()=>toggle(item.id))),out(audit));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,"객체와 배열 갱신"),h(Experiment)));
return ()=>root.unmount();
}
