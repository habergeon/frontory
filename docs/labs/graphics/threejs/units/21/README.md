# Three.js · 21 화면 밖 객체와 상세도

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 애니메이션·인스턴싱·렌더 패스 · 편집 가능한 예제 · 저장 ID: `threejs-step-21`

## 목표와 학습 후 역량

- 재계산 뒤 center.x=8이고 큐브가 다시 보입니다.
- 낡은 경계+컬링 on에서는 빈 화면, off에서는 표시, 새 경계+on에서도 표시됩니다.

## 선수 지식

선수 단원: 03, 05, 20. 이번 실험에서 이어갑니다.

## 핵심 개념과 설명

### 정점과 낡은 경계

position attribute와 boundingSphere는 별도 데이터입니다. 정점을 바꾸면 기존 경계를 다시 계산해야 합니다.

### 컬링 우회와 실제 수정

frustumCulled=false는 디버깅 비교에 씁니다. 정점 위치를 반영하는 경계를 복구하는 것이 이 과제의 해결입니다.

## 실습 준비

사이트에서 독립 HTML을 편집·실행합니다. Three.js 0.186.1을 사용하며 별도 설치·서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 03·05·20의 카메라·정점·경계를 이어갑니다. 실제 정점은 X=8인데 시작 sphere는 원점에 남아 있습니다. 카메라도 X=8을 보므로 화면이 비고 calls=0입니다. 경계 재계산을 켜고 적용하세요. sphere center와 화면을 함께 확인합니다.
2. 시작은 frustumCulled=false라 잘못된 경계여도 큐브가 보입니다. 경계 재계산을 끄고 컬링을 켜서 사라짐을 재현하세요. 이어 재계산을 켜고 적용해 컬링을 유지한 채 복구하세요. 화면 밖 객체를 계속 그리는 우회와 정확한 경계 수정을 구별해 기록합니다.
3. LOD를 선택하고 거리 4→12를 각각 적용하세요. 모델 중심과 시선은 X=8로 고정하고 카메라 Z만 바꿉니다. 임계 거리 8에서 detail=2의 정이십면체를 detail=0으로 교체합니다. 화면의 모서리·LOD index·triangles를 함께 적으세요.

## 관찰할 변수

| 변수             | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                          |
| ---------------- | --------- | --------- | ---------------------------------------------- |
| 정점과 낡은 경계 | starter   | solution  | 재계산 뒤 center.x=8이고 큐브가 다시 보입니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 재계산 뒤 center.x=8이고 큐브가 다시 보입니다.
- [ ] 낡은 경계+컬링 on에서는 빈 화면, off에서는 표시, 새 경계+on에서도 표시됩니다.

## 자가 점검

1. 정점이 화면 안인데도 호출이 0인 이유는 무엇인가요?
2. 컬링을 끄는 것과 경계를 고치는 것은 비용에서 어떻게 다른가요?
3. 화질과 비용을 비교할 때 카메라·모델의 어떤 조건을 기록하나요?

## 공식 참고

- [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-21/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 독립 HTML을 편집·실행합니다. 실제 관찰을 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-21/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

03·05·20의 카메라·정점·경계를 이어갑니다. 실제 정점은 X=8인데 시작 sphere는 원점에 남아 있습니다. 카메라도 X=8을 보므로 화면이 비고 calls=0입니다. 경계 재계산을 켜고 적용하세요. sphere center와 화면을 함께 확인합니다.

### 선수 단원

- `threejs-step-03`
- `threejs-step-05`
- `threejs-step-20`

### 정점과 낡은 경계

03·05·20의 카메라·정점·경계를 이어갑니다. 실제 정점은 X=8인데 시작 sphere는 원점에 남아 있습니다. 카메라도 X=8을 보므로 화면이 비고 calls=0입니다. 경계 재계산을 켜고 적용하세요. sphere center와 화면을 함께 확인합니다.

**예상 결과**

재계산 뒤 center.x=8이고 큐브가 다시 보입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>낡은 geometry 경계</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>낡은 geometry 경계</h1>
    <p>
      정점은 X=8에 있지만 시작의 낡은 sphere는 원점에 있습니다. 카메라는 X=8을
      봅니다. 경계 재계산과 컬링을 구별하고 LOD에서 거리 4와 12를 비교하세요.
    </p>
    <div class="controls">
      <label
        >실험<select id="mode">
          <option value="bounds" selected>경계</option>
          <option value="lod">LOD</option>
        </select></label
      ><label><input id="bounds" type="checkbox" />경계 재계산</label
      ><label><input id="culling" type="checkbox" checked />frustumCulled</label
      ><label
        >카메라 거리<input
          id="value"
          type="number"
          value="4"
          min="4"
          max="12"
          step="1" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="낡은 geometry 경계"></canvas></div>
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
      camera.position.set(8,0,4);camera.lookAt(8,0,0);
      const material=new THREE.MeshNormalMaterial({flatShading:true});ownedMaterial.add(material);
      const geometry=new THREE.BoxGeometry(1.5,1.5,1.5);ownedGeometry.add(geometry);geometry.computeBoundingBox();geometry.computeBoundingSphere();geometry.translate(8,0,0);
      const staleBox=new THREE.Box3(new THREE.Vector3(-.75,-.75,-.75),new THREE.Vector3(.75,.75,.75)),staleSphere=new THREE.Sphere(new THREE.Vector3(),Math.sqrt(3)*.75);
      const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
      const lod=new THREE.LOD();lod.position.x=8;lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),material),0);lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),material),8);for(const l of lod.levels)ownedGeometry.add(l.object.geometry);scene.add(lod);let stats={calls:0,triangles:0};

      function configure(){const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;mesh.visible=document.querySelector('#mode').value==='bounds';lod.visible=!mesh.visible;mesh.frustumCulled=document.querySelector('#culling').checked;geometry.boundingBox.copy(staleBox);geometry.boundingSphere.copy(staleSphere);if(document.querySelector('#bounds').checked){geometry.computeBoundingBox();geometry.computeBoundingSphere();}camera.position.set(8,0,Number(input.value));camera.lookAt(8,0,0);}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='bounds center: '+geometry.boundingSphere.center.toArray()+' / LOD: '+lod.getCurrentLevel()+' / distance: '+camera.position.distanceTo(lod.position)+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{configure();draw();});configure();

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

- 정점 X=8과 sphere center.x를 비교하세요.
- 카메라는 이미 X=8을 향합니다. 위치를 바꾸지 마세요.
- 경계 재계산을 켜고 적용해 center.x=8과 호출 복구를 확인하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

position attribute와 boundingSphere는 별도 데이터입니다. 정점을 바꾸면 기존 경계를 다시 계산해야 합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>낡은 geometry 경계</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>낡은 geometry 경계</h1>
    <p>
      정점은 X=8에 있지만 시작의 낡은 sphere는 원점에 있습니다. 카메라는 X=8을
      봅니다. 경계 재계산과 컬링을 구별하고 LOD에서 거리 4와 12를 비교하세요.
    </p>
    <div class="controls">
      <label
        >실험<select id="mode">
          <option value="bounds" selected>경계</option>
          <option value="lod">LOD</option>
        </select></label
      ><label><input id="bounds" type="checkbox" checked />경계 재계산</label
      ><label><input id="culling" type="checkbox" checked />frustumCulled</label
      ><label
        >카메라 거리<input
          id="value"
          type="number"
          value="4"
          min="4"
          max="12"
          step="1" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="낡은 geometry 경계"></canvas></div>
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
      camera.position.set(8,0,4);camera.lookAt(8,0,0);
      const material=new THREE.MeshNormalMaterial({flatShading:true});ownedMaterial.add(material);
      const geometry=new THREE.BoxGeometry(1.5,1.5,1.5);ownedGeometry.add(geometry);geometry.computeBoundingBox();geometry.computeBoundingSphere();geometry.translate(8,0,0);
      const staleBox=new THREE.Box3(new THREE.Vector3(-.75,-.75,-.75),new THREE.Vector3(.75,.75,.75)),staleSphere=new THREE.Sphere(new THREE.Vector3(),Math.sqrt(3)*.75);
      const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
      const lod=new THREE.LOD();lod.position.x=8;lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),material),0);lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),material),8);for(const l of lod.levels)ownedGeometry.add(l.object.geometry);scene.add(lod);let stats={calls:0,triangles:0};

      function configure(){const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;mesh.visible=document.querySelector('#mode').value==='bounds';lod.visible=!mesh.visible;mesh.frustumCulled=document.querySelector('#culling').checked;geometry.boundingBox.copy(staleBox);geometry.boundingSphere.copy(staleSphere);if(document.querySelector('#bounds').checked){geometry.computeBoundingBox();geometry.computeBoundingSphere();}camera.position.set(8,0,Number(input.value));camera.lookAt(8,0,0);}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='bounds center: '+geometry.boundingSphere.center.toArray()+' / LOD: '+lod.getCurrentLevel()+' / distance: '+camera.position.distanceTo(lod.position)+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{configure();draw();});configure();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='정리 완료';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 정점이 화면 안인데도 호출이 0인 이유는 무엇인가요?

### 컬링 우회와 실제 수정

시작은 frustumCulled=false라 잘못된 경계여도 큐브가 보입니다. 경계 재계산을 끄고 컬링을 켜서 사라짐을 재현하세요. 이어 재계산을 켜고 적용해 컬링을 유지한 채 복구하세요. 화면 밖 객체를 계속 그리는 우회와 정확한 경계 수정을 구별해 기록합니다.

**예상 결과**

낡은 경계+컬링 on에서는 빈 화면, off에서는 표시, 새 경계+on에서도 표시됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>컬링 증상과 복구</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>컬링 증상과 복구</h1>
    <p>
      정점은 X=8에 있지만 시작의 낡은 sphere는 원점에 있습니다. 카메라는 X=8을
      봅니다. 경계 재계산과 컬링을 구별하고 LOD에서 거리 4와 12를 비교하세요.
    </p>
    <div class="controls">
      <label
        >실험<select id="mode">
          <option value="bounds" selected>경계</option>
          <option value="lod">LOD</option>
        </select></label
      ><label><input id="bounds" type="checkbox" />경계 재계산</label
      ><label><input id="culling" type="checkbox" />frustumCulled</label
      ><label
        >카메라 거리<input
          id="value"
          type="number"
          value="4"
          min="4"
          max="12"
          step="1" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="컬링 증상과 복구"></canvas></div>
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
      camera.position.set(8,0,4);camera.lookAt(8,0,0);
      const material=new THREE.MeshNormalMaterial({flatShading:true});ownedMaterial.add(material);
      const geometry=new THREE.BoxGeometry(1.5,1.5,1.5);ownedGeometry.add(geometry);geometry.computeBoundingBox();geometry.computeBoundingSphere();geometry.translate(8,0,0);
      const staleBox=new THREE.Box3(new THREE.Vector3(-.75,-.75,-.75),new THREE.Vector3(.75,.75,.75)),staleSphere=new THREE.Sphere(new THREE.Vector3(),Math.sqrt(3)*.75);
      const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
      const lod=new THREE.LOD();lod.position.x=8;lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),material),0);lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),material),8);for(const l of lod.levels)ownedGeometry.add(l.object.geometry);scene.add(lod);let stats={calls:0,triangles:0};

      function configure(){const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;mesh.visible=document.querySelector('#mode').value==='bounds';lod.visible=!mesh.visible;mesh.frustumCulled=document.querySelector('#culling').checked;geometry.boundingBox.copy(staleBox);geometry.boundingSphere.copy(staleSphere);if(document.querySelector('#bounds').checked){geometry.computeBoundingBox();geometry.computeBoundingSphere();}camera.position.set(8,0,Number(input.value));camera.lookAt(8,0,0);}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='bounds center: '+geometry.boundingSphere.center.toArray()+' / LOD: '+lod.getCurrentLevel()+' / distance: '+camera.position.distanceTo(lod.position)+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{configure();draw();});configure();

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

- 낡은 경계를 유지한 상태에서 컬링만 켜고 끄세요.
- 컬링 off는 경계를 고치지 않고 검사를 우회합니다.
- 컬링을 켠 채 경계 재계산을 적용해 큐브를 복구하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

frustumCulled=false는 디버깅 비교에 씁니다. 정점 위치를 반영하는 경계를 복구하는 것이 이 과제의 해결입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>컬링 증상과 복구</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>컬링 증상과 복구</h1>
    <p>
      정점은 X=8에 있지만 시작의 낡은 sphere는 원점에 있습니다. 카메라는 X=8을
      봅니다. 경계 재계산과 컬링을 구별하고 LOD에서 거리 4와 12를 비교하세요.
    </p>
    <div class="controls">
      <label
        >실험<select id="mode">
          <option value="bounds" selected>경계</option>
          <option value="lod">LOD</option>
        </select></label
      ><label><input id="bounds" type="checkbox" checked />경계 재계산</label
      ><label><input id="culling" type="checkbox" checked />frustumCulled</label
      ><label
        >카메라 거리<input
          id="value"
          type="number"
          value="4"
          min="4"
          max="12"
          step="1" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="컬링 증상과 복구"></canvas></div>
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
      camera.position.set(8,0,4);camera.lookAt(8,0,0);
      const material=new THREE.MeshNormalMaterial({flatShading:true});ownedMaterial.add(material);
      const geometry=new THREE.BoxGeometry(1.5,1.5,1.5);ownedGeometry.add(geometry);geometry.computeBoundingBox();geometry.computeBoundingSphere();geometry.translate(8,0,0);
      const staleBox=new THREE.Box3(new THREE.Vector3(-.75,-.75,-.75),new THREE.Vector3(.75,.75,.75)),staleSphere=new THREE.Sphere(new THREE.Vector3(),Math.sqrt(3)*.75);
      const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
      const lod=new THREE.LOD();lod.position.x=8;lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),material),0);lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),material),8);for(const l of lod.levels)ownedGeometry.add(l.object.geometry);scene.add(lod);let stats={calls:0,triangles:0};

      function configure(){const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;mesh.visible=document.querySelector('#mode').value==='bounds';lod.visible=!mesh.visible;mesh.frustumCulled=document.querySelector('#culling').checked;geometry.boundingBox.copy(staleBox);geometry.boundingSphere.copy(staleSphere);if(document.querySelector('#bounds').checked){geometry.computeBoundingBox();geometry.computeBoundingSphere();}camera.position.set(8,0,Number(input.value));camera.lookAt(8,0,0);}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='bounds center: '+geometry.boundingSphere.center.toArray()+' / LOD: '+lod.getCurrentLevel()+' / distance: '+camera.position.distanceTo(lod.position)+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{configure();draw();});configure();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='정리 완료';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 컬링을 끄는 것과 경계를 고치는 것은 비용에서 어떻게 다른가요?

### 거리와 실제 삼각형 수

LOD를 선택하고 거리 4→12를 각각 적용하세요. 모델 중심과 시선은 X=8로 고정하고 카메라 Z만 바꿉니다. 임계 거리 8에서 detail=2의 정이십면체를 detail=0으로 교체합니다. 화면의 모서리·LOD index·triangles를 함께 적으세요.

**예상 결과**

거리 4에서는 level=0·triangles=180, 거리 12에서는 level=1·triangles=20입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>거리별 상세도</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>거리별 상세도</h1>
    <p>
      정점은 X=8에 있지만 시작의 낡은 sphere는 원점에 있습니다. 카메라는 X=8을
      봅니다. 경계 재계산과 컬링을 구별하고 LOD에서 거리 4와 12를 비교하세요.
    </p>
    <div class="controls">
      <label
        >실험<select id="mode">
          <option value="bounds">경계</option>
          <option value="lod" selected>LOD</option>
        </select></label
      ><label><input id="bounds" type="checkbox" checked />경계 재계산</label
      ><label><input id="culling" type="checkbox" checked />frustumCulled</label
      ><label
        >카메라 거리<input
          id="value"
          type="number"
          value="4"
          min="4"
          max="12"
          step="1" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="거리별 상세도"></canvas></div>
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
      camera.position.set(8,0,4);camera.lookAt(8,0,0);
      const material=new THREE.MeshNormalMaterial({flatShading:true});ownedMaterial.add(material);
      const geometry=new THREE.BoxGeometry(1.5,1.5,1.5);ownedGeometry.add(geometry);geometry.computeBoundingBox();geometry.computeBoundingSphere();geometry.translate(8,0,0);
      const staleBox=new THREE.Box3(new THREE.Vector3(-.75,-.75,-.75),new THREE.Vector3(.75,.75,.75)),staleSphere=new THREE.Sphere(new THREE.Vector3(),Math.sqrt(3)*.75);
      const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
      const lod=new THREE.LOD();lod.position.x=8;lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),material),0);lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),material),8);for(const l of lod.levels)ownedGeometry.add(l.object.geometry);scene.add(lod);let stats={calls:0,triangles:0};

      function configure(){const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;mesh.visible=document.querySelector('#mode').value==='bounds';lod.visible=!mesh.visible;mesh.frustumCulled=document.querySelector('#culling').checked;geometry.boundingBox.copy(staleBox);geometry.boundingSphere.copy(staleSphere);if(document.querySelector('#bounds').checked){geometry.computeBoundingBox();geometry.computeBoundingSphere();}camera.position.set(8,0,Number(input.value));camera.lookAt(8,0,0);}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='bounds center: '+geometry.boundingSphere.center.toArray()+' / LOD: '+lod.getCurrentLevel()+' / distance: '+camera.position.distanceTo(lod.position)+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{configure();draw();});configure();

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

- 실험 선택을 LOD로 바꾸세요.
- 모델과 target은 X=8이며 거리만 4→12로 바꿉니다.
- 임계값 8 양쪽에서 level과 실제 triangles=180/20을 비교하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

IcosahedronGeometry detail=2는 각 면을 9개 삼각형으로 나눠 총 180개입니다. addLevel의 거리는 모델 세계 위치에서 카메라까지입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>거리별 상세도</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>거리별 상세도</h1>
    <p>
      정점은 X=8에 있지만 시작의 낡은 sphere는 원점에 있습니다. 카메라는 X=8을
      봅니다. 경계 재계산과 컬링을 구별하고 LOD에서 거리 4와 12를 비교하세요.
    </p>
    <div class="controls">
      <label
        >실험<select id="mode">
          <option value="bounds">경계</option>
          <option value="lod" selected>LOD</option>
        </select></label
      ><label><input id="bounds" type="checkbox" checked />경계 재계산</label
      ><label><input id="culling" type="checkbox" checked />frustumCulled</label
      ><label
        >카메라 거리<input
          id="value"
          type="number"
          value="12"
          min="4"
          max="12"
          step="1" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="거리별 상세도"></canvas></div>
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
      camera.position.set(8,0,4);camera.lookAt(8,0,0);
      const material=new THREE.MeshNormalMaterial({flatShading:true});ownedMaterial.add(material);
      const geometry=new THREE.BoxGeometry(1.5,1.5,1.5);ownedGeometry.add(geometry);geometry.computeBoundingBox();geometry.computeBoundingSphere();geometry.translate(8,0,0);
      const staleBox=new THREE.Box3(new THREE.Vector3(-.75,-.75,-.75),new THREE.Vector3(.75,.75,.75)),staleSphere=new THREE.Sphere(new THREE.Vector3(),Math.sqrt(3)*.75);
      const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
      const lod=new THREE.LOD();lod.position.x=8;lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),material),0);lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),material),8);for(const l of lod.levels)ownedGeometry.add(l.object.geometry);scene.add(lod);let stats={calls:0,triangles:0};

      function configure(){const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;mesh.visible=document.querySelector('#mode').value==='bounds';lod.visible=!mesh.visible;mesh.frustumCulled=document.querySelector('#culling').checked;geometry.boundingBox.copy(staleBox);geometry.boundingSphere.copy(staleSphere);if(document.querySelector('#bounds').checked){geometry.computeBoundingBox();geometry.computeBoundingSphere();}camera.position.set(8,0,Number(input.value));camera.lookAt(8,0,0);}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='bounds center: '+geometry.boundingSphere.center.toArray()+' / LOD: '+lod.getCurrentLevel()+' / distance: '+camera.position.distanceTo(lod.position)+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{configure();draw();});configure();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='정리 완료';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 화질과 비용을 비교할 때 카메라·모델의 어떤 조건을 기록하나요?

### API · BufferGeometry.computeBoundingSphere

정점으로 geometry 구 경계를 계산합니다.

boundingSphere를 갱신합니다.

- 기존 경계는 정점 변경만으로 자동 갱신되지 않습니다.

```js
geometry.computeBoundingBox();geometry.computeBoundingSphere();
```

[BufferGeometry.computeBoundingSphere](https://threejs.org/docs/pages/BufferGeometry.html) · three@0.186.1 · 2026-10-27

### API · Object3D.frustumCulled

카메라 절두체 경계 검사를 선택합니다.

boolean 속성입니다. 기본값은 true입니다.

- false로 보이는 현상이 경계 정확성을 입증하지는 않습니다.

```js
mesh.frustumCulled=true;
```

[Object3D.frustumCulled](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-27

### API · LOD.addLevel

거리별 객체를 등록합니다.

- `object: Object3D` — 해당 거리의 객체
- `distance: number` — 카메라와 객체 사이 거리

현재 LOD를 반환합니다.

- 기본 autoUpdate=true일 때 렌더러가 level을 선택합니다.

```js
lod.addLevel(high,0);lod.addLevel(low,8);
```

[LOD.addLevel](https://threejs.org/docs/pages/LOD.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 인스턴스 선택과 갱신](../20/README.md) · [다음: 렌더 타깃과 미니맵](../22/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
