// 회귀 시나리오 만들기
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({React,createRoot,container}){
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [unit,setUnit]=React.useState('A'),[drafts,setDrafts]=React.useState({A:'',B:''}),[report,setReport]=React.useState('');function seed(){setUnit('A');setDrafts({A:'saved A',B:''});setReport('Fixture restored. Edit A → switch B → edit B → switch A.');}return h('div',null,button('Seed saved fixture',seed),button('Switch '+unit,()=>setUnit(unit==='A'?'B':'A')),input(drafts[unit],text=>setDrafts({...drafts,[unit]:text})),button('Check isolation',()=>setReport(drafts.A!==drafts.B?'PASS: distinct drafts':'Both drafts match; edit distinct values first')),out({unit,drafts,report}));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,"회귀 시나리오 만들기"),h(Experiment)));
return ()=>root.unmount();
}
