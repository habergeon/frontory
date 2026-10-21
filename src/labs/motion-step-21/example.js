// motion-step-21: Transform과 Spring 연결
export function mount({container,React,createRoot,Motion}) {
 const h=React.createElement,m=Motion.motion,root=createRoot(container);
 function App(){const [on,setOn]=React.useState(true),[count,setCount]=React.useState(0),[saved,setSaved]=React.useState('Persisted above child');const control=React.useRef(null),scrollRef=React.useRef(null),renders=React.useRef(0);renders.current++;const x=Motion.useMotionValue(0),spring=Motion.useSpring(x,{stiffness:90,damping:15}),derived=Motion.useTransform(x,[0,200],[.3,1]);const {scrollYProgress}=Motion.useScroll({});const reduce=Motion.useReducedMotion();const [scope,sequence]=Motion.useAnimate();const card={padding:18,margin:8,width:110,background:'#89dae4',borderRadius:10};
 React.useEffect(()=>{const a=Motion.animate(x,[0,200,0],{duration:3,repeat:Infinity});return()=>a.stop()},[]);
 return h('section',{style:{padding:18,fontFamily:'system-ui'}},h('h3',{},"Transform과 Spring 연결"),h('p',{},"파생 값 / 추종 값"),h('button',{ref:control,onClick:()=>{setOn(v=>!v);setCount(c=>c+1)}},'Toggle / replay'),h('div',{style:{minHeight:220,marginTop:20}},h(m.div,{style:{...card,x:spring,opacity:derived}},'Derived + spring')));}
 root.render(h(App));return()=>root.unmount();
}
