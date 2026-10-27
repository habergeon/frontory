# Three.js · 26 렌더 통계와 프로파일

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 자원 수명·접근성·측정 · 편집 가능한 예제 · 저장 ID: `threejs-step-26`

## 목표와 학습 후 역량

- 같은 크기·카메라·개수에서 calls=2, triangles=24입니다.
- 한 프레임 총계는 calls=4, triangles=48입니다.

## 선수 지식

선수 단원: 16, 19, 22, 23. 이번 실험에서 이어갑니다.

## 핵심 개념과 설명

### 한 패스의 draw call

프레임 누적을 켜고 적용하세요. 한 패스에서 큐브 두 개는 calls=2, triangles=24입니다. 측정 버튼을 2회 눌러도 같은 값이어야 합니다. reset은 새 논리 프레임 시작 때 한 번 호출합니다.

### 다중 패스의 프레임 총계

다중 패스 시작은 autoReset=true여서 마지막 패스의 calls=2만 보입니다. 프레임 누적을 켜고 적용하세요. 미니 카메라와 메인 카메라가 각각 큐브 두 개를 그립니다.

## 실습 준비

사이트에서 독립 HTML을 편집·실행합니다. Three.js 0.186.1을 사용하며 별도 설치·서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 프레임 누적을 켜고 적용하세요. 한 패스에서 큐브 두 개는 calls=2, triangles=24입니다. 측정 버튼을 2회 눌러도 같은 값이어야 합니다. reset은 새 논리 프레임 시작 때 한 번 호출합니다.
2. 다중 패스 시작은 autoReset=true여서 마지막 패스의 calls=2만 보입니다. 프레임 누적을 켜고 적용하세요. 미니 카메라와 메인 카메라가 각각 큐브 두 개를 그립니다.
3. 패스를 1→2로 바꾸며 각각 측정하세요. 개수=2, DPR=1, 480×280 이하 CSS 크기와 같은 카메라를 유지합니다. CPU ms는 performance.now로 잰 호출 경과 시간이며 정확한 GPU 시간이나 개선율이 아닙니다.

## 관찰할 변수

| 변수                | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                                  |
| ------------------- | --------- | --------- | ------------------------------------------------------ |
| 한 패스의 draw call | starter   | solution  | 같은 크기·카메라·개수에서 calls=2, triangles=24입니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 같은 크기·카메라·개수에서 calls=2, triangles=24입니다.
- [ ] 한 프레임 총계는 calls=4, triangles=48입니다.

## 자가 점검

1. reset을 빠뜨리고 여러 프레임을 더하면 어떤 값이 되나요?
2. 마지막 패스의 수치를 프레임 전체로 오해하면 어떤 비교가 틀리나요?
3. triangles가 줄면 화면 품질도 항상 같나요?

## 공식 참고

- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-26/example.html) · [실행 환경과 제한](../../../../../examples.md)

HTML 시작 코드에서 과제를 수행하고 실제 관찰값과 조건을 기존 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-26/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

프레임 누적을 켜고 적용하세요. 한 패스에서 큐브 두 개는 calls=2, triangles=24입니다. 측정 버튼을 2회 눌러도 같은 값이어야 합니다. reset은 새 논리 프레임 시작 때 한 번 호출합니다.

### 선수 단원

- `threejs-step-16`
- `threejs-step-19`
- `threejs-step-22`
- `threejs-step-23`

### 한 패스의 draw call

프레임 누적을 켜고 적용하세요. 한 패스에서 큐브 두 개는 calls=2, triangles=24입니다. 측정 버튼을 2회 눌러도 같은 값이어야 합니다. reset은 새 논리 프레임 시작 때 한 번 호출합니다.

**예상 결과**

같은 크기·카메라·개수에서 calls=2, triangles=24입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>한 패스의 draw call</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>한 패스의 draw call</h1>
    <p>
      프레임 누적을 켜고 적용하세요. 한 패스에서 큐브 두 개는 calls=2,
      triangles=24입니다. 측정 버튼을 2회 눌러도 같은 값이어야 합니다. reset은
      새 논리 프레임 시작 때 한 번 호출합니다.
    </p>
    <div class="controls">
      <label
        >개수<input
          id="count"
          type="number"
          value="2"
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
      ><label><input id="totals" type="checkbox" />프레임 누적</label
      ><button id="apply">적용·측정</button><button id="cycle">cycle</button
      ><button id="select-report">보고서 선택</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p>
      CPU ms는 호출 경과 시간입니다. GPU 완료 시간·개선율을 뜻하지 않습니다.
      같은 장치·크기·카메라에서 비교하세요.
    </p>

    <div id="stage"><canvas aria-label="한 패스의 draw call"></canvas></div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.BoxGeometry();m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
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

- info.render는 누적 기간을 알아야 해석할 수 있습니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

같은 크기·카메라·개수에서 calls=2, triangles=24입니다. info.render는 누적 기간을 알아야 해석할 수 있습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>한 패스의 draw call</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>한 패스의 draw call</h1>
    <p>
      프레임 누적을 켜고 적용하세요. 한 패스에서 큐브 두 개는 calls=2,
      triangles=24입니다. 측정 버튼을 2회 눌러도 같은 값이어야 합니다. reset은
      새 논리 프레임 시작 때 한 번 호출합니다.
    </p>
    <div class="controls">
      <label
        >개수<input
          id="count"
          type="number"
          value="2"
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

    <div id="stage"><canvas aria-label="한 패스의 draw call"></canvas></div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.BoxGeometry();m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
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

- reset을 빠뜨리고 여러 프레임을 더하면 어떤 값이 되나요?

### 다중 패스의 프레임 총계

다중 패스 시작은 autoReset=true여서 마지막 패스의 calls=2만 보입니다. 프레임 누적을 켜고 적용하세요. 미니 카메라와 메인 카메라가 각각 큐브 두 개를 그립니다.

**예상 결과**

한 프레임 총계는 calls=4, triangles=48입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>다중 패스의 프레임 총계</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>다중 패스의 프레임 총계</h1>
    <p>
      다중 패스 시작은 autoReset=true여서 마지막 패스의 calls=2만 보입니다.
      프레임 누적을 켜고 적용하세요. 미니 카메라와 메인 카메라가 각각 큐브 두
      개를 그립니다.
    </p>
    <div class="controls">
      <label
        >개수<input
          id="count"
          type="number"
          value="2"
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
          value="2"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" />프레임 누적</label
      ><button id="apply">적용·측정</button><button id="cycle">cycle</button
      ><button id="select-report">보고서 선택</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p>
      CPU ms는 호출 경과 시간입니다. GPU 완료 시간·개선율을 뜻하지 않습니다.
      같은 장치·크기·카메라에서 비교하세요.
    </p>

    <div id="stage"><canvas aria-label="다중 패스의 프레임 총계"></canvas></div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.BoxGeometry();m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
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

- 각 render 앞에서 reset하지 마세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

한 프레임 총계는 calls=4, triangles=48입니다. 각 render 앞에서 reset하지 마세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>다중 패스의 프레임 총계</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>다중 패스의 프레임 총계</h1>
    <p>
      다중 패스 시작은 autoReset=true여서 마지막 패스의 calls=2만 보입니다.
      프레임 누적을 켜고 적용하세요. 미니 카메라와 메인 카메라가 각각 큐브 두
      개를 그립니다.
    </p>
    <div class="controls">
      <label
        >개수<input
          id="count"
          type="number"
          value="2"
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
          value="2"
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

    <div id="stage"><canvas aria-label="다중 패스의 프레임 총계"></canvas></div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.BoxGeometry();m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
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

- 마지막 패스의 수치를 프레임 전체로 오해하면 어떤 비교가 틀리나요?

### 조건을 고정한 측정

패스를 1→2로 바꾸며 각각 측정하세요. 개수=2, DPR=1, 480×280 이하 CSS 크기와 같은 카메라를 유지합니다. CPU ms는 performance.now로 잰 호출 경과 시간이며 정확한 GPU 시간이나 개선율이 아닙니다.

**예상 결과**

패스가 두 배면 이 장면의 calls·triangles도 두 배이며 CPU ms는 실행마다 달라질 수 있습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>조건을 고정한 측정</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>조건을 고정한 측정</h1>
    <p>
      패스를 1→2로 바꾸며 각각 측정하세요. 개수=2, DPR=1, 480×280 이하 CSS
      크기와 같은 카메라를 유지합니다. CPU ms는 performance.now로 잰 호출 경과
      시간이며 정확한 GPU 시간이나 개선율이 아닙니다.
    </p>
    <div class="controls">
      <label
        >개수<input
          id="count"
          type="number"
          value="2"
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

    <div id="stage"><canvas aria-label="조건을 고정한 측정"></canvas></div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.BoxGeometry();m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
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

- JIT·업로드·SwiftShader·화면 크기를 측정 조건에 기록하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

패스가 두 배면 이 장면의 calls·triangles도 두 배이며 CPU ms는 실행마다 달라질 수 있습니다. JIT·업로드·SwiftShader·화면 크기를 측정 조건에 기록하세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>조건을 고정한 측정</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>조건을 고정한 측정</h1>
    <p>
      패스를 1→2로 바꾸며 각각 측정하세요. 개수=2, DPR=1, 480×280 이하 CSS
      크기와 같은 카메라를 유지합니다. CPU ms는 performance.now로 잰 호출 경과
      시간이며 정확한 GPU 시간이나 개선율이 아닙니다.
    </p>
    <div class="controls">
      <label
        >개수<input
          id="count"
          type="number"
          value="2"
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
          value="2"
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

    <div id="stage"><canvas aria-label="조건을 고정한 측정"></canvas></div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.BoxGeometry();m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
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

- triangles가 줄면 화면 품질도 항상 같나요?

### API · WebGLRenderer.info / reset

같은 크기·카메라·개수에서 calls=2, triangles=24입니다. info.render는 누적 기간을 알아야 해석할 수 있습니다.

info는 render·memory 통계 객체입니다. info.reset()은 render 카운터를 초기화하고 undefined를 반환합니다. memory 자원을 해제하지 않습니다.

- JIT·업로드·SwiftShader·화면 크기를 측정 조건에 기록하세요.

```js
renderer.info.autoReset=false;renderer.info.reset();renderer.render(scene,camera);const calls=renderer.info.render.calls;
```

[WebGLRenderer.info / reset](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

### API · WebGLRenderer.info.reset

autoReset=false에서 reset을 프레임 시작에 한 번 호출하고 모든 패스 뒤 calls·triangles를 읽습니다. memory는 GPU 바이트 수가 아니며 reset으로 자원이 해제되지 않습니다.

reset은 undefined를 반환합니다. render.calls·triangles·lines는 새 프레임에서 다시 누적합니다.

- autoReset=false에서 reset을 프레임 시작에 한 번 호출하고 모든 패스 뒤 calls·triangles를 읽습니다. memory는 GPU 바이트 수가 아니며 reset으로 자원이 해제되지 않습니다.

```js
renderer.info.autoReset=false;renderer.info.reset();renderMap();renderer.render(scene,camera);
```

[WebGLRenderer.info.reset](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

### API · performance.now

두 timestamp 차이는 JavaScript 호출 경과 시간입니다. GPU는 비동기로 실행하므로 정확한 GPU 작업 시간으로 부르지 않습니다. 업로드·JIT·장치·해상도도 기록합니다.

performance.now는 time origin 기준 ms 단위의 number를 반환합니다. 두 호출의 차이만 경과 시간으로 사용합니다.

- 두 timestamp 차이는 JavaScript 호출 경과 시간입니다. GPU는 비동기로 실행하므로 정확한 GPU 작업 시간으로 부르지 않습니다. 업로드·JIT·장치·해상도도 기록합니다.

```js
const start=performance.now();renderer.render(scene,camera);const cpuMs=performance.now()-start;
```

[performance.now](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: HTML 제어와 접근성](../25/README.md) · [다음: 장면 검사기 통합](../27/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
