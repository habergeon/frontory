# WebAssembly · 22 Module Caching and Versions

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Correctness and Bottleneck Evaluation · External example · preview instructions · Storage ID: `webassembly-step-22`

## Goals and learning outcomes

- Learning outcome: explain the role of Cache. Input cases: the correct version and a stale binary.
- Deliverable: source hashes·binary hashes·check results. Explain the rationale for handling Version, linking it to the code.

## Prerequisites

Prepare the experiment results for Execution location and Transfer cost from Unit 21, “Workers and Wasm”.

## Key concepts and explanations

### Cache

Reusing a compiled module can reduce preparation costs. Using an old binary after a source change invalidates verification.

### Version

Record source·binary·build-tool versions together. An identical file name does not imply identical code.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-22.mjs in a separate practice project, add module version metadata to a separate app and inspect exports after the build. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: the correct version and a stale binary. Baseline: new build. Run under the baseline conditions, then record observations and errors in notes/day-22.md.
3. Variable: binary; changed value: previous build. Run again through the same input path. Deliverable to save: source hashes·binary hashes·check results. Hypothesis to check: A version mismatch is detected and excluded from the comparison. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| binary | new build | previous build | A version mismatch is detected and excluded from the comparison. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: source hashes·binary hashes·check results. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Cache and Version. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Cache affect in this exercise? Input cases: the correct version and a stale binary.
2. Variable: binary. Hypothesis to check: A version mismatch is detected and excluded from the comparison. Did the actual results agree with the hypothesis? Explain the evidence in terms of Version.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-22/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-22/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Workers and Wasm](../21/README.md) · [Next: Breaking Down Cold Execution](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
