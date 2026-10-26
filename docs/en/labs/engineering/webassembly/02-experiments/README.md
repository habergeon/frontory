# WebAssembly · 14 Arrays and Boundary Costs

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Memory and Array Boundaries · External example · preview instructions · Storage ID: `webassembly-02`

## Goals and learning outcomes

- Learning outcome: explain the role of Memory layout. Input cases: the existing 100003 inputs and a small array.
- Deliverable: matching sums·copyMs·batchMs·scalarMs·view lengths. Explain the rationale for handling View lifetime, linking it to the code.

## Prerequisites

Prepare the experiment results for Call count and Fair comparison from Unit 13, “Scalar and Batch Calls”.

## Key concepts and explanations

### Memory layout

Passing an array requires a byte offset and length. Copy cost is separate from kernel computation.

### View lifetime

Recreate views after grow. Continuing to use stale references prevents correct validation.

## Practice setup

The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-14.mjs in a separate practice project, run node src/labs/webassembly-02/benchmark.mjs in a separate Node environment and inspect the copy·batch·scalar·grow results. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: the existing 100003 inputs and a small array. Baseline: 100 elements. Run under the baseline conditions, then record observations and errors in notes/day-14.md.
3. Variable: batch size; changed value: 100003 elements. Run again through the same input path. Deliverable to save: matching sums·copyMs·batchMs·scalarMs·view lengths. Hypothesis to check: The proportions of call and copy costs change, and the results match. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable   | Baseline     | Change          | Expected change / hypothesis                                          |
| ---------- | ------------ | --------------- | --------------------------------------------------------------------- |
| batch size | 100 elements | 100003 elements | The proportions of call and copy costs change, and the results match. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: matching sums·copyMs·batchMs·scalarMs·view lengths. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Memory layout and View lifetime. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Memory layout affect in this exercise? Input cases: the existing 100003 inputs and a small array.
2. Variable: batch size. Hypothesis to check: The proportions of call and copy costs change, and the results match. Did the actual results agree with the hypothesis? Explain the evidence in terms of View lifetime.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../src/labs/webassembly-02/example.js) · [Runtime environments and limits](../../../../examples.md)

The preview experiments with WebAssembly.Memory and JS boundary costs. To preserve the CSP, compile WASM modules outside the iframe. Use kernel.wat, kernel.wasm, and benchmark.mjs in the same folder to compare actual WASM calculations with JS results.

- [benchmark.mjs](../../../../../../src/labs/webassembly-02/benchmark.mjs)
- [kernel.wasm](../../../../../../src/labs/webassembly-02/kernel.wasm)
- [kernel.wat](../../../../../../src/labs/webassembly-02/kernel.wat)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Scalar and Batch Calls](../units/13/README.md) · [Next: In-place Transformation](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
