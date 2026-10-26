# WebAssembly · 10 Array Copies and Bounds

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Memory and Array Boundaries · External example · preview instructions · Storage ID: `webassembly-step-10`

## Goals and learning outcomes

- Learning outcome: explain the role of Set. Input cases: arrays of length 0·4·1003.
- Deliverable: a table of input·memory·result ranges. Explain the rationale for handling Bounds, linking it to the code.

## Prerequisites

Prepare the experiment results for Shared storage and Byte order from Unit 9, “Views and Endianness”.

## Key concepts and explanations

### Set

TypedArray.set copies values into the target memory. The original array may have separate storage.

### Bounds

offset+length×4 must fit within memory. Check capacity before increasing the length.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-10.mjs in a separate practice project, copy source into Int32Array(memory.buffer,offset,n) and calculate the sum. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: arrays of length 0·4·1003. Baseline: 4 elements. Run under the baseline conditions, then record observations and errors in notes/day-10.md.
3. Variable: length; changed value: 1003 elements. Run again through the same input path. Deliverable to save: a table of input·memory·result ranges. Hypothesis to check: All inputs fit within the specified range, and the sums match. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline   | Change        | Expected change / hypothesis                                   |
| -------- | ---------- | ------------- | -------------------------------------------------------------- |
| length   | 4 elements | 1003 elements | All inputs fit within the specified range, and the sums match. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of input·memory·result ranges. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Set and Bounds. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Set affect in this exercise? Input cases: arrays of length 0·4·1003.
2. Variable: length. Hypothesis to check: All inputs fit within the specified range, and the sums match. Did the actual results agree with the hypothesis? Explain the evidence in terms of Bounds.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-10/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-10/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Views and Endianness](../09/README.md) · [Next: Memory Grow and View Lifetime](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
