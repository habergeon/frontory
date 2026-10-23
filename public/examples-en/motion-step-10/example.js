// motion-step-10: AnimatePresence Basics
export function mount({locale='ko',container,React,createRoot,Motion}) {
const messages=locale==='en'?{"display001":"AnimatePresence Basics","display002":"Presence / Boundary placement","display003":"Toggle / replay","display004":"Exit keeps DOM alive"}:{"display001":"AnimatePresence 기초","display002":"Presence / 경계 배치","display003":"Toggle / replay","display004":"Exit keeps DOM alive"};
 const h=React.createElement,m=Motion.motion,root=createRoot(container);
 function App(){const [on,setOn]=React.useState(true),[count,setCount]=React.useState(0),[saved,setSaved]=React.useState('Persisted above child');const control=React.useRef(null),scrollRef=React.useRef(null),renders=React.useRef(0);renders.current++;const x=Motion.useMotionValue(0),spring=Motion.useSpring(x,{stiffness:90,damping:15}),derived=Motion.useTransform(x,[0,200],[.3,1]);const {scrollYProgress}=Motion.useScroll({});const reduce=Motion.useReducedMotion();const [scope,sequence]=Motion.useAnimate();const card={padding:18,margin:8,width:110,background:'#89dae4',borderRadius:10};
 React.useEffect(()=>{return()=>{}},[]);
 return h('section',{style:{padding:18,fontFamily:'system-ui'}},h('h3',{},messages.display001),h('p',{},messages.display002),h('button',{ref:control,onClick:()=>{setOn(v=>!v);setCount(c=>c+1)}},'Toggle / replay'),h('div',{style:{minHeight:220,marginTop:20}},h(Motion.AnimatePresence,{},on&&h(m.div,{key:'item',initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,x:100},style:card},'Exit keeps DOM alive'))));}
 root.render(h(App));return()=>root.unmount();
}
