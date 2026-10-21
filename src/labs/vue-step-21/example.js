// KeepAlive와 일시 정지
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const visible=Vue.ref(true),cache=Vue.ref(true);const Pane={setup(){const note=Vue.ref(''),ticks=Vue.ref(0);let timer;const start=()=>{clearInterval(timer);timer=setInterval(()=>ticks.value++,500);};const stop=()=>clearInterval(timer);Vue.onMounted(start);Vue.onActivated(start);Vue.onDeactivated(stop);Vue.onUnmounted(stop);return ()=>h('div',[input(note.value,v=>note.value=v),out({ticks:ticks.value})]);}};return ()=>[button('Visible '+visible.value,()=>visible.value=!visible.value),button('KeepAlive '+cache.value,()=>cache.value=!cache.value),cache.value?h(Vue.KeepAlive,null,{default:()=>visible.value?h(Pane):null}):(visible.value?h(Pane):null)];
}});
app.mount(container);return ()=>app.unmount();
}
