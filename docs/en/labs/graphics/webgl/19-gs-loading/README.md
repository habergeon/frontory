# 19 · .ply·.splat loading

Week 3 / original Day 19 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Check input data specifications and implement successful and failed loading.

## Prerequisites

15~18, Promise and error handling.

## Key concepts and explanations

A general PLY point cloud is not always GS data. Even files with the same .ply extension can have different fields and color representations, so compare them with the parameters the renderer expects. File size and GPU memory cost after parsing are not the same.

First record the source, license, format, version, and size, then choose one small dataset. The current project does not include GS data, and Spark is not being installed yet. Actual GS loading is planned as a separate local source exercise; do not arbitrarily relax the network-blocking settings of the current editor iframe.

## Skills you will develop

- Check input data specifications and implement successful and failed loading.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Check supported formats and the Three.js peer dependency in the official documentation.
2. Record the small file's URL, license, byte size, and format, and check whether it is excluded from Git.
3. In a follow-up local exercise, load a valid file, a missing path, and an incompatible PLY, and distinguish their states and errors.

## Variables to observe

Path, format, fields, size, scale. Start with just one dataset.

## Completion criteria

- [ ] Recorded input specifications and redistribution conditions.
- [ ] Checked the difference between general PLY and GS PLY.
- [ ] Wrote or implemented expected results for success/failure.

## Self-check questions

1. Does HTTP 200 mean rendering succeeded too?
2. Can compatibility be judged by the extension alone?

## Official references

- [Getting started with Spark](https://sparkjs.dev/docs/)
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

[Previous: Projection·Sorting·Alpha Blending](../18-gs-projection/README.md) · [Next: Three.js+GS camera and interaction](../20-gs-interaction/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/19-gs-loading/example.js) · Workspace unit ID: `19-gs-loading`

An educational CPU Canvas viewer that reads small .splat and ASCII GS PLY files. The limits are 1 MiB·512 splats; binary PLY and general mesh PLY are not supported. Spark, GPU tile rendering, higher-order SH, and GS picking are outside the implementation scope. The default scene uses data created here, and measurements apply only to this CPU example.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
