# WebAssembly · 27 Environment and Adoption Criteria

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Correctness and Bottleneck Evaluation · External example · preview instructions · Storage ID: `webassembly-step-27`

## Goals and learning outcomes

- Learning outcome: explain the role of Reproducibility. Input cases: small·medium·large arrays.
- Deliverable: correctness·total cost·maintenance judgments for each condition. Explain the rationale for handling Adoption criteria, linking it to the code.

## Prerequisites

Prepare the experiment results for Correctness first and Error tolerance from Unit 26, “Boundary-value Correctness”.

## Key concepts and explanations

### Reproducibility

Runtime·device·input size change the results. Attach environment information to measured values.

### Adoption criteria

Consider build·deployment·recovery costs as well as speed. Small inputs may show no benefit.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-27.mjs in a separate practice project, collect raw result JSON and environment information into a table of reasons for the choice. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: small·medium·large arrays. Baseline: small. Run under the baseline conditions, then record observations and errors in notes/day-27.md.
3. Variable: input size; changed value: large. Run again through the same input path. Deliverable to save: correctness·total cost·maintenance judgments for each condition. Hypothesis to check: Conditions with and without benefits are distinguished. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable   | Baseline | Change | Expected change / hypothesis                            |
| ---------- | -------- | ------ | ------------------------------------------------------- |
| input size | small    | large  | Conditions with and without benefits are distinguished. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: correctness·total cost·maintenance judgments for each condition. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Reproducibility and Adoption criteria. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Reproducibility affect in this exercise? Input cases: small·medium·large arrays.
2. Variable: input size. Hypothesis to check: Conditions with and without benefits are distinguished. Did the actual results agree with the hypothesis? Explain the evidence in terms of Adoption criteria.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-27/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-27/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Boundary-value Correctness](../26/README.md) · [Next: Evaluating Actual Bottlenecks](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
