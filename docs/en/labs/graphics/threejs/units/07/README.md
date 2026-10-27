# Three.js · 07 Shared Geometry and Cloning

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Coordinates, Cameras, and Geometry · Editable example · Storage ID: `threejs-step-07`

## Goals and learning outcomes

- Geometry/material references are shared. Both heights change from 1 to 1.5 while centers stay at x=-1,1.
- Starter: both references true, both orange/height 1.6. Solution: false, a blue/height 1, b orange/height 1.6.
- Solution shares geometry but not material: a blue, b orange, both heights 1.

## Prerequisites

Review the preceding geometry and lighting concepts. Each HTML runs independently; no previous result file is required.

## Key concepts and explanations

### Shared References

Multiple Mesh objects can reference one geometry or material. Changing a shared resource affects every object that references it.

### Ownership

Cloning an object does not mean independently copying every GPU resource. Check the scope of sharing before modifying or releasing resources.

## Practice setup

Edit independent HTML inside the site. The site supplies three@0.186.1; no installation or external server is required.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Compare starter and solution in Two objects sharing resources and record actual numbers and images in the site notes.
2. Compare starter and solution in Inspect Mesh.clone resource sharing and record actual numbers and images in the site notes.
3. Compare starter and solution in Separate only the material and record actual numbers and images in the site notes.

## Variables to observe

| Variable | Baseline         | Change                      | Expected change / hypothesis                                     |
| -------- | ---------------- | --------------------------- | ---------------------------------------------------------------- |
| Material | Shared reference | Individual cloned materials | Changing one cube’s color does not propagate to the other cubes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Geometry/material references are shared. Both heights change from 1 to 1.5 while centers stay at x=-1,1.
- [ ] Starter: both references true, both orange/height 1.6. Solution: false, a blue/height 1, b orange/height 1.6.
- [ ] Solution shares geometry but not material: a blue, b orange, both heights 1.

## Self-check

1. Does clone also deeply copy geometry?
2. When can shared resources be disposed of?

## Official references

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-07/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run HTML inside the site. Compare actual images and numbers for each step and record your observations in the site notes.

- [example.html](../../../../../../../src/labs/threejs-step-07/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Use === to inspect which resources two Mesh objects share. Predict object transforms separately from geometry and material edits.

### Prerequisite units

- `threejs-step-05`
- `threejs-step-06`

### Two objects sharing resources

a and b are distinct Mesh objects sharing geometry and material. Change stretch=1 to 1.5: a.geometry.scale stretches both boxes. Also compare changing only a.position.x, which leaves b in place.

**Expected result**

Geometry/material references are shared. Both heights change from 1 to 1.5 while centers stay at x=-1,1.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Two objects sharing resources</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Two objects sharing resources</h1>
    <div class="controls"><button id="cleanup">Release resources</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Two objects sharing resources"></canvas>
    </div>
    <output>Waiting for visible preview size</output>
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
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const a = new THREE.Mesh(geometry, material);
      a.position.x = -1;
      const b = a.clone();
      b.position.x = 1;
      const stretch = 1;
      a.geometry.scale(1, stretch, 1);
      for (const m of [a, b]) {
        m.geometry.computeBoundingBox();
        scene.add(ownMesh(m));
      }
      function report() {
        output.textContent =
          'same geometry: ' +
          (a.geometry === b.geometry) +
          ' / same material: ' +
          (a.material === b.material) +
          ' / heights: ' +
          [
            a.geometry.boundingBox.max.y - a.geometry.boundingBox.min.y,
            b.geometry.boundingBox.max.y - b.geometry.boundingBox.min.y,
          ] +
          ' / colors: ' +
          [a.material.color.getHexString(), b.material.color.getHexString()] +
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
      // Support: wait while hidden, then fit the drawing buffer and camera.
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
      // Release resources and events owned by this HTML exactly once.
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
        output.textContent = 'Resources released';
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
<summary>Hints</summary>

- Change only stretch.
- Inspect a.geometry.scale(1,stretch,1).

</details>

<details>
<summary>Solution and explanation</summary>

geometry.scale changes the shared vertex array. Mesh position and scale are per-Object3D transforms and do not mutate geometry. The output reports actual bounding-box heights and reference equality.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Two objects sharing resources</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Two objects sharing resources</h1>
    <div class="controls"><button id="cleanup">Release resources</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Two objects sharing resources"></canvas>
    </div>
    <output>Waiting for visible preview size</output>
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
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const a = new THREE.Mesh(geometry, material);
      a.position.x = -1;
      const b = a.clone();
      b.position.x = 1;
      const stretch = 1.5;
      a.geometry.scale(1, stretch, 1);
      for (const m of [a, b]) {
        m.geometry.computeBoundingBox();
        scene.add(ownMesh(m));
      }
      function report() {
        output.textContent =
          'same geometry: ' +
          (a.geometry === b.geometry) +
          ' / same material: ' +
          (a.material === b.material) +
          ' / heights: ' +
          [
            a.geometry.boundingBox.max.y - a.geometry.boundingBox.min.y,
            b.geometry.boundingBox.max.y - b.geometry.boundingBox.min.y,
          ] +
          ' / colors: ' +
          [a.material.color.getHexString(), b.material.color.getHexString()] +
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
      // Support: wait while hidden, then fit the drawing buffer and camera.
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
      // Release resources and events owned by this HTML exactly once.
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
        output.textContent = 'Resources released';
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

- How does a.scale.y differ from a.geometry.scale?

### Inspect Mesh.clone resource sharing

b=a.clone() creates another Mesh but retains geometry and material references. In the starter, b.geometry.scale and b.material.color.set also affect a. Set isolate=false to true to assign geometry.clone and material.clone first.

**Expected result**

Starter: both references true, both orange/height 1.6. Solution: false, a blue/height 1, b orange/height 1.6.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Inspect Mesh.clone resource sharing</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Inspect Mesh.clone resource sharing</h1>
    <div class="controls"><button id="cleanup">Release resources</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Inspect Mesh.clone resource sharing"></canvas>
    </div>
    <output>Waiting for visible preview size</output>
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
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const a = new THREE.Mesh(geometry, material);
      a.position.x = -1;
      const b = a.clone();
      b.position.x = 1;
      const isolate = false;
      if (isolate) {
        b.geometry = b.geometry.clone();
        b.material = b.material.clone();
      }
      b.geometry.scale(1, 1.6, 1);
      b.material.color.set('#f97316');
      for (const m of [a, b]) {
        m.geometry.computeBoundingBox();
        scene.add(ownMesh(m));
      }
      function report() {
        output.textContent =
          'same geometry: ' +
          (a.geometry === b.geometry) +
          ' / same material: ' +
          (a.material === b.material) +
          ' / heights: ' +
          [
            a.geometry.boundingBox.max.y - a.geometry.boundingBox.min.y,
            b.geometry.boundingBox.max.y - b.geometry.boundingBox.min.y,
          ] +
          ' / colors: ' +
          [a.material.color.getHexString(), b.material.color.getHexString()] +
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
      // Support: wait while hidden, then fit the drawing buffer and camera.
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
      // Release resources and events owned by this HTML exactly once.
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
        output.textContent = 'Resources released';
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
<summary>Hints</summary>

- Clone both resources in the isolate branch.
- Clone before editing.

</details>

<details>
<summary>Solution and explanation</summary>

Cloning resources makes only b orange and 1.6 high; a stays blue and 1 high. geometry.clone also copies attribute arrays. A material clone would still share textures, but this example uses no textures.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Inspect Mesh.clone resource sharing</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Inspect Mesh.clone resource sharing</h1>
    <div class="controls"><button id="cleanup">Release resources</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Inspect Mesh.clone resource sharing"></canvas>
    </div>
    <output>Waiting for visible preview size</output>
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
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const a = new THREE.Mesh(geometry, material);
      a.position.x = -1;
      const b = a.clone();
      b.position.x = 1;
      const isolate = true;
      if (isolate) {
        b.geometry = b.geometry.clone();
        b.material = b.material.clone();
      }
      b.geometry.scale(1, 1.6, 1);
      b.material.color.set('#f97316');
      for (const m of [a, b]) {
        m.geometry.computeBoundingBox();
        scene.add(ownMesh(m));
      }
      function report() {
        output.textContent =
          'same geometry: ' +
          (a.geometry === b.geometry) +
          ' / same material: ' +
          (a.material === b.material) +
          ' / heights: ' +
          [
            a.geometry.boundingBox.max.y - a.geometry.boundingBox.min.y,
            b.geometry.boundingBox.max.y - b.geometry.boundingBox.min.y,
          ] +
          ' / colors: ' +
          [a.material.color.getHexString(), b.material.color.getHexString()] +
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
      // Support: wait while hidden, then fit the drawing buffer and camera.
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
      // Release resources and events owned by this HTML exactly once.
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
        output.textContent = 'Resources released';
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

- Why does Mesh.clone retain shared resources?

### Separate only the material

Keep geometry shared and clone only b.material for independent color. Set separateMaterial=false to true. After changing b to orange, verify a stays blue and geometry=== remains true.

**Expected result**

Solution shares geometry but not material: a blue, b orange, both heights 1.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Separate only the material</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Separate only the material</h1>
    <div class="controls"><button id="cleanup">Release resources</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Separate only the material"></canvas>
    </div>
    <output>Waiting for visible preview size</output>
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
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const a = new THREE.Mesh(geometry, material);
      a.position.x = -1;
      const b = a.clone();
      b.position.x = 1;
      const separateMaterial = false;
      if (separateMaterial) b.material = b.material.clone();
      b.material.color.set('#f97316');
      for (const m of [a, b]) {
        m.geometry.computeBoundingBox();
        scene.add(ownMesh(m));
      }
      function report() {
        output.textContent =
          'same geometry: ' +
          (a.geometry === b.geometry) +
          ' / same material: ' +
          (a.material === b.material) +
          ' / heights: ' +
          [
            a.geometry.boundingBox.max.y - a.geometry.boundingBox.min.y,
            b.geometry.boundingBox.max.y - b.geometry.boundingBox.min.y,
          ] +
          ' / colors: ' +
          [a.material.color.getHexString(), b.material.color.getHexString()] +
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
      // Support: wait while hidden, then fit the drawing buffer and camera.
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
      // Release resources and events owned by this HTML exactly once.
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
        output.textContent = 'Resources released';
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
<summary>Hints</summary>

- Do not add geometry.clone.
- Clone b.material before changing its color.

</details>

<details>
<summary>Solution and explanation</summary>

Clone only the resource requiring independence. Sharing is a per-reference choice. Cleanup uses Sets to dispose each shared resource once. Run the example again after pressing Release resources.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Separate only the material</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Separate only the material</h1>
    <div class="controls"><button id="cleanup">Release resources</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Separate only the material"></canvas>
    </div>
    <output>Waiting for visible preview size</output>
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
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const a = new THREE.Mesh(geometry, material);
      a.position.x = -1;
      const b = a.clone();
      b.position.x = 1;
      const separateMaterial = true;
      if (separateMaterial) b.material = b.material.clone();
      b.material.color.set('#f97316');
      for (const m of [a, b]) {
        m.geometry.computeBoundingBox();
        scene.add(ownMesh(m));
      }
      function report() {
        output.textContent =
          'same geometry: ' +
          (a.geometry === b.geometry) +
          ' / same material: ' +
          (a.material === b.material) +
          ' / heights: ' +
          [
            a.geometry.boundingBox.max.y - a.geometry.boundingBox.min.y,
            b.geometry.boundingBox.max.y - b.geometry.boundingBox.min.y,
          ] +
          ' / colors: ' +
          [a.material.color.getHexString(), b.material.color.getHexString()] +
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
      // Support: wait while hidden, then fit the drawing buffer and camera.
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
      // Release resources and events owned by this HTML exactly once.
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
        output.textContent = 'Resources released';
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

- Must geometry also be cloned to separate color?

### API · Mesh.clone

Copy the Mesh and Object3D transforms while retaining geometry and material references.

- `recursive: boolean` — Whether to clone child Object3D objects too. (true)

Returns a new Mesh.

- Clone resources separately when independent edits are needed.

```js
const b=a.clone();
```

[Mesh.clone](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-27

### API · BufferGeometry.clone / Material.clone

Create a new geometry or material instance.

Returns a new resource of the same type.

- Material clones do not independently clone textures. Dispose shared resources once through their owner.

```js
b.geometry=a.geometry.clone(); b.material=a.material.clone();
```

[BufferGeometry.clone / Material.clone](https://threejs.org/docs/pages/Material.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Normals and Surface Orientation](../06/README.md) · [Next: Light Types and Placement](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
