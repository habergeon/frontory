// 텍스처 입력과 갱신
// Real React Three Fiber / Three.js objects; no JSX compilation is needed.
/** @param {any} context */
export function mount({React,createRoot,Fiber,THREE,container}){
const h=React.createElement;

const box=(props={},color='#388cc5')=>h('mesh',props,h('boxGeometry'),h('meshStandardMaterial',{color}));
function Scene({a,b,setA,report}){
const texture=React.useMemo(()=>{const size=a?1024:256,canvas=document.createElement('canvas');canvas.width=canvas.height=size;const ctx=canvas.getContext('2d');for(let y=0;y<16;y++)for(let x=0;x<16;x++){ctx.fillStyle=(x+y)%2?'#1b3550':'#f0b252';ctx.fillRect(x*size/16,y*size/16,size/16,size/16);}const value=new THREE.CanvasTexture(canvas);value.colorSpace=THREE.SRGBColorSpace;report({size,baseRGBABytes:size*size*4});return value;},[a]);React.useEffect(()=>()=>texture.dispose(),[texture]);return h('mesh',null,h('boxGeometry'),h('meshBasicMaterial',{map:texture}));
}
function Metrics({report}){const gl=Fiber.useThree(s=>s.gl);const last=React.useRef(0);Fiber.useFrame(({clock},delta)=>{if(clock.elapsedTime-last.current>.5){last.current=clock.elapsedTime;report({drawCalls:gl.info.render.calls,geometries:gl.info.memory.geometries,textures:gl.info.memory.textures,frameMs:Number((delta*1000).toFixed(2)),buffer:[gl.domElement.width,gl.domElement.height]});}});return null;}
function App(){const [a,setA]=React.useState(false),[b,setB]=React.useState(false);const detail=React.useRef(null),metrics=React.useRef(null);const report=value=>{if(detail.current)detail.current.textContent=JSON.stringify(value,null,2);};
return h('section',{style:{height:'100%',display:'flex',flexDirection:'column'}},h('h3',null,"텍스처 입력과 갱신"),h('div',null,h('button',{onClick:()=>setA(!a)},"Texture 256 / 1024",' · ',String(a))),
h('pre',{ref:detail,style:{margin:4}},'Use controls or interact with the scene'),h('pre',{ref:metrics,style:{margin:4}},'Renderer metrics'),
h('div',{style:{height:300,minHeight:220,width:'100%'}},h(Fiber.Canvas,{camera:{position:[0,0,6],fov:50},dpr:1,shadows:false,frameloop:'always',fallback:h('p',null,'WebGL unavailable; use the DOM controls to inspect selection.')},
h('ambientLight',{intensity:1.5}),h('directionalLight',{position:[3,4,5],intensity:2}),
h(React.Suspense,{fallback:null},h(Scene,{a,b,setA,report})),h(Metrics,{report:value=>{if(metrics.current)metrics.current.textContent=JSON.stringify(value);}}))));}
const root=createRoot(container);root.render(h(App));return ()=>{root.unmount();};
}
