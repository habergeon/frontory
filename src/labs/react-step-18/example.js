// 컴포넌트 합성과 children
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({React,createRoot,container}){
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [tools,setTools]=React.useState(false),[saved,setSaved]=React.useState(false);function Panel({toolbar,children}){return h('section',null,h('header',null,toolbar),h('article',null,children));}return h('div',null,button('Toggle toolbar',()=>setTools(!tools)),h(Panel,{toolbar:tools?button('Save',()=>setSaved(true)):null},h('p',null,'Content supplied as children; panel owns only layout.')),out({saved}));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,"컴포넌트 합성과 children"),h(Experiment)));
return ()=>root.unmount();
}
