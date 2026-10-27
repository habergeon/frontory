# Three.js · 22 렌더 타깃과 미니맵

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 자원 수명·접근성·측정 · 편집 가능한 예제 · 저장 ID: `threejs-step-22`

## 목표와 학습 후 역량

- 갱신 on에서 두 화면이 같은 X를 반영하고 off에서는 미니맵만 멈춥니다.
- 메인에서는 큐브 옆면이 보이고 미니맵에서는 윗면이 보입니다. 128×128 타깃을 오른쪽 아래에 표시합니다.

## 선수 지식

선수 단원: 02, 03, 10. 이번 실험에서 이어갑니다.

## 핵심 개념과 설명

### 화면 대신 텍스처에 그리기

setRenderTarget(target)은 이후 렌더 목적지를 바꿉니다. texture를 사용하는 재질이 다른 패스에서 결과를 표시합니다.

### 두 카메라와 표시 패스

overlay 평면은 별도 scene의 orthographic 카메라로 그립니다. 같은 타깃을 그리면서 그 texture를 샘플링하지 않습니다.

## 실습 준비

사이트에서 독립 HTML을 편집·실행합니다. Three.js 0.186.1을 사용하며 별도 설치·서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 02·03·10의 렌더러·카메라·텍스처를 연결합니다. 시작은 타깃 갱신이 꺼져 있습니다. 켜고 적용해 미니맵을 채우세요. X=1.5를 적용한 뒤 갱신을 끄고 X=-1.5를 적용합니다. 메인은 움직이지만 미니맵은 옛 위치에 남습니다. 다시 갱신을 켜서 동기화하세요.
2. 미니맵 표시를 켜고 적용하세요. 메인 카메라는 (5,5,7), 미니 카메라는 (0,8,0)에서 원점을 봅니다. miniCamera.up=(0,0,-1)로 위쪽 방향을 고정합니다. X=-1.5→1.5를 비교하며 같은 큐브의 시점 차이를 관찰하세요.
3. 시작은 상태 복원이 꺼져 있어 메인 화면이 비거나 이전 결과에 남습니다. 켜고 적용하세요. helper는 진입할 때 target·active face·mipmap level·viewport·scissor·scissorTest를 저장하고 finally에서 돌려놓습니다. null로 고정 복원하면 이미 다른 타깃을 쓰던 호출자를 망가뜨릴 수 있습니다.

## 관찰할 변수

| 변수                      | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                                                |
| ------------------------- | --------- | --------- | -------------------------------------------------------------------- |
| 화면 대신 텍스처에 그리기 | starter   | solution  | 갱신 on에서 두 화면이 같은 X를 반영하고 off에서는 미니맵만 멈춥니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 갱신 on에서 두 화면이 같은 X를 반영하고 off에서는 미니맵만 멈춥니다.
- [ ] 메인에서는 큐브 옆면이 보이고 미니맵에서는 윗면이 보입니다. 128×128 타깃을 오른쪽 아래에 표시합니다.

## 자가 점검

1. 메인만 움직일 때 어떤 패스가 멈췄나요?
2. 같은 카메라를 두 화면에서 쓰면 무엇이 달라지지 않나요?
3. 이전 타깃이 null이 아니라면 어떻게 복원하나요?

## 공식 참고

- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-22/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 독립 HTML을 편집·실행합니다. 실제 관찰을 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-22/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

02·03·10의 렌더러·카메라·텍스처를 연결합니다. 시작은 타깃 갱신이 꺼져 있습니다. 켜고 적용해 미니맵을 채우세요. X=1.5를 적용한 뒤 갱신을 끄고 X=-1.5를 적용합니다. 메인은 움직이지만 미니맵은 옛 위치에 남습니다. 다시 갱신을 켜서 동기화하세요.

### 선수 단원

- `threejs-step-02`
- `threejs-step-03`
- `threejs-step-10`

### 화면 대신 텍스처에 그리기

02·03·10의 렌더러·카메라·텍스처를 연결합니다. 시작은 타깃 갱신이 꺼져 있습니다. 켜고 적용해 미니맵을 채우세요. X=1.5를 적용한 뒤 갱신을 끄고 X=-1.5를 적용합니다. 메인은 움직이지만 미니맵은 옛 위치에 남습니다. 다시 갱신을 켜서 동기화하세요.

**예상 결과**

갱신 on에서 두 화면이 같은 X를 반영하고 off에서는 미니맵만 멈춥니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>텍스처로 렌더링</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>텍스처로 렌더링</h1>
    <p>
      같은 장면을 메인 perspective 카메라와 위에서 보는 orthographic 카메라로
      그립니다. 미니맵은 render target의 texture를 평면에 붙입니다. 타깃 갱신이
      꺼져 있으면 미니맵만 이전 상태에 남습니다. 복원이 꺼져 있으면 화면 대신
      타깃에 후속 패스가 그려집니다.
    </p>
    <div class="controls">
      <label
        >빨강 큐브 X<input
          id="value"
          type="number"
          value="0"
          min="-2"
          max="2"
          step="0.25" /></label
      ><label><input id="update" type="checkbox" />타깃 갱신</label
      ><label><input id="overlay" type="checkbox" checked />미니맵 표시</label
      ><label><input id="restore" type="checkbox" checked />상태 복원</label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="텍스처로 렌더링"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');
      const camera=new THREE.PerspectiveCamera(45,1,.1,100);
      const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set(),ownedInstances=new Set();
      const events=new AbortController();let disposed=false,frames=0;
      const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});
      camera.position.set(5,5,7);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(1,1,1);ownedGeometry.add(geometry);const redMaterial=new THREE.MeshBasicMaterial({color:'#ef4444'}),blueMaterial=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedMaterial.add(redMaterial);ownedMaterial.add(blueMaterial);const red=new THREE.Mesh(geometry,redMaterial),blue=new THREE.Mesh(geometry,blueMaterial);red.position.x=-1.5;blue.position.set(1.5,0,-1.5);scene.add(red,blue);
      const miniCamera=new THREE.OrthographicCamera(-4,4,4,-4,.1,30);miniCamera.position.set(0,8,0);miniCamera.up.set(0,0,-1);miniCamera.lookAt(0,0,0);
      const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);
      const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;
      const planeGeometry=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(planeGeometry);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(planeGeometry,planeMaterial));
      let beforeState,afterState,stats={calls:0,triangles:0};
      function state(){return {target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};}
      function restoreState(s){renderer.setRenderTarget(s.target,s.face,s.mip);renderer.setViewport(s.viewport);renderer.setScissor(s.scissor);renderer.setScissorTest(s.test);}
      function renderMap(){const saved=state();beforeState=saved;try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissor(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{if(document.querySelector('#restore').checked)restoreState(saved);afterState=state();}}

      function draw(){if(disposed||!stage.clientWidth)return;renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.setScissor(0,0,canvas.width,canvas.height);renderer.setScissorTest(false);renderer.info.autoReset=false;renderer.info.reset();if(document.querySelector('#update').checked)renderMap();renderer.render(scene,camera);if(document.querySelector('#overlay').checked&&renderer.getRenderTarget()===null){const saved=state();try{const size=Math.min(112,Math.floor(canvas.width*.35));renderer.setViewport(canvas.width-size-8,8,size,size);renderer.setScissor(canvas.width-size-8,8,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;restoreState(saved);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};renderer.info.autoReset=true;frames++;output.textContent='target: '+(renderer.getRenderTarget()===null?'screen':'texture')+' / viewport: '+renderer.getViewport(new THREE.Vector4()).toArray()+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;red.position.x=Number(input.value);draw();});red.position.x=Number(document.querySelector('#value').value);

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='정리 완료';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 미니맵이 비면 타깃 갱신 체크를 읽으세요.
- 갱신 off에서 X를 바꿔 메인과 미니맵의 차이를 보세요.
- 갱신을 다시 켜고 적용하면 target.texture에 새 시점이 들어갑니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

setRenderTarget(target)은 이후 렌더 목적지를 바꿉니다. texture를 사용하는 재질이 다른 패스에서 결과를 표시합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>텍스처로 렌더링</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>텍스처로 렌더링</h1>
    <p>
      같은 장면을 메인 perspective 카메라와 위에서 보는 orthographic 카메라로
      그립니다. 미니맵은 render target의 texture를 평면에 붙입니다. 타깃 갱신이
      꺼져 있으면 미니맵만 이전 상태에 남습니다. 복원이 꺼져 있으면 화면 대신
      타깃에 후속 패스가 그려집니다.
    </p>
    <div class="controls">
      <label
        >빨강 큐브 X<input
          id="value"
          type="number"
          value="0"
          min="-2"
          max="2"
          step="0.25" /></label
      ><label><input id="update" type="checkbox" checked />타깃 갱신</label
      ><label><input id="overlay" type="checkbox" checked />미니맵 표시</label
      ><label><input id="restore" type="checkbox" checked />상태 복원</label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="텍스처로 렌더링"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');
      const camera=new THREE.PerspectiveCamera(45,1,.1,100);
      const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set(),ownedInstances=new Set();
      const events=new AbortController();let disposed=false,frames=0;
      const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});
      camera.position.set(5,5,7);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(1,1,1);ownedGeometry.add(geometry);const redMaterial=new THREE.MeshBasicMaterial({color:'#ef4444'}),blueMaterial=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedMaterial.add(redMaterial);ownedMaterial.add(blueMaterial);const red=new THREE.Mesh(geometry,redMaterial),blue=new THREE.Mesh(geometry,blueMaterial);red.position.x=-1.5;blue.position.set(1.5,0,-1.5);scene.add(red,blue);
      const miniCamera=new THREE.OrthographicCamera(-4,4,4,-4,.1,30);miniCamera.position.set(0,8,0);miniCamera.up.set(0,0,-1);miniCamera.lookAt(0,0,0);
      const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);
      const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;
      const planeGeometry=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(planeGeometry);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(planeGeometry,planeMaterial));
      let beforeState,afterState,stats={calls:0,triangles:0};
      function state(){return {target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};}
      function restoreState(s){renderer.setRenderTarget(s.target,s.face,s.mip);renderer.setViewport(s.viewport);renderer.setScissor(s.scissor);renderer.setScissorTest(s.test);}
      function renderMap(){const saved=state();beforeState=saved;try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissor(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{if(document.querySelector('#restore').checked)restoreState(saved);afterState=state();}}

      function draw(){if(disposed||!stage.clientWidth)return;renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.setScissor(0,0,canvas.width,canvas.height);renderer.setScissorTest(false);renderer.info.autoReset=false;renderer.info.reset();if(document.querySelector('#update').checked)renderMap();renderer.render(scene,camera);if(document.querySelector('#overlay').checked&&renderer.getRenderTarget()===null){const saved=state();try{const size=Math.min(112,Math.floor(canvas.width*.35));renderer.setViewport(canvas.width-size-8,8,size,size);renderer.setScissor(canvas.width-size-8,8,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;restoreState(saved);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};renderer.info.autoReset=true;frames++;output.textContent='target: '+(renderer.getRenderTarget()===null?'screen':'texture')+' / viewport: '+renderer.getViewport(new THREE.Vector4()).toArray()+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;red.position.x=Number(input.value);draw();});red.position.x=Number(document.querySelector('#value').value);

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='정리 완료';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 메인만 움직일 때 어떤 패스가 멈췄나요?

### 두 카메라와 표시 패스

미니맵 표시를 켜고 적용하세요. 메인 카메라는 (5,5,7), 미니 카메라는 (0,8,0)에서 원점을 봅니다. miniCamera.up=(0,0,-1)로 위쪽 방향을 고정합니다. X=-1.5→1.5를 비교하며 같은 큐브의 시점 차이를 관찰하세요. 파랑은 (1.5,0,-1.5)에 고정해 목표 X에서 빨강과 완전히 겹치지 않습니다.

**예상 결과**

메인에서는 큐브 옆면이 보이고 미니맵에서는 윗면이 보입니다. 128×128 타깃을 오른쪽 아래에 표시합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>다른 카메라의 미니맵</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>다른 카메라의 미니맵</h1>
    <p>
      같은 장면을 메인 perspective 카메라와 위에서 보는 orthographic 카메라로
      그립니다. 미니맵은 render target의 texture를 평면에 붙입니다. 타깃 갱신이
      꺼져 있으면 미니맵만 이전 상태에 남습니다. 복원이 꺼져 있으면 화면 대신
      타깃에 후속 패스가 그려집니다.
    </p>
    <div class="controls">
      <label
        >빨강 큐브 X<input
          id="value"
          type="number"
          value="0"
          min="-2"
          max="2"
          step="0.25" /></label
      ><label><input id="update" type="checkbox" checked />타깃 갱신</label
      ><label><input id="overlay" type="checkbox" />미니맵 표시</label
      ><label><input id="restore" type="checkbox" checked />상태 복원</label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="다른 카메라의 미니맵"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');
      const camera=new THREE.PerspectiveCamera(45,1,.1,100);
      const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set(),ownedInstances=new Set();
      const events=new AbortController();let disposed=false,frames=0;
      const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});
      camera.position.set(5,5,7);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(1,1,1);ownedGeometry.add(geometry);const redMaterial=new THREE.MeshBasicMaterial({color:'#ef4444'}),blueMaterial=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedMaterial.add(redMaterial);ownedMaterial.add(blueMaterial);const red=new THREE.Mesh(geometry,redMaterial),blue=new THREE.Mesh(geometry,blueMaterial);red.position.x=-1.5;blue.position.set(1.5,0,-1.5);scene.add(red,blue);
      const miniCamera=new THREE.OrthographicCamera(-4,4,4,-4,.1,30);miniCamera.position.set(0,8,0);miniCamera.up.set(0,0,-1);miniCamera.lookAt(0,0,0);
      const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);
      const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;
      const planeGeometry=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(planeGeometry);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(planeGeometry,planeMaterial));
      let beforeState,afterState,stats={calls:0,triangles:0};
      function state(){return {target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};}
      function restoreState(s){renderer.setRenderTarget(s.target,s.face,s.mip);renderer.setViewport(s.viewport);renderer.setScissor(s.scissor);renderer.setScissorTest(s.test);}
      function renderMap(){const saved=state();beforeState=saved;try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissor(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{if(document.querySelector('#restore').checked)restoreState(saved);afterState=state();}}

      function draw(){if(disposed||!stage.clientWidth)return;renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.setScissor(0,0,canvas.width,canvas.height);renderer.setScissorTest(false);renderer.info.autoReset=false;renderer.info.reset();if(document.querySelector('#update').checked)renderMap();renderer.render(scene,camera);if(document.querySelector('#overlay').checked&&renderer.getRenderTarget()===null){const saved=state();try{const size=Math.min(112,Math.floor(canvas.width*.35));renderer.setViewport(canvas.width-size-8,8,size,size);renderer.setScissor(canvas.width-size-8,8,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;restoreState(saved);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};renderer.info.autoReset=true;frames++;output.textContent='target: '+(renderer.getRenderTarget()===null?'screen':'texture')+' / viewport: '+renderer.getViewport(new THREE.Vector4()).toArray()+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;red.position.x=Number(input.value);draw();});red.position.x=Number(document.querySelector('#value').value);

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='정리 완료';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 미니맵 표시를 체크하세요.
- 미니 카메라는 Y=8에서 내려다보며 up은 -Z입니다.
- X=-1.5와 1.5를 적용해 같은 큐브의 옆면과 윗면을 비교하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

overlay 평면은 별도 scene의 orthographic 카메라로 그립니다. 같은 타깃을 그리면서 그 texture를 샘플링하지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>다른 카메라의 미니맵</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>다른 카메라의 미니맵</h1>
    <p>
      같은 장면을 메인 perspective 카메라와 위에서 보는 orthographic 카메라로
      그립니다. 미니맵은 render target의 texture를 평면에 붙입니다. 타깃 갱신이
      꺼져 있으면 미니맵만 이전 상태에 남습니다. 복원이 꺼져 있으면 화면 대신
      타깃에 후속 패스가 그려집니다.
    </p>
    <div class="controls">
      <label
        >빨강 큐브 X<input
          id="value"
          type="number"
          value="0"
          min="-2"
          max="2"
          step="0.25" /></label
      ><label><input id="update" type="checkbox" checked />타깃 갱신</label
      ><label><input id="overlay" type="checkbox" checked />미니맵 표시</label
      ><label><input id="restore" type="checkbox" checked />상태 복원</label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="다른 카메라의 미니맵"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');
      const camera=new THREE.PerspectiveCamera(45,1,.1,100);
      const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set(),ownedInstances=new Set();
      const events=new AbortController();let disposed=false,frames=0;
      const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});
      camera.position.set(5,5,7);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(1,1,1);ownedGeometry.add(geometry);const redMaterial=new THREE.MeshBasicMaterial({color:'#ef4444'}),blueMaterial=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedMaterial.add(redMaterial);ownedMaterial.add(blueMaterial);const red=new THREE.Mesh(geometry,redMaterial),blue=new THREE.Mesh(geometry,blueMaterial);red.position.x=-1.5;blue.position.set(1.5,0,-1.5);scene.add(red,blue);
      const miniCamera=new THREE.OrthographicCamera(-4,4,4,-4,.1,30);miniCamera.position.set(0,8,0);miniCamera.up.set(0,0,-1);miniCamera.lookAt(0,0,0);
      const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);
      const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;
      const planeGeometry=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(planeGeometry);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(planeGeometry,planeMaterial));
      let beforeState,afterState,stats={calls:0,triangles:0};
      function state(){return {target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};}
      function restoreState(s){renderer.setRenderTarget(s.target,s.face,s.mip);renderer.setViewport(s.viewport);renderer.setScissor(s.scissor);renderer.setScissorTest(s.test);}
      function renderMap(){const saved=state();beforeState=saved;try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissor(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{if(document.querySelector('#restore').checked)restoreState(saved);afterState=state();}}

      function draw(){if(disposed||!stage.clientWidth)return;renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.setScissor(0,0,canvas.width,canvas.height);renderer.setScissorTest(false);renderer.info.autoReset=false;renderer.info.reset();if(document.querySelector('#update').checked)renderMap();renderer.render(scene,camera);if(document.querySelector('#overlay').checked&&renderer.getRenderTarget()===null){const saved=state();try{const size=Math.min(112,Math.floor(canvas.width*.35));renderer.setViewport(canvas.width-size-8,8,size,size);renderer.setScissor(canvas.width-size-8,8,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;restoreState(saved);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};renderer.info.autoReset=true;frames++;output.textContent='target: '+(renderer.getRenderTarget()===null?'screen':'texture')+' / viewport: '+renderer.getViewport(new THREE.Vector4()).toArray()+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;red.position.x=Number(input.value);draw();});red.position.x=Number(document.querySelector('#value').value);

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='정리 완료';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 같은 카메라를 두 화면에서 쓰면 무엇이 달라지지 않나요?

### target·viewport·scissor 복원

시작은 상태 복원이 꺼져 있어 메인 화면이 비거나 이전 결과에 남습니다. 켜고 적용하세요. helper는 진입할 때 target·active face·mipmap level·viewport·scissor·scissorTest를 저장하고 finally에서 돌려놓습니다. null로 고정 복원하면 이미 다른 타깃을 쓰던 호출자를 망가뜨릴 수 있습니다.

**예상 결과**

복원 on 뒤 target=screen이며 메인과 미니맵이 다시 갱신됩니다. helper 전후 상태가 같습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>호출자의 렌더 상태 복원</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>호출자의 렌더 상태 복원</h1>
    <p>
      같은 장면을 메인 perspective 카메라와 위에서 보는 orthographic 카메라로
      그립니다. 미니맵은 render target의 texture를 평면에 붙입니다. 타깃 갱신이
      꺼져 있으면 미니맵만 이전 상태에 남습니다. 복원이 꺼져 있으면 화면 대신
      타깃에 후속 패스가 그려집니다.
    </p>
    <div class="controls">
      <label
        >빨강 큐브 X<input
          id="value"
          type="number"
          value="0"
          min="-2"
          max="2"
          step="0.25" /></label
      ><label><input id="update" type="checkbox" checked />타깃 갱신</label
      ><label><input id="overlay" type="checkbox" checked />미니맵 표시</label
      ><label><input id="restore" type="checkbox" />상태 복원</label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="호출자의 렌더 상태 복원"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');
      const camera=new THREE.PerspectiveCamera(45,1,.1,100);
      const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set(),ownedInstances=new Set();
      const events=new AbortController();let disposed=false,frames=0;
      const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});
      camera.position.set(5,5,7);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(1,1,1);ownedGeometry.add(geometry);const redMaterial=new THREE.MeshBasicMaterial({color:'#ef4444'}),blueMaterial=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedMaterial.add(redMaterial);ownedMaterial.add(blueMaterial);const red=new THREE.Mesh(geometry,redMaterial),blue=new THREE.Mesh(geometry,blueMaterial);red.position.x=-1.5;blue.position.set(1.5,0,-1.5);scene.add(red,blue);
      const miniCamera=new THREE.OrthographicCamera(-4,4,4,-4,.1,30);miniCamera.position.set(0,8,0);miniCamera.up.set(0,0,-1);miniCamera.lookAt(0,0,0);
      const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);
      const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;
      const planeGeometry=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(planeGeometry);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(planeGeometry,planeMaterial));
      let beforeState,afterState,stats={calls:0,triangles:0};
      function state(){return {target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};}
      function restoreState(s){renderer.setRenderTarget(s.target,s.face,s.mip);renderer.setViewport(s.viewport);renderer.setScissor(s.scissor);renderer.setScissorTest(s.test);}
      function renderMap(){const saved=state();beforeState=saved;try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissor(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{if(document.querySelector('#restore').checked)restoreState(saved);afterState=state();}}

      function draw(){if(disposed||!stage.clientWidth)return;renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.setScissor(0,0,canvas.width,canvas.height);renderer.setScissorTest(false);renderer.info.autoReset=false;renderer.info.reset();if(document.querySelector('#update').checked)renderMap();renderer.render(scene,camera);if(document.querySelector('#overlay').checked&&renderer.getRenderTarget()===null){const saved=state();try{const size=Math.min(112,Math.floor(canvas.width*.35));renderer.setViewport(canvas.width-size-8,8,size,size);renderer.setScissor(canvas.width-size-8,8,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;restoreState(saved);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};renderer.info.autoReset=true;frames++;output.textContent='target: '+(renderer.getRenderTarget()===null?'screen':'texture')+' / viewport: '+renderer.getViewport(new THREE.Vector4()).toArray()+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;red.position.x=Number(input.value);draw();});red.position.x=Number(document.querySelector('#value').value);

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='정리 완료';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- output의 target이 screen인지 texture인지 읽으세요.
- setRenderTarget(null)만으로는 호출자의 모든 상태를 복원하지 못합니다.
- 저장한 target·face·mip·viewport·scissor·test를 finally에서 복원하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

타깃이 texture를 소유하므로 target.dispose를 한 번 호출합니다. 공유 map을 별도로 dispose하지 않습니다. 통계는 autoReset=false로 프레임의 패스를 누적한 뒤 기본값으로 복구합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>호출자의 렌더 상태 복원</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>호출자의 렌더 상태 복원</h1>
    <p>
      같은 장면을 메인 perspective 카메라와 위에서 보는 orthographic 카메라로
      그립니다. 미니맵은 render target의 texture를 평면에 붙입니다. 타깃 갱신이
      꺼져 있으면 미니맵만 이전 상태에 남습니다. 복원이 꺼져 있으면 화면 대신
      타깃에 후속 패스가 그려집니다.
    </p>
    <div class="controls">
      <label
        >빨강 큐브 X<input
          id="value"
          type="number"
          value="0"
          min="-2"
          max="2"
          step="0.25" /></label
      ><label><input id="update" type="checkbox" checked />타깃 갱신</label
      ><label><input id="overlay" type="checkbox" checked />미니맵 표시</label
      ><label><input id="restore" type="checkbox" checked />상태 복원</label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="호출자의 렌더 상태 복원"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');
      const camera=new THREE.PerspectiveCamera(45,1,.1,100);
      const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set(),ownedInstances=new Set();
      const events=new AbortController();let disposed=false,frames=0;
      const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});
      camera.position.set(5,5,7);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(1,1,1);ownedGeometry.add(geometry);const redMaterial=new THREE.MeshBasicMaterial({color:'#ef4444'}),blueMaterial=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedMaterial.add(redMaterial);ownedMaterial.add(blueMaterial);const red=new THREE.Mesh(geometry,redMaterial),blue=new THREE.Mesh(geometry,blueMaterial);red.position.x=-1.5;blue.position.set(1.5,0,-1.5);scene.add(red,blue);
      const miniCamera=new THREE.OrthographicCamera(-4,4,4,-4,.1,30);miniCamera.position.set(0,8,0);miniCamera.up.set(0,0,-1);miniCamera.lookAt(0,0,0);
      const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);
      const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;
      const planeGeometry=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(planeGeometry);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(planeGeometry,planeMaterial));
      let beforeState,afterState,stats={calls:0,triangles:0};
      function state(){return {target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};}
      function restoreState(s){renderer.setRenderTarget(s.target,s.face,s.mip);renderer.setViewport(s.viewport);renderer.setScissor(s.scissor);renderer.setScissorTest(s.test);}
      function renderMap(){const saved=state();beforeState=saved;try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissor(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{if(document.querySelector('#restore').checked)restoreState(saved);afterState=state();}}

      function draw(){if(disposed||!stage.clientWidth)return;renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.setScissor(0,0,canvas.width,canvas.height);renderer.setScissorTest(false);renderer.info.autoReset=false;renderer.info.reset();if(document.querySelector('#update').checked)renderMap();renderer.render(scene,camera);if(document.querySelector('#overlay').checked&&renderer.getRenderTarget()===null){const saved=state();try{const size=Math.min(112,Math.floor(canvas.width*.35));renderer.setViewport(canvas.width-size-8,8,size,size);renderer.setScissor(canvas.width-size-8,8,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;restoreState(saved);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};renderer.info.autoReset=true;frames++;output.textContent='target: '+(renderer.getRenderTarget()===null?'screen':'texture')+' / viewport: '+renderer.getViewport(new THREE.Vector4()).toArray()+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;red.position.x=Number(input.value);draw();});red.position.x=Number(document.querySelector('#value').value);

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='정리 완료';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 이전 타깃이 null이 아니라면 어떻게 복원하나요?

### API · WebGLRenderTarget

렌더 결과를 texture로 보관합니다.

- `width: number` — 픽셀 너비
- `height: number` — 픽셀 높이

새 WebGLRenderTarget을 반환합니다.

- target이 texture를 소유하므로 target을 한 번 dispose합니다.

```js
const target=new THREE.WebGLRenderTarget(128,128);
```

[WebGLRenderTarget](https://threejs.org/docs/pages/WebGLRenderTarget.html) · three@0.186.1 · 2026-10-27

### API · WebGLRenderer.setRenderTarget

이후 렌더의 목적지를 바꿉니다.

- `renderTarget: WebGLRenderTarget|null` — 타깃 또는 화면을 뜻하는 null

반환값은 없습니다.

- 진입 시 target·face·mipmap을 저장해서 복원합니다.

```js
const old=renderer.getRenderTarget();renderer.setRenderTarget(target);renderer.render(scene,camera);renderer.setRenderTarget(old);
```

[WebGLRenderer.setRenderTarget](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

### API · WebGLRenderer.setViewport / setScissor

그릴 영역과 조각 제한 영역을 정합니다.

- `x,y,width,height: number` — 논리 픽셀 사각형

viewport/scissor 상태를 변경합니다.

- getViewport·getScissor·getScissorTest 값을 저장하고 모두 복원합니다.

```js
const v=renderer.getViewport(new THREE.Vector4());renderer.setViewport(0,0,128,128);renderer.setViewport(v);
```

[WebGLRenderer.setViewport / setScissor](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 화면 밖 객체와 상세도](../21/README.md) · [다음: 자원 소유권 장부](../23/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
