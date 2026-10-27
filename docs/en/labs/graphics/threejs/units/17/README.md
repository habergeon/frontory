# Three.js · 17 Clip Animation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Animation, Instancing, and Render Passes · Editable example · Storage ID: `threejs-step-17`

## Goals and learning outcomes

- Keep the UI available for models without clips.
- Distinguish time in seconds from playback speed.

## Prerequisites

Prerequisite units: 01, 14, 16. Apply their concepts in these experiments.

## Key concepts and explanations

### Clip list and clipless models

Do not use clips[0] unconditionally when no clip exists. Stop all actions and uncacheRoot before replacing the model, then make a mixer for the new root. Geometry/material disposal is separate from clearing mixer caches.

### Convert milliseconds to seconds

Converting delta to seconds makes playback depend on elapsed time rather than frame count. timeScale scales that seconds delta. Do not apply speed twice by multiplying both delta and timeScale.

## Practice setup

Edit and run independent HTML in the site using Three.js 0.186.1 and addons from the same installation. No separate installation or server is needed. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. The starter loads static, with an empty clips array. Successful parsing does not imply animation. Read ready and No clips. Playback buttons are disabled, while model/file and recovery controls remain available. Load animated or change the final sample('static') to sample('animated').

Read names and duration from the loader result animations array. new THREE.AnimationMixer(root) targets this model; mixer.clipAction(clips[0]) returns an action, and action.play() schedules it for evaluation. animated has SlideLeft with duration=1 second. Repeat static → animated → static and check that previous playback does not remain active. 2. Animation timestamps use milliseconds; AnimationMixer.update(delta) expects seconds. seconds=false passes now-last directly and advances mixer time 1000× too fast. Set seconds=true and read actual delta such as .016s together with mixer time. A 60Hz rate is not guaranteed, so do not hard-code delta=.016.

Play after pause resets last=0 so waiting time is not added in one step. Compare mixer.time growth over about one real second. Left loops from X=-1.1 to -.1, so X alone cannot reveal total elapsed time. Compare at speed 1, then use 2 and check roughly twice the mixer-time growth over equal wall time. 3. The starter prepares an action but playing=false leaves time unchanged. Click Play and read X and mixer time. Pause preserves the pose using action.paused=true; Play resumes from it. Stop and rewind uses action.stop(), reset(), and mixer.time=0 to restore the start pose.

Enter speed=2 and Apply speed. mixer.timeScale=2 evaluates twice as fast over equal real time. Speed 0 is valid and leaves UI live. Compare stop → play, loading clipless static, and loading animated again. Cleanup separately stops the loop, calls stopAllAction()/uncacheRoot(root), and releases actual model resources.

## Variables to observe

| Variable  | Baseline | Change | Expected change / hypothesis                                  |
| --------- | -------- | ------ | ------------------------------------------------------------- |
| timeScale | 1        | 2      | Mixer time advances about twice as much over equal real time. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep the UI available for models without clips.
- [ ] Distinguish time in seconds from playback speed.

## Self-check

1. Should a valid model without clips be treated as a load error?
2. Why does a delta fixed for 60Hz cause trouble?
3. How do pause and stop differ for the pose?

## Official references

- [Three.js AnimationMixer](https://threejs.org/docs/pages/AnimationMixer.html)
- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-17/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run HTML starters inside the site. Complete the experiments and record actual results in notes.

- [example.html](../../../../../../../src/labs/threejs-step-17/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Connect time, models, and update flow from 01, 14, and 16 to clip playback. A clip stores timed values, an action stores playback state, and a mixer evaluates actions for one model. animated moves Left over one second; static has no clips. Record playback state, time in seconds, and actual X together.

### Prerequisite units

- `threejs-01`
- `threejs-02`
- `threejs-step-16`

### Clip list and clipless models

The starter loads static, with an empty clips array. Successful parsing does not imply animation. Read ready and No clips. Playback buttons are disabled, while model/file and recovery controls remain available. Load animated or change the final sample('static') to sample('animated').

Read names and duration from the loader result animations array. new THREE.AnimationMixer(root) targets this model; mixer.clipAction(clips[0]) returns an action, and action.play() schedules it for evaluation. animated has SlideLeft with duration=1 second. Repeat static → animated → static and check that previous playback does not remain active.

**Expected result**

static gives ready, clips=[], and disabled playback with other UI live. animated shows SlideLeft:1s and a moving Left panel.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Clips and clipless models</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Clips and clipless models</h1>
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
        >Clip
        <select id="clips"></select></label
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.25"
          value="1" /></label
      ><button id="apply">Apply speed</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Clips and clipless models"></canvas>
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
      const restoreSelection = () => {};

      let mixer = null,
        clips = [],
        action = null,
        playing = false,
        last = 0,
        delta = 0,
        speed = Number(document.querySelector('#value').value);
      const seconds = true;
      function clearMixer() {
        playing = false;
        if (mixer && root) {
          mixer.stopAllAction();
          mixer.uncacheRoot(root);
        }
        mixer = null;
        action = null;
        clips = [];
      }
      function setupAnimation(gltf) {
        clips = gltf.animations;
        document
          .querySelector('#clips')
          .replaceChildren(...clips.map((c, i) => new Option(c.name, String(i))));
        mixer = new THREE.AnimationMixer(root);
        if (clips.length) {
          action = mixer.clipAction(clips[0]);
          action.play();
          playing = true;
          mixer.timeScale = speed;
        } else {
          document.querySelector('#clips').append(new Option('No clips', ''));
          error.textContent = 'No clips: model and file controls remain available.';
        }
        for (const id of ['play', 'pause', 'stop'])
          document.querySelector('#' + id).disabled = !clips.length;
      }
      on('#play', 'click', () => {
        if (!action) return;
        action.play();
        action.paused = false;
        playing = true;
        last = 0;
      });
      on('#pause', 'click', () => {
        playing = false;
        if (action) action.paused = true;
        draw();
      });
      on('#stop', 'click', () => {
        playing = false;
        if (action) {
          action.stop();
          action.reset();
        }
        if (mixer) {
          mixer.time = 0;
          mixer.update(0);
        }
        draw();
      });
      on('#clips', 'change', (e) => {
        if (!mixer || !clips.length) return;
        mixer.stopAllAction();
        action = mixer.clipAction(clips[Number(e.target.value)]);
        action.reset().play();
        playing = true;
        last = 0;
      });
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        speed = Number(input.value);
        if (mixer) mixer.timeScale = speed;
        draw();
      });
      function animate(now) {
        if (disposed) return;
        delta = last ? (now - last) / (seconds ? 1000 : 1) : 0;
        last = now;
        if (playing && mixer) {
          mixer.update(delta);
          draw();
        }
      }
      renderer.setAnimationLoop(animate);

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

          setupAnimation(gltf);
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
          ' / clips: ' +
          clips.map((c) => c.name + ':' + c.duration + 's') +
          ' / playing: ' +
          playing +
          ' / delta: ' +
          delta.toFixed(4) +
          's / mixer: ' +
          (mixer?.time ?? 0).toFixed(3) +
          's / speed: ' +
          speed +
          ' / X: ' +
          (meshes[0]?.position.x ?? 0).toFixed(3);
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

- status and clips.length are different facts.
- Select animated from built-in models.
- Start with sample('animated') and read SlideLeft duration.

</details>

<details>
<summary>Solution and explanation</summary>

Do not use clips[0] unconditionally when no clip exists. Stop all actions and uncacheRoot before replacing the model, then make a mixer for the new root. Geometry/material disposal is separate from clearing mixer caches.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Clips and clipless models</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Clips and clipless models</h1>
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
        >Clip
        <select id="clips"></select></label
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.25"
          value="1" /></label
      ><button id="apply">Apply speed</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Clips and clipless models"></canvas>
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
      const restoreSelection = () => {};

      let mixer = null,
        clips = [],
        action = null,
        playing = false,
        last = 0,
        delta = 0,
        speed = Number(document.querySelector('#value').value);
      const seconds = true;
      function clearMixer() {
        playing = false;
        if (mixer && root) {
          mixer.stopAllAction();
          mixer.uncacheRoot(root);
        }
        mixer = null;
        action = null;
        clips = [];
      }
      function setupAnimation(gltf) {
        clips = gltf.animations;
        document
          .querySelector('#clips')
          .replaceChildren(...clips.map((c, i) => new Option(c.name, String(i))));
        mixer = new THREE.AnimationMixer(root);
        if (clips.length) {
          action = mixer.clipAction(clips[0]);
          action.play();
          playing = true;
          mixer.timeScale = speed;
        } else {
          document.querySelector('#clips').append(new Option('No clips', ''));
          error.textContent = 'No clips: model and file controls remain available.';
        }
        for (const id of ['play', 'pause', 'stop'])
          document.querySelector('#' + id).disabled = !clips.length;
      }
      on('#play', 'click', () => {
        if (!action) return;
        action.play();
        action.paused = false;
        playing = true;
        last = 0;
      });
      on('#pause', 'click', () => {
        playing = false;
        if (action) action.paused = true;
        draw();
      });
      on('#stop', 'click', () => {
        playing = false;
        if (action) {
          action.stop();
          action.reset();
        }
        if (mixer) {
          mixer.time = 0;
          mixer.update(0);
        }
        draw();
      });
      on('#clips', 'change', (e) => {
        if (!mixer || !clips.length) return;
        mixer.stopAllAction();
        action = mixer.clipAction(clips[Number(e.target.value)]);
        action.reset().play();
        playing = true;
        last = 0;
      });
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        speed = Number(input.value);
        if (mixer) mixer.timeScale = speed;
        draw();
      });
      function animate(now) {
        if (disposed) return;
        delta = last ? (now - last) / (seconds ? 1000 : 1) : 0;
        last = now;
        if (playing && mixer) {
          mixer.update(delta);
          draw();
        }
      }
      renderer.setAnimationLoop(animate);

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

          setupAnimation(gltf);
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
      sample('animated');
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
          ' / clips: ' +
          clips.map((c) => c.name + ':' + c.duration + 's') +
          ' / playing: ' +
          playing +
          ' / delta: ' +
          delta.toFixed(4) +
          's / mixer: ' +
          (mixer?.time ?? 0).toFixed(3) +
          's / speed: ' +
          speed +
          ' / X: ' +
          (meshes[0]?.position.x ?? 0).toFixed(3);
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

- Should a valid model without clips be treated as a load error?
- Why clear the previous mixer root when switching models?

### Convert milliseconds to seconds

Animation timestamps use milliseconds; AnimationMixer.update(delta) expects seconds. seconds=false passes now-last directly and advances mixer time 1000× too fast. Set seconds=true and read actual delta such as .016s together with mixer time. A 60Hz rate is not guaranteed, so do not hard-code delta=.016.

Play after pause resets last=0 so waiting time is not added in one step. Compare mixer.time growth over about one real second. Left loops from X=-1.1 to -.1, so X alone cannot reveal total elapsed time. Compare at speed 1, then use 2 and check roughly twice the mixer-time growth over equal wall time.

**Expected result**

false advances mixer roughly 1000× real time. At true and speed=1, about one real second adds about one mixer second.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Mixer time in seconds</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Mixer time in seconds</h1>
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
        >Clip
        <select id="clips"></select></label
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.25"
          value="1" /></label
      ><button id="apply">Apply speed</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Mixer time in seconds"></canvas></div>
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

      let mixer = null,
        clips = [],
        action = null,
        playing = false,
        last = 0,
        delta = 0,
        speed = Number(document.querySelector('#value').value);
      const seconds = false;
      function clearMixer() {
        playing = false;
        if (mixer && root) {
          mixer.stopAllAction();
          mixer.uncacheRoot(root);
        }
        mixer = null;
        action = null;
        clips = [];
      }
      function setupAnimation(gltf) {
        clips = gltf.animations;
        document
          .querySelector('#clips')
          .replaceChildren(...clips.map((c, i) => new Option(c.name, String(i))));
        mixer = new THREE.AnimationMixer(root);
        if (clips.length) {
          action = mixer.clipAction(clips[0]);
          action.play();
          playing = true;
          mixer.timeScale = speed;
        } else {
          document.querySelector('#clips').append(new Option('No clips', ''));
          error.textContent = 'No clips: model and file controls remain available.';
        }
        for (const id of ['play', 'pause', 'stop'])
          document.querySelector('#' + id).disabled = !clips.length;
      }
      on('#play', 'click', () => {
        if (!action) return;
        action.play();
        action.paused = false;
        playing = true;
        last = 0;
      });
      on('#pause', 'click', () => {
        playing = false;
        if (action) action.paused = true;
        draw();
      });
      on('#stop', 'click', () => {
        playing = false;
        if (action) {
          action.stop();
          action.reset();
        }
        if (mixer) {
          mixer.time = 0;
          mixer.update(0);
        }
        draw();
      });
      on('#clips', 'change', (e) => {
        if (!mixer || !clips.length) return;
        mixer.stopAllAction();
        action = mixer.clipAction(clips[Number(e.target.value)]);
        action.reset().play();
        playing = true;
        last = 0;
      });
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        speed = Number(input.value);
        if (mixer) mixer.timeScale = speed;
        draw();
      });
      function animate(now) {
        if (disposed) return;
        delta = last ? (now - last) / (seconds ? 1000 : 1) : 0;
        last = now;
        if (playing && mixer) {
          mixer.update(delta);
          draw();
        }
      }
      renderer.setAnimationLoop(animate);

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

          setupAnimation(gltf);
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
      sample('animated');
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
          ' / clips: ' +
          clips.map((c) => c.name + ':' + c.duration + 's') +
          ' / playing: ' +
          playing +
          ' / delta: ' +
          delta.toFixed(4) +
          's / mixer: ' +
          (mixer?.time ?? 0).toFixed(3) +
          's / speed: ' +
          speed +
          ' / X: ' +
          (meshes[0]?.position.x ?? 0).toFixed(3);
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

- Distinguish timestamp from its difference to the prior frame.
- (now-last)/1000 is seconds.
- Set seconds=true and measure at speed=1.

</details>

<details>
<summary>Solution and explanation</summary>

Converting delta to seconds makes playback depend on elapsed time rather than frame count. timeScale scales that seconds delta. Do not apply speed twice by multiplying both delta and timeScale.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Mixer time in seconds</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Mixer time in seconds</h1>
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
        >Clip
        <select id="clips"></select></label
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.25"
          value="1" /></label
      ><button id="apply">Apply speed</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Mixer time in seconds"></canvas></div>
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

      let mixer = null,
        clips = [],
        action = null,
        playing = false,
        last = 0,
        delta = 0,
        speed = Number(document.querySelector('#value').value);
      const seconds = true;
      function clearMixer() {
        playing = false;
        if (mixer && root) {
          mixer.stopAllAction();
          mixer.uncacheRoot(root);
        }
        mixer = null;
        action = null;
        clips = [];
      }
      function setupAnimation(gltf) {
        clips = gltf.animations;
        document
          .querySelector('#clips')
          .replaceChildren(...clips.map((c, i) => new Option(c.name, String(i))));
        mixer = new THREE.AnimationMixer(root);
        if (clips.length) {
          action = mixer.clipAction(clips[0]);
          action.play();
          playing = true;
          mixer.timeScale = speed;
        } else {
          document.querySelector('#clips').append(new Option('No clips', ''));
          error.textContent = 'No clips: model and file controls remain available.';
        }
        for (const id of ['play', 'pause', 'stop'])
          document.querySelector('#' + id).disabled = !clips.length;
      }
      on('#play', 'click', () => {
        if (!action) return;
        action.play();
        action.paused = false;
        playing = true;
        last = 0;
      });
      on('#pause', 'click', () => {
        playing = false;
        if (action) action.paused = true;
        draw();
      });
      on('#stop', 'click', () => {
        playing = false;
        if (action) {
          action.stop();
          action.reset();
        }
        if (mixer) {
          mixer.time = 0;
          mixer.update(0);
        }
        draw();
      });
      on('#clips', 'change', (e) => {
        if (!mixer || !clips.length) return;
        mixer.stopAllAction();
        action = mixer.clipAction(clips[Number(e.target.value)]);
        action.reset().play();
        playing = true;
        last = 0;
      });
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        speed = Number(input.value);
        if (mixer) mixer.timeScale = speed;
        draw();
      });
      function animate(now) {
        if (disposed) return;
        delta = last ? (now - last) / (seconds ? 1000 : 1) : 0;
        last = now;
        if (playing && mixer) {
          mixer.update(delta);
          draw();
        }
      }
      renderer.setAnimationLoop(animate);

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

          setupAnimation(gltf);
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
      sample('animated');
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
          ' / clips: ' +
          clips.map((c) => c.name + ':' + c.duration + 's') +
          ' / playing: ' +
          playing +
          ' / delta: ' +
          delta.toFixed(4) +
          's / mixer: ' +
          (mixer?.time ?? 0).toFixed(3) +
          's / speed: ' +
          speed +
          ' / X: ' +
          (meshes[0]?.position.x ?? 0).toFixed(3);
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

- Why does a delta fixed for 60Hz cause trouble?
- Why does looping X differ from mixer.time?

### Action play, pause, stop, and speed

The starter prepares an action but playing=false leaves time unchanged. Click Play and read X and mixer time. Pause preserves the pose using action.paused=true; Play resumes from it. Stop and rewind uses action.stop(), reset(), and mixer.time=0 to restore the start pose.

Enter speed=2 and Apply speed. mixer.timeScale=2 evaluates twice as fast over equal real time. Speed 0 is valid and leaves UI live. Compare stop → play, loading clipless static, and loading animated again. Cleanup separately stops the loop, calls stopAllAction()/uncacheRoot(root), and releases actual model resources.

**Expected result**

While paused, X and mixer.time stay fixed; Play resumes. Stop gives time=0 and Left X=-1.1. speed=2 runs twice as fast as 1.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Play, stop, and speed</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Play, stop, and speed</h1>
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
        >Clip
        <select id="clips"></select></label
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.25"
          value="1" /></label
      ><button id="apply">Apply speed</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Play, stop, and speed"></canvas></div>
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

      let mixer = null,
        clips = [],
        action = null,
        playing = false,
        last = 0,
        delta = 0,
        speed = Number(document.querySelector('#value').value);
      const seconds = true;
      function clearMixer() {
        playing = false;
        if (mixer && root) {
          mixer.stopAllAction();
          mixer.uncacheRoot(root);
        }
        mixer = null;
        action = null;
        clips = [];
      }
      function setupAnimation(gltf) {
        clips = gltf.animations;
        document
          .querySelector('#clips')
          .replaceChildren(...clips.map((c, i) => new Option(c.name, String(i))));
        mixer = new THREE.AnimationMixer(root);
        if (clips.length) {
          action = mixer.clipAction(clips[0]);
          action.play();
          playing = false;
          mixer.timeScale = speed;
        } else {
          document.querySelector('#clips').append(new Option('No clips', ''));
          error.textContent = 'No clips: model and file controls remain available.';
        }
        for (const id of ['play', 'pause', 'stop'])
          document.querySelector('#' + id).disabled = !clips.length;
      }
      on('#play', 'click', () => {
        if (!action) return;
        action.play();
        action.paused = false;
        playing = true;
        last = 0;
      });
      on('#pause', 'click', () => {
        playing = false;
        if (action) action.paused = true;
        draw();
      });
      on('#stop', 'click', () => {
        playing = false;
        if (action) {
          action.stop();
          action.reset();
        }
        if (mixer) {
          mixer.time = 0;
          mixer.update(0);
        }
        draw();
      });
      on('#clips', 'change', (e) => {
        if (!mixer || !clips.length) return;
        mixer.stopAllAction();
        action = mixer.clipAction(clips[Number(e.target.value)]);
        action.reset().play();
        playing = true;
        last = 0;
      });
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        speed = Number(input.value);
        if (mixer) mixer.timeScale = speed;
        draw();
      });
      function animate(now) {
        if (disposed) return;
        delta = last ? (now - last) / (seconds ? 1000 : 1) : 0;
        last = now;
        if (playing && mixer) {
          mixer.update(delta);
          draw();
        }
      }
      renderer.setAnimationLoop(animate);

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

          setupAnimation(gltf);
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
      sample('animated');
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
          ' / clips: ' +
          clips.map((c) => c.name + ':' + c.duration + 's') +
          ' / playing: ' +
          playing +
          ' / delta: ' +
          delta.toFixed(4) +
          's / mixer: ' +
          (mixer?.time ?? 0).toFixed(3) +
          's / speed: ' +
          speed +
          ' / X: ' +
          (meshes[0]?.position.x ?? 0).toFixed(3);
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

- Read playing and action.paused together.
- Apply after entering a numeric speed.
- Compare Play → Pause → Play → Stop and speeds 1/2.

</details>

<details>
<summary>Solution and explanation</summary>

Stop unschedules the action and restores original property values. Pause retains scheduling while holding action time. Do not reuse old actions for a new root after model replacement.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Play, stop, and speed</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Play, stop, and speed</h1>
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
        >Clip
        <select id="clips"></select></label
      ><button id="play">Play</button><button id="pause">Pause</button
      ><button id="stop">Stop and rewind</button
      ><label
        >Speed
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.25"
          value="2" /></label
      ><button id="apply">Apply speed</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="Play, stop, and speed"></canvas></div>
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

      let mixer = null,
        clips = [],
        action = null,
        playing = false,
        last = 0,
        delta = 0,
        speed = Number(document.querySelector('#value').value);
      const seconds = true;
      function clearMixer() {
        playing = false;
        if (mixer && root) {
          mixer.stopAllAction();
          mixer.uncacheRoot(root);
        }
        mixer = null;
        action = null;
        clips = [];
      }
      function setupAnimation(gltf) {
        clips = gltf.animations;
        document
          .querySelector('#clips')
          .replaceChildren(...clips.map((c, i) => new Option(c.name, String(i))));
        mixer = new THREE.AnimationMixer(root);
        if (clips.length) {
          action = mixer.clipAction(clips[0]);
          action.play();
          playing = true;
          mixer.timeScale = speed;
        } else {
          document.querySelector('#clips').append(new Option('No clips', ''));
          error.textContent = 'No clips: model and file controls remain available.';
        }
        for (const id of ['play', 'pause', 'stop'])
          document.querySelector('#' + id).disabled = !clips.length;
      }
      on('#play', 'click', () => {
        if (!action) return;
        action.play();
        action.paused = false;
        playing = true;
        last = 0;
      });
      on('#pause', 'click', () => {
        playing = false;
        if (action) action.paused = true;
        draw();
      });
      on('#stop', 'click', () => {
        playing = false;
        if (action) {
          action.stop();
          action.reset();
        }
        if (mixer) {
          mixer.time = 0;
          mixer.update(0);
        }
        draw();
      });
      on('#clips', 'change', (e) => {
        if (!mixer || !clips.length) return;
        mixer.stopAllAction();
        action = mixer.clipAction(clips[Number(e.target.value)]);
        action.reset().play();
        playing = true;
        last = 0;
      });
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        speed = Number(input.value);
        if (mixer) mixer.timeScale = speed;
        draw();
      });
      function animate(now) {
        if (disposed) return;
        delta = last ? (now - last) / (seconds ? 1000 : 1) : 0;
        last = now;
        if (playing && mixer) {
          mixer.update(delta);
          draw();
        }
      }
      renderer.setAnimationLoop(animate);

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

          setupAnimation(gltf);
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
      sample('animated');
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
          ' / clips: ' +
          clips.map((c) => c.name + ':' + c.duration + 's') +
          ' / playing: ' +
          playing +
          ' / delta: ' +
          delta.toFixed(4) +
          's / mixer: ' +
          (mixer?.time ?? 0).toFixed(3) +
          's / speed: ' +
          speed +
          ' / X: ' +
          (meshes[0]?.position.x ?? 0).toFixed(3);
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

- How do pause and stop differ for the pose?
- Does clearing the mixer automatically dispose geometry?

### API · AnimationMixer.update

Evaluates actions on one root for elapsed seconds.

- `deltaTime: number` — Seconds, not milliseconds

Returns this mixer and updates time and target properties.

- timeScale is a multiplier. Stop all actions and uncacheRoot before replacing the model.

```js
mixer.update((now-last)/1000);
```

[AnimationMixer.update](https://threejs.org/docs/pages/AnimationMixer.html) · three@0.186.1 · 2026-10-27

### API · AnimationAction.play / stop

Schedules and unschedules action playback.

Returns this action. paused is a boolean that holds action time.

- Stop and pause differ in restoring poses. Disable playback UI when no clip exists.

```js
action.play();action.paused=true;action.stop();
```

[AnimationAction.play / stop](https://threejs.org/docs/pages/AnimationAction.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Orbit Controls and On-Demand Rendering](../16/README.md) · [Next: Transparency and Depth](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
