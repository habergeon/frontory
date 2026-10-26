# Three.js · 03 Perspective and Orthographic Projection

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Coordinates, Cameras, and Geometry · Editable example · Storage ID: `threejs-step-03`

## Goals and learning outcomes

- Display the same scene with both projections.
- Reproduce clipping of an object outside near.

## Prerequisites

Review Scene, Camera, and sizing. Independent HTML requires no previous result files.

## Key concepts and explanations

### Perspective Projection

PerspectiveCamera makes distant objects appear smaller. near and far limit the visible depth range.

### Orthographic Projection

With OrthographicCamera, distance does not change size. This is useful for CAD-style layouts and comparison diagrams.

## Practice setup

Edit and run independent HTML inside the site. The site supplies three@0.186.1 and addons; no separate project, installation, or external images are required.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Observe two cubes at different depths; compare distance 9→13 and FOV 50→30 separately.
2. Compare orthographic distance/zoom and resizing of both cameras; reproduce partial/whole near clipping and far clipping.
3. Compare OrbitControls camera/target with object coordinates and observe CameraHelper from overview. Record conditions, predictions, actual images and numbers, and reasons in the site notes.

## Variables to observe

| Variable | Baseline          | Change             | Expected change / hypothesis                              |
| -------- | ----------------- | ------------------ | --------------------------------------------------------- |
| Camera   | PerspectiveCamera | OrthographicCamera | Cubes at different depths appear the same size on screen. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Display the same scene with both projections.
- [ ] Reproduce clipping of an object outside near.

## Self-check

1. How does an orthographic camera determine zoom without FOV?
2. What problems might an excessively small near cause?

## Official references

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-03/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run HTML starters inside the site. Read the steps and API reference, then record actual results in the site notes.

- [example.html](../../../../../../../src/labs/threejs-step-03/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Compare the same scene with perspective and orthographic cameras. Change distance, FOV, near/far, and viewing target one at a time and explain why objects become smaller or disappear. Each independent HTML starter includes the resizing already introduced. No external GUI is required; labeled inputs and buttons support the baseline experiments. Restore the baseline before comparisons and record camera type, position, target, and projection values.

Record conditions / prediction / actual image and numbers / reason in the site notes. Selecting a step or opening explanations keeps your code. Only confirmed loading replaces it.

### Prerequisite units

- `threejs-01`
- `threejs-step-02`
- `javascript-step-02`
- `javascript-step-12`
- `javascript-step-18`

### Two objects at different depths

The starter contains A and B, both using BoxGeometry(1, 1, 1). A=(-1, 0, 2), B=(1, 0, -2); distinct colors and text names identify them. camera=(0, 0, 9), lookAt=(0, 0, 0), fov=50, near=.1, far=30. Neither cube is rotated.

Read object and camera coordinates in output and predict which appears larger. A's center is at camera depth 7; B's is at depth 11. A world z value is not itself camera depth. This camera looks along -Z from z=9, so 9-2=7 and 9-(-2)=11.

Do not resize B to match A. Observe the unmodified objects. Perspective projection makes closer objects appear larger. Both geometry widths remain 1; only projected widths differ. Keep the x positions so the objects do not obscure each other.

querySelector finds DOM elements and textContent displays strings. coords uses toFixed(2) for display strings without changing positions. Blue A is on the left, orange B on the right; use A/B names and coordinates as well as color. scene → A, B is the object tree. This step is observation; keep both geometries unchanged.

Sizing is supplied support code. resizeScene reads stage.clientWidth/clientHeight in CSS px and returns at zero. A continuous ResizeObserver redraws after hidden preview becomes visible or changes size. setPixelRatio(1) fixes experimental DPR; setSize(w,h,false) preserves CSS. Update perspective aspect and orthographic bounds separately, then updateProjectionMatrix and render. The 240×240 / 480×240 buttons change stage.style.width; max-width may reduce actual width in a narrow preview. Record actual CSS/buffer output. input.value is a string, read with Number. change/click listeners connect committed inputs and buttons; press Apply after editing numbers. HTML min/max/step and checkValidity check the input ranges.

querySelectorAll collects numeric inputs. [...collection] makes an array; the every callback checks each input.checkValidity(). Any invalid input displays an error and returns. event.target identifies the changed select or checkbox; value/checked read its selection. hidden controls zoom visibility; disabled prevents editing the unused FOV input in orthographic view. String converts the initial distance to the string used by input.value.

**Expected result**

Of the two objects of width 1, A at camera depth 7 appears larger than B at depth 11. output shows actual object and camera coordinates.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Two objects at different depths</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">Reset reference</button>

      <label
        >Camera Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">Apply</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas
        aria-label="Camera projection comparison: A left, B right"
      ></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);


      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = 'View: ' + 'PerspectiveCamera'
          + '\nCamera position: ' + coords(activeCamera.position)
          + '\nA (blue): ' + coords(cubeA.position) + ' / B (orange): ' + coords(cubeB.position)
          + '\nObject Y rotation: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far



          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // Supplied sizing: update each projection separately; keep this support code intact.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();


        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = 'Check numeric input ranges and steps.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far must be greater than near.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });



      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Distinguish geometry width from projected width. Both geometries have width 1.
- Use camera.z=9 and object z values to check the front-facing depths 7,11.
- Restore A=(-1, 0, 2), B=(1, 0, -2), camera=(0, 0, 9) for the baseline where A appears larger.

</details>

<details>
<summary>Solution and explanation</summary>

this difference is caused by projected depth, not geometry size or material. If you rotate the camera, the simple 9-z calculation no longer generally applies. Restore the baseline before comparing.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Two objects at different depths</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">Reset reference</button>

      <label
        >Camera Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">Apply</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas
        aria-label="Camera projection comparison: A left, B right"
      ></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);


      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = 'View: ' + 'PerspectiveCamera'
          + '\nCamera position: ' + coords(activeCamera.position)
          + '\nA (blue): ' + coords(cubeA.position) + ' / B (orange): ' + coords(cubeB.position)
          + '\nObject Y rotation: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far



          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // Supplied sizing: update each projection separately; keep this support code intact.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();


        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = 'Check numeric input ranges and steps.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far must be greater than near.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });



      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- Why do equal geometries have different image sizes?
- Does B at z=-2 have camera depth -2?

### Camera distance and FOV

This starter contains the same cubes and a restore-baseline button. applyCameraSettings() converts inputs with Number before applying them. The baseline is camera.z=9, fov=50. Keep the two experiments separate.

First hold fov=50 and change only camera.z from 9 to 13, retaining the origin as the lookAt target. Compare how both objects shrink. Their center depths become A=11, B=15. Restore the baseline, keep camera.z=9, and reduce only fov from 50 to 30. Call camera.updateProjectionMatrix() after assigning fov.

FOV is the vertical viewing angle in degrees. A smaller FOV shows a narrower area at larger image scale from the same position. Moving the camera closer may look similar, but relative sizes at different depths are not always identical.

After the input experiments, edit code too: change baselineDistance = 9 to 13 and run. Restore 9, then change baselineFov = 50 to 30. The solution starts at distance 9/FOV 30; inputs can restore the 9/50 reference.

**Expected result**

At camera.z=13 both objects shrink and their relative size difference changes. After restoring, fov=30 enlarges both while position and depths remain 7/11.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Camera distance and FOV</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">Reset reference</button>

      <label
        >Camera Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">Apply</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas
        aria-label="Camera projection comparison: A left, B right"
      ></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      document.querySelector('#fov').value = String(baselineFov);
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);


      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = 'View: ' + 'PerspectiveCamera'
          + '\nCamera position: ' + coords(activeCamera.position)
          + '\nA (blue): ' + coords(cubeA.position) + ' / B (orange): ' + coords(cubeB.position)
          + '\nObject Y rotation: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far



          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // Supplied sizing: update each projection separately; keep this support code intact.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();


        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = 'Check numeric input ranges and steps.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far must be greater than near.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });



      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Check output for fov=50 in the distance experiment and camera.z=9 in the FOV experiment.
- Check updateProjectionMatrix after assigning camera.fov.
- Restore the baseline and use camera.fov = 30; camera.updateProjectionMatrix(); for FOV only. The distance experiment uses camera.position.z = 13.

</details>

<details>
<summary>Solution and explanation</summary>

moving changes A/B center depths from 7/11 to 11/15. FOV changes projection scale while keeping position and depths fixed. Recording both only as zoom misses this difference. If FOV input has no effect, check the camera passed to render and its projection update.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Camera distance and FOV</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">Reset reference</button>

      <label
        >Camera Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="30"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">Apply</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas
        aria-label="Camera projection comparison: A left, B right"
      ></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 30;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);


      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = 'View: ' + 'PerspectiveCamera'
          + '\nCamera position: ' + coords(activeCamera.position)
          + '\nA (blue): ' + coords(cubeA.position) + ' / B (orange): ' + coords(cubeB.position)
          + '\nObject Y rotation: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far



          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // Supplied sizing: update each projection separately; keep this support code intact.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();


        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = 'Check numeric input ranges and steps.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far must be greater than near.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });



      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- Do distance movement and FOV changes always match across multiple depths?
- Does changing FOV also move camera.position?

### Orthographic projection and magnification

The starter has subjectCamera and ortho cameras, with only activeCamera passed to render. Both use position (0, 0, 9) and the origin as target. Perspective FOV and orthographic bounds are different settings, so the overall scene scale need not match exactly at the switch.

The orthographic settings are halfHeight=3, left=-halfHeight*aspect, right=halfHeight*aspect, top=halfHeight, bottom=-halfHeight, near=.1, far=30. Compare A/B sizes, then move ortho.position.z from 9 to 13. Keep orientation, bounds, and zoom=1 fixed, with objects inside the clipping range.

Restore distance 9, change ortho.zoom from 1 to 2, and call ortho.updateProjectionMatrix(). Orthographic magnification is set by bounds or zoom rather than distance. On resize, retain halfHeight, recompute left/right from the new aspect, and update projection. Assigning ortho.aspect is not a solution.

Projection selects activeCamera as subjectCamera or ortho. The zoom input appears only for orthographic view. The solution starts at orthographic distance 9/zoom 2. Reset restores perspective 9/50 and orthographic half-height 3/zoom 1 together. FOV is disabled in orthographic view; use zoom to magnify.

**Expected result**

A and B appear equally sized in orthographic mode and keep their sizes as camera.z changes 9→13. zoom=1→2 enlarges both. Changing stage proportions preserves shape proportions.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Orthographic projection and magnification</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">Reset reference</button>
      <label
        >Projection
        <select id="projection">
          <option value="perspective">PerspectiveCamera</option>
          <option value="ortho">OrthographicCamera</option>
        </select></label
      >

      <label
        >Camera Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>
      <span id="zoom-field" hidden
        ><label
          >zoom
          <input
            id="zoom"
            type="number"
            value="1"
            min="0.5"
            max="3"
            step="0.5"
            required /></label
      ></span>

      <button id="apply">Apply</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas
        aria-label="Camera projection comparison: A left, B right"
      ></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);
      const halfHeight = 3;
      const ortho = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 30);
      ortho.position.set(0, 0, baselineDistance);
      ortho.lookAt(0, 0, 0);
      ortho.zoom = 1;

      let activeCamera = subjectCamera;
      document.querySelector('#fov').disabled = activeCamera !== subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = 'View: ' + (activeCamera === subjectCamera ? 'PerspectiveCamera' : 'OrthographicCamera')
          + '\nCamera position: ' + coords(activeCamera.position)
          + '\nA (blue): ' + coords(cubeA.position) + ' / B (orange): ' + coords(cubeB.position)
          + '\nObject Y rotation: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far
          + '\northo zoom: ' + ortho.zoom + ' / left/right: ' + ortho.left.toFixed(2) + ' / ' + ortho.right.toFixed(2)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // Supplied sizing: update each projection separately; keep this support code intact.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();
        ortho.left = -halfHeight * w / h;
        ortho.right = halfHeight * w / h;
        ortho.top = halfHeight;
        ortho.bottom = -halfHeight;
        ortho.updateProjectionMatrix();

        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = 'Check numeric input ranges and steps.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far must be greater than near.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        if (camera === subjectCamera) camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;
        if (camera === ortho) camera.zoom = Number(document.querySelector('#zoom').value);
        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;
        document.querySelector('#projection').value = 'perspective';
        document.querySelector('#zoom').value = '1';
        document.querySelector('#zoom-field').hidden = true;
        document.querySelector('#fov').disabled = false;
        ortho.position.set(0, 0, 9); ortho.lookAt(0, 0, 0); ortho.zoom = 1; ortho.near = 0.1; ortho.far = 30;
        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });
      document.querySelector('#projection').addEventListener('change', event => {
        activeCamera = event.target.value === 'ortho' ? ortho : subjectCamera;
        document.querySelector('#zoom-field').hidden = activeCamera !== ortho;
        document.querySelector('#fov').disabled = activeCamera === ortho;
        document.querySelector('#distance').value = String(activeCamera.position.z);
        document.querySelector('#near').value = String(activeCamera.near);
        document.querySelector('#far').value = String(activeCamera.far);

        resizeScene();
      });


      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Check that activeCamera is the selected ortho.
- Compare the left/right versus top/bottom range ratio with stage w/h.
- Keep halfHeight=3, set left/right=±halfHeight*aspect and top/bottom=±halfHeight, then call updateProjectionMatrix.

</details>

<details>
<summary>Solution and explanation</summary>

under orthographic projection, equally sized objects with the same orientation do not shrink with depth. Moving the camera to change depth alone retains image size. zoom=2 narrows the visible range and enlarges objects. Orthographic images can still stretch if resizing is omitted.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Orthographic projection and magnification</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">Reset reference</button>
      <label
        >Projection
        <select id="projection">
          <option value="perspective">PerspectiveCamera</option>
          <option value="ortho" selected>OrthographicCamera</option>
        </select></label
      >

      <label
        >Camera Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>
      <span id="zoom-field"
        ><label
          >zoom
          <input
            id="zoom"
            type="number"
            value="2"
            min="0.5"
            max="3"
            step="0.5"
            required /></label
      ></span>

      <button id="apply">Apply</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas
        aria-label="Camera projection comparison: A left, B right"
      ></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);
      const halfHeight = 3;
      const ortho = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 30);
      ortho.position.set(0, 0, baselineDistance);
      ortho.lookAt(0, 0, 0);
      ortho.zoom = 2;

      let activeCamera = ortho;
      document.querySelector('#fov').disabled = activeCamera !== subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = 'View: ' + (activeCamera === subjectCamera ? 'PerspectiveCamera' : 'OrthographicCamera')
          + '\nCamera position: ' + coords(activeCamera.position)
          + '\nA (blue): ' + coords(cubeA.position) + ' / B (orange): ' + coords(cubeB.position)
          + '\nObject Y rotation: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far
          + '\northo zoom: ' + ortho.zoom + ' / left/right: ' + ortho.left.toFixed(2) + ' / ' + ortho.right.toFixed(2)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // Supplied sizing: update each projection separately; keep this support code intact.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();
        ortho.left = -halfHeight * w / h;
        ortho.right = halfHeight * w / h;
        ortho.top = halfHeight;
        ortho.bottom = -halfHeight;
        ortho.updateProjectionMatrix();

        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = 'Check numeric input ranges and steps.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far must be greater than near.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        if (camera === subjectCamera) camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;
        if (camera === ortho) camera.zoom = Number(document.querySelector('#zoom').value);
        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;
        document.querySelector('#projection').value = 'perspective';
        document.querySelector('#zoom').value = '1';
        document.querySelector('#zoom-field').hidden = true;
        document.querySelector('#fov').disabled = false;
        ortho.position.set(0, 0, 9); ortho.lookAt(0, 0, 0); ortho.zoom = 1; ortho.near = 0.1; ortho.far = 30;
        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });
      document.querySelector('#projection').addEventListener('change', event => {
        activeCamera = event.target.value === 'ortho' ? ortho : subjectCamera;
        document.querySelector('#zoom-field').hidden = activeCamera !== ortho;
        document.querySelector('#fov').disabled = activeCamera === ortho;
        document.querySelector('#distance').value = String(activeCamera.position.z);
        document.querySelector('#near').value = String(activeCamera.near);
        document.querySelector('#far').value = String(activeCamera.far);

        resizeScene();
      });


      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- How is orthographic magnification determined?
- Why is assigning camera.aspect insufficient for an orthographic camera?

### Near and far clipping

The starter restores the perspective baseline: camera=(0, 0, 9), A=(-1, 0, 2), B=(1, 0, -2), near=.1, far=30. Controls are off. near/far are front/back planes at camera-space depths, not spheres at distances from the origin. Keep .1>0 and far>near.

Change near from .1 to 7 and then 8, calling updateProjectionMatrix each time. A's center depth is 7, but a cube is not a point. With side length 1 its surface depths span [6.5, 7.5]. near=7 clips part of A; near=8 puts all of A in front of the near plane so it disappears. B spans [10.5, 11.5] and remains.

Restore the baseline, hold near=.1, and change only far from 30 to 9. Predict which cube disappears and record the actual image with its settings. Do not use only the center to claim that near=7 hides A completely.

Apply near/far inputs after editing. For an invalid range, read the inline error and restore near>0 and far>near. The solution starts at near=8, far=30; reset before comparing partial clipping.

**Expected result**

near=7 clips part of A; near=8 hides A. After restoring near=.1, far=9 hides B. Restoring the settings shows both objects again.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Near and far clipping</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">Reset reference</button>

      <label
        >Camera Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">Apply</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas
        aria-label="Camera projection comparison: A left, B right"
      ></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);


      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = 'View: ' + 'PerspectiveCamera'
          + '\nCamera position: ' + coords(activeCamera.position)
          + '\nA (blue): ' + coords(cubeA.position) + ' / B (orange): ' + coords(cubeB.position)
          + '\nObject Y rotation: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far



          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // Supplied sizing: update each projection separately; keep this support code intact.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();


        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = 'Check numeric input ranges and steps.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far must be greater than near.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });



      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Distinguish A center depth 7 from surface range [6.5, 7.5].
- Check projection updates on the current activeCamera after near/far changes.
- near=8, far=30 hides A but retains B. near=.1, far=9 retains A but hides B.

</details>

<details>
<summary>Solution and explanation</summary>

far=9 includes A's depth range but lies before B's range, so B disappears. Clipping does not delete an object from Scene. Restoring near/far shows it again. A perspective near value extremely close to 0 can reduce depth precision; choose a range that is needed. Do not use near=0 for this perspective camera.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Near and far clipping</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">Reset reference</button>

      <label
        >Camera Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="8"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">Apply</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas
        aria-label="Camera projection comparison: A left, B right"
      ></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 8, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);


      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = 'View: ' + 'PerspectiveCamera'
          + '\nCamera position: ' + coords(activeCamera.position)
          + '\nA (blue): ' + coords(cubeA.position) + ' / B (orange): ' + coords(cubeB.position)
          + '\nObject Y rotation: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far



          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // Supplied sizing: update each projection separately; keep this support code intact.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();


        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = 'Check numeric input ranges and steps.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far must be greater than near.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;


        error.textContent = '';
        resizeScene();
      });



      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- Why does near=7 not hide all of A?
- Is an extremely small near always better?
- Has a clipped object been deleted from Scene?

### Camera target and OrbitControls

This independent HTML explicitly imports { OrbitControls } from 'three/addons/controls/OrbitControls.js'. controls = new OrbitControls(activeCamera, canvas) connects a camera and the canvas receiving events. controls.target is a world-space target, initially (0, 0, 0). Apply target.set(0, 0, 0) with controls.update().

From the baseline, use left drag and the wheel while comparing camera.position, controls.target, and object positions in output. Dragging orbits the camera rather than rotating the objects. The wheel primarily changes perspective camera distance or orthographic zoom. Inputs and buttons also support baseline distance/target/projection experiments, so required tasks do not rely only on mouse interaction.

Change enableDamping from false to true and call controls.update() in the loop. Inertia needs updates each frame. In numeric comparison mode, disable interaction with controls.enabled=false and also guard loop updates with if (controls.enabled) controls.update(). On camera switches, dispose old controls, create controls for the new activeCamera, and apply target and update.

Edit damping = false to true and run. The loop already includes if (controls.enabled) controls.update(). Numeric comparison sets enabled=false and stops loop updates. Apply disposes and reconnects controls to clear residual inertia, then applies numeric position/target. Camera X and target X allow keyboard comparison of position and viewing direction. Uncheck comparison to resume pointer interaction. setAnimationLoop receives the function called each frame. coords reads the three position numbers; output also reports object rotations.

**Expected result**

Dragging changes camera.position while object positions stay the same. Output shows distance changes for perspective wheel interaction and zoom changes for orthographic interaction. With damping=true, loop updates continue the motion.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Camera target and OrbitControls</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">Reset reference</button>
      <label
        >Projection
        <select id="projection">
          <option value="perspective">PerspectiveCamera</option>
          <option value="ortho">OrthographicCamera</option>
        </select></label
      >

      <label
        >Camera Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>
      <span id="zoom-field" hidden
        ><label
          >zoom
          <input
            id="zoom"
            type="number"
            value="1"
            min="0.5"
            max="3"
            step="0.5"
            required /></label
      ></span>
      <label
        >camera X
        <input
          id="camera-x"
          type="number"
          value="0"
          min="-5"
          max="5"
          step="0.5"
          required /></label
      ><label
        >target X
        <input
          id="target-x"
          type="number"
          value="0"
          min="-3"
          max="3"
          step="0.5"
          required /></label
      ><label
        ><input id="compare" type="checkbox" />Numeric comparison (disable
        interaction)</label
      >
      <button id="apply">Apply</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas
        aria-label="Camera projection comparison: A left, B right"
      ></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);
      const halfHeight = 3;
      const ortho = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 30);
      ortho.position.set(0, 0, baselineDistance);
      ortho.lookAt(0, 0, 0);
      ortho.zoom = 1;

      let activeCamera = subjectCamera;
      document.querySelector('#fov').disabled = activeCamera !== subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const damping = false;
      let controls;
      function connectControls() {
        if (controls) controls.dispose();
        controls = new OrbitControls(activeCamera, canvas);
        controls.target.set(Number(document.querySelector('#target-x').value), 0, 0);
        controls.enableDamping = damping;
        controls.update();
        controls.enabled = !document.querySelector('#compare').checked;
      }
      connectControls();
      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = 'View: ' + (activeCamera === subjectCamera ? 'PerspectiveCamera' : 'OrthographicCamera')
          + '\nCamera position: ' + coords(activeCamera.position)
          + '\nA (blue): ' + coords(cubeA.position) + ' / B (orange): ' + coords(cubeB.position)
          + '\nObject Y rotation: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far
          + '\northo zoom: ' + ortho.zoom + ' / left/right: ' + ortho.left.toFixed(2) + ' / ' + ortho.right.toFixed(2)
          + '\ncontrols.target: ' + coords(controls.target) + ' / enabled: ' + controls.enabled + ' / damping: ' + controls.enableDamping

          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // Supplied sizing: update each projection separately; keep this support code intact.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();
        ortho.left = -halfHeight * w / h;
        ortho.right = halfHeight * w / h;
        ortho.top = halfHeight;
        ortho.bottom = -halfHeight;
        ortho.updateProjectionMatrix();

        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = 'Check numeric input ranges and steps.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far must be greater than near.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(Number(document.querySelector('#camera-x').value), 0, Number(document.querySelector('#distance').value));
        if (camera === subjectCamera) camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;
        if (camera === ortho) camera.zoom = Number(document.querySelector('#zoom').value);
        camera.updateProjectionMatrix();
        connectControls();

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;
        document.querySelector('#projection').value = 'perspective';
        document.querySelector('#zoom').value = '1';
        document.querySelector('#zoom-field').hidden = true;
        document.querySelector('#fov').disabled = false;
        ortho.position.set(0, 0, 9); ortho.lookAt(0, 0, 0); ortho.zoom = 1; ortho.near = 0.1; ortho.far = 30;
        activeCamera = subjectCamera;

        document.querySelector('#camera-x').value = '0';
        document.querySelector('#target-x').value = '0';
        document.querySelector('#compare').checked = false;
        connectControls();
        error.textContent = '';
        resizeScene();
      });
      document.querySelector('#projection').addEventListener('change', event => {
        activeCamera = event.target.value === 'ortho' ? ortho : subjectCamera;
        document.querySelector('#zoom-field').hidden = activeCamera !== ortho;
        document.querySelector('#fov').disabled = activeCamera === ortho;
        document.querySelector('#distance').value = String(activeCamera.position.z);
        document.querySelector('#near').value = String(activeCamera.near);
        document.querySelector('#far').value = String(activeCamera.far);
        document.querySelector('#camera-x').value = String(activeCamera.position.x);
        connectControls();
        resizeScene();
      });

      document.querySelector('#compare').addEventListener('change', () => {
        controls.enabled = !document.querySelector('#compare').checked;
        draw();
      });
      renderer.setAnimationLoop(() => {
        if (controls.enabled) controls.update();
        draw();
      });
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Read which changes in output: object position or camera.position.
- Check update after target changes and every frame with damping.
- On camera switches use controls.dispose(); controls = new OrbitControls(activeCamera, canvas); controls.target.set(0, 0, 0); controls.update();.

</details>

<details>
<summary>Solution and explanation</summary>

if lookAt and controls both set orientation each frame, the last call can overwrite the earlier one and make the view jump. Use target consistently while controls manage orientation. enabled=false does not cancel every explicit update call. If switching cameras still moves the old one, inspect which camera was passed to the controls constructor.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Camera target and OrbitControls</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">Reset reference</button>
      <label
        >Projection
        <select id="projection">
          <option value="perspective">PerspectiveCamera</option>
          <option value="ortho">OrthographicCamera</option>
        </select></label
      >

      <label
        >Camera Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="30"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>
      <span id="zoom-field" hidden
        ><label
          >zoom
          <input
            id="zoom"
            type="number"
            value="1"
            min="0.5"
            max="3"
            step="0.5"
            required /></label
      ></span>
      <label
        >camera X
        <input
          id="camera-x"
          type="number"
          value="0"
          min="-5"
          max="5"
          step="0.5"
          required /></label
      ><label
        >target X
        <input
          id="target-x"
          type="number"
          value="0"
          min="-3"
          max="3"
          step="0.5"
          required /></label
      ><label
        ><input id="compare" type="checkbox" />Numeric comparison (disable
        interaction)</label
      >
      <button id="apply">Apply</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas
        aria-label="Camera projection comparison: A left, B right"
      ></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 30);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);
      const halfHeight = 3;
      const ortho = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 30);
      ortho.position.set(0, 0, baselineDistance);
      ortho.lookAt(0, 0, 0);
      ortho.zoom = 1;

      let activeCamera = subjectCamera;
      document.querySelector('#fov').disabled = activeCamera !== subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const damping = true;
      let controls;
      function connectControls() {
        if (controls) controls.dispose();
        controls = new OrbitControls(activeCamera, canvas);
        controls.target.set(Number(document.querySelector('#target-x').value), 0, 0);
        controls.enableDamping = damping;
        controls.update();
        controls.enabled = !document.querySelector('#compare').checked;
      }
      connectControls();
      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = 'View: ' + (activeCamera === subjectCamera ? 'PerspectiveCamera' : 'OrthographicCamera')
          + '\nCamera position: ' + coords(activeCamera.position)
          + '\nA (blue): ' + coords(cubeA.position) + ' / B (orange): ' + coords(cubeB.position)
          + '\nObject Y rotation: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far
          + '\northo zoom: ' + ortho.zoom + ' / left/right: ' + ortho.left.toFixed(2) + ' / ' + ortho.right.toFixed(2)
          + '\ncontrols.target: ' + coords(controls.target) + ' / enabled: ' + controls.enabled + ' / damping: ' + controls.enableDamping

          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // Supplied sizing: update each projection separately; keep this support code intact.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();
        ortho.left = -halfHeight * w / h;
        ortho.right = halfHeight * w / h;
        ortho.top = halfHeight;
        ortho.bottom = -halfHeight;
        ortho.updateProjectionMatrix();

        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = 'Check numeric input ranges and steps.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far must be greater than near.'; return; }
        error.textContent = '';
        const camera = activeCamera;
        camera.position.set(Number(document.querySelector('#camera-x').value), 0, Number(document.querySelector('#distance').value));
        if (camera === subjectCamera) camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;
        if (camera === ortho) camera.zoom = Number(document.querySelector('#zoom').value);
        camera.updateProjectionMatrix();
        connectControls();

        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '30';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 30; subjectCamera.zoom = 1;
        document.querySelector('#projection').value = 'perspective';
        document.querySelector('#zoom').value = '1';
        document.querySelector('#zoom-field').hidden = true;
        document.querySelector('#fov').disabled = false;
        ortho.position.set(0, 0, 9); ortho.lookAt(0, 0, 0); ortho.zoom = 1; ortho.near = 0.1; ortho.far = 30;
        activeCamera = subjectCamera;

        document.querySelector('#camera-x').value = '0';
        document.querySelector('#target-x').value = '0';
        document.querySelector('#compare').checked = false;
        connectControls();
        error.textContent = '';
        resizeScene();
      });
      document.querySelector('#projection').addEventListener('change', event => {
        activeCamera = event.target.value === 'ortho' ? ortho : subjectCamera;
        document.querySelector('#zoom-field').hidden = activeCamera !== ortho;
        document.querySelector('#fov').disabled = activeCamera === ortho;
        document.querySelector('#distance').value = String(activeCamera.position.z);
        document.querySelector('#near').value = String(activeCamera.near);
        document.querySelector('#far').value = String(activeCamera.far);
        document.querySelector('#camera-x').value = String(activeCamera.position.x);
        connectControls();
        resizeScene();
      });

      document.querySelector('#compare').addEventListener('change', () => {
        controls.enabled = !document.querySelector('#compare').checked;
        draw();
      });
      renderer.setAnimationLoop(() => {
        if (controls.enabled) controls.update();
        draw();
      });
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- Are controls.target and camera.position the same value?
- Why can calling lookAt and controls.update every frame make the view jump?
- What should you check if switching cameras still moves the old camera?

### Observe the frustum from outside

This starter has subjectCamera for the image and overviewCamera for outside observation. One canvas alternates between them without split viewports. subjectCamera=(0, 0, 9), near=.1, far=12, fov=50. overviewCamera observes from (10, 8, 16). far is reduced from 30 to 12 so the whole frustum can be observed; object depth ranges [6.5, 7.5], [10.5, 11.5] still fit.

Find scene.add(subjectCamera), helper = new THREE.CameraHelper(subjectCamera), and scene.add(helper). The helper is a direct scene child, not a subjectCamera child. Set helper.visible=false in subject view and true in overview. visible hides lines without deleting the object.

Select overview and reduce subjectCamera.fov from 50 to 30. Call subjectCamera.updateProjectionMatrix() followed by helper.update(). Restore the FOV and change only near or far to observe the front/back planes. Check names so the inputs update subjectCamera rather than overviewCamera.

Also edit baselineFov = 50 to 30, run, then select overview. The solution has FOV 30; compare line width with 50. View changes only activeCamera, keeping subjectCamera as the input target. subjectCamera is added before helper, so its world transform updates first during overview rendering. resizeScene updates aspect for both subject and overview cameras.

**Expected result**

Overview displays the subject frustum. fov=30 is narrower than fov=50; near/far changes move front/back planes. Subject view lets you compare actual clipping.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Observe the frustum from outside</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">Reset reference</button>

      <label
        >View
        <select id="view">
          <option value="subject">subjectCamera</option>
          <option value="overview">overviewCamera</option>
        </select></label
      >
      <label
        >Camera Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="50"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="12"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">Apply</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas
        aria-label="Camera projection comparison: A left, B right"
      ></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 50;
      document.querySelector('#fov').value = String(baselineFov);
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 12);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);

      scene.add(subjectCamera);
      const helper = new THREE.CameraHelper(subjectCamera);
      scene.add(helper);
      helper.visible = false;
      const overviewCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
      overviewCamera.position.set(10, 8, 16);
      overviewCamera.lookAt(0, 0, 3);
      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = 'View: ' + document.querySelector('#view').value
          + '\nCamera position: ' + coords(activeCamera.position)
          + '\nA (blue): ' + coords(cubeA.position) + ' / B (orange): ' + coords(cubeB.position)
          + '\nObject Y rotation: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far


          + '\nsubjectCamera: ' + coords(subjectCamera.position) + ' / helper.visible: ' + helper.visible
          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // Supplied sizing: update each projection separately; keep this support code intact.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();

        overviewCamera.aspect = w / h;
        overviewCamera.updateProjectionMatrix();
        helper.update();
        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = 'Check numeric input ranges and steps.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far must be greater than near.'; return; }
        error.textContent = '';
        const camera = subjectCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);
        helper.update();
        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '12';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 12; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;
        document.querySelector('#view').value = 'subject'; helper.visible = false;

        error.textContent = '';
        resizeScene();
      });

      document.querySelector('#view').addEventListener('change', event => {
        helper.visible = event.target.value === 'overview';
        activeCamera = helper.visible ? overviewCamera : subjectCamera;
        draw();
      });

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Distinguish the current overview view from the input target subjectCamera.
- Check that both subjectCamera and helper are added directly to scene.
- Call subjectCamera.updateProjectionMatrix(); helper.update(); then renderer.render(scene, overviewCamera) to observe from outside.

</details>

<details>
<summary>Solution and explanation</summary>

a frustum is the camera's visible volume; for perspective it resembles a pyramid with its tip cut off. A smaller FOV narrows it; near/far move its front/back planes. Do not expect the full frustum to be visible through the same camera. CameraHelper references subjectCamera.matrixWorld, so connecting subjectCamera to scene also updates its transform while overview is rendered. Omitting helper.update after camera settings change can leave lines showing the old projection.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Observe the frustum from outside</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; padding: 0; border: 0; }
      canvas { display: block; width: 100%; height: 100%; padding: 0; border: 0; touch-action: none; }
      .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; }
      input[type=number] { width: 64px; }
      output { display: block; white-space: pre-wrap; overflow-wrap: anywhere; margin-top: 8px; }
      #error { color: #b91c1c; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <div class="controls">
      <button id="square">240 × 240</button><button id="wide">480 × 240</button>
      <button id="reset">Reset reference</button>

      <label
        >View
        <select id="view">
          <option value="subject">subjectCamera</option>
          <option value="overview">overviewCamera</option>
        </select></label
      >
      <label
        >Camera Z
        <input
          id="distance"
          type="number"
          value="9"
          min="3"
          max="20"
          step="1"
          required
      /></label>
      <label
        >FOV (degree)
        <input
          id="fov"
          type="number"
          value="30"
          min="10"
          max="100"
          step="1"
          required
      /></label>
      <label
        >near
        <input
          id="near"
          type="number"
          value="0.1"
          min="0.1"
          max="20"
          step="0.1"
          required
      /></label>
      <label
        >far
        <input
          id="far"
          type="number"
          value="12"
          min="1"
          max="40"
          step="0.1"
          required
      /></label>

      <button id="apply">Apply</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas
        aria-label="Camera projection comparison: A left, B right"
      ></canvas>
    </div>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeA = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#2563eb' }));
      const cubeB = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#f97316' }));
      cubeA.position.set(-1, 0, 2);
      cubeB.position.set(1, 0, -2);
      scene.add(cubeA, cubeB);
      const baselineDistance = 9;
      document.querySelector('#distance').value = String(baselineDistance);
      const baselineFov = 30;
      const subjectCamera = new THREE.PerspectiveCamera(baselineFov, 1, 0.1, 12);
      subjectCamera.position.set(0, 0, baselineDistance);
      subjectCamera.lookAt(0, 0, 0);

      scene.add(subjectCamera);
      const helper = new THREE.CameraHelper(subjectCamera);
      scene.add(helper);
      helper.visible = false;
      const overviewCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
      overviewCamera.position.set(10, 8, 16);
      overviewCamera.lookAt(0, 0, 3);
      let activeCamera = subjectCamera;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(position) {
        return '(' + position.x.toFixed(2) + ', ' + position.y.toFixed(2) + ', ' + position.z.toFixed(2) + ')';
      }
      function report() {
        output.textContent = 'View: ' + document.querySelector('#view').value
          + '\nCamera position: ' + coords(activeCamera.position)
          + '\nA (blue): ' + coords(cubeA.position) + ' / B (orange): ' + coords(cubeB.position)
          + '\nObject Y rotation: ' + cubeA.rotation.y.toFixed(2) + ' / ' + cubeB.rotation.y.toFixed(2)
          + '\nsubject FOV: ' + subjectCamera.fov + ' / near: ' + subjectCamera.near + ' / far: ' + subjectCamera.far


          + '\nsubjectCamera: ' + coords(subjectCamera.position) + ' / helper.visible: ' + helper.visible
          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, activeCamera);
        report();
      }
      // Supplied sizing: update each projection separately; keep this support code intact.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        subjectCamera.aspect = w / h;
        subjectCamera.updateProjectionMatrix();

        overviewCamera.aspect = w / h;
        overviewCamera.updateProjectionMatrix();
        helper.update();
        draw();
      }
      function applyCameraSettings() {
        if (![...document.querySelectorAll('input[type=number]')].every(input => input.checkValidity())) {
          error.textContent = 'Check numeric input ranges and steps.'; return;
        }
        const near = Number(document.querySelector('#near').value);
        const far = Number(document.querySelector('#far').value);
        if (far <= near) { error.textContent = 'far must be greater than near.'; return; }
        error.textContent = '';
        const camera = subjectCamera;
        camera.position.set(0, 0, Number(document.querySelector('#distance').value));
        camera.fov = Number(document.querySelector('#fov').value);
        camera.near = near;
        camera.far = far;

        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);
        helper.update();
        draw();
      }
      document.querySelector('#apply').addEventListener('click', applyCameraSettings);
      document.querySelector('#square').addEventListener('click', () => { stage.style.width = '240px'; });
      document.querySelector('#wide').addEventListener('click', () => { stage.style.width = '480px'; });
      document.querySelector('#reset').addEventListener('click', () => {
        document.querySelector('#distance').value = '9';
        document.querySelector('#fov').value = '50';
        document.querySelector('#near').value = '0.1';
        document.querySelector('#far').value = '12';
        subjectCamera.position.set(0, 0, 9);
        subjectCamera.lookAt(0, 0, 0);
        subjectCamera.fov = 50; subjectCamera.near = 0.1; subjectCamera.far = 12; subjectCamera.zoom = 1;

        activeCamera = subjectCamera;
        document.querySelector('#view').value = 'subject'; helper.visible = false;

        error.textContent = '';
        resizeScene();
      });

      document.querySelector('#view').addEventListener('change', event => {
        helper.visible = event.target.value === 'overview';
        activeCamera = helper.visible ? overviewCamera : subjectCamera;
        draw();
      });

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- Why is it difficult to see the whole frustum through subjectCamera itself?
- What do helper.update and camera.updateProjectionMatrix each update?
- Why add subjectCamera to scene when rendering from overview?

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

### API · object.rotation.x/y/z

Euler member holding an Object3D local rotation. x/y/z are angles in radians.

Initial angles are (0, 0, 0), with default order XYZ. Assigning components mutates the object.

- Math.PI / 2 is 90°. Do not confuse radians with camera.fov degrees.
- A child rotation.y is not always a rotation about world Y.

```js
cube.rotation.y = Math.PI / 2;
```

[object.rotation.x/y/z](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

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

### API · THREE.OrthographicCamera

Constructor for an orthographic camera, where size does not change with depth. Bounds use camera-space units.

- `left: number` — Left bound. (-1)
- `right: number` — Right bound. (1)
- `top: number` — Top bound. (1)
- `bottom: number` — Bottom bound. (-1)
- `near: number` — Near plane; 0 is allowed. (0.1)
- `far: number` — Far plane, greater than near. (2000)

Returns a new OrthographicCamera. zoom defaults to 1.

- Do not resize by setting an aspect property. Keep halfHeight and update left/right=±halfHeight*aspect.
- Call updateProjectionMatrix after changing bounds or zoom.

```js
const halfHeight = 3;
const ortho = new THREE.OrthographicCamera(-halfHeight * aspect, halfHeight * aspect, halfHeight, -halfHeight, .1, 30);
```

[THREE.OrthographicCamera](https://threejs.org/docs/pages/OrthographicCamera.html) · three@0.186.1 · 2026-10-26

### API · camera.fov / aspect / near / far / zoom

Numeric projection members: fov in degrees, aspect as width/height, near/far as depth, and zoom as magnification.

PerspectiveCamera defaults are fov=50, aspect=1, near=.1, far=2000, zoom=1. Projection must be updated after assignment.

- near/far are planes at camera-space depths, not spheres of distance from the origin.
- Orthographic cameras have no fov; zoom and left/right/top/bottom set their range. Use positive zoom in the experiments.

```js
perspective.fov = 30;
perspective.near = .1;
perspective.far = 30;
perspective.updateProjectionMatrix();
```

[camera.fov / aspect / near / far / zoom](https://threejs.org/docs/pages/PerspectiveCamera.html) · three@0.186.1 · 2026-10-26

### API · OrbitControls

Addon constructor for moving a camera around a target. It requires a separate import.

- `camera: Camera` — The perspective or orthographic camera to control.
- `domElement: HTMLElement` — The canvas receiving input events.

Returns new controls, with target initially (0, 0, 0).

- Left drag orbits the camera; the wheel changes perspective distance or orthographic zoom.
- On camera replacement, dispose old controls and create controls for the new camera.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const controls = new OrbitControls(camera, canvas);
```

[OrbitControls](https://threejs.org/docs/pages/OrbitControls.html) · three@0.186.1 · 2026-10-26

### API · controls.target / enabled / enableDamping

target is a world-space Vector3; enabled permits input interaction; enableDamping enables inertia.

Defaults are target=(0, 0, 0), enabled=true, enableDamping=false. Assignment changes the same controls instance.

- Call update after target.set and every frame when damping is enabled.
- Even with enabled=false, an explicit update can perform calculations. Control those calls in comparison mode.

```js
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.update();
```

[controls.target / enabled / enableDamping](https://threejs.org/docs/pages/OrbitControls.html) · three@0.186.1 · 2026-10-26

### API · controls.update

Instance method that applies camera and target state.

- `deltaTime: number | null` — Optional elapsed time in seconds. These examples omit it because autoRotate is not used. (null)

Returns a boolean indicating change. May update camera position, orientation, or zoom.

- Call after manual camera/target changes.
- Avoid overwriting orientation with lookAt each frame.

```js
if (controls.enabled) controls.update();
renderer.render(scene, activeCamera);
```

[controls.update](https://threejs.org/docs/pages/OrbitControls.html) · three@0.186.1 · 2026-10-26

### API · controls.dispose

Method that releases event connections owned by controls.

No return value. Call when finished with the old controls.

- It does not release geometry/material GPU resources.

```js
controls.dispose();
controls = new OrbitControls(activeCamera, canvas);
```

[controls.dispose](https://threejs.org/docs/pages/OrbitControls.html) · three@0.186.1 · 2026-10-26

### API · renderer.setAnimationLoop

Method that registers or stops a callback for each frame.

- `callback: function | null` — The first callback argument in this non-XR example is timestamp timeMs. null stops the loop.

No return value. The registered callback runs repeatedly.

- The timestamp is in ms; elapsed seconds are (timeMs-start)/1000.
- After changing object values inside the callback, also call render.

```js
let start;
renderer.setAnimationLoop(timeMs => {
  if (start === undefined) start = timeMs;
  const seconds = (timeMs - start) / 1000;
  cube.rotation.y = seconds * speed;
  renderer.render(scene, camera);
});
```

[renderer.setAnimationLoop](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · THREE.CameraHelper / helper.update

Constructor and update method for lines visualizing a camera frustum.

- `camera: Camera` — The subjectCamera whose frustum is visualized.

The constructor returns a helper; update has no return value and refreshes lines after projection changes.

- Place helper directly under scene. Add subjectCamera to scene so its world transform updates while rendering from overview.
- Observe a camera frustum from a separate overviewCamera.

```js
scene.add(subjectCamera);
const helper = new THREE.CameraHelper(subjectCamera);
scene.add(helper);
subjectCamera.updateProjectionMatrix();
helper.update();
```

[THREE.CameraHelper / helper.update](https://threejs.org/docs/pages/CameraHelper.html) · three@0.186.1 · 2026-10-26

### API · object.visible

Boolean member controlling scene-object visibility, initially true.

Assignment changes visibility without deleting the object.

- helper.visible=false hides helper lines without deleting subjectCamera.

```js
helper.visible = false;
```

[object.visible](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

## Next learning

[Previous: Renderer and Display Size](../02/README.md) · [Next: Rotation and Pivots](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
