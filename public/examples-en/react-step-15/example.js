// Custom Hook Boundaries
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({locale='ko',React,createRoot,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Toggle second consumer","display03":"Custom Hook Boundaries"}:{"display01":"Experiment input","display02":"Toggle second consumer","display03":"커스텀 Hook의 경계"};
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [visible,setVisible]=React.useState(true),[audit,setAudit]=React.useState(0);const active=React.useRef(0);
const Clock=React.useMemo(()=>{function useTicks(){const [time,setTime]=React.useState(0);React.useEffect(()=>{active.current++;setAudit(active.current);const timer=setInterval(()=>setTime(t=>t+1),500);return ()=>{clearInterval(timer);active.current--;setAudit(active.current);};},[]);return time;}return function Clock(){const ticks=useTicks();return out({ticks});};},[]);
return h('div',null,button(messages.display02,()=>setVisible(!visible)),out({activeSubscriptions:audit}),h(Clock),visible&&h(Clock));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,messages.display03),h(Experiment)));
return ()=>root.unmount();
}
