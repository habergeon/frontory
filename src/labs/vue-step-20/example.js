// 비동기 컴포넌트와 로딩 UI
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const fail=Vue.ref(false),show=Vue.ref(false);let timer;Vue.onUnmounted(()=>clearTimeout(timer));const Async=Vue.defineAsyncComponent({loader:()=>new Promise((resolve,reject)=>{timer=setTimeout(()=>fail.value?reject(Error('Module unavailable')):resolve({render:()=>h('p','Loaded editor')}),700);}),delay:0,loadingComponent:{render:()=>h('p','Loading component…')},errorComponent:{render:()=>h('p',{role:'alert'},'Component load failed')},onError(_error,_retry,failLoad){failLoad();}});return ()=>[button('Fail '+fail.value,()=>fail.value=!fail.value),button('Mount lazy component',()=>show.value=true),show.value?h(Async):null];
}});
app.mount(container);return ()=>app.unmount();
}
