# WebAssembly · 06 I32 and JS Number

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Modules and Numeric Contracts · External example · preview instructions · Storage ID: `webassembly-step-06`

## Goals and learning outcomes

- Learning outcome: explain the role of Numeric representation. Input cases: small numbers and values near INT32_MAX.
- Deliverable: expected·actual sums for each numeric range. Explain the rationale for handling Overflow, linking it to the code.

## Prerequisites

Prepare the experiment results for Import and Boundary cost from Unit 5, “Imports and Host Functions”.

## Key concepts and explanations

### Numeric representation

i32 performs 32-bit integer arithmetic. Its range differs from arithmetic on large integers with JS Number.

### Overflow

i32 addition wraps at the defined bit width. The JS reference must use the same contract for a valid comparison.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-6.mjs in a separate practice project, pass large integers to sum and apply explicit 32-bit conversion in the JS reference. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: small numbers and values near INT32_MAX. Baseline: small positive integers. Run under the baseline conditions, then record observations and errors in notes/day-6.md.
3. Variable: input range; changed value: overflow boundary. Run again through the same input path. Deliverable to save: expected·actual sums for each numeric range. Hypothesis to check: The difference between a regular JS sum and an i32 sum is exposed. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| input range | small positive integers | overflow boundary | The difference between a regular JS sum and an i32 sum is exposed. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: expected·actual sums for each numeric range. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Numeric representation and Overflow. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Numeric representation affect in this exercise? Input cases: small numbers and values near INT32_MAX.
2. Variable: input range. Hypothesis to check: The difference between a regular JS sum and an i32 sum is exposed. Did the actual results agree with the hypothesis? Explain the evidence in terms of Overflow.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-06/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-06/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Imports and Host Functions](../05/README.md) · [Next: Traps and Input Validation](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
