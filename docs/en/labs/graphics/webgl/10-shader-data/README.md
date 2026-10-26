# 10 · Uniform·Attribute·Varying and time

Week 2 / original Day 10 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Explain the data paths between JavaScript and shaders, and create changes over time.

## Prerequisites

08~09, elapsed time and delta.

## Key concepts and explanations

A uniform is an input shared by shader invocations in one draw; an attribute is a per-vertex input. A varying passes from vertex to fragment and is interpolated inside a triangle. GLSL3 uses the in/out syntax of the corresponding stage.

Update uniforms.uTime.value in seconds. The range of sin(uTime*uSpeed), -1~1, can be mapped with 0.5+0.5*sin(...) to 0~1. Change the existing value instead of creating a new material every frame.

## Skills you will develop

- Explain the data paths between JavaScript and shaders, and create changes over time.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Define uTime and uSpeed in both JavaScript and GLSL.
2. Change one color channel over time and compare uSpeed=0,1,3 over the same observation duration.
3. Decide and record whether pausing/resuming stops accumulated time or uses actual clock time.

## Variables to observe

uTime, uSpeed, amplitude·offset. Keep the camera and geometry fixed.

## Completion criteria

- [ ] Can explain the differences among the three data types.
- [ ] Specified the time unit and created an animation.
- [ ] Recorded the time policy on resume.

## Self-check questions

1. Can the screen show different colors even if all vertices receive the same uniform?
2. What problems occur when milliseconds and seconds are mixed?

## Official references

- [WebGL data](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Data)
- [Uniform](https://threejs.org/docs/pages/Uniform.html)

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

[Previous: GLSL syntax and color](../09-glsl-color/README.md) · [Next: UV and Texture Sampling](../11-uv/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/10-shader-data/example.js) · Workspace unit ID: `10-shader-data`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
