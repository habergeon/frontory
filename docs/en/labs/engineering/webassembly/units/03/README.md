# WebAssembly · 03 Compile and Instance

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Modules and Numeric Contracts · External example · preview instructions · Storage ID: `webassembly-step-03`

## Goals and learning outcomes

- Learning outcome: explain the role of Module. Input cases: the same module and different first elements.
- Deliverable: the first element value for each instance. Explain the rationale for handling Instance, linking it to the code.

## Prerequisites

Prepare the experiment results for Text format and Build from Unit 2, “WAT and Binary”.

## Key concepts and explanations

### Module

The result of compile is compiled code. Distinguish it from an instance with execution state.

### Instance

Multiple instances can be created from the same module. Whether their memories are shared depends on the definitions.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-3.mjs in a separate practice project, create two instances after WebAssembly.compile and modify each memory. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: the same module and different first elements. Baseline: one. Run under the baseline conditions, then record observations and errors in notes/day-3.md.
3. Variable: instances; changed value: two. Run again through the same input path. Deliverable to save: the first element value for each instance. Hypothesis to check: Internally defined memory remains independent in each instance. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable  | Baseline | Change | Expected change / hypothesis                                    |
| --------- | -------- | ------ | --------------------------------------------------------------- |
| instances | one      | two    | Internally defined memory remains independent in each instance. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: the first element value for each instance. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Module and Instance. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Module affect in this exercise? Input cases: the same module and different first elements.
2. Variable: instances. Hypothesis to check: Internally defined memory remains independent in each instance. Did the actual results agree with the hypothesis? Explain the evidence in terms of Instance.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-03/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-03/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: WAT and Binary](../02/README.md) · [Next: Inspecting Exports](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
