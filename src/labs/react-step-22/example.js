// 측정한 경로만 메모하기
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({React,createRoot,container}){
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [memo,setMemo]=React.useState(true),[tick,setTick]=React.useState(0);const Row=React.useMemo(()=>function Row({title}){const renders=React.useRef(0);return h('p',null,title+' renders '+(++renders.current));},[]);const MemoRow=React.useMemo(()=>React.memo(Row),[Row]);return h('div',null,button('Parent update '+tick,()=>setTick(tick+1)),button('memo '+memo,()=>setMemo(!memo)),...fixture.map(item=>h(memo?MemoRow:Row,{key:item.id,title:item.title})));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,"측정한 경로만 메모하기"),h(Experiment)));
return ()=>root.unmount();
}
