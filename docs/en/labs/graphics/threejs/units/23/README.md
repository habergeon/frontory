# Three.js · 23 Resource Ownership Ledger

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Lifetimes, Accessibility, and Measurement · Editable example · Storage ID: `threejs-step-23`

## Goals and learning outcomes

- After remove: children=1, disposed=0; reattach restores children=2.
- First release: ref=1, disposed=0. Collect after the final release: ref=0, disposed=2.

## Prerequisites

Prerequisite units: 07, 10, 14, 22. Continue these concepts in this experiment.

## Key concepts and explanations

### Detach and GPU resources

Press remove. The left cube disappears while geometry and material disposal counts remain 0. Reattach renders the same references. Removal only breaks the parent connection.

### Release the last user

Press release A then release B. With disposal disabled initially, dropping the last reference emits no GPU disposal event. Enable disposal and press collect to dispose geometry and material once each.

## Practice setup

Edit and run independent HTML in the site using Three.js 0.186.1. No separate installation or server is required. Existing JavaScript drafts are preserved.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Press remove. The left cube disappears while geometry and material disposal counts remain 0. Reattach renders the same references. Removal only breaks the parent connection.
2. Press release A then release B. With disposal disabled initially, dropping the last reference emits no GPU disposal event. Enable disposal and press collect to dispose geometry and material once each.
3. Enable the shared ledger. A and B use the same geometry and material, giving ref=2. Inspect B after release A, then release B. Press cycle 3 times: each creates and disposes one geometry and one material. Calling full cleanup twice must not dispose twice.

## Variables to observe

| Variable                 | Baseline | Change   | Expected change / hypothesis                                        |
| ------------------------ | -------- | -------- | ------------------------------------------------------------------- |
| Detach and GPU resources | starter  | solution | After remove: children=1, disposed=0; reattach restores children=2. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] After remove: children=1, disposed=0; reattach restores children=2.
- [ ] First release: ref=1, disposed=0. Collect after the final release: ref=0, disposed=2.

## Self-check

1. Why can the detached object be reused?
2. Does remove alone clean GPU resources?
3. What fails if each mesh disposes its shared resources immediately?

## Official references

- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)
- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-23/example.en.html) · [Runtime environments and limits](../../../../../examples.md)

Complete the HTML exercises and record actual observations and conditions in the existing site notes.

- [example.html](../../../../../../../src/labs/threejs-step-23/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Press remove. The left cube disappears while geometry and material disposal counts remain 0. Reattach renders the same references. Removal only breaks the parent connection.

### Prerequisite units

- `threejs-step-07`
- `threejs-step-10`
- `threejs-02`
- `threejs-step-22`

### Detach and GPU resources

Press remove. The left cube disappears while geometry and material disposal counts remain 0. Reattach renders the same references. Removal only breaks the parent connection.

**Expected result**

After remove: children=1, disposed=0; reattach restores children=2.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Detach and GPU resources</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Detach and GPU resources</h1>
    <p>
      Press remove. The left cube disappears while geometry and material
      disposal counts remain 0. Reattach renders the same references. Removal
      only breaks the parent connection.
    </p>
    <div class="controls">
      <label
        ><input id="disposal" type="checkbox" checked />Enable disposal</label
      ><label><input id="ledger" type="checkbox" checked />Shared ledger</label
      ><button id="remove">remove</button><button id="attach">Reattach</button
      ><button id="release-a">release A</button
      ><button id="release-b">release B</button
      ><button id="collect">collect</button><button id="cycle">cycle</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <div id="stage">
      <canvas aria-label="Detach and GPU resources"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};const ledger=new Map();const released=new Set();
      function own(resource,type){ledger.set(resource,{refs:2,type});counts[type==='geometry'?'createdGeometry':'createdMaterial']++;resource.addEventListener('dispose',()=>counts[type]++);return resource;}
      const geometry=own(new THREE.BoxGeometry(),'geometry'),material=own(new THREE.MeshBasicMaterial({color:'#2563eb'}),'material');const a=new THREE.Mesh(geometry,material),b=new THREE.Mesh(geometry,material);a.position.x=-1.2;b.position.x=1.2;scene.add(a,b);
      function collect(){if(!document.querySelector('#disposal').checked)return;for(const [r,e]of ledger)if(e.refs===0){r.dispose();ledger.delete(r);}}
      function release(mesh){if(released.has(mesh))return;released.add(mesh);scene.remove(mesh);if(document.querySelector('#ledger').checked)for(const r of [mesh.geometry,mesh.material]){const e=ledger.get(r);if(e)e.refs--;}collect();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({children:scene.children.length,refs:[...ledger.values()].map(e=>e.refs),disposed:counts.geometry+counts.material,...counts});}
      on('#remove','click',()=>{scene.remove(a);draw();});on('#attach','click',()=>{if(!released.has(a))scene.add(a);draw();});on('#release-a','click',()=>{release(a);draw();});on('#release-b','click',()=>{release(b);draw();});on('#collect','click',()=>{collect();draw();});
      on('#cycle','click',()=>{const g=new THREE.BoxGeometry(),m=new THREE.MeshBasicMaterial({color:'#f97316'});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const pair=[new THREE.Mesh(g,m),new THREE.Mesh(g,m)];pair[0].position.x=-1;pair[1].position.x=1;scene.add(...pair);renderer.render(scene,camera);scene.remove(...pair);g.dispose();m.dispose();counts.cycles++;draw();});function releaseAll(){for(const r of ledger.keys())r.dispose();ledger.clear();}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Observe a.parent separately from dispose events.

</details>

<details>
<summary>Solution and explanation</summary>

After remove: children=1, disposed=0; reattach restores children=2. Observe a.parent separately from dispose events.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Detach and GPU resources</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Detach and GPU resources</h1>
    <p>
      Press remove. The left cube disappears while geometry and material
      disposal counts remain 0. Reattach renders the same references. Removal
      only breaks the parent connection.
    </p>
    <div class="controls">
      <label
        ><input id="disposal" type="checkbox" checked />Enable disposal</label
      ><label><input id="ledger" type="checkbox" checked />Shared ledger</label
      ><button id="remove">remove</button><button id="attach">Reattach</button
      ><button id="release-a">release A</button
      ><button id="release-b">release B</button
      ><button id="collect">collect</button><button id="cycle">cycle</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <div id="stage">
      <canvas aria-label="Detach and GPU resources"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};const ledger=new Map();const released=new Set();
      function own(resource,type){ledger.set(resource,{refs:2,type});counts[type==='geometry'?'createdGeometry':'createdMaterial']++;resource.addEventListener('dispose',()=>counts[type]++);return resource;}
      const geometry=own(new THREE.BoxGeometry(),'geometry'),material=own(new THREE.MeshBasicMaterial({color:'#2563eb'}),'material');const a=new THREE.Mesh(geometry,material),b=new THREE.Mesh(geometry,material);a.position.x=-1.2;b.position.x=1.2;scene.add(a,b);scene.remove(a);
      function collect(){if(!document.querySelector('#disposal').checked)return;for(const [r,e]of ledger)if(e.refs===0){r.dispose();ledger.delete(r);}}
      function release(mesh){if(released.has(mesh))return;released.add(mesh);scene.remove(mesh);if(document.querySelector('#ledger').checked)for(const r of [mesh.geometry,mesh.material]){const e=ledger.get(r);if(e)e.refs--;}collect();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({children:scene.children.length,refs:[...ledger.values()].map(e=>e.refs),disposed:counts.geometry+counts.material,...counts});}
      on('#remove','click',()=>{scene.remove(a);draw();});on('#attach','click',()=>{if(!released.has(a))scene.add(a);draw();});on('#release-a','click',()=>{release(a);draw();});on('#release-b','click',()=>{release(b);draw();});on('#collect','click',()=>{collect();draw();});
      on('#cycle','click',()=>{const g=new THREE.BoxGeometry(),m=new THREE.MeshBasicMaterial({color:'#f97316'});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const pair=[new THREE.Mesh(g,m),new THREE.Mesh(g,m)];pair[0].position.x=-1;pair[1].position.x=1;scene.add(...pair);renderer.render(scene,camera);scene.remove(...pair);g.dispose();m.dispose();counts.cycles++;draw();});function releaseAll(){for(const r of ledger.keys())r.dispose();ledger.clear();}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- Why can the detached object be reused?

### Release the last user

Press release A then release B. With disposal disabled initially, dropping the last reference emits no GPU disposal event. Enable disposal and press collect to dispose geometry and material once each.

**Expected result**

First release: ref=1, disposed=0. Collect after the final release: ref=0, disposed=2.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Release the last user</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Release the last user</h1>
    <p>
      Press release A then release B. With disposal disabled initially, dropping
      the last reference emits no GPU disposal event. Enable disposal and press
      collect to dispose geometry and material once each.
    </p>
    <div class="controls">
      <label><input id="disposal" type="checkbox" />Enable disposal</label
      ><label><input id="ledger" type="checkbox" checked />Shared ledger</label
      ><button id="remove">remove</button><button id="attach">Reattach</button
      ><button id="release-a">release A</button
      ><button id="release-b">release B</button
      ><button id="collect">collect</button><button id="cycle">cycle</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <div id="stage"><canvas aria-label="Release the last user"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};const ledger=new Map();const released=new Set();
      function own(resource,type){ledger.set(resource,{refs:2,type});counts[type==='geometry'?'createdGeometry':'createdMaterial']++;resource.addEventListener('dispose',()=>counts[type]++);return resource;}
      const geometry=own(new THREE.BoxGeometry(),'geometry'),material=own(new THREE.MeshBasicMaterial({color:'#2563eb'}),'material');const a=new THREE.Mesh(geometry,material),b=new THREE.Mesh(geometry,material);a.position.x=-1.2;b.position.x=1.2;scene.add(a,b);
      function collect(){if(!document.querySelector('#disposal').checked)return;for(const [r,e]of ledger)if(e.refs===0){r.dispose();ledger.delete(r);}}
      function release(mesh){if(released.has(mesh))return;released.add(mesh);scene.remove(mesh);if(document.querySelector('#ledger').checked)for(const r of [mesh.geometry,mesh.material]){const e=ledger.get(r);if(e)e.refs--;}collect();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({children:scene.children.length,refs:[...ledger.values()].map(e=>e.refs),disposed:counts.geometry+counts.material,...counts});}
      on('#remove','click',()=>{scene.remove(a);draw();});on('#attach','click',()=>{if(!released.has(a))scene.add(a);draw();});on('#release-a','click',()=>{release(a);draw();});on('#release-b','click',()=>{release(b);draw();});on('#collect','click',()=>{collect();draw();});
      on('#cycle','click',()=>{const g=new THREE.BoxGeometry(),m=new THREE.MeshBasicMaterial({color:'#f97316'});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const pair=[new THREE.Mesh(g,m),new THREE.Mesh(g,m)];pair[0].position.x=-1;pair[1].position.x=1;scene.add(...pair);renderer.render(scene,camera);scene.remove(...pair);g.dispose();m.dispose();counts.cycles++;draw();});function releaseAll(){for(const r of ledger.keys())r.dispose();ledger.clear();}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Collect only entries whose ref count is 0.

</details>

<details>
<summary>Solution and explanation</summary>

First release: ref=1, disposed=0. Collect after the final release: ref=0, disposed=2. Collect only entries whose ref count is 0.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Release the last user</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Release the last user</h1>
    <p>
      Press release A then release B. With disposal disabled initially, dropping
      the last reference emits no GPU disposal event. Enable disposal and press
      collect to dispose geometry and material once each.
    </p>
    <div class="controls">
      <label
        ><input id="disposal" type="checkbox" checked />Enable disposal</label
      ><label><input id="ledger" type="checkbox" checked />Shared ledger</label
      ><button id="remove">remove</button><button id="attach">Reattach</button
      ><button id="release-a">release A</button
      ><button id="release-b">release B</button
      ><button id="collect">collect</button><button id="cycle">cycle</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <div id="stage"><canvas aria-label="Release the last user"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};const ledger=new Map();const released=new Set();
      function own(resource,type){ledger.set(resource,{refs:2,type});counts[type==='geometry'?'createdGeometry':'createdMaterial']++;resource.addEventListener('dispose',()=>counts[type]++);return resource;}
      const geometry=own(new THREE.BoxGeometry(),'geometry'),material=own(new THREE.MeshBasicMaterial({color:'#2563eb'}),'material');const a=new THREE.Mesh(geometry,material),b=new THREE.Mesh(geometry,material);a.position.x=-1.2;b.position.x=1.2;scene.add(a,b);
      function collect(){if(!document.querySelector('#disposal').checked)return;for(const [r,e]of ledger)if(e.refs===0){r.dispose();ledger.delete(r);}}
      function release(mesh){if(released.has(mesh))return;released.add(mesh);scene.remove(mesh);if(document.querySelector('#ledger').checked)for(const r of [mesh.geometry,mesh.material]){const e=ledger.get(r);if(e)e.refs--;}collect();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({children:scene.children.length,refs:[...ledger.values()].map(e=>e.refs),disposed:counts.geometry+counts.material,...counts});}
      on('#remove','click',()=>{scene.remove(a);draw();});on('#attach','click',()=>{if(!released.has(a))scene.add(a);draw();});on('#release-a','click',()=>{release(a);draw();});on('#release-b','click',()=>{release(b);draw();});on('#collect','click',()=>{collect();draw();});
      on('#cycle','click',()=>{const g=new THREE.BoxGeometry(),m=new THREE.MeshBasicMaterial({color:'#f97316'});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const pair=[new THREE.Mesh(g,m),new THREE.Mesh(g,m)];pair[0].position.x=-1;pair[1].position.x=1;scene.add(...pair);renderer.render(scene,camera);scene.remove(...pair);g.dispose();m.dispose();counts.cycles++;draw();});function releaseAll(){for(const r of ledger.keys())r.dispose();ledger.clear();}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- Does remove alone clean GPU resources?

### Shared ownership and repeated cleanup

Enable the shared ledger. A and B use the same geometry and material, giving ref=2. Inspect B after release A, then release B. Press cycle 3 times: each creates and disposes one geometry and one material. Calling full cleanup twice must not dispose twice.

**Expected result**

B survives release A; after 3 cycles, created minus disposed equals live resources.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Shared ownership and repeated cleanup</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Shared ownership and repeated cleanup</h1>
    <p>
      Enable the shared ledger. A and B use the same geometry and material,
      giving ref=2. Inspect B after release A, then release B. Press cycle 3
      times: each creates and disposes one geometry and one material. Calling
      full cleanup twice must not dispose twice.
    </p>
    <div class="controls">
      <label
        ><input id="disposal" type="checkbox" checked />Enable disposal</label
      ><label><input id="ledger" type="checkbox" />Shared ledger</label
      ><button id="remove">remove</button><button id="attach">Reattach</button
      ><button id="release-a">release A</button
      ><button id="release-b">release B</button
      ><button id="collect">collect</button><button id="cycle">cycle</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <div id="stage">
      <canvas aria-label="Shared ownership and repeated cleanup"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};const ledger=new Map();const released=new Set();
      function own(resource,type){ledger.set(resource,{refs:2,type});counts[type==='geometry'?'createdGeometry':'createdMaterial']++;resource.addEventListener('dispose',()=>counts[type]++);return resource;}
      const geometry=own(new THREE.BoxGeometry(),'geometry'),material=own(new THREE.MeshBasicMaterial({color:'#2563eb'}),'material');const a=new THREE.Mesh(geometry,material),b=new THREE.Mesh(geometry,material);a.position.x=-1.2;b.position.x=1.2;scene.add(a,b);
      function collect(){if(!document.querySelector('#disposal').checked)return;for(const [r,e]of ledger)if(e.refs===0){r.dispose();ledger.delete(r);}}
      function release(mesh){if(released.has(mesh))return;released.add(mesh);scene.remove(mesh);if(document.querySelector('#ledger').checked)for(const r of [mesh.geometry,mesh.material]){const e=ledger.get(r);if(e)e.refs--;}collect();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({children:scene.children.length,refs:[...ledger.values()].map(e=>e.refs),disposed:counts.geometry+counts.material,...counts});}
      on('#remove','click',()=>{scene.remove(a);draw();});on('#attach','click',()=>{if(!released.has(a))scene.add(a);draw();});on('#release-a','click',()=>{release(a);draw();});on('#release-b','click',()=>{release(b);draw();});on('#collect','click',()=>{collect();draw();});
      on('#cycle','click',()=>{const g=new THREE.BoxGeometry(),m=new THREE.MeshBasicMaterial({color:'#f97316'});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const pair=[new THREE.Mesh(g,m),new THREE.Mesh(g,m)];pair[0].position.x=-1;pair[1].position.x=1;scene.add(...pair);renderer.render(scene,camera);scene.remove(...pair);g.dispose();m.dispose();counts.cycles++;draw();});function releaseAll(){for(const r of ledger.keys())r.dispose();ledger.clear();}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- The starter without the ledger retains ref=2 after A is removed.

</details>

<details>
<summary>Solution and explanation</summary>

B survives release A; after 3 cycles, created minus disposed equals live resources. The starter without the ledger retains ref=2 after A is removed.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Shared ownership and repeated cleanup</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>Shared ownership and repeated cleanup</h1>
    <p>
      Enable the shared ledger. A and B use the same geometry and material,
      giving ref=2. Inspect B after release A, then release B. Press cycle 3
      times: each creates and disposes one geometry and one material. Calling
      full cleanup twice must not dispose twice.
    </p>
    <div class="controls">
      <label
        ><input id="disposal" type="checkbox" checked />Enable disposal</label
      ><label><input id="ledger" type="checkbox" checked />Shared ledger</label
      ><button id="remove">remove</button><button id="attach">Reattach</button
      ><button id="release-a">release A</button
      ><button id="release-b">release B</button
      ><button id="collect">collect</button><button id="cycle">cycle</button
      ><button id="cleanup">Cleanup</button>
    </div>
    <div id="stage">
      <canvas aria-label="Shared ownership and repeated cleanup"></canvas>
    </div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      const counts={createdGeometry:0,createdMaterial:0,geometry:0,material:0,cycles:0};const ledger=new Map();const released=new Set();
      function own(resource,type){ledger.set(resource,{refs:2,type});counts[type==='geometry'?'createdGeometry':'createdMaterial']++;resource.addEventListener('dispose',()=>counts[type]++);return resource;}
      const geometry=own(new THREE.BoxGeometry(),'geometry'),material=own(new THREE.MeshBasicMaterial({color:'#2563eb'}),'material');const a=new THREE.Mesh(geometry,material),b=new THREE.Mesh(geometry,material);a.position.x=-1.2;b.position.x=1.2;scene.add(a,b);
      function collect(){if(!document.querySelector('#disposal').checked)return;for(const [r,e]of ledger)if(e.refs===0){r.dispose();ledger.delete(r);}}
      function release(mesh){if(released.has(mesh))return;released.add(mesh);scene.remove(mesh);if(document.querySelector('#ledger').checked)for(const r of [mesh.geometry,mesh.material]){const e=ledger.get(r);if(e)e.refs--;}collect();}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.render(scene,camera);frames++;output.textContent=JSON.stringify({children:scene.children.length,refs:[...ledger.values()].map(e=>e.refs),disposed:counts.geometry+counts.material,...counts});}
      on('#remove','click',()=>{scene.remove(a);draw();});on('#attach','click',()=>{if(!released.has(a))scene.add(a);draw();});on('#release-a','click',()=>{release(a);draw();});on('#release-b','click',()=>{release(b);draw();});on('#collect','click',()=>{collect();draw();});
      on('#cycle','click',()=>{const g=new THREE.BoxGeometry(),m=new THREE.MeshBasicMaterial({color:'#f97316'});counts.createdGeometry++;counts.createdMaterial++;g.addEventListener('dispose',()=>counts.geometry++);m.addEventListener('dispose',()=>counts.material++);const pair=[new THREE.Mesh(g,m),new THREE.Mesh(g,m)];pair[0].position.x=-1;pair[1].position.x=1;scene.add(...pair);renderer.render(scene,camera);scene.remove(...pair);g.dispose();m.dispose();counts.cycles++;draw();});function releaseAll(){for(const r of ledger.keys())r.dispose();ledger.clear();}
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="Cleanup complete"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- What fails if each mesh disposes its shared resources immediately?

### API · Object3D.remove / BufferGeometry.dispose

After remove: children=1, disposed=0; reattach restores children=2. Observe a.parent separately from dispose events.

- `...objects (remove only): Object3D[]` — Children to remove. dispose takes no arguments.

remove returns its Object3D receiver. geometry.dispose returns undefined and signals release of GPU resources.

- The starter without the ledger retains ref=2 after A is removed.

```js
scene.remove(mesh); if(--entry.refs===0) geometry.dispose();
```

[Object3D.remove / BufferGeometry.dispose](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-27

### API · Material.dispose / Texture.dispose

Disposing a material does not dispose its map. After texture.dispose, only the last owner closes its ImageBitmap. A render target owns its own texture.

material.dispose, texture.dispose and image.close return undefined. Material disposal does not dispose its textures.

- Disposing a material does not dispose its map. After texture.dispose, only the last owner closes its ImageBitmap. A render target owns its own texture.

```js
texture.dispose(); texture.image?.close?.();
```

[Material.dispose / Texture.dispose](https://threejs.org/docs/pages/Texture.html) · three@0.186.1 · 2026-10-27

### API · release(mesh) — example ownership helper

Collect identical references in Set and track users in Map. remove does not decrement users; release detaches and decrements the ref count together.

- `mesh: Mesh` — One mesh owner passed to this example release helper.

The release helper returns undefined. It detaches and decrements refs, releasing resources only after their final user.

- Collect identical references in Set and track users in Map. remove does not decrement users; release detaches and decrements the ref count together.

```js
if (--entry.refs === 0) { resource.dispose(); ledger.delete(resource); }
```

[release(mesh) — example ownership helper](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-27

## Next learning

[Previous: Render Targets and Minimap](../22/README.md) · [Next: Asynchronous Scene Replacement](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
