# Three.js · 25 HTML Controls and Accessibility

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Lifetimes, Accessibility, and Measurement · Editable example · Storage ID: `threejs-step-25`

## Goals and learning outcomes

- Selection status names Right and index 1.
- Right increases camera.x by 1; zoom in reduces z by 1.

## Prerequisites

Prerequisite units: 13, 14, 16. Continue these concepts in this experiment.

## Key concepts and explanations

### Object list outside canvas

Enable list wiring and apply. Tab to Objects and select Right with ArrowDown. The list change updates selection and text together. The canvas image alone does not name the selection.

### Keyboard camera controls

Enable keyboard camera controls and apply. Tab to camera buttons and use Enter for right, zoom in and frame selected. Read the image and camera coordinates. Controls are native buttons.

## Practice setup

Edit and run independent HTML in the site using Three.js 0.186.1. No separate installation or server is required. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Enable list wiring and apply. Tab to Objects and select Right with ArrowDown. The list change updates selection and text together. The canvas image alone does not name the selection.
2. Enable keyboard camera controls and apply. Tab to camera buttons and use Enter for right, zoom in and frame selected. Read the image and camera coordinates. Controls are native buttons.
3. Enable status announcements and apply. Use only Tab and Enter to trigger failure and recovery. The list and camera controls remain after failure; role=status announces the error and recovery guidance. Recovery focuses the list.

## Variables to observe

| Variable                   | Baseline | Change   | Expected change / hypothesis              |
| -------------------------- | -------- | -------- | ----------------------------------------- |
| Object list outside canvas | starter  | solution | Selection status names Right and index 1. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Selection status names Right and index 1.
- [ ] Right increases camera.x by 1; zoom in reduces z by 1.

## Self-check

1. How is the 3D object name exposed to assistive technology?
2. How does a keyboard user locate focus?
3. What is lost when an error is conveyed only by color?

## Official references

- [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html)
- [Three.js OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-25/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Complete the HTML exercises and record actual observations and conditions in the existing site notes.

- [example.html](../../../../../../../src/labs/threejs-step-25/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Enable list wiring and apply. Tab to Objects and select Right with ArrowDown. The list change updates selection and text together. The canvas image alone does not name the selection.

### Prerequisite units

- `threejs-step-13`
- `threejs-02`
- `threejs-step-16`

### Object list outside canvas

Enable list wiring and apply. Tab to Objects and select Right with ArrowDown. The list change updates selection and text together. The canvas image alone does not name the selection.

**Expected result**

Selection status names Right and index 1.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Object list outside canvas</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Object list outside canvas</h1>
    <p>
      Enable list wiring and apply. Tab to Objects and select Right with
      ArrowDown. The list change updates selection and text together. The canvas
      image alone does not name the selection.
    </p>
    <div class="controls">
      <label><input id="wiring" type="checkbox" />Wire object list</label
      ><label><input id="keys" type="checkbox" checked />Keyboard camera</label
      ><label
        ><input id="announce" type="checkbox" checked />Announce status</label
      ><button id="apply">Apply</button
      ><label
        >Objects<select id="objects">
          <option>Left</option>
          <option>Right</option>
        </select></label
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="frame">Frame selected</button
      ><button id="fail">Trigger failure</button
      ><button id="recover">Recover</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Object list outside canvas"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={geometry:0,material:0};const g=new THREE.BoxGeometry();ownedGeometry.add(g);g.addEventListener('dispose',()=>counts.geometry++);const meshes=['Left','Right'].map((name,i)=>{const m=new THREE.MeshBasicMaterial({color:i?'#f97316':'#2563eb'});ownedMaterial.add(m);m.addEventListener('dispose',()=>counts.material++);const o=new THREE.Mesh(g,m);o.name=name;o.position.x=i?1.2:-1.2;scene.add(o);return o;});let selected=0,status='ready';const target=new THREE.Vector3();
      function draw(){if(disposed||!stage.clientWidth)return;camera.lookAt(target);renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({selected,name:meshes[selected].name,camera:camera.position.toArray(),status});}
      on('#objects','change',()=>{if(document.querySelector('#wiring').checked)selected=document.querySelector('#objects').selectedIndex;draw();});on('#apply','click',()=>{output.setAttribute('aria-live',document.querySelector('#announce').checked?'polite':'off');draw();});on('#right','click',()=>{if(document.querySelector('#keys').checked)camera.position.x++;draw();});on('#zoom','click',()=>{if(document.querySelector('#keys').checked)camera.position.z--;draw();});on('#frame','click',()=>{if(document.querySelector('#keys').checked){target.copy(meshes[selected].position);camera.position.set(target.x,2,5);}draw();});on('#fail','click',()=>{status='error';document.querySelector('#error').textContent="Load failed. Use Recover to try again.";draw();});on('#recover','click',()=>{status='ready';document.querySelector('#error').textContent="Recovered. Select an object in the list.";document.querySelector('#objects').focus();draw();});function releaseAll(){}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Check the label, select change handler and status text.

</details>

<details>
<summary>Solution and explanation</summary>

Selection status names Right and index 1. Check the label, select change handler and status text.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Object list outside canvas</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Object list outside canvas</h1>
    <p>
      Enable list wiring and apply. Tab to Objects and select Right with
      ArrowDown. The list change updates selection and text together. The canvas
      image alone does not name the selection.
    </p>
    <div class="controls">
      <label
        ><input id="wiring" type="checkbox" checked />Wire object list</label
      ><label><input id="keys" type="checkbox" checked />Keyboard camera</label
      ><label
        ><input id="announce" type="checkbox" checked />Announce status</label
      ><button id="apply">Apply</button
      ><label
        >Objects<select id="objects">
          <option>Left</option>
          <option>Right</option>
        </select></label
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="frame">Frame selected</button
      ><button id="fail">Trigger failure</button
      ><button id="recover">Recover</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Object list outside canvas"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={geometry:0,material:0};const g=new THREE.BoxGeometry();ownedGeometry.add(g);g.addEventListener('dispose',()=>counts.geometry++);const meshes=['Left','Right'].map((name,i)=>{const m=new THREE.MeshBasicMaterial({color:i?'#f97316':'#2563eb'});ownedMaterial.add(m);m.addEventListener('dispose',()=>counts.material++);const o=new THREE.Mesh(g,m);o.name=name;o.position.x=i?1.2:-1.2;scene.add(o);return o;});let selected=0,status='ready';const target=new THREE.Vector3();
      function draw(){if(disposed||!stage.clientWidth)return;camera.lookAt(target);renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({selected,name:meshes[selected].name,camera:camera.position.toArray(),status});}
      on('#objects','change',()=>{if(document.querySelector('#wiring').checked)selected=document.querySelector('#objects').selectedIndex;draw();});on('#apply','click',()=>{output.setAttribute('aria-live',document.querySelector('#announce').checked?'polite':'off');draw();});on('#right','click',()=>{if(document.querySelector('#keys').checked)camera.position.x++;draw();});on('#zoom','click',()=>{if(document.querySelector('#keys').checked)camera.position.z--;draw();});on('#frame','click',()=>{if(document.querySelector('#keys').checked){target.copy(meshes[selected].position);camera.position.set(target.x,2,5);}draw();});on('#fail','click',()=>{status='error';document.querySelector('#error').textContent="Load failed. Use Recover to try again.";draw();});on('#recover','click',()=>{status='ready';document.querySelector('#error').textContent="Recovered. Select an object in the list.";document.querySelector('#objects').focus();draw();});function releaseAll(){}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- How is the 3D object name exposed to assistive technology?

### Keyboard camera controls

Enable keyboard camera controls and apply. Tab to camera buttons and use Enter for right, zoom in and frame selected. Read the image and camera coordinates. Controls are native buttons.

**Expected result**

Right increases camera.x by 1; zoom in reduces z by 1.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Keyboard camera controls</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Keyboard camera controls</h1>
    <p>
      Enable keyboard camera controls and apply. Tab to camera buttons and use
      Enter for right, zoom in and frame selected. Read the image and camera
      coordinates. Controls are native buttons.
    </p>
    <div class="controls">
      <label
        ><input id="wiring" type="checkbox" checked />Wire object list</label
      ><label><input id="keys" type="checkbox" />Keyboard camera</label
      ><label
        ><input id="announce" type="checkbox" checked />Announce status</label
      ><button id="apply">Apply</button
      ><label
        >Objects<select id="objects">
          <option>Left</option>
          <option>Right</option>
        </select></label
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="frame">Frame selected</button
      ><button id="fail">Trigger failure</button
      ><button id="recover">Recover</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Keyboard camera controls"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={geometry:0,material:0};const g=new THREE.BoxGeometry();ownedGeometry.add(g);g.addEventListener('dispose',()=>counts.geometry++);const meshes=['Left','Right'].map((name,i)=>{const m=new THREE.MeshBasicMaterial({color:i?'#f97316':'#2563eb'});ownedMaterial.add(m);m.addEventListener('dispose',()=>counts.material++);const o=new THREE.Mesh(g,m);o.name=name;o.position.x=i?1.2:-1.2;scene.add(o);return o;});let selected=0,status='ready';const target=new THREE.Vector3();
      function draw(){if(disposed||!stage.clientWidth)return;camera.lookAt(target);renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({selected,name:meshes[selected].name,camera:camera.position.toArray(),status});}
      on('#objects','change',()=>{if(document.querySelector('#wiring').checked)selected=document.querySelector('#objects').selectedIndex;draw();});on('#apply','click',()=>{output.setAttribute('aria-live',document.querySelector('#announce').checked?'polite':'off');draw();});on('#right','click',()=>{if(document.querySelector('#keys').checked)camera.position.x++;draw();});on('#zoom','click',()=>{if(document.querySelector('#keys').checked)camera.position.z--;draw();});on('#frame','click',()=>{if(document.querySelector('#keys').checked){target.copy(meshes[selected].position);camera.position.set(target.x,2,5);}draw();});on('#fail','click',()=>{status='error';document.querySelector('#error').textContent="Load failed. Use Recover to try again.";draw();});on('#recover','click',()=>{status='ready';document.querySelector('#error').textContent="Recovered. Select an object in the list.";document.querySelector('#objects').focus();draw();});function releaseAll(){}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Avoid hiding every command behind canvas keydown.

</details>

<details>
<summary>Solution and explanation</summary>

Right increases camera.x by 1; zoom in reduces z by 1. Avoid hiding every command behind canvas keydown.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Keyboard camera controls</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Keyboard camera controls</h1>
    <p>
      Enable keyboard camera controls and apply. Tab to camera buttons and use
      Enter for right, zoom in and frame selected. Read the image and camera
      coordinates. Controls are native buttons.
    </p>
    <div class="controls">
      <label
        ><input id="wiring" type="checkbox" checked />Wire object list</label
      ><label><input id="keys" type="checkbox" checked />Keyboard camera</label
      ><label
        ><input id="announce" type="checkbox" checked />Announce status</label
      ><button id="apply">Apply</button
      ><label
        >Objects<select id="objects">
          <option>Left</option>
          <option>Right</option>
        </select></label
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="frame">Frame selected</button
      ><button id="fail">Trigger failure</button
      ><button id="recover">Recover</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Keyboard camera controls"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={geometry:0,material:0};const g=new THREE.BoxGeometry();ownedGeometry.add(g);g.addEventListener('dispose',()=>counts.geometry++);const meshes=['Left','Right'].map((name,i)=>{const m=new THREE.MeshBasicMaterial({color:i?'#f97316':'#2563eb'});ownedMaterial.add(m);m.addEventListener('dispose',()=>counts.material++);const o=new THREE.Mesh(g,m);o.name=name;o.position.x=i?1.2:-1.2;scene.add(o);return o;});let selected=0,status='ready';const target=new THREE.Vector3();
      function draw(){if(disposed||!stage.clientWidth)return;camera.lookAt(target);renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({selected,name:meshes[selected].name,camera:camera.position.toArray(),status});}
      on('#objects','change',()=>{if(document.querySelector('#wiring').checked)selected=document.querySelector('#objects').selectedIndex;draw();});on('#apply','click',()=>{output.setAttribute('aria-live',document.querySelector('#announce').checked?'polite':'off');draw();});on('#right','click',()=>{if(document.querySelector('#keys').checked)camera.position.x++;draw();});on('#zoom','click',()=>{if(document.querySelector('#keys').checked)camera.position.z--;draw();});on('#frame','click',()=>{if(document.querySelector('#keys').checked){target.copy(meshes[selected].position);camera.position.set(target.x,2,5);}draw();});on('#fail','click',()=>{status='error';document.querySelector('#error').textContent="Load failed. Use Recover to try again.";draw();});on('#recover','click',()=>{status='ready';document.querySelector('#error').textContent="Recovered. Select an object in the list.";document.querySelector('#objects').focus();draw();});function releaseAll(){}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- How does a keyboard user locate focus?

### Error announcements and recovery focus

Enable status announcements and apply. Use only Tab and Enter to trigger failure and recovery. The list and camera controls remain after failure; role=status announces the error and recovery guidance. Recovery focuses the list.

**Expected result**

Failure is announced as text; recovery focuses Objects.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Error announcements and recovery focus</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Error announcements and recovery focus</h1>
    <p>
      Enable status announcements and apply. Use only Tab and Enter to trigger
      failure and recovery. The list and camera controls remain after failure;
      role=status announces the error and recovery guidance. Recovery focuses
      the list.
    </p>
    <div class="controls">
      <label
        ><input id="wiring" type="checkbox" checked />Wire object list</label
      ><label><input id="keys" type="checkbox" checked />Keyboard camera</label
      ><label><input id="announce" type="checkbox" />Announce status</label
      ><button id="apply">Apply</button
      ><label
        >Objects<select id="objects">
          <option>Left</option>
          <option>Right</option>
        </select></label
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="frame">Frame selected</button
      ><button id="fail">Trigger failure</button
      ><button id="recover">Recover</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Error announcements and recovery focus"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={geometry:0,material:0};const g=new THREE.BoxGeometry();ownedGeometry.add(g);g.addEventListener('dispose',()=>counts.geometry++);const meshes=['Left','Right'].map((name,i)=>{const m=new THREE.MeshBasicMaterial({color:i?'#f97316':'#2563eb'});ownedMaterial.add(m);m.addEventListener('dispose',()=>counts.material++);const o=new THREE.Mesh(g,m);o.name=name;o.position.x=i?1.2:-1.2;scene.add(o);return o;});let selected=0,status='ready';const target=new THREE.Vector3();
      function draw(){if(disposed||!stage.clientWidth)return;camera.lookAt(target);renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({selected,name:meshes[selected].name,camera:camera.position.toArray(),status});}
      on('#objects','change',()=>{if(document.querySelector('#wiring').checked)selected=document.querySelector('#objects').selectedIndex;draw();});on('#apply','click',()=>{output.setAttribute('aria-live',document.querySelector('#announce').checked?'polite':'off');draw();});on('#right','click',()=>{if(document.querySelector('#keys').checked)camera.position.x++;draw();});on('#zoom','click',()=>{if(document.querySelector('#keys').checked)camera.position.z--;draw();});on('#frame','click',()=>{if(document.querySelector('#keys').checked){target.copy(meshes[selected].position);camera.position.set(target.x,2,5);}draw();});on('#fail','click',()=>{status='error';document.querySelector('#error').textContent="Load failed. Use Recover to try again.";draw();});on('#recover','click',()=>{status='ready';document.querySelector('#error').textContent="Recovered. Select an object in the list.";document.querySelector('#objects').focus();draw();});function releaseAll(){}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- aria-live needs changed text to announce.

</details>

<details>
<summary>Solution and explanation</summary>

Failure is announced as text; recovery focuses Objects. aria-live needs changed text to announce.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Error announcements and recovery focus</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Error announcements and recovery focus</h1>
    <p>
      Enable status announcements and apply. Use only Tab and Enter to trigger
      failure and recovery. The list and camera controls remain after failure;
      role=status announces the error and recovery guidance. Recovery focuses
      the list.
    </p>
    <div class="controls">
      <label
        ><input id="wiring" type="checkbox" checked />Wire object list</label
      ><label><input id="keys" type="checkbox" checked />Keyboard camera</label
      ><label
        ><input id="announce" type="checkbox" checked />Announce status</label
      ><button id="apply">Apply</button
      ><label
        >Objects<select id="objects">
          <option>Left</option>
          <option>Right</option>
        </select></label
      ><button id="right">Camera right</button><button id="zoom">Zoom in</button
      ><button id="frame">Frame selected</button
      ><button id="fail">Trigger failure</button
      ><button id="recover">Recover</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage">
      <canvas aria-label="Error announcements and recovery focus"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={geometry:0,material:0};const g=new THREE.BoxGeometry();ownedGeometry.add(g);g.addEventListener('dispose',()=>counts.geometry++);const meshes=['Left','Right'].map((name,i)=>{const m=new THREE.MeshBasicMaterial({color:i?'#f97316':'#2563eb'});ownedMaterial.add(m);m.addEventListener('dispose',()=>counts.material++);const o=new THREE.Mesh(g,m);o.name=name;o.position.x=i?1.2:-1.2;scene.add(o);return o;});let selected=0,status='ready';const target=new THREE.Vector3();
      function draw(){if(disposed||!stage.clientWidth)return;camera.lookAt(target);renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({selected,name:meshes[selected].name,camera:camera.position.toArray(),status});}
      on('#objects','change',()=>{if(document.querySelector('#wiring').checked)selected=document.querySelector('#objects').selectedIndex;draw();});on('#apply','click',()=>{output.setAttribute('aria-live',document.querySelector('#announce').checked?'polite':'off');draw();});on('#right','click',()=>{if(document.querySelector('#keys').checked)camera.position.x++;draw();});on('#zoom','click',()=>{if(document.querySelector('#keys').checked)camera.position.z--;draw();});on('#frame','click',()=>{if(document.querySelector('#keys').checked){target.copy(meshes[selected].position);camera.position.set(target.x,2,5);}draw();});on('#fail','click',()=>{status='error';document.querySelector('#error').textContent="Load failed. Use Recover to try again.";draw();});on('#recover','click',()=>{status='ready';document.querySelector('#error').textContent="Recovered. Select an object in the list.";document.querySelector('#objects').focus();draw();});function releaseAll(){}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- What is lost when an error is conveyed only by color?

### API · HTMLSelectElement / addEventListener

Selection status names Right and index 1. Check the label, select change handler and status text.

- `type: string` — The change event in this example.
- `listener: EventListener` — Reads selectedIndex and updates status text.

addEventListener returns undefined. select.selectedIndex is the selected index or -1; value is a string.

- aria-live needs changed text to announce.

```js
select.addEventListener('change',()=>{status.textContent=select.value;});
```

[HTMLSelectElement / addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement) · three@0.186.1 · 2026-10-27

### API · HTMLButtonElement / focus

Reach native buttons with Tab and activate with Enter or Space. select.focus returns focus to Objects after recovery. Preserve accessible names and visible focus.

- `options: FocusOptions | undefined` — Optional focus options; omitted in this example.

HTMLElement.focus returns undefined. On success document.activeElement becomes that list.

- Reach native buttons with Tab and activate with Enter or Space. select.focus returns focus to Objects after recovery. Preserve accessible names and visible focus.

```js
select.focus();
```

[HTMLButtonElement / focus](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role) · three@0.186.1 · 2026-10-27

### API · role=status / aria-live

role=status announces status changes. Provide error details and recovery guidance as text while retaining list and camera controls.

- `role / aria-live: string` — Uses role=status and aria-live=polite or off.

These are HTML attributes with no function return value. They expose changed status text in the DOM.

- role=status announces status changes. Provide error details and recovery guidance as text while retaining list and camera controls.

```js
status.textContent = "Load failed. Use Recover.";
```

[role=status / aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Asynchronous Scene Replacement](../24/README.md) · [Next: Render Statistics and Profiling](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
