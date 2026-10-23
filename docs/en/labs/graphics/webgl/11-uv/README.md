# 11 · UV and Texture Sampling

Week 2 / original Day 11 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Distinguish surface UVs from screen coordinates and explain sampling.

## Prerequisites

08~10, interpolation and the 0~1 range.

## Key concepts and explanations

UVs are 2-dimensional coordinates attached to a geometry surface. They are not the same as world x/y or screen coordinates and usually stay attached to the surface when a mesh moves. Vertex UVs are interpolated and passed to fragments.

Output UVs as colors, then sample a texture. Wrapping handles coordinates outside the range, while filtering handles magnified/minified sampling. Start with a small checkerboard you create yourself to separate data-source issues from shader issues.

## Skills you will develop

- Distinguish surface UVs from screen coordinates and explain sampling.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Pass vUv=uv and output RGB=(u,v,0).
2. Predict the colors of three surface corners and check the coordinate directions.
3. Change the repeat count of a small texture or procedural checkerboard through 2,8,24 and rotate the plane.


## Variables to observe

UV repeat, filtering, mesh transform. Keep FOV fixed.

## Completion criteria

- [ ] Explained the colors at both ends of the UV range.
- [ ] Changed the repeat count and observed the result.
- [ ] Gave an example of how UVs differ from screen coordinates.

## Self-check questions

1. When an object moves, do its UVs change by the same displacement?
2. What would you suspect if a small pattern flickers at a distance?

## Official references

- [Texture](https://threejs.org/docs/pages/Texture.html)
- [WebGL textures](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL)

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

[Previous: Uniform·Attribute·Varying and time](../10-shader-data/README.md) · [Next: Noise·Sin·Cos waves and distortion](../12-waves/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/11-uv/example.js) · Workspace unit ID: `11-uv`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
