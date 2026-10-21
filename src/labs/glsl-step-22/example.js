// glsl-step-22: real GLSL ShaderMaterial experiment.
export function mount({THREE,container}) {

  container.style.cssText = 'overflow:auto;background:#101827;color:#e5edf8;font:14px system-ui;padding:12px;box-sizing:border-box';
  const title=document.createElement('h3'); title.textContent="Framebuffer와 화면 패스";
  const help=document.createElement('p'); help.textContent="실제 WebGL ShaderMaterial입니다. 조건을 바꾸고 GLSL 소스의 식을 편집하세요. 수치·시간 결과는 장치와 해상도에 따라 달라집니다.";
  const choice=document.createElement('select'); choice.setAttribute('aria-label',"중간 해상도");
  for(const text of ["화면과 같음","가로세로 절반"]) { const o=document.createElement('option');o.textContent=text;choice.append(o); }
  const button=document.createElement('button'); button.textContent='실행 / 다시 초기화';
  const output=document.createElement('pre'); output.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere'; output.setAttribute('aria-live','polite');
  const canvas=document.createElement('canvas'); canvas.width=640;canvas.height=360;canvas.style.cssText='width:100%;height:auto;max-height:360px;object-fit:contain';
  container.append(title,help,choice,button,canvas,output);

  const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
  const scene=new THREE.Scene();const camera=new THREE.OrthographicCamera(-1,1,1,-1,.1,20);camera.position.z=3;
  const pixels=new Uint8Array(16*16*4);for(let y=0;y<16;y++)for(let x=0;x<16;x++){const i=(y*16+x)*4,v=(x+y)%2?255:0;pixels.set([v,80,255-v,255],i);}
  const texture=new THREE.DataTexture(pixels,16,16,THREE.RGBAFormat);texture.magFilter=THREE.NearestFilter;texture.minFilter=THREE.NearestFilter;texture.needsUpdate=true;
  const uniforms={uVariant:{value:0},uTime:{value:0},uResolution:{value:new THREE.Vector2(640,360)},uPointer:{value:new THREE.Vector2(.5,.5)},uTexture:{value:texture},uColor:{value:new THREE.Color(1,.1,.1)}};
  const geometry=new THREE.PlaneGeometry(2,2,64,64);

  const material=new THREE.ShaderMaterial({uniforms,vertexShader:"varying vec2 vUv;varying vec3 vColor;varying vec3 vWorld;varying vec3 vNormal;varying vec3 vView;uniform float uVariant;uniform float uTime;void main(){vUv=uv;vec3 p=position;vWorld=(modelMatrix*vec4(p,1)).xyz;vColor=vec3(1);vNormal=normalize(normalMatrix*normal);vView=(modelViewMatrix*vec4(p,1)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1);}",fragmentShader:"uniform float uVariant;uniform float uTime;uniform vec2 uResolution;uniform vec2 uPointer;uniform sampler2D uTexture;uniform vec3 uColor;varying vec2 vUv;varying vec3 vColor;varying vec3 vWorld;varying vec3 vNormal;varying vec3 vView;void main(){vec4 c=texture2D(uTexture,vUv);gl_FragColor=vec4(vec3(1.)-c.rgb,1);}",side:THREE.DoubleSide,transparent:false,depthTest:true,depthWrite:true});
  const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);

  const target=new THREE.WebGLRenderTarget(640,360);const firstScene=new THREE.Scene();const firstMaterial=new THREE.ShaderMaterial({vertexShader:'varying vec2 p;void main(){p=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1);}',fragmentShader:'varying vec2 p;void main(){gl_FragColor=vec4(vec3(step(.5,fract(p.x*90.))*step(.5,fract(p.y*50.))),1);}'});firstScene.add(new THREE.Mesh(geometry,firstMaterial));uniforms.uTexture.value=target.texture;
  let active=true,frame=0,last=performance.now(),sampleStart=last,frames=0;const pointer=new THREE.Vector2(.5,.5);
  const onPointer=event=>{const rect=canvas.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width,1-(event.clientY-rect.top)/rect.height);};canvas.addEventListener('pointermove',onPointer);
  function apply(){const v=choice.selectedIndex;uniforms.uVariant.value=v;




    target.setSize(v?320:640,v?180:360);


    output.textContent="중간 해상도"+': '+choice.options[v].text+'\n'+"후처리 입력 세부가 줄고 픽셀 처리량도 줄 것으로 예상합니다.";
  }
  renderer.setSize(640,360,false);apply();button.onclick=apply;choice.onchange=apply;
  function tick(now){if(!active)return;const dt=Math.min(.1,(now-last)/1000);last=now;uniforms.uTime.value=now/1000;uniforms.uPointer.value.lerp(pointer,1-Math.exp(-12*dt));
    renderer.setRenderTarget(target);renderer.render(firstScene,camera);renderer.setRenderTarget(null);
    renderer.render(scene,camera);frames++;

    frame=requestAnimationFrame(tick);
  }frame=requestAnimationFrame(tick);
  return ()=>{active=false;cancelAnimationFrame(frame);canvas.removeEventListener('pointermove',onPointer);button.onclick=null;choice.onchange=null;target.dispose();firstMaterial.dispose();geometry.dispose();material.dispose();texture.dispose();renderer.dispose();renderer.forceContextLoss();container.replaceChildren();};
}
