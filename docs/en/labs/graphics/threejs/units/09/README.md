# Three.js · 09 Roughness and Metalness

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting, Materials, and Model Selection · Editable example · Storage ID: `threejs-step-09`

## Goals and learning outcomes

- Left stays .8; right changes .8→.15. metalness=0 and environment intensity=1 stay fixed while reflection shape changes.
- Left metalness stays 0, right changes 0→1. Both roughness values stay .8 and environment intensity stays 1.
- Right environment intensity 0→1 makes both spheres match. Background and directional light stay fixed.

## Prerequisites

Review the preceding geometry and lighting concepts. Each HTML runs independently; no previous result file is required.

## Key concepts and explanations

### Roughness

roughness controls the spread of reflections caused by microscopic surface detail. Low values tend to produce sharp highlights.

### Metalness

metalness distinguishes the responses of metals and nonmetals. With insufficient environment reflections, metal may appear darker than expected.

## Practice setup

Edit independent HTML inside the site. The site supplies three@0.186.1; no installation or external server is required.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Compare starter and solution in Compare only roughness and record actual numbers and images in the site notes.
2. Compare starter and solution in Compare only metalness and record actual numbers and images in the site notes.
3. Compare starter and solution in Separate environment light from background and record actual numbers and images in the site notes.

## Variables to observe

| Variable  | Baseline | Change | Expected change / hypothesis                    |
| --------- | -------- | ------ | ----------------------------------------------- |
| roughness | 0.1      | 0.8    | Reflected highlights become wider and blurrier. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Left stays .8; right changes .8→.15. metalness=0 and environment intensity=1 stay fixed while reflection shape changes.
- [ ] Left metalness stays 0, right changes 0→1. Both roughness values stay .8 and environment intensity stays 1.
- [ ] Right environment intensity 0→1 makes both spheres match. Background and directional light stay fixed.

## Self-check

1. Does metalness 1 simply mean shinier?
2. How should you interpret a metal without an environment map?

## Official references

- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-09/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run HTML inside the site. Compare actual images and numbers for each step and record your observations in the site notes.

- [example.html](../../../../../../../src/labs/threejs-step-09/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Keep the left sphere as a reference and change one variable on the right. Camera, lights, color, and geometry match. The environment is generated from a small coded room; no external HDR is required.

### Prerequisite units

- `threejs-step-07`
- `threejs-step-08`

### Compare only roughness

Both spheres begin at roughness=.8, metalness=0, envMapIntensity=1. Change the right roughness constant to .15. Compare the broad blurred reflection on the left with the sharper reflection on the right. The HTML input also changes only right roughness.

**Expected result**

Left stays .8; right changes .8→.15. metalness=0 and environment intensity=1 stay fixed while reflection shape changes.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Compare only roughness</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Compare only roughness</h1>
    <div class="controls">
      <label
        >Material value
        <input
          id="value"
          type="number"
          min="0"
          max="1"
          step="0.1"
          value="0.8" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Compare only roughness"></canvas></div>
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
      const room = new THREE.Scene();
      room.background = new THREE.Color('#404c70');
      for (const [x, y, z, color] of [
        [-3, 2, 0, '#ffffff'],
        [3, 0, 0, '#ffad70'],
        [0, -3, -2, '#3070ff'],
      ]) {
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 2, 1.8),
          new THREE.MeshBasicMaterial({ color }),
        );
        panel.position.set(x, y, z);
        room.add(panel);
      }
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentTarget = pmrem.fromScene(room, 0, 0.1, 20, { size: 64 });
      ownedTargets.add(environmentTarget);
      pmrem.dispose();
      for (const panel of room.children) {
        panel.geometry.dispose();
        panel.material.dispose();
      }
      room.clear();
      scene.environment = environmentTarget.texture;
      const geometry = new THREE.SphereGeometry(0.8, 32, 20);
      const reference = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 0.8,
        metalness: 0,
        envMapIntensity: 1,
        envMap: environmentTarget.texture,
      });
      const material = reference.clone();
      const roughness = 0.8;
      const metalness = 0;
      const environment = 1;
      material.roughness = roughness;
      material.metalness = metalness;
      material.envMapIntensity = environment;
      const a = ownMesh(new THREE.Mesh(geometry, reference)),
        b = ownMesh(new THREE.Mesh(geometry, material));
      a.position.x = -1;
      b.position.x = 1;
      scene.add(a, b);
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          'left reference roughness/metalness/environment: ' +
          [reference.roughness, reference.metalness, reference.envMapIntensity] +
          ' / right: ' +
          [material.roughness, material.metalness, material.envMapIntensity] +
          ' / environment: ' +
          (scene.environment === environmentTarget.texture) +
          ' / PMREM: ' +
          environmentTarget.width +
          ' × ' +
          environmentTarget.height +
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
          const input = document.querySelector('#value');
          if (
            !input.value.trim() ||
            !input.checkValidity() ||
            !Number.isFinite(Number(input.value))
          ) {
            error.textContent = 'Check the input range.';
            return;
          }
          error.textContent = '';
          material.roughness = Number(input.value);
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

- Find the constant assigned to material.roughness.
- Keep metalness at 0.

</details>

<details>
<summary>Solution and explanation</summary>

roughness in 0–1 changes the spread of reflection, not base color or light intensity. PMREM prefilters environment lighting for different roughness values. The geometry segmentation remains fixed.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Compare only roughness</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Compare only roughness</h1>
    <div class="controls">
      <label
        >Material value
        <input
          id="value"
          type="number"
          min="0"
          max="1"
          step="0.1"
          value="0.15" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Compare only roughness"></canvas></div>
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
      const room = new THREE.Scene();
      room.background = new THREE.Color('#404c70');
      for (const [x, y, z, color] of [
        [-3, 2, 0, '#ffffff'],
        [3, 0, 0, '#ffad70'],
        [0, -3, -2, '#3070ff'],
      ]) {
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 2, 1.8),
          new THREE.MeshBasicMaterial({ color }),
        );
        panel.position.set(x, y, z);
        room.add(panel);
      }
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentTarget = pmrem.fromScene(room, 0, 0.1, 20, { size: 64 });
      ownedTargets.add(environmentTarget);
      pmrem.dispose();
      for (const panel of room.children) {
        panel.geometry.dispose();
        panel.material.dispose();
      }
      room.clear();
      scene.environment = environmentTarget.texture;
      const geometry = new THREE.SphereGeometry(0.8, 32, 20);
      const reference = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 0.8,
        metalness: 0,
        envMapIntensity: 1,
        envMap: environmentTarget.texture,
      });
      const material = reference.clone();
      const roughness = 0.15;
      const metalness = 0;
      const environment = 1;
      material.roughness = roughness;
      material.metalness = metalness;
      material.envMapIntensity = environment;
      const a = ownMesh(new THREE.Mesh(geometry, reference)),
        b = ownMesh(new THREE.Mesh(geometry, material));
      a.position.x = -1;
      b.position.x = 1;
      scene.add(a, b);
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          'left reference roughness/metalness/environment: ' +
          [reference.roughness, reference.metalness, reference.envMapIntensity] +
          ' / right: ' +
          [material.roughness, material.metalness, material.envMapIntensity] +
          ' / environment: ' +
          (scene.environment === environmentTarget.texture) +
          ' / PMREM: ' +
          environmentTarget.width +
          ' × ' +
          environmentTarget.height +
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
          const input = document.querySelector('#value');
          if (
            !input.value.trim() ||
            !input.checkValidity() ||
            !Number.isFinite(Number(input.value))
          ) {
            error.textContent = 'Check the input range.';
            return;
          }
          error.textContent = '';
          material.roughness = Number(input.value);
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

- Is roughness the same as sphere triangle count?

### Compare only metalness

Fix roughness=.8 and environment intensity=1. Change right metalness from 0 to 1. Compare reflection color between the dielectric on the left and metal on the right. Both use #b98245; for the metal this color tints surface reflection.

**Expected result**

Left metalness stays 0, right changes 0→1. Both roughness values stay .8 and environment intensity stays 1.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Compare only metalness</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Compare only metalness</h1>
    <div class="controls">
      <label
        >Material value
        <input
          id="value"
          type="number"
          min="0"
          max="1"
          step="0.1"
          value="0" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Compare only metalness"></canvas></div>
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
      const room = new THREE.Scene();
      room.background = new THREE.Color('#404c70');
      for (const [x, y, z, color] of [
        [-3, 2, 0, '#ffffff'],
        [3, 0, 0, '#ffad70'],
        [0, -3, -2, '#3070ff'],
      ]) {
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 2, 1.8),
          new THREE.MeshBasicMaterial({ color }),
        );
        panel.position.set(x, y, z);
        room.add(panel);
      }
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentTarget = pmrem.fromScene(room, 0, 0.1, 20, { size: 64 });
      ownedTargets.add(environmentTarget);
      pmrem.dispose();
      for (const panel of room.children) {
        panel.geometry.dispose();
        panel.material.dispose();
      }
      room.clear();
      scene.environment = environmentTarget.texture;
      const geometry = new THREE.SphereGeometry(0.8, 32, 20);
      const reference = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 0.8,
        metalness: 0,
        envMapIntensity: 1,
        envMap: environmentTarget.texture,
      });
      const material = reference.clone();
      const roughness = 0.8;
      const metalness = 0;
      const environment = 1;
      material.roughness = roughness;
      material.metalness = metalness;
      material.envMapIntensity = environment;
      const a = ownMesh(new THREE.Mesh(geometry, reference)),
        b = ownMesh(new THREE.Mesh(geometry, material));
      a.position.x = -1;
      b.position.x = 1;
      scene.add(a, b);
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          'left reference roughness/metalness/environment: ' +
          [reference.roughness, reference.metalness, reference.envMapIntensity] +
          ' / right: ' +
          [material.roughness, material.metalness, material.envMapIntensity] +
          ' / environment: ' +
          (scene.environment === environmentTarget.texture) +
          ' / PMREM: ' +
          environmentTarget.width +
          ' × ' +
          environmentTarget.height +
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
          const input = document.querySelector('#value');
          if (
            !input.value.trim() ||
            !input.checkValidity() ||
            !Number.isFinite(Number(input.value))
          ) {
            error.textContent = 'Check the input range.';
            return;
          }
          error.textContent = '';
          material.metalness = Number(input.value);
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

- Change only metalness.
- Check equal roughness values in output.

</details>

<details>
<summary>Solution and explanation</summary>

metalness=0 is dielectric and 1 is metal; intermediate values can represent mixed surfaces. Metal does not brighten through dielectric diffuse response. Judge the reflection and color under fixed lighting, rather than brightness alone.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Compare only metalness</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Compare only metalness</h1>
    <div class="controls">
      <label
        >Material value
        <input
          id="value"
          type="number"
          min="0"
          max="1"
          step="0.1"
          value="1" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Compare only metalness"></canvas></div>
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
      const room = new THREE.Scene();
      room.background = new THREE.Color('#404c70');
      for (const [x, y, z, color] of [
        [-3, 2, 0, '#ffffff'],
        [3, 0, 0, '#ffad70'],
        [0, -3, -2, '#3070ff'],
      ]) {
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 2, 1.8),
          new THREE.MeshBasicMaterial({ color }),
        );
        panel.position.set(x, y, z);
        room.add(panel);
      }
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentTarget = pmrem.fromScene(room, 0, 0.1, 20, { size: 64 });
      ownedTargets.add(environmentTarget);
      pmrem.dispose();
      for (const panel of room.children) {
        panel.geometry.dispose();
        panel.material.dispose();
      }
      room.clear();
      scene.environment = environmentTarget.texture;
      const geometry = new THREE.SphereGeometry(0.8, 32, 20);
      const reference = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 0.8,
        metalness: 0,
        envMapIntensity: 1,
        envMap: environmentTarget.texture,
      });
      const material = reference.clone();
      const roughness = 0.8;
      const metalness = 1;
      const environment = 1;
      material.roughness = roughness;
      material.metalness = metalness;
      material.envMapIntensity = environment;
      const a = ownMesh(new THREE.Mesh(geometry, reference)),
        b = ownMesh(new THREE.Mesh(geometry, material));
      a.position.x = -1;
      b.position.x = 1;
      scene.add(a, b);
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          'left reference roughness/metalness/environment: ' +
          [reference.roughness, reference.metalness, reference.envMapIntensity] +
          ' / right: ' +
          [material.roughness, material.metalness, material.envMapIntensity] +
          ' / environment: ' +
          (scene.environment === environmentTarget.texture) +
          ' / PMREM: ' +
          environmentTarget.width +
          ' × ' +
          environmentTarget.height +
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
          const input = document.querySelector('#value');
          if (
            !input.value.trim() ||
            !input.checkValidity() ||
            !Number.isFinite(Number(input.value))
          ) {
            error.textContent = 'Check the input range.';
            return;
          }
          error.textContent = '';
          material.metalness = Number(input.value);
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

- What can make a metal appear dark?

### Separate environment light from background

Both spheres use roughness=.8 and metalness=0 and explicitly share the same PMREM texture in material.envMap. The right envMapIntensity starts at 0. Set environment to 1 to match the left. The visible #edf2f7 background is separate from environment lighting.

**Expected result**

Right environment intensity 0→1 makes both spheres match. Background and directional light stay fixed.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Separate environment light from background</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Separate environment light from background</h1>
    <div class="controls">
      <label
        >Material value
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.1"
          value="0" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Separate environment light from background"></canvas>
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
      const room = new THREE.Scene();
      room.background = new THREE.Color('#404c70');
      for (const [x, y, z, color] of [
        [-3, 2, 0, '#ffffff'],
        [3, 0, 0, '#ffad70'],
        [0, -3, -2, '#3070ff'],
      ]) {
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 2, 1.8),
          new THREE.MeshBasicMaterial({ color }),
        );
        panel.position.set(x, y, z);
        room.add(panel);
      }
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentTarget = pmrem.fromScene(room, 0, 0.1, 20, { size: 64 });
      ownedTargets.add(environmentTarget);
      pmrem.dispose();
      for (const panel of room.children) {
        panel.geometry.dispose();
        panel.material.dispose();
      }
      room.clear();
      scene.environment = environmentTarget.texture;
      const geometry = new THREE.SphereGeometry(0.8, 32, 20);
      const reference = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 0.8,
        metalness: 0,
        envMapIntensity: 1,
        envMap: environmentTarget.texture,
      });
      const material = reference.clone();
      const roughness = 0.8;
      const metalness = 0;
      const environment = 0;
      material.roughness = roughness;
      material.metalness = metalness;
      material.envMapIntensity = environment;
      const a = ownMesh(new THREE.Mesh(geometry, reference)),
        b = ownMesh(new THREE.Mesh(geometry, material));
      a.position.x = -1;
      b.position.x = 1;
      scene.add(a, b);
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          'left reference roughness/metalness/environment: ' +
          [reference.roughness, reference.metalness, reference.envMapIntensity] +
          ' / right: ' +
          [material.roughness, material.metalness, material.envMapIntensity] +
          ' / environment: ' +
          (scene.environment === environmentTarget.texture) +
          ' / PMREM: ' +
          environmentTarget.width +
          ' × ' +
          environmentTarget.height +
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
          const input = document.querySelector('#value');
          if (
            !input.value.trim() ||
            !input.checkValidity() ||
            !Number.isFinite(Number(input.value))
          ) {
            error.textContent = 'Check the input range.';
            return;
          }
          error.textContent = '';
          material.envMapIntensity = Number(input.value);
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

- Set environment to 1.
- Keep scene.background fixed.

</details>

<details>
<summary>Solution and explanation</summary>

scene.environment supplies a default environment for standard materials without an envMap; scene.environmentIntensity controls that default. Here both materials have an explicit envMap so only right material.envMapIntensity changes. PMREMGenerator.fromScene captures a separate scene. Dispose the generator after generation and the shared returned target once at final cleanup.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Separate environment light from background</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Separate environment light from background</h1>
    <div class="controls">
      <label
        >Material value
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.1"
          value="1" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Separate environment light from background"></canvas>
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
      const room = new THREE.Scene();
      room.background = new THREE.Color('#404c70');
      for (const [x, y, z, color] of [
        [-3, 2, 0, '#ffffff'],
        [3, 0, 0, '#ffad70'],
        [0, -3, -2, '#3070ff'],
      ]) {
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 2, 1.8),
          new THREE.MeshBasicMaterial({ color }),
        );
        panel.position.set(x, y, z);
        room.add(panel);
      }
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environmentTarget = pmrem.fromScene(room, 0, 0.1, 20, { size: 64 });
      ownedTargets.add(environmentTarget);
      pmrem.dispose();
      for (const panel of room.children) {
        panel.geometry.dispose();
        panel.material.dispose();
      }
      room.clear();
      scene.environment = environmentTarget.texture;
      const geometry = new THREE.SphereGeometry(0.8, 32, 20);
      const reference = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 0.8,
        metalness: 0,
        envMapIntensity: 1,
        envMap: environmentTarget.texture,
      });
      const material = reference.clone();
      const roughness = 0.8;
      const metalness = 0;
      const environment = 1;
      material.roughness = roughness;
      material.metalness = metalness;
      material.envMapIntensity = environment;
      const a = ownMesh(new THREE.Mesh(geometry, reference)),
        b = ownMesh(new THREE.Mesh(geometry, material));
      a.position.x = -1;
      b.position.x = 1;
      scene.add(a, b);
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 3, 4);
      scene.add(light);
      function report() {
        output.textContent =
          'left reference roughness/metalness/environment: ' +
          [reference.roughness, reference.metalness, reference.envMapIntensity] +
          ' / right: ' +
          [material.roughness, material.metalness, material.envMapIntensity] +
          ' / environment: ' +
          (scene.environment === environmentTarget.texture) +
          ' / PMREM: ' +
          environmentTarget.width +
          ' × ' +
          environmentTarget.height +
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
          const input = document.querySelector('#value');
          if (
            !input.value.trim() ||
            !input.checkValidity() ||
            !Number.isFinite(Number(input.value))
          ) {
            error.textContent = 'Check the input range.';
            return;
          }
          error.textContent = '';
          material.envMapIntensity = Number(input.value);
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

- How do environment maps and visible backgrounds differ?

### API · MeshStandardMaterial

Represent a physically based surface using roughness and metalness.

- `roughness: number` — 0–1, reflection spread (1)
- `metalness: number` — 0 dielectric, 1 metal (0)
- `envMapIntensity: number` — Environment-map strength for this material (1)

A new standard material.

- Without material.envMap, scene.environment uses scene.environmentIntensity. These examples explicitly assign the same envMap to both materials.

```js
const material=new THREE.MeshStandardMaterial({roughness:.8,metalness:0});
```

[MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html) · three@three@0.186.1 · 2026-10-27

### API · PMREMGenerator.fromScene

Capture a scene and prefilter it for roughness-dependent environment reflections.

- `scene: Scene` — Scene to capture
- `sigma: number` — Additional blur radius in radians (0)

Returns a WebGLRenderTarget containing the texture.

- Dispose the generator and returned target according to their separate lifetimes.

```js
const target=pmrem.fromScene(room,0,.1,20,{size:64}); scene.environment=target.texture;
```

[PMREMGenerator.fromScene](https://threejs.org/docs/pages/PMREMGenerator.html) · three@three@0.186.1 · 2026-10-27

## Next learning

[Previous: Light Types and Placement](../08/README.md) · [Next: Textures and UVs](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
