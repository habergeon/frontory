// 저장 복원과 데이터 검증
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const raw=Vue.ref(JSON.stringify({A:'Saved draft'})),drafts=Vue.ref({});function restore(){try{const value=JSON.parse(raw.value);if(!value||typeof value!=='object'||Object.values(value).some(v=>typeof v!=='string'))throw Error('Expected draft map');drafts.value=value;message.value='Restored';}catch(error){drafts.value={};message.value=error.message;}}return ()=>[input(raw.value,v=>raw.value=v),button('Restore',restore),button('Corrupt',()=>raw.value='{broken'),out({drafts:drafts.value,message:message.value})];
}});
app.mount(container);return ()=>app.unmount();
}
