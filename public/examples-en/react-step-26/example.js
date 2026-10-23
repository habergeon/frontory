// Creating Regression Scenarios
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({locale='ko',React,createRoot,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Fixture restored. Edit A → switch B → edit B → switch A.","display03":"Seed saved fixture","display04":"Switch ","display05":"Check isolation","display06":"PASS: distinct drafts","display07":"Both drafts match; edit distinct values first","display08":"Creating Regression Scenarios"}:{"display01":"Experiment input","display02":"Fixture restored. Edit A → switch B → edit B → switch A.","display03":"Seed saved fixture","display04":"Switch ","display05":"Check isolation","display06":"PASS: distinct drafts","display07":"Both drafts match; edit distinct values first","display08":"회귀 시나리오 만들기"};
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [unit,setUnit]=React.useState('A'),[drafts,setDrafts]=React.useState({A:'',B:''}),[report,setReport]=React.useState('');function seed(){setUnit('A');setDrafts({A:'saved A',B:''});setReport(messages.display02);}return h('div',null,button(messages.display03,seed),button(messages.display04+unit,()=>setUnit(unit==='A'?'B':'A')),input(drafts[unit],text=>setDrafts({...drafts,[unit]:text})),button(messages.display05,()=>setReport(drafts.A!==drafts.B?messages.display06:messages.display07)),out({unit,drafts,report}));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,messages.display08),h(Experiment)));
return ()=>root.unmount();
}
