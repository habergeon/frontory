# 01 · WebGL·GPU and the first image

Week 1 / original Day 1 · Runnable example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Connect the roles of the CPU and GPU and the rendering pipeline to the code for your first scene.

## Prerequisites

JavaScript functions, objects, and modules; React effect setup/cleanup.

## Key concepts and explanations

WebGL is an API for requesting graphics work from the GPU in a browser. Three.js provides higher-level representations such as scenes and materials, but the data for the GPU still needs to be prepared and submitted.

The image is produced through vertex processing → screen projection and rasterization of triangles → fragment processing → depth testing and compositing. GPUs are well suited to processing many vertices and fragments with the same program, while React handles menus and control state. React render and renderer.render are different processes.

## Skills you will develop

- Connect the roles of the CPU and GPU and the rendering pipeline to the code for your first scene.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Setup

From the project root, run pnpm install --frozen-lockfile and pnpm dev, then open http://127.0.0.1:5173 . Select unit 01 to view the scene, code, and notes together. Code runs after 600ms without input, and failing code is saved too, so read the error messages and correct it.

## Exercises

1. First drag the cube in the workspace and use the wheel to zoom in and out. Find `Scene`, `PerspectiveCamera`, and `WebGLRenderer` in the code and note what each is responsible for.
2. Change `const ROTATE = true` near the top of the code to `false` to stop the motion. Change `CUBE_COLOR` from `'#3179bf'` to `'#e86a33'`, stop typing, and check that the color updates.
3. Keep `ROTATE = false` and change `CAMERA_POSITION` through `[3, 2, 5]` → `[0, 2, 5]` → `[5, 2, 0]`, one at a time. Predict which faces will be visible before each change, then compare with the actual scene. Keep `FOV = 50` and the cube size unchanged.
4. Set `ROTATE` back to `true` and, in `cube.rotation.y += delta * 0.5`, change `0.5` to `1.0`. Observe the difference in rotation speed while keeping the color and camera fixed.
5. Delete one bracket to create a syntax error, then restore it. Check the error message and whether the last working scene remains visible, and record your prediction, actual result, and what you learned in your notes.

The code shown is the original src/labs/01-scene/example.js or the edited version saved for this unit. Select JavaScript/TypeScript in Monaco; after 600ms without input, syntax and type checks run and the code executes in a new iframe. TypeScript is converted to JavaScript. Click an error in the list to jump to its line. The existing createScene.ts and SceneLab.tsx are preserved for comparison and are not the current editor's execution source.

TypeScript experiment: switch the language to TypeScript and add a type annotation to `const FOV = 50` using `: number`. Replace the number with a string to observe a type error, then restore the number and check that the scene updates. Restoring the original code returns to JavaScript and preserves your notes.

## Follow-up camera exercise

Fix ROTATE at false, then change CAMERA_POSITION through [3, 2, 5] → [0, 2, 5] → [5, 2, 0], one at a time. Predict the visible faces before each change, and compare the actual result and axis directions. Keep FOV and the cube size fixed. OrbitControls target is the origin; the camera position and the point it looks toward are separate values. Continue with [02 Camera](../02-camera/README.md) for details.

## Variables to observe

`CUBE_COLOR`: surface color; `CAMERA_POSITION`: visible faces; `ROTATE` and `delta * 0.5`: whether and how fast it rotates. Change only the specified variable at each step and keep the rest fixed. During the camera experiment, compare the scene immediately after changing the code without additionally moving the viewpoint with the mouse.

## Completion criteria

- [ ] Explained the CPU/GPU roles and pipeline in my own words.
- [ ] Confirmed that code changes appear in the actual scene.
- [ ] Recovered from a syntax error and recorded predicted/actual results.

## Self-check questions

1. Can the cube move without React rendering again?
2. Do all fragments remain in the final image?

## Official references

- [WebGL concepts](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [Three.js installation](https://threejs.org/manual/pages/installation.html)

## Experiment notes — fill these in yourself

### Goal
<!-- The question you want to answer in this experiment -->

### Key concepts
<!-- Explain in your own words -->

### Changed variables and predictions
<!-- Baseline → changed value / fixed conditions / prediction before running -->

### Actual results
<!-- Actual observations, screenshots, and measurements. Leave blank before running. -->

### What I learned
<!-- Differences between predictions and actual results, and why -->

### Remaining questions
<!-- What to check in the next experiment -->

[Next: Scene·Camera·Renderer](../02-camera/README.md)

## Linked example

[Example source](../../../../../../src/labs/01-scene/example.js) is displayed in the workspace editor and actually runs. Change the variables or exercises in the first comment one at a time and record your predictions and results. Restoring the original code resets only the code and does not erase your notes.

See [Runtime environments and limitations](../../../../examples.md).

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/01-scene/example.js) · Workspace unit ID: `01-scene`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
