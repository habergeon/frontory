// 이벤트와 입력 변환
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const raw=Vue.ref('3');const value=Vue.computed(()=>raw.value.trim()===''?null:Number(raw.value));return ()=>[h('input',{type:'number',value:raw.value,onInput:event=>raw.value=event.target.value,'aria-label':'Number'}),out({raw:raw.value,number:value.value,valid:value.value!==null&&Number.isFinite(value.value)})];
}});
app.mount(container);return ()=>app.unmount();
}
