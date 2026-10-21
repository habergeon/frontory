// 목록의 key와 정체성
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({React,createRoot,container}){
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [reverse,setReverse]=React.useState(false),[stable,setStable]=React.useState(true);
const Row=React.useMemo(()=>function Row({item}){const [note,setNote]=React.useState('');return h('label',null,item.id+' '+item.title,input(note,setNote));},[]);
const items=reverse?[...fixture].reverse():fixture;return h('div',null,button('Reverse',()=>setReverse(!reverse)),button('Key: '+(stable?'id':'index'),()=>setStable(!stable)),...items.map((item,i)=>h(Row,{key:stable?item.id:i,item})));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,"목록의 key와 정체성"),h(Experiment)));
return ()=>root.unmount();
}
