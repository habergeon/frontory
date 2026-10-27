# Three.js · 28 Rendering Resources and Measurement

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Resource Lifetimes, Accessibility, and Measurement · Editable example · Storage ID: `threejs-03`

## Goals and learning outcomes

- The first measurement and conditions are appended to the record.
- At 8, triangles decrease and silhouettes change. No invented improvement rate is calculated.

## Prerequisites

Prerequisite units: 19, 23, 24, 26, 27. Continue these concepts in this experiment.

## Key concepts and explanations

### Capture a real comparison baseline

Measure to create a baseline. Keep count=8, segments=16 and passes=1. Read camera, buffer, DPR, calls, triangles and CPU ms. No initial record means no measurement yet.

### Compare quality and cost

Measure segments 16 then change to 8 and measure again. Fix count, passes and camera. Compare sphere silhouettes alongside triangles. The starter and solution shapes illustrate quality cost.

## Practice setup

Edit and run independent HTML in the site using Three.js 0.186.1. No separate installation or server is required. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Measure to create a baseline. Keep count=8, segments=16 and passes=1. Read camera, buffer, DPR, calls, triangles and CPU ms. No initial record means no measurement yet.
2. Measure segments 16 then change to 8 and measure again. Fix count, passes and camera. Compare sphere silhouettes alongside triangles. The starter and solution shapes illustrate quality cost.
3. Press cycle 3 times. Each releases current resources and rebuilds under the same conditions. Created minus disposed is 1 for geometry and material each. After cleanup record whether the difference is 0.
4. Create 16 versus 8 segment measurements and 3 cycle results. Press Select report and copy with Ctrl+C, then paste into the site Notes tab. Add conditions, actual values, visual differences, cleanup results and measurement limits in your own words; use existing save and backup.

## Variables to observe

| Variable                           | Baseline | Change   | Expected change / hypothesis                                     |
| ---------------------------------- | -------- | -------- | ---------------------------------------------------------------- |
| Capture a real comparison baseline | starter  | solution | The first measurement and conditions are appended to the record. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The first measurement and conditions are appended to the record.
- [ ] At 8, triangles decrease and silhouettes change. No invented improvement rate is calculated.

## Self-check

1. Can a number without conditions be compared later?
2. Does a lower triangle count prove preserved quality?
3. How does the ownership ledger differ from renderer.info.memory?
4. Why is CPU call time not exact GPU execution time?

## Official references

- [Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## Linked example and execution scope

[Example source](../../../../../../src/labs/threejs-03/example.en.html) · [Runtime environments and limits](../../../../examples.md)

Complete the HTML exercises and record actual observations and conditions in the existing site notes.

- [example.html](../../../../../../src/labs/threejs-03/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Measure to create a baseline. Keep count=8, segments=16 and passes=1. Read camera, buffer, DPR, calls, triangles and CPU ms. No initial record means no measurement yet.

### Prerequisite units

- `threejs-step-19`
- `threejs-step-23`
- `threejs-step-24`
- `threejs-step-26`
- `threejs-step-27`

### Capture a real comparison baseline

Measure to create a baseline. Keep count=8, segments=16 and passes=1. Read camera, buffer, DPR, calls, triangles and CPU ms. No initial record means no measurement yet.

**Expected result**

The first measurement and conditions are appended to the record.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Capture a real comparison baseline</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Capture a real comparison baseline</h1>
    <p>
      Measure to create a baseline. Keep count=8, segments=16 and passes=1. Read
      camera, buffer, DPR, calls, triangles and CPU ms. No initial record means
      no measurement yet.
    </p>
    <div class="controls">
      <label
        >Count<input
          id="count"
          type="number"
          value="8"
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
      <canvas aria-label="Capture a real comparison baseline"></canvas>
    </div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
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

- Capture the actual frame when Measure is pressed.

</details>

<details>
<summary>Solution and explanation</summary>

The first measurement and conditions are appended to the record. Capture the actual frame when Measure is pressed.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Capture a real comparison baseline</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Capture a real comparison baseline</h1>
    <p>
      Measure to create a baseline. Keep count=8, segments=16 and passes=1. Read
      camera, buffer, DPR, calls, triangles and CPU ms. No initial record means
      no measurement yet.
    </p>
    <div class="controls">
      <label
        >Count<input
          id="count"
          type="number"
          value="8"
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
      <canvas aria-label="Capture a real comparison baseline"></canvas>
    </div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
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

- Can a number without conditions be compared later?

### Compare quality and cost

Measure segments 16 then change to 8 and measure again. Fix count, passes and camera. Compare sphere silhouettes alongside triangles. The starter and solution shapes illustrate quality cost.

**Expected result**

At 8, triangles decrease and silhouettes change. No invented improvement rate is calculated.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Compare quality and cost</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Compare quality and cost</h1>
    <p>
      Measure segments 16 then change to 8 and measure again. Fix count, passes
      and camera. Compare sphere silhouettes alongside triangles. The starter
      and solution shapes illustrate quality cost.
    </p>
    <div class="controls">
      <label
        >Count<input
          id="count"
          type="number"
          value="8"
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
      <canvas aria-label="Compare quality and cost"></canvas>
    </div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
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

- Change geometry within the same layout.

</details>

<details>
<summary>Solution and explanation</summary>

At 8, triangles decrease and silhouettes change. No invented improvement rate is calculated. Change geometry within the same layout.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Compare quality and cost</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Compare quality and cost</h1>
    <p>
      Measure segments 16 then change to 8 and measure again. Fix count, passes
      and camera. Compare sphere silhouettes alongside triangles. The starter
      and solution shapes illustrate quality cost.
    </p>
    <div class="controls">
      <label
        >Count<input
          id="count"
          type="number"
          value="8"
          min="1"
          max="12"
          step="1" /></label
      ><label
        >Segments<input
          id="segments"
          type="number"
          value="8"
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
      <canvas aria-label="Compare quality and cost"></canvas>
    </div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
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

</details>

- Does a lower triangle count prove preserved quality?

### Ledger for repeated creation and release

Press cycle 3 times. Each releases current resources and rebuilds under the same conditions. Created minus disposed is 1 for geometry and material each. After cleanup record whether the difference is 0.

**Expected result**

After 3 cycles each disposed count increases by 3; cleanup makes it equal created.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Ledger for repeated creation and release</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Ledger for repeated creation and release</h1>
    <p>
      Press cycle 3 times. Each releases current resources and rebuilds under
      the same conditions. Created minus disposed is 1 for geometry and material
      each. After cleanup record whether the difference is 0.
    </p>
    <div class="controls">
      <label
        >Count<input
          id="count"
          type="number"
          value="8"
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
      <canvas aria-label="Ledger for repeated creation and release"></canvas>
    </div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
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

- renderer.info.memory includes internal caches, so do not demand zero.

</details>

<details>
<summary>Solution and explanation</summary>

After 3 cycles each disposed count increases by 3; cleanup makes it equal created. renderer.info.memory includes internal caches, so do not demand zero.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Ledger for repeated creation and release</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Ledger for repeated creation and release</h1>
    <p>
      Press cycle 3 times. Each releases current resources and rebuilds under
      the same conditions. Created minus disposed is 1 for geometry and material
      each. After cleanup record whether the difference is 0.
    </p>
    <div class="controls">
      <label
        >Count<input
          id="count"
          type="number"
          value="8"
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
      <canvas aria-label="Ledger for repeated creation and release"></canvas>
    </div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
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

- How does the ownership ledger differ from renderer.info.memory?

### Transfer observations into existing notes

Create 16 versus 8 segment measurements and 3 cycle results. Press Select report and copy with Ctrl+C, then paste into the site Notes tab. Add conditions, actual values, visual differences, cleanup results and measurement limits in your own words; use existing save and backup.

**Expected result**

The report contains actual measurements and release counts and is preserved in site notes.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Transfer observations into existing notes</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Transfer observations into existing notes</h1>
    <p>
      Create 16 versus 8 segment measurements and 3 cycle results. Press Select
      report and copy with Ctrl+C, then paste into the site Notes tab. Add
      conditions, actual values, visual differences, cleanup results and
      measurement limits in your own words; use existing save and backup.
    </p>
    <div class="controls">
      <label
        >Count<input
          id="count"
          type="number"
          value="8"
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
      <canvas aria-label="Transfer observations into existing notes"></canvas>
    </div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
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

- The example iframe does not directly access parent storage.

</details>

<details>
<summary>Solution and explanation</summary>

The report contains actual measurements and release counts and is preserved in site notes. The example iframe does not directly access parent storage.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Transfer observations into existing notes</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Transfer observations into existing notes</h1>
    <p>
      Create 16 versus 8 segment measurements and 3 cycle results. Press Select
      report and copy with Ctrl+C, then paste into the site Notes tab. Add
      conditions, actual values, visual differences, cleanup results and
      measurement limits in your own words; use existing save and backup.
    </p>
    <div class="controls">
      <label
        >Count<input
          id="count"
          type="number"
          value="8"
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
      <canvas aria-label="Transfer observations into existing notes"></canvas>
    </div>
    <output aria-live="polite"></output>
    <pre id="report" tabindex="0"></pre>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};let meshes=[],g=null,m=null,stats={},records=[];const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);
      function rebuild(){releaseAll();g=new THREE.SphereGeometry(.35,Number(document.querySelector("#segments").value),8);m=new THREE.MeshBasicMaterial({color:'#2563eb',wireframe:false});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const count=Number(document.querySelector('#count').value);meshes=Array.from({length:count},(_,i)=>{const o=new THREE.Mesh(g,m);o.position.set((i%4-1.5)*1.1,Math.floor(i/4)-.5,0);scene.add(o);return o;});}
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

- Why is CPU call time not exact GPU execution time?

### API · WebGLRenderer.info / reset

The first measurement and conditions are appended to the record. Capture the actual frame when Measure is pressed.

info is the render and memory statistics object. info.reset() resets render counters and returns undefined; it does not free memory resources.

- The example iframe does not directly access parent storage.

```js
renderer.info.autoReset=false;renderer.info.reset();renderer.render(scene,camera);const calls=renderer.info.render.calls;
```

[WebGLRenderer.info / reset](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

### API · SphereGeometry / dispose

Keep radius, height segments and layout fixed while changing widthSegments from 16 to 8. Dispose old geometry and material before rebuilding. Lower triangles alone do not prove equal quality.

- `radius: number` — Radius .35.
- `widthSegments: number` — Width segments 16 or 8; minimum 3.
- `heightSegments: number` — Height segments stay at 8; minimum 2.

The constructor returns SphereGeometry. dispose returns undefined; call when finished with that geometry.

- Keep radius, height segments and layout fixed while changing widthSegments from 16 to 8. Dispose old geometry and material before rebuilding. Lower triangles alone do not prove equal quality.

```js
const geometry=new THREE.SphereGeometry(.35,8,8); geometry.dispose();
```

[SphereGeometry / dispose](https://threejs.org/docs/pages/SphereGeometry.html) · three@0.186.1 · 2026-10-27

### API · WebGLRenderer.info.memory / getPixelRatio

memory.geometries and textures are renderer-tracked counts, not VRAM bytes. Record owned create/dispose counts separately with buffer, DPR, camera and passes in site notes.

getPixelRatio returns the current DPR number. info.memory contains geometries and textures counts, not GPU bytes.

- memory.geometries and textures are renderer-tracked counts, not VRAM bytes. Record owned create/dispose counts separately with buffer, DPR, camera and passes in site notes.

```js
const conditions={buffer:[canvas.width,canvas.height],dpr:renderer.getPixelRatio(),memory:{...renderer.info.memory}};
```

[WebGLRenderer.info.memory / getPixelRatio](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Integrating the Scene Inspector](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
