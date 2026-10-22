# WebAssembly · 17 Laying Out Multiple Arrays

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Deployment and Execution Structure · External example · preview instructions · Storage ID: `webassembly-step-17`

## Goals and learning outcomes

- Learning outcome: explain the role of Separate regions. Input cases: two arrays of different lengths.
- Deliverable: a region table and sentinel values. Explain the rationale for handling Ownership rules, linking it to the code.

## Prerequisites

Prepare the experiment results for Alignment and DataView from Unit 16, “Aligned and Unaligned Access”.

## Key concepts and explanations

### Separate regions

Calculate input and output regions so they do not overlap. Manual pointer layout risks collisions.

### Ownership rules

State who allocates and reuses memory in the wrapper contract. Do not overwrite regions in use with another request.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-17.mjs in a separate practice project, calculate offsets and lengths for two arrays and check boundary contamination with sentinel values. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: two arrays of different lengths. Baseline: separate. Run under the baseline conditions, then record observations and errors in notes/day-17.md.
3. Variable: layout; changed value: intentional overlap. Run again through the same input path. Deliverable to save: a region table and sentinel values. Hypothesis to check: Data corruption is detected when the regions overlap. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| layout | separate | intentional overlap | Data corruption is detected when the regions overlap. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a region table and sentinel values. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Separate regions and Ownership rules. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Separate regions affect in this exercise? Input cases: two arrays of different lengths.
2. Variable: layout. Hypothesis to check: Data corruption is detected when the regions overlap. Did the actual results agree with the hypothesis? Explain the evidence in terms of Ownership rules.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-17/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-17/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Aligned and Unaligned Access](../16/README.md) · [Next: String Byte Contracts](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
