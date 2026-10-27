# Three.js · 11 Color Spaces and Output

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting, Materials, and Model Selection · Editable example · Storage ID: `threejs-step-11`

## Goals and learning outcomes

- Distinguish color maps from normal and roughness maps.
- Explain input, working, and output color spaces.

## Prerequisites

Prerequisite units: 09, 10. Build on their concepts.

## Key concepts and explanations

### Color Data

Color textures and numerical data textures have different meanings. Color images need an appropriate colorSpace for correct lighting calculations.

### Output Conversion

The renderer’s output color space belongs to the display stage. Confusing input and output and converting twice changes colors.

## Practice setup

Edit and run HTML inside the site using the supplied Three.js 0.186.1. No separate installation or external server is required. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. The original 2×2 gray image encodes sRGB color 128. Change inputSpace="none" to "srgb". Also apply srgb through the selector and compare brightness.
2. The green channel 128/255 encodes a roughness coefficient, not color. Change inputSpace="srgb" to "none" and compare reflections under a fixed point light. Keep roughness=1 and metalness=.25.
3. Use Linear-sRGB (.5,.5,.5) directly on a plane without an image. Change renderer.outputColorSpace from LinearSRGBColorSpace to SRGBColorSpace. Also apply srgb through the selector.

## Variables to observe

| Variable                 | Baseline       | Change       | Expected change / hypothesis                                   |
| ------------------------ | -------------- | ------------ | -------------------------------------------------------------- |
| Color texture colorSpace | SRGBColorSpace | NoColorSpace | The interpretation of brightness in the same image may change. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish color maps from normal and roughness maps.
- [ ] Explain input, working, and output color spaces.

## Self-check

1. Why should you not assign sRGB to every texture?
2. What conditions are needed to compare CSS colors with rendered output?

## Official references

- [Three.js Color Management](https://threejs.org/manual/pages/color-management.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-11/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run the HTML starter inside the site. Complete each experiment and record actual images and values in notes.

- [example.html](../../../../../../../src/labs/threejs-step-11/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

The same byte 128 has different meaning as color and as roughness. Separate decoding into the Linear-sRGB working space from final display encoding. Tone mapping is disabled and neutral lights stay fixed.

### Prerequisite units

- `threejs-step-09`
- `threejs-step-10`

### Annotate a color image as sRGB

The original 2×2 gray image encodes sRGB color 128. Change inputSpace="none" to "srgb". Also apply srgb through the selector and compare brightness.

**Expected result**

NoColorSpace→srgb. The same source byte produces approximately 188→128 at output.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Input color space of color images</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Input color space of color images</h1>
    <p>
      Original 2×2 RGBA [128,128,128,255] asset. In the color step it encodes an
      sRGB image; in the data step its green=128/255 encodes roughness. The
      output step displays Linear-sRGB .5.
    </p>
    <div class="controls">
      <label
        >Color space
        <select id="space">
          <option value="none" selected>none</option>
          <option value="srgb">srgb</option>
        </select></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Input color space of color images"></canvas>
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
      const pixels = new Uint8Array([
        128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128,
        255,
      ]);
      const texture = new THREE.DataTexture(pixels, 2, 2);
      texture.magFilter = texture.minFilter = THREE.NearestFilter;
      ownedTextures.add(texture);
      const inputSpace = 'none';
      texture.colorSpace =
        inputSpace === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.needsUpdate = true;
      const geometry = new THREE.PlaneGeometry(3.6, 2.4);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const space = document.querySelector('#space').value;
          texture.colorSpace =
            space === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
          texture.needsUpdate = true;
          material.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'input: ' +
          (texture.colorSpace || 'NoColorSpace') +
          ' / working: Linear-sRGB / output: ' +
          renderer.outputColorSpace +
          ' / source byte: ' +
          pixels[1] +
          ' / roughness: ' +
          (material.roughness ?? '—');
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

- Find inputSpace.
- Keep the output at srgb.

</details>

<details>
<summary>Solution and explanation</summary>

Annotating a color map with SRGBColorSpace decodes sRGB into the linear working space. NoColorSpace instead treats 128/255 as already linear, making display output brighter. MeshBasicMaterial avoids lighting so this experiment isolates color conversion.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Input color space of color images</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Input color space of color images</h1>
    <p>
      Original 2×2 RGBA [128,128,128,255] asset. In the color step it encodes an
      sRGB image; in the data step its green=128/255 encodes roughness. The
      output step displays Linear-sRGB .5.
    </p>
    <div class="controls">
      <label
        >Color space
        <select id="space">
          <option value="none">none</option>
          <option value="srgb" selected>srgb</option>
        </select></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Input color space of color images"></canvas>
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
      const pixels = new Uint8Array([
        128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128,
        255,
      ]);
      const texture = new THREE.DataTexture(pixels, 2, 2);
      texture.magFilter = texture.minFilter = THREE.NearestFilter;
      ownedTextures.add(texture);
      const inputSpace = 'srgb';
      texture.colorSpace =
        inputSpace === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.needsUpdate = true;
      const geometry = new THREE.PlaneGeometry(3.6, 2.4);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const space = document.querySelector('#space').value;
          texture.colorSpace =
            space === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
          texture.needsUpdate = true;
          material.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'input: ' +
          (texture.colorSpace || 'NoColorSpace') +
          ' / working: Linear-sRGB / output: ' +
          renderer.outputColorSpace +
          ' / source byte: ' +
          pixels[1] +
          ' / roughness: ' +
          (material.roughness ?? '—');
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

- Why can input colorSpace change brightness without changing bytes?

### Preserve numeric roughness data

The green channel 128/255 encodes a roughness coefficient, not color. Change inputSpace="srgb" to "none" and compare reflections under a fixed point light. Keep roughness=1 and metalness=.25.

**Expected result**

NoColorSpace preserves 128/255≈.502, spreading the reflection. Color-image rules do not apply to every texture.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Numeric maps are linear data</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Numeric maps are linear data</h1>
    <p>
      Original 2×2 RGBA [128,128,128,255] asset. In the color step it encodes an
      sRGB image; in the data step its green=128/255 encodes roughness. The
      output step displays Linear-sRGB .5.
    </p>
    <div class="controls">
      <label
        >Color space
        <select id="space">
          <option value="none">none</option>
          <option value="srgb" selected>srgb</option>
        </select></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Numeric maps are linear data"></canvas>
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
      const pixels = new Uint8Array([
        128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128,
        255,
      ]);
      const texture = new THREE.DataTexture(pixels, 2, 2);
      texture.magFilter = texture.minFilter = THREE.NearestFilter;
      ownedTextures.add(texture);
      const inputSpace = 'srgb';
      texture.colorSpace =
        inputSpace === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.needsUpdate = true;
      const geometry = new THREE.SphereGeometry(1.15, 48, 32);
      const material = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 1,
        roughnessMap: texture,
        metalness: 0.25,
      });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      scene.add(new THREE.AmbientLight(0xffffff, 0.2));
      const light = new THREE.PointLight(0xffffff, 70);
      light.position.set(2, 2, 3);
      scene.add(light);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const space = document.querySelector('#space').value;
          texture.colorSpace =
            space === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
          texture.needsUpdate = true;
          material.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'input: ' +
          (texture.colorSpace || 'NoColorSpace') +
          ' / working: Linear-sRGB / output: ' +
          renderer.outputColorSpace +
          ' / source byte: ' +
          pixels[1] +
          ' / roughness: ' +
          (material.roughness ?? '—');
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

- Select none for numeric data.
- Consider green multiplied by roughness=1.

</details>

<details>
<summary>Solution and explanation</summary>

roughnessMap multiplies material.roughness by the green channel. NoColorSpace preserves that numeric value. Incorrect sRGB decoding changes .502 to about .216, narrowing reflections. normalMap also encodes numeric direction components and uses NoColorSpace. This experiment runs roughnessMap and explains the separate normalMap role.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Numeric maps are linear data</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Numeric maps are linear data</h1>
    <p>
      Original 2×2 RGBA [128,128,128,255] asset. In the color step it encodes an
      sRGB image; in the data step its green=128/255 encodes roughness. The
      output step displays Linear-sRGB .5.
    </p>
    <div class="controls">
      <label
        >Color space
        <select id="space">
          <option value="none" selected>none</option>
          <option value="srgb">srgb</option>
        </select></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Numeric maps are linear data"></canvas>
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
      const pixels = new Uint8Array([
        128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128,
        255,
      ]);
      const texture = new THREE.DataTexture(pixels, 2, 2);
      texture.magFilter = texture.minFilter = THREE.NearestFilter;
      ownedTextures.add(texture);
      const inputSpace = 'none';
      texture.colorSpace =
        inputSpace === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.needsUpdate = true;
      const geometry = new THREE.SphereGeometry(1.15, 48, 32);
      const material = new THREE.MeshStandardMaterial({
        color: '#b98245',
        roughness: 1,
        roughnessMap: texture,
        metalness: 0.25,
      });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));
      scene.add(new THREE.AmbientLight(0xffffff, 0.2));
      const light = new THREE.PointLight(0xffffff, 70);
      light.position.set(2, 2, 3);
      scene.add(light);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const space = document.querySelector('#space').value;
          texture.colorSpace =
            space === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
          texture.needsUpdate = true;
          material.needsUpdate = true;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'input: ' +
          (texture.colorSpace || 'NoColorSpace') +
          ' / working: Linear-sRGB / output: ' +
          renderer.outputColorSpace +
          ' / source byte: ' +
          pixels[1] +
          ' / roughness: ' +
          (material.roughness ?? '—');
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

- What direction information would sRGB decoding damage in a normal map?

### Separate working space and output encoding

Use Linear-sRGB (.5,.5,.5) directly on a plane without an image. Change renderer.outputColorSpace from LinearSRGBColorSpace to SRGBColorSpace. Also apply srgb through the selector.

**Expected result**

Working .5 stays fixed; linear→srgb output changes approximately 128→188. NoToneMapping remains enabled.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Working color and output color</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Working color and output color</h1>
    <p>
      Original 2×2 RGBA [128,128,128,255] asset. In the color step it encodes an
      sRGB image; in the data step its green=128/255 encodes roughness. The
      output step displays Linear-sRGB .5.
    </p>
    <div class="controls">
      <label
        >Color space
        <select id="space">
          <option value="linear" selected>linear</option>
          <option value="srgb">srgb</option>
        </select></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Working color and output color"></canvas>
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
      const pixels = new Uint8Array([
        128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128,
        255,
      ]);
      const texture = new THREE.DataTexture(pixels, 2, 2);
      texture.magFilter = texture.minFilter = THREE.NearestFilter;
      ownedTextures.add(texture);
      const inputSpace = 'none';
      texture.colorSpace =
        inputSpace === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.needsUpdate = true;
      const geometry = new THREE.PlaneGeometry(3.6, 2.4);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.5, 0.5, 0.5),
      });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));

      renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const space = document.querySelector('#space').value;
          renderer.outputColorSpace =
            space === 'srgb' ? THREE.SRGBColorSpace : THREE.LinearSRGBColorSpace;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'input: ' +
          (texture.colorSpace || 'NoColorSpace') +
          ' / working: Linear-sRGB / output: ' +
          renderer.outputColorSpace +
          ' / source byte: ' +
          pixels[1] +
          ' / roughness: ' +
          (material.roughness ?? '—');
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

- Find renderer.outputColorSpace.
- material.color .5 is a linear value.

</details>

<details>
<summary>Solution and explanation</summary>

Three.js performs lighting and color calculations in Linear-sRGB. outputColorSpace controls final encoding and does not repair texture semantics. Linear .5 displays as about 188 on a normal sRGB display. Distinguishing input, working, and output stages avoids double conversion.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Working color and output color</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage { width:480px; max-width:100%; height:280px; } canvas { display:block; width:100%; height:100%; } .controls { display:flex; flex-wrap:wrap; align-items:center; gap:8px; } input[type=number] { width:85px; } input[type=file]{max-width:100%;width:240px} output { display:block; white-space:pre-wrap; overflow-wrap:anywhere; } #error { color:#b91c1c; } button { padding:6px; }
    </style>
  </head>
  <body>
    <h1>Working color and output color</h1>
    <p>
      Original 2×2 RGBA [128,128,128,255] asset. In the color step it encodes an
      sRGB image; in the data step its green=128/255 encodes roughness. The
      output step displays Linear-sRGB .5.
    </p>
    <div class="controls">
      <label
        >Color space
        <select id="space">
          <option value="linear">linear</option>
          <option value="srgb" selected>srgb</option>
        </select></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Working color and output color"></canvas>
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
      const pixels = new Uint8Array([
        128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128, 255, 128, 128, 128,
        255,
      ]);
      const texture = new THREE.DataTexture(pixels, 2, 2);
      texture.magFilter = texture.minFilter = THREE.NearestFilter;
      ownedTextures.add(texture);
      const inputSpace = 'none';
      texture.colorSpace =
        inputSpace === 'srgb' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.needsUpdate = true;
      const geometry = new THREE.PlaneGeometry(3.6, 2.4);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.5, 0.5, 0.5),
      });
      scene.add(ownMesh(new THREE.Mesh(geometry, material)));

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;
      document.querySelector('#apply').addEventListener(
        'click',
        () => {
          const space = document.querySelector('#space').value;
          renderer.outputColorSpace =
            space === 'srgb' ? THREE.SRGBColorSpace : THREE.LinearSRGBColorSpace;
          draw();
        },
        { signal: events.signal },
      );
      function report() {
        output.textContent =
          'input: ' +
          (texture.colorSpace || 'NoColorSpace') +
          ' / working: Linear-sRGB / output: ' +
          renderer.outputColorSpace +
          ' / source byte: ' +
          pixels[1] +
          ' / roughness: ' +
          (material.roughness ?? '—');
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

- Why does compensating for bad input through output settings break other colors?

### API · Texture.colorSpace

Declares color-image encoding or numeric-data semantics.

- `colorSpace: string` — SRGBColorSpace for color maps; NoColorSpace for numeric maps

Sets the annotation used to interpret GPU texture input.

- roughnessMap uses green. normalMap also encodes directions rather than photographic color.

```js
texture.colorSpace=THREE.NoColorSpace; texture.needsUpdate=true;
```

[Texture.colorSpace](https://threejs.org/docs/pages/Texture.html) · three@0.186.1 · 2026-10-27

### API · WebGLRenderer.outputColorSpace

Encodes linear working results for display.

- `outputColorSpace: string` — Default SRGBColorSpace; LinearSRGBColorSpace for comparison

Property assignment changes render output encoding.

- Do not repair incorrect texture semantics through output settings. Use NoToneMapping for this controlled comparison.

```js
renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.toneMapping=THREE.NoToneMapping;
```

[WebGLRenderer.outputColorSpace](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Textures and UVs](../10/README.md) · [Next: Shadow Maps](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
