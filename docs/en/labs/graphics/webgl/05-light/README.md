# 05 · Light·Shadow·Texture

Week 1 / original Day 5 · Document provided / runnable example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Distinguish how light, shadows, and textures contribute to the image.

## Prerequisites

03~04, awareness of material and UV.

## Key concepts and explanations

Lights change brightness according to surface direction and material. Shadows are an additional process using depth information seen from the light; check castShadow/receiveShadow together with the renderer's shadow settings.

Texture is data mapped onto a surface using UVs. Color images and non-color data such as normal/roughness have different meanings, so distinguish their color space settings. A small checkerboard you create yourself is enough for this exercise; do not collect large external assets.

## Skills you will develop

- Distinguish how light, shadows, and textures contribute to the image.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Place a plane and cube, and change only the DirectionalLight position.
2. Check each setting needed to enable shadows and observe where shadows break up or appear jagged.
3. Add a small local checkerboard texture and record the difference between changes in lighting and changes in the pattern.

You can edit this unit's runnable code in the workspace. If an empty code record was previously saved, restore the original code. Your notes are preserved.

## Variables to observe

light position/intensity, shadow map size·bias, texture/roughness. Compare one at a time.

## Completion criteria

- [ ] Explained the roles of light and shadow settings.
- [ ] Recorded lighting changes with the same material.
- [ ] Noted the texture source and color space choice.

## Self-check questions

1. Does a bright object always cast a shadow?
2. Why can treating a normal map as a color image cause problems?

## Official references

- [DirectionalLight](https://threejs.org/docs/pages/DirectionalLight.html)
- [LightShadow](https://threejs.org/docs/pages/LightShadow.html)
- [Texture](https://threejs.org/docs/pages/Texture.html)

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

[Previous: Coordinate systems·Vector3·Matrix4](../04-coordinates/README.md) · [Next: Raycaster·OrbitControls](../06-interaction/README.md)

## Linked example

[Example source](../../../../../../src/labs/05-light/example.js) is displayed in the workspace editor and actually runs. Change the variables or exercises in the first comment one at a time and record your predictions and results. Restoring the original code resets only the code and does not erase your notes.

See [Runtime environments and limitations](../../../../examples.md).

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/05-light/example.js) · Workspace unit ID: `05-light`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
