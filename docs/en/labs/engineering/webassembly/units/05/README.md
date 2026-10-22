# WebAssembly · 05 Imports and Host Functions

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Modules and Numeric Contracts · External example · preview instructions · Storage ID: `webassembly-step-05`

## Goals and learning outcomes

- Learning outcome: explain the role of Import. Input cases: a reporting function present·missing.
- Deliverable: call values and linking error records. Explain the rationale for handling Boundary cost, linking it to the code.

## Prerequisites

Prepare the experiment results for Export surface and Contract checks from Unit 4, “Inspecting Exports”.

## Key concepts and explanations

### Import

A module can require external functions or memory. The namespace and name must match for linking.

### Boundary cost

Calling a host function also crosses the JS·Wasm boundary. Logging every element can cost more than computation.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-5.mjs in a separate practice project, add an env.report import in separate WAT and receive its call values with a JS function. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: a reporting function present·missing. Baseline: valid. Run under the baseline conditions, then record observations and errors in notes/day-5.md.
3. Variable: import object; changed value: missing. Run again through the same input path. Deliverable to save: call values and linking error records. Hypothesis to check: A missing contract is exposed during instance creation. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| import object | valid | missing | A missing contract is exposed during instance creation. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: call values and linking error records. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Import and Boundary cost. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Import affect in this exercise? Input cases: a reporting function present·missing.
2. Variable: import object. Hypothesis to check: A missing contract is exposed during instance creation. Did the actual results agree with the hypothesis? Explain the evidence in terms of Boundary cost.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-05/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-05/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Inspecting Exports](../04/README.md) · [Next: I32 and JS Number](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
