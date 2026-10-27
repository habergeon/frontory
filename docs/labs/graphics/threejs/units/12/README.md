# Three.js · 12 그림자 지도

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 조명·재질·모델 선택 · 편집 가능한 예제 · 저장 ID: `threejs-step-12`

## 목표와 학습 후 역량

- 캐스터와 리시버 설정을 구별한다.
- 그림자 잘림과 해상도 저하를 구별한다.

## 선수 지식

선수 단원: 03, 08. 앞 단원의 개념을 이어서 실험합니다.

## 핵심 개념과 설명

### 추가 렌더링

그림자는 광원 시점의 깊이 렌더링을 필요로 합니다. 광원과 캐스터 수에 따라 추가 비용이 생깁니다.

### 그림자 범위

shadow camera의 범위는 그림자가 계산되는 영역입니다. 범위를 과도하게 넓히면 같은 지도 크기의 해상도가 희석됩니다.

## 실습 준비

사이트에서 HTML을 편집하고 실행합니다. Three.js 0.186.1을 제공하며 별도 설치나 외부 서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. renderer.shadowMap.enabled와 light.castShadow, 바닥 receiveShadow는 이미 true입니다. caster.castShadow=false를 true로 바꾸세요. HTML castShadow를 켜서 적용한 뒤 receiveShadow만 꺼 비교하세요.
2. mapSize=512를 고정하고 extent=.5를 4로 바꾸세요. 반범위 입력에도 4를 적용합니다. 카메라 범위 표시를 켜서 잘린 깊이 영역이 상자와 바닥을 포함하도록 넓어지는지 관찰합니다. 복구 뒤에는 반범위 8과 4를 비교해 같은 지도에서 좁은 영역의 경계가 더 세밀한지도 확인하세요.
3. extent=4를 고정하고 mapSize=32를 512로 바꾸세요. 입력 512를 적용하고 계단 모양 경계를 비교합니다. 그다음 반범위 단계의 넓은 범위와 작은 범위가 같은 지도 픽셀을 나누는 방식도 설명하세요.

## 관찰할 변수

| 변수        | 기준 조건 | 바꿀 조건           | 예상할 변화·검증 가설                                       |
| ----------- | --------- | ------------------- | ----------------------------------------------------------- |
| shadow 범위 | 넓은 영역 | 대상 주변 작은 영역 | 동일 mapSize에서 대상 부근 그림자가 더 세밀해질 수 있습니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 캐스터와 리시버 설정을 구별한다.
- [ ] 그림자 잘림과 해상도 저하를 구별한다.

## 자가 점검

1. mapSize만 키우는 것의 비용은 무엇인가요?
2. bias를 크게 하면 왜 그림자가 떨어져 보이나요?

## 공식 참고

- [Three.js Shadows](https://threejs.org/manual/pages/shadows.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-12/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-12/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

그림자에는 렌더러, 광원, 캐스터, 리시버의 설정이 함께 필요합니다. 같은 상자·바닥·광원에서 그림자의 유무, 카메라 잘림, 지도 해상도를 따로 바꿉니다.

### 선수 단원

- `threejs-step-03`
- `threejs-step-08`

### 캐스터와 리시버 연결하기

renderer.shadowMap.enabled와 light.castShadow, 바닥 receiveShadow는 이미 true입니다. caster.castShadow=false를 true로 바꾸세요. HTML castShadow를 켜서 적용한 뒤 receiveShadow만 꺼 비교하세요.

**예상 결과**

cast false→true에서 바닥에 그림자가 나타납니다. receive false에서 다시 사라집니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>그림자를 만들고 받기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>그림자를 만들고 받기</h1>
    <p>
      BasicShadowMap으로 필터 흐림을 배제합니다. 범위 밖 그림자 잘림과 같은 범위
      안의 계단 현상을 따로 비교하세요. 카메라 범위 표시는 관찰용이며 그림자를
      받지 않습니다.
    </p>
    <div class="controls">
      <label><input id="cast" type="checkbox" />castShadow</label
      ><label><input id="receive" type="checkbox" checked />receiveShadow</label
      ><button id="apply">적용</button
      ><label><input id="helper" type="checkbox" />카메라 범위 표시</label
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="그림자를 만들고 받기"></canvas></div>
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
      camera.position.set(4, 3.5, 6);
      camera.lookAt(0, -0.2, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
      const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3),
        material = new THREE.MeshLambertMaterial({ color: '#2563eb' }),
        caster = ownMesh(new THREE.Mesh(geometry, material));
      caster.position.set(1, 0, 0);
      caster.castShadow = false;
      scene.add(caster);
      const floor = ownMesh(
        new THREE.Mesh(
          new THREE.PlaneGeometry(10, 8),
          new THREE.MeshLambertMaterial({ color: 0xffffff }),
        ),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.7;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(2, 5, 3);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      scene.add(light, light.target);
      const extent = 4,
        mapSize = 512;
      const shadowCamera = light.shadow.camera;
      shadowCamera.left = shadowCamera.bottom = -extent;
      shadowCamera.right = shadowCamera.top = extent;
      shadowCamera.near = 0.1;
      shadowCamera.far = 20;
      shadowCamera.updateProjectionMatrix();
      light.shadow.mapSize.set(mapSize, mapSize);
      const helper = new THREE.CameraHelper(shadowCamera);
      helper.visible = false;
      scene.add(helper);
      document.querySelector('#helper').addEventListener(
        'change',
        (e) => {
          helper.visible = e.target.checked;
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          caster.castShadow = document.querySelector('#cast').checked;
          floor.receiveShadow = document.querySelector('#receive').checked;
          floor.material.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'cast: ' +
          caster.castShadow +
          ' / receive: ' +
          floor.receiveShadow +
          ' / extent: ' +
          shadowCamera.right +
          ' / mapSize: ' +
          light.shadow.mapSize.toArray() +
          ' / actual map: ' +
          (light.shadow.map
            ? [light.shadow.map.width, light.shadow.map.height]
            : '—') +
          ' / world units per texel: ' +
          (shadowCamera.right - shadowCamera.left) / light.shadow.mapSize.x;
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
        helper.dispose();
        light.shadow.dispose();
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

- caster.castShadow를 찾으세요.
- 광원과 renderer 설정도 필요한 이유를 확인하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

캐스터는 광원 시점의 깊이 지도에 자신을 기록합니다. 리시버는 그 지도를 읽어 가려진 빛을 계산합니다. 어느 하나가 꺼지면 그림자가 사라질 수 있습니다. 바닥이 그림자를 받는 것과 만드는 것은 별개입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>그림자를 만들고 받기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>그림자를 만들고 받기</h1>
    <p>
      BasicShadowMap으로 필터 흐림을 배제합니다. 범위 밖 그림자 잘림과 같은 범위
      안의 계단 현상을 따로 비교하세요. 카메라 범위 표시는 관찰용이며 그림자를
      받지 않습니다.
    </p>
    <div class="controls">
      <label><input id="cast" type="checkbox" checked />castShadow</label
      ><label><input id="receive" type="checkbox" checked />receiveShadow</label
      ><button id="apply">적용</button
      ><label><input id="helper" type="checkbox" />카메라 범위 표시</label
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="그림자를 만들고 받기"></canvas></div>
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
      camera.position.set(4, 3.5, 6);
      camera.lookAt(0, -0.2, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
      const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3),
        material = new THREE.MeshLambertMaterial({ color: '#2563eb' }),
        caster = ownMesh(new THREE.Mesh(geometry, material));
      caster.position.set(1, 0, 0);
      caster.castShadow = true;
      scene.add(caster);
      const floor = ownMesh(
        new THREE.Mesh(
          new THREE.PlaneGeometry(10, 8),
          new THREE.MeshLambertMaterial({ color: 0xffffff }),
        ),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.7;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(2, 5, 3);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      scene.add(light, light.target);
      const extent = 4,
        mapSize = 512;
      const shadowCamera = light.shadow.camera;
      shadowCamera.left = shadowCamera.bottom = -extent;
      shadowCamera.right = shadowCamera.top = extent;
      shadowCamera.near = 0.1;
      shadowCamera.far = 20;
      shadowCamera.updateProjectionMatrix();
      light.shadow.mapSize.set(mapSize, mapSize);
      const helper = new THREE.CameraHelper(shadowCamera);
      helper.visible = false;
      scene.add(helper);
      document.querySelector('#helper').addEventListener(
        'change',
        (e) => {
          helper.visible = e.target.checked;
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          caster.castShadow = document.querySelector('#cast').checked;
          floor.receiveShadow = document.querySelector('#receive').checked;
          floor.material.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'cast: ' +
          caster.castShadow +
          ' / receive: ' +
          floor.receiveShadow +
          ' / extent: ' +
          shadowCamera.right +
          ' / mapSize: ' +
          light.shadow.mapSize.toArray() +
          ' / actual map: ' +
          (light.shadow.map
            ? [light.shadow.map.width, light.shadow.map.height]
            : '—') +
          ' / world units per texel: ' +
          (shadowCamera.right - shadowCamera.left) / light.shadow.mapSize.x;
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
        helper.dispose();
        light.shadow.dispose();
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

- 물체가 보이는데 그림자가 없으면 어떤 네 가지 설정부터 확인하나요?

### 카메라 잘림을 범위로 고치기

mapSize=512를 고정하고 extent=.5를 4로 바꾸세요. 반범위 입력에도 4를 적용합니다. 카메라 범위 표시를 켜서 잘린 깊이 영역이 상자와 바닥을 포함하도록 넓어지는지 관찰합니다. 복구 뒤에는 반범위 8과 4를 비교해 같은 지도에서 좁은 영역의 경계가 더 세밀한지도 확인하세요.

**예상 결과**

반범위 .5→4, mapSize=512 유지. 잘린 그림자가 복구되며 표시한 카메라 영역도 넓어집니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>그림자 카메라의 범위</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>그림자 카메라의 범위</h1>
    <p>
      BasicShadowMap으로 필터 흐림을 배제합니다. 범위 밖 그림자 잘림과 같은 범위
      안의 계단 현상을 따로 비교하세요. 카메라 범위 표시는 관찰용이며 그림자를
      받지 않습니다.
    </p>
    <div class="controls">
      <label
        >반범위
        <input
          id="value"
          type="number"
          min="0.5"
          max="8"
          step="0.5"
          value="0.5" /></label
      ><button id="apply">적용</button
      ><label><input id="helper" type="checkbox" />카메라 범위 표시</label
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="그림자 카메라의 범위"></canvas></div>
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
      camera.position.set(4, 3.5, 6);
      camera.lookAt(0, -0.2, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
      const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3),
        material = new THREE.MeshLambertMaterial({ color: '#2563eb' }),
        caster = ownMesh(new THREE.Mesh(geometry, material));
      caster.position.set(1, 0, 0);
      caster.castShadow = true;
      scene.add(caster);
      const floor = ownMesh(
        new THREE.Mesh(
          new THREE.PlaneGeometry(10, 8),
          new THREE.MeshLambertMaterial({ color: 0xffffff }),
        ),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.7;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(2, 5, 3);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      scene.add(light, light.target);
      const extent = 0.5,
        mapSize = 512;
      const shadowCamera = light.shadow.camera;
      shadowCamera.left = shadowCamera.bottom = -extent;
      shadowCamera.right = shadowCamera.top = extent;
      shadowCamera.near = 0.1;
      shadowCamera.far = 20;
      shadowCamera.updateProjectionMatrix();
      light.shadow.mapSize.set(mapSize, mapSize);
      const helper = new THREE.CameraHelper(shadowCamera);
      helper.visible = false;
      scene.add(helper);
      document.querySelector('#helper').addEventListener(
        'change',
        (e) => {
          helper.visible = e.target.checked;
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (!input.value || !input.checkValidity()) return;
          const v = Number(input.value);
          shadowCamera.left = shadowCamera.bottom = -v;
          shadowCamera.right = shadowCamera.top = v;
          shadowCamera.updateProjectionMatrix();
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'cast: ' +
          caster.castShadow +
          ' / receive: ' +
          floor.receiveShadow +
          ' / extent: ' +
          shadowCamera.right +
          ' / mapSize: ' +
          light.shadow.mapSize.toArray() +
          ' / actual map: ' +
          (light.shadow.map
            ? [light.shadow.map.width, light.shadow.map.height]
            : '—') +
          ' / world units per texel: ' +
          (shadowCamera.right - shadowCamera.left) / light.shadow.mapSize.x;
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
        helper.dispose();
        light.shadow.dispose();
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

- 좌우·상하 네 면을 함께 바꾸세요.
- 해상도를 바꾸지 않고 먼저 범위만 비교하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

방향광의 그림자 카메라는 직교 투영입니다. left/right/top/bottom과 near/far 안에 있는 영역만 깊이 지도에 담깁니다. 범위 변경 뒤 updateProjectionMatrix와 helper.update를 호출합니다. 잘림은 mapSize를 키워도 복구되지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>그림자 카메라의 범위</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>그림자 카메라의 범위</h1>
    <p>
      BasicShadowMap으로 필터 흐림을 배제합니다. 범위 밖 그림자 잘림과 같은 범위
      안의 계단 현상을 따로 비교하세요. 카메라 범위 표시는 관찰용이며 그림자를
      받지 않습니다.
    </p>
    <div class="controls">
      <label
        >반범위
        <input
          id="value"
          type="number"
          min="0.5"
          max="8"
          step="0.5"
          value="4" /></label
      ><button id="apply">적용</button
      ><label><input id="helper" type="checkbox" />카메라 범위 표시</label
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="그림자 카메라의 범위"></canvas></div>
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
      camera.position.set(4, 3.5, 6);
      camera.lookAt(0, -0.2, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
      const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3),
        material = new THREE.MeshLambertMaterial({ color: '#2563eb' }),
        caster = ownMesh(new THREE.Mesh(geometry, material));
      caster.position.set(1, 0, 0);
      caster.castShadow = true;
      scene.add(caster);
      const floor = ownMesh(
        new THREE.Mesh(
          new THREE.PlaneGeometry(10, 8),
          new THREE.MeshLambertMaterial({ color: 0xffffff }),
        ),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.7;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(2, 5, 3);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      scene.add(light, light.target);
      const extent = 4,
        mapSize = 512;
      const shadowCamera = light.shadow.camera;
      shadowCamera.left = shadowCamera.bottom = -extent;
      shadowCamera.right = shadowCamera.top = extent;
      shadowCamera.near = 0.1;
      shadowCamera.far = 20;
      shadowCamera.updateProjectionMatrix();
      light.shadow.mapSize.set(mapSize, mapSize);
      const helper = new THREE.CameraHelper(shadowCamera);
      helper.visible = false;
      scene.add(helper);
      document.querySelector('#helper').addEventListener(
        'change',
        (e) => {
          helper.visible = e.target.checked;
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (!input.value || !input.checkValidity()) return;
          const v = Number(input.value);
          shadowCamera.left = shadowCamera.bottom = -v;
          shadowCamera.right = shadowCamera.top = v;
          shadowCamera.updateProjectionMatrix();
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'cast: ' +
          caster.castShadow +
          ' / receive: ' +
          floor.receiveShadow +
          ' / extent: ' +
          shadowCamera.right +
          ' / mapSize: ' +
          light.shadow.mapSize.toArray() +
          ' / actual map: ' +
          (light.shadow.map
            ? [light.shadow.map.width, light.shadow.map.height]
            : '—') +
          ' / world units per texel: ' +
          (shadowCamera.right - shadowCamera.left) / light.shadow.mapSize.x;
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
        helper.dispose();
        light.shadow.dispose();
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

- 그림자가 통째로 잘린 현상과 경계의 계단 현상은 원인이 어떻게 다른가요?

### 같은 범위에서 지도 해상도 비교하기

extent=4를 고정하고 mapSize=32를 512로 바꾸세요. 입력 512를 적용하고 계단 모양 경계를 비교합니다. 그다음 반범위 단계의 넓은 범위와 작은 범위가 같은 지도 픽셀을 나누는 방식도 설명하세요.

**예상 결과**

반범위 4 유지, 실제 map 32×32→512×512. 그림자 잘림을 고치는 실험과 해상도 실험을 구별합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>그림자 지도 해상도</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>그림자 지도 해상도</h1>
    <p>
      BasicShadowMap으로 필터 흐림을 배제합니다. 범위 밖 그림자 잘림과 같은 범위
      안의 계단 현상을 따로 비교하세요. 카메라 범위 표시는 관찰용이며 그림자를
      받지 않습니다.
    </p>
    <div class="controls">
      <label
        >mapSize
        <input
          id="value"
          type="number"
          min="32"
          max="1024"
          step="32"
          value="32" /></label
      ><button id="apply">적용</button
      ><label><input id="helper" type="checkbox" />카메라 범위 표시</label
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="그림자 지도 해상도"></canvas></div>
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
      camera.position.set(4, 3.5, 6);
      camera.lookAt(0, -0.2, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
      const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3),
        material = new THREE.MeshLambertMaterial({ color: '#2563eb' }),
        caster = ownMesh(new THREE.Mesh(geometry, material));
      caster.position.set(1, 0, 0);
      caster.castShadow = true;
      scene.add(caster);
      const floor = ownMesh(
        new THREE.Mesh(
          new THREE.PlaneGeometry(10, 8),
          new THREE.MeshLambertMaterial({ color: 0xffffff }),
        ),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.7;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(2, 5, 3);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      scene.add(light, light.target);
      const extent = 4,
        mapSize = 32;
      const shadowCamera = light.shadow.camera;
      shadowCamera.left = shadowCamera.bottom = -extent;
      shadowCamera.right = shadowCamera.top = extent;
      shadowCamera.near = 0.1;
      shadowCamera.far = 20;
      shadowCamera.updateProjectionMatrix();
      light.shadow.mapSize.set(mapSize, mapSize);
      const helper = new THREE.CameraHelper(shadowCamera);
      helper.visible = false;
      scene.add(helper);
      document.querySelector('#helper').addEventListener(
        'change',
        (e) => {
          helper.visible = e.target.checked;
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (!input.value || !input.checkValidity()) return;
          const v = Number(input.value);
          if (!Number.isInteger(Math.log2(v))) {
            error.textContent = '32~1024의 2의 거듭제곱을 넣으세요.';
            return;
          }
          error.textContent = '';
          light.shadow.mapSize.set(v, v);
          if (light.shadow.map) {
            light.shadow.map.dispose();
            light.shadow.map = null;
          }
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'cast: ' +
          caster.castShadow +
          ' / receive: ' +
          floor.receiveShadow +
          ' / extent: ' +
          shadowCamera.right +
          ' / mapSize: ' +
          light.shadow.mapSize.toArray() +
          ' / actual map: ' +
          (light.shadow.map
            ? [light.shadow.map.width, light.shadow.map.height]
            : '—') +
          ' / world units per texel: ' +
          (shadowCamera.right - shadowCamera.left) / light.shadow.mapSize.x;
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
        helper.dispose();
        light.shadow.dispose();
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

- mapSize를 양축 모두 설정하세요.
- 이미 만든 map은 해제하고 null로 두어 다음 draw에서 새 크기로 만듭니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

지도 한 변의 픽셀을 32→512로 늘리면 한 변은 16배, 총 texel은 256배입니다. 깊이 저장과 추가 렌더 비용이 늘 수 있습니다. 이 예제는 BasicShadowMap으로 필터 흐림을 배제합니다. 범위 8 world units를 같은 지도에서 나누므로 units/texel이 .25→.015625입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>그림자 지도 해상도</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>그림자 지도 해상도</h1>
    <p>
      BasicShadowMap으로 필터 흐림을 배제합니다. 범위 밖 그림자 잘림과 같은 범위
      안의 계단 현상을 따로 비교하세요. 카메라 범위 표시는 관찰용이며 그림자를
      받지 않습니다.
    </p>
    <div class="controls">
      <label
        >mapSize
        <input
          id="value"
          type="number"
          min="32"
          max="1024"
          step="32"
          value="512" /></label
      ><button id="apply">적용</button
      ><label><input id="helper" type="checkbox" />카메라 범위 표시</label
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="그림자 지도 해상도"></canvas></div>
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
      camera.position.set(4, 3.5, 6);
      camera.lookAt(0, -0.2, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
      const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3),
        material = new THREE.MeshLambertMaterial({ color: '#2563eb' }),
        caster = ownMesh(new THREE.Mesh(geometry, material));
      caster.position.set(1, 0, 0);
      caster.castShadow = true;
      scene.add(caster);
      const floor = ownMesh(
        new THREE.Mesh(
          new THREE.PlaneGeometry(10, 8),
          new THREE.MeshLambertMaterial({ color: 0xffffff }),
        ),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.7;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(2, 5, 3);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      scene.add(light, light.target);
      const extent = 4,
        mapSize = 512;
      const shadowCamera = light.shadow.camera;
      shadowCamera.left = shadowCamera.bottom = -extent;
      shadowCamera.right = shadowCamera.top = extent;
      shadowCamera.near = 0.1;
      shadowCamera.far = 20;
      shadowCamera.updateProjectionMatrix();
      light.shadow.mapSize.set(mapSize, mapSize);
      const helper = new THREE.CameraHelper(shadowCamera);
      helper.visible = false;
      scene.add(helper);
      document.querySelector('#helper').addEventListener(
        'change',
        (e) => {
          helper.visible = e.target.checked;
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (!input.value || !input.checkValidity()) return;
          const v = Number(input.value);
          if (!Number.isInteger(Math.log2(v))) {
            error.textContent = '32~1024의 2의 거듭제곱을 넣으세요.';
            return;
          }
          error.textContent = '';
          light.shadow.mapSize.set(v, v);
          if (light.shadow.map) {
            light.shadow.map.dispose();
            light.shadow.map = null;
          }
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'cast: ' +
          caster.castShadow +
          ' / receive: ' +
          floor.receiveShadow +
          ' / extent: ' +
          shadowCamera.right +
          ' / mapSize: ' +
          light.shadow.mapSize.toArray() +
          ' / actual map: ' +
          (light.shadow.map
            ? [light.shadow.map.width, light.shadow.map.height]
            : '—') +
          ' / world units per texel: ' +
          (shadowCamera.right - shadowCamera.left) / light.shadow.mapSize.x;
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
        helper.dispose();
        light.shadow.dispose();
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

- mapSize를 늘리거나 카메라 범위를 줄일 때 품질과 비용은 어떻게 달라지나요?

### API · Object3D.castShadow / receiveShadow

광원 시점의 깊이 기록과 그 지도를 읽는 표면을 구별합니다.

- `castShadow: boolean` — 물체가 그림자 깊이에 참여, 기본 false
- `receiveShadow: boolean` — 표면이 그림자를 받음, 기본 false

반환값 없는 프로퍼티 설정입니다.

- renderer.shadowMap.enabled와 light.castShadow도 켜야 합니다.

```js
renderer.shadowMap.enabled=true; light.castShadow=true; box.castShadow=true; floor.receiveShadow=true;
```

[Object3D.castShadow / receiveShadow](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-27

### API · LightShadow.camera

광원에서 깊이 지도로 담는 영역을 정합니다.

- `camera: Camera` — 방향광에는 OrthographicCamera

camera 참조를 읽어 범위와 투영 행렬을 갱신합니다.

- 잘림은 mapSize 증가로 고쳐지지 않습니다. 범위를 넓히면 같은 지도의 world units/texel이 커집니다.

```js
const c=light.shadow.camera; c.left=c.bottom=-4; c.right=c.top=4; c.updateProjectionMatrix(); helper.update();
```

[LightShadow.camera](https://threejs.org/docs/pages/LightShadow.html) · three@0.186.1 · 2026-10-27

### API · LightShadow.mapSize

그림자 깊이 텍스처의 가로·세로 픽셀 수를 정합니다.

- `mapSize: Vector2` — 기본 (512,512), 예제 32와 512 비교

설정한 크기는 다음 지도 생성 때 적용됩니다.

- 한 변 16배는 texel 256배입니다. 크기 변경 때 기존 map을 dispose하고 null로 두세요.

```js
light.shadow.mapSize.set(512,512); light.shadow.map?.dispose(); light.shadow.map=null;
```

[LightShadow.mapSize](https://threejs.org/docs/pages/LightShadow.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 색 공간과 출력](../11/README.md) · [다음: 정규화 좌표와 선택](../13/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
