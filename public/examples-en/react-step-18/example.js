// Component Composition and children
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({locale='ko',React,createRoot,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Toggle toolbar","display03":"Save","display04":"Content supplied as children; panel owns only layout.","display05":"Component Composition and children"}:{"display01":"Experiment input","display02":"Toggle toolbar","display03":"Save","display04":"Content supplied as children; panel owns only layout.","display05":"컴포넌트 합성과 children"};
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const [tools,setTools]=React.useState(false),[saved,setSaved]=React.useState(false);function Panel({toolbar,children}){return h('section',null,h('header',null,toolbar),h('article',null,children));}return h('div',null,button(messages.display02,()=>setTools(!tools)),h(Panel,{toolbar:tools?button(messages.display03,()=>setSaved(true)):null},h('p',null,messages.display04)),out({saved}));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,messages.display05),h(Experiment)));
return ()=>root.unmount();
}
