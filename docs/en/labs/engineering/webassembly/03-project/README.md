# WebAssembly · 28 Evaluating Actual Bottlenecks

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Correctness and Bottleneck Evaluation · External example · preview instructions · Storage ID: `webassembly-03`

## Goals and learning outcomes

- Learning outcome: explain the role of End-to-end latency. Input cases: multiple sizes and repeat counts.
- Deliverable: a report on cold·warm·copies·correctness·adoption rationale. Explain the rationale for handling Evidence-based decisions, linking it to the code.

## Prerequisites

Prepare the experiment results for Reproducibility and Adoption criteria from Unit 27, “Environment and Adoption Criteria”.

## Key concepts and explanations

### End-to-end latency

Excluding compilation and transfer may misrepresent the actual user experience. Read cold and warm results separately.

### Evidence-based decisions

Wasm does not automatically accelerate every task. Decide whether to adopt it based on correctness and actual bottlenecks.

## Practice setup

The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-28.mjs in a separate practice project, run node src/labs/webassembly-03/benchmark.mjs and complete a report on array transformations in JS·actual Wasm. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: multiple sizes and repeat counts. Baseline: function only. Run under the baseline conditions, then record observations and errors in notes/day-28.md.
3. Variable: comparison scope; changed value: entire request. Run again through the same input path. Deliverable to save: a report on cold·warm·copies·correctness·adoption rationale. Hypothesis to check: Considering the total cost may change the decision. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable         | Baseline      | Change         | Expected change / hypothesis                        |
| ---------------- | ------------- | -------------- | --------------------------------------------------- |
| comparison scope | function only | entire request | Considering the total cost may change the decision. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: a report on cold·warm·copies·correctness·adoption rationale. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: End-to-end latency and Evidence-based decisions. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does End-to-end latency affect in this exercise? Input cases: multiple sizes and repeat counts.
2. Variable: comparison scope. Hypothesis to check: Considering the total cost may change the decision. Did the actual results agree with the hypothesis? Explain the evidence in terms of Evidence-based decisions.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../src/labs/webassembly-03/example.js) · [Runtime environments and limits](../../../../examples.md)

The preview experiments with WebAssembly.Memory and JS boundary costs. To preserve the CSP, compile WASM modules outside the iframe. Use kernel.wat, kernel.wasm, and benchmark.mjs in the same folder to compare actual WASM calculations with JS results.

- [benchmark.mjs](../../../../../../src/labs/webassembly-03/benchmark.mjs)
- [kernel.wasm](../../../../../../src/labs/webassembly-03/kernel.wasm)
- [kernel.wat](../../../../../../src/labs/webassembly-03/kernel.wat)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Environment and Adoption Criteria](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
