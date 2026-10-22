# WebAssembly · 07 Traps and Input Validation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Modules and Numeric Contracts · External example · preview instructions · Storage ID: `webassembly-step-07`

## Goals and learning outcomes

- Learning outcome: explain the role of Trap. Input cases: valid·negative length·out of bounds.
- Deliverable: rejection reasons and RuntimeError records. Explain the rationale for handling Preflight checks, linking it to the code.

## Prerequisites

Prepare the experiment results for Numeric representation and Overflow from Unit 6, “I32 and JS Number”.

## Key concepts and explanations

### Trap

Out-of-bounds memory access can cause a runtime trap. Catch it as a JS exception and distinguish it from user errors.

### Preflight checks

Validate pointers and lengths before calling. Do not overuse traps as normal input validation.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-7.mjs in a separate practice project, add integer·negative-value·bounds checks to a sum call wrapper and classify errors. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: valid·negative length·out of bounds. Baseline: none. Run under the baseline conditions, then record observations and errors in notes/day-7.md.
3. Variable: validation; changed value: preflight checks. Run again through the same input path. Deliverable to save: rejection reasons and RuntimeError records. Hypothesis to check: Invalid inputs are rejected before the module call. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| validation | none | preflight checks | Invalid inputs are rejected before the module call. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: rejection reasons and RuntimeError records. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Trap and Preflight checks. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Trap affect in this exercise? Input cases: valid·negative length·out of bounds.
2. Variable: validation. Hypothesis to check: Invalid inputs are rejected before the module call. Did the actual results agree with the hypothesis? Explain the evidence in terms of Preflight checks.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-07/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-07/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: I32 and JS Number](../06/README.md) · [Next: Pages and Byte Offset](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
