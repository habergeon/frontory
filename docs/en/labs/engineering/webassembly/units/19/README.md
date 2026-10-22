# WebAssembly · 19 Browser Loading and MIME

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Deployment and Execution Structure · External example · preview instructions · Storage ID: `webassembly-step-19`

## Goals and learning outcomes

- Learning outcome: explain the role of Streaming. Input cases: valid·404·incorrect MIME.
- Deliverable: response statuses and initialization results. Explain the rationale for handling Failure classification, linking it to the code.

## Prerequisites

Prepare the experiment results for Encoding and Passing length from Unit 18, “String Byte Contracts”.

## Key concepts and explanations

### Streaming

instantiateStreaming uses a response to prepare a module. It requires the correct MIME type and server configuration.

### Failure classification

HTTP failures differ from compilation failures. Record the cause even when providing a fallback.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-19.mjs in a separate practice project, configure application/wasm responses and fetch checks on an external local server. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: valid·404·incorrect MIME. Baseline: application/wasm. Run under the baseline conditions, then record observations and errors in notes/day-19.md.
3. Variable: server MIME; changed value: text/plain. Run again through the same input path. Deliverable to save: response statuses and initialization results. Hypothesis to check: The streaming path may succeed or fail differently. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| server MIME | application/wasm | text/plain | The streaming path may succeed or fail differently. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: response statuses and initialization results. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Streaming and Failure classification. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Streaming affect in this exercise? Input cases: valid·404·incorrect MIME.
2. Variable: server MIME. Hypothesis to check: The streaming path may succeed or fail differently. Did the actual results agree with the hypothesis? Explain the evidence in terms of Failure classification.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-19/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-19/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: String Byte Contracts](../18/README.md) · [Next: Reusing Initialization](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
