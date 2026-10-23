// React가 선택 상태를 소유하고 Three.js가 canvas를 소유합니다. 느린 A 로딩 중 B를 선택하세요.
export function mount({locale='ko', React, createRoot, THREE, container }) {
  const messages=locale==='en'?{"display001":"idle","display002":"loading ","display003":"ready ","display004":"Slow A","display005":"Fast B"}:{"display001":"idle","display002":"loading ","display003":"ready ","display004":"느린 A","display005":"빠른 B"};
  const h=React.createElement
  function Viewer(){
    const host=React.useRef(null), [selected,setSelected]=React.useState('A'), [status,setStatus]=React.useState(messages.display001)
    React.useEffect(()=>{
      let disposed=false,renderer,geometry,material,observer
      setStatus(messages.display002+selected)
      // 네트워크 대신 지연만 재현합니다. 실제 렌더러는 로딩 완료 후 생성됩니다.
      const timer=setTimeout(()=>{
        if(disposed||!host.current)return
        renderer=new THREE.WebGLRenderer();host.current.append(renderer.domElement)
        const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(50,1,0.1,100);camera.position.z=3
        geometry=selected==='A'?new THREE.BoxGeometry():new THREE.SphereGeometry(0.7,24,16)
        material=new THREE.MeshNormalMaterial();const mesh=new THREE.Mesh(geometry,material);scene.add(mesh)
        const resize=()=>{const w=host.current.clientWidth,h=host.current.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
        observer=new ResizeObserver(resize);observer.observe(host.current);resize()
        renderer.setAnimationLoop(t=>{mesh.rotation.y=t/2000;renderer.render(scene,camera)})
        setStatus(messages.display003+selected)
      },selected==='A'?1200:150)
      return ()=>{disposed=true;clearTimeout(timer);observer?.disconnect();renderer?.setAnimationLoop(null);geometry?.dispose();material?.dispose();renderer?.dispose();renderer?.forceContextLoss();host.current?.replaceChildren()}
    },[selected])
    return h('section',{style:{height:'100%'}},h('button',{onClick:()=>setSelected('A')},messages.display004),h('button',{onClick:()=>setSelected('B')},messages.display005),h('output',null,status),h('div',{ref:host,style:{height:'85%'}}))
  }
  const root=createRoot(container);root.render(h(Viewer));return()=>root.unmount()
}
