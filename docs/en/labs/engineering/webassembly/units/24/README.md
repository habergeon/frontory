# WebAssembly · 24 Warm Repeats and Warm-up

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Correctness and Bottleneck Evaluation · External example · preview instructions · Storage ID: `webassembly-step-24`

## Goals and learning outcomes

- Learning outcome: explain the role of Warm-up. Input cases: 5 and 20 repetitions.
- Deliverable: raw durations·medians·whether errors occurred. Explain the rationale for handling Equivalent conditions, linking it to the code.

## Prerequisites

Prepare the experiment results for Cold costs and Measurement boundaries from Unit 23, “Breaking Down Cold Execution”.

## Key concepts and explanations

### Warm-up

Engine state may change over repeated runs. Do not mix first-run and subsequent values.

### Equivalent conditions

Use identical inputs and warm-up for JS and Wasm. Record result validation separately from the measurement interval.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-24.mjs in a separate practice project, warm up both paths for the same number of iterations and restore the input before each measurement. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 5 and 20 repetitions. Baseline: 5 repetitions. Run under the baseline conditions, then record observations and errors in notes/day-24.md.
3. Variable: repeat count; changed value: 20 repetitions. Run again through the same input path. Deliverable to save: raw durations·medians·whether errors occurred. Hypothesis to check: More samples reveal variation, but do not predetermine the result. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable     | Baseline      | Change         | Expected change / hypothesis                                       |
| ------------ | ------------- | -------------- | ------------------------------------------------------------------ |
| repeat count | 5 repetitions | 20 repetitions | More samples reveal variation, but do not predetermine the result. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: raw durations·medians·whether errors occurred. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Warm-up and Equivalent conditions. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Warm-up affect in this exercise? Input cases: 5 and 20 repetitions.
2. Variable: repeat count. Hypothesis to check: More samples reveal variation, but do not predetermine the result. Did the actual results agree with the hypothesis? Explain the evidence in terms of Equivalent conditions.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-24/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-24/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Breaking Down Cold Execution](../23/README.md) · [Next: Total Cost Including Copies](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
