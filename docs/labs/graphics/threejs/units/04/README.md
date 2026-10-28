# Three.js · 04 회전과 피벗

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 장면 좌표·카메라·기하 · 편집 가능한 예제 · 저장 ID: `threejs-step-04`

## 목표와 학습 후 역량

- 자전과 공전에서 local/world 위치를 예측하고 실제 수치로 확인한다.
- geometry 수정 없이 경첩을 만들고 문 경계가 고정되는 이유를 설명한다.

## 선수 지식

선수 개념: local/world 좌표, 카메라와 크기 대응. 각 시작 HTML이 필요한 코드를 포함하므로 이전 저장 초안은 필요하지 않습니다.

## 핵심 개념과 설명

### 자전과 공전

body 회전은 자기 원점의 방향을 바꿉니다. 부모 pivot을 돌리면 자식 offset 방향도 돌아 world 위치가 달라집니다.

### 문 경첩

폭 2인 문은 hinge=-1, door offset=+1로 닫힌 중심을 유지하며 가장자리에서 회전합니다.

### Euler 순서 보충

같은 x/y/z 각도도 intrinsic local 축의 순서에 따라 자세가 달라집니다. quaternion 구현은 필수 과제가 아닙니다.

## 실습 준비

사이트에서 three import를 제공합니다. 시작 HTML을 불러와 수정하고 실행한 뒤 사이트 필기에 예상과 실제 수치를 기록하세요.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 축과 원점을 확인하고 body.rotation.y만 0에서 Math.PI / 2로 바꿉니다.
2. pivot.rotation.y를 0에서 Math.PI / 2로 바꾸고 world (3,0,0)→(1,0,-2)를 비교합니다.
3. orbitSpeed와 spinSpeed를 하나씩 켜고 결합합니다. hinge=-1, door=+1을 적용해 닫힌 중심과 열린 중심을 기록합니다. Euler 순서는 보충으로 비교합니다.

## 관찰할 변수

| 변수        | 기준 조건       | 바꿀 조건        | 예상할 변화·검증 가설                                                                |
| ----------- | --------------- | ---------------- | ------------------------------------------------------------------------------------ |
| 회전 객체   | body            | pivot            | 자전은 world 원점이 고정되고 공전은 local offset을 유지하며 world 원점이 이동합니다. |
| 경첩 offset | hinge=0, door=0 | hinge=-1, door=1 | 닫힌 중심은 (0,0,0), 90° 중심은 (-1,0,-1), 경첩은 (-1,0,0)입니다.                    |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 자전과 공전에서 local/world 위치를 예측하고 실제 수치로 확인한다.
- [ ] geometry 수정 없이 경첩을 만들고 문 경계가 고정되는 이유를 설명한다.

## 자가 점검

1. 자전과 공전의 world 위치가 다른 이유는 무엇인가요?
2. 문 폭이 4라면 부모와 자식 offset을 어떻게 정하나요?

## 공식 참고

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-04/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-04/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

부모 원점과 자식 offset을 나누어 자전·공전·경첩을 만듭니다. 먼저 정지한 각도로 예측을 확인한 뒤 시간에 따른 움직임을 결합합니다. 시작 HTML은 필요한 Scene, camera, 크기 대응을 모두 포함하며 이전 초안을 요구하지 않습니다. 01에서는 부모가 원점이었고 여기서는 pivot=(1, 0, 0)으로 옮겨 부모 이동까지 비교합니다. 각도는 radian입니다. 마지막 Euler 순서 실험은 보충이며 quaternion 구현은 완료 조건이 아닙니다.

사이트가 three import를 제공합니다. canvas는 그리기 영역이고 output은 실제 객체 수치를 보여 줍니다. querySelector는 id로 DOM 요소를 찾고 input.value는 문자열을 반환합니다. Number로 숫자로 바꾸며 textContent로 텍스트를 표시합니다. addEventListener의 callback은 버튼을 누른 뒤 실행됩니다. syncInputs는 장면 상태에서 입력값을 채우므로 소스 상수를 수정하면 조작값도 함께 바뀝니다. 적용은 표시된 입력을 읽고 기준 복원은 소스의 기준값으로 되돌립니다. Number.isFinite와 checkValidity로 빈 값이나 유한하지 않은 수를 거릅니다. String은 입력 표시용 문자열을 만들고 toFixed는 좌표를 바꾸지 않고 표시만 반올림합니다. 작은 부동소수 오차는 허용 오차로 비교하세요. for...of는 각 입력을 차례로 검사합니다.

### 선수 단원

- `threejs-01`
- `threejs-step-02`
- `threejs-step-03`
- `javascript-step-02`
- `javascript-step-12`

### 축과 물체 원점

시작 트리는 Scene → pivot Group → body Mesh입니다. pivot.position=(1, 0, 0), body.position=(2, 0, 0), 모든 회전=0입니다. body는 BoxGeometry(1, .6, .4)여서 방향 변화가 대칭에 가려지지 않습니다. camera는 (6, 4, 8)에서 원점을 봅니다.

scene.add(new THREE.AxesHelper(3))는 장면 기준 축을, pivot.add(new THREE.AxesHelper(1))는 pivot 기준 축을 그립니다. +X는 빨강, +Y는 초록, +Z는 파랑입니다. 색 외에도 output의 축 이름과 수치를 읽으세요. 카메라를 옮기면 화면에서 축이 향하는 방향도 달라집니다.

body.position과 body.getWorldPosition(world)를 비교합니다. local=(2, 0, 0), world=(3, 0, 0)인지 예상하고 실행하세요. 여기서 위치는 Mesh 원점의 위치입니다. geometry의 모든 표면점이 같은 좌표에 있다는 뜻이 아닙니다.

**예상 결과**

pivot 원점은 world=(1, 0, 0), body local=(2, 0, 0), body world=(3, 0, 0)입니다. world 축과 pivot 축의 원점이 다릅니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>축과 물체 원점</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ 평면: pivot (1,0) → +X offset 2 → body (3,0)
부모 +Y 회전 π/2: offset +X → -Z, body (1,-2)</pre>
    <p>+X 빨강 / +Y 초록 / +Z 파랑. 각도는 radian: π/2 ≈ 1.5708rad = 90°.</p>
    <div class="controls">
      <label
        >pivot Y (rad)
        <input id="pivotAngle" type="number" step="any" required /></label
      ><label
        >body local Y (rad)
        <input id="bodyAngle" type="number" step="any" required /></label
      ><button id="apply">적용</button><button id="reset">기준 복원</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="축과 회전 중심 관찰"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const pivotAngle = 0;
      const bodyAngle = 0;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      pivot.rotation.y = pivotAngle;
      body.rotation.y = bodyAngle;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 표시 크기가 0이면 기다리고, 보이면 크기와 투영을 함께 갱신합니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('pivotAngle').value = String(pivot.rotation.y);
        input('bodyAngle').value = String(body.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = '유한한 숫자를 입력하세요.'; return;
          }
        }
        error.textContent = '';
        pivot.rotation.y = Number(input('pivotAngle').value);
        body.rotation.y = Number(input('bodyAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        pivot.rotation.y = pivotAngle;
        body.rotation.y = bodyAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 트리에서 body의 부모가 pivot인지 확인하세요.
- body.position의 2에 부모 위치 1이 더해지는 정지 조건인지 확인하세요.
- pivot.position.set(1, 0, 0); body.position.set(2, 0, 0); pivot.add(body); scene.add(pivot);로 구성하고 getWorldPosition으로 읽으세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

부모 원점이 이미 world +X로 1만큼 이동했습니다. 자식은 그 부모의 +X로 2만큼 떨어져 있어 world 중심이 3입니다. helper는 붙인 부모의 변환을 따르므로 두 축의 원점도 다릅니다. 01의 world=(2, 0, 0)과 다른 이유는 부모 위치가 달라졌기 때문입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>축과 물체 원점</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ 평면: pivot (1,0) → +X offset 2 → body (3,0)
부모 +Y 회전 π/2: offset +X → -Z, body (1,-2)</pre>
    <p>+X 빨강 / +Y 초록 / +Z 파랑. 각도는 radian: π/2 ≈ 1.5708rad = 90°.</p>
    <div class="controls">
      <label
        >pivot Y (rad)
        <input id="pivotAngle" type="number" step="any" required /></label
      ><label
        >body local Y (rad)
        <input id="bodyAngle" type="number" step="any" required /></label
      ><button id="apply">적용</button><button id="reset">기준 복원</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="축과 회전 중심 관찰"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const pivotAngle = 0;
      const bodyAngle = 0;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      pivot.rotation.y = pivotAngle;
      body.rotation.y = bodyAngle;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 표시 크기가 0이면 기다리고, 보이면 크기와 투영을 함께 갱신합니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('pivotAngle').value = String(pivot.rotation.y);
        input('bodyAngle').value = String(body.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = '유한한 숫자를 입력하세요.'; return;
          }
        }
        error.textContent = '';
        pivot.rotation.y = Number(input('pivotAngle').value);
        body.rotation.y = Number(input('bodyAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        pivot.rotation.y = pivotAngle;
        body.rotation.y = bodyAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- local이 2인데 world가 3인 이유는 무엇인가요?
- AxesHelper를 scene과 pivot에 붙이는 것은 어떻게 다른가요?

### 자기 원점에서 자전하기

이 시작 예제는 앞 단계의 같은 트리를 포함하고 pivot.rotation.y=0으로 고정합니다. body.position=(2, 0, 0)을 유지한 채 body.rotation.y만 0에서 Math.PI / 2로 바꿉니다. 입력은 radian이며 숫자 90을 그대로 대입하지 않습니다.

실행 전에 body의 방향과 body 원점의 world 위치 중 무엇이 변할지 적습니다. 직육면체의 긴 방향과 축을 비교하고 getWorldPosition 출력도 확인하세요. 물체가 돌았다는 화면 관찰과 중심이 이동했다는 관찰은 구별합니다.

소스에서는 const bodyAngle = 0을 찾아 Math.PI / 2로 바꾸세요. body.rotation.y 대입문이 이 상수를 사용하며 입력과 기준 복원도 같은 소스 기준을 따릅니다. body local Y 입력과 적용 버튼으로도 비교할 수 있습니다.

**예상 결과**

body 방향은 바뀌지만 local=(2, 0, 0), world=(3, 0, 0)은 그대로입니다. pivot 각도는 0입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>자기 원점에서 자전하기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ 평면: pivot (1,0) → +X offset 2 → body (3,0)
부모 +Y 회전 π/2: offset +X → -Z, body (1,-2)</pre>
    <p>+X 빨강 / +Y 초록 / +Z 파랑. 각도는 radian: π/2 ≈ 1.5708rad = 90°.</p>
    <div class="controls">
      <label
        >pivot Y (rad)
        <input id="pivotAngle" type="number" step="any" required /></label
      ><label
        >body local Y (rad)
        <input id="bodyAngle" type="number" step="any" required /></label
      ><button id="apply">적용</button><button id="reset">기준 복원</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="축과 회전 중심 관찰"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const pivotAngle = 0;
      const bodyAngle = 0;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      pivot.rotation.y = pivotAngle;
      body.rotation.y = bodyAngle;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 표시 크기가 0이면 기다리고, 보이면 크기와 투영을 함께 갱신합니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('pivotAngle').value = String(pivot.rotation.y);
        input('bodyAngle').value = String(body.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = '유한한 숫자를 입력하세요.'; return;
          }
        }
        error.textContent = '';
        pivot.rotation.y = Number(input('pivotAngle').value);
        body.rotation.y = Number(input('bodyAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        pivot.rotation.y = pivotAngle;
        body.rotation.y = bodyAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- output에서 body 각도와 pivot 각도를 따로 읽으세요.
- body.position이 아닌 body.rotation.y를 바꾸고 있는지 확인하세요.
- pivot.rotation.y = 0; body.rotation.y = Math.PI / 2;로 비교하면 body world 원점은 (3, 0, 0)에 남습니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

body.rotation은 body의 local 원점 주위 자세를 바꿉니다. body의 부모 기준 위치는 여전히 (2, 0, 0)이므로 world 원점은 (3, 0, 0)에 머뭅니다. geometry는 바뀌지 않습니다. 정육면체 대신 직육면체를 쓴 이유는 90° 뒤의 방향 차이를 쉽게 보기 위해서입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>자기 원점에서 자전하기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ 평면: pivot (1,0) → +X offset 2 → body (3,0)
부모 +Y 회전 π/2: offset +X → -Z, body (1,-2)</pre>
    <p>+X 빨강 / +Y 초록 / +Z 파랑. 각도는 radian: π/2 ≈ 1.5708rad = 90°.</p>
    <div class="controls">
      <label
        >pivot Y (rad)
        <input id="pivotAngle" type="number" step="any" required /></label
      ><label
        >body local Y (rad)
        <input id="bodyAngle" type="number" step="any" required /></label
      ><button id="apply">적용</button><button id="reset">기준 복원</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="축과 회전 중심 관찰"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const pivotAngle = 0;
      const bodyAngle = Math.PI / 2;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      pivot.rotation.y = pivotAngle;
      body.rotation.y = bodyAngle;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 표시 크기가 0이면 기다리고, 보이면 크기와 투영을 함께 갱신합니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('pivotAngle').value = String(pivot.rotation.y);
        input('bodyAngle').value = String(body.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = '유한한 숫자를 입력하세요.'; return;
          }
        }
        error.textContent = '';
        pivot.rotation.y = Number(input('pivotAngle').value);
        body.rotation.y = Number(input('bodyAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        pivot.rotation.y = pivotAngle;
        body.rotation.y = bodyAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- 물체가 회전했는데 원점 위치는 왜 그대로인가요?
- 90을 그대로 대입하면 왜 90°가 아닌가요?

### 부모 원점 주위로 공전하기

이 독립 예제는 body.rotation=0을 복원합니다. pivot.position=(1, 0, 0), body.position=(2, 0, 0)은 유지하고 pivot.rotation.y만 0에서 Math.PI / 2로 바꿉니다. 바꾸기 전에 local/world 위치를 각각 예상하세요.

부모 기준 +X로 2 떨어진 offset 방향이 부모와 함께 돌아갑니다. +Y축 양의 90° 회전은 +X를 -Z로 돌립니다. 따라서 body 원점은 부모 원점 (1, 0, 0)에서 -Z로 2 떨어진 (1, 0, -2)가 됩니다. getWorldPosition 출력과 XZ 도식을 비교합니다.

소스에서는 const pivotAngle = 0을 Math.PI / 2로 바꾸세요. pivot.rotation.y 대입문과 초기 입력, 기준 복원이 같은 소스 기준을 사용합니다. pivot Y 입력으로도 실험할 수 있습니다.

**예상 결과**

pivot.rotation.y=0이면 body world=(3, 0, 0), Math.PI / 2이면 world≈(1, 0, -2)입니다. body local=(2, 0, 0)은 고정입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>부모 원점 주위로 공전하기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ 평면: pivot (1,0) → +X offset 2 → body (3,0)
부모 +Y 회전 π/2: offset +X → -Z, body (1,-2)</pre>
    <p>+X 빨강 / +Y 초록 / +Z 파랑. 각도는 radian: π/2 ≈ 1.5708rad = 90°.</p>
    <div class="controls">
      <label
        >pivot Y (rad)
        <input id="pivotAngle" type="number" step="any" required /></label
      ><label
        >body local Y (rad)
        <input id="bodyAngle" type="number" step="any" required /></label
      ><button id="apply">적용</button><button id="reset">기준 복원</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="축과 회전 중심 관찰"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const pivotAngle = 0;
      const bodyAngle = 0;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      pivot.rotation.y = pivotAngle;
      body.rotation.y = bodyAngle;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 표시 크기가 0이면 기다리고, 보이면 크기와 투영을 함께 갱신합니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('pivotAngle').value = String(pivot.rotation.y);
        input('bodyAngle').value = String(body.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = '유한한 숫자를 입력하세요.'; return;
          }
        }
        error.textContent = '';
        pivot.rotation.y = Number(input('pivotAngle').value);
        body.rotation.y = Number(input('bodyAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        pivot.rotation.y = pivotAngle;
        body.rotation.y = bodyAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 회전시키는 객체가 body인지 pivot인지 먼저 확인하세요.
- body.position.x가 0이 아닌 2인지 확인하세요.
- body.rotation.y = 0; pivot.rotation.y = Math.PI / 2;로 바꾸면 local=(2, 0, 0), world=(1, 0, -2)가 됩니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

child offset이 0이면 부모를 돌려도 공전 반지름이 없습니다. 부모의 rotation을 바꿔야 offset 방향이 변합니다. body.rotation만 바꾸면 앞 단계의 자전입니다. 부모 회전은 물체 방향도 함께 돌리므로 이 운동이 ‘위치만 원을 그리고 world 방향은 고정’된 것이라고 설명하지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>부모 원점 주위로 공전하기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ 평면: pivot (1,0) → +X offset 2 → body (3,0)
부모 +Y 회전 π/2: offset +X → -Z, body (1,-2)</pre>
    <p>+X 빨강 / +Y 초록 / +Z 파랑. 각도는 radian: π/2 ≈ 1.5708rad = 90°.</p>
    <div class="controls">
      <label
        >pivot Y (rad)
        <input id="pivotAngle" type="number" step="any" required /></label
      ><label
        >body local Y (rad)
        <input id="bodyAngle" type="number" step="any" required /></label
      ><button id="apply">적용</button><button id="reset">기준 복원</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="축과 회전 중심 관찰"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const pivotAngle = Math.PI / 2;
      const bodyAngle = 0;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      pivot.rotation.y = pivotAngle;
      body.rotation.y = bodyAngle;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 표시 크기가 0이면 기다리고, 보이면 크기와 투영을 함께 갱신합니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('pivotAngle').value = String(pivot.rotation.y);
        input('bodyAngle').value = String(body.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = '유한한 숫자를 입력하세요.'; return;
          }
        }
        error.textContent = '';
        pivot.rotation.y = Number(input('pivotAngle').value);
        body.rotation.y = Number(input('bodyAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        pivot.rotation.y = pivotAngle;
        body.rotation.y = bodyAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- offset이 0이면 왜 공전 경로가 사라지나요?
- 부모 회전은 body의 위치만 바꾸나요?

### 자전과 공전을 함께 만들기

이 시작 예제는 같은 부모·자식 구조와 시간 기반 renderFrame을 갖추고 orbitSpeed=0, spinSpeed=0으로 정지해 있습니다. seconds는 첫 timestamp부터 지난 초입니다. pivot.rotation.y = seconds * orbitSpeed, body.rotation.y = seconds * spinSpeed 두 줄을 구별하세요.

orbitSpeed만 .5로 바꾸어 관찰한 다음 0으로 복원하고 spinSpeed만 1로 바꿉니다. 마지막으로 둘 다 활성화합니다. 약 2초일 때 부모 각도와 자식 local 각도를 예상하고 output과 비교하세요. 두 speed 단위는 rad/s입니다.

적용 버튼은 현재 속도로 시간을 0부터 다시 셉니다. 기준 복원은 소스에 쓴 속도로 되돌립니다. renderFrame은 첫 timestamp를 startTime에 저장하고 지난 밀리초를 1000으로 나눕니다. undefined는 아직 timestamp를 저장하지 않은 상태입니다.

**예상 결과**

부모만 돌리면 공전, body만 돌리면 자전입니다. 둘을 켜면 동시에 움직입니다. 약 2초에 pivot≈1rad, body local≈2rad이며 output 시간과 함께 비교합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>자전과 공전을 함께 만들기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ 평면: pivot (1,0) → +X offset 2 → body (3,0)
부모 +Y 회전 π/2: offset +X → -Z, body (1,-2)</pre>
    <p>+X 빨강 / +Y 초록 / +Z 파랑. 각도는 radian: π/2 ≈ 1.5708rad = 90°.</p>
    <div class="controls">
      <label
        >orbitSpeed (rad/s)
        <input id="orbitSpeed" type="number" step="any" required /></label
      ><label
        >spinSpeed (rad/s)
        <input id="spinSpeed" type="number" step="any" required /></label
      ><button id="apply">적용</button><button id="reset">기준 복원</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="축과 회전 중심 관찰"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      let orbitSpeed = 0;
      let spinSpeed = 0;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));

      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const baselineOrbitSpeed = orbitSpeed, baselineSpinSpeed = spinSpeed;
      let startTime;
      let seconds = 0;
      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)

          + '\nseconds: ' + seconds.toFixed(3) + ' / orbitSpeed: ' + orbitSpeed + ' rad/s / spinSpeed: ' + spinSpeed + ' rad/s'
          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 표시 크기가 0이면 기다리고, 보이면 크기와 투영을 함께 갱신합니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('orbitSpeed').value = String(orbitSpeed);
        input('spinSpeed').value = String(spinSpeed);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = '유한한 숫자를 입력하세요.'; return;
          }
        }
        error.textContent = '';
        orbitSpeed = Number(input('orbitSpeed').value);
        spinSpeed = Number(input('spinSpeed').value);
        startTime = undefined;
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        orbitSpeed = baselineOrbitSpeed; spinSpeed = baselineSpinSpeed; startTime = undefined; seconds = 0; pivot.rotation.y = 0; body.rotation.y = 0;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();
      function renderFrame(timestamp) {
        if (startTime === undefined) startTime = timestamp;
        seconds = (timestamp - startTime) / 1000;
        pivot.rotation.y = seconds * orbitSpeed;
        body.rotation.y = seconds * spinSpeed;
        draw();
      }
      renderer.setAnimationLoop(renderFrame);
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 두 speed를 하나씩 켜서 어느 객체의 운동인지 분리하세요.
- seconds가 ms가 아닌 초인지 확인하세요.
- pivot.rotation.y = seconds * .5; body.rotation.y = seconds * 1; 뒤에 renderer.render(scene, camera)를 호출하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

orbitSpeed=.5와 spinSpeed=1이면 2초 근처의 부모 각도는 약 1rad, body local 각도는 약 2rad입니다. body local 각도가 world 자세 전체를 나타내는 것은 아닙니다. 부모 회전까지 적용되기 때문입니다. 이 같은 Y축 예제의 단순 합을 모든 축 조합에 일반화하지 마세요. 새로운 Mesh를 매 프레임 만들지 않고 기존 객체 두 개의 rotation만 갱신합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>자전과 공전을 함께 만들기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ 평면: pivot (1,0) → +X offset 2 → body (3,0)
부모 +Y 회전 π/2: offset +X → -Z, body (1,-2)</pre>
    <p>+X 빨강 / +Y 초록 / +Z 파랑. 각도는 radian: π/2 ≈ 1.5708rad = 90°.</p>
    <div class="controls">
      <label
        >orbitSpeed (rad/s)
        <input id="orbitSpeed" type="number" step="any" required /></label
      ><label
        >spinSpeed (rad/s)
        <input id="spinSpeed" type="number" step="any" required /></label
      ><button id="apply">적용</button><button id="reset">기준 복원</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="축과 회전 중심 관찰"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      let orbitSpeed = 0.5;
      let spinSpeed = 1;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));

      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const baselineOrbitSpeed = orbitSpeed, baselineSpinSpeed = spinSpeed;
      let startTime;
      let seconds = 0;
      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)

          + '\nseconds: ' + seconds.toFixed(3) + ' / orbitSpeed: ' + orbitSpeed + ' rad/s / spinSpeed: ' + spinSpeed + ' rad/s'
          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 표시 크기가 0이면 기다리고, 보이면 크기와 투영을 함께 갱신합니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('orbitSpeed').value = String(orbitSpeed);
        input('spinSpeed').value = String(spinSpeed);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = '유한한 숫자를 입력하세요.'; return;
          }
        }
        error.textContent = '';
        orbitSpeed = Number(input('orbitSpeed').value);
        spinSpeed = Number(input('spinSpeed').value);
        startTime = undefined;
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        orbitSpeed = baselineOrbitSpeed; spinSpeed = baselineSpinSpeed; startTime = undefined; seconds = 0; pivot.rotation.y = 0; body.rotation.y = 0;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();
      function renderFrame(timestamp) {
        if (startTime === undefined) startTime = timestamp;
        seconds = (timestamp - startTime) / 1000;
        pivot.rotation.y = seconds * orbitSpeed;
        body.rotation.y = seconds * spinSpeed;
        draw();
      }
      renderer.setAnimationLoop(renderFrame);
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- body.rotation.y만 읽어 world 자세를 모두 알 수 있나요?
- 같은 Y축에서의 단순 합을 모든 축 조합에 적용해도 되나요?

### 문 가장자리에 경첩 만들기

이 단계는 별도 문 예제입니다. BoxGeometry(2, 3, .15)는 폭 2의 중심이 원점에 있습니다. 시작 상태는 hinge.position.x=0, door.position.x=0이며 hinge.add(door), scene.add(hinge)로 연결합니다. 먼저 각도 0과 Math.PI / 2에서 중심 회전을 관찰합니다.

각도를 0으로 복원한 다음 hinge.position.x=-1, door.position.x=1을 함께 적용합니다. 부모를 왼쪽 경계로 옮기고 문 중심을 부모 기준 오른쪽으로 반폭 1만큼 돌려놓는 것입니다. 닫힌 문의 world 중심이 여전히 (0, 0, 0)인지 확인한 다음 hinge.rotation.y를 Math.PI / 2로 바꿉니다.

경첩 원점과 문 중심의 world 좌표를 output에서 읽고 경계가 고정되는지 봅니다. geometry 자체를 translate하거나 정점을 수정하지 않습니다. body 자전 예제와 달리 부모 원점을 물체 중심 밖에 두어 회전 기준을 바꾸었습니다.

소스에서는 const hingeX = -1과 const doorX = 1을 설정한 뒤 const hingeAngle을 0에서 Math.PI / 2로 바꾸세요. 이 상수들이 position/rotation 대입문과 입력값을 정합니다. hinge X, door local X, hinge Y 입력을 바꾸고 적용해도 됩니다. 기준 복원은 현재 소스에 쓴 상수로 되돌립니다.

**예상 결과**

경첩 설정 뒤 각도 0에서 문 중심 world=(0, 0, 0)입니다. Math.PI / 2에서 중심은≈(-1, 0, -1), 경첩은 (-1, 0, 0)으로 고정됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>문 가장자리에 경첩 만들기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → hinge Group → door Mesh
닫힌 문 폭 2: 경계 -1 ─ 중심 0 ─ 경계 +1
경첩 -1 + door offset +1 = 닫힌 중심 0</pre>
    <p>+X 빨강 / +Y 초록 / +Z 파랑. 각도는 radian: π/2 ≈ 1.5708rad = 90°.</p>
    <div class="controls">
      <label
        >hinge X (scene)
        <input id="hingeX" type="number" step="any" required /></label
      ><label
        >door local X (scene)
        <input id="doorX" type="number" step="any" required /></label
      ><label
        >hinge Y (rad)
        <input id="hingeAngle" type="number" step="any" required /></label
      ><button id="apply">적용</button><button id="reset">기준 복원</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="축과 회전 중심 관찰"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const hingeX = 0;
      const doorX = 0;
      const hingeAngle = 0;
      const hinge = new THREE.Group();
      const door = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.15), material);
      hinge.add(door);
      scene.add(hinge);
      hinge.position.x = hingeX;
      door.position.x = doorX;
      hinge.rotation.y = hingeAngle;
      hinge.add(new THREE.AxesHelper(1));
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        door.getWorldPosition(world);
        hinge.getWorldPosition(parentWorld);
        output.textContent = 'hinge world: ' + coords(parentWorld)
          + '\ndoor local: ' + coords(door.position) + ' / world: ' + coords(world)
          + '\nhinge Y (rad): ' + hinge.rotation.y.toFixed(4)
          + ' / door local Y (rad): ' + door.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 표시 크기가 0이면 기다리고, 보이면 크기와 투영을 함께 갱신합니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('hingeX').value = String(hinge.position.x);
        input('doorX').value = String(door.position.x);
        input('hingeAngle').value = String(hinge.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = '유한한 숫자를 입력하세요.'; return;
          }
        }
        error.textContent = '';
        hinge.position.x = Number(input('hingeX').value);
        door.position.x = Number(input('doorX').value);
        hinge.rotation.y = Number(input('hingeAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        hinge.position.x = hingeX;
        door.position.x = doorX;
        hinge.rotation.y = hingeAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 문 폭 2의 절반이 1이고 왼쪽 경계가 -1인지 확인하세요.
- hinge=-1과 door=+1 두 offset을 모두 바꿨는지 확인하세요.
- hinge.position.x = -1; door.position.x = 1; hinge.rotation.y = Math.PI / 2;로 비교하세요. geometry를 바꾸지는 않습니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

닫힌 중심은 -1+1=0입니다. 90°에서 문 중심은 (-1, 0, -1)이 되고 경첩 원점 (-1, 0, 0)은 그대로입니다. hinge만 -1로 옮기고 door offset을 0으로 남기면 닫힌 위치부터 달라집니다. 문 폭이 4라면 같은 원리로 hinge=-2, door=+2입니다. 완료할 때 자전·공전의 두 world 수치와 문 경계 고정 결과를 필기에 남기세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>문 가장자리에 경첩 만들기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → hinge Group → door Mesh
닫힌 문 폭 2: 경계 -1 ─ 중심 0 ─ 경계 +1
경첩 -1 + door offset +1 = 닫힌 중심 0</pre>
    <p>+X 빨강 / +Y 초록 / +Z 파랑. 각도는 radian: π/2 ≈ 1.5708rad = 90°.</p>
    <div class="controls">
      <label
        >hinge X (scene)
        <input id="hingeX" type="number" step="any" required /></label
      ><label
        >door local X (scene)
        <input id="doorX" type="number" step="any" required /></label
      ><label
        >hinge Y (rad)
        <input id="hingeAngle" type="number" step="any" required /></label
      ><button id="apply">적용</button><button id="reset">기준 복원</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="축과 회전 중심 관찰"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const hingeX = -1;
      const doorX = 1;
      const hingeAngle = Math.PI / 2;
      const hinge = new THREE.Group();
      const door = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.15), material);
      hinge.add(door);
      scene.add(hinge);
      hinge.position.x = hingeX;
      door.position.x = doorX;
      hinge.rotation.y = hingeAngle;
      hinge.add(new THREE.AxesHelper(1));
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        door.getWorldPosition(world);
        hinge.getWorldPosition(parentWorld);
        output.textContent = 'hinge world: ' + coords(parentWorld)
          + '\ndoor local: ' + coords(door.position) + ' / world: ' + coords(world)
          + '\nhinge Y (rad): ' + hinge.rotation.y.toFixed(4)
          + ' / door local Y (rad): ' + door.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 표시 크기가 0이면 기다리고, 보이면 크기와 투영을 함께 갱신합니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('hingeX').value = String(hinge.position.x);
        input('doorX').value = String(door.position.x);
        input('hingeAngle').value = String(hinge.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = '유한한 숫자를 입력하세요.'; return;
          }
        }
        error.textContent = '';
        hinge.position.x = Number(input('hingeX').value);
        door.position.x = Number(input('doorX').value);
        hinge.rotation.y = Number(input('hingeAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        hinge.position.x = hingeX;
        door.position.x = doorX;
        hinge.rotation.y = hingeAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- 부모와 자식 offset을 왜 함께 바꾸나요?
- 문 폭이 4면 hinge와 door의 x는 어떻게 정하나요?
- geometry 정점과 Object3D transform은 같은 것인가요?

### 보충: 두 축 회전 순서

이 보충 시작 예제는 애니메이션과 부모 회전을 멈추고 방향을 구별할 직육면체와 축을 보여 줍니다. body.rotation.x=Math.PI / 4, body.rotation.y=Math.PI / 3, body.rotation.z=0으로 고정합니다. order의 기본값은 'XYZ'입니다.

세 각도는 그대로 둔 채 body.rotation.order만 'XYZ'에서 'YXZ'로 바꿉니다. 두 자세를 비교하고 같은 세 숫자만으로 회전을 완전히 정할 수 없는 이유를 적습니다. Euler order는 intrinsic local 축의 회전 순서입니다. 항상 world X 다음 world Y를 돌린다고 설명하지 않습니다.

소스에서는 const eulerOrder = 'XYZ'를 'YXZ'로 바꾸세요. Euler order를 선택하고 적용해도 됩니다. 세 각도는 고정합니다.

**예상 결과**

x=Math.PI / 4, y=Math.PI / 3, z=0은 같아도 order가 XYZ와 YXZ일 때 자세가 달라집니다. 이 보충 실험은 첫 네 단원의 필수 완료 조건에 quaternion 구현을 추가하지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>보충: 두 축 회전 순서</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ 평면: pivot (1,0) → +X offset 2 → body (3,0)
부모 +Y 회전 π/2: offset +X → -Z, body (1,-2)</pre>
    <p>+X 빨강 / +Y 초록 / +Z 파랑. 각도는 radian: π/2 ≈ 1.5708rad = 90°.</p>
    <div class="controls">
      <label
        >Euler order
        <select id="order">
          <option>XYZ</option>
          <option>YXZ</option>
        </select></label
      ><button id="apply">적용</button><button id="reset">기준 복원</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="축과 회전 중심 관찰"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const eulerOrder = 'XYZ';
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      body.rotation.x = Math.PI / 4;
      body.rotation.y = Math.PI / 3;
      body.rotation.z = 0;
      body.rotation.order = eulerOrder;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)
          + '\nbody local X/Z (rad): ' + body.rotation.x.toFixed(4) + ' / ' + body.rotation.z.toFixed(4) + ' / order: ' + body.rotation.order

          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 표시 크기가 0이면 기다리고, 보이면 크기와 투영을 함께 갱신합니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('order').value = body.rotation.order;
      }
      function applySettings() {
        error.textContent = '';
        body.rotation.order = input('order').value;
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        body.rotation.order = eulerOrder;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 부모 회전과 애니메이션이 0인지 먼저 확인하세요.
- 세 각도를 유지하고 order 하나만 바꾸세요.
- body.rotation.order = 'YXZ'로 바꾼 뒤 render하세요. intrinsic local 축 순서의 차이를 관찰합니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

여러 축 회전은 순서에 따라 결과가 달라집니다. order를 바꾸는 이 실험은 이전 world 자세를 보존하는 작업이 아닙니다. quaternion으로 바꾸거나 gimbal lock 해법을 구현할 필요는 없습니다. ‘회전 뒤 translate는 어느 축인가’라는 질문은 이번에 쓰는 position.x가 부모 축 기준이라는 범위에서 답하세요. 별도 local 이동 메서드 translateX를 배우지 않았다면 두 API를 섞지 않습니다.

다음에는 geometry 정점·법선·공유 자원을 배우고 조명·재질·텍스처, 모델·선택, 애니메이션·성능·정리로 이어집니다. 05~28 로드맵의 후속 단원은 자체 완결 실습 개선 예정이며 이미 개편 완료된 것은 아닙니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>보충: 두 축 회전 순서</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ 평면: pivot (1,0) → +X offset 2 → body (3,0)
부모 +Y 회전 π/2: offset +X → -Z, body (1,-2)</pre>
    <p>+X 빨강 / +Y 초록 / +Z 파랑. 각도는 radian: π/2 ≈ 1.5708rad = 90°.</p>
    <div class="controls">
      <label
        >Euler order
        <select id="order">
          <option>XYZ</option>
          <option>YXZ</option>
        </select></label
      ><button id="apply">적용</button><button id="reset">기준 복원</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="축과 회전 중심 관찰"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const eulerOrder = 'YXZ';
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      body.rotation.x = Math.PI / 4;
      body.rotation.y = Math.PI / 3;
      body.rotation.z = 0;
      body.rotation.order = eulerOrder;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)
          + '\nbody local X/Z (rad): ' + body.rotation.x.toFixed(4) + ' / ' + body.rotation.z.toFixed(4) + ' / order: ' + body.rotation.order

          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 표시 크기가 0이면 기다리고, 보이면 크기와 투영을 함께 갱신합니다.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('order').value = body.rotation.order;
      }
      function applySettings() {
        error.textContent = '';
        body.rotation.order = input('order').value;
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        body.rotation.order = eulerOrder;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- 같은 x/y/z 값이라도 order가 필요할 수 있는 이유는 무엇인가요?
- order 변경은 이전 world 자세를 보존하는 동작인가요?

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

### API · THREE.Group

자식들의 변환을 묶는 Object3D 계열 생성자입니다. 자체 도형은 없습니다.

새 Group을 반환합니다. position/rotation/add는 Object3D 계약을 따릅니다.

- Group을 추가했다고 눈에 보이는 geometry가 생기지는 않습니다.

```js
const parent = new THREE.Group();
parent.add(child);
scene.add(parent);
```

[THREE.Group](https://threejs.org/docs/pages/Group.html) · three@0.186.1 · 2026-10-26

### API · THREE.Vector3

세 성분 x/y/z를 보관하는 객체 생성자입니다. 위치 결과를 저장할 때 사용합니다.

- `x: number` — X 성분입니다. (0)
- `y: number` — Y 성분입니다. (0)
- `z: number` — Z 성분입니다. (0)

새 Vector3를 반환합니다.

- Vector3라는 타입만으로 local/world가 정해지지 않습니다. 값의 의미는 작성한 코드가 정합니다.

```js
const world = new THREE.Vector3();
```

[THREE.Vector3](https://threejs.org/docs/pages/Vector3.html) · three@0.186.1 · 2026-10-26

### API · object.getWorldPosition

현재 부모 변환을 반영한 world 위치를 읽는 메서드입니다.

- `target: Vector3` — 결과를 써 넣을 객체이며 생략할 수 없습니다.

target을 변경하고 같은 target을 반환합니다. object.position은 바꾸지 않습니다.

- 0.186.1에서는 필요한 부모 world 행렬을 메서드 안에서 갱신합니다. 직접 행렬 곱셈은 필요 없습니다.

```js
const world = new THREE.Vector3();
child.getWorldPosition(world);
```

[object.getWorldPosition](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

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

### API · THREE.AxesHelper

local 양의 X/Y/Z축을 선으로 그리는 생성자입니다.

- `size: number` — 각 축 선의 길이, scene 거리 단위입니다. (1)

새 helper를 반환합니다. X=빨강, Y=초록, Z=파랑입니다.

- scene에 붙이면 world 축, pivot에 붙이면 pivot 변환을 따릅니다. 색 외 텍스트 이름도 함께 읽습니다.

```js
scene.add(new THREE.AxesHelper(3));
pivot.add(new THREE.AxesHelper(1));
```

[THREE.AxesHelper](https://threejs.org/docs/pages/AxesHelper.html) · three@0.186.1 · 2026-10-26

### API · rotation.order

Euler의 intrinsic local 축 회전 순서를 정하는 문자열 멤버입니다. 기본값은 XYZ입니다.

같은 x/y/z 숫자라도 order 변경으로 자세가 달라질 수 있습니다.

- world X 다음 world Y라고 설명하지 않습니다.
- 이 보충 실험은 기존 world 자세 보존이나 quaternion 변환을 구현하지 않습니다.

```js
body.rotation.x = Math.PI / 4;
body.rotation.y = Math.PI / 3;
body.rotation.z = 0;
body.rotation.order = 'YXZ';
```

[rotation.order](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

## 다음 학습

[이전: 원근과 직교 투영](../03/README.md) · [다음: 버퍼 지오메트리](../05/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

## Three.js 전체 28개 단원 로드맵

01~28은 사이트 안의 필수 실습 검증과 단원별 내용 검토를 마쳤습니다. 이 구현 상태는 나의 학습 진도와 별개이며 운영 배포 상태를 뜻하지 않습니다.

28개 단원 모두 한국어·영어의 독립 HTML 실습과 단계별 예제를 제공합니다. 구현 상태 `verified`는 단원별 실행·내용 검토를 마쳤다는 뜻이며 사용자의 학습 완료와는 별개입니다. Chromium/SwiftShader 검증은 실제 기기·모든 GPU의 동작이나 실제 학습자 평가를 보장하지 않습니다.

### [01. 장면 그래프와 카메라](../../01-foundations/README.md) · 실습 검증 완료

ID: `threejs-01`

배울 내용: canvas · 첫 장면 · Scene·Camera·Renderer·Mesh · 애니메이션 · local/world 기초

선수 단원: 없음

완료 과제: HTML 문서에서 첫 장면을 만들고 부모 회전과 자식 좌표를 설명

필요한 실습 기능: 단일 HTML·inline CSS·module JavaScript · Three.js·OrbitControls · 정렬·콘솔·저장

### [02. 렌더러와 화면 크기](../02/README.md) · 실습 검증 완료

ID: `threejs-step-02`

배울 내용: CSS 크기와 버퍼 크기 · aspect · DPR

선수 단원: [01](../../01-foundations/README.md)

완료 과제: 화면 크기가 달라져도 도형 비율을 유지

필요한 실습 기능: 단일 HTML·inline CSS·module JavaScript · Three.js·OrbitControls · 정렬·콘솔·저장

### [03. 원근과 직교 투영](../03/README.md) · 실습 검증 완료

ID: `threejs-step-03`

배울 내용: 카메라 거리 · FOV · near/far · OrbitControls

선수 단원: [01](../../01-foundations/README.md) · [02](../02/README.md)

완료 과제: 투영 차이와 물체가 보이지 않는 원인을 구별

필요한 실습 기능: 단일 HTML·inline CSS·module JavaScript · Three.js·OrbitControls · 정렬·콘솔·저장

### [04. 회전과 피벗](README.md) · 실습 검증 완료

ID: `threejs-step-04`

배울 내용: 좌표계 · 회전 중심 · 부모·자식 변환

선수 단원: [01](../../01-foundations/README.md) · [02](../02/README.md) · [03](../03/README.md)

완료 과제: 자전과 공전을 만들고 위치 변화를 예측

필요한 실습 기능: 단일 HTML·inline CSS·module JavaScript · Three.js·OrbitControls · 정렬·콘솔·저장

### [05. 버퍼 지오메트리](../05/README.md) · 실습 검증 완료

ID: `threejs-step-05`

배울 내용: 정점·삼각형·인덱스·attribute

선수 단원: [01](../../01-foundations/README.md) · [04](README.md)

완료 과제: 직접 만든 삼각형의 정점 수와 인덱스를 설명하고 범위 오류 수정

필요한 실습 기능: 숫자 배열 편집·오류 출력

### [06. 법선과 표면 방향](../06/README.md) · 실습 검증 완료

ID: `threejs-step-06`

배울 내용: 법선 · 면 방향 · 평면·부드러운 음영

선수 단원: [05](../05/README.md)

완료 과제: 법선 유무와 경계 처리의 차이를 비교

필요한 실습 기능: 고정 조명 예제와 표면 비교; 조명 상세는 08에서 학습

### [07. 공유 지오메트리와 복제](../07/README.md) · 실습 검증 완료

ID: `threejs-step-07`

배울 내용: geometry/material 공유와 clone

선수 단원: [05](../05/README.md) · [06](../06/README.md)

완료 과제: 한 물체의 변경이 다른 물체에 영향을 주는 조건 재현

필요한 실습 기능: 객체·자원 참조 출력

### [08. 조명 종류와 배치](../08/README.md) · 실습 검증 완료

ID: `threejs-step-08`

배울 내용: 환경광·방향광·점광원 · position·target

선수 단원: [01](../../01-foundations/README.md) · [04](README.md) · [06](../06/README.md)

완료 과제: 광원 위치와 target을 바꾸고 재질 반응 설명

필요한 실습 기능: 광원별 HTML 조작 입력

### [09. 거칠기와 금속성](../09/README.md) · 실습 검증 완료

ID: `threejs-step-09`

배울 내용: PBR 기초 · roughness·metalness

선수 단원: [07](../07/README.md) · [08](../08/README.md)

완료 과제: 같은 조명에서 두 변수를 따로 바꿔 비교

필요한 실습 기능: 고정 조명·환경 조건의 비교 예제

### [10. 텍스처와 UV](../10/README.md) · 실습 검증 완료

ID: `threejs-step-10`

배울 내용: UV · 이미지·수치 텍스처 · repeat·wrap · 로딩 실패

선수 단원: [05](../05/README.md) · [09](../09/README.md)

완료 과제: UV와 world 좌표를 구별하고 잘못된 자산 입력 복구

필요한 실습 기능: 샘플 이미지·로컬 파일 선택·TextureLoader 지원·실패 fixture

### [11. 색 공간과 출력](../11/README.md) · 실습 검증 완료

ID: `threejs-step-11`

배울 내용: 색 맵과 데이터 맵 · 입력·작업·출력 색 공간

선수 단원: [09](../09/README.md) · [10](../10/README.md)

완료 과제: 색 이미지와 normal·roughness 데이터의 처리 차이 설명

필요한 실습 기능: 출처와 색 공간이 명시된 비교 자산

### [12. 그림자 지도](../12/README.md) · 실습 검증 완료

ID: `threejs-step-12`

배울 내용: caster·receiver · shadow camera · 해상도·비용

선수 단원: [03](../03/README.md) · [08](../08/README.md)

완료 과제: 그림자 잘림과 해상도 저하를 구별해 조정

필요한 실습 기능: 그림자 카메라 표시·설정 입력

### [13. 정규화 좌표와 선택](../13/README.md) · 실습 검증 완료

ID: `threejs-step-13`

배울 내용: canvas 기준 NDC · Raycaster · 교차 순서

선수 단원: [02](../02/README.md) · [03](../03/README.md) · [04](README.md)

완료 과제: 여백·크기 변경 후에도 가장 가까운 물체 선택

필요한 실습 기능: 포인터 위치와 교차 결과 출력

### [14. 재질·로딩·선택](../../02-experiments/README.md) · 실습 검증 완료

ID: `threejs-02`

배울 내용: glTF 로딩 상태 · 모델 선택 · 공유 재질 강조

선수 단원: [07](../07/README.md) · [09](../09/README.md) · [10](../10/README.md) · [13](../13/README.md)

완료 과제: 실패 후에도 UI를 유지하고 선택한 물체만 강조

필요한 실습 기능: GLTFLoader·샘플 GLB·로컬 파일·오류 fixture

### [15. 모델 크기와 카메라 맞춤](../15/README.md) · 실습 검증 완료

ID: `threejs-step-15`

배울 내용: Box3 · 모델 중심·크기 · FOV 기반 프레이밍

선수 단원: [03](../03/README.md) · [14](../../02-experiments/README.md)

완료 과제: 원점에서 먼 모델을 화면에 맞추고 빈 모델 처리

필요한 실습 기능: 다양한 크기·위치·빈 모델 fixture

### [16. 궤도 제어와 요구 렌더링](../16/README.md) · 실습 검증 완료

ID: `threejs-step-16`

배울 내용: target · damping · 입력 시 렌더링

선수 단원: [02](../02/README.md) · [03](../03/README.md) · [15](../15/README.md)

완료 과제: 정지 화면의 불필요한 렌더를 줄이되 조작 유지

필요한 실습 기능: 프레임 횟수·입력 상태 관찰

### [17. 클립 애니메이션](../17/README.md) · 실습 검증 완료

ID: `threejs-step-17`

배울 내용: clip·action·mixer · 초 단위 delta · 속도

선수 단원: [01](../../01-foundations/README.md) · [14](../../02-experiments/README.md) · [16](../16/README.md)

완료 과제: 클립 재생을 조작하고 클립 없는 모델도 처리

필요한 실습 기능: 애니메이션 포함·미포함 GLB와 재생 UI

### [18. 투명도와 깊이](../18/README.md) · 실습 검증 완료

ID: `threejs-step-18`

배울 내용: opacity · transparent · depthWrite · 정렬 한계

선수 단원: [03](../03/README.md) · [09](../09/README.md)

완료 과제: 교차 표면의 결과와 객체 정렬의 한계를 설명

필요한 실습 기능: 동일 장면·시점 비교와 관찰 기록

### [19. 인스턴싱 기초](../19/README.md) · 실습 검증 완료

ID: `threejs-step-19`

배울 내용: InstancedMesh · matrix · needsUpdate · draw call

선수 단원: [04](README.md) · [05](../05/README.md) · [07](../07/README.md)

완료 과제: 같은 배치를 개별 Mesh와 인스턴싱으로 비교

필요한 실습 기능: renderer.info의 해당 지표 설명·출력

### [20. 인스턴스 선택과 갱신](../20/README.md) · 실습 검증 완료

ID: `threejs-step-20`

배울 내용: instanceId · 색·위치 갱신 · 경계

선수 단원: [13](../13/README.md) · [19](../19/README.md)

완료 과제: 한 인스턴스를 바꾼 뒤 새 위치에서 선택

필요한 실습 기능: 인스턴스 ID·변환·경계 관찰

### [21. 화면 밖 객체와 상세도](../21/README.md) · 실습 검증 완료

ID: `threejs-step-21`

배울 내용: frustum culling · bounds · LOD

선수 단원: [03](../03/README.md) · [05](../05/README.md) · [20](../20/README.md)

완료 과제: 거리별 품질·비용을 비교하고 잘못된 컬링 수정

필요한 실습 기능: bounds·상세도 상태·삼각형 수 표시

### [22. 렌더 타깃과 미니맵](../22/README.md) · 실습 검증 완료

ID: `threejs-step-22`

배울 내용: offscreen render · texture · target 복원

선수 단원: [02](../02/README.md) · [03](../03/README.md) · [10](../10/README.md)

완료 과제: 메인 화면과 미니맵을 갱신하고 렌더 상태 복원

필요한 실습 기능: 두 카메라·render target 실습

### [23. 자원 소유권 장부](../23/README.md) · 실습 검증 완료

ID: `threejs-step-23`

배울 내용: remove와 dispose · 공유 자원 수명

선수 단원: [07](../07/README.md) · [10](../10/README.md) · [14](../../02-experiments/README.md) · [22](../22/README.md)

완료 과제: 자원 소유자를 기록하고 중복 해제 방지

필요한 실습 기능: 생성·정리 횟수와 소유 관계 관찰

### [24. 비동기 장면 교체](../24/README.md) · 실습 검증 완료

ID: `threejs-step-24`

배울 내용: 요청 순서·완료 순서 · stale 결과 · 정리

선수 단원: [14](../../02-experiments/README.md) · [17](../17/README.md) · [23](../23/README.md)

완료 과제: 늦은 모델이 새 장면을 덮지 않고 자원도 정리

필요한 실습 기능: 로컬 자산의 지연·실패·순서 역전 실험

### [25. HTML 제어와 접근성](../25/README.md) · 실습 검증 완료

ID: `threejs-step-25`

배울 내용: 객체 목록 · 키보드 조작 · 텍스트 상태 알림

선수 단원: [13](../13/README.md) · [14](../../02-experiments/README.md) · [16](../16/README.md)

완료 과제: 마우스 없이 선택·카메라 조작하고 오류 파악

필요한 실습 기능: 실제 HTML controls·키보드·상태 알림 · HTML 접근성 기초

### [26. 렌더 통계와 프로파일](../26/README.md) · 실습 검증 완료

ID: `threejs-step-26`

배울 내용: renderer.info 범위 · 다중 패스 · 측정 조건

선수 단원: [16](../16/README.md) · [19](../19/README.md) · [22](../22/README.md) · [23](../23/README.md)

완료 과제: 프레임 전체 통계를 비교하고 측정 한계 설명

필요한 실습 기능: 사이트 내 표·로그; 정확한 GPU 시간 측정을 필수로 요구하지 않음

### [27. 장면 검사기 통합](../27/README.md) · 실습 검증 완료

ID: `threejs-step-27`

배울 내용: 로딩·선택·카메라·애니메이션·오류·미니맵 통합

선수 단원: [14](../../02-experiments/README.md) · [15](../15/README.md) · [16](../16/README.md) · [17](../17/README.md) · [18](../18/README.md) · [19](../19/README.md) · [20](../20/README.md) · [21](../21/README.md) · [22](../22/README.md) · [23](../23/README.md) · [24](../24/README.md) · [25](../25/README.md) · [26](../26/README.md)

완료 과제: 실패 후에도 조작 가능한 검사기를 구성

필요한 실습 기능: 앞선 자산·조작·관찰 기능을 연결한 시작 프로젝트

### [28. 렌더링 자원과 측정](../../03-project/README.md) · 실습 검증 완료

ID: `threejs-03`

배울 내용: 병목 분리 · 품질 유지 · 반복 생성·종료

선수 단원: [19](../19/README.md) · [23](../23/README.md) · [24](../24/README.md) · [26](../26/README.md) · [27](../27/README.md)

완료 과제: 동일 조건의 성능·품질·자원 정리 보고서 작성

필요한 실습 기능: 반복 실행·통계 비교·필기·백업
