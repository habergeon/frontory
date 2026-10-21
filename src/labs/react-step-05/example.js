// 조건부 화면과 빈 상태
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({React,createRoot,container}){
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [query,setQuery]=React.useState('');const matches=fixture.filter(item=>item.title.toLowerCase().includes(query.toLowerCase()));return h('div',null,input(query,setQuery),matches.length>0?h('ul',null,...matches.map(item=>h('li',{key:item.id},item.title))):h('p',{role:'status'},'No matching cards'),button('Reset',()=>setQuery('')));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,"조건부 화면과 빈 상태"),h(Experiment)));
return ()=>root.unmount();
}
