// 이벤트와 상태 스냅샷
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({React,createRoot,container}){
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [count,setCount]=React.useState(0);return h('div',null,out(count),button('Snapshot +1 three times',()=>{setCount(count+1);setCount(count+1);setCount(count+1);}),button('Updater +1 three times',()=>{setCount(c=>c+1);setCount(c=>c+1);setCount(c=>c+1);}),button('Reset',()=>setCount(0)));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,"이벤트와 상태 스냅샷"),h(Experiment)));
return ()=>root.unmount();
}
