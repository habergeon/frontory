# 21 · GS viewer review and candidate comparison

Week 3 / original Day 21 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Summarize the scope of a small GS viewer and the reasons for choosing a library.

## Prerequisites

15~20.

## Key concepts and explanations

The original candidates GaussianSplats3D and huggingface/gsplat.js remain reference candidates. The current document prioritizes evaluating Spark because it is useful for learning how a Three.js scene and WebGL2 connect with SplatMesh transforms and lifetimes. This is neither a measured conclusion that it is fastest nor a final adoption decision.

Compare candidates in one table covering supported formats, compatible Three.js versions, SH support, loading/cleanup APIs, selection features, license, and maintenance status. Installing all three libraries or benchmarking large datasets is outside this scope.

## Skills you will develop

- Summarize the scope of a small GS viewer and the reasons for choosing a library.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Read the official README of each of the three candidates and create a comparison table.
2. Define minimum viewer acceptance criteria for loading, controls, errors, and cleanup with one small dataset.
3. Summarize what you understand and the remaining questions about GS principles and implementation, and keep the data out of Git.


## Variables to observe

Candidate library features and versions. Performance remains unverified until measured under identical conditions.

## Completion criteria

- [ ] Distinguished the candidate comparison from the reason for evaluating Spark.
- [ ] Specified the minimum viewer scope.
- [ ] Recorded week 3 concepts and unresolved questions.

## Self-check questions

1. Can the fastest library be determined from a feature list alone?
2. What contract should you check first when replacing a library?

## Official references

- [GaussianSplats3D](https://github.com/mkkellogg/GaussianSplats3D)
- [huggingface/gsplat.js](https://github.com/huggingface/gsplat.js)
- [Spark](https://sparkjs.dev/docs/)

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

[Previous: Three.js+GS camera and interaction](../20-gs-interaction/README.md) · [Next: React+Three.js component design](../22-react-viewer/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/21-gs-review/example.js) · Workspace unit ID: `21-gs-review`

An educational CPU Canvas viewer that reads small .splat and ASCII GS PLY files. The limits are 1 MiB·512 splats; binary PLY and general mesh PLY are not supported. Spark, GPU tile rendering, higher-order SH, and GS picking are outside the implementation scope. The default scene uses data created here, and measurements apply only to this CPU example.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
