# Three.js · 10 텍스처와 UV

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 조명·재질·모델 선택 · 편집 가능한 예제 · 저장 ID: `threejs-step-10`

## 목표와 학습 후 역량

- UV와 world 좌표를 구별한다.
- 실패한 텍스처 URL을 오류 UI로 알린다.

## 선수 지식

선수 단원: 05, 09. 앞 단원의 개념을 이어서 실험합니다.

## 핵심 개념과 설명

### UV 매핑

UV는 정점과 이미지 위치를 연결합니다. geometry를 늘리면 텍스처도 함께 늘어날 수 있습니다.

### 반복 설정

repeat만 바꾸어도 wrapping 설정이 맞지 않으면 반복되지 않습니다. 원본 텍스처 크기와 표면 비율을 함께 고려합니다.

## 실습 준비

사이트에서 HTML을 편집하고 실행합니다. Three.js 0.186.1을 제공하며 별도 설치나 외부 서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 평면의 world 너비는 3.6입니다. uvScale=1을 .5로 바꾸고 적용하세요. U 범위 입력도 .5로 맞춰 이미지 왼쪽 절반이 평면 전체를 덮는지 확인합니다. 물체의 position이나 scale은 바꾸지 마세요.
2. repeat 입력은 4,2인데 시작 코드는 ClampToEdgeWrapping입니다. RepeatWrapping을 켜고 적용하세요. 반복 횟수만으로 패턴이 반복되지 않는 상태와 가로 네 번·세로 두 번 반복되는 상태를 비교합니다.
3. 시작 코드는 손상된 data PNG를 읽어 오류를 표시합니다. loadImage(invalid)를 loadImage(sample)로 바꾸세요. PNG와 JPEG를 직접 선택한 뒤 손상 이미지 시험, 샘플 복구를 차례로 누르세요.

## 관찰할 변수

| 변수   | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                                |
| ------ | --------- | --------- | ---------------------------------------------------- |
| repeat | 1,1       | 4,2       | 표면 위 체크 패턴이 가로 네 번 세로 두 번 반복됩니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] UV와 world 좌표를 구별한다.
- [ ] 실패한 텍스처 URL을 오류 UI로 알린다.

## 자가 점검

1. 반복 설정을 바꿔도 모서리 색만 늘어나는 이유는 무엇인가요?
2. normal map과 색 이미지의 역할은 어떻게 다른가요?

## 공식 참고

- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)
- [Three.js Color Management](https://threejs.org/manual/pages/color-management.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-10/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-10/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

UV는 이미지 위치를 정점에 연결하고 world 좌표는 물체의 배치를 나타냅니다. 직접 만든 8×8 PNG와 실제 TextureLoader로 두 좌표, 반복 설정, 파일 오류 복구를 따로 실험합니다.

### 선수 단원

- `threejs-step-05`
- `threejs-step-09`

### UV 범위만 줄이기

평면의 world 너비는 3.6입니다. uvScale=1을 .5로 바꾸고 적용하세요. U 범위 입력도 .5로 맞춰 이미지 왼쪽 절반이 평면 전체를 덮는지 확인합니다. 물체의 position이나 scale은 바꾸지 마세요.

**예상 결과**

UV의 U 최댓값 1→.5, world 너비 3.6 유지. 파란색·노란색 영역만 평면을 채웁니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>UV와 world 좌표</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>UV와 world 좌표</h1>
    <p>
      직접 만든 8×8 사분면 PNG를 사용합니다. 선택한 파일은 실행 중에만 사용하며
      백업에 포함하지 않습니다. 다시 실행하거나 새로고침하면 샘플로 시작하므로
      파일을 다시 선택하세요.
    </p>
    <div class="controls">
      <label
        >U 범위
        <input
          id="value"
          type="number"
          min="0.25"
          max="1"
          step="0.25"
          value="1" /></label
      ><button id="apply">적용</button
      ><label
        >PNG/JPEG 선택
        <input id="file" type="file" accept="image/png,image/jpeg" /></label
      ><button id="sample">샘플 복구</button
      ><button id="invalid">손상 이미지 시험</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="UV와 world 좌표"></canvas></div>
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
      const sample =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVR4nGNQTX79Hxn/LBZDwQx0UPDrjOh/ZKx0NA4F00EBAIGeoRHacAfoAAAAAElFTkSuQmCC',
        invalid = 'data:image/png;base64,YnJva2Vu';
      const geometry = new THREE.PlaneGeometry(3.6, 2.4),
        material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const uvScale = 1;
      const uv = geometry.getAttribute('uv');
      for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * uvScale);
      uv.needsUpdate = true;
      let status = 'loading',
        current = null,
        request = 0;
      const urls = new Set();
      function release(texture) {
        if (ownedTextures.delete(texture)) texture.dispose();
      }
      function revoke(url) {
        if (urls.delete(url)) URL.revokeObjectURL(url);
      }
      function configure(texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.needsUpdate = true;
      }
      function loadImage(url) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        const texture = new THREE.TextureLoader().load(
          url,
          (loaded) => {
            revoke(url);
            if (disposed || token !== request) {
              release(loaded);
              return;
            }
            configure(loaded);
            const previous = current;
            current = loaded;
            material.map = loaded;
            material.needsUpdate = true;
            if (previous) release(previous);
            status = 'ready';
            draw();
          },
          undefined,
          () => {
            revoke(url);
            release(texture);
            if (disposed || token !== request) return;
            status = 'error';
            error.textContent =
              '이미지를 읽지 못했습니다. PNG/JPEG를 다시 선택하거나 샘플 복구를 누르세요.';
            draw();
          },
        );
        ownedTextures.add(texture);
        draw();
      }
      document.querySelector('#file').addEventListener(
        'change',
        (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const url = URL.createObjectURL(file);
          urls.add(url);
          loadImage(url);
        },
        { signal: events.signal },
      );
      document.querySelector('#sample').addEventListener(
        'click',
        () => {
          document.querySelector('#file').value = '';
          loadImage(sample);
        },
        { signal: events.signal },
      );
      document
        .querySelector('#invalid')
        .addEventListener('click', () => loadImage(invalid), {
          signal: events.signal,
        });
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (!input.value || !input.checkValidity()) return;
          for (let i = 0; i < uv.count; i++)
            uv.setX(i, (i % 2) * Number(input.value));
          uv.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      loadImage(sample);
      function report() {
        output.textContent =
          '상태: ' +
          status +
          ' / UV: ' +
          Array.from(uv.array).join(',') +
          ' / world width: ' +
          geometry.parameters.width * mesh.scale.x +
          ' / repeat: ' +
          (current ? current.repeat.toArray() : '—') +
          ' / wrap: ' +
          (current ? current.wrapS : '—') +
          ' / image: ' +
          (current ? current.image.width + '×' + current.image.height : '—');
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
        request++;
        for (const url of urls) URL.revokeObjectURL(url);
        urls.clear();
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

- uvScale 상수를 .5로 바꾸세요.
- geometry position 대신 uv를 읽습니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

UV는 이미지의 가로 U, 세로 V 위치이며 보통 0~1로 씁니다. U를 절반으로 줄이면 같은 world 표면에 이미지 왼쪽 절반만 표시됩니다. 정점 위치와 UV attribute는 서로 다른 배열입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>UV와 world 좌표</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>UV와 world 좌표</h1>
    <p>
      직접 만든 8×8 사분면 PNG를 사용합니다. 선택한 파일은 실행 중에만 사용하며
      백업에 포함하지 않습니다. 다시 실행하거나 새로고침하면 샘플로 시작하므로
      파일을 다시 선택하세요.
    </p>
    <div class="controls">
      <label
        >U 범위
        <input
          id="value"
          type="number"
          min="0.25"
          max="1"
          step="0.25"
          value="0.5" /></label
      ><button id="apply">적용</button
      ><label
        >PNG/JPEG 선택
        <input id="file" type="file" accept="image/png,image/jpeg" /></label
      ><button id="sample">샘플 복구</button
      ><button id="invalid">손상 이미지 시험</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="UV와 world 좌표"></canvas></div>
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
      const sample =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVR4nGNQTX79Hxn/LBZDwQx0UPDrjOh/ZKx0NA4F00EBAIGeoRHacAfoAAAAAElFTkSuQmCC',
        invalid = 'data:image/png;base64,YnJva2Vu';
      const geometry = new THREE.PlaneGeometry(3.6, 2.4),
        material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const uvScale = 0.5;
      const uv = geometry.getAttribute('uv');
      for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * uvScale);
      uv.needsUpdate = true;
      let status = 'loading',
        current = null,
        request = 0;
      const urls = new Set();
      function release(texture) {
        if (ownedTextures.delete(texture)) texture.dispose();
      }
      function revoke(url) {
        if (urls.delete(url)) URL.revokeObjectURL(url);
      }
      function configure(texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.needsUpdate = true;
      }
      function loadImage(url) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        const texture = new THREE.TextureLoader().load(
          url,
          (loaded) => {
            revoke(url);
            if (disposed || token !== request) {
              release(loaded);
              return;
            }
            configure(loaded);
            const previous = current;
            current = loaded;
            material.map = loaded;
            material.needsUpdate = true;
            if (previous) release(previous);
            status = 'ready';
            draw();
          },
          undefined,
          () => {
            revoke(url);
            release(texture);
            if (disposed || token !== request) return;
            status = 'error';
            error.textContent =
              '이미지를 읽지 못했습니다. PNG/JPEG를 다시 선택하거나 샘플 복구를 누르세요.';
            draw();
          },
        );
        ownedTextures.add(texture);
        draw();
      }
      document.querySelector('#file').addEventListener(
        'change',
        (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const url = URL.createObjectURL(file);
          urls.add(url);
          loadImage(url);
        },
        { signal: events.signal },
      );
      document.querySelector('#sample').addEventListener(
        'click',
        () => {
          document.querySelector('#file').value = '';
          loadImage(sample);
        },
        { signal: events.signal },
      );
      document
        .querySelector('#invalid')
        .addEventListener('click', () => loadImage(invalid), {
          signal: events.signal,
        });
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (!input.value || !input.checkValidity()) return;
          for (let i = 0; i < uv.count; i++)
            uv.setX(i, (i % 2) * Number(input.value));
          uv.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      loadImage(sample);
      function report() {
        output.textContent =
          '상태: ' +
          status +
          ' / UV: ' +
          Array.from(uv.array).join(',') +
          ' / world width: ' +
          geometry.parameters.width * mesh.scale.x +
          ' / repeat: ' +
          (current ? current.repeat.toArray() : '—') +
          ' / wrap: ' +
          (current ? current.wrapS : '—') +
          ' / image: ' +
          (current ? current.image.width + '×' + current.image.height : '—');
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
        request++;
        for (const url of urls) URL.revokeObjectURL(url);
        urls.clear();
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

- UV와 world 좌표가 각각 무엇을 바꾸나요?

### 반복 횟수와 wrap 연결하기

repeat 입력은 4,2인데 시작 코드는 ClampToEdgeWrapping입니다. RepeatWrapping을 켜고 적용하세요. 반복 횟수만으로 패턴이 반복되지 않는 상태와 가로 네 번·세로 두 번 반복되는 상태를 비교합니다.

**예상 결과**

repeat=[4,2] 유지, 양축 clamp→repeat. 모서리 색 늘어짐이 4×2 사분면 타일로 바뀝니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>반복과 경계 처리</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>반복과 경계 처리</h1>
    <p>
      직접 만든 8×8 사분면 PNG를 사용합니다. 선택한 파일은 실행 중에만 사용하며
      백업에 포함하지 않습니다. 다시 실행하거나 새로고침하면 샘플로 시작하므로
      파일을 다시 선택하세요.
    </p>
    <div class="controls">
      <label
        >repeat X
        <input
          id="repeatX"
          type="number"
          min="1"
          max="8"
          step="1"
          value="4" /></label
      ><label
        >repeat Y
        <input
          id="repeatY"
          type="number"
          min="1"
          max="8"
          step="1"
          value="2" /></label
      ><label><input id="wrap" type="checkbox" />RepeatWrapping</label
      ><button id="apply">적용</button
      ><label
        >PNG/JPEG 선택
        <input id="file" type="file" accept="image/png,image/jpeg" /></label
      ><button id="sample">샘플 복구</button
      ><button id="invalid">손상 이미지 시험</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="반복과 경계 처리"></canvas></div>
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
      const sample =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVR4nGNQTX79Hxn/LBZDwQx0UPDrjOh/ZKx0NA4F00EBAIGeoRHacAfoAAAAAElFTkSuQmCC',
        invalid = 'data:image/png;base64,YnJva2Vu';
      const geometry = new THREE.PlaneGeometry(3.6, 2.4),
        material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const uvScale = 1;
      const uv = geometry.getAttribute('uv');
      for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * uvScale);
      uv.needsUpdate = true;
      let status = 'loading',
        current = null,
        request = 0;
      const urls = new Set();
      function release(texture) {
        if (ownedTextures.delete(texture)) texture.dispose();
      }
      function revoke(url) {
        if (urls.delete(url)) URL.revokeObjectURL(url);
      }
      function configure(texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.wrapS = texture.wrapT = document.querySelector('#wrap').checked
          ? THREE.RepeatWrapping
          : THREE.ClampToEdgeWrapping;
        texture.repeat.set(
          Number(document.querySelector('#repeatX').value),
          Number(document.querySelector('#repeatY').value),
        );
        texture.needsUpdate = true;
      }
      function loadImage(url) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        const texture = new THREE.TextureLoader().load(
          url,
          (loaded) => {
            revoke(url);
            if (disposed || token !== request) {
              release(loaded);
              return;
            }
            configure(loaded);
            const previous = current;
            current = loaded;
            material.map = loaded;
            material.needsUpdate = true;
            if (previous) release(previous);
            status = 'ready';
            draw();
          },
          undefined,
          () => {
            revoke(url);
            release(texture);
            if (disposed || token !== request) return;
            status = 'error';
            error.textContent =
              '이미지를 읽지 못했습니다. PNG/JPEG를 다시 선택하거나 샘플 복구를 누르세요.';
            draw();
          },
        );
        ownedTextures.add(texture);
        draw();
      }
      document.querySelector('#file').addEventListener(
        'change',
        (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const url = URL.createObjectURL(file);
          urls.add(url);
          loadImage(url);
        },
        { signal: events.signal },
      );
      document.querySelector('#sample').addEventListener(
        'click',
        () => {
          document.querySelector('#file').value = '';
          loadImage(sample);
        },
        { signal: events.signal },
      );
      document
        .querySelector('#invalid')
        .addEventListener('click', () => loadImage(invalid), {
          signal: events.signal,
        });
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          if (
            ![...document.querySelectorAll('input[type=number]')].every(
              (i) => i.value && i.checkValidity(),
            )
          )
            return;
          if (current) configure(current);
          draw();
        },
        { signal: events.signal },
      );
      loadImage(sample);
      function report() {
        output.textContent =
          '상태: ' +
          status +
          ' / UV: ' +
          Array.from(uv.array).join(',') +
          ' / world width: ' +
          geometry.parameters.width * mesh.scale.x +
          ' / repeat: ' +
          (current ? current.repeat.toArray() : '—') +
          ' / wrap: ' +
          (current ? current.wrapS : '—') +
          ' / image: ' +
          (current ? current.image.width + '×' + current.image.height : '—');
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
        request++;
        for (const url of urls) URL.revokeObjectURL(url);
        urls.clear();
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

- RepeatWrapping 체크박스를 켜세요.
- wrapS와 wrapT를 함께 확인하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

repeat는 UV를 곱하는 값입니다. wrapS와 wrapT는 0~1 밖의 좌표를 어떻게 읽을지 정합니다. clamp는 모서리 색을 늘리고 RepeatWrapping은 이미지를 반복합니다. 이미 업로드한 텍스처의 wrap 변경 후 needsUpdate를 설정합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>반복과 경계 처리</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>반복과 경계 처리</h1>
    <p>
      직접 만든 8×8 사분면 PNG를 사용합니다. 선택한 파일은 실행 중에만 사용하며
      백업에 포함하지 않습니다. 다시 실행하거나 새로고침하면 샘플로 시작하므로
      파일을 다시 선택하세요.
    </p>
    <div class="controls">
      <label
        >repeat X
        <input
          id="repeatX"
          type="number"
          min="1"
          max="8"
          step="1"
          value="4" /></label
      ><label
        >repeat Y
        <input
          id="repeatY"
          type="number"
          min="1"
          max="8"
          step="1"
          value="2" /></label
      ><label><input id="wrap" type="checkbox" checked />RepeatWrapping</label
      ><button id="apply">적용</button
      ><label
        >PNG/JPEG 선택
        <input id="file" type="file" accept="image/png,image/jpeg" /></label
      ><button id="sample">샘플 복구</button
      ><button id="invalid">손상 이미지 시험</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="반복과 경계 처리"></canvas></div>
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
      const sample =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVR4nGNQTX79Hxn/LBZDwQx0UPDrjOh/ZKx0NA4F00EBAIGeoRHacAfoAAAAAElFTkSuQmCC',
        invalid = 'data:image/png;base64,YnJva2Vu';
      const geometry = new THREE.PlaneGeometry(3.6, 2.4),
        material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const uvScale = 1;
      const uv = geometry.getAttribute('uv');
      for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * uvScale);
      uv.needsUpdate = true;
      let status = 'loading',
        current = null,
        request = 0;
      const urls = new Set();
      function release(texture) {
        if (ownedTextures.delete(texture)) texture.dispose();
      }
      function revoke(url) {
        if (urls.delete(url)) URL.revokeObjectURL(url);
      }
      function configure(texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.wrapS = texture.wrapT = document.querySelector('#wrap').checked
          ? THREE.RepeatWrapping
          : THREE.ClampToEdgeWrapping;
        texture.repeat.set(
          Number(document.querySelector('#repeatX').value),
          Number(document.querySelector('#repeatY').value),
        );
        texture.needsUpdate = true;
      }
      function loadImage(url) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        const texture = new THREE.TextureLoader().load(
          url,
          (loaded) => {
            revoke(url);
            if (disposed || token !== request) {
              release(loaded);
              return;
            }
            configure(loaded);
            const previous = current;
            current = loaded;
            material.map = loaded;
            material.needsUpdate = true;
            if (previous) release(previous);
            status = 'ready';
            draw();
          },
          undefined,
          () => {
            revoke(url);
            release(texture);
            if (disposed || token !== request) return;
            status = 'error';
            error.textContent =
              '이미지를 읽지 못했습니다. PNG/JPEG를 다시 선택하거나 샘플 복구를 누르세요.';
            draw();
          },
        );
        ownedTextures.add(texture);
        draw();
      }
      document.querySelector('#file').addEventListener(
        'change',
        (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const url = URL.createObjectURL(file);
          urls.add(url);
          loadImage(url);
        },
        { signal: events.signal },
      );
      document.querySelector('#sample').addEventListener(
        'click',
        () => {
          document.querySelector('#file').value = '';
          loadImage(sample);
        },
        { signal: events.signal },
      );
      document
        .querySelector('#invalid')
        .addEventListener('click', () => loadImage(invalid), {
          signal: events.signal,
        });
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          if (
            ![...document.querySelectorAll('input[type=number]')].every(
              (i) => i.value && i.checkValidity(),
            )
          )
            return;
          if (current) configure(current);
          draw();
        },
        { signal: events.signal },
      );
      loadImage(sample);
      function report() {
        output.textContent =
          '상태: ' +
          status +
          ' / UV: ' +
          Array.from(uv.array).join(',') +
          ' / world width: ' +
          geometry.parameters.width * mesh.scale.x +
          ' / repeat: ' +
          (current ? current.repeat.toArray() : '—') +
          ' / wrap: ' +
          (current ? current.wrapS : '—') +
          ' / image: ' +
          (current ? current.image.width + '×' + current.image.height : '—');
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
        request++;
        for (const url of urls) URL.revokeObjectURL(url);
        urls.clear();
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

- repeat만 4,2로 바꾸었을 때 모서리 색이 늘어나는 이유는 무엇인가요?

### 실패한 이미지에서 복구하기

시작 코드는 손상된 data PNG를 읽어 오류를 표시합니다. loadImage(invalid)를 loadImage(sample)로 바꾸세요. PNG와 JPEG를 직접 선택한 뒤 손상 이미지 시험, 샘플 복구를 차례로 누르세요.

**예상 결과**

error→ready, 기본 이미지 8×8. 손상 파일 뒤에도 입력이 남고 샘플 복구가 작동합니다. 다시 실행하면 파일을 다시 골라야 합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>이미지 로딩과 복구</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>이미지 로딩과 복구</h1>
    <p>
      직접 만든 8×8 사분면 PNG를 사용합니다. 선택한 파일은 실행 중에만 사용하며
      백업에 포함하지 않습니다. 다시 실행하거나 새로고침하면 샘플로 시작하므로
      파일을 다시 선택하세요.
    </p>
    <div class="controls">
      <button id="apply">적용</button
      ><label
        >PNG/JPEG 선택
        <input id="file" type="file" accept="image/png,image/jpeg" /></label
      ><button id="sample">샘플 복구</button
      ><button id="invalid">손상 이미지 시험</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="이미지 로딩과 복구"></canvas></div>
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
      const sample =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVR4nGNQTX79Hxn/LBZDwQx0UPDrjOh/ZKx0NA4F00EBAIGeoRHacAfoAAAAAElFTkSuQmCC',
        invalid = 'data:image/png;base64,YnJva2Vu';
      const geometry = new THREE.PlaneGeometry(3.6, 2.4),
        material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const uvScale = 1;
      const uv = geometry.getAttribute('uv');
      for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * uvScale);
      uv.needsUpdate = true;
      let status = 'loading',
        current = null,
        request = 0;
      const urls = new Set();
      function release(texture) {
        if (ownedTextures.delete(texture)) texture.dispose();
      }
      function revoke(url) {
        if (urls.delete(url)) URL.revokeObjectURL(url);
      }
      function configure(texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.needsUpdate = true;
      }
      function loadImage(url) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        const texture = new THREE.TextureLoader().load(
          url,
          (loaded) => {
            revoke(url);
            if (disposed || token !== request) {
              release(loaded);
              return;
            }
            configure(loaded);
            const previous = current;
            current = loaded;
            material.map = loaded;
            material.needsUpdate = true;
            if (previous) release(previous);
            status = 'ready';
            draw();
          },
          undefined,
          () => {
            revoke(url);
            release(texture);
            if (disposed || token !== request) return;
            status = 'error';
            error.textContent =
              '이미지를 읽지 못했습니다. PNG/JPEG를 다시 선택하거나 샘플 복구를 누르세요.';
            draw();
          },
        );
        ownedTextures.add(texture);
        draw();
      }
      document.querySelector('#file').addEventListener(
        'change',
        (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const url = URL.createObjectURL(file);
          urls.add(url);
          loadImage(url);
        },
        { signal: events.signal },
      );
      document.querySelector('#sample').addEventListener(
        'click',
        () => {
          document.querySelector('#file').value = '';
          loadImage(sample);
        },
        { signal: events.signal },
      );
      document
        .querySelector('#invalid')
        .addEventListener('click', () => loadImage(invalid), {
          signal: events.signal,
        });
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          draw();
        },
        { signal: events.signal },
      );
      loadImage(invalid);
      function report() {
        output.textContent =
          '상태: ' +
          status +
          ' / UV: ' +
          Array.from(uv.array).join(',') +
          ' / world width: ' +
          geometry.parameters.width * mesh.scale.x +
          ' / repeat: ' +
          (current ? current.repeat.toArray() : '—') +
          ' / wrap: ' +
          (current ? current.wrapS : '—') +
          ' / image: ' +
          (current ? current.image.width + '×' + current.image.height : '—');
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
        request++;
        for (const url of urls) URL.revokeObjectURL(url);
        urls.clear();
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

- 초기 loadImage 호출의 인수를 sample로 바꾸세요.
- 확장자만 PNG인 손상 파일도 디코딩에 실패합니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

TextureLoader는 비동기로 이미지를 디코딩합니다. 성공한 결과만 material.map에 연결하며 실패하면 마지막 정상 이미지를 남깁니다. 교체된 texture와 실패한 texture를 dispose하고 object URL은 성공·실패·종료 때 revoke합니다. 선택 파일은 현재 iframe에만 있으며 백업에서 복원되지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>이미지 로딩과 복구</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>이미지 로딩과 복구</h1>
    <p>
      직접 만든 8×8 사분면 PNG를 사용합니다. 선택한 파일은 실행 중에만 사용하며
      백업에 포함하지 않습니다. 다시 실행하거나 새로고침하면 샘플로 시작하므로
      파일을 다시 선택하세요.
    </p>
    <div class="controls">
      <button id="apply">적용</button
      ><label
        >PNG/JPEG 선택
        <input id="file" type="file" accept="image/png,image/jpeg" /></label
      ><button id="sample">샘플 복구</button
      ><button id="invalid">손상 이미지 시험</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="이미지 로딩과 복구"></canvas></div>
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
      const sample =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVR4nGNQTX79Hxn/LBZDwQx0UPDrjOh/ZKx0NA4F00EBAIGeoRHacAfoAAAAAElFTkSuQmCC',
        invalid = 'data:image/png;base64,YnJva2Vu';
      const geometry = new THREE.PlaneGeometry(3.6, 2.4),
        material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const uvScale = 1;
      const uv = geometry.getAttribute('uv');
      for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * uvScale);
      uv.needsUpdate = true;
      let status = 'loading',
        current = null,
        request = 0;
      const urls = new Set();
      function release(texture) {
        if (ownedTextures.delete(texture)) texture.dispose();
      }
      function revoke(url) {
        if (urls.delete(url)) URL.revokeObjectURL(url);
      }
      function configure(texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.needsUpdate = true;
      }
      function loadImage(url) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        const texture = new THREE.TextureLoader().load(
          url,
          (loaded) => {
            revoke(url);
            if (disposed || token !== request) {
              release(loaded);
              return;
            }
            configure(loaded);
            const previous = current;
            current = loaded;
            material.map = loaded;
            material.needsUpdate = true;
            if (previous) release(previous);
            status = 'ready';
            draw();
          },
          undefined,
          () => {
            revoke(url);
            release(texture);
            if (disposed || token !== request) return;
            status = 'error';
            error.textContent =
              '이미지를 읽지 못했습니다. PNG/JPEG를 다시 선택하거나 샘플 복구를 누르세요.';
            draw();
          },
        );
        ownedTextures.add(texture);
        draw();
      }
      document.querySelector('#file').addEventListener(
        'change',
        (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const url = URL.createObjectURL(file);
          urls.add(url);
          loadImage(url);
        },
        { signal: events.signal },
      );
      document.querySelector('#sample').addEventListener(
        'click',
        () => {
          document.querySelector('#file').value = '';
          loadImage(sample);
        },
        { signal: events.signal },
      );
      document
        .querySelector('#invalid')
        .addEventListener('click', () => loadImage(invalid), {
          signal: events.signal,
        });
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          draw();
        },
        { signal: events.signal },
      );
      loadImage(sample);
      function report() {
        output.textContent =
          '상태: ' +
          status +
          ' / UV: ' +
          Array.from(uv.array).join(',') +
          ' / world width: ' +
          geometry.parameters.width * mesh.scale.x +
          ' / repeat: ' +
          (current ? current.repeat.toArray() : '—') +
          ' / wrap: ' +
          (current ? current.wrapS : '—') +
          ' / image: ' +
          (current ? current.image.width + '×' + current.image.height : '—');
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
        request++;
        for (const url of urls) URL.revokeObjectURL(url);
        urls.clear();
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

- Texture.dispose와 URL.revokeObjectURL은 각각 어떤 자원을 정리하나요?

### API · TextureLoader.load

이미지를 비동기로 읽고 성공·실패 콜백으로 상태를 바꿉니다.

- `url: string` — data URI 또는 object URL
- `onLoad: function` — 디코딩 성공 후 Texture를 받는 함수
- `onError: function` — 디코딩 실패를 처리하는 함수

즉시 Texture를 반환하며 onLoad에서 이미지 준비를 알립니다.

- onProgress는 지원하지 않습니다. Texture.dispose와 object URL 해제는 별개입니다.

```js
loader.load(url, texture => { material.map=texture; material.needsUpdate=true; }, undefined, showError);
```

[TextureLoader.load](https://threejs.org/docs/pages/TextureLoader.html) · three@0.186.1 · 2026-10-27

### API · Texture.repeat / wrapS / wrapT

UV 배율과 범위 밖 좌표의 처리 방법을 설정합니다.

- `repeat: Vector2` — 가로·세로 UV 배율, 기본 (1,1)
- `wrapS / wrapT: number` — U/V 경계 처리, 기본 ClampToEdgeWrapping

repeat.set(x,y)는 같은 Vector2를 반환합니다.

- repeat만으로 반복을 켜지 못합니다. wrap 변경 후 needsUpdate를 설정하세요.

```js
texture.wrapS=texture.wrapT=THREE.RepeatWrapping; texture.repeat.set(4,2); texture.needsUpdate=true;
```

[Texture.repeat / wrapS / wrapT](https://threejs.org/docs/pages/Texture.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 거칠기와 금속성](../09/README.md) · [다음: 색 공간과 출력](../11/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
