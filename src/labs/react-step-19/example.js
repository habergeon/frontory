// 비동기 상태를 명시하기
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({locale='ko',React,createRoot,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Response ","display03":"failure","display04":"Load / retry","display05":"Making Asynchronous State Explicit"}:{"display01":"Experiment input","display02":"Response ","display03":"failure","display04":"Load / retry","display05":"비동기 상태를 명시하기"};
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [state,setState]=React.useState({status:'idle',data:[]}),[fail,setFail]=React.useState(true);const timer=React.useRef();React.useEffect(()=>()=>clearTimeout(timer.current),[]);function load(){clearTimeout(timer.current);setState({status:'loading',data:[]});timer.current=setTimeout(()=>setState({status:fail?'error':'success',data:fail?[]:fixture}),350);}return h('div',null,button(messages.display02+(fail?messages.display03:'success'),()=>setFail(!fail)),button(messages.display04,load),out(state));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,messages.display05),h(Experiment)));
return ()=>root.unmount();
}
