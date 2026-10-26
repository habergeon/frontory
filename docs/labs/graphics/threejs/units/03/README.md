# Three.js · 03 원근과 직교 투영

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 장면 좌표·카메라·기하 · 편집 가능한 예제 · 저장 ID: `threejs-step-03`

## 목표와 학습 후 역량

- 같은 장면을 두 투영으로 표시한다.
- near 바깥 물체가 잘리는 경우를 재현한다.

## 선수 지식

Scene·Camera·크기 대응 개념을 복습합니다. 독립 HTML이 있어 이전 결과 파일은 필요 없습니다.

## 핵심 개념과 설명

### 원근 투영

PerspectiveCamera는 먼 물체를 작게 표현합니다. near와 far는 보이는 깊이 범위를 제한합니다.

### 직교 투영

OrthographicCamera에서는 거리가 크기를 바꾸지 않습니다. CAD식 배치와 비교 도식에 유용합니다.

## 실습 준비

사이트 안에서 독립 HTML을 편집·실행합니다. three@0.186.1과 addons는 사이트가 공급하며 별도 프로젝트·설치·외부 이미지가 필요 없습니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 깊이가 다른 두 cube를 관찰하고 거리 9→13과 FOV 50→30을 따로 비교하세요.
2. 직교 거리·zoom과 두 카메라의 크기 대응을 비교하고 near 부분/전체 잘림, far 잘림을 재현하세요.
3. OrbitControls의 camera/target과 물체 좌표를 비교하고 overview에서 CameraHelper를 관찰하세요. 조건·예상·실제 화면과 수치·원인을 사이트 필기에 남기세요.

## 관찰할 변수

| 변수   | 기준 조건         | 바꿀 조건          | 예상할 변화·검증 가설                        |
| ------ | ----------------- | ------------------ | -------------------------------------------- |
| 카메라 | PerspectiveCamera | OrthographicCamera | 깊이가 다른 큐브가 같은 화면 크기로 보입니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 같은 장면을 두 투영으로 표시한다.
- [ ] near 바깥 물체가 잘리는 경우를 재현한다.

## 자가 점검

1. FOV가 없는 직교 카메라는 확대를 어떻게 정하나요?
2. near를 과도하게 작게 두면 어떤 문제가 생길까요?

## 공식 참고

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-03/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-03/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

같은 장면을 원근·직교 카메라로 비교합니다. 거리, FOV, near/far, 시선을 한 번에 하나씩 바꾸고 물체가 작아지거나 사라지는 원인을 설명하세요. 각 시작 HTML에는 이미 배운 크기 대응이 들어 있습니다. 외부 GUI는 필요 없으며 label이 있는 입력과 버튼으로 기준 실험을 할 수 있습니다. 비교 전 기준 복원을 사용하고 camera 종류·위치·목표·투영값을 함께 기록합니다.

조건 / 예상 / 실제 화면과 수치 / 차이의 원인을 사이트 필기에 남기세요. 단계 선택이나 해설 열기는 코드를 교체하지 않습니다. 시작 코드 불러오기를 확인했을 때만 편집기가 바뀝니다.

### 선수 단원

- `threejs-01`
- `threejs-step-02`
- `javascript-step-02`
- `javascript-step-12`
- `javascript-step-18`

### 깊이가 다른 두 물체

시작 장면에는 같은 BoxGeometry(1, 1, 1)를 사용하는 A와 B가 있습니다. A=(-1, 0, 2), B=(1, 0, -2)이고 서로 다른 색과 텍스트 이름으로 구별합니다. camera=(0, 0, 9), lookAt=(0, 0, 0), fov=50, near=.1, far=30입니다. 큐브는 기울이지 않습니다.

output에서 두 물체의 좌표와 camera 위치를 읽고 어느 쪽이 크게 보일지 예상하세요. 이 배치에서 A 중심은 camera 앞 깊이 7, B는 깊이 11입니다. world z값 자체가 camera 깊이는 아닙니다. camera가 z=9에서 -Z를 보므로 9-2=7, 9-(-2)=11입니다.

먼 B를 가까운 A와 같은 크기로 고치지 말고 그대로 관찰하세요. 원근 투영은 가까운 물체를 크게 표현합니다. 두 cube의 geometry 폭은 모두 1이고 화면에서 보이는 폭만 다릅니다. 물체가 서로 가리지 않는 현재 x 위치도 유지합니다.

DOM 연결은 querySelector로 찾고 textContent에 문자열을 넣어 표시합니다. coords의 toFixed(2)는 표시용 소수 두 자리 문자열을 만들며 객체 좌표는 바꾸지 않습니다. 파란 A는 왼쪽, 주황 B는 오른쪽입니다. 숫자 목록과 A/B 이름도 함께 읽으세요. scene → A, B가 두 물체의 관계입니다. 이 단계는 관찰 과제이므로 geometry를 바꾸지 않습니다.

크기 대응은 제공된 지원 코드입니다. resizeScene은 stage.clientWidth/clientHeight를 CSS px로 읽고 0이면 return합니다. 연속 ResizeObserver가 숨김 뒤 표시와 크기 변화를 알려 다시 그립니다. setPixelRatio(1)은 실험 DPR을 고정하고 setSize(w,h,false)는 CSS를 바꾸지 않습니다. 원근 aspect와 직교 경계를 각각 갱신하고 updateProjectionMatrix 뒤 render합니다. 240×240 / 480×240 버튼은 stage.style.width를 바꾸며 좁은 화면에서는 max-width로 실제 폭이 줄어듭니다. output의 실제 CSS·buffer 값을 기록하세요. input.value는 문자열이라 Number로 읽습니다. change/click listener는 입력 확정/버튼 동작을 연결하며 숫자를 바꾼 뒤 적용 버튼을 누릅니다. HTML min/max/step과 checkValidity는 입력 범위를 검사합니다.

querySelectorAll은 숫자 input들을 모읍니다. [...목록]으로 배열을 만들고 every의 callback이 각 input.checkValidity()를 검사합니다. 하나라도 잘못되면 오류 문구를 표시하고 return합니다. event.target은 방금 바꾼 select나 checkbox이며 value/checked에서 선택값을 읽습니다. hidden은 zoom 입력의 표시 여부, disabled는 직교에서 사용하지 않는 FOV 입력의 조작 여부를 정합니다. String은 시작 거리 숫자를 input.value에 맞는 문자열로 바꿉니다.

**예상 결과**

같은 폭 1의 A와 B 중 camera 깊이 7의 A가 깊이 11의 B보다 크게 보입니다. output에는 실제 객체·camera 좌표가 표시됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>깊이가 다른 두 물체</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">기준 복원</button>

      <label
        >카메라 Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">적용</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="왼쪽 A와 오른쪽 B의 카메라 투영 비교"></canvas>
    </div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);


      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = '현재 보기: ' + 'PerspectiveCamera'
          + '\n카메라 위치: ' + coords(activeCamera.position)
          + '\nA (파랑): ' + coords(cubeA.position) + ' / B (주황): ' + coords(cubeB.position)
          + '\n물체 Y 회전: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far



          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // 지원 코드: 두 투영을 각각 갱신합니다. 여기서는 크기 실험을 새로 구현하지 않습니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();


        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = '숫자 입력 범위와 간격을 확인하세요.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far는 near보다 커야 합니다.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });



      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- geometry 폭과 화면 속 폭을 구별하세요. 두 geometry는 모두 1입니다.
- camera.z=9와 물체 z를 이용해 현재 정면 깊이 7,11을 확인하세요.
- A=(-1, 0, 2), B=(1, 0, -2), camera=(0, 0, 9)를 복원하면 A가 크게 보이는 기준 조건입니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

이 차이는 geometry 크기나 재질 때문이 아닙니다. 현재 camera에서 서로 다른 깊이를 투영하기 때문입니다. camera를 돌려 놓았다면 단순한 9-z 식을 그대로 쓸 수 없으므로 기준 복원 뒤 비교합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>깊이가 다른 두 물체</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">기준 복원</button>

      <label
        >카메라 Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">적용</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="왼쪽 A와 오른쪽 B의 카메라 투영 비교"></canvas>
    </div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);


      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = '현재 보기: ' + 'PerspectiveCamera'
          + '\n카메라 위치: ' + coords(activeCamera.position)
          + '\nA (파랑): ' + coords(cubeA.position) + ' / B (주황): ' + coords(cubeB.position)
          + '\n물체 Y 회전: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far



          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // 지원 코드: 두 투영을 각각 갱신합니다. 여기서는 크기 실험을 새로 구현하지 않습니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();


        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = '숫자 입력 범위와 간격을 확인하세요.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far는 near보다 커야 합니다.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });



      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- 두 geometry 크기가 같은데 화면 크기는 왜 다른가요?
- B의 z=-2가 camera 깊이 -2라는 뜻인가요?

### 거리 이동과 FOV 변경

이 시작 예제는 같은 두 cube와 기준 복원 버튼을 포함합니다. applyCameraSettings()에서 입력을 Number로 바꾸어 camera에 적용합니다. 기준은 camera.z=9, fov=50입니다. 이번에는 두 실험을 섞지 않습니다.

먼저 fov=50을 유지하고 camera.z만 9에서 13으로 바꿉니다. lookAt 목표는 원점으로 유지합니다. 두 물체가 작아지는 정도를 비교하세요. 중심 깊이는 A=11, B=15가 됩니다. 그다음 기준 복원으로 돌아와 camera.z=9를 유지하고 fov만 50에서 30으로 줄입니다. fov를 대입한 다음 camera.updateProjectionMatrix()를 호출합니다.

FOV는 카메라가 세로로 보는 각도이며 degree입니다. 작은 FOV는 고정 위치에서 더 좁은 영역을 크게 보여 줍니다. 카메라를 가까이 옮긴 것과 화면이 비슷해 보여도 서로 다른 깊이 물체의 상대 크기까지 항상 같지는 않습니다.

먼저 입력으로 관찰한 뒤 코드에서도 실험합니다. baselineDistance = 9를 13으로 바꾸고 실행하세요. 다시 9로 복원한 뒤 baselineFov = 50을 30으로 바꾸세요. 완성 예제는 거리 9/FOV 30 조건이며 입력으로 기준 9/50도 복원할 수 있습니다.

**예상 결과**

camera.z=13에서는 두 물체가 작아지고 상대 크기 차이도 달라집니다. 기준 복원 후 fov=30에서는 둘 다 커지지만 위치와 깊이는 7/11 그대로입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>거리 이동과 FOV 변경</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">기준 복원</button>

      <label
        >카메라 Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">적용</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="왼쪽 A와 오른쪽 B의 카메라 투영 비교"></canvas>
    </div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      document.querySelector('#fov').value = String(baselineFov);
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);


      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = '현재 보기: ' + 'PerspectiveCamera'
          + '\n카메라 위치: ' + coords(activeCamera.position)
          + '\nA (파랑): ' + coords(cubeA.position) + ' / B (주황): ' + coords(cubeB.position)
          + '\n물체 Y 회전: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far



          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // 지원 코드: 두 투영을 각각 갱신합니다. 여기서는 크기 실험을 새로 구현하지 않습니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();


        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = '숫자 입력 범위와 간격을 확인하세요.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far는 near보다 커야 합니다.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });



      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 거리 실험에서는 fov=50, FOV 실험에서는 camera.z=9가 유지되는지 output을 보세요.
- camera.fov 대입 다음 updateProjectionMatrix가 있는지 확인하세요.
- 기준을 복원한 뒤 camera.fov = 30; camera.updateProjectionMatrix();로 FOV만 바꾸세요. 거리 실험은 camera.position.z = 13입니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

거리 변경은 A/B 중심 깊이를 7/11에서 11/15로 바꿉니다. FOV 변경은 위치와 깊이를 유지한 채 같은 투영 배율을 바꿉니다. 따라서 두 실험을 모두 ‘확대·축소’라고만 기록하면 차이를 놓칩니다. FOV 입력이 무반응이면 현재 render에 전달한 camera가 맞는지와 projection 갱신을 확인하세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>거리 이동과 FOV 변경</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">기준 복원</button>

      <label
        >카메라 Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="30"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">적용</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="왼쪽 A와 오른쪽 B의 카메라 투영 비교"></canvas>
    </div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 30;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);


      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = '현재 보기: ' + 'PerspectiveCamera'
          + '\n카메라 위치: ' + coords(activeCamera.position)
          + '\nA (파랑): ' + coords(cubeA.position) + ' / B (주황): ' + coords(cubeB.position)
          + '\n물체 Y 회전: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far



          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // 지원 코드: 두 투영을 각각 갱신합니다. 여기서는 크기 실험을 새로 구현하지 않습니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();


        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = '숫자 입력 범위와 간격을 확인하세요.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far는 near보다 커야 합니다.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });



      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- 거리 이동과 FOV 변경은 여러 깊이의 장면에서도 항상 같은 결과인가요?
- FOV를 바꾸면 camera.position도 바뀌나요?

### 직교 투영과 확대

시작 예제에는 subjectCamera와 ortho 두 카메라가 있고 activeCamera만 render에 전달합니다. 같은 위치 (0, 0, 9), 같은 원점 목표로 비교합니다. 원근 FOV와 직교 경계는 서로 다른 설정이므로 전환 순간 전체 장면 크기가 똑같을 필요는 없습니다.

직교 카메라는 halfHeight=3, left=-halfHeight*aspect, right=halfHeight*aspect, top=halfHeight, bottom=-halfHeight, near=.1, far=30입니다. A/B의 화면 크기를 비교한 뒤 ortho.position.z를 9에서 13으로 바꿉니다. 방향·경계·zoom=1을 유지하고 물체가 잘림 범위 안에 있게 합니다.

이어서 거리 9를 복원하고 ortho.zoom을 1에서 2로 바꾼 뒤 ortho.updateProjectionMatrix()를 호출합니다. 직교 확대는 거리 대신 경계 또는 zoom으로 결정합니다. 크기를 바꿀 때는 halfHeight를 유지하고 left/right를 새 aspect로 다시 계산한 뒤 projection을 갱신하세요. ortho.aspect를 대입하는 것으로 해결하지 않습니다.

카메라 선택은 투영 선택입니다. activeCamera는 선택한 subjectCamera 또는 ortho를 가리킵니다. zoom 입력은 직교에서만 나타납니다. 완성 예제는 직교 거리 9/zoom 2 조건입니다. 기준 복원은 원근 9/50, 직교 경계 ±3과 zoom 1을 함께 되돌립니다. 직교에서는 FOV 입력을 비활성화하고 zoom으로 확대를 정합니다.

**예상 결과**

직교에서 A와 B가 같은 크기로 보이고 camera.z=9→13에서도 그 크기가 유지됩니다. zoom=1→2에서는 둘 다 커집니다. stage 비율을 바꿔도 도형 비율은 유지됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>직교 투영과 확대</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">기준 복원</button>
      <label
        >투영
        <select id="projection">
          <option value="perspective">PerspectiveCamera</option>
          <option value="ortho">OrthographicCamera</option>
        </select></label
      >

      <label
        >카메라 Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>
      <span id="zoom-field" hidden
        ><label
          >zoom
          <input
            id="zoom"
            type="number"
            value="1"
            min="0.5"
            max="3"
            step="0.5"
            required /></label
      ></span>

      <button id="apply">적용</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="왼쪽 A와 오른쪽 B의 카메라 투영 비교"></canvas>
    </div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);
      const halfHeight = 3;
      const ortho = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 30);
      ortho.position.set(0, 0, baselineDistance);
      ortho.lookAt(0, 0, 0);
      ortho.zoom = 1;

      let activeCamera = subjectCamera;
      document.querySelector('#fov').disabled = activeCamera !== subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = '현재 보기: ' + (activeCamera === subjectCamera ? 'PerspectiveCamera' : 'OrthographicCamera')
          + '\n카메라 위치: ' + coords(activeCamera.position)
          + '\nA (파랑): ' + coords(cubeA.position) + ' / B (주황): ' + coords(cubeB.position)
          + '\n물체 Y 회전: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far
          + '\northo zoom: ' + ortho.zoom + ' / left/right: ' + ortho.left.toFixed(2) + ' / ' + ortho.right.toFixed(2)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // 지원 코드: 두 투영을 각각 갱신합니다. 여기서는 크기 실험을 새로 구현하지 않습니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();
        ortho.left = -halfHeight * w / h;
        ortho.right = halfHeight * w / h;
        ortho.top = halfHeight;
        ortho.bottom = -halfHeight;
        ortho.updateProjectionMatrix();

        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = '숫자 입력 범위와 간격을 확인하세요.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far는 near보다 커야 합니다.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        if (camera === subjectCamera) camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;
        if (camera === ortho) camera.zoom = Number(document.querySelector('#zoom').value);
        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;
        document.querySelector('#projection').value = 'perspective';
        document.querySelector('#zoom').value = '1';
        document.querySelector('#zoom-field').hidden = true;
        document.querySelector('#fov').disabled = false;
        ortho.position.set(0, 0, 9); ortho.lookAt(0, 0, 0); ortho.zoom = 1; ortho.near = 0.1; ortho.far = 30;
        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });
      document.querySelector('#projection').addEventListener('change', event => {
        activeCamera = event.target.value === 'ortho' ? ortho : subjectCamera;
        document.querySelector('#zoom-field').hidden = activeCamera !== ortho;
        document.querySelector('#fov').disabled = activeCamera === ortho;
        document.querySelector('#distance').value = String(activeCamera.position.z);
        document.querySelector('#near').value = String(activeCamera.near);
        document.querySelector('#far').value = String(activeCamera.far);

        resizeScene();
      });


      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- activeCamera가 현재 선택한 ortho인지 확인하세요.
- ortho의 left/right 범위와 top/bottom 범위 비율이 stage의 w/h와 맞는지 확인하세요.
- halfHeight=3을 유지하고 left/right=±halfHeight*aspect, top/bottom=±halfHeight를 적용한 뒤 updateProjectionMatrix를 호출하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

직교에서는 같은 방향의 같은 크기 물체가 깊이에 따라 작아지지 않습니다. camera 이동으로 깊이만 바꾸면 크기는 유지됩니다. zoom=2는 보이는 범위를 좁혀 물체를 더 크게 표현합니다. 직교에서도 크기 대응을 빼면 표시 비율이 찌그러질 수 있습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>직교 투영과 확대</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">기준 복원</button>
      <label
        >투영
        <select id="projection">
          <option value="perspective">PerspectiveCamera</option>
          <option value="ortho" selected>OrthographicCamera</option>
        </select></label
      >

      <label
        >카메라 Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>
      <span id="zoom-field"
        ><label
          >zoom
          <input
            id="zoom"
            type="number"
            value="2"
            min="0.5"
            max="3"
            step="0.5"
            required /></label
      ></span>

      <button id="apply">적용</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="왼쪽 A와 오른쪽 B의 카메라 투영 비교"></canvas>
    </div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);
      const halfHeight = 3;
      const ortho = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 30);
      ortho.position.set(0, 0, baselineDistance);
      ortho.lookAt(0, 0, 0);
      ortho.zoom = 2;

      let activeCamera = ortho;
      document.querySelector('#fov').disabled = activeCamera !== subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = '현재 보기: ' + (activeCamera === subjectCamera ? 'PerspectiveCamera' : 'OrthographicCamera')
          + '\n카메라 위치: ' + coords(activeCamera.position)
          + '\nA (파랑): ' + coords(cubeA.position) + ' / B (주황): ' + coords(cubeB.position)
          + '\n물체 Y 회전: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far
          + '\northo zoom: ' + ortho.zoom + ' / left/right: ' + ortho.left.toFixed(2) + ' / ' + ortho.right.toFixed(2)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // 지원 코드: 두 투영을 각각 갱신합니다. 여기서는 크기 실험을 새로 구현하지 않습니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();
        ortho.left = -halfHeight * w / h;
        ortho.right = halfHeight * w / h;
        ortho.top = halfHeight;
        ortho.bottom = -halfHeight;
        ortho.updateProjectionMatrix();

        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = '숫자 입력 범위와 간격을 확인하세요.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far는 near보다 커야 합니다.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        if (camera === subjectCamera) camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;
        if (camera === ortho) camera.zoom = Number(document.querySelector('#zoom').value);
        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;
        document.querySelector('#projection').value = 'perspective';
        document.querySelector('#zoom').value = '1';
        document.querySelector('#zoom-field').hidden = true;
        document.querySelector('#fov').disabled = false;
        ortho.position.set(0, 0, 9); ortho.lookAt(0, 0, 0); ortho.zoom = 1; ortho.near = 0.1; ortho.far = 30;
        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });
      document.querySelector('#projection').addEventListener('change', event => {
        activeCamera = event.target.value === 'ortho' ? ortho : subjectCamera;
        document.querySelector('#zoom-field').hidden = activeCamera !== ortho;
        document.querySelector('#fov').disabled = activeCamera === ortho;
        document.querySelector('#distance').value = String(activeCamera.position.z);
        document.querySelector('#near').value = String(activeCamera.near);
        document.querySelector('#far').value = String(activeCamera.far);

        resizeScene();
      });


      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- 직교 카메라에서 확대를 어떻게 정하나요?
- 직교에는 왜 camera.aspect 대입만으로 부족한가요?

### near와 far로 잘리는 범위

시작 예제는 원근 기준 camera=(0, 0, 9), A=(-1, 0, 2), B=(1, 0, -2), near=.1, far=30입니다. 컨트롤은 꺼져 있습니다. near/far는 원점에서 같은 거리인 구가 아니라 camera 시선 방향 깊이의 앞·뒤 평면입니다. .1>0이고 far>near인 조건을 유지합니다.

near를 .1에서 7, 그다음 8로 바꾸고 매번 updateProjectionMatrix를 호출합니다. A 중심 깊이는 7이지만 cube는 점이 아닙니다. 한 변 1이라 표면 깊이 범위가 [6.5, 7.5]입니다. near=7이면 일부가 잘리고 8이면 A 전체가 근거리 평면 앞에 있어 사라집니다. B 범위는 [10.5, 11.5]라 남습니다.

기준 복원 후 near=.1을 유지하고 far만 30에서 9로 바꿉니다. 어느 cube가 사라질지 예상하세요. 실제 화면과 입력값을 함께 적습니다. center만 보고 ‘near=7이면 A가 완전히 사라진다’고 쓰지 마세요.

near/far 입력을 바꾼 뒤 적용하세요. 잘못된 범위는 화면의 오류 문구를 읽고 near>0, far>near로 고칩니다. 완성 예제는 near=8, far=30에서 시작하므로 기준 복원 후 부분 잘림도 비교하세요.

**예상 결과**

near=7에서 A 일부가 잘리고 near=8에서 A가 사라집니다. near=.1 복원 후 far=9에서는 B가 사라집니다. 설정을 복원하면 두 객체가 다시 보입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>near와 far로 잘리는 범위</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">기준 복원</button>

      <label
        >카메라 Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">적용</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="왼쪽 A와 오른쪽 B의 카메라 투영 비교"></canvas>
    </div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);


      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = '현재 보기: ' + 'PerspectiveCamera'
          + '\n카메라 위치: ' + coords(activeCamera.position)
          + '\nA (파랑): ' + coords(cubeA.position) + ' / B (주황): ' + coords(cubeB.position)
          + '\n물체 Y 회전: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far



          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // 지원 코드: 두 투영을 각각 갱신합니다. 여기서는 크기 실험을 새로 구현하지 않습니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();


        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = '숫자 입력 범위와 간격을 확인하세요.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far는 near보다 커야 합니다.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });



      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- A의 중심 깊이 7과 표면 범위 [6.5, 7.5]를 구별하세요.
- near/far 변경 뒤 현재 activeCamera의 projection을 갱신했는지 보세요.
- near=8, far=30이면 A는 사라지고 B는 남습니다. near=.1, far=9면 반대로 A는 남고 B는 사라집니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

far=9는 A 범위를 포함하지만 B 범위보다 앞이므로 B가 사라집니다. 잘림은 Scene에서 객체를 삭제한 것이 아닙니다. near/far를 복원하면 다시 보입니다. near를 무조건 0에 가깝게 작게 두는 것은 원근 깊이 정밀도에 불리하므로 필요한 범위로 정합니다. 이 원근 카메라에서는 near=0을 쓰지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>near와 far로 잘리는 범위</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">기준 복원</button>

      <label
        >카메라 Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="8"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">적용</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="왼쪽 A와 오른쪽 B의 카메라 투영 비교"></canvas>
    </div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 8, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);


      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = '현재 보기: ' + 'PerspectiveCamera'
          + '\n카메라 위치: ' + coords(activeCamera.position)
          + '\nA (파랑): ' + coords(cubeA.position) + ' / B (주황): ' + coords(cubeB.position)
          + '\n물체 Y 회전: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far



          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // 지원 코드: 두 투영을 각각 갱신합니다. 여기서는 크기 실험을 새로 구현하지 않습니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();


        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = '숫자 입력 범위와 간격을 확인하세요.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far는 near보다 커야 합니다.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });



      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- near=7에서 A가 완전히 사라지지 않는 이유는 무엇인가요?
- near를 아주 작게 하면 항상 유리한가요?
- 잘린 객체는 Scene에서 삭제되었나요?

### 카메라 목표와 OrbitControls

이 독립 HTML은 import { OrbitControls } from 'three/addons/controls/OrbitControls.js'를 명시합니다. controls = new OrbitControls(activeCamera, canvas)는 camera와 이벤트를 받을 canvas를 연결합니다. controls.target은 world 좌표의 목표이고 기본 (0, 0, 0)입니다. target.set(0, 0, 0) 뒤 controls.update()로 반영합니다.

기준 장면에서 왼쪽 드래그와 휠을 사용하고 output의 camera.position, controls.target, 두 물체 position을 비교합니다. 드래그는 물체 회전이 아닌 camera orbit입니다. 원근에서 휠은 주로 camera 거리를, 직교에서는 zoom을 바꿉니다. 입력과 버튼만으로도 기준 거리·목표·투영 실험을 할 수 있으므로 필수 과제에 마우스 조작만 요구하지 않습니다.

enableDamping을 false에서 true로 바꾸고 loop 안에서 controls.update()를 호출합니다. 관성 계산을 매 프레임 갱신해야 합니다. 숫자 비교 모드에서는 controls.enabled=false로 조작을 끄고 loop도 if (controls.enabled) controls.update()로 제한합니다. 카메라를 전환할 때는 기존 controls.dispose() 뒤 새 activeCamera용 controls를 만들고 target과 update를 적용합니다.

코드의 damping = false를 true로 바꾸고 실행하세요. loop는 이미 if (controls.enabled) controls.update()를 포함합니다. 숫자 비교 checkbox를 켜면 enabled=false이고 loop의 update도 멈춥니다. 적용 버튼은 기존 controls를 dispose하고 새로 연결해 남은 관성을 지운 뒤 숫자 위치·target을 적용합니다. camera X와 target X 입력으로도 위치/시선 변화를 비교할 수 있습니다. checkbox를 끄면 마우스 조작을 다시 켭니다. setAnimationLoop의 callback은 매 프레임 실행할 함수를 전달하는 자리입니다. coords는 position의 세 숫자만 읽으며 물체 rotation도 output에 표시합니다.

**예상 결과**

드래그 후 camera.position은 변하지만 물체 position은 같습니다. 원근 휠은 거리, 직교 휠은 zoom 변화를 output에서 확인합니다. damping=true일 때 loop의 update로 움직임이 이어집니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>카메라 목표와 OrbitControls</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">기준 복원</button>
      <label
        >투영
        <select id="projection">
          <option value="perspective">PerspectiveCamera</option>
          <option value="ortho">OrthographicCamera</option>
        </select></label
      >

      <label
        >카메라 Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>
      <span id="zoom-field" hidden
        ><label
          >zoom
          <input
            id="zoom"
            type="number"
            value="1"
            min="0.5"
            max="3"
            step="0.5"
            required /></label
      ></span>
      <label
        >camera X
        <input
          id="camera-x"
          type="number"
          value="0"
          min="-5"
          max="5"
          step="0.5"
          required /></label
      ><label
        >target X
        <input
          id="target-x"
          type="number"
          value="0"
          min="-3"
          max="3"
          step="0.5"
          required /></label
      ><label
        ><input id="compare" type="checkbox" />숫자 비교 (조작 끄기)</label
      >
      <button id="apply">적용</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="왼쪽 A와 오른쪽 B의 카메라 투영 비교"></canvas>
    </div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);
      const halfHeight = 3;
      const ortho = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 30);
      ortho.position.set(0, 0, baselineDistance);
      ortho.lookAt(0, 0, 0);
      ortho.zoom = 1;

      let activeCamera = subjectCamera;
      document.querySelector('#fov').disabled = activeCamera !== subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const damping = false;
      let controls;
      function connectControls() {
        if (controls) controls.dispose();
        controls = new OrbitControls(activeCamera, canvas);
        controls.target.set(Number(document.querySelector('#target-x').value), 0, 0);
        controls.enableDamping = damping;
        controls.update();
        controls.enabled = !document.querySelector('#compare').checked;
      }
      connectControls();
      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = '현재 보기: ' + (activeCamera === subjectCamera ? 'PerspectiveCamera' : 'OrthographicCamera')
          + '\n카메라 위치: ' + coords(activeCamera.position)
          + '\nA (파랑): ' + coords(cubeA.position) + ' / B (주황): ' + coords(cubeB.position)
          + '\n물체 Y 회전: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far
          + '\northo zoom: ' + ortho.zoom + ' / left/right: ' + ortho.left.toFixed(2) + ' / ' + ortho.right.toFixed(2)
          + '\ncontrols.target: ' + coords(controls.target) + ' / enabled: ' + controls.enabled + ' / damping: ' + controls.enableDamping

          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // 지원 코드: 두 투영을 각각 갱신합니다. 여기서는 크기 실험을 새로 구현하지 않습니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();
        ortho.left = -halfHeight * w / h;
        ortho.right = halfHeight * w / h;
        ortho.top = halfHeight;
        ortho.bottom = -halfHeight;
        ortho.updateProjectionMatrix();

        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = '숫자 입력 범위와 간격을 확인하세요.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far는 near보다 커야 합니다.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(Number(document.querySelector('#camera-x').value), 0, Number(document.querySelector('#distance').value));
        if (camera === subjectCamera) camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;
        if (camera === ortho) camera.zoom = Number(document.querySelector('#zoom').value);
        camera.updateProjectionMatrix();
        connectControls();

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;
        document.querySelector('#projection').value = 'perspective';
        document.querySelector('#zoom').value = '1';
        document.querySelector('#zoom-field').hidden = true;
        document.querySelector('#fov').disabled = false;
        ortho.position.set(0, 0, 9); ortho.lookAt(0, 0, 0); ortho.zoom = 1; ortho.near = 0.1; ortho.far = 30;
        activeCamera = subjectCamera;

        document.querySelector('#camera-x').value = '0';
        document.querySelector('#target-x').value = '0';
        document.querySelector('#compare').checked = false;
        connectControls();
        error.textContent = '';
        resizeScene();
      });
      document.querySelector('#projection').addEventListener('change', event => {
        activeCamera = event.target.value === 'ortho' ? ortho : subjectCamera;
        document.querySelector('#zoom-field').hidden = activeCamera !== ortho;
        document.querySelector('#fov').disabled = activeCamera === ortho;
        document.querySelector('#distance').value = String(activeCamera.position.z);
        document.querySelector('#near').value = String(activeCamera.near);
        document.querySelector('#far').value = String(activeCamera.far);
        document.querySelector('#camera-x').value = String(activeCamera.position.x);
        connectControls();
        resizeScene();
      });

      document.querySelector('#compare').addEventListener('change', () => {
        controls.enabled = !document.querySelector('#compare').checked;
        draw();
      });
      renderer.setAnimationLoop(() => {
        if (controls.enabled) controls.update();
        draw();
      });
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- output에서 물체 position과 camera.position 중 어느 값이 바뀌는지 보세요.
- target 변경 뒤 update, damping 시 매 프레임 update가 있는지 확인하세요.
- camera 전환은 controls.dispose(); controls = new OrbitControls(activeCamera, canvas); controls.target.set(0, 0, 0); controls.update(); 순서로 연결합니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

lookAt을 매 프레임 호출하면서 controls도 방향을 정하게 하면 마지막 호출이 앞선 방향을 덮어써 시선이 튈 수 있습니다. controls 사용 중에는 목표를 target으로 통일합니다. enabled=false는 모든 명시적 update 호출을 무효화한다는 뜻이 아닙니다. 카메라 전환 뒤 예전 camera만 움직이면 controls가 어느 camera로 생성됐는지 확인하세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>카메라 목표와 OrbitControls</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">기준 복원</button>
      <label
        >투영
        <select id="projection">
          <option value="perspective">PerspectiveCamera</option>
          <option value="ortho">OrthographicCamera</option>
        </select></label
      >

      <label
        >카메라 Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>
      <span id="zoom-field" hidden
        ><label
          >zoom
          <input
            id="zoom"
            type="number"
            value="1"
            min="0.5"
            max="3"
            step="0.5"
            required /></label
      ></span>
      <label
        >camera X
        <input
          id="camera-x"
          type="number"
          value="0"
          min="-5"
          max="5"
          step="0.5"
          required /></label
      ><label
        >target X
        <input
          id="target-x"
          type="number"
          value="0"
          min="-3"
          max="3"
          step="0.5"
          required /></label
      ><label
        ><input id="compare" type="checkbox" />숫자 비교 (조작 끄기)</label
      >
      <button id="apply">적용</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="왼쪽 A와 오른쪽 B의 카메라 투영 비교"></canvas>
    </div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);
      const halfHeight = 3;
      const ortho = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 30);
      ortho.position.set(0, 0, baselineDistance);
      ortho.lookAt(0, 0, 0);
      ortho.zoom = 1;

      let activeCamera = subjectCamera;
      document.querySelector('#fov').disabled = activeCamera !== subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const damping = true;
      let controls;
      function connectControls() {
        if (controls) controls.dispose();
        controls = new OrbitControls(activeCamera, canvas);
        controls.target.set(Number(document.querySelector('#target-x').value), 0, 0);
        controls.enableDamping = damping;
        controls.update();
        controls.enabled = !document.querySelector('#compare').checked;
      }
      connectControls();
      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = '현재 보기: ' + (activeCamera === subjectCamera ? 'PerspectiveCamera' : 'OrthographicCamera')
          + '\n카메라 위치: ' + coords(activeCamera.position)
          + '\nA (파랑): ' + coords(cubeA.position) + ' / B (주황): ' + coords(cubeB.position)
          + '\n물체 Y 회전: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far
          + '\northo zoom: ' + ortho.zoom + ' / left/right: ' + ortho.left.toFixed(2) + ' / ' + ortho.right.toFixed(2)
          + '\ncontrols.target: ' + coords(controls.target) + ' / enabled: ' + controls.enabled + ' / damping: ' + controls.enableDamping

          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // 지원 코드: 두 투영을 각각 갱신합니다. 여기서는 크기 실험을 새로 구현하지 않습니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();
        ortho.left = -halfHeight * w / h;
        ortho.right = halfHeight * w / h;
        ortho.top = halfHeight;
        ortho.bottom = -halfHeight;
        ortho.updateProjectionMatrix();

        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = '숫자 입력 범위와 간격을 확인하세요.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far는 near보다 커야 합니다.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(Number(document.querySelector('#camera-x').value), 0, Number(document.querySelector('#distance').value));
        if (camera === subjectCamera) camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;
        if (camera === ortho) camera.zoom = Number(document.querySelector('#zoom').value);
        camera.updateProjectionMatrix();
        connectControls();

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;
        document.querySelector('#projection').value = 'perspective';
        document.querySelector('#zoom').value = '1';
        document.querySelector('#zoom-field').hidden = true;
        document.querySelector('#fov').disabled = false;
        ortho.position.set(0, 0, 9); ortho.lookAt(0, 0, 0); ortho.zoom = 1; ortho.near = 0.1; ortho.far = 30;
        activeCamera = subjectCamera;

        document.querySelector('#camera-x').value = '0';
        document.querySelector('#target-x').value = '0';
        document.querySelector('#compare').checked = false;
        connectControls();
        error.textContent = '';
        resizeScene();
      });
      document.querySelector('#projection').addEventListener('change', event => {
        activeCamera = event.target.value === 'ortho' ? ortho : subjectCamera;
        document.querySelector('#zoom-field').hidden = activeCamera !== ortho;
        document.querySelector('#fov').disabled = activeCamera === ortho;
        document.querySelector('#distance').value = String(activeCamera.position.z);
        document.querySelector('#near').value = String(activeCamera.near);
        document.querySelector('#far').value = String(activeCamera.far);
        document.querySelector('#camera-x').value = String(activeCamera.position.x);
        connectControls();
        resizeScene();
      });

      document.querySelector('#compare').addEventListener('change', () => {
        controls.enabled = !document.querySelector('#compare').checked;
        draw();
      });
      renderer.setAnimationLoop(() => {
        if (controls.enabled) controls.update();
        draw();
      });
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- controls.target과 camera.position은 같은 값인가요?
- 매 프레임 lookAt과 controls.update를 함께 쓰면 왜 시선이 튈 수 있나요?
- 카메라 종류를 바꾸었는데 이전 camera만 움직이면 무엇을 확인하나요?

### 밖에서 절두체 보기

이 시작 HTML에는 촬영할 subjectCamera와 밖에서 볼 overviewCamera가 있습니다. 두 camera를 한 canvas에서 번갈아 render하며 화면을 분할하지 않습니다. subjectCamera=(0, 0, 9), near=.1, far=12, fov=50입니다. overviewCamera는 (10, 8, 16)에서 장면을 봅니다. 앞선 far=30보다 12로 줄인 이유는 절두체 전체를 overview에서 관찰하기 위해서이며 물체 깊이 [6.5, 7.5], [10.5, 11.5]는 여전히 포함합니다.

scene.add(subjectCamera), helper = new THREE.CameraHelper(subjectCamera), scene.add(helper)를 찾으세요. helper는 subjectCamera의 자식이 아니라 scene의 직접 자식입니다. subject 보기에서는 helper.visible=false, overview 보기에서는 true로 바꿉니다. visible은 객체를 삭제하지 않고 선 표시만 바꿉니다.

overview를 선택한 다음 subjectCamera.fov를 50에서 30으로 줄입니다. subjectCamera.updateProjectionMatrix() 다음 helper.update()를 호출하세요. 다음은 기준 FOV를 복원하고 near 또는 far 하나만 바꿔 앞·뒤 평면을 관찰합니다. 제어 입력이 overviewCamera가 아닌 subjectCamera에 적용되는지 이름을 확인합니다.

코드에서도 baselineFov = 50을 30으로 바꾸고 실행한 뒤 overview를 선택하세요. 완성 예제는 FOV 30이며 원래 50과 선 폭을 비교합니다. view 선택은 activeCamera만 바꾸고 입력 대상 subjectCamera는 유지합니다. helper가 scene에 연결된 순서는 subjectCamera 다음이므로 overview render에서도 world 변환을 먼저 갱신합니다. resizeScene은 subject와 overview 두 원근 카메라의 aspect도 갱신합니다.

**예상 결과**

overview에서 subject 절두체가 보입니다. fov=30이면 fov=50보다 좁아지고 near/far 변경은 앞·뒤 평면을 움직입니다. subject 보기로 돌아와 실제 잘림과 비교할 수 있습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>밖에서 절두체 보기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">기준 복원</button>

      <label
        >보기
        <select id="view">
          <option value="subject">subjectCamera</option>
          <option value="overview">overviewCamera</option>
        </select></label
      >
      <label
        >카메라 Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="12"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">적용</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="왼쪽 A와 오른쪽 B의 카메라 투영 비교"></canvas>
    </div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      document.querySelector('#fov').value = String(baselineFov);
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 12);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);

      scene.add(subjectCamera);
      const helper = new THREE.CameraHelper(subjectCamera);
      scene.add(helper);
      helper.visible = false;
      const overviewCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
      overviewCamera.position.set(10, 8, 16);
      overviewCamera.lookAt(0, 0, 3);
      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = '현재 보기: ' + document.querySelector('#view').value
          + '\n카메라 위치: ' + coords(activeCamera.position)
          + '\nA (파랑): ' + coords(cubeA.position) + ' / B (주황): ' + coords(cubeB.position)
          + '\n물체 Y 회전: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far


          + '\nsubjectCamera: ' + coords(subjectCamera.position) + ' / helper.visible: ' + helper.visible
          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // 지원 코드: 두 투영을 각각 갱신합니다. 여기서는 크기 실험을 새로 구현하지 않습니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();

        overviewCamera.aspect = w / h;
        overviewCamera.updateProjectionMatrix();
        helper.update();
        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = '숫자 입력 범위와 간격을 확인하세요.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far는 near보다 커야 합니다.'; return; }
        error.textContent = '';
        const camera = subjectCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);
        helper.update();
        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '12';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 12; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;
        document.querySelector('#view').value = 'subject'; helper.visible = false;

        error.textContent = '';
        resizeScene();
      });

      document.querySelector('#view').addEventListener('change', event => {
        helper.visible = event.target.value === 'overview';
        activeCamera = helper.visible ? overviewCamera : subjectCamera;
        draw();
      });

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 현재 보기가 overview인지, 입력 대상이 subjectCamera인지 구별하세요.
- subjectCamera와 helper가 각각 scene에 추가되어 있는지 확인하세요.
- subjectCamera.updateProjectionMatrix(); helper.update(); 뒤 renderer.render(scene, overviewCamera)로 밖에서 관찰하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

절두체는 camera가 볼 수 있는 범위입니다. 원근에서는 앞이 잘린 피라미드 형태입니다. FOV를 줄이면 폭이 좁아지고 near/far는 앞·뒤 평면 위치를 바꿉니다. 자기 camera의 화면에서 자기 절두체 전체가 보이기를 요구하지 않습니다. CameraHelper는 subjectCamera.matrixWorld를 참조하므로 overview만 render할 때도 subjectCamera를 scene에 연결해 변환이 갱신되게 합니다. 카메라 설정 변경 뒤 helper.update를 빼면 선이 이전 투영을 나타낼 수 있습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>밖에서 절두체 보기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">기준 복원</button>

      <label
        >보기
        <select id="view">
          <option value="subject">subjectCamera</option>
          <option value="overview">overviewCamera</option>
        </select></label
      >
      <label
        >카메라 Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="30"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="12"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">적용</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="왼쪽 A와 오른쪽 B의 카메라 투영 비교"></canvas>
    </div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 30;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 12);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);

      scene.add(subjectCamera);
      const helper = new THREE.CameraHelper(subjectCamera);
      scene.add(helper);
      helper.visible = false;
      const overviewCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
      overviewCamera.position.set(10, 8, 16);
      overviewCamera.lookAt(0, 0, 3);
      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = '현재 보기: ' + document.querySelector('#view').value
          + '\n카메라 위치: ' + coords(activeCamera.position)
          + '\nA (파랑): ' + coords(cubeA.position) + ' / B (주황): ' + coords(cubeB.position)
          + '\n물체 Y 회전: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far


          + '\nsubjectCamera: ' + coords(subjectCamera.position) + ' / helper.visible: ' + helper.visible
          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // 지원 코드: 두 투영을 각각 갱신합니다. 여기서는 크기 실험을 새로 구현하지 않습니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();

        overviewCamera.aspect = w / h;
        overviewCamera.updateProjectionMatrix();
        helper.update();
        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = '숫자 입력 범위와 간격을 확인하세요.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far는 near보다 커야 합니다.'; return; }
        error.textContent = '';
        const camera = subjectCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);
        helper.update();
        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '12';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 12; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;
        document.querySelector('#view').value = 'subject'; helper.visible = false;

        error.textContent = '';
        resizeScene();
      });

      document.querySelector('#view').addEventListener('change', event => {
        helper.visible = event.target.value === 'overview';
        activeCamera = helper.visible ? overviewCamera : subjectCamera;
        draw();
      });

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- 왜 subjectCamera 자신의 화면만으로 절두체 전체를 보기 어렵나요?
- helper.update와 camera.updateProjectionMatrix는 각각 무엇을 갱신하나요?
- overview로 render할 때도 subjectCamera를 scene에 연결하는 이유는 무엇인가요?

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

### API · object.rotation.x/y/z

Object3D의 local 회전을 담은 Euler 멤버입니다. x/y/z는 radian 각도입니다.

초기 각도는 (0, 0, 0), 기본 order는 XYZ입니다. 성분 대입은 해당 객체를 바꿉니다.

- Math.PI / 2는 90°입니다. camera.fov의 degree와 혼동하지 마세요.
- 자식 rotation.y는 world Y축 회전과 항상 같지 않습니다.

```js
cube.rotation.y = Math.PI / 2;
```

[object.rotation.x/y/z](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

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

- `callback: function` — 크기가 변할 때 실행할 함수입니다. 아래 공용 예시는 resizeScene을 전달하며, 01 단원은 draw를 전달합니다.
- `target: Element` — observe(target)로 관찰할 요소입니다. 아래 예시는 stage, 01 단원은 canvas를 관찰합니다.

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

### API · THREE.OrthographicCamera

깊이가 달라도 같은 크기로 투영하는 직교 카메라 생성자입니다. 경계는 camera 공간 단위입니다.

- `left: number` — 왼쪽 경계입니다. (-1)
- `right: number` — 오른쪽 경계입니다. (1)
- `top: number` — 위쪽 경계입니다. (1)
- `bottom: number` — 아래쪽 경계입니다. (-1)
- `near: number` — 근거리 평면이며 0도 허용합니다. (0.1)
- `far: number` — near보다 큰 원거리 평면입니다. (2000)

새 OrthographicCamera를 반환합니다. zoom 기본값은 1입니다.

- aspect 속성으로 크기를 맞추지 않습니다. halfHeight를 유지하고 left/right=±halfHeight*aspect로 갱신합니다.
- 경계나 zoom 변경 뒤 updateProjectionMatrix를 호출하세요.

```js
const halfHeight = 3;
const ortho = new THREE.OrthographicCamera(-halfHeight * aspect, halfHeight * aspect, halfHeight, -halfHeight, .1, 30);
```

[THREE.OrthographicCamera](https://threejs.org/docs/pages/OrthographicCamera.html) · three@0.186.1 · 2026-10-26

### API · camera.fov / aspect / near / far / zoom

카메라 투영을 결정하는 숫자 멤버입니다. fov는 degree, aspect는 너비/높이, near/far는 깊이, zoom은 확대 비율입니다.

PerspectiveCamera 기본값은 fov=50, aspect=1, near=.1, far=2000, zoom=1입니다. 대입 후 투영 갱신이 필요합니다.

- near/far는 원점 거리의 구가 아닌 camera 시선 깊이의 평면입니다.
- 직교에는 fov가 없고 zoom과 left/right/top/bottom으로 범위를 정합니다. 실험 zoom은 양수입니다.

```js
perspective.fov = 30;
perspective.near = .1;
perspective.far = 30;
perspective.updateProjectionMatrix();
```

[camera.fov / aspect / near / far / zoom](https://threejs.org/docs/pages/PerspectiveCamera.html) · three@0.186.1 · 2026-10-26

### API · OrbitControls

camera를 목표 주변에서 조작하는 addon 생성자입니다. core와 별도 import가 필요합니다.

- `camera: Camera` — 조작할 원근 또는 직교 카메라입니다.
- `domElement: HTMLElement` — 입력 이벤트를 받을 canvas입니다.

새 controls를 반환합니다. 기본 target은 (0, 0, 0)입니다.

- 왼쪽 드래그는 camera orbit, 휠은 원근 거리 또는 직교 zoom 변경입니다.
- 카메라를 바꿀 때 이전 controls.dispose() 후 새 카메라용 controls를 만듭니다.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const controls = new OrbitControls(camera, canvas);
```

[OrbitControls](https://threejs.org/docs/pages/OrbitControls.html) · three@0.186.1 · 2026-10-26

### API · controls.target / enabled / enableDamping

target은 world 목표 Vector3이고 enabled는 입력 조작 허용 여부, enableDamping은 관성 사용 여부입니다.

기본 target=(0, 0, 0), enabled=true, enableDamping=false입니다. 값을 바꾸면 같은 controls에 반영됩니다.

- target.set 뒤 update가 필요합니다. damping을 켜면 매 프레임 update합니다.
- enabled=false라도 직접 update하면 계산을 수행할 수 있습니다. 비교 모드에서는 호출도 제어합니다.

```js
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.update();
```

[controls.target / enabled / enableDamping](https://threejs.org/docs/pages/OrbitControls.html) · three@0.186.1 · 2026-10-26

### API · controls.update

camera와 target 상태를 반영하는 인스턴스 메서드입니다.

- `deltaTime: number | null` — 선택적인 지난 시간, 초입니다. autoRotate가 없으면 이 예제에서는 생략합니다. (null)

변화 여부 boolean을 반환합니다. camera 위치·방향 또는 zoom을 갱신할 수 있습니다.

- 수동 camera/target 변경 뒤 호출합니다.
- 매 프레임 lookAt과 함께 방향을 덮어쓰지 마세요.

```js
if (controls.enabled) controls.update();
renderer.render(scene, activeCamera);
```

[controls.update](https://threejs.org/docs/pages/OrbitControls.html) · three@0.186.1 · 2026-10-26

### API · controls.dispose

controls가 연결한 이벤트 등을 해제하는 메서드입니다.

반환값 없음. 이전 controls 사용을 끝낼 때 호출합니다.

- geometry/material GPU 자원을 정리하는 메서드는 아닙니다.

```js
controls.dispose();
controls = new OrbitControls(activeCamera, canvas);
```

[controls.dispose](https://threejs.org/docs/pages/OrbitControls.html) · three@0.186.1 · 2026-10-26

### API · renderer.setAnimationLoop

프레임마다 실행할 callback을 등록하거나 중지하는 메서드입니다.

- `callback: function | null` — 비-XR 예제의 첫 인자는 timestamp timeMs입니다. null은 중지합니다.

반환값 없음. 등록한 callback이 반복 실행됩니다.

- timestamp는 ms이며 초는 (timeMs-start)/1000입니다.
- callback 안에서 객체 값을 바꾼 뒤 render도 호출해야 합니다.

```js
let start;
renderer.setAnimationLoop(timeMs => {
  if (start === undefined) start = timeMs;
  const seconds = (timeMs - start) / 1000;
  cube.rotation.y = seconds * speed;
  renderer.render(scene, camera);
});
```

[renderer.setAnimationLoop](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · THREE.CameraHelper / helper.update

camera의 절두체를 선으로 보여 주는 helper 생성자와 갱신 메서드입니다.

- `camera: Camera` — 절두체를 관찰할 subjectCamera입니다.

생성자는 helper를 반환하며 update는 반환값이 없습니다. 투영 변경 뒤 선을 갱신합니다.

- helper는 scene의 직접 자식으로 둡니다. overview로 볼 때 subjectCamera도 scene에 연결해 world 변환이 갱신되게 합니다.
- 자기 절두체는 별도 overviewCamera에서 관찰합니다.

```js
scene.add(subjectCamera);
const helper = new THREE.CameraHelper(subjectCamera);
scene.add(helper);
subjectCamera.updateProjectionMatrix();
helper.update();
```

[THREE.CameraHelper / helper.update](https://threejs.org/docs/pages/CameraHelper.html) · three@0.186.1 · 2026-10-26

### API · object.visible

장면 객체의 표시 여부 boolean 멤버이며 기본 true입니다.

속성 대입으로 표시 여부가 바뀝니다. 객체를 삭제하지 않습니다.

- helper.visible=false는 helper 선을 숨기며 subjectCamera를 삭제하지 않습니다.

```js
helper.visible = false;
```

[object.visible](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

## 다음 학습

[이전: 렌더러와 화면 크기](../02/README.md) · [다음: 회전과 피벗](../04/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
