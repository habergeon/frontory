// 필기 저장과 초기 복원
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({React,createRoot,container}){
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const key='react-step16-draft';const load=()=>{try{const value=JSON.parse(localStorage.getItem(key)||JSON.stringify(''));return {text:typeof value==='string'?value:'',error:typeof value==='string'?'':'Expected string'};}catch{return {text:'',error:'Invalid JSON; recovered empty draft'};}};
const [draft,setDraft]=React.useState(load);React.useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(draft.text));}catch{}},[draft.text]);return h('div',null,input(draft.text,text=>setDraft({text,error:''})),out(draft.error),button('Inject broken JSON and restore',()=>{try{localStorage.setItem(key,'{broken');setDraft(load());}catch{setDraft({text:'',error:'Storage unavailable'});}}));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,"필기 저장과 초기 복원"),h(Experiment)));
return ()=>root.unmount();
}
