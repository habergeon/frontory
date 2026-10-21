// JSX와 순수한 렌더
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({React,createRoot,container}){
const h=React.createElement;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);
const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
function Experiment(){
const original=Object.freeze({title:'Pure card',done:false});const [done,setDone]=React.useState(false);
function Card({item}){return h('button',{'aria-pressed':item.done},item.title+(item.done?' ✓':' ○'));}
const item={...original,done};return h('div',null,h(Card,{item}),h(Card,{item}),button('Toggle done',()=>setDone(!done)),out({original,rendered:item}));
}
const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,"JSX와 순수한 렌더"),h(Experiment)));
return ()=>root.unmount();
}
