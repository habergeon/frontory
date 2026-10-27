# Three.js · 06 법선과 표면 방향

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 장면 좌표·카메라·기하 · 편집 가능한 예제 · 저장 ID: `threejs-step-06`

## 목표와 학습 후 역량

- 시작 면은 보이지 않고 normal.z=-1, 완성 면은 보이며 normal.z=1입니다.
- normal.count 0→4, 공유 정점의 법선은 대략 (-0.192,-0.192,0.962)이며 접힌 면의 음영 연결이 바뀝니다.
- 정점·index 수와 첫 법선은 같고 flatShading만 true→false로 바뀌며 삼각형 경계의 음영이 달라집니다.

## 선수 지식

앞선 도형·조명 개념을 복습하세요. 각 HTML 예제는 독립 실행됩니다.

## 핵심 개념과 설명

### 법선 역할

법선은 빛이 표면에 닿는 방향을 계산하는 데 쓰입니다. 위치가 같아도 법선이 다르면 경계가 다르게 보입니다.

### 평활화

공유 정점의 법선을 평균내면 면 사이가 부드럽게 보입니다. 날카로운 모서리를 유지하려면 속성을 분리해야 합니다.

## 실습 준비

사이트에서 독립 HTML을 편집하고 실행합니다. three@0.186.1을 사이트가 공급하므로 설치나 외부 서버가 필요 없습니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 인덱스 순서와 앞면 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.
2. 법선이 없는 조명 표면 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.
3. 공유 정점의 부드러운 음영 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.

## 관찰할 변수

| 변수      | 기준 조건 | 바꿀 조건   | 예상할 변화·검증 가설                               |
| --------- | --------- | ----------- | --------------------------------------------------- |
| 정점 공유 | 면별 분리 | 모서리 공유 | 평균 법선 때문에 모서리가 부드럽게 보일 수 있습니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 시작 면은 보이지 않고 normal.z=-1, 완성 면은 보이며 normal.z=1입니다.
- [ ] normal.count 0→4, 공유 정점의 법선은 대략 (-0.192,-0.192,0.962)이며 접힌 면의 음영 연결이 바뀝니다.
- [ ] 정점·index 수와 첫 법선은 같고 flatShading만 true→false로 바뀌며 삼각형 경계의 음영이 달라집니다.

## 자가 점검

1. 법선 색상은 실제 재질 색인가요?
2. 비균일 scale이 법선 처리에 영향을 주는 이유는 무엇인가요?

## 공식 참고

- [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)
- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-06/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-06/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

삼각형의 앞면과 빛 계산에 쓰는 법선을 따로 비교합니다. 카메라와 조명은 고정하고 한 조건씩 바꾸세요.

### 선수 단원

- `threejs-step-05`

### 인덱스 순서와 앞면

카메라는 +Z에서 원점을 봅니다. 시작 예제의 [0,2,1]은 이 시점에서 시계 방향이라 FrontSide 면이 보이지 않습니다. [0,1,2]로 바꿔 보세요. computeVertexNormals의 normal.z도 -1에서 +1로 바뀌는지 확인합니다.

**예상 결과**

시작 면은 보이지 않고 normal.z=-1, 완성 면은 보이며 normal.z=1입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>인덱스 순서와 앞면</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>인덱스 순서와 앞면</h1>
    <div class="controls"><button id="cleanup">자원 정리</button></div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="인덱스 순서와 앞면"></canvas></div>
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
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 0, 1, 0], 3),
      );
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      geometry.setIndex([0, 2, 1]);
      geometry.computeVertexNormals();
      function report() {
        output.textContent =
          'index: ' +
          Array.from(geometry.index.array) +
          ' / normal.z: ' +
          geometry.getAttribute('normal').getZ(0) +
          ' / side: ' +
          material.side +
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

- 정점 위치는 그대로 두세요.
- setIndex의 두 번째와 세 번째 번호를 교환하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

앞면 판정은 정점 연결 순서로 정합니다. 법선만 뒤집어도 사라진 앞면이 복구되지는 않습니다. 여기서는 조명과 무관한 MeshBasicMaterial을 써서 면 방향만 분리해 봅니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>인덱스 순서와 앞면</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>인덱스 순서와 앞면</h1>
    <div class="controls"><button id="cleanup">자원 정리</button></div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="인덱스 순서와 앞면"></canvas></div>
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
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 0, 1, 0], 3),
      );
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      geometry.setIndex([0, 1, 2]);
      geometry.computeVertexNormals();
      function report() {
        output.textContent =
          'index: ' +
          Array.from(geometry.index.array) +
          ' / normal.z: ' +
          geometry.getAttribute('normal').getZ(0) +
          ' / side: ' +
          material.side +
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

- 법선과 앞면 판정은 어떻게 다른가요?

### 법선이 없는 조명 표면

시작 예제는 네 정점과 여섯 index로 접힌 두 면을 만듭니다. normal 속성이 없지만 r186은 MeshLambertMaterial에 평면 음영을 자동 적용하므로 면은 보입니다. calculateNormals=false를 true로 바꾸고 공유한 모서리의 밝기 연결과 normal.count를 비교하세요.

**예상 결과**

normal.count 0→4, 공유 정점의 법선은 대략 (-0.192,-0.192,0.962)이며 접힌 면의 음영 연결이 바뀝니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>법선이 없는 조명 표면</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>법선이 없는 조명 표면</h1>
    <div class="controls"><button id="cleanup">자원 정리</button></div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="법선이 없는 조명 표면"></canvas></div>
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
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0.8, -1, 1, 0], 3),
      );
      geometry.setIndex([0, 1, 2, 0, 2, 3]);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      const calculateNormals = false;
      if (calculateNormals) geometry.computeVertexNormals();
      function report() {
        output.textContent =
          'normal.count: ' +
          (geometry.getAttribute('normal')?.count ?? 0) +
          ' / normal[0]: ' +
          (geometry.getAttribute('normal')
            ? Array.from(geometry.getAttribute('normal').array.slice(0, 3)).map((v) =>
                v.toFixed(3),
              )
            : '없음; r186 평면 음영') +
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

- calculateNormals를 찾으세요.
- geometry.computeVertexNormals() 호출 조건을 바꾸세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

computeVertexNormals는 공유 정점에 인접한 두 면의 기여를 누적하고 정규화합니다. normal.count는 4이며 첫 법선은 대략 (-0.192,-0.192,0.962)입니다. normal 없음이 항상 검은 표면을 뜻하지는 않습니다. r186의 자동 평면 음영과 정점 법선 보간의 차이를 관찰하세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>법선이 없는 조명 표면</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>법선이 없는 조명 표면</h1>
    <div class="controls"><button id="cleanup">자원 정리</button></div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="법선이 없는 조명 표면"></canvas></div>
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
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0.8, -1, 1, 0], 3),
      );
      geometry.setIndex([0, 1, 2, 0, 2, 3]);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      const calculateNormals = true;
      if (calculateNormals) geometry.computeVertexNormals();
      function report() {
        output.textContent =
          'normal.count: ' +
          (geometry.getAttribute('normal')?.count ?? 0) +
          ' / normal[0]: ' +
          (geometry.getAttribute('normal')
            ? Array.from(geometry.getAttribute('normal').array.slice(0, 3)).map((v) =>
                v.toFixed(3),
              )
            : '없음; r186 평면 음영') +
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

- 광원을 바꾸지 않았는데 왜 밝기가 바뀌나요?

### 공유 정점의 부드러운 음영

구의 정점과 조명을 유지하고 flatShading만 true에서 false로 바꿉니다. 시작 예제는 삼각형 경계마다 밝기가 끊기고 완성 예제는 법선을 보간해 부드럽습니다. computeVertexNormals는 index로 공유한 정점에 인접 면의 기여를 합칩니다.

**예상 결과**

정점·index 수와 첫 법선은 같고 flatShading만 true→false로 바뀌며 삼각형 경계의 음영이 달라집니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>공유 정점의 부드러운 음영</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>공유 정점의 부드러운 음영</h1>
    <div class="controls"><button id="cleanup">자원 정리</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="공유 정점의 부드러운 음영"></canvas>
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
      const geometry = new THREE.SphereGeometry(1.2, 12, 8);
      geometry.computeVertexNormals();
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb', flatShading: true });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          '정점: ' +
          geometry.getAttribute('position').count +
          ' / 인덱스: ' +
          geometry.index.count +
          ' / flatShading: ' +
          material.flatShading +
          ' / 첫 법선: ' +
          Array.from(geometry.getAttribute('normal').array.slice(0, 3)) +
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

- 구의 분할 수는 유지하세요.
- flatShading만 false로 바꾸세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

flatShading은 평평한 면 법선을 셰이더에서 계산합니다. false는 정점 법선을 보간합니다. BoxGeometry처럼 좌표가 같아도 정점 번호가 분리된 경계는 computeVertexNormals만으로 매끈해지지 않습니다. 생성 후 flatShading을 바꾸면 material.needsUpdate=true도 필요합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>공유 정점의 부드러운 음영</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>공유 정점의 부드러운 음영</h1>
    <div class="controls"><button id="cleanup">자원 정리</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="공유 정점의 부드러운 음영"></canvas>
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
      const geometry = new THREE.SphereGeometry(1.2, 12, 8);
      geometry.computeVertexNormals();
      const material = new THREE.MeshLambertMaterial({
        color: '#2563eb',
        flatShading: false,
      });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          '정점: ' +
          geometry.getAttribute('position').count +
          ' / 인덱스: ' +
          geometry.index.count +
          ' / flatShading: ' +
          material.flatShading +
          ' / 첫 법선: ' +
          Array.from(geometry.getAttribute('normal').array.slice(0, 3)) +
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

- 같은 위치의 정점을 나누면 법선 평균에 어떤 영향이 있나요?

### API · BufferGeometry.computeVertexNormals

면의 정점에서 법선을 계산합니다. index가 있으면 공유 정점에 인접 면의 기여를 누적하고 정규화합니다.

반환값 없이 normal 속성을 갱신합니다.

- 중복된 정점 번호는 자동으로 합치지 않습니다. 앞면 연결 순서도 바꾸지 않습니다.

```js
geometry.computeVertexNormals();
```

[BufferGeometry.computeVertexNormals](https://threejs.org/docs/pages/BufferGeometry.html) · three@0.186.1 · 2026-10-27

### API · MeshLambertMaterial.flatShading

true이면 면 단위 법선을 쓰고 false이면 정점 법선을 보간합니다.

- `flatShading: boolean` — 평면 음영 사용 여부 (false)

재질의 셰이더 음영 방식이 달라집니다.

- 이미 컴파일한 뒤 바꾸면 material.needsUpdate=true가 필요합니다.

```js
material.flatShading=false; material.needsUpdate=true;
```

[MeshLambertMaterial.flatShading](https://threejs.org/docs/pages/MeshLambertMaterial.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 버퍼 지오메트리](../05/README.md) · [다음: 공유 지오메트리와 복제](../07/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
