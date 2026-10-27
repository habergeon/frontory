# Three.js · 27 Integrating the Scene Inspector

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Lifetimes, Accessibility, and Measurement · Editable example · Storage ID: `threejs-step-27`

## Goals and learning outcomes

- Animated has Left and Right plus one SlideLeft clip.
- Target becomes the selected object center and it appears at screen center.

## Prerequisites

Prerequisite units: 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26. Continue these concepts in this experiment.

## Key concepts and explanations

### Load a model into the inspector

Change sample static to animated and load. Scene, list and mixer change together only after success. Files exist only during this execution.

### Connect selection and camera

Select Right and press frame selected. Enable framing and apply because it starts disabled. Update camera position and direction from the Box3 center and size.

## Practice setup

Edit and run independent HTML in the site using Three.js 0.186.1. No separate installation or server is required. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Change sample static to animated and load. Scene, list and mixer change together only after success. Files exist only during this execution.
2. Select Right and press frame selected. Enable framing and apply because it starts disabled. Update camera position and direction from the Box3 center and size.
3. Load animated and press play. Change the starter speed 0 to 1 and apply. Left X changes with time. Inspect pause, then stop to rewind.
4. Enable the minimap and apply. Render the same scene to a target with a separate camera, then display it at bottom right. Change selection and animation and inspect both views.
5. Trigger invalid GLB, slow A then fast B and recover sample. List, selection, camera, playback and minimap controls survive failure and stale results. After recovery use keyboard selection, framing and playback again.

## Variables to observe

| Variable                        | Baseline | Change   | Expected change / hypothesis                         |
| ------------------------------- | -------- | -------- | ---------------------------------------------------- |
| Load a model into the inspector | starter  | solution | Animated has Left and Right plus one SlideLeft clip. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Animated has Left and Right plus one SlideLeft clip.
- [ ] Target becomes the selected object center and it appears at screen center.

## Self-check

1. What must survive a fallible load?
2. How is selection connected to the camera target?
3. Why uncache the mixer before model replacement?
4. Which update do you inspect when the minimap stops?
5. Which features must continue working together after failure?

## Official references

- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-27/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Complete the HTML exercises and record actual observations and conditions in the existing site notes.

- [example.html](../../../../../../../src/labs/threejs-step-27/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Change sample static to animated and load. Scene, list and mixer change together only after success. Files exist only during this execution.

### Prerequisite units

- `threejs-02`
- `threejs-step-15`
- `threejs-step-16`
- `threejs-step-17`
- `threejs-step-18`
- `threejs-step-19`
- `threejs-step-20`
- `threejs-step-21`
- `threejs-step-22`
- `threejs-step-23`
- `threejs-step-24`
- `threejs-step-25`
- `threejs-step-26`

### Load a model into the inspector

Change sample static to animated and load. Scene, list and mixer change together only after success. Files exist only during this execution.

**Expected result**

Animated has Left and Right plus one SlideLeft clip.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Load a model into the inspector</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Load a model into the inspector</h1>
    <p>
      Change sample static to animated and load. Scene, list and mixer change
      together only after success. Files exist only during this execution.
    </p>
    <p>
      These two-panel GLBs are authored here. Selected files exist only during
      execution and are excluded from backup. Select again after rerunning. Use
      self-contained uncompressed GLB up to 2 MiB, with embedded PNG/JPEG.
      External URIs, multi-file glTF, Draco, Meshopt and KTX2 are unsupported.
    </p>
    <div class="controls">
      <label
        >Sample<select id="model">
          <option selected>static</option>
          <option>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">Invalid GLB</button
      ><button id="recover">Recover sample</button
      ><label
        >GLB file<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label
        ><input id="guard" type="checkbox" checked />Generation
        protection</label
      ><label
        ><input id="stale" type="checkbox" checked />Release stale
        results</label
      ><label
        ><input id="framing" type="checkbox" checked />Enable framing</label
      ><label><input id="minimap" type="checkbox" checked />Minimap</label
      ><label>Objects<select id="objects"></select></label
      ><button id="frame">Frame selected</button
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">Apply</button><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Load a model into the inspector"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="Could not read GLB. Recover sample or select another file. Details: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Finish parsing before replacing the owned scene.

</details>

<details>
<summary>Solution and explanation</summary>

Animated has Left and Right plus one SlideLeft clip. Finish parsing before replacing the owned scene.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Load a model into the inspector</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Load a model into the inspector</h1>
    <p>
      Change sample static to animated and load. Scene, list and mixer change
      together only after success. Files exist only during this execution.
    </p>
    <p>
      These two-panel GLBs are authored here. Selected files exist only during
      execution and are excluded from backup. Select again after rerunning. Use
      self-contained uncompressed GLB up to 2 MiB, with embedded PNG/JPEG.
      External URIs, multi-file glTF, Draco, Meshopt and KTX2 are unsupported.
    </p>
    <div class="controls">
      <label
        >Sample<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">Invalid GLB</button
      ><button id="recover">Recover sample</button
      ><label
        >GLB file<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label
        ><input id="guard" type="checkbox" checked />Generation
        protection</label
      ><label
        ><input id="stale" type="checkbox" checked />Release stale
        results</label
      ><label
        ><input id="framing" type="checkbox" checked />Enable framing</label
      ><label><input id="minimap" type="checkbox" checked />Minimap</label
      ><label>Objects<select id="objects"></select></label
      ><button id="frame">Frame selected</button
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">Apply</button><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Load a model into the inspector"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="Could not read GLB. Recover sample or select another file. Details: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- What must survive a fallible load?

### Connect selection and camera

Select Right and press frame selected. Enable framing and apply because it starts disabled. Update camera position and direction from the Box3 center and size.

**Expected result**

Target becomes the selected object center and it appears at screen center.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Connect selection and camera</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Connect selection and camera</h1>
    <p>
      Select Right and press frame selected. Enable framing and apply because it
      starts disabled. Update camera position and direction from the Box3 center
      and size.
    </p>
    <p>
      These two-panel GLBs are authored here. Selected files exist only during
      execution and are excluded from backup. Select again after rerunning. Use
      self-contained uncompressed GLB up to 2 MiB, with embedded PNG/JPEG.
      External URIs, multi-file glTF, Draco, Meshopt and KTX2 are unsupported.
    </p>
    <div class="controls">
      <label
        >Sample<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">Invalid GLB</button
      ><button id="recover">Recover sample</button
      ><label
        >GLB file<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label
        ><input id="guard" type="checkbox" checked />Generation
        protection</label
      ><label
        ><input id="stale" type="checkbox" checked />Release stale
        results</label
      ><label><input id="framing" type="checkbox" />Enable framing</label
      ><label><input id="minimap" type="checkbox" checked />Minimap</label
      ><label>Objects<select id="objects"></select></label
      ><button id="frame">Frame selected</button
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">Apply</button><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Connect selection and camera"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="Could not read GLB. Recover sample or select another file. Details: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Position alone may leave the camera facing the old origin.

</details>

<details>
<summary>Solution and explanation</summary>

Target becomes the selected object center and it appears at screen center. Position alone may leave the camera facing the old origin.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Connect selection and camera</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Connect selection and camera</h1>
    <p>
      Select Right and press frame selected. Enable framing and apply because it
      starts disabled. Update camera position and direction from the Box3 center
      and size.
    </p>
    <p>
      These two-panel GLBs are authored here. Selected files exist only during
      execution and are excluded from backup. Select again after rerunning. Use
      self-contained uncompressed GLB up to 2 MiB, with embedded PNG/JPEG.
      External URIs, multi-file glTF, Draco, Meshopt and KTX2 are unsupported.
    </p>
    <div class="controls">
      <label
        >Sample<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">Invalid GLB</button
      ><button id="recover">Recover sample</button
      ><label
        >GLB file<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label
        ><input id="guard" type="checkbox" checked />Generation
        protection</label
      ><label
        ><input id="stale" type="checkbox" checked />Release stale
        results</label
      ><label
        ><input id="framing" type="checkbox" checked />Enable framing</label
      ><label><input id="minimap" type="checkbox" checked />Minimap</label
      ><label>Objects<select id="objects"></select></label
      ><button id="frame">Frame selected</button
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">Apply</button><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Connect selection and camera"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="Could not read GLB. Recover sample or select another file. Details: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- How is selection connected to the camera target?

### Control the loaded clip

Load animated and press play. Change the starter speed 0 to 1 and apply. Left X changes with time. Inspect pause, then stop to rewind.

**Expected result**

At speed=1 Left moves; pause keeps time and stop restores the initial position.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Control the loaded clip</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Control the loaded clip</h1>
    <p>
      Load animated and press play. Change the starter speed 0 to 1 and apply.
      Left X changes with time. Inspect pause, then stop to rewind.
    </p>
    <p>
      These two-panel GLBs are authored here. Selected files exist only during
      execution and are excluded from backup. Select again after rerunning. Use
      self-contained uncompressed GLB up to 2 MiB, with embedded PNG/JPEG.
      External URIs, multi-file glTF, Draco, Meshopt and KTX2 are unsupported.
    </p>
    <div class="controls">
      <label
        >Sample<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">Invalid GLB</button
      ><button id="recover">Recover sample</button
      ><label
        >GLB file<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label
        ><input id="guard" type="checkbox" checked />Generation
        protection</label
      ><label
        ><input id="stale" type="checkbox" checked />Release stale
        results</label
      ><label
        ><input id="framing" type="checkbox" checked />Enable framing</label
      ><label><input id="minimap" type="checkbox" checked />Minimap</label
      ><label>Objects<select id="objects"></select></label
      ><button id="frame">Frame selected</button
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed<input
          id="speed"
          type="number"
          value="0"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">Apply</button><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Control the loaded clip"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="Could not read GLB. Recover sample or select another file. Details: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Pass seconds to mixer.update.

</details>

<details>
<summary>Solution and explanation</summary>

At speed=1 Left moves; pause keeps time and stop restores the initial position. Pass seconds to mixer.update.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Control the loaded clip</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Control the loaded clip</h1>
    <p>
      Load animated and press play. Change the starter speed 0 to 1 and apply.
      Left X changes with time. Inspect pause, then stop to rewind.
    </p>
    <p>
      These two-panel GLBs are authored here. Selected files exist only during
      execution and are excluded from backup. Select again after rerunning. Use
      self-contained uncompressed GLB up to 2 MiB, with embedded PNG/JPEG.
      External URIs, multi-file glTF, Draco, Meshopt and KTX2 are unsupported.
    </p>
    <div class="controls">
      <label
        >Sample<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">Invalid GLB</button
      ><button id="recover">Recover sample</button
      ><label
        >GLB file<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label
        ><input id="guard" type="checkbox" checked />Generation
        protection</label
      ><label
        ><input id="stale" type="checkbox" checked />Release stale
        results</label
      ><label
        ><input id="framing" type="checkbox" checked />Enable framing</label
      ><label><input id="minimap" type="checkbox" checked />Minimap</label
      ><label>Objects<select id="objects"></select></label
      ><button id="frame">Frame selected</button
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">Apply</button><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Control the loaded clip"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="Could not read GLB. Recover sample or select another file. Details: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- Why uncache the mixer before model replacement?

### Connect motion to the minimap

Enable the minimap and apply. Render the same scene to a target with a separate camera, then display it at bottom right. Change selection and animation and inspect both views.

**Expected result**

Minimap on adds target and display passes to frame totals.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Connect motion to the minimap</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Connect motion to the minimap</h1>
    <p>
      Enable the minimap and apply. Render the same scene to a target with a
      separate camera, then display it at bottom right. Change selection and
      animation and inspect both views.
    </p>
    <p>
      These two-panel GLBs are authored here. Selected files exist only during
      execution and are excluded from backup. Select again after rerunning. Use
      self-contained uncompressed GLB up to 2 MiB, with embedded PNG/JPEG.
      External URIs, multi-file glTF, Draco, Meshopt and KTX2 are unsupported.
    </p>
    <div class="controls">
      <label
        >Sample<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">Invalid GLB</button
      ><button id="recover">Recover sample</button
      ><label
        >GLB file<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label
        ><input id="guard" type="checkbox" checked />Generation
        protection</label
      ><label
        ><input id="stale" type="checkbox" checked />Release stale
        results</label
      ><label
        ><input id="framing" type="checkbox" checked />Enable framing</label
      ><label><input id="minimap" type="checkbox" />Minimap</label
      ><label>Objects<select id="objects"></select></label
      ><button id="frame">Frame selected</button
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">Apply</button><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Connect motion to the minimap"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="Could not read GLB. Recover sample or select another file. Details: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Restore target, viewport and scissor in finally.

</details>

<details>
<summary>Solution and explanation</summary>

Minimap on adds target and display passes to frame totals. Restore target, viewport and scissor in finally.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Connect motion to the minimap</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Connect motion to the minimap</h1>
    <p>
      Enable the minimap and apply. Render the same scene to a target with a
      separate camera, then display it at bottom right. Change selection and
      animation and inspect both views.
    </p>
    <p>
      These two-panel GLBs are authored here. Selected files exist only during
      execution and are excluded from backup. Select again after rerunning. Use
      self-contained uncompressed GLB up to 2 MiB, with embedded PNG/JPEG.
      External URIs, multi-file glTF, Draco, Meshopt and KTX2 are unsupported.
    </p>
    <div class="controls">
      <label
        >Sample<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">Invalid GLB</button
      ><button id="recover">Recover sample</button
      ><label
        >GLB file<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label
        ><input id="guard" type="checkbox" checked />Generation
        protection</label
      ><label
        ><input id="stale" type="checkbox" checked />Release stale
        results</label
      ><label
        ><input id="framing" type="checkbox" checked />Enable framing</label
      ><label><input id="minimap" type="checkbox" checked />Minimap</label
      ><label>Objects<select id="objects"></select></label
      ><button id="frame">Frame selected</button
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">Apply</button><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Connect motion to the minimap"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="Could not read GLB. Recover sample or select another file. Details: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- Which update do you inspect when the minimap stops?

### Recover the inspector

Trigger invalid GLB, slow A then fast B and recover sample. List, selection, camera, playback and minimap controls survive failure and stale results. After recovery use keyboard selection, framing and playback again.

**Expected result**

Failure preserves the current scene; late A is released after B.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Recover the inspector</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Recover the inspector</h1>
    <p>
      Trigger invalid GLB, slow A then fast B and recover sample. List,
      selection, camera, playback and minimap controls survive failure and stale
      results. After recovery use keyboard selection, framing and playback
      again.
    </p>
    <p>
      These two-panel GLBs are authored here. Selected files exist only during
      execution and are excluded from backup. Select again after rerunning. Use
      self-contained uncompressed GLB up to 2 MiB, with embedded PNG/JPEG.
      External URIs, multi-file glTF, Draco, Meshopt and KTX2 are unsupported.
    </p>
    <div class="controls">
      <label
        >Sample<select id="model">
          <option selected>static</option>
          <option>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">Invalid GLB</button
      ><button id="recover">Recover sample</button
      ><label
        >GLB file<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label
        ><input id="guard" type="checkbox" checked />Generation
        protection</label
      ><label
        ><input id="stale" type="checkbox" checked />Release stale
        results</label
      ><label
        ><input id="framing" type="checkbox" checked />Enable framing</label
      ><label><input id="minimap" type="checkbox" checked />Minimap</label
      ><label>Objects<select id="objects"></select></label
      ><button id="frame">Frame selected</button
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">Apply</button><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Recover the inspector"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="Could not read GLB. Recover sample or select another file. Details: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Rebuild the list only on successful commit.

</details>

<details>
<summary>Solution and explanation</summary>

Failure preserves the current scene; late A is released after B. Rebuild the list only on successful commit.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Recover the inspector</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Recover the inspector</h1>
    <p>
      Trigger invalid GLB, slow A then fast B and recover sample. List,
      selection, camera, playback and minimap controls survive failure and stale
      results. After recovery use keyboard selection, framing and playback
      again.
    </p>
    <p>
      These two-panel GLBs are authored here. Selected files exist only during
      execution and are excluded from backup. Select again after rerunning. Use
      self-contained uncompressed GLB up to 2 MiB, with embedded PNG/JPEG.
      External URIs, multi-file glTF, Draco, Meshopt and KTX2 are unsupported.
    </p>
    <div class="controls">
      <label
        >Sample<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">Load sample</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">Invalid GLB</button
      ><button id="recover">Recover sample</button
      ><label
        >GLB file<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label
        ><input id="guard" type="checkbox" checked />Generation
        protection</label
      ><label
        ><input id="stale" type="checkbox" checked />Release stale
        results</label
      ><label
        ><input id="framing" type="checkbox" checked />Enable framing</label
      ><label><input id="minimap" type="checkbox" checked />Minimap</label
      ><label>Objects<select id="objects"></select></label
      ><button id="frame">Frame selected</button
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">Apply</button><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Recover the inspector"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="Could not read GLB. Recover sample or select another file. Details: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- Which features must continue working together after failure?

### API · AnimationMixer.update / uncacheRoot

Animated has Left and Right plus one SlideLeft clip. Finish parsing before replacing the owned scene.

- `deltaTime (update): number` — Elapsed seconds.
- `root (uncacheRoot): Object3D` — Animation root to uncache after stopping its actions.

update returns the AnimationMixer. uncacheRoot returns undefined and releases cached data for that root.

- Rebuild the list only on successful commit.

```js
mixer.update(deltaMs/1000); mixer.stopAllAction(); mixer.uncacheRoot(root);
```

[AnimationMixer.update / uncacheRoot](https://threejs.org/docs/pages/AnimationMixer.html) · three@0.186.1 · 2026-10-27

### API · Box3.setFromObject / getCenter

setFromObject computes world bounds. Reject empty bounds; use getCenter(target) and getSize(size) to update position and direction together.

- `object (setFromObject): Object3D` — Scene object for world bounds.
- `target (getCenter): Vector3` — Vector receiving the center.

setFromObject returns its Box3; getCenter returns the supplied Vector3. Check isEmpty before framing empty bounds.

- setFromObject computes world bounds. Reject empty bounds; use getCenter(target) and getSize(size) to update position and direction together.

```js
const box=new THREE.Box3().setFromObject(mesh);if(!box.isEmpty()){box.getCenter(targetPoint);camera.lookAt(targetPoint);}
```

[Box3.setFromObject / getCenter](https://threejs.org/docs/pages/Box3.html) · three@0.186.1 · 2026-10-27

### API · WebGLRenderTarget / setRenderTarget

Render the same scene into a target with another camera. A separate display scene samples target.texture. Save and restore state and dispose the target once.

- `width, height (constructor): number` — The example uses 128×128.
- `renderTarget (setRenderTarget): WebGLRenderTarget | null` — null means canvas; a target selects its texture destination.

new WebGLRenderTarget returns the target object. setRenderTarget and target.dispose return undefined.

- Render the same scene into a target with another camera. A separate display scene samples target.texture. Save and restore state and dispose the target once.

```js
const previous=renderer.getRenderTarget();try{renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(previous);}
```

[WebGLRenderTarget / setRenderTarget](https://threejs.org/docs/pages/WebGLRenderTarget.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Render Statistics and Profiling](../26/README.md) · [Next: Rendering Resources and Measurement](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
