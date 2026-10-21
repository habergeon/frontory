// ref와 DOM 포커스
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({React,createRoot,container}){
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const field=React.useRef(null),clicks=React.useRef(0);const [renders,setRenders]=React.useState(0);return h('div',null,h('input',{ref:field,placeholder:'Focus target'}),button('Focus',()=>field.current.focus()),button('Increment ref (no render)',()=>clicks.current++),button('Render state',()=>setRenders(renders+1)),out({refValueAtLastRender:clicks.current,renders}));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,"ref와 DOM 포커스"),h(Experiment)));
return ()=>root.unmount();
}
