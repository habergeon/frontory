// motion-step-22: Scroll-Linked Animation
export function mount({locale='ko',container,React,createRoot,Motion}) {
const messages=locale==='en'?{"display001":"Scroll-Linked Animation","display002":"UseScroll / Offset","display003":"Toggle / replay","display004":"Scroll progress","display005":"Scroll this area"}:{"display001":"스크롤 연동","display002":"UseScroll / Offset","display003":"Toggle / replay","display004":"Scroll progress","display005":"Scroll this area"};
 const h=React.createElement,m=Motion.motion,root=createRoot(container);
 function App(){const [on,setOn]=React.useState(true),[count,setCount]=React.useState(0),[saved,setSaved]=React.useState('Persisted above child');const control=React.useRef(null),scrollRef=React.useRef(null),renders=React.useRef(0);renders.current++;const x=Motion.useMotionValue(0),spring=Motion.useSpring(x,{stiffness:90,damping:15}),derived=Motion.useTransform(x,[0,200],[.3,1]);const {scrollYProgress}=Motion.useScroll({container:scrollRef});const reduce=Motion.useReducedMotion();const [scope,sequence]=Motion.useAnimate();const card={padding:18,margin:8,width:110,background:'#89dae4',borderRadius:10};
 React.useEffect(()=>{return()=>{}},[]);
 return h('section',{style:{padding:18,fontFamily:'system-ui'}},h('h3',{},messages.display001),h('p',{},messages.display002),h('button',{ref:control,onClick:()=>{setOn(v=>!v);setCount(c=>c+1)}},'Toggle / replay'),h('div',{style:{minHeight:220,marginTop:20}},h('div',{ref:scrollRef,style:{height:160,overflow:'auto'}},h(m.div,{style:{...card,scaleX:scrollYProgress,transformOrigin:'left',position:'sticky',top:0}},'Scroll progress'),h('div',{style:{height:600}},'Scroll this area'))));}
 root.render(h(App));return()=>root.unmount();
}
