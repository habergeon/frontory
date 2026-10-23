// Finding Bottlenecks with Profiler
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({locale='ko',React,createRoot,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Rows ","display03":"Measure rerender ","display04":"Profiler callback requires a profiling-enabled React build.","display05":"Row ","display06":"Finding Bottlenecks with Profiler"}:{"display01":"Experiment input","display02":"Rows ","display03":"Measure rerender ","display04":"Profiler callback requires a profiling-enabled React build.","display05":"Row ","display06":"Profiler로 병목 찾기"};
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [count,setCount]=React.useState(100),[tick,setTick]=React.useState(0);const report=React.useRef(null);return h('div',null,button(messages.display02+count,()=>setCount(count===100?1000:100)),button(messages.display03+tick,()=>setTick(tick+1)),h('pre',{ref:report},messages.display04),h(React.Profiler,{id:'rows',onRender:(_id,phase,duration)=>{if(report.current)report.current.textContent=phase+': '+duration.toFixed(2)+' ms';}},h('ul',{style:{maxHeight:200,overflow:'auto'}},...Array.from({length:count},(_,i)=>h('li',{key:i},messages.display05+i)))));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,messages.display06),h(Experiment)));
return ()=>root.unmount();
}
