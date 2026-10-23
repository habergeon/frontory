// 통합 장면의 성능 실험
// Real React Three Fiber / Three.js objects; no JSX compilation is needed.
/** @param {any} context */
export function mount({locale='ko',React,createRoot,Fiber,THREE,container}){
const messages=locale==='en'?{"display01":"Performance Experiments for the Integrated Scene","display02":"Instance count 100 / 1000","display03":"Use controls or interact with the scene","display04":"Renderer metrics","display05":"WebGL unavailable; use the DOM controls to inspect the example settings."}:{"display01":"통합 장면의 성능 실험","display02":"Instance count 100 / 1000","display03":"Use controls or interact with the scene","display04":"Renderer metrics","display05":"WebGL을 사용할 수 없습니다. DOM 컨트롤로 예제 설정을 확인하세요."};
const h=React.createElement;

const box=(props={},color='#388cc5')=>h('mesh',props,h('boxGeometry'),h('meshStandardMaterial',{color}));
function Scene({a,b,setA,report}){
const count=a?1000:100,ref=React.useRef();React.useLayoutEffect(()=>{const matrix=new THREE.Matrix4();for(let i=0;i<count;i++)ref.current.setMatrixAt(i,matrix.makeTranslation((i%32-15.5)*.12,(Math.floor(i/32)-15.5)*.12,0));ref.current.instanceMatrix.needsUpdate=true;ref.current.computeBoundingSphere();},[count]);return h('instancedMesh',{key:count,ref,args:[undefined,undefined,count],onClick:event=>report({selectedInstance:event.instanceId,count})},h('boxGeometry',{args:[.09,.09,.09]}),h('meshNormalMaterial'));
}
function Metrics({report}){const gl=Fiber.useThree(s=>s.gl);const last=React.useRef(0);Fiber.useFrame(({clock},delta)=>{if(clock.elapsedTime-last.current>.5){last.current=clock.elapsedTime;report({drawCalls:gl.info.render.calls,geometries:gl.info.memory.geometries,textures:gl.info.memory.textures,frameMs:Number((delta*1000).toFixed(2)),buffer:[gl.domElement.width,gl.domElement.height]});}});return null;}
function App(){const [a,setA]=React.useState(false),[b,setB]=React.useState(false);const detail=React.useRef(null),metrics=React.useRef(null);const report=value=>{if(detail.current)detail.current.textContent=JSON.stringify(value,null,2);};
return h('section',{style:{height:'100%',display:'flex',flexDirection:'column'}},h('h3',null,messages.display01),h('div',null,h('button',{onClick:()=>setA(!a)},messages.display02,' · ',String(a))),
h('pre',{ref:detail,style:{margin:4}},messages.display03),h('pre',{ref:metrics,style:{margin:4}},messages.display04),
h('div',{style:{height:300,minHeight:220,width:'100%'}},h(Fiber.Canvas,{camera:{position:[0,0,6],fov:50},dpr:1,shadows:false,frameloop:'always',fallback:h('p',null,messages.display05)},
h('ambientLight',{intensity:1.5}),h('directionalLight',{position:[3,4,5],intensity:2}),
h(React.Suspense,{fallback:null},h(Scene,{a,b,setA,report})),h(Metrics,{report:value=>{if(metrics.current)metrics.current.textContent=JSON.stringify(value);}}))));}
const root=createRoot(container);root.render(h(App));return ()=>{root.unmount();};
}
