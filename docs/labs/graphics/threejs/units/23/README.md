# Three.js · 23 자원 소유권 장부

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 자원 수명·접근성·측정 · 편집 가능한 예제 · 저장 ID: `threejs-step-23`

## 목표와 학습 후 역량

- remove 후 children=1, disposed=0이며 다시 연결하면 children=2입니다.
- 첫 소유자 해제는 ref=1·disposed=0, 마지막 해제 후 collect는 ref=0·disposed=2입니다.

## 선수 지식

선수 단원: 07, 10, 14, 22. 이번 실험에서 이어갑니다.

## 핵심 개념과 설명

### 연결 해제와 GPU 자원

remove 버튼을 누르세요. 왼쪽 큐브는 사라지지만 geometry와 material의 dispose 횟수는 0입니다. 다시 연결하면 같은 참조로 그립니다. 제거는 부모 연결만 끊습니다.

### 마지막 사용자의 해제

release A 다음 release B를 누르세요. 시작의 해제 허용이 꺼져 있으면 마지막 참조가 없어져도 GPU 해제 이벤트는 없습니다. 해제 허용을 켠 뒤 collect를 눌러 geometry와 material을 각각 한 번 해제하세요.

## 실습 준비

사이트에서 독립 HTML을 편집·실행합니다. Three.js 0.186.1을 사용하며 별도 설치·서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. remove 버튼을 누르세요. 왼쪽 큐브는 사라지지만 geometry와 material의 dispose 횟수는 0입니다. 다시 연결하면 같은 참조로 그립니다. 제거는 부모 연결만 끊습니다.
2. release A 다음 release B를 누르세요. 시작의 해제 허용이 꺼져 있으면 마지막 참조가 없어져도 GPU 해제 이벤트는 없습니다. 해제 허용을 켠 뒤 collect를 눌러 geometry와 material을 각각 한 번 해제하세요.
3. 공유 장부를 켜세요. A와 B는 같은 geometry와 material을 사용하므로 ref=2입니다. release A 후 B를 확인하고 release B를 누르세요. cycle을 3회 누르면 매회 geometry·material 각 1개 생성·해제됩니다. 전체 정리를 두 번 호출해도 중복 해제는 없어야 합니다.

## 관찰할 변수

| 변수                 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                                                |
| -------------------- | --------- | --------- | -------------------------------------------------------------------- |
| 연결 해제와 GPU 자원 | starter   | solution  | remove 후 children=1, disposed=0이며 다시 연결하면 children=2입니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] remove 후 children=1, disposed=0이며 다시 연결하면 children=2입니다.
- [ ] 첫 소유자 해제는 ref=1·disposed=0, 마지막 해제 후 collect는 ref=0·disposed=2입니다.

## 자가 점검

1. 장면에서 빠진 객체를 다시 쓸 수 있는 이유는 무엇인가요?
2. remove만 호출하면 GPU 자원 정리가 끝나나요?
3. 공유 자원을 각 Mesh가 바로 dispose하면 무엇이 잘못되나요?

## 공식 참고

- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)
- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-23/example.html) · [실행 환경과 제한](../../../../../examples.md)

HTML 시작 코드에서 과제를 수행하고 실제 관찰값과 조건을 기존 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-23/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

remove 버튼을 누르세요. 왼쪽 큐브는 사라지지만 geometry와 material의 dispose 횟수는 0입니다. 다시 연결하면 같은 참조로 그립니다. 제거는 부모 연결만 끊습니다.

### 선수 단원

- `threejs-step-07`
- `threejs-step-10`
- `threejs-02`
- `threejs-step-22`

### 연결 해제와 GPU 자원

remove 버튼을 누르세요. 왼쪽 큐브는 사라지지만 geometry와 material의 dispose 횟수는 0입니다. 다시 연결하면 같은 참조로 그립니다. 제거는 부모 연결만 끊습니다.

**예상 결과**

remove 후 children=1, disposed=0이며 다시 연결하면 children=2입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>연결 해제와 GPU 자원</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>연결 해제와 GPU 자원</h1>
    <p>
      remove 버튼을 누르세요. 왼쪽 큐브는 사라지지만 geometry와 material의
      dispose 횟수는 0입니다. 다시 연결하면 같은 참조로 그립니다. 제거는 부모
      연결만 끊습니다.
    </p>
    <div class="controls">
      <label><input id="disposal" type="checkbox" checked />해제 허용</label
      ><label><input id="ledger" type="checkbox" checked />공유 장부</label
      ><button id="remove">remove</button><button id="attach">다시 연결</button
      ><button id="release-a">release A</button
      ><button id="release-b">release B</button
      ><button id="collect">collect</button><button id="cycle">cycle</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="연결 해제와 GPU 자원"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};const ledger=new Map();const released=new Set();
      function own(resource,type){ledger.set(resource,{refs:2,type});counts[type==='geometry'?'createdGeometry':'createdMaterial']++;resource.addEventListener('dispose',()=>counts[type]++);return resource;}
      const geometry=own(new THREE.BoxGeometry(),'geometry'),material=own(new THREE.MeshBasicMaterial({color:'#2563eb'}),'material');const a=new THREE.Mesh(geometry,material),b=new THREE.Mesh(geometry,material);a.position.x=-1.2;b.position.x=1.2;scene.add(a,b);
      function collect(){if(!document.querySelector('#disposal').checked)return;for(const [r,e]of ledger)if(e.refs===0){r.dispose();ledger.delete(r);}}
      function release(mesh){if(released.has(mesh))return;released.add(mesh);scene.remove(mesh);if(document.querySelector('#ledger').checked)for(const r of [mesh.geometry,mesh.material]){const e=ledger.get(r);if(e)e.refs--;}collect();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({children:scene.children.length,refs:[...ledger.values()].map(e=>e.refs),disposed:counts.geometry+counts.material,...counts});}
      on('#remove','click',()=>{scene.remove(a);draw();});on('#attach','click',()=>{if(!released.has(a))scene.add(a);draw();});on('#release-a','click',()=>{release(a);draw();});on('#release-b','click',()=>{release(b);draw();});on('#collect','click',()=>{collect();draw();});
      on('#cycle','click',()=>{const g=new THREE.BoxGeometry(),m=new THREE.MeshBasicMaterial({color:'#f97316'});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const pair=[new THREE.Mesh(g,m),new THREE.Mesh(g,m)];pair[0].position.x=-1;pair[1].position.x=1;scene.add(...pair);renderer.render(scene,camera);scene.remove(...pair);g.dispose();m.dispose();counts.cycles++;draw();});function releaseAll(){for(const r of ledger.keys())r.dispose();ledger.clear();}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- a.parent와 dispose 이벤트를 따로 관찰하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

remove 후 children=1, disposed=0이며 다시 연결하면 children=2입니다. a.parent와 dispose 이벤트를 따로 관찰하세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>연결 해제와 GPU 자원</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>연결 해제와 GPU 자원</h1>
    <p>
      remove 버튼을 누르세요. 왼쪽 큐브는 사라지지만 geometry와 material의
      dispose 횟수는 0입니다. 다시 연결하면 같은 참조로 그립니다. 제거는 부모
      연결만 끊습니다.
    </p>
    <div class="controls">
      <label><input id="disposal" type="checkbox" checked />해제 허용</label
      ><label><input id="ledger" type="checkbox" checked />공유 장부</label
      ><button id="remove">remove</button><button id="attach">다시 연결</button
      ><button id="release-a">release A</button
      ><button id="release-b">release B</button
      ><button id="collect">collect</button><button id="cycle">cycle</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="연결 해제와 GPU 자원"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};const ledger=new Map();const released=new Set();
      function own(resource,type){ledger.set(resource,{refs:2,type});counts[type==='geometry'?'createdGeometry':'createdMaterial']++;resource.addEventListener('dispose',()=>counts[type]++);return resource;}
      const geometry=own(new THREE.BoxGeometry(),'geometry'),material=own(new THREE.MeshBasicMaterial({color:'#2563eb'}),'material');const a=new THREE.Mesh(geometry,material),b=new THREE.Mesh(geometry,material);a.position.x=-1.2;b.position.x=1.2;scene.add(a,b);scene.remove(a);
      function collect(){if(!document.querySelector('#disposal').checked)return;for(const [r,e]of ledger)if(e.refs===0){r.dispose();ledger.delete(r);}}
      function release(mesh){if(released.has(mesh))return;released.add(mesh);scene.remove(mesh);if(document.querySelector('#ledger').checked)for(const r of [mesh.geometry,mesh.material]){const e=ledger.get(r);if(e)e.refs--;}collect();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({children:scene.children.length,refs:[...ledger.values()].map(e=>e.refs),disposed:counts.geometry+counts.material,...counts});}
      on('#remove','click',()=>{scene.remove(a);draw();});on('#attach','click',()=>{if(!released.has(a))scene.add(a);draw();});on('#release-a','click',()=>{release(a);draw();});on('#release-b','click',()=>{release(b);draw();});on('#collect','click',()=>{collect();draw();});
      on('#cycle','click',()=>{const g=new THREE.BoxGeometry(),m=new THREE.MeshBasicMaterial({color:'#f97316'});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const pair=[new THREE.Mesh(g,m),new THREE.Mesh(g,m)];pair[0].position.x=-1;pair[1].position.x=1;scene.add(...pair);renderer.render(scene,camera);scene.remove(...pair);g.dispose();m.dispose();counts.cycles++;draw();});function releaseAll(){for(const r of ledger.keys())r.dispose();ledger.clear();}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 장면에서 빠진 객체를 다시 쓸 수 있는 이유는 무엇인가요?

### 마지막 사용자의 해제

release A 다음 release B를 누르세요. 시작의 해제 허용이 꺼져 있으면 마지막 참조가 없어져도 GPU 해제 이벤트는 없습니다. 해제 허용을 켠 뒤 collect를 눌러 geometry와 material을 각각 한 번 해제하세요.

**예상 결과**

첫 소유자 해제는 ref=1·disposed=0, 마지막 해제 후 collect는 ref=0·disposed=2입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>마지막 사용자의 해제</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>마지막 사용자의 해제</h1>
    <p>
      release A 다음 release B를 누르세요. 시작의 해제 허용이 꺼져 있으면 마지막
      참조가 없어져도 GPU 해제 이벤트는 없습니다. 해제 허용을 켠 뒤 collect를
      눌러 geometry와 material을 각각 한 번 해제하세요.
    </p>
    <div class="controls">
      <label><input id="disposal" type="checkbox" />해제 허용</label
      ><label><input id="ledger" type="checkbox" checked />공유 장부</label
      ><button id="remove">remove</button><button id="attach">다시 연결</button
      ><button id="release-a">release A</button
      ><button id="release-b">release B</button
      ><button id="collect">collect</button><button id="cycle">cycle</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="마지막 사용자의 해제"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};const ledger=new Map();const released=new Set();
      function own(resource,type){ledger.set(resource,{refs:2,type});counts[type==='geometry'?'createdGeometry':'createdMaterial']++;resource.addEventListener('dispose',()=>counts[type]++);return resource;}
      const geometry=own(new THREE.BoxGeometry(),'geometry'),material=own(new THREE.MeshBasicMaterial({color:'#2563eb'}),'material');const a=new THREE.Mesh(geometry,material),b=new THREE.Mesh(geometry,material);a.position.x=-1.2;b.position.x=1.2;scene.add(a,b);
      function collect(){if(!document.querySelector('#disposal').checked)return;for(const [r,e]of ledger)if(e.refs===0){r.dispose();ledger.delete(r);}}
      function release(mesh){if(released.has(mesh))return;released.add(mesh);scene.remove(mesh);if(document.querySelector('#ledger').checked)for(const r of [mesh.geometry,mesh.material]){const e=ledger.get(r);if(e)e.refs--;}collect();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({children:scene.children.length,refs:[...ledger.values()].map(e=>e.refs),disposed:counts.geometry+counts.material,...counts});}
      on('#remove','click',()=>{scene.remove(a);draw();});on('#attach','click',()=>{if(!released.has(a))scene.add(a);draw();});on('#release-a','click',()=>{release(a);draw();});on('#release-b','click',()=>{release(b);draw();});on('#collect','click',()=>{collect();draw();});
      on('#cycle','click',()=>{const g=new THREE.BoxGeometry(),m=new THREE.MeshBasicMaterial({color:'#f97316'});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const pair=[new THREE.Mesh(g,m),new THREE.Mesh(g,m)];pair[0].position.x=-1;pair[1].position.x=1;scene.add(...pair);renderer.render(scene,camera);scene.remove(...pair);g.dispose();m.dispose();counts.cycles++;draw();});function releaseAll(){for(const r of ledger.keys())r.dispose();ledger.clear();}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- ref가 0인 항목만 collect합니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

첫 소유자 해제는 ref=1·disposed=0, 마지막 해제 후 collect는 ref=0·disposed=2입니다. ref가 0인 항목만 collect합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>마지막 사용자의 해제</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>마지막 사용자의 해제</h1>
    <p>
      release A 다음 release B를 누르세요. 시작의 해제 허용이 꺼져 있으면 마지막
      참조가 없어져도 GPU 해제 이벤트는 없습니다. 해제 허용을 켠 뒤 collect를
      눌러 geometry와 material을 각각 한 번 해제하세요.
    </p>
    <div class="controls">
      <label><input id="disposal" type="checkbox" checked />해제 허용</label
      ><label><input id="ledger" type="checkbox" checked />공유 장부</label
      ><button id="remove">remove</button><button id="attach">다시 연결</button
      ><button id="release-a">release A</button
      ><button id="release-b">release B</button
      ><button id="collect">collect</button><button id="cycle">cycle</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="마지막 사용자의 해제"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};const ledger=new Map();const released=new Set();
      function own(resource,type){ledger.set(resource,{refs:2,type});counts[type==='geometry'?'createdGeometry':'createdMaterial']++;resource.addEventListener('dispose',()=>counts[type]++);return resource;}
      const geometry=own(new THREE.BoxGeometry(),'geometry'),material=own(new THREE.MeshBasicMaterial({color:'#2563eb'}),'material');const a=new THREE.Mesh(geometry,material),b=new THREE.Mesh(geometry,material);a.position.x=-1.2;b.position.x=1.2;scene.add(a,b);
      function collect(){if(!document.querySelector('#disposal').checked)return;for(const [r,e]of ledger)if(e.refs===0){r.dispose();ledger.delete(r);}}
      function release(mesh){if(released.has(mesh))return;released.add(mesh);scene.remove(mesh);if(document.querySelector('#ledger').checked)for(const r of [mesh.geometry,mesh.material]){const e=ledger.get(r);if(e)e.refs--;}collect();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({children:scene.children.length,refs:[...ledger.values()].map(e=>e.refs),disposed:counts.geometry+counts.material,...counts});}
      on('#remove','click',()=>{scene.remove(a);draw();});on('#attach','click',()=>{if(!released.has(a))scene.add(a);draw();});on('#release-a','click',()=>{release(a);draw();});on('#release-b','click',()=>{release(b);draw();});on('#collect','click',()=>{collect();draw();});
      on('#cycle','click',()=>{const g=new THREE.BoxGeometry(),m=new THREE.MeshBasicMaterial({color:'#f97316'});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const pair=[new THREE.Mesh(g,m),new THREE.Mesh(g,m)];pair[0].position.x=-1;pair[1].position.x=1;scene.add(...pair);renderer.render(scene,camera);scene.remove(...pair);g.dispose();m.dispose();counts.cycles++;draw();});function releaseAll(){for(const r of ledger.keys())r.dispose();ledger.clear();}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- remove만 호출하면 GPU 자원 정리가 끝나나요?

### 공유 소유권과 반복 정리

공유 장부를 켜세요. A와 B는 같은 geometry와 material을 사용하므로 ref=2입니다. release A 후 B를 확인하고 release B를 누르세요. cycle을 3회 누르면 매회 geometry·material 각 1개 생성·해제됩니다. 전체 정리를 두 번 호출해도 중복 해제는 없어야 합니다.

**예상 결과**

A 해제 후 B가 남고, 3 cycles 뒤 생성·해제 차이는 살아 있는 자원 수와 같습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>공유 소유권과 반복 정리</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>공유 소유권과 반복 정리</h1>
    <p>
      공유 장부를 켜세요. A와 B는 같은 geometry와 material을 사용하므로
      ref=2입니다. release A 후 B를 확인하고 release B를 누르세요. cycle을 3회
      누르면 매회 geometry·material 각 1개 생성·해제됩니다. 전체 정리를 두 번
      호출해도 중복 해제는 없어야 합니다.
    </p>
    <div class="controls">
      <label><input id="disposal" type="checkbox" checked />해제 허용</label
      ><label><input id="ledger" type="checkbox" />공유 장부</label
      ><button id="remove">remove</button><button id="attach">다시 연결</button
      ><button id="release-a">release A</button
      ><button id="release-b">release B</button
      ><button id="collect">collect</button><button id="cycle">cycle</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="공유 소유권과 반복 정리"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};const ledger=new Map();const released=new Set();
      function own(resource,type){ledger.set(resource,{refs:2,type});counts[type==='geometry'?'createdGeometry':'createdMaterial']++;resource.addEventListener('dispose',()=>counts[type]++);return resource;}
      const geometry=own(new THREE.BoxGeometry(),'geometry'),material=own(new THREE.MeshBasicMaterial({color:'#2563eb'}),'material');const a=new THREE.Mesh(geometry,material),b=new THREE.Mesh(geometry,material);a.position.x=-1.2;b.position.x=1.2;scene.add(a,b);
      function collect(){if(!document.querySelector('#disposal').checked)return;for(const [r,e]of ledger)if(e.refs===0){r.dispose();ledger.delete(r);}}
      function release(mesh){if(released.has(mesh))return;released.add(mesh);scene.remove(mesh);if(document.querySelector('#ledger').checked)for(const r of [mesh.geometry,mesh.material]){const e=ledger.get(r);if(e)e.refs--;}collect();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({children:scene.children.length,refs:[...ledger.values()].map(e=>e.refs),disposed:counts.geometry+counts.material,...counts});}
      on('#remove','click',()=>{scene.remove(a);draw();});on('#attach','click',()=>{if(!released.has(a))scene.add(a);draw();});on('#release-a','click',()=>{release(a);draw();});on('#release-b','click',()=>{release(b);draw();});on('#collect','click',()=>{collect();draw();});
      on('#cycle','click',()=>{const g=new THREE.BoxGeometry(),m=new THREE.MeshBasicMaterial({color:'#f97316'});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const pair=[new THREE.Mesh(g,m),new THREE.Mesh(g,m)];pair[0].position.x=-1;pair[1].position.x=1;scene.add(...pair);renderer.render(scene,camera);scene.remove(...pair);g.dispose();m.dispose();counts.cycles++;draw();});function releaseAll(){for(const r of ledger.keys())r.dispose();ledger.clear();}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 공유 장부를 끈 시작은 A를 제거해도 ref=2인 과다 보유 상태입니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

A 해제 후 B가 남고, 3 cycles 뒤 생성·해제 차이는 살아 있는 자원 수와 같습니다. 공유 장부를 끈 시작은 A를 제거해도 ref=2인 과다 보유 상태입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>공유 소유권과 반복 정리</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>공유 소유권과 반복 정리</h1>
    <p>
      공유 장부를 켜세요. A와 B는 같은 geometry와 material을 사용하므로
      ref=2입니다. release A 후 B를 확인하고 release B를 누르세요. cycle을 3회
      누르면 매회 geometry·material 각 1개 생성·해제됩니다. 전체 정리를 두 번
      호출해도 중복 해제는 없어야 합니다.
    </p>
    <div class="controls">
      <label><input id="disposal" type="checkbox" checked />해제 허용</label
      ><label><input id="ledger" type="checkbox" checked />공유 장부</label
      ><button id="remove">remove</button><button id="attach">다시 연결</button
      ><button id="release-a">release A</button
      ><button id="release-b">release B</button
      ><button id="collect">collect</button><button id="cycle">cycle</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <div id="stage"><canvas aria-label="공유 소유권과 반복 정리"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};const ledger=new Map();const released=new Set();
      function own(resource,type){ledger.set(resource,{refs:2,type});counts[type==='geometry'?'createdGeometry':'createdMaterial']++;resource.addEventListener('dispose',()=>counts[type]++);return resource;}
      const geometry=own(new THREE.BoxGeometry(),'geometry'),material=own(new THREE.MeshBasicMaterial({color:'#2563eb'}),'material');const a=new THREE.Mesh(geometry,material),b=new THREE.Mesh(geometry,material);a.position.x=-1.2;b.position.x=1.2;scene.add(a,b);
      function collect(){if(!document.querySelector('#disposal').checked)return;for(const [r,e]of ledger)if(e.refs===0){r.dispose();ledger.delete(r);}}
      function release(mesh){if(released.has(mesh))return;released.add(mesh);scene.remove(mesh);if(document.querySelector('#ledger').checked)for(const r of [mesh.geometry,mesh.material]){const e=ledger.get(r);if(e)e.refs--;}collect();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({children:scene.children.length,refs:[...ledger.values()].map(e=>e.refs),disposed:counts.geometry+counts.material,...counts});}
      on('#remove','click',()=>{scene.remove(a);draw();});on('#attach','click',()=>{if(!released.has(a))scene.add(a);draw();});on('#release-a','click',()=>{release(a);draw();});on('#release-b','click',()=>{release(b);draw();});on('#collect','click',()=>{collect();draw();});
      on('#cycle','click',()=>{const g=new THREE.BoxGeometry(),m=new THREE.MeshBasicMaterial({color:'#f97316'});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const pair=[new THREE.Mesh(g,m),new THREE.Mesh(g,m)];pair[0].position.x=-1;pair[1].position.x=1;scene.add(...pair);renderer.render(scene,camera);scene.remove(...pair);g.dispose();m.dispose();counts.cycles++;draw();});function releaseAll(){for(const r of ledger.keys())r.dispose();ledger.clear();}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 공유 자원을 각 Mesh가 바로 dispose하면 무엇이 잘못되나요?

### API · Object3D.remove / BufferGeometry.dispose

remove 후 children=1, disposed=0이며 다시 연결하면 children=2입니다. a.parent와 dispose 이벤트를 따로 관찰하세요.

- `...objects (remove only): Object3D[]` — remove할 자식들입니다. dispose에는 인자가 없습니다.

remove는 호출한 Object3D를 반환합니다. geometry.dispose는 undefined이며 GPU 관련 자원의 해제를 알립니다.

- 공유 장부를 끈 시작은 A를 제거해도 ref=2인 과다 보유 상태입니다.

```js
scene.remove(mesh); if(--entry.refs===0) geometry.dispose();
```

[Object3D.remove / BufferGeometry.dispose](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-27

### API · Material.dispose / Texture.dispose

material 해제는 map texture를 해제하지 않습니다. texture.dispose 뒤 해당 ImageBitmap의 마지막 소유자만 close합니다. render target은 자신의 texture를 소유합니다.

material.dispose·texture.dispose·image.close는 undefined를 반환합니다. material 해제는 texture를 해제하지 않습니다.

- material 해제는 map texture를 해제하지 않습니다. texture.dispose 뒤 해당 ImageBitmap의 마지막 소유자만 close합니다. render target은 자신의 texture를 소유합니다.

```js
texture.dispose(); texture.image?.close?.();
```

[Material.dispose / Texture.dispose](https://threejs.org/docs/pages/Texture.html) · three@0.186.1 · 2026-10-27

### API · release(mesh) — example ownership helper

같은 참조를 Set으로 모으고 Map에 사용자 수를 기록합니다. remove는 사용자 수를 자동으로 줄이지 않으므로 release가 연결 제거와 ref 감소를 함께 수행합니다.

- `mesh: Mesh` — 소유자 한 개를 해제할 Mesh입니다. 이 예제의 release helper에 전달합니다.

release helper는 undefined입니다. 연결 제거·refs 감소 후 마지막 사용자의 자원만 해제합니다.

- 같은 참조를 Set으로 모으고 Map에 사용자 수를 기록합니다. remove는 사용자 수를 자동으로 줄이지 않으므로 release가 연결 제거와 ref 감소를 함께 수행합니다.

```js
if (--entry.refs === 0) { resource.dispose(); ledger.delete(resource); }
```

[release(mesh) — example ownership helper](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 렌더 타깃과 미니맵](../22/README.md) · [다음: 비동기 장면 교체](../24/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
