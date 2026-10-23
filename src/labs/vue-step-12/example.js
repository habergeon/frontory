// watch의 대상과 시점
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({locale='ko',Vue,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"observed ","display03":"Theme","display04":"Scope ","display05":"all filters"}:{"display01":"Experiment input","display02":"observed ","display03":"Theme","display04":"Scope ","display05":"all filters"};
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const filters=Vue.reactive({query:'',theme:'light'}),broad=Vue.ref(false),logs=Vue.ref([]);Vue.watch(()=>broad.value?JSON.stringify(filters):filters.query,value=>logs.value.push(messages.display02+value));return ()=>[input(filters.query,v=>filters.query=v),button(messages.display03,()=>filters.theme=filters.theme==='light'?'dark':'light'),button(messages.display04+(broad.value?messages.display05:'query'),()=>broad.value=!broad.value),out(logs.value)];
}});
app.mount(container);return ()=>app.unmount();
}
