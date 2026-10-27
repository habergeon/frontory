# Three.js · 09 거칠기와 금속성

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 조명·재질·모델 선택 · 편집 가능한 예제 · 저장 ID: `threejs-step-09`

## 목표와 학습 후 역량

- 왼쪽 .8 유지, 오른쪽 .8→.15. metalness=0과 환경 강도 1은 유지되고 반사 모양이 달라집니다.
- 왼쪽 metalness=0 유지, 오른쪽 0→1. 두 roughness=.8, 환경 강도 1입니다.
- 오른쪽 환경 강도 0→1에서 두 구가 같은 조건이 됩니다. 배경색과 방향광은 그대로입니다.

## 선수 지식

앞선 도형·조명 개념을 복습하세요. 각 HTML 예제는 독립 실행됩니다.

## 핵심 개념과 설명

### 거칠기

roughness는 미세 표면에 의한 반사 퍼짐을 조절합니다. 낮은 값은 선명한 하이라이트를 만들기 쉽습니다.

### 금속성

metalness는 금속과 비금속의 반응을 구분합니다. 환경 반사가 부족하면 금속이 기대보다 어둡게 보일 수 있습니다.

## 실습 준비

사이트에서 독립 HTML을 편집하고 실행합니다. three@0.186.1을 사이트가 공급하므로 설치나 외부 서버가 필요 없습니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 거칠기만 바꾸어 비교하기 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.
2. 금속성만 바꾸어 비교하기 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.
3. 환경 조명과 배경 구별하기 단계에서 시작 코드와 완성 코드를 비교하고 실제 수치와 그림을 필기에 기록하세요.

## 관찰할 변수

| 변수      | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                |
| --------- | --------- | --------- | ------------------------------------ |
| roughness | 0.1       | 0.8       | 반사 하이라이트가 더 넓고 흐려집니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 왼쪽 .8 유지, 오른쪽 .8→.15. metalness=0과 환경 강도 1은 유지되고 반사 모양이 달라집니다.
- [ ] 왼쪽 metalness=0 유지, 오른쪽 0→1. 두 roughness=.8, 환경 강도 1입니다.
- [ ] 오른쪽 환경 강도 0→1에서 두 구가 같은 조건이 됩니다. 배경색과 방향광은 그대로입니다.

## 자가 점검

1. 금속성 1이 단순히 더 반짝임을 뜻하나요?
2. 환경맵 없는 금속을 어떻게 해석해야 하나요?

## 공식 참고

- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-09/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-09/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

왼쪽 구를 기준으로 두고 오른쪽 구의 변수 하나만 바꿉니다. 카메라, 조명, 색, 도형은 같습니다. 환경 맵은 코드 안의 작은 방에서 만들므로 외부 HDR 파일이 필요 없습니다.

### 선수 단원

- `threejs-step-07`
- `threejs-step-08`

### 거칠기만 바꾸어 비교하기

두 구는 처음 roughness=.8, metalness=0, envMapIntensity=1입니다. 오른쪽의 roughness 상수를 .15로 바꾸세요. 왼쪽의 넓고 흐린 반사와 오른쪽의 좁고 선명한 반사를 비교합니다. HTML 입력도 오른쪽 거칠기만 바꿉니다.

**예상 결과**

왼쪽 .8 유지, 오른쪽 .8→.15. metalness=0과 환경 강도 1은 유지되고 반사 모양이 달라집니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>거칠기만 바꾸어 비교하기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>거칠기만 바꾸어 비교하기</h1>
    <div class="controls">
      <label
        >재질 값
        <input
          id="value"
          type="number"
          min="0"
          max="1"
          step="0.01"
          value="0.8" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="거칠기만 바꾸어 비교하기"></canvas>
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
      const room = new THREE.Scene();
      room.background = new THREE.Color('#404c70');
      for (const [x, y, z, color] of [
        [-3, 2, 0, '#ffffff'],
        [3, 0, 0, '#ffad70'],
        [0, -3, -2, '#3070ff'],
      ]) {
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 2, 1.8),
          new THREE.MeshBasicMaterial({ color }),
        );
        panel.position.set(x, y, z);
        room.add(panel);
      }
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentTarget = pmrem.fromScene(room, 0, 0.1, 20, { size: 64 });
      ownedTargets.add(environmentTarget);
      pmrem.dispose();
      for (const panel of room.children) {
        panel.geometry.dispose();
        panel.material.dispose();
      }
      room.clear();
      scene.environment = environmentTarget.texture;
      const geometry = new THREE.SphereGeometry(0.8, 32, 20);
      const reference = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 0.8,
        metalness: 0,
        envMapIntensity: 1,
        envMap: environmentTarget.texture,
      });
      const material = reference.clone();
      const roughness = 0.8;
      const metalness = 0;
      const environment = 1;
      material.roughness = roughness;
      material.metalness = metalness;
      material.envMapIntensity = environment;
      const a = ownMesh(new THREE.Mesh(geometry, reference)),
        b = ownMesh(new THREE.Mesh(geometry, material));
      a.position.x = -1;
      b.position.x = 1;
      scene.add(a, b);
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          '왼쪽 기준 roughness/metalness/환경: ' +
          [reference.roughness, reference.metalness, reference.envMapIntensity] +
          ' / 오른쪽: ' +
          [material.roughness, material.metalness, material.envMapIntensity] +
          ' / 환경: ' +
          (scene.environment === environmentTarget.texture) +
          ' / PMREM: ' +
          environmentTarget.width +
          ' × ' +
          environmentTarget.height +
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
          material.roughness = Number(input.value);
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

- material.roughness에 넣는 상수를 찾으세요.
- metalness는 0으로 유지하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

roughness는 0~1 범위에서 표면 반사의 퍼짐을 바꿉니다. 색이나 광원의 강도를 바꾸는 값이 아닙니다. PMREM은 거칠기에 맞는 환경 반사를 계산할 수 있게 미리 필터링합니다. 구를 더 매끈하게 보이게 해도 geometry 분할 수는 그대로입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>거칠기만 바꾸어 비교하기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>거칠기만 바꾸어 비교하기</h1>
    <div class="controls">
      <label
        >재질 값
        <input
          id="value"
          type="number"
          min="0"
          max="1"
          step="0.01"
          value="0.15" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="거칠기만 바꾸어 비교하기"></canvas>
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
      const room = new THREE.Scene();
      room.background = new THREE.Color('#404c70');
      for (const [x, y, z, color] of [
        [-3, 2, 0, '#ffffff'],
        [3, 0, 0, '#ffad70'],
        [0, -3, -2, '#3070ff'],
      ]) {
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 2, 1.8),
          new THREE.MeshBasicMaterial({ color }),
        );
        panel.position.set(x, y, z);
        room.add(panel);
      }
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentTarget = pmrem.fromScene(room, 0, 0.1, 20, { size: 64 });
      ownedTargets.add(environmentTarget);
      pmrem.dispose();
      for (const panel of room.children) {
        panel.geometry.dispose();
        panel.material.dispose();
      }
      room.clear();
      scene.environment = environmentTarget.texture;
      const geometry = new THREE.SphereGeometry(0.8, 32, 20);
      const reference = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 0.8,
        metalness: 0,
        envMapIntensity: 1,
        envMap: environmentTarget.texture,
      });
      const material = reference.clone();
      const roughness = 0.15;
      const metalness = 0;
      const environment = 1;
      material.roughness = roughness;
      material.metalness = metalness;
      material.envMapIntensity = environment;
      const a = ownMesh(new THREE.Mesh(geometry, reference)),
        b = ownMesh(new THREE.Mesh(geometry, material));
      a.position.x = -1;
      b.position.x = 1;
      scene.add(a, b);
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          '왼쪽 기준 roughness/metalness/환경: ' +
          [reference.roughness, reference.metalness, reference.envMapIntensity] +
          ' / 오른쪽: ' +
          [material.roughness, material.metalness, material.envMapIntensity] +
          ' / 환경: ' +
          (scene.environment === environmentTarget.texture) +
          ' / PMREM: ' +
          environmentTarget.width +
          ' × ' +
          environmentTarget.height +
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
          material.roughness = Number(input.value);
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

- 거칠기와 구의 삼각형 수는 같은 개념인가요?

### 금속성만 바꾸어 비교하기

roughness=.8과 환경 강도 1을 고정합니다. 오른쪽 metalness=0을 1로 바꾸세요. 왼쪽 비금속과 오른쪽 금속의 반사색을 비교합니다. 색은 같은 #b98245이며 금속의 표면 반사에 이 색이 반영됩니다.

**예상 결과**

왼쪽 metalness=0 유지, 오른쪽 0→1. 두 roughness=.8, 환경 강도 1입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>금속성만 바꾸어 비교하기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>금속성만 바꾸어 비교하기</h1>
    <div class="controls">
      <label
        >재질 값
        <input
          id="value"
          type="number"
          min="0"
          max="1"
          step="0.1"
          value="0" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="금속성만 바꾸어 비교하기"></canvas>
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
      const room = new THREE.Scene();
      room.background = new THREE.Color('#404c70');
      for (const [x, y, z, color] of [
        [-3, 2, 0, '#ffffff'],
        [3, 0, 0, '#ffad70'],
        [0, -3, -2, '#3070ff'],
      ]) {
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 2, 1.8),
          new THREE.MeshBasicMaterial({ color }),
        );
        panel.position.set(x, y, z);
        room.add(panel);
      }
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentTarget = pmrem.fromScene(room, 0, 0.1, 20, { size: 64 });
      ownedTargets.add(environmentTarget);
      pmrem.dispose();
      for (const panel of room.children) {
        panel.geometry.dispose();
        panel.material.dispose();
      }
      room.clear();
      scene.environment = environmentTarget.texture;
      const geometry = new THREE.SphereGeometry(0.8, 32, 20);
      const reference = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 0.8,
        metalness: 0,
        envMapIntensity: 1,
        envMap: environmentTarget.texture,
      });
      const material = reference.clone();
      const roughness = 0.8;
      const metalness = 0;
      const environment = 1;
      material.roughness = roughness;
      material.metalness = metalness;
      material.envMapIntensity = environment;
      const a = ownMesh(new THREE.Mesh(geometry, reference)),
        b = ownMesh(new THREE.Mesh(geometry, material));
      a.position.x = -1;
      b.position.x = 1;
      scene.add(a, b);
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          '왼쪽 기준 roughness/metalness/환경: ' +
          [reference.roughness, reference.metalness, reference.envMapIntensity] +
          ' / 오른쪽: ' +
          [material.roughness, material.metalness, material.envMapIntensity] +
          ' / 환경: ' +
          (scene.environment === environmentTarget.texture) +
          ' / PMREM: ' +
          environmentTarget.width +
          ' × ' +
          environmentTarget.height +
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
          material.metalness = Number(input.value);
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

- metalness만 바꾸세요.
- 두 구의 roughness가 같은지 output으로 확인하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

metalness는 0이 비금속, 1이 금속입니다. 중간값은 혼합 표면 표현에 쓸 수 있습니다. 금속은 비금속처럼 확산광을 더하는 방식으로 밝아지지 않습니다. 밝기만 보고 금속성을 판단하지 말고 고정된 환경 반사와 색을 같이 관찰하세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>금속성만 바꾸어 비교하기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>금속성만 바꾸어 비교하기</h1>
    <div class="controls">
      <label
        >재질 값
        <input
          id="value"
          type="number"
          min="0"
          max="1"
          step="0.1"
          value="1" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="금속성만 바꾸어 비교하기"></canvas>
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
      const room = new THREE.Scene();
      room.background = new THREE.Color('#404c70');
      for (const [x, y, z, color] of [
        [-3, 2, 0, '#ffffff'],
        [3, 0, 0, '#ffad70'],
        [0, -3, -2, '#3070ff'],
      ]) {
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 2, 1.8),
          new THREE.MeshBasicMaterial({ color }),
        );
        panel.position.set(x, y, z);
        room.add(panel);
      }
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentTarget = pmrem.fromScene(room, 0, 0.1, 20, { size: 64 });
      ownedTargets.add(environmentTarget);
      pmrem.dispose();
      for (const panel of room.children) {
        panel.geometry.dispose();
        panel.material.dispose();
      }
      room.clear();
      scene.environment = environmentTarget.texture;
      const geometry = new THREE.SphereGeometry(0.8, 32, 20);
      const reference = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 0.8,
        metalness: 0,
        envMapIntensity: 1,
        envMap: environmentTarget.texture,
      });
      const material = reference.clone();
      const roughness = 0.8;
      const metalness = 1;
      const environment = 1;
      material.roughness = roughness;
      material.metalness = metalness;
      material.envMapIntensity = environment;
      const a = ownMesh(new THREE.Mesh(geometry, reference)),
        b = ownMesh(new THREE.Mesh(geometry, material));
      a.position.x = -1;
      b.position.x = 1;
      scene.add(a, b);
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          '왼쪽 기준 roughness/metalness/환경: ' +
          [reference.roughness, reference.metalness, reference.envMapIntensity] +
          ' / 오른쪽: ' +
          [material.roughness, material.metalness, material.envMapIntensity] +
          ' / 환경: ' +
          (scene.environment === environmentTarget.texture) +
          ' / PMREM: ' +
          environmentTarget.width +
          ' × ' +
          environmentTarget.height +
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
          material.metalness = Number(input.value);
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

- 금속을 어둡게 보이게 하는 원인에는 무엇이 있나요?

### 환경 조명과 배경 구별하기

두 구는 roughness=.8, metalness=0이며 같은 PMREM texture를 각 material.envMap에 연결했습니다. 오른쪽 envMapIntensity는 0입니다. environment 상수를 1로 바꿔 왼쪽과 맞추세요. 배경은 #edf2f7 그대로이며 환경 조명과 별개입니다.

**예상 결과**

오른쪽 환경 강도 0→1에서 두 구가 같은 조건이 됩니다. 배경색과 방향광은 그대로입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>환경 조명과 배경 구별하기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>환경 조명과 배경 구별하기</h1>
    <div class="controls">
      <label
        >재질 값
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.1"
          value="0" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="환경 조명과 배경 구별하기"></canvas>
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
      const room = new THREE.Scene();
      room.background = new THREE.Color('#404c70');
      for (const [x, y, z, color] of [
        [-3, 2, 0, '#ffffff'],
        [3, 0, 0, '#ffad70'],
        [0, -3, -2, '#3070ff'],
      ]) {
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 2, 1.8),
          new THREE.MeshBasicMaterial({ color }),
        );
        panel.position.set(x, y, z);
        room.add(panel);
      }
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentTarget = pmrem.fromScene(room, 0, 0.1, 20, { size: 64 });
      ownedTargets.add(environmentTarget);
      pmrem.dispose();
      for (const panel of room.children) {
        panel.geometry.dispose();
        panel.material.dispose();
      }
      room.clear();
      scene.environment = environmentTarget.texture;
      const geometry = new THREE.SphereGeometry(0.8, 32, 20);
      const reference = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 0.8,
        metalness: 0,
        envMapIntensity: 1,
        envMap: environmentTarget.texture,
      });
      const material = reference.clone();
      const roughness = 0.8;
      const metalness = 0;
      const environment = 0;
      material.roughness = roughness;
      material.metalness = metalness;
      material.envMapIntensity = environment;
      const a = ownMesh(new THREE.Mesh(geometry, reference)),
        b = ownMesh(new THREE.Mesh(geometry, material));
      a.position.x = -1;
      b.position.x = 1;
      scene.add(a, b);
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          '왼쪽 기준 roughness/metalness/환경: ' +
          [reference.roughness, reference.metalness, reference.envMapIntensity] +
          ' / 오른쪽: ' +
          [material.roughness, material.metalness, material.envMapIntensity] +
          ' / 환경: ' +
          (scene.environment === environmentTarget.texture) +
          ' / PMREM: ' +
          environmentTarget.width +
          ' × ' +
          environmentTarget.height +
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
          material.envMapIntensity = Number(input.value);
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

- environment 상수를 1로 바꾸세요.
- scene.background는 건드리지 마세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

scene.environment는 envMap이 없는 표준 재질의 기본 환경을 공급하며 scene.environmentIntensity로 강도를 조절합니다. 여기서는 양 재질의 envMap을 명시해 오른쪽 material.envMapIntensity만 바꿉니다. PMREMGenerator.fromScene은 별도 장면을 캡처합니다. 생성기는 생성 직후 정리하고 공유한 반환 target은 마지막에 한 번 정리합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>환경 조명과 배경 구별하기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>환경 조명과 배경 구별하기</h1>
    <div class="controls">
      <label
        >재질 값
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.1"
          value="1" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="환경 조명과 배경 구별하기"></canvas>
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
      const room = new THREE.Scene();
      room.background = new THREE.Color('#404c70');
      for (const [x, y, z, color] of [
        [-3, 2, 0, '#ffffff'],
        [3, 0, 0, '#ffad70'],
        [0, -3, -2, '#3070ff'],
      ]) {
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 2, 1.8),
          new THREE.MeshBasicMaterial({ color }),
        );
        panel.position.set(x, y, z);
        room.add(panel);
      }
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentTarget = pmrem.fromScene(room, 0, 0.1, 20, { size: 64 });
      ownedTargets.add(environmentTarget);
      pmrem.dispose();
      for (const panel of room.children) {
        panel.geometry.dispose();
        panel.material.dispose();
      }
      room.clear();
      scene.environment = environmentTarget.texture;
      const geometry = new THREE.SphereGeometry(0.8, 32, 20);
      const reference = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 0.8,
        metalness: 0,
        envMapIntensity: 1,
        envMap: environmentTarget.texture,
      });
      const material = reference.clone();
      const roughness = 0.8;
      const metalness = 0;
      const environment = 1;
      material.roughness = roughness;
      material.metalness = metalness;
      material.envMapIntensity = environment;
      const a = ownMesh(new THREE.Mesh(geometry, reference)),
        b = ownMesh(new THREE.Mesh(geometry, material));
      a.position.x = -1;
      b.position.x = 1;
      scene.add(a, b);
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          '왼쪽 기준 roughness/metalness/환경: ' +
          [reference.roughness, reference.metalness, reference.envMapIntensity] +
          ' / 오른쪽: ' +
          [material.roughness, material.metalness, material.envMapIntensity] +
          ' / 환경: ' +
          (scene.environment === environmentTarget.texture) +
          ' / PMREM: ' +
          environmentTarget.width +
          ' × ' +
          environmentTarget.height +
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
          material.envMapIntensity = Number(input.value);
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

- 환경 맵과 화면 배경의 역할은 어떻게 다른가요?

### API · MeshStandardMaterial

roughness와 metalness로 물리 기반 표면을 표현합니다.

- `roughness: number` — 0~1, 반사의 퍼짐 (1)
- `metalness: number` — 0 비금속, 1 금속 (0)
- `envMapIntensity: number` — 재질에 적용하는 환경 맵 강도 (1)

새 표준 재질입니다.

- material.envMap이 없고 scene.environment를 쓰면 scene.environmentIntensity가 적용됩니다. 이 예제는 같은 envMap을 양 재질에 명시합니다.

```js
const material=new THREE.MeshStandardMaterial({roughness:.8,metalness:0});
```

[MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html) · three@three@0.186.1 · 2026-10-27

### API · PMREMGenerator.fromScene

별도 장면을 캡처하고 거칠기별 환경 반사를 위해 필터링합니다.

- `scene: Scene` — 캡처할 별도 장면
- `sigma: number` — 추가 흐림 반경, rad (0)

texture를 담은 WebGLRenderTarget을 반환합니다.

- 생성기와 반환 target은 각각 수명에 맞춰 dispose하세요.

```js
const target=pmrem.fromScene(room,0,.1,20,{size:64}); scene.environment=target.texture;
```

[PMREMGenerator.fromScene](https://threejs.org/docs/pages/PMREMGenerator.html) · three@three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 조명 종류와 배치](../08/README.md) · [다음: 텍스처와 UV](../10/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
