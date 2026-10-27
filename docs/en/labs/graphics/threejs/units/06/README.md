# Three.js · 06 Normals and Surface Orientation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Coordinates, Cameras, and Geometry · Editable example · Storage ID: `threejs-step-06`

## Goals and learning outcomes

- Starter is invisible with normal.z=-1; solution is visible with normal.z=1.
- normal.count changes 0→4; the shared vertex normal is about (-0.192,-0.192,0.962), and shading across the fold changes.
- Vertex/index counts and first normal stay fixed; only flatShading true→false changes shading across triangle boundaries.

## Prerequisites

Review the preceding geometry and lighting concepts. Each HTML runs independently; no previous result file is required.

## Key concepts and explanations

### The Role of Normals

Normals are used to calculate the direction in which light meets a surface. Different normals can make an edge look different even when positions are identical.

### Smoothing

Averaging normals at shared vertices makes the transition between faces look smooth. To preserve sharp edges, separate the attributes.

## Practice setup

Edit independent HTML inside the site. The site supplies three@0.186.1; no installation or external server is required.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Compare starter and solution in Index order and front faces and record actual numbers and images in the site notes.
2. Compare starter and solution in Light a surface with missing normals and record actual numbers and images in the site notes.
3. Compare starter and solution in Smooth shading across shared vertices and record actual numbers and images in the site notes.

## Variables to observe

| Variable       | Baseline          | Change          | Expected change / hypothesis                 |
| -------------- | ----------------- | --------------- | -------------------------------------------- |
| Vertex sharing | Separate per face | Shared at edges | Averaged normals may make edges look smooth. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Starter is invisible with normal.z=-1; solution is visible with normal.z=1.
- [ ] normal.count changes 0→4; the shared vertex normal is about (-0.192,-0.192,0.962), and shading across the fold changes.
- [ ] Vertex/index counts and first normal stay fixed; only flatShading true→false changes shading across triangle boundaries.

## Self-check

1. Are normal colors the actual material colors?
2. Why does nonuniform scale affect normal handling?

## Official references

- [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)
- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-06/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run HTML inside the site. Compare actual images and numbers for each step and record your observations in the site notes.

- [example.html](../../../../../../../src/labs/threejs-step-06/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Compare triangle facing separately from the normals used for lighting. Keep camera and lighting fixed while changing one condition.

### Prerequisite units

- `threejs-step-05`

### Index order and front faces

The camera looks from +Z toward the origin. The starter [0,2,1] is clockwise from this view, so its FrontSide face is invisible. Change it to [0,1,2]. Check that computeVertexNormals also changes normal.z from -1 to +1.

**Expected result**

Starter is invisible with normal.z=-1; solution is visible with normal.z=1.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Index order and front faces</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Index order and front faces</h1>
    <div class="controls"><button id="cleanup">Release resources</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Index order and front faces"></canvas>
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
      geometry.setIndex([0, 2, 1]);
      geometry.computeVertexNormals();
      function report() {
        output.textContent =
          'index: ' +
          Array.from(geometry.index.array) +
          ' / normal.z: ' +
          geometry.getAttribute('normal').getZ(0) +
          ' / side: ' +
          material.side +
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

- Keep the positions fixed.
- Swap the second and third indices.

</details>

<details>
<summary>Solution and explanation</summary>

Vertex order determines facing. Flipping only a normal does not restore a culled face. MeshBasicMaterial isolates facing from lighting in this experiment.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Index order and front faces</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Index order and front faces</h1>
    <div class="controls"><button id="cleanup">Release resources</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Index order and front faces"></canvas>
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
      geometry.setIndex([0, 1, 2]);
      geometry.computeVertexNormals();
      function report() {
        output.textContent =
          'index: ' +
          Array.from(geometry.index.array) +
          ' / normal.z: ' +
          geometry.getAttribute('normal').getZ(0) +
          ' / side: ' +
          material.side +
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

- How do normals differ from facing?

### Light a surface with missing normals

The starter uses four vertices and six indices for two folded faces. It has no normal attribute, but r186 automatically falls back to flat shading for MeshLambertMaterial, so the faces remain visible. Set calculateNormals=false to true and compare shading across the shared edge and normal.count.

**Expected result**

normal.count changes 0→4; the shared vertex normal is about (-0.192,-0.192,0.962), and shading across the fold changes.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Light a surface with missing normals</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Light a surface with missing normals</h1>
    <div class="controls"><button id="cleanup">Release resources</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Light a surface with missing normals"></canvas>
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
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0.8, -1, 1, 0], 3),
      );
      geometry.setIndex([0, 1, 2, 0, 2, 3]);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      const calculateNormals = false;
      if (calculateNormals) geometry.computeVertexNormals();
      function report() {
        output.textContent =
          'normal.count: ' +
          (geometry.getAttribute('normal')?.count ?? 0) +
          ' / normal[0]: ' +
          (geometry.getAttribute('normal')
            ? Array.from(geometry.getAttribute('normal').array.slice(0, 3)).map((v) =>
                v.toFixed(3),
              )
            : 'missing; r186 flat fallback') +
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

- Find calculateNormals.
- Enable the computeVertexNormals call.

</details>

<details>
<summary>Solution and explanation</summary>

computeVertexNormals accumulates adjacent-face contributions at shared vertices and normalizes them. normal.count becomes 4; the first normal is approximately (-0.192,-0.192,0.962). Missing normals do not necessarily mean black surfaces. Compare the r186 flat fallback against interpolated vertex normals.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Light a surface with missing normals</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Light a surface with missing normals</h1>
    <div class="controls"><button id="cleanup">Release resources</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Light a surface with missing normals"></canvas>
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
        new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0.8, -1, 1, 0], 3),
      );
      geometry.setIndex([0, 1, 2, 0, 2, 3]);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      const calculateNormals = true;
      if (calculateNormals) geometry.computeVertexNormals();
      function report() {
        output.textContent =
          'normal.count: ' +
          (geometry.getAttribute('normal')?.count ?? 0) +
          ' / normal[0]: ' +
          (geometry.getAttribute('normal')
            ? Array.from(geometry.getAttribute('normal').array.slice(0, 3)).map((v) =>
                v.toFixed(3),
              )
            : 'missing; r186 flat fallback') +
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

- Why does brightness change without moving the light?

### Smooth shading across shared vertices

Keep the sphere geometry and light fixed; change only flatShading from true to false. The starter has abrupt brightness changes across triangles; the solution interpolates normals smoothly. computeVertexNormals accumulates adjacent face contributions at indexed shared vertices.

**Expected result**

Vertex/index counts and first normal stay fixed; only flatShading true→false changes shading across triangle boundaries.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Smooth shading across shared vertices</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Smooth shading across shared vertices</h1>
    <div class="controls"><button id="cleanup">Release resources</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Smooth shading across shared vertices"></canvas>
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
      const geometry = new THREE.SphereGeometry(1.2, 12, 8);
      geometry.computeVertexNormals();
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb', flatShading: true });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          'vertices: ' +
          geometry.getAttribute('position').count +
          ' / index: ' +
          geometry.index.count +
          ' / flatShading: ' +
          material.flatShading +
          ' / first normal: ' +
          Array.from(geometry.getAttribute('normal').array.slice(0, 3)) +
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

- Keep sphere segmentation fixed.
- Change only flatShading to false.

</details>

<details>
<summary>Solution and explanation</summary>

flatShading derives face normals in the shader. false interpolates vertex normals. Duplicated corners such as BoxGeometry edges remain split even after computeVertexNormals. Changing flatShading after compilation also requires material.needsUpdate=true.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Smooth shading across shared vertices</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Smooth shading across shared vertices</h1>
    <div class="controls"><button id="cleanup">Release resources</button></div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Smooth shading across shared vertices"></canvas>
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
      const geometry = new THREE.SphereGeometry(1.2, 12, 8);
      geometry.computeVertexNormals();
      const material = new THREE.MeshLambertMaterial({
        color: '#2563eb',
        flatShading: false,
      });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          'vertices: ' +
          geometry.getAttribute('position').count +
          ' / index: ' +
          geometry.index.count +
          ' / flatShading: ' +
          material.flatShading +
          ' / first normal: ' +
          Array.from(geometry.getAttribute('normal').array.slice(0, 3)) +
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

- How do duplicated vertices affect normal averaging?

### API · BufferGeometry.computeVertexNormals

Calculate normals from faces; indexed geometry accumulates adjacent-face contributions at shared vertices and normalizes them.

Updates the normal attribute without returning a value.

- Does not merge duplicate vertices or change winding.

```js
geometry.computeVertexNormals();
```

[BufferGeometry.computeVertexNormals](https://threejs.org/docs/pages/BufferGeometry.html) · three@0.186.1 · 2026-10-27

### API · MeshLambertMaterial.flatShading

Use face normals when true and interpolate vertex normals when false.

- `flatShading: boolean` — Whether to use flat shading (false)

Changes the material shading mode.

- After compilation, changing it requires material.needsUpdate=true.

```js
material.flatShading=false; material.needsUpdate=true;
```

[MeshLambertMaterial.flatShading](https://threejs.org/docs/pages/MeshLambertMaterial.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Buffer Geometry](../05/README.md) · [Next: Shared Geometry and Cloning](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
