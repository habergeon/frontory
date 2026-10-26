# WebAssembly · 12 Capacity Limits and Failure

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Memory and Array Boundaries · External example · preview instructions · Storage ID: `webassembly-step-12`

## Goals and learning outcomes

- Learning outcome: explain the role of Maximum. Input cases: lengths on either side of a page boundary.
- Deliverable: a table of required·allocated pages and errors. Explain the rationale for handling Capacity calculation, linking it to the code.

## Prerequisites

Prepare the experiment results for Grow and Recreation from Unit 11, “Memory Grow and View Lifetime”.

## Key concepts and explanations

### Maximum

Memory can limit growth with maximum. Handle failures when a request exceeds the limit.

### Capacity calculation

Round required bytes up to pages. Allocating one page too few leaves the final element out of bounds.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-12.mjs in a separate practice project, add required-page calculation and grow exception handling to the wrapper. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: lengths on either side of a page boundary. Baseline: within the limit. Run under the baseline conditions, then record observations and errors in notes/day-12.md.
3. Variable: requested capacity; changed value: over the limit. Run again through the same input path. Deliverable to save: a table of required·allocated pages and errors. Hypothesis to check: An excessive request ends with an error, and the previous data is preserved. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable           | Baseline         | Change         | Expected change / hypothesis                                                 |
| ------------------ | ---------------- | -------------- | ---------------------------------------------------------------------------- |
| requested capacity | within the limit | over the limit | An excessive request ends with an error, and the previous data is preserved. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of required·allocated pages and errors. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Maximum and Capacity calculation. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Maximum affect in this exercise? Input cases: lengths on either side of a page boundary.
2. Variable: requested capacity. Hypothesis to check: An excessive request ends with an error, and the previous data is preserved. Did the actual results agree with the hypothesis? Explain the evidence in terms of Capacity calculation.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-12/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-12/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Memory Grow and View Lifetime](../11/README.md) · [Next: Scalar and Batch Calls](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
