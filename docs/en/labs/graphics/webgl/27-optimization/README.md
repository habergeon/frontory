# 27 · Resolution·data optimization

Week 4 / original Day 27 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Test a bottleneck hypothesis by comparing before and after changing just one variable.

## Prerequisites

The 26 baseline, vertex count from 12, and footprint from 18.

## Key concepts and explanations

If lowering resolution improves performance, pixel processing cost is a possible cause, but that alone does not prove every GPU bottleneck. CPU costs such as parsing and sorting require different experiments.

Change only one of DPR, vertex subdivision count, visible splat count, or shader cost. Speed can come at the expense of image quality, accuracy, memory, or implementation complexity. Do not conclude there is an improvement if the difference is within repeated-measurement error.

## Skills you will develop

- Test a bottleneck hypothesis by comparing before and after changing just one variable.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Choose one slow interval from the baseline and write a hypothesis.
2. For example, change only the DPR cap from 2 → 1, and measure again with the same path and duration.
3. Record before/after values, image-quality changes, evidence supporting/insufficient for/refuting the hypothesis, and the next experiment.

## Variables to observe

One chosen variable. Keep the device, data, camera, and measurement method fixed.

## Completion criteria

- [ ] The hypothesis connects to the measurement metric.
- [ ] Recorded the image-quality tradeoff too.
- [ ] Recorded failed hypotheses as well.

## Self-check questions

1. What do you lose by changing several values at once?
2. How should you interpret a difference smaller than the variation?

## Official references

- [WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)
- [Spark documentation](https://sparkjs.dev/docs/)

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

[Previous: FPS·Draw Calls·memory analysis](../26-performance/README.md) · [Next: Documentation and optional deployment planning](../28-review/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/27-optimization/example.js) · Workspace unit ID: `27-optimization`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
