# Three.js · 19 Instancing Basics

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Animation, Instancing, and Render Passes · Editable example · Storage ID: `threejs-step-19`

## Goals and learning outcomes

- Mesh calls=500, InstancedMesh calls=1; both have triangles=6000.
- With upload off, version and image remain unchanged. With upload on, version increases and all 500 cubes move.

## Prerequisites

Prerequisite units: 04, 05, 07. Continue these concepts in this experiment.

## Key concepts and explanations

### Individual Mesh objects

Shared references alone do not merge calls. InstancedMesh draws one geometry with multiple matrices.

### CPU matrices and GPU uploads

setMatrixAt writes the CPU array. Set needsUpdate=true once after the loop to upload it.

## Practice setup

Edit and run independent HTML in the site using Three.js 0.186.1. No separate installation or server is required. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Continue transforms, geometry, and sharing from 04, 05, and 07. A 25-column by 20-row grid contains 500 cubes sharing geometry and material. Apply Mesh then InstancedMesh. Keep camera, coordinates, and count fixed; record calls, triangles, and layout.
2. The starter uses InstancedMesh with upload unchecked. Apply X shift=0.8. CPU X[0] becomes -1.6 but the image stays unchanged. Check upload and Apply again. Initial matrices are uploaded once before the first render.
3. The starter count is 100. Set 500 and compare Mesh with InstancedMesh. 100 cubes give triangles=1200; 500 give 6000. Explain why fewer calls do not guarantee improved FPS. This scene has one pass per frame.

## Variables to observe

| Variable                | Baseline | Change   | Expected change / hypothesis                                     |
| ----------------------- | -------- | -------- | ---------------------------------------------------------------- |
| Individual Mesh objects | starter  | solution | Mesh calls=500, InstancedMesh calls=1; both have triangles=6000. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Mesh calls=500, InstancedMesh calls=1; both have triangles=6000.
- [ ] With upload off, version and image remain unchanged. With upload on, version increases and all 500 cubes move.

## Self-check

1. Which comparison condition should you check if layout changes?
2. What is missing when CPU and image positions differ?
3. Which changes reduce calls and triangles respectively?

## Official references

- [Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-19/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run independent HTML inside the site. Record actual observations in the site notes.

- [example.html](../../../../../../../src/labs/threejs-step-19/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Continue transforms, geometry, and sharing from 04, 05, and 07. A 25-column by 20-row grid contains 500 cubes sharing geometry and material. Apply Mesh then InstancedMesh. Keep camera, coordinates, and count fixed; record calls, triangles, and layout.

### Prerequisite units

- `threejs-step-04`
- `threejs-step-05`
- `threejs-step-07`

### Individual Mesh objects

Continue transforms, geometry, and sharing from 04, 05, and 07. A 25-column by 20-row grid contains 500 cubes sharing geometry and material. Apply Mesh then InstancedMesh. Keep camera, coordinates, and count fixed; record calls, triangles, and layout.

**Expected result**

Mesh calls=500, InstancedMesh calls=1; both have triangles=6000.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>500 Mesh objects in one layout</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>500 Mesh objects in one layout</h1>
    <p>
      Both representations share coordinates, BoxGeometry, MeshBasicMaterial,
      and camera. Apply Mesh and InstancedMesh separately. After a matrix edit,
      disabling upload changes CPU data while the image keeps the previous
      position.
    </p>
    <div class="controls">
      <label
        >Representation<select id="mode">
          <option value="mesh" selected>Mesh</option>
          <option value="instances">InstancedMesh</option>
        </select></label
      ><label
        >Count<input
          id="count"
          type="number"
          value="500"
          min="1"
          max="500"
          step="1" /></label
      ><label
        >X shift<input
          id="value"
          type="number"
          value="0"
          min="-1"
          max="1"
          step="0.1" /></label
      ><label
        ><input
          id="upload"
          type="checkbox"
          checked
        />instanceMatrix.needsUpdate</label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="500 Mesh objects in one layout"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');
      const camera=new THREE.PerspectiveCamera(45,1,.1,100);
      const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set(),ownedInstances=new Set();
      const events=new AbortController();let disposed=false,frames=0;
      const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});
      camera.position.set(0,0,8);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(.13,.13,.13),material=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const positions=Array.from({length:500},(_,i)=>new THREE.Vector3((i%25-12)*.2,(Math.floor(i/25)-9.5)*.2,0));
      const group=new THREE.Group();scene.add(group);const meshes=positions.map(p=>{const m=new THREE.Mesh(geometry,material);m.position.copy(p);group.add(m);return m;});
      const instances=new THREE.InstancedMesh(geometry,material,500);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4();for(let i=0;i<500;i++)instances.setMatrixAt(i,matrix.makeTranslation(...positions[i].toArray()));instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();
      let stats={calls:0,triangles:0};

      function configure(){const n=document.querySelector('#count'),x=document.querySelector('#value');if(!n.checkValidity()||!x.checkValidity()||!n.value||!x.value)return;const count=Number(n.value),shift=Number(x.value);group.visible=document.querySelector('#mode').value==='mesh';instances.visible=!group.visible;instances.count=count;meshes.forEach((m,i)=>{m.visible=i<count;m.position.copy(positions[i]);m.position.x+=shift;instances.setMatrixAt(i,matrix.makeTranslation(m.position.x,m.position.y,0));});if(document.querySelector('#upload').checked)instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='calls: '+stats.calls+' / triangles: '+stats.triangles+' / instanceMatrix.version: '+instances.instanceMatrix.version+' / CPU X[0]: '+instances.instanceMatrix.array[12];}
      on('#apply','click',()=>{configure();draw();});configure();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='Resources disposed';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Check that both representations read the same positions array.
- Keep geometry, material, and camera fixed; change only representation.
- At 500 cubes compare calls=500 and 1 while triangles stay 6000.

</details>

<details>
<summary>Solution and explanation</summary>

Shared references alone do not merge calls. InstancedMesh draws one geometry with multiple matrices.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>500 Mesh objects in one layout</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>500 Mesh objects in one layout</h1>
    <p>
      Both representations share coordinates, BoxGeometry, MeshBasicMaterial,
      and camera. Apply Mesh and InstancedMesh separately. After a matrix edit,
      disabling upload changes CPU data while the image keeps the previous
      position.
    </p>
    <div class="controls">
      <label
        >Representation<select id="mode">
          <option value="mesh">Mesh</option>
          <option value="instances" selected>InstancedMesh</option>
        </select></label
      ><label
        >Count<input
          id="count"
          type="number"
          value="500"
          min="1"
          max="500"
          step="1" /></label
      ><label
        >X shift<input
          id="value"
          type="number"
          value="0"
          min="-1"
          max="1"
          step="0.1" /></label
      ><label
        ><input
          id="upload"
          type="checkbox"
          checked
        />instanceMatrix.needsUpdate</label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="500 Mesh objects in one layout"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');
      const camera=new THREE.PerspectiveCamera(45,1,.1,100);
      const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set(),ownedInstances=new Set();
      const events=new AbortController();let disposed=false,frames=0;
      const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});
      camera.position.set(0,0,8);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(.13,.13,.13),material=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const positions=Array.from({length:500},(_,i)=>new THREE.Vector3((i%25-12)*.2,(Math.floor(i/25)-9.5)*.2,0));
      const group=new THREE.Group();scene.add(group);const meshes=positions.map(p=>{const m=new THREE.Mesh(geometry,material);m.position.copy(p);group.add(m);return m;});
      const instances=new THREE.InstancedMesh(geometry,material,500);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4();for(let i=0;i<500;i++)instances.setMatrixAt(i,matrix.makeTranslation(...positions[i].toArray()));instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();
      let stats={calls:0,triangles:0};

      function configure(){const n=document.querySelector('#count'),x=document.querySelector('#value');if(!n.checkValidity()||!x.checkValidity()||!n.value||!x.value)return;const count=Number(n.value),shift=Number(x.value);group.visible=document.querySelector('#mode').value==='mesh';instances.visible=!group.visible;instances.count=count;meshes.forEach((m,i)=>{m.visible=i<count;m.position.copy(positions[i]);m.position.x+=shift;instances.setMatrixAt(i,matrix.makeTranslation(m.position.x,m.position.y,0));});if(document.querySelector('#upload').checked)instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='calls: '+stats.calls+' / triangles: '+stats.triangles+' / instanceMatrix.version: '+instances.instanceMatrix.version+' / CPU X[0]: '+instances.instanceMatrix.array[12];}
      on('#apply','click',()=>{configure();draw();});configure();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='Resources disposed';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- Which comparison condition should you check if layout changes?

### CPU matrices and GPU uploads

The starter uses InstancedMesh with upload unchecked. Apply X shift=0.8. CPU X[0] becomes -1.6 but the image stays unchanged. Check upload and Apply again. Initial matrices are uploaded once before the first render.

**Expected result**

With upload off, version and image remain unchanged. With upload on, version increases and all 500 cubes move.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Matrix updates and uploads</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Matrix updates and uploads</h1>
    <p>
      Both representations share coordinates, BoxGeometry, MeshBasicMaterial,
      and camera. Apply Mesh and InstancedMesh separately. After a matrix edit,
      disabling upload changes CPU data while the image keeps the previous
      position.
    </p>
    <div class="controls">
      <label
        >Representation<select id="mode">
          <option value="mesh">Mesh</option>
          <option value="instances" selected>InstancedMesh</option>
        </select></label
      ><label
        >Count<input
          id="count"
          type="number"
          value="500"
          min="1"
          max="500"
          step="1" /></label
      ><label
        >X shift<input
          id="value"
          type="number"
          value="0"
          min="-1"
          max="1"
          step="0.1" /></label
      ><label
        ><input id="upload" type="checkbox" />instanceMatrix.needsUpdate</label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="Matrix updates and uploads"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');
      const camera=new THREE.PerspectiveCamera(45,1,.1,100);
      const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set(),ownedInstances=new Set();
      const events=new AbortController();let disposed=false,frames=0;
      const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});
      camera.position.set(0,0,8);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(.13,.13,.13),material=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const positions=Array.from({length:500},(_,i)=>new THREE.Vector3((i%25-12)*.2,(Math.floor(i/25)-9.5)*.2,0));
      const group=new THREE.Group();scene.add(group);const meshes=positions.map(p=>{const m=new THREE.Mesh(geometry,material);m.position.copy(p);group.add(m);return m;});
      const instances=new THREE.InstancedMesh(geometry,material,500);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4();for(let i=0;i<500;i++)instances.setMatrixAt(i,matrix.makeTranslation(...positions[i].toArray()));instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();
      let stats={calls:0,triangles:0};

      function configure(){const n=document.querySelector('#count'),x=document.querySelector('#value');if(!n.checkValidity()||!x.checkValidity()||!n.value||!x.value)return;const count=Number(n.value),shift=Number(x.value);group.visible=document.querySelector('#mode').value==='mesh';instances.visible=!group.visible;instances.count=count;meshes.forEach((m,i)=>{m.visible=i<count;m.position.copy(positions[i]);m.position.x+=shift;instances.setMatrixAt(i,matrix.makeTranslation(m.position.x,m.position.y,0));});if(document.querySelector('#upload').checked)instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='calls: '+stats.calls+' / triangles: '+stats.triangles+' / instanceMatrix.version: '+instances.instanceMatrix.version+' / CPU X[0]: '+instances.instanceMatrix.array[12];}
      on('#apply','click',()=>{configure();draw();});configure();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='Resources disposed';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Read CPU X[0] separately from the image.
- Check whether instanceMatrix.version increases after setMatrixAt.
- Check upload and Apply X=0.8 again.

</details>

<details>
<summary>Solution and explanation</summary>

setMatrixAt writes the CPU array. Set needsUpdate=true once after the loop to upload it.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Matrix updates and uploads</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Matrix updates and uploads</h1>
    <p>
      Both representations share coordinates, BoxGeometry, MeshBasicMaterial,
      and camera. Apply Mesh and InstancedMesh separately. After a matrix edit,
      disabling upload changes CPU data while the image keeps the previous
      position.
    </p>
    <div class="controls">
      <label
        >Representation<select id="mode">
          <option value="mesh">Mesh</option>
          <option value="instances" selected>InstancedMesh</option>
        </select></label
      ><label
        >Count<input
          id="count"
          type="number"
          value="500"
          min="1"
          max="500"
          step="1" /></label
      ><label
        >X shift<input
          id="value"
          type="number"
          value="0"
          min="-1"
          max="1"
          step="0.1" /></label
      ><label
        ><input
          id="upload"
          type="checkbox"
          checked
        />instanceMatrix.needsUpdate</label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="Matrix updates and uploads"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');
      const camera=new THREE.PerspectiveCamera(45,1,.1,100);
      const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set(),ownedInstances=new Set();
      const events=new AbortController();let disposed=false,frames=0;
      const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});
      camera.position.set(0,0,8);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(.13,.13,.13),material=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const positions=Array.from({length:500},(_,i)=>new THREE.Vector3((i%25-12)*.2,(Math.floor(i/25)-9.5)*.2,0));
      const group=new THREE.Group();scene.add(group);const meshes=positions.map(p=>{const m=new THREE.Mesh(geometry,material);m.position.copy(p);group.add(m);return m;});
      const instances=new THREE.InstancedMesh(geometry,material,500);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4();for(let i=0;i<500;i++)instances.setMatrixAt(i,matrix.makeTranslation(...positions[i].toArray()));instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();
      let stats={calls:0,triangles:0};

      function configure(){const n=document.querySelector('#count'),x=document.querySelector('#value');if(!n.checkValidity()||!x.checkValidity()||!n.value||!x.value)return;const count=Number(n.value),shift=Number(x.value);group.visible=document.querySelector('#mode').value==='mesh';instances.visible=!group.visible;instances.count=count;meshes.forEach((m,i)=>{m.visible=i<count;m.position.copy(positions[i]);m.position.x+=shift;instances.setMatrixAt(i,matrix.makeTranslation(m.position.x,m.position.y,0));});if(document.querySelector('#upload').checked)instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='calls: '+stats.calls+' / triangles: '+stats.triangles+' / instanceMatrix.version: '+instances.instanceMatrix.version+' / CPU X[0]: '+instances.instanceMatrix.array[12];}
      on('#apply','click',()=>{configure();draw();});configure();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='Resources disposed';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- What is missing when CPU and image positions differ?

### Statistics under equal conditions

The starter count is 100. Set 500 and compare Mesh with InstancedMesh. 100 cubes give triangles=1200; 500 give 6000. Explain why fewer calls do not guarantee improved FPS. This scene has one pass per frame.

**Expected result**

At 500 cubes, calls change 500→1 while triangles remain 6000→6000.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Compare rendering statistics</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Compare rendering statistics</h1>
    <p>
      Both representations share coordinates, BoxGeometry, MeshBasicMaterial,
      and camera. Apply Mesh and InstancedMesh separately. After a matrix edit,
      disabling upload changes CPU data while the image keeps the previous
      position.
    </p>
    <div class="controls">
      <label
        >Representation<select id="mode">
          <option value="mesh">Mesh</option>
          <option value="instances" selected>InstancedMesh</option>
        </select></label
      ><label
        >Count<input
          id="count"
          type="number"
          value="100"
          min="1"
          max="500"
          step="1" /></label
      ><label
        >X shift<input
          id="value"
          type="number"
          value="0"
          min="-1"
          max="1"
          step="0.1" /></label
      ><label
        ><input
          id="upload"
          type="checkbox"
          checked
        />instanceMatrix.needsUpdate</label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="Compare rendering statistics"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');
      const camera=new THREE.PerspectiveCamera(45,1,.1,100);
      const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set(),ownedInstances=new Set();
      const events=new AbortController();let disposed=false,frames=0;
      const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});
      camera.position.set(0,0,8);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(.13,.13,.13),material=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const positions=Array.from({length:500},(_,i)=>new THREE.Vector3((i%25-12)*.2,(Math.floor(i/25)-9.5)*.2,0));
      const group=new THREE.Group();scene.add(group);const meshes=positions.map(p=>{const m=new THREE.Mesh(geometry,material);m.position.copy(p);group.add(m);return m;});
      const instances=new THREE.InstancedMesh(geometry,material,500);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4();for(let i=0;i<500;i++)instances.setMatrixAt(i,matrix.makeTranslation(...positions[i].toArray()));instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();
      let stats={calls:0,triangles:0};

      function configure(){const n=document.querySelector('#count'),x=document.querySelector('#value');if(!n.checkValidity()||!x.checkValidity()||!n.value||!x.value)return;const count=Number(n.value),shift=Number(x.value);group.visible=document.querySelector('#mode').value==='mesh';instances.visible=!group.visible;instances.count=count;meshes.forEach((m,i)=>{m.visible=i<count;m.position.copy(positions[i]);m.position.x+=shift;instances.setMatrixAt(i,matrix.makeTranslation(m.position.x,m.position.y,0));});if(document.querySelector('#upload').checked)instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='calls: '+stats.calls+' / triangles: '+stats.triangles+' / instanceMatrix.version: '+instances.instanceMatrix.version+' / CPU X[0]: '+instances.instanceMatrix.array[12];}
      on('#apply','click',()=>{configure();draw();});configure();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='Resources disposed';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- First check whether count is 100 or 500.
- Each cube contains 12 triangles.
- Fix count at 500 and record actual statistics for Mesh and InstancedMesh separately.

</details>

<details>
<summary>Solution and explanation</summary>

renderer.info.render reports actual counts. This single pass uses default autoReset; counts are neither timing nor GPU utilization.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Compare rendering statistics</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Compare rendering statistics</h1>
    <p>
      Both representations share coordinates, BoxGeometry, MeshBasicMaterial,
      and camera. Apply Mesh and InstancedMesh separately. After a matrix edit,
      disabling upload changes CPU data while the image keeps the previous
      position.
    </p>
    <div class="controls">
      <label
        >Representation<select id="mode">
          <option value="mesh">Mesh</option>
          <option value="instances" selected>InstancedMesh</option>
        </select></label
      ><label
        >Count<input
          id="count"
          type="number"
          value="500"
          min="1"
          max="500"
          step="1" /></label
      ><label
        >X shift<input
          id="value"
          type="number"
          value="0"
          min="-1"
          max="1"
          step="0.1" /></label
      ><label
        ><input
          id="upload"
          type="checkbox"
          checked
        />instanceMatrix.needsUpdate</label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="Compare rendering statistics"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');
      const camera=new THREE.PerspectiveCamera(45,1,.1,100);
      const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set(),ownedInstances=new Set();
      const events=new AbortController();let disposed=false,frames=0;
      const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});
      camera.position.set(0,0,8);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(.13,.13,.13),material=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const positions=Array.from({length:500},(_,i)=>new THREE.Vector3((i%25-12)*.2,(Math.floor(i/25)-9.5)*.2,0));
      const group=new THREE.Group();scene.add(group);const meshes=positions.map(p=>{const m=new THREE.Mesh(geometry,material);m.position.copy(p);group.add(m);return m;});
      const instances=new THREE.InstancedMesh(geometry,material,500);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4();for(let i=0;i<500;i++)instances.setMatrixAt(i,matrix.makeTranslation(...positions[i].toArray()));instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();
      let stats={calls:0,triangles:0};

      function configure(){const n=document.querySelector('#count'),x=document.querySelector('#value');if(!n.checkValidity()||!x.checkValidity()||!n.value||!x.value)return;const count=Number(n.value),shift=Number(x.value);group.visible=document.querySelector('#mode').value==='mesh';instances.visible=!group.visible;instances.count=count;meshes.forEach((m,i)=>{m.visible=i<count;m.position.copy(positions[i]);m.position.x+=shift;instances.setMatrixAt(i,matrix.makeTranslation(m.position.x,m.position.y,0));});if(document.querySelector('#upload').checked)instances.instanceMatrix.needsUpdate=true;instances.computeBoundingSphere();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='calls: '+stats.calls+' / triangles: '+stats.triangles+' / instanceMatrix.version: '+instances.instanceMatrix.version+' / CPU X[0]: '+instances.instanceMatrix.array[12];}
      on('#apply','click',()=>{configure();draw();});configure();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='Resources disposed';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- Which changes reduce calls and triangles respectively?

### API · InstancedMesh

Draw shared geometry and material with multiple transforms.

- `geometry: BufferGeometry` — Shared geometry
- `material: Material|Material[]` — Shared material
- `count: number` — Maximum instance count

Returns a new InstancedMesh.

- Instances do not have separate geometry.

```js
const mesh=new THREE.InstancedMesh(geometry,material,500);
```

[InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html) · three@0.186.1 · 2026-10-27

### API · InstancedMesh.setMatrixAt

Write a CPU instance matrix.

- `index: number` — Index from 0 to count-1
- `matrix: Matrix4` — Local transform

Returns undefined.

- Set instanceMatrix.needsUpdate=true after edits.

```js
mesh.setMatrixAt(0,new THREE.Matrix4().makeTranslation(1,0,0));mesh.instanceMatrix.needsUpdate=true;
```

[InstancedMesh.setMatrixAt](https://threejs.org/docs/pages/InstancedMesh.html) · three@0.186.1 · 2026-10-27

### API · WebGLRenderer.info

Read actual calls and triangles.

info.render.calls and triangles are numbers.

- Default autoReset resets per render. Multiple passes need explicit accumulation.

```js
renderer.render(scene,camera);console.log(renderer.info.render.calls,renderer.info.render.triangles);
```

[WebGLRenderer.info](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Transparency and Depth](../18/README.md) · [Next: Instance Selection and Updates](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
