# Three.js · 02 렌더러와 화면 크기

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 장면 좌표·카메라·기하 · 편집 가능한 예제 · 저장 ID: `threejs-step-02`

## 목표와 학습 후 역량

- 리사이즈 뒤 도형 비율이 유지된다.
- 숨김 컨테이너의 0 크기를 처리한다.

## 선수 지식

Scene·Camera·Mesh·render 개념을 복습합니다. 독립 HTML 시작 예제가 있어 이전 결과 파일은 필요 없습니다.

## 핵심 개념과 설명

### 버퍼 크기

렌더러의 drawing buffer는 CSS 표시 크기와 다릅니다. pixelRatio를 올리면 같은 화면에 더 많은 픽셀을 처리합니다.

### 종횡비

PerspectiveCamera의 aspect는 viewport 비율입니다. 크기를 바꾼 뒤 updateProjectionMatrix를 호출해야 새 투영이 적용됩니다.

## 실습 준비

사이트 안에서 독립 HTML을 편집·실행합니다. three@0.186.1은 사이트가 공급하며 별도 프로젝트·설치·외부 이미지가 필요 없습니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 표시/버퍼 단계에서 240×240과 480×240 버튼을 비교하고 실제 CSS·buffer 크기를 기록하세요.
2. 버퍼/카메라 단계에서 aspect와 projection 갱신을 추가한 뒤 observer 단계에서 요소 관찰을 연결하세요.
3. DPR 1과 2의 실제 픽셀 수를 비교하고 숨김 뒤 표시가 복구되는지 확인하세요. 조건·예상·화면과 수치·이유를 사이트 필기에 남기세요.

## 관찰할 변수

| 변수          | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                             |
| ------------- | --------- | --------- | ------------------------------------------------- |
| viewport 비율 | 1:1       | 2:1       | aspect를 갱신하면 정면 사각형의 비율이 유지됩니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 리사이즈 뒤 도형 비율이 유지된다.
- [ ] 숨김 컨테이너의 0 크기를 처리한다.

## 자가 점검

1. setSize의 세 번째 인자는 무엇을 제어하나요?
2. DPR을 높일 때 화면 면적 비용은 어떻게 변하나요?

## 공식 참고

- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-02/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-02/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

이번에는 CSS 표시 크기, drawing buffer 크기, camera aspect를 나누어 맞춥니다. 시작 예제는 정면의 BoxGeometry(1, 1, .2)를 포함한 독립 HTML이며 이전 코드를 요구하지 않습니다. stage는 padding/border가 없고 canvas는 display:block; width:100%; height:100%입니다. 240×240과 480×240은 넓이가 허용될 때의 대표 조건입니다. 좁은 화면에서는 max-width가 제한하므로 output의 실제 w,h를 사용하세요. 도형 비율·CSS 크기·buffer 크기·DPR을 사이트 필기에 기록합니다. 실행 전 결과를 예상하고 한 번에 한 항목만 바꾸세요. 조건 / 예상 / 실제 화면과 수치 / 차이의 원인을 사이트 필기에 남깁니다. 사이트가 three import를 공급하므로 별도 설치는 필요 없습니다.

### 선수 단원

- `threejs-01`
- `css-step-04`
- `css-step-07`

### 표시 크기와 버퍼 크기

시작 상태는 DPR=1, camera.aspect=1인 정사각 stage입니다. renderer.setSize는 실행할 때 한 번만 호출합니다. camera는 (0, 0, 5)에서 원점을 보고 도형은 기울이지 않습니다. 정면의 사각형이 늘어나는지 관찰할 수 있습니다.

크기 버튼으로 stage 폭만 넓힌 뒤 CSS 크기와 buffer 크기를 읽으세요. stage.clientWidth/clientHeight는 CSS px, canvas.width/height는 buffer px입니다. CSS는 기존 buffer 이미지를 넓은 영역에 표시할 수 있지만 buffer에 더 많은 픽셀을 그린 것은 아닙니다. 표시 비율만 달라지면 사각형도 가로로 늘어날 수 있습니다.

모든 예제의 startWhenVisible은 requestAnimationFrame으로 첫 양수 크기를 기다리고 resizeScene을 한 번 호출한 뒤 멈춥니다. callback은 브라우저가 다음 화면 갱신 전에 호출할 함수이며 return은 이번 함수 실행을 끝냅니다. 이 보조 코드는 이후 크기 변화를 관찰하지 않습니다. 크기 버튼의 addEventListener는 click 때 함수를 실행합니다. stage.style.width에 CSS 길이 문자열을 대입하면 표시 폭만 바뀝니다. reportSize는 현재 client 크기와 buffer 속성을 읽어 output.textContent로 표시합니다. querySelector는 HTML 요소를 찾습니다. renderer.domElement는 이 HTML의 canvas와 같은 요소입니다. 출력의 toFixed(4)는 숫자를 소수 넷째 자리 문자열로 표시하며 +는 문자열을 이어 붙입니다. Buffer pixel count는 canvas.width × canvas.height로 계산합니다.

**예상 결과**

stage 폭은 바뀌지만 canvas.width/height는 처음 값에 머뭅니다. 사각형이 늘어나 보일 수 있습니다. 좁은 화면에서는 버튼의 목표 크기와 실측 크기가 다를 수 있습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>표시 크기와 버퍼 크기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
    </div>
    <div id="stage"><canvas aria-label="정면 사각형의 비율 비교"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\n마지막 유효 aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\n버퍼 픽셀 수: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\n0 크기: 갱신을 건너뜁니다.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        // ASPECT: 지금은 camera.aspect = 1을 유지합니다.
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));



      // 첫 표시 준비만 기다립니다. 양수 크기에서 한 번 실행한 뒤 멈춥니다.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- output에서 CSS px와 buffer px의 행을 따로 읽으세요.
- stage 폭을 바꾼 뒤 canvas.width가 함께 바뀌었는지 비교하세요.
- 표시가 480×240이고 buffer가 240×240이면 이미지의 가로만 2배 늘려 표시합니다. 실제 output 값으로 같은 비율을 계산하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

초기 buffer가 240×240이고 표시 영역이 480×240이면, 같은 이미지가 가로로 2배 늘어나 보입니다. 실제 폭이 480이 아닐 때는 output 수치를 대입해 비교하세요. body나 창 너비 대신 stage의 실제 크기를 읽어야 합니다. 이 단계에서는 일부러 자동 크기 대응을 넣지 않았습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>표시 크기와 버퍼 크기 — 완성</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
    </div>
    <div id="stage"><canvas aria-label="정면 사각형의 비율 비교"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\n마지막 유효 aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\n버퍼 픽셀 수: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\n0 크기: 갱신을 건너뜁니다.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        // ASPECT: 지금은 camera.aspect = 1을 유지합니다.
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));



      // 첫 표시 준비만 기다립니다. 양수 크기에서 한 번 실행한 뒤 멈춥니다.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

</details>

- CSS 폭을 바꾸면 buffer 폭도 항상 바뀌나요?
- stage 폭과 브라우저 창 폭은 왜 다를 수 있나요?

### 버퍼와 카메라를 따로 맞추기

이 시작 예제의 resizeScene()은 w=stage.clientWidth, h=stage.clientHeight를 읽고 renderer.setSize(w, h, false)를 호출합니다. 크기 버튼 뒤에 이 함수를 호출하지만 camera.aspect는 아직 1입니다. 가로형 크기를 선택해 buffer가 표시 크기와 같아졌는지 확인하세요. 사각형은 여전히 늘어날 수 있습니다.

resizeScene()에서 setSize 다음에 camera.aspect = w / h; camera.updateProjectionMatrix();를 추가합니다. 다시 같은 두 크기를 비교하세요. aspect는 너비/높이 비율이고 updateProjectionMatrix는 새 비율을 실제 투영 계산에 반영합니다. 둘 중 하나만 바꾸면 충분하지 않습니다.

**예상 결과**

setSize만 적용하면 buffer는 맞지만 도형 비율은 틀릴 수 있습니다. aspect와 projection을 함께 갱신하면 정면 사각형의 가로·세로 비율이 유지됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>버퍼와 카메라를 따로 맞추기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
    </div>
    <div id="stage"><canvas aria-label="정면 사각형의 비율 비교"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\n마지막 유효 aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\n버퍼 픽셀 수: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\n0 크기: 갱신을 건너뜁니다.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        // ASPECT: 지금은 camera.aspect = 1을 유지합니다.
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        resizeScene();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));



      // 첫 표시 준비만 기다립니다. 양수 크기에서 한 번 실행한 뒤 멈춥니다.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 표시 w/h와 camera.aspect가 같은지 비교하세요.
- camera.aspect에 대입한 다음 updateProjectionMatrix가 있는지 확인하세요.
- renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); 뒤에 render하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

buffer를 맞추는 것은 그릴 픽셀 수를 정하는 일입니다. camera의 투영은 물체를 그 픽셀 영역에 어떤 비율로 표현할지 정합니다. 세로 FOV를 유지한 채 화면이 넓어지면 가로로 더 넓은 장면이 보이고 물체는 납작해지지 않습니다. setSize의 false는 CSS 표시 크기를 관리하지 않겠다는 뜻이지 buffer를 바꾸지 말라는 뜻이 아닙니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>버퍼와 카메라를 따로 맞추기 — 완성</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
    </div>
    <div id="stage"><canvas aria-label="정면 사각형의 비율 비교"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\n마지막 유효 aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\n버퍼 픽셀 수: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\n0 크기: 갱신을 건너뜁니다.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        resizeScene();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));



      // 첫 표시 준비만 기다립니다. 양수 크기에서 한 번 실행한 뒤 멈춥니다.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

</details>

- buffer 크기를 맞췄는데 왜 도형이 늘어날 수 있나요?
- setSize의 세 번째 인자 false는 무엇을 막나요?

### 요소 크기 변화를 관찰하기

이 독립 예제에는 앞 단계에서 완성한 resizeScene()이 있습니다. 이번에는 크기 버튼이 CSS만 바꾸고 resizeScene을 직접 호출하지 않습니다. 초기 한 번은 맞지만 이후 stage 변화에는 반응하지 않는 상태입니다.

observer = new ResizeObserver(resizeScene)를 만들고 observer.observe(stage)를 연결합니다. ResizeObserver는 Three.js가 아닌 브라우저 Web API입니다. 관찰하는 요소의 크기가 바뀌면 callback을 실행합니다. 첫 화면도 바로 맞추도록 resizeScene() 초기 호출을 유지하세요.

창 크기를 그대로 두고 stage 크기 버튼을 눌러 봅니다. observer는 요소 자체 크기 변화에도 반응합니다. canvas가 아닌 크기 기준인 stage를 관찰합니다. stage는 padding/border가 없고 canvas가 100%를 채우므로 측정 기준이 분명합니다.

**예상 결과**

브라우저 창을 바꾸지 않고 stage 버튼만 눌러도 실제 크기, buffer, aspect가 함께 맞습니다. resizeScene이 다시 그리므로 화면도 갱신됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>요소 크기 변화를 관찰하기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
    </div>
    <div id="stage"><canvas aria-label="정면 사각형의 비율 비교"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\n마지막 유효 aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\n버퍼 픽셀 수: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\n0 크기: 갱신을 건너뜁니다.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));


      // OBSERVER: 여기에 ResizeObserver를 연결하세요.
      // 첫 표시 준비만 기다립니다. 양수 크기에서 한 번 실행한 뒤 멈춥니다.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- stage의 CSS만 바꾸어도 resizeScene이 실행되는지 output을 확인하세요.
- observer.observe에 canvas가 아닌 stage를 전달했는지 확인하세요.
- const observer = new ResizeObserver(resizeScene); observer.observe(stage); resizeScene();로 연결하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

observer가 카메라나 buffer를 자동으로 이해하는 것은 아닙니다. callback으로 전달한 resizeScene이 setSize, aspect, projection 갱신과 render를 수행합니다. 크기가 계속 오르내리면 setSize의 false와 canvas CSS, 관찰 대상이 stage인지 확인하세요. 관찰을 끝낼 때 observer.disconnect()를 사용합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>요소 크기 변화를 관찰하기 — 완성</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
    </div>
    <div id="stage"><canvas aria-label="정면 사각형의 비율 비교"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\n마지막 유효 aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\n버퍼 픽셀 수: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\n0 크기: 갱신을 건너뜁니다.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));


      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      // 첫 표시 준비만 기다립니다. 양수 크기에서 한 번 실행한 뒤 멈춥니다.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

</details>

- window resize 이벤트만으로 충분하지 않은 이유는 무엇인가요?
- observer가 직접 render하는 것인가요?

### DPR 1과 2 비교하기

시작 예제는 크기 대응을 포함하고 dpr=1입니다. output은 CSS w,h, canvas.width/height, camera.aspect, dpr를 실제 값으로 표시합니다. 입력에서 dpr를 2로 바꾸고 renderer.setPixelRatio(dpr) 다음 renderer.setSize(w, h, false)를 호출하게 하세요. w,h는 이미 DPR을 곱한 값이 아닌 CSS 크기입니다.

CSS 표시가 240×240이면 DPR 1의 buffer는 240×240, DPR 2의 buffer는 480×480입니다. 픽셀 수는 57,600에서 230,400으로 4배입니다. 실제 표시 크기가 다르면 실제 w,h로 같은 계산을 합니다. camera.aspect는 계속 w/h이며 DPR을 곱하지 않습니다.

입력의 value는 문자열이므로 Number(input.value)로 숫자로 바꿉니다. change 이벤트는 선택이 바뀔 때 호출합니다. resizeScene의 DPR 주석 위치에 renderer.setPixelRatio(dpr);를 추가한 뒤 입력 1과 2를 비교하세요.

**예상 결과**

CSS 크기와 camera.aspect는 유지되고 DPR 2에서 buffer 각 축은 2배, 픽셀 수는 4배입니다. 240×240 표시라면 buffer는 480×480입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>DPR 1과 2 비교하기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
      <label
        >DPR
        <select id="dpr">
          <option value="1">1</option>
          <option value="2">2</option>
        </select></label
      >
    </div>
    <div id="stage"><canvas aria-label="정면 사각형의 비율 비교"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\n마지막 유효 aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\n버퍼 픽셀 수: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\n0 크기: 갱신을 건너뜁니다.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        // DPR: 여기에 setPixelRatio(dpr)를 추가하세요.
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));
      document.querySelector('#dpr').addEventListener('change', (event) => {
        dpr = Number(event.target.value);
        resizeScene();
      });

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      // 첫 표시 준비만 기다립니다. 양수 크기에서 한 번 실행한 뒤 멈춥니다.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- CSS px와 buffer px를 나란히 적고 각 축 비율을 계산하세요.
- setSize에 w*dpr, h*dpr를 넣고 있지 않은지 확인하세요.
- renderer.setPixelRatio(2); renderer.setSize(w, h, false);에서 w,h는 CSS 실측값입니다. camera.aspect는 w/h입니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

DPR은 두 축의 buffer 해상도에 각각 적용됩니다. 표시 크기와 장면의 도형 크기를 2배로 만들라는 뜻이 아닙니다. 기기나 브라우저 확대에 따라 devicePixelRatio가 달라도 이번 실험은 명시한 1과 2를 사용합니다. 선명도 차이가 작아 보일 수 있고 실행 시간도 반드시 4배가 되지는 않습니다. DPR을 2번 곱했다면 buffer 한 축이 4배가 되므로 setSize 인자를 다시 확인하세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>DPR 1과 2 비교하기 — 완성</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
      <label
        >DPR
        <select id="dpr">
          <option value="1">1</option>
          <option value="2">2</option>
        </select></label
      >
    </div>
    <div id="stage"><canvas aria-label="정면 사각형의 비율 비교"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\n마지막 유효 aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\n버퍼 픽셀 수: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\n0 크기: 갱신을 건너뜁니다.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));
      document.querySelector('#dpr').addEventListener('change', (event) => {
        dpr = Number(event.target.value);
        resizeScene();
      });

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      // 첫 표시 준비만 기다립니다. 양수 크기에서 한 번 실행한 뒤 멈춥니다.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

</details>

- 왜 DPR 2는 픽셀 수 4배인가요?
- DPR을 camera.aspect에도 곱해야 하나요?
- 픽셀 수 4배면 실행 시간도 반드시 4배인가요?

### 숨김과 다시 표시하기

시작 예제에는 stage 숨기기와 다시 표시하기 버튼이 있습니다. resizeScene() 앞부분에서 w,h를 읽은 다음 if (w === 0 || h === 0) return;을 확인하세요. output은 숨김 때의 실측 크기를 알리되 유효한 새 aspect를 계산했다고 표시하지 않습니다.

stage를 숨겼다가 다시 표시합니다. display:none이면 client 크기가 0일 수 있습니다. h=0일 때 w/h를 계산하거나 임의로 1로 바꿔 정상이라고 표시하지 않습니다. 관찰자는 계속 stage를 관찰하며 다시 크기가 생기면 resizeScene을 실행합니다.

stage.hidden은 표시 여부를 바꾸는 boolean 속성입니다. 버튼과 output은 stage 밖에 있어 숨긴 뒤에도 사용할 수 있습니다. 숨김 출력의 aspect는 마지막 유효값이며 새 비율을 계산한 값이 아닙니다.

**예상 결과**

숨김 때 0 크기를 기록하고 0으로 나누지 않습니다. 다시 표시하면 유한한 aspect와 현재 buffer 크기로 돌아오며 도형 비율이 유지됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>숨김과 다시 표시하기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
      <label
        >DPR
        <select id="dpr">
          <option value="1">1</option>
          <option value="2">2</option>
        </select></label
      >
      <button id="hide">숨기기</button><button id="show">다시 표시</button>
    </div>
    <div id="stage"><canvas aria-label="정면 사각형의 비율 비교"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\n마지막 유효 aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\n버퍼 픽셀 수: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\n0 크기: 갱신을 건너뜁니다.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));
      document.querySelector('#dpr').addEventListener('change', (event) => {
        dpr = Number(event.target.value);
        resizeScene();
      });
      document.querySelector('#hide').addEventListener('click', () => { stage.hidden = true; resizeScene(); });
      document.querySelector('#show').addEventListener('click', () => { stage.hidden = false; });
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      // 첫 표시 준비만 기다립니다. 양수 크기에서 한 번 실행한 뒤 멈춥니다.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 숨김 때 stage.clientWidth/clientHeight가 0인지 output을 보세요.
- w/h 계산보다 앞에 0 크기 guard가 있는지 확인하세요.
- if (w === 0 || h === 0) return; 뒤에 setSize, aspect, projection, render를 둡니다. 다시 표시 뒤 observer가 같은 함수를 호출합니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

return은 이번 크기 갱신을 건너뛰는 것입니다. observer를 끊거나 코드를 종료하는 것이 아닙니다. 다시 표시할 때 실제 크기로 setSize와 aspect를 갱신하고 render하면 복구됩니다. 완료할 때 정사각·가로형, DPR 1·2, 숨김 복귀의 수치와 도형 비율을 필기에 기록하세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>숨김과 다시 표시하기 — 완성</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
      <label
        >DPR
        <select id="dpr">
          <option value="1">1</option>
          <option value="2">2</option>
        </select></label
      >
      <button id="hide">숨기기</button><button id="show">다시 표시</button>
    </div>
    <div id="stage"><canvas aria-label="정면 사각형의 비율 비교"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\n마지막 유효 aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\n버퍼 픽셀 수: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\n0 크기: 갱신을 건너뜁니다.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));
      document.querySelector('#dpr').addEventListener('change', (event) => {
        dpr = Number(event.target.value);
        resizeScene();
      });
      document.querySelector('#hide').addEventListener('click', () => { stage.hidden = true; resizeScene(); });
      document.querySelector('#show').addEventListener('click', () => { stage.hidden = false; });
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      // 첫 표시 준비만 기다립니다. 양수 크기에서 한 번 실행한 뒤 멈춥니다.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

</details>

- 0을 임의의 1로 바꾸는 것과 갱신을 건너뛰는 것은 어떻게 다른가요?
- return을 했는데 다시 표시 후 왜 복구할 수 있나요?

### API · THREE.Scene

장면의 루트를 만드는 생성자입니다. Scene은 Object3D를 상속하며 add로 자식을 연결합니다. background는 배경 설정 멤버이고 기본값은 null입니다.

새 Scene을 반환합니다. 생성만으로 canvas에 그리지 않습니다.

- Scene은 HTML 요소가 아닙니다.

```js
const scene = new THREE.Scene();
scene.add(cube);
```

[THREE.Scene](https://threejs.org/docs/pages/Scene.html) · three@0.186.1 · 2026-10-26

### API · THREE.Color

색 객체를 만드는 생성자입니다. 이 과정은 CSS hex 문자열만 사용합니다.

- `value: string` — CSS hex 색 문자열입니다. 예: '#edf2f7'.

새 Color를 반환합니다.

- 색 공간·선형 RGB 계산은 후속 주제입니다.

```js
scene.background = new THREE.Color('#edf2f7');
```

[THREE.Color](https://threejs.org/docs/pages/Color.html) · three@0.186.1 · 2026-10-26

### API · THREE.WebGLRenderer / renderer.domElement

canvas에 WebGL2 장면을 그리는 renderer 생성자입니다. domElement는 실제 출력 canvas를 가리키는 멤버입니다.

- `canvas: HTMLCanvasElement` — HTML에서 찾은 canvas입니다. 생략하면 renderer가 새 canvas를 만듭니다.
- `antialias: boolean` — 생성 시 가장자리 안티앨리어싱을 요청합니다. (false)

renderer를 반환합니다. domElement는 메서드가 아닌 canvas 참조입니다.

- WebGL2 지원이 필요합니다. 기존 canvas를 쓰려면 생성자에 전달하세요.

```js
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
const actualCanvas = renderer.domElement;
```

[THREE.WebGLRenderer / renderer.domElement](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · renderer.setSize

renderer의 논리 크기와 viewport를 맞추는 인스턴스 메서드입니다. DPR을 반영해 canvas buffer 크기도 바꿉니다.

- `width: number` — 논리 너비, CSS px입니다.
- `height: number` — 논리 높이, CSS px입니다.
- `updateStyle: boolean` — true면 canvas inline CSS 너비·높이도 바꿉니다. (true)

반환값 없음. buffer는 floor(width*DPR) × floor(height*DPR)입니다.

- CSS가 표시 크기를 관리할 때 false를 사용합니다. 이미 DPR을 곱한 수치를 다시 넣지 마세요.

```js
renderer.setSize(w, h, false);
```

[renderer.setSize](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · renderer.render

장면과 카메라로 현재 canvas에 그리는 인스턴스 메서드입니다.

- `scene: Scene` — 그릴 장면입니다.
- `camera: Camera` — 관찰 위치·방향·투영을 정하는 카메라입니다.

반환값 없음. 현재 이미지가 갱신됩니다.

- 객체 속성 변경만으로 이 메서드가 자동 호출되지는 않습니다.

```js
renderer.render(scene, camera);
```

[renderer.render](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · THREE.PerspectiveCamera

먼 물체를 작게 표현하는 원근 카메라 생성자입니다. 인자는 순서가 있습니다.

- `fov: number` — 세로 시야각, degree입니다. (50)
- `aspect: number` — 표시 너비/높이 비율입니다. (1)
- `near: number` — 카메라 앞의 근거리 평면 깊이입니다. (0.1)
- `far: number` — 원거리 평면 깊이입니다. (2000)

새 PerspectiveCamera를 반환합니다.

- near>0, far>near로 설정합니다. fov는 rotation의 radian과 단위가 다릅니다.
- fov/aspect/near/far/zoom 변경 후 updateProjectionMatrix를 호출합니다.

```js
const camera = new THREE.PerspectiveCamera(50, w / h, .1, 50);
```

[THREE.PerspectiveCamera](https://threejs.org/docs/pages/PerspectiveCamera.html) · three@0.186.1 · 2026-10-26

### API · THREE.BoxGeometry

원점 중심의 직육면체 모양을 만드는 생성자입니다. 각 변은 local X/Y/Z와 평행합니다.

- `width: number` — local X 방향 길이입니다. (1)
- `height: number` — local Y 방향 길이입니다. (1)
- `depth: number` — local Z 방향 길이입니다. (1)

새 BoxGeometry를 반환합니다.

- segment 인자는 이 과정에서 생략하며 각 기본값은 1입니다. parameters.width를 바꿔도 정점이 다시 만들어지지 않습니다.

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
```

[THREE.BoxGeometry](https://threejs.org/docs/pages/BoxGeometry.html) · three@0.186.1 · 2026-10-26

### API · THREE.MeshBasicMaterial

조명 영향을 받지 않는 표면 표현을 만드는 생성자입니다.

- `color: Color | string | number` — 예제는 CSS hex 문자열을 사용합니다. (0xffffff)
- `wireframe: boolean` — true면 삼각형 모서리로 표현합니다. (false)

새 material을 반환합니다.

- 이 재질이 보이지 않는다고 light를 추가하는 것으로 해결하려 하지 마세요. Scene 연결·camera·render를 먼저 확인합니다.

```js
const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
```

[THREE.MeshBasicMaterial](https://threejs.org/docs/pages/MeshBasicMaterial.html) · three@0.186.1 · 2026-10-26

### API · THREE.Mesh

geometry와 material을 묶는 장면 객체 생성자입니다.

- `geometry: BufferGeometry` — 모양 객체입니다.
- `material: Material` — 표면 표현 객체입니다.

새 Mesh를 반환합니다. Scene에 자동으로 추가하지 않습니다.

- 이 과정은 생략 기본값에 의존하지 않고 두 인자를 전달합니다.

```js
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

[THREE.Mesh](https://threejs.org/docs/pages/Mesh.html) · three@0.186.1 · 2026-10-26

### API · object.position / Vector3.set

position은 부모 기준 위치를 담은 Vector3 멤버입니다. position.set은 세 성분을 한 번에 바꾸는 Vector3 메서드입니다.

- `x: number` — 부모 X축 기준 위치입니다.
- `y: number` — 부모 Y축 기준 위치입니다.
- `z: number` — 부모 Z축 기준 위치입니다.

position 초기값은 (0, 0, 0)입니다. set은 원본을 바꾸고 같은 Vector3를 반환합니다.

- position을 배열로 교체하지 말고 x/y/z 또는 set으로 바꾸세요.

```js
cube.position.set(1, 0, 0);
cube.position.x = 2;
```

[object.position / Vector3.set](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · camera.lookAt

world 좌표 목표를 향해 camera 방향을 바꾸는 메서드입니다.

- `x: number` — 목표 world X입니다. Vector3 하나를 전달하는 형태도 있습니다.
- `y: number` — 목표 world Y입니다.
- `z: number` — 목표 world Z입니다.

반환값 없음. camera 회전이 바뀌고 position은 바뀌지 않습니다.

- 비균일 scale 부모는 지원하지 않습니다. Controls 사용 시 매 프레임 lookAt과 controls.update가 서로 방향을 덮지 않게 합니다.

```js
camera.position.set(2, 0, 5);
camera.lookAt(0, 0, 0);
```

[camera.lookAt](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · object.add

다른 Object3D를 자식으로 연결하는 메서드입니다.

- `children: Object3D[]` — 연결할 자식들입니다. 여러 인자를 전달할 수 있습니다.

부모 자신을 반환합니다. 자식은 기존 부모에서 분리됩니다.

- 한 객체의 부모는 하나입니다. local transform은 유지하지만 world 위치 보존을 보장하지 않습니다.

```js
parent.add(child);
scene.add(parent);
```

[object.add](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · renderer.setPixelRatio / renderer.getPixelRatio

CSS px당 buffer px 비율을 정하는 메서드입니다. getPixelRatio()는 인자 없이 현재 설정 비율을 숫자로 읽는 메서드입니다.

- `value: number` — 실험에서는 1 또는 2를 명시합니다. renderer 초기 비율은 1입니다.

반환값 없음. 현재 논리 크기로 buffer를 다시 맞춥니다.

- devicePixelRatio를 자동으로 읽는 메서드가 아닙니다.
- 두 축에 비율이 적용되어 2면 픽셀 수는 4배입니다. 처리 시간이 반드시 4배라는 뜻은 아닙니다.

```js
renderer.setPixelRatio(2);
renderer.setSize(w, h, false);
```

[renderer.setPixelRatio / renderer.getPixelRatio](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · camera.updateProjectionMatrix

fov/aspect/near/far/zoom 변경을 투영 행렬에 반영하는 메서드입니다. 직교 카메라도 같은 이름의 메서드를 제공합니다.

반환값 없음. 다음 render가 새 투영을 사용합니다.

- 속성 대입만으로 자동 호출되지 않습니다.
- camera position 이동은 투영값 변경과 구별합니다.

```js
camera.aspect = w / h;
camera.updateProjectionMatrix();
```

[camera.updateProjectionMatrix](https://threejs.org/docs/pages/PerspectiveCamera.html) · three@0.186.1 · 2026-10-26

### API · canvas.width/height / stage.clientWidth/clientHeight

표시 크기와 buffer 크기를 읽는 DOM 멤버입니다. clientWidth/clientHeight는 CSS px이고 canvas.width/height는 buffer px입니다. clientWidth/clientHeight는 canvas에도 같은 Element 계약으로 적용됩니다.

크기 숫자를 반환하는 속성 읽기입니다. client 크기는 정수이며 padding 포함, border 제외입니다. 해당 방향 scrollbar도 제외합니다.

- Three.js API가 아닌 Web API입니다. packageVersion은 강의의 Three.js 기준 버전입니다.
- 예제 stage는 padding/border가 없습니다. renderer를 쓸 때 buffer를 canvas 속성으로 직접 변경하며 섞지 마세요.
- 표시 크기 출처: https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth 및 https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight

```js
const w = stage.clientWidth;
const h = stage.clientHeight;
output.textContent = `${w} × ${h}; ${canvas.width} × ${canvas.height}`;
```

[canvas.width/height / stage.clientWidth/clientHeight](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/width) · three@0.186.1 · 2026-10-26

### API · ResizeObserver / observe / disconnect

요소 크기 변화를 callback으로 알리는 Web API입니다. window 크기가 그대로여도 stage 변화에 반응합니다.

- `callback: function` — 크기가 변할 때 실행할 함수입니다. 예제는 resizeScene을 전달합니다.
- `target: Element` — observe(target)로 관찰할 stage 요소입니다.

생성자는 observer를 반환합니다. observe와 disconnect는 반환값이 없습니다. disconnect는 관찰을 중지합니다.

- Three.js API가 아닙니다. packageVersion은 강의의 Three.js 기준 버전입니다.
- w 또는 h가 0이면 나누기 전에 return합니다. observer는 render를 대신하지 않습니다.

```js
const observer = new ResizeObserver(resizeScene);
observer.observe(stage);
resizeScene();
// When observation ends: observer.disconnect();
```

[ResizeObserver / observe / disconnect](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) · three@0.186.1 · 2026-10-26

## 다음 학습

[이전: 장면 그래프와 카메라](../../01-foundations/README.md) · [다음: 원근과 직교 투영](../03/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
