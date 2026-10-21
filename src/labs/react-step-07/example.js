// 제어 입력과 폼 검증
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({React,createRoot,container}){
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [title,setTitle]=React.useState(''),[items,setItems]=React.useState(fixture),[error,setError]=React.useState('');return h('form',{onSubmit:event=>{event.preventDefault();if(!title.trim()){setError('A non-empty title is required');return;}setItems([...items,{id:Date.now(),title:title.trim(),done:false}]);setTitle('');setError('');}},input(title,setTitle),h('button',{type:'submit'},'Add card'),h('p',{role:'alert'},error),out(items));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,"제어 입력과 폼 검증"),h(Experiment)));
return ()=>root.unmount();
}
