// 요청 경합과 취소
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({React,createRoot,container}){
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [query,setQuery]=React.useState('A'),[result,setResult]=React.useState('Waiting'),[slow,setSlow]=React.useState(true);React.useEffect(()=>{let ignore=false;const timer=setTimeout(()=>{if(!ignore)setResult(query+' response');},query==='A'&&slow?800:100);return ()=>{ignore=true;clearTimeout(timer);};},[query,slow]);return h('div',null,button('Request A',()=>setQuery('A')),button('Request B',()=>setQuery('B')),button('A latency: '+(slow?800:100)+'ms',()=>setSlow(!slow)),out({query,result}));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,"요청 경합과 취소"),h(Experiment)));
return ()=>root.unmount();
}
