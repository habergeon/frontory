# WebAssembly · 04 Inspecting Exports

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Modules and Numeric Contracts · External example · preview instructions · Storage ID: `webassembly-step-04`

## Goals and learning outcomes

- Learning outcome: explain the role of Export surface. Input cases: a valid module and a typo in a required name.
- Deliverable: the export list and error guidance. Explain the rationale for handling Contract checks, linking it to the code.

## Prerequisites

Prepare the experiment results for Module and Instance from Unit 3, “Compile and Instance”.

## Key concepts and explanations

### Export surface

JS accesses functions and memory by their public names. Guessing names and types causes runtime failures.

### Contract checks

Module.exports lets you inspect public entries. Treat a missing required export as an initialization error.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-4.mjs in a separate practice project, print Module.exports and check for memory·sum·at·transform. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: a valid module and a typo in a required name. Baseline: sum. Run under the baseline conditions, then record observations and errors in notes/day-4.md.
3. Variable: requested name; changed value: sumMissing. Run again through the same input path. Deliverable to save: the export list and error guidance. Hypothesis to check: The missing entry is clearly reported, and computation does not start. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| requested name | sum | sumMissing | The missing entry is clearly reported, and computation does not start. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: the export list and error guidance. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Export surface and Contract checks. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Export surface affect in this exercise? Input cases: a valid module and a typo in a required name.
2. Variable: requested name. Hypothesis to check: The missing entry is clearly reported, and computation does not start. Did the actual results agree with the hypothesis? Explain the evidence in terms of Contract checks.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-04/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-04/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Compile and Instance](../03/README.md) · [Next: Imports and Host Functions](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
