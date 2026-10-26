# WebAssembly · 25 Total Cost Including Copies

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Correctness and Bottleneck Evaluation · External example · preview instructions · Storage ID: `webassembly-step-25`

## Goals and learning outcomes

- Learning outcome: explain the role of Kernel time. Input cases: three data sizes.
- Deliverable: a table of JS·kernel·copy-inclusive times. Explain the rationale for handling Total cost, linking it to the code.

## Prerequisites

Prepare the experiment results for Warm-up and Equivalent conditions from Unit 24, “Warm Repeats and Warm-up”.

## Key concepts and explanations

### Kernel time

Input/output copies can dominate the whole path even with a fast function. Comparing kernels alone misses user-facing costs.

### Total cost

Include input set and output slice in measurements. Include result-array creation costs in the JS path as well.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-25.mjs in a separate practice project, read the existing wasmKernelMeanMs and wasmWarmWithCopiesMeanMs separately. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: three data sizes. Baseline: kernel only. Run under the baseline conditions, then record observations and errors in notes/day-25.md.
3. Variable: scope; changed value: including copies. Run again through the same input path. Deliverable to save: a table of JS·kernel·copy-inclusive times. Hypothesis to check: Wasm's comparative advantage may change. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline    | Change           | Expected change / hypothesis             |
| -------- | ----------- | ---------------- | ---------------------------------------- |
| scope    | kernel only | including copies | Wasm's comparative advantage may change. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a table of JS·kernel·copy-inclusive times. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Kernel time and Total cost. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Kernel time affect in this exercise? Input cases: three data sizes.
2. Variable: scope. Hypothesis to check: Wasm's comparative advantage may change. Did the actual results agree with the hypothesis? Explain the evidence in terms of Total cost.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-25/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-25/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Warm Repeats and Warm-up](../24/README.md) · [Next: Boundary-value Correctness](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
