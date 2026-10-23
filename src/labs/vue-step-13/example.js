// 감시 정리와 요청 역전
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({locale='ko',Vue,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Waiting","display03":" response","display04":"Request A","display05":"Request B","display06":"Slow A "}:{"display01":"Experiment input","display02":"Waiting","display03":" response","display04":"Request A","display05":"Request B","display06":"Slow A "};
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const query=Vue.ref('A'),result=Vue.ref(messages.display02),slow=Vue.ref(true);Vue.watch([query,slow],([id,delay],_old,onCleanup)=>{const timer=setTimeout(()=>result.value=id+messages.display03,id==='A'&&delay?800:100);onCleanup(()=>clearTimeout(timer));},{immediate:true});return ()=>[button(messages.display04,()=>query.value='A'),button(messages.display05,()=>query.value='B'),button(messages.display06+slow.value,()=>slow.value=!slow.value),out({requested:query.value,result:result.value})];
}});
app.mount(container);return ()=>app.unmount();
}
