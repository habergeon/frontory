# Three.js · 21 Offscreen Objects and Level of Detail

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Animation, Instancing, and Render Passes · Editable example · Storage ID: `threejs-step-21`

## Goals and learning outcomes

- After recomputation, center.x=8 and the cube reappears.
- Stale bounds with culling on give an empty image; off shows the cube. Fresh bounds with culling on show it too.

## Prerequisites

Prerequisite units: 03, 05, 20. Continue these concepts in this experiment.

## Key concepts and explanations

### Vertices and stale bounds

Position attributes and boundingSphere are separate data. Recompute existing bounds after vertex edits.

### Culling bypass and actual repair

Use frustumCulled=false for diagnosis. This exercise fixes the bounds to match vertex positions.

## Practice setup

Edit and run independent HTML in the site using Three.js 0.186.1. No separate installation or server is required. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Continue cameras, vertices, and bounds from 03, 05, and 20. Actual vertices are at X=8 but the starter sphere stays at the origin. The camera targets X=8, leaving an empty image and calls=0. Enable recomputation and Apply; compare sphere center and image.
2. The starter has frustumCulled=false, so the cube remains visible despite stale bounds. Disable recomputation and enable culling to reproduce disappearance. Then enable recomputation and Apply to restore it while keeping culling. Distinguish bypassing culling from correcting bounds.
3. Select LOD and Apply distances 4 then 12. Model center and target stay at X=8; only camera Z changes. At distance 8, an icosahedron with detail=2 switches to detail=0. Record silhouette edges, LOD index, and triangles.

## Variables to observe

| Variable                  | Baseline | Change   | Expected change / hypothesis                            |
| ------------------------- | -------- | -------- | ------------------------------------------------------- |
| Vertices and stale bounds | starter  | solution | After recomputation, center.x=8 and the cube reappears. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] After recomputation, center.x=8 and the cube reappears.
- [ ] Stale bounds with culling on give an empty image; off shows the cube. Fresh bounds with culling on show it too.

## Self-check

1. Why can calls be zero when vertices are inside the view?
2. How do bypassing culling and fixing bounds differ in cost?
3. Which camera/model conditions should accompany quality and cost observations?

## Official references

- [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-21/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run independent HTML inside the site. Record actual observations in the site notes.

- [example.html](../../../../../../../src/labs/threejs-step-21/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Continue cameras, vertices, and bounds from 03, 05, and 20. Actual vertices are at X=8 but the starter sphere stays at the origin. The camera targets X=8, leaving an empty image and calls=0. Enable recomputation and Apply; compare sphere center and image.

### Prerequisite units

- `threejs-step-03`
- `threejs-step-05`
- `threejs-step-20`

### Vertices and stale bounds

Continue cameras, vertices, and bounds from 03, 05, and 20. Actual vertices are at X=8 but the starter sphere stays at the origin. The camera targets X=8, leaving an empty image and calls=0. Enable recomputation and Apply; compare sphere center and image.

**Expected result**

After recomputation, center.x=8 and the cube reappears.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Stale geometry bounds</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Stale geometry bounds</h1>
    <p>Vertices are at X=8 and the camera targets X=8.</p>
    <div class="controls">
      <label
        >Experiment<select id="mode">
          <option value="bounds" selected>Bounds</option>
          <option value="lod">LOD</option>
        </select></label
      ><label><input id="bounds" type="checkbox" />Recompute bounds</label
      ><label><input id="culling" type="checkbox" checked />frustumCulled</label
      ><label
        >Camera distance<input
          id="value"
          type="number"
          value="4"
          min="4"
          max="12"
          step="1" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage"><canvas aria-label="Stale geometry bounds"></canvas></div>
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
      camera.position.set(8,0,4);camera.lookAt(8,0,0);
      const material=new THREE.MeshNormalMaterial({flatShading:true});ownedMaterial.add(material);
      const geometry=new THREE.BoxGeometry(1.5,1.5,1.5);ownedGeometry.add(geometry);geometry.computeBoundingBox();geometry.computeBoundingSphere();geometry.translate(8,0,0);
      const staleBox=new THREE.Box3(new THREE.Vector3(-.75,-.75,-.75),new THREE.Vector3(.75,.75,.75)),staleSphere=new THREE.Sphere(new THREE.Vector3(),Math.sqrt(3)*.75);
      const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
      const lod=new THREE.LOD();lod.position.x=8;lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),material),0);lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),material),8);for(const l of lod.levels)ownedGeometry.add(l.object.geometry);scene.add(lod);let stats={calls:0,triangles:0};

      function configure(){const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;mesh.visible=document.querySelector('#mode').value==='bounds';lod.visible=!mesh.visible;mesh.frustumCulled=document.querySelector('#culling').checked;geometry.boundingBox.copy(staleBox);geometry.boundingSphere.copy(staleSphere);if(document.querySelector('#bounds').checked){geometry.computeBoundingBox();geometry.computeBoundingSphere();}camera.position.set(8,0,Number(input.value));camera.lookAt(8,0,0);}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='bounds center: '+geometry.boundingSphere.center.toArray()+' / LOD: '+lod.getCurrentLevel()+' / distance: '+camera.position.distanceTo(lod.position)+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
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

- Compare vertex X=8 with sphere center.x.
- The camera already targets X=8; keep it fixed.
- Enable bounds recomputation and Apply to obtain center.x=8 and restore drawing.

</details>

<details>
<summary>Solution and explanation</summary>

Position attributes and boundingSphere are separate data. Recompute existing bounds after vertex edits.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Stale geometry bounds</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Stale geometry bounds</h1>
    <p>Vertices are at X=8 and the camera targets X=8.</p>
    <div class="controls">
      <label
        >Experiment<select id="mode">
          <option value="bounds" selected>Bounds</option>
          <option value="lod">LOD</option>
        </select></label
      ><label
        ><input id="bounds" type="checkbox" checked />Recompute bounds</label
      ><label><input id="culling" type="checkbox" checked />frustumCulled</label
      ><label
        >Camera distance<input
          id="value"
          type="number"
          value="4"
          min="4"
          max="12"
          step="1" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage"><canvas aria-label="Stale geometry bounds"></canvas></div>
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
      camera.position.set(8,0,4);camera.lookAt(8,0,0);
      const material=new THREE.MeshNormalMaterial({flatShading:true});ownedMaterial.add(material);
      const geometry=new THREE.BoxGeometry(1.5,1.5,1.5);ownedGeometry.add(geometry);geometry.computeBoundingBox();geometry.computeBoundingSphere();geometry.translate(8,0,0);
      const staleBox=new THREE.Box3(new THREE.Vector3(-.75,-.75,-.75),new THREE.Vector3(.75,.75,.75)),staleSphere=new THREE.Sphere(new THREE.Vector3(),Math.sqrt(3)*.75);
      const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
      const lod=new THREE.LOD();lod.position.x=8;lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),material),0);lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),material),8);for(const l of lod.levels)ownedGeometry.add(l.object.geometry);scene.add(lod);let stats={calls:0,triangles:0};

      function configure(){const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;mesh.visible=document.querySelector('#mode').value==='bounds';lod.visible=!mesh.visible;mesh.frustumCulled=document.querySelector('#culling').checked;geometry.boundingBox.copy(staleBox);geometry.boundingSphere.copy(staleSphere);if(document.querySelector('#bounds').checked){geometry.computeBoundingBox();geometry.computeBoundingSphere();}camera.position.set(8,0,Number(input.value));camera.lookAt(8,0,0);}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='bounds center: '+geometry.boundingSphere.center.toArray()+' / LOD: '+lod.getCurrentLevel()+' / distance: '+camera.position.distanceTo(lod.position)+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
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

- Why can calls be zero when vertices are inside the view?

### Culling bypass and actual repair

The starter has frustumCulled=false, so the cube remains visible despite stale bounds. Disable recomputation and enable culling to reproduce disappearance. Then enable recomputation and Apply to restore it while keeping culling. Distinguish bypassing culling from correcting bounds.

**Expected result**

Stale bounds with culling on give an empty image; off shows the cube. Fresh bounds with culling on show it too.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Culling symptoms and repair</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Culling symptoms and repair</h1>
    <p>Vertices are at X=8 and the camera targets X=8.</p>
    <div class="controls">
      <label
        >Experiment<select id="mode">
          <option value="bounds" selected>Bounds</option>
          <option value="lod">LOD</option>
        </select></label
      ><label><input id="bounds" type="checkbox" />Recompute bounds</label
      ><label><input id="culling" type="checkbox" />frustumCulled</label
      ><label
        >Camera distance<input
          id="value"
          type="number"
          value="4"
          min="4"
          max="12"
          step="1" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="Culling symptoms and repair"></canvas>
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
      camera.position.set(8,0,4);camera.lookAt(8,0,0);
      const material=new THREE.MeshNormalMaterial({flatShading:true});ownedMaterial.add(material);
      const geometry=new THREE.BoxGeometry(1.5,1.5,1.5);ownedGeometry.add(geometry);geometry.computeBoundingBox();geometry.computeBoundingSphere();geometry.translate(8,0,0);
      const staleBox=new THREE.Box3(new THREE.Vector3(-.75,-.75,-.75),new THREE.Vector3(.75,.75,.75)),staleSphere=new THREE.Sphere(new THREE.Vector3(),Math.sqrt(3)*.75);
      const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
      const lod=new THREE.LOD();lod.position.x=8;lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),material),0);lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),material),8);for(const l of lod.levels)ownedGeometry.add(l.object.geometry);scene.add(lod);let stats={calls:0,triangles:0};

      function configure(){const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;mesh.visible=document.querySelector('#mode').value==='bounds';lod.visible=!mesh.visible;mesh.frustumCulled=document.querySelector('#culling').checked;geometry.boundingBox.copy(staleBox);geometry.boundingSphere.copy(staleSphere);if(document.querySelector('#bounds').checked){geometry.computeBoundingBox();geometry.computeBoundingSphere();}camera.position.set(8,0,Number(input.value));camera.lookAt(8,0,0);}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='bounds center: '+geometry.boundingSphere.center.toArray()+' / LOD: '+lod.getCurrentLevel()+' / distance: '+camera.position.distanceTo(lod.position)+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
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

- Toggle culling while keeping stale bounds.
- Culling off bypasses the test without correcting bounds.
- Keep culling on and Apply bounds recomputation to restore the cube.

</details>

<details>
<summary>Solution and explanation</summary>

Use frustumCulled=false for diagnosis. This exercise fixes the bounds to match vertex positions.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Culling symptoms and repair</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Culling symptoms and repair</h1>
    <p>Vertices are at X=8 and the camera targets X=8.</p>
    <div class="controls">
      <label
        >Experiment<select id="mode">
          <option value="bounds" selected>Bounds</option>
          <option value="lod">LOD</option>
        </select></label
      ><label
        ><input id="bounds" type="checkbox" checked />Recompute bounds</label
      ><label><input id="culling" type="checkbox" checked />frustumCulled</label
      ><label
        >Camera distance<input
          id="value"
          type="number"
          value="4"
          min="4"
          max="12"
          step="1" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="Culling symptoms and repair"></canvas>
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
      camera.position.set(8,0,4);camera.lookAt(8,0,0);
      const material=new THREE.MeshNormalMaterial({flatShading:true});ownedMaterial.add(material);
      const geometry=new THREE.BoxGeometry(1.5,1.5,1.5);ownedGeometry.add(geometry);geometry.computeBoundingBox();geometry.computeBoundingSphere();geometry.translate(8,0,0);
      const staleBox=new THREE.Box3(new THREE.Vector3(-.75,-.75,-.75),new THREE.Vector3(.75,.75,.75)),staleSphere=new THREE.Sphere(new THREE.Vector3(),Math.sqrt(3)*.75);
      const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
      const lod=new THREE.LOD();lod.position.x=8;lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),material),0);lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),material),8);for(const l of lod.levels)ownedGeometry.add(l.object.geometry);scene.add(lod);let stats={calls:0,triangles:0};

      function configure(){const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;mesh.visible=document.querySelector('#mode').value==='bounds';lod.visible=!mesh.visible;mesh.frustumCulled=document.querySelector('#culling').checked;geometry.boundingBox.copy(staleBox);geometry.boundingSphere.copy(staleSphere);if(document.querySelector('#bounds').checked){geometry.computeBoundingBox();geometry.computeBoundingSphere();}camera.position.set(8,0,Number(input.value));camera.lookAt(8,0,0);}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='bounds center: '+geometry.boundingSphere.center.toArray()+' / LOD: '+lod.getCurrentLevel()+' / distance: '+camera.position.distanceTo(lod.position)+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
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

- How do bypassing culling and fixing bounds differ in cost?

### Distance and actual triangle counts

Select LOD and Apply distances 4 then 12. Model center and target stay at X=8; only camera Z changes. At distance 8, an icosahedron with detail=2 switches to detail=0. Record silhouette edges, LOD index, and triangles.

**Expected result**

Distance 4 gives level=0 and triangles=180; distance 12 gives level=1 and triangles=20.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Distance and level of detail</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Distance and level of detail</h1>
    <p>Vertices are at X=8 and the camera targets X=8.</p>
    <div class="controls">
      <label
        >Experiment<select id="mode">
          <option value="bounds">Bounds</option>
          <option value="lod" selected>LOD</option>
        </select></label
      ><label
        ><input id="bounds" type="checkbox" checked />Recompute bounds</label
      ><label><input id="culling" type="checkbox" checked />frustumCulled</label
      ><label
        >Camera distance<input
          id="value"
          type="number"
          value="4"
          min="4"
          max="12"
          step="1" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="Distance and level of detail"></canvas>
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
      camera.position.set(8,0,4);camera.lookAt(8,0,0);
      const material=new THREE.MeshNormalMaterial({flatShading:true});ownedMaterial.add(material);
      const geometry=new THREE.BoxGeometry(1.5,1.5,1.5);ownedGeometry.add(geometry);geometry.computeBoundingBox();geometry.computeBoundingSphere();geometry.translate(8,0,0);
      const staleBox=new THREE.Box3(new THREE.Vector3(-.75,-.75,-.75),new THREE.Vector3(.75,.75,.75)),staleSphere=new THREE.Sphere(new THREE.Vector3(),Math.sqrt(3)*.75);
      const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
      const lod=new THREE.LOD();lod.position.x=8;lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),material),0);lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),material),8);for(const l of lod.levels)ownedGeometry.add(l.object.geometry);scene.add(lod);let stats={calls:0,triangles:0};

      function configure(){const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;mesh.visible=document.querySelector('#mode').value==='bounds';lod.visible=!mesh.visible;mesh.frustumCulled=document.querySelector('#culling').checked;geometry.boundingBox.copy(staleBox);geometry.boundingSphere.copy(staleSphere);if(document.querySelector('#bounds').checked){geometry.computeBoundingBox();geometry.computeBoundingSphere();}camera.position.set(8,0,Number(input.value));camera.lookAt(8,0,0);}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='bounds center: '+geometry.boundingSphere.center.toArray()+' / LOD: '+lod.getCurrentLevel()+' / distance: '+camera.position.distanceTo(lod.position)+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
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

- Select the LOD experiment.
- Model and target remain X=8; change only distance from 4 to 12.
- Compare level and actual triangles=180/20 across threshold 8.

</details>

<details>
<summary>Solution and explanation</summary>

IcosahedronGeometry detail=2 divides each face into 9 triangles, totaling 180. addLevel distance is measured from world model position to the camera.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Distance and level of detail</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Distance and level of detail</h1>
    <p>Vertices are at X=8 and the camera targets X=8.</p>
    <div class="controls">
      <label
        >Experiment<select id="mode">
          <option value="bounds">Bounds</option>
          <option value="lod" selected>LOD</option>
        </select></label
      ><label
        ><input id="bounds" type="checkbox" checked />Recompute bounds</label
      ><label><input id="culling" type="checkbox" checked />frustumCulled</label
      ><label
        >Camera distance<input
          id="value"
          type="number"
          value="12"
          min="4"
          max="12"
          step="1" /></label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="Distance and level of detail"></canvas>
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
      camera.position.set(8,0,4);camera.lookAt(8,0,0);
      const material=new THREE.MeshNormalMaterial({flatShading:true});ownedMaterial.add(material);
      const geometry=new THREE.BoxGeometry(1.5,1.5,1.5);ownedGeometry.add(geometry);geometry.computeBoundingBox();geometry.computeBoundingSphere();geometry.translate(8,0,0);
      const staleBox=new THREE.Box3(new THREE.Vector3(-.75,-.75,-.75),new THREE.Vector3(.75,.75,.75)),staleSphere=new THREE.Sphere(new THREE.Vector3(),Math.sqrt(3)*.75);
      const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
      const lod=new THREE.LOD();lod.position.x=8;lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),material),0);lod.addLevel(new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),material),8);for(const l of lod.levels)ownedGeometry.add(l.object.geometry);scene.add(lod);let stats={calls:0,triangles:0};

      function configure(){const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;mesh.visible=document.querySelector('#mode').value==='bounds';lod.visible=!mesh.visible;mesh.frustumCulled=document.querySelector('#culling').checked;geometry.boundingBox.copy(staleBox);geometry.boundingSphere.copy(staleSphere);if(document.querySelector('#bounds').checked){geometry.computeBoundingBox();geometry.computeBoundingSphere();}camera.position.set(8,0,Number(input.value));camera.lookAt(8,0,0);}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};output.textContent='bounds center: '+geometry.boundingSphere.center.toArray()+' / LOD: '+lod.getCurrentLevel()+' / distance: '+camera.position.distanceTo(lod.position)+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
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

- Which camera/model conditions should accompany quality and cost observations?

### API · BufferGeometry.computeBoundingSphere

Compute geometry sphere bounds from vertices.

Updates boundingSphere.

- Existing bounds are not automatically refreshed by vertex edits.

```js
geometry.computeBoundingBox();geometry.computeBoundingSphere();
```

[BufferGeometry.computeBoundingSphere](https://threejs.org/docs/pages/BufferGeometry.html) · three@0.186.1 · 2026-10-27

### API · Object3D.frustumCulled

Control camera frustum checks.

A boolean property, true by default.

- Visibility with false does not prove correct bounds.

```js
mesh.frustumCulled=true;
```

[Object3D.frustumCulled](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-27

### API · LOD.addLevel

Register an object for a distance.

- `object: Object3D` — Object for this distance
- `distance: number` — Distance between camera and object

Returns this LOD.

- With default autoUpdate=true the renderer chooses the level.

```js
lod.addLevel(high,0);lod.addLevel(low,8);
```

[LOD.addLevel](https://threejs.org/docs/pages/LOD.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Instance Selection and Updates](../20/README.md) · [Next: Render Targets and Minimap](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
