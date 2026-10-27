# Three.js · 10 Textures and UVs

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting, Materials, and Model Selection · Editable example · Storage ID: `threejs-step-10`

## Goals and learning outcomes

- Distinguish UVs from world coordinates.
- Report a failed texture URL through an error UI.

## Prerequisites

Prerequisite units: 05, 09. Build on their concepts.

## Key concepts and explanations

### UV Mapping

UVs connect vertices to image positions. Stretching geometry may stretch its texture too.

### Repeat Settings

Changing repeat alone does not repeat a texture if wrapping is configured incorrectly. Consider the source texture dimensions together with the surface proportions.

## Practice setup

Edit and run HTML inside the site using the supplied Three.js 0.186.1. No separate installation or external server is required. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. The plane has world width 3.6. Change uvScale=1 to .5. Also apply U range .5 through the input. The left half of the image should cover the entire plane without changing mesh position or scale.
2. The repeat inputs already contain 4,2, but the starter uses ClampToEdgeWrapping. Enable RepeatWrapping and apply. Compare stretched edge colors with four horizontal and two vertical image copies.
3. The starter loads corrupt data PNG and displays an error. Change loadImage(invalid) to loadImage(sample). Select real PNG and JPEG files, then try a corrupt image and restore the sample.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                                                 |
| -------- | -------- | ------ | -------------------------------------------------------------------------------------------- |
| repeat   | 1,1      | 4,2    | The checker pattern repeats four times horizontally and twice vertically across the surface. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish UVs from world coordinates.
- [ ] Report a failed texture URL through an error UI.

## Self-check

1. Why do only edge colors stretch even after changing repeat settings?
2. How do the roles of a normal map and a color image differ?

## Official references

- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)
- [Three.js Color Management](https://threejs.org/manual/pages/color-management.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-10/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run the HTML starter inside the site. Complete each experiment and record actual images and values in notes.

- [example.html](../../../../../../../src/labs/threejs-step-10/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

UV connects image locations to vertices; world coordinates place objects. Use an original 8×8 PNG and real TextureLoader to separate coordinate mapping, repetition, and recovery.

### Prerequisite units

- `threejs-step-05`
- `threejs-step-09`

### Reduce only the UV range

The plane has world width 3.6. Change uvScale=1 to .5. Also apply U range .5 through the input. The left half of the image should cover the entire plane without changing mesh position or scale.

**Expected result**

Maximum U 1→.5; world width remains 3.6. Only blue and yellow cover the plane.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>UV and world coordinates</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>UV and world coordinates</h1>
    <p>
      Uses an original 8×8 quadrant PNG. Selected files exist only in this
      running preview and are excluded from backups. Re-run or reload starts the
      sample; select your file again.
    </p>
    <div class="controls">
      <label
        >U range
        <input
          id="value"
          type="number"
          min="0.25"
          max="1"
          step="0.25"
          value="1" /></label
      ><button id="apply">Apply</button
      ><label
        >Choose PNG/JPEG
        <input id="file" type="file" accept="image/png,image/jpeg" /></label
      ><button id="sample">Restore sample</button
      ><button id="invalid">Try corrupt image</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="UV and world coordinates"></canvas>
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
      const sample =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVR4nGNQTX79Hxn/LBZDwQx0UPDrjOh/ZKx0NA4F00EBAIGeoRHacAfoAAAAAElFTkSuQmCC',
        invalid = 'data:image/png;base64,YnJva2Vu';
      const geometry = new THREE.PlaneGeometry(3.6, 2.4),
        material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const uvScale = 1;
      const uv = geometry.getAttribute('uv');
      for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * uvScale);
      uv.needsUpdate = true;
      let status = 'loading',
        current = null,
        request = 0;
      const urls = new Set();
      function release(texture) {
        if (ownedTextures.delete(texture)) texture.dispose();
      }
      function revoke(url) {
        if (urls.delete(url)) URL.revokeObjectURL(url);
      }
      function configure(texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.needsUpdate = true;
      }
      function loadImage(url) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        const texture = new THREE.TextureLoader().load(
          url,
          (loaded) => {
            revoke(url);
            if (disposed || token !== request) {
              release(loaded);
              return;
            }
            configure(loaded);
            const previous = current;
            current = loaded;
            material.map = loaded;
            material.needsUpdate = true;
            if (previous) release(previous);
            status = 'ready';
            draw();
          },
          undefined,
          () => {
            revoke(url);
            release(texture);
            if (disposed || token !== request) return;
            status = 'error';
            error.textContent =
              'Could not decode image. Choose a valid PNG/JPEG or restore the sample.';
            draw();
          },
        );
        ownedTextures.add(texture);
        draw();
      }
      document.querySelector('#file').addEventListener(
        'change',
        (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const url = URL.createObjectURL(file);
          urls.add(url);
          loadImage(url);
        },
        { signal: events.signal },
      );
      document.querySelector('#sample').addEventListener(
        'click',
        () => {
          document.querySelector('#file').value = '';
          loadImage(sample);
        },
        { signal: events.signal },
      );
      document
        .querySelector('#invalid')
        .addEventListener('click', () => loadImage(invalid), {
          signal: events.signal,
        });
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (!input.value || !input.checkValidity()) return;
          for (let i = 0; i < uv.count; i++)
            uv.setX(i, (i % 2) * Number(input.value));
          uv.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      loadImage(sample);
      function report() {
        output.textContent =
          'State: ' +
          status +
          ' / UV: ' +
          Array.from(uv.array).join(',') +
          ' / world width: ' +
          geometry.parameters.width * mesh.scale.x +
          ' / repeat: ' +
          (current ? current.repeat.toArray() : '—') +
          ' / wrap: ' +
          (current ? current.wrapS : '—') +
          ' / image: ' +
          (current ? current.image.width + '×' + current.image.height : '—');
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
        request++;
        for (const url of urls) URL.revokeObjectURL(url);
        urls.clear();
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

- Change uvScale to .5.
- Read the uv attribute, not position.

</details>

<details>
<summary>Solution and explanation</summary>

U and V identify horizontal and vertical image locations, usually in 0–1. Halving U stretches the left image half across the same world surface. Position and UV attributes are separate arrays.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>UV and world coordinates</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>UV and world coordinates</h1>
    <p>
      Uses an original 8×8 quadrant PNG. Selected files exist only in this
      running preview and are excluded from backups. Re-run or reload starts the
      sample; select your file again.
    </p>
    <div class="controls">
      <label
        >U range
        <input
          id="value"
          type="number"
          min="0.25"
          max="1"
          step="0.25"
          value="0.5" /></label
      ><button id="apply">Apply</button
      ><label
        >Choose PNG/JPEG
        <input id="file" type="file" accept="image/png,image/jpeg" /></label
      ><button id="sample">Restore sample</button
      ><button id="invalid">Try corrupt image</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="UV and world coordinates"></canvas>
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
      const sample =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVR4nGNQTX79Hxn/LBZDwQx0UPDrjOh/ZKx0NA4F00EBAIGeoRHacAfoAAAAAElFTkSuQmCC',
        invalid = 'data:image/png;base64,YnJva2Vu';
      const geometry = new THREE.PlaneGeometry(3.6, 2.4),
        material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const uvScale = 0.5;
      const uv = geometry.getAttribute('uv');
      for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * uvScale);
      uv.needsUpdate = true;
      let status = 'loading',
        current = null,
        request = 0;
      const urls = new Set();
      function release(texture) {
        if (ownedTextures.delete(texture)) texture.dispose();
      }
      function revoke(url) {
        if (urls.delete(url)) URL.revokeObjectURL(url);
      }
      function configure(texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.needsUpdate = true;
      }
      function loadImage(url) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        const texture = new THREE.TextureLoader().load(
          url,
          (loaded) => {
            revoke(url);
            if (disposed || token !== request) {
              release(loaded);
              return;
            }
            configure(loaded);
            const previous = current;
            current = loaded;
            material.map = loaded;
            material.needsUpdate = true;
            if (previous) release(previous);
            status = 'ready';
            draw();
          },
          undefined,
          () => {
            revoke(url);
            release(texture);
            if (disposed || token !== request) return;
            status = 'error';
            error.textContent =
              'Could not decode image. Choose a valid PNG/JPEG or restore the sample.';
            draw();
          },
        );
        ownedTextures.add(texture);
        draw();
      }
      document.querySelector('#file').addEventListener(
        'change',
        (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const url = URL.createObjectURL(file);
          urls.add(url);
          loadImage(url);
        },
        { signal: events.signal },
      );
      document.querySelector('#sample').addEventListener(
        'click',
        () => {
          document.querySelector('#file').value = '';
          loadImage(sample);
        },
        { signal: events.signal },
      );
      document
        .querySelector('#invalid')
        .addEventListener('click', () => loadImage(invalid), {
          signal: events.signal,
        });
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const input = document.querySelector('#value');
          if (!input.value || !input.checkValidity()) return;
          for (let i = 0; i < uv.count; i++)
            uv.setX(i, (i % 2) * Number(input.value));
          uv.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      loadImage(sample);
      function report() {
        output.textContent =
          'State: ' +
          status +
          ' / UV: ' +
          Array.from(uv.array).join(',') +
          ' / world width: ' +
          geometry.parameters.width * mesh.scale.x +
          ' / repeat: ' +
          (current ? current.repeat.toArray() : '—') +
          ' / wrap: ' +
          (current ? current.wrapS : '—') +
          ' / image: ' +
          (current ? current.image.width + '×' + current.image.height : '—');
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
        request++;
        for (const url of urls) URL.revokeObjectURL(url);
        urls.clear();
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

- What do UV and world coordinates each control?

### Connect repeat counts to wrapping

The repeat inputs already contain 4,2, but the starter uses ClampToEdgeWrapping. Enable RepeatWrapping and apply. Compare stretched edge colors with four horizontal and two vertical image copies.

**Expected result**

repeat=[4,2] stays fixed; both axes change clamp→repeat, producing 4×2 quadrant tiles.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Repeat and wrapping</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Repeat and wrapping</h1>
    <p>
      Uses an original 8×8 quadrant PNG. Selected files exist only in this
      running preview and are excluded from backups. Re-run or reload starts the
      sample; select your file again.
    </p>
    <div class="controls">
      <label
        >repeat X
        <input
          id="repeatX"
          type="number"
          min="1"
          max="8"
          step="1"
          value="4" /></label
      ><label
        >repeat Y
        <input
          id="repeatY"
          type="number"
          min="1"
          max="8"
          step="1"
          value="2" /></label
      ><label><input id="wrap" type="checkbox" />RepeatWrapping</label
      ><button id="apply">Apply</button
      ><label
        >Choose PNG/JPEG
        <input id="file" type="file" accept="image/png,image/jpeg" /></label
      ><button id="sample">Restore sample</button
      ><button id="invalid">Try corrupt image</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Repeat and wrapping"></canvas></div>
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
      const sample =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVR4nGNQTX79Hxn/LBZDwQx0UPDrjOh/ZKx0NA4F00EBAIGeoRHacAfoAAAAAElFTkSuQmCC',
        invalid = 'data:image/png;base64,YnJva2Vu';
      const geometry = new THREE.PlaneGeometry(3.6, 2.4),
        material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const uvScale = 1;
      const uv = geometry.getAttribute('uv');
      for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * uvScale);
      uv.needsUpdate = true;
      let status = 'loading',
        current = null,
        request = 0;
      const urls = new Set();
      function release(texture) {
        if (ownedTextures.delete(texture)) texture.dispose();
      }
      function revoke(url) {
        if (urls.delete(url)) URL.revokeObjectURL(url);
      }
      function configure(texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.wrapS = texture.wrapT = document.querySelector('#wrap').checked
          ? THREE.RepeatWrapping
          : THREE.ClampToEdgeWrapping;
        texture.repeat.set(
          Number(document.querySelector('#repeatX').value),
          Number(document.querySelector('#repeatY').value),
        );
        texture.needsUpdate = true;
      }
      function loadImage(url) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        const texture = new THREE.TextureLoader().load(
          url,
          (loaded) => {
            revoke(url);
            if (disposed || token !== request) {
              release(loaded);
              return;
            }
            configure(loaded);
            const previous = current;
            current = loaded;
            material.map = loaded;
            material.needsUpdate = true;
            if (previous) release(previous);
            status = 'ready';
            draw();
          },
          undefined,
          () => {
            revoke(url);
            release(texture);
            if (disposed || token !== request) return;
            status = 'error';
            error.textContent =
              'Could not decode image. Choose a valid PNG/JPEG or restore the sample.';
            draw();
          },
        );
        ownedTextures.add(texture);
        draw();
      }
      document.querySelector('#file').addEventListener(
        'change',
        (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const url = URL.createObjectURL(file);
          urls.add(url);
          loadImage(url);
        },
        { signal: events.signal },
      );
      document.querySelector('#sample').addEventListener(
        'click',
        () => {
          document.querySelector('#file').value = '';
          loadImage(sample);
        },
        { signal: events.signal },
      );
      document
        .querySelector('#invalid')
        .addEventListener('click', () => loadImage(invalid), {
          signal: events.signal,
        });
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          if (
            ![...document.querySelectorAll('input[type=number]')].every(
              (i) => i.value && i.checkValidity(),
            )
          )
            return;
          if (current) configure(current);
          draw();
        },
        { signal: events.signal },
      );
      loadImage(sample);
      function report() {
        output.textContent =
          'State: ' +
          status +
          ' / UV: ' +
          Array.from(uv.array).join(',') +
          ' / world width: ' +
          geometry.parameters.width * mesh.scale.x +
          ' / repeat: ' +
          (current ? current.repeat.toArray() : '—') +
          ' / wrap: ' +
          (current ? current.wrapS : '—') +
          ' / image: ' +
          (current ? current.image.width + '×' + current.image.height : '—');
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
        request++;
        for (const url of urls) URL.revokeObjectURL(url);
        urls.clear();
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

- Enable the RepeatWrapping checkbox.
- Check both wrapS and wrapT.

</details>

<details>
<summary>Solution and explanation</summary>

repeat multiplies UV coordinates. wrapS and wrapT determine how coordinates outside 0–1 are sampled. Clamp extends edge colors; RepeatWrapping repeats the image. Set needsUpdate after changing wrapping on an uploaded texture.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Repeat and wrapping</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Repeat and wrapping</h1>
    <p>
      Uses an original 8×8 quadrant PNG. Selected files exist only in this
      running preview and are excluded from backups. Re-run or reload starts the
      sample; select your file again.
    </p>
    <div class="controls">
      <label
        >repeat X
        <input
          id="repeatX"
          type="number"
          min="1"
          max="8"
          step="1"
          value="4" /></label
      ><label
        >repeat Y
        <input
          id="repeatY"
          type="number"
          min="1"
          max="8"
          step="1"
          value="2" /></label
      ><label><input id="wrap" type="checkbox" checked />RepeatWrapping</label
      ><button id="apply">Apply</button
      ><label
        >Choose PNG/JPEG
        <input id="file" type="file" accept="image/png,image/jpeg" /></label
      ><button id="sample">Restore sample</button
      ><button id="invalid">Try corrupt image</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Repeat and wrapping"></canvas></div>
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
      const sample =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVR4nGNQTX79Hxn/LBZDwQx0UPDrjOh/ZKx0NA4F00EBAIGeoRHacAfoAAAAAElFTkSuQmCC',
        invalid = 'data:image/png;base64,YnJva2Vu';
      const geometry = new THREE.PlaneGeometry(3.6, 2.4),
        material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const uvScale = 1;
      const uv = geometry.getAttribute('uv');
      for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * uvScale);
      uv.needsUpdate = true;
      let status = 'loading',
        current = null,
        request = 0;
      const urls = new Set();
      function release(texture) {
        if (ownedTextures.delete(texture)) texture.dispose();
      }
      function revoke(url) {
        if (urls.delete(url)) URL.revokeObjectURL(url);
      }
      function configure(texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.wrapS = texture.wrapT = document.querySelector('#wrap').checked
          ? THREE.RepeatWrapping
          : THREE.ClampToEdgeWrapping;
        texture.repeat.set(
          Number(document.querySelector('#repeatX').value),
          Number(document.querySelector('#repeatY').value),
        );
        texture.needsUpdate = true;
      }
      function loadImage(url) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        const texture = new THREE.TextureLoader().load(
          url,
          (loaded) => {
            revoke(url);
            if (disposed || token !== request) {
              release(loaded);
              return;
            }
            configure(loaded);
            const previous = current;
            current = loaded;
            material.map = loaded;
            material.needsUpdate = true;
            if (previous) release(previous);
            status = 'ready';
            draw();
          },
          undefined,
          () => {
            revoke(url);
            release(texture);
            if (disposed || token !== request) return;
            status = 'error';
            error.textContent =
              'Could not decode image. Choose a valid PNG/JPEG or restore the sample.';
            draw();
          },
        );
        ownedTextures.add(texture);
        draw();
      }
      document.querySelector('#file').addEventListener(
        'change',
        (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const url = URL.createObjectURL(file);
          urls.add(url);
          loadImage(url);
        },
        { signal: events.signal },
      );
      document.querySelector('#sample').addEventListener(
        'click',
        () => {
          document.querySelector('#file').value = '';
          loadImage(sample);
        },
        { signal: events.signal },
      );
      document
        .querySelector('#invalid')
        .addEventListener('click', () => loadImage(invalid), {
          signal: events.signal,
        });
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          if (
            ![...document.querySelectorAll('input[type=number]')].every(
              (i) => i.value && i.checkValidity(),
            )
          )
            return;
          if (current) configure(current);
          draw();
        },
        { signal: events.signal },
      );
      loadImage(sample);
      function report() {
        output.textContent =
          'State: ' +
          status +
          ' / UV: ' +
          Array.from(uv.array).join(',') +
          ' / world width: ' +
          geometry.parameters.width * mesh.scale.x +
          ' / repeat: ' +
          (current ? current.repeat.toArray() : '—') +
          ' / wrap: ' +
          (current ? current.wrapS : '—') +
          ' / image: ' +
          (current ? current.image.width + '×' + current.image.height : '—');
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
        request++;
        for (const url of urls) URL.revokeObjectURL(url);
        urls.clear();
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

- Why can repeat 4,2 still stretch edge colors?

### Recover from an invalid image

The starter loads corrupt data PNG and displays an error. Change loadImage(invalid) to loadImage(sample). Select real PNG and JPEG files, then try a corrupt image and restore the sample.

**Expected result**

error→ready with an 8×8 sample. Inputs survive decode errors and sample recovery works. Re-run requires file reselection.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Image loading and recovery</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Image loading and recovery</h1>
    <p>
      Uses an original 8×8 quadrant PNG. Selected files exist only in this
      running preview and are excluded from backups. Re-run or reload starts the
      sample; select your file again.
    </p>
    <div class="controls">
      <button id="apply">Apply</button
      ><label
        >Choose PNG/JPEG
        <input id="file" type="file" accept="image/png,image/jpeg" /></label
      ><button id="sample">Restore sample</button
      ><button id="invalid">Try corrupt image</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Image loading and recovery"></canvas>
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
      const sample =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVR4nGNQTX79Hxn/LBZDwQx0UPDrjOh/ZKx0NA4F00EBAIGeoRHacAfoAAAAAElFTkSuQmCC',
        invalid = 'data:image/png;base64,YnJva2Vu';
      const geometry = new THREE.PlaneGeometry(3.6, 2.4),
        material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const uvScale = 1;
      const uv = geometry.getAttribute('uv');
      for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * uvScale);
      uv.needsUpdate = true;
      let status = 'loading',
        current = null,
        request = 0;
      const urls = new Set();
      function release(texture) {
        if (ownedTextures.delete(texture)) texture.dispose();
      }
      function revoke(url) {
        if (urls.delete(url)) URL.revokeObjectURL(url);
      }
      function configure(texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.needsUpdate = true;
      }
      function loadImage(url) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        const texture = new THREE.TextureLoader().load(
          url,
          (loaded) => {
            revoke(url);
            if (disposed || token !== request) {
              release(loaded);
              return;
            }
            configure(loaded);
            const previous = current;
            current = loaded;
            material.map = loaded;
            material.needsUpdate = true;
            if (previous) release(previous);
            status = 'ready';
            draw();
          },
          undefined,
          () => {
            revoke(url);
            release(texture);
            if (disposed || token !== request) return;
            status = 'error';
            error.textContent =
              'Could not decode image. Choose a valid PNG/JPEG or restore the sample.';
            draw();
          },
        );
        ownedTextures.add(texture);
        draw();
      }
      document.querySelector('#file').addEventListener(
        'change',
        (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const url = URL.createObjectURL(file);
          urls.add(url);
          loadImage(url);
        },
        { signal: events.signal },
      );
      document.querySelector('#sample').addEventListener(
        'click',
        () => {
          document.querySelector('#file').value = '';
          loadImage(sample);
        },
        { signal: events.signal },
      );
      document
        .querySelector('#invalid')
        .addEventListener('click', () => loadImage(invalid), {
          signal: events.signal,
        });
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          draw();
        },
        { signal: events.signal },
      );
      loadImage(invalid);
      function report() {
        output.textContent =
          'State: ' +
          status +
          ' / UV: ' +
          Array.from(uv.array).join(',') +
          ' / world width: ' +
          geometry.parameters.width * mesh.scale.x +
          ' / repeat: ' +
          (current ? current.repeat.toArray() : '—') +
          ' / wrap: ' +
          (current ? current.wrapS : '—') +
          ' / image: ' +
          (current ? current.image.width + '×' + current.image.height : '—');
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
        request++;
        for (const url of urls) URL.revokeObjectURL(url);
        urls.clear();
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

- Pass sample to the initial loadImage call.
- A corrupt file with a PNG extension still fails decoding.

</details>

<details>
<summary>Solution and explanation</summary>

TextureLoader decodes asynchronously. Only a successful result replaces material.map; failures keep the last valid image. Dispose replaced or failed textures and revoke object URLs on success, failure, or cleanup. Selected files belong only to this running iframe and cannot be restored from backup.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Image loading and recovery</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Image loading and recovery</h1>
    <p>
      Uses an original 8×8 quadrant PNG. Selected files exist only in this
      running preview and are excluded from backups. Re-run or reload starts the
      sample; select your file again.
    </p>
    <div class="controls">
      <button id="apply">Apply</button
      ><label
        >Choose PNG/JPEG
        <input id="file" type="file" accept="image/png,image/jpeg" /></label
      ><button id="sample">Restore sample</button
      ><button id="invalid">Try corrupt image</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Image loading and recovery"></canvas>
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
      const sample =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVR4nGNQTX79Hxn/LBZDwQx0UPDrjOh/ZKx0NA4F00EBAIGeoRHacAfoAAAAAElFTkSuQmCC',
        invalid = 'data:image/png;base64,YnJva2Vu';
      const geometry = new THREE.PlaneGeometry(3.6, 2.4),
        material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const mesh = ownMesh(new THREE.Mesh(geometry, material));
      scene.add(mesh);
      const uvScale = 1;
      const uv = geometry.getAttribute('uv');
      for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * uvScale);
      uv.needsUpdate = true;
      let status = 'loading',
        current = null,
        request = 0;
      const urls = new Set();
      function release(texture) {
        if (ownedTextures.delete(texture)) texture.dispose();
      }
      function revoke(url) {
        if (urls.delete(url)) URL.revokeObjectURL(url);
      }
      function configure(texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.needsUpdate = true;
      }
      function loadImage(url) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        const texture = new THREE.TextureLoader().load(
          url,
          (loaded) => {
            revoke(url);
            if (disposed || token !== request) {
              release(loaded);
              return;
            }
            configure(loaded);
            const previous = current;
            current = loaded;
            material.map = loaded;
            material.needsUpdate = true;
            if (previous) release(previous);
            status = 'ready';
            draw();
          },
          undefined,
          () => {
            revoke(url);
            release(texture);
            if (disposed || token !== request) return;
            status = 'error';
            error.textContent =
              'Could not decode image. Choose a valid PNG/JPEG or restore the sample.';
            draw();
          },
        );
        ownedTextures.add(texture);
        draw();
      }
      document.querySelector('#file').addEventListener(
        'change',
        (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const url = URL.createObjectURL(file);
          urls.add(url);
          loadImage(url);
        },
        { signal: events.signal },
      );
      document.querySelector('#sample').addEventListener(
        'click',
        () => {
          document.querySelector('#file').value = '';
          loadImage(sample);
        },
        { signal: events.signal },
      );
      document
        .querySelector('#invalid')
        .addEventListener('click', () => loadImage(invalid), {
          signal: events.signal,
        });
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          draw();
        },
        { signal: events.signal },
      );
      loadImage(sample);
      function report() {
        output.textContent =
          'State: ' +
          status +
          ' / UV: ' +
          Array.from(uv.array).join(',') +
          ' / world width: ' +
          geometry.parameters.width * mesh.scale.x +
          ' / repeat: ' +
          (current ? current.repeat.toArray() : '—') +
          ' / wrap: ' +
          (current ? current.wrapS : '—') +
          ' / image: ' +
          (current ? current.image.width + '×' + current.image.height : '—');
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
        request++;
        for (const url of urls) URL.revokeObjectURL(url);
        urls.clear();
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

- Which resources do Texture.dispose and URL.revokeObjectURL release?

### API · TextureLoader.load

Loads an image asynchronously and reports success or failure.

- `url: string` — A data URI or object URL
- `onLoad: function` — Receives the decoded Texture
- `onError: function` — Handles a decode failure

Returns a Texture immediately; onLoad signals image readiness.

- onProgress is unsupported. Texture disposal and object URL revocation are separate.

```js
loader.load(url, texture => { material.map=texture; material.needsUpdate=true; }, undefined, showError);
```

[TextureLoader.load](https://threejs.org/docs/pages/TextureLoader.html) · three@0.186.1 · 2026-10-27

### API · Texture.repeat / wrapS / wrapT

Controls UV scale and sampling outside the unit range.

- `repeat: Vector2` — Horizontal and vertical UV scale; default (1,1)
- `wrapS / wrapT: number` — U/V wrapping; default ClampToEdgeWrapping

repeat.set(x,y) returns the same Vector2.

- repeat alone does not enable repetition. Set needsUpdate after changing wrapping.

```js
texture.wrapS=texture.wrapT=THREE.RepeatWrapping; texture.repeat.set(4,2); texture.needsUpdate=true;
```

[Texture.repeat / wrapS / wrapT](https://threejs.org/docs/pages/Texture.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Roughness and Metalness](../09/README.md) · [Next: Color Spaces and Output](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
