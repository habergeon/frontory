# WebAssembly · 15 In-place Transformation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Deployment and Execution Structure · External example · preview instructions · Storage ID: `webassembly-step-15`

## Goals and learning outcomes

- Learning outcome: explain the role of Overwriting. Input cases: arrays containing negative numbers·0·positive numbers.
- Deliverable: expected·actual values for every element. Explain the rationale for handling Repeat conditions, linking it to the code.

## Prerequisites

Prepare the experiment results for Memory layout and View lifetime from Unit 14, “Arrays and Boundary Costs”.

## Key concepts and explanations

### Overwriting

transform modifies input memory directly. A comparison that needs the original requires a copy.

### Repeat conditions

Feeding transformed results back in makes values keep growing. Restore the original on every iteration for a fair comparison.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-15.mjs in a separate practice project, set source before the existing transform(0,n) and compare with the JS result for 2x+1. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: arrays containing negative numbers·0·positive numbers. Baseline: none. Run under the baseline conditions, then record observations and errors in notes/day-15.md.
3. Variable: input restoration; changed value: restore every iteration. Run again through the same input path. Deliverable to save: expected·actual values for every element. Hypothesis to check: Each iteration compares the same computation. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| input restoration | none | restore every iteration | Each iteration compares the same computation. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: expected·actual values for every element. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Overwriting and Repeat conditions. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Overwriting affect in this exercise? Input cases: arrays containing negative numbers·0·positive numbers.
2. Variable: input restoration. Hypothesis to check: Each iteration compares the same computation. Did the actual results agree with the hypothesis? Explain the evidence in terms of Repeat conditions.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-15/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-15/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Arrays and Boundary Costs](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
