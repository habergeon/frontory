// provide와 inject
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({Vue,container}){
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':'Experiment input'});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const key=Symbol('workspace');const Consumer={setup(){const workspace=Vue.inject(key);return ()=>input(workspace.value,v=>workspace.value=v);}};const Inner={setup(){Vue.provide(key,Vue.ref('Nested workspace'));return ()=>h(Consumer);}};const root=Vue.ref('Outer workspace');Vue.provide(key,root);return ()=>[h('p','Outer'),h(Consumer),h('p','Nested'),h(Inner),out(root.value)];
}});
app.mount(container);return ()=>app.unmount();
}
