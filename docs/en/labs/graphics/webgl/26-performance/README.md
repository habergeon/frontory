# 26 · FPS·Draw Calls·memory analysis

Week 4 / original Day 26 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Record a performance baseline under reproducible conditions.

## Prerequisites

07, 18, 22.

## Key concepts and explanations

Fix the device, browser, viewport, DPR, data, camera path, warm-up, and measurement duration. Observe frame-time distributions and long frames as well as average FPS. JavaScript execution time is not GPU time.

renderer.info.render.calls and triangles are partial indicators of rendering work. renderer.info.memory.geometries/textures are object counters, not measurements of actual total GPU VRAM. Browser and driver caches also mean OS memory may not decrease immediately after disposal.

## Skills you will develop

- Record a performance baseline under reproducible conditions.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. After pnpm build, define a representative path in pnpm preview.
2. Fill in the conditions and observation tools in docs/performance.md.
3. Measure the same path several times and distinguish loading, CPU updates, and rendering intervals.


## Variables to observe

Keep conditions fixed for the baseline. There is no intentionally changed variable yet.

## Completion criteria

- [ ] Described measurement conditions reproducibly.
- [ ] Recorded repeated results and variation.
- [ ] Distinguished renderer.info from total VRAM.

## Self-check questions

1. Can the experience differ even at the same FPS?
2. If memory does not decrease immediately, is it always a leak?

## Official references

- [WebGLRenderer info](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Chrome Performance](https://developer.chrome.com/docs/devtools/performance)

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

[Previous: Markers and Raycasting](../25-markers/README.md) · [Next: Resolution·data optimization](../27-optimization/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/26-performance/example.js) · Workspace unit ID: `26-performance`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
