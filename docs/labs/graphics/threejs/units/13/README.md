# Three.js · 13 정규화 좌표와 선택

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 조명·재질·모델 선택 · 편집 가능한 예제 · 저장 ID: `threejs-step-13`

## 목표와 학습 후 역량

- 페이지 여백이 있어도 선택 위치가 맞는다.
- 가장 가까운 교차 대상을 선택한다.

## 선수 지식

선수 단원: 02, 03, 04. 앞 단원의 개념을 이어서 실험합니다.

## 핵심 개념과 설명

### NDC 입력

Raycaster.setFromCamera는 정규화 장치 좌표를 받습니다. canvas 사각형을 기준으로 x는 -1부터 1, y는 위쪽이 1이 되게 계산합니다.

### 교차 결과

intersectObjects는 거리순 교차 정보를 반환합니다. 복합 모델은 하위 Mesh에서 업무상 선택 대상까지 올라가는 규칙이 필요합니다.

## 실습 준비

사이트에서 HTML을 편집하고 실행합니다. Three.js 0.186.1을 제공하며 별도 설치나 외부 서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 시작 코드는 innerWidth/innerHeight로 정규화합니다. canvasRelative=false를 true로 바꾸세요. 중앙과 왼쪽 위를 클릭하고 여백·너비 바꾸기 버튼을 누른 뒤 다시 중앙을 클릭하세요.
2. 객체 입력 배열은 [back,front]입니다. 시작 코드는 hits의 마지막 교차를 고릅니다. nearest=false를 true로 바꾸고 겹친 중앙을 클릭하세요. 출력의 이름·거리를 모두 비교합니다.
3. clearOnMiss=false를 true로 바꾸세요. front를 고른 다음 왼쪽 위 빈 공간을 클릭합니다. 여백·너비를 바꿔 다시 front를 선택하고 선택 해제 버튼도 확인하세요.

## 관찰할 변수

| 변수        | 기준 조건   | 바꿀 조건 | 예상할 변화·검증 가설              |
| ----------- | ----------- | --------- | ---------------------------------- |
| 포인터 위치 | 캔버스 중앙 | 왼쪽 상단 | NDC는 대략 0,0에서 -1,1로 바뀝니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 페이지 여백이 있어도 선택 위치가 맞는다.
- [ ] 가장 가까운 교차 대상을 선택한다.

## 자가 점검

1. window 크기로 정규화하면 언제 틀리나요?
2. recursive 옵션과 부모 선택 규칙은 무엇이 다른가요?

## 공식 참고

- [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-13/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-13/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

페이지의 client 좌표를 캔버스의 NDC로 바꾸고 카메라에서 광선을 만듭니다. 서로 겹친 두 상자와 거리 목록을 보면서 여백·크기 변경 뒤에도 가까운 물체를 선택합니다.

### 선수 단원

- `threejs-step-02`
- `threejs-step-03`
- `threejs-step-04`

### 캔버스 사각형으로 NDC 계산하기

시작 코드는 innerWidth/innerHeight로 정규화합니다. canvasRelative=false를 true로 바꾸세요. 중앙과 왼쪽 위를 클릭하고 여백·너비 바꾸기 버튼을 누른 뒤 다시 중앙을 클릭하세요.

**예상 결과**

중앙 NDC≈(0,0), 왼쪽 위≈(-1,1). 여백·너비 변경 뒤에도 중앙 선택이 front입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>캔버스 기준 NDC</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>캔버스 기준 NDC</h1>
    <p>
      겹친 두 상자를 클릭하세요. 앞 물체 front는 z=.6, 뒤 물체 back은
      z=-.6입니다. 배열은 [back,front]이며 교차 결과는 거리순입니다. 중앙과 왼쪽
      위, 여백·너비 변경 후 위치를 비교하세요.
    </p>
    <div class="controls">
      <button id="layout">여백·너비 바꾸기</button
      ><button id="clear">선택 해제</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="캔버스 기준 NDC"></canvas></div>
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
        ownedTargets = new Set(),
        ownedTextures = new Set();
      const ownMesh = (m) => {
        ownedGeometry.add(m.geometry);
        ownedMaterial.add(m.material);
        return m;
      };
      const events = new AbortController();
      let disposed = false;
      const geometry = new THREE.BoxGeometry(1.8, 1.8, 0.5),
        backMaterial = new THREE.MeshBasicMaterial({ color: '#2563eb' }),
        frontMaterial = new THREE.MeshBasicMaterial({ color: '#f97316' });
      const back = ownMesh(new THREE.Mesh(geometry, backMaterial)),
        front = ownMesh(new THREE.Mesh(geometry, frontMaterial));
      back.name = 'back';
      front.name = 'front';
      back.position.set(-0.35, 0, -0.6);
      front.position.set(0.35, 0, 0.6);
      scene.add(back, front);
      const raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      let hits = [],
        selected = null,
        compact = false;
      const canvasRelative = false;
      const nearest = true;
      const clearOnMiss = true;
      function highlight(object) {
        selected = object;
        backMaterial.color.set(object === back ? '#22c55e' : '#2563eb');
        frontMaterial.color.set(object === front ? '#22c55e' : '#f97316');
      }
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          const r = canvasRelative
            ? canvas.getBoundingClientRect()
            : { left: 0, top: 0, width: innerWidth, height: innerHeight };
          pointer.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            1 - ((e.clientY - r.top) / r.height) * 2,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          hits = raycaster.intersectObjects([back, front], false);
          const next = hits.length
            ? (nearest ? hits[0] : hits[hits.length - 1]).object
            : null;
          if (next || clearOnMiss) highlight(next);
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#layout').addEventListener(
        'click',
        () => {
          compact = !compact;
          stage.style.width = compact ? '300px' : '480px';
          stage.style.marginLeft = compact ? '20px' : '0';
          stage.style.maxWidth = compact ? 'calc(100% - 20px)' : '100%';
          resizeScene();
        },
        { signal: events.signal },
      );
      document.querySelector('#clear').addEventListener(
        'click',
        () => {
          highlight(null);
          hits = [];
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'NDC: ' +
          pointer.toArray().map((v) => v.toFixed(3)) +
          ' / hits: ' +
          hits.map((h) => h.object.name + ':' + h.distance.toFixed(3)).join(' → ') +
          ' / selected: ' +
          (selected?.name ?? '없음');
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        report();
      }
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
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        for (const t of ownedTextures) t.dispose();
        ownedTextures.clear();
        for (const t of ownedTargets) t.dispose();
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      document
        .querySelector('#cleanup')
        .addEventListener('click', cleanup, { signal: events.signal });
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- canvasRelative를 true로 바꾸세요.
- 각 클릭마다 새 사각형을 읽습니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

getBoundingClientRect는 현재 canvas의 client 위치와 CSS 크기를 반환합니다. clientX-left를 width로 나눈 뒤 2를 곱하고 1을 빼면 NDC x입니다. y는 위쪽이 +1이므로 1-2*(clientY-top)/height입니다. 버퍼 픽셀 크기나 window 크기와 혼동하지 마세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>캔버스 기준 NDC</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>캔버스 기준 NDC</h1>
    <p>
      겹친 두 상자를 클릭하세요. 앞 물체 front는 z=.6, 뒤 물체 back은
      z=-.6입니다. 배열은 [back,front]이며 교차 결과는 거리순입니다. 중앙과 왼쪽
      위, 여백·너비 변경 후 위치를 비교하세요.
    </p>
    <div class="controls">
      <button id="layout">여백·너비 바꾸기</button
      ><button id="clear">선택 해제</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="캔버스 기준 NDC"></canvas></div>
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
        ownedTargets = new Set(),
        ownedTextures = new Set();
      const ownMesh = (m) => {
        ownedGeometry.add(m.geometry);
        ownedMaterial.add(m.material);
        return m;
      };
      const events = new AbortController();
      let disposed = false;
      const geometry = new THREE.BoxGeometry(1.8, 1.8, 0.5),
        backMaterial = new THREE.MeshBasicMaterial({ color: '#2563eb' }),
        frontMaterial = new THREE.MeshBasicMaterial({ color: '#f97316' });
      const back = ownMesh(new THREE.Mesh(geometry, backMaterial)),
        front = ownMesh(new THREE.Mesh(geometry, frontMaterial));
      back.name = 'back';
      front.name = 'front';
      back.position.set(-0.35, 0, -0.6);
      front.position.set(0.35, 0, 0.6);
      scene.add(back, front);
      const raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      let hits = [],
        selected = null,
        compact = false;
      const canvasRelative = true;
      const nearest = true;
      const clearOnMiss = true;
      function highlight(object) {
        selected = object;
        backMaterial.color.set(object === back ? '#22c55e' : '#2563eb');
        frontMaterial.color.set(object === front ? '#22c55e' : '#f97316');
      }
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          const r = canvasRelative
            ? canvas.getBoundingClientRect()
            : { left: 0, top: 0, width: innerWidth, height: innerHeight };
          pointer.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            1 - ((e.clientY - r.top) / r.height) * 2,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          hits = raycaster.intersectObjects([back, front], false);
          const next = hits.length
            ? (nearest ? hits[0] : hits[hits.length - 1]).object
            : null;
          if (next || clearOnMiss) highlight(next);
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#layout').addEventListener(
        'click',
        () => {
          compact = !compact;
          stage.style.width = compact ? '300px' : '480px';
          stage.style.marginLeft = compact ? '20px' : '0';
          stage.style.maxWidth = compact ? 'calc(100% - 20px)' : '100%';
          resizeScene();
        },
        { signal: events.signal },
      );
      document.querySelector('#clear').addEventListener(
        'click',
        () => {
          highlight(null);
          hits = [];
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'NDC: ' +
          pointer.toArray().map((v) => v.toFixed(3)) +
          ' / hits: ' +
          hits.map((h) => h.object.name + ':' + h.distance.toFixed(3)).join(' → ') +
          ' / selected: ' +
          (selected?.name ?? '없음');
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        report();
      }
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
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        for (const t of ownedTextures) t.dispose();
        ownedTextures.clear();
        for (const t of ownedTargets) t.dispose();
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      document
        .querySelector('#cleanup')
        .addEventListener('click', cleanup, { signal: events.signal });
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

</details>

- DPR이나 페이지 여백이 바뀔 때 canvas.width로 나누면 왜 틀리나요?

### 거리순 결과의 첫 물체 선택하기

객체 입력 배열은 [back,front]입니다. 시작 코드는 hits의 마지막 교차를 고릅니다. nearest=false를 true로 바꾸고 겹친 중앙을 클릭하세요. 출력의 이름·거리를 모두 비교합니다.

**예상 결과**

교차 목록은 front가 back보다 먼저입니다. 선택이 back→front로 바뀝니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>교차 순서와 거리</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>교차 순서와 거리</h1>
    <p>
      겹친 두 상자를 클릭하세요. 앞 물체 front는 z=.6, 뒤 물체 back은
      z=-.6입니다. 배열은 [back,front]이며 교차 결과는 거리순입니다. 중앙과 왼쪽
      위, 여백·너비 변경 후 위치를 비교하세요.
    </p>
    <div class="controls">
      <button id="layout">여백·너비 바꾸기</button
      ><button id="clear">선택 해제</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="교차 순서와 거리"></canvas></div>
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
        ownedTargets = new Set(),
        ownedTextures = new Set();
      const ownMesh = (m) => {
        ownedGeometry.add(m.geometry);
        ownedMaterial.add(m.material);
        return m;
      };
      const events = new AbortController();
      let disposed = false;
      const geometry = new THREE.BoxGeometry(1.8, 1.8, 0.5),
        backMaterial = new THREE.MeshBasicMaterial({ color: '#2563eb' }),
        frontMaterial = new THREE.MeshBasicMaterial({ color: '#f97316' });
      const back = ownMesh(new THREE.Mesh(geometry, backMaterial)),
        front = ownMesh(new THREE.Mesh(geometry, frontMaterial));
      back.name = 'back';
      front.name = 'front';
      back.position.set(-0.35, 0, -0.6);
      front.position.set(0.35, 0, 0.6);
      scene.add(back, front);
      const raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      let hits = [],
        selected = null,
        compact = false;
      const canvasRelative = true;
      const nearest = false;
      const clearOnMiss = true;
      function highlight(object) {
        selected = object;
        backMaterial.color.set(object === back ? '#22c55e' : '#2563eb');
        frontMaterial.color.set(object === front ? '#22c55e' : '#f97316');
      }
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          const r = canvasRelative
            ? canvas.getBoundingClientRect()
            : { left: 0, top: 0, width: innerWidth, height: innerHeight };
          pointer.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            1 - ((e.clientY - r.top) / r.height) * 2,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          hits = raycaster.intersectObjects([back, front], false);
          const next = hits.length
            ? (nearest ? hits[0] : hits[hits.length - 1]).object
            : null;
          if (next || clearOnMiss) highlight(next);
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#layout').addEventListener(
        'click',
        () => {
          compact = !compact;
          stage.style.width = compact ? '300px' : '480px';
          stage.style.marginLeft = compact ? '20px' : '0';
          stage.style.maxWidth = compact ? 'calc(100% - 20px)' : '100%';
          resizeScene();
        },
        { signal: events.signal },
      );
      document.querySelector('#clear').addEventListener(
        'click',
        () => {
          highlight(null);
          hits = [];
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'NDC: ' +
          pointer.toArray().map((v) => v.toFixed(3)) +
          ' / hits: ' +
          hits.map((h) => h.object.name + ':' + h.distance.toFixed(3)).join(' → ') +
          ' / selected: ' +
          (selected?.name ?? '없음');
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        report();
      }
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
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        for (const t of ownedTextures) t.dispose();
        ownedTextures.clear();
        for (const t of ownedTargets) t.dispose();
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      document
        .querySelector('#cleanup')
        .addEventListener('click', cleanup, { signal: events.signal });
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- hits[0].object를 사용하세요.
- 배열을 뒤집는 것으로 고치지 마세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

intersectObjects는 객체 배열 순서가 아니라 광선 시작점부터의 거리순으로 교차를 반환합니다. hits[0]이 가장 가까운 교차입니다. 한 면의 경계에서는 같은 물체의 두 삼각형 교차가 겹쳐 나타날 수 있으므로 교차 수를 물체 수로 해석하지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>교차 순서와 거리</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>교차 순서와 거리</h1>
    <p>
      겹친 두 상자를 클릭하세요. 앞 물체 front는 z=.6, 뒤 물체 back은
      z=-.6입니다. 배열은 [back,front]이며 교차 결과는 거리순입니다. 중앙과 왼쪽
      위, 여백·너비 변경 후 위치를 비교하세요.
    </p>
    <div class="controls">
      <button id="layout">여백·너비 바꾸기</button
      ><button id="clear">선택 해제</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="교차 순서와 거리"></canvas></div>
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
        ownedTargets = new Set(),
        ownedTextures = new Set();
      const ownMesh = (m) => {
        ownedGeometry.add(m.geometry);
        ownedMaterial.add(m.material);
        return m;
      };
      const events = new AbortController();
      let disposed = false;
      const geometry = new THREE.BoxGeometry(1.8, 1.8, 0.5),
        backMaterial = new THREE.MeshBasicMaterial({ color: '#2563eb' }),
        frontMaterial = new THREE.MeshBasicMaterial({ color: '#f97316' });
      const back = ownMesh(new THREE.Mesh(geometry, backMaterial)),
        front = ownMesh(new THREE.Mesh(geometry, frontMaterial));
      back.name = 'back';
      front.name = 'front';
      back.position.set(-0.35, 0, -0.6);
      front.position.set(0.35, 0, 0.6);
      scene.add(back, front);
      const raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      let hits = [],
        selected = null,
        compact = false;
      const canvasRelative = true;
      const nearest = true;
      const clearOnMiss = true;
      function highlight(object) {
        selected = object;
        backMaterial.color.set(object === back ? '#22c55e' : '#2563eb');
        frontMaterial.color.set(object === front ? '#22c55e' : '#f97316');
      }
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          const r = canvasRelative
            ? canvas.getBoundingClientRect()
            : { left: 0, top: 0, width: innerWidth, height: innerHeight };
          pointer.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            1 - ((e.clientY - r.top) / r.height) * 2,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          hits = raycaster.intersectObjects([back, front], false);
          const next = hits.length
            ? (nearest ? hits[0] : hits[hits.length - 1]).object
            : null;
          if (next || clearOnMiss) highlight(next);
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#layout').addEventListener(
        'click',
        () => {
          compact = !compact;
          stage.style.width = compact ? '300px' : '480px';
          stage.style.marginLeft = compact ? '20px' : '0';
          stage.style.maxWidth = compact ? 'calc(100% - 20px)' : '100%';
          resizeScene();
        },
        { signal: events.signal },
      );
      document.querySelector('#clear').addEventListener(
        'click',
        () => {
          highlight(null);
          hits = [];
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'NDC: ' +
          pointer.toArray().map((v) => v.toFixed(3)) +
          ' / hits: ' +
          hits.map((h) => h.object.name + ':' + h.distance.toFixed(3)).join(' → ') +
          ' / selected: ' +
          (selected?.name ?? '없음');
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        report();
      }
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
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        for (const t of ownedTextures) t.dispose();
        ownedTextures.clear();
        for (const t of ownedTargets) t.dispose();
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      document
        .querySelector('#cleanup')
        .addEventListener('click', cleanup, { signal: events.signal });
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

</details>

- recursive=true와 가장 가까운 객체를 고르는 규칙은 어떻게 다른가요?

### 빈 공간에서 선택 해제하기

clearOnMiss=false를 true로 바꾸세요. front를 고른 다음 왼쪽 위 빈 공간을 클릭합니다. 여백·너비를 바꿔 다시 front를 선택하고 선택 해제 버튼도 확인하세요.

**예상 결과**

중앙 클릭은 front·초록색. 빈 공간 클릭은 selected 없음·원래 주황색 복구.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>선택과 빈 공간</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>선택과 빈 공간</h1>
    <p>
      겹친 두 상자를 클릭하세요. 앞 물체 front는 z=.6, 뒤 물체 back은
      z=-.6입니다. 배열은 [back,front]이며 교차 결과는 거리순입니다. 중앙과 왼쪽
      위, 여백·너비 변경 후 위치를 비교하세요.
    </p>
    <div class="controls">
      <button id="layout">여백·너비 바꾸기</button
      ><button id="clear">선택 해제</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="선택과 빈 공간"></canvas></div>
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
        ownedTargets = new Set(),
        ownedTextures = new Set();
      const ownMesh = (m) => {
        ownedGeometry.add(m.geometry);
        ownedMaterial.add(m.material);
        return m;
      };
      const events = new AbortController();
      let disposed = false;
      const geometry = new THREE.BoxGeometry(1.8, 1.8, 0.5),
        backMaterial = new THREE.MeshBasicMaterial({ color: '#2563eb' }),
        frontMaterial = new THREE.MeshBasicMaterial({ color: '#f97316' });
      const back = ownMesh(new THREE.Mesh(geometry, backMaterial)),
        front = ownMesh(new THREE.Mesh(geometry, frontMaterial));
      back.name = 'back';
      front.name = 'front';
      back.position.set(-0.35, 0, -0.6);
      front.position.set(0.35, 0, 0.6);
      scene.add(back, front);
      const raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      let hits = [],
        selected = null,
        compact = false;
      const canvasRelative = true;
      const nearest = true;
      const clearOnMiss = false;
      function highlight(object) {
        selected = object;
        backMaterial.color.set(object === back ? '#22c55e' : '#2563eb');
        frontMaterial.color.set(object === front ? '#22c55e' : '#f97316');
      }
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          const r = canvasRelative
            ? canvas.getBoundingClientRect()
            : { left: 0, top: 0, width: innerWidth, height: innerHeight };
          pointer.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            1 - ((e.clientY - r.top) / r.height) * 2,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          hits = raycaster.intersectObjects([back, front], false);
          const next = hits.length
            ? (nearest ? hits[0] : hits[hits.length - 1]).object
            : null;
          if (next || clearOnMiss) highlight(next);
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#layout').addEventListener(
        'click',
        () => {
          compact = !compact;
          stage.style.width = compact ? '300px' : '480px';
          stage.style.marginLeft = compact ? '20px' : '0';
          stage.style.maxWidth = compact ? 'calc(100% - 20px)' : '100%';
          resizeScene();
        },
        { signal: events.signal },
      );
      document.querySelector('#clear').addEventListener(
        'click',
        () => {
          highlight(null);
          hits = [];
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'NDC: ' +
          pointer.toArray().map((v) => v.toFixed(3)) +
          ' / hits: ' +
          hits.map((h) => h.object.name + ':' + h.distance.toFixed(3)).join(' → ') +
          ' / selected: ' +
          (selected?.name ?? '없음');
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        report();
      }
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
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        for (const t of ownedTextures) t.dispose();
        ownedTextures.clear();
        for (const t of ownedTargets) t.dispose();
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      document
        .querySelector('#cleanup')
        .addEventListener('click', cleanup, { signal: events.signal });
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 교차가 없을 때도 highlight(null)을 호출하세요.
- 재질 공유 여부는 07단원과 연결됩니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

선택은 교차 결과를 제품 상태에 연결하는 규칙입니다. 빈 배열이면 null을 넣고 원래 재질색을 돌려줍니다. 여기서는 각 상자 재질을 따로 소유하므로 선택색이 다른 상자에 전파되지 않습니다. 광선 교차 계산과 강조 상태 갱신을 분리합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>선택과 빈 공간</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>선택과 빈 공간</h1>
    <p>
      겹친 두 상자를 클릭하세요. 앞 물체 front는 z=.6, 뒤 물체 back은
      z=-.6입니다. 배열은 [back,front]이며 교차 결과는 거리순입니다. 중앙과 왼쪽
      위, 여백·너비 변경 후 위치를 비교하세요.
    </p>
    <div class="controls">
      <button id="layout">여백·너비 바꾸기</button
      ><button id="clear">선택 해제</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="선택과 빈 공간"></canvas></div>
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
        ownedTargets = new Set(),
        ownedTextures = new Set();
      const ownMesh = (m) => {
        ownedGeometry.add(m.geometry);
        ownedMaterial.add(m.material);
        return m;
      };
      const events = new AbortController();
      let disposed = false;
      const geometry = new THREE.BoxGeometry(1.8, 1.8, 0.5),
        backMaterial = new THREE.MeshBasicMaterial({ color: '#2563eb' }),
        frontMaterial = new THREE.MeshBasicMaterial({ color: '#f97316' });
      const back = ownMesh(new THREE.Mesh(geometry, backMaterial)),
        front = ownMesh(new THREE.Mesh(geometry, frontMaterial));
      back.name = 'back';
      front.name = 'front';
      back.position.set(-0.35, 0, -0.6);
      front.position.set(0.35, 0, 0.6);
      scene.add(back, front);
      const raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      let hits = [],
        selected = null,
        compact = false;
      const canvasRelative = true;
      const nearest = true;
      const clearOnMiss = true;
      function highlight(object) {
        selected = object;
        backMaterial.color.set(object === back ? '#22c55e' : '#2563eb');
        frontMaterial.color.set(object === front ? '#22c55e' : '#f97316');
      }
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          const r = canvasRelative
            ? canvas.getBoundingClientRect()
            : { left: 0, top: 0, width: innerWidth, height: innerHeight };
          pointer.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            1 - ((e.clientY - r.top) / r.height) * 2,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          hits = raycaster.intersectObjects([back, front], false);
          const next = hits.length
            ? (nearest ? hits[0] : hits[hits.length - 1]).object
            : null;
          if (next || clearOnMiss) highlight(next);
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#layout').addEventListener(
        'click',
        () => {
          compact = !compact;
          stage.style.width = compact ? '300px' : '480px';
          stage.style.marginLeft = compact ? '20px' : '0';
          stage.style.maxWidth = compact ? 'calc(100% - 20px)' : '100%';
          resizeScene();
        },
        { signal: events.signal },
      );
      document.querySelector('#clear').addEventListener(
        'click',
        () => {
          highlight(null);
          hits = [];
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'NDC: ' +
          pointer.toArray().map((v) => v.toFixed(3)) +
          ' / hits: ' +
          hits.map((h) => h.object.name + ':' + h.distance.toFixed(3)).join(' → ') +
          ' / selected: ' +
          (selected?.name ?? '없음');
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        report();
      }
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
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        for (const t of ownedTextures) t.dispose();
        ownedTextures.clear();
        for (const t of ownedTargets) t.dispose();
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      document
        .querySelector('#cleanup')
        .addEventListener('click', cleanup, { signal: events.signal });
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

</details>

- 이전 선택을 유지할지 해제할지는 Raycaster API가 정하나요?

### API · Raycaster.setFromCamera

NDC와 카메라로 광선의 시작점·방향을 갱신합니다.

- `coords: Vector2` — canvas 기준 -1~1, 위쪽 y=1
- `camera: Camera` — 현재 화면을 렌더한 카메라

반환값 없이 내부 ray를 갱신합니다.

- client 좌표에는 현재 getBoundingClientRect를 사용합니다. CSS 크기와 버퍼 크기를 혼동하지 마세요.

```js
const r=canvas.getBoundingClientRect(); pointer.set(2*(e.clientX-r.left)/r.width-1,1-2*(e.clientY-r.top)/r.height); raycaster.setFromCamera(pointer,camera);
```

[Raycaster.setFromCamera](https://threejs.org/docs/pages/Raycaster.html) · three@0.186.1 · 2026-10-27

### API · Raycaster.intersectObjects

가까운 거리부터 정렬한 실제 교차 목록을 읽습니다.

- `objects: Object3D[]` — 교차 검사 대상 배열
- `recursive: boolean` — 자식도 검사할지, 기본 true; 예제 false

object, distance, point 등을 담은 Intersection 배열입니다.

- 중복 삼각형 교차가 있을 수 있습니다. 빈 배열일 때의 선택 규칙은 직접 정합니다.

```js
const hits=raycaster.intersectObjects([back,front],false); highlight(hits[0]?.object??null);
```

[Raycaster.intersectObjects](https://threejs.org/docs/pages/Raycaster.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 그림자 지도](../12/README.md) · [다음: 재질·로딩·선택](../../02-experiments/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
