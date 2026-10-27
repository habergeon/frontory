# Three.js · 20 Instance Selection and Updates

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Animation, Instancing, and Render Passes · Editable example · Storage ID: `threejs-step-20`

## Goals and learning outcomes

- Clicking center yields instanceId=1; empty space yields null.
- Uploading both buffers turns only instance 1 into a red cube at X=4.

## Prerequisites

Prerequisite units: 13, 19. Continue these concepts in this experiment.

## Key concepts and explanations

### Object and instanceId

Keeping only intersection.object loses the instance identity. Keep intersection.instanceId too.

### Upload selected matrix and color

setMatrixAt and setColorAt write different buffers. Uploading only position can leave the old color.

## Practice setup

Edit and run independent HTML in the site using Three.js 0.186.1. No separate installation or server is required. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Continue raycasting and instancing from 13 and 19. Pointer selection starts disabled. Enable it and click the center cube. All three share one object, but left/center/right instanceId values are 0/1/2. NDC uses the actual canvas rectangle; check selection after margins and resize.
2. Select center and Apply X=4. Upload starts off, changing only CPU matrix/color data. Enable upload and Apply again to see movement and red color. Instances 0 and 2 must stay unchanged. Set matrix and color needsUpdate separately.
3. Bounds recomputation starts off. Select center, Apply X=4, then click the red cube at its new position. The old sphere rejects the ray first, giving null. Enable recomputation, reset, and repeat selection, Apply, and reselect.

## Variables to observe

| Variable              | Baseline | Change   | Expected change / hypothesis                                  |
| --------------------- | -------- | -------- | ------------------------------------------------------------- |
| Object and instanceId | starter  | solution | Clicking center yields instanceId=1; empty space yields null. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Clicking center yields instanceId=1; empty space yields null.
- [ ] Uploading both buffers turns only instance 1 into a red cube at X=4.

## Self-check

1. Which value distinguishes cubes sharing the same object?
2. Does uploading the matrix also upload color?
3. Why can raycast miss a visible cube?

## Official references

- [Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-20/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run independent HTML inside the site. Record actual observations in the site notes.

- [example.html](../../../../../../../src/labs/threejs-step-20/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Continue raycasting and instancing from 13 and 19. Pointer selection starts disabled. Enable it and click the center cube. All three share one object, but left/center/right instanceId values are 0/1/2. NDC uses the actual canvas rectangle; check selection after margins and resize.

### Prerequisite units

- `threejs-step-13`
- `threejs-step-19`

### Object and instanceId

Continue raycasting and instancing from 13 and 19. Pointer selection starts disabled. Enable it and click the center cube. All three share one object, but left/center/right instanceId values are 0/1/2. NDC uses the actual canvas rectangle; check selection after margins and resize.

**Expected result**

Clicking center yields instanceId=1; empty space yields null.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Select instanceId</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Select instanceId</h1>
    <p>
      Click the center blue cube to select instanceId=1. Apply X=4 to move only
      that cube right and color it red. Click its new position again. A stale
      bounding sphere can make raycast miss a visible cube. After reset, select
      the center again.
    </p>
    <div class="controls">
      <label
        >Selected X<input
          id="value"
          type="number"
          value="4"
          min="-4"
          max="4"
          step="0.25" /></label
      ><label><input id="picking" type="checkbox" />Pointer selection</label
      ><label
        ><input id="upload" type="checkbox" checked />Upload matrix/color</label
      ><label
        ><input id="bounds" type="checkbox" checked />Recompute bounds</label
      ><button id="reset">Reset layout</button><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage"><canvas aria-label="Select instanceId"></canvas></div>
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
      camera.position.set(1.25,0,10);camera.lookAt(1.25,0,0);
      const geometry=new THREE.BoxGeometry(.7,.7,.7),material=new THREE.MeshBasicMaterial({color:'white'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const instances=new THREE.InstancedMesh(geometry,material,3);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let selected=null,hits=[];
      function reset(){for(let i=0;i<3;i++){instances.setMatrixAt(i,matrix.makeTranslation((i-1)*1.5,0,0));instances.setColorAt(i,new THREE.Color('#2563eb'));}instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;instances.computeBoundingBox();instances.computeBoundingSphere();selected=null;hits=[];draw();}
      function pick(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);if(!document.querySelector('#picking').checked)return;scene.updateMatrixWorld(true);camera.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);hits=raycaster.intersectObject(instances);selected=hits[0]?.instanceId??null;draw();}
      canvas.addEventListener('pointerdown',pick,{signal:events.signal});

      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent='instanceId: '+selected+' / matrix.version: '+instances.instanceMatrix.version+' / color.version: '+instances.instanceColor.version+' / bounds center: '+instances.boundingSphere.center.toArray()+' / radius: '+instances.boundingSphere.radius.toFixed(3);}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(selected===null||!input.value||!input.checkValidity())return;instances.setMatrixAt(selected,matrix.makeTranslation(Number(input.value),0,0));instances.setColorAt(selected,new THREE.Color('#ef4444'));if(document.querySelector('#upload').checked){instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;}if(document.querySelector('#bounds').checked){instances.computeBoundingBox();instances.computeBoundingSphere();}draw();});on('#reset','click',reset);reset();

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

- Enable pointer selection if unchecked.
- Distinguish object from instanceId in the intersection.
- Click the center cube and verify instanceId=1.

</details>

<details>
<summary>Solution and explanation</summary>

Keeping only intersection.object loses the instance identity. Keep intersection.instanceId too.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Select instanceId</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Select instanceId</h1>
    <p>
      Click the center blue cube to select instanceId=1. Apply X=4 to move only
      that cube right and color it red. Click its new position again. A stale
      bounding sphere can make raycast miss a visible cube. After reset, select
      the center again.
    </p>
    <div class="controls">
      <label
        >Selected X<input
          id="value"
          type="number"
          value="4"
          min="-4"
          max="4"
          step="0.25" /></label
      ><label
        ><input id="picking" type="checkbox" checked />Pointer selection</label
      ><label
        ><input id="upload" type="checkbox" checked />Upload matrix/color</label
      ><label
        ><input id="bounds" type="checkbox" checked />Recompute bounds</label
      ><button id="reset">Reset layout</button><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage"><canvas aria-label="Select instanceId"></canvas></div>
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
      camera.position.set(1.25,0,10);camera.lookAt(1.25,0,0);
      const geometry=new THREE.BoxGeometry(.7,.7,.7),material=new THREE.MeshBasicMaterial({color:'white'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const instances=new THREE.InstancedMesh(geometry,material,3);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let selected=null,hits=[];
      function reset(){for(let i=0;i<3;i++){instances.setMatrixAt(i,matrix.makeTranslation((i-1)*1.5,0,0));instances.setColorAt(i,new THREE.Color('#2563eb'));}instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;instances.computeBoundingBox();instances.computeBoundingSphere();selected=null;hits=[];draw();}
      function pick(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);if(!document.querySelector('#picking').checked)return;scene.updateMatrixWorld(true);camera.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);hits=raycaster.intersectObject(instances);selected=hits[0]?.instanceId??null;draw();}
      canvas.addEventListener('pointerdown',pick,{signal:events.signal});

      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent='instanceId: '+selected+' / matrix.version: '+instances.instanceMatrix.version+' / color.version: '+instances.instanceColor.version+' / bounds center: '+instances.boundingSphere.center.toArray()+' / radius: '+instances.boundingSphere.radius.toFixed(3);}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(selected===null||!input.value||!input.checkValidity())return;instances.setMatrixAt(selected,matrix.makeTranslation(Number(input.value),0,0));instances.setColorAt(selected,new THREE.Color('#ef4444'));if(document.querySelector('#upload').checked){instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;}if(document.querySelector('#bounds').checked){instances.computeBoundingBox();instances.computeBoundingSphere();}draw();});on('#reset','click',reset);reset();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='Resources disposed';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- Which value distinguishes cubes sharing the same object?

### Upload selected matrix and color

Select center and Apply X=4. Upload starts off, changing only CPU matrix/color data. Enable upload and Apply again to see movement and red color. Instances 0 and 2 must stay unchanged. Set matrix and color needsUpdate separately.

**Expected result**

Uploading both buffers turns only instance 1 into a red cube at X=4.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Update position and color</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Update position and color</h1>
    <p>
      Click the center blue cube to select instanceId=1. Apply X=4 to move only
      that cube right and color it red. Click its new position again. A stale
      bounding sphere can make raycast miss a visible cube. After reset, select
      the center again.
    </p>
    <div class="controls">
      <label
        >Selected X<input
          id="value"
          type="number"
          value="4"
          min="-4"
          max="4"
          step="0.25" /></label
      ><label
        ><input id="picking" type="checkbox" checked />Pointer selection</label
      ><label><input id="upload" type="checkbox" />Upload matrix/color</label
      ><label
        ><input id="bounds" type="checkbox" checked />Recompute bounds</label
      ><button id="reset">Reset layout</button><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="Update position and color"></canvas>
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
      camera.position.set(1.25,0,10);camera.lookAt(1.25,0,0);
      const geometry=new THREE.BoxGeometry(.7,.7,.7),material=new THREE.MeshBasicMaterial({color:'white'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const instances=new THREE.InstancedMesh(geometry,material,3);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let selected=null,hits=[];
      function reset(){for(let i=0;i<3;i++){instances.setMatrixAt(i,matrix.makeTranslation((i-1)*1.5,0,0));instances.setColorAt(i,new THREE.Color('#2563eb'));}instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;instances.computeBoundingBox();instances.computeBoundingSphere();selected=null;hits=[];draw();}
      function pick(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);if(!document.querySelector('#picking').checked)return;scene.updateMatrixWorld(true);camera.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);hits=raycaster.intersectObject(instances);selected=hits[0]?.instanceId??null;draw();}
      canvas.addEventListener('pointerdown',pick,{signal:events.signal});

      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent='instanceId: '+selected+' / matrix.version: '+instances.instanceMatrix.version+' / color.version: '+instances.instanceColor.version+' / bounds center: '+instances.boundingSphere.center.toArray()+' / radius: '+instances.boundingSphere.radius.toFixed(3);}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(selected===null||!input.value||!input.checkValidity())return;instances.setMatrixAt(selected,matrix.makeTranslation(Number(input.value),0,0));instances.setColorAt(selected,new THREE.Color('#ef4444'));if(document.querySelector('#upload').checked){instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;}if(document.querySelector('#bounds').checked){instances.computeBoundingBox();instances.computeBoundingSphere();}draw();});on('#reset','click',reset);reset();

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

- Select the center cube before moving it.
- Matrix and color buffers have separate upload flags.
- Enable upload and Apply X=4 to move only the selected cube.

</details>

<details>
<summary>Solution and explanation</summary>

setMatrixAt and setColorAt write different buffers. Uploading only position can leave the old color.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Update position and color</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Update position and color</h1>
    <p>
      Click the center blue cube to select instanceId=1. Apply X=4 to move only
      that cube right and color it red. Click its new position again. A stale
      bounding sphere can make raycast miss a visible cube. After reset, select
      the center again.
    </p>
    <div class="controls">
      <label
        >Selected X<input
          id="value"
          type="number"
          value="4"
          min="-4"
          max="4"
          step="0.25" /></label
      ><label
        ><input id="picking" type="checkbox" checked />Pointer selection</label
      ><label
        ><input id="upload" type="checkbox" checked />Upload matrix/color</label
      ><label
        ><input id="bounds" type="checkbox" checked />Recompute bounds</label
      ><button id="reset">Reset layout</button><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="Update position and color"></canvas>
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
      camera.position.set(1.25,0,10);camera.lookAt(1.25,0,0);
      const geometry=new THREE.BoxGeometry(.7,.7,.7),material=new THREE.MeshBasicMaterial({color:'white'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const instances=new THREE.InstancedMesh(geometry,material,3);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let selected=null,hits=[];
      function reset(){for(let i=0;i<3;i++){instances.setMatrixAt(i,matrix.makeTranslation((i-1)*1.5,0,0));instances.setColorAt(i,new THREE.Color('#2563eb'));}instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;instances.computeBoundingBox();instances.computeBoundingSphere();selected=null;hits=[];draw();}
      function pick(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);if(!document.querySelector('#picking').checked)return;scene.updateMatrixWorld(true);camera.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);hits=raycaster.intersectObject(instances);selected=hits[0]?.instanceId??null;draw();}
      canvas.addEventListener('pointerdown',pick,{signal:events.signal});

      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent='instanceId: '+selected+' / matrix.version: '+instances.instanceMatrix.version+' / color.version: '+instances.instanceColor.version+' / bounds center: '+instances.boundingSphere.center.toArray()+' / radius: '+instances.boundingSphere.radius.toFixed(3);}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(selected===null||!input.value||!input.checkValidity())return;instances.setMatrixAt(selected,matrix.makeTranslation(Number(input.value),0,0));instances.setColorAt(selected,new THREE.Color('#ef4444'));if(document.querySelector('#upload').checked){instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;}if(document.querySelector('#bounds').checked){instances.computeBoundingBox();instances.computeBoundingSphere();}draw();});on('#reset','click',reset);reset();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='Resources disposed';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- Does uploading the matrix also upload color?

### Reselect using refreshed bounds

Bounds recomputation starts off. Select center, Apply X=4, then click the red cube at its new position. The old sphere rejects the ray first, giving null. Enable recomputation, reset, and repeat selection, Apply, and reselect.

**Expected result**

The new position gives null with stale bounds and instanceId=1 after refresh. Sphere center and radius change too.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Refresh bounds and reselect</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Refresh bounds and reselect</h1>
    <p>
      Click the center blue cube to select instanceId=1. Apply X=4 to move only
      that cube right and color it red. Click its new position again. A stale
      bounding sphere can make raycast miss a visible cube. After reset, select
      the center again.
    </p>
    <div class="controls">
      <label
        >Selected X<input
          id="value"
          type="number"
          value="4"
          min="-4"
          max="4"
          step="0.25" /></label
      ><label
        ><input id="picking" type="checkbox" checked />Pointer selection</label
      ><label
        ><input id="upload" type="checkbox" checked />Upload matrix/color</label
      ><label><input id="bounds" type="checkbox" />Recompute bounds</label
      ><button id="reset">Reset layout</button><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="Refresh bounds and reselect"></canvas>
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
      camera.position.set(1.25,0,10);camera.lookAt(1.25,0,0);
      const geometry=new THREE.BoxGeometry(.7,.7,.7),material=new THREE.MeshBasicMaterial({color:'white'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const instances=new THREE.InstancedMesh(geometry,material,3);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let selected=null,hits=[];
      function reset(){for(let i=0;i<3;i++){instances.setMatrixAt(i,matrix.makeTranslation((i-1)*1.5,0,0));instances.setColorAt(i,new THREE.Color('#2563eb'));}instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;instances.computeBoundingBox();instances.computeBoundingSphere();selected=null;hits=[];draw();}
      function pick(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);if(!document.querySelector('#picking').checked)return;scene.updateMatrixWorld(true);camera.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);hits=raycaster.intersectObject(instances);selected=hits[0]?.instanceId??null;draw();}
      canvas.addEventListener('pointerdown',pick,{signal:events.signal});

      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent='instanceId: '+selected+' / matrix.version: '+instances.instanceMatrix.version+' / color.version: '+instances.instanceColor.version+' / bounds center: '+instances.boundingSphere.center.toArray()+' / radius: '+instances.boundingSphere.radius.toFixed(3);}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(selected===null||!input.value||!input.checkValidity())return;instances.setMatrixAt(selected,matrix.makeTranslation(Number(input.value),0,0));instances.setColorAt(selected,new THREE.Color('#ef4444'));if(document.querySelector('#upload').checked){instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;}if(document.querySelector('#bounds').checked){instances.computeBoundingBox();instances.computeBoundingSphere();}draw();});on('#reset','click',reset);reset();

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

- Check whether selection misses the visible new position.
- Raycast tests the aggregate boundingSphere before individual instances.
- Enable bounds recomputation, reset, select center, Apply X=4, then select the new position.

</details>

<details>
<summary>Solution and explanation</summary>

Uploading matrices and refreshing CPU bounds are separate. Call computeBoundingBox and computeBoundingSphere after setMatrixAt.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Refresh bounds and reselect</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Refresh bounds and reselect</h1>
    <p>
      Click the center blue cube to select instanceId=1. Apply X=4 to move only
      that cube right and color it red. Click its new position again. A stale
      bounding sphere can make raycast miss a visible cube. After reset, select
      the center again.
    </p>
    <div class="controls">
      <label
        >Selected X<input
          id="value"
          type="number"
          value="4"
          min="-4"
          max="4"
          step="0.25" /></label
      ><label
        ><input id="picking" type="checkbox" checked />Pointer selection</label
      ><label
        ><input id="upload" type="checkbox" checked />Upload matrix/color</label
      ><label
        ><input id="bounds" type="checkbox" checked />Recompute bounds</label
      ><button id="reset">Reset layout</button><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="Refresh bounds and reselect"></canvas>
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
      camera.position.set(1.25,0,10);camera.lookAt(1.25,0,0);
      const geometry=new THREE.BoxGeometry(.7,.7,.7),material=new THREE.MeshBasicMaterial({color:'white'});ownedGeometry.add(geometry);ownedMaterial.add(material);
      const instances=new THREE.InstancedMesh(geometry,material,3);ownedInstances.add(instances);scene.add(instances);
      const matrix=new THREE.Matrix4(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let selected=null,hits=[];
      function reset(){for(let i=0;i<3;i++){instances.setMatrixAt(i,matrix.makeTranslation((i-1)*1.5,0,0));instances.setColorAt(i,new THREE.Color('#2563eb'));}instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;instances.computeBoundingBox();instances.computeBoundingSphere();selected=null;hits=[];draw();}
      function pick(event){const r=canvas.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);if(!document.querySelector('#picking').checked)return;scene.updateMatrixWorld(true);camera.updateMatrixWorld();raycaster.setFromCamera(pointer,camera);hits=raycaster.intersectObject(instances);selected=hits[0]?.instanceId??null;draw();}
      canvas.addEventListener('pointerdown',pick,{signal:events.signal});

      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent='instanceId: '+selected+' / matrix.version: '+instances.instanceMatrix.version+' / color.version: '+instances.instanceColor.version+' / bounds center: '+instances.boundingSphere.center.toArray()+' / radius: '+instances.boundingSphere.radius.toFixed(3);}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(selected===null||!input.value||!input.checkValidity())return;instances.setMatrixAt(selected,matrix.makeTranslation(Number(input.value),0,0));instances.setColorAt(selected,new THREE.Color('#ef4444'));if(document.querySelector('#upload').checked){instances.instanceMatrix.needsUpdate=true;instances.instanceColor.needsUpdate=true;}if(document.querySelector('#bounds').checked){instances.computeBoundingBox();instances.computeBoundingSphere();}draw();});on('#reset','click',reset);reset();

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='Resources disposed';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- Why can raycast miss a visible cube?

### API · Raycaster.intersectObject

Read instanceId from mesh intersections.

- `object: Object3D` — Mesh to test

Returns intersections sorted nearest first.

- InstancedMesh intersections share the same object.

```js
const id=raycaster.intersectObject(mesh)[0]?.instanceId;
```

[Raycaster.intersectObject](https://threejs.org/docs/pages/Raycaster.html) · three@0.186.1 · 2026-10-27

### API · InstancedMesh.setColorAt

Write an instance color into the CPU buffer.

- `index: number` — Instance index
- `color: Color` — Color object

Returns undefined.

- Set instanceColor.needsUpdate separately.

```js
mesh.setColorAt(1,new THREE.Color(0xff0000));mesh.instanceColor.needsUpdate=true;
```

[InstancedMesh.setColorAt](https://threejs.org/docs/pages/InstancedMesh.html) · three@0.186.1 · 2026-10-27

### API · InstancedMesh.computeBoundingSphere

Recompute bounds for all instances.

Updates boundingSphere; call computeBoundingBox for boundingBox.

- Raycast does not refresh an existing sphere automatically.

```js
mesh.computeBoundingBox();mesh.computeBoundingSphere();
```

[InstancedMesh.computeBoundingSphere](https://threejs.org/docs/pages/InstancedMesh.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Instancing Basics](../19/README.md) · [Next: Offscreen Objects and Level of Detail](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
