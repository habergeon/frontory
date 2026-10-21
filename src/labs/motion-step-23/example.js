// motion-step-23: 화면 진입 애니메이션
export function mount({container,React,createRoot,Motion}) {
 const h=React.createElement,m=Motion.motion,root=createRoot(container);
 function App(){const [on,setOn]=React.useState(true),[count,setCount]=React.useState(0),[saved,setSaved]=React.useState('Persisted above child');const control=React.useRef(null),scrollRef=React.useRef(null),renders=React.useRef(0);renders.current++;const x=Motion.useMotionValue(0),spring=Motion.useSpring(x,{stiffness:90,damping:15}),derived=Motion.useTransform(x,[0,200],[.3,1]);const {scrollYProgress}=Motion.useScroll({});const reduce=Motion.useReducedMotion();const [scope,sequence]=Motion.useAnimate();const card={padding:18,margin:8,width:110,background:'#89dae4',borderRadius:10};
 React.useEffect(()=>{return()=>{}},[]);
 return h('section',{style:{padding:18,fontFamily:'system-ui'}},h('h3',{},"화면 진입 애니메이션"),h('p',{},"InView / Once"),h('button',{ref:control,onClick:()=>{setOn(v=>!v);setCount(c=>c+1)}},'Toggle / replay'),h('div',{style:{minHeight:220,marginTop:20}},h('div',{style:{height:160,overflow:'auto'}},h('div',{style:{height:240}},'Scroll down'),h(m.div,{initial:{opacity:0,x:-50},whileInView:{opacity:1,x:0},viewport:{once:true},style:card},'Once in view'))));}
 root.render(h(App));return()=>root.unmount();
}
