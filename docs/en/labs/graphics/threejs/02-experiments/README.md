# Three.js · 14 Materials, Loading, and Selection

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Lighting, Materials, and Model Selection · Editable example · Storage ID: `threejs-02`

## Goals and learning outcomes

- Keep the UI usable after failure and highlight only the selected object.
- Leave other objects with a shared material unchanged.

## Prerequisites

Prerequisite units: 07, 09, 10, 13. Apply their concepts in these experiments.

## Key concepts and explanations

### GLB loading state and recovery

Remove the old model only after the replacement parses successfully. Failed requests preserve it. A request number rejects stale successful results and releases their real resources. This unit observes success/error recovery; unit 24 studies reversed completion order.

### Select model descendants

recursive=true tests descendants. Reading the canvas rectangle on every click preserves coordinates after resize. Replacing the file rebuilds the list for the current model and clears the old highlight.

## Practice setup

Edit and run independent HTML in the site using Three.js 0.186.1 and addons from the same installation. No separate installation or server is needed. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Import GLTFLoader from the same 0.186.1 installation as core. loader.parseAsync(buffer, "") reads an ArrayBuffer and resolves a Promise with scene and animations. status remains loading until await completes, then becomes ready or error. Loading and error text are HTML elements, readable even without WebGL objects.

This starter intentionally reads corrupt bytes, so re-running repeats the failure. Select static and click Load sample. Alternatively change the final sample('invalid') to sample('static') in the editor and run. Load textured to see the embedded 2×2 PNG on both panels. Try corrupt GLB again and confirm that the old model and HTML controls survive.

File input uses file.arrayBuffer(). Only self-contained GLB up to 2 MiB is accepted; external URIs and Draco/Meshopt/KTX2 are rejected before parsing. Multi-file .gltf is unsupported. Selected files exist only during this run and are excluded from backups. Reselect after re-run, reload, or restore. Restoring code/notes does not restore the selected file. 2. A GLB scene is a parent containing meshes. Passing only [root] with recursive=false misses its children because the parent has no triangles. Change recursive to true and click the left panel. NDC uses the current canvas rectangle; hits[0] is the nearest intersection.

Also select Left and Right from the object list. Both the list and ray call the same highlight function. Click empty space or Clear selection to restore color. Repeat with textured and after a file failure. The list displays names, while selection uses actual object references from the current meshes array. 3. Both static panels reference the same mesh and material indices in GLB. Check shared at load=true and material identity. With isolateMaterial=false, changing one shared color turns both panels orange.

Set isolateMaterial to true. Selection clones original material and assigns it only to the selected mesh. Before switching to Right, restore Left's original material and dispose the highlight clone. Clearing selection should restore blue and shared identity. In textured, original and clone still share map references, so clearing a highlight must not dispose the map.

## Variables to observe

| Variable  | Baseline         | Change      | Expected change / hypothesis                |
| --------- | ---------------- | ----------- | ------------------------------------------- |
| GLB bytes | Valid static GLB | Corrupt GLB | Existing model and UI survive a parse error |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep the UI usable after failure and highlight only the selected object.
- [ ] Leave other objects with a shared material unchanged.

## Self-check

1. What recovery problem results from removing the old model before parsing?
2. If the list works but ray selection fails, what would you inspect?
3. Which resources remain shared after material.clone()?

## Official references

- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)
- [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## Linked example and execution scope

[Example source](../../../../../../src/labs/threejs-02/example.en.html) · [Runtime environments and limits](../../../../examples.md)

Edit and run HTML starters inside the site. Complete the experiments and record actual results in notes.

- [example.html](../../../../../../src/labs/threejs-02/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Connect shared materials, surface color, asset errors, and ray selection from units 07, 09, 10, and 13 to a GLB model. glTF describes scenes, meshes, materials, and clips; GLB packages JSON and binary data into one file. Each step is an independent HTML document with two original panels. Predict before changing one condition, then record actual values, images, and reasons in site notes.

### Prerequisite units

- `threejs-step-07`
- `threejs-step-09`
- `threejs-step-10`
- `threejs-step-13`

### GLB loading state and recovery

Import GLTFLoader from the same 0.186.1 installation as core. loader.parseAsync(buffer, "") reads an ArrayBuffer and resolves a Promise with scene and animations. status remains loading until await completes, then becomes ready or error. Loading and error text are HTML elements, readable even without WebGL objects.

This starter intentionally reads corrupt bytes, so re-running repeats the failure. Select static and click Load sample. Alternatively change the final sample('invalid') to sample('static') in the editor and run. Load textured to see the embedded 2×2 PNG on both panels. Try corrupt GLB again and confirm that the old model and HTML controls survive.

File input uses file.arrayBuffer(). Only self-contained GLB up to 2 MiB is accepted; external URIs and Draco/Meshopt/KTX2 are rejected before parsing. Multi-file .gltf is unsupported. Selected files exist only during this run and are excluded from backups. Reselect after re-run, reload, or restore. Restoring code/notes does not restore the selected file.

**Expected result**

The starter reports error. Loading static gives ready and meshes=2. textured displays four colors; another corrupt input preserves the model and selection UI.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>GLB loading and recovery</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>GLB loading and recovery</h1>
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
        >Object
        <select id="objects">
          <option value="">—</option>
        </select></label
      ><button id="clear">Clear selection</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="GLB loading and recovery"></canvas>
    </div>
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

      const objects = document.querySelector('#objects'),
        raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      const recursive = true,
        isolateMaterial = true;
      let selected = null,
        original = null,
        highlightMaterial = null;
      function restoreSelection() {
        if (selected && original) {
          selected.material = original;
          if (highlightMaterial) {
            ownedMaterial.delete(highlightMaterial);
            highlightMaterial.dispose();
          } else original.color.copy(savedColor);
        }
        selected = null;
        original = null;
        highlightMaterial = null;
      }
      const savedColor = new THREE.Color();
      function highlight(mesh) {
        restoreSelection();
        if (mesh) {
          selected = mesh;
          original = mesh.material;
          savedColor.copy(original.color);
          if (isolateMaterial) {
            highlightMaterial = original.clone();
            ownedMaterial.add(highlightMaterial);
            mesh.material = highlightMaterial;
          }
          mesh.material.color.set('#f97316');
        }
        objects.value = mesh ? String(meshes.indexOf(mesh)) : '';
        draw();
      }
      on('#objects', 'change', (e) =>
        highlight(
          e.target.value === '' ? null : (meshes[Number(e.target.value)] ?? null),
        ),
      );
      on('#clear', 'click', () => highlight(null));
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          if (!root) return;
          const r = canvas.getBoundingClientRect();
          pointer.set(
            (2 * (e.clientX - r.left)) / r.width - 1,
            1 - (2 * (e.clientY - r.top)) / r.height,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          highlight(raycaster.intersectObjects([root], recursive)[0]?.object ?? null);
        },
        { signal: events.signal },
      );

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
          objects.replaceChildren(
            new Option('—', ''),
            ...meshes.map((m, i) => new Option(m.name, String(i))),
          );

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
      sample('invalid');
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
          ' / selected: ' +
          (selected?.name ?? '—') +
          ' / colors: ' +
          meshes.map((m) => m.material.color.getHexString()).join(',');
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

- Check that the model selector and buttons remain usable after an error.
- Re-running repeats corrupt input too. Explicitly choose and load static.
- Change the final sample('invalid') to sample('static') to change startup.

</details>

<details>
<summary>Solution and explanation</summary>

Remove the old model only after the replacement parses successfully. Failed requests preserve it. A request number rejects stale successful results and releases their real resources. This unit observes success/error recovery; unit 24 studies reversed completion order.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>GLB loading and recovery</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>GLB loading and recovery</h1>
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
        >Object
        <select id="objects">
          <option value="">—</option>
        </select></label
      ><button id="clear">Clear selection</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="GLB loading and recovery"></canvas>
    </div>
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

      const objects = document.querySelector('#objects'),
        raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      const recursive = true,
        isolateMaterial = true;
      let selected = null,
        original = null,
        highlightMaterial = null;
      function restoreSelection() {
        if (selected && original) {
          selected.material = original;
          if (highlightMaterial) {
            ownedMaterial.delete(highlightMaterial);
            highlightMaterial.dispose();
          } else original.color.copy(savedColor);
        }
        selected = null;
        original = null;
        highlightMaterial = null;
      }
      const savedColor = new THREE.Color();
      function highlight(mesh) {
        restoreSelection();
        if (mesh) {
          selected = mesh;
          original = mesh.material;
          savedColor.copy(original.color);
          if (isolateMaterial) {
            highlightMaterial = original.clone();
            ownedMaterial.add(highlightMaterial);
            mesh.material = highlightMaterial;
          }
          mesh.material.color.set('#f97316');
        }
        objects.value = mesh ? String(meshes.indexOf(mesh)) : '';
        draw();
      }
      on('#objects', 'change', (e) =>
        highlight(
          e.target.value === '' ? null : (meshes[Number(e.target.value)] ?? null),
        ),
      );
      on('#clear', 'click', () => highlight(null));
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          if (!root) return;
          const r = canvas.getBoundingClientRect();
          pointer.set(
            (2 * (e.clientX - r.left)) / r.width - 1,
            1 - (2 * (e.clientY - r.top)) / r.height,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          highlight(raycaster.intersectObjects([root], recursive)[0]?.object ?? null);
        },
        { signal: events.signal },
      );

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
          objects.replaceChildren(
            new Option('—', ''),
            ...meshes.map((m, i) => new Option(m.name, String(i))),
          );

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
      sample('static');
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
          ' / selected: ' +
          (selected?.name ?? '—') +
          ' / colors: ' +
          meshes.map((m) => m.material.color.getHexString()).join(',');
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

- What recovery problem results from removing the old model before parsing?
- Why must a file be selected again after restoring a backup?

### Select model descendants

A GLB scene is a parent containing meshes. Passing only [root] with recursive=false misses its children because the parent has no triangles. Change recursive to true and click the left panel. NDC uses the current canvas rectangle; hits[0] is the nearest intersection.

Also select Left and Right from the object list. Both the list and ray call the same highlight function. Click empty space or Clear selection to restore color. Repeat with textured and after a file failure. The list displays names, while selection uses actual object references from the current meshes array.

**Expected result**

With false, ray clicks miss while the list works. With true, clicking Left/Right turns only that object orange.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Select objects inside a model</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Select objects inside a model</h1>
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
        >Object
        <select id="objects">
          <option value="">—</option>
        </select></label
      ><button id="clear">Clear selection</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Select objects inside a model"></canvas>
    </div>
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

      const objects = document.querySelector('#objects'),
        raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      const recursive = false,
        isolateMaterial = true;
      let selected = null,
        original = null,
        highlightMaterial = null;
      function restoreSelection() {
        if (selected && original) {
          selected.material = original;
          if (highlightMaterial) {
            ownedMaterial.delete(highlightMaterial);
            highlightMaterial.dispose();
          } else original.color.copy(savedColor);
        }
        selected = null;
        original = null;
        highlightMaterial = null;
      }
      const savedColor = new THREE.Color();
      function highlight(mesh) {
        restoreSelection();
        if (mesh) {
          selected = mesh;
          original = mesh.material;
          savedColor.copy(original.color);
          if (isolateMaterial) {
            highlightMaterial = original.clone();
            ownedMaterial.add(highlightMaterial);
            mesh.material = highlightMaterial;
          }
          mesh.material.color.set('#f97316');
        }
        objects.value = mesh ? String(meshes.indexOf(mesh)) : '';
        draw();
      }
      on('#objects', 'change', (e) =>
        highlight(
          e.target.value === '' ? null : (meshes[Number(e.target.value)] ?? null),
        ),
      );
      on('#clear', 'click', () => highlight(null));
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          if (!root) return;
          const r = canvas.getBoundingClientRect();
          pointer.set(
            (2 * (e.clientX - r.left)) / r.width - 1,
            1 - (2 * (e.clientY - r.top)) / r.height,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          highlight(raycaster.intersectObjects([root], recursive)[0]?.object ?? null);
        },
        { signal: events.signal },
      );

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
          objects.replaceChildren(
            new Option('—', ''),
            ...meshes.map((m, i) => new Option(m.name, String(i))),
          );

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
      sample('static');
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
          ' / selected: ' +
          (selected?.name ?? '—') +
          ' / colors: ' +
          meshes.map((m) => m.material.color.getHexString()).join(',');
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

- Distinguish root from its descendant Mesh objects.
- Change recursive separately from NDC.
- Set const recursive=true and compare clicks, the list, and empty space.

</details>

<details>
<summary>Solution and explanation</summary>

recursive=true tests descendants. Reading the canvas rectangle on every click preserves coordinates after resize. Replacing the file rebuilds the list for the current model and clears the old highlight.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Select objects inside a model</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Select objects inside a model</h1>
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
        >Object
        <select id="objects">
          <option value="">—</option>
        </select></label
      ><button id="clear">Clear selection</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Select objects inside a model"></canvas>
    </div>
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

      const objects = document.querySelector('#objects'),
        raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      const recursive = true,
        isolateMaterial = true;
      let selected = null,
        original = null,
        highlightMaterial = null;
      function restoreSelection() {
        if (selected && original) {
          selected.material = original;
          if (highlightMaterial) {
            ownedMaterial.delete(highlightMaterial);
            highlightMaterial.dispose();
          } else original.color.copy(savedColor);
        }
        selected = null;
        original = null;
        highlightMaterial = null;
      }
      const savedColor = new THREE.Color();
      function highlight(mesh) {
        restoreSelection();
        if (mesh) {
          selected = mesh;
          original = mesh.material;
          savedColor.copy(original.color);
          if (isolateMaterial) {
            highlightMaterial = original.clone();
            ownedMaterial.add(highlightMaterial);
            mesh.material = highlightMaterial;
          }
          mesh.material.color.set('#f97316');
        }
        objects.value = mesh ? String(meshes.indexOf(mesh)) : '';
        draw();
      }
      on('#objects', 'change', (e) =>
        highlight(
          e.target.value === '' ? null : (meshes[Number(e.target.value)] ?? null),
        ),
      );
      on('#clear', 'click', () => highlight(null));
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          if (!root) return;
          const r = canvas.getBoundingClientRect();
          pointer.set(
            (2 * (e.clientX - r.left)) / r.width - 1,
            1 - (2 * (e.clientY - r.top)) / r.height,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          highlight(raycaster.intersectObjects([root], recursive)[0]?.object ?? null);
        },
        { signal: events.signal },
      );

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
          objects.replaceChildren(
            new Option('—', ''),
            ...meshes.map((m, i) => new Option(m.name, String(i))),
          );

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
      sample('static');
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
          ' / selected: ' +
          (selected?.name ?? '—') +
          ' / colors: ' +
          meshes.map((m) => m.material.color.getHexString()).join(',');
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

- If the list works but ray selection fails, what would you inspect?
- How should old object references be handled when replacing a model?

### Highlight and restore shared materials

Both static panels reference the same mesh and material indices in GLB. Check shared at load=true and material identity. With isolateMaterial=false, changing one shared color turns both panels orange.

Set isolateMaterial to true. Selection clones original material and assigns it only to the selected mesh. Before switching to Right, restore Left's original material and dispose the highlight clone. Clearing selection should restore blue and shared identity. In textured, original and clone still share map references, so clearing a highlight must not dispose the map.

**Expected result**

With false, one selection changes both colors. With true, only the selected panel changes; switching or clearing restores colors and shared identity.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Highlight and restore shared materials</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Highlight and restore shared materials</h1>
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
        >Object
        <select id="objects">
          <option value="">—</option>
        </select></label
      ><button id="clear">Clear selection</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Highlight and restore shared materials"></canvas>
    </div>
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

      const objects = document.querySelector('#objects'),
        raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      const recursive = true,
        isolateMaterial = false;
      let selected = null,
        original = null,
        highlightMaterial = null;
      function restoreSelection() {
        if (selected && original) {
          selected.material = original;
          if (highlightMaterial) {
            ownedMaterial.delete(highlightMaterial);
            highlightMaterial.dispose();
          } else original.color.copy(savedColor);
        }
        selected = null;
        original = null;
        highlightMaterial = null;
      }
      const savedColor = new THREE.Color();
      function highlight(mesh) {
        restoreSelection();
        if (mesh) {
          selected = mesh;
          original = mesh.material;
          savedColor.copy(original.color);
          if (isolateMaterial) {
            highlightMaterial = original.clone();
            ownedMaterial.add(highlightMaterial);
            mesh.material = highlightMaterial;
          }
          mesh.material.color.set('#f97316');
        }
        objects.value = mesh ? String(meshes.indexOf(mesh)) : '';
        draw();
      }
      on('#objects', 'change', (e) =>
        highlight(
          e.target.value === '' ? null : (meshes[Number(e.target.value)] ?? null),
        ),
      );
      on('#clear', 'click', () => highlight(null));
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          if (!root) return;
          const r = canvas.getBoundingClientRect();
          pointer.set(
            (2 * (e.clientX - r.left)) / r.width - 1,
            1 - (2 * (e.clientY - r.top)) / r.height,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          highlight(raycaster.intersectObjects([root], recursive)[0]?.object ?? null);
        },
        { signal: events.signal },
      );

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
          objects.replaceChildren(
            new Option('—', ''),
            ...meshes.map((m, i) => new Option(m.name, String(i))),
          );

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
      sample('static');
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
          ' / selected: ' +
          (selected?.name ?? '—') +
          ' / colors: ' +
          meshes.map((m) => m.material.color.getHexString()).join(',');
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

- Check whether the two materials are === before selection.
- Assign the clone only to the selected Mesh.
- Set isolateMaterial=true and compare Left → Right → Clear selection.

</details>

<details>
<summary>Solution and explanation</summary>

clone separates the material, not its textures. Restoring selection before replacement/cleanup allows original resources to be deduplicated in Sets and released once. Dispose resources releases actual geometry/material/texture and renderer and ignores repeated calls. Use the site Run action to create a new iframe for another experiment.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Highlight and restore shared materials</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Highlight and restore shared materials</h1>
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
        >Object
        <select id="objects">
          <option value="">—</option>
        </select></label
      ><button id="clear">Clear selection</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Highlight and restore shared materials"></canvas>
    </div>
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

      const objects = document.querySelector('#objects'),
        raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2();
      const recursive = true,
        isolateMaterial = true;
      let selected = null,
        original = null,
        highlightMaterial = null;
      function restoreSelection() {
        if (selected && original) {
          selected.material = original;
          if (highlightMaterial) {
            ownedMaterial.delete(highlightMaterial);
            highlightMaterial.dispose();
          } else original.color.copy(savedColor);
        }
        selected = null;
        original = null;
        highlightMaterial = null;
      }
      const savedColor = new THREE.Color();
      function highlight(mesh) {
        restoreSelection();
        if (mesh) {
          selected = mesh;
          original = mesh.material;
          savedColor.copy(original.color);
          if (isolateMaterial) {
            highlightMaterial = original.clone();
            ownedMaterial.add(highlightMaterial);
            mesh.material = highlightMaterial;
          }
          mesh.material.color.set('#f97316');
        }
        objects.value = mesh ? String(meshes.indexOf(mesh)) : '';
        draw();
      }
      on('#objects', 'change', (e) =>
        highlight(
          e.target.value === '' ? null : (meshes[Number(e.target.value)] ?? null),
        ),
      );
      on('#clear', 'click', () => highlight(null));
      canvas.addEventListener(
        'pointerdown',
        (e) => {
          if (!root) return;
          const r = canvas.getBoundingClientRect();
          pointer.set(
            (2 * (e.clientX - r.left)) / r.width - 1,
            1 - (2 * (e.clientY - r.top)) / r.height,
          );
          scene.updateMatrixWorld(true);
          camera.updateMatrixWorld(true);
          raycaster.setFromCamera(pointer, camera);
          highlight(raycaster.intersectObjects([root], recursive)[0]?.object ?? null);
        },
        { signal: events.signal },
      );

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
          objects.replaceChildren(
            new Option('—', ''),
            ...meshes.map((m, i) => new Option(m.name, String(i))),
          );

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
      sample('static');
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
          ' / selected: ' +
          (selected?.name ?? '—') +
          ' / colors: ' +
          meshes.map((m) => m.material.color.getHexString()).join(',');
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

- Which resources remain shared after material.clone()?
- Why is disposing the texture with the old highlight clone a problem?

### API · GLTFLoader.parseAsync

Asynchronously parses a GLB ArrayBuffer into scene and animations.

- `data: ArrayBuffer` — File arrayBuffer or embedded GLB bytes
- `path: string` — Empty here; external assets are unsupported

Returns Promise<GLTF>; rejects on failure.

- Use the addon from the same installation. This example rejects external GLB URIs and does not install compression decoders.

```js
const gltf=await loader.parseAsync(await file.arrayBuffer(),''); scene.add(gltf.scene);
```

[GLTFLoader.parseAsync](https://threejs.org/docs/pages/GLTFLoader.html) · three@0.186.1 · 2026-10-27

### API · Material.clone

Separates the selected mesh material for independent changes.

Returns a new Material.

- Textures remain shared. Restore the original reference, then dispose only the highlight clone.

```js
const original=mesh.material; mesh.material=original.clone(); mesh.material.color.set(0xf97316);
```

[Material.clone](https://threejs.org/docs/pages/Material.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Normalized Coordinates and Selection](../units/13/README.md) · [Next: Model Size and Camera Fitting](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
