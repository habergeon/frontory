// Refs and DOM Focus
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({locale='ko',React,createRoot,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Focus target","display03":"Focus","display04":"Increment ref (no render)","display05":"Render state","display06":"Refs and DOM Focus"}:{"display01":"Experiment input","display02":"Focus target","display03":"Focus","display04":"Increment ref (no render)","display05":"Render state","display06":"ref와 DOM 포커스"};
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const field=React.useRef(null),clicks=React.useRef(0);const [renders,setRenders]=React.useState(0);return h('div',null,h('input',{ref:field,placeholder:messages.display02}),button(messages.display03,()=>field.current.focus()),button(messages.display04,()=>clicks.current++),button(messages.display05,()=>setRenders(renders+1)),out({refValueAtLastRender:clicks.current,renders}));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,messages.display06),h(Experiment)));
return ()=>root.unmount();
}
