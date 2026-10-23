# 13 · ShaderMaterial integration

Week 2 / original Day 13 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Connect custom shader inputs, lifetimes, and errors to a Three.js scene.

## Prerequisites

08~12.

## Key concepts and explanations

ShaderMaterial connects GPU program source and uniforms to a scene material. Unlike RawShaderMaterial, Three.js provides basic declarations. Errors can occur if input declarations are duplicated or the geometry lacks an expected attribute.

Uniform value changes differ from changes to shader source/defines. Avoid unnecessary material recreation, and dispose of materials that are no longer used. Record error logs alongside the source version actually in use.

## Skills you will develop

- Connect custom shader inputs, lifetimes, and errors to a Three.js scene.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Wrap the previous wave shader in a material creation function and document the input uniform list.
2. Update existing values when changing only time and color.
3. Check three situations: an incorrect variable name, missing UVs, and cleanup when replacing a material.


## Variables to observe

Uniform values, defines, shader source. Distinguish which changes require recompilation.

## Completion criteria

- [ ] Can explain material creation, update, and cleanup paths.
- [ ] Can distinguish built-in inputs from declarations I provide.
- [ ] Recorded the cause of a shader error and the result of the fix.

## Self-check questions

1. What must you provide yourself with RawShaderMaterial?
2. Do you need to recreate a material when changing a color uniform?

## Official references

- [ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html)
- [RawShaderMaterial](https://threejs.org/docs/pages/RawShaderMaterial.html)

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

[Previous: Noise·Sin·Cos waves and distortion](../12-waves/README.md) · [Next: Interactive shader review](../14-shader-review/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/13-shader-material/example.js) · Workspace unit ID: `13-shader-material`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
