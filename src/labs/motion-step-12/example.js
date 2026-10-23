// motion-step-12: LayoutId 공유
export function mount({locale='ko',container,React,createRoot,Motion}) {
const messages=locale==='en'?{"display001":"Sharing LayoutId","display002":"Visual connection / Separating regions","display003":"Toggle / replay","display004":"Shared"}:{"display001":"LayoutId 공유","display002":"시각적 연결 / 영역 분리","display003":"Toggle / replay","display004":"Shared"};
 const h=React.createElement,m=Motion.motion,root=createRoot(container);
 function App(){const [on,setOn]=React.useState(true),[count,setCount]=React.useState(0),[saved,setSaved]=React.useState('Persisted above child');const control=React.useRef(null),scrollRef=React.useRef(null),renders=React.useRef(0);renders.current++;const x=Motion.useMotionValue(0),spring=Motion.useSpring(x,{stiffness:90,damping:15}),derived=Motion.useTransform(x,[0,200],[.3,1]);const {scrollYProgress}=Motion.useScroll({});const reduce=Motion.useReducedMotion();const [scope,sequence]=Motion.useAnimate();const card={padding:18,margin:8,width:110,background:'#89dae4',borderRadius:10};
 React.useEffect(()=>{return()=>{}},[]);
 return h('section',{style:{padding:18,fontFamily:'system-ui'}},h('h3',{},messages.display001),h('p',{},messages.display002),h('button',{ref:control,onClick:()=>{setOn(v=>!v);setCount(c=>c+1)}},'Toggle / replay'),h('div',{style:{minHeight:220,marginTop:20}},h(Motion.LayoutGroup,{id:'lesson'},h('div',{style:{display:'flex',gap:100}},[false,true].map(v=>h('div',{key:String(v),style:{width:100,height:100,border:'1px dashed'}},on===v&&h(m.div,{layoutId:'selection',style:card},'Shared')))))));}
 root.render(h(App));return()=>root.unmount();
}
