# WebAssembly · 18 String Byte Contracts

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Deployment and Execution Structure · External example · preview instructions · Storage ID: `webassembly-step-18`

## Goals and learning outcomes

- Learning outcome: explain the role of Encoding. Input cases: English·Korean·emoji.
- Deliverable: character counts·byte counts·round-trip strings. Explain the rationale for handling Passing length, linking it to the code.

## Prerequisites

Prepare the experiment results for Separate regions and Ownership rules from Unit 17, “Laying Out Multiple Arrays”.

## Key concepts and explanations

### Encoding

JS string length differs from UTF-8 byte length. Korean characters and emoji use multiple bytes.

### Passing length

A string address alone does not identify its end. Specify byteLength or a termination convention.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-18.mjs in a separate practice project, write strings to memory with TextEncoder and restore the specified range with TextDecoder. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: English·Korean·emoji. Baseline: character count. Run under the baseline conditions, then record observations and errors in notes/day-18.md.
3. Variable: length basis; changed value: byteLength. Run again through the same input path. Deliverable to save: character counts·byte counts·round-trip strings. Hypothesis to check: Using byteLength restores the string without truncation. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| length basis | character count | byteLength | Using byteLength restores the string without truncation. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: character counts·byte counts·round-trip strings. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Encoding and Passing length. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Encoding affect in this exercise? Input cases: English·Korean·emoji.
2. Variable: length basis. Hypothesis to check: Using byteLength restores the string without truncation. Did the actual results agree with the hypothesis? Explain the evidence in terms of Passing length.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-18/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-18/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Laying Out Multiple Arrays](../17/README.md) · [Next: Browser Loading and MIME](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
