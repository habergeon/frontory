# 15 · Comparing NeRF and 3DGS

Week 3 / original Day 15 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Explain how the two approaches differ in input, representation, and rendering.

## Prerequisites

Week 1 coordinates and camera; qualitative meaning of radiance and viewing rays.

## Key concepts and explanations

The original NeRF learns a continuous representation with a neural network that predicts density and color for a position and direction, then synthesizes images by sampling along rays. 3DGS optimizes a set of Gaussians with position, extent, color, opacity, and other properties, and renders them by splatting.

Both methods relate to multi-view images and camera information, but differ in stored representations and rendering costs. Many subsequent variants exist, so do not generalize that all NeRF/GS methods have the same speed or size. Here, rendering existing data comes first.

## Skills you will develop

- Explain how the two approaches differ in input, representation, and rendering.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Read the overviews of the two original papers and create a table of inputs/representation/rendering/results.
2. Write down the role of camera information in generating an image from a new viewpoint.
3. Separate training costs from browser rendering costs and define the scope of this study.

## Variables to observe

Representation, viewpoint, resolution. Do not compare FPS from different papers as if measured in the same environment.

## Completion criteria

- [ ] Explained the NeRF/GS differences in a table.
- [ ] Can distinguish training from rendering.
- [ ] Distinguished the conditions behind performance numbers.

## Self-check questions

1. Is model training always needed to view previously trained data?
2. Can a paper's FPS be guaranteed in my browser too?

## Official references

- [Original NeRF paper](https://www.matthewtancik.com/nerf)
- [Original 3DGS paper](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

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

[Previous: Interactive shader review](../14-shader-review/README.md) · [Next: Gaussian position·size·rotation·opacity](../16-gaussian/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/15-nerf-gs/example.js) · Workspace unit ID: `15-nerf-gs`

Computes alpha, transmittance, and accumulated brightness by ray integration through an analytic 1D Gaussian density field. The 3DGS pipeline appears only as explanatory text; splat compositing is not executed. NeRF training and neural network inference are not performed.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
