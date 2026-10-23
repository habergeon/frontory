// Asynchronous Scene Replacement
// Experiment: Completion order: Request order → Reverse order
// A result that does not match the current request does not overwrite the scene.
// Reproduces reverse completion order and disposal of stale results with delayed procedural geometry. Network model loading itself is not included.
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Asynchronous Scene Replacement","display002":"Completion order: Request order ↔ Reverse order","display003":"Requested ","display004":"Committed current request ","display005":"; token ","display006":"Request A then B","display007":"Synthetic async geometry loader; toggle completion order then request A/B"}:{"display001":"비동기 장면 교체","display002":"완료 순서: 요청순 ↔ 역순","display003":"Requested ","display004":"Committed current request ","display005":"; token ","display006":"Request A then B","display007":"Synthetic async geometry loader; toggle completion order then request A/B"};
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
  let generation=0,current=null;function request(id,delay){const token=++generation;status.textContent=messages.display003+id;const timer=setTimeout(()=>{const geometry=track(new THREE.BoxGeometry(id===1?1:2,1,1)),material=track(new THREE.MeshStandardMaterial({color:id===1?'#2563eb':'#f97316'})),result=new THREE.Mesh(geometry,material);if(closed||token!==generation){geometry.dispose();material.dispose();return;}if(current){scene.remove(current);current.geometry.dispose();current.material.dispose();resources.delete(current.geometry);resources.delete(current.material);}current=result;scene.add(result);status.textContent=messages.display004+id+messages.display005+token;},delay);disposers.push(()=>clearTimeout(timer));}button(messages.display006,()=>{request(1,changed?800:150);request(2,changed?150:800);});function draw(){status.textContent=messages.display007;}
  draw();loop((dt,time)=>{tick(dt,time);if(renderEveryFrame)renderer.render(scene,camera);});
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
