// 동작 회귀와 저장 경합 검증
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({locale='ko',Vue,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Switch ","display03":"Delay "}:{"display01":"Experiment input","display02":"Switch ","display03":"Delay "};
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const unit=Vue.ref('A'),drafts=Vue.reactive({A:'',B:''}),saved=Vue.reactive({A:'',B:''}),delay=Vue.ref(600);const timers=new Map();Vue.watch(()=>[unit.value,drafts[unit.value]],([id,text])=>{clearTimeout(timers.get(id));timers.set(id,setTimeout(()=>saved[id]=text,delay.value));});Vue.onUnmounted(()=>timers.forEach(clearTimeout));return ()=>[button(messages.display02+unit.value,()=>unit.value=unit.value==='A'?'B':'A'),input(drafts[unit.value],v=>drafts[unit.value]=v),button(messages.display03+delay.value,()=>delay.value=delay.value===600?100:600),out({drafts,saved})];
}});
app.mount(container);return ()=>app.unmount();
}
