// 비동기 컴포넌트와 로딩 UI
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({locale='ko',Vue,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Loaded editor","display03":"Loading component…","display04":"Component load failed","display05":"Fail ","display06":"Mount lazy component"}:{"display01":"Experiment input","display02":"Loaded editor","display03":"Loading component…","display04":"Component load failed","display05":"Fail ","display06":"Mount lazy component"};
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const fail=Vue.ref(false),show=Vue.ref(false);let timer;Vue.onUnmounted(()=>clearTimeout(timer));const Async=Vue.defineAsyncComponent({loader:()=>new Promise((resolve,reject)=>{timer=setTimeout(()=>fail.value?reject(Error('Module unavailable')):resolve({render:()=>h('p',messages.display02)}),700);}),delay:0,loadingComponent:{render:()=>h('p',messages.display03)},errorComponent:{render:()=>h('p',{role:'alert'},messages.display04)},onError(_error,_retry,failLoad){failLoad();}});return ()=>[button(messages.display05+fail.value,()=>fail.value=!fail.value),button(messages.display06,()=>show.value=true),show.value?h(Async):null];
}});
app.mount(container);return ()=>app.unmount();
}
