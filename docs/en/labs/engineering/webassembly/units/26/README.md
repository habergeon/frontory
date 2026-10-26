# WebAssembly · 26 Boundary-value Correctness

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Correctness and Bottleneck Evaluation · External example · preview instructions · Storage ID: `webassembly-step-26`

## Goals and learning outcomes

- Learning outcome: explain the role of Correctness first. Input cases: arrays of length 0·1·1003.
- Deliverable: PASS or failure differences for each case. Explain the rationale for handling Error tolerance, linking it to the code.

## Prerequisites

Prepare the experiment results for Kernel time and Total cost from Unit 25, “Total Cost Including Copies”.

## Key concepts and explanations

### Correctness first

Output contracts must match before comparing performance. Decide whether empty arrays and negative values are within the supported range.

### Error tolerance

Match bit widths for integers and define tolerance for floating-point values. Do not hide bugs with arbitrary tolerances.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-26.mjs in a separate practice project, use node:assert to compare empty·single-element·boundary-length·negative inputs against the JS reference. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: arrays of length 0·1·1003. Baseline: small integers. Run under the baseline conditions, then record observations and errors in notes/day-26.md.
3. Variable: data; changed value: boundary integers. Run again through the same input path. Deliverable to save: PASS or failure differences for each case. Hypothesis to check: Cases where numeric contracts disagree are exposed. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline       | Change            | Expected change / hypothesis                        |
| -------- | -------------- | ----------------- | --------------------------------------------------- |
| data     | small integers | boundary integers | Cases where numeric contracts disagree are exposed. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: PASS or failure differences for each case. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Correctness first and Error tolerance. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Correctness first affect in this exercise? Input cases: arrays of length 0·1·1003.
2. Variable: data. Hypothesis to check: Cases where numeric contracts disagree are exposed. Did the actual results agree with the hypothesis? Explain the evidence in terms of Error tolerance.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-26/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-26/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Total Cost Including Copies](../25/README.md) · [Next: Environment and Adoption Criteria](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
