# WebAssembly · 23 Breaking Down Cold Execution

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Correctness and Bottleneck Evaluation · External example · preview instructions · Storage ID: `webassembly-step-23`

## Goals and learning outcomes

- Learning outcome: explain the role of Cold costs. Input cases: the first request in a new process.
- Deliverable: per-stage durations and a table of included work. Explain the rationale for handling Measurement boundaries, linking it to the code.

## Prerequisites

Prepare the experiment results for Cache and Version from Unit 22, “Module Caching and Versions”.

## Key concepts and explanations

### Cold costs

File loading·compilation·instantiation·the first call are distinct stages. A user's first request may encounter them together.

### Measurement boundaries

The existing coldHarnessTotalMs includes validation and other experiments. Do not mistake it for pure initialization time.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The iframe preview is an experiment with WebAssembly.Memory and JS reference computations; do not present it as execution of an actual Wasm module. Practice with actual modules in a separate Node 22+ environment or a controlled local web project. Use kernel.wat·kernel.wasm·benchmark.mjs in the existing src/labs/webassembly-02·03 folders, and rebuild with the official wat2wasm tool when modifying WAT. Preserve CSP·isolation, and record measurements yourself.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In day-23.mjs in a separate practice project, map the benchmark's timer boundaries into a table and write a new measurement wrapper. Refer to the existing Unit 1·14·28 examples only as starting points.
2. Input conditions: the first request in a new process. Baseline: kernel only. Run under the baseline conditions, then record observations and errors in notes/day-23.md.
3. Variable: measurement scope; changed value: entire first request. Run again through the same input path. Deliverable to save: per-stage durations and a table of included work. Hypothesis to check: The entire first request adds preparation·copy costs. Compare it with the actual results, and record whether they agree and why they differ.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| measurement scope | kernel only | entire first request | The entire first request adds preparation·copy costs. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: per-stage durations and a table of included work. Results are available for both the baseline and changed conditions, allowing comparison of 2 conditions; input values and the execution environment are recorded together.
- [ ] The explanation of differences between the two conditions connects both concepts: Cold costs and Measurement boundaries. For unexpected items, at least 1 cause or reason they remain unresolved is recorded.

## Self-check

1. Which processing stage does Cold costs affect in this exercise? Input cases: the first request in a new process.
2. Variable: measurement scope. Hypothesis to check: The entire first request adds preparation·copy costs. Did the actual results agree with the hypothesis? Explain the evidence in terms of Measurement boundaries.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webassembly-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../../src/labs/webassembly-step-23/kernel.wat)
- [experiment.mjs](../../../../../../../src/labs/webassembly-step-23/experiment.mjs)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Module Caching and Versions](../22/README.md) · [Next: Warm Repeats and Warm-up](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
