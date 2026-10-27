# Three.js · 05 Buffer Geometry

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Coordinates, Cameras, and Geometry · Editable example · Storage ID: `threejs-step-05`

## Goals and learning outcomes

- 3 vertices, no index, 1 triangle; topY changes from 0.2 to 1.
- Starter: 6 vertices, no index. Solution: 4 vertices, 6 indices. Both show a two-triangle square.
- Vertex 4 is rejected without mutation. A valid edit updates CPU and image and increments version.

## Prerequisites

Review the preceding geometry and lighting concepts. Each HTML runs independently; no previous result file is required.

## Key concepts and explanations

### Vertex Attributes

BufferGeometry groups arrays such as position and normal. itemSize is the number of components in one vertex.

### Index Sharing

Indices reuse vertices to connect triangles. Even at the same position, different UV or normal values may require separate vertices.

## Practice setup

Edit independent HTML inside the site. The site supplies three@0.186.1; no installation or external server is required.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Compare starter and solution in Build a triangle from attributes and record actual numbers and images in the site notes.
2. Compare starter and solution in Connect two faces with four vertices and record actual numbers and images in the site notes.
3. Compare starter and solution in Validate a vertex update and record actual numbers and images in the site notes.

## Variables to observe

| Variable    | Baseline         | Change    | Expected change / hypothesis                                              |
| ----------- | ---------------- | --------- | ------------------------------------------------------------------------- |
| Index order | Counterclockwise | Clockwise | The default front-face classification changes, so the face may disappear. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] 3 vertices, no index, 1 triangle; topY changes from 0.2 to 1.
- [ ] Starter: 6 vertices, no index. Solution: 4 vertices, 6 indices. Both show a two-triangle square.
- [ ] Vertex 4 is rejected without mutation. A valid edit updates CPU and image and increments version.

## Self-check

1. Why can vertices with the same coordinates not always be merged?
2. What changes if itemSize is mistakenly set to 2?

## Official references

- [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-05/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run HTML inside the site. Compare actual images and numbers for each step and record your observations in the site notes.

- [example.html](../../../../../../../src/labs/threejs-step-05/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Build position arrays and distinguish vertices from triangles. Predict each change and record actual images and numbers in the site notes. Every example is independent HTML.

### Prerequisite units

- `threejs-01`
- `threejs-step-04`

### Build a triangle from attributes

The second Float32BufferAttribute argument, 3, is the number of components x,y,z per vertex. Nine components give position.count=3. Change topY from 0.2 to 1 and compare the top corner and triangle area. setAttribute attaches the attribute under position.

**Expected result**

3 vertices, no index, 1 triangle; topY changes from 0.2 to 1.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Build a triangle from attributes</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Build a triangle from attributes</h1>
    <div class="controls"><button id="cleanup">Release resources</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Build a triangle from attributes"></canvas>
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
      const topY = 0.2;
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 0, topY, 0], 3),
      );
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      function report() {
        output.textContent =
          'vertices: ' +
          geometry.getAttribute('position').count +
          ' / index: ' +
          (geometry.index?.count ?? 0) +
          ' / triangles: ' +
          geometry.getAttribute('position').count / 3 +
          ' / topY: ' +
          geometry.getAttribute('position').getY(2) +
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

- Find the topY constant.
- Keep itemSize at 3.

</details>

<details>
<summary>Solution and explanation</summary>

The vertex count stays fixed while the top corner moves. With a null index, every three consecutive positions form one triangle. Float32BufferAttribute stores a floating-point array for the GPU.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Build a triangle from attributes</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Build a triangle from attributes</h1>
    <div class="controls"><button id="cleanup">Release resources</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Build a triangle from attributes"></canvas>
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
      const topY = 1;
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 0, topY, 0], 3),
      );
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      function report() {
        output.textContent =
          'vertices: ' +
          geometry.getAttribute('position').count +
          ' / index: ' +
          (geometry.index?.count ?? 0) +
          ' / triangles: ' +
          geometry.getAttribute('position').count / 3 +
          ' / topY: ' +
          geometry.getAttribute('position').getY(2) +
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

- How would the count change with itemSize=2?

### Connect two faces with four vertices

The starter uses six positions for a square, duplicating two corners. Use four vertices and setIndex([0,1,2,0,2,3]) as in the solution to build the same faces. Sketch the zero-based vertex numbers and compare them with the arrays. Enter 0,1,99 in the HTML index-array field and apply it: the error must preserve the previous shape. Every index must be below position.count. Reapply the original array to recover.

**Expected result**

Starter: 6 vertices, no index. Solution: 4 vertices, 6 indices. Both show a two-triangle square.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Connect two faces with four vertices</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Connect two faces with four vertices</h1>
    <div class="controls">
      <label>Index array <input id="indices" value="0,1,2,3,4,5" /></label
      ><button id="applyIndices">Apply array</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Connect two faces with four vertices"></canvas>
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
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(
          [-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0],
          3,
        ),
      );

      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      function report() {
        output.textContent =
          'vertices: ' +
          geometry.getAttribute('position').count +
          ' / index: ' +
          (geometry.index?.count ?? 0) +
          ' / triangles: ' +
          (geometry.index?.count ?? geometry.getAttribute('position').count) / 3 +
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
      document.querySelector('#applyIndices').addEventListener(
        'click',
        () => {
          const parts = document.querySelector('#indices').value.split(','),
            values = parts.map(Number),
            count = geometry.getAttribute('position').count;
          if (
            parts.some((p) => !p.trim()) ||
            values.length % 3 !== 0 ||
            values.some((i) => !Number.isInteger(i) || i < 0 || i >= count)
          ) {
            error.textContent =
              'Indices must be integers below vertex count, grouped in threes.';
            return;
          }
          error.textContent = '';
          geometry.setIndex(values);
          draw();
        },
        { signal: events.signal },
      );
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

- The solution position array has 12 components.
- Connect 0,1,2 and 0,2,3.

</details>

<details>
<summary>Solution and explanation</summary>

index.count=6 does not mean six stored vertices. Three indices make one face, so there are two faces. Corners with different UVs or normals still need separate vertices.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Connect two faces with four vertices</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Connect two faces with four vertices</h1>
    <div class="controls">
      <label>Index array <input id="indices" value="0,1,2,0,2,3" /></label
      ><button id="applyIndices">Apply array</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Connect two faces with four vertices"></canvas>
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
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], 3),
      );
      geometry.setIndex([0, 1, 2, 0, 2, 3]);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      function report() {
        output.textContent =
          'vertices: ' +
          geometry.getAttribute('position').count +
          ' / index: ' +
          (geometry.index?.count ?? 0) +
          ' / triangles: ' +
          (geometry.index?.count ?? geometry.getAttribute('position').count) / 3 +
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
      document.querySelector('#applyIndices').addEventListener(
        'click',
        () => {
          const parts = document.querySelector('#indices').value.split(','),
            values = parts.map(Number),
            count = geometry.getAttribute('position').count;
          if (
            parts.some((p) => !p.trim()) ||
            values.length % 3 !== 0 ||
            values.some((i) => !Number.isInteger(i) || i < 0 || i >= count)
          ) {
            error.textContent =
              'Indices must be integers below vertex count, grouped in threes.';
            return;
          }
          error.textContent = '';
          geometry.setIndex(values);
          draw();
        },
        { signal: events.signal },
      );
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

- What do index.count and position.count count?

### Validate a vertex update

Accept vertex numbers 0–2 and y from -2 to 2. Apply vertex 4 and verify the previous triangle survives the error. Then apply vertex 2 with y=0.2. The starter changes the CPU array but leaves the rendered shape stale. Change notifyGpu=false to true.

**Expected result**

Vertex 4 is rejected without mutation. A valid edit updates CPU and image and increments version.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Validate a vertex update</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Validate a vertex update</h1>
    <div class="controls">
      <label>Vertex index <input id="vertex" type="number" value="2" /></label
      ><label
        >y <input id="height" type="number" value="0.2" step="0.1" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Validate a vertex update"></canvas>
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
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 0, 1, 0], 3),
      );
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const notifyGpu = false;
      function report() {
        output.textContent =
          'vertices: ' +
          geometry.getAttribute('position').count +
          ' / topY: ' +
          geometry.getAttribute('position').getY(2) +
          ' / version: ' +
          geometry.getAttribute('position').version +
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
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const raw = document.querySelector('#vertex').value,
            value = document.querySelector('#height').value,
            i = Number(raw),
            y = Number(value),
            p = geometry.getAttribute('position');
          if (
            !raw.trim() ||
            !value.trim() ||
            !Number.isInteger(i) ||
            i < 0 ||
            i >= p.count ||
            !Number.isFinite(y) ||
            y < -2 ||
            y > 2
          ) {
            error.textContent = 'Vertex index must be 0–2 and y must be finite within -2–2.';
            return;
          }
          error.textContent = '';
          p.setY(i, y);
          if (notifyGpu) p.needsUpdate = true;
          geometry.computeBoundingSphere();
          draw();
        },
        { signal: events.signal },
      );
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

- Inspect needsUpdate after setY.
- Set notifyGpu to true.

</details>

<details>
<summary>Solution and explanation</summary>

setY modifies the array. needsUpdate=true requests GPU upload and increments version. Recompute boundingSphere to avoid stale bounds. Reject invalid indices and empty input before mutation.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Validate a vertex update</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Validate a vertex update</h1>
    <div class="controls">
      <label>Vertex index <input id="vertex" type="number" value="2" /></label
      ><label
        >y <input id="height" type="number" value="0.2" step="0.1" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Validate a vertex update"></canvas>
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
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 0, 1, 0], 3),
      );
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const notifyGpu = true;
      function report() {
        output.textContent =
          'vertices: ' +
          geometry.getAttribute('position').count +
          ' / topY: ' +
          geometry.getAttribute('position').getY(2) +
          ' / version: ' +
          geometry.getAttribute('position').version +
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
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const raw = document.querySelector('#vertex').value,
            value = document.querySelector('#height').value,
            i = Number(raw),
            y = Number(value),
            p = geometry.getAttribute('position');
          if (
            !raw.trim() ||
            !value.trim() ||
            !Number.isInteger(i) ||
            i < 0 ||
            i >= p.count ||
            !Number.isFinite(y) ||
            y < -2 ||
            y > 2
          ) {
            error.textContent = 'Vertex index must be 0–2 and y must be finite within -2–2.';
            return;
          }
          error.textContent = '';
          p.setY(i, y);
          if (notifyGpu) p.needsUpdate = true;
          geometry.computeBoundingSphere();
          draw();
        },
        { signal: events.signal },
      );
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

- What is missing when only the CPU value changes?

### API · BufferGeometry.setAttribute / BufferAttribute

Attach a vertex attribute by name. count is array length divided by itemSize.

- `name: string` — Attribute name such as position
- `attribute: BufferAttribute` — Vertex data and component size

setAttribute returns the geometry.

- Positions use three components per vertex.

```js
geometry.setAttribute('position', new THREE.Float32BufferAttribute([0,0,0,1,0,0,0,1,0],3));
```

[BufferGeometry.setAttribute / BufferAttribute](https://threejs.org/docs/pages/BufferGeometry.html) · three@three@0.186.1 · 2026-10-27

### API · BufferGeometry.setIndex

Specify three vertex indices per triangle. null uses consecutive vertices.

- `index: Array<number> | BufferAttribute | null` — Integer indices from 0 through position.count-1

Returns the geometry.

- Out-of-range indices are not repaired automatically. Validate first.

```js
geometry.setIndex([0,1,2,0,2,3]);
```

[BufferGeometry.setIndex](https://threejs.org/docs/pages/BufferGeometry.html) · three@three@0.186.1 · 2026-10-27

### API · BufferAttribute.setY / needsUpdate

Modify a CPU component with setY, then set needsUpdate=true to request GPU upload.

- `index, y: number` — Vertex index and new y component

setY returns the attribute. Setting needsUpdate increments version.

- Recompute bounds after position edits. Do not inspect a needsUpdate getter as confirmation.

```js
position.setY(2, .2); position.needsUpdate=true; geometry.computeBoundingSphere();
```

[BufferAttribute.setY / needsUpdate](https://threejs.org/docs/pages/BufferAttribute.html) · three@three@0.186.1 · 2026-10-27

## Next learning

[Previous: Rotation and Pivots](../04/README.md) · [Next: Normals and Surface Orientation](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
