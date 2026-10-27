# Three.js · 08 Light Types and Placement

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting, Materials, and Model Selection · Editable example · Storage ID: `threejs-step-08`

## Goals and learning outcomes

- Intensity 0→1 brightens the sphere without a directional highlight.
- Light position stays (2,2,3); target.x changes 0→4, flipping the direction x sign and moving the bright side.
- Intensity and decay stay fixed; z=4→2 brightens the front face. distance stays 0.

## Prerequisites

Review the preceding geometry and lighting concepts. Each HTML runs independently; no previous result file is required.

## Key concepts and explanations

### Directional Light

DirectionalLight represents light coming from a constant direction. Its target affects the light direction as well as its position.

### Point Light

PointLight emits light in multiple directions from one point. Observe changes with distance from objects too.

## Practice setup

Edit independent HTML inside the site. The site supplies three@0.186.1; no installation or external server is required.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Compare starter and solution in Uniform ambient light and record actual numbers and images in the site notes.
2. Compare starter and solution in Directional position and target and record actual numbers and images in the site notes.
3. Compare starter and solution in Point-light distance and brightness and record actual numbers and images in the site notes.

## Variables to observe

| Variable   | Baseline         | Change     | Expected change / hypothesis                                   |
| ---------- | ---------------- | ---------- | -------------------------------------------------------------- |
| Light type | DirectionalLight | PointLight | The surface response to distance and position changes differs. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Intensity 0→1 brightens the sphere without a directional highlight.
- [ ] Light position stays (2,2,3); target.x changes 0→4, flipping the direction x sign and moving the bright side.
- [ ] Intensity and decay stay fixed; z=4→2 brightens the front face. distance stays 0.

## Self-check

1. Why is MeshBasicMaterial visible even with the lights off?
2. Why does ambient light alone make forms look flat?

## Official references

- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)
- [Three.js Shadows](https://threejs.org/manual/pages/shadows.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-08/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run HTML inside the site. Compare actual images and numbers for each step and record your observations in the site notes.

- [example.html](../../../../../../../src/labs/threejs-step-08/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Compare three light types using the same sphere and MeshLambertMaterial. MeshBasicMaterial does not react to these lights. Change one input at a time and record the bright region.

### Prerequisite units

- `threejs-01`
- `threejs-step-04`
- `threejs-step-06`

### Uniform ambient light

The starter AmbientLight intensity is 0, leaving a black sphere. Change intensity to 1 and apply it through the HTML input too. Moving the light position cannot create directional shading for ambient light.

**Expected result**

Intensity 0→1 brightens the sphere without a directional highlight.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Uniform ambient light</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Uniform ambient light</h1>
    <div class="controls">
      <label
        >Light value
        <input
          id="value"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value="0" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Uniform ambient light"></canvas></div>
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
      const geometry = new THREE.SphereGeometry(1.1, 32, 20);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const intensity = 0;
      const light = new THREE.AmbientLight(0xffffff, intensity);
      scene.add(light);
      function report() {
        output.textContent =
          'AmbientLight intensity: ' +
          light.intensity +
          ' / position: ' +
          light.position.toArray() +
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
          light.intensity = Number(input.value);
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

- Find the intensity constant.
- Compare intensities 0 and 1 first.

</details>

<details>
<summary>Solution and explanation</summary>

Ambient light contributes equally in all directions. The blue material becomes visible, but curvature is less distinct than under directional lighting. AmbientLight cannot cast shadows. This input restricts intensity to nonnegative values.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Uniform ambient light</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Uniform ambient light</h1>
    <div class="controls">
      <label
        >Light value
        <input
          id="value"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value="1" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Uniform ambient light"></canvas></div>
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
      const geometry = new THREE.SphereGeometry(1.1, 32, 20);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const intensity = 1;
      const light = new THREE.AmbientLight(0xffffff, intensity);
      scene.add(light);
      function report() {
        output.textContent =
          'AmbientLight intensity: ' +
          light.intensity +
          ' / position: ' +
          light.position.toArray() +
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
          light.intensity = Number(input.value);
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

- Does moving ambient light shift the bright side?

### Directional position and target

The directional light at (2,2,3) points toward its target. Change targetX from 0 to 4 and observe the bright side move while the light position stays fixed. The HTML input also edits target.x. Add light.target to the scene so its world transform updates.

**Expected result**

Light position stays (2,2,3); target.x changes 0→4, flipping the direction x sign and moving the bright side.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Directional position and target</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Directional position and target</h1>
    <div class="controls">
      <label
        >Light value
        <input
          id="value"
          type="number"
          min="-5"
          max="5"
          step="0.1"
          value="0" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Directional position and target"></canvas>
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
      const geometry = new THREE.SphereGeometry(1.1, 32, 20);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 2, 3);
      const targetX = 0;
      light.target.position.x = targetX;
      scene.add(light, light.target);
      function report() {
        output.textContent =
          'position: ' +
          light.position.toArray() +
          ' / target: ' +
          light.target.position.toArray() +
          ' / direction: ' +
          new THREE.Vector3()
            .subVectors(light.target.position, light.position)
            .normalize()
            .toArray()
            .map((v) => v.toFixed(3)) +
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
          light.target.position.x = Number(input.value);
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

- Keep light.position fixed.
- Change only light.target.position.x.

</details>

<details>
<summary>Solution and explanation</summary>

The light travels along target.position-light.position. The output normalizes that vector. Light rotation does not define its direction. Both objects are direct Scene children here, so local and world positions match.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Directional position and target</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Directional position and target</h1>
    <div class="controls">
      <label
        >Light value
        <input
          id="value"
          type="number"
          min="-5"
          max="5"
          step="0.1"
          value="4" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Directional position and target"></canvas>
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
      const geometry = new THREE.SphereGeometry(1.1, 32, 20);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 2, 3);
      const targetX = 4;
      light.target.position.x = targetX;
      scene.add(light, light.target);
      function report() {
        output.textContent =
          'position: ' +
          light.position.toArray() +
          ' / target: ' +
          light.target.position.toArray() +
          ' / direction: ' +
          new THREE.Vector3()
            .subVectors(light.target.position, light.position)
            .normalize()
            .toArray()
            .map((v) => v.toFixed(3)) +
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
          light.target.position.x = Number(input.value);
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

- Would changing only rotation have the same effect?

### Point-light distance and brightness

Keep PointLight intensity=20 and decay=2. Change z from 4 to 2 and compare front-face brightness. The input accepts 1.5–8 so the light stays outside the sphere. Position changes both attenuation and incidence direction, unlike ambient light.

**Expected result**

Intensity and decay stay fixed; z=4→2 brightens the front face. distance stays 0.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Point-light distance and brightness</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Point-light distance and brightness</h1>
    <div class="controls">
      <label
        >Light value
        <input
          id="value"
          type="number"
          min="1.5"
          max="8"
          step="0.1"
          value="4" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Point-light distance and brightness"></canvas>
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
      const geometry = new THREE.SphereGeometry(1.1, 32, 20);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.PointLight(0xffffff, 20, 0, 2);
      const pointZ = 4;
      light.position.set(0, 0, pointZ);
      scene.add(light);
      function report() {
        output.textContent =
          'PointLight z: ' +
          light.position.z +
          ' / intensity: ' +
          light.intensity +
          ' / distance: ' +
          light.distance +
          ' / decay: ' +
          light.decay +
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
          light.position.z = Number(input.value);
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

- Find pointZ.
- Keep intensity at 20.

</details>

<details>
<summary>Solution and explanation</summary>

distance=0 removes the range cutoff, not attenuation. With decay=2, light weakens with distance. Material, curvature, and output conversion affect pixels, so halving z does not make every displayed pixel exactly four times brighter.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Point-light distance and brightness</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } #stage { width:480px; max-width:100%; height:260px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input { width:110px; max-width:100%; } output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Point-light distance and brightness</h1>
    <div class="controls">
      <label
        >Light value
        <input
          id="value"
          type="number"
          min="1.5"
          max="8"
          step="0.1"
          value="2" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Release resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Point-light distance and brightness"></canvas>
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
      const geometry = new THREE.SphereGeometry(1.1, 32, 20);
      const material = new THREE.MeshLambertMaterial({ color: '#2563eb' });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      const light = new THREE.PointLight(0xffffff, 20, 0, 2);
      const pointZ = 2;
      light.position.set(0, 0, pointZ);
      scene.add(light);
      function report() {
        output.textContent =
          'PointLight z: ' +
          light.position.z +
          ' / intensity: ' +
          light.intensity +
          ' / distance: ' +
          light.distance +
          ' / decay: ' +
          light.decay +
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
          light.position.z = Number(input.value);
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

- How do distance=0 and intensity=0 differ?

### API · AmbientLight

Add light equally throughout the scene without direction.

- `color: Color | number | string` — Light color (0xffffff)
- `intensity: number` — Light strength (1)

A new ambient light; add it to the scene.

- Ambient lights do not cast shadows.

```js
scene.add(new THREE.AmbientLight(0xffffff,1));
```

[AmbientLight](https://threejs.org/docs/pages/AmbientLight.html) · three@three@0.186.1 · 2026-10-27

### API · DirectionalLight.target

Parallel light pointing from position to target world position.

- `target: Object3D` — Its default position is the origin.

Changing the target changes light direction.

- Add the target to the scene. Rotation does not define direction.

```js
scene.add(light,light.target); light.target.position.x=4;
```

[DirectionalLight.target](https://threejs.org/docs/pages/DirectionalLight.html) · three@three@0.186.1 · 2026-10-27

### API · PointLight

Emit light from one point in all directions with distance attenuation.

- `intensity: number` — Luminous intensity in candela (1)
- `distance: number` — 0 means no range cutoff (0)
- `decay: number` — Distance decay exponent (2)

A new point light.

- Distance attenuation still applies when distance=0.

```js
const light=new THREE.PointLight(0xffffff,20,0,2);
```

[PointLight](https://threejs.org/docs/pages/PointLight.html) · three@three@0.186.1 · 2026-10-27

## Next learning

[Previous: Shared Geometry and Cloning](../07/README.md) · [Next: Roughness and Metalness](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
