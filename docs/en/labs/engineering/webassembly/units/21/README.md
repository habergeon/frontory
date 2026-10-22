# WebAssembly · 21 Workers and Wasm

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Deployment and Execution Structure · External example · preview instructions · Storage ID: `webassembly-step-21`

## Goals and learning outcomes

- Learning outcome: explain the role of Execution location. Input cases: the same large array and UI clicks.
- Deliverable: main-thread·Worker results and round-trip latency. Explain the rationale for handling Transfer cost, linking it to the code.

## Prerequisites

Prepare the experiment results for Initialization cost and Concurrent requests from Unit 20, “Reusing Initialization”.

## Key concepts and explanations

### Execution location

A Wasm call occupies the thread on which it runs. Using Wasm does not automatically free the main thread for input.

### Transfer cost

Sending arrays to a Worker requires copying or transfer. Account separately for copies into Wasm memory.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-21.mjs in a separate practice project, instantiate a module in an external Worker and return the result of processing the input array. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: the same large array and UI clicks. Baseline: main thread. Run under the baseline conditions, then record observations and errors in notes/day-21.md.
3. Variable: location; changed value: Worker. Run again through the same input path. Deliverable to save: main-thread·Worker results and round-trip latency. Hypothesis to check: Changes in UI responsiveness and total latency may differ. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| location | main thread | Worker | Changes in UI responsiveness and total latency may differ. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: main-thread·Worker results and round-trip latency. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Execution location and Transfer cost. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Execution location affect in this exercise? Input cases: the same large array and UI clicks.
2. Variable: location. Hypothesis to check: Changes in UI responsiveness and total latency may differ. Did the actual results agree with the hypothesis? Explain the evidence in terms of Transfer cost.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-21/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-21/experiment.mjs)
- [worker.mjs](../../../../../../../src/labs/webassembly-step-21/worker.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Reusing Initialization](../20/README.md) · [Next: Module Caching and Versions](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
