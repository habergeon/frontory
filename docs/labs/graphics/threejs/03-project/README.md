# Three.js · 28 렌더링 자원과 측정

[시리즈 목차](../README.md) · [전체 기술 지도](../../../README.md)

단계: 자원 수명·접근성·측정 · 편집 가능한 예제 · 저장 ID: `threejs-03`

## 목표와 학습 후 역량

- 첫 측정 결과와 조건이 기록 영역에 추가됩니다.
- 8에서는 삼각형 수가 줄지만 윤곽도 달라집니다. 임의 개선율은 계산하지 않습니다.

## 선수 지식

선수 단원: 19, 23, 24, 26, 27. 이번 실험에서 이어갑니다.

## 핵심 개념과 설명

### 비교 기준을 실제로 저장

측정 버튼을 눌러 기준을 만드세요. 개수=8, 세그먼트=16, 패스=1을 유지하고 카메라·buffer·DPR·calls·triangles·CPU ms를 읽습니다. 초기 기록 없음 상태는 아직 측정하지 않았다는 뜻입니다.

### 품질과 비용을 따로 비교

세그먼트 16으로 측정한 뒤 8로 바꾸고 다시 측정하세요. 개수·패스·카메라는 고정합니다. 구의 윤곽과 triangles를 함께 보세요. 시작과 완성의 모양 차이가 품질 비용 비교입니다.

## 실습 준비

사이트에서 독립 HTML을 편집·실행합니다. Three.js 0.186.1을 사용하며 별도 설치·서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 측정 버튼을 눌러 기준을 만드세요. 개수=8, 세그먼트=16, 패스=1을 유지하고 카메라·buffer·DPR·calls·triangles·CPU ms를 읽습니다. 초기 기록 없음 상태는 아직 측정하지 않았다는 뜻입니다.
2. 세그먼트 16으로 측정한 뒤 8로 바꾸고 다시 측정하세요. 개수·패스·카메라는 고정합니다. 구의 윤곽과 triangles를 함께 보세요. 시작과 완성의 모양 차이가 품질 비용 비교입니다.
3. cycle을 3회 누르세요. 각 회차는 현재 자원을 해제하고 같은 조건으로 다시 만듭니다. geometry·material 생성과 해제 차이는 각각 1입니다. 자원 정리 후에는 차이가 0인지 기록하세요.
4. 16·8 세그먼트 비교와 3 cycles 결과를 만드세요. 보고서 선택 버튼을 누르고 Ctrl+C로 복사한 뒤 사이트 필기 탭에 붙여넣으세요. 조건·실제 수치·모양 차이·cleanup 결과·측정 한계를 자신의 말로 보충하고 기존 저장·백업을 사용하세요.

## 관찰할 변수

| 변수                    | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                         |
| ----------------------- | --------- | --------- | --------------------------------------------- |
| 비교 기준을 실제로 저장 | starter   | solution  | 첫 측정 결과와 조건이 기록 영역에 추가됩니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 첫 측정 결과와 조건이 기록 영역에 추가됩니다.
- [ ] 8에서는 삼각형 수가 줄지만 윤곽도 달라집니다. 임의 개선율은 계산하지 않습니다.

## 자가 점검

1. 조건을 빠뜨린 숫자를 나중에 비교할 수 있나요?
2. 낮은 삼각형 수를 품질 유지라고 바로 말할 수 있나요?
3. 자원 장부와 renderer.info.memory는 무엇이 다른가요?
4. CPU 호출 시간과 정확한 GPU 실행 시간은 왜 같지 않나요?

## 공식 참고

- [Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../src/labs/threejs-03/example.html) · [실행 환경과 제한](../../../../examples.md)

HTML 시작 코드에서 과제를 수행하고 실제 관찰값과 조건을 기존 필기에 남기세요.

- [example.html](../../../../../src/labs/threejs-03/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

측정 버튼을 눌러 기준을 만드세요. 개수=8, 세그먼트=16, 패스=1을 유지하고 카메라·buffer·DPR·calls·triangles·CPU ms를 읽습니다. 초기 기록 없음 상태는 아직 측정하지 않았다는 뜻입니다.

### 선수 단원

- `threejs-step-19`
- `threejs-step-23`
- `threejs-step-24`
- `threejs-step-26`
- `threejs-step-27`

### 비교 기준을 실제로 저장

측정 버튼을 눌러 기준을 만드세요. 개수=8, 세그먼트=16, 패스=1을 유지하고 카메라·buffer·DPR·calls·triangles·CPU ms를 읽습니다. 초기 기록 없음 상태는 아직 측정하지 않았다는 뜻입니다.

**예상 결과**

첫 측정 결과와 조건이 기록 영역에 추가됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>비교 기준을 실제로 저장</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>비교 기준을 실제로 저장</h1>
    <p>
      측정 버튼을 눌러 기준을 만드세요. 개수=8, 세그먼트=16, 패스=1을 유지하고
      카메라·buffer·DPR·calls·triangles·CPU ms를 읽습니다. 초기 기록 없음 상태는
      아직 측정하지 않았다는 뜻입니다.
    </p>
    <div class="controls">
      <label
        >개수<input
          id="count"
          type="number"
          value="8"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >세그먼트<input
          id="segments"
          type="number"
          value="16"
          min="8"
          max="32"
          step="8" /></label
      ><label
        >패스<input
          id="passes"
          type="number"
          value="1"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" checked />프레임 누적</label
      ><button id="apply">적용·측정</button><button id="cycle">cycle</button
      ><button id="select-report">보고서 선택</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p>
      CPU ms는 호출 경과 시간입니다. GPU 완료 시간·개선율을 뜻하지 않습니다.
      같은 장치·크기·카메라에서 비교하세요.
    </p>

    <div id="stage"><canvas aria-label="비교 기준을 실제로 저장"></canvas></div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=!document.querySelector('#totals').checked;renderer.info.reset();const start=performance.now();const passes=Number(document.querySelector('#passes').value);if(passes===2){renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}renderer.setRenderTarget(null);renderer.render(scene,camera);stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,lines:renderer.info.render.lines,cpuMs:performance.now()-start,count:meshes.length,segments:Number(document.querySelector('#segments').value),passes,buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),camera:camera.position.toArray(),memory:{...renderer.info.memory},...counts};frames++;output.textContent=JSON.stringify(stats);}
      function record(){records.push(JSON.parse(JSON.stringify(stats)));document.querySelector('#report').textContent=JSON.stringify({conditions:"같은 장치·크기·카메라. CPU 호출 시간은 GPU 시간과 다릅니다. 모양 차이와 정리 결과를 필기에 보충하세요.",records,cleanup:counts},null,2);}
      on('#apply','click',()=>{for(const id of ['count','segments','passes'])if(!document.querySelector('#'+id).checkValidity()||!document.querySelector('#'+id).value)return;rebuild();draw();record();});on('#cycle','click',()=>{counts.cycles++;rebuild();draw();record();});on('#select-report','click',()=>{const range=document.createRange();range.selectNodeContents(document.querySelector('#report'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#report').focus();});function releaseAll(){for(const mesh of meshes)scene.remove(mesh);meshes=[];if(g){g.dispose();g=null;}if(m){m.dispose();m=null;}if(disposed)record();}rebuild();

      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 측정 결과는 버튼을 누른 실제 프레임에서 가져옵니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

첫 측정 결과와 조건이 기록 영역에 추가됩니다. 측정 결과는 버튼을 누른 실제 프레임에서 가져옵니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>비교 기준을 실제로 저장</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>비교 기준을 실제로 저장</h1>
    <p>
      측정 버튼을 눌러 기준을 만드세요. 개수=8, 세그먼트=16, 패스=1을 유지하고
      카메라·buffer·DPR·calls·triangles·CPU ms를 읽습니다. 초기 기록 없음 상태는
      아직 측정하지 않았다는 뜻입니다.
    </p>
    <div class="controls">
      <label
        >개수<input
          id="count"
          type="number"
          value="8"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >세그먼트<input
          id="segments"
          type="number"
          value="16"
          min="8"
          max="32"
          step="8" /></label
      ><label
        >패스<input
          id="passes"
          type="number"
          value="1"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" checked />프레임 누적</label
      ><button id="apply">적용·측정</button><button id="cycle">cycle</button
      ><button id="select-report">보고서 선택</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p>
      CPU ms는 호출 경과 시간입니다. GPU 완료 시간·개선율을 뜻하지 않습니다.
      같은 장치·크기·카메라에서 비교하세요.
    </p>

    <div id="stage"><canvas aria-label="비교 기준을 실제로 저장"></canvas></div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=!document.querySelector('#totals').checked;renderer.info.reset();const start=performance.now();const passes=Number(document.querySelector('#passes').value);if(passes===2){renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}renderer.setRenderTarget(null);renderer.render(scene,camera);stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,lines:renderer.info.render.lines,cpuMs:performance.now()-start,count:meshes.length,segments:Number(document.querySelector('#segments').value),passes,buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),camera:camera.position.toArray(),memory:{...renderer.info.memory},...counts};frames++;output.textContent=JSON.stringify(stats);}
      function record(){records.push(JSON.parse(JSON.stringify(stats)));document.querySelector('#report').textContent=JSON.stringify({conditions:"같은 장치·크기·카메라. CPU 호출 시간은 GPU 시간과 다릅니다. 모양 차이와 정리 결과를 필기에 보충하세요.",records,cleanup:counts},null,2);}
      on('#apply','click',()=>{for(const id of ['count','segments','passes'])if(!document.querySelector('#'+id).checkValidity()||!document.querySelector('#'+id).value)return;rebuild();draw();record();});on('#cycle','click',()=>{counts.cycles++;rebuild();draw();record();});on('#select-report','click',()=>{const range=document.createRange();range.selectNodeContents(document.querySelector('#report'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#report').focus();});function releaseAll(){for(const mesh of meshes)scene.remove(mesh);meshes=[];if(g){g.dispose();g=null;}if(m){m.dispose();m=null;}if(disposed)record();}rebuild();queueMicrotask(()=>{draw();record();});

      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 조건을 빠뜨린 숫자를 나중에 비교할 수 있나요?

### 품질과 비용을 따로 비교

세그먼트 16으로 측정한 뒤 8로 바꾸고 다시 측정하세요. 개수·패스·카메라는 고정합니다. 구의 윤곽과 triangles를 함께 보세요. 시작과 완성의 모양 차이가 품질 비용 비교입니다.

**예상 결과**

8에서는 삼각형 수가 줄지만 윤곽도 달라집니다. 임의 개선율은 계산하지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>품질과 비용을 따로 비교</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>품질과 비용을 따로 비교</h1>
    <p>
      세그먼트 16으로 측정한 뒤 8로 바꾸고 다시 측정하세요. 개수·패스·카메라는
      고정합니다. 구의 윤곽과 triangles를 함께 보세요. 시작과 완성의 모양 차이가
      품질 비용 비교입니다.
    </p>
    <div class="controls">
      <label
        >개수<input
          id="count"
          type="number"
          value="8"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >세그먼트<input
          id="segments"
          type="number"
          value="16"
          min="8"
          max="32"
          step="8" /></label
      ><label
        >패스<input
          id="passes"
          type="number"
          value="1"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" checked />프레임 누적</label
      ><button id="apply">적용·측정</button><button id="cycle">cycle</button
      ><button id="select-report">보고서 선택</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p>
      CPU ms는 호출 경과 시간입니다. GPU 완료 시간·개선율을 뜻하지 않습니다.
      같은 장치·크기·카메라에서 비교하세요.
    </p>

    <div id="stage"><canvas aria-label="품질과 비용을 따로 비교"></canvas></div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=!document.querySelector('#totals').checked;renderer.info.reset();const start=performance.now();const passes=Number(document.querySelector('#passes').value);if(passes===2){renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}renderer.setRenderTarget(null);renderer.render(scene,camera);stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,lines:renderer.info.render.lines,cpuMs:performance.now()-start,count:meshes.length,segments:Number(document.querySelector('#segments').value),passes,buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),camera:camera.position.toArray(),memory:{...renderer.info.memory},...counts};frames++;output.textContent=JSON.stringify(stats);}
      function record(){records.push(JSON.parse(JSON.stringify(stats)));document.querySelector('#report').textContent=JSON.stringify({conditions:"같은 장치·크기·카메라. CPU 호출 시간은 GPU 시간과 다릅니다. 모양 차이와 정리 결과를 필기에 보충하세요.",records,cleanup:counts},null,2);}
      on('#apply','click',()=>{for(const id of ['count','segments','passes'])if(!document.querySelector('#'+id).checkValidity()||!document.querySelector('#'+id).value)return;rebuild();draw();record();});on('#cycle','click',()=>{counts.cycles++;rebuild();draw();record();});on('#select-report','click',()=>{const range=document.createRange();range.selectNodeContents(document.querySelector('#report'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#report').focus();});function releaseAll(){for(const mesh of meshes)scene.remove(mesh);meshes=[];if(g){g.dispose();g=null;}if(m){m.dispose();m=null;}if(disposed)record();}rebuild();

      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 같은 배치에서 geometry만 바꿉니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

8에서는 삼각형 수가 줄지만 윤곽도 달라집니다. 임의 개선율은 계산하지 않습니다. 같은 배치에서 geometry만 바꿉니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>품질과 비용을 따로 비교</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>품질과 비용을 따로 비교</h1>
    <p>
      세그먼트 16으로 측정한 뒤 8로 바꾸고 다시 측정하세요. 개수·패스·카메라는
      고정합니다. 구의 윤곽과 triangles를 함께 보세요. 시작과 완성의 모양 차이가
      품질 비용 비교입니다.
    </p>
    <div class="controls">
      <label
        >개수<input
          id="count"
          type="number"
          value="8"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >세그먼트<input
          id="segments"
          type="number"
          value="8"
          min="8"
          max="32"
          step="8" /></label
      ><label
        >패스<input
          id="passes"
          type="number"
          value="1"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" checked />프레임 누적</label
      ><button id="apply">적용·측정</button><button id="cycle">cycle</button
      ><button id="select-report">보고서 선택</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p>
      CPU ms는 호출 경과 시간입니다. GPU 완료 시간·개선율을 뜻하지 않습니다.
      같은 장치·크기·카메라에서 비교하세요.
    </p>

    <div id="stage"><canvas aria-label="품질과 비용을 따로 비교"></canvas></div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=!document.querySelector('#totals').checked;renderer.info.reset();const start=performance.now();const passes=Number(document.querySelector('#passes').value);if(passes===2){renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}renderer.setRenderTarget(null);renderer.render(scene,camera);stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,lines:renderer.info.render.lines,cpuMs:performance.now()-start,count:meshes.length,segments:Number(document.querySelector('#segments').value),passes,buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),camera:camera.position.toArray(),memory:{...renderer.info.memory},...counts};frames++;output.textContent=JSON.stringify(stats);}
      function record(){records.push(JSON.parse(JSON.stringify(stats)));document.querySelector('#report').textContent=JSON.stringify({conditions:"같은 장치·크기·카메라. CPU 호출 시간은 GPU 시간과 다릅니다. 모양 차이와 정리 결과를 필기에 보충하세요.",records,cleanup:counts},null,2);}
      on('#apply','click',()=>{for(const id of ['count','segments','passes'])if(!document.querySelector('#'+id).checkValidity()||!document.querySelector('#'+id).value)return;rebuild();draw();record();});on('#cycle','click',()=>{counts.cycles++;rebuild();draw();record();});on('#select-report','click',()=>{const range=document.createRange();range.selectNodeContents(document.querySelector('#report'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#report').focus();});function releaseAll(){for(const mesh of meshes)scene.remove(mesh);meshes=[];if(g){g.dispose();g=null;}if(m){m.dispose();m=null;}if(disposed)record();}rebuild();

      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 낮은 삼각형 수를 품질 유지라고 바로 말할 수 있나요?

### 생성·종료 반복의 장부

cycle을 3회 누르세요. 각 회차는 현재 자원을 해제하고 같은 조건으로 다시 만듭니다. geometry·material 생성과 해제 차이는 각각 1입니다. 자원 정리 후에는 차이가 0인지 기록하세요.

**예상 결과**

3 cycles 뒤 각 자원의 disposed는 3 증가하고 cleanup 뒤 created와 같습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>생성·종료 반복의 장부</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>생성·종료 반복의 장부</h1>
    <p>
      cycle을 3회 누르세요. 각 회차는 현재 자원을 해제하고 같은 조건으로 다시
      만듭니다. geometry·material 생성과 해제 차이는 각각 1입니다. 자원 정리
      후에는 차이가 0인지 기록하세요.
    </p>
    <div class="controls">
      <label
        >개수<input
          id="count"
          type="number"
          value="8"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >세그먼트<input
          id="segments"
          type="number"
          value="16"
          min="8"
          max="32"
          step="8" /></label
      ><label
        >패스<input
          id="passes"
          type="number"
          value="1"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" checked />프레임 누적</label
      ><button id="apply">적용·측정</button><button id="cycle">cycle</button
      ><button id="select-report">보고서 선택</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p>
      CPU ms는 호출 경과 시간입니다. GPU 완료 시간·개선율을 뜻하지 않습니다.
      같은 장치·크기·카메라에서 비교하세요.
    </p>

    <div id="stage"><canvas aria-label="생성·종료 반복의 장부"></canvas></div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=!document.querySelector('#totals').checked;renderer.info.reset();const start=performance.now();const passes=Number(document.querySelector('#passes').value);if(passes===2){renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}renderer.setRenderTarget(null);renderer.render(scene,camera);stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,lines:renderer.info.render.lines,cpuMs:performance.now()-start,count:meshes.length,segments:Number(document.querySelector('#segments').value),passes,buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),camera:camera.position.toArray(),memory:{...renderer.info.memory},...counts};frames++;output.textContent=JSON.stringify(stats);}
      function record(){records.push(JSON.parse(JSON.stringify(stats)));document.querySelector('#report').textContent=JSON.stringify({conditions:"같은 장치·크기·카메라. CPU 호출 시간은 GPU 시간과 다릅니다. 모양 차이와 정리 결과를 필기에 보충하세요.",records,cleanup:counts},null,2);}
      on('#apply','click',()=>{for(const id of ['count','segments','passes'])if(!document.querySelector('#'+id).checkValidity()||!document.querySelector('#'+id).value)return;rebuild();draw();record();});on('#cycle','click',()=>{counts.cycles++;rebuild();draw();record();});on('#select-report','click',()=>{const range=document.createRange();range.selectNodeContents(document.querySelector('#report'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#report').focus();});function releaseAll(){for(const mesh of meshes)scene.remove(mesh);meshes=[];if(g){g.dispose();g=null;}if(m){m.dispose();m=null;}if(disposed)record();}rebuild();

      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- renderer.info.memory는 내부 캐시까지 포함하므로 0만 기대하지 마세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

3 cycles 뒤 각 자원의 disposed는 3 증가하고 cleanup 뒤 created와 같습니다. renderer.info.memory는 내부 캐시까지 포함하므로 0만 기대하지 마세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>생성·종료 반복의 장부</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>생성·종료 반복의 장부</h1>
    <p>
      cycle을 3회 누르세요. 각 회차는 현재 자원을 해제하고 같은 조건으로 다시
      만듭니다. geometry·material 생성과 해제 차이는 각각 1입니다. 자원 정리
      후에는 차이가 0인지 기록하세요.
    </p>
    <div class="controls">
      <label
        >개수<input
          id="count"
          type="number"
          value="8"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >세그먼트<input
          id="segments"
          type="number"
          value="16"
          min="8"
          max="32"
          step="8" /></label
      ><label
        >패스<input
          id="passes"
          type="number"
          value="1"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" checked />프레임 누적</label
      ><button id="apply">적용·측정</button><button id="cycle">cycle</button
      ><button id="select-report">보고서 선택</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p>
      CPU ms는 호출 경과 시간입니다. GPU 완료 시간·개선율을 뜻하지 않습니다.
      같은 장치·크기·카메라에서 비교하세요.
    </p>

    <div id="stage"><canvas aria-label="생성·종료 반복의 장부"></canvas></div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=!document.querySelector('#totals').checked;renderer.info.reset();const start=performance.now();const passes=Number(document.querySelector('#passes').value);if(passes===2){renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}renderer.setRenderTarget(null);renderer.render(scene,camera);stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,lines:renderer.info.render.lines,cpuMs:performance.now()-start,count:meshes.length,segments:Number(document.querySelector('#segments').value),passes,buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),camera:camera.position.toArray(),memory:{...renderer.info.memory},...counts};frames++;output.textContent=JSON.stringify(stats);}
      function record(){records.push(JSON.parse(JSON.stringify(stats)));document.querySelector('#report').textContent=JSON.stringify({conditions:"같은 장치·크기·카메라. CPU 호출 시간은 GPU 시간과 다릅니다. 모양 차이와 정리 결과를 필기에 보충하세요.",records,cleanup:counts},null,2);}
      on('#apply','click',()=>{for(const id of ['count','segments','passes'])if(!document.querySelector('#'+id).checkValidity()||!document.querySelector('#'+id).value)return;rebuild();draw();record();});on('#cycle','click',()=>{counts.cycles++;rebuild();draw();record();});on('#select-report','click',()=>{const range=document.createRange();range.selectNodeContents(document.querySelector('#report'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#report').focus();});function releaseAll(){for(const mesh of meshes)scene.remove(mesh);meshes=[];if(g){g.dispose();g=null;}if(m){m.dispose();m=null;}if(disposed)record();}rebuild();queueMicrotask(()=>{draw();record();});

      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 자원 장부와 renderer.info.memory는 무엇이 다른가요?

### 관찰값을 기존 필기에 남기기

16·8 세그먼트 비교와 3 cycles 결과를 만드세요. 보고서 선택 버튼을 누르고 Ctrl+C로 복사한 뒤 사이트 필기 탭에 붙여넣으세요. 조건·실제 수치·모양 차이·cleanup 결과·측정 한계를 자신의 말로 보충하고 기존 저장·백업을 사용하세요.

**예상 결과**

보고서에는 실제 측정과 정리 횟수가 있고 사이트 필기에 보존됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>관찰값을 기존 필기에 남기기</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>관찰값을 기존 필기에 남기기</h1>
    <p>
      16·8 세그먼트 비교와 3 cycles 결과를 만드세요. 보고서 선택 버튼을 누르고
      Ctrl+C로 복사한 뒤 사이트 필기 탭에 붙여넣으세요. 조건·실제 수치·모양
      차이·cleanup 결과·측정 한계를 자신의 말로 보충하고 기존 저장·백업을
      사용하세요.
    </p>
    <div class="controls">
      <label
        >개수<input
          id="count"
          type="number"
          value="8"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >세그먼트<input
          id="segments"
          type="number"
          value="16"
          min="8"
          max="32"
          step="8" /></label
      ><label
        >패스<input
          id="passes"
          type="number"
          value="1"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" checked />프레임 누적</label
      ><button id="apply">적용·측정</button><button id="cycle">cycle</button
      ><button id="select-report">보고서 선택</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p>
      CPU ms는 호출 경과 시간입니다. GPU 완료 시간·개선율을 뜻하지 않습니다.
      같은 장치·크기·카메라에서 비교하세요.
    </p>

    <div id="stage">
      <canvas aria-label="관찰값을 기존 필기에 남기기"></canvas>
    </div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=!document.querySelector('#totals').checked;renderer.info.reset();const start=performance.now();const passes=Number(document.querySelector('#passes').value);if(passes===2){renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}renderer.setRenderTarget(null);renderer.render(scene,camera);stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,lines:renderer.info.render.lines,cpuMs:performance.now()-start,count:meshes.length,segments:Number(document.querySelector('#segments').value),passes,buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),camera:camera.position.toArray(),memory:{...renderer.info.memory},...counts};frames++;output.textContent=JSON.stringify(stats);}
      function record(){records.push(JSON.parse(JSON.stringify(stats)));document.querySelector('#report').textContent=JSON.stringify({conditions:"같은 장치·크기·카메라. CPU 호출 시간은 GPU 시간과 다릅니다. 모양 차이와 정리 결과를 필기에 보충하세요.",records,cleanup:counts},null,2);}
      on('#apply','click',()=>{for(const id of ['count','segments','passes'])if(!document.querySelector('#'+id).checkValidity()||!document.querySelector('#'+id).value)return;rebuild();draw();record();});on('#cycle','click',()=>{counts.cycles++;rebuild();draw();record();});on('#select-report','click',()=>{const range=document.createRange();range.selectNodeContents(document.querySelector('#report'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#report').focus();});function releaseAll(){for(const mesh of meshes)scene.remove(mesh);meshes=[];if(g){g.dispose();g=null;}if(m){m.dispose();m=null;}if(disposed)record();}rebuild();

      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 예제 iframe은 부모 저장소에 직접 접근하지 않습니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

보고서에는 실제 측정과 정리 횟수가 있고 사이트 필기에 보존됩니다. 예제 iframe은 부모 저장소에 직접 접근하지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>관찰값을 기존 필기에 남기기</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>관찰값을 기존 필기에 남기기</h1>
    <p>
      16·8 세그먼트 비교와 3 cycles 결과를 만드세요. 보고서 선택 버튼을 누르고
      Ctrl+C로 복사한 뒤 사이트 필기 탭에 붙여넣으세요. 조건·실제 수치·모양
      차이·cleanup 결과·측정 한계를 자신의 말로 보충하고 기존 저장·백업을
      사용하세요.
    </p>
    <div class="controls">
      <label
        >개수<input
          id="count"
          type="number"
          value="8"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >세그먼트<input
          id="segments"
          type="number"
          value="16"
          min="8"
          max="32"
          step="8" /></label
      ><label
        >패스<input
          id="passes"
          type="number"
          value="1"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" checked />프레임 누적</label
      ><button id="apply">적용·측정</button><button id="cycle">cycle</button
      ><button id="select-report">보고서 선택</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p>
      CPU ms는 호출 경과 시간입니다. GPU 완료 시간·개선율을 뜻하지 않습니다.
      같은 장치·크기·카메라에서 비교하세요.
    </p>

    <div id="stage">
      <canvas aria-label="관찰값을 기존 필기에 남기기"></canvas>
    </div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=!document.querySelector('#totals').checked;renderer.info.reset();const start=performance.now();const passes=Number(document.querySelector('#passes').value);if(passes===2){renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}renderer.setRenderTarget(null);renderer.render(scene,camera);stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,lines:renderer.info.render.lines,cpuMs:performance.now()-start,count:meshes.length,segments:Number(document.querySelector('#segments').value),passes,buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),camera:camera.position.toArray(),memory:{...renderer.info.memory},...counts};frames++;output.textContent=JSON.stringify(stats);}
      function record(){records.push(JSON.parse(JSON.stringify(stats)));document.querySelector('#report').textContent=JSON.stringify({conditions:"같은 장치·크기·카메라. CPU 호출 시간은 GPU 시간과 다릅니다. 모양 차이와 정리 결과를 필기에 보충하세요.",records,cleanup:counts},null,2);}
      on('#apply','click',()=>{for(const id of ['count','segments','passes'])if(!document.querySelector('#'+id).checkValidity()||!document.querySelector('#'+id).value)return;rebuild();draw();record();});on('#cycle','click',()=>{counts.cycles++;rebuild();draw();record();});on('#select-report','click',()=>{const range=document.createRange();range.selectNodeContents(document.querySelector('#report'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#report').focus();});function releaseAll(){for(const mesh of meshes)scene.remove(mesh);meshes=[];if(g){g.dispose();g=null;}if(m){m.dispose();m=null;}if(disposed)record();}rebuild();queueMicrotask(()=>{draw();record();});

      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- CPU 호출 시간과 정확한 GPU 실행 시간은 왜 같지 않나요?

### API · WebGLRenderer.info / reset

첫 측정 결과와 조건이 기록 영역에 추가됩니다. 측정 결과는 버튼을 누른 실제 프레임에서 가져옵니다.

info는 render·memory 통계 객체입니다. info.reset()은 render 카운터를 초기화하고 undefined를 반환합니다. memory 자원을 해제하지 않습니다.

- 예제 iframe은 부모 저장소에 직접 접근하지 않습니다.

```js
renderer.info.autoReset=false;renderer.info.reset();renderer.render(scene,camera);const calls=renderer.info.render.calls;
```

[WebGLRenderer.info / reset](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

### API · SphereGeometry / dispose

반지름·높이 분할·배치를 고정하고 widthSegments만 16에서 8로 바꿉니다. 생성 전에 이전 geometry·material을 해제합니다. 낮은 triangles만으로 같은 품질이라고 판단하지 않습니다.

- `radius: number` — 반지름 .35입니다.
- `widthSegments: number` — 가로 분할 16 또는 8입니다. 최소 3입니다.
- `heightSegments: number` — 세로 분할은 8로 고정합니다. 최소 2입니다.

생성자는 SphereGeometry를 반환합니다. dispose는 undefined이며 같은 객체를 다시 쓰지 않을 때 호출합니다.

- 반지름·높이 분할·배치를 고정하고 widthSegments만 16에서 8로 바꿉니다. 생성 전에 이전 geometry·material을 해제합니다. 낮은 triangles만으로 같은 품질이라고 판단하지 않습니다.

```js
const geometry=new THREE.SphereGeometry(.35,8,8); geometry.dispose();
```

[SphereGeometry / dispose](https://threejs.org/docs/pages/SphereGeometry.html) · three@0.186.1 · 2026-10-27

### API · WebGLRenderer.info.memory / getPixelRatio

memory.geometries·textures는 renderer가 추적하는 수이며 VRAM 바이트가 아닙니다. 소유 장부의 생성·해제 횟수를 별도로 기록하고 buffer·DPR·카메라·패스 수와 함께 필기에 남깁니다.

getPixelRatio는 현재 DPR number입니다. info.memory는 geometries·textures count 객체이며 GPU 바이트 수가 아닙니다.

- memory.geometries·textures는 renderer가 추적하는 수이며 VRAM 바이트가 아닙니다. 소유 장부의 생성·해제 횟수를 별도로 기록하고 buffer·DPR·카메라·패스 수와 함께 필기에 남깁니다.

```js
const conditions={buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),memory:{...renderer.info.memory}};
```

[WebGLRenderer.info.memory / getPixelRatio](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 장면 검사기 통합](../units/27/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
