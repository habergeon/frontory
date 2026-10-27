# Three.js · 18 Transparency and Depth

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Animation, Instancing, and Render Passes · Editable example · Storage ID: `threejs-step-18`

## Goals and learning outcomes

- Distinguish opaque depth handling from transparent compositing.
- Explain remaining sorting limitations with screenshots.

## Prerequisites

Prerequisite units: 03, 09. Apply their concepts in these experiments.

## Key concepts and explanations

### opacity and the transparent pass

opacity alone does not move a material into the transparent pass. Set needsUpdate after changing transparent. MeshBasicMaterial removes lighting differences from this comparison.

### Compare depthWrite

Transparent objects generally blend back to front, often benefiting from disabled depth writes. Intersecting surfaces have no single front/back object order, so this setting cannot fully solve them.

## Practice setup

Edit and run independent HTML in the site using Three.js 0.186.1 and addons from the same installation. No separate installation or server is needed. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. The starter has opacity=.45 but transparent=false, so the planes render opaque. Enable transparent and Apply. opacity=.45 controls the source contribution; blending must be enabled to mix with colors behind it. Compare 0, .45, and 1 at the same overlap.

red rotates Y=.65rad and blue Y=-.65rad; DoubleSide shows their back faces too. Change one input, Apply, and read actual material values alongside the image. Even opacity=0 can write depth with depthWrite=true and hide later surfaces; distinguish that in the next step. 2. Keep transparent=true and opacity=.45. The starter has depthWrite=true. With intersecting planes, depth already written by part of one plane can block later blending. Disable only depthWrite, Apply, and compare left/right overlaps at the same view.

depthTest stays true. depthWrite=false stops writing this surface depth; it does not disable testing against previously drawn opaque objects. Compare on/off under auto and red-last separately. Reducing missing surfaces does not guarantee correct blending order. 3. With transparent=true and depthWrite=false, apply auto → red-last → blue-last separately. renderOrder=1 draws an object later within this transparent list. Equal-depth centers still force auto sorting to put one whole object first.

At the same front view, changing order changes overlap color. Drawing red last mixes its contribution later on both sides even though actual front/back surfaces swap at the center. Compare right and left views too. renderOrder may improve one region while worsening another or another view. Record view, order, and incorrect regions without calling this a complete solution.

## Variables to observe

| Variable   | Baseline | Change | Expected change / hypothesis                                             |
| ---------- | -------- | ------ | ------------------------------------------------------------------------ |
| depthWrite | true     | false  | Occlusion changes, but not every transparency-sorting problem is solved. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish opaque depth handling from transparent compositing.
- [ ] Explain remaining sorting limitations with screenshots.

## Self-check

1. What should you check first when opacity=.45 still looks opaque?
2. How does not writing depth differ from not testing it?
3. Why can center-based object sorting not resolve intersecting triangles?

## Official references

- [Three.js Material](https://threejs.org/docs/pages/Material.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js Transparency](https://threejs.org/manual/pages/transparency.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-18/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run HTML starters inside the site. Complete the experiments and record actual results in notes.

- [example.html](../../../../../../../src/labs/threejs-step-18/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Continue view and material concepts from 03 and 09 with intersecting transparent planes. Red and blue share center depth but exchange front/back across the image. Change opacity, transparent, depthWrite, and object order separately; record overlap colors at the same view. Object sorting cannot fully solve transparency for intersecting surfaces.

### Prerequisite units

- `threejs-step-03`
- `threejs-step-09`

### opacity and the transparent pass

The starter has opacity=.45 but transparent=false, so the planes render opaque. Enable transparent and Apply. opacity=.45 controls the source contribution; blending must be enabled to mix with colors behind it. Compare 0, .45, and 1 at the same overlap.

red rotates Y=.65rad and blue Y=-.65rad; DoubleSide shows their back faces too. Change one input, Apply, and read actual material values alongside the image. Even opacity=0 can write depth with depthWrite=true and hide later surfaces; distinguish that in the next step.

**Expected result**

With transparent=false, .45 still looks opaque. With true, colors and background blend; opacity 0/1 changes their contribution.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>opacity and transparent</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>opacity and transparent</h1>
    <p>
      Two planes intersect at the center. red rotates Y=.65rad and blue
      Y=-.65rad, with equal center depth. Change one setting at the same view.
      depthWrite=false and renderOrder change object-level blending, but do not
      split intersecting triangles, so they cannot guarantee correct
      transparency from every view.
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
        >Object order
        <select id="order">
          <option selected>auto</option>
          <option>red-last</option>
          <option>blue-last</option>
        </select></label
      ><label
        >View
        <select id="view">
          <option value="0">Front</option>
          <option value="2">Right</option>
          <option value="-2">Left</option>
        </select></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="opacity and transparent"></canvas></div>
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
        output.textContent = 'Disposed';
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
<summary>Hints</summary>

- Treat opacity and transparent as separate settings.
- Enable transparent before comparing opacity.
- Apply transparent=true and opacity=.45.

</details>

<details>
<summary>Solution and explanation</summary>

opacity alone does not move a material into the transparent pass. Set needsUpdate after changing transparent. MeshBasicMaterial removes lighting differences from this comparison.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>opacity and transparent</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>opacity and transparent</h1>
    <p>
      Two planes intersect at the center. red rotates Y=.65rad and blue
      Y=-.65rad, with equal center depth. Change one setting at the same view.
      depthWrite=false and renderOrder change object-level blending, but do not
      split intersecting triangles, so they cannot guarantee correct
      transparency from every view.
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
        >Object order
        <select id="order">
          <option selected>auto</option>
          <option>red-last</option>
          <option>blue-last</option>
        </select></label
      ><label
        >View
        <select id="view">
          <option value="0">Front</option>
          <option value="2">Right</option>
          <option value="-2">Left</option>
        </select></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="opacity and transparent"></canvas></div>
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
        output.textContent = 'Disposed';
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

- What should you check first when opacity=.45 still looks opaque?
- Does opacity=0 automatically disable depth writes?

### Compare depthWrite

Keep transparent=true and opacity=.45. The starter has depthWrite=true. With intersecting planes, depth already written by part of one plane can block later blending. Disable only depthWrite, Apply, and compare left/right overlaps at the same view.

depthTest stays true. depthWrite=false stops writing this surface depth; it does not disable testing against previously drawn opaque objects. Compare on/off under auto and red-last separately. Reducing missing surfaces does not guarantee correct blending order.

**Expected result**

With false, previously blocked color can blend again. Only depthWrite changes; opacity=.45 and transparent=true remain.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Depth writes and blending</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Depth writes and blending</h1>
    <p>
      Two planes intersect at the center. red rotates Y=.65rad and blue
      Y=-.65rad, with equal center depth. Change one setting at the same view.
      depthWrite=false and renderOrder change object-level blending, but do not
      split intersecting triangles, so they cannot guarantee correct
      transparency from every view.
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
        >Object order
        <select id="order">
          <option selected>auto</option>
          <option>red-last</option>
          <option>blue-last</option>
        </select></label
      ><label
        >View
        <select id="view">
          <option value="0">Front</option>
          <option value="2">Right</option>
          <option value="-2">Left</option>
        </select></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Depth writes and blending"></canvas>
    </div>
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
        output.textContent = 'Disposed';
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
<summary>Hints</summary>

- Keep view and opacity fixed.
- Distinguish depthWrite from depthTest.
- Disable depthWrite, Apply, and compare left and right.

</details>

<details>
<summary>Solution and explanation</summary>

Transparent objects generally blend back to front, often benefiting from disabled depth writes. Intersecting surfaces have no single front/back object order, so this setting cannot fully solve them.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Depth writes and blending</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Depth writes and blending</h1>
    <p>
      Two planes intersect at the center. red rotates Y=.65rad and blue
      Y=-.65rad, with equal center depth. Change one setting at the same view.
      depthWrite=false and renderOrder change object-level blending, but do not
      split intersecting triangles, so they cannot guarantee correct
      transparency from every view.
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
        >Object order
        <select id="order">
          <option selected>auto</option>
          <option>red-last</option>
          <option>blue-last</option>
        </select></label
      ><label
        >View
        <select id="view">
          <option value="0">Front</option>
          <option value="2">Right</option>
          <option value="-2">Left</option>
        </select></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Depth writes and blending"></canvas>
    </div>
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
        output.textContent = 'Disposed';
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

- How does not writing depth differ from not testing it?
- Why can blending order remain wrong with depthWrite=false?

### Limits of object sorting

With transparent=true and depthWrite=false, apply auto → red-last → blue-last separately. renderOrder=1 draws an object later within this transparent list. Equal-depth centers still force auto sorting to put one whole object first.

At the same front view, changing order changes overlap color. Drawing red last mixes its contribution later on both sides even though actual front/back surfaces swap at the center. Compare right and left views too. renderOrder may improve one region while worsening another or another view. Record view, order, and incorrect regions without calling this a complete solution.

**Expected result**

red-last and blue-last produce different overlap colors at the same pixels. Neither order correctly resolves both sides from every view.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Intersecting surfaces and sorting limits</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Intersecting surfaces and sorting limits</h1>
    <p>
      Two planes intersect at the center. red rotates Y=.65rad and blue
      Y=-.65rad, with equal center depth. Change one setting at the same view.
      depthWrite=false and renderOrder change object-level blending, but do not
      split intersecting triangles, so they cannot guarantee correct
      transparency from every view.
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
        >Object order
        <select id="order">
          <option selected>auto</option>
          <option>red-last</option>
          <option>blue-last</option>
        </select></label
      ><label
        >View
        <select id="view">
          <option value="0">Front</option>
          <option value="2">Right</option>
          <option value="-2">Left</option>
        </select></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Intersecting surfaces and sorting limits"></canvas>
    </div>
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
        output.textContent = 'Disposed';
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
<summary>Hints</summary>

- First change only order at the front view.
- Equal center depth does not mean equal surface depth on each side.
- Apply auto/red-last/blue-last, then compare views.

</details>

<details>
<summary>Solution and explanation</summary>

Source-over color blending depends on order. Ordinary Three.js sorting works per object without automatically splitting intersecting triangles. Surface splitting or other transparency techniques are beyond this example; the exercise reproduces the limitation.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Intersecting surfaces and sorting limits</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Intersecting surfaces and sorting limits</h1>
    <p>
      Two planes intersect at the center. red rotates Y=.65rad and blue
      Y=-.65rad, with equal center depth. Change one setting at the same view.
      depthWrite=false and renderOrder change object-level blending, but do not
      split intersecting triangles, so they cannot guarantee correct
      transparency from every view.
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
        >Object order
        <select id="order">
          <option>auto</option>
          <option>red-last</option>
          <option selected>blue-last</option>
        </select></label
      ><label
        >View
        <select id="view">
          <option value="0">Front</option>
          <option value="2">Right</option>
          <option value="-2">Left</option>
        </select></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Intersecting surfaces and sorting limits"></canvas>
    </div>
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
        output.textContent = 'Disposed';
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

- Why can center-based object sorting not resolve intersecting triangles?
- Why is an attractive single view insufficient to claim a general solution?

### API · Material.opacity / transparent

Sets blend contribution separately from transparent-pass participation.

- `opacity: number` — 0–1; .45 here
- `transparent: boolean` — Default false

Property assignments have no return value.

- opacity alone does not enable transparency. Set needsUpdate after changing transparent.

```js
material.opacity=.45;material.transparent=true;material.needsUpdate=true;
```

[Material.opacity / transparent](https://threejs.org/docs/pages/Material.html) · three@0.186.1 · 2026-10-27

### API · Material.depthWrite

Controls whether the surface writes to the depth buffer.

- `depthWrite: boolean` — Default true

Property assignment has no return value.

- false does not disable depthTest or solve all sorting errors.

```js
material.depthWrite=false;
```

[Material.depthWrite](https://threejs.org/docs/pages/Material.html) · three@0.186.1 · 2026-10-27

### API · Object3D.renderOrder

Adjusts drawing order within object lists.

- `renderOrder: number` — Default 0; larger values draw later

Property assignment has no return value.

- Opaque/transparent lists are separate. It does not split triangles or sort per pixel.

```js
red.renderOrder=1;blue.renderOrder=0;
```

[Object3D.renderOrder](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Clip Animation](../17/README.md) · [Next: Instancing Basics](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
