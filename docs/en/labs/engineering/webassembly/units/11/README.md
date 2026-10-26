# WebAssembly · 11 Memory Grow and View Lifetime

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Memory and Array Boundaries · External example · preview instructions · Storage ID: `webassembly-step-11`

## Goals and learning outcomes

- Learning outcome: explain the role of Grow. Input cases: one non-shared memory.
- Deliverable: capacity before·after growth and old/new view lengths. Explain the rationale for handling Recreation, linking it to the code.

## Prerequisites

Prepare the experiment results for Set and Bounds from Unit 10, “Array Copies and Bounds”.

## Key concepts and explanations

### Grow

memory.grow increases capacity in pages. Views of the existing non-shared buffer may become invalid.

### Recreation

Recreate views from memory.buffer after growth. Code that caches old views must also update them.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-11.mjs in a separate practice project, keep the existing view and compare its byteLength with a new view after grow(1). Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: one non-shared memory. Baseline: none. Run under the baseline conditions, then record observations and errors in notes/day-11.md.
3. Variable: grow; changed value: 1 page. Run again through the same input path. Deliverable to save: capacity before·after growth and old/new view lengths. Hypothesis to check: The existing view becomes invalid, and the new view can read the data. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                           |
| -------- | -------- | ------ | ---------------------------------------------------------------------- |
| grow     | none     | 1 page | The existing view becomes invalid, and the new view can read the data. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: capacity before·after growth and old/new view lengths. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Grow and Recreation. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Grow affect in this exercise? Input cases: one non-shared memory.
2. Variable: grow. Hypothesis to check: The existing view becomes invalid, and the new view can read the data. Did the actual results agree with the hypothesis? Explain the evidence in terms of Recreation.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-11/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-11/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Array Copies and Bounds](../10/README.md) · [Next: Capacity Limits and Failure](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
