// The One-Way Contract of props
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({locale='ko',Vue,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Child prop: "}:{"display01":"Experiment input","display02":"Child prop: "};
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const title=Vue.ref('State');const Card={props:{title:{type:String,default:'Untitled'}},setup:props=>()=>h('p',messages.display02+props.title)};return ()=>[input(title.value,v=>title.value=v),h(Card,{title:title.value})];
}});
app.mount(container);return ()=>app.unmount();
}
