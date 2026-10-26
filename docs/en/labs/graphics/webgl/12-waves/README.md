# 12 · Noise·Sin·Cos waves and distortion

Week 2 / original Day 12 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Explain the difference between periodic functions and noise, and experiment with waves one variable at a time.

## Prerequisites

10~11, sin/cos and geometry vertices.

## Key concepts and explanations

Adding A*sin(k*x+t*speed) to z lets you distinguish amplitude A, spatial frequency k, and temporal speed speed. cos belongs to the same periodic family with a different phase relationship, while noise is used to reduce regular repetition.

Noise differs from generating new random numbers every frame. If you want spatially continuous noise, check a verified implementation and its license; do not expect built-in GLSL noise in every environment. With too few vertex subdivisions, the silhouette remains angular even if fragment colors are smooth.

## Skills you will develop

- Explain the difference between periodic functions and noise, and experiment with waves one variable at a time.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Apply a sine wave to the plane's vertices and change only the amplitude.
2. Keep frequency fixed and compare subdivision counts of 4,16,64.
3. Compare the phases of sin and cos, then record your expectations for replacing them with noise and the implementation and source required.

## Variables to observe

Amplitude, frequency, speed, subdivision count, phase. Change one at a time.

## Completion criteria

- [ ] Can distinguish spatial frequency from temporal speed.
- [ ] Compared three subdivision-count conditions.
- [ ] Explained the difference between noise and random numbers.

## Self-check questions

1. Can the silhouette become wavy using only a fragment shader?
2. Does GPU deformation automatically apply to CPU raycasting too?

## Official references

- [PlaneGeometry](https://threejs.org/docs/pages/PlaneGeometry.html)
- [ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html)
- [Official GLSL language repository](https://github.com/KhronosGroup/GLSL)

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

[Previous: UV and Texture Sampling](../11-uv/README.md) · [Next: ShaderMaterial integration](../13-shader-material/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/12-waves/example.js) · Workspace unit ID: `12-waves`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
