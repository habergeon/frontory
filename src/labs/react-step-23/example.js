// 긴 목록의 표시 범위
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({React,createRoot,container}){
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [size,setSize]=React.useState(50),[page,setPage]=React.useState(0);const total=1000,start=page*size;return h('div',null,button('Page size '+size,()=>{setSize(size===50?1000:50);setPage(0);}),button('Previous',()=>setPage(Math.max(0,page-1))),button('Next',()=>setPage(Math.min(Math.ceil(total/size)-1,page+1))),out({total,visible:Math.min(size,total-start),page:page+1}),h('ul',{style:{maxHeight:220,overflow:'auto'}},...Array.from({length:Math.min(size,total-start)},(_,i)=>h('li',{key:start+i},'Card '+(start+i)))));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,"긴 목록의 표시 범위"),h(Experiment)));
return ()=>root.unmount();
}
