# Three.js · 13 Normalized Coordinates and Selection

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting, Materials, and Model Selection · Editable example · Storage ID: `threejs-step-13`

## Goals and learning outcomes

- Keep selection positions correct even with page margins.
- Select the nearest intersected target.

## Prerequisites

Prerequisite units: 02, 03, 04. Build on their concepts.

## Key concepts and explanations

### NDC Input

Raycaster.setFromCamera accepts normalized device coordinates. Calculate them relative to the canvas rectangle: x ranges from -1 to 1, and y is 1 at the top.

### Intersection Results

intersectObjects returns intersection information ordered by distance. Complex models need a rule for walking from a child Mesh up to the intended application selection target.

## Practice setup

Edit and run HTML inside the site using the supplied Three.js 0.186.1. No separate installation or external server is required. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. The starter normalizes by innerWidth/innerHeight. Change canvasRelative=false to true. Click center and top-left, press Change margin and width, then click center again.
2. The input array is [back,front]. The starter chooses the last hit. Change nearest=false to true and click the overlapping center. Compare every reported name and distance.
3. Change clearOnMiss=false to true. Select front, then click empty top-left space. Change margin and width, select front again, and also try Clear selection.

## Variables to observe

| Variable         | Baseline      | Change   | Expected change / hypothesis                |
| ---------------- | ------------- | -------- | ------------------------------------------- |
| Pointer position | Canvas center | Top left | NDC changes approximately from 0,0 to -1,1. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep selection positions correct even with page margins.
- [ ] Select the nearest intersected target.

## Self-check

1. When does normalization using the window size give incorrect results?
2. How does the recursive option differ from a parent-selection rule?

## Official references

- [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-13/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run the HTML starter inside the site. Complete each experiment and record actual images and values in notes.

- [example.html](../../../../../../../src/labs/threejs-step-13/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Convert client coordinates into canvas NDC and cast a ray from the camera. Use overlapping boxes and their distance list to select the nearest object after margin and size changes.

### Prerequisite units

- `threejs-step-02`
- `threejs-step-03`
- `threejs-step-04`

### Compute NDC from the canvas rectangle

The starter normalizes by innerWidth/innerHeight. Change canvasRelative=false to true. Click center and top-left, press Change margin and width, then click center again.

**Expected result**

Center NDC≈(0,0); top-left≈(-1,1). Center still selects front after margin/width changes.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Canvas-relative NDC</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Canvas-relative NDC</h1>
    <p>
      Click the overlapping boxes. front is at z=.6 and back at z=-.6. The input
      array is [back,front], while intersections are sorted by distance. Compare
      center, top-left, and positions after margin/width changes.
    </p>
    <div class="controls">
      <button id="layout">Change margin and width</button
      ><button id="clear">Clear selection</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Canvas-relative NDC"></canvas></div>
    <output>Waiting for preview size</output>
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
      const geometry = new THREE.BoxGeometry(1.8, 1.8, 0.5),
        backMaterial = new THREE.MeshBasicMaterial({ color: '#2563eb' }),
        frontMaterial = new THREE.MeshBasicMaterial({ color: '#f97316' });
      const back = ownMesh(new THREE.Mesh(geometry, backMaterial)),
        front = ownMesh(new THREE.Mesh(geometry, frontMaterial));
      back.name = 'back';
      front.name = 'front';
      back.position.set(-0.35, 0, -0.6);
      front.position.set(0.35, 0, 0.6);
      scene.add(back, front);
      const raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      let hits = [],
        selected = null,
        compact = false;
      const canvasRelative = false;
      const nearest = true;
      const clearOnMiss = true;
      function highlight(object) {
        selected = object;
        backMaterial.color.set(object === back ? '#22c55e' : '#2563eb');
        frontMaterial.color.set(object === front ? '#22c55e' : '#f97316');
      }
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          const r = canvasRelative
            ? canvas.getBoundingClientRect()
            : { left: 0, top: 0, width: innerWidth, height: innerHeight };
          pointer.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            1 - ((e.clientY - r.top) / r.height) * 2,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          hits = raycaster.intersectObjects([back, front], false);
          const next = hits.length
            ? (nearest ? hits[0] : hits[hits.length - 1]).object
            : null;
          if (next || clearOnMiss) highlight(next);
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#layout').addEventListener(
        'click',
        () => {
          compact = !compact;
          stage.style.width = compact ? '300px' : '480px';
          stage.style.marginLeft = compact ? '20px' : '0';
          stage.style.maxWidth = compact ? 'calc(100% - 20px)' : '100%';
          resizeScene();
        },
        { signal: events.signal },
      );
      document.querySelector('#clear').addEventListener(
        'click',
        () => {
          highlight(null);
          hits = [];
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'NDC: ' +
          pointer.toArray().map((v) => v.toFixed(3)) +
          ' / hits: ' +
          hits.map((h) => h.object.name + ':' + h.distance.toFixed(3)).join(' → ') +
          ' / selected: ' +
          (selected?.name ?? 'none');
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
        output.textContent = 'Disposed';
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
<summary>Hints</summary>

- Set canvasRelative to true.
- Read a fresh rectangle on every click.

</details>

<details>
<summary>Solution and explanation</summary>

getBoundingClientRect returns the current canvas client position and CSS size. NDC x is 2*(clientX-left)/width-1. Since up is +1, y is 1-2*(clientY-top)/height. Do not confuse CSS dimensions with buffer pixels or window size.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Canvas-relative NDC</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Canvas-relative NDC</h1>
    <p>
      Click the overlapping boxes. front is at z=.6 and back at z=-.6. The input
      array is [back,front], while intersections are sorted by distance. Compare
      center, top-left, and positions after margin/width changes.
    </p>
    <div class="controls">
      <button id="layout">Change margin and width</button
      ><button id="clear">Clear selection</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Canvas-relative NDC"></canvas></div>
    <output>Waiting for preview size</output>
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
      const geometry = new THREE.BoxGeometry(1.8, 1.8, 0.5),
        backMaterial = new THREE.MeshBasicMaterial({ color: '#2563eb' }),
        frontMaterial = new THREE.MeshBasicMaterial({ color: '#f97316' });
      const back = ownMesh(new THREE.Mesh(geometry, backMaterial)),
        front = ownMesh(new THREE.Mesh(geometry, frontMaterial));
      back.name = 'back';
      front.name = 'front';
      back.position.set(-0.35, 0, -0.6);
      front.position.set(0.35, 0, 0.6);
      scene.add(back, front);
      const raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      let hits = [],
        selected = null,
        compact = false;
      const canvasRelative = true;
      const nearest = true;
      const clearOnMiss = true;
      function highlight(object) {
        selected = object;
        backMaterial.color.set(object === back ? '#22c55e' : '#2563eb');
        frontMaterial.color.set(object === front ? '#22c55e' : '#f97316');
      }
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          const r = canvasRelative
            ? canvas.getBoundingClientRect()
            : { left: 0, top: 0, width: innerWidth, height: innerHeight };
          pointer.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            1 - ((e.clientY - r.top) / r.height) * 2,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          hits = raycaster.intersectObjects([back, front], false);
          const next = hits.length
            ? (nearest ? hits[0] : hits[hits.length - 1]).object
            : null;
          if (next || clearOnMiss) highlight(next);
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#layout').addEventListener(
        'click',
        () => {
          compact = !compact;
          stage.style.width = compact ? '300px' : '480px';
          stage.style.marginLeft = compact ? '20px' : '0';
          stage.style.maxWidth = compact ? 'calc(100% - 20px)' : '100%';
          resizeScene();
        },
        { signal: events.signal },
      );
      document.querySelector('#clear').addEventListener(
        'click',
        () => {
          highlight(null);
          hits = [];
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'NDC: ' +
          pointer.toArray().map((v) => v.toFixed(3)) +
          ' / hits: ' +
          hits.map((h) => h.object.name + ':' + h.distance.toFixed(3)).join(' → ') +
          ' / selected: ' +
          (selected?.name ?? 'none');
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
        output.textContent = 'Disposed';
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

- Why can dividing by canvas.width fail with DPR or page margins?

### Select the first distance-sorted hit

The input array is [back,front]. The starter chooses the last hit. Change nearest=false to true and click the overlapping center. Compare every reported name and distance.

**Expected result**

The list puts front before back; selection changes back→front.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Intersection order and distance</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Intersection order and distance</h1>
    <p>
      Click the overlapping boxes. front is at z=.6 and back at z=-.6. The input
      array is [back,front], while intersections are sorted by distance. Compare
      center, top-left, and positions after margin/width changes.
    </p>
    <div class="controls">
      <button id="layout">Change margin and width</button
      ><button id="clear">Clear selection</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Intersection order and distance"></canvas>
    </div>
    <output>Waiting for preview size</output>
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
      const geometry = new THREE.BoxGeometry(1.8, 1.8, 0.5),
        backMaterial = new THREE.MeshBasicMaterial({ color: '#2563eb' }),
        frontMaterial = new THREE.MeshBasicMaterial({ color: '#f97316' });
      const back = ownMesh(new THREE.Mesh(geometry, backMaterial)),
        front = ownMesh(new THREE.Mesh(geometry, frontMaterial));
      back.name = 'back';
      front.name = 'front';
      back.position.set(-0.35, 0, -0.6);
      front.position.set(0.35, 0, 0.6);
      scene.add(back, front);
      const raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      let hits = [],
        selected = null,
        compact = false;
      const canvasRelative = true;
      const nearest = false;
      const clearOnMiss = true;
      function highlight(object) {
        selected = object;
        backMaterial.color.set(object === back ? '#22c55e' : '#2563eb');
        frontMaterial.color.set(object === front ? '#22c55e' : '#f97316');
      }
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          const r = canvasRelative
            ? canvas.getBoundingClientRect()
            : { left: 0, top: 0, width: innerWidth, height: innerHeight };
          pointer.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            1 - ((e.clientY - r.top) / r.height) * 2,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          hits = raycaster.intersectObjects([back, front], false);
          const next = hits.length
            ? (nearest ? hits[0] : hits[hits.length - 1]).object
            : null;
          if (next || clearOnMiss) highlight(next);
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#layout').addEventListener(
        'click',
        () => {
          compact = !compact;
          stage.style.width = compact ? '300px' : '480px';
          stage.style.marginLeft = compact ? '20px' : '0';
          stage.style.maxWidth = compact ? 'calc(100% - 20px)' : '100%';
          resizeScene();
        },
        { signal: events.signal },
      );
      document.querySelector('#clear').addEventListener(
        'click',
        () => {
          highlight(null);
          hits = [];
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'NDC: ' +
          pointer.toArray().map((v) => v.toFixed(3)) +
          ' / hits: ' +
          hits.map((h) => h.object.name + ':' + h.distance.toFixed(3)).join(' → ') +
          ' / selected: ' +
          (selected?.name ?? 'none');
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
        output.textContent = 'Disposed';
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
<summary>Hints</summary>

- Use hits[0].object.
- Do not repair this by reversing the input array.

</details>

<details>
<summary>Solution and explanation</summary>

intersectObjects sorts intersections by distance from the ray origin, independently of input array order. hits[0] is nearest. A shared triangle edge can yield two coincident hits on one object, so hit count is not object count.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Intersection order and distance</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Intersection order and distance</h1>
    <p>
      Click the overlapping boxes. front is at z=.6 and back at z=-.6. The input
      array is [back,front], while intersections are sorted by distance. Compare
      center, top-left, and positions after margin/width changes.
    </p>
    <div class="controls">
      <button id="layout">Change margin and width</button
      ><button id="clear">Clear selection</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Intersection order and distance"></canvas>
    </div>
    <output>Waiting for preview size</output>
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
      const geometry = new THREE.BoxGeometry(1.8, 1.8, 0.5),
        backMaterial = new THREE.MeshBasicMaterial({ color: '#2563eb' }),
        frontMaterial = new THREE.MeshBasicMaterial({ color: '#f97316' });
      const back = ownMesh(new THREE.Mesh(geometry, backMaterial)),
        front = ownMesh(new THREE.Mesh(geometry, frontMaterial));
      back.name = 'back';
      front.name = 'front';
      back.position.set(-0.35, 0, -0.6);
      front.position.set(0.35, 0, 0.6);
      scene.add(back, front);
      const raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      let hits = [],
        selected = null,
        compact = false;
      const canvasRelative = true;
      const nearest = true;
      const clearOnMiss = true;
      function highlight(object) {
        selected = object;
        backMaterial.color.set(object === back ? '#22c55e' : '#2563eb');
        frontMaterial.color.set(object === front ? '#22c55e' : '#f97316');
      }
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          const r = canvasRelative
            ? canvas.getBoundingClientRect()
            : { left: 0, top: 0, width: innerWidth, height: innerHeight };
          pointer.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            1 - ((e.clientY - r.top) / r.height) * 2,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          hits = raycaster.intersectObjects([back, front], false);
          const next = hits.length
            ? (nearest ? hits[0] : hits[hits.length - 1]).object
            : null;
          if (next || clearOnMiss) highlight(next);
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#layout').addEventListener(
        'click',
        () => {
          compact = !compact;
          stage.style.width = compact ? '300px' : '480px';
          stage.style.marginLeft = compact ? '20px' : '0';
          stage.style.maxWidth = compact ? 'calc(100% - 20px)' : '100%';
          resizeScene();
        },
        { signal: events.signal },
      );
      document.querySelector('#clear').addEventListener(
        'click',
        () => {
          highlight(null);
          hits = [];
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'NDC: ' +
          pointer.toArray().map((v) => v.toFixed(3)) +
          ' / hits: ' +
          hits.map((h) => h.object.name + ':' + h.distance.toFixed(3)).join(' → ') +
          ' / selected: ' +
          (selected?.name ?? 'none');
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
        output.textContent = 'Disposed';
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

- How does recursive=true differ from choosing the nearest object?

### Clear selection on empty space

Change clearOnMiss=false to true. Select front, then click empty top-left space. Change margin and width, select front again, and also try Clear selection.

**Expected result**

Center selects green front; an empty click selects none and restores orange.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Selection and empty space</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Selection and empty space</h1>
    <p>
      Click the overlapping boxes. front is at z=.6 and back at z=-.6. The input
      array is [back,front], while intersections are sorted by distance. Compare
      center, top-left, and positions after margin/width changes.
    </p>
    <div class="controls">
      <button id="layout">Change margin and width</button
      ><button id="clear">Clear selection</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Selection and empty space"></canvas>
    </div>
    <output>Waiting for preview size</output>
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
      const geometry = new THREE.BoxGeometry(1.8, 1.8, 0.5),
        backMaterial = new THREE.MeshBasicMaterial({ color: '#2563eb' }),
        frontMaterial = new THREE.MeshBasicMaterial({ color: '#f97316' });
      const back = ownMesh(new THREE.Mesh(geometry, backMaterial)),
        front = ownMesh(new THREE.Mesh(geometry, frontMaterial));
      back.name = 'back';
      front.name = 'front';
      back.position.set(-0.35, 0, -0.6);
      front.position.set(0.35, 0, 0.6);
      scene.add(back, front);
      const raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      let hits = [],
        selected = null,
        compact = false;
      const canvasRelative = true;
      const nearest = true;
      const clearOnMiss = false;
      function highlight(object) {
        selected = object;
        backMaterial.color.set(object === back ? '#22c55e' : '#2563eb');
        frontMaterial.color.set(object === front ? '#22c55e' : '#f97316');
      }
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          const r = canvasRelative
            ? canvas.getBoundingClientRect()
            : { left: 0, top: 0, width: innerWidth, height: innerHeight };
          pointer.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            1 - ((e.clientY - r.top) / r.height) * 2,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          hits = raycaster.intersectObjects([back, front], false);
          const next = hits.length
            ? (nearest ? hits[0] : hits[hits.length - 1]).object
            : null;
          if (next || clearOnMiss) highlight(next);
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#layout').addEventListener(
        'click',
        () => {
          compact = !compact;
          stage.style.width = compact ? '300px' : '480px';
          stage.style.marginLeft = compact ? '20px' : '0';
          stage.style.maxWidth = compact ? 'calc(100% - 20px)' : '100%';
          resizeScene();
        },
        { signal: events.signal },
      );
      document.querySelector('#clear').addEventListener(
        'click',
        () => {
          highlight(null);
          hits = [];
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'NDC: ' +
          pointer.toArray().map((v) => v.toFixed(3)) +
          ' / hits: ' +
          hits.map((h) => h.object.name + ':' + h.distance.toFixed(3)).join(' → ') +
          ' / selected: ' +
          (selected?.name ?? 'none');
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
        output.textContent = 'Disposed';
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
<summary>Hints</summary>

- Call highlight(null) when there are no hits.
- Connect independent materials to unit 07.

</details>

<details>
<summary>Solution and explanation</summary>

Selection connects intersections to application state. An empty list sets null and restores original colors. Each box owns a distinct material here, preventing selection color from propagating. Ray computation and highlight updates serve separate purposes.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Selection and empty space</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Selection and empty space</h1>
    <p>
      Click the overlapping boxes. front is at z=.6 and back at z=-.6. The input
      array is [back,front], while intersections are sorted by distance. Compare
      center, top-left, and positions after margin/width changes.
    </p>
    <div class="controls">
      <button id="layout">Change margin and width</button
      ><button id="clear">Clear selection</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Selection and empty space"></canvas>
    </div>
    <output>Waiting for preview size</output>
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
      const geometry = new THREE.BoxGeometry(1.8, 1.8, 0.5),
        backMaterial = new THREE.MeshBasicMaterial({ color: '#2563eb' }),
        frontMaterial = new THREE.MeshBasicMaterial({ color: '#f97316' });
      const back = ownMesh(new THREE.Mesh(geometry, backMaterial)),
        front = ownMesh(new THREE.Mesh(geometry, frontMaterial));
      back.name = 'back';
      front.name = 'front';
      back.position.set(-0.35, 0, -0.6);
      front.position.set(0.35, 0, 0.6);
      scene.add(back, front);
      const raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      let hits = [],
        selected = null,
        compact = false;
      const canvasRelative = true;
      const nearest = true;
      const clearOnMiss = true;
      function highlight(object) {
        selected = object;
        backMaterial.color.set(object === back ? '#22c55e' : '#2563eb');
        frontMaterial.color.set(object === front ? '#22c55e' : '#f97316');
      }
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          const r = canvasRelative
            ? canvas.getBoundingClientRect()
            : { left: 0, top: 0, width: innerWidth, height: innerHeight };
          pointer.set(
            ((e.clientX - r.left) / r.width) * 2 - 1,
            1 - ((e.clientY - r.top) / r.height) * 2,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          hits = raycaster.intersectObjects([back, front], false);
          const next = hits.length
            ? (nearest ? hits[0] : hits[hits.length - 1]).object
            : null;
          if (next || clearOnMiss) highlight(next);
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#layout').addEventListener(
        'click',
        () => {
          compact = !compact;
          stage.style.width = compact ? '300px' : '480px';
          stage.style.marginLeft = compact ? '20px' : '0';
          stage.style.maxWidth = compact ? 'calc(100% - 20px)' : '100%';
          resizeScene();
        },
        { signal: events.signal },
      );
      document.querySelector('#clear').addEventListener(
        'click',
        () => {
          highlight(null);
          hits = [];
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'NDC: ' +
          pointer.toArray().map((v) => v.toFixed(3)) +
          ' / hits: ' +
          hits.map((h) => h.object.name + ':' + h.distance.toFixed(3)).join(' → ') +
          ' / selected: ' +
          (selected?.name ?? 'none');
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
        output.textContent = 'Disposed';
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

- Does Raycaster decide whether a missed click keeps the previous selection?

### API · Raycaster.setFromCamera

Updates the ray origin and direction from NDC and a camera.

- `coords: Vector2` — Canvas-relative -1–1, with y=1 at the top
- `camera: Camera` — The camera used to render the current view

Updates the internal ray without a return value.

- Use the current getBoundingClientRect for client coordinates. Distinguish CSS size from buffer pixels.

```js
const r=canvas.getBoundingClientRect(); pointer.set(2*(e.clientX-r.left)/r.width-1,1-2*(e.clientY-r.top)/r.height); raycaster.setFromCamera(pointer,camera);
```

[Raycaster.setFromCamera](https://threejs.org/docs/pages/Raycaster.html) · three@0.186.1 · 2026-10-27

### API · Raycaster.intersectObjects

Reads real intersections sorted nearest first.

- `objects: Object3D[]` — Objects to test
- `recursive: boolean` — Whether to inspect descendants; default true, false here

Returns Intersection records with object, distance, point, and more.

- Coincident triangle hits are possible. Define your own selection policy for an empty array.

```js
const hits=raycaster.intersectObjects([back,front],false); highlight(hits[0]?.object??null);
```

[Raycaster.intersectObjects](https://threejs.org/docs/pages/Raycaster.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Shadow Maps](../12/README.md) · [Next: Materials, Loading, and Selection](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
