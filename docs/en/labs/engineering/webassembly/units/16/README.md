# WebAssembly · 16 Aligned and Unaligned Access

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Deployment and Execution Structure · External example · preview instructions · Storage ID: `webassembly-step-16`

## Goals and learning outcomes

- Learning outcome: explain the role of Alignment. Input cases: the same four bytes.
- Deliverable: creation errors and values read. Explain the rationale for handling DataView, linking it to the code.

## Prerequisites

Prepare the experiment results for Overwriting and Repeat conditions from Unit 15, “In-place Transformation”.

## Key concepts and explanations

### Alignment

The byteOffset of Int32Array must be a multiple of its element size. Distinguish Wasm load constraints from JS view constraints.

### DataView

DataView provides byte-based access. It can explicitly read unaligned data.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-16.mjs in a separate practice project, place data at offset 0 and 1 and compare TypedArray creation with DataView access. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: the same four bytes. Baseline: 0. Run under the baseline conditions, then record observations and errors in notes/day-16.md.
3. Variable: offset; changed value: 1. Run again through the same input path. Deliverable to save: creation errors and values read. Hypothesis to check: The difference between TypedArray constraints and byte access is exposed. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                              |
| -------- | -------- | ------ | ------------------------------------------------------------------------- |
| offset   | 0        | 1      | The difference between TypedArray constraints and byte access is exposed. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: creation errors and values read. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Alignment and DataView. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Alignment affect in this exercise? Input cases: the same four bytes.
2. Variable: offset. Hypothesis to check: The difference between TypedArray constraints and byte access is exposed. Did the actual results agree with the hypothesis? Explain the evidence in terms of DataView.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-16/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-16/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: In-place Transformation](../15/README.md) · [Next: Laying Out Multiple Arrays](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
