# WebAssembly · 01 Modules and Linear Memory

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Modules and Numeric Contracts · Editable example · Storage ID: `webassembly-01`

## Goals and learning outcomes

- Learning outcome: explain the role of Module boundary. Input cases: [1,2,3] and an invalid file path.
- Deliverable: JS·Wasm sum 6 and a record of loading errors. Explain the rationale for handling Preview scope, linking it to the code.

## Prerequisites

Understand JavaScript·TypedArray and the basics of the chosen compiled language, and be able to read the inputs and outputs of the existing starting examples.

## Key concepts and explanations

### Module boundary

Wasm calls exports of a compiled module. JS generally handles DOM manipulation.

### Preview scope

The existing first example observes WebAssembly.Memory. It does not compile a module or accelerate computation.

## Practice setup

The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-1.mjs in a separate practice project, read the existing Memory example, then instantiate webassembly-02's kernel.wasm in a separate Node environment and call sum. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: [1,2,3] and an invalid file path. Baseline: valid wasm. Run under the baseline conditions, then record observations and errors in notes/day-1.md.
3. Variable: file path; changed value: missing file. Run again through the same input path. Deliverable to save: JS·Wasm sum 6 and a record of loading errors. Hypothesis to check: Normal results and loading failures are distinguished. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable  | Baseline   | Change       | Expected change / hypothesis                           |
| --------- | ---------- | ------------ | ------------------------------------------------------ |
| file path | valid wasm | missing file | Normal results and loading failures are distinguished. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: JS·Wasm sum 6 and a record of loading errors. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Module boundary and Preview scope. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Module boundary affect in this exercise? Input cases: [1,2,3] and an invalid file path.
2. Variable: file path. Hypothesis to check: Normal results and loading failures are distinguished. Did the actual results agree with the hypothesis? Explain the evidence in terms of Preview scope.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../src/labs/webassembly-01/example.js) · [Runtime environments and limits](../../../../examples.md)

The preview experiments with WebAssembly.Memory and JS boundary costs. To preserve the CSP, compile WASM modules outside the iframe.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: WAT and Binary](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
