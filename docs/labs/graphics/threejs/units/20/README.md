# Three.js · 20 인스턴스 선택과 갱신

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 애니메이션·인스턴싱·렌더 패스 · 편집 가능한 예제 · 저장 ID: `threejs-step-20`

## 목표와 학습 후 역량

- 중앙을 누르면 instanceId=1입니다. 빈 곳을 누르면 null입니다.
- 두 버퍼를 업로드하면 1번만 X=4의 빨강 큐브가 됩니다.

## 선수 지식

선수 단원: 13, 19. 이번 실험에서 이어갑니다.

## 핵심 개념과 설명

### 객체와 instanceId

intersection.object만 저장하면 어느 인스턴스인지 잃습니다. intersection.instanceId를 함께 저장합니다.

### 선택한 행렬과 색 업로드

setMatrixAt과 setColorAt은 서로 다른 버퍼를 씁니다. 위치만 올리면 색이 이전 상태에 남을 수 있습니다.

## 실습 준비

사이트에서 독립 HTML을 편집·실행합니다. Three.js 0.186.1을 사용하며 별도 설치·서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 13·19의 raycast와 인스턴싱을 연결합니다. 시작은 포인터 선택이 꺼져 있습니다. 체크한 뒤 중앙 큐브를 누르세요. 셋 모두 같은 object지만 왼쪽·중앙·오른쪽의 instanceId는 0·1·2입니다. canvas의 실제 사각형으로 NDC를 계산하므로 여백과 resize 뒤에도 선택을 확인하세요.
2. 중앙을 선택한 뒤 X=4를 적용하세요. 시작의 업로드는 꺼져 있어 CPU 행렬·색만 바뀝니다. 체크하고 다시 적용해 이동과 빨강을 확인하세요. 나머지 0·2번은 그대로여야 합니다. matrix와 color의 needsUpdate를 각각 설정합니다.
3. 시작은 경계 재계산이 꺼져 있습니다. 중앙 선택→X=4 적용→새 빨강 큐브 클릭을 실행하세요. 옛 sphere가 raycast를 먼저 거르므로 null이 됩니다. 경계 재계산을 켜고 배치 복구→중앙 선택→적용→새 위치 선택을 반복하세요.

## 관찰할 변수

| 변수              | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                                        |
| ----------------- | --------- | --------- | ------------------------------------------------------------ |
| 객체와 instanceId | starter   | solution  | 중앙을 누르면 instanceId=1입니다. 빈 곳을 누르면 null입니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 중앙을 누르면 instanceId=1입니다. 빈 곳을 누르면 null입니다.
- [ ] 두 버퍼를 업로드하면 1번만 X=4의 빨강 큐브가 됩니다.

## 자가 점검

1. 같은 object에서 큐브를 구별하는 값은 무엇인가요?
2. 행렬만 업로드하면 색도 바뀌나요?
3. 화면에 보이는 큐브를 raycast가 놓치는 이유는 무엇인가요?

## 공식 참고

- [Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-20/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 독립 HTML을 편집·실행합니다. 실제 관찰을 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-20/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

13·19의 raycast와 인스턴싱을 연결합니다. 시작은 포인터 선택이 꺼져 있습니다. 체크한 뒤 중앙 큐브를 누르세요. 셋 모두 같은 object지만 왼쪽·중앙·오른쪽의 instanceId는 0·1·2입니다. canvas의 실제 사각형으로 NDC를 계산하므로 여백과 resize 뒤에도 선택을 확인하세요.

### 선수 단원

- `threejs-step-13`
- `threejs-step-19`

### 객체와 instanceId

13·19의 raycast와 인스턴싱을 연결합니다. 시작은 포인터 선택이 꺼져 있습니다. 체크한 뒤 중앙 큐브를 누르세요. 셋 모두 같은 object지만 왼쪽·중앙·오른쪽의 instanceId는 0·1·2입니다. canvas의 실제 사각형으로 NDC를 계산하므로 여백과 resize 뒤에도 선택을 확인하세요.

**예상 결과**

중앙을 누르면 instanceId=1입니다. 빈 곳을 누르면 null입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>instanceId 선택</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>instanceId 선택</h1>
    <p>
      중앙 파랑 큐브를 클릭해 instanceId=1을 선택하세요. X=4로 적용하면 선택한
      큐브만 오른쪽으로 이동하고 빨강이 됩니다. 새 위치를 다시 클릭하세요.
      경계가 낡으면 보이는 큐브도 raycast가 놓칠 수 있습니다. 복구 후에는 다시
      중앙을 선택합니다.
    </p>
    <div class="controls">
      <label
        >선택한 X<input
          id="value"
          type="number"
          value="4"
          min="-4"
          max="4"
          step="0.25" /></label
      ><label><input id="picking" type="checkbox" />포인터 선택</label
      ><label><input id="upload" type="checkbox" checked />행렬·색 업로드</label
      ><label><input id="bounds" type="checkbox" checked />경계 재계산</label
      ><button id="reset">배치 복구</button><button id="apply">적용</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="instanceId 선택"></canvas></div>
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
      camera.position.set(1.25,0,10);camera.lookAt(1.25,0,0);
      const geometry=new THREE.BoxGeometry(.7,.7,.7),material=new THREE.MeshBasicMaterial({color:'white'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const instances=new THREE.InstancedMesh(geometry,material,3);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let selected=null,hits=[];
      function reset(){for(let i=0;i<3;i++){instances.setMatrixAt(i,matrix.makeTranslation((i-1)*1.5,0,0));instances.setColorAt(i,new THREE.Color('#2563eb'));}instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;instances.computeBoundingBox();instances.computeBoundingSphere();selected=null;hits=[];draw();}
      function pick(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);if(!document.querySelector('#picking').checked)return;scene.updateMatrixWorld(true);camera.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);hits=raycaster.intersectObject(instances);selected=hits[0]?.instanceId??null;draw();}
      canvas.addEventListener('pointerdown',pick,{signal:events.signal});

      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent='instanceId: '+selected+' / matrix.version: '+instances.instanceMatrix.version+' / color.version: '+instances.instanceColor.version+' / bounds center: '+instances.boundingSphere.center.toArray()+' / radius: '+instances.boundingSphere.radius.toFixed(3);}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(selected===null||!input.value||!input.checkValidity())return;instances.setMatrixAt(selected,matrix.makeTranslation(Number(input.value),0,0));instances.setColorAt(selected,new THREE.Color('#ef4444'));if(document.querySelector('#upload').checked){instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;}if(document.querySelector('#bounds').checked){instances.computeBoundingBox();instances.computeBoundingSphere();}draw();});on('#reset','click',reset);reset();

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

- 포인터 선택 체크가 꺼져 있으면 먼저 켜세요.
- 교차 결과의 object와 instanceId를 구별하세요.
- 중앙 큐브를 누르고 instanceId=1을 확인하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

intersection.object만 저장하면 어느 인스턴스인지 잃습니다. intersection.instanceId를 함께 저장합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>instanceId 선택</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>instanceId 선택</h1>
    <p>
      중앙 파랑 큐브를 클릭해 instanceId=1을 선택하세요. X=4로 적용하면 선택한
      큐브만 오른쪽으로 이동하고 빨강이 됩니다. 새 위치를 다시 클릭하세요.
      경계가 낡으면 보이는 큐브도 raycast가 놓칠 수 있습니다. 복구 후에는 다시
      중앙을 선택합니다.
    </p>
    <div class="controls">
      <label
        >선택한 X<input
          id="value"
          type="number"
          value="4"
          min="-4"
          max="4"
          step="0.25" /></label
      ><label><input id="picking" type="checkbox" checked />포인터 선택</label
      ><label><input id="upload" type="checkbox" checked />행렬·색 업로드</label
      ><label><input id="bounds" type="checkbox" checked />경계 재계산</label
      ><button id="reset">배치 복구</button><button id="apply">적용</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="instanceId 선택"></canvas></div>
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
      camera.position.set(1.25,0,10);camera.lookAt(1.25,0,0);
      const geometry=new THREE.BoxGeometry(.7,.7,.7),material=new THREE.MeshBasicMaterial({color:'white'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const instances=new THREE.InstancedMesh(geometry,material,3);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let selected=null,hits=[];
      function reset(){for(let i=0;i<3;i++){instances.setMatrixAt(i,matrix.makeTranslation((i-1)*1.5,0,0));instances.setColorAt(i,new THREE.Color('#2563eb'));}instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;instances.computeBoundingBox();instances.computeBoundingSphere();selected=null;hits=[];draw();}
      function pick(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);if(!document.querySelector('#picking').checked)return;scene.updateMatrixWorld(true);camera.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);hits=raycaster.intersectObject(instances);selected=hits[0]?.instanceId??null;draw();}
      canvas.addEventListener('pointerdown',pick,{signal:events.signal});

      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent='instanceId: '+selected+' / matrix.version: '+instances.instanceMatrix.version+' / color.version: '+instances.instanceColor.version+' / bounds center: '+instances.boundingSphere.center.toArray()+' / radius: '+instances.boundingSphere.radius.toFixed(3);}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(selected===null||!input.value||!input.checkValidity())return;instances.setMatrixAt(selected,matrix.makeTranslation(Number(input.value),0,0));instances.setColorAt(selected,new THREE.Color('#ef4444'));if(document.querySelector('#upload').checked){instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;}if(document.querySelector('#bounds').checked){instances.computeBoundingBox();instances.computeBoundingSphere();}draw();});on('#reset','click',reset);reset();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='정리 완료';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 같은 object에서 큐브를 구별하는 값은 무엇인가요?

### 선택한 행렬과 색 업로드

중앙을 선택한 뒤 X=4를 적용하세요. 시작의 업로드는 꺼져 있어 CPU 행렬·색만 바뀝니다. 체크하고 다시 적용해 이동과 빨강을 확인하세요. 나머지 0·2번은 그대로여야 합니다. matrix와 color의 needsUpdate를 각각 설정합니다.

**예상 결과**

두 버퍼를 업로드하면 1번만 X=4의 빨강 큐브가 됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>위치와 색 변경</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>위치와 색 변경</h1>
    <p>
      중앙 파랑 큐브를 클릭해 instanceId=1을 선택하세요. X=4로 적용하면 선택한
      큐브만 오른쪽으로 이동하고 빨강이 됩니다. 새 위치를 다시 클릭하세요.
      경계가 낡으면 보이는 큐브도 raycast가 놓칠 수 있습니다. 복구 후에는 다시
      중앙을 선택합니다.
    </p>
    <div class="controls">
      <label
        >선택한 X<input
          id="value"
          type="number"
          value="4"
          min="-4"
          max="4"
          step="0.25" /></label
      ><label><input id="picking" type="checkbox" checked />포인터 선택</label
      ><label><input id="upload" type="checkbox" />행렬·색 업로드</label
      ><label><input id="bounds" type="checkbox" checked />경계 재계산</label
      ><button id="reset">배치 복구</button><button id="apply">적용</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="위치와 색 변경"></canvas></div>
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
      camera.position.set(1.25,0,10);camera.lookAt(1.25,0,0);
      const geometry=new THREE.BoxGeometry(.7,.7,.7),material=new THREE.MeshBasicMaterial({color:'white'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const instances=new THREE.InstancedMesh(geometry,material,3);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let selected=null,hits=[];
      function reset(){for(let i=0;i<3;i++){instances.setMatrixAt(i,matrix.makeTranslation((i-1)*1.5,0,0));instances.setColorAt(i,new THREE.Color('#2563eb'));}instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;instances.computeBoundingBox();instances.computeBoundingSphere();selected=null;hits=[];draw();}
      function pick(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);if(!document.querySelector('#picking').checked)return;scene.updateMatrixWorld(true);camera.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);hits=raycaster.intersectObject(instances);selected=hits[0]?.instanceId??null;draw();}
      canvas.addEventListener('pointerdown',pick,{signal:events.signal});

      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent='instanceId: '+selected+' / matrix.version: '+instances.instanceMatrix.version+' / color.version: '+instances.instanceColor.version+' / bounds center: '+instances.boundingSphere.center.toArray()+' / radius: '+instances.boundingSphere.radius.toFixed(3);}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(selected===null||!input.value||!input.checkValidity())return;instances.setMatrixAt(selected,matrix.makeTranslation(Number(input.value),0,0));instances.setColorAt(selected,new THREE.Color('#ef4444'));if(document.querySelector('#upload').checked){instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;}if(document.querySelector('#bounds').checked){instances.computeBoundingBox();instances.computeBoundingSphere();}draw();});on('#reset','click',reset);reset();

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

- 이동 전에 중앙 큐브가 선택됐는지 확인하세요.
- matrix와 color 버퍼에는 별도 업로드 플래그가 있습니다.
- upload를 켜고 X=4를 적용해 선택한 큐브만 옮기세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

setMatrixAt과 setColorAt은 서로 다른 버퍼를 씁니다. 위치만 올리면 색이 이전 상태에 남을 수 있습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>위치와 색 변경</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>위치와 색 변경</h1>
    <p>
      중앙 파랑 큐브를 클릭해 instanceId=1을 선택하세요. X=4로 적용하면 선택한
      큐브만 오른쪽으로 이동하고 빨강이 됩니다. 새 위치를 다시 클릭하세요.
      경계가 낡으면 보이는 큐브도 raycast가 놓칠 수 있습니다. 복구 후에는 다시
      중앙을 선택합니다.
    </p>
    <div class="controls">
      <label
        >선택한 X<input
          id="value"
          type="number"
          value="4"
          min="-4"
          max="4"
          step="0.25" /></label
      ><label><input id="picking" type="checkbox" checked />포인터 선택</label
      ><label><input id="upload" type="checkbox" checked />행렬·색 업로드</label
      ><label><input id="bounds" type="checkbox" checked />경계 재계산</label
      ><button id="reset">배치 복구</button><button id="apply">적용</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="위치와 색 변경"></canvas></div>
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
      camera.position.set(1.25,0,10);camera.lookAt(1.25,0,0);
      const geometry=new THREE.BoxGeometry(.7,.7,.7),material=new THREE.MeshBasicMaterial({color:'white'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const instances=new THREE.InstancedMesh(geometry,material,3);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let selected=null,hits=[];
      function reset(){for(let i=0;i<3;i++){instances.setMatrixAt(i,matrix.makeTranslation((i-1)*1.5,0,0));instances.setColorAt(i,new THREE.Color('#2563eb'));}instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;instances.computeBoundingBox();instances.computeBoundingSphere();selected=null;hits=[];draw();}
      function pick(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);if(!document.querySelector('#picking').checked)return;scene.updateMatrixWorld(true);camera.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);hits=raycaster.intersectObject(instances);selected=hits[0]?.instanceId??null;draw();}
      canvas.addEventListener('pointerdown',pick,{signal:events.signal});

      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent='instanceId: '+selected+' / matrix.version: '+instances.instanceMatrix.version+' / color.version: '+instances.instanceColor.version+' / bounds center: '+instances.boundingSphere.center.toArray()+' / radius: '+instances.boundingSphere.radius.toFixed(3);}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(selected===null||!input.value||!input.checkValidity())return;instances.setMatrixAt(selected,matrix.makeTranslation(Number(input.value),0,0));instances.setColorAt(selected,new THREE.Color('#ef4444'));if(document.querySelector('#upload').checked){instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;}if(document.querySelector('#bounds').checked){instances.computeBoundingBox();instances.computeBoundingSphere();}draw();});on('#reset','click',reset);reset();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='정리 완료';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 행렬만 업로드하면 색도 바뀌나요?

### 새 경계에서 다시 선택

시작은 경계 재계산이 꺼져 있습니다. 중앙 선택→X=4 적용→새 빨강 큐브 클릭을 실행하세요. 옛 sphere가 raycast를 먼저 거르므로 null이 됩니다. 경계 재계산을 켜고 배치 복구→중앙 선택→적용→새 위치 선택을 반복하세요.

**예상 결과**

경계 갱신 전 새 위치는 null, 갱신 뒤에는 instanceId=1입니다. sphere center와 radius도 바뀝니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>경계 갱신과 재선택</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>경계 갱신과 재선택</h1>
    <p>
      중앙 파랑 큐브를 클릭해 instanceId=1을 선택하세요. X=4로 적용하면 선택한
      큐브만 오른쪽으로 이동하고 빨강이 됩니다. 새 위치를 다시 클릭하세요.
      경계가 낡으면 보이는 큐브도 raycast가 놓칠 수 있습니다. 복구 후에는 다시
      중앙을 선택합니다.
    </p>
    <div class="controls">
      <label
        >선택한 X<input
          id="value"
          type="number"
          value="4"
          min="-4"
          max="4"
          step="0.25" /></label
      ><label><input id="picking" type="checkbox" checked />포인터 선택</label
      ><label><input id="upload" type="checkbox" checked />행렬·색 업로드</label
      ><label><input id="bounds" type="checkbox" />경계 재계산</label
      ><button id="reset">배치 복구</button><button id="apply">적용</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="경계 갱신과 재선택"></canvas></div>
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
      camera.position.set(1.25,0,10);camera.lookAt(1.25,0,0);
      const geometry=new THREE.BoxGeometry(.7,.7,.7),material=new THREE.MeshBasicMaterial({color:'white'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const instances=new THREE.InstancedMesh(geometry,material,3);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let selected=null,hits=[];
      function reset(){for(let i=0;i<3;i++){instances.setMatrixAt(i,matrix.makeTranslation((i-1)*1.5,0,0));instances.setColorAt(i,new THREE.Color('#2563eb'));}instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;instances.computeBoundingBox();instances.computeBoundingSphere();selected=null;hits=[];draw();}
      function pick(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);if(!document.querySelector('#picking').checked)return;scene.updateMatrixWorld(true);camera.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);hits=raycaster.intersectObject(instances);selected=hits[0]?.instanceId??null;draw();}
      canvas.addEventListener('pointerdown',pick,{signal:events.signal});

      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent='instanceId: '+selected+' / matrix.version: '+instances.instanceMatrix.version+' / color.version: '+instances.instanceColor.version+' / bounds center: '+instances.boundingSphere.center.toArray()+' / radius: '+instances.boundingSphere.radius.toFixed(3);}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(selected===null||!input.value||!input.checkValidity())return;instances.setMatrixAt(selected,matrix.makeTranslation(Number(input.value),0,0));instances.setColorAt(selected,new THREE.Color('#ef4444'));if(document.querySelector('#upload').checked){instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;}if(document.querySelector('#bounds').checked){instances.computeBoundingBox();instances.computeBoundingSphere();}draw();});on('#reset','click',reset);reset();

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

- 보이는 새 위치에서 선택이 실패하는지 확인하세요.
- raycast는 인스턴스보다 전체 boundingSphere를 먼저 검사합니다.
- 경계 재계산을 켠 뒤 복구→중앙 선택→X=4 적용→새 위치 선택을 반복하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

행렬 업로드와 CPU bounds 갱신은 별개입니다. setMatrixAt 뒤 computeBoundingBox와 computeBoundingSphere를 호출합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>경계 갱신과 재선택</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>경계 갱신과 재선택</h1>
    <p>
      중앙 파랑 큐브를 클릭해 instanceId=1을 선택하세요. X=4로 적용하면 선택한
      큐브만 오른쪽으로 이동하고 빨강이 됩니다. 새 위치를 다시 클릭하세요.
      경계가 낡으면 보이는 큐브도 raycast가 놓칠 수 있습니다. 복구 후에는 다시
      중앙을 선택합니다.
    </p>
    <div class="controls">
      <label
        >선택한 X<input
          id="value"
          type="number"
          value="4"
          min="-4"
          max="4"
          step="0.25" /></label
      ><label><input id="picking" type="checkbox" checked />포인터 선택</label
      ><label><input id="upload" type="checkbox" checked />행렬·색 업로드</label
      ><label><input id="bounds" type="checkbox" checked />경계 재계산</label
      ><button id="reset">배치 복구</button><button id="apply">적용</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="경계 갱신과 재선택"></canvas></div>
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
      camera.position.set(1.25,0,10);camera.lookAt(1.25,0,0);
      const geometry=new THREE.BoxGeometry(.7,.7,.7),material=new THREE.MeshBasicMaterial({color:'white'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const instances=new THREE.InstancedMesh(geometry,material,3);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let selected=null,hits=[];
      function reset(){for(let i=0;i<3;i++){instances.setMatrixAt(i,matrix.makeTranslation((i-1)*1.5,0,0));instances.setColorAt(i,new THREE.Color('#2563eb'));}instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;instances.computeBoundingBox();instances.computeBoundingSphere();selected=null;hits=[];draw();}
      function pick(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);if(!document.querySelector('#picking').checked)return;scene.updateMatrixWorld(true);camera.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);hits=raycaster.intersectObject(instances);selected=hits[0]?.instanceId??null;draw();}
      canvas.addEventListener('pointerdown',pick,{signal:events.signal});

      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent='instanceId: '+selected+' / matrix.version: '+instances.instanceMatrix.version+' / color.version: '+instances.instanceColor.version+' / bounds center: '+instances.boundingSphere.center.toArray()+' / radius: '+instances.boundingSphere.radius.toFixed(3);}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(selected===null||!input.value||!input.checkValidity())return;instances.setMatrixAt(selected,matrix.makeTranslation(Number(input.value),0,0));instances.setColorAt(selected,new THREE.Color('#ef4444'));if(document.querySelector('#upload').checked){instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;}if(document.querySelector('#bounds').checked){instances.computeBoundingBox();instances.computeBoundingSphere();}draw();});on('#reset','click',reset);reset();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='정리 완료';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 화면에 보이는 큐브를 raycast가 놓치는 이유는 무엇인가요?

### API · Raycaster.intersectObject

메시의 교차 목록에서 instanceId를 읽습니다.

- `object: Object3D` — 검사할 메시

가까운 순서의 교차 배열을 반환합니다.

- InstancedMesh는 여러 교차가 같은 object를 가리킵니다.

```js
const id=raycaster.intersectObject(mesh)[0]?.instanceId;
```

[Raycaster.intersectObject](https://threejs.org/docs/pages/Raycaster.html) · three@0.186.1 · 2026-10-27

### API · InstancedMesh.setColorAt

인스턴스 색을 CPU 버퍼에 씁니다.

- `index: number` — 인스턴스 번호
- `color: Color` — 색 객체

반환값은 없습니다.

- instanceColor.needsUpdate를 별도로 설정합니다.

```js
mesh.setColorAt(1,new THREE.Color(0xff0000));mesh.instanceColor.needsUpdate=true;
```

[InstancedMesh.setColorAt](https://threejs.org/docs/pages/InstancedMesh.html) · three@0.186.1 · 2026-10-27

### API · InstancedMesh.computeBoundingSphere

모든 인스턴스의 새 경계를 계산합니다.

boundingSphere를 갱신합니다. boundingBox는 computeBoundingBox로 계산합니다.

- 기존 sphere가 있으면 raycast가 자동 갱신하지 않습니다.

```js
mesh.computeBoundingBox();mesh.computeBoundingSphere();
```

[InstancedMesh.computeBoundingSphere](https://threejs.org/docs/pages/InstancedMesh.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 인스턴싱 기초](../19/README.md) · [다음: 화면 밖 객체와 상세도](../21/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
