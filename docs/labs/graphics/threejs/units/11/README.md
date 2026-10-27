# Three.js · 11 색 공간과 출력

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 조명·재질·모델 선택 · 편집 가능한 예제 · 저장 ID: `threejs-step-11`

## 목표와 학습 후 역량

- 색 맵과 normal·roughness 맵을 구분한다.
- 입력·작업·출력 색 공간을 설명한다.

## 선수 지식

선수 단원: 09, 10. 앞 단원의 개념을 이어서 실험합니다.

## 핵심 개념과 설명

### 색 데이터

색 텍스처와 수치 데이터 텍스처는 의미가 다릅니다. 색 이미지는 적절한 colorSpace를 지정해야 조명 계산이 맞습니다.

### 출력 변환

렌더러의 출력 색 공간은 화면 표시 단계에 해당합니다. 입력과 출력을 혼동해 이중 변환하면 색이 달라집니다.

## 실습 준비

사이트에서 HTML을 편집하고 실행합니다. Three.js 0.186.1을 제공하며 별도 설치나 외부 서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 직접 만든 2×2 회색 이미지는 sRGB 색 128을 담았습니다. 시작 코드 inputSpace="none"을 "srgb"로 바꾸세요. 선택 입력에서도 srgb를 적용하고 두 화면의 밝기를 비교합니다.
2. green=128/255는 색이 아니라 거칠기 계수입니다. inputSpace="srgb"를 "none"으로 바꾸고 고정 점광원 아래 구의 반사를 비교하세요. roughness=1과 metalness=.25는 유지합니다.
3. 입력 이미지 대신 Linear-sRGB (.5,.5,.5)로 평면을 칠합니다. renderer.outputColorSpace를 LinearSRGBColorSpace에서 SRGBColorSpace로 바꾸세요. 선택 입력의 srgb도 적용합니다.

## 관찰할 변수

| 변수                 | 기준 조건      | 바꿀 조건    | 예상할 변화·검증 가설                        |
| -------------------- | -------------- | ------------ | -------------------------------------------- |
| 색 텍스처 colorSpace | SRGBColorSpace | NoColorSpace | 동일 이미지의 밝기 해석이 달라질 수 있습니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 색 맵과 normal·roughness 맵을 구분한다.
- [ ] 입력·작업·출력 색 공간을 설명한다.

## 자가 점검

1. 모든 텍스처에 sRGB를 넣으면 안 되는 이유는 무엇인가요?
2. CSS 색과 렌더 결과 비교 시 어떤 조건이 필요한가요?

## 공식 참고

- [Three.js Color Management](https://threejs.org/manual/pages/color-management.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-11/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-11/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

동일한 128 바이트도 색을 뜻할 때와 거칠기를 뜻할 때 해석이 다릅니다. 입력을 Linear-sRGB 작업 공간으로 읽는 과정과 화면 출력 변환을 분리합니다. toneMapping은 끄고 중성 광원을 고정합니다.

### 선수 단원

- `threejs-step-09`
- `threejs-step-10`

### 색 이미지에 sRGB 지정하기

직접 만든 2×2 회색 이미지는 sRGB 색 128을 담았습니다. 시작 코드 inputSpace="none"을 "srgb"로 바꾸세요. 선택 입력에서도 srgb를 적용하고 두 화면의 밝기를 비교합니다.

**예상 결과**

NoColorSpace→srgb. 같은 128 바이트가 출력에서 대략 188→128로 어두워집니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>색 이미지의 입력 색 공간</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>색 이미지의 입력 색 공간</h1>
    <p>
      직접 만든 2×2 RGBA [128,128,128,255] 자산입니다. 색 단계는 sRGB 색
      이미지로, 수치 단계는 green=128/255 거칠기 데이터로 정의합니다. 출력
      단계는 Linear-sRGB .5를 표시합니다.
    </p>
    <div class="controls">
      <label
        >색 공간
        <select id="space">
          <option value="none" selected>none</option>
          <option value="srgb">srgb</option>
        </select></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="색 이미지의 입력 색 공간"></canvas>
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
        ownedTargets = new Set(),
        ownedTextures = new Set();
      const ownMesh = (m) => {
        ownedGeometry.add(m.geometry);
        ownedMaterial.add(m.material);
        return m;
      };
      const events = new AbortController();
      let disposed = false;
      const pixels = new Uint8Array([
        128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128,
        255,
      ]);
      const texture = new THREE.DataTexture(pixels, 2, 2);
      texture.magFilter = texture.minFilter = THREE.NearestFilter;
      ownedTextures.add(texture);
      const inputSpace = 'none';
      texture.colorSpace =
        inputSpace === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.needsUpdate = true;
      const geometry = new THREE.PlaneGeometry(3.6, 2.4);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const space = document.querySelector('#space').value;
          texture.colorSpace =
            space === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
          texture.needsUpdate = true;
          material.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'input: ' +
          (texture.colorSpace || 'NoColorSpace') +
          ' / working: Linear-sRGB / output: ' +
          renderer.outputColorSpace +
          ' / source byte: ' +
          pixels[1] +
          ' / roughness: ' +
          (material.roughness ?? '—');
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

- inputSpace 상수를 찾으세요.
- 출력은 srgb로 유지하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

색 이미지의 map은 SRGBColorSpace로 표시해야 sRGB 값을 선형 작업 값으로 디코딩합니다. NoColorSpace로 읽으면 128/255를 이미 선형인 값으로 취급해 화면이 더 밝아집니다. 이 예제의 MeshBasicMaterial은 조명을 받지 않아 변환 차이만 관찰합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>색 이미지의 입력 색 공간</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>색 이미지의 입력 색 공간</h1>
    <p>
      직접 만든 2×2 RGBA [128,128,128,255] 자산입니다. 색 단계는 sRGB 색
      이미지로, 수치 단계는 green=128/255 거칠기 데이터로 정의합니다. 출력
      단계는 Linear-sRGB .5를 표시합니다.
    </p>
    <div class="controls">
      <label
        >색 공간
        <select id="space">
          <option value="none">none</option>
          <option value="srgb" selected>srgb</option>
        </select></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="색 이미지의 입력 색 공간"></canvas>
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
        ownedTargets = new Set(),
        ownedTextures = new Set();
      const ownMesh = (m) => {
        ownedGeometry.add(m.geometry);
        ownedMaterial.add(m.material);
        return m;
      };
      const events = new AbortController();
      let disposed = false;
      const pixels = new Uint8Array([
        128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128,
        255,
      ]);
      const texture = new THREE.DataTexture(pixels, 2, 2);
      texture.magFilter = texture.minFilter = THREE.NearestFilter;
      ownedTextures.add(texture);
      const inputSpace = 'srgb';
      texture.colorSpace =
        inputSpace === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.needsUpdate = true;
      const geometry = new THREE.PlaneGeometry(3.6, 2.4);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const space = document.querySelector('#space').value;
          texture.colorSpace =
            space === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
          texture.needsUpdate = true;
          material.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'input: ' +
          (texture.colorSpace || 'NoColorSpace') +
          ' / working: Linear-sRGB / output: ' +
          renderer.outputColorSpace +
          ' / source byte: ' +
          pixels[1] +
          ' / roughness: ' +
          (material.roughness ?? '—');
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

- 이미지 바이트가 같아도 입력 colorSpace가 밝기를 바꾸는 이유는 무엇인가요?

### 거칠기 데이터의 의미 유지하기

green=128/255는 색이 아니라 거칠기 계수입니다. inputSpace="srgb"를 "none"으로 바꾸고 고정 점광원 아래 구의 반사를 비교하세요. roughness=1과 metalness=.25는 유지합니다.

**예상 결과**

128/255≈.502를 유지하는 NoColorSpace에서 반사가 더 퍼집니다. 색 맵의 규칙을 모든 texture에 적용하지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>수치 맵은 선형 데이터</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>수치 맵은 선형 데이터</h1>
    <p>
      직접 만든 2×2 RGBA [128,128,128,255] 자산입니다. 색 단계는 sRGB 색
      이미지로, 수치 단계는 green=128/255 거칠기 데이터로 정의합니다. 출력
      단계는 Linear-sRGB .5를 표시합니다.
    </p>
    <div class="controls">
      <label
        >색 공간
        <select id="space">
          <option value="none">none</option>
          <option value="srgb" selected>srgb</option>
        </select></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="수치 맵은 선형 데이터"></canvas></div>
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
      const pixels = new Uint8Array([
        128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128,
        255,
      ]);
      const texture = new THREE.DataTexture(pixels, 2, 2);
      texture.magFilter = texture.minFilter = THREE.NearestFilter;
      ownedTextures.add(texture);
      const inputSpace = 'srgb';
      texture.colorSpace =
        inputSpace === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.needsUpdate = true;
      const geometry = new THREE.SphereGeometry(1.15, 48, 32);
      const material = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 1,
        roughnessMap: texture,
        metalness: 0.25,
      });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      scene.add(new THREE.AmbientLight(0xffffff, 0.2));
      const light = new THREE.PointLight(0xffffff, 70);
      light.position.set(2, 2, 3);
      scene.add(light);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const space = document.querySelector('#space').value;
          texture.colorSpace =
            space === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
          texture.needsUpdate = true;
          material.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'input: ' +
          (texture.colorSpace || 'NoColorSpace') +
          ' / working: Linear-sRGB / output: ' +
          renderer.outputColorSpace +
          ' / source byte: ' +
          pixels[1] +
          ' / roughness: ' +
          (material.roughness ?? '—');
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

- 수치 맵에는 none을 선택하세요.
- green 채널과 roughness=1의 곱을 생각하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

roughnessMap은 green 채널을 material.roughness에 곱합니다. NoColorSpace는 이 수치를 그대로 읽습니다. 잘못 sRGB 디코딩하면 .502가 약 .216이 되어 반사가 더 좁아집니다. normalMap도 방향 성분을 담는 수치 맵이므로 NoColorSpace를 사용합니다. 여기서는 roughnessMap을 실행하고 normalMap은 역할을 구별합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>수치 맵은 선형 데이터</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>수치 맵은 선형 데이터</h1>
    <p>
      직접 만든 2×2 RGBA [128,128,128,255] 자산입니다. 색 단계는 sRGB 색
      이미지로, 수치 단계는 green=128/255 거칠기 데이터로 정의합니다. 출력
      단계는 Linear-sRGB .5를 표시합니다.
    </p>
    <div class="controls">
      <label
        >색 공간
        <select id="space">
          <option value="none" selected>none</option>
          <option value="srgb">srgb</option>
        </select></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="수치 맵은 선형 데이터"></canvas></div>
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
      const pixels = new Uint8Array([
        128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128,
        255,
      ]);
      const texture = new THREE.DataTexture(pixels, 2, 2);
      texture.magFilter = texture.minFilter = THREE.NearestFilter;
      ownedTextures.add(texture);
      const inputSpace = 'none';
      texture.colorSpace =
        inputSpace === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.needsUpdate = true;
      const geometry = new THREE.SphereGeometry(1.15, 48, 32);
      const material = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 1,
        roughnessMap: texture,
        metalness: 0.25,
      });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      scene.add(new THREE.AmbientLight(0xffffff, 0.2));
      const light = new THREE.PointLight(0xffffff, 70);
      light.position.set(2, 2, 3);
      scene.add(light);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const space = document.querySelector('#space').value;
          texture.colorSpace =
            space === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
          texture.needsUpdate = true;
          material.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'input: ' +
          (texture.colorSpace || 'NoColorSpace') +
          ' / working: Linear-sRGB / output: ' +
          renderer.outputColorSpace +
          ' / source byte: ' +
          pixels[1] +
          ' / roughness: ' +
          (material.roughness ?? '—');
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

- normal map의 RGB를 사진의 RGB처럼 sRGB로 읽으면 어떤 의미가 손상되나요?

### 작업 공간과 출력 변환 분리하기

입력 이미지 대신 Linear-sRGB (.5,.5,.5)로 평면을 칠합니다. renderer.outputColorSpace를 LinearSRGBColorSpace에서 SRGBColorSpace로 바꾸세요. 선택 입력의 srgb도 적용합니다.

**예상 결과**

작업 값 .5 유지, linear→srgb 출력에서 대략 128→188. NoToneMapping 유지.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>작업 색과 출력 색</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>작업 색과 출력 색</h1>
    <p>
      재질 색의 Linear-sRGB 성분은 [0.5, 0.5, 0.5]입니다. 출력 색 공간을 바꿔
      실제 그림을 비교하세요.
    </p>
    <div class="controls">
      <label
        >색 공간
        <select id="space">
          <option value="linear" selected>linear</option>
          <option value="srgb">srgb</option>
        </select></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="작업 색과 출력 색"></canvas></div>
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
      const geometry = new THREE.PlaneGeometry(3.6, 2.4);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.5, 0.5, 0.5),
      });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));

      renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const space = document.querySelector('#space').value;
          renderer.outputColorSpace =
            space === 'srgb' ? THREE.SRGBColorSpace : THREE.LinearSRGBColorSpace;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'material linear RGB: ' +
          material.color.toArray().join(', ') +
          ' / working: Linear-sRGB / output: ' +
          renderer.outputColorSpace;
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

- renderer.outputColorSpace를 찾으세요.
- material.color의 .5는 선형 값입니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

Three.js의 조명·색 계산은 Linear-sRGB 작업 공간을 씁니다. outputColorSpace는 최종 화면 인코딩을 정하며 texture의 의미를 고치지 않습니다. 일반 sRGB 화면에서는 선형 .5가 약 188로 표시됩니다. 입력·작업·출력을 구분하면 이중 변환을 피할 수 있습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>작업 색과 출력 색</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>작업 색과 출력 색</h1>
    <p>
      재질 색의 Linear-sRGB 성분은 [0.5, 0.5, 0.5]입니다. 출력 색 공간을 바꿔
      실제 그림을 비교하세요.
    </p>
    <div class="controls">
      <label
        >색 공간
        <select id="space">
          <option value="linear">linear</option>
          <option value="srgb" selected>srgb</option>
        </select></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="작업 색과 출력 색"></canvas></div>
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
      const geometry = new THREE.PlaneGeometry(3.6, 2.4);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.5, 0.5, 0.5),
      });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const space = document.querySelector('#space').value;
          renderer.outputColorSpace =
            space === 'srgb' ? THREE.SRGBColorSpace : THREE.LinearSRGBColorSpace;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'material linear RGB: ' +
          material.color.toArray().join(', ') +
          ' / working: Linear-sRGB / output: ' +
          renderer.outputColorSpace;
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

- 입력 colorSpace 오류를 출력 설정으로 상쇄하면 왜 다른 색도 틀리나요?

### API · Texture.colorSpace

색 이미지의 인코딩과 수치 데이터의 의미를 선언합니다.

- `colorSpace: string` — 색 map은 SRGBColorSpace, 수치 map은 NoColorSpace

값을 설정하며 GPU 업로드 때 입력 해석에 쓰입니다.

- roughnessMap은 green을 곱합니다. normalMap도 색 사진이 아닌 방향 데이터입니다.

```js
texture.colorSpace=THREE.NoColorSpace; texture.needsUpdate=true;
```

[Texture.colorSpace](https://threejs.org/docs/pages/Texture.html) · three@0.186.1 · 2026-10-27

### API · WebGLRenderer.outputColorSpace

선형 작업 결과를 화면에 표시할 색 공간으로 변환합니다.

- `outputColorSpace: string` — 기본 SRGBColorSpace, 비교용 LinearSRGBColorSpace

프로퍼티 설정이며 render 결과의 인코딩에 반영됩니다.

- 출력 설정으로 잘못된 입력 텍스처의 의미를 고치지 마세요. NoToneMapping으로 비교 조건을 고정합니다.

```js
renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.toneMapping=THREE.NoToneMapping;
```

[WebGLRenderer.outputColorSpace](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 텍스처와 UV](../10/README.md) · [다음: 그림자 지도](../12/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
