# Three.js · 01 Scene Graphs and Cameras

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Scene Coordinates, Cameras, and Geometry · Editable example · Storage ID: `threejs-01`

## Goals and learning outcomes

- Draw your first object on canvas and compare color, position, and camera distance.
- Explain time-based rotation and local/world positions before and after parent rotation using numbers and words.

## Prerequisites

Start with HTML, CSS, and JavaScript basics. This unit introduces coordinates, axes, and angles; WebGL completion and matrix calculations are not required.

## Key concepts and explanations

### Your first scene and object

canvas is an HTML output element. Connect a Mesh combining geometry and material to Scene, then render through a Camera.

### Time and parent-relative position

Multiply elapsed seconds by angular speed to get a rotation angle. child.position is parent-relative; getWorldPosition reads the world position including parent transforms.

## Practice setup

Edit and run independent HTML examples inside the site. The site supplies Three.js 0.186.1; no separate installation, server, or external images are required. Saved JavaScript code is preserved. Loading a starter requires confirmation before replacement.

Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.

## Practice tasks

1. Load the canvas starter below and change the background color. Edit and run HTML inside the site.
2. Compare cube color, position, and camera.z one at a time, then compare speed=0.5 and 1 in animation.
3. In local/world, keep the parent at the origin and child=(2,0,0), then read actual positions at parent Y rotations 0 and Math.PI / 2. Record conditions, predictions, actual images and numbers, and reasons in the site notes.

## Variables to observe

| Variable        | Baseline | Change | Expected change / hypothesis                                                   |
| --------------- | -------- | ------ | ------------------------------------------------------------------------------ |
| Parent rotation | 0        | PI/2   | The child’s local coordinates stay the same, but its world coordinates rotate. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Explain object construction, Scene connection, rendering, and the difference between camera.position and lookAt.
- [ ] Verify rotation in seconds and local=(2,0,0), world=(2,0,0)→(0,0,-2), then explain why.

## Self-check

1. Why does a child position stay unchanged when only its parent moves?
2. How do lookAt and position differ?

## Official references

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)

## Linked example and execution scope

[Example source](../../../../../../src/labs/threejs-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Edit and run the HTML starter inside the site. Read the step instructions and API reference, then record actual results in the notes.

- [example.html](../../../../../../src/labs/threejs-01/example.html)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Guided learning

Start with HTML, CSS, and JavaScript basics. Draw your first object, then explain time-based rotation and local/world positions. Coordinates, axes, and angles are introduced here; WebGL and matrix calculations are not prerequisites. Each starter is an independent HTML document. Predict, edit one value, run, and record the observed numbers and reasons in the site notes. Reading a step or explanation does not replace your code; loading an example is a separate action.

### Prerequisite units

- `html-step-02`
- `html-step-23`
- `javascript-step-18`
- `javascript-step-05`
- `javascript-step-11`
- `javascript-step-02`
- `javascript-step-12`

### Draw a scene on a canvas

The starter is an HTML document with canvas and output elements. Inline style sets the canvas display size; JavaScript inside script type="module" draws the image. import * as THREE from 'three' exposes the library names under THREE. The site supplies the module, so no npm installation or external server is required.

document.querySelector('canvas') finds the canvas element in the document. output is selected in the same way; assigning a string to output.textContent displays it as text.

The canvas is the HTML element that receives the image. Scene groups 3D objects and Camera sets the viewing position and direction. WebGLRenderer uses them when renderer.render(scene, camera) draws to the canvas. Scene and Camera are not HTML elements. new creates an object; renderer.render(...) calls a method on an existing object.

Find canvas, scene, camera, and renderer in order. Check that the renderer receives the canvas selected from HTML. The camera is at (0, 0, 5), looking at the origin. There are no objects yet, so a background-only image is expected. In scene.background = new THREE.Color('#edf2f7'), change only the color to '#172554' and run. Record your prediction first.

draw reads canvas.clientWidth and clientHeight in CSS px. A zero width or height returns early to defer drawing. When you reopen the preview, ResizeObserver reports the size change and calls draw. observe(canvas) starts observation. At a positive size, setSize(w, h, false) fits the image, while camera.aspect = w / h and updateProjectionMatrix() apply the camera ratio. false leaves the CSS size intact. This supporting code appears in every step; keep it unchanged here. The next unit explores sizing, buffers, and DPR.

The + operators join strings and numbers in output. The canvas and output selectors each find one element in this document. Client dimensions are integers including padding but excluding borders and scrollbars; this canvas has zero padding and border. Observation and animation continue while the document remains mounted; running again replaces the iframe.

**Expected result**

The empty scene background changes from #edf2f7 to #172554. output shows the actual display width and height. Having no cube yet is expected.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Draw a scene on a canvas</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <canvas aria-label="Draw a scene on a canvas"></canvas>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

      // Wait for a positive size when the reading tab hides the preview.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        output.textContent = 'Display size: ' + w + ' × ' + h + ' CSS px';
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Check that the selected HTML canvas and the canvas in WebGLRenderer({ canvas }) are the same element.
- After changing scene.background, check for renderer.render(scene, camera).
- Assign new THREE.Color('#172554') to scene.background and render again.

</details>

<details>
<summary>Solution and explanation</summary>

scene.background is independent of the body background CSS. A changed value may leave an existing image unchanged until render runs again. If even the background is missing, read output and the error display, then check script execution, the canvas connection, and render in order.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Draw a scene on a canvas</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <canvas aria-label="Draw a scene on a canvas"></canvas>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#172554');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

      // Wait for a positive size when the reading tab hides the preview.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        output.textContent = 'Display size: ' + w + ' × ' + h + ' CSS px';
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
    </script>
  </body>
</html>
```

</details>

- What do canvas, Scene, Camera, and WebGLRenderer each do?
- Are scene.background and the body background CSS the same value?

### Your first cube and camera

This independent starter includes a cube. geometry = new THREE.BoxGeometry(1, 1, 1) defines its shape; material = new THREE.MeshBasicMaterial({ color: '#2563eb' }) defines the surface; cube = new THREE.Mesh(geometry, material) combines them into a scene object. This material is visible without lights, so no light is added.

Change only color in the material constructor and run. Then keep the color and change cube.position.x from 0 to 1. position is relative to the parent, initially Scene. With this camera, +X appears rightward and +Y upward, but screen directions depend on camera orientation. Temporarily comment out scene.add(cube), run, and restore it. Creation and scene connection are separate operations.

Restore cube.position.x to 0 and change the last argument of camera.position.set(0, 0, 5) to 7, changing camera.position.z from 5 to 7. Predict the cube's appearance from the more distant camera. Now change camera.position.set(0, 0, 5) to camera.position.set(2, 0, 5), keeping camera.lookAt(0, 0, 0). position sets location; lookAt sets the direction toward a world-space target. A camera initially looks along local -Z. lookAt does not move it to the target.

The completed example shows the final comparison: an orange cube and camera=(2, 0, 5). Test the intermediate x=1, z=7, and removed add separately in the starter, restoring each before the next test.

**Expected result**

color changes the surface color; cube.position.x changes location. Removing add hides the cube. It appears smaller at camera.z=7. After lookAt, camera.position remains (2, 0, 5).

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your first cube and camera</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <canvas aria-label="Your first cube and camera"></canvas>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = 0;
      scene.add(cube);

      // Wait for a positive size when the reading tab hides the preview.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        output.textContent = 'Cube position: (' + cube.position.x + ', ' + cube.position.y + ', ' + cube.position.z + ')\nCamera position: (' + camera.position.x + ', ' + camera.position.y + ', ' + camera.position.z + ')';
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Find Mesh creation and scene.add(cube) separately. Creation alone does not connect it to Scene.
- Restore the cube to the origin and check that camera.z is 5 or 7.
- Check location, direction, and drawing with camera.position.set(2, 0, 5); camera.lookAt(0, 0, 0); renderer.render(scene, camera);

</details>

<details>
<summary>Solution and explanation</summary>

create a Mesh from geometry and material, connect it to Scene, and render with a Camera that can see it. When z changes from 5 to 7 the perspective image is smaller, but the geometry width remains 1. near=.1 and far=50 define the drawing depth range. Keep them here; unit 03 explores clipping. If you place the camera inside the cube, do not mistake the blank image for missing lighting.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your first cube and camera</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <canvas aria-label="Your first cube and camera"></canvas>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(2, 0, 5);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#f97316' });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = 0;
      scene.add(cube);

      // Wait for a positive size when the reading tab hides the preview.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        output.textContent = 'Cube position: (' + cube.position.x + ', ' + cube.position.y + ', ' + cube.position.z + ')\nCamera position: (' + camera.position.x + ', ' + camera.position.y + ', ' + camera.position.z + ')';
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
    </script>
  </body>
</html>
```

</details>

- Why is a created Mesh invisible if it is never added?
- What do position and lookAt each change?
- Does moving the camera farther away change geometry width?

### Turn time into rotation

The starter contains the cube and camera and begins with speed=0, so it is stationary. Passing renderFrame(timeMs) to renderer.setAnimationLoop makes the renderer call it each frame. A function passed for later invocation is called a callback.

timeMs is a timestamp in milliseconds. Save its first value in start and calculate elapsed seconds with seconds = (timeMs - start) / 1000. In cube.rotation.y = seconds * speed, speed is in rad/s. rotation uses radians: Math.PI is 180°, Math.PI / 2 is 90°, and 2 * Math.PI is one turn. Remember that camera.fov uses degrees instead.

Set speed to .5, run again, and read angle when output seconds is near 2. Run again with speed=1 and compare near the same 2 seconds. A frame might not occur at exactly 2 seconds; record the actual time and angle together. Adding a fixed angle per frame can make rotation per second depend on display refresh rate. This example calculates the angle from time.

renderFrame calls draw(). renderer.render(scene, camera) inside draw paints the updated rotation. Repeated calls reuse the same objects.

**Expected result**

speed=0 is stationary. Near 2 seconds, speed=.5 gives angle≈1rad and speed=1 gives angle≈2rad. Both output and image change.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Turn time into rotation</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <canvas aria-label="Turn time into rotation"></canvas>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = 0;
      scene.add(cube);
      const speed = 0; // rad/s: try 0, then 0.5, then 1.
      let start;
      let seconds = 0;

      // Wait for a positive size when the reading tab hides the preview.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        output.textContent = 'Time: ' + seconds.toFixed(3) + ' s; angle: ' + cube.rotation.y.toFixed(3) + ' rad; speed: ' + speed + ' rad/s';
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
      function renderFrame(timeMs) {
        if (start === undefined) start = timeMs;
        seconds = (timeMs - start) / 1000;
        cube.rotation.y = seconds * speed;
        draw();
      }
      renderer.setAnimationLoop(renderFrame);
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Check whether seconds and angle both change. If only the numbers change, inspect render placement.
- Check the division of timeMs by 1000 and the rad/s unit of speed.
- Inside renderFrame, call renderer.render(scene, camera) after cube.rotation.y = seconds * speed.

</details>

<details>
<summary>Solution and explanation</summary>

.5rad/s for 2 seconds gives 1rad; 1rad/s for 2 seconds gives 2rad. Without converting 2000ms into seconds, the angle is 1000 times larger. renderer.render(scene, camera) must also run inside renderFrame after changing rotation. The same cube is updated, rather than recreated each frame. renderer.setAnimationLoop(null) stops repeated calls.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Turn time into rotation</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <canvas aria-label="Turn time into rotation"></canvas>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = 0;
      scene.add(cube);
      const speed = 0.5; // rad/s: try 0, then 0.5, then 1.
      let start;
      let seconds = 0;

      // Wait for a positive size when the reading tab hides the preview.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        output.textContent = 'Time: ' + seconds.toFixed(3) + ' s; angle: ' + cube.rotation.y.toFixed(3) + ' rad; speed: ' + speed + ' rad/s';
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
      function renderFrame(timeMs) {
        if (start === undefined) start = timeMs;
        seconds = (timeMs - start) / 1000;
        cube.rotation.y = seconds * speed;
        draw();
      }
      renderer.setAnimationLoop(renderFrame);
    </script>
  </body>
</html>
```

</details>

- How does adding a fixed angle per frame differ from seconds*speed?
- Why divide timeMs by 1000?
- What should you check if numbers change but the image is still?

### Compare parent and child positions

This independent starter is stationary, with no animation. parent = new THREE.Group() is a parent node without its own shape. parent.position=(0, 0, 0), child.position=(2, 0, 0), and parent.add(child), scene.add(parent) connect them. The camera looks at the origin from (5, 4, 7) so that XZ motion is visible.

The tree is Scene → parent Group → child Mesh. child.position is local to parent; world position includes parent transforms in the coordinate system of the whole scene. angleInput has a string value, so convert it with Number(angleInput.value) before assigning parent.rotation.y. The choices are radian values 0 and Math.PI / 2.

world = new THREE.Vector3() stores the result. child.getWorldPosition(world) writes into world without modifying child.position. Predict both positions at rotation 0, then run: both are (2, 0, 0). Change parent Y rotation to Math.PI / 2 and compare again. Expect local=(2, 0, 0), world=(0, 0, -2). Point your right thumb along +Y; your curled fingers indicate positive rotation. In the XZ diagram, +X turns toward -Z.

The HTML range input has two values: 0 and 1.5707963267948966, the latter equal to Math.PI / 2. addEventListener('input', draw) calls draw when the value changes. toFixed(2) formats a number as a string with two decimal places. coordinates groups x/y/z for display without changing the position.

**Expected result**

parent stays at the origin. At parent.rotation.y=0, world=(2, 0, 0); at Math.PI / 2, world≈(0, 0, -2). child local=(2, 0, 0) is unchanged.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Compare parent and child positions</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <p>Scene → parent Group → child Mesh</p>
    <p>
      +Y points up; +X rotates toward -Z at 90°. The parent stays at the origin.
    </p>
    <label for="angle"
      >Parent Y rotation (radians)
      <input
        id="angle"
        type="range"
        min="0"
        max="1.5707963267948966"
        step="1.5707963267948966"
        value="0"
      />
    </label>
    <canvas aria-label="Compare parent and child positions"></canvas>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(5, 4, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const child = new THREE.Mesh(geometry, material);
      child.position.x = 2;
      const parent = new THREE.Group();
      parent.add(child);
      scene.add(parent);
      const angleInput = document.querySelector('#angle');
      const world = new THREE.Vector3();
      const coordinates = value => '(' + value.x.toFixed(2) + ', ' + value.y.toFixed(2) + ', ' + value.z.toFixed(2) + ')';

      // Wait for a positive size when the reading tab hides the preview.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        parent.rotation.y = Number(angleInput.value);
        child.getWorldPosition(world);
        output.textContent = 'Parent Y rotation: ' + parent.rotation.y.toFixed(6) + ' rad\nlocal: ' + coordinates(child.position) + '\nworld: ' + coordinates(world);
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
      angleInput.addEventListener('input', draw);
    </script>
  </body>
</html>
```

<details>
<summary>Hints</summary>

- Read child.position and world together in output and identify the value relative to the parent.
- Check that the final connection is parent.add(child). scene.add(child) changes the parent.
- Read with const world = new THREE.Vector3(); child.getWorldPosition(world);. Changing only parent.rotation.y to Math.PI / 2 gives local=(2, 0, 0), world=(0, 0, -2).

</details>

<details>
<summary>Solution and explanation</summary>

parent rotation turns the axes used to express the child's position. The child remains 2 units along the parent's +X. getWorldPosition applies the current parent transforms without requiring manual matrix multiplication. Values such as 1e-16 are floating-point results close to 0. Format output to 2 decimal places without rounding the actual position.

An object has only one parent. scene.add(child) after parent.add(child) removes child from parent. Record your predictions, actual coordinates, and reasons for both rotation conditions in the site notes.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Compare parent and child positions</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <p>Scene → parent Group → child Mesh</p>
    <p>
      +Y points up; +X rotates toward -Z at 90°. The parent stays at the origin.
    </p>
    <label for="angle"
      >Parent Y rotation (radians)
      <input
        id="angle"
        type="range"
        min="0"
        max="1.5707963267948966"
        step="1.5707963267948966"
        value="1.5707963267948966"
      />
    </label>
    <canvas aria-label="Compare parent and child positions"></canvas>
    <output>Waiting for preview dimensions</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(5, 4, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const child = new THREE.Mesh(geometry, material);
      child.position.x = 2;
      const parent = new THREE.Group();
      parent.add(child);
      scene.add(parent);
      const angleInput = document.querySelector('#angle');
      const world = new THREE.Vector3();
      const coordinates = value => '(' + value.x.toFixed(2) + ', ' + value.y.toFixed(2) + ', ' + value.z.toFixed(2) + ')';

      // Wait for a positive size when the reading tab hides the preview.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        parent.rotation.y = Number(angleInput.value);
        child.getWorldPosition(world);
        output.textContent = 'Parent Y rotation: ' + parent.rotation.y.toFixed(6) + ' rad\nlocal: ' + coordinates(child.position) + '\nworld: ' + coordinates(world);
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
      angleInput.addEventListener('input', draw);
    </script>
  </body>
</html>
```

</details>

- Why is child.position unchanged when only the parent rotates?
- Does getWorldPosition(world) modify child.position?
- What changes if scene.add(child) is called last?

### API · THREE.Scene

Constructor for a scene root. Scene inherits Object3D and connects children with add. Its background member defaults to null.

Returns a new Scene. Construction alone does not draw to a canvas.

- Scene is not an HTML element.

```js
const scene = new THREE.Scene();
scene.add(cube);
```

[THREE.Scene](https://threejs.org/docs/pages/Scene.html) · three@0.186.1 · 2026-10-26

### API · THREE.Color

Constructor for a color object. This course uses CSS hex strings only.

- `value: string` — A CSS hex color string, such as '#edf2f7'.

Returns a new Color.

- Color spaces and linear RGB calculations are later topics.

```js
scene.background = new THREE.Color('#edf2f7');
```

[THREE.Color](https://threejs.org/docs/pages/Color.html) · three@0.186.1 · 2026-10-26

### API · THREE.WebGLRenderer / renderer.domElement

Constructor for a renderer that draws WebGL2 scenes to a canvas. domElement refers to its actual output canvas.

- `canvas: HTMLCanvasElement` — The canvas selected from HTML. Omitting it creates a new canvas.
- `antialias: boolean` — Requests edge antialiasing at construction. (false)

Returns a renderer. domElement is a canvas reference, not a method.

- WebGL2 support is required. Pass your existing canvas to use it.

```js
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
const actualCanvas = renderer.domElement;
```

[THREE.WebGLRenderer / renderer.domElement](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · renderer.setSize

Instance method that sets renderer logical size and viewport. It also resizes the canvas buffer using DPR.

- `width: number` — Logical width in CSS px.
- `height: number` — Logical height in CSS px.
- `updateStyle: boolean` — When true, also changes canvas inline CSS width and height. (true)

No return value. The buffer becomes floor(width*DPR) × floor(height*DPR).

- Use false when CSS manages display size. Do not pass dimensions already multiplied by DPR.

```js
renderer.setSize(w, h, false);
```

[renderer.setSize](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · renderer.render

Instance method that draws the scene through a camera onto the current canvas.

- `scene: Scene` — The scene to draw.
- `camera: Camera` — The camera defining position, direction, and projection.

No return value. Updates the current image.

- Changing object properties does not automatically call this method.

```js
renderer.render(scene, camera);
```

[renderer.render](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · THREE.PerspectiveCamera

Constructor for a perspective camera, where distant objects appear smaller. Arguments are positional.

- `fov: number` — Vertical field of view in degrees. (50)
- `aspect: number` — Display width divided by height. (1)
- `near: number` — Depth of the near plane in front of the camera. (0.1)
- `far: number` — Depth of the far plane. (2000)

Returns a new PerspectiveCamera.

- Set near>0 and far>near. fov uses degrees rather than the radians used by rotation.
- Call updateProjectionMatrix after changing fov/aspect/near/far/zoom.

```js
const camera = new THREE.PerspectiveCamera(50, w / h, .1, 50);
```

[THREE.PerspectiveCamera](https://threejs.org/docs/pages/PerspectiveCamera.html) · three@0.186.1 · 2026-10-26

### API · THREE.BoxGeometry

Constructor for a box centered at the origin, with edges parallel to local X/Y/Z.

- `width: number` — Length along local X. (1)
- `height: number` — Length along local Y. (1)
- `depth: number` — Length along local Z. (1)

Returns a new BoxGeometry.

- Segment arguments are omitted here and each defaults to 1. Editing parameters.width does not rebuild vertices.

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
```

[THREE.BoxGeometry](https://threejs.org/docs/pages/BoxGeometry.html) · three@0.186.1 · 2026-10-26

### API · THREE.MeshBasicMaterial

Constructor for a surface appearance unaffected by lights.

- `color: Color | string | number` — The examples use CSS hex strings. (0xffffff)
- `wireframe: boolean` — When true, displays triangle edges. (false)

Returns a new material.

- If this material is invisible, check Scene connection, camera, and render before adding lights.

```js
const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
```

[THREE.MeshBasicMaterial](https://threejs.org/docs/pages/MeshBasicMaterial.html) · three@0.186.1 · 2026-10-26

### API · THREE.Mesh

Constructor for a scene object combining geometry and material.

- `geometry: BufferGeometry` — The shape object.
- `material: Material` — The surface appearance object.

Returns a new Mesh without adding it to Scene.

- This course supplies both arguments rather than relying on omitted defaults.

```js
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

[THREE.Mesh](https://threejs.org/docs/pages/Mesh.html) · three@0.186.1 · 2026-10-26

### API · object.position / Vector3.set

position is a Vector3 member holding a position relative to the parent. position.set is a Vector3 method that changes its components.

- `x: number` — Position along the parent X axis.
- `y: number` — Position along the parent Y axis.
- `z: number` — Position along the parent Z axis.

position initially is (0, 0, 0). set mutates it and returns the same Vector3.

- Change x/y/z or use set; do not replace position with an array.

```js
cube.position.set(1, 0, 0);
cube.position.x = 2;
```

[object.position / Vector3.set](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · camera.lookAt

Method that points a camera toward a world-space target.

- `x: number` — Target world X. An overload accepts a single Vector3.
- `y: number` — Target world Y.
- `z: number` — Target world Z.

No return value. Changes camera rotation without moving its position.

- Non-uniformly scaled parents are unsupported. With controls, avoid having lookAt and controls.update overwrite orientation each frame.

```js
camera.position.set(2, 0, 5);
camera.lookAt(0, 0, 0);
```

[camera.lookAt](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · object.add

Method that connects other Object3D instances as children.

- `children: Object3D[]` — Children to connect. Multiple arguments are accepted.

Returns the parent itself. Children are removed from their previous parents.

- An object has one parent. Its local transform is retained, but its world position is not guaranteed to stay the same.

```js
parent.add(child);
scene.add(parent);
```

[object.add](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · object.rotation.x/y/z

Euler member holding an Object3D local rotation. x/y/z are angles in radians.

Initial angles are (0, 0, 0), with default order XYZ. Assigning components mutates the object.

- Math.PI / 2 is 90°. Do not confuse radians with camera.fov degrees.
- A child rotation.y is not always a rotation about world Y.

```js
cube.rotation.y = Math.PI / 2;
```

[object.rotation.x/y/z](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · renderer.setAnimationLoop

Method that registers or stops a callback for each frame.

- `callback: function | null` — The first callback argument in this non-XR example is timestamp timeMs. null stops the loop.

No return value. The registered callback runs repeatedly.

- The timestamp is in ms; elapsed seconds are (timeMs-start)/1000.
- After changing object values inside the callback, also call render.

```js
let start;
renderer.setAnimationLoop(timeMs => {
  if (start === undefined) start = timeMs;
  const seconds = (timeMs - start) / 1000;
  cube.rotation.y = seconds * speed;
  renderer.render(scene, camera);
});
```

[renderer.setAnimationLoop](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · THREE.Group

Constructor for an Object3D node that groups child transforms. It has no shape of its own.

Returns a new Group. position/rotation/add follow Object3D contracts.

- Adding a Group does not create visible geometry.

```js
const parent = new THREE.Group();
parent.add(child);
scene.add(parent);
```

[THREE.Group](https://threejs.org/docs/pages/Group.html) · three@0.186.1 · 2026-10-26

### API · THREE.Vector3

Constructor for an object with x/y/z components, used here to store position results.

- `x: number` — X component. (0)
- `y: number` — Y component. (0)
- `z: number` — Z component. (0)

Returns a new Vector3.

- The Vector3 type does not determine whether a value is local or world-space; its use does.

```js
const world = new THREE.Vector3();
```

[THREE.Vector3](https://threejs.org/docs/pages/Vector3.html) · three@0.186.1 · 2026-10-26

### API · object.getWorldPosition

Method that reads world position including current parent transforms.

- `target: Vector3` — The destination object for the result; it is required.

Mutates and returns target without changing object.position.

- In 0.186.1, the method updates the required parent world matrices internally. No manual matrix multiplication is needed.

```js
const world = new THREE.Vector3();
child.getWorldPosition(world);
```

[object.getWorldPosition](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · camera.updateProjectionMatrix

Method that applies changed fov/aspect/near/far/zoom values to the projection matrix. Orthographic cameras expose the same method.

No return value. The next render uses the updated projection.

- Property assignment does not call this automatically.
- Distinguish camera movement from changes to projection values.

```js
camera.aspect = w / h;
camera.updateProjectionMatrix();
```

[camera.updateProjectionMatrix](https://threejs.org/docs/pages/PerspectiveCamera.html) · three@0.186.1 · 2026-10-26

### API · canvas.width/height / stage.clientWidth/clientHeight

DOM members for display and buffer dimensions. clientWidth/clientHeight use CSS px; canvas.width/height use buffer px. The same Element clientWidth/clientHeight contract applies to canvas.

Property reads yield dimension numbers. Client dimensions are integers and include padding but exclude borders. The corresponding scrollbar is also excluded.

- These are Web APIs, not Three.js APIs. packageVersion records the lesson Three.js version.
- The example stage has no padding/border. Do not mix direct canvas buffer assignments with renderer size management.
- Display-size sources: https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth and https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight

```js
const w = stage.clientWidth;
const h = stage.clientHeight;
output.textContent = `${w} × ${h}; ${canvas.width} × ${canvas.height}`;
```

[canvas.width/height / stage.clientWidth/clientHeight](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/width) · three@0.186.1 · 2026-10-26

### API · ResizeObserver / observe / disconnect

Web API that reports element size changes through a callback, including stage changes without window resizing.

- `callback: function` — Function called for size changes; the example passes resizeScene.
- `target: Element` — The stage element observed with observe(target).

The constructor returns an observer. observe and disconnect return no value. disconnect stops observation.

- This is not a Three.js API. packageVersion records the lesson Three.js version.
- Return before division if w or h is 0. An observer does not replace render.

```js
const observer = new ResizeObserver(resizeScene);
observer.observe(stage);
resizeScene();
// When observation ends: observer.disconnect();
```

[ResizeObserver / observe / disconnect](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) · three@0.186.1 · 2026-10-26

## Next learning

[Next: Renderer and Display Size](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
