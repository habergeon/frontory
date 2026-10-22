# WebAssembly · 09 Views and Endianness

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Memory and Array Boundaries · External example · preview instructions · Storage ID: `webassembly-step-09`

## Goals and learning outcomes

- Learning outcome: explain the role of Shared storage. Input cases: one 32-bit integer.
- Deliverable: four bytes and the reconstructed number. Explain the rationale for handling Byte order, linking it to the code.

## Prerequisites

Prepare the experiment results for Pages and Pointers from Unit 8, “Pages and Byte Offset”.

## Key concepts and explanations

### Shared storage

Different TypedArrays interpret the same bytes differently. Creating a view does not copy the data.

### Byte order

Numeric values in Wasm memory use little-endian layout. Explicitly setting the order in DataView makes interpretation clear.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-9.mjs in a separate practice project, write 0x12345678 with DataView in little-endian order and read it with Uint8Array. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: one 32-bit integer. Baseline: little-endian. Run under the baseline conditions, then record observations and errors in notes/day-9.md.
3. Variable: interpretation order; changed value: big-endian. Run again through the same input path. Deliverable to save: four bytes and the reconstructed number. Hypothesis to check: The number read from the same bytes changes. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| interpretation order | little-endian | big-endian | The number read from the same bytes changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: four bytes and the reconstructed number. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Shared storage and Byte order. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Shared storage affect in this exercise? Input cases: one 32-bit integer.
2. Variable: interpretation order. Hypothesis to check: The number read from the same bytes changes. Did the actual results agree with the hypothesis? Explain the evidence in terms of Byte order.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-09/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-09/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Pages and Byte Offset](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
