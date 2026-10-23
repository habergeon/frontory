// 장면 검사기 통합
// 실험: 실행 횟수: 1회 → 5회
// 수명 관리가 맞으면 이벤트와 활성 루프가 누적되지 않습니다
// 기본 도형 검사기의 선택·재생성·JSON·회전 수명을 실행합니다. glTF 로딩과 미니맵 통합은 외부 캡스톤 확장입니다.
/** @param {any} context */
export function mount(context){
  const {container,THREE,OrbitControls,PIXI,locale='ko'}=context;
const messages=locale==='en'?{"display001":"Integrating the Scene Inspector","display002":"Run count: 1 run ↔ 5 runs","display003":"Rebuild scene","display004":"Select next","display005":"Export state","display006":"Scene builds ","display007":"; selected ","display008":"; one render loop retained"}:{"display001":"장면 검사기 통합","display002":"실행 횟수: 1회 ↔ 5회","display003":"Rebuild scene","display004":"Select next","display005":"Export state","display006":"Scene builds ","display007":"; selected ","display008":"; one render loop retained"};
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
  let objects=[],selected=0,runs=0;function rebuild(){for(let i=0;i<(changed?5:1);i++){objects.forEach(o=>{scene.remove(o);o.geometry.dispose();o.material.dispose();});objects=[-1,1].map(x=>{const o=mesh(new THREE.BoxGeometry());o.position.x=x;return o;});runs++;}draw();}button(messages.display003,rebuild);button(messages.display004,()=>{selected=1-selected;draw();});button(messages.display005,()=>status.textContent=JSON.stringify(objects.map((o,i)=>({id:i,x:o.position.x,selected:i===selected}))));function draw(){objects.forEach((o,i)=>o.material.color.set(i===selected?'#f97316':'#2563eb'));status.textContent=messages.display006+runs+messages.display007+selected+messages.display008;}rebuild();tick=dt=>{if(objects[selected])objects[selected].rotation.y+=dt*.5;};
  draw();loop((dt,time)=>{tick(dt,time);if(renderEveryFrame)renderer.render(scene,camera);});
  return ()=>{closed=true;cancelAnimationFrame(frame);disposers.reverse().forEach(fn=>fn());ui.remove();};
}
