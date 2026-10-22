# WebAssembly · 08 Pages and Byte Offset

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Memory and Array Boundaries · External example · preview instructions · Storage ID: `webassembly-step-08`

## Goals and learning outcomes

- Learning outcome: explain the role of Pages. Input cases: four distinct integers.
- Deliverable: a table of index·offset·value read. Explain the rationale for handling Pointers, linking it to the code.

## Prerequisites

Prepare the experiment results for Trap and Preflight checks from Unit 7, “Traps and Input Validation”.

## Key concepts and explanations

### Pages

A Wasm memory page is 65536 bytes. Element counts and byte counts use different units.

### Pointers

Pointer arguments are interpreted as byte offsets. Passing an Int32 element index directly reads a different location.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-8.mjs in a separate practice project, print the memory.buffer size and at(index*4). Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: four distinct integers. Baseline: index. Run under the baseline conditions, then record observations and errors in notes/day-8.md.
3. Variable: pointer unit; changed value: index×4. Run again through the same input path. Deliverable to save: a table of index·offset·value read. Hypothesis to check: Values are read from the intended integer addresses. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| pointer unit | index | index×4 | Values are read from the intended integer addresses. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of index·offset·value read. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Pages and Pointers. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Pages affect in this exercise? Input cases: four distinct integers.
2. Variable: pointer unit. Hypothesis to check: Values are read from the intended integer addresses. Did the actual results agree with the hypothesis? Explain the evidence in terms of Pointers.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-08/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-08/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Traps and Input Validation](../07/README.md) · [Next: Views and Endianness](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
