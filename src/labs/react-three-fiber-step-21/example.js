// 인스턴스 선택과 경계
// Real React Three Fiber / Three.js objects; no JSX compilation is needed.
/** @param {any} context */
export function mount({React,createRoot,Fiber,THREE,container}){
const h=React.createElement;

const box=(props={},color='#388cc5')=>h('mesh',props,h('boxGeometry'),h('meshStandardMaterial',{color}));
function Scene({a,b,setA,report}){
const ref=React.useRef();React.useLayoutEffect(()=>{const matrix=new THREE.Matrix4();for(let i=0;i<9;i++)ref.current.setMatrixAt(i,matrix.makeTranslation(i===0&&a?2.2:(i%3-1)*.7,(Math.floor(i/3)-1)*.7,0));ref.current.instanceMatrix.needsUpdate=true;ref.current.computeBoundingSphere();},[a]);return h('instancedMesh',{ref,args:[undefined,undefined,9],onClick:event=>{event.stopPropagation();report({instanceId:event.instanceId,boundsRadius:ref.current.boundingSphere.radius});}},h('boxGeometry',{args:[.45,.45,.45]}),h('meshNormalMaterial'));
}
function Metrics({report}){const gl=Fiber.useThree(s=>s.gl);const last=React.useRef(0);Fiber.useFrame(({clock},delta)=>{if(clock.elapsedTime-last.current>.5){last.current=clock.elapsedTime;report({drawCalls:gl.info.render.calls,geometries:gl.info.memory.geometries,textures:gl.info.memory.textures,frameMs:Number((delta*1000).toFixed(2)),buffer:[gl.domElement.width,gl.domElement.height]});}});return null;}
function App(){const [a,setA]=React.useState(false),[b,setB]=React.useState(false);const detail=React.useRef(null),metrics=React.useRef(null);const report=value=>{if(detail.current)detail.current.textContent=JSON.stringify(value,null,2);};
return h('section',{style:{height:'100%',display:'flex',flexDirection:'column'}},h('h3',null,"인스턴스 선택과 경계"),h('div',null,h('button',{onClick:()=>setA(!a)},"Move instance 0 outside grid",' · ',String(a))),
h('pre',{ref:detail,style:{margin:4}},'Use controls or interact with the scene'),h('pre',{ref:metrics,style:{margin:4}},'Renderer metrics'),
h('div',{style:{height:300,minHeight:220,width:'100%'}},h(Fiber.Canvas,{camera:{position:[0,0,6],fov:50},dpr:1,shadows:false,frameloop:'always',fallback:h('p',null,'WebGL unavailable; use the DOM controls to inspect selection.')},
h('ambientLight',{intensity:1.5}),h('directionalLight',{position:[3,4,5],intensity:2}),
h(React.Suspense,{fallback:null},h(Scene,{a,b,setA,report})),h(Metrics,{report:value=>{if(metrics.current)metrics.current.textContent=JSON.stringify(value);}}))));}
const root=createRoot(container);root.render(h(App));return ()=>{root.unmount();};
}
