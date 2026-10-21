// Composition API 통합 검토
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const unit=Vue.ref('A'),drafts=Vue.reactive({A:'',B:''}),live=Vue.ref(0),audit=Vue.ref([]);Vue.watch(unit,(id,_old,onCleanup)=>{live.value++;audit.value.push('start '+id+' / active '+live.value);const timer=setInterval(()=>{},1000);onCleanup(()=>{clearInterval(timer);live.value--;});},{immediate:true});return ()=>[button('Switch '+unit.value,()=>unit.value=unit.value==='A'?'B':'A'),input(drafts[unit.value],v=>drafts[unit.value]=v),out({drafts,active:live.value,audit:audit.value})];
}});
app.mount(container);return ()=>app.unmount();
}
