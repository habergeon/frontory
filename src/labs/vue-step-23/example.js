// 프레임 값과 UI 값 분리
// Real Vue render functions; templates and SFCs require a compiler.
/** @param {any} context */
export function mount({locale='ko',Vue,container}){
const messages=locale==='en'?{"display01":"Experiment input","display02":"Speed "}:{"display01":"Experiment input","display02":"Speed "};
const h=Vue.h;
const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);
const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':messages.display01});
const out=value=>h('pre',JSON.stringify(value,null,2));
const fixture=[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}];
const app=Vue.createApp({setup(){const message=Vue.ref('');
const speed=Vue.ref(1),canvas=Vue.ref(null);let angle=0,last=0,frame;Vue.onMounted(()=>{const ctx=canvas.value.getContext('2d');const draw=time=>{if(last)angle+=(time-last)/1000*speed.value;last=time;ctx.clearRect(0,0,300,180);ctx.save();ctx.translate(150,90);ctx.rotate(angle);ctx.fillRect(-40,-10,80,20);ctx.restore();frame=requestAnimationFrame(draw);};frame=requestAnimationFrame(draw);});Vue.onUnmounted(()=>cancelAnimationFrame(frame));return ()=>[button(messages.display02+speed.value,()=>speed.value=speed.value===1?2:1),h('canvas',{ref:canvas,width:300,height:180})];
}});
app.mount(container);return ()=>app.unmount();
}
