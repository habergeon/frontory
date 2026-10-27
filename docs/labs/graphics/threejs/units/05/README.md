# Three.js · 05 버퍼 지오메트리

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 장면 좌표·카메라·기하 · 편집 가능한 예제 · 저장 ID: `threejs-step-05`

## 목표와 학습 후 역량

- 정점 3, index 없음, 삼각형 1. topY는 0.2에서 1로 바뀝니다.
- 시작 예제는 정점 6·index 없음, 완성 예제는 정점 4·index 6입니다. 둘 다 두 삼각형의 사각형입니다.
- 번호 4는 오류로 거부되고 상태는 유지됩니다. 올바른 정점 수정은 CPU와 그림에 함께 반영되고 version이 증가합니다.

## 선수 지식

01·04의 좌표와 부모 변환을 복습하세요. 이전 결과 파일 없이 시작할 수 있습니다.

## 핵심 개념과 설명

### 정점 속성

BufferGeometry는 position과 normal 같은 배열을 묶습니다. itemSize는 한 정점을 구성하는 성분 수입니다.

### 인덱스 공유

인덱스는 정점을 재사용해 삼각형을 연결합니다. 같은 위치라도 UV나 normal이 다르면 별도 정점이 필요할 수 있습니다.

## 실습 준비

사이트에서 독립 HTML을 편집하고 실행합니다. three@0.186.1을 사이트가 공급하므로 설치나 외부 서버가 필요 없습니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 배열로 삼각형 만들기 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.
2. 정점 네 개로 두 면 연결하기 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.
3. 범위를 검사하고 정점 갱신하기 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.

## 관찰할 변수

| 변수        | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                           |
| ----------- | --------- | --------- | ----------------------------------------------- |
| 인덱스 순서 | 반시계    | 시계      | 기본 앞면 판단이 바뀌어 면이 사라질 수 있습니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 정점 3, index 없음, 삼각형 1. topY는 0.2에서 1로 바뀝니다.
- [ ] 시작 예제는 정점 6·index 없음, 완성 예제는 정점 4·index 6입니다. 둘 다 두 삼각형의 사각형입니다.
- [ ] 번호 4는 오류로 거부되고 상태는 유지됩니다. 올바른 정점 수정은 CPU와 그림에 함께 반영되고 version이 증가합니다.

## 자가 점검

1. 같은 좌표의 정점을 항상 합칠 수 없는 이유는 무엇인가요?
2. itemSize를 2로 잘못 주면 무엇이 달라지나요?

## 공식 참고

- [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-05/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-05/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

position 배열을 직접 만들고 정점 수와 삼각형 수를 구별합니다. 숫자를 바꾸기 전 예상하고 실제 그림과 수치를 필기에 기록하세요. 각 예제는 독립 HTML입니다.

### 선수 단원

- `threejs-01`
- `threejs-step-04`

### 배열로 삼각형 만들기

Float32BufferAttribute의 두 번째 인자 3은 한 정점의 x,y,z 성분 수입니다. 배열의 9개 성분을 3으로 나누면 position.count=3입니다. 시작 코드에서 topY=0.2를 1로 바꾸고 위쪽 정점과 삼각형의 면적을 비교하세요. setAttribute는 이름 position에 이 속성을 연결합니다.

**예상 결과**

정점 3, index 없음, 삼각형 1. topY는 0.2에서 1로 바뀝니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>배열로 삼각형 만들기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>배열로 삼각형 만들기</h1>
    <div class="controls"><button id="cleanup">자원 정리</button></div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="배열로 삼각형 만들기"></canvas></div>
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
      const topY = 0.2;
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 0, topY, 0], 3),
      );
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      function report() {
        output.textContent =
          '정점: ' +
          geometry.getAttribute('position').count +
          ' / 인덱스: ' +
          (geometry.index?.count ?? 0) +
          ' / 삼각형: ' +
          geometry.getAttribute('position').count / 3 +
          ' / topY: ' +
          geometry.getAttribute('position').getY(2) +
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

- topY 상수를 찾으세요.
- itemSize는 3을 유지하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

정점 수는 그대로이고 위쪽 정점만 움직입니다. index가 null이면 연속한 세 정점이 한 삼각형입니다. Float32BufferAttribute는 숫자 배열을 GPU에 전달할 부동소수점 배열로 보관합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>배열로 삼각형 만들기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>배열로 삼각형 만들기</h1>
    <div class="controls"><button id="cleanup">자원 정리</button></div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="배열로 삼각형 만들기"></canvas></div>
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
      const topY = 1;
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 0, topY, 0], 3),
      );
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      function report() {
        output.textContent =
          '정점: ' +
          geometry.getAttribute('position').count +
          ' / 인덱스: ' +
          (geometry.index?.count ?? 0) +
          ' / 삼각형: ' +
          geometry.getAttribute('position').count / 3 +
          ' / topY: ' +
          geometry.getAttribute('position').getY(2) +
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

- itemSize를 2로 잘못 주면 count는 어떻게 달라지나요?

### 정점 네 개로 두 면 연결하기

시작 예제는 정점 여섯 개로 사각형을 만듭니다. 두 모서리의 좌표가 중복됩니다. 완성 예제처럼 정점 네 개와 setIndex([0,1,2,0,2,3])로 같은 두 면을 만드세요. 번호는 0부터 시작합니다. 각 번호를 그림에 적고 배열과 대조하세요. HTML 인덱스 배열에 0,1,99를 넣고 적용해 오류 뒤 이전 모양이 유지되는지 확인하세요. 마지막 값은 position.count보다 작아야 합니다. 처음 배열을 다시 입력하면 복구됩니다.

**예상 결과**

시작 예제는 정점 6·index 없음, 완성 예제는 정점 4·index 6입니다. 둘 다 두 삼각형의 사각형입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>정점 네 개로 두 면 연결하기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>정점 네 개로 두 면 연결하기</h1>
    <div class="controls">
      <label>인덱스 배열 <input id="indices" value="0,1,2,3,4,5" /></label
      ><button id="applyIndices">배열 적용</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="정점 네 개로 두 면 연결하기"></canvas>
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
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(
          [-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0],
          3,
        ),
      );

      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      function report() {
        output.textContent =
          '정점: ' +
          geometry.getAttribute('position').count +
          ' / 인덱스: ' +
          (geometry.index?.count ?? 0) +
          ' / 삼각형: ' +
          (geometry.index?.count ?? geometry.getAttribute('position').count) / 3 +
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
      document.querySelector('#applyIndices').addEventListener(
        'click',
        () => {
          const parts = document.querySelector('#indices').value.split(','),
            values = parts.map(Number),
            count = geometry.getAttribute('position').count;
          if (
            parts.some((p) => !p.trim()) ||
            values.length % 3 !== 0 ||
            values.some((i) => !Number.isInteger(i) || i < 0 || i >= count)
          ) {
            error.textContent =
              '각 인덱스는 0 이상 정점 수 미만의 정수이고 세 개씩 묶여야 합니다.';
            return;
          }
          error.textContent = '';
          geometry.setIndex(values);
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

- 완성 예제의 position 배열은 12성분입니다.
- 0,1,2와 0,2,3을 연결하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

index.count=6은 저장한 정점이 여섯 개라는 뜻이 아닙니다. 인덱스 세 개가 한 면이므로 두 면입니다. 좌표가 같아도 UV나 normal이 다른 경계에서는 정점을 나눠야 합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>정점 네 개로 두 면 연결하기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>정점 네 개로 두 면 연결하기</h1>
    <div class="controls">
      <label>인덱스 배열 <input id="indices" value="0,1,2,0,2,3" /></label
      ><button id="applyIndices">배열 적용</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="정점 네 개로 두 면 연결하기"></canvas>
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
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], 3),
      );
      geometry.setIndex([0, 1, 2, 0, 2, 3]);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      function report() {
        output.textContent =
          '정점: ' +
          geometry.getAttribute('position').count +
          ' / 인덱스: ' +
          (geometry.index?.count ?? 0) +
          ' / 삼각형: ' +
          (geometry.index?.count ?? geometry.getAttribute('position').count) / 3 +
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
      document.querySelector('#applyIndices').addEventListener(
        'click',
        () => {
          const parts = document.querySelector('#indices').value.split(','),
            values = parts.map(Number),
            count = geometry.getAttribute('position').count;
          if (
            parts.some((p) => !p.trim()) ||
            values.length % 3 !== 0 ||
            values.some((i) => !Number.isInteger(i) || i < 0 || i >= count)
          ) {
            error.textContent =
              '각 인덱스는 0 이상 정점 수 미만의 정수이고 세 개씩 묶여야 합니다.';
            return;
          }
          error.textContent = '';
          geometry.setIndex(values);
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

- index.count와 position.count는 각각 무엇을 세나요?

### 범위를 검사하고 정점 갱신하기

정점 번호는 0~2, y는 -2~2를 받습니다. 번호 4를 적용해 오류 뒤에도 이전 삼각형이 남는지 확인하세요. 이어 번호 2, y=0.2를 적용합니다. 시작 예제는 CPU 배열만 바뀌어 그림이 그대로입니다. notifyGpu=false를 true로 고치세요.

**예상 결과**

번호 4는 오류로 거부되고 상태는 유지됩니다. 올바른 정점 수정은 CPU와 그림에 함께 반영되고 version이 증가합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>범위를 검사하고 정점 갱신하기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>범위를 검사하고 정점 갱신하기</h1>
    <div class="controls">
      <label>정점 번호 <input id="vertex" type="number" value="2" /></label
      ><label
        >y <input id="height" type="number" value="0.2" step="0.1" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="범위를 검사하고 정점 갱신하기"></canvas>
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
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 0, 1, 0], 3),
      );
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const notifyGpu = false;
      function report() {
        output.textContent =
          '정점: ' +
          geometry.getAttribute('position').count +
          ' / topY: ' +
          geometry.getAttribute('position').getY(2) +
          ' / version: ' +
          geometry.getAttribute('position').version +
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
          const raw = document.querySelector('#vertex').value,
            value = document.querySelector('#height').value,
            i = Number(raw),
            y = Number(value),
            p = geometry.getAttribute('position');
          if (
            !raw.trim() ||
            !value.trim() ||
            !Number.isInteger(i) ||
            i < 0 ||
            i >= p.count ||
            !Number.isFinite(y) ||
            y < -2 ||
            y > 2
          ) {
            error.textContent = '정점 번호는 0~2, y는 -2~2의 유한한 숫자여야 합니다.';
            return;
          }
          error.textContent = '';
          p.setY(i, y);
          if (notifyGpu) p.needsUpdate = true;
          geometry.computeBoundingSphere();
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

- setY 다음의 needsUpdate를 확인하세요.
- notifyGpu를 true로 바꾸세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

setY는 배열을 수정합니다. needsUpdate=true가 GPU 재전송을 지시하고 version이 증가합니다. boundingSphere도 다시 계산해 이전 경계가 남지 않게 합니다. 잘못된 번호나 빈 값은 수정 전에 거부합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>범위를 검사하고 정점 갱신하기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>범위를 검사하고 정점 갱신하기</h1>
    <div class="controls">
      <label>정점 번호 <input id="vertex" type="number" value="2" /></label
      ><label
        >y <input id="height" type="number" value="0.2" step="0.1" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="범위를 검사하고 정점 갱신하기"></canvas>
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
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 0, 1, 0], 3),
      );
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const notifyGpu = true;
      function report() {
        output.textContent =
          '정점: ' +
          geometry.getAttribute('position').count +
          ' / topY: ' +
          geometry.getAttribute('position').getY(2) +
          ' / version: ' +
          geometry.getAttribute('position').version +
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
          const raw = document.querySelector('#vertex').value,
            value = document.querySelector('#height').value,
            i = Number(raw),
            y = Number(value),
            p = geometry.getAttribute('position');
          if (
            !raw.trim() ||
            !value.trim() ||
            !Number.isInteger(i) ||
            i < 0 ||
            i >= p.count ||
            !Number.isFinite(y) ||
            y < -2 ||
            y > 2
          ) {
            error.textContent = '정점 번호는 0~2, y는 -2~2의 유한한 숫자여야 합니다.';
            return;
          }
          error.textContent = '';
          p.setY(i, y);
          if (notifyGpu) p.needsUpdate = true;
          geometry.computeBoundingSphere();
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

- CPU 값만 바뀌었을 때 무엇이 빠졌나요?

### API · BufferGeometry.setAttribute / BufferAttribute

이름에 정점 속성을 연결합니다. count는 배열 길이를 itemSize로 나눈 값입니다.

- `name: string` — position 등 속성 이름
- `attribute: BufferAttribute` — 정점 데이터와 성분 수

setAttribute는 geometry 자신을 반환합니다.

- position은 한 정점당 x,y,z 세 성분을 씁니다.

```js
geometry.setAttribute('position', new THREE.Float32BufferAttribute([0,0,0,1,0,0,0,1,0],3));
```

[BufferGeometry.setAttribute / BufferAttribute](https://threejs.org/docs/pages/BufferGeometry.html) · three@0.186.1 · 2026-10-27

### API · BufferGeometry.setIndex

삼각형마다 정점 번호 세 개를 지정합니다. null이면 연속한 정점을 사용합니다.

- `index: Array<number> | BufferAttribute | null` — 0부터 position.count-1 범위의 정수 번호

geometry 자신을 반환합니다.

- 범위 오류를 자동 수정하지 않습니다. 입력 전에 검사하세요.

```js
geometry.setIndex([0,1,2,0,2,3]);
```

[BufferGeometry.setIndex](https://threejs.org/docs/pages/BufferGeometry.html) · three@0.186.1 · 2026-10-27

### API · BufferAttribute.setY / needsUpdate

setY로 CPU 성분을 수정한 뒤 needsUpdate=true로 GPU 전송을 요청합니다.

- `index, y: number` — 정점 번호와 새 y값

setY는 속성을 반환합니다. needsUpdate 설정은 version을 증가시킵니다.

- 위치 수정 뒤 경계도 다시 계산하세요. needsUpdate의 읽기값으로 성공 여부를 판단하지 마세요.

```js
position.setY(2, .2); position.needsUpdate=true; geometry.computeBoundingSphere();
```

[BufferAttribute.setY / needsUpdate](https://threejs.org/docs/pages/BufferAttribute.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 회전과 피벗](../04/README.md) · [다음: 법선과 표면 방향](../06/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
