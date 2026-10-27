# Three.js · 15 Model Size and Camera Fitting

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Animation, Instancing, and Render Passes · Editable example · Storage ID: `threejs-step-15`

## Goals and learning outcomes

- Center a model on screen even when it is far from the origin.
- Preserve the camera for an empty model and distinguish small models from empty bounds.

## Prerequisites

Prerequisite units: 03, 14. Apply their concepts in these experiments.

## Key concepts and explanations

### World center and size

Use the world center for controls.target and camera position instead of moving the model. Placing the camera along +Z from that center gives a front view of this static scene. Model coordinates remain unchanged.

### Fit camera from FOV and aspect

FOV is in degrees while Math.sin takes radians. Using vertical FOV alone can clip sides in a portrait view. Sphere fitting is conservative rather than optimal for each shape, but contains this bound from every direction.

## Practice setup

Edit and run independent HTML in the site using Three.js 0.186.1 and addons from the same installation. No separate installation or server is needed. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. offset is a GLB with both panels scaled by 8 and centered at (40,-15,3). After root.updateWorldMatrix(true,true), box.setFromObject(root) computes world bounds including descendants and parent transforms. getCenter(center) and getSize(size) write into supplied Vector3 objects without moving the model.

With useCenter=false the starter looks at the origin, leaving the model off-screen. Set useCenter=true. Read center≈(40,-15,3), size≈(30.4,12.8,0), and check that camera.x/y match the center. Alternate static and offset to verify 8× world size. An axis-aligned Box3 can contain empty space around rotated surfaces. 2. Use the same offset model. useFov=false fixes distance at 7 and clips the large model. Set useFov=true, enter margin=1.25, and click Fit camera. A bounding sphere uses r=size.length()/2. Convert vertical FOV to radians; horizontal FOV is 2*atan(tan(vFov/2)*aspect). Use the smaller FOV in d=r/sin(fov/2)*margin for a conservative sphere fit.

ResizeObserver updates aspect and projection at positive CSS sizes, then refits. On mobile, read whether distance grows as horizontal FOV narrows. near=max(d-2r,.00001) and far=d+4r leave depth room. Filling the view and preventing near/far clipping are different conditions. 3. empty is valid GLB with no drawable Mesh. When box.isEmpty() is true, read the empty-model message separately from load failure. guardEmpty=false keeps fitting an empty bound and moves the camera to a tiny distance near the origin. Set guardEmpty=true to return early.

Load static after empty, then empty again. Check that the last valid camera is preserved. Test a tiny local GLB, or temporarily add root.scale.setScalar(.001) before root.updateWorldMatrix in fitModel. A minimum radius .001 prevents a zero-size point bound from producing zero distance/near. An empty model and a very small model are different states.

## Variables to observe

| Variable    | Baseline | Change | Expected change / hypothesis                                          |
| ----------- | -------- | ------ | --------------------------------------------------------------------- |
| Model scale | 1        | 8      | After framing, the model occupies a similar proportion of the screen. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Center a model on screen even when it is far from the origin.
- [ ] Preserve the camera for an empty model and distinguish small models from empty bounds.

## Self-check

1. Why does lookAt(0,0,0) miss a far-offset model?
2. Why does distance grow as aspect decreases?
3. Is a zero-size bound identical to an empty bound?

## Official references

- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)
- [Three.js OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)
- [Three.js Box3](https://threejs.org/docs/pages/Box3.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-15/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run HTML starters inside the site. Complete the experiments and record actual results in notes.

- [example.html](../../../../../../../src/labs/threejs-step-15/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Continue perspective cameras from 03 and GLB loading from 14. Frame a distant model by looking at its world-bounds center, without moving the model to the origin. Box3 is an axis-aligned bound, not the surface itself. Read center, size, camera distance, and clipping separately, then record predictions and actual results.

### Prerequisite units

- `threejs-step-03`
- `threejs-02`

### World center and size

offset is a GLB with both panels scaled by 8 and centered at (40,-15,3). After root.updateWorldMatrix(true,true), box.setFromObject(root) computes world bounds including descendants and parent transforms. getCenter(center) and getSize(size) write into supplied Vector3 objects without moving the model.

With useCenter=false the starter looks at the origin, leaving the model off-screen. Set useCenter=true. Read center≈(40,-15,3), size≈(30.4,12.8,0), and check that camera.x/y match the center. Alternate static and offset to verify 8× world size. An axis-aligned Box3 can contain empty space around rotated surfaces.

**Expected result**

false shows background; true centers the distant model. static size is about (3.8,1.6,0), offset about (30.4,12.8,0).

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Model center and size</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Model center and size</h1>
    <p>
      Original two-panel GLB. static shares geometry and material; animated
      moves Left from X=-1.1 to -.1 in one second. textured embeds a 2×2 PNG.
      Files exist only during this run and are excluded from backups. Reselect
      after re-run, reload, or backup restore. GLB external URIs, multi-file
      .gltf, and Draco/Meshopt/KTX2 compression are unsupported here. After
      failure, choose another file or a built-in model and click Load sample.
    </p>
    <div class="controls">
      <label
        >Built-in model
        <select id="model">
          <option>static</option>
          <option>animated</option>
          <option>empty</option>
          <option>textured</option>
          <option>offset</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="invalid">Try corrupt GLB</button
      ><label
        >GLB file (max 2 MiB)
        <input id="file" type="file" accept=".glb,model/gltf-binary" /></label
      ><label
        >Fit margin
        <input
          id="value"
          type="number"
          min="1"
          max="2"
          step="0.05"
          value="1" /></label
      ><button id="apply">Fit camera</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Model center and size"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      const samples = {
        static:
          'Z2xURgIAAAAkAwAAwAIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6Wy0xLjEsMCwwXX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzEuMSwwLDBdfV0sImJ1ZmZlcnMiOlt7ImJ5dGVMZW5ndGgiOjcyfV19IEgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
        animated:
          'Z2xURgIAAADUBAAAUAQAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJTQ0FMQVIiLCJjb3VudCI6MiwibWluIjpbMF0sIm1heCI6WzFdfSx7ImJ1ZmZlclZpZXciOjIsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMzIiwiY291bnQiOjJ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6OH0seyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjgwLCJieXRlTGVuZ3RoIjoyNH1dLCJleHRlbnNpb25zVXNlZCI6WyJLSFJfbWF0ZXJpYWxzX3VubGl0Il0sIm1hdGVyaWFscyI6W3sibmFtZSI6IlNoYXJlZEJsdWUiLCJkb3VibGVTaWRlZCI6dHJ1ZSwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yRmFjdG9yIjpbMC4wMywwLjIsMC44LDFdLCJtZXRhbGxpY0ZhY3RvciI6MH0sImV4dGVuc2lvbnMiOnsiS0hSX21hdGVyaWFsc191bmxpdCI6e319fV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3siYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MH0sIm1hdGVyaWFsIjowfV19XSwibm9kZXMiOlt7Im1lc2giOjAsIm5hbWUiOiJMZWZ0IiwidHJhbnNsYXRpb24iOlstMS4xLDAsMF19LHsibWVzaCI6MCwibmFtZSI6IlJpZ2h0IiwidHJhbnNsYXRpb24iOlsxLjEsMCwwXX1dLCJhbmltYXRpb25zIjpbeyJuYW1lIjoiU2xpZGVMZWZ0Iiwic2FtcGxlcnMiOlt7ImlucHV0IjoxLCJvdXRwdXQiOjIsImludGVycG9sYXRpb24iOiJMSU5FQVIifV0sImNoYW5uZWxzIjpbeyJzYW1wbGVyIjowLCJ0YXJnZXQiOnsibm9kZSI6MCwicGF0aCI6InRyYW5zbGF0aW9uIn19XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxMDR9XX1oAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAIA/zcyMvwAAAAAAAAAAzczMvQAAAAAAAAAA',
        empty:
          'Z2xURgIAAAB4AAAAZAAAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOltdfV19',
        textured:
          'Z2xURgIAAACUBAAAtAMAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMyIiwiY291bnQiOjZ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6NDh9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjoxMjAsImJ5dGVMZW5ndGgiOjc2fV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JUZXh0dXJlIjp7ImluZGV4IjowfSwibWV0YWxsaWNGYWN0b3IiOjB9LCJleHRlbnNpb25zIjp7IktIUl9tYXRlcmlhbHNfdW5saXQiOnt9fX1dLCJtZXNoZXMiOlt7InByaW1pdGl2ZXMiOlt7ImF0dHJpYnV0ZXMiOnsiUE9TSVRJT04iOjAsIlRFWENPT1JEXzAiOjF9LCJtYXRlcmlhbCI6MH1dfV0sIm5vZGVzIjpbeyJtZXNoIjowLCJuYW1lIjoiTGVmdCIsInRyYW5zbGF0aW9uIjpbLTEuMSwwLDBdfSx7Im1lc2giOjAsIm5hbWUiOiJSaWdodCIsInRyYW5zbGF0aW9uIjpbMS4xLDAsMF19XSwiaW1hZ2VzIjpbeyJidWZmZXJWaWV3IjoyLCJtaW1lVHlwZSI6ImltYWdlL3BuZyJ9XSwidGV4dHVyZXMiOlt7InNvdXJjZSI6MH1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxOTZ9XX0gICDEAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAIA/AACAPwAAAAAAAIA/AACAP4lQTkcNChoKAAAADUlIRFIAAAACAAAAAggGAAAAcrYNJAAAABNJREFUeJxj+M/A8B8MGRj+gwEAScgJ9xRjMp0AAAAASUVORK5CYII=',
        offset:
          'Z2xURgIAAABIAwAA5AIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6WzMxLjIsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzQ4LjgsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjo3Mn1dfUgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
      };
      const loader = new GLTFLoader();
      let root = null,
        meshes = [],
        status = 'loading',
        request = 0,
        sharedAtLoad = false;
      const restoreSelection = () => {};

      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = false;
      controls.dampingFactor = 0.15;
      const box = new THREE.Box3(),
        center = new THREE.Vector3(),
        size = new THREE.Vector3();
      let empty = false;
      const useCenter = false,
        useFov = true,
        guardEmpty = true;
      function fitModel() {
        if (!root) return;
        root.updateWorldMatrix(true, true);
        box.setFromObject(root);
        empty = box.isEmpty();
        if (empty) {
          error.textContent =
            'Empty model: no drawable surface. Choose another built-in model.';
          if (guardEmpty) return;
        }
        box.getCenter(center);
        box.getSize(size);
        const focus = useCenter ? center : new THREE.Vector3();
        const radius = Math.max(size.length() / 2, 0.001),
          vFov = THREE.MathUtils.degToRad(camera.fov),
          hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect),
          margin = Number(document.querySelector('#value').value);
        const distance = useFov
          ? (radius / Math.sin(Math.min(vFov, hFov) / 2)) * margin
          : 7;
        controls.target.copy(focus);
        camera.position.copy(focus).add(new THREE.Vector3(0, 0, distance));
        camera.near = Math.max(distance - radius * 2, 0.00001);
        camera.far = distance + radius * 4;
        camera.updateProjectionMatrix();
        controls.update();
      }

      controls.addEventListener('change', draw);
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        error.textContent = '';
        fitModel();
        draw();
      });
      const clearMixer = () => {};
      function resources(object) {
        const geometry = new Set(),
          material = new Set(),
          texture = new Set();
        object.traverse((o) => {
          if (o.geometry) geometry.add(o.geometry);
          for (const m of Array.isArray(o.material)
            ? o.material
            : o.material
              ? [o.material]
              : []) {
            material.add(m);
            for (const value of Object.values(m))
              if (value?.isTexture) texture.add(value);
          }
        });
        return { geometry, material, texture };
      }
      function release(object) {
        const r = resources(object);
        for (const g of r.geometry) {
          ownedGeometry.delete(g);
          g.dispose();
        }
        for (const m of r.material) {
          ownedMaterial.delete(m);
          m.dispose();
        }
        for (const tex of r.texture) {
          ownedTextures.delete(tex);
          tex.dispose();
          tex.image?.close?.();
        }
      }
      function validateGlb(buffer) {
        if (buffer.byteLength > 2 * 1024 * 1024) throw Error('GLB exceeds 2 MiB');
        const view = new DataView(buffer);
        if (
          view.getUint32(0, true) !== 0x46546c67 ||
          view.getUint32(4, true) !== 2 ||
          view.getUint32(8, true) !== buffer.byteLength ||
          view.getUint32(16, true) !== 0x4e4f534a
        )
          throw Error('Invalid GLB');
        const json = JSON.parse(
          new TextDecoder().decode(
            new Uint8Array(buffer, 20, view.getUint32(12, true)),
          ),
        );
        if (
          [...(json.buffers ?? []), ...(json.images ?? [])].some(
            (x) => x.uri && !x.uri.startsWith('data:'),
          )
        )
          throw Error('External URI unsupported');
        if ((json.extensionsUsed ?? []).some((x) => /draco|meshopt|basisu/i.test(x)))
          throw Error('Compression unsupported');
      }
      async function loadModel(readBuffer) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        draw();
        try {
          const buffer = await readBuffer();
          validateGlb(buffer);
          const gltf = await loader.parseAsync(buffer, '');
          if (disposed || token !== request) {
            release(gltf.scene);
            return;
          }
          restoreSelection();
          clearMixer();
          if (root) {
            scene.remove(root);
            release(root);
          }
          root = gltf.scene;
          scene.add(root);
          meshes = [];
          root.traverse((o) => {
            if (o.isMesh) meshes.push(o);
          });
          const r = resources(root);
          r.geometry.forEach((x) => ownedGeometry.add(x));
          r.material.forEach((x) => ownedMaterial.add(x));
          r.texture.forEach((x) => ownedTextures.add(x));
          sharedAtLoad =
            meshes.length > 1 && meshes[0].material === meshes[1].material;
          status = 'ready';

          fitModel();

          draw();
        } catch (cause) {
          if (disposed || token !== request) return;
          status = 'error';
          error.textContent =
            'Could not read GLB. Choose a self-contained uncompressed GLB up to 2 MiB, or load a built-in sample. Details: ' +
            cause.message;
          draw();
        }
      }
      function sample(kind) {
        if (kind in samples) document.querySelector('#model').value = kind;
        return loadModel(() =>
          kind === 'invalid'
            ? new TextEncoder().encode('invalid-glb').buffer
            : Uint8Array.from(atob(samples[kind]), (c) => c.charCodeAt(0)).buffer,
        );
      }
      on('#sample', 'click', () => {
        document.querySelector('#file').value = '';
        sample(document.querySelector('#model').value);
      });
      on('#invalid', 'click', () => sample('invalid'));
      on('#file', 'change', (e) => {
        const file = e.target.files[0];
        if (file) loadModel(() => file.arrayBuffer());
      });
      sample('offset');
      function report() {
        output.textContent =
          'State: ' +
          status +
          ' / meshes: ' +
          meshes.length +
          ' / shared at load: ' +
          sharedAtLoad +
          ' / frames: ' +
          frames +
          ' / empty: ' +
          empty +
          ' / center: ' +
          center.toArray().map((x) => x.toFixed(2)) +
          ' / size: ' +
          size.toArray().map((x) => x.toFixed(2)) +
          ' / camera: ' +
          camera.position.toArray().map((x) => x.toFixed(2));
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
        report();
      }
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        fitModel();
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
        restoreSelection();
        clearMixer();
        controls.dispose();
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = 'Disposed';
      }
      on('#cleanup', 'click', cleanup);
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

- Distinguish local position from world center.
- getSize is max-min, not distance from the origin.
- Set useCenter=true and compare center with camera.x/y.

</details>

<details>
<summary>Solution and explanation</summary>

Use the world center for controls.target and camera position instead of moving the model. Placing the camera along +Z from that center gives a front view of this static scene. Model coordinates remain unchanged.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Model center and size</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Model center and size</h1>
    <p>
      Original two-panel GLB. static shares geometry and material; animated
      moves Left from X=-1.1 to -.1 in one second. textured embeds a 2×2 PNG.
      Files exist only during this run and are excluded from backups. Reselect
      after re-run, reload, or backup restore. GLB external URIs, multi-file
      .gltf, and Draco/Meshopt/KTX2 compression are unsupported here. After
      failure, choose another file or a built-in model and click Load sample.
    </p>
    <div class="controls">
      <label
        >Built-in model
        <select id="model">
          <option>static</option>
          <option>animated</option>
          <option>empty</option>
          <option>textured</option>
          <option>offset</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="invalid">Try corrupt GLB</button
      ><label
        >GLB file (max 2 MiB)
        <input id="file" type="file" accept=".glb,model/gltf-binary" /></label
      ><label
        >Fit margin
        <input
          id="value"
          type="number"
          min="1"
          max="2"
          step="0.05"
          value="1.25" /></label
      ><button id="apply">Fit camera</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Model center and size"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      const samples = {
        static:
          'Z2xURgIAAAAkAwAAwAIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6Wy0xLjEsMCwwXX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzEuMSwwLDBdfV0sImJ1ZmZlcnMiOlt7ImJ5dGVMZW5ndGgiOjcyfV19IEgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
        animated:
          'Z2xURgIAAADUBAAAUAQAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJTQ0FMQVIiLCJjb3VudCI6MiwibWluIjpbMF0sIm1heCI6WzFdfSx7ImJ1ZmZlclZpZXciOjIsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMzIiwiY291bnQiOjJ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6OH0seyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjgwLCJieXRlTGVuZ3RoIjoyNH1dLCJleHRlbnNpb25zVXNlZCI6WyJLSFJfbWF0ZXJpYWxzX3VubGl0Il0sIm1hdGVyaWFscyI6W3sibmFtZSI6IlNoYXJlZEJsdWUiLCJkb3VibGVTaWRlZCI6dHJ1ZSwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yRmFjdG9yIjpbMC4wMywwLjIsMC44LDFdLCJtZXRhbGxpY0ZhY3RvciI6MH0sImV4dGVuc2lvbnMiOnsiS0hSX21hdGVyaWFsc191bmxpdCI6e319fV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3siYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MH0sIm1hdGVyaWFsIjowfV19XSwibm9kZXMiOlt7Im1lc2giOjAsIm5hbWUiOiJMZWZ0IiwidHJhbnNsYXRpb24iOlstMS4xLDAsMF19LHsibWVzaCI6MCwibmFtZSI6IlJpZ2h0IiwidHJhbnNsYXRpb24iOlsxLjEsMCwwXX1dLCJhbmltYXRpb25zIjpbeyJuYW1lIjoiU2xpZGVMZWZ0Iiwic2FtcGxlcnMiOlt7ImlucHV0IjoxLCJvdXRwdXQiOjIsImludGVycG9sYXRpb24iOiJMSU5FQVIifV0sImNoYW5uZWxzIjpbeyJzYW1wbGVyIjowLCJ0YXJnZXQiOnsibm9kZSI6MCwicGF0aCI6InRyYW5zbGF0aW9uIn19XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxMDR9XX1oAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAIA/zcyMvwAAAAAAAAAAzczMvQAAAAAAAAAA',
        empty:
          'Z2xURgIAAAB4AAAAZAAAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOltdfV19',
        textured:
          'Z2xURgIAAACUBAAAtAMAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMyIiwiY291bnQiOjZ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6NDh9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjoxMjAsImJ5dGVMZW5ndGgiOjc2fV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JUZXh0dXJlIjp7ImluZGV4IjowfSwibWV0YWxsaWNGYWN0b3IiOjB9LCJleHRlbnNpb25zIjp7IktIUl9tYXRlcmlhbHNfdW5saXQiOnt9fX1dLCJtZXNoZXMiOlt7InByaW1pdGl2ZXMiOlt7ImF0dHJpYnV0ZXMiOnsiUE9TSVRJT04iOjAsIlRFWENPT1JEXzAiOjF9LCJtYXRlcmlhbCI6MH1dfV0sIm5vZGVzIjpbeyJtZXNoIjowLCJuYW1lIjoiTGVmdCIsInRyYW5zbGF0aW9uIjpbLTEuMSwwLDBdfSx7Im1lc2giOjAsIm5hbWUiOiJSaWdodCIsInRyYW5zbGF0aW9uIjpbMS4xLDAsMF19XSwiaW1hZ2VzIjpbeyJidWZmZXJWaWV3IjoyLCJtaW1lVHlwZSI6ImltYWdlL3BuZyJ9XSwidGV4dHVyZXMiOlt7InNvdXJjZSI6MH1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxOTZ9XX0gICDEAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAIA/AACAPwAAAAAAAIA/AACAP4lQTkcNChoKAAAADUlIRFIAAAACAAAAAggGAAAAcrYNJAAAABNJREFUeJxj+M/A8B8MGRj+gwEAScgJ9xRjMp0AAAAASUVORK5CYII=',
        offset:
          'Z2xURgIAAABIAwAA5AIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6WzMxLjIsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzQ4LjgsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjo3Mn1dfUgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
      };
      const loader = new GLTFLoader();
      let root = null,
        meshes = [],
        status = 'loading',
        request = 0,
        sharedAtLoad = false;
      const restoreSelection = () => {};

      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = false;
      controls.dampingFactor = 0.15;
      const box = new THREE.Box3(),
        center = new THREE.Vector3(),
        size = new THREE.Vector3();
      let empty = false;
      const useCenter = true,
        useFov = true,
        guardEmpty = true;
      function fitModel() {
        if (!root) return;
        root.updateWorldMatrix(true, true);
        box.setFromObject(root);
        empty = box.isEmpty();
        if (empty) {
          error.textContent =
            'Empty model: no drawable surface. Choose another built-in model.';
          if (guardEmpty) return;
        }
        box.getCenter(center);
        box.getSize(size);
        const focus = useCenter ? center : new THREE.Vector3();
        const radius = Math.max(size.length() / 2, 0.001),
          vFov = THREE.MathUtils.degToRad(camera.fov),
          hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect),
          margin = Number(document.querySelector('#value').value);
        const distance = useFov
          ? (radius / Math.sin(Math.min(vFov, hFov) / 2)) * margin
          : 7;
        controls.target.copy(focus);
        camera.position.copy(focus).add(new THREE.Vector3(0, 0, distance));
        camera.near = Math.max(distance - radius * 2, 0.00001);
        camera.far = distance + radius * 4;
        camera.updateProjectionMatrix();
        controls.update();
      }

      controls.addEventListener('change', draw);
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        error.textContent = '';
        fitModel();
        draw();
      });
      const clearMixer = () => {};
      function resources(object) {
        const geometry = new Set(),
          material = new Set(),
          texture = new Set();
        object.traverse((o) => {
          if (o.geometry) geometry.add(o.geometry);
          for (const m of Array.isArray(o.material)
            ? o.material
            : o.material
              ? [o.material]
              : []) {
            material.add(m);
            for (const value of Object.values(m))
              if (value?.isTexture) texture.add(value);
          }
        });
        return { geometry, material, texture };
      }
      function release(object) {
        const r = resources(object);
        for (const g of r.geometry) {
          ownedGeometry.delete(g);
          g.dispose();
        }
        for (const m of r.material) {
          ownedMaterial.delete(m);
          m.dispose();
        }
        for (const tex of r.texture) {
          ownedTextures.delete(tex);
          tex.dispose();
          tex.image?.close?.();
        }
      }
      function validateGlb(buffer) {
        if (buffer.byteLength > 2 * 1024 * 1024) throw Error('GLB exceeds 2 MiB');
        const view = new DataView(buffer);
        if (
          view.getUint32(0, true) !== 0x46546c67 ||
          view.getUint32(4, true) !== 2 ||
          view.getUint32(8, true) !== buffer.byteLength ||
          view.getUint32(16, true) !== 0x4e4f534a
        )
          throw Error('Invalid GLB');
        const json = JSON.parse(
          new TextDecoder().decode(
            new Uint8Array(buffer, 20, view.getUint32(12, true)),
          ),
        );
        if (
          [...(json.buffers ?? []), ...(json.images ?? [])].some(
            (x) => x.uri && !x.uri.startsWith('data:'),
          )
        )
          throw Error('External URI unsupported');
        if ((json.extensionsUsed ?? []).some((x) => /draco|meshopt|basisu/i.test(x)))
          throw Error('Compression unsupported');
      }
      async function loadModel(readBuffer) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        draw();
        try {
          const buffer = await readBuffer();
          validateGlb(buffer);
          const gltf = await loader.parseAsync(buffer, '');
          if (disposed || token !== request) {
            release(gltf.scene);
            return;
          }
          restoreSelection();
          clearMixer();
          if (root) {
            scene.remove(root);
            release(root);
          }
          root = gltf.scene;
          scene.add(root);
          meshes = [];
          root.traverse((o) => {
            if (o.isMesh) meshes.push(o);
          });
          const r = resources(root);
          r.geometry.forEach((x) => ownedGeometry.add(x));
          r.material.forEach((x) => ownedMaterial.add(x));
          r.texture.forEach((x) => ownedTextures.add(x));
          sharedAtLoad =
            meshes.length > 1 && meshes[0].material === meshes[1].material;
          status = 'ready';

          fitModel();

          draw();
        } catch (cause) {
          if (disposed || token !== request) return;
          status = 'error';
          error.textContent =
            'Could not read GLB. Choose a self-contained uncompressed GLB up to 2 MiB, or load a built-in sample. Details: ' +
            cause.message;
          draw();
        }
      }
      function sample(kind) {
        if (kind in samples) document.querySelector('#model').value = kind;
        return loadModel(() =>
          kind === 'invalid'
            ? new TextEncoder().encode('invalid-glb').buffer
            : Uint8Array.from(atob(samples[kind]), (c) => c.charCodeAt(0)).buffer,
        );
      }
      on('#sample', 'click', () => {
        document.querySelector('#file').value = '';
        sample(document.querySelector('#model').value);
      });
      on('#invalid', 'click', () => sample('invalid'));
      on('#file', 'change', (e) => {
        const file = e.target.files[0];
        if (file) loadModel(() => file.arrayBuffer());
      });
      sample('offset');
      function report() {
        output.textContent =
          'State: ' +
          status +
          ' / meshes: ' +
          meshes.length +
          ' / shared at load: ' +
          sharedAtLoad +
          ' / frames: ' +
          frames +
          ' / empty: ' +
          empty +
          ' / center: ' +
          center.toArray().map((x) => x.toFixed(2)) +
          ' / size: ' +
          size.toArray().map((x) => x.toFixed(2)) +
          ' / camera: ' +
          camera.position.toArray().map((x) => x.toFixed(2));
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
        report();
      }
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        fitModel();
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
        restoreSelection();
        clearMixer();
        controls.dispose();
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = 'Disposed';
      }
      on('#cleanup', 'click', cleanup);
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

</details>

- Why does lookAt(0,0,0) miss a far-offset model?
- Does computing Box3 move the model?

### Fit camera from FOV and aspect

Use the same offset model. useFov=false fixes distance at 7 and clips the large model. Set useFov=true, enter margin=1.25, and click Fit camera. A bounding sphere uses r=size.length()/2. Convert vertical FOV to radians; horizontal FOV is 2*atan(tan(vFov/2)*aspect). Use the smaller FOV in d=r/sin(fov/2)*margin for a conservative sphere fit.

ResizeObserver updates aspect and projection at positive CSS sizes, then refits. On mobile, read whether distance grows as horizontal FOV narrows. near=max(d-2r,.00001) and far=d+4r leave depth room. Filling the view and preventing near/far clipping are different conditions.

**Expected result**

At distance 7 only part is visible. With useFov=true and margin 1.25 the whole model fits; a narrower view increases camera distance.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Fit the view using FOV</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Fit the view using FOV</h1>
    <p>
      Original two-panel GLB. static shares geometry and material; animated
      moves Left from X=-1.1 to -.1 in one second. textured embeds a 2×2 PNG.
      Files exist only during this run and are excluded from backups. Reselect
      after re-run, reload, or backup restore. GLB external URIs, multi-file
      .gltf, and Draco/Meshopt/KTX2 compression are unsupported here. After
      failure, choose another file or a built-in model and click Load sample.
    </p>
    <div class="controls">
      <label
        >Built-in model
        <select id="model">
          <option>static</option>
          <option>animated</option>
          <option>empty</option>
          <option>textured</option>
          <option>offset</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="invalid">Try corrupt GLB</button
      ><label
        >GLB file (max 2 MiB)
        <input id="file" type="file" accept=".glb,model/gltf-binary" /></label
      ><label
        >Fit margin
        <input
          id="value"
          type="number"
          min="1"
          max="2"
          step="0.05"
          value="1" /></label
      ><button id="apply">Fit camera</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Fit the view using FOV"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      const samples = {
        static:
          'Z2xURgIAAAAkAwAAwAIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6Wy0xLjEsMCwwXX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzEuMSwwLDBdfV0sImJ1ZmZlcnMiOlt7ImJ5dGVMZW5ndGgiOjcyfV19IEgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
        animated:
          'Z2xURgIAAADUBAAAUAQAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJTQ0FMQVIiLCJjb3VudCI6MiwibWluIjpbMF0sIm1heCI6WzFdfSx7ImJ1ZmZlclZpZXciOjIsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMzIiwiY291bnQiOjJ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6OH0seyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjgwLCJieXRlTGVuZ3RoIjoyNH1dLCJleHRlbnNpb25zVXNlZCI6WyJLSFJfbWF0ZXJpYWxzX3VubGl0Il0sIm1hdGVyaWFscyI6W3sibmFtZSI6IlNoYXJlZEJsdWUiLCJkb3VibGVTaWRlZCI6dHJ1ZSwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yRmFjdG9yIjpbMC4wMywwLjIsMC44LDFdLCJtZXRhbGxpY0ZhY3RvciI6MH0sImV4dGVuc2lvbnMiOnsiS0hSX21hdGVyaWFsc191bmxpdCI6e319fV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3siYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MH0sIm1hdGVyaWFsIjowfV19XSwibm9kZXMiOlt7Im1lc2giOjAsIm5hbWUiOiJMZWZ0IiwidHJhbnNsYXRpb24iOlstMS4xLDAsMF19LHsibWVzaCI6MCwibmFtZSI6IlJpZ2h0IiwidHJhbnNsYXRpb24iOlsxLjEsMCwwXX1dLCJhbmltYXRpb25zIjpbeyJuYW1lIjoiU2xpZGVMZWZ0Iiwic2FtcGxlcnMiOlt7ImlucHV0IjoxLCJvdXRwdXQiOjIsImludGVycG9sYXRpb24iOiJMSU5FQVIifV0sImNoYW5uZWxzIjpbeyJzYW1wbGVyIjowLCJ0YXJnZXQiOnsibm9kZSI6MCwicGF0aCI6InRyYW5zbGF0aW9uIn19XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxMDR9XX1oAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAIA/zcyMvwAAAAAAAAAAzczMvQAAAAAAAAAA',
        empty:
          'Z2xURgIAAAB4AAAAZAAAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOltdfV19',
        textured:
          'Z2xURgIAAACUBAAAtAMAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMyIiwiY291bnQiOjZ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6NDh9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjoxMjAsImJ5dGVMZW5ndGgiOjc2fV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JUZXh0dXJlIjp7ImluZGV4IjowfSwibWV0YWxsaWNGYWN0b3IiOjB9LCJleHRlbnNpb25zIjp7IktIUl9tYXRlcmlhbHNfdW5saXQiOnt9fX1dLCJtZXNoZXMiOlt7InByaW1pdGl2ZXMiOlt7ImF0dHJpYnV0ZXMiOnsiUE9TSVRJT04iOjAsIlRFWENPT1JEXzAiOjF9LCJtYXRlcmlhbCI6MH1dfV0sIm5vZGVzIjpbeyJtZXNoIjowLCJuYW1lIjoiTGVmdCIsInRyYW5zbGF0aW9uIjpbLTEuMSwwLDBdfSx7Im1lc2giOjAsIm5hbWUiOiJSaWdodCIsInRyYW5zbGF0aW9uIjpbMS4xLDAsMF19XSwiaW1hZ2VzIjpbeyJidWZmZXJWaWV3IjoyLCJtaW1lVHlwZSI6ImltYWdlL3BuZyJ9XSwidGV4dHVyZXMiOlt7InNvdXJjZSI6MH1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxOTZ9XX0gICDEAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAIA/AACAPwAAAAAAAIA/AACAP4lQTkcNChoKAAAADUlIRFIAAAACAAAAAggGAAAAcrYNJAAAABNJREFUeJxj+M/A8B8MGRj+gwEAScgJ9xRjMp0AAAAASUVORK5CYII=',
        offset:
          'Z2xURgIAAABIAwAA5AIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6WzMxLjIsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzQ4LjgsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjo3Mn1dfUgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
      };
      const loader = new GLTFLoader();
      let root = null,
        meshes = [],
        status = 'loading',
        request = 0,
        sharedAtLoad = false;
      const restoreSelection = () => {};

      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = false;
      controls.dampingFactor = 0.15;
      const box = new THREE.Box3(),
        center = new THREE.Vector3(),
        size = new THREE.Vector3();
      let empty = false;
      const useCenter = true,
        useFov = false,
        guardEmpty = true;
      function fitModel() {
        if (!root) return;
        root.updateWorldMatrix(true, true);
        box.setFromObject(root);
        empty = box.isEmpty();
        if (empty) {
          error.textContent =
            'Empty model: no drawable surface. Choose another built-in model.';
          if (guardEmpty) return;
        }
        box.getCenter(center);
        box.getSize(size);
        const focus = useCenter ? center : new THREE.Vector3();
        const radius = Math.max(size.length() / 2, 0.001),
          vFov = THREE.MathUtils.degToRad(camera.fov),
          hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect),
          margin = Number(document.querySelector('#value').value);
        const distance = useFov
          ? (radius / Math.sin(Math.min(vFov, hFov) / 2)) * margin
          : 7;
        controls.target.copy(focus);
        camera.position.copy(focus).add(new THREE.Vector3(0, 0, distance));
        camera.near = Math.max(distance - radius * 2, 0.00001);
        camera.far = distance + radius * 4;
        camera.updateProjectionMatrix();
        controls.update();
      }

      controls.addEventListener('change', draw);
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        error.textContent = '';
        fitModel();
        draw();
      });
      const clearMixer = () => {};
      function resources(object) {
        const geometry = new Set(),
          material = new Set(),
          texture = new Set();
        object.traverse((o) => {
          if (o.geometry) geometry.add(o.geometry);
          for (const m of Array.isArray(o.material)
            ? o.material
            : o.material
              ? [o.material]
              : []) {
            material.add(m);
            for (const value of Object.values(m))
              if (value?.isTexture) texture.add(value);
          }
        });
        return { geometry, material, texture };
      }
      function release(object) {
        const r = resources(object);
        for (const g of r.geometry) {
          ownedGeometry.delete(g);
          g.dispose();
        }
        for (const m of r.material) {
          ownedMaterial.delete(m);
          m.dispose();
        }
        for (const tex of r.texture) {
          ownedTextures.delete(tex);
          tex.dispose();
          tex.image?.close?.();
        }
      }
      function validateGlb(buffer) {
        if (buffer.byteLength > 2 * 1024 * 1024) throw Error('GLB exceeds 2 MiB');
        const view = new DataView(buffer);
        if (
          view.getUint32(0, true) !== 0x46546c67 ||
          view.getUint32(4, true) !== 2 ||
          view.getUint32(8, true) !== buffer.byteLength ||
          view.getUint32(16, true) !== 0x4e4f534a
        )
          throw Error('Invalid GLB');
        const json = JSON.parse(
          new TextDecoder().decode(
            new Uint8Array(buffer, 20, view.getUint32(12, true)),
          ),
        );
        if (
          [...(json.buffers ?? []), ...(json.images ?? [])].some(
            (x) => x.uri && !x.uri.startsWith('data:'),
          )
        )
          throw Error('External URI unsupported');
        if ((json.extensionsUsed ?? []).some((x) => /draco|meshopt|basisu/i.test(x)))
          throw Error('Compression unsupported');
      }
      async function loadModel(readBuffer) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        draw();
        try {
          const buffer = await readBuffer();
          validateGlb(buffer);
          const gltf = await loader.parseAsync(buffer, '');
          if (disposed || token !== request) {
            release(gltf.scene);
            return;
          }
          restoreSelection();
          clearMixer();
          if (root) {
            scene.remove(root);
            release(root);
          }
          root = gltf.scene;
          scene.add(root);
          meshes = [];
          root.traverse((o) => {
            if (o.isMesh) meshes.push(o);
          });
          const r = resources(root);
          r.geometry.forEach((x) => ownedGeometry.add(x));
          r.material.forEach((x) => ownedMaterial.add(x));
          r.texture.forEach((x) => ownedTextures.add(x));
          sharedAtLoad =
            meshes.length > 1 && meshes[0].material === meshes[1].material;
          status = 'ready';

          fitModel();

          draw();
        } catch (cause) {
          if (disposed || token !== request) return;
          status = 'error';
          error.textContent =
            'Could not read GLB. Choose a self-contained uncompressed GLB up to 2 MiB, or load a built-in sample. Details: ' +
            cause.message;
          draw();
        }
      }
      function sample(kind) {
        if (kind in samples) document.querySelector('#model').value = kind;
        return loadModel(() =>
          kind === 'invalid'
            ? new TextEncoder().encode('invalid-glb').buffer
            : Uint8Array.from(atob(samples[kind]), (c) => c.charCodeAt(0)).buffer,
        );
      }
      on('#sample', 'click', () => {
        document.querySelector('#file').value = '';
        sample(document.querySelector('#model').value);
      });
      on('#invalid', 'click', () => sample('invalid'));
      on('#file', 'change', (e) => {
        const file = e.target.files[0];
        if (file) loadModel(() => file.arrayBuffer());
      });
      sample('offset');
      function report() {
        output.textContent =
          'State: ' +
          status +
          ' / meshes: ' +
          meshes.length +
          ' / shared at load: ' +
          sharedAtLoad +
          ' / frames: ' +
          frames +
          ' / empty: ' +
          empty +
          ' / center: ' +
          center.toArray().map((x) => x.toFixed(2)) +
          ' / size: ' +
          size.toArray().map((x) => x.toFixed(2)) +
          ' / camera: ' +
          camera.position.toArray().map((x) => x.toFixed(2));
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
        report();
      }
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        fitModel();
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
        restoreSelection();
        clearMixer();
        controls.dispose();
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = 'Disposed';
      }
      on('#cleanup', 'click', cleanup);
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

- Do not fix d to the model size.
- Check that the smaller of vFov and hFov is used.
- Set useFov=true and margin 1.25, then compare both widths.

</details>

<details>
<summary>Solution and explanation</summary>

FOV is in degrees while Math.sin takes radians. Using vertical FOV alone can clip sides in a portrait view. Sphere fitting is conservative rather than optimal for each shape, but contains this bound from every direction.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Fit the view using FOV</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Fit the view using FOV</h1>
    <p>
      Original two-panel GLB. static shares geometry and material; animated
      moves Left from X=-1.1 to -.1 in one second. textured embeds a 2×2 PNG.
      Files exist only during this run and are excluded from backups. Reselect
      after re-run, reload, or backup restore. GLB external URIs, multi-file
      .gltf, and Draco/Meshopt/KTX2 compression are unsupported here. After
      failure, choose another file or a built-in model and click Load sample.
    </p>
    <div class="controls">
      <label
        >Built-in model
        <select id="model">
          <option>static</option>
          <option>animated</option>
          <option>empty</option>
          <option>textured</option>
          <option>offset</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="invalid">Try corrupt GLB</button
      ><label
        >GLB file (max 2 MiB)
        <input id="file" type="file" accept=".glb,model/gltf-binary" /></label
      ><label
        >Fit margin
        <input
          id="value"
          type="number"
          min="1"
          max="2"
          step="0.05"
          value="1.25" /></label
      ><button id="apply">Fit camera</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Fit the view using FOV"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      const samples = {
        static:
          'Z2xURgIAAAAkAwAAwAIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6Wy0xLjEsMCwwXX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzEuMSwwLDBdfV0sImJ1ZmZlcnMiOlt7ImJ5dGVMZW5ndGgiOjcyfV19IEgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
        animated:
          'Z2xURgIAAADUBAAAUAQAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJTQ0FMQVIiLCJjb3VudCI6MiwibWluIjpbMF0sIm1heCI6WzFdfSx7ImJ1ZmZlclZpZXciOjIsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMzIiwiY291bnQiOjJ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6OH0seyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjgwLCJieXRlTGVuZ3RoIjoyNH1dLCJleHRlbnNpb25zVXNlZCI6WyJLSFJfbWF0ZXJpYWxzX3VubGl0Il0sIm1hdGVyaWFscyI6W3sibmFtZSI6IlNoYXJlZEJsdWUiLCJkb3VibGVTaWRlZCI6dHJ1ZSwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yRmFjdG9yIjpbMC4wMywwLjIsMC44LDFdLCJtZXRhbGxpY0ZhY3RvciI6MH0sImV4dGVuc2lvbnMiOnsiS0hSX21hdGVyaWFsc191bmxpdCI6e319fV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3siYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MH0sIm1hdGVyaWFsIjowfV19XSwibm9kZXMiOlt7Im1lc2giOjAsIm5hbWUiOiJMZWZ0IiwidHJhbnNsYXRpb24iOlstMS4xLDAsMF19LHsibWVzaCI6MCwibmFtZSI6IlJpZ2h0IiwidHJhbnNsYXRpb24iOlsxLjEsMCwwXX1dLCJhbmltYXRpb25zIjpbeyJuYW1lIjoiU2xpZGVMZWZ0Iiwic2FtcGxlcnMiOlt7ImlucHV0IjoxLCJvdXRwdXQiOjIsImludGVycG9sYXRpb24iOiJMSU5FQVIifV0sImNoYW5uZWxzIjpbeyJzYW1wbGVyIjowLCJ0YXJnZXQiOnsibm9kZSI6MCwicGF0aCI6InRyYW5zbGF0aW9uIn19XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxMDR9XX1oAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAIA/zcyMvwAAAAAAAAAAzczMvQAAAAAAAAAA',
        empty:
          'Z2xURgIAAAB4AAAAZAAAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOltdfV19',
        textured:
          'Z2xURgIAAACUBAAAtAMAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMyIiwiY291bnQiOjZ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6NDh9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjoxMjAsImJ5dGVMZW5ndGgiOjc2fV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JUZXh0dXJlIjp7ImluZGV4IjowfSwibWV0YWxsaWNGYWN0b3IiOjB9LCJleHRlbnNpb25zIjp7IktIUl9tYXRlcmlhbHNfdW5saXQiOnt9fX1dLCJtZXNoZXMiOlt7InByaW1pdGl2ZXMiOlt7ImF0dHJpYnV0ZXMiOnsiUE9TSVRJT04iOjAsIlRFWENPT1JEXzAiOjF9LCJtYXRlcmlhbCI6MH1dfV0sIm5vZGVzIjpbeyJtZXNoIjowLCJuYW1lIjoiTGVmdCIsInRyYW5zbGF0aW9uIjpbLTEuMSwwLDBdfSx7Im1lc2giOjAsIm5hbWUiOiJSaWdodCIsInRyYW5zbGF0aW9uIjpbMS4xLDAsMF19XSwiaW1hZ2VzIjpbeyJidWZmZXJWaWV3IjoyLCJtaW1lVHlwZSI6ImltYWdlL3BuZyJ9XSwidGV4dHVyZXMiOlt7InNvdXJjZSI6MH1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxOTZ9XX0gICDEAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAIA/AACAPwAAAAAAAIA/AACAP4lQTkcNChoKAAAADUlIRFIAAAACAAAAAggGAAAAcrYNJAAAABNJREFUeJxj+M/A8B8MGRj+gwEAScgJ9xRjMp0AAAAASUVORK5CYII=',
        offset:
          'Z2xURgIAAABIAwAA5AIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6WzMxLjIsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzQ4LjgsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjo3Mn1dfUgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
      };
      const loader = new GLTFLoader();
      let root = null,
        meshes = [],
        status = 'loading',
        request = 0,
        sharedAtLoad = false;
      const restoreSelection = () => {};

      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = false;
      controls.dampingFactor = 0.15;
      const box = new THREE.Box3(),
        center = new THREE.Vector3(),
        size = new THREE.Vector3();
      let empty = false;
      const useCenter = true,
        useFov = true,
        guardEmpty = true;
      function fitModel() {
        if (!root) return;
        root.updateWorldMatrix(true, true);
        box.setFromObject(root);
        empty = box.isEmpty();
        if (empty) {
          error.textContent =
            'Empty model: no drawable surface. Choose another built-in model.';
          if (guardEmpty) return;
        }
        box.getCenter(center);
        box.getSize(size);
        const focus = useCenter ? center : new THREE.Vector3();
        const radius = Math.max(size.length() / 2, 0.001),
          vFov = THREE.MathUtils.degToRad(camera.fov),
          hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect),
          margin = Number(document.querySelector('#value').value);
        const distance = useFov
          ? (radius / Math.sin(Math.min(vFov, hFov) / 2)) * margin
          : 7;
        controls.target.copy(focus);
        camera.position.copy(focus).add(new THREE.Vector3(0, 0, distance));
        camera.near = Math.max(distance - radius * 2, 0.00001);
        camera.far = distance + radius * 4;
        camera.updateProjectionMatrix();
        controls.update();
      }

      controls.addEventListener('change', draw);
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        error.textContent = '';
        fitModel();
        draw();
      });
      const clearMixer = () => {};
      function resources(object) {
        const geometry = new Set(),
          material = new Set(),
          texture = new Set();
        object.traverse((o) => {
          if (o.geometry) geometry.add(o.geometry);
          for (const m of Array.isArray(o.material)
            ? o.material
            : o.material
              ? [o.material]
              : []) {
            material.add(m);
            for (const value of Object.values(m))
              if (value?.isTexture) texture.add(value);
          }
        });
        return { geometry, material, texture };
      }
      function release(object) {
        const r = resources(object);
        for (const g of r.geometry) {
          ownedGeometry.delete(g);
          g.dispose();
        }
        for (const m of r.material) {
          ownedMaterial.delete(m);
          m.dispose();
        }
        for (const tex of r.texture) {
          ownedTextures.delete(tex);
          tex.dispose();
          tex.image?.close?.();
        }
      }
      function validateGlb(buffer) {
        if (buffer.byteLength > 2 * 1024 * 1024) throw Error('GLB exceeds 2 MiB');
        const view = new DataView(buffer);
        if (
          view.getUint32(0, true) !== 0x46546c67 ||
          view.getUint32(4, true) !== 2 ||
          view.getUint32(8, true) !== buffer.byteLength ||
          view.getUint32(16, true) !== 0x4e4f534a
        )
          throw Error('Invalid GLB');
        const json = JSON.parse(
          new TextDecoder().decode(
            new Uint8Array(buffer, 20, view.getUint32(12, true)),
          ),
        );
        if (
          [...(json.buffers ?? []), ...(json.images ?? [])].some(
            (x) => x.uri && !x.uri.startsWith('data:'),
          )
        )
          throw Error('External URI unsupported');
        if ((json.extensionsUsed ?? []).some((x) => /draco|meshopt|basisu/i.test(x)))
          throw Error('Compression unsupported');
      }
      async function loadModel(readBuffer) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        draw();
        try {
          const buffer = await readBuffer();
          validateGlb(buffer);
          const gltf = await loader.parseAsync(buffer, '');
          if (disposed || token !== request) {
            release(gltf.scene);
            return;
          }
          restoreSelection();
          clearMixer();
          if (root) {
            scene.remove(root);
            release(root);
          }
          root = gltf.scene;
          scene.add(root);
          meshes = [];
          root.traverse((o) => {
            if (o.isMesh) meshes.push(o);
          });
          const r = resources(root);
          r.geometry.forEach((x) => ownedGeometry.add(x));
          r.material.forEach((x) => ownedMaterial.add(x));
          r.texture.forEach((x) => ownedTextures.add(x));
          sharedAtLoad =
            meshes.length > 1 && meshes[0].material === meshes[1].material;
          status = 'ready';

          fitModel();

          draw();
        } catch (cause) {
          if (disposed || token !== request) return;
          status = 'error';
          error.textContent =
            'Could not read GLB. Choose a self-contained uncompressed GLB up to 2 MiB, or load a built-in sample. Details: ' +
            cause.message;
          draw();
        }
      }
      function sample(kind) {
        if (kind in samples) document.querySelector('#model').value = kind;
        return loadModel(() =>
          kind === 'invalid'
            ? new TextEncoder().encode('invalid-glb').buffer
            : Uint8Array.from(atob(samples[kind]), (c) => c.charCodeAt(0)).buffer,
        );
      }
      on('#sample', 'click', () => {
        document.querySelector('#file').value = '';
        sample(document.querySelector('#model').value);
      });
      on('#invalid', 'click', () => sample('invalid'));
      on('#file', 'change', (e) => {
        const file = e.target.files[0];
        if (file) loadModel(() => file.arrayBuffer());
      });
      sample('offset');
      function report() {
        output.textContent =
          'State: ' +
          status +
          ' / meshes: ' +
          meshes.length +
          ' / shared at load: ' +
          sharedAtLoad +
          ' / frames: ' +
          frames +
          ' / empty: ' +
          empty +
          ' / center: ' +
          center.toArray().map((x) => x.toFixed(2)) +
          ' / size: ' +
          size.toArray().map((x) => x.toFixed(2)) +
          ' / camera: ' +
          camera.position.toArray().map((x) => x.toFixed(2));
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
        report();
      }
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        fitModel();
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
        restoreSelection();
        clearMixer();
        controls.dispose();
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = 'Disposed';
      }
      on('#cleanup', 'click', cleanup);
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

</details>

- Why does distance grow as aspect decreases?
- How is near/far selection different from FOV fitting?

### Empty bounds and recovery

empty is valid GLB with no drawable Mesh. When box.isEmpty() is true, read the empty-model message separately from load failure. guardEmpty=false keeps fitting an empty bound and moves the camera to a tiny distance near the origin. Set guardEmpty=true to return early.

Load static after empty, then empty again. Check that the last valid camera is preserved. Test a tiny local GLB, or temporarily add root.scale.setScalar(.001) before root.updateWorldMatrix in fitModel. A minimum radius .001 prevents a zero-size point bound from producing zero distance/near. An empty model and a very small model are different states.

**Expected result**

A successful ready parse can also have empty=true. With guardEmpty=true the camera is preserved across empty loads, and static restores visible geometry.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Empty and tiny models</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Empty and tiny models</h1>
    <p>
      Original two-panel GLB. static shares geometry and material; animated
      moves Left from X=-1.1 to -.1 in one second. textured embeds a 2×2 PNG.
      Files exist only during this run and are excluded from backups. Reselect
      after re-run, reload, or backup restore. GLB external URIs, multi-file
      .gltf, and Draco/Meshopt/KTX2 compression are unsupported here. After
      failure, choose another file or a built-in model and click Load sample.
    </p>
    <div class="controls">
      <label
        >Built-in model
        <select id="model">
          <option>static</option>
          <option>animated</option>
          <option>empty</option>
          <option>textured</option>
          <option>offset</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="invalid">Try corrupt GLB</button
      ><label
        >GLB file (max 2 MiB)
        <input id="file" type="file" accept=".glb,model/gltf-binary" /></label
      ><label
        >Fit margin
        <input
          id="value"
          type="number"
          min="1"
          max="2"
          step="0.05"
          value="1" /></label
      ><button id="apply">Fit camera</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Empty and tiny models"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      const samples = {
        static:
          'Z2xURgIAAAAkAwAAwAIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6Wy0xLjEsMCwwXX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzEuMSwwLDBdfV0sImJ1ZmZlcnMiOlt7ImJ5dGVMZW5ndGgiOjcyfV19IEgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
        animated:
          'Z2xURgIAAADUBAAAUAQAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJTQ0FMQVIiLCJjb3VudCI6MiwibWluIjpbMF0sIm1heCI6WzFdfSx7ImJ1ZmZlclZpZXciOjIsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMzIiwiY291bnQiOjJ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6OH0seyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjgwLCJieXRlTGVuZ3RoIjoyNH1dLCJleHRlbnNpb25zVXNlZCI6WyJLSFJfbWF0ZXJpYWxzX3VubGl0Il0sIm1hdGVyaWFscyI6W3sibmFtZSI6IlNoYXJlZEJsdWUiLCJkb3VibGVTaWRlZCI6dHJ1ZSwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yRmFjdG9yIjpbMC4wMywwLjIsMC44LDFdLCJtZXRhbGxpY0ZhY3RvciI6MH0sImV4dGVuc2lvbnMiOnsiS0hSX21hdGVyaWFsc191bmxpdCI6e319fV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3siYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MH0sIm1hdGVyaWFsIjowfV19XSwibm9kZXMiOlt7Im1lc2giOjAsIm5hbWUiOiJMZWZ0IiwidHJhbnNsYXRpb24iOlstMS4xLDAsMF19LHsibWVzaCI6MCwibmFtZSI6IlJpZ2h0IiwidHJhbnNsYXRpb24iOlsxLjEsMCwwXX1dLCJhbmltYXRpb25zIjpbeyJuYW1lIjoiU2xpZGVMZWZ0Iiwic2FtcGxlcnMiOlt7ImlucHV0IjoxLCJvdXRwdXQiOjIsImludGVycG9sYXRpb24iOiJMSU5FQVIifV0sImNoYW5uZWxzIjpbeyJzYW1wbGVyIjowLCJ0YXJnZXQiOnsibm9kZSI6MCwicGF0aCI6InRyYW5zbGF0aW9uIn19XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxMDR9XX1oAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAIA/zcyMvwAAAAAAAAAAzczMvQAAAAAAAAAA',
        empty:
          'Z2xURgIAAAB4AAAAZAAAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOltdfV19',
        textured:
          'Z2xURgIAAACUBAAAtAMAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMyIiwiY291bnQiOjZ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6NDh9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjoxMjAsImJ5dGVMZW5ndGgiOjc2fV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JUZXh0dXJlIjp7ImluZGV4IjowfSwibWV0YWxsaWNGYWN0b3IiOjB9LCJleHRlbnNpb25zIjp7IktIUl9tYXRlcmlhbHNfdW5saXQiOnt9fX1dLCJtZXNoZXMiOlt7InByaW1pdGl2ZXMiOlt7ImF0dHJpYnV0ZXMiOnsiUE9TSVRJT04iOjAsIlRFWENPT1JEXzAiOjF9LCJtYXRlcmlhbCI6MH1dfV0sIm5vZGVzIjpbeyJtZXNoIjowLCJuYW1lIjoiTGVmdCIsInRyYW5zbGF0aW9uIjpbLTEuMSwwLDBdfSx7Im1lc2giOjAsIm5hbWUiOiJSaWdodCIsInRyYW5zbGF0aW9uIjpbMS4xLDAsMF19XSwiaW1hZ2VzIjpbeyJidWZmZXJWaWV3IjoyLCJtaW1lVHlwZSI6ImltYWdlL3BuZyJ9XSwidGV4dHVyZXMiOlt7InNvdXJjZSI6MH1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxOTZ9XX0gICDEAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAIA/AACAPwAAAAAAAIA/AACAP4lQTkcNChoKAAAADUlIRFIAAAACAAAAAggGAAAAcrYNJAAAABNJREFUeJxj+M/A8B8MGRj+gwEAScgJ9xRjMp0AAAAASUVORK5CYII=',
        offset:
          'Z2xURgIAAABIAwAA5AIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6WzMxLjIsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzQ4LjgsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjo3Mn1dfUgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
      };
      const loader = new GLTFLoader();
      let root = null,
        meshes = [],
        status = 'loading',
        request = 0,
        sharedAtLoad = false;
      const restoreSelection = () => {};

      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = false;
      controls.dampingFactor = 0.15;
      const box = new THREE.Box3(),
        center = new THREE.Vector3(),
        size = new THREE.Vector3();
      let empty = false;
      const useCenter = true,
        useFov = true,
        guardEmpty = false;
      function fitModel() {
        if (!root) return;
        root.updateWorldMatrix(true, true);
        box.setFromObject(root);
        empty = box.isEmpty();
        if (empty) {
          error.textContent =
            'Empty model: no drawable surface. Choose another built-in model.';
          if (guardEmpty) return;
        }
        box.getCenter(center);
        box.getSize(size);
        const focus = useCenter ? center : new THREE.Vector3();
        const radius = Math.max(size.length() / 2, 0.001),
          vFov = THREE.MathUtils.degToRad(camera.fov),
          hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect),
          margin = Number(document.querySelector('#value').value);
        const distance = useFov
          ? (radius / Math.sin(Math.min(vFov, hFov) / 2)) * margin
          : 7;
        controls.target.copy(focus);
        camera.position.copy(focus).add(new THREE.Vector3(0, 0, distance));
        camera.near = Math.max(distance - radius * 2, 0.00001);
        camera.far = distance + radius * 4;
        camera.updateProjectionMatrix();
        controls.update();
      }

      controls.addEventListener('change', draw);
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        error.textContent = '';
        fitModel();
        draw();
      });
      const clearMixer = () => {};
      function resources(object) {
        const geometry = new Set(),
          material = new Set(),
          texture = new Set();
        object.traverse((o) => {
          if (o.geometry) geometry.add(o.geometry);
          for (const m of Array.isArray(o.material)
            ? o.material
            : o.material
              ? [o.material]
              : []) {
            material.add(m);
            for (const value of Object.values(m))
              if (value?.isTexture) texture.add(value);
          }
        });
        return { geometry, material, texture };
      }
      function release(object) {
        const r = resources(object);
        for (const g of r.geometry) {
          ownedGeometry.delete(g);
          g.dispose();
        }
        for (const m of r.material) {
          ownedMaterial.delete(m);
          m.dispose();
        }
        for (const tex of r.texture) {
          ownedTextures.delete(tex);
          tex.dispose();
          tex.image?.close?.();
        }
      }
      function validateGlb(buffer) {
        if (buffer.byteLength > 2 * 1024 * 1024) throw Error('GLB exceeds 2 MiB');
        const view = new DataView(buffer);
        if (
          view.getUint32(0, true) !== 0x46546c67 ||
          view.getUint32(4, true) !== 2 ||
          view.getUint32(8, true) !== buffer.byteLength ||
          view.getUint32(16, true) !== 0x4e4f534a
        )
          throw Error('Invalid GLB');
        const json = JSON.parse(
          new TextDecoder().decode(
            new Uint8Array(buffer, 20, view.getUint32(12, true)),
          ),
        );
        if (
          [...(json.buffers ?? []), ...(json.images ?? [])].some(
            (x) => x.uri && !x.uri.startsWith('data:'),
          )
        )
          throw Error('External URI unsupported');
        if ((json.extensionsUsed ?? []).some((x) => /draco|meshopt|basisu/i.test(x)))
          throw Error('Compression unsupported');
      }
      async function loadModel(readBuffer) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        draw();
        try {
          const buffer = await readBuffer();
          validateGlb(buffer);
          const gltf = await loader.parseAsync(buffer, '');
          if (disposed || token !== request) {
            release(gltf.scene);
            return;
          }
          restoreSelection();
          clearMixer();
          if (root) {
            scene.remove(root);
            release(root);
          }
          root = gltf.scene;
          scene.add(root);
          meshes = [];
          root.traverse((o) => {
            if (o.isMesh) meshes.push(o);
          });
          const r = resources(root);
          r.geometry.forEach((x) => ownedGeometry.add(x));
          r.material.forEach((x) => ownedMaterial.add(x));
          r.texture.forEach((x) => ownedTextures.add(x));
          sharedAtLoad =
            meshes.length > 1 && meshes[0].material === meshes[1].material;
          status = 'ready';

          fitModel();

          draw();
        } catch (cause) {
          if (disposed || token !== request) return;
          status = 'error';
          error.textContent =
            'Could not read GLB. Choose a self-contained uncompressed GLB up to 2 MiB, or load a built-in sample. Details: ' +
            cause.message;
          draw();
        }
      }
      function sample(kind) {
        if (kind in samples) document.querySelector('#model').value = kind;
        return loadModel(() =>
          kind === 'invalid'
            ? new TextEncoder().encode('invalid-glb').buffer
            : Uint8Array.from(atob(samples[kind]), (c) => c.charCodeAt(0)).buffer,
        );
      }
      on('#sample', 'click', () => {
        document.querySelector('#file').value = '';
        sample(document.querySelector('#model').value);
      });
      on('#invalid', 'click', () => sample('invalid'));
      on('#file', 'change', (e) => {
        const file = e.target.files[0];
        if (file) loadModel(() => file.arrayBuffer());
      });
      sample('empty');
      function report() {
        output.textContent =
          'State: ' +
          status +
          ' / meshes: ' +
          meshes.length +
          ' / shared at load: ' +
          sharedAtLoad +
          ' / frames: ' +
          frames +
          ' / empty: ' +
          empty +
          ' / center: ' +
          center.toArray().map((x) => x.toFixed(2)) +
          ' / size: ' +
          size.toArray().map((x) => x.toFixed(2)) +
          ' / camera: ' +
          camera.position.toArray().map((x) => x.toFixed(2));
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
        report();
      }
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        fitModel();
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
        restoreSelection();
        clearMixer();
        controls.dispose();
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = 'Disposed';
      }
      on('#cleanup', 'click', cleanup);
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

- Compare status for empty and corrupt GLB.
- Check for an early return before fitting empty bounds.
- Set guardEmpty=true and record camera coordinates for static → empty.

</details>

<details>
<summary>Solution and explanation</summary>

isEmpty checks bounds with min greater than max. Zero size alone does not imply empty. File and sample controls remain live after empty/error states and can recover with a valid sample.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Empty and tiny models</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Empty and tiny models</h1>
    <p>
      Original two-panel GLB. static shares geometry and material; animated
      moves Left from X=-1.1 to -.1 in one second. textured embeds a 2×2 PNG.
      Files exist only during this run and are excluded from backups. Reselect
      after re-run, reload, or backup restore. GLB external URIs, multi-file
      .gltf, and Draco/Meshopt/KTX2 compression are unsupported here. After
      failure, choose another file or a built-in model and click Load sample.
    </p>
    <div class="controls">
      <label
        >Built-in model
        <select id="model">
          <option>static</option>
          <option>animated</option>
          <option>empty</option>
          <option>textured</option>
          <option>offset</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="invalid">Try corrupt GLB</button
      ><label
        >GLB file (max 2 MiB)
        <input id="file" type="file" accept=".glb,model/gltf-binary" /></label
      ><label
        >Fit margin
        <input
          id="value"
          type="number"
          min="1"
          max="2"
          step="0.05"
          value="1.25" /></label
      ><button id="apply">Fit camera</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Empty and tiny models"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      const samples = {
        static:
          'Z2xURgIAAAAkAwAAwAIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6Wy0xLjEsMCwwXX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzEuMSwwLDBdfV0sImJ1ZmZlcnMiOlt7ImJ5dGVMZW5ndGgiOjcyfV19IEgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
        animated:
          'Z2xURgIAAADUBAAAUAQAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJTQ0FMQVIiLCJjb3VudCI6MiwibWluIjpbMF0sIm1heCI6WzFdfSx7ImJ1ZmZlclZpZXciOjIsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMzIiwiY291bnQiOjJ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6OH0seyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjgwLCJieXRlTGVuZ3RoIjoyNH1dLCJleHRlbnNpb25zVXNlZCI6WyJLSFJfbWF0ZXJpYWxzX3VubGl0Il0sIm1hdGVyaWFscyI6W3sibmFtZSI6IlNoYXJlZEJsdWUiLCJkb3VibGVTaWRlZCI6dHJ1ZSwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yRmFjdG9yIjpbMC4wMywwLjIsMC44LDFdLCJtZXRhbGxpY0ZhY3RvciI6MH0sImV4dGVuc2lvbnMiOnsiS0hSX21hdGVyaWFsc191bmxpdCI6e319fV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3siYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MH0sIm1hdGVyaWFsIjowfV19XSwibm9kZXMiOlt7Im1lc2giOjAsIm5hbWUiOiJMZWZ0IiwidHJhbnNsYXRpb24iOlstMS4xLDAsMF19LHsibWVzaCI6MCwibmFtZSI6IlJpZ2h0IiwidHJhbnNsYXRpb24iOlsxLjEsMCwwXX1dLCJhbmltYXRpb25zIjpbeyJuYW1lIjoiU2xpZGVMZWZ0Iiwic2FtcGxlcnMiOlt7ImlucHV0IjoxLCJvdXRwdXQiOjIsImludGVycG9sYXRpb24iOiJMSU5FQVIifV0sImNoYW5uZWxzIjpbeyJzYW1wbGVyIjowLCJ0YXJnZXQiOnsibm9kZSI6MCwicGF0aCI6InRyYW5zbGF0aW9uIn19XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxMDR9XX1oAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAIA/zcyMvwAAAAAAAAAAzczMvQAAAAAAAAAA',
        empty:
          'Z2xURgIAAAB4AAAAZAAAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOltdfV19',
        textured:
          'Z2xURgIAAACUBAAAtAMAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMyIiwiY291bnQiOjZ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6NDh9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjoxMjAsImJ5dGVMZW5ndGgiOjc2fV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JUZXh0dXJlIjp7ImluZGV4IjowfSwibWV0YWxsaWNGYWN0b3IiOjB9LCJleHRlbnNpb25zIjp7IktIUl9tYXRlcmlhbHNfdW5saXQiOnt9fX1dLCJtZXNoZXMiOlt7InByaW1pdGl2ZXMiOlt7ImF0dHJpYnV0ZXMiOnsiUE9TSVRJT04iOjAsIlRFWENPT1JEXzAiOjF9LCJtYXRlcmlhbCI6MH1dfV0sIm5vZGVzIjpbeyJtZXNoIjowLCJuYW1lIjoiTGVmdCIsInRyYW5zbGF0aW9uIjpbLTEuMSwwLDBdfSx7Im1lc2giOjAsIm5hbWUiOiJSaWdodCIsInRyYW5zbGF0aW9uIjpbMS4xLDAsMF19XSwiaW1hZ2VzIjpbeyJidWZmZXJWaWV3IjoyLCJtaW1lVHlwZSI6ImltYWdlL3BuZyJ9XSwidGV4dHVyZXMiOlt7InNvdXJjZSI6MH1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxOTZ9XX0gICDEAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAIA/AACAPwAAAAAAAIA/AACAP4lQTkcNChoKAAAADUlIRFIAAAACAAAAAggGAAAAcrYNJAAAABNJREFUeJxj+M/A8B8MGRj+gwEAScgJ9xRjMp0AAAAASUVORK5CYII=',
        offset:
          'Z2xURgIAAABIAwAA5AIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6WzMxLjIsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzQ4LjgsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjo3Mn1dfUgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
      };
      const loader = new GLTFLoader();
      let root = null,
        meshes = [],
        status = 'loading',
        request = 0,
        sharedAtLoad = false;
      const restoreSelection = () => {};

      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = false;
      controls.dampingFactor = 0.15;
      const box = new THREE.Box3(),
        center = new THREE.Vector3(),
        size = new THREE.Vector3();
      let empty = false;
      const useCenter = true,
        useFov = true,
        guardEmpty = true;
      function fitModel() {
        if (!root) return;
        root.updateWorldMatrix(true, true);
        box.setFromObject(root);
        empty = box.isEmpty();
        if (empty) {
          error.textContent =
            'Empty model: no drawable surface. Choose another built-in model.';
          if (guardEmpty) return;
        }
        box.getCenter(center);
        box.getSize(size);
        const focus = useCenter ? center : new THREE.Vector3();
        const radius = Math.max(size.length() / 2, 0.001),
          vFov = THREE.MathUtils.degToRad(camera.fov),
          hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect),
          margin = Number(document.querySelector('#value').value);
        const distance = useFov
          ? (radius / Math.sin(Math.min(vFov, hFov) / 2)) * margin
          : 7;
        controls.target.copy(focus);
        camera.position.copy(focus).add(new THREE.Vector3(0, 0, distance));
        camera.near = Math.max(distance - radius * 2, 0.00001);
        camera.far = distance + radius * 4;
        camera.updateProjectionMatrix();
        controls.update();
      }

      controls.addEventListener('change', draw);
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        error.textContent = '';
        fitModel();
        draw();
      });
      const clearMixer = () => {};
      function resources(object) {
        const geometry = new Set(),
          material = new Set(),
          texture = new Set();
        object.traverse((o) => {
          if (o.geometry) geometry.add(o.geometry);
          for (const m of Array.isArray(o.material)
            ? o.material
            : o.material
              ? [o.material]
              : []) {
            material.add(m);
            for (const value of Object.values(m))
              if (value?.isTexture) texture.add(value);
          }
        });
        return { geometry, material, texture };
      }
      function release(object) {
        const r = resources(object);
        for (const g of r.geometry) {
          ownedGeometry.delete(g);
          g.dispose();
        }
        for (const m of r.material) {
          ownedMaterial.delete(m);
          m.dispose();
        }
        for (const tex of r.texture) {
          ownedTextures.delete(tex);
          tex.dispose();
          tex.image?.close?.();
        }
      }
      function validateGlb(buffer) {
        if (buffer.byteLength > 2 * 1024 * 1024) throw Error('GLB exceeds 2 MiB');
        const view = new DataView(buffer);
        if (
          view.getUint32(0, true) !== 0x46546c67 ||
          view.getUint32(4, true) !== 2 ||
          view.getUint32(8, true) !== buffer.byteLength ||
          view.getUint32(16, true) !== 0x4e4f534a
        )
          throw Error('Invalid GLB');
        const json = JSON.parse(
          new TextDecoder().decode(
            new Uint8Array(buffer, 20, view.getUint32(12, true)),
          ),
        );
        if (
          [...(json.buffers ?? []), ...(json.images ?? [])].some(
            (x) => x.uri && !x.uri.startsWith('data:'),
          )
        )
          throw Error('External URI unsupported');
        if ((json.extensionsUsed ?? []).some((x) => /draco|meshopt|basisu/i.test(x)))
          throw Error('Compression unsupported');
      }
      async function loadModel(readBuffer) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        draw();
        try {
          const buffer = await readBuffer();
          validateGlb(buffer);
          const gltf = await loader.parseAsync(buffer, '');
          if (disposed || token !== request) {
            release(gltf.scene);
            return;
          }
          restoreSelection();
          clearMixer();
          if (root) {
            scene.remove(root);
            release(root);
          }
          root = gltf.scene;
          scene.add(root);
          meshes = [];
          root.traverse((o) => {
            if (o.isMesh) meshes.push(o);
          });
          const r = resources(root);
          r.geometry.forEach((x) => ownedGeometry.add(x));
          r.material.forEach((x) => ownedMaterial.add(x));
          r.texture.forEach((x) => ownedTextures.add(x));
          sharedAtLoad =
            meshes.length > 1 && meshes[0].material === meshes[1].material;
          status = 'ready';

          fitModel();

          draw();
        } catch (cause) {
          if (disposed || token !== request) return;
          status = 'error';
          error.textContent =
            'Could not read GLB. Choose a self-contained uncompressed GLB up to 2 MiB, or load a built-in sample. Details: ' +
            cause.message;
          draw();
        }
      }
      function sample(kind) {
        if (kind in samples) document.querySelector('#model').value = kind;
        return loadModel(() =>
          kind === 'invalid'
            ? new TextEncoder().encode('invalid-glb').buffer
            : Uint8Array.from(atob(samples[kind]), (c) => c.charCodeAt(0)).buffer,
        );
      }
      on('#sample', 'click', () => {
        document.querySelector('#file').value = '';
        sample(document.querySelector('#model').value);
      });
      on('#invalid', 'click', () => sample('invalid'));
      on('#file', 'change', (e) => {
        const file = e.target.files[0];
        if (file) loadModel(() => file.arrayBuffer());
      });
      sample('empty');
      function report() {
        output.textContent =
          'State: ' +
          status +
          ' / meshes: ' +
          meshes.length +
          ' / shared at load: ' +
          sharedAtLoad +
          ' / frames: ' +
          frames +
          ' / empty: ' +
          empty +
          ' / center: ' +
          center.toArray().map((x) => x.toFixed(2)) +
          ' / size: ' +
          size.toArray().map((x) => x.toFixed(2)) +
          ' / camera: ' +
          camera.position.toArray().map((x) => x.toFixed(2));
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
        report();
      }
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        fitModel();
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
        restoreSelection();
        clearMixer();
        controls.dispose();
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = 'Disposed';
      }
      on('#cleanup', 'click', cleanup);
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

</details>

- Is a zero-size bound identical to an empty bound?
- How does preserving the camera help recovery from an empty model?

### API · Box3.setFromObject / isEmpty

Reads world axis-aligned bounds including descendant transforms.

- `object: Object3D` — Root to bound

setFromObject returns this Box3; isEmpty returns boolean.

- getCenter/getSize write into supplied Vector3 objects. Stop fitting for empty bounds.

```js
root.updateWorldMatrix(true,true); box.setFromObject(root); if(!box.isEmpty()){box.getCenter(center);box.getSize(size);}
```

[Box3.setFromObject / isEmpty](https://threejs.org/docs/pages/Box3.html) · three@0.186.1 · 2026-10-27

### API · PerspectiveCamera.fov / aspect

Uses both FOVs and a bounding sphere for conservative framing.

- `fov: number` — Vertical degrees; 45 here
- `aspect: number` — CSS width/height

Properties applied to projection by updateProjectionMatrix.

- Math.sin/atan use radians. Also update near/far and world center.

```js
const v=THREE.MathUtils.degToRad(camera.fov),h=2*Math.atan(Math.tan(v/2)*camera.aspect);const d=radius/Math.sin(Math.min(v,h)/2)*margin;
```

[PerspectiveCamera.fov / aspect](https://threejs.org/docs/pages/PerspectiveCamera.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Materials, Loading, and Selection](../../02-experiments/README.md) · [Next: Orbit Controls and On-Demand Rendering](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
