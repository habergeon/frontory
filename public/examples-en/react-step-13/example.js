// Request Races and Cancellation
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({locale='ko',React,createRoot,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Waiting","display03":" response","display04":"Request A","display05":"Request B","display06":"A latency: ","display07":"Request Races and Cancellation"}:{"display01":"Experiment input","display02":"Waiting","display03":" response","display04":"Request A","display05":"Request B","display06":"A latency: ","display07":"요청 경합과 취소"};
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [query,setQuery]=React.useState('A'),[result,setResult]=React.useState(messages.display02),[slow,setSlow]=React.useState(true);React.useEffect(()=>{let ignore=false;const timer=setTimeout(()=>{if(!ignore)setResult(query+messages.display03);},query==='A'&&slow?800:100);return ()=>{ignore=true;clearTimeout(timer);};},[query,slow]);return h('div',null,button(messages.display04,()=>setQuery('A')),button(messages.display05,()=>setQuery('B')),button(messages.display06+(slow?800:100)+'ms',()=>setSlow(!slow)),out({query,result}));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,messages.display07),h(Experiment)));
return ()=>root.unmount();
}
