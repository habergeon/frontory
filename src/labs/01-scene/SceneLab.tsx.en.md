# SceneLab.tsx — English reading guide

Read the [original source](./SceneLab.tsx) and [execution guidance](./COMPANIONS.en.md). This guide translates prose and visible text; it is not an executable copy. Source line numbers identify the original reading locations.

- Line 20: Could not create the first scene.
- Line 21: Could not create the WebGL scene. Check WebGL 2 browser support and hardware acceleration settings.
- Line 25: The same cleanup runs during StrictMode setup → cleanup → setup, lab changes, and HMR.
- Line 45: Resume rotation
- Line 45: Pause rotation
- Line 40: 01 · First scene
- Line 41: Observe the camera and coordinate system using a rotating cube.
- Line 48: Reset camera
- Line 57: Drag: orbit · Wheel: zoom · Right drag: pan
- Line 58: Touch: one finger to orbit, two fingers to zoom/pan · Axes: X red / Y green / Z blue
- Line 62: First assignment · Change the camera position
- Line 64: Before changing <code>camera.position.set(3, 2, 5)</code> in <code>createScene.ts</code>, predict which faces of the cube will be visible.
- Line 68: Compare <code>(0, 0, 5)</code>, <code>(5, 0, 0)</code>, and <code>(3, 5, 3)</code> one at a time, then record the actual results in <code>docs/labs/graphics/webgl/01-scene/README.md</code>.
