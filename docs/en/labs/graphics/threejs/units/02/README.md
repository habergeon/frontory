# Three.js · 02 Renderer and Display Size

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Coordinates, Cameras, and Geometry · Editable example · Storage ID: `threejs-step-02`

## Goals and learning outcomes

- Preserve shape proportions after resizing.
- Handle a hidden container with a size of 0.

## Prerequisites

Review Scene, Camera, Mesh, and render. Independent HTML starters do not require previous result files.

## Key concepts and explanations

### Buffer Size

The renderer’s drawing buffer differs from its CSS display size. Increasing pixelRatio processes more pixels for the same display area.

### Aspect Ratio

A PerspectiveCamera aspect is the viewport ratio. After resizing, call updateProjectionMatrix to apply the new projection.

## Practice setup

Edit and run independent HTML inside the site. The site supplies three@0.186.1; no separate project, installation, or external images are required.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Compare 240×240 and 480×240 buttons in display/buffer and record actual CSS and buffer dimensions.
2. Add aspect and projection updates in buffer/camera, then connect element observation in observer.
3. Compare actual pixel counts at DPR 1 and 2, then verify recovery after hiding. Record conditions, predictions, actual images and numbers, and reasons in the site notes.

## Variables to observe

| Variable       | Baseline | Change | Expected change / hypothesis                                   |
| -------------- | -------- | ------ | -------------------------------------------------------------- |
| viewport ratio | 1:1      | 2:1    | Updating aspect preserves the front-facing square proportions. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Preserve shape proportions after resizing.
- [ ] Handle a hidden container with a size of 0.

## Self-check

1. What does the third argument of setSize control?
2. How does the cost of the screen area change as DPR increases?

## Official references

- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-02/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run HTML starters inside the site. Read the step-by-step guidance and API references, then record actual results in the site notes.

- [example.html](../../../../../../../src/labs/threejs-step-02/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Match CSS display size, drawing buffer size, and camera aspect as separate concerns. Each independent HTML starter contains a front-facing BoxGeometry(1, 1, .2) and does not require previous code. stage has no padding/border; canvas uses display:block; width:100%; height:100%. The 240×240 and 480×240 conditions are examples when space permits. On narrow screens max-width can limit them; use actual w,h from output. Record shape proportions, CSS size, buffer size, and DPR in the site notes. Predict before running, change one item at a time, and use the site notes: conditions / prediction / actual image and numbers / reason for differences. The site supplies the three import; no separate installation is needed.

### Prerequisite units

- `threejs-01`
- `css-step-04`
- `css-step-07`

### Display size and buffer size

Initially DPR=1 and camera.aspect=1 in a square stage. renderer.setSize runs only once at startup. The camera looks from (0, 0, 5) toward the origin; the box has no rotation, making its front-face proportions easy to observe.

Use the size button to increase only stage width, then read CSS and buffer dimensions. stage.clientWidth/clientHeight use CSS px; canvas.width/height use buffer px. CSS can display the old buffer image over a wider area without drawing additional pixels. A changed display ratio can stretch the square horizontally.

In every example startWhenVisible uses requestAnimationFrame to wait for the first positive size, calls resizeScene once, then stops. A callback is a function the browser invokes before a later repaint; return ends this function call. This bootstrap does not observe later changes. addEventListener runs a function on click; assigning a CSS length string to stage.style.width changes display width only. reportSize reads current client and buffer dimensions and displays them through output.textContent. querySelector finds HTML elements; renderer.domElement is the same canvas supplied from HTML. In output, toFixed(4) formats a number as a string with four decimal places; + joins strings. Buffer pixel count is canvas.width × canvas.height.

**Expected result**

stage width changes while canvas.width/height keep their initial values. The square can appear stretched. On narrow screens target and measured dimensions can differ.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Display size and buffer size</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
    </div>
    <div id="stage">
      <canvas aria-label="Compare front-face proportions"></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\nLast valid aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\nBuffer pixel count: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\nZero size: skipping this update.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        // ASPECT: camera.aspect remains 1 for now.
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));



      // Wait only for the first visible size, then stop after one initialization.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Read the CSS px and buffer px output rows separately.
- Compare whether canvas.width changes after changing stage width.
- Displaying a 240×240 buffer at 480×240 stretches it 2 times horizontally. Calculate the same ratio from your actual output.

</details>

<details>
<summary>Solution and explanation</summary>

with a 240×240 buffer displayed at 480×240, the same image is stretched 2 times horizontally. If actual width differs from 480, substitute the output values. Read the actual stage size rather than body or window width. Automatic resizing is intentionally absent in this step.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Display size and buffer size — solution</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
    </div>
    <div id="stage">
      <canvas aria-label="Compare front-face proportions"></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\nLast valid aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\nBuffer pixel count: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\nZero size: skipping this update.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        // ASPECT: camera.aspect remains 1 for now.
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));



      // Wait only for the first visible size, then stop after one initialization.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

</details>

- Does changing CSS width always change buffer width?
- Why can stage width differ from window width?

### Match the buffer and camera separately

The starter resizeScene() reads w=stage.clientWidth, h=stage.clientHeight and calls renderer.setSize(w, h, false). The size button calls it, but camera.aspect is still 1. Choose a wide size and check that buffer dimensions match display dimensions. The square can still appear stretched.

After setSize in resizeScene(), add camera.aspect = w / h; camera.updateProjectionMatrix();. Compare the same sizes again. aspect is width/height; updateProjectionMatrix applies that ratio to projection calculations. Changing only one is insufficient.

**Expected result**

setSize alone matches the buffer but can leave shape proportions wrong. Updating aspect and projection together preserves the front-face proportions.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Match the buffer and camera separately</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
    </div>
    <div id="stage">
      <canvas aria-label="Compare front-face proportions"></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\nLast valid aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\nBuffer pixel count: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\nZero size: skipping this update.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        // ASPECT: camera.aspect remains 1 for now.
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        resizeScene();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));



      // Wait only for the first visible size, then stop after one initialization.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Compare display w/h with camera.aspect.
- Check for updateProjectionMatrix after assigning camera.aspect.
- Use renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); before rendering.

</details>

<details>
<summary>Solution and explanation</summary>

matching the buffer determines how many pixels are drawn. Camera projection determines the proportions used to place objects into that pixel region. With fixed vertical FOV, a wider view shows more of the scene horizontally without flattening objects. false in setSize prevents CSS display-size changes, not buffer changes.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Match the buffer and camera separately — solution</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
    </div>
    <div id="stage">
      <canvas aria-label="Compare front-face proportions"></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\nLast valid aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\nBuffer pixel count: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\nZero size: skipping this update.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        resizeScene();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));



      // Wait only for the first visible size, then stop after one initialization.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

</details>

- Why can a shape stretch even when the buffer size matches?
- What does false prevent in the third setSize argument?

### Observe element size changes

This independent starter includes the completed resizeScene(). Now the size button only changes CSS and no longer calls resizeScene directly. The initial frame matches, but later stage changes do not.

Create observer = new ResizeObserver(resizeScene) and connect observer.observe(stage). ResizeObserver is a browser Web API, not Three.js. It calls the callback when an observed element changes size. Keep the initial resizeScene() call to size the first frame immediately.

Leave window dimensions unchanged and press the stage size button. The observer responds to the element's own size changes. Observe stage, which defines the size, rather than canvas. stage has no padding/border and canvas fills it at 100%, making the measurement basis clear.

**Expected result**

Changing only the stage button matches measured dimensions, buffer, and aspect without resizing the browser window. resizeScene redraws the image too.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Observe element size changes</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
    </div>
    <div id="stage">
      <canvas aria-label="Compare front-face proportions"></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\nLast valid aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\nBuffer pixel count: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\nZero size: skipping this update.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));


      // OBSERVER: Connect ResizeObserver here.
      // Wait only for the first visible size, then stop after one initialization.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Check output to see whether changing only stage CSS runs resizeScene.
- Check that observer.observe receives stage rather than canvas.
- Connect const observer = new ResizeObserver(resizeScene); observer.observe(stage); resizeScene();.

</details>

<details>
<summary>Solution and explanation</summary>

the observer does not understand cameras or buffers automatically. The resizeScene callback performs setSize, aspect and projection updates, and rendering. If dimensions oscillate, check false in setSize, canvas CSS, and that stage is observed. Use observer.disconnect() when observation ends.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Observe element size changes — solution</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
    </div>
    <div id="stage">
      <canvas aria-label="Compare front-face proportions"></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\nLast valid aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\nBuffer pixel count: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\nZero size: skipping this update.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));


      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      // Wait only for the first visible size, then stop after one initialization.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

</details>

- Why can a window resize listener be insufficient?
- Does the observer itself call render?

### Compare DPR 1 and 2

The starter includes resizing and starts with dpr=1. output displays actual CSS w,h, canvas.width/height, camera.aspect, and dpr. Change dpr to 2 and call renderer.setPixelRatio(dpr) followed by renderer.setSize(w, h, false). w,h must be CSS dimensions, not values already multiplied by DPR.

For a 240×240 CSS display, DPR 1 gives a 240×240 buffer and DPR 2 gives 480×480. Pixel count rises from 57,600 to 230,400, a factor of 4. For other display dimensions, use actual w,h. camera.aspect remains w/h without DPR multiplication.

The input value is a string, so Number(input.value) converts it to a number. The change event runs when the selection changes. Add renderer.setPixelRatio(dpr); at the DPR comment in resizeScene, then compare input values 1 and 2.

**Expected result**

CSS size and camera.aspect stay unchanged. At DPR 2 each buffer axis becomes 2 times larger and pixel count becomes 4 times larger. A 240×240 display gives a 480×480 buffer.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Compare DPR 1 and 2</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
      <label
        >DPR
        <select id="dpr">
          <option value="1">1</option>
          <option value="2">2</option>
        </select></label
      >
    </div>
    <div id="stage">
      <canvas aria-label="Compare front-face proportions"></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\nLast valid aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\nBuffer pixel count: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\nZero size: skipping this update.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        // DPR: Add setPixelRatio(dpr) here.
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));
      document.querySelector('#dpr').addEventListener('change', (event) => {
        dpr = Number(event.target.value);
        resizeScene();
      });

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      // Wait only for the first visible size, then stop after one initialization.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Record CSS px and buffer px side by side and calculate each axis ratio.
- Check whether setSize receives w*dpr, h*dpr by mistake.
- In renderer.setPixelRatio(2); renderer.setSize(w, h, false);, w,h are measured CSS dimensions. camera.aspect is w/h.

</details>

<details>
<summary>Solution and explanation</summary>

DPR affects buffer resolution along both axes. It does not request making CSS display size or scene-object size 2 times larger. Although devicePixelRatio can vary by device or browser zoom, this experiment explicitly uses 1 and 2. A sharpness difference may be subtle and processing time is not necessarily 4 times greater. Multiplying DPR 2 times gives a factor of 4 along each buffer axis; inspect setSize arguments if that happens.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Compare DPR 1 and 2 — solution</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
      <label
        >DPR
        <select id="dpr">
          <option value="1">1</option>
          <option value="2">2</option>
        </select></label
      >
    </div>
    <div id="stage">
      <canvas aria-label="Compare front-face proportions"></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\nLast valid aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\nBuffer pixel count: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\nZero size: skipping this update.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));
      document.querySelector('#dpr').addEventListener('change', (event) => {
        dpr = Number(event.target.value);
        resizeScene();
      });

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      // Wait only for the first visible size, then stop after one initialization.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

</details>

- Why does DPR 2 give 4 times as many pixels?
- Should DPR also multiply camera.aspect?
- Does 4 times as many pixels guarantee 4 times the processing time?

### Hide and show the stage

The starter has buttons to hide and show stage. After reading w,h near the start of resizeScene(), check if (w === 0 || h === 0) return;. output reports hidden dimensions without claiming a newly valid aspect.

Hide and show stage. With display:none, client dimensions can be 0. Do not divide w/h when h=0 or substitute 1 and label the result normal. The observer keeps watching stage and calls resizeScene when it has size again.

stage.hidden is a boolean property controlling visibility. Buttons and output are outside stage, so they remain usable while it is hidden. The hidden output aspect is the last valid value, not a newly computed ratio.

**Expected result**

Hidden dimensions are reported as 0 without division by 0. Showing stage restores finite aspect and current buffer dimensions while preserving shape proportions.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hide and show the stage</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
      <label
        >DPR
        <select id="dpr">
          <option value="1">1</option>
          <option value="2">2</option>
        </select></label
      >
      <button id="hide">Hide</button><button id="show">Show</button>
    </div>
    <div id="stage">
      <canvas aria-label="Compare front-face proportions"></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\nLast valid aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\nBuffer pixel count: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\nZero size: skipping this update.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));
      document.querySelector('#dpr').addEventListener('change', (event) => {
        dpr = Number(event.target.value);
        resizeScene();
      });
      document.querySelector('#hide').addEventListener('click', () => { stage.hidden = true; resizeScene(); });
      document.querySelector('#show').addEventListener('click', () => { stage.hidden = false; });
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      // Wait only for the first visible size, then stop after one initialization.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Read whether stage.clientWidth/clientHeight become 0 while hidden.
- Check that the zero-size guard precedes w/h.
- Place setSize, aspect, projection, and render after if (w === 0 || h === 0) return;. The observer calls the same function after showing.

</details>

<details>
<summary>Solution and explanation</summary>

return skips this size update. It does not disconnect the observer or terminate the program. After showing, setSize and aspect use the actual dimensions and render restores the image. To finish, record shape proportions and numbers for square/wide, DPR 1/2, and recovery from hiding.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hide and show the stage — solution</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 240px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      #stage[hidden] { display: none; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button>
      <button id="wide">480 × 240</button>
      <label
        >DPR
        <select id="dpr">
          <option value="1">1</option>
          <option value="2">2</option>
        </select></label
      >
      <button id="hide">Hide</button><button id="show">Show</button>
    </div>
    <div id="stage">
      <canvas aria-label="Compare front-face proportions"></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      let dpr = 1;
      function reportSize() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        output.textContent = 'CSS px: ' + w + ' × ' + h + '\nBuffer px: ' + canvas.width + ' × ' + canvas.height
          + '\nLast valid aspect: ' + camera.aspect.toFixed(4) + '\nDPR: ' + renderer.getPixelRatio()
          + '\nBuffer pixel count: ' + canvas.width * canvas.height
          + (w === 0 || h === 0 ? '\nZero size: skipping this update.' : '');
      }
      function resizeScene() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        if (w === 0 || h === 0) { reportSize(); return; }
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        reportSize();
      }
      function changeWidth(width) {
        stage.style.width = width + 'px';
        reportSize();
      }
      document.querySelector('#square').addEventListener('click', () => changeWidth(240));
      document.querySelector('#wide').addEventListener('click', () => changeWidth(480));
      document.querySelector('#dpr').addEventListener('change', (event) => {
        dpr = Number(event.target.value);
        resizeScene();
      });
      document.querySelector('#hide').addEventListener('click', () => { stage.hidden = true; resizeScene(); });
      document.querySelector('#show').addEventListener('click', () => { stage.hidden = false; });
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      // Wait only for the first visible size, then stop after one initialization.
      function startWhenVisible() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) {
          requestAnimationFrame(startWhenVisible);
          return;
        }
        resizeScene();
      }
      startWhenVisible();
    </script>
  </body>
</html>
```

</details>

- How does replacing 0 with 1 differ from skipping an update?
- Why can the image recover after the function returned?

### API · THREE.Scene

Constructor for a scene root. Scene inherits Object3D and connects children with add. Its background member defaults to null.

Returns a new Scene. Construction alone does not draw to a canvas.

- Scene is not an HTML element.

```js
const scene = new THREE.Scene();
scene.add(cube);
```

[THREE.Scene](https://threejs.org/docs/pages/Scene.html) · three@0.186.1 · 2026-10-26

### API · THREE.Color

Constructor for a color object. This course uses CSS hex strings only.

- `value: string` — A CSS hex color string, such as '#edf2f7'.

Returns a new Color.

- Color spaces and linear RGB calculations are later topics.

```js
scene.background = new THREE.Color('#edf2f7');
```

[THREE.Color](https://threejs.org/docs/pages/Color.html) · three@0.186.1 · 2026-10-26

### API · THREE.WebGLRenderer / renderer.domElement

Constructor for a renderer that draws WebGL2 scenes to a canvas. domElement refers to its actual output canvas.

- `canvas: HTMLCanvasElement` — The canvas selected from HTML. Omitting it creates a new canvas.
- `antialias: boolean` — Requests edge antialiasing at construction. (false)

Returns a renderer. domElement is a canvas reference, not a method.

- WebGL2 support is required. Pass your existing canvas to use it.

```js
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
const actualCanvas = renderer.domElement;
```

[THREE.WebGLRenderer / renderer.domElement](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · renderer.setSize

Instance method that sets renderer logical size and viewport. It also resizes the canvas buffer using DPR.

- `width: number` — Logical width in CSS px.
- `height: number` — Logical height in CSS px.
- `updateStyle: boolean` — When true, also changes canvas inline CSS width and height. (true)

No return value. The buffer becomes floor(width*DPR) × floor(height*DPR).

- Use false when CSS manages display size. Do not pass dimensions already multiplied by DPR.

```js
renderer.setSize(w, h, false);
```

[renderer.setSize](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · renderer.render

Instance method that draws the scene through a camera onto the current canvas.

- `scene: Scene` — The scene to draw.
- `camera: Camera` — The camera defining position, direction, and projection.

No return value. Updates the current image.

- Changing object properties does not automatically call this method.

```js
renderer.render(scene, camera);
```

[renderer.render](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · THREE.PerspectiveCamera

Constructor for a perspective camera, where distant objects appear smaller. Arguments are positional.

- `fov: number` — Vertical field of view in degrees. (50)
- `aspect: number` — Display width divided by height. (1)
- `near: number` — Depth of the near plane in front of the camera. (0.1)
- `far: number` — Depth of the far plane. (2000)

Returns a new PerspectiveCamera.

- Set near>0 and far>near. fov uses degrees rather than the radians used by rotation.
- Call updateProjectionMatrix after changing fov/aspect/near/far/zoom.

```js
const camera = new THREE.PerspectiveCamera(50, w / h, .1, 50);
```

[THREE.PerspectiveCamera](https://threejs.org/docs/pages/PerspectiveCamera.html) · three@0.186.1 · 2026-10-26

### API · THREE.BoxGeometry

Constructor for a box centered at the origin, with edges parallel to local X/Y/Z.

- `width: number` — Length along local X. (1)
- `height: number` — Length along local Y. (1)
- `depth: number` — Length along local Z. (1)

Returns a new BoxGeometry.

- Segment arguments are omitted here and each defaults to 1. Editing parameters.width does not rebuild vertices.

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
```

[THREE.BoxGeometry](https://threejs.org/docs/pages/BoxGeometry.html) · three@0.186.1 · 2026-10-26

### API · THREE.MeshBasicMaterial

Constructor for a surface appearance unaffected by lights.

- `color: Color | string | number` — The examples use CSS hex strings. (0xffffff)
- `wireframe: boolean` — When true, displays triangle edges. (false)

Returns a new material.

- If this material is invisible, check Scene connection, camera, and render before adding lights.

```js
const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
```

[THREE.MeshBasicMaterial](https://threejs.org/docs/pages/MeshBasicMaterial.html) · three@0.186.1 · 2026-10-26

### API · THREE.Mesh

Constructor for a scene object combining geometry and material.

- `geometry: BufferGeometry` — The shape object.
- `material: Material` — The surface appearance object.

Returns a new Mesh without adding it to Scene.

- This course supplies both arguments rather than relying on omitted defaults.

```js
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

[THREE.Mesh](https://threejs.org/docs/pages/Mesh.html) · three@0.186.1 · 2026-10-26

### API · object.position / Vector3.set

position is a Vector3 member holding a position relative to the parent. position.set is a Vector3 method that changes its components.

- `x: number` — Position along the parent X axis.
- `y: number` — Position along the parent Y axis.
- `z: number` — Position along the parent Z axis.

position initially is (0, 0, 0). set mutates it and returns the same Vector3.

- Change x/y/z or use set; do not replace position with an array.

```js
cube.position.set(1, 0, 0);
cube.position.x = 2;
```

[object.position / Vector3.set](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · camera.lookAt

Method that points a camera toward a world-space target.

- `x: number` — Target world X. An overload accepts a single Vector3.
- `y: number` — Target world Y.
- `z: number` — Target world Z.

No return value. Changes camera rotation without moving its position.

- Non-uniformly scaled parents are unsupported. With controls, avoid having lookAt and controls.update overwrite orientation each frame.

```js
camera.position.set(2, 0, 5);
camera.lookAt(0, 0, 0);
```

[camera.lookAt](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · object.add

Method that connects other Object3D instances as children.

- `children: Object3D[]` — Children to connect. Multiple arguments are accepted.

Returns the parent itself. Children are removed from their previous parents.

- An object has one parent. Its local transform is retained, but its world position is not guaranteed to stay the same.

```js
parent.add(child);
scene.add(parent);
```

[object.add](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · renderer.setPixelRatio / renderer.getPixelRatio

Method that sets buffer pixels per CSS pixel. getPixelRatio() takes no arguments and returns the currently configured ratio as a number.

- `value: number` — The experiment explicitly uses 1 or 2. The initial renderer ratio is 1.

No return value. Resizes the buffer using the current logical size.

- It does not automatically read devicePixelRatio.
- A ratio of 2 affects both axes, giving 4 times as many pixels, not necessarily 4 times the processing time.

```js
renderer.setPixelRatio(2);
renderer.setSize(w, h, false);
```

[renderer.setPixelRatio / renderer.getPixelRatio](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · camera.updateProjectionMatrix

Method that applies changed fov/aspect/near/far/zoom values to the projection matrix. Orthographic cameras expose the same method.

No return value. The next render uses the updated projection.

- Property assignment does not call this automatically.
- Distinguish camera movement from changes to projection values.

```js
camera.aspect = w / h;
camera.updateProjectionMatrix();
```

[camera.updateProjectionMatrix](https://threejs.org/docs/pages/PerspectiveCamera.html) · three@0.186.1 · 2026-10-26

### API · canvas.width/height / stage.clientWidth/clientHeight

DOM members for display and buffer dimensions. clientWidth/clientHeight use CSS px; canvas.width/height use buffer px. The same Element clientWidth/clientHeight contract applies to canvas.

Property reads yield dimension numbers. Client dimensions are integers and include padding but exclude borders. The corresponding scrollbar is also excluded.

- These are Web APIs, not Three.js APIs. packageVersion records the lesson Three.js version.
- The example stage has no padding/border. Do not mix direct canvas buffer assignments with renderer size management.
- Display-size sources: https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth and https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight

```js
const w = stage.clientWidth;
const h = stage.clientHeight;
output.textContent = `${w} × ${h}; ${canvas.width} × ${canvas.height}`;
```

[canvas.width/height / stage.clientWidth/clientHeight](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/width) · three@0.186.1 · 2026-10-26

### API · ResizeObserver / observe / disconnect

Web API that reports element size changes through a callback, including stage changes without window resizing.

- `callback: function` — Function called for size changes. The generic snippet below passes resizeScene; unit 01 passes draw.
- `target: Element` — Element observed with observe(target). The snippet uses stage; unit 01 observes canvas.

The constructor returns an observer. observe and disconnect return no value. disconnect stops observation.

- This is not a Three.js API. packageVersion records the lesson Three.js version.
- Return before division if w or h is 0. An observer does not replace render.

```js
const observer = new ResizeObserver(resizeScene);
observer.observe(stage);
resizeScene();
// When observation ends: observer.disconnect();
```

[ResizeObserver / observe / disconnect](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) · three@0.186.1 · 2026-10-26

## Next learning

[Previous: Scene Graphs and Cameras](../../01-foundations/README.md) · [Next: Perspective and Orthographic Projection](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
