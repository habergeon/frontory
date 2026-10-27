# Three.js · 04 Rotation and Pivots

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Coordinates, Cameras, and Geometry · Editable example · Storage ID: `threejs-step-04`

## Goals and learning outcomes

- Predict local/world positions for spin and orbit and check actual values.
- Build a hinge without modifying geometry and explain why its edge stays fixed.

## Prerequisites

Prerequisite concepts: local/world coordinates, cameras, and sizing. Each starter HTML includes the required code; no previous saved draft is needed.

## Key concepts and explanations

### Spin and orbit

Rotating body changes orientation about its own origin. Rotating parent pivot also rotates the child offset, changing its world position.

### Door hinge

For a door of width 2, hinge=-1 and door offset=+1 preserve the closed center while rotating about the edge.

### Supplement: Euler order

The same x/y/z angles can produce different orientations with different intrinsic local-axis orders. Quaternion implementation is not required.

## Practice setup

The site supplies the three import. Load, edit, and run a starter HTML, then record predictions and actual values in the site notes.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Inspect axes and origins, then change only body.rotation.y from 0 to Math.PI / 2.
2. Change pivot.rotation.y from 0 to Math.PI / 2 and compare world (3,0,0)→(1,0,-2).
3. Enable orbitSpeed and spinSpeed separately, then together. Set hinge=-1 and door=+1 and record closed/open centers. Compare Euler order as a supplement.

## Variables to observe

| Variable        | Baseline        | Change           | Expected change / hypothesis                                                                     |
| --------------- | --------------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| Rotating object | body            | pivot            | Spin preserves the world origin; orbit preserves the local offset while moving the world origin. |
| Hinge offset    | hinge=0, door=0 | hinge=-1, door=1 | Closed center (0,0,0), 90° center (-1,0,-1), hinge (-1,0,0).                                     |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Predict local/world positions for spin and orbit and check actual values.
- [ ] Build a hinge without modifying geometry and explain why its edge stays fixed.

## Self-check

1. Why do spin and orbit produce different world positions?
2. For a door of width 4, how would you set parent and child offsets?

## Official references

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-04/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run HTML starters inside the site. Read the steps and API reference, then record actual results in the site notes.

- [example.html](../../../../../../../src/labs/threejs-step-04/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Separate the parent origin and child offset to build spin, orbit, and a hinge. Check predictions at fixed angles before combining time-based motion. Each starter HTML includes Scene, camera, and resizing without requiring your previous draft. In unit 01 the parent was at the origin; here pivot=(1, 0, 0) adds parent translation. Angles use radians. The final Euler-order experiment is supplementary; quaternion implementation is not required.

The site supplies the three import. canvas is the drawing surface; output shows actual object values. Use querySelector to find a DOM node by id; input.value is a string, Number converts it to a number, and textContent writes text. An addEventListener callback runs after a button click. syncInputs initializes inputs from the scene state, so editing a source constant also updates the controls. Apply reads all shown controls; Reset restores the source baseline. Number.isFinite and checkValidity reject missing or nonfinite numbers. String converts a value for input; toFixed formats a number as text without changing coordinates. Tiny floating-point differences need tolerance, not exact equality. The for...of loop checks each input.

### Prerequisite units

- `threejs-01`
- `threejs-step-02`
- `threejs-step-03`
- `javascript-step-02`
- `javascript-step-12`

### Axes and object origins

The starting tree is Scene → pivot Group → body Mesh. pivot.position=(1, 0, 0), body.position=(2, 0, 0), and all rotations are 0. body uses BoxGeometry(1, .6, .4), so symmetry does not hide orientation changes. The camera looks toward the origin from (6, 4, 8).

scene.add(new THREE.AxesHelper(3)) shows scene axes; pivot.add(new THREE.AxesHelper(1)) shows pivot axes. +X is red, +Y green, and +Z blue. Read text axis names and values as well as colors. Moving the camera changes the directions these axes appear to point on screen.

Compare body.position with body.getWorldPosition(world). Predict local=(2, 0, 0), world=(3, 0, 0), then run. Position here means the Mesh origin, not that all surface points have the same coordinate.

**Expected result**

pivot origin is world=(1, 0, 0), body local=(2, 0, 0), and body world=(3, 0, 0). Scene and pivot axes have different origins.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Axes and object origins</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ plane: pivot (1,0) → +X offset 2 → body (3,0)
Parent +Y rotation π/2: offset +X → -Z, body (1,-2)</pre>
    <p>
      +X red / +Y green / +Z blue. Angles use radians: π/2 ≈ 1.5708rad = 90°.
    </p>
    <div class="controls">
      <label
        >pivot Y (rad)
        <input id="pivotAngle" type="number" step="any" required /></label
      ><label
        >body local Y (rad)
        <input id="bodyAngle" type="number" step="any" required /></label
      ><button id="apply">Apply</button
      ><button id="reset">Reset baseline</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Axes and rotation origins"></canvas>
    </div>
    <output>Waiting for preview size</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const pivotAngle = 0;
      const bodyAngle = 0;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      pivot.rotation.y = pivotAngle;
      body.rotation.y = bodyAngle;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // Support code: wait at zero size; update size and projection when visible.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('pivotAngle').value = String(pivot.rotation.y);
        input('bodyAngle').value = String(body.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = 'Enter finite numbers.'; return;
          }
        }
        error.textContent = '';
        pivot.rotation.y = Number(input('pivotAngle').value);
        body.rotation.y = Number(input('bodyAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        pivot.rotation.y = pivotAngle;
        body.rotation.y = bodyAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Check the tree to confirm that body belongs to pivot.
- Check the stationary case where parent position 1 adds to body.position 2.
- Use pivot.position.set(1, 0, 0); body.position.set(2, 0, 0); pivot.add(body); scene.add(pivot); and read getWorldPosition.

</details>

<details>
<summary>Solution and explanation</summary>

the parent origin is already translated 1 unit along world +X. The child is another 2 units along parent +X, giving world center 3. Each helper follows its parent transform, so their origins differ too. The difference from unit 01 world=(2, 0, 0) is caused by the changed parent location.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Axes and object origins</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ plane: pivot (1,0) → +X offset 2 → body (3,0)
Parent +Y rotation π/2: offset +X → -Z, body (1,-2)</pre>
    <p>
      +X red / +Y green / +Z blue. Angles use radians: π/2 ≈ 1.5708rad = 90°.
    </p>
    <div class="controls">
      <label
        >pivot Y (rad)
        <input id="pivotAngle" type="number" step="any" required /></label
      ><label
        >body local Y (rad)
        <input id="bodyAngle" type="number" step="any" required /></label
      ><button id="apply">Apply</button
      ><button id="reset">Reset baseline</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Axes and rotation origins"></canvas>
    </div>
    <output>Waiting for preview size</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const pivotAngle = 0;
      const bodyAngle = 0;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      pivot.rotation.y = pivotAngle;
      body.rotation.y = bodyAngle;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // Support code: wait at zero size; update size and projection when visible.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('pivotAngle').value = String(pivot.rotation.y);
        input('bodyAngle').value = String(body.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = 'Enter finite numbers.'; return;
          }
        }
        error.textContent = '';
        pivot.rotation.y = Number(input('pivotAngle').value);
        body.rotation.y = Number(input('bodyAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        pivot.rotation.y = pivotAngle;
        body.rotation.y = bodyAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- Why is world 3 while local is 2?
- How does adding AxesHelper to scene differ from adding it to pivot?

### Spin about the object origin

This starter includes the same tree and fixes pivot.rotation.y=0. Keep body.position=(2, 0, 0) and change only body.rotation.y from 0 to Math.PI / 2. Input is in radians; do not assign 90 directly.

Predict which changes: body orientation or the world position of its origin. Compare the cuboid's long direction with the axes and read getWorldPosition. Distinguish seeing an object turn from seeing its center move.

For a source edit, find const bodyAngle = 0 and set it to Math.PI / 2. The body.rotation.y assignment uses that constant; input and Reset use the same source baseline. You can also compare with the body local Y input and Apply.

**Expected result**

body orientation changes, but local=(2, 0, 0) and world=(3, 0, 0) remain unchanged. pivot angle is 0.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Spin about the object origin</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ plane: pivot (1,0) → +X offset 2 → body (3,0)
Parent +Y rotation π/2: offset +X → -Z, body (1,-2)</pre>
    <p>
      +X red / +Y green / +Z blue. Angles use radians: π/2 ≈ 1.5708rad = 90°.
    </p>
    <div class="controls">
      <label
        >pivot Y (rad)
        <input id="pivotAngle" type="number" step="any" required /></label
      ><label
        >body local Y (rad)
        <input id="bodyAngle" type="number" step="any" required /></label
      ><button id="apply">Apply</button
      ><button id="reset">Reset baseline</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Axes and rotation origins"></canvas>
    </div>
    <output>Waiting for preview size</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const pivotAngle = 0;
      const bodyAngle = 0;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      pivot.rotation.y = pivotAngle;
      body.rotation.y = bodyAngle;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // Support code: wait at zero size; update size and projection when visible.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('pivotAngle').value = String(pivot.rotation.y);
        input('bodyAngle').value = String(body.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = 'Enter finite numbers.'; return;
          }
        }
        error.textContent = '';
        pivot.rotation.y = Number(input('pivotAngle').value);
        body.rotation.y = Number(input('bodyAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        pivot.rotation.y = pivotAngle;
        body.rotation.y = bodyAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Read body and pivot angles separately in output.
- Check that you change body.rotation.y rather than body.position.
- Compare pivot.rotation.y = 0; body.rotation.y = Math.PI / 2;. The body world origin stays at (3, 0, 0).

</details>

<details>
<summary>Solution and explanation</summary>

body.rotation changes orientation about the body's local origin. Its parent-relative position remains (2, 0, 0), so its world origin stays at (3, 0, 0). Geometry does not change. A cuboid rather than a cube makes the orientation difference after 90° easier to see.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Spin about the object origin</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ plane: pivot (1,0) → +X offset 2 → body (3,0)
Parent +Y rotation π/2: offset +X → -Z, body (1,-2)</pre>
    <p>
      +X red / +Y green / +Z blue. Angles use radians: π/2 ≈ 1.5708rad = 90°.
    </p>
    <div class="controls">
      <label
        >pivot Y (rad)
        <input id="pivotAngle" type="number" step="any" required /></label
      ><label
        >body local Y (rad)
        <input id="bodyAngle" type="number" step="any" required /></label
      ><button id="apply">Apply</button
      ><button id="reset">Reset baseline</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Axes and rotation origins"></canvas>
    </div>
    <output>Waiting for preview size</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const pivotAngle = 0;
      const bodyAngle = Math.PI / 2;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      pivot.rotation.y = pivotAngle;
      body.rotation.y = bodyAngle;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // Support code: wait at zero size; update size and projection when visible.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('pivotAngle').value = String(pivot.rotation.y);
        input('bodyAngle').value = String(body.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = 'Enter finite numbers.'; return;
          }
        }
        error.textContent = '';
        pivot.rotation.y = Number(input('pivotAngle').value);
        body.rotation.y = Number(input('bodyAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        pivot.rotation.y = pivotAngle;
        body.rotation.y = bodyAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- Why can orientation change while the origin stays fixed?
- Why does assigning 90 not mean 90°?

### Orbit about the parent origin

This independent starter restores body.rotation=0. Keep pivot.position=(1, 0, 0) and body.position=(2, 0, 0), changing only pivot.rotation.y from 0 to Math.PI / 2. Predict local and world positions separately before changing it.

The offset 2 units along parent +X rotates with the parent. Positive 90° about +Y turns +X toward -Z. Starting from parent origin (1, 0, 0), move 2 units along -Z to reach body origin (1, 0, -2). Compare getWorldPosition with the XZ diagram.

For a source edit, change const pivotAngle = 0 to Math.PI / 2. The pivot.rotation.y assignment, initial input, and Reset share that source baseline. The pivot Y input is an alternative experiment.

**Expected result**

At pivot.rotation.y=0, body world=(3, 0, 0); at Math.PI / 2, world≈(1, 0, -2). body local=(2, 0, 0) stays fixed.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Orbit about the parent origin</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ plane: pivot (1,0) → +X offset 2 → body (3,0)
Parent +Y rotation π/2: offset +X → -Z, body (1,-2)</pre>
    <p>
      +X red / +Y green / +Z blue. Angles use radians: π/2 ≈ 1.5708rad = 90°.
    </p>
    <div class="controls">
      <label
        >pivot Y (rad)
        <input id="pivotAngle" type="number" step="any" required /></label
      ><label
        >body local Y (rad)
        <input id="bodyAngle" type="number" step="any" required /></label
      ><button id="apply">Apply</button
      ><button id="reset">Reset baseline</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Axes and rotation origins"></canvas>
    </div>
    <output>Waiting for preview size</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const pivotAngle = 0;
      const bodyAngle = 0;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      pivot.rotation.y = pivotAngle;
      body.rotation.y = bodyAngle;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // Support code: wait at zero size; update size and projection when visible.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('pivotAngle').value = String(pivot.rotation.y);
        input('bodyAngle').value = String(body.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = 'Enter finite numbers.'; return;
          }
        }
        error.textContent = '';
        pivot.rotation.y = Number(input('pivotAngle').value);
        body.rotation.y = Number(input('bodyAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        pivot.rotation.y = pivotAngle;
        body.rotation.y = bodyAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- First check whether the rotated object is body or pivot.
- Check that body.position.x is 2 rather than 0.
- With body.rotation.y = 0; pivot.rotation.y = Math.PI / 2;, local=(2, 0, 0) and world=(1, 0, -2).

</details>

<details>
<summary>Solution and explanation</summary>

if child offset is 0 there is no orbit radius. Rotate the parent to turn the offset direction. Rotating only body produces the previous spin. Parent rotation also turns body orientation; do not describe this as a circular path with world orientation fixed.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Orbit about the parent origin</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ plane: pivot (1,0) → +X offset 2 → body (3,0)
Parent +Y rotation π/2: offset +X → -Z, body (1,-2)</pre>
    <p>
      +X red / +Y green / +Z blue. Angles use radians: π/2 ≈ 1.5708rad = 90°.
    </p>
    <div class="controls">
      <label
        >pivot Y (rad)
        <input id="pivotAngle" type="number" step="any" required /></label
      ><label
        >body local Y (rad)
        <input id="bodyAngle" type="number" step="any" required /></label
      ><button id="apply">Apply</button
      ><button id="reset">Reset baseline</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Axes and rotation origins"></canvas>
    </div>
    <output>Waiting for preview size</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const pivotAngle = Math.PI / 2;
      const bodyAngle = 0;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      pivot.rotation.y = pivotAngle;
      body.rotation.y = bodyAngle;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // Support code: wait at zero size; update size and projection when visible.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('pivotAngle').value = String(pivot.rotation.y);
        input('bodyAngle').value = String(body.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = 'Enter finite numbers.'; return;
          }
        }
        error.textContent = '';
        pivot.rotation.y = Number(input('pivotAngle').value);
        body.rotation.y = Number(input('bodyAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        pivot.rotation.y = pivotAngle;
        body.rotation.y = bodyAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- Why does an offset of 0 remove the orbit path?
- Does parent rotation change only body position?

### Combine spin and orbit

This starter includes the same hierarchy and time-based renderFrame, initially stationary with orbitSpeed=0 and spinSpeed=0. seconds is elapsed time since the first timestamp. Distinguish pivot.rotation.y = seconds * orbitSpeed from body.rotation.y = seconds * spinSpeed.

Enable only orbitSpeed=.5 and observe, then restore it to 0 and enable only spinSpeed=1. Finally enable both. Predict parent and child-local angles near 2 seconds and compare output. Both speeds use rad/s.

Apply starts time from zero with the current speeds; Reset restores the speeds written in the source. In renderFrame, the first timestamp is stored in startTime and elapsed milliseconds are divided by 1000. undefined means no timestamp has been stored yet.

**Expected result**

Parent-only rotation orbits; body-only rotation spins. Both enabled produce simultaneous motion. Near 2 seconds pivot≈1rad and body local≈2rad; compare with the actual output time.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Combine spin and orbit</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ plane: pivot (1,0) → +X offset 2 → body (3,0)
Parent +Y rotation π/2: offset +X → -Z, body (1,-2)</pre>
    <p>
      +X red / +Y green / +Z blue. Angles use radians: π/2 ≈ 1.5708rad = 90°.
    </p>
    <div class="controls">
      <label
        >orbitSpeed (rad/s)
        <input id="orbitSpeed" type="number" step="any" required /></label
      ><label
        >spinSpeed (rad/s)
        <input id="spinSpeed" type="number" step="any" required /></label
      ><button id="apply">Apply</button
      ><button id="reset">Reset baseline</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Axes and rotation origins"></canvas>
    </div>
    <output>Waiting for preview size</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      let orbitSpeed = 0;
      let spinSpeed = 0;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));

      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const baselineOrbitSpeed = orbitSpeed, baselineSpinSpeed = spinSpeed;
      let startTime;
      let seconds = 0;
      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)

          + '\nseconds: ' + seconds.toFixed(3) + ' / orbitSpeed: ' + orbitSpeed + ' rad/s / spinSpeed: ' + spinSpeed + ' rad/s'
          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // Support code: wait at zero size; update size and projection when visible.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('orbitSpeed').value = String(orbitSpeed);
        input('spinSpeed').value = String(spinSpeed);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = 'Enter finite numbers.'; return;
          }
        }
        error.textContent = '';
        orbitSpeed = Number(input('orbitSpeed').value);
        spinSpeed = Number(input('spinSpeed').value);
        startTime = undefined;
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        orbitSpeed = baselineOrbitSpeed; spinSpeed = baselineSpinSpeed; startTime = undefined; seconds = 0; pivot.rotation.y = 0; body.rotation.y = 0;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();
      function renderFrame(timestamp) {
        if (startTime === undefined) startTime = timestamp;
        seconds = (timestamp - startTime) / 1000;
        pivot.rotation.y = seconds * orbitSpeed;
        body.rotation.y = seconds * spinSpeed;
        draw();
      }
      renderer.setAnimationLoop(renderFrame);
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Enable one speed at a time to identify each motion.
- Check that seconds is in seconds rather than ms.
- Use pivot.rotation.y = seconds * .5; body.rotation.y = seconds * 1; before renderer.render(scene, camera).

</details>

<details>
<summary>Solution and explanation</summary>

with orbitSpeed=.5 and spinSpeed=1, at about 2 seconds the parent angle is about 1rad and body local rotation is about 2rad. The body local angle does not describe the whole world orientation because parent rotation also applies. Do not generalize simple addition from this same-Y-axis example to arbitrary axis combinations. Update the existing objects rather than creating a new Mesh each frame.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Combine spin and orbit</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ plane: pivot (1,0) → +X offset 2 → body (3,0)
Parent +Y rotation π/2: offset +X → -Z, body (1,-2)</pre>
    <p>
      +X red / +Y green / +Z blue. Angles use radians: π/2 ≈ 1.5708rad = 90°.
    </p>
    <div class="controls">
      <label
        >orbitSpeed (rad/s)
        <input id="orbitSpeed" type="number" step="any" required /></label
      ><label
        >spinSpeed (rad/s)
        <input id="spinSpeed" type="number" step="any" required /></label
      ><button id="apply">Apply</button
      ><button id="reset">Reset baseline</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Axes and rotation origins"></canvas>
    </div>
    <output>Waiting for preview size</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      let orbitSpeed = 0.5;
      let spinSpeed = 1;
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));

      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const baselineOrbitSpeed = orbitSpeed, baselineSpinSpeed = spinSpeed;
      let startTime;
      let seconds = 0;
      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)

          + '\nseconds: ' + seconds.toFixed(3) + ' / orbitSpeed: ' + orbitSpeed + ' rad/s / spinSpeed: ' + spinSpeed + ' rad/s'
          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // Support code: wait at zero size; update size and projection when visible.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('orbitSpeed').value = String(orbitSpeed);
        input('spinSpeed').value = String(spinSpeed);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = 'Enter finite numbers.'; return;
          }
        }
        error.textContent = '';
        orbitSpeed = Number(input('orbitSpeed').value);
        spinSpeed = Number(input('spinSpeed').value);
        startTime = undefined;
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        orbitSpeed = baselineOrbitSpeed; spinSpeed = baselineSpinSpeed; startTime = undefined; seconds = 0; pivot.rotation.y = 0; body.rotation.y = 0;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();
      function renderFrame(timestamp) {
        if (startTime === undefined) startTime = timestamp;
        seconds = (timestamp - startTime) / 1000;
        pivot.rotation.y = seconds * orbitSpeed;
        body.rotation.y = seconds * spinSpeed;
        draw();
      }
      renderer.setAnimationLoop(renderFrame);
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- Does body.rotation.y alone describe its whole world orientation?
- Can simple addition about the same Y axis be generalized to every axis combination?

### Build a hinge at the door edge

This step is an independent door example. BoxGeometry(2, 3, .15) has width 2 centered at the origin. Initially hinge.position.x=0 and door.position.x=0, connected with hinge.add(door), scene.add(hinge). First compare center rotation at 0 and Math.PI / 2.

Restore angle 0 and apply both hinge.position.x=-1 and door.position.x=1. The parent moves to the left edge while the door center moves right by half-width 1 relative to the parent. Check that the closed world center remains (0, 0, 0), then change hinge.rotation.y to Math.PI / 2.

Read hinge-origin and door-center world coordinates in output and observe the fixed edge. Do not translate geometry or edit vertices. Unlike the body spin example, the parent origin is outside the object center to change the rotation pivot.

For a source edit, set const hingeX = -1 and const doorX = 1; then change const hingeAngle from 0 to Math.PI / 2. These constants feed the position/rotation assignments and the inputs. Alternatively edit hinge X, door local X, and hinge Y and press Apply. Reset restores the constants currently written in the source.

**Expected result**

After setting the hinge, angle 0 gives door center world=(0, 0, 0). At Math.PI / 2, the center is≈(-1, 0, -1), while the hinge stays at (-1, 0, 0).

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Build a hinge at the door edge</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → hinge Group → door Mesh
Closed door width 2: edge -1 — center 0 — edge +1
Hinge -1 + door offset +1 = closed center 0</pre>
    <p>
      +X red / +Y green / +Z blue. Angles use radians: π/2 ≈ 1.5708rad = 90°.
    </p>
    <div class="controls">
      <label
        >hinge X (scene)
        <input id="hingeX" type="number" step="any" required /></label
      ><label
        >door local X (scene)
        <input id="doorX" type="number" step="any" required /></label
      ><label
        >hinge Y (rad)
        <input id="hingeAngle" type="number" step="any" required /></label
      ><button id="apply">Apply</button
      ><button id="reset">Reset baseline</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Axes and rotation origins"></canvas>
    </div>
    <output>Waiting for preview size</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const hingeX = 0;
      const doorX = 0;
      const hingeAngle = 0;
      const hinge = new THREE.Group();
      const door = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.15), material);
      hinge.add(door);
      scene.add(hinge);
      hinge.position.x = hingeX;
      door.position.x = doorX;
      hinge.rotation.y = hingeAngle;
      hinge.add(new THREE.AxesHelper(1));
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        door.getWorldPosition(world);
        hinge.getWorldPosition(parentWorld);
        output.textContent = 'hinge world: ' + coords(parentWorld)
          + '\ndoor local: ' + coords(door.position) + ' / world: ' + coords(world)
          + '\nhinge Y (rad): ' + hinge.rotation.y.toFixed(4)
          + ' / door local Y (rad): ' + door.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // Support code: wait at zero size; update size and projection when visible.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('hingeX').value = String(hinge.position.x);
        input('doorX').value = String(door.position.x);
        input('hingeAngle').value = String(hinge.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = 'Enter finite numbers.'; return;
          }
        }
        error.textContent = '';
        hinge.position.x = Number(input('hingeX').value);
        door.position.x = Number(input('doorX').value);
        hinge.rotation.y = Number(input('hingeAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        hinge.position.x = hingeX;
        door.position.x = doorX;
        hinge.rotation.y = hingeAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Check that half of width 2 is 1 and the left edge is -1.
- Check both offsets: hinge=-1 and door=+1.
- Compare hinge.position.x = -1; door.position.x = 1; hinge.rotation.y = Math.PI / 2;. Leave geometry unchanged.

</details>

<details>
<summary>Solution and explanation</summary>

the closed center is -1+1=0. At 90° the door center becomes (-1, 0, -1), while the hinge origin stays (-1, 0, 0). Moving only hinge to -1 with door offset 0 changes the closed position too. For width 4, the same rule gives hinge=-2, door=+2. To finish, record world values for spin/orbit and the fixed door edge in the site notes.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Build a hinge at the door edge</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → hinge Group → door Mesh
Closed door width 2: edge -1 — center 0 — edge +1
Hinge -1 + door offset +1 = closed center 0</pre>
    <p>
      +X red / +Y green / +Z blue. Angles use radians: π/2 ≈ 1.5708rad = 90°.
    </p>
    <div class="controls">
      <label
        >hinge X (scene)
        <input id="hingeX" type="number" step="any" required /></label
      ><label
        >door local X (scene)
        <input id="doorX" type="number" step="any" required /></label
      ><label
        >hinge Y (rad)
        <input id="hingeAngle" type="number" step="any" required /></label
      ><button id="apply">Apply</button
      ><button id="reset">Reset baseline</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Axes and rotation origins"></canvas>
    </div>
    <output>Waiting for preview size</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const hingeX = -1;
      const doorX = 1;
      const hingeAngle = Math.PI / 2;
      const hinge = new THREE.Group();
      const door = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.15), material);
      hinge.add(door);
      scene.add(hinge);
      hinge.position.x = hingeX;
      door.position.x = doorX;
      hinge.rotation.y = hingeAngle;
      hinge.add(new THREE.AxesHelper(1));
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        door.getWorldPosition(world);
        hinge.getWorldPosition(parentWorld);
        output.textContent = 'hinge world: ' + coords(parentWorld)
          + '\ndoor local: ' + coords(door.position) + ' / world: ' + coords(world)
          + '\nhinge Y (rad): ' + hinge.rotation.y.toFixed(4)
          + ' / door local Y (rad): ' + door.rotation.y.toFixed(4)


          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // Support code: wait at zero size; update size and projection when visible.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('hingeX').value = String(hinge.position.x);
        input('doorX').value = String(door.position.x);
        input('hingeAngle').value = String(hinge.rotation.y);
      }
      function applySettings() {
        for (const field of document.querySelectorAll('input')) {
          if (!field.checkValidity() || !Number.isFinite(Number(field.value))) {
            error.textContent = 'Enter finite numbers.'; return;
          }
        }
        error.textContent = '';
        hinge.position.x = Number(input('hingeX').value);
        door.position.x = Number(input('doorX').value);
        hinge.rotation.y = Number(input('hingeAngle').value);
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        hinge.position.x = hingeX;
        door.position.x = doorX;
        hinge.rotation.y = hingeAngle;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- Why change both parent and child offsets?
- For door width 4, what should hinge and door x values be?
- Are geometry vertices and Object3D transforms the same thing?

### Supplement: order of two-axis rotations

This supplementary starter stops animation and parent rotation and shows a cuboid and axes that make orientation clear. Fix body.rotation.x=Math.PI / 4, body.rotation.y=Math.PI / 3, body.rotation.z=0. The default order is 'XYZ'.

Keep the three angles and change only body.rotation.order from 'XYZ' to 'YXZ'. Compare orientations and explain why three numbers alone may not fully define a rotation. Euler order specifies intrinsic local-axis rotation order. Do not describe it as always rotating world X then world Y.

For a source edit, change const eulerOrder = 'XYZ' to 'YXZ'. You can also select Euler order and press Apply. The numeric angles remain fixed.

**Expected result**

With x=Math.PI / 4, y=Math.PI / 3, z=0 unchanged, XYZ and YXZ produce different orientations. This supplement does not add quaternion implementation to the first four units required completion.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Supplement: order of two-axis rotations</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ plane: pivot (1,0) → +X offset 2 → body (3,0)
Parent +Y rotation π/2: offset +X → -Z, body (1,-2)</pre>
    <p>
      +X red / +Y green / +Z blue. Angles use radians: π/2 ≈ 1.5708rad = 90°.
    </p>
    <div class="controls">
      <label
        >Euler order
        <select id="order">
          <option>XYZ</option>
          <option>YXZ</option>
        </select></label
      ><button id="apply">Apply</button
      ><button id="reset">Reset baseline</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Axes and rotation origins"></canvas>
    </div>
    <output>Waiting for preview size</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const eulerOrder = 'XYZ';
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      body.rotation.x = Math.PI / 4;
      body.rotation.y = Math.PI / 3;
      body.rotation.z = 0;
      body.rotation.order = eulerOrder;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)
          + '\nbody local X/Z (rad): ' + body.rotation.x.toFixed(4) + ' / ' + body.rotation.z.toFixed(4) + ' / order: ' + body.rotation.order

          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // Support code: wait at zero size; update size and projection when visible.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('order').value = body.rotation.order;
      }
      function applySettings() {
        error.textContent = '';
        body.rotation.order = input('order').value;
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        body.rotation.order = eulerOrder;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- First check that parent rotation and animation are 0.
- Keep all three angles and change only order.
- Set body.rotation.order = 'YXZ' and render. Observe the intrinsic local-axis order difference.

</details>

<details>
<summary>Solution and explanation</summary>

rotations about multiple axes can produce different results in different orders. This order-change experiment does not preserve the old world orientation. Quaternion conversion and gimbal-lock solutions are not required. For a question about translation after rotation, stay within the introduced contract: position.x is relative to parent axes. Do not mix it with the separate local movement method translateX if that method has not been introduced.

Next come geometry vertices, normals, and shared resources, followed by lighting/materials/textures, models/selection, and animation/performance/cleanup. Units 05~28 in the roadmap are planned for self-contained practice improvements, not already completed revisions.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Supplement: order of two-axis rotations</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; background: #fff; color: #172554; }
      #stage { width: 480px; max-width: 100%; height: 240px; }
      canvas { display: block; width: 100%; height: 100%; }
      .controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      input { width: 80px; }
      output, pre { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
      #error { color: #b91c1c; }
    </style>
  </head>
  <body>
    <pre>
Scene → pivot Group → body Mesh
XZ plane: pivot (1,0) → +X offset 2 → body (3,0)
Parent +Y rotation π/2: offset +X → -Z, body (1,-2)</pre>
    <p>
      +X red / +Y green / +Z blue. Angles use radians: π/2 ≈ 1.5708rad = 90°.
    </p>
    <div class="controls">
      <label
        >Euler order
        <select id="order">
          <option>XYZ</option>
          <option>YXZ</option>
        </select></label
      ><button id="apply">Apply</button
      ><button id="reset">Reset baseline</button
      ><button id="square">240 × 240</button
      ><button id="wide">480 × 240</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Axes and rotation origins"></canvas>
    </div>
    <output>Waiting for preview size</output>
    <script type="module">
      import * as THREE from 'three';

      const stage = document.querySelector('#stage');
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const error = document.querySelector('#error');
      const input = id => document.querySelector('#' + id);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const eulerOrder = 'YXZ';
      const pivot = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.4), material);
      pivot.position.set(1, 0, 0);
      body.position.set(2, 0, 0);
      pivot.add(body);
      scene.add(pivot);
      pivot.add(new THREE.AxesHelper(1));
      body.rotation.x = Math.PI / 4;
      body.rotation.y = Math.PI / 3;
      body.rotation.z = 0;
      body.rotation.order = eulerOrder;
      scene.add(new THREE.AxesHelper(3));
      const world = new THREE.Vector3();
      const parentWorld = new THREE.Vector3();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 30);
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);

      function coords(p) {
        return '(' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ')';
      }
      function report() {
        body.getWorldPosition(world);
        pivot.getWorldPosition(parentWorld);
        output.textContent = 'pivot world: ' + coords(parentWorld)
          + '\nbody local: ' + coords(body.position) + ' / world: ' + coords(world)
          + '\npivot Y (rad): ' + pivot.rotation.y.toFixed(4)
          + ' / body local Y (rad): ' + body.rotation.y.toFixed(4)
          + '\nbody local X/Z (rad): ' + body.rotation.x.toFixed(4) + ' / ' + body.rotation.z.toFixed(4) + ' / order: ' + body.rotation.order

          + '\nCSS px: ' + stage.clientWidth + ' × ' + stage.clientHeight + ' / Buffer px: ' + canvas.width + ' × ' + canvas.height;
      }
      function draw() {
        if (stage.clientWidth === 0 || stage.clientHeight === 0) return;
        renderer.render(scene, camera);
        report();
      }
      // Support code: wait at zero size; update size and projection when visible.
      function resizeScene() {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      function syncInputs() {
        input('order').value = body.rotation.order;
      }
      function applySettings() {
        error.textContent = '';
        body.rotation.order = input('order').value;
        draw();
      }
      input('apply').addEventListener('click', applySettings);
      input('reset').addEventListener('click', () => {
        body.rotation.order = eulerOrder;
        syncInputs(); error.textContent = ''; draw();
      });
      input('square').addEventListener('click', () => { stage.style.width = '240px'; });
      input('wide').addEventListener('click', () => { stage.style.width = '480px'; });
      syncInputs();

      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
    </script>
  </body>
</html>
```

</details>

- Why can order matter even with identical x/y/z values?
- Does changing order preserve the old world orientation?

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

### API · THREE.Group

Constructor for an Object3D node that groups child transforms. It has no shape of its own.

Returns a new Group. position/rotation/add follow Object3D contracts.

- Adding a Group does not create visible geometry.

```js
const parent = new THREE.Group();
parent.add(child);
scene.add(parent);
```

[THREE.Group](https://threejs.org/docs/pages/Group.html) · three@0.186.1 · 2026-10-26

### API · THREE.Vector3

Constructor for an object with x/y/z components, used here to store position results.

- `x: number` — X component. (0)
- `y: number` — Y component. (0)
- `z: number` — Z component. (0)

Returns a new Vector3.

- The Vector3 type does not determine whether a value is local or world-space; its use does.

```js
const world = new THREE.Vector3();
```

[THREE.Vector3](https://threejs.org/docs/pages/Vector3.html) · three@0.186.1 · 2026-10-26

### API · object.getWorldPosition

Method that reads world position including current parent transforms.

- `target: Vector3` — The destination object for the result; it is required.

Mutates and returns target without changing object.position.

- In 0.186.1, the method updates the required parent world matrices internally. No manual matrix multiplication is needed.

```js
const world = new THREE.Vector3();
child.getWorldPosition(world);
```

[object.getWorldPosition](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

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

### API · THREE.AxesHelper

Constructor for lines showing local positive X/Y/Z axes.

- `size: number` — Length of each axis line in scene units. (1)

Returns a new helper. X=red, Y=green, Z=blue.

- Under scene it shows world axes; under pivot it follows pivot transforms. Read text labels as well as colors.

```js
scene.add(new THREE.AxesHelper(3));
pivot.add(new THREE.AxesHelper(1));
```

[THREE.AxesHelper](https://threejs.org/docs/pages/AxesHelper.html) · three@0.186.1 · 2026-10-26

### API · rotation.order

String member setting Euler intrinsic local-axis rotation order. The default is XYZ.

The same x/y/z values can produce different orientations with a different order.

- Do not describe this as world X followed by world Y.
- This supplementary experiment does not preserve an old world orientation or implement quaternion conversion.

```js
body.rotation.x = Math.PI / 4;
body.rotation.y = Math.PI / 3;
body.rotation.z = 0;
body.rotation.order = 'YXZ';
```

[rotation.order](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

## Next learning

[Previous: Perspective and Orthographic Projection](../03/README.md) · [Next: Buffer Geometry](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions

## Three.js roadmap: all 28 units

Units 01–04 have passed verification of the required in-site exercises. Planned improvements for units 05–28 mean existing lessons remain available, while verification that their exercises can be completed inside the site is still pending. This status is separate from your learning progress.

All 28 units provide independent HTML practice and step examples in Korean and English. Implementation readiness `verified` means unit execution and content review are complete; learner progress is separate. The deployed production baseline is `0338dbe857265441d76d12b073170e24ac794cb5`. The subsequent 24-unit expansion is locally validated and has not been pushed or deployed. Chromium/SwiftShader validation does not establish behavior on real devices or every GPU, or learner assessment.

### [01. Scene Graphs and Cameras](../../01-foundations/README.md) · Practice verified

ID: `threejs-01`

Topics: canvas · first scene · Scene, Camera, Renderer and Mesh · animation · local/world coordinates

Prerequisite units: None

Completion task: Build a first HTML scene and explain parent rotation and child coordinates

Required practice capabilities: Single HTML document, inline CSS and module JavaScript · Three.js and OrbitControls · formatting, console and saving

### [02. Renderer and Display Size](../02/README.md) · Practice verified

ID: `threejs-step-02`

Topics: CSS size and drawing buffer · aspect ratio · DPR

Prerequisite units: [01](../../01-foundations/README.md)

Completion task: Keep shapes in proportion as the display size changes

Required practice capabilities: Single HTML document, inline CSS and module JavaScript · Three.js and OrbitControls · formatting, console and saving

### [03. Perspective and Orthographic Projection](../03/README.md) · Practice verified

ID: `threejs-step-03`

Topics: camera distance · FOV · near/far · OrbitControls

Prerequisite units: [01](../../01-foundations/README.md) · [02](../02/README.md)

Completion task: Distinguish projection differences and reasons an object disappears

Required practice capabilities: Single HTML document, inline CSS and module JavaScript · Three.js and OrbitControls · formatting, console and saving

### [04. Rotation and Pivots](README.md) · Practice verified

ID: `threejs-step-04`

Topics: coordinate spaces · rotation centers · parent and child transforms

Prerequisite units: [01](../../01-foundations/README.md) · [02](../02/README.md) · [03](../03/README.md)

Completion task: Build spin and orbit motions and predict position changes

Required practice capabilities: Single HTML document, inline CSS and module JavaScript · Three.js and OrbitControls · formatting, console and saving

### [05. Buffer Geometry](../05/README.md) · Practice verified

ID: `threejs-step-05`

Topics: vertices · triangles · indices · attributes

Prerequisite units: [01](../../01-foundations/README.md) · [04](README.md)

Completion task: Explain vertex counts and indices in a custom triangle and fix out-of-range values

Required practice capabilities: Numeric array editing and error output

### [06. Normals and Surface Orientation](../06/README.md) · Practice verified

ID: `threejs-step-06`

Topics: normals · face direction · flat and smooth shading

Prerequisite units: [05](../05/README.md)

Completion task: Compare missing normals and edge handling

Required practice capabilities: Fixed lighting example and surface comparison · lighting details come in unit 08

### [07. Shared Geometry and Cloning](../07/README.md) · Practice verified

ID: `threejs-step-07`

Topics: geometry/material sharing · clone

Prerequisite units: [05](../05/README.md) · [06](../06/README.md)

Completion task: Reproduce when changing one object affects another

Required practice capabilities: Object and resource reference output

### [08. Light Types and Placement](../08/README.md) · Practice verified

ID: `threejs-step-08`

Topics: ambient, directional and point lights · position · target

Prerequisite units: [01](../../01-foundations/README.md) · [04](README.md) · [06](../06/README.md)

Completion task: Change light positions and targets and explain material response

Required practice capabilities: HTML inputs for each light type

### [09. Roughness and Metalness](../09/README.md) · Practice verified

ID: `threejs-step-09`

Topics: PBR basics · roughness · metalness

Prerequisite units: [07](../07/README.md) · [08](../08/README.md)

Completion task: Change each variable separately under the same lighting

Required practice capabilities: Comparison examples with fixed lighting and environment

### [10. Textures and UVs](../10/README.md) · Practice verified

ID: `threejs-step-10`

Topics: UV · image and numeric textures · repeat and wrap · loading failures

Prerequisite units: [05](../05/README.md) · [09](../09/README.md)

Completion task: Distinguish UV from world coordinates and recover from invalid assets

Required practice capabilities: Sample images, local file selection, TextureLoader support and failure fixtures

### [11. Color Spaces and Output](../11/README.md) · Practice verified

ID: `threejs-step-11`

Topics: color maps and data maps · input, working and output color spaces

Prerequisite units: [09](../09/README.md) · [10](../10/README.md)

Completion task: Explain how color images differ from normal and roughness data

Required practice capabilities: Comparison assets with documented sources and color spaces

### [12. Shadow Maps](../12/README.md) · Practice verified

ID: `threejs-step-12`

Topics: casters and receivers · shadow camera · resolution and cost

Prerequisite units: [03](../03/README.md) · [08](../08/README.md)

Completion task: Distinguish clipped shadows from low resolution and adjust them

Required practice capabilities: Shadow camera display and settings inputs

### [13. Normalized Coordinates and Selection](../13/README.md) · Practice verified

ID: `threejs-step-13`

Topics: canvas-relative NDC · Raycaster · intersection order

Prerequisite units: [02](../02/README.md) · [03](../03/README.md) · [04](README.md)

Completion task: Select the nearest object after margin and size changes

Required practice capabilities: Pointer position and intersection output

### [14. Materials, Loading, and Selection](../../02-experiments/README.md) · Practice verified

ID: `threejs-02`

Topics: glTF loading states · model selection · shared material highlighting

Prerequisite units: [07](../07/README.md) · [09](../09/README.md) · [10](../10/README.md) · [13](../13/README.md)

Completion task: Keep the UI usable after failures and highlight only the selected object

Required practice capabilities: GLTFLoader, sample GLB, local files and error fixtures

### [15. Model Size and Camera Fitting](../15/README.md) · Practice verified

ID: `threejs-step-15`

Topics: Box3 · model center and size · FOV-based framing

Prerequisite units: [03](../03/README.md) · [14](../../02-experiments/README.md)

Completion task: Frame a model far from the origin and handle empty models

Required practice capabilities: Fixtures with varied sizes, positions and empty models

### [16. Orbit Controls and On-Demand Rendering](../16/README.md) · Practice verified

ID: `threejs-step-16`

Topics: target · damping · rendering on input

Prerequisite units: [02](../02/README.md) · [03](../03/README.md) · [15](../15/README.md)

Completion task: Reduce idle rendering while keeping controls responsive

Required practice capabilities: Frame count and input state observation

### [17. Clip Animation](../17/README.md) · Practice verified

ID: `threejs-step-17`

Topics: clips, actions and mixers · delta in seconds · playback speed

Prerequisite units: [01](../../01-foundations/README.md) · [14](../../02-experiments/README.md) · [16](../16/README.md)

Completion task: Control clip playback and handle models without clips

Required practice capabilities: GLB files with and without animation and playback UI

### [18. Transparency and Depth](../18/README.md) · Practice verified

ID: `threejs-step-18`

Topics: opacity · transparent · depthWrite · sorting limits

Prerequisite units: [03](../03/README.md) · [09](../09/README.md)

Completion task: Explain intersecting surfaces and the limits of object sorting

Required practice capabilities: The same scene and viewpoint for comparison and notes

### [19. Instancing Basics](../19/README.md) · Practice verified

ID: `threejs-step-19`

Topics: InstancedMesh · matrices · needsUpdate · draw calls

Prerequisite units: [04](README.md) · [05](../05/README.md) · [07](../07/README.md)

Completion task: Compare individual meshes with instancing for the same layout

Required practice capabilities: Explanation and output of relevant renderer.info metrics

### [20. Instance Selection and Updates](../20/README.md) · Practice verified

ID: `threejs-step-20`

Topics: instanceId · color and position updates · bounds

Prerequisite units: [13](../13/README.md) · [19](../19/README.md)

Completion task: Move one instance and select it at its new position

Required practice capabilities: Instance ID, transform and bounds observation

### [21. Offscreen Objects and Level of Detail](../21/README.md) · Practice verified

ID: `threejs-step-21`

Topics: frustum culling · bounds · LOD

Prerequisite units: [03](../03/README.md) · [05](../05/README.md) · [20](../20/README.md)

Completion task: Compare quality and cost by distance and fix incorrect culling

Required practice capabilities: Bounds, detail level and triangle count display

### [22. Render Targets and Minimap](../22/README.md) · Practice verified

ID: `threejs-step-22`

Topics: offscreen rendering · textures · target restoration

Prerequisite units: [02](../02/README.md) · [03](../03/README.md) · [10](../10/README.md)

Completion task: Update the main view and minimap and restore rendering state

Required practice capabilities: Two-camera and render target practice

### [23. Resource Ownership Ledger](../23/README.md) · Practice verified

ID: `threejs-step-23`

Topics: remove and dispose · shared resource lifetimes

Prerequisite units: [07](../07/README.md) · [10](../10/README.md) · [14](../../02-experiments/README.md) · [22](../22/README.md)

Completion task: Record resource owners and prevent duplicate disposal

Required practice capabilities: Creation and cleanup counts and ownership observation

### [24. Asynchronous Scene Replacement](../24/README.md) · Practice verified

ID: `threejs-step-24`

Topics: request and completion order · stale results · cleanup

Prerequisite units: [14](../../02-experiments/README.md) · [17](../17/README.md) · [23](../23/README.md)

Completion task: Prevent late models from replacing a newer scene and clean up resources

Required practice capabilities: Local asset delay, failure and out-of-order completion experiments

### [25. HTML Controls and Accessibility](../25/README.md) · Practice verified

ID: `threejs-step-25`

Topics: object lists · keyboard controls · text status announcements

Prerequisite units: [13](../13/README.md) · [14](../../02-experiments/README.md) · [16](../16/README.md)

Completion task: Select objects, control cameras and understand errors without a mouse

Required practice capabilities: Real HTML controls, keyboard support and status announcements · HTML accessibility basics required

### [26. Render Statistics and Profiling](../26/README.md) · Practice verified

ID: `threejs-step-26`

Topics: renderer.info scope · multiple passes · measurement conditions

Prerequisite units: [16](../16/README.md) · [19](../19/README.md) · [22](../22/README.md) · [23](../23/README.md)

Completion task: Compare whole-frame statistics and explain measurement limits

Required practice capabilities: In-site tables and logs · precise GPU timing is not required

### [27. Integrating the Scene Inspector](../27/README.md) · Practice verified

ID: `threejs-step-27`

Topics: loading, selection, cameras, animation, errors and minimap integration

Prerequisite units: [14](../../02-experiments/README.md) · [15](../15/README.md) · [16](../16/README.md) · [17](../17/README.md) · [18](../18/README.md) · [19](../19/README.md) · [20](../20/README.md) · [21](../21/README.md) · [22](../22/README.md) · [23](../23/README.md) · [24](../24/README.md) · [25](../25/README.md) · [26](../26/README.md)

Completion task: Build an inspector that remains usable after failures

Required practice capabilities: A starter project connecting earlier assets, controls and observation tools

### [28. Rendering Resources and Measurement](../../03-project/README.md) · Practice verified

ID: `threejs-03`

Topics: bottleneck isolation · quality preservation · repeated creation and shutdown

Prerequisite units: [19](../19/README.md) · [23](../23/README.md) · [24](../24/README.md) · [26](../26/README.md) · [27](../27/README.md)

Completion task: Write a performance, quality and resource cleanup report under identical conditions

Required practice capabilities: Repeated runs, statistics comparison, notes and backup
