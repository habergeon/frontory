// Memoizing Only Measured Paths
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({locale='ko',React,createRoot,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":" renders ","display03":"Parent update ","display04":"memo ","display05":"Memoizing Only Measured Paths"}:{"display01":"Experiment input","display02":" renders ","display03":"Parent update ","display04":"memo ","display05":"측정한 경로만 메모하기"};
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [memo,setMemo]=React.useState(true),[tick,setTick]=React.useState(0);const Row=React.useMemo(()=>function Row({title}){const renders=React.useRef(0);return h('p',null,title+messages.display02+(++renders.current));},[]);const MemoRow=React.useMemo(()=>React.memo(Row),[Row]);return h('div',null,button(messages.display03+tick,()=>setTick(tick+1)),button(messages.display04+memo,()=>setMemo(!memo)),...fixture.map(item=>h(memo?MemoRow:Row,{key:item.id,title:item.title})));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,messages.display05),h(Experiment)));
return ()=>root.unmount();
}
