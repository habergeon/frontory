# Three.js · 22 Render Targets and Minimap

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Lifetimes, Accessibility, and Measurement · Editable example · Storage ID: `threejs-step-22`

## Goals and learning outcomes

- With updates on both views reflect the same X; off freezes only the minimap.
- Main view shows cube sides; the map shows top faces. A 128×128 target is displayed at bottom right.

## Prerequisites

Prerequisite units: 02, 03, 10. Continue these concepts in this experiment.

## Key concepts and explanations

### Draw into a texture

setRenderTarget(target) changes the destination of subsequent renders. A material using its texture displays the result in another pass.

### Two cameras and a display pass

An orthographic camera renders the overlay plane in a separate scene. Do not sample a target texture while rendering into that same target.

## Practice setup

Edit and run independent HTML in the site using Three.js 0.186.1. No separate installation or server is required. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Continue renderer, cameras, and textures from 02, 03, and 10. Target updates start disabled. Enable and Apply to populate the minimap. Apply X=1.5, disable updates, then Apply X=-1.5. The main view moves while the minimap keeps the old position. Reenable updates to synchronize.
2. Enable Show minimap and Apply. Main camera at (5,5,7) and mini camera at (0,8,0) target the origin. miniCamera.up=(0,0,-1) fixes map orientation. Compare X=-1.5 then 1.5 to observe the same cube from two views.
3. Restoration starts disabled, leaving the main canvas empty or stale. Enable it and Apply. The helper saves target, active face, mipmap level, viewport, scissor, and scissorTest on entry and restores them in finally. Restoring to a hardcoded null can break a caller already using another target.

## Variables to observe

| Variable            | Baseline | Change   | Expected change / hypothesis                                                 |
| ------------------- | -------- | -------- | ---------------------------------------------------------------------------- |
| Draw into a texture | starter  | solution | With updates on both views reflect the same X; off freezes only the minimap. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] With updates on both views reflect the same X; off freezes only the minimap.
- [ ] Main view shows cube sides; the map shows top faces. A 128×128 target is displayed at bottom right.

## Self-check

1. Which pass stopped when only the main view moves?
2. What would remain identical if both views used the same camera?
3. How should you restore a caller whose previous target was not null?

## Official references

- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-22/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Edit and run independent HTML inside the site. Record actual observations in the site notes.

- [example.html](../../../../../../../src/labs/threejs-step-22/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Continue renderer, cameras, and textures from 02, 03, and 10. Target updates start disabled. Enable and Apply to populate the minimap. Apply X=1.5, disable updates, then Apply X=-1.5. The main view moves while the minimap keeps the old position. Reenable updates to synchronize.

### Prerequisite units

- `threejs-step-02`
- `threejs-step-03`
- `threejs-step-10`

### Draw into a texture

Continue renderer, cameras, and textures from 02, 03, and 10. Target updates start disabled. Enable and Apply to populate the minimap. Apply X=1.5, disable updates, then Apply X=-1.5. The main view moves while the minimap keeps the old position. Reenable updates to synchronize.

**Expected result**

With updates on both views reflect the same X; off freezes only the minimap.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Render into a texture</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Render into a texture</h1>
    <p>
      One scene uses a main perspective camera and a top orthographic camera.
      The minimap maps the render target texture onto a plane. Disabling target
      updates freezes only the minimap. Disabling restoration sends following
      passes into the target instead of the screen.
    </p>
    <div class="controls">
      <label
        >Red cube X<input
          id="value"
          type="number"
          value="0"
          min="-2"
          max="2"
          step="0.25" /></label
      ><label><input id="update" type="checkbox" />Update target</label
      ><label><input id="overlay" type="checkbox" checked />Show minimap</label
      ><label><input id="restore" type="checkbox" checked />Restore state</label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage"><canvas aria-label="Render into a texture"></canvas></div>
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
      camera.position.set(5,5,7);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(1,1,1);ownedGeometry.add(geometry);const redMaterial=new THREE.MeshBasicMaterial({color:'#ef4444'}),blueMaterial=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedMaterial.add(redMaterial);ownedMaterial.add(blueMaterial);const red=new THREE.Mesh(geometry,redMaterial),blue=new THREE.Mesh(geometry,blueMaterial);red.position.x=-1.5;blue.position.set(1.5,0,-1.5);scene.add(red,blue);
      const miniCamera=new THREE.OrthographicCamera(-4,4,4,-4,.1,30);miniCamera.position.set(0,8,0);miniCamera.up.set(0,0,-1);miniCamera.lookAt(0,0,0);
      const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);
      const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;
      const planeGeometry=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(planeGeometry);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(planeGeometry,planeMaterial));
      let beforeState,afterState,stats={calls:0,triangles:0};
      function state(){return {target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};}
      function restoreState(s){renderer.setRenderTarget(s.target,s.face,s.mip);renderer.setViewport(s.viewport);renderer.setScissor(s.scissor);renderer.setScissorTest(s.test);}
      function renderMap(){const saved=state();beforeState=saved;try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissor(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{if(document.querySelector('#restore').checked)restoreState(saved);afterState=state();}}

      function draw(){if(disposed||!stage.clientWidth)return;renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.setScissor(0,0,canvas.width,canvas.height);renderer.setScissorTest(false);renderer.info.autoReset=false;renderer.info.reset();if(document.querySelector('#update').checked)renderMap();renderer.render(scene,camera);if(document.querySelector('#overlay').checked&&renderer.getRenderTarget()===null){const saved=state();try{const size=Math.min(112,Math.floor(canvas.width*.35));renderer.setViewport(canvas.width-size-8,8,size,size);renderer.setScissor(canvas.width-size-8,8,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;restoreState(saved);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};renderer.info.autoReset=true;frames++;output.textContent='target: '+(renderer.getRenderTarget()===null?'screen':'texture')+' / viewport: '+renderer.getViewport(new THREE.Vector4()).toArray()+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;red.position.x=Number(input.value);draw();});red.position.x=Number(document.querySelector('#value').value);

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

- If the map is empty, check Update target.
- Change X with updates off and compare main and map.
- Reenable updates and Apply to refresh target.texture.

</details>

<details>
<summary>Solution and explanation</summary>

setRenderTarget(target) changes the destination of subsequent renders. A material using its texture displays the result in another pass.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Render into a texture</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Render into a texture</h1>
    <p>
      One scene uses a main perspective camera and a top orthographic camera.
      The minimap maps the render target texture onto a plane. Disabling target
      updates freezes only the minimap. Disabling restoration sends following
      passes into the target instead of the screen.
    </p>
    <div class="controls">
      <label
        >Red cube X<input
          id="value"
          type="number"
          value="0"
          min="-2"
          max="2"
          step="0.25" /></label
      ><label><input id="update" type="checkbox" checked />Update target</label
      ><label><input id="overlay" type="checkbox" checked />Show minimap</label
      ><label><input id="restore" type="checkbox" checked />Restore state</label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage"><canvas aria-label="Render into a texture"></canvas></div>
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
      camera.position.set(5,5,7);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(1,1,1);ownedGeometry.add(geometry);const redMaterial=new THREE.MeshBasicMaterial({color:'#ef4444'}),blueMaterial=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedMaterial.add(redMaterial);ownedMaterial.add(blueMaterial);const red=new THREE.Mesh(geometry,redMaterial),blue=new THREE.Mesh(geometry,blueMaterial);red.position.x=-1.5;blue.position.set(1.5,0,-1.5);scene.add(red,blue);
      const miniCamera=new THREE.OrthographicCamera(-4,4,4,-4,.1,30);miniCamera.position.set(0,8,0);miniCamera.up.set(0,0,-1);miniCamera.lookAt(0,0,0);
      const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);
      const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;
      const planeGeometry=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(planeGeometry);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(planeGeometry,planeMaterial));
      let beforeState,afterState,stats={calls:0,triangles:0};
      function state(){return {target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};}
      function restoreState(s){renderer.setRenderTarget(s.target,s.face,s.mip);renderer.setViewport(s.viewport);renderer.setScissor(s.scissor);renderer.setScissorTest(s.test);}
      function renderMap(){const saved=state();beforeState=saved;try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissor(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{if(document.querySelector('#restore').checked)restoreState(saved);afterState=state();}}

      function draw(){if(disposed||!stage.clientWidth)return;renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.setScissor(0,0,canvas.width,canvas.height);renderer.setScissorTest(false);renderer.info.autoReset=false;renderer.info.reset();if(document.querySelector('#update').checked)renderMap();renderer.render(scene,camera);if(document.querySelector('#overlay').checked&&renderer.getRenderTarget()===null){const saved=state();try{const size=Math.min(112,Math.floor(canvas.width*.35));renderer.setViewport(canvas.width-size-8,8,size,size);renderer.setScissor(canvas.width-size-8,8,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;restoreState(saved);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};renderer.info.autoReset=true;frames++;output.textContent='target: '+(renderer.getRenderTarget()===null?'screen':'texture')+' / viewport: '+renderer.getViewport(new THREE.Vector4()).toArray()+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;red.position.x=Number(input.value);draw();});red.position.x=Number(document.querySelector('#value').value);

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='Resources disposed';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- Which pass stopped when only the main view moves?

### Two cameras and a display pass

Enable Show minimap and Apply. Main camera at (5,5,7) and mini camera at (0,8,0) target the origin. miniCamera.up=(0,0,-1) fixes map orientation. Compare X=-1.5 then 1.5 to observe the same cube from two views. Blue stays at (1.5,0,-1.5), so red does not overlap it at the assigned X values.

**Expected result**

Main view shows cube sides; the map shows top faces. A 128×128 target is displayed at bottom right.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>A minimap from another camera</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>A minimap from another camera</h1>
    <p>
      One scene uses a main perspective camera and a top orthographic camera.
      The minimap maps the render target texture onto a plane. Disabling target
      updates freezes only the minimap. Disabling restoration sends following
      passes into the target instead of the screen.
    </p>
    <div class="controls">
      <label
        >Red cube X<input
          id="value"
          type="number"
          value="0"
          min="-2"
          max="2"
          step="0.25" /></label
      ><label><input id="update" type="checkbox" checked />Update target</label
      ><label><input id="overlay" type="checkbox" />Show minimap</label
      ><label><input id="restore" type="checkbox" checked />Restore state</label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="A minimap from another camera"></canvas>
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
      camera.position.set(5,5,7);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(1,1,1);ownedGeometry.add(geometry);const redMaterial=new THREE.MeshBasicMaterial({color:'#ef4444'}),blueMaterial=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedMaterial.add(redMaterial);ownedMaterial.add(blueMaterial);const red=new THREE.Mesh(geometry,redMaterial),blue=new THREE.Mesh(geometry,blueMaterial);red.position.x=-1.5;blue.position.set(1.5,0,-1.5);scene.add(red,blue);
      const miniCamera=new THREE.OrthographicCamera(-4,4,4,-4,.1,30);miniCamera.position.set(0,8,0);miniCamera.up.set(0,0,-1);miniCamera.lookAt(0,0,0);
      const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);
      const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;
      const planeGeometry=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(planeGeometry);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(planeGeometry,planeMaterial));
      let beforeState,afterState,stats={calls:0,triangles:0};
      function state(){return {target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};}
      function restoreState(s){renderer.setRenderTarget(s.target,s.face,s.mip);renderer.setViewport(s.viewport);renderer.setScissor(s.scissor);renderer.setScissorTest(s.test);}
      function renderMap(){const saved=state();beforeState=saved;try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissor(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{if(document.querySelector('#restore').checked)restoreState(saved);afterState=state();}}

      function draw(){if(disposed||!stage.clientWidth)return;renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.setScissor(0,0,canvas.width,canvas.height);renderer.setScissorTest(false);renderer.info.autoReset=false;renderer.info.reset();if(document.querySelector('#update').checked)renderMap();renderer.render(scene,camera);if(document.querySelector('#overlay').checked&&renderer.getRenderTarget()===null){const saved=state();try{const size=Math.min(112,Math.floor(canvas.width*.35));renderer.setViewport(canvas.width-size-8,8,size,size);renderer.setScissor(canvas.width-size-8,8,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;restoreState(saved);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};renderer.info.autoReset=true;frames++;output.textContent='target: '+(renderer.getRenderTarget()===null?'screen':'texture')+' / viewport: '+renderer.getViewport(new THREE.Vector4()).toArray()+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;red.position.x=Number(input.value);draw();});red.position.x=Number(document.querySelector('#value').value);

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

- Check Show minimap.
- The mini camera looks down from Y=8 with up along -Z.
- Apply X=-1.5 and 1.5 to compare side and top views of the same cube.

</details>

<details>
<summary>Solution and explanation</summary>

An orthographic camera renders the overlay plane in a separate scene. Do not sample a target texture while rendering into that same target.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>A minimap from another camera</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>A minimap from another camera</h1>
    <p>
      One scene uses a main perspective camera and a top orthographic camera.
      The minimap maps the render target texture onto a plane. Disabling target
      updates freezes only the minimap. Disabling restoration sends following
      passes into the target instead of the screen.
    </p>
    <div class="controls">
      <label
        >Red cube X<input
          id="value"
          type="number"
          value="0"
          min="-2"
          max="2"
          step="0.25" /></label
      ><label><input id="update" type="checkbox" checked />Update target</label
      ><label><input id="overlay" type="checkbox" checked />Show minimap</label
      ><label><input id="restore" type="checkbox" checked />Restore state</label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="A minimap from another camera"></canvas>
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
      camera.position.set(5,5,7);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(1,1,1);ownedGeometry.add(geometry);const redMaterial=new THREE.MeshBasicMaterial({color:'#ef4444'}),blueMaterial=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedMaterial.add(redMaterial);ownedMaterial.add(blueMaterial);const red=new THREE.Mesh(geometry,redMaterial),blue=new THREE.Mesh(geometry,blueMaterial);red.position.x=-1.5;blue.position.set(1.5,0,-1.5);scene.add(red,blue);
      const miniCamera=new THREE.OrthographicCamera(-4,4,4,-4,.1,30);miniCamera.position.set(0,8,0);miniCamera.up.set(0,0,-1);miniCamera.lookAt(0,0,0);
      const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);
      const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;
      const planeGeometry=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(planeGeometry);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(planeGeometry,planeMaterial));
      let beforeState,afterState,stats={calls:0,triangles:0};
      function state(){return {target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};}
      function restoreState(s){renderer.setRenderTarget(s.target,s.face,s.mip);renderer.setViewport(s.viewport);renderer.setScissor(s.scissor);renderer.setScissorTest(s.test);}
      function renderMap(){const saved=state();beforeState=saved;try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissor(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{if(document.querySelector('#restore').checked)restoreState(saved);afterState=state();}}

      function draw(){if(disposed||!stage.clientWidth)return;renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.setScissor(0,0,canvas.width,canvas.height);renderer.setScissorTest(false);renderer.info.autoReset=false;renderer.info.reset();if(document.querySelector('#update').checked)renderMap();renderer.render(scene,camera);if(document.querySelector('#overlay').checked&&renderer.getRenderTarget()===null){const saved=state();try{const size=Math.min(112,Math.floor(canvas.width*.35));renderer.setViewport(canvas.width-size-8,8,size,size);renderer.setScissor(canvas.width-size-8,8,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;restoreState(saved);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};renderer.info.autoReset=true;frames++;output.textContent='target: '+(renderer.getRenderTarget()===null?'screen':'texture')+' / viewport: '+renderer.getViewport(new THREE.Vector4()).toArray()+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;red.position.x=Number(input.value);draw();});red.position.x=Number(document.querySelector('#value').value);

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='Resources disposed';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- What would remain identical if both views used the same camera?

### Restore target, viewport, and scissor

Restoration starts disabled, leaving the main canvas empty or stale. Enable it and Apply. The helper saves target, active face, mipmap level, viewport, scissor, and scissorTest on entry and restores them in finally. Restoring to a hardcoded null can break a caller already using another target.

**Expected result**

With restoration on, target=screen and both views update again. State before and after the helper matches.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Restore caller rendering state</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Restore caller rendering state</h1>
    <p>
      One scene uses a main perspective camera and a top orthographic camera.
      The minimap maps the render target texture onto a plane. Disabling target
      updates freezes only the minimap. Disabling restoration sends following
      passes into the target instead of the screen.
    </p>
    <div class="controls">
      <label
        >Red cube X<input
          id="value"
          type="number"
          value="0"
          min="-2"
          max="2"
          step="0.25" /></label
      ><label><input id="update" type="checkbox" checked />Update target</label
      ><label><input id="overlay" type="checkbox" checked />Show minimap</label
      ><label><input id="restore" type="checkbox" />Restore state</label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="Restore caller rendering state"></canvas>
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
      camera.position.set(5,5,7);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(1,1,1);ownedGeometry.add(geometry);const redMaterial=new THREE.MeshBasicMaterial({color:'#ef4444'}),blueMaterial=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedMaterial.add(redMaterial);ownedMaterial.add(blueMaterial);const red=new THREE.Mesh(geometry,redMaterial),blue=new THREE.Mesh(geometry,blueMaterial);red.position.x=-1.5;blue.position.set(1.5,0,-1.5);scene.add(red,blue);
      const miniCamera=new THREE.OrthographicCamera(-4,4,4,-4,.1,30);miniCamera.position.set(0,8,0);miniCamera.up.set(0,0,-1);miniCamera.lookAt(0,0,0);
      const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);
      const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;
      const planeGeometry=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(planeGeometry);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(planeGeometry,planeMaterial));
      let beforeState,afterState,stats={calls:0,triangles:0};
      function state(){return {target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};}
      function restoreState(s){renderer.setRenderTarget(s.target,s.face,s.mip);renderer.setViewport(s.viewport);renderer.setScissor(s.scissor);renderer.setScissorTest(s.test);}
      function renderMap(){const saved=state();beforeState=saved;try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissor(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{if(document.querySelector('#restore').checked)restoreState(saved);afterState=state();}}

      function draw(){if(disposed||!stage.clientWidth)return;renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.setScissor(0,0,canvas.width,canvas.height);renderer.setScissorTest(false);renderer.info.autoReset=false;renderer.info.reset();if(document.querySelector('#update').checked)renderMap();renderer.render(scene,camera);if(document.querySelector('#overlay').checked&&renderer.getRenderTarget()===null){const saved=state();try{const size=Math.min(112,Math.floor(canvas.width*.35));renderer.setViewport(canvas.width-size-8,8,size,size);renderer.setScissor(canvas.width-size-8,8,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;restoreState(saved);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};renderer.info.autoReset=true;frames++;output.textContent='target: '+(renderer.getRenderTarget()===null?'screen':'texture')+' / viewport: '+renderer.getViewport(new THREE.Vector4()).toArray()+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;red.position.x=Number(input.value);draw();});red.position.x=Number(document.querySelector('#value').value);

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

- Read whether output target is screen or texture.
- setRenderTarget(null) alone cannot restore all caller state.
- Restore saved target, face, mip, viewport, scissor, and test in finally.

</details>

<details>
<summary>Solution and explanation</summary>

The target owns its texture, so dispose the target once without separately disposing the shared map. Accumulate all frame passes with autoReset=false, then restore the default.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Restore caller rendering state</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%;touch-action:none}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}button{padding:6px}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere}
    </style>
  </head>
  <body>
    <h1>Restore caller rendering state</h1>
    <p>
      One scene uses a main perspective camera and a top orthographic camera.
      The minimap maps the render target texture onto a plane. Disabling target
      updates freezes only the minimap. Disabling restoration sends following
      passes into the target instead of the screen.
    </p>
    <div class="controls">
      <label
        >Red cube X<input
          id="value"
          type="number"
          value="0"
          min="-2"
          max="2"
          step="0.25" /></label
      ><label><input id="update" type="checkbox" checked />Update target</label
      ><label><input id="overlay" type="checkbox" checked />Show minimap</label
      ><label><input id="restore" type="checkbox" checked />Restore state</label
      ><button id="apply">Apply</button
      ><button id="cleanup">Dispose resources</button>
    </div>
    <div id="stage">
      <canvas aria-label="Restore caller rendering state"></canvas>
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
      camera.position.set(5,5,7);camera.lookAt(0,0,0);
      const geometry=new THREE.BoxGeometry(1,1,1);ownedGeometry.add(geometry);const redMaterial=new THREE.MeshBasicMaterial({color:'#ef4444'}),blueMaterial=new THREE.MeshBasicMaterial({color:'#2563eb'});ownedMaterial.add(redMaterial);ownedMaterial.add(blueMaterial);const red=new THREE.Mesh(geometry,redMaterial),blue=new THREE.Mesh(geometry,blueMaterial);red.position.x=-1.5;blue.position.set(1.5,0,-1.5);scene.add(red,blue);
      const miniCamera=new THREE.OrthographicCamera(-4,4,4,-4,.1,30);miniCamera.position.set(0,8,0);miniCamera.up.set(0,0,-1);miniCamera.lookAt(0,0,0);
      const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);
      const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;
      const planeGeometry=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(planeGeometry);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(planeGeometry,planeMaterial));
      let beforeState,afterState,stats={calls:0,triangles:0};
      function state(){return {target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};}
      function restoreState(s){renderer.setRenderTarget(s.target,s.face,s.mip);renderer.setViewport(s.viewport);renderer.setScissor(s.scissor);renderer.setScissorTest(s.test);}
      function renderMap(){const saved=state();beforeState=saved;try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissor(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{if(document.querySelector('#restore').checked)restoreState(saved);afterState=state();}}

      function draw(){if(disposed||!stage.clientWidth)return;renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.setScissor(0,0,canvas.width,canvas.height);renderer.setScissorTest(false);renderer.info.autoReset=false;renderer.info.reset();if(document.querySelector('#update').checked)renderMap();renderer.render(scene,camera);if(document.querySelector('#overlay').checked&&renderer.getRenderTarget()===null){const saved=state();try{const size=Math.min(112,Math.floor(canvas.width*.35));renderer.setViewport(canvas.width-size-8,8,size,size);renderer.setScissor(canvas.width-size-8,8,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;restoreState(saved);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};renderer.info.autoReset=true;frames++;output.textContent='target: '+(renderer.getRenderTarget()===null?'screen':'texture')+' / viewport: '+renderer.getViewport(new THREE.Vector4()).toArray()+' / calls: '+stats.calls+' / triangles: '+stats.triangles;}
      on('#apply','click',()=>{const input=document.querySelector('#value');if(!input.value||!input.checkValidity())return;red.position.x=Number(input.value);draw();});red.position.x=Number(document.querySelector('#value').value);

      function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h||disposed)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
      const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);for(const x of ownedInstances)x.dispose();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent='Resources disposed';}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- How should you restore a caller whose previous target was not null?

### API · WebGLRenderTarget

Store rendering results in a texture.

- `width: number` — Pixel width
- `height: number` — Pixel height

Returns a new WebGLRenderTarget.

- The target owns its texture; dispose the target once.

```js
const target=new THREE.WebGLRenderTarget(128,128);
```

[WebGLRenderTarget](https://threejs.org/docs/pages/WebGLRenderTarget.html) · three@0.186.1 · 2026-10-27

### API · WebGLRenderer.setRenderTarget

Change the destination for subsequent rendering.

- `renderTarget: WebGLRenderTarget|null` — Target, or null for the screen

Returns undefined.

- Save and restore the entry target, face, and mipmap.

```js
const old=renderer.getRenderTarget();renderer.setRenderTarget(target);renderer.render(scene,camera);renderer.setRenderTarget(old);
```

[WebGLRenderer.setRenderTarget](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

### API · WebGLRenderer.setViewport / setScissor

Set drawing and fragment clipping rectangles.

- `x,y,width,height: number` — Rectangle in logical pixels

Changes viewport/scissor state.

- Save getViewport, getScissor, and getScissorTest and restore all.

```js
const v=renderer.getViewport(new THREE.Vector4());renderer.setViewport(0,0,128,128);renderer.setViewport(v);
```

[WebGLRenderer.setViewport / setScissor](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Offscreen Objects and Level of Detail](../21/README.md) · [Next: Resource Ownership Ledger](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
