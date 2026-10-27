# Three.js · 18 투명도와 깊이

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 애니메이션·인스턴싱·렌더 패스 · 편집 가능한 예제 · 저장 ID: `threejs-step-18`

## 목표와 학습 후 역량

- 불투명 깊이와 투명 합성을 구별한다.
- 남는 정렬 한계를 스크린샷으로 설명한다.

## 선수 지식

선수 단원: 03, 09. 해당 개념을 이번 모델 실험에 연결합니다.

## 핵심 개념과 설명

### opacity와 투명 패스

opacity만 바꿔서는 투명 패스로 이동하지 않습니다. transparent 변경 뒤 needsUpdate로 재질 설정을 갱신합니다. 이 실험은 MeshBasicMaterial을 써서 조명 차이를 배제합니다.

### depthWrite 비교

투명한 물체는 보통 뒤에서 앞으로 혼합하며 깊이를 쓰지 않는 설정이 도움이 됩니다. 하지만 교차 표면은 한 객체 전체에 공통 앞뒤 순서가 없으므로 이 설정만으로 완전히 해결되지 않습니다.

## 실습 준비

사이트에서 독립 HTML을 편집·실행합니다. Three.js 0.186.1과 같은 버전의 addons를 제공하므로 별도 설치·서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 시작의 opacity는 .45지만 transparent=false라 두 평면은 불투명하게 그립니다. transparent를 체크하고 적용하세요. opacity=.45는 남길 소스 색의 비율이며 투명 패스의 혼합이 켜져야 뒤의 색과 섞입니다. 0, .45, 1을 차례로 입력해 같은 겹친 부분을 비교하세요.

red는 Y=.65rad, blue는 Y=-.65rad이고 둘 다 DoubleSide라 뒷면도 보입니다. 입력을 하나씩 바꾸고 적용 버튼을 눌러 material 실제 값과 화면을 함께 읽습니다. opacity=0이어도 depthWrite=true라면 깊이를 기록해 뒤를 가릴 수 있으므로 다음 단계와 구별하세요. 2. transparent=true, opacity=.45를 유지합니다. 시작은 depthWrite=true입니다. 빨강·파랑이 교차해 한 평면의 일부가 이미 기록한 깊이 때문에 뒤의 혼합을 막을 수 있습니다. depthWrite만 꺼서 적용하고 같은 시점의 좌우 겹침을 비교하세요.

depthTest는 그대로 true입니다. depthWrite=false는 자기 깊이를 버퍼에 쓰지 않을 뿐, 앞서 그린 불투명 물체의 깊이 검사를 끄지 않습니다. depthWrite를 켜고 끄며 auto와 red-last를 각각 비교합니다. 뒤 표면이 사라지는 현상을 줄여도 혼합 순서가 올바른지는 별개입니다. 3. transparent=true, depthWrite=false에서 객체 순서를 auto→red-last→blue-last로 바꾸며 각각 적용합니다. renderOrder=1인 객체는 이 투명 객체 목록에서 뒤에 그립니다. 두 중심의 깊이가 같아 auto도 한 객체 전체를 먼저 정할 수밖에 없습니다.

같은 정면에서 순서만 바꾸면 겹친 색이 달라집니다. 빨강이 마지막이면 왼쪽·오른쪽 모두 빨강 기여가 뒤에 섞이지만 실제 표면 앞뒤는 중앙에서 바뀝니다. 오른쪽·왼쪽 시점에서도 비교하세요. renderOrder를 조절해 한 부분을 개선해도 반대 부분이나 다른 시점은 틀릴 수 있습니다. 관찰한 시점·순서·문제 구간을 필기에 적고 완전 해결로 결론내리지 마세요.

## 관찰할 변수

| 변수       | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                                          |
| ---------- | --------- | --------- | -------------------------------------------------------------- |
| depthWrite | true      | false     | 가림 양상이 바뀌지만 모든 투명 정렬 문제가 해결되지는 않습니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 불투명 깊이와 투명 합성을 구별한다.
- [ ] 남는 정렬 한계를 스크린샷으로 설명한다.

## 자가 점검

1. opacity=.45인데 불투명하면 무엇을 먼저 읽나요?
2. 깊이를 쓰지 않는 것과 검사하지 않는 것은 어떻게 다른가요?
3. 객체 중심 정렬은 교차 삼각형을 왜 해결하지 못하나요?

## 공식 참고

- [Three.js Material](https://threejs.org/docs/pages/Material.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js Transparency](https://threejs.org/manual/pages/transparency.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-18/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-18/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

03·09의 시점과 재질을 이어서 투명한 교차 평면을 비교합니다. 빨강·파랑 평면의 중심 깊이는 같지만 좌우 앞뒤가 바뀝니다. opacity, transparent, depthWrite, 객체 순서를 하나씩 바꾸고 같은 시점의 겹친 색을 기록하세요. 객체 정렬만으로 모든 교차 표면의 투명도를 해결할 수는 없습니다.

### 선수 단원

- `threejs-step-03`
- `threejs-step-09`

### opacity와 투명 패스

시작의 opacity는 .45지만 transparent=false라 두 평면은 불투명하게 그립니다. transparent를 체크하고 적용하세요. opacity=.45는 남길 소스 색의 비율이며 투명 패스의 혼합이 켜져야 뒤의 색과 섞입니다. 0, .45, 1을 차례로 입력해 같은 겹친 부분을 비교하세요.

red는 Y=.65rad, blue는 Y=-.65rad이고 둘 다 DoubleSide라 뒷면도 보입니다. 입력을 하나씩 바꾸고 적용 버튼을 눌러 material 실제 값과 화면을 함께 읽습니다. opacity=0이어도 depthWrite=true라면 깊이를 기록해 뒤를 가릴 수 있으므로 다음 단계와 구별하세요.

**예상 결과**

transparent=false에서는 .45여도 불투명합니다. true에서는 두 색과 배경이 섞이며 opacity 0/1에서 기여도가 달라집니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>opacity와 transparent</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>opacity와 transparent</h1>
    <p>
      두 평면이 중앙에서 교차합니다. red는 Y=.65rad, blue는 Y=-.65rad이며 중심
      깊이는 같습니다. 같은 시점에서 한 설정만 바꾸세요. depthWrite=false와
      renderOrder는 객체 단위 혼합 결과를 바꿉니다. 서로 교차한 삼각형을 앞뒤로
      나누지 않으므로 모든 시점의 정확한 투명도는 보장하지 않습니다.
    </p>
    <div class="controls">
      <label
        >opacity
        <input
          id="value"
          type="number"
          min="0"
          max="1"
          step="0.05"
          value="0.45" /></label
      ><label><input id="transparent" type="checkbox" />transparent</label
      ><label><input id="depthWrite" type="checkbox" />depthWrite</label
      ><label
        >객체 순서
        <select id="order">
          <option selected>auto</option>
          <option>red-last</option>
          <option>blue-last</option>
        </select></label
      ><label
        >시점
        <select id="view">
          <option value="0">정면</option>
          <option value="2">오른쪽</option>
          <option value="-2">왼쪽</option>
        </select></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="opacity와 transparent"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      const geometry = new THREE.PlaneGeometry(3.2, 2.6);
      ownedGeometry.add(geometry);
      const redMaterial = new THREE.MeshBasicMaterial({
          color: '#ef4444',
          side: THREE.DoubleSide,
          opacity: 0.45,
          transparent: false,
          depthWrite: false,
        }),
        blueMaterial = new THREE.MeshBasicMaterial({
          color: '#2563eb',
          side: THREE.DoubleSide,
          opacity: 0.45,
          transparent: false,
          depthWrite: false,
        });
      ownedMaterial.add(redMaterial);
      ownedMaterial.add(blueMaterial);
      const red = new THREE.Mesh(geometry, redMaterial),
        blue = new THREE.Mesh(geometry, blueMaterial);
      red.rotation.y = 0.65;
      blue.rotation.y = -0.65;
      scene.add(red, blue);
      function apply() {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        for (const m of [redMaterial, blueMaterial]) {
          m.opacity = Number(input.value);
          m.transparent = document.querySelector('#transparent').checked;
          m.depthWrite = document.querySelector('#depthWrite').checked;
          m.needsUpdate = true;
        }
        const order = document.querySelector('#order').value;
        red.renderOrder = order === 'red-last' ? 1 : 0;
        blue.renderOrder = order === 'blue-last' ? 1 : 0;
        camera.position.set(Number(document.querySelector('#view').value), 0, 7);
        camera.lookAt(0, 0, 0);
        draw();
      }
      on('#apply', 'click', apply);
      apply();
      function report() {
        output.textContent =
          'opacity: ' +
          redMaterial.opacity +
          ' / transparent: ' +
          redMaterial.transparent +
          ' / depthWrite: ' +
          redMaterial.depthWrite +
          ' / renderOrder red,blue: ' +
          [red.renderOrder, blue.renderOrder] +
          ' / camera: ' +
          camera.position.toArray();
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
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
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      on('#cleanup', 'click', cleanup);
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

- opacity와 transparent를 다른 값으로 보세요.
- transparent를 먼저 체크하고 opacity를 비교하세요.
- transparent=true, opacity=.45로 적용하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

opacity만 바꿔서는 투명 패스로 이동하지 않습니다. transparent 변경 뒤 needsUpdate로 재질 설정을 갱신합니다. 이 실험은 MeshBasicMaterial을 써서 조명 차이를 배제합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>opacity와 transparent</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>opacity와 transparent</h1>
    <p>
      두 평면이 중앙에서 교차합니다. red는 Y=.65rad, blue는 Y=-.65rad이며 중심
      깊이는 같습니다. 같은 시점에서 한 설정만 바꾸세요. depthWrite=false와
      renderOrder는 객체 단위 혼합 결과를 바꿉니다. 서로 교차한 삼각형을 앞뒤로
      나누지 않으므로 모든 시점의 정확한 투명도는 보장하지 않습니다.
    </p>
    <div class="controls">
      <label
        >opacity
        <input
          id="value"
          type="number"
          min="0"
          max="1"
          step="0.05"
          value="0.45" /></label
      ><label
        ><input id="transparent" type="checkbox" checked />transparent</label
      ><label><input id="depthWrite" type="checkbox" />depthWrite</label
      ><label
        >객체 순서
        <select id="order">
          <option selected>auto</option>
          <option>red-last</option>
          <option>blue-last</option>
        </select></label
      ><label
        >시점
        <select id="view">
          <option value="0">정면</option>
          <option value="2">오른쪽</option>
          <option value="-2">왼쪽</option>
        </select></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="opacity와 transparent"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      const geometry = new THREE.PlaneGeometry(3.2, 2.6);
      ownedGeometry.add(geometry);
      const redMaterial = new THREE.MeshBasicMaterial({
          color: '#ef4444',
          side: THREE.DoubleSide,
          opacity: 0.45,
          transparent: true,
          depthWrite: false,
        }),
        blueMaterial = new THREE.MeshBasicMaterial({
          color: '#2563eb',
          side: THREE.DoubleSide,
          opacity: 0.45,
          transparent: true,
          depthWrite: false,
        });
      ownedMaterial.add(redMaterial);
      ownedMaterial.add(blueMaterial);
      const red = new THREE.Mesh(geometry, redMaterial),
        blue = new THREE.Mesh(geometry, blueMaterial);
      red.rotation.y = 0.65;
      blue.rotation.y = -0.65;
      scene.add(red, blue);
      function apply() {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        for (const m of [redMaterial, blueMaterial]) {
          m.opacity = Number(input.value);
          m.transparent = document.querySelector('#transparent').checked;
          m.depthWrite = document.querySelector('#depthWrite').checked;
          m.needsUpdate = true;
        }
        const order = document.querySelector('#order').value;
        red.renderOrder = order === 'red-last' ? 1 : 0;
        blue.renderOrder = order === 'blue-last' ? 1 : 0;
        camera.position.set(Number(document.querySelector('#view').value), 0, 7);
        camera.lookAt(0, 0, 0);
        draw();
      }
      on('#apply', 'click', apply);
      apply();
      function report() {
        output.textContent =
          'opacity: ' +
          redMaterial.opacity +
          ' / transparent: ' +
          redMaterial.transparent +
          ' / depthWrite: ' +
          redMaterial.depthWrite +
          ' / renderOrder red,blue: ' +
          [red.renderOrder, blue.renderOrder] +
          ' / camera: ' +
          camera.position.toArray();
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
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
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      on('#cleanup', 'click', cleanup);
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

</details>

- opacity=.45인데 불투명하면 무엇을 먼저 읽나요?
- opacity=0이면 깊이 기록도 자동 꺼지나요?

### depthWrite 비교

transparent=true, opacity=.45를 유지합니다. 시작은 depthWrite=true입니다. 빨강·파랑이 교차해 한 평면의 일부가 이미 기록한 깊이 때문에 뒤의 혼합을 막을 수 있습니다. depthWrite만 꺼서 적용하고 같은 시점의 좌우 겹침을 비교하세요.

depthTest는 그대로 true입니다. depthWrite=false는 자기 깊이를 버퍼에 쓰지 않을 뿐, 앞서 그린 불투명 물체의 깊이 검사를 끄지 않습니다. depthWrite를 켜고 끄며 auto와 red-last를 각각 비교합니다. 뒤 표면이 사라지는 현상을 줄여도 혼합 순서가 올바른지는 별개입니다.

**예상 결과**

false에서 가려졌던 색이 다시 섞이는 부분이 보입니다. output의 depthWrite만 바뀌고 opacity=.45와 transparent=true는 유지됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>깊이 기록과 혼합</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>깊이 기록과 혼합</h1>
    <p>
      두 평면이 중앙에서 교차합니다. red는 Y=.65rad, blue는 Y=-.65rad이며 중심
      깊이는 같습니다. 같은 시점에서 한 설정만 바꾸세요. depthWrite=false와
      renderOrder는 객체 단위 혼합 결과를 바꿉니다. 서로 교차한 삼각형을 앞뒤로
      나누지 않으므로 모든 시점의 정확한 투명도는 보장하지 않습니다.
    </p>
    <div class="controls">
      <label
        >opacity
        <input
          id="value"
          type="number"
          min="0"
          max="1"
          step="0.05"
          value="0.45" /></label
      ><label
        ><input id="transparent" type="checkbox" checked />transparent</label
      ><label><input id="depthWrite" type="checkbox" checked />depthWrite</label
      ><label
        >객체 순서
        <select id="order">
          <option selected>auto</option>
          <option>red-last</option>
          <option>blue-last</option>
        </select></label
      ><label
        >시점
        <select id="view">
          <option value="0">정면</option>
          <option value="2">오른쪽</option>
          <option value="-2">왼쪽</option>
        </select></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="깊이 기록과 혼합"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      const geometry = new THREE.PlaneGeometry(3.2, 2.6);
      ownedGeometry.add(geometry);
      const redMaterial = new THREE.MeshBasicMaterial({
          color: '#ef4444',
          side: THREE.DoubleSide,
          opacity: 0.45,
          transparent: true,
          depthWrite: true,
        }),
        blueMaterial = new THREE.MeshBasicMaterial({
          color: '#2563eb',
          side: THREE.DoubleSide,
          opacity: 0.45,
          transparent: true,
          depthWrite: true,
        });
      ownedMaterial.add(redMaterial);
      ownedMaterial.add(blueMaterial);
      const red = new THREE.Mesh(geometry, redMaterial),
        blue = new THREE.Mesh(geometry, blueMaterial);
      red.rotation.y = 0.65;
      blue.rotation.y = -0.65;
      scene.add(red, blue);
      function apply() {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        for (const m of [redMaterial, blueMaterial]) {
          m.opacity = Number(input.value);
          m.transparent = document.querySelector('#transparent').checked;
          m.depthWrite = document.querySelector('#depthWrite').checked;
          m.needsUpdate = true;
        }
        const order = document.querySelector('#order').value;
        red.renderOrder = order === 'red-last' ? 1 : 0;
        blue.renderOrder = order === 'blue-last' ? 1 : 0;
        camera.position.set(Number(document.querySelector('#view').value), 0, 7);
        camera.lookAt(0, 0, 0);
        draw();
      }
      on('#apply', 'click', apply);
      apply();
      function report() {
        output.textContent =
          'opacity: ' +
          redMaterial.opacity +
          ' / transparent: ' +
          redMaterial.transparent +
          ' / depthWrite: ' +
          redMaterial.depthWrite +
          ' / renderOrder red,blue: ' +
          [red.renderOrder, blue.renderOrder] +
          ' / camera: ' +
          camera.position.toArray();
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
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
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      on('#cleanup', 'click', cleanup);
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

- 같은 시점과 opacity를 유지하세요.
- depthWrite와 depthTest를 혼동하지 마세요.
- depthWrite 체크를 해제하고 적용한 뒤 좌우를 비교하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

투명한 물체는 보통 뒤에서 앞으로 혼합하며 깊이를 쓰지 않는 설정이 도움이 됩니다. 하지만 교차 표면은 한 객체 전체에 공통 앞뒤 순서가 없으므로 이 설정만으로 완전히 해결되지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>깊이 기록과 혼합</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>깊이 기록과 혼합</h1>
    <p>
      두 평면이 중앙에서 교차합니다. red는 Y=.65rad, blue는 Y=-.65rad이며 중심
      깊이는 같습니다. 같은 시점에서 한 설정만 바꾸세요. depthWrite=false와
      renderOrder는 객체 단위 혼합 결과를 바꿉니다. 서로 교차한 삼각형을 앞뒤로
      나누지 않으므로 모든 시점의 정확한 투명도는 보장하지 않습니다.
    </p>
    <div class="controls">
      <label
        >opacity
        <input
          id="value"
          type="number"
          min="0"
          max="1"
          step="0.05"
          value="0.45" /></label
      ><label
        ><input id="transparent" type="checkbox" checked />transparent</label
      ><label><input id="depthWrite" type="checkbox" />depthWrite</label
      ><label
        >객체 순서
        <select id="order">
          <option selected>auto</option>
          <option>red-last</option>
          <option>blue-last</option>
        </select></label
      ><label
        >시점
        <select id="view">
          <option value="0">정면</option>
          <option value="2">오른쪽</option>
          <option value="-2">왼쪽</option>
        </select></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="깊이 기록과 혼합"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      const geometry = new THREE.PlaneGeometry(3.2, 2.6);
      ownedGeometry.add(geometry);
      const redMaterial = new THREE.MeshBasicMaterial({
          color: '#ef4444',
          side: THREE.DoubleSide,
          opacity: 0.45,
          transparent: true,
          depthWrite: false,
        }),
        blueMaterial = new THREE.MeshBasicMaterial({
          color: '#2563eb',
          side: THREE.DoubleSide,
          opacity: 0.45,
          transparent: true,
          depthWrite: false,
        });
      ownedMaterial.add(redMaterial);
      ownedMaterial.add(blueMaterial);
      const red = new THREE.Mesh(geometry, redMaterial),
        blue = new THREE.Mesh(geometry, blueMaterial);
      red.rotation.y = 0.65;
      blue.rotation.y = -0.65;
      scene.add(red, blue);
      function apply() {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        for (const m of [redMaterial, blueMaterial]) {
          m.opacity = Number(input.value);
          m.transparent = document.querySelector('#transparent').checked;
          m.depthWrite = document.querySelector('#depthWrite').checked;
          m.needsUpdate = true;
        }
        const order = document.querySelector('#order').value;
        red.renderOrder = order === 'red-last' ? 1 : 0;
        blue.renderOrder = order === 'blue-last' ? 1 : 0;
        camera.position.set(Number(document.querySelector('#view').value), 0, 7);
        camera.lookAt(0, 0, 0);
        draw();
      }
      on('#apply', 'click', apply);
      apply();
      function report() {
        output.textContent =
          'opacity: ' +
          redMaterial.opacity +
          ' / transparent: ' +
          redMaterial.transparent +
          ' / depthWrite: ' +
          redMaterial.depthWrite +
          ' / renderOrder red,blue: ' +
          [red.renderOrder, blue.renderOrder] +
          ' / camera: ' +
          camera.position.toArray();
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
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
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      on('#cleanup', 'click', cleanup);
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

</details>

- 깊이를 쓰지 않는 것과 검사하지 않는 것은 어떻게 다른가요?
- depthWrite=false 뒤에도 색 순서가 틀릴 수 있는 이유는 무엇인가요?

### 객체 정렬의 한계

transparent=true, depthWrite=false에서 객체 순서를 auto→red-last→blue-last로 바꾸며 각각 적용합니다. renderOrder=1인 객체는 이 투명 객체 목록에서 뒤에 그립니다. 두 중심의 깊이가 같아 auto도 한 객체 전체를 먼저 정할 수밖에 없습니다.

같은 정면에서 순서만 바꾸면 겹친 색이 달라집니다. 빨강이 마지막이면 왼쪽·오른쪽 모두 빨강 기여가 뒤에 섞이지만 실제 표면 앞뒤는 중앙에서 바뀝니다. 오른쪽·왼쪽 시점에서도 비교하세요. renderOrder를 조절해 한 부분을 개선해도 반대 부분이나 다른 시점은 틀릴 수 있습니다. 관찰한 시점·순서·문제 구간을 필기에 적고 완전 해결로 결론내리지 마세요.

**예상 결과**

red-last와 blue-last에서 같은 픽셀의 겹친 색이 다릅니다. 어느 한 순서도 교차한 양쪽을 모든 시점에서 정확히 해결하지 못합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>교차 표면과 정렬 한계</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>교차 표면과 정렬 한계</h1>
    <p>
      두 평면이 중앙에서 교차합니다. red는 Y=.65rad, blue는 Y=-.65rad이며 중심
      깊이는 같습니다. 같은 시점에서 한 설정만 바꾸세요. depthWrite=false와
      renderOrder는 객체 단위 혼합 결과를 바꿉니다. 서로 교차한 삼각형을 앞뒤로
      나누지 않으므로 모든 시점의 정확한 투명도는 보장하지 않습니다.
    </p>
    <div class="controls">
      <label
        >opacity
        <input
          id="value"
          type="number"
          min="0"
          max="1"
          step="0.05"
          value="0.45" /></label
      ><label
        ><input id="transparent" type="checkbox" checked />transparent</label
      ><label><input id="depthWrite" type="checkbox" />depthWrite</label
      ><label
        >객체 순서
        <select id="order">
          <option selected>auto</option>
          <option>red-last</option>
          <option>blue-last</option>
        </select></label
      ><label
        >시점
        <select id="view">
          <option value="0">정면</option>
          <option value="2">오른쪽</option>
          <option value="-2">왼쪽</option>
        </select></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="교차 표면과 정렬 한계"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      const geometry = new THREE.PlaneGeometry(3.2, 2.6);
      ownedGeometry.add(geometry);
      const redMaterial = new THREE.MeshBasicMaterial({
          color: '#ef4444',
          side: THREE.DoubleSide,
          opacity: 0.45,
          transparent: true,
          depthWrite: false,
        }),
        blueMaterial = new THREE.MeshBasicMaterial({
          color: '#2563eb',
          side: THREE.DoubleSide,
          opacity: 0.45,
          transparent: true,
          depthWrite: false,
        });
      ownedMaterial.add(redMaterial);
      ownedMaterial.add(blueMaterial);
      const red = new THREE.Mesh(geometry, redMaterial),
        blue = new THREE.Mesh(geometry, blueMaterial);
      red.rotation.y = 0.65;
      blue.rotation.y = -0.65;
      scene.add(red, blue);
      function apply() {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        for (const m of [redMaterial, blueMaterial]) {
          m.opacity = Number(input.value);
          m.transparent = document.querySelector('#transparent').checked;
          m.depthWrite = document.querySelector('#depthWrite').checked;
          m.needsUpdate = true;
        }
        const order = document.querySelector('#order').value;
        red.renderOrder = order === 'red-last' ? 1 : 0;
        blue.renderOrder = order === 'blue-last' ? 1 : 0;
        camera.position.set(Number(document.querySelector('#view').value), 0, 7);
        camera.lookAt(0, 0, 0);
        draw();
      }
      on('#apply', 'click', apply);
      apply();
      function report() {
        output.textContent =
          'opacity: ' +
          redMaterial.opacity +
          ' / transparent: ' +
          redMaterial.transparent +
          ' / depthWrite: ' +
          redMaterial.depthWrite +
          ' / renderOrder red,blue: ' +
          [red.renderOrder, blue.renderOrder] +
          ' / camera: ' +
          camera.position.toArray();
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
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
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      on('#cleanup', 'click', cleanup);
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

- 정면에서 순서만 먼저 바꾸세요.
- 두 객체 중심 깊이는 같아도 표면 깊이는 좌우에서 다릅니다.
- auto/red-last/blue-last를 각각 적용하고 그다음 시점을 바꾸세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

source-over 혼합은 순서에 따라 색이 달라집니다. Three.js의 일반 정렬은 객체 단위이며 교차 삼각형을 자동 분할하지 않습니다. 표면 분할이나 별도 투명도 기법은 이 예제 밖의 선택이며 이 단원은 한계를 재현합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>교차 표면과 정렬 한계</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>교차 표면과 정렬 한계</h1>
    <p>
      두 평면이 중앙에서 교차합니다. red는 Y=.65rad, blue는 Y=-.65rad이며 중심
      깊이는 같습니다. 같은 시점에서 한 설정만 바꾸세요. depthWrite=false와
      renderOrder는 객체 단위 혼합 결과를 바꿉니다. 서로 교차한 삼각형을 앞뒤로
      나누지 않으므로 모든 시점의 정확한 투명도는 보장하지 않습니다.
    </p>
    <div class="controls">
      <label
        >opacity
        <input
          id="value"
          type="number"
          min="0"
          max="1"
          step="0.05"
          value="0.45" /></label
      ><label
        ><input id="transparent" type="checkbox" checked />transparent</label
      ><label><input id="depthWrite" type="checkbox" />depthWrite</label
      ><label
        >객체 순서
        <select id="order">
          <option>auto</option>
          <option>red-last</option>
          <option selected>blue-last</option>
        </select></label
      ><label
        >시점
        <select id="view">
          <option value="0">정면</option>
          <option value="2">오른쪽</option>
          <option value="-2">왼쪽</option>
        </select></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="교차 표면과 정렬 한계"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      const geometry = new THREE.PlaneGeometry(3.2, 2.6);
      ownedGeometry.add(geometry);
      const redMaterial = new THREE.MeshBasicMaterial({
          color: '#ef4444',
          side: THREE.DoubleSide,
          opacity: 0.45,
          transparent: true,
          depthWrite: false,
        }),
        blueMaterial = new THREE.MeshBasicMaterial({
          color: '#2563eb',
          side: THREE.DoubleSide,
          opacity: 0.45,
          transparent: true,
          depthWrite: false,
        });
      ownedMaterial.add(redMaterial);
      ownedMaterial.add(blueMaterial);
      const red = new THREE.Mesh(geometry, redMaterial),
        blue = new THREE.Mesh(geometry, blueMaterial);
      red.rotation.y = 0.65;
      blue.rotation.y = -0.65;
      scene.add(red, blue);
      function apply() {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        for (const m of [redMaterial, blueMaterial]) {
          m.opacity = Number(input.value);
          m.transparent = document.querySelector('#transparent').checked;
          m.depthWrite = document.querySelector('#depthWrite').checked;
          m.needsUpdate = true;
        }
        const order = document.querySelector('#order').value;
        red.renderOrder = order === 'red-last' ? 1 : 0;
        blue.renderOrder = order === 'blue-last' ? 1 : 0;
        camera.position.set(Number(document.querySelector('#view').value), 0, 7);
        camera.lookAt(0, 0, 0);
        draw();
      }
      on('#apply', 'click', apply);
      apply();
      function report() {
        output.textContent =
          'opacity: ' +
          redMaterial.opacity +
          ' / transparent: ' +
          redMaterial.transparent +
          ' / depthWrite: ' +
          redMaterial.depthWrite +
          ' / renderOrder red,blue: ' +
          [red.renderOrder, blue.renderOrder] +
          ' / camera: ' +
          camera.position.toArray();
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
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
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      on('#cleanup', 'click', cleanup);
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

</details>

- 객체 중심 정렬은 교차 삼각형을 왜 해결하지 못하나요?
- 한 시점의 보기 좋은 결과를 전체 해결로 말하면 왜 틀리나요?

### API · Material.opacity / transparent

혼합 비율과 투명 패스 사용을 각각 설정합니다.

- `opacity: number` — 0~1, 예제 .45
- `transparent: boolean` — 기본 false

반환값 없는 프로퍼티 설정입니다.

- opacity만으로 투명 패스를 켜지 못합니다. transparent 변경 뒤 needsUpdate를 설정하세요.

```js
material.opacity=.45;material.transparent=true;material.needsUpdate=true;
```

[Material.opacity / transparent](https://threejs.org/docs/pages/Material.html) · three@0.186.1 · 2026-10-27

### API · Material.depthWrite

표면이 깊이 버퍼를 쓰는지 정합니다.

- `depthWrite: boolean` — 기본 true

반환값 없는 프로퍼티 설정입니다.

- false는 depthTest를 끄지 않으며 정렬 오류도 모두 해결하지 않습니다.

```js
material.depthWrite=false;
```

[Material.depthWrite](https://threejs.org/docs/pages/Material.html) · three@0.186.1 · 2026-10-27

### API · Object3D.renderOrder

객체 목록 안의 그리기 순서를 조정합니다.

- `renderOrder: number` — 기본 0; 큰 값이 뒤

반환값 없는 프로퍼티 설정입니다.

- 불투명·투명 목록은 따로 정렬합니다. 교차 삼각형 분할이나 픽셀 단위 정렬을 하지 않습니다.

```js
red.renderOrder=1;blue.renderOrder=0;
```

[Object3D.renderOrder](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 클립 애니메이션](../17/README.md) · [다음: 인스턴싱 기초](../19/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
