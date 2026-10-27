# Three.js · 19 인스턴싱 기초

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 애니메이션·인스턴싱·렌더 패스 · 편집 가능한 예제 · 저장 ID: `threejs-step-19`

## 목표와 학습 후 역량

- Mesh calls=500, InstancedMesh calls=1이며 둘 다 triangles=6000입니다.
- upload가 꺼지면 version과 화면은 유지됩니다. 켜면 version이 증가하고 500개가 이동합니다.

## 선수 지식

선수 단원: 04, 05, 07. 이번 실험에서 이어갑니다.

## 핵심 개념과 설명

### 같은 배치의 개별 Mesh

공유 참조만으로 호출이 합쳐지지는 않습니다. InstancedMesh는 한 geometry를 여러 행렬로 그립니다.

### CPU 행렬과 GPU 업로드

setMatrixAt은 CPU 배열을 씁니다. 반복문 뒤 needsUpdate=true를 한 번 설정해 업로드합니다.

## 실습 준비

사이트에서 독립 HTML을 편집·실행합니다. Three.js 0.186.1을 사용하며 별도 설치·서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 04·05·07의 변환·geometry·공유 자원을 이어갑니다. 25열×20행의 큐브 500개가 같은 geometry와 material을 공유합니다. 표현을 Mesh→InstancedMesh로 바꾸고 적용하세요. 카메라·좌표·개수를 유지하며 calls·triangles와 화면을 기록합니다.
2. 시작은 InstancedMesh이며 upload가 꺼져 있습니다. X 이동을 0.8로 적용하세요. CPU X[0]는 -1.6으로 바뀌지만 화면은 그대로입니다. upload를 체크하고 다시 적용하세요. 첫 렌더 전에는 초기 행렬을 한 번 업로드합니다.
3. 시작 개수는 100입니다. 개수를 500으로 바꾸고 Mesh와 InstancedMesh를 비교하세요. 100개는 triangles=1200, 500개는 6000입니다. 호출 감소가 FPS 향상을 보장하지 않는 이유를 적으세요. 이 장면은 한 프레임에 한 패스입니다.

## 관찰할 변수

| 변수                  | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                                                 |
| --------------------- | --------- | --------- | --------------------------------------------------------------------- |
| 같은 배치의 개별 Mesh | starter   | solution  | Mesh calls=500, InstancedMesh calls=1이며 둘 다 triangles=6000입니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] Mesh calls=500, InstancedMesh calls=1이며 둘 다 triangles=6000입니다.
- [ ] upload가 꺼지면 version과 화면은 유지됩니다. 켜면 version이 증가하고 500개가 이동합니다.

## 자가 점검

1. 배치가 달라지면 어떤 비교 조건을 확인하나요?
2. CPU와 화면의 위치가 다르면 무엇이 빠졌나요?
3. 호출 수와 삼각형 수를 각각 줄이는 변경은 무엇인가요?

## 공식 참고

- [Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-19/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 독립 HTML을 편집·실행합니다. 실제 관찰을 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-19/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

04·05·07의 변환·geometry·공유 자원을 이어갑니다. 25열×20행의 큐브 500개가 같은 geometry와 material을 공유합니다. 표현을 Mesh→InstancedMesh로 바꾸고 적용하세요. 카메라·좌표·개수를 유지하며 calls·triangles와 화면을 기록합니다.

### 선수 단원

- `threejs-step-04`
- `threejs-step-05`
- `threejs-step-07`

### 같은 배치의 개별 Mesh

04·05·07의 변환·geometry·공유 자원을 이어갑니다. 25열×20행의 큐브 500개가 같은 geometry와 material을 공유합니다. 표현을 Mesh→InstancedMesh로 바꾸고 적용하세요. 카메라·좌표·개수를 유지하며 calls·triangles와 화면을 기록합니다.

**예상 결과**

Mesh calls=500, InstancedMesh calls=1이며 둘 다 triangles=6000입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>같은 배치의 Mesh 500개</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>같은 배치의 Mesh 500개</h1>
    <p>
      같은 좌표 배열·BoxGeometry·MeshBasicMaterial·카메라를 공유합니다. Mesh와
      InstancedMesh를 각각 적용하세요. 행렬 이동 뒤 upload를 끄면 CPU 값만
      바뀌고 화면은 이전 위치에 남습니다.
    </p>
    <div class="controls">
      <label
        >표현<select id="mode">
          <option value="mesh" selected>Mesh</option>
          <option value="instances">InstancedMesh</option>
        </select></label
      ><label
        >개수<input
          id="count"
          type="number"
          value="500"
          min="1"
          max="500"
          step="1" /></label
      ><label
        >X 이동<input
          id="value"
          type="number"
          value="0"
          min="-1"
          max="1"
          step="0.1" /></label
      ><label
        ><input
          id="upload"
          type="checkbox"
          checked
        />instanceMatrix.needsUpdate</label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="같은 배치의 Mesh 500개"></canvas></div>
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
      camera.position.set(0,0,8);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(.13,.13,.13),material=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const positions=Array.from({length:500},(_,i)=>new THREE.Vector3((i%25-12)*.2,(Math.floor(i/25)-9.5)*.2,0));
      const group=new THREE.Group();scene.add(group);const meshes=positions.map(p=>{const m=new THREE.Mesh(geometry,material);m.position.copy(p);group.add(m);return m;});
      const instances=new THREE.InstancedMesh(geometry,material,500);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4();for(let i=0;i<500;i++)instances.setMatrixAt(i,matrix.makeTranslation(...positions[i].toArray()));instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();
      let stats={calls:0,triangles:0};

      function configure(){const n=document.querySelector('#count'),x=document.querySelector('#value');if(!n.checkValidity()||!x.checkValidity()||!n.value||!x.value)return;const count=Number(n.value),shift=Number(x.value);group.visible=document.querySelector('#mode').value==='mesh';instances.visible=!group.visible;instances.count=count;meshes.forEach((m,i)=>{m.visible=i<count;m.position.copy(positions[i]);m.position.x+=shift;instances.setMatrixAt(i,matrix.makeTranslation(m.position.x,m.position.y,0));});if(document.querySelector('#upload').checked)instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='calls: '+stats.calls+' / triangles: '+stats.triangles+' / instanceMatrix.version: '+instances.instanceMatrix.version+' / CPU X[0]: '+instances.instanceMatrix.array[12];}
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

- 두 표현이 같은 positions 배열을 읽는지 확인하세요.
- geometry·material·카메라를 유지한 채 표현만 바꾸세요.
- 500개에서 calls=500과 1을 비교하고 triangles=6000이 유지되는지 읽으세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

공유 참조만으로 호출이 합쳐지지는 않습니다. InstancedMesh는 한 geometry를 여러 행렬로 그립니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>같은 배치의 Mesh 500개</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>같은 배치의 Mesh 500개</h1>
    <p>
      같은 좌표 배열·BoxGeometry·MeshBasicMaterial·카메라를 공유합니다. Mesh와
      InstancedMesh를 각각 적용하세요. 행렬 이동 뒤 upload를 끄면 CPU 값만
      바뀌고 화면은 이전 위치에 남습니다.
    </p>
    <div class="controls">
      <label
        >표현<select id="mode">
          <option value="mesh">Mesh</option>
          <option value="instances" selected>InstancedMesh</option>
        </select></label
      ><label
        >개수<input
          id="count"
          type="number"
          value="500"
          min="1"
          max="500"
          step="1" /></label
      ><label
        >X 이동<input
          id="value"
          type="number"
          value="0"
          min="-1"
          max="1"
          step="0.1" /></label
      ><label
        ><input
          id="upload"
          type="checkbox"
          checked
        />instanceMatrix.needsUpdate</label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="같은 배치의 Mesh 500개"></canvas></div>
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
      camera.position.set(0,0,8);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(.13,.13,.13),material=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const positions=Array.from({length:500},(_,i)=>new THREE.Vector3((i%25-12)*.2,(Math.floor(i/25)-9.5)*.2,0));
      const group=new THREE.Group();scene.add(group);const meshes=positions.map(p=>{const m=new THREE.Mesh(geometry,material);m.position.copy(p);group.add(m);return m;});
      const instances=new THREE.InstancedMesh(geometry,material,500);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4();for(let i=0;i<500;i++)instances.setMatrixAt(i,matrix.makeTranslation(...positions[i].toArray()));instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();
      let stats={calls:0,triangles:0};

      function configure(){const n=document.querySelector('#count'),x=document.querySelector('#value');if(!n.checkValidity()||!x.checkValidity()||!n.value||!x.value)return;const count=Number(n.value),shift=Number(x.value);group.visible=document.querySelector('#mode').value==='mesh';instances.visible=!group.visible;instances.count=count;meshes.forEach((m,i)=>{m.visible=i<count;m.position.copy(positions[i]);m.position.x+=shift;instances.setMatrixAt(i,matrix.makeTranslation(m.position.x,m.position.y,0));});if(document.querySelector('#upload').checked)instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='calls: '+stats.calls+' / triangles: '+stats.triangles+' / instanceMatrix.version: '+instances.instanceMatrix.version+' / CPU X[0]: '+instances.instanceMatrix.array[12];}
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

- 배치가 달라지면 어떤 비교 조건을 확인하나요?

### CPU 행렬과 GPU 업로드

시작은 InstancedMesh이며 upload가 꺼져 있습니다. X 이동을 0.8로 적용하세요. CPU X[0]는 -1.6으로 바뀌지만 화면은 그대로입니다. upload를 체크하고 다시 적용하세요. 첫 렌더 전에는 초기 행렬을 한 번 업로드합니다.

**예상 결과**

upload가 꺼지면 version과 화면은 유지됩니다. 켜면 version이 증가하고 500개가 이동합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>행렬 변경과 업로드</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>행렬 변경과 업로드</h1>
    <p>
      같은 좌표 배열·BoxGeometry·MeshBasicMaterial·카메라를 공유합니다. Mesh와
      InstancedMesh를 각각 적용하세요. 행렬 이동 뒤 upload를 끄면 CPU 값만
      바뀌고 화면은 이전 위치에 남습니다.
    </p>
    <div class="controls">
      <label
        >표현<select id="mode">
          <option value="mesh">Mesh</option>
          <option value="instances" selected>InstancedMesh</option>
        </select></label
      ><label
        >개수<input
          id="count"
          type="number"
          value="500"
          min="1"
          max="500"
          step="1" /></label
      ><label
        >X 이동<input
          id="value"
          type="number"
          value="0"
          min="-1"
          max="1"
          step="0.1" /></label
      ><label
        ><input id="upload" type="checkbox" />instanceMatrix.needsUpdate</label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="행렬 변경과 업로드"></canvas></div>
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
      camera.position.set(0,0,8);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(.13,.13,.13),material=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const positions=Array.from({length:500},(_,i)=>new THREE.Vector3((i%25-12)*.2,(Math.floor(i/25)-9.5)*.2,0));
      const group=new THREE.Group();scene.add(group);const meshes=positions.map(p=>{const m=new THREE.Mesh(geometry,material);m.position.copy(p);group.add(m);return m;});
      const instances=new THREE.InstancedMesh(geometry,material,500);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4();for(let i=0;i<500;i++)instances.setMatrixAt(i,matrix.makeTranslation(...positions[i].toArray()));instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();
      let stats={calls:0,triangles:0};

      function configure(){const n=document.querySelector('#count'),x=document.querySelector('#value');if(!n.checkValidity()||!x.checkValidity()||!n.value||!x.value)return;const count=Number(n.value),shift=Number(x.value);group.visible=document.querySelector('#mode').value==='mesh';instances.visible=!group.visible;instances.count=count;meshes.forEach((m,i)=>{m.visible=i<count;m.position.copy(positions[i]);m.position.x+=shift;instances.setMatrixAt(i,matrix.makeTranslation(m.position.x,m.position.y,0));});if(document.querySelector('#upload').checked)instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='calls: '+stats.calls+' / triangles: '+stats.triangles+' / instanceMatrix.version: '+instances.instanceMatrix.version+' / CPU X[0]: '+instances.instanceMatrix.array[12];}
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

- CPU X[0]와 화면을 따로 읽으세요.
- setMatrixAt 뒤 instanceMatrix.version이 증가했는지 확인하세요.
- upload를 체크하고 X=0.8을 다시 적용하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

setMatrixAt은 CPU 배열을 씁니다. 반복문 뒤 needsUpdate=true를 한 번 설정해 업로드합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>행렬 변경과 업로드</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>행렬 변경과 업로드</h1>
    <p>
      같은 좌표 배열·BoxGeometry·MeshBasicMaterial·카메라를 공유합니다. Mesh와
      InstancedMesh를 각각 적용하세요. 행렬 이동 뒤 upload를 끄면 CPU 값만
      바뀌고 화면은 이전 위치에 남습니다.
    </p>
    <div class="controls">
      <label
        >표현<select id="mode">
          <option value="mesh">Mesh</option>
          <option value="instances" selected>InstancedMesh</option>
        </select></label
      ><label
        >개수<input
          id="count"
          type="number"
          value="500"
          min="1"
          max="500"
          step="1" /></label
      ><label
        >X 이동<input
          id="value"
          type="number"
          value="0"
          min="-1"
          max="1"
          step="0.1" /></label
      ><label
        ><input
          id="upload"
          type="checkbox"
          checked
        />instanceMatrix.needsUpdate</label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="행렬 변경과 업로드"></canvas></div>
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
      camera.position.set(0,0,8);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(.13,.13,.13),material=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const positions=Array.from({length:500},(_,i)=>new THREE.Vector3((i%25-12)*.2,(Math.floor(i/25)-9.5)*.2,0));
      const group=new THREE.Group();scene.add(group);const meshes=positions.map(p=>{const m=new THREE.Mesh(geometry,material);m.position.copy(p);group.add(m);return m;});
      const instances=new THREE.InstancedMesh(geometry,material,500);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4();for(let i=0;i<500;i++)instances.setMatrixAt(i,matrix.makeTranslation(...positions[i].toArray()));instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();
      let stats={calls:0,triangles:0};

      function configure(){const n=document.querySelector('#count'),x=document.querySelector('#value');if(!n.checkValidity()||!x.checkValidity()||!n.value||!x.value)return;const count=Number(n.value),shift=Number(x.value);group.visible=document.querySelector('#mode').value==='mesh';instances.visible=!group.visible;instances.count=count;meshes.forEach((m,i)=>{m.visible=i<count;m.position.copy(positions[i]);m.position.x+=shift;instances.setMatrixAt(i,matrix.makeTranslation(m.position.x,m.position.y,0));});if(document.querySelector('#upload').checked)instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='calls: '+stats.calls+' / triangles: '+stats.triangles+' / instanceMatrix.version: '+instances.instanceMatrix.version+' / CPU X[0]: '+instances.instanceMatrix.array[12];}
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

- CPU와 화면의 위치가 다르면 무엇이 빠졌나요?

### 동일 조건의 통계

시작 개수는 100입니다. 개수를 500으로 바꾸고 Mesh와 InstancedMesh를 비교하세요. 100개는 triangles=1200, 500개는 6000입니다. 호출 감소가 FPS 향상을 보장하지 않는 이유를 적으세요. 이 장면은 한 프레임에 한 패스입니다.

**예상 결과**

500개에서 calls는 500→1, triangles는 6000→6000입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>렌더링 통계 비교</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>렌더링 통계 비교</h1>
    <p>
      같은 좌표 배열·BoxGeometry·MeshBasicMaterial·카메라를 공유합니다. Mesh와
      InstancedMesh를 각각 적용하세요. 행렬 이동 뒤 upload를 끄면 CPU 값만
      바뀌고 화면은 이전 위치에 남습니다.
    </p>
    <div class="controls">
      <label
        >표현<select id="mode">
          <option value="mesh">Mesh</option>
          <option value="instances" selected>InstancedMesh</option>
        </select></label
      ><label
        >개수<input
          id="count"
          type="number"
          value="100"
          min="1"
          max="500"
          step="1" /></label
      ><label
        >X 이동<input
          id="value"
          type="number"
          value="0"
          min="-1"
          max="1"
          step="0.1" /></label
      ><label
        ><input
          id="upload"
          type="checkbox"
          checked
        />instanceMatrix.needsUpdate</label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="렌더링 통계 비교"></canvas></div>
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
      camera.position.set(0,0,8);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(.13,.13,.13),material=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const positions=Array.from({length:500},(_,i)=>new THREE.Vector3((i%25-12)*.2,(Math.floor(i/25)-9.5)*.2,0));
      const group=new THREE.Group();scene.add(group);const meshes=positions.map(p=>{const m=new THREE.Mesh(geometry,material);m.position.copy(p);group.add(m);return m;});
      const instances=new THREE.InstancedMesh(geometry,material,500);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4();for(let i=0;i<500;i++)instances.setMatrixAt(i,matrix.makeTranslation(...positions[i].toArray()));instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();
      let stats={calls:0,triangles:0};

      function configure(){const n=document.querySelector('#count'),x=document.querySelector('#value');if(!n.checkValidity()||!x.checkValidity()||!n.value||!x.value)return;const count=Number(n.value),shift=Number(x.value);group.visible=document.querySelector('#mode').value==='mesh';instances.visible=!group.visible;instances.count=count;meshes.forEach((m,i)=>{m.visible=i<count;m.position.copy(positions[i]);m.position.x+=shift;instances.setMatrixAt(i,matrix.makeTranslation(m.position.x,m.position.y,0));});if(document.querySelector('#upload').checked)instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='calls: '+stats.calls+' / triangles: '+stats.triangles+' / instanceMatrix.version: '+instances.instanceMatrix.version+' / CPU X[0]: '+instances.instanceMatrix.array[12];}
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

- 현재 개수가 100인지 500인지 먼저 확인하세요.
- 큐브 한 개는 12개 삼각형입니다.
- 500개로 고정하고 Mesh와 InstancedMesh의 실제 통계를 각각 기록하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

renderer.info.render는 실제 호출 통계입니다. 단일 패스의 기본 autoReset을 쓰며 시간이나 GPU 사용량으로 해석하지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>렌더링 통계 비교</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>렌더링 통계 비교</h1>
    <p>
      같은 좌표 배열·BoxGeometry·MeshBasicMaterial·카메라를 공유합니다. Mesh와
      InstancedMesh를 각각 적용하세요. 행렬 이동 뒤 upload를 끄면 CPU 값만
      바뀌고 화면은 이전 위치에 남습니다.
    </p>
    <div class="controls">
      <label
        >표현<select id="mode">
          <option value="mesh">Mesh</option>
          <option value="instances" selected>InstancedMesh</option>
        </select></label
      ><label
        >개수<input
          id="count"
          type="number"
          value="500"
          min="1"
          max="500"
          step="1" /></label
      ><label
        >X 이동<input
          id="value"
          type="number"
          value="0"
          min="-1"
          max="1"
          step="0.1" /></label
      ><label
        ><input
          id="upload"
          type="checkbox"
          checked
        />instanceMatrix.needsUpdate</label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="렌더링 통계 비교"></canvas></div>
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
      camera.position.set(0,0,8);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(.13,.13,.13),material=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const positions=Array.from({length:500},(_,i)=>new THREE.Vector3((i%25-12)*.2,(Math.floor(i/25)-9.5)*.2,0));
      const group=new THREE.Group();scene.add(group);const meshes=positions.map(p=>{const m=new THREE.Mesh(geometry,material);m.position.copy(p);group.add(m);return m;});
      const instances=new THREE.InstancedMesh(geometry,material,500);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4();for(let i=0;i<500;i++)instances.setMatrixAt(i,matrix.makeTranslation(...positions[i].toArray()));instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();
      let stats={calls:0,triangles:0};

      function configure(){const n=document.querySelector('#count'),x=document.querySelector('#value');if(!n.checkValidity()||!x.checkValidity()||!n.value||!x.value)return;const count=Number(n.value),shift=Number(x.value);group.visible=document.querySelector('#mode').value==='mesh';instances.visible=!group.visible;instances.count=count;meshes.forEach((m,i)=>{m.visible=i<count;m.position.copy(positions[i]);m.position.x+=shift;instances.setMatrixAt(i,matrix.makeTranslation(m.position.x,m.position.y,0));});if(document.querySelector('#upload').checked)instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='calls: '+stats.calls+' / triangles: '+stats.triangles+' / instanceMatrix.version: '+instances.instanceMatrix.version+' / CPU X[0]: '+instances.instanceMatrix.array[12];}
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

- 호출 수와 삼각형 수를 각각 줄이는 변경은 무엇인가요?

### API · InstancedMesh

같은 geometry와 material을 여러 변환으로 그립니다.

- `geometry: BufferGeometry` — 모든 인스턴스가 공유할 geometry
- `material: Material|Material[]` — 공유할 material 또는 material 배열
- `count: number` — 인스턴스 최대 개수

새 InstancedMesh를 반환합니다.

- 개별 인스턴스에 다른 geometry를 넣지 않습니다.

```js
const mesh=new THREE.InstancedMesh(geometry,material,500);
```

[InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html) · three@0.186.1 · 2026-10-27

### API · InstancedMesh.setMatrixAt

CPU 인스턴스 행렬을 씁니다.

- `index: number` — 0부터 count-1까지의 번호
- `matrix: Matrix4` — 로컬 변환

반환값은 없습니다.

- 변경 뒤 instanceMatrix.needsUpdate=true를 설정합니다.

```js
mesh.setMatrixAt(0,new THREE.Matrix4().makeTranslation(1,0,0));mesh.instanceMatrix.needsUpdate=true;
```

[InstancedMesh.setMatrixAt](https://threejs.org/docs/pages/InstancedMesh.html) · three@0.186.1 · 2026-10-27

### API · WebGLRenderer.info

실제 렌더 호출과 삼각형 수를 읽습니다.

info.render의 calls와 triangles는 숫자입니다.

- 기본 autoReset은 매 render마다 초기화합니다. 여러 패스는 별도 누적이 필요합니다.

```js
renderer.render(scene,camera);console.log(renderer.info.render.calls,renderer.info.render.triangles);
```

[WebGLRenderer.info](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 투명도와 깊이](../18/README.md) · [다음: 인스턴스 선택과 갱신](../20/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
