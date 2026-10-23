// glsl-step-17: real GLSL ShaderMaterial experiment.
export function mount({THREE,container,locale='ko'}) {
const messages=locale==='en'?{"display001":"Octaves and Band Limiting","display002":"This uses an actual WebGL ShaderMaterial. Change conditions and edit expressions in the GLSL source. Numerical and timing results vary with the device and resolution. The provided selections change both the octave count 1/5 and the noise interpolation expression. This comparison alone cannot isolate the effect of octave count. Comparing with fixed interpolation is a separate assignment.","display003":"Octave count","display004":"1","display005":"5","display006":"Run / reinitialize","display007":": ","display008":"Expect more detail and computation, with possible aliasing on a small screen."}:{"display001":"옥타브와 대역 제한","display002":"실제 WebGL ShaderMaterial입니다. 조건을 바꾸고 GLSL 소스의 식을 편집하세요. 수치·시간 결과는 장치와 해상도에 따라 달라집니다. 제공된 선택은 octave 수 1/5와 noise 보간식을 함께 바꿉니다. 이 비교만으로 octave 수의 효과를 분리해 판단할 수 없습니다. 보간식을 고정한 비교는 별도 과제입니다.","display003":"octave 수","display004":"1","display005":"5","display006":"실행 / 다시 초기화","display007":": ","display008":"세부와 계산량이 늘지만 작은 화면에서는 aliasing이 생길 수 있다고 예상합니다."};

  container.style.cssText = 'overflow:auto;background:#101827;color:#e5edf8;font:14px system-ui;padding:12px;box-sizing:border-box';
  const title=document.createElement('h3'); title.textContent=messages.display001;
  const help=document.createElement('p'); help.textContent=messages.display002;
  const choice=document.createElement('select'); choice.setAttribute('aria-label',messages.display003);
  for(const text of [messages.display004,messages.display005]) { const o=document.createElement('option');o.textContent=text;choice.append(o); }
  const button=document.createElement('button'); button.textContent=messages.display006;
  const output=document.createElement('pre'); output.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere'; output.setAttribute('aria-live','polite');
  const canvas=document.createElement('canvas'); canvas.width=640;canvas.height=360;canvas.style.cssText='width:100%;height:auto;max-height:360px;object-fit:contain';
  container.append(title,help,choice,button,canvas,output);

  const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
  const scene=new THREE.Scene();const camera=new THREE.OrthographicCamera(-1,1,1,-1,.1,20);camera.position.z=3;
  const pixels=new Uint8Array(16*16*4);for(let y=0;y<16;y++)for(let x=0;x<16;x++){const i=(y*16+x)*4,v=(x+y)%2?255:0;pixels.set([v,80,255-v,255],i);}
  const texture=new THREE.DataTexture(pixels,16,16,THREE.RGBAFormat);texture.magFilter=THREE.NearestFilter;texture.minFilter=THREE.NearestFilter;texture.needsUpdate=true;
  const uniforms={uVariant:{value:0},uTime:{value:0},uResolution:{value:new THREE.Vector2(640,360)},uPointer:{value:new THREE.Vector2(.5,.5)},uTexture:{value:texture},uColor:{value:new THREE.Color(1,.1,.1)}};
  const geometry=new THREE.PlaneGeometry(2,2,64,64);
  
  const material=new THREE.ShaderMaterial({uniforms,vertexShader:"varying vec2 vUv;varying vec3 vColor;varying vec3 vWorld;varying vec3 vNormal;varying vec3 vView;uniform float uVariant;uniform float uTime;void main(){vUv=uv;vec3 p=position;vWorld=(modelMatrix*vec4(p,1)).xyz;vColor=vec3(1);vNormal=normalize(normalMatrix*normal);vView=(modelViewMatrix*vec4(p,1)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1);}",fragmentShader:"uniform float uVariant;uniform float uTime;uniform vec2 uResolution;uniform vec2 uPointer;uniform sampler2D uTexture;uniform vec3 uColor;varying vec2 vUv;varying vec3 vColor;varying vec3 vWorld;varying vec3 vNormal;varying vec3 vView;float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 s=mix(f,f*f*(3.-2.*f),uVariant);return mix(mix(hash(i),hash(i+vec2(1,0)),s.x),mix(hash(i+vec2(0,1)),hash(i+1.),s.x),s.y);}void main(){float n=0.,a=.5,f=3.;for(int i=0;i<5;i++){if(float(i)>=mix(1.,5.,uVariant))break;n+=a*noise(vUv*f);f*=2.;a*=.5;}gl_FragColor=vec4(vec3(n),1);}",side:THREE.DoubleSide,transparent:false,depthTest:true,depthWrite:true});
  const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
  
  
  let active=true,frame=0,last=performance.now(),sampleStart=last,frames=0;const pointer=new THREE.Vector2(.5,.5);
  const onPointer=event=>{const rect=canvas.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width,1-(event.clientY-rect.top)/rect.height);};canvas.addEventListener('pointermove',onPointer);
  function apply(){const v=choice.selectedIndex;uniforms.uVariant.value=v;
    
    
    
    
    
    
    
    output.textContent=messages.display003+messages.display007+choice.options[v].text+'\n'+messages.display008;
  }
  renderer.setSize(640,360,false);apply();button.onclick=apply;choice.onchange=apply;
  function tick(now){if(!active)return;const dt=Math.min(.1,(now-last)/1000);last=now;uniforms.uTime.value=now/1000;uniforms.uPointer.value.lerp(pointer,1-Math.exp(-12*dt));
    
    renderer.render(scene,camera);frames++;
    
    frame=requestAnimationFrame(tick);
  }frame=requestAnimationFrame(tick);
  return ()=>{active=false;cancelAnimationFrame(frame);canvas.removeEventListener('pointermove',onPointer);button.onclick=null;choice.onchange=null;geometry.dispose();material.dispose();texture.dispose();renderer.dispose();renderer.forceContextLoss();container.replaceChildren();};
}
