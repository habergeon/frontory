# 17 · Spherical Harmonics and view-dependent color

Week 3 / original Day 17 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Explain the difference between fixed RGB and direction-dependent color representations.

## Prerequisites

15~16, direction vectors and color.

## Key concepts and explanations

SH represents a function that varies with direction on a sphere using coefficients of basis functions. GS data can use SH components for color changes with viewing direction. Unlike fixed RGB, colors may change when the camera direction changes.

Higher coefficient degrees can represent more complex directional variation, but also change data and computation costs. Not all files and renderers support the same degrees or storage formats. This unit aims to explain the relationship between data and the image rather than implement an SH training algorithm.

## Skills you will develop

- Explain the difference between fixed RGB and direction-dependent color representations.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Draw two viewing directions toward the same surface and describe the difference between fixed and direction-dependent color.
2. Check the official documentation for how your chosen data and renderer support SH.
3. Define a path for observing with only camera rotation after loading, and distinguish possible color changes from lighting changes.

## Variables to observe

view direction, SH degree/support. Keep lights and data fixed.

## Completion criteria

- [ ] Explained the meaning of directional functions and coefficients.
- [ ] Recorded whether the data supports SH.
- [ ] Defined observation conditions that change only the camera.

## Self-check questions

1. If colors change as the camera rotates, is lighting always the cause?
2. Can a file containing only RGB be treated the same as one containing SH coefficients?

## Official references

- [Original 3DGS paper](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)
- [Spark SplatMesh color](https://sparkjs.dev/docs/splat-mesh/)

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

[Previous: Gaussian position·size·rotation·opacity](../16-gaussian/README.md) · [Next: Projection·Sorting·Alpha Blending](../18-gs-projection/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/17-sh/example.js) · Workspace unit ID: `17-sh`

An educational CPU visualization of Gaussian projection and compositing. SH uses synthetic coefficients of order 1; this does not measure the quality of a trained GS model.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
