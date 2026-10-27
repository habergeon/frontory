# Three.js · 26 Render Statistics and Profiling

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Lifetimes, Accessibility, and Measurement · Editable example · Storage ID: `threejs-step-26`

## Goals and learning outcomes

- At fixed size, camera and count: calls=2, triangles=24.
- Frame totals are calls=4 and triangles=48.

## Prerequisites

Prerequisite units: 16, 19, 22, 23. Continue these concepts in this experiment.

## Key concepts and explanations

### Draw calls in one pass

Enable frame totals and apply. In one pass two cubes give calls=2 and triangles=24. Two measurements should agree. Reset once at the start of each logical frame.

### Whole-frame totals across passes

The multi-pass starter uses autoReset=true and shows only the last pass calls=2. Enable frame totals and apply. Mini and main cameras each draw both cubes.

## Practice setup

Edit and run independent HTML in the site using Three.js 0.186.1. No separate installation or server is required. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Enable frame totals and apply. In one pass two cubes give calls=2 and triangles=24. Two measurements should agree. Reset once at the start of each logical frame.
2. The multi-pass starter uses autoReset=true and shows only the last pass calls=2. Enable frame totals and apply. Mini and main cameras each draw both cubes.
3. Measure passes 1 then 2. Keep count=2, DPR=1, CSS size up to 480×280 and the same camera. CPU ms is elapsed performance.now call time, not exact GPU duration or an improvement rate.

## Variables to observe

| Variable               | Baseline | Change   | Expected change / hypothesis                            |
| ---------------------- | -------- | -------- | ------------------------------------------------------- |
| Draw calls in one pass | starter  | solution | At fixed size, camera and count: calls=2, triangles=24. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] At fixed size, camera and count: calls=2, triangles=24.
- [ ] Frame totals are calls=4 and triangles=48.

## Self-check

1. What happens if frames accumulate without reset?
2. Which comparison fails if the last pass is mistaken for the whole frame?
3. Does reducing triangles always preserve visual quality?

## Official references

- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-26/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Complete the HTML exercises and record actual observations and conditions in the existing site notes.

- [example.html](../../../../../../../src/labs/threejs-step-26/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Enable frame totals and apply. In one pass two cubes give calls=2 and triangles=24. Two measurements should agree. Reset once at the start of each logical frame.

### Prerequisite units

- `threejs-step-16`
- `threejs-step-19`
- `threejs-step-22`
- `threejs-step-23`

### Draw calls in one pass

Enable frame totals and apply. In one pass two cubes give calls=2 and triangles=24. Two measurements should agree. Reset once at the start of each logical frame.

**Expected result**

At fixed size, camera and count: calls=2, triangles=24.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Draw calls in one pass</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Draw calls in one pass</h1>
    <p>
      Enable frame totals and apply. In one pass two cubes give calls=2 and
      triangles=24. Two measurements should agree. Reset once at the start of
      each logical frame.
    </p>
    <div class="controls">
      <label
        >Count<input
          id="count"
          type="number"
          value="2"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >Segments<input
          id="segments"
          type="number"
          value="16"
          min="8"
          max="32"
          step="8" /></label
      ><label
        >Passes<input
          id="passes"
          type="number"
          value="1"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" />Frame totals</label
      ><button id="apply">Apply and measure</button
      ><button id="cycle">cycle</button
      ><button id="select-report">Select report</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <p>
      CPU ms is elapsed call time, not GPU completion time or an improvement
      rate. Compare on the same device, size and camera.
    </p>

    <div id="stage"><canvas aria-label="Draw calls in one pass"></canvas></div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.BoxGeometry();m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=!document.querySelector('#totals').checked;renderer.info.reset();const start=performance.now();const passes=Number(document.querySelector('#passes').value);if(passes===2){renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}renderer.setRenderTarget(null);renderer.render(scene,camera);stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,lines:renderer.info.render.lines,cpuMs:performance.now()-start,count:meshes.length,segments:Number(document.querySelector('#segments').value),passes,buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),camera:camera.position.toArray(),memory:{...renderer.info.memory},...counts};frames++;output.textContent=JSON.stringify(stats);}
      function record(){records.push(JSON.parse(JSON.stringify(stats)));document.querySelector('#report').textContent=JSON.stringify({conditions:"Same device, size and camera. CPU call duration differs from GPU time. Add visual differences and cleanup results to site notes.",records,cleanup:counts},null,2);}
      on('#apply','click',()=>{for(const id of ['count','segments','passes'])if(!document.querySelector('#'+id).checkValidity()||!document.querySelector('#'+id).value)return;rebuild();draw();record();});on('#cycle','click',()=>{counts.cycles++;rebuild();draw();record();});on('#select-report','click',()=>{const range=document.createRange();range.selectNodeContents(document.querySelector('#report'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#report').focus();});function releaseAll(){for(const mesh of meshes)scene.remove(mesh);meshes=[];if(g){g.dispose();g=null;}if(m){m.dispose();m=null;}if(disposed)record();}rebuild();

      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Interpret info.render only with its accumulation interval.

</details>

<details>
<summary>Solution and explanation</summary>

At fixed size, camera and count: calls=2, triangles=24. Interpret info.render only with its accumulation interval.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Draw calls in one pass</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Draw calls in one pass</h1>
    <p>
      Enable frame totals and apply. In one pass two cubes give calls=2 and
      triangles=24. Two measurements should agree. Reset once at the start of
      each logical frame.
    </p>
    <div class="controls">
      <label
        >Count<input
          id="count"
          type="number"
          value="2"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >Segments<input
          id="segments"
          type="number"
          value="16"
          min="8"
          max="32"
          step="8" /></label
      ><label
        >Passes<input
          id="passes"
          type="number"
          value="1"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" checked />Frame totals</label
      ><button id="apply">Apply and measure</button
      ><button id="cycle">cycle</button
      ><button id="select-report">Select report</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <p>
      CPU ms is elapsed call time, not GPU completion time or an improvement
      rate. Compare on the same device, size and camera.
    </p>

    <div id="stage"><canvas aria-label="Draw calls in one pass"></canvas></div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.BoxGeometry();m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=!document.querySelector('#totals').checked;renderer.info.reset();const start=performance.now();const passes=Number(document.querySelector('#passes').value);if(passes===2){renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}renderer.setRenderTarget(null);renderer.render(scene,camera);stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,lines:renderer.info.render.lines,cpuMs:performance.now()-start,count:meshes.length,segments:Number(document.querySelector('#segments').value),passes,buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),camera:camera.position.toArray(),memory:{...renderer.info.memory},...counts};frames++;output.textContent=JSON.stringify(stats);}
      function record(){records.push(JSON.parse(JSON.stringify(stats)));document.querySelector('#report').textContent=JSON.stringify({conditions:"Same device, size and camera. CPU call duration differs from GPU time. Add visual differences and cleanup results to site notes.",records,cleanup:counts},null,2);}
      on('#apply','click',()=>{for(const id of ['count','segments','passes'])if(!document.querySelector('#'+id).checkValidity()||!document.querySelector('#'+id).value)return;rebuild();draw();record();});on('#cycle','click',()=>{counts.cycles++;rebuild();draw();record();});on('#select-report','click',()=>{const range=document.createRange();range.selectNodeContents(document.querySelector('#report'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#report').focus();});function releaseAll(){for(const mesh of meshes)scene.remove(mesh);meshes=[];if(g){g.dispose();g=null;}if(m){m.dispose();m=null;}if(disposed)record();}rebuild();queueMicrotask(()=>{draw();record();});

      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- What happens if frames accumulate without reset?

### Whole-frame totals across passes

The multi-pass starter uses autoReset=true and shows only the last pass calls=2. Enable frame totals and apply. Mini and main cameras each draw both cubes.

**Expected result**

Frame totals are calls=4 and triangles=48.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Whole-frame totals across passes</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Whole-frame totals across passes</h1>
    <p>
      The multi-pass starter uses autoReset=true and shows only the last pass
      calls=2. Enable frame totals and apply. Mini and main cameras each draw
      both cubes.
    </p>
    <div class="controls">
      <label
        >Count<input
          id="count"
          type="number"
          value="2"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >Segments<input
          id="segments"
          type="number"
          value="16"
          min="8"
          max="32"
          step="8" /></label
      ><label
        >Passes<input
          id="passes"
          type="number"
          value="2"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" />Frame totals</label
      ><button id="apply">Apply and measure</button
      ><button id="cycle">cycle</button
      ><button id="select-report">Select report</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <p>
      CPU ms is elapsed call time, not GPU completion time or an improvement
      rate. Compare on the same device, size and camera.
    </p>

    <div id="stage">
      <canvas aria-label="Whole-frame totals across passes"></canvas>
    </div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.BoxGeometry();m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=!document.querySelector('#totals').checked;renderer.info.reset();const start=performance.now();const passes=Number(document.querySelector('#passes').value);if(passes===2){renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}renderer.setRenderTarget(null);renderer.render(scene,camera);stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,lines:renderer.info.render.lines,cpuMs:performance.now()-start,count:meshes.length,segments:Number(document.querySelector('#segments').value),passes,buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),camera:camera.position.toArray(),memory:{...renderer.info.memory},...counts};frames++;output.textContent=JSON.stringify(stats);}
      function record(){records.push(JSON.parse(JSON.stringify(stats)));document.querySelector('#report').textContent=JSON.stringify({conditions:"Same device, size and camera. CPU call duration differs from GPU time. Add visual differences and cleanup results to site notes.",records,cleanup:counts},null,2);}
      on('#apply','click',()=>{for(const id of ['count','segments','passes'])if(!document.querySelector('#'+id).checkValidity()||!document.querySelector('#'+id).value)return;rebuild();draw();record();});on('#cycle','click',()=>{counts.cycles++;rebuild();draw();record();});on('#select-report','click',()=>{const range=document.createRange();range.selectNodeContents(document.querySelector('#report'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#report').focus();});function releaseAll(){for(const mesh of meshes)scene.remove(mesh);meshes=[];if(g){g.dispose();g=null;}if(m){m.dispose();m=null;}if(disposed)record();}rebuild();

      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Do not reset before every render.

</details>

<details>
<summary>Solution and explanation</summary>

Frame totals are calls=4 and triangles=48. Do not reset before every render.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Whole-frame totals across passes</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Whole-frame totals across passes</h1>
    <p>
      The multi-pass starter uses autoReset=true and shows only the last pass
      calls=2. Enable frame totals and apply. Mini and main cameras each draw
      both cubes.
    </p>
    <div class="controls">
      <label
        >Count<input
          id="count"
          type="number"
          value="2"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >Segments<input
          id="segments"
          type="number"
          value="16"
          min="8"
          max="32"
          step="8" /></label
      ><label
        >Passes<input
          id="passes"
          type="number"
          value="2"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" checked />Frame totals</label
      ><button id="apply">Apply and measure</button
      ><button id="cycle">cycle</button
      ><button id="select-report">Select report</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <p>
      CPU ms is elapsed call time, not GPU completion time or an improvement
      rate. Compare on the same device, size and camera.
    </p>

    <div id="stage">
      <canvas aria-label="Whole-frame totals across passes"></canvas>
    </div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.BoxGeometry();m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=!document.querySelector('#totals').checked;renderer.info.reset();const start=performance.now();const passes=Number(document.querySelector('#passes').value);if(passes===2){renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}renderer.setRenderTarget(null);renderer.render(scene,camera);stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,lines:renderer.info.render.lines,cpuMs:performance.now()-start,count:meshes.length,segments:Number(document.querySelector('#segments').value),passes,buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),camera:camera.position.toArray(),memory:{...renderer.info.memory},...counts};frames++;output.textContent=JSON.stringify(stats);}
      function record(){records.push(JSON.parse(JSON.stringify(stats)));document.querySelector('#report').textContent=JSON.stringify({conditions:"Same device, size and camera. CPU call duration differs from GPU time. Add visual differences and cleanup results to site notes.",records,cleanup:counts},null,2);}
      on('#apply','click',()=>{for(const id of ['count','segments','passes'])if(!document.querySelector('#'+id).checkValidity()||!document.querySelector('#'+id).value)return;rebuild();draw();record();});on('#cycle','click',()=>{counts.cycles++;rebuild();draw();record();});on('#select-report','click',()=>{const range=document.createRange();range.selectNodeContents(document.querySelector('#report'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#report').focus();});function releaseAll(){for(const mesh of meshes)scene.remove(mesh);meshes=[];if(g){g.dispose();g=null;}if(m){m.dispose();m=null;}if(disposed)record();}rebuild();queueMicrotask(()=>{draw();record();});

      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- Which comparison fails if the last pass is mistaken for the whole frame?

### Measure under fixed conditions

Measure passes 1 then 2. Keep count=2, DPR=1, CSS size up to 480×280 and the same camera. CPU ms is elapsed performance.now call time, not exact GPU duration or an improvement rate.

**Expected result**

Doubling passes doubles this scene calls and triangles; CPU ms may vary between runs.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Measure under fixed conditions</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Measure under fixed conditions</h1>
    <p>
      Measure passes 1 then 2. Keep count=2, DPR=1, CSS size up to 480×280 and
      the same camera. CPU ms is elapsed performance.now call time, not exact
      GPU duration or an improvement rate.
    </p>
    <div class="controls">
      <label
        >Count<input
          id="count"
          type="number"
          value="2"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >Segments<input
          id="segments"
          type="number"
          value="16"
          min="8"
          max="32"
          step="8" /></label
      ><label
        >Passes<input
          id="passes"
          type="number"
          value="1"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" checked />Frame totals</label
      ><button id="apply">Apply and measure</button
      ><button id="cycle">cycle</button
      ><button id="select-report">Select report</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <p>
      CPU ms is elapsed call time, not GPU completion time or an improvement
      rate. Compare on the same device, size and camera.
    </p>

    <div id="stage">
      <canvas aria-label="Measure under fixed conditions"></canvas>
    </div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.BoxGeometry();m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=!document.querySelector('#totals').checked;renderer.info.reset();const start=performance.now();const passes=Number(document.querySelector('#passes').value);if(passes===2){renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}renderer.setRenderTarget(null);renderer.render(scene,camera);stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,lines:renderer.info.render.lines,cpuMs:performance.now()-start,count:meshes.length,segments:Number(document.querySelector('#segments').value),passes,buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),camera:camera.position.toArray(),memory:{...renderer.info.memory},...counts};frames++;output.textContent=JSON.stringify(stats);}
      function record(){records.push(JSON.parse(JSON.stringify(stats)));document.querySelector('#report').textContent=JSON.stringify({conditions:"Same device, size and camera. CPU call duration differs from GPU time. Add visual differences and cleanup results to site notes.",records,cleanup:counts},null,2);}
      on('#apply','click',()=>{for(const id of ['count','segments','passes'])if(!document.querySelector('#'+id).checkValidity()||!document.querySelector('#'+id).value)return;rebuild();draw();record();});on('#cycle','click',()=>{counts.cycles++;rebuild();draw();record();});on('#select-report','click',()=>{const range=document.createRange();range.selectNodeContents(document.querySelector('#report'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#report').focus();});function releaseAll(){for(const mesh of meshes)scene.remove(mesh);meshes=[];if(g){g.dispose();g=null;}if(m){m.dispose();m=null;}if(disposed)record();}rebuild();

      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Record JIT, uploads, SwiftShader and canvas size as conditions.

</details>

<details>
<summary>Solution and explanation</summary>

Doubling passes doubles this scene calls and triangles; CPU ms may vary between runs. Record JIT, uploads, SwiftShader and canvas size as conditions.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Measure under fixed conditions</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Measure under fixed conditions</h1>
    <p>
      Measure passes 1 then 2. Keep count=2, DPR=1, CSS size up to 480×280 and
      the same camera. CPU ms is elapsed performance.now call time, not exact
      GPU duration or an improvement rate.
    </p>
    <div class="controls">
      <label
        >Count<input
          id="count"
          type="number"
          value="2"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >Segments<input
          id="segments"
          type="number"
          value="16"
          min="8"
          max="32"
          step="8" /></label
      ><label
        >Passes<input
          id="passes"
          type="number"
          value="2"
          min="1"
          max="2"
          step="1" /></label
      ><label><input id="totals" type="checkbox" checked />Frame totals</label
      ><button id="apply">Apply and measure</button
      ><button id="cycle">cycle</button
      ><button id="select-report">Select report</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <p>
      CPU ms is elapsed call time, not GPU completion time or an improvement
      rate. Compare on the same device, size and camera.
    </p>

    <div id="stage">
      <canvas aria-label="Measure under fixed conditions"></canvas>
    </div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.BoxGeometry();m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=!document.querySelector('#totals').checked;renderer.info.reset();const start=performance.now();const passes=Number(document.querySelector('#passes').value);if(passes===2){renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}renderer.setRenderTarget(null);renderer.render(scene,camera);stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,lines:renderer.info.render.lines,cpuMs:performance.now()-start,count:meshes.length,segments:Number(document.querySelector('#segments').value),passes,buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),camera:camera.position.toArray(),memory:{...renderer.info.memory},...counts};frames++;output.textContent=JSON.stringify(stats);}
      function record(){records.push(JSON.parse(JSON.stringify(stats)));document.querySelector('#report').textContent=JSON.stringify({conditions:"Same device, size and camera. CPU call duration differs from GPU time. Add visual differences and cleanup results to site notes.",records,cleanup:counts},null,2);}
      on('#apply','click',()=>{for(const id of ['count','segments','passes'])if(!document.querySelector('#'+id).checkValidity()||!document.querySelector('#'+id).value)return;rebuild();draw();record();});on('#cycle','click',()=>{counts.cycles++;rebuild();draw();record();});on('#select-report','click',()=>{const range=document.createRange();range.selectNodeContents(document.querySelector('#report'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#report').focus();});function releaseAll(){for(const mesh of meshes)scene.remove(mesh);meshes=[];if(g){g.dispose();g=null;}if(m){m.dispose();m=null;}if(disposed)record();}rebuild();queueMicrotask(()=>{draw();record();});

      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- Does reducing triangles always preserve visual quality?

### API · WebGLRenderer.info / reset

At fixed size, camera and count: calls=2, triangles=24. Interpret info.render only with its accumulation interval.

info is the render and memory statistics object. info.reset() resets render counters and returns undefined; it does not free memory resources.

- Record JIT, uploads, SwiftShader and canvas size as conditions.

```js
renderer.info.autoReset=false;renderer.info.reset();renderer.render(scene,camera);const calls=renderer.info.render.calls;
```

[WebGLRenderer.info / reset](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

### API · WebGLRenderer.info.reset

With autoReset=false, reset once at frame start and read calls and triangles after all passes. memory is not GPU bytes; reset does not release resources.

reset returns undefined. render.calls, triangles and lines accumulate again for the next frame.

- With autoReset=false, reset once at frame start and read calls and triangles after all passes. memory is not GPU bytes; reset does not release resources.

```js
renderer.info.autoReset=false;renderer.info.reset();renderMap();renderer.render(scene,camera);
```

[WebGLRenderer.info.reset](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

### API · performance.now

Timestamp differences measure elapsed JavaScript call time. GPU work is asynchronous, so do not label this exact GPU time. Record uploads, JIT, device and resolution.

performance.now returns a number in ms relative to the time origin. Use the difference between calls as elapsed duration.

- Timestamp differences measure elapsed JavaScript call time. GPU work is asynchronous, so do not label this exact GPU time. Record uploads, JIT, device and resolution.

```js
const start=performance.now();renderer.render(scene,camera);const cpuMs=performance.now()-start;
```

[performance.now](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: HTML Controls and Accessibility](../25/README.md) · [Next: Integrating the Scene Inspector](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
