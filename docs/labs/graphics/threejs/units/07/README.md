# Three.js · 07 공유 지오메트리와 복제

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 장면 좌표·카메라·기하 · 편집 가능한 예제 · 저장 ID: `threejs-step-07`

## 목표와 학습 후 역량

- geometry와 material은 같은 참조입니다. 두 높이가 1에서 1.5로 함께 변하지만 중심 x=-1,1은 유지됩니다.
- 시작 예제는 두 참조 true·둘 다 높이 1.6/주황, 완성 예제는 false·a 높이 1/파랑·b 높이 1.6/주황입니다.
- 완성 예제는 geometry 공유 true, material 공유 false이며 a는 파랑·b는 주황입니다. 두 높이는 1입니다.

## 선수 지식

앞선 도형·조명 개념을 복습하세요. 각 HTML 예제는 독립 실행됩니다.

## 핵심 개념과 설명

### 참조 공유

여러 Mesh가 하나의 geometry나 material을 참조할 수 있습니다. 공유 자원을 바꾸면 모든 참조 객체가 영향을 받습니다.

### 소유권

객체 복제는 모든 GPU 자원을 독립 복사한다는 뜻이 아닙니다. 수정·해제 전에 공유 범위를 확인해야 합니다.

## 실습 준비

사이트에서 독립 HTML을 편집하고 실행합니다. three@0.186.1을 사이트가 공급하므로 설치나 외부 서버가 필요 없습니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 같은 자원을 참조하는 두 물체 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.
2. Mesh.clone의 공유 경계 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.
3. 재질만 분리해서 변경하기 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건         | 예상할 변화·검증 가설                             |
| ---- | --------- | ----------------- | ------------------------------------------------- |
| 재질 | 공유 참조 | clone된 개별 재질 | 한 큐브의 색 수정이 다른 큐브에 전파되지 않습니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] geometry와 material은 같은 참조입니다. 두 높이가 1에서 1.5로 함께 변하지만 중심 x=-1,1은 유지됩니다.
- [ ] 시작 예제는 두 참조 true·둘 다 높이 1.6/주황, 완성 예제는 false·a 높이 1/파랑·b 높이 1.6/주황입니다.
- [ ] 완성 예제는 geometry 공유 true, material 공유 false이며 a는 파랑·b는 주황입니다. 두 높이는 1입니다.

## 자가 점검

1. clone이 geometry도 깊게 복제하나요?
2. 공유 자원을 언제 dispose할 수 있나요?

## 공식 참고

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-07/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-07/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

Mesh 두 개가 어떤 자원을 공유하는지 ===로 확인합니다. 물체 변환, geometry 배열 수정, material 수정을 나눠 예측하세요.

### 선수 단원

- `threejs-step-05`
- `threejs-step-06`

### 같은 자원을 참조하는 두 물체

a와 b는 서로 다른 Mesh이지만 geometry와 material은 같습니다. 시작 예제의 stretch=1을 1.5로 바꾸면 a.geometry.scale이 두 상자를 모두 길게 만듭니다. a.position.x만 바꿀 때는 b의 위치가 그대로인지도 비교하세요.

**예상 결과**

geometry와 material은 같은 참조입니다. 두 높이가 1에서 1.5로 함께 변하지만 중심 x=-1,1은 유지됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>같은 자원을 참조하는 두 물체</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>같은 자원을 참조하는 두 물체</h1>
    <div class="controls"><button id="cleanup">자원 정리</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="같은 자원을 참조하는 두 물체"></canvas>
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
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const a = new THREE.Mesh(geometry, material);
      a.position.x = -1;
      const b = a.clone();
      b.position.x = 1;
      const stretch = 1;
      a.geometry.scale(1, stretch, 1);
      for (const m of [a, b]) {
        m.geometry.computeBoundingBox();
        scene.add(ownMesh(m));
      }
      function report() {
        output.textContent =
          'geometry 공유: ' +
          (a.geometry === b.geometry) +
          ' / material 공유: ' +
          (a.material === b.material) +
          ' / 높이: ' +
          [
            a.geometry.boundingBox.max.y - a.geometry.boundingBox.min.y,
            b.geometry.boundingBox.max.y - b.geometry.boundingBox.min.y,
          ] +
          ' / 색: ' +
          [a.material.color.getHexString(), b.material.color.getHexString()] +
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

- stretch 상수만 바꾸세요.
- a.geometry.scale(1,stretch,1)을 확인하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

geometry.scale은 공유한 정점 배열을 수정합니다. Mesh의 position과 scale은 각 Object3D의 변환이므로 공유 geometry 자체를 수정하지 않습니다. output은 boundingBox의 실제 높이와 참조 동등성을 표시합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>같은 자원을 참조하는 두 물체</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>같은 자원을 참조하는 두 물체</h1>
    <div class="controls"><button id="cleanup">자원 정리</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="같은 자원을 참조하는 두 물체"></canvas>
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
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const a = new THREE.Mesh(geometry, material);
      a.position.x = -1;
      const b = a.clone();
      b.position.x = 1;
      const stretch = 1.5;
      a.geometry.scale(1, stretch, 1);
      for (const m of [a, b]) {
        m.geometry.computeBoundingBox();
        scene.add(ownMesh(m));
      }
      function report() {
        output.textContent =
          'geometry 공유: ' +
          (a.geometry === b.geometry) +
          ' / material 공유: ' +
          (a.material === b.material) +
          ' / 높이: ' +
          [
            a.geometry.boundingBox.max.y - a.geometry.boundingBox.min.y,
            b.geometry.boundingBox.max.y - b.geometry.boundingBox.min.y,
          ] +
          ' / 색: ' +
          [a.material.color.getHexString(), b.material.color.getHexString()] +
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

- a.scale.y와 a.geometry.scale은 무엇이 다른가요?

### Mesh.clone의 공유 경계

b=a.clone()은 Mesh를 복제하지만 geometry와 material 참조는 유지합니다. 시작 예제에서 b.geometry.scale과 b.material.color.set은 a까지 바꿉니다. isolate=false를 true로 바꿔 geometry.clone과 material.clone을 먼저 연결하세요.

**예상 결과**

시작 예제는 두 참조 true·둘 다 높이 1.6/주황, 완성 예제는 false·a 높이 1/파랑·b 높이 1.6/주황입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mesh.clone의 공유 경계</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Mesh.clone의 공유 경계</h1>
    <div class="controls"><button id="cleanup">자원 정리</button></div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Mesh.clone의 공유 경계"></canvas></div>
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
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const a = new THREE.Mesh(geometry, material);
      a.position.x = -1;
      const b = a.clone();
      b.position.x = 1;
      const isolate = false;
      if (isolate) {
        b.geometry = b.geometry.clone();
        b.material = b.material.clone();
      }
      b.geometry.scale(1, 1.6, 1);
      b.material.color.set('#f97316');
      for (const m of [a, b]) {
        m.geometry.computeBoundingBox();
        scene.add(ownMesh(m));
      }
      function report() {
        output.textContent =
          'geometry 공유: ' +
          (a.geometry === b.geometry) +
          ' / material 공유: ' +
          (a.material === b.material) +
          ' / 높이: ' +
          [
            a.geometry.boundingBox.max.y - a.geometry.boundingBox.min.y,
            b.geometry.boundingBox.max.y - b.geometry.boundingBox.min.y,
          ] +
          ' / 색: ' +
          [a.material.color.getHexString(), b.material.color.getHexString()] +
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

- isolate 조건에서 두 자원을 모두 복제하세요.
- 복제는 수정 전에 하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

자원을 따로 복제하면 b만 높이 1.6, 주황색이 됩니다. a는 높이 1, 파란색입니다. geometry.clone은 속성 배열도 복사합니다. 재질에 texture가 있다면 material.clone만으로 texture까지 독립 복제되지는 않지만 이번 예제는 texture를 쓰지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mesh.clone의 공유 경계</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Mesh.clone의 공유 경계</h1>
    <div class="controls"><button id="cleanup">자원 정리</button></div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Mesh.clone의 공유 경계"></canvas></div>
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
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const a = new THREE.Mesh(geometry, material);
      a.position.x = -1;
      const b = a.clone();
      b.position.x = 1;
      const isolate = true;
      if (isolate) {
        b.geometry = b.geometry.clone();
        b.material = b.material.clone();
      }
      b.geometry.scale(1, 1.6, 1);
      b.material.color.set('#f97316');
      for (const m of [a, b]) {
        m.geometry.computeBoundingBox();
        scene.add(ownMesh(m));
      }
      function report() {
        output.textContent =
          'geometry 공유: ' +
          (a.geometry === b.geometry) +
          ' / material 공유: ' +
          (a.material === b.material) +
          ' / 높이: ' +
          [
            a.geometry.boundingBox.max.y - a.geometry.boundingBox.min.y,
            b.geometry.boundingBox.max.y - b.geometry.boundingBox.min.y,
          ] +
          ' / 색: ' +
          [a.material.color.getHexString(), b.material.color.getHexString()] +
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

- Mesh.clone만으로 자원이 독립하지 않는 이유는 무엇인가요?

### 재질만 분리해서 변경하기

geometry는 공유하고 b.material만 복제해 색을 따로 바꿉니다. separateMaterial=false를 true로 바꾸세요. b를 주황색으로 바꾼 뒤에도 a가 파란색인지, geometry===는 여전히 true인지 확인합니다.

**예상 결과**

완성 예제는 geometry 공유 true, material 공유 false이며 a는 파랑·b는 주황입니다. 두 높이는 1입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>재질만 분리해서 변경하기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>재질만 분리해서 변경하기</h1>
    <div class="controls"><button id="cleanup">자원 정리</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="재질만 분리해서 변경하기"></canvas>
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
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const a = new THREE.Mesh(geometry, material);
      a.position.x = -1;
      const b = a.clone();
      b.position.x = 1;
      const separateMaterial = false;
      if (separateMaterial) b.material = b.material.clone();
      b.material.color.set('#f97316');
      for (const m of [a, b]) {
        m.geometry.computeBoundingBox();
        scene.add(ownMesh(m));
      }
      function report() {
        output.textContent =
          'geometry 공유: ' +
          (a.geometry === b.geometry) +
          ' / material 공유: ' +
          (a.material === b.material) +
          ' / 높이: ' +
          [
            a.geometry.boundingBox.max.y - a.geometry.boundingBox.min.y,
            b.geometry.boundingBox.max.y - b.geometry.boundingBox.min.y,
          ] +
          ' / 색: ' +
          [a.material.color.getHexString(), b.material.color.getHexString()] +
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

- geometry.clone은 추가하지 마세요.
- 색을 바꾸기 전에 b.material을 복제하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

필요한 자원만 복제하면 공유 도형을 유지하면서 색만 독립합니다. 공유와 독립은 Mesh 전체의 성질이 아니라 참조별 선택입니다. 정리 함수는 Set에 모은 자원을 한 번씩 해제하므로 공유 자원을 중복 dispose하지 않습니다. 정리 버튼 뒤에는 다시 실행해야 합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>재질만 분리해서 변경하기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>재질만 분리해서 변경하기</h1>
    <div class="controls"><button id="cleanup">자원 정리</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="재질만 분리해서 변경하기"></canvas>
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
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const a = new THREE.Mesh(geometry, material);
      a.position.x = -1;
      const b = a.clone();
      b.position.x = 1;
      const separateMaterial = true;
      if (separateMaterial) b.material = b.material.clone();
      b.material.color.set('#f97316');
      for (const m of [a, b]) {
        m.geometry.computeBoundingBox();
        scene.add(ownMesh(m));
      }
      function report() {
        output.textContent =
          'geometry 공유: ' +
          (a.geometry === b.geometry) +
          ' / material 공유: ' +
          (a.material === b.material) +
          ' / 높이: ' +
          [
            a.geometry.boundingBox.max.y - a.geometry.boundingBox.min.y,
            b.geometry.boundingBox.max.y - b.geometry.boundingBox.min.y,
          ] +
          ' / 색: ' +
          [a.material.color.getHexString(), b.material.color.getHexString()] +
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

- 색만 분리할 때 geometry도 복제해야 하나요?

### API · Mesh.clone

Mesh와 Object3D 변환을 복사하지만 geometry와 material 참조는 공유합니다.

- `recursive: boolean` — 자식 Object3D도 복제할지 결정합니다. (true)

새 Mesh를 반환합니다.

- 독립 자원이 필요하면 자원을 별도로 clone하세요.

```js
const b=a.clone();
```

[Mesh.clone](https://threejs.org/docs/pages/Object3D.html) · three@three@0.186.1 · 2026-10-27

### API · BufferGeometry.clone / Material.clone

도형 또는 재질을 새 인스턴스로 복제합니다.

같은 종류의 새 자원을 반환합니다.

- 재질이 사용하는 texture까지 독립 복사하지 않습니다. 공유 자원은 소유자가 한 번 해제하세요.

```js
b.geometry=a.geometry.clone(); b.material=a.material.clone();
```

[BufferGeometry.clone / Material.clone](https://threejs.org/docs/pages/Material.html) · three@three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 법선과 표면 방향](../06/README.md) · [다음: 조명 종류와 배치](../08/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
