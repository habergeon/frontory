# Three.js · 08 조명 종류와 배치

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 조명·재질·모델 선택 · 편집 가능한 예제 · 저장 ID: `threejs-step-08`

## 목표와 학습 후 역량

- 강도 0→1에서 구가 밝아지고 특정 방향의 하이라이트는 생기지 않습니다.
- 광원 위치 (2,2,3)은 유지되고 target.x가 0→4로 바뀌며 방향 x 성분의 부호와 구의 밝은 쪽이 바뀝니다.
- 강도와 decay는 유지되고 z=4→2에서 앞면이 밝아집니다. distance는 0입니다.

## 선수 지식

앞선 도형·조명 개념을 복습하세요. 각 HTML 예제는 독립 실행됩니다.

## 핵심 개념과 설명

### 방향광

DirectionalLight는 일정 방향에서 오는 빛을 표현합니다. 위치뿐 아니라 target이 빛의 방향에 영향을 줍니다.

### 점광원

PointLight는 한 지점에서 여러 방향으로 빛을 냅니다. 물체와의 거리에 따른 변화도 관찰해야 합니다.

## 실습 준비

사이트에서 독립 HTML을 편집하고 실행합니다. three@0.186.1을 사이트가 공급하므로 설치나 외부 서버가 필요 없습니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 환경광의 균일한 밝기 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.
2. 방향광의 position과 target 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.
3. 점광원 거리와 밝기 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.

## 관찰할 변수

| 변수      | 기준 조건        | 바꿀 조건  | 예상할 변화·검증 가설                          |
| --------- | ---------------- | ---------- | ---------------------------------------------- |
| 광원 종류 | DirectionalLight | PointLight | 거리와 위치 변화에 대한 표면 반응이 달라집니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 강도 0→1에서 구가 밝아지고 특정 방향의 하이라이트는 생기지 않습니다.
- [ ] 광원 위치 (2,2,3)은 유지되고 target.x가 0→4로 바뀌며 방향 x 성분의 부호와 구의 밝은 쪽이 바뀝니다.
- [ ] 강도와 decay는 유지되고 z=4→2에서 앞면이 밝아집니다. distance는 0입니다.

## 자가 점검

1. MeshBasicMaterial은 왜 광원을 꺼도 보이나요?
2. 주변광만으로 형체가 평평해지는 이유는 무엇인가요?

## 공식 참고

- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)
- [Three.js Shadows](https://threejs.org/manual/pages/shadows.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-08/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-08/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

같은 구와 MeshLambertMaterial로 조명 세 종류를 비교합니다. MeshBasicMaterial은 이 조명에 반응하지 않습니다. 입력 하나씩 바꾸고 그림의 밝은 부분이 어디인지 기록하세요.

### 선수 단원

- `threejs-01`
- `threejs-step-04`
- `threejs-step-06`

### 환경광의 균일한 밝기

시작 예제는 AmbientLight 강도 0이라 검은 구가 보입니다. intensity=1로 바꾸고 같은 값을 HTML 입력으로도 적용하세요. 조명 position을 바꿔도 환경광에는 방향이 없어 음영의 방향이 생기지 않습니다.

**예상 결과**

강도 0→1에서 구가 밝아지고 특정 방향의 하이라이트는 생기지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>환경광의 균일한 밝기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>환경광의 균일한 밝기</h1>
    <div class="controls">
      <label
        >광원 값
        <input
          id="value"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value="0" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="환경광의 균일한 밝기"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
      camera.position.set(0, 0, 6);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTargets = new Set();
      const ownMesh = (mesh) => {
        ownedGeometry.add(mesh.geometry);
        ownedMaterial.add(mesh.material);
        return mesh;
      };
      const events = new AbortController();
      let disposed = false;
      const geometry = new THREE.SphereGeometry(1.1, 32, 20);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const intensity = 0;
      const light = new THREE.AmbientLight(0xffffff, intensity);
      scene.add(light);
      function report() {
        output.textContent =
          'AmbientLight 강도: ' +
          light.intensity +
          ' / 위치: ' +
          light.position.toArray() +
          ' / CSS: ' +
          stage.clientWidth +
          ' × ' +
          stage.clientHeight +
          ' / buffer: ' +
          canvas.width +
          ' × ' +
          canvas.height;
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 숨김 중에는 기다리고 표시되면 버퍼와 카메라를 맞춥니다.
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (
            !input.value.trim() ||
            !input.checkValidity() ||
            !Number.isFinite(Number(input.value))
          ) {
            error.textContent = '입력 범위를 확인하세요.';
            return;
          }
          error.textContent = '';
          light.intensity = Number(input.value);
          draw();
        },
        { signal: events.signal },
      );
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
      // 이 HTML이 소유한 자원과 이벤트를 한 번씩 정리합니다.
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        for (const target of ownedTargets) target.dispose();
        for (const geometry of ownedGeometry) geometry.dispose();
        for (const material of ownedMaterial) material.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      document
        .querySelector('#cleanup')
        .addEventListener('click', cleanup, { signal: events.signal });
      window.addEventListener('pagehide', cleanup, { once: true, signal: events.signal });
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- intensity 상수를 찾으세요.
- 강도 0과 1만 먼저 비교하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

환경광은 모든 방향에 같은 색과 강도를 더합니다. 재질의 파란색은 보이지만 구의 입체 굴곡은 방향광 때보다 읽기 어렵습니다. AmbientLight는 그림자를 만들지 않습니다. intensity는 음수가 아닌 값으로 제한했습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>환경광의 균일한 밝기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>환경광의 균일한 밝기</h1>
    <div class="controls">
      <label
        >광원 값
        <input
          id="value"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value="1" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="환경광의 균일한 밝기"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
      camera.position.set(0, 0, 6);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTargets = new Set();
      const ownMesh = (mesh) => {
        ownedGeometry.add(mesh.geometry);
        ownedMaterial.add(mesh.material);
        return mesh;
      };
      const events = new AbortController();
      let disposed = false;
      const geometry = new THREE.SphereGeometry(1.1, 32, 20);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const intensity = 1;
      const light = new THREE.AmbientLight(0xffffff, intensity);
      scene.add(light);
      function report() {
        output.textContent =
          'AmbientLight 강도: ' +
          light.intensity +
          ' / 위치: ' +
          light.position.toArray() +
          ' / CSS: ' +
          stage.clientWidth +
          ' × ' +
          stage.clientHeight +
          ' / buffer: ' +
          canvas.width +
          ' × ' +
          canvas.height;
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 숨김 중에는 기다리고 표시되면 버퍼와 카메라를 맞춥니다.
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (
            !input.value.trim() ||
            !input.checkValidity() ||
            !Number.isFinite(Number(input.value))
          ) {
            error.textContent = '입력 범위를 확인하세요.';
            return;
          }
          error.textContent = '';
          light.intensity = Number(input.value);
          draw();
        },
        { signal: events.signal },
      );
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
      // 이 HTML이 소유한 자원과 이벤트를 한 번씩 정리합니다.
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        for (const target of ownedTargets) target.dispose();
        for (const geometry of ownedGeometry) geometry.dispose();
        for (const material of ownedMaterial) material.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      document
        .querySelector('#cleanup')
        .addEventListener('click', cleanup, { signal: events.signal });
      window.addEventListener('pagehide', cleanup, { once: true, signal: events.signal });
    </script>
  </body>
</html>
```

</details>

- 환경광의 위치를 바꾸면 구의 밝은 쪽이 바뀌나요?

### 방향광의 position과 target

방향광은 (2,2,3)에서 target을 봅니다. targetX=0을 4로 바꿔 밝은 쪽의 이동을 확인하세요. 광원의 position은 그대로입니다. HTML 입력으로도 target.x를 바꿉니다. scene.add(light.target)이 있어야 target의 월드 변환이 갱신됩니다.

**예상 결과**

광원 위치 (2,2,3)은 유지되고 target.x가 0→4로 바뀌며 방향 x 성분의 부호와 구의 밝은 쪽이 바뀝니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>방향광의 position과 target</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>방향광의 position과 target</h1>
    <div class="controls">
      <label
        >광원 값
        <input
          id="value"
          type="number"
          min="-5"
          max="5"
          step="0.1"
          value="0" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="방향광의 position과 target"></canvas>
    </div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
      camera.position.set(0, 0, 6);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTargets = new Set();
      const ownMesh = (mesh) => {
        ownedGeometry.add(mesh.geometry);
        ownedMaterial.add(mesh.material);
        return mesh;
      };
      const events = new AbortController();
      let disposed = false;
      const geometry = new THREE.SphereGeometry(1.1, 32, 20);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 2, 3);
      const targetX = 0;
      light.target.position.x = targetX;
      scene.add(light, light.target);
      function report() {
        output.textContent =
          '위치: ' +
          light.position.toArray() +
          ' / 목표: ' +
          light.target.position.toArray() +
          ' / 방향: ' +
          new THREE.Vector3()
            .subVectors(light.target.position, light.position)
            .normalize()
            .toArray()
            .map((v) => v.toFixed(3)) +
          ' / CSS: ' +
          stage.clientWidth +
          ' × ' +
          stage.clientHeight +
          ' / buffer: ' +
          canvas.width +
          ' × ' +
          canvas.height;
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 숨김 중에는 기다리고 표시되면 버퍼와 카메라를 맞춥니다.
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (
            !input.value.trim() ||
            !input.checkValidity() ||
            !Number.isFinite(Number(input.value))
          ) {
            error.textContent = '입력 범위를 확인하세요.';
            return;
          }
          error.textContent = '';
          light.target.position.x = Number(input.value);
          draw();
        },
        { signal: events.signal },
      );
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
      // 이 HTML이 소유한 자원과 이벤트를 한 번씩 정리합니다.
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        for (const target of ownedTargets) target.dispose();
        for (const geometry of ownedGeometry) geometry.dispose();
        for (const material of ownedMaterial) material.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      document
        .querySelector('#cleanup')
        .addEventListener('click', cleanup, { signal: events.signal });
      window.addEventListener('pagehide', cleanup, { once: true, signal: events.signal });
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- light.position은 유지하세요.
- light.target.position.x만 바꾸세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

빛의 진행 방향은 target.position-light.position입니다. output은 그 벡터를 정규화해 읽습니다. 광원의 rotation은 이 방향을 정하지 않습니다. 이 실험에서는 target과 light 모두 Scene 바로 아래라 local/world 좌표가 같습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>방향광의 position과 target</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>방향광의 position과 target</h1>
    <div class="controls">
      <label
        >광원 값
        <input
          id="value"
          type="number"
          min="-5"
          max="5"
          step="0.1"
          value="4" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="방향광의 position과 target"></canvas>
    </div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
      camera.position.set(0, 0, 6);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTargets = new Set();
      const ownMesh = (mesh) => {
        ownedGeometry.add(mesh.geometry);
        ownedMaterial.add(mesh.material);
        return mesh;
      };
      const events = new AbortController();
      let disposed = false;
      const geometry = new THREE.SphereGeometry(1.1, 32, 20);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 2, 3);
      const targetX = 4;
      light.target.position.x = targetX;
      scene.add(light, light.target);
      function report() {
        output.textContent =
          '위치: ' +
          light.position.toArray() +
          ' / 목표: ' +
          light.target.position.toArray() +
          ' / 방향: ' +
          new THREE.Vector3()
            .subVectors(light.target.position, light.position)
            .normalize()
            .toArray()
            .map((v) => v.toFixed(3)) +
          ' / CSS: ' +
          stage.clientWidth +
          ' × ' +
          stage.clientHeight +
          ' / buffer: ' +
          canvas.width +
          ' × ' +
          canvas.height;
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 숨김 중에는 기다리고 표시되면 버퍼와 카메라를 맞춥니다.
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (
            !input.value.trim() ||
            !input.checkValidity() ||
            !Number.isFinite(Number(input.value))
          ) {
            error.textContent = '입력 범위를 확인하세요.';
            return;
          }
          error.textContent = '';
          light.target.position.x = Number(input.value);
          draw();
        },
        { signal: events.signal },
      );
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
      // 이 HTML이 소유한 자원과 이벤트를 한 번씩 정리합니다.
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        for (const target of ownedTargets) target.dispose();
        for (const geometry of ownedGeometry) geometry.dispose();
        for (const material of ownedMaterial) material.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      document
        .querySelector('#cleanup')
        .addEventListener('click', cleanup, { signal: events.signal });
      window.addEventListener('pagehide', cleanup, { once: true, signal: events.signal });
    </script>
  </body>
</html>
```

</details>

- rotation만 바꿔도 같은 결과가 나올까요?

### 점광원 거리와 밝기

PointLight의 강도 20, decay=2를 유지합니다. z=4를 2로 바꾸고 구 앞면이 밝아지는지 비교하세요. 입력은 1.5~8만 받아 광원이 구 안에 들어가지 않게 합니다. 위치가 밝기와 입사 방향을 함께 바꾸므로 환경광과 구별하세요.

**예상 결과**

강도와 decay는 유지되고 z=4→2에서 앞면이 밝아집니다. distance는 0입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>점광원 거리와 밝기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>점광원 거리와 밝기</h1>
    <div class="controls">
      <label
        >광원 값
        <input
          id="value"
          type="number"
          min="1.5"
          max="8"
          step="0.1"
          value="4" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="점광원 거리와 밝기"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
      camera.position.set(0, 0, 6);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTargets = new Set();
      const ownMesh = (mesh) => {
        ownedGeometry.add(mesh.geometry);
        ownedMaterial.add(mesh.material);
        return mesh;
      };
      const events = new AbortController();
      let disposed = false;
      const geometry = new THREE.SphereGeometry(1.1, 32, 20);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.PointLight(0xffffff, 20, 0, 2);
      const pointZ = 4;
      light.position.set(0, 0, pointZ);
      scene.add(light);
      function report() {
        output.textContent =
          'PointLight z: ' +
          light.position.z +
          ' / 강도: ' +
          light.intensity +
          ' / distance: ' +
          light.distance +
          ' / decay: ' +
          light.decay +
          ' / CSS: ' +
          stage.clientWidth +
          ' × ' +
          stage.clientHeight +
          ' / buffer: ' +
          canvas.width +
          ' × ' +
          canvas.height;
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 숨김 중에는 기다리고 표시되면 버퍼와 카메라를 맞춥니다.
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (
            !input.value.trim() ||
            !input.checkValidity() ||
            !Number.isFinite(Number(input.value))
          ) {
            error.textContent = '입력 범위를 확인하세요.';
            return;
          }
          error.textContent = '';
          light.position.z = Number(input.value);
          draw();
        },
        { signal: events.signal },
      );
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
      // 이 HTML이 소유한 자원과 이벤트를 한 번씩 정리합니다.
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        for (const target of ownedTargets) target.dispose();
        for (const geometry of ownedGeometry) geometry.dispose();
        for (const material of ownedMaterial) material.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      document
        .querySelector('#cleanup')
        .addEventListener('click', cleanup, { signal: events.signal });
      window.addEventListener('pagehide', cleanup, { once: true, signal: events.signal });
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- pointZ 상수를 찾으세요.
- intensity는 20을 유지하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

distance=0은 감쇠가 없다는 뜻이 아니라 최대 거리 제한이 없다는 뜻입니다. decay=2에서 거리가 멀수록 빛은 약해집니다. 재질, 구의 곡면, 출력 색 변환도 관측 픽셀에 영향을 주므로 z를 반으로 줄였다고 모든 픽셀이 정확히 네 배 밝아지지는 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>점광원 거리와 밝기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>점광원 거리와 밝기</h1>
    <div class="controls">
      <label
        >광원 값
        <input
          id="value"
          type="number"
          min="1.5"
          max="8"
          step="0.1"
          value="2" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="점광원 거리와 밝기"></canvas></div>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
      camera.position.set(0, 0, 6);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTargets = new Set();
      const ownMesh = (mesh) => {
        ownedGeometry.add(mesh.geometry);
        ownedMaterial.add(mesh.material);
        return mesh;
      };
      const events = new AbortController();
      let disposed = false;
      const geometry = new THREE.SphereGeometry(1.1, 32, 20);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.PointLight(0xffffff, 20, 0, 2);
      const pointZ = 2;
      light.position.set(0, 0, pointZ);
      scene.add(light);
      function report() {
        output.textContent =
          'PointLight z: ' +
          light.position.z +
          ' / 강도: ' +
          light.intensity +
          ' / distance: ' +
          light.distance +
          ' / decay: ' +
          light.decay +
          ' / CSS: ' +
          stage.clientWidth +
          ' × ' +
          stage.clientHeight +
          ' / buffer: ' +
          canvas.width +
          ' × ' +
          canvas.height;
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        report();
      }
      // 지원 코드: 숨김 중에는 기다리고 표시되면 버퍼와 카메라를 맞춥니다.
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (
            !input.value.trim() ||
            !input.checkValidity() ||
            !Number.isFinite(Number(input.value))
          ) {
            error.textContent = '입력 범위를 확인하세요.';
            return;
          }
          error.textContent = '';
          light.position.z = Number(input.value);
          draw();
        },
        { signal: events.signal },
      );
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
      // 이 HTML이 소유한 자원과 이벤트를 한 번씩 정리합니다.
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        for (const target of ownedTargets) target.dispose();
        for (const geometry of ownedGeometry) geometry.dispose();
        for (const material of ownedMaterial) material.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      document
        .querySelector('#cleanup')
        .addEventListener('click', cleanup, { signal: events.signal });
      window.addEventListener('pagehide', cleanup, { once: true, signal: events.signal });
    </script>
  </body>
</html>
```

</details>

- distance=0과 intensity=0은 어떻게 다른가요?

### API · AmbientLight

방향 없이 장면 전체에 같은 색과 강도의 빛을 더합니다.

- `color: Color | number | string` — 광원 색 (0xffffff)
- `intensity: number` — 광원 강도 (1)

새 환경광 객체입니다. scene.add로 연결하세요.

- 환경광은 그림자를 만들지 않습니다.

```js
scene.add(new THREE.AmbientLight(0xffffff,1));
```

[AmbientLight](https://threejs.org/docs/pages/AmbientLight.html) · three@0.186.1 · 2026-10-27

### API · DirectionalLight.target

position에서 target의 월드 위치로 향하는 평행광입니다.

- `target: Object3D` — 기본 위치는 원점입니다.

target 위치를 바꾸면 빛의 방향이 달라집니다.

- 움직이는 target을 scene에 추가하세요. rotation은 방향을 정하지 않습니다.

```js
scene.add(light,light.target); light.target.position.x=4;
```

[DirectionalLight.target](https://threejs.org/docs/pages/DirectionalLight.html) · three@0.186.1 · 2026-10-27

### API · PointLight

한 점에서 모든 방향으로 빛을 내며 거리에 따라 감쇠합니다.

- `intensity: number` — 칸델라 단위 광도 (1)
- `distance: number` — 0은 최대 거리 제한 없음 (0)
- `decay: number` — 거리 감쇠 지수 (2)

새 점광원 객체입니다.

- distance=0에서도 거리 감쇠는 적용됩니다.

```js
const light=new THREE.PointLight(0xffffff,20,0,2);
```

[PointLight](https://threejs.org/docs/pages/PointLight.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 공유 지오메트리와 복제](../07/README.md) · [다음: 거칠기와 금속성](../09/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
