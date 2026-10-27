# Three.js · 25 HTML 제어와 접근성

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 자원 수명·접근성·측정 · 편집 가능한 예제 · 저장 ID: `threejs-step-25`

## 목표와 학습 후 역량

- 선택 상태에 Right와 인덱스 1이 표시됩니다.
- 오른쪽은 camera.x를 1 증가시키고 확대는 z를 1 줄입니다.

## 선수 지식

선수 단원: 13, 14, 16. 이번 실험에서 이어갑니다.

## 핵심 개념과 설명

### canvas 밖의 객체 목록

객체 목록 연결을 켜고 적용하세요. Tab으로 객체 목록에 도달해 ArrowDown으로 Right를 선택합니다. 목록 change가 선택 상태와 텍스트를 함께 갱신합니다. canvas 이미지만으로는 선택 이름을 알 수 없습니다.

### 키보드로 카메라 조작

키보드 카메라를 켜고 적용하세요. Tab으로 카메라 버튼에 도달한 뒤 Enter로 오른쪽, 확대, 선택 맞춤을 실행합니다. 화면과 camera 좌표를 함께 읽으세요. 조작 버튼은 native button입니다.

## 실습 준비

사이트에서 독립 HTML을 편집·실행합니다. Three.js 0.186.1을 사용하며 별도 설치·서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 객체 목록 연결을 켜고 적용하세요. Tab으로 객체 목록에 도달해 ArrowDown으로 Right를 선택합니다. 목록 change가 선택 상태와 텍스트를 함께 갱신합니다. canvas 이미지만으로는 선택 이름을 알 수 없습니다.
2. 키보드 카메라를 켜고 적용하세요. Tab으로 카메라 버튼에 도달한 뒤 Enter로 오른쪽, 확대, 선택 맞춤을 실행합니다. 화면과 camera 좌표를 함께 읽으세요. 조작 버튼은 native button입니다.
3. 상태 알림을 켜고 적용하세요. Tab·Enter만으로 실패, 복구 버튼을 실행합니다. 실패 뒤 목록과 카메라 버튼이 남고 role=status가 오류와 복구 안내를 읽습니다. 복구 후 목록으로 초점을 돌립니다.

## 관찰할 변수

| 변수                  | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                      |
| --------------------- | --------- | --------- | ------------------------------------------ |
| canvas 밖의 객체 목록 | starter   | solution  | 선택 상태에 Right와 인덱스 1이 표시됩니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 선택 상태에 Right와 인덱스 1이 표시됩니다.
- [ ] 오른쪽은 camera.x를 1 증가시키고 확대는 z를 1 줄입니다.

## 자가 점검

1. 3D 객체의 이름을 화면 낭독기에 어떻게 전하나요?
2. 키보드 사용자가 현재 초점 위치를 어떻게 확인하나요?
3. 색 변화만으로 오류를 표현하면 무엇을 놓치나요?

## 공식 참고

- [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html)
- [Three.js OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-25/example.html) · [실행 환경과 제한](../../../../../examples.md)

HTML 시작 코드에서 과제를 수행하고 실제 관찰값과 조건을 기존 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-25/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

객체 목록 연결을 켜고 적용하세요. Tab으로 객체 목록에 도달해 ArrowDown으로 Right를 선택합니다. 목록 change가 선택 상태와 텍스트를 함께 갱신합니다. canvas 이미지만으로는 선택 이름을 알 수 없습니다.

### 선수 단원

- `threejs-step-13`
- `threejs-02`
- `threejs-step-16`

### canvas 밖의 객체 목록

객체 목록 연결을 켜고 적용하세요. Tab으로 객체 목록에 도달해 ArrowDown으로 Right를 선택합니다. 목록 change가 선택 상태와 텍스트를 함께 갱신합니다. canvas 이미지만으로는 선택 이름을 알 수 없습니다.

**예상 결과**

선택 상태에 Right와 인덱스 1이 표시됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>canvas 밖의 객체 목록</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>canvas 밖의 객체 목록</h1>
    <p>
      객체 목록 연결을 켜고 적용하세요. Tab으로 객체 목록에 도달해 ArrowDown으로
      Right를 선택합니다. 목록 change가 선택 상태와 텍스트를 함께 갱신합니다.
      canvas 이미지만으로는 선택 이름을 알 수 없습니다.
    </p>
    <div class="controls">
      <label><input id="wiring" type="checkbox" />객체 목록 연결</label
      ><label><input id="keys" type="checkbox" checked />키보드 카메라</label
      ><label><input id="announce" type="checkbox" checked />상태 알림</label
      ><button id="apply">적용</button
      ><label
        >객체 목록<select id="objects">
          <option>Left</option>
          <option>Right</option>
        </select></label
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="frame">선택 맞춤</button><button id="fail">실패 시험</button
      ><button id="recover">복구</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="canvas 밖의 객체 목록"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={geometry:0,material:0};const g=new THREE.BoxGeometry();ownedGeometry.add(g);g.addEventListener('dispose',()=>counts.geometry++);const meshes=['Left','Right'].map((name,i)=>{const m=new THREE.MeshBasicMaterial({color:i?'#f97316':'#2563eb'});ownedMaterial.add(m);m.addEventListener('dispose',()=>counts.material++);const o=new THREE.Mesh(g,m);o.name=name;o.position.x=i?1.2:-1.2;scene.add(o);return o;});let selected=0,status='ready';const target=new THREE.Vector3();
      function draw(){if(disposed||!stage.clientWidth)return;camera.lookAt(target);renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({selected,name:meshes[selected].name,camera:camera.position.toArray(),status});}
      on('#objects','change',()=>{if(document.querySelector('#wiring').checked)selected=document.querySelector('#objects').selectedIndex;draw();});on('#apply','click',()=>{output.setAttribute('aria-live',document.querySelector('#announce').checked?'polite':'off');draw();});on('#right','click',()=>{if(document.querySelector('#keys').checked)camera.position.x++;draw();});on('#zoom','click',()=>{if(document.querySelector('#keys').checked)camera.position.z--;draw();});on('#frame','click',()=>{if(document.querySelector('#keys').checked){target.copy(meshes[selected].position);camera.position.set(target.x,2,5);}draw();});on('#fail','click',()=>{status='error';document.querySelector('#error').textContent="읽기 실패. 복구 버튼으로 다시 시도하세요.";draw();});on('#recover','click',()=>{status='ready';document.querySelector('#error').textContent="복구 완료. 객체 목록에서 선택하세요.";document.querySelector('#objects').focus();draw();});function releaseAll(){}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- label과 select의 연결, change 처리, 상태 문구를 확인하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

선택 상태에 Right와 인덱스 1이 표시됩니다. label과 select의 연결, change 처리, 상태 문구를 확인하세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>canvas 밖의 객체 목록</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>canvas 밖의 객체 목록</h1>
    <p>
      객체 목록 연결을 켜고 적용하세요. Tab으로 객체 목록에 도달해 ArrowDown으로
      Right를 선택합니다. 목록 change가 선택 상태와 텍스트를 함께 갱신합니다.
      canvas 이미지만으로는 선택 이름을 알 수 없습니다.
    </p>
    <div class="controls">
      <label><input id="wiring" type="checkbox" checked />객체 목록 연결</label
      ><label><input id="keys" type="checkbox" checked />키보드 카메라</label
      ><label><input id="announce" type="checkbox" checked />상태 알림</label
      ><button id="apply">적용</button
      ><label
        >객체 목록<select id="objects">
          <option>Left</option>
          <option>Right</option>
        </select></label
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="frame">선택 맞춤</button><button id="fail">실패 시험</button
      ><button id="recover">복구</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="canvas 밖의 객체 목록"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={geometry:0,material:0};const g=new THREE.BoxGeometry();ownedGeometry.add(g);g.addEventListener('dispose',()=>counts.geometry++);const meshes=['Left','Right'].map((name,i)=>{const m=new THREE.MeshBasicMaterial({color:i?'#f97316':'#2563eb'});ownedMaterial.add(m);m.addEventListener('dispose',()=>counts.material++);const o=new THREE.Mesh(g,m);o.name=name;o.position.x=i?1.2:-1.2;scene.add(o);return o;});let selected=0,status='ready';const target=new THREE.Vector3();
      function draw(){if(disposed||!stage.clientWidth)return;camera.lookAt(target);renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({selected,name:meshes[selected].name,camera:camera.position.toArray(),status});}
      on('#objects','change',()=>{if(document.querySelector('#wiring').checked)selected=document.querySelector('#objects').selectedIndex;draw();});on('#apply','click',()=>{output.setAttribute('aria-live',document.querySelector('#announce').checked?'polite':'off');draw();});on('#right','click',()=>{if(document.querySelector('#keys').checked)camera.position.x++;draw();});on('#zoom','click',()=>{if(document.querySelector('#keys').checked)camera.position.z--;draw();});on('#frame','click',()=>{if(document.querySelector('#keys').checked){target.copy(meshes[selected].position);camera.position.set(target.x,2,5);}draw();});on('#fail','click',()=>{status='error';document.querySelector('#error').textContent="읽기 실패. 복구 버튼으로 다시 시도하세요.";draw();});on('#recover','click',()=>{status='ready';document.querySelector('#error').textContent="복구 완료. 객체 목록에서 선택하세요.";document.querySelector('#objects').focus();draw();});function releaseAll(){}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 3D 객체의 이름을 화면 낭독기에 어떻게 전하나요?

### 키보드로 카메라 조작

키보드 카메라를 켜고 적용하세요. Tab으로 카메라 버튼에 도달한 뒤 Enter로 오른쪽, 확대, 선택 맞춤을 실행합니다. 화면과 camera 좌표를 함께 읽으세요. 조작 버튼은 native button입니다.

**예상 결과**

오른쪽은 camera.x를 1 증가시키고 확대는 z를 1 줄입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>키보드로 카메라 조작</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>키보드로 카메라 조작</h1>
    <p>
      키보드 카메라를 켜고 적용하세요. Tab으로 카메라 버튼에 도달한 뒤 Enter로
      오른쪽, 확대, 선택 맞춤을 실행합니다. 화면과 camera 좌표를 함께 읽으세요.
      조작 버튼은 native button입니다.
    </p>
    <div class="controls">
      <label><input id="wiring" type="checkbox" checked />객체 목록 연결</label
      ><label><input id="keys" type="checkbox" />키보드 카메라</label
      ><label><input id="announce" type="checkbox" checked />상태 알림</label
      ><button id="apply">적용</button
      ><label
        >객체 목록<select id="objects">
          <option>Left</option>
          <option>Right</option>
        </select></label
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="frame">선택 맞춤</button><button id="fail">실패 시험</button
      ><button id="recover">복구</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="키보드로 카메라 조작"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={geometry:0,material:0};const g=new THREE.BoxGeometry();ownedGeometry.add(g);g.addEventListener('dispose',()=>counts.geometry++);const meshes=['Left','Right'].map((name,i)=>{const m=new THREE.MeshBasicMaterial({color:i?'#f97316':'#2563eb'});ownedMaterial.add(m);m.addEventListener('dispose',()=>counts.material++);const o=new THREE.Mesh(g,m);o.name=name;o.position.x=i?1.2:-1.2;scene.add(o);return o;});let selected=0,status='ready';const target=new THREE.Vector3();
      function draw(){if(disposed||!stage.clientWidth)return;camera.lookAt(target);renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({selected,name:meshes[selected].name,camera:camera.position.toArray(),status});}
      on('#objects','change',()=>{if(document.querySelector('#wiring').checked)selected=document.querySelector('#objects').selectedIndex;draw();});on('#apply','click',()=>{output.setAttribute('aria-live',document.querySelector('#announce').checked?'polite':'off');draw();});on('#right','click',()=>{if(document.querySelector('#keys').checked)camera.position.x++;draw();});on('#zoom','click',()=>{if(document.querySelector('#keys').checked)camera.position.z--;draw();});on('#frame','click',()=>{if(document.querySelector('#keys').checked){target.copy(meshes[selected].position);camera.position.set(target.x,2,5);}draw();});on('#fail','click',()=>{status='error';document.querySelector('#error').textContent="읽기 실패. 복구 버튼으로 다시 시도하세요.";draw();});on('#recover','click',()=>{status='ready';document.querySelector('#error').textContent="복구 완료. 객체 목록에서 선택하세요.";document.querySelector('#objects').focus();draw();});function releaseAll(){}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- canvas keydown에 모든 기능을 숨기지 마세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

오른쪽은 camera.x를 1 증가시키고 확대는 z를 1 줄입니다. canvas keydown에 모든 기능을 숨기지 마세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>키보드로 카메라 조작</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>키보드로 카메라 조작</h1>
    <p>
      키보드 카메라를 켜고 적용하세요. Tab으로 카메라 버튼에 도달한 뒤 Enter로
      오른쪽, 확대, 선택 맞춤을 실행합니다. 화면과 camera 좌표를 함께 읽으세요.
      조작 버튼은 native button입니다.
    </p>
    <div class="controls">
      <label><input id="wiring" type="checkbox" checked />객체 목록 연결</label
      ><label><input id="keys" type="checkbox" checked />키보드 카메라</label
      ><label><input id="announce" type="checkbox" checked />상태 알림</label
      ><button id="apply">적용</button
      ><label
        >객체 목록<select id="objects">
          <option>Left</option>
          <option>Right</option>
        </select></label
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="frame">선택 맞춤</button><button id="fail">실패 시험</button
      ><button id="recover">복구</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="키보드로 카메라 조작"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={geometry:0,material:0};const g=new THREE.BoxGeometry();ownedGeometry.add(g);g.addEventListener('dispose',()=>counts.geometry++);const meshes=['Left','Right'].map((name,i)=>{const m=new THREE.MeshBasicMaterial({color:i?'#f97316':'#2563eb'});ownedMaterial.add(m);m.addEventListener('dispose',()=>counts.material++);const o=new THREE.Mesh(g,m);o.name=name;o.position.x=i?1.2:-1.2;scene.add(o);return o;});let selected=0,status='ready';const target=new THREE.Vector3();
      function draw(){if(disposed||!stage.clientWidth)return;camera.lookAt(target);renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({selected,name:meshes[selected].name,camera:camera.position.toArray(),status});}
      on('#objects','change',()=>{if(document.querySelector('#wiring').checked)selected=document.querySelector('#objects').selectedIndex;draw();});on('#apply','click',()=>{output.setAttribute('aria-live',document.querySelector('#announce').checked?'polite':'off');draw();});on('#right','click',()=>{if(document.querySelector('#keys').checked)camera.position.x++;draw();});on('#zoom','click',()=>{if(document.querySelector('#keys').checked)camera.position.z--;draw();});on('#frame','click',()=>{if(document.querySelector('#keys').checked){target.copy(meshes[selected].position);camera.position.set(target.x,2,5);}draw();});on('#fail','click',()=>{status='error';document.querySelector('#error').textContent="읽기 실패. 복구 버튼으로 다시 시도하세요.";draw();});on('#recover','click',()=>{status='ready';document.querySelector('#error').textContent="복구 완료. 객체 목록에서 선택하세요.";document.querySelector('#objects').focus();draw();});function releaseAll(){}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 키보드 사용자가 현재 초점 위치를 어떻게 확인하나요?

### 오류 알림과 복구 초점

상태 알림을 켜고 적용하세요. Tab·Enter만으로 실패, 복구 버튼을 실행합니다. 실패 뒤 목록과 카메라 버튼이 남고 role=status가 오류와 복구 안내를 읽습니다. 복구 후 목록으로 초점을 돌립니다.

**예상 결과**

실패 상태가 텍스트로 표시되고 복구 후 객체 목록에 초점이 있습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>오류 알림과 복구 초점</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>오류 알림과 복구 초점</h1>
    <p>
      상태 알림을 켜고 적용하세요. Tab·Enter만으로 실패, 복구 버튼을 실행합니다.
      실패 뒤 목록과 카메라 버튼이 남고 role=status가 오류와 복구 안내를
      읽습니다. 복구 후 목록으로 초점을 돌립니다.
    </p>
    <div class="controls">
      <label><input id="wiring" type="checkbox" checked />객체 목록 연결</label
      ><label><input id="keys" type="checkbox" checked />키보드 카메라</label
      ><label><input id="announce" type="checkbox" />상태 알림</label
      ><button id="apply">적용</button
      ><label
        >객체 목록<select id="objects">
          <option>Left</option>
          <option>Right</option>
        </select></label
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="frame">선택 맞춤</button><button id="fail">실패 시험</button
      ><button id="recover">복구</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="오류 알림과 복구 초점"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={geometry:0,material:0};const g=new THREE.BoxGeometry();ownedGeometry.add(g);g.addEventListener('dispose',()=>counts.geometry++);const meshes=['Left','Right'].map((name,i)=>{const m=new THREE.MeshBasicMaterial({color:i?'#f97316':'#2563eb'});ownedMaterial.add(m);m.addEventListener('dispose',()=>counts.material++);const o=new THREE.Mesh(g,m);o.name=name;o.position.x=i?1.2:-1.2;scene.add(o);return o;});let selected=0,status='ready';const target=new THREE.Vector3();
      function draw(){if(disposed||!stage.clientWidth)return;camera.lookAt(target);renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({selected,name:meshes[selected].name,camera:camera.position.toArray(),status});}
      on('#objects','change',()=>{if(document.querySelector('#wiring').checked)selected=document.querySelector('#objects').selectedIndex;draw();});on('#apply','click',()=>{output.setAttribute('aria-live',document.querySelector('#announce').checked?'polite':'off');draw();});on('#right','click',()=>{if(document.querySelector('#keys').checked)camera.position.x++;draw();});on('#zoom','click',()=>{if(document.querySelector('#keys').checked)camera.position.z--;draw();});on('#frame','click',()=>{if(document.querySelector('#keys').checked){target.copy(meshes[selected].position);camera.position.set(target.x,2,5);}draw();});on('#fail','click',()=>{status='error';document.querySelector('#error').textContent="읽기 실패. 복구 버튼으로 다시 시도하세요.";draw();});on('#recover','click',()=>{status='ready';document.querySelector('#error').textContent="복구 완료. 객체 목록에서 선택하세요.";document.querySelector('#objects').focus();draw();});function releaseAll(){}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- aria-live는 값 변화가 있어야 알릴 내용이 생깁니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

실패 상태가 텍스트로 표시되고 복구 후 객체 목록에 초점이 있습니다. aria-live는 값 변화가 있어야 알릴 내용이 생깁니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>오류 알림과 복구 초점</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>오류 알림과 복구 초점</h1>
    <p>
      상태 알림을 켜고 적용하세요. Tab·Enter만으로 실패, 복구 버튼을 실행합니다.
      실패 뒤 목록과 카메라 버튼이 남고 role=status가 오류와 복구 안내를
      읽습니다. 복구 후 목록으로 초점을 돌립니다.
    </p>
    <div class="controls">
      <label><input id="wiring" type="checkbox" checked />객체 목록 연결</label
      ><label><input id="keys" type="checkbox" checked />키보드 카메라</label
      ><label><input id="announce" type="checkbox" checked />상태 알림</label
      ><button id="apply">적용</button
      ><label
        >객체 목록<select id="objects">
          <option>Left</option>
          <option>Right</option>
        </select></label
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="frame">선택 맞춤</button><button id="fail">실패 시험</button
      ><button id="recover">복구</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="오류 알림과 복구 초점"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={geometry:0,material:0};const g=new THREE.BoxGeometry();ownedGeometry.add(g);g.addEventListener('dispose',()=>counts.geometry++);const meshes=['Left','Right'].map((name,i)=>{const m=new THREE.MeshBasicMaterial({color:i?'#f97316':'#2563eb'});ownedMaterial.add(m);m.addEventListener('dispose',()=>counts.material++);const o=new THREE.Mesh(g,m);o.name=name;o.position.x=i?1.2:-1.2;scene.add(o);return o;});let selected=0,status='ready';const target=new THREE.Vector3();
      function draw(){if(disposed||!stage.clientWidth)return;camera.lookAt(target);renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({selected,name:meshes[selected].name,camera:camera.position.toArray(),status});}
      on('#objects','change',()=>{if(document.querySelector('#wiring').checked)selected=document.querySelector('#objects').selectedIndex;draw();});on('#apply','click',()=>{output.setAttribute('aria-live',document.querySelector('#announce').checked?'polite':'off');draw();});on('#right','click',()=>{if(document.querySelector('#keys').checked)camera.position.x++;draw();});on('#zoom','click',()=>{if(document.querySelector('#keys').checked)camera.position.z--;draw();});on('#frame','click',()=>{if(document.querySelector('#keys').checked){target.copy(meshes[selected].position);camera.position.set(target.x,2,5);}draw();});on('#fail','click',()=>{status='error';document.querySelector('#error').textContent="읽기 실패. 복구 버튼으로 다시 시도하세요.";draw();});on('#recover','click',()=>{status='ready';document.querySelector('#error').textContent="복구 완료. 객체 목록에서 선택하세요.";document.querySelector('#objects').focus();draw();});function releaseAll(){}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 색 변화만으로 오류를 표현하면 무엇을 놓치나요?

### API · HTMLSelectElement / addEventListener

선택 상태에 Right와 인덱스 1이 표시됩니다. label과 select의 연결, change 처리, 상태 문구를 확인하세요.

- `type: string` — 이 예제에서는 change 이벤트입니다.
- `listener: EventListener` — 선택 인덱스를 읽고 상태 텍스트를 갱신합니다.

addEventListener는 undefined입니다. select.selectedIndex는 선택 인덱스 또는 -1이며 value는 문자열입니다.

- aria-live는 값 변화가 있어야 알릴 내용이 생깁니다.

```js
select.addEventListener('change',()=>{status.textContent=select.value;});
```

[HTMLSelectElement / addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement) · three@0.186.1 · 2026-10-27

### API · HTMLButtonElement / focus

button은 Tab으로 도달하고 Enter·Space로 실행합니다. 복구 뒤 select.focus로 객체 목록에 초점을 돌립니다. 명령의 접근성 이름과 초점 윤곽을 유지합니다.

- `options: FocusOptions | undefined` — 선택적 focus 옵션입니다. 예제는 인자 없이 호출합니다.

HTMLElement.focus는 undefined입니다. 성공 시 document.activeElement가 해당 목록이 됩니다.

- button은 Tab으로 도달하고 Enter·Space로 실행합니다. 복구 뒤 select.focus로 객체 목록에 초점을 돌립니다. 명령의 접근성 이름과 초점 윤곽을 유지합니다.

```js
select.focus();
```

[HTMLButtonElement / focus](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role) · three@0.186.1 · 2026-10-27

### API · role=status / aria-live

role=status는 상태 변화를 알립니다. 오류 설명과 복구 방법을 텍스트로 남기고 목록·카메라 컨트롤을 제거하지 않습니다.

- `role / aria-live: string` — role=status, aria-live=polite 또는 off를 사용합니다.

HTML 속성이므로 함수 반환값은 없습니다. DOM에 바뀐 상태 텍스트를 노출합니다.

- role=status는 상태 변화를 알립니다. 오류 설명과 복구 방법을 텍스트로 남기고 목록·카메라 컨트롤을 제거하지 않습니다.

```js
status.textContent = "Load failed. Use Recover.";
```

[role=status / aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 비동기 장면 교체](../24/README.md) · [다음: 렌더 통계와 프로파일](../26/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
