# 14 · Interactive shader review

Week 2 / original Day 14 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Complete and explain a small effect that connects UI input to uniforms.

## Prerequisites

08~13, React input events.

## Key concepts and explanations

Validate UI slider values in JavaScript before passing them to uniforms. The numbers shown in the UI must match the actual shader values; creating the UI alone does not mean the effect is implemented.

Exposing too many variables in one effect makes causes hard to track. Start with just amplitude, speed, and pause, and produce reproducible results that include errors, resizing, and cleanup.

## Skills you will develop

- Complete and explain a small effect that connects UI input to uniforms.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Connect amplitude and speed inputs and pause to the wave.
2. Compare UI values and actual results at minimum, default, and maximum values.
3. Write a short demonstration sequence, explain the code, and summarize results that differed from your predictions.

## Variables to observe

Amplitude, speed, viewport. Keep the default geometry and camera fixed.

## Completion criteria

- [ ] Input changes reach the uniforms and the scene.
- [ ] Checked resizing and cleanup behavior.
- [ ] Can explain the effect's data flow.

## Self-check questions

1. Which path would you check if the UI number changes but the scene does not?
2. What do you gain by reducing experimental variables?

## Official references

- [React input](https://react.dev/reference/react-dom/components/input)
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

[Previous: ShaderMaterial integration](../13-shader-material/README.md) · [Next: Comparing NeRF and 3DGS](../15-nerf-gs/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/14-shader-review/example.js) · Workspace unit ID: `14-shader-review`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
