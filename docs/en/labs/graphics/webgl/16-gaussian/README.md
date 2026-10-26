# 16 · Gaussian position·size·rotation·opacity

Week 3 / original Day 16 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Connect Gaussian spatial parameters to diagrams and API names.

## Prerequisites

Transforms from 04 and the GS overview from 15.

## Key concepts and explanations

Think of a Gaussian as an extent whose contribution decreases with distance from its center. Unlike a point with only a center, it extends in different directions; an anisotropic shape has different extents along its axes.

Covariance represents directional extent and relationships between directions. It can also be described using scale and rotation. Opacity is the degree of contribution to compositing and is not the same as size. Distinguish the paper's formulas from the parameter representation of the library you use.

## Skills you will develop

- Connect Gaussian spatial parameters to diagrams and API names.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Draw a sphere and an elongated ellipsoid with the same center.
2. Predict separately the results of moving center, increasing scale along one axis, rotation, and decreasing opacity.
3. Make a table mapping the original paper's terms to Spark center/scales/quaternion/opacity.

## Variables to observe

position, scales, rotation, opacity. Start with hypothetical comparisons that keep other values fixed.

## Completion criteria

- [ ] Explained the roles of the four parameters.
- [ ] Drew the difference between isotropic/anisotropic shapes.
- [ ] Recorded remaining questions about the formulas.

## Self-check questions

1. Can shapes look different even with the same center?
2. Can opacity and scale substitute for each other?

## Official references

- [Original 3DGS paper](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)
- [Spark SplatMesh](https://sparkjs.dev/docs/splat-mesh/)

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

[Previous: Comparing NeRF and 3DGS](../15-nerf-gs/README.md) · [Next: Spherical Harmonics and view-dependent color](../17-sh/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/16-gaussian/example.js) · Workspace unit ID: `16-gaussian`

An educational CPU visualization of Gaussian projection and compositing. SH uses synthetic coefficients of order 1; this does not measure the quality of a trained GS model.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
