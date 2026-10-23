# 08 · Vertex·Fragment shader

Week 2 / original Day 8 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Distinguish the inputs and outputs of the two shader stages.

## Prerequisites

The week 1 scene, vector components, and coordinate transforms.

## Key concepts and explanations

The vertex shader transforms vertices into clip space and outputs gl_Position. The fragment shader calculates colors and other values for rasterized fragments. A fragment does not necessarily remain on screen after depth testing and compositing.

Three.js ShaderMaterial provides inputs such as position, projectionMatrix, and modelViewMatrix. First write a minimal position transform and solid-color output to distinguish which stage has a problem.

## Skills you will develop

- Distinguish the inputs and outputs of the two shader stages.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Create a local exercise that connects a plane and ShaderMaterial.
2. Output projectionMatrix * modelViewMatrix * vec4(position,1.0) in the vertex stage and a solid color in the fragment stage.
3. Compare the results of changing the position offset and color channels separately.


## Variables to observe

Vertex position offset, output color. Keep the camera and time fixed.

## Completion criteria

- [ ] Explained each shader's role and output.
- [ ] Wrote two minimal shaders.
- [ ] Recorded the difference between vertex and color changes.

## Self-check questions

1. Does changing the fragment color change the vertex count?
2. Why is gl_Position a vec4?

## Official references

- [ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html)
- [GLSL shaders](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders)

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

[Previous: Interactive scene review](../07-scene-review/README.md) · [Next: GLSL syntax and color](../09-glsl-color/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/08-shader-stages/example.js) · Workspace unit ID: `08-shader-stages`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
