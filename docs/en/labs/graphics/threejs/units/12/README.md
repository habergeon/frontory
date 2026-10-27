# Three.js · 12 Shadow Maps

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting, Materials, and Model Selection · Editable example · Storage ID: `threejs-step-12`

## Goals and learning outcomes

- Distinguish caster and receiver settings.
- Distinguish clipped shadows from reduced resolution.

## Prerequisites

Prerequisite units: 03, 08. Build on their concepts.

## Key concepts and explanations

### Additional Rendering

Shadows require depth rendering from the light’s viewpoint. The number of lights and casters adds cost.

### Shadow Coverage

The shadow camera range defines the area where shadows are calculated. An excessively wide range spreads the resolution of a fixed map size over more area.

## Practice setup

Edit and run HTML inside the site using the supplied Three.js 0.186.1. No separate installation or external server is required. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. renderer.shadowMap.enabled, light.castShadow, and floor receiveShadow are already true. Change caster.castShadow=false to true. Enable the castShadow input, apply, then disable only receiveShadow for comparison.
2. Keep mapSize=512 and change extent=.5 to 4. Apply half extent 4 through the input. Enable the helper to see the depth region expand to include the box and floor. After recovery, compare half extents 8 and 4 to inspect finer edges over narrower coverage at the same map resolution.
3. Keep extent=4 and change mapSize=32 to 512. Apply 512 through the input and compare blocky edges. Then explain how wider and smaller camera regions divide the same map pixels.

## Variables to observe

| Variable        | Baseline  | Change                       | Expected change / hypothesis                                             |
| --------------- | --------- | ---------------------------- | ------------------------------------------------------------------------ |
| shadow coverage | Wide area | Small area around the target | With the same mapSize, shadows near the target may become more detailed. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish caster and receiver settings.
- [ ] Distinguish clipped shadows from reduced resolution.

## Self-check

1. What is the cost of increasing mapSize alone?
2. Why can a large bias make shadows appear detached?

## Official references

- [Three.js Shadows](https://threejs.org/manual/pages/shadows.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-12/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run the HTML starter inside the site. Complete each experiment and record actual images and values in notes.

- [example.html](../../../../../../../src/labs/threejs-step-12/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Shadows require renderer, light, caster, and receiver settings together. Keep box, floor, and light fixed while testing shadow presence, camera clipping, and map resolution separately.

### Prerequisite units

- `threejs-step-03`
- `threejs-step-08`

### Connect caster and receiver

renderer.shadowMap.enabled, light.castShadow, and floor receiveShadow are already true. Change caster.castShadow=false to true. Enable the castShadow input, apply, then disable only receiveShadow for comparison.

**Expected result**

cast false→true adds a floor shadow. receive false removes it again.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Cast and receive shadows</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Cast and receive shadows</h1>
    <p>
      BasicShadowMap avoids filter blur. Compare missing shadows outside the
      frustum separately from blocky edges inside it. The camera helper is for
      observation and does not receive shadows.
    </p>
    <div class="controls">
      <label><input id="cast" type="checkbox" />castShadow</label
      ><label><input id="receive" type="checkbox" checked />receiveShadow</label
      ><button id="apply">Apply</button
      ><label><input id="helper" type="checkbox" />Show camera frustum</label
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Cast and receive shadows"></canvas>
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
      camera.position.set(4, 3.5, 6);
      camera.lookAt(0, -0.2, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
      const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3),
        material = new THREE.MeshLambertMaterial({ color: '#2563eb' }),
        caster = ownMesh(new THREE.Mesh(geometry, material));
      caster.position.set(1, 0, 0);
      caster.castShadow = false;
      scene.add(caster);
      const floor = ownMesh(
        new THREE.Mesh(
          new THREE.PlaneGeometry(10, 8),
          new THREE.MeshLambertMaterial({ color: 0xffffff }),
        ),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.7;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(2, 5, 3);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      scene.add(light, light.target);
      const extent = 4,
        mapSize = 512;
      const shadowCamera = light.shadow.camera;
      shadowCamera.left = shadowCamera.bottom = -extent;
      shadowCamera.right = shadowCamera.top = extent;
      shadowCamera.near = 0.1;
      shadowCamera.far = 20;
      shadowCamera.updateProjectionMatrix();
      light.shadow.mapSize.set(mapSize, mapSize);
      const helper = new THREE.CameraHelper(shadowCamera);
      helper.visible = false;
      scene.add(helper);
      document.querySelector('#helper').addEventListener(
        'change',
        (e) => {
          helper.visible = e.target.checked;
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          caster.castShadow = document.querySelector('#cast').checked;
          floor.receiveShadow = document.querySelector('#receive').checked;
          floor.material.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'cast: ' +
          caster.castShadow +
          ' / receive: ' +
          floor.receiveShadow +
          ' / extent: ' +
          shadowCamera.right +
          ' / mapSize: ' +
          light.shadow.mapSize.toArray() +
          ' / actual map: ' +
          (light.shadow.map
            ? [light.shadow.map.width, light.shadow.map.height]
            : '—') +
          ' / world units per texel: ' +
          (shadowCamera.right - shadowCamera.left) / light.shadow.mapSize.x;
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
        helper.dispose();
        light.shadow.dispose();
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

- Find caster.castShadow.
- Check why the light and renderer also need flags.

</details>

<details>
<summary>Solution and explanation</summary>

A caster writes depth from the light viewpoint. A receiver compares that map to determine blocked light. Either missing flag can remove the shadow. Receiving a shadow is separate from casting one.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Cast and receive shadows</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Cast and receive shadows</h1>
    <p>
      BasicShadowMap avoids filter blur. Compare missing shadows outside the
      frustum separately from blocky edges inside it. The camera helper is for
      observation and does not receive shadows.
    </p>
    <div class="controls">
      <label><input id="cast" type="checkbox" checked />castShadow</label
      ><label><input id="receive" type="checkbox" checked />receiveShadow</label
      ><button id="apply">Apply</button
      ><label><input id="helper" type="checkbox" />Show camera frustum</label
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Cast and receive shadows"></canvas>
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
      camera.position.set(4, 3.5, 6);
      camera.lookAt(0, -0.2, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
      const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3),
        material = new THREE.MeshLambertMaterial({ color: '#2563eb' }),
        caster = ownMesh(new THREE.Mesh(geometry, material));
      caster.position.set(1, 0, 0);
      caster.castShadow = true;
      scene.add(caster);
      const floor = ownMesh(
        new THREE.Mesh(
          new THREE.PlaneGeometry(10, 8),
          new THREE.MeshLambertMaterial({ color: 0xffffff }),
        ),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.7;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(2, 5, 3);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      scene.add(light, light.target);
      const extent = 4,
        mapSize = 512;
      const shadowCamera = light.shadow.camera;
      shadowCamera.left = shadowCamera.bottom = -extent;
      shadowCamera.right = shadowCamera.top = extent;
      shadowCamera.near = 0.1;
      shadowCamera.far = 20;
      shadowCamera.updateProjectionMatrix();
      light.shadow.mapSize.set(mapSize, mapSize);
      const helper = new THREE.CameraHelper(shadowCamera);
      helper.visible = false;
      scene.add(helper);
      document.querySelector('#helper').addEventListener(
        'change',
        (e) => {
          helper.visible = e.target.checked;
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          caster.castShadow = document.querySelector('#cast').checked;
          floor.receiveShadow = document.querySelector('#receive').checked;
          floor.material.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'cast: ' +
          caster.castShadow +
          ' / receive: ' +
          floor.receiveShadow +
          ' / extent: ' +
          shadowCamera.right +
          ' / mapSize: ' +
          light.shadow.mapSize.toArray() +
          ' / actual map: ' +
          (light.shadow.map
            ? [light.shadow.map.width, light.shadow.map.height]
            : '—') +
          ' / world units per texel: ' +
          (shadowCamera.right - shadowCamera.left) / light.shadow.mapSize.x;
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
        helper.dispose();
        light.shadow.dispose();
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

- Which four settings should you check when a visible object has no shadow?

### Fix clipping with the camera frustum

Keep mapSize=512 and change extent=.5 to 4. Apply half extent 4 through the input. Enable the helper to see the depth region expand to include the box and floor. After recovery, compare half extents 8 and 4 to inspect finer edges over narrower coverage at the same map resolution.

**Expected result**

Half extent .5→4; mapSize stays 512. The clipped shadow recovers and the helper region expands.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Shadow camera frustum</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Shadow camera frustum</h1>
    <p>
      BasicShadowMap avoids filter blur. Compare missing shadows outside the
      frustum separately from blocky edges inside it. The camera helper is for
      observation and does not receive shadows.
    </p>
    <div class="controls">
      <label
        >Half extent
        <input
          id="value"
          type="number"
          min="0.5"
          max="8"
          step="0.5"
          value="0.5" /></label
      ><button id="apply">Apply</button
      ><label><input id="helper" type="checkbox" />Show camera frustum</label
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Shadow camera frustum"></canvas></div>
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
      camera.position.set(4, 3.5, 6);
      camera.lookAt(0, -0.2, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
      const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3),
        material = new THREE.MeshLambertMaterial({ color: '#2563eb' }),
        caster = ownMesh(new THREE.Mesh(geometry, material));
      caster.position.set(1, 0, 0);
      caster.castShadow = true;
      scene.add(caster);
      const floor = ownMesh(
        new THREE.Mesh(
          new THREE.PlaneGeometry(10, 8),
          new THREE.MeshLambertMaterial({ color: 0xffffff }),
        ),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.7;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(2, 5, 3);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      scene.add(light, light.target);
      const extent = 0.5,
        mapSize = 512;
      const shadowCamera = light.shadow.camera;
      shadowCamera.left = shadowCamera.bottom = -extent;
      shadowCamera.right = shadowCamera.top = extent;
      shadowCamera.near = 0.1;
      shadowCamera.far = 20;
      shadowCamera.updateProjectionMatrix();
      light.shadow.mapSize.set(mapSize, mapSize);
      const helper = new THREE.CameraHelper(shadowCamera);
      helper.visible = false;
      scene.add(helper);
      document.querySelector('#helper').addEventListener(
        'change',
        (e) => {
          helper.visible = e.target.checked;
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (!input.value || !input.checkValidity()) return;
          const v = Number(input.value);
          shadowCamera.left = shadowCamera.bottom = -v;
          shadowCamera.right = shadowCamera.top = v;
          shadowCamera.updateProjectionMatrix();
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'cast: ' +
          caster.castShadow +
          ' / receive: ' +
          floor.receiveShadow +
          ' / extent: ' +
          shadowCamera.right +
          ' / mapSize: ' +
          light.shadow.mapSize.toArray() +
          ' / actual map: ' +
          (light.shadow.map
            ? [light.shadow.map.width, light.shadow.map.height]
            : '—') +
          ' / world units per texel: ' +
          (shadowCamera.right - shadowCamera.left) / light.shadow.mapSize.x;
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
        helper.dispose();
        light.shadow.dispose();
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

- Change all four side planes.
- Compare coverage while keeping resolution fixed.

</details>

<details>
<summary>Solution and explanation</summary>

Directional-light shadows use an orthographic camera. Only the region inside left/right/top/bottom and near/far enters the depth map. Update its projection matrix and helper after changes. Raising mapSize cannot recover missing coverage.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Shadow camera frustum</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Shadow camera frustum</h1>
    <p>
      BasicShadowMap avoids filter blur. Compare missing shadows outside the
      frustum separately from blocky edges inside it. The camera helper is for
      observation and does not receive shadows.
    </p>
    <div class="controls">
      <label
        >Half extent
        <input
          id="value"
          type="number"
          min="0.5"
          max="8"
          step="0.5"
          value="4" /></label
      ><button id="apply">Apply</button
      ><label><input id="helper" type="checkbox" />Show camera frustum</label
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Shadow camera frustum"></canvas></div>
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
      camera.position.set(4, 3.5, 6);
      camera.lookAt(0, -0.2, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
      const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3),
        material = new THREE.MeshLambertMaterial({ color: '#2563eb' }),
        caster = ownMesh(new THREE.Mesh(geometry, material));
      caster.position.set(1, 0, 0);
      caster.castShadow = true;
      scene.add(caster);
      const floor = ownMesh(
        new THREE.Mesh(
          new THREE.PlaneGeometry(10, 8),
          new THREE.MeshLambertMaterial({ color: 0xffffff }),
        ),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.7;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(2, 5, 3);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      scene.add(light, light.target);
      const extent = 4,
        mapSize = 512;
      const shadowCamera = light.shadow.camera;
      shadowCamera.left = shadowCamera.bottom = -extent;
      shadowCamera.right = shadowCamera.top = extent;
      shadowCamera.near = 0.1;
      shadowCamera.far = 20;
      shadowCamera.updateProjectionMatrix();
      light.shadow.mapSize.set(mapSize, mapSize);
      const helper = new THREE.CameraHelper(shadowCamera);
      helper.visible = false;
      scene.add(helper);
      document.querySelector('#helper').addEventListener(
        'change',
        (e) => {
          helper.visible = e.target.checked;
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (!input.value || !input.checkValidity()) return;
          const v = Number(input.value);
          shadowCamera.left = shadowCamera.bottom = -v;
          shadowCamera.right = shadowCamera.top = v;
          shadowCamera.updateProjectionMatrix();
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'cast: ' +
          caster.castShadow +
          ' / receive: ' +
          floor.receiveShadow +
          ' / extent: ' +
          shadowCamera.right +
          ' / mapSize: ' +
          light.shadow.mapSize.toArray() +
          ' / actual map: ' +
          (light.shadow.map
            ? [light.shadow.map.width, light.shadow.map.height]
            : '—') +
          ' / world units per texel: ' +
          (shadowCamera.right - shadowCamera.left) / light.shadow.mapSize.x;
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
        helper.dispose();
        light.shadow.dispose();
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

- How do missing shadow regions differ from blocky shadow edges?

### Compare resolution at fixed coverage

Keep extent=4 and change mapSize=32 to 512. Apply 512 through the input and compare blocky edges. Then explain how wider and smaller camera regions divide the same map pixels.

**Expected result**

Half extent stays 4; actual map changes 32×32→512×512. Distinguish resolution from repairing camera clipping.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Shadow map resolution</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Shadow map resolution</h1>
    <p>
      BasicShadowMap avoids filter blur. Compare missing shadows outside the
      frustum separately from blocky edges inside it. The camera helper is for
      observation and does not receive shadows.
    </p>
    <div class="controls">
      <label
        >mapSize
        <input
          id="value"
          type="number"
          min="32"
          max="1024"
          step="32"
          value="32" /></label
      ><button id="apply">Apply</button
      ><label><input id="helper" type="checkbox" />Show camera frustum</label
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Shadow map resolution"></canvas></div>
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
      camera.position.set(4, 3.5, 6);
      camera.lookAt(0, -0.2, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
      const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3),
        material = new THREE.MeshLambertMaterial({ color: '#2563eb' }),
        caster = ownMesh(new THREE.Mesh(geometry, material));
      caster.position.set(1, 0, 0);
      caster.castShadow = true;
      scene.add(caster);
      const floor = ownMesh(
        new THREE.Mesh(
          new THREE.PlaneGeometry(10, 8),
          new THREE.MeshLambertMaterial({ color: 0xffffff }),
        ),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.7;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(2, 5, 3);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      scene.add(light, light.target);
      const extent = 4,
        mapSize = 32;
      const shadowCamera = light.shadow.camera;
      shadowCamera.left = shadowCamera.bottom = -extent;
      shadowCamera.right = shadowCamera.top = extent;
      shadowCamera.near = 0.1;
      shadowCamera.far = 20;
      shadowCamera.updateProjectionMatrix();
      light.shadow.mapSize.set(mapSize, mapSize);
      const helper = new THREE.CameraHelper(shadowCamera);
      helper.visible = false;
      scene.add(helper);
      document.querySelector('#helper').addEventListener(
        'change',
        (e) => {
          helper.visible = e.target.checked;
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (!input.value || !input.checkValidity()) return;
          const v = Number(input.value);
          if (!Number.isInteger(Math.log2(v))) {
            error.textContent = 'Use a power of two from 32 to 1024.';
            return;
          }
          error.textContent = '';
          light.shadow.mapSize.set(v, v);
          if (light.shadow.map) {
            light.shadow.map.dispose();
            light.shadow.map = null;
          }
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'cast: ' +
          caster.castShadow +
          ' / receive: ' +
          floor.receiveShadow +
          ' / extent: ' +
          shadowCamera.right +
          ' / mapSize: ' +
          light.shadow.mapSize.toArray() +
          ' / actual map: ' +
          (light.shadow.map
            ? [light.shadow.map.width, light.shadow.map.height]
            : '—') +
          ' / world units per texel: ' +
          (shadowCamera.right - shadowCamera.left) / light.shadow.mapSize.x;
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
        helper.dispose();
        light.shadow.dispose();
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

- Set both map dimensions.
- Dispose an existing map and set it to null so the next draw allocates the new size.

</details>

<details>
<summary>Solution and explanation</summary>

32→512 increases each side 16 times and texel count 256 times. Depth storage and render cost may rise. BasicShadowMap avoids filter blur. Dividing 8 world units by the map width changes units/texel from .25 to .015625.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Shadow map resolution</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Shadow map resolution</h1>
    <p>
      BasicShadowMap avoids filter blur. Compare missing shadows outside the
      frustum separately from blocky edges inside it. The camera helper is for
      observation and does not receive shadows.
    </p>
    <div class="controls">
      <label
        >mapSize
        <input
          id="value"
          type="number"
          min="32"
          max="1024"
          step="32"
          value="512" /></label
      ><button id="apply">Apply</button
      ><label><input id="helper" type="checkbox" />Show camera frustum</label
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Shadow map resolution"></canvas></div>
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
      camera.position.set(4, 3.5, 6);
      camera.lookAt(0, -0.2, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.BasicShadowMap;
      const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3),
        material = new THREE.MeshLambertMaterial({ color: '#2563eb' }),
        caster = ownMesh(new THREE.Mesh(geometry, material));
      caster.position.set(1, 0, 0);
      caster.castShadow = true;
      scene.add(caster);
      const floor = ownMesh(
        new THREE.Mesh(
          new THREE.PlaneGeometry(10, 8),
          new THREE.MeshLambertMaterial({ color: 0xffffff }),
        ),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.7;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(2, 5, 3);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      scene.add(light, light.target);
      const extent = 4,
        mapSize = 512;
      const shadowCamera = light.shadow.camera;
      shadowCamera.left = shadowCamera.bottom = -extent;
      shadowCamera.right = shadowCamera.top = extent;
      shadowCamera.near = 0.1;
      shadowCamera.far = 20;
      shadowCamera.updateProjectionMatrix();
      light.shadow.mapSize.set(mapSize, mapSize);
      const helper = new THREE.CameraHelper(shadowCamera);
      helper.visible = false;
      scene.add(helper);
      document.querySelector('#helper').addEventListener(
        'change',
        (e) => {
          helper.visible = e.target.checked;
          helper.update();
          draw();
        },
        { signal: events.signal },
      );
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (!input.value || !input.checkValidity()) return;
          const v = Number(input.value);
          if (!Number.isInteger(Math.log2(v))) {
            error.textContent = 'Use a power of two from 32 to 1024.';
            return;
          }
          error.textContent = '';
          light.shadow.mapSize.set(v, v);
          if (light.shadow.map) {
            light.shadow.map.dispose();
            light.shadow.map = null;
          }
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'cast: ' +
          caster.castShadow +
          ' / receive: ' +
          floor.receiveShadow +
          ' / extent: ' +
          shadowCamera.right +
          ' / mapSize: ' +
          light.shadow.mapSize.toArray() +
          ' / actual map: ' +
          (light.shadow.map
            ? [light.shadow.map.width, light.shadow.map.height]
            : '—') +
          ' / world units per texel: ' +
          (shadowCamera.right - shadowCamera.left) / light.shadow.mapSize.x;
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
        helper.dispose();
        light.shadow.dispose();
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

- How do mapSize and camera extent trade quality against cost?

### API · Object3D.castShadow / receiveShadow

Separates depth casters from surfaces that receive shadow comparisons.

- `castShadow: boolean` — Whether the object casts; default false
- `receiveShadow: boolean` — Whether its surface receives shadows; default false

Property assignments have no return value.

- Also enable renderer.shadowMap.enabled and light.castShadow.

```js
renderer.shadowMap.enabled=true; light.castShadow=true; box.castShadow=true; floor.receiveShadow=true;
```

[Object3D.castShadow / receiveShadow](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-27

### API · LightShadow.camera

Defines the light-view region captured by the depth map.

- `camera: Camera` — OrthographicCamera for a directional light

Read the camera reference to change its bounds and update projection.

- More map pixels cannot fix missing coverage. Wider bounds increase world units per texel.

```js
const c=light.shadow.camera; c.left=c.bottom=-4; c.right=c.top=4; c.updateProjectionMatrix(); helper.update();
```

[LightShadow.camera](https://threejs.org/docs/pages/LightShadow.html) · three@0.186.1 · 2026-10-27

### API · LightShadow.mapSize

Sets the depth texture width and height in pixels.

- `mapSize: Vector2` — Default (512,512); compare 32 and 512 here

Configured dimensions apply when the map is allocated.

- A 16× side increase means 256× texels. Dispose an existing map and set it to null when resizing.

```js
light.shadow.mapSize.set(512,512); light.shadow.map?.dispose(); light.shadow.map=null;
```

[LightShadow.mapSize](https://threejs.org/docs/pages/LightShadow.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Color Spaces and Output](../11/README.md) · [Next: Normalized Coordinates and Selection](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
