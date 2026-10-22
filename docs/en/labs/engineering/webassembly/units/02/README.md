# WebAssembly · 02 WAT and Binary

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Modules and Numeric Contracts · External example · preview instructions · Storage ID: `webassembly-step-02`

## Goals and learning outcomes

- Learning outcome: explain the role of Text format. Input cases: the existing sum function and a modified constant.
- Deliverable: build logs and export call results. Explain the rationale for handling Build, linking it to the code.

## Prerequisites

Prepare the experiment results for Module boundary and Preview scope from Unit 1, “Modules and Linear Memory”.

## Key concepts and explanations

### Text format

WAT is a readable representation of module structure. Browsers do not directly execute a WAT string as a Wasm binary.

### Build

wat2wasm converts text into binary. Check build results separately from execution results.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-2.mjs in a separate practice project, copy kernel.wat into a separate folder and run the official tool: wat2wasm kernel.wat -o kernel.wasm. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: the existing sum function and a modified constant. Baseline: valid WAT. Run under the baseline conditions, then record observations and errors in notes/day-2.md.
3. Variable: source; changed value: WAT with a syntax error. Run again through the same input path. Deliverable to save: build logs and export call results. Hypothesis to check: Syntax errors are exposed during the build. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| source | valid WAT | WAT with a syntax error | Syntax errors are exposed during the build. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: build logs and export call results. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Text format and Build. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Text format affect in this exercise? Input cases: the existing sum function and a modified constant.
2. Variable: source. Hypothesis to check: Syntax errors are exposed during the build. Did the actual results agree with the hypothesis? Explain the evidence in terms of Build.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-02/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-02/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Modules and Linear Memory](../../01-foundations/README.md) · [Next: Compile and Instance](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
