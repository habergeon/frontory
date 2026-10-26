# 18 · Projection·Sorting·Alpha Blending

Week 3 / original Day 18 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Explain screen footprints and order-dependent compositing.

## Prerequisites

Projection from 02, 16~17, RGB and alpha.

## Key concepts and explanations

A 3D Gaussian's extent is projected through the camera into a screen-space footprint. Even with the same splat count, the number of covered pixels can differ with distance and screen size.

Order matters when compositing transparent colors. Apply C=alpha*C앞+(1-alpha)*C뒤 to two colors, then swap the front and back. Actual GS renderers handle visibility, sorting, accumulated transmittance, and other concerns. You do not need to build your own GPU sorter at this stage.

## Skills you will develop

- Explain screen footprints and order-dependent compositing.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Use red/blue layers and alpha=0.5 to calculate the result over a black background in each order.
2. Draw the footprints of a near splat and a distant splat.
3. Define a camera path and recording items for observing overlap boundaries in the loading exercise.

## Variables to observe

Depth order, alpha, distance, resolution. Cost changes are hypotheses until measured.

## Completion criteria

- [ ] Wrote numerical results for the different compositing orders.
- [ ] Can distinguish count from footprint.
- [ ] Planned observations of overlap boundaries.

## Self-check questions

1. How does the effect of order change when alpha=1?
2. Can zooming in affect cost with the same count?

## Official references

- [3DGS rendering paper](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)
- [Material blending](https://threejs.org/docs/pages/Material.html)

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

[Previous: Spherical Harmonics and view-dependent color](../17-sh/README.md) · [Next: .ply·.splat loading](../19-gs-loading/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/18-gs-projection/example.js) · Workspace unit ID: `18-gs-projection`

Reverses the alpha compositing order of two red/blue rectangle layers in Canvas 2D, displays their overlap RGB, and calculates the projected 1σ radius f×scale/z. Gaussian covariance projection and SH color synthesis are not implemented; this does not measure the quality of a trained GS model.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
