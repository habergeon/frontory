# 09 · GLSL syntax and color

Week 2 / original Day 9 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Create colors using GLSL types and vector operations, and fix compilation errors.

## Prerequisites

The minimal shaders from 08.

## Key concepts and explanations

GLSL float/vec2/vec3/vec4 are static types that differ from JavaScript numbers and arrays. Swizzling selects components, as in .xy or .rgb, and vector and scalar operations can be applied component by component.

Distinguish ranges from alpha in color calculations. Depending on the GLSL version, attribute/varying or in/out and the color output syntax differ. Keep the default ShaderMaterial syntax for this exercise, and update both shaders together when switching versions.

## Skills you will develop

- Create colors using GLSL types and vector operations, and fix compilation errors.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Output red, green, blue, and gray as vec4 values.
2. Make an incorrect assignment between vec3 and vec4, read the line and type information in the error, and fix it.
3. Blend two colors with mix and clamp and compare predicted colors at 0,0.5,1.


## Variables to observe

RGB channels, blend ratio, alpha. Keep geometry and the camera fixed.

## Completion criteria

- [ ] Explained and fixed one type error.
- [ ] Recorded three blend-ratio conditions.
- [ ] Specified the GLSL syntax version.

## Self-check questions

1. What components does vec3(0.5) have?
2. How do the roles of RGB and alpha differ?

## Official references

- [GLSL shader basics](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders)
- [ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html)

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

[Previous: Vertex·Fragment shader](../08-shader-stages/README.md) · [Next: Uniform·Attribute·Varying and time](../10-shader-data/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/09-glsl-color/example.js) · Workspace unit ID: `09-glsl-color`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
