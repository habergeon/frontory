// An embedded JSON model exercises asynchronous loading without network access.
export function mount({ THREE, container }) {
  const button=document.createElement('button');button.textContent='Load malformed model'
  const retry=document.createElement('button');retry.textContent='Load valid model'
  const status=document.createElement('p');status.setAttribute('role','status');container.append(button,retry,status)
  const renderer=new THREE.WebGLRenderer({antialias:true});container.append(renderer.domElement)
  const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7')
  const camera=new THREE.PerspectiveCamera(45,1,.1,100);camera.position.set(0,2,7);camera.lookAt(0,0,0)
  scene.add(new THREE.HemisphereLight(0xffffff,0x334455,3))
  const objects=[new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshStandardMaterial({color:'#3179bf',roughness:.2})),new THREE.Mesh(new THREE.SphereGeometry(.7,24,16),new THREE.MeshStandardMaterial({color:'#26836c',roughness:.9}))]
  objects.forEach((m,i)=>{m.position.x=(i-.5)*2.4;scene.add(m)})
  const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();let closed=false,request=0
  const render=()=>renderer.render(scene,camera)
  const load=async fail=>{const id=++request;status.textContent='Loading embedded JSON…';try{const raw=await Promise.resolve(fail?'{ broken':'{"color":"#8b5cc7"}');const data=JSON.parse(raw);if(closed||id!==request)return;objects[0].material.color.set(data.color);status.textContent='Loaded. Click a shape to select.';render()}catch(error){if(!closed&&id===request)status.textContent='Load failed: invalid JSON. Existing scene remains usable; retry valid model.'}}
  button.onclick=()=>load(true);retry.onclick=()=>load(false)
  renderer.domElement.onclick=e=>{const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(objects)[0];objects.forEach(m=>m.material.emissive.set(m===hit?.object?'#5d2808':'#000000'));status.textContent=hit?`Selected ${hit.object===objects[0]?'box':'sphere'} · geometry and material are separate`:'Selection cleared';render()}
  const resize=()=>{const w=Math.max(1,container.clientWidth),h=Math.max(1,container.clientHeight-95);renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();render()};const observer=new ResizeObserver(resize);observer.observe(container);resize();load(false)
  return()=>{closed=true;observer.disconnect();objects.forEach(m=>{m.geometry.dispose();m.material.dispose()});renderer.dispose();renderer.forceContextLoss();container.replaceChildren()}
}
