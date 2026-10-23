// Normalized Coordinates and Selection
// Experiment: Pointer position: Canvas center → Top left
// NDC changes approximately from 0,0 to -1,1.
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Normalized Coordinates and Selection","display002":"Pointer position: Canvas center ↔ Top left","display003":"NDC ","display004":"miss","display005":"Click a cube; coordinates are normalized from this canvas bounds"}:{"display001":"정규화 좌표와 선택","display002":"포인터 위치: 캔버스 중앙 ↔ 왼쪽 상단","display003":"NDC ","display004":"miss","display005":"Click a cube; coordinates are normalized from this canvas bounds"};
const TITLE=messages.display001;
const VARIABLE=messages.display002;
  const ui=document.createElement('section');ui.style.cssText='font:13px system-ui;color:#16324a;background:#f8fafc;padding:12px;box-sizing:border-box;max-height:100%;overflow:auto';container.append(ui);
  const heading=document.createElement('strong');heading.textContent=TITLE;ui.append(heading);
  const status=document.createElement('output');status.style.cssText='display:block;margin:8px 0;white-space:pre-wrap';status.setAttribute('aria-live','polite');ui.append(status);
  let changed=false,closed=false;const disposers=[];
  function on(target,type,fn){target.addEventListener(type,fn);disposers.push(()=>target.removeEventListener(type,fn));}
  function button(text,fn){const b=document.createElement('button');b.textContent=text;b.style.margin='4px';on(b,'click',fn);ui.append(b);return b;}
  const toggle=button(VARIABLE,()=>{changed=!changed;toggle.setAttribute('aria-pressed',String(changed));draw();});toggle.setAttribute('aria-pressed','false');
  let frame=0;function loop(fn){let last=performance.now();const tick=now=>{if(closed)return;const dt=Math.min((now-last)/1000,.1);last=now;fn(dt,now/1000);frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);}
  const viewport=document.createElement('div');viewport.style.cssText='width:400px;max-width:100%;height:260px';ui.append(viewport);
  const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');let camera=new THREE.PerspectiveCamera(45,400/260,.1,100);camera.position.set(3,2,6);camera.lookAt(0,0,0);
  const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));viewport.append(renderer.domElement);
  const resources=new Set();function track(resource){resources.add(resource);return resource;}
  function mesh(geometry,material=track(new THREE.MeshStandardMaterial({color:'#2563eb',roughness:.4}))){track(geometry);const object=new THREE.Mesh(geometry,material);scene.add(object);return object;}
  scene.add(new THREE.HemisphereLight(0xffffff,0x64748b,1.5));const keyLight=new THREE.DirectionalLight(0xffffff,3);keyLight.position.set(3,5,4);scene.add(keyLight);
  function resize(){const w=Math.max(1,viewport.clientWidth),h=Math.max(1,viewport.clientHeight);renderer.setSize(w,h);if(camera.isPerspectiveCamera)camera.aspect=w/h;camera.updateProjectionMatrix();}resize();
  let tick=(_dt,_time)=>{},renderEveryFrame=true;
  disposers.push(()=>{renderer.setAnimationLoop(null);resources.forEach(resource=>resource.dispose());scene.traverse(o=>{if(o.isLight&&o.dispose)o.dispose();});renderer.dispose();renderer.forceContextLoss();});
  const cubes=[-1.5,0,1.5].map((x,i)=>{const m=mesh(new THREE.BoxGeometry());m.position.x=x;m.userData.id='cube-'+i;return m;});const raycaster=new THREE.Raycaster();on(renderer.domElement,'pointerdown',e=>{const r=renderer.domElement.getBoundingClientRect(),ndc=new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);scene.updateMatrixWorld(true);raycaster.setFromCamera(ndc,camera);const hit=raycaster.intersectObjects(cubes)[0];cubes.forEach(m=>m.material.color.set(m===hit?.object?'#f97316':'#2563eb'));status.textContent=messages.display003+ndc.toArray().map(v=>v.toFixed(2)).join(', ')+' / '+(hit?.object.userData.id||messages.display004);});function draw(){status.textContent=messages.display005;}
  draw();loop((dt,time)=>{tick(dt,time);if(renderEveryFrame)renderer.render(scene,camera);});
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
