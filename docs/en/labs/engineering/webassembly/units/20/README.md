# WebAssembly · 20 Reusing Initialization

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Deployment and Execution Structure · External example · preview instructions · Storage ID: `webassembly-step-20`

## Goals and learning outcomes

- Learning outcome: explain the role of Initialization cost. Input cases: 5 consecutive requests.
- Deliverable: initialization counts and per-request results. Explain the rationale for handling Concurrent requests, linking it to the code.

## Prerequisites

Prepare the experiment results for Streaming and Failure classification from Unit 19, “Browser Loading and MIME”.

## Key concepts and explanations

### Initialization cost

Compiling for every request incurs repeated costs. You can reuse a module or initialization Promise.

### Concurrent requests

Concurrent writes to the same instance's memory mix results. Serialize requests or use separate instances.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-20.mjs in a separate practice project, create a single initialization Promise and a request queue, and count compile calls. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: 5 consecutive requests. Baseline: initialize for every request. Run under the baseline conditions, then record observations and errors in notes/day-20.md.
3. Variable: reuse; changed value: share a Promise. Run again through the same input path. Deliverable to save: initialization counts and per-request results. Hypothesis to check: Initialization happens once, and each request's result is correct. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| reuse | initialize for every request | share a Promise | Initialization happens once, and each request's result is correct. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: initialization counts and per-request results. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Initialization cost and Concurrent requests. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Initialization cost affect in this exercise? Input cases: 5 consecutive requests.
2. Variable: reuse. Hypothesis to check: Initialization happens once, and each request's result is correct. Did the actual results agree with the hypothesis? Explain the evidence in terms of Concurrent requests.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-20/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-20/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Browser Loading and MIME](../19/README.md) · [Next: Workers and Wasm](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
