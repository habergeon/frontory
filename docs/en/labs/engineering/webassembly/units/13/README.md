# WebAssembly · 13 Scalar and Batch Calls

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Memory and Array Boundaries · External example · preview instructions · Storage ID: `webassembly-step-13`

## Goals and learning outcomes

- Learning outcome: explain the role of Call count. Input cases: 100 and 100003 integers.
- Deliverable: call counts·sums·measured times. Explain the rationale for handling Fair comparison, linking it to the code.

## Prerequisites

Prepare the experiment results for Maximum and Capacity calculation from Unit 12, “Capacity Limits and Failure”.

## Key concepts and explanations

### Call count

Calling an export for every element repeatedly crosses the boundary. A batch calls once and loops internally.

### Fair comparison

Use identical data and the same sum contract. Record copy time separately as well.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-13.mjs in a separate practice project, run the existing at loop and sum(0,n) on the same array. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 100 and 100003 integers. Baseline: at for each element. Run under the baseline conditions, then record observations and errors in notes/day-13.md.
3. Variable: call method; changed value: one sum call. Run again through the same input path. Deliverable to save: call counts·sums·measured times. Hypothesis to check: The result is the same, and the number of boundary calls decreases. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable    | Baseline            | Change       | Expected change / hypothesis                                        |
| ----------- | ------------------- | ------------ | ------------------------------------------------------------------- |
| call method | at for each element | one sum call | The result is the same, and the number of boundary calls decreases. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: call counts·sums·measured times. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Call count and Fair comparison. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Call count affect in this exercise? Input cases: 100 and 100003 integers.
2. Variable: call method. Hypothesis to check: The result is the same, and the number of boundary calls decreases. Did the actual results agree with the hypothesis? Explain the evidence in terms of Fair comparison.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-13/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-13/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Capacity Limits and Failure](../12/README.md) · [Next: Arrays and Boundary Costs](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
