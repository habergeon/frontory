# WebGPU · 27 Acceptance of the Integrated Particle Experiment

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Recovery, Measurement, and an Integrated Project · Editable example · Storage ID: `webgpu-step-27`

## Goals and learning outcomes

- Document the full project contract.
- Perform acceptance checks including failures and restarts.

## Prerequisites

Continue using the output and notes from unit 26. Preserve the previous inputs and reference outputs before starting "Acceptance of the Integrated Particle Experiment".

## Key concepts and explanations

### Separate Components

Separating initial data, kernels, rendering, readback, and UI clarifies error locations. Module contracts include buffer sizes and lifetimes.

### Acceptance Evidence

Visible animation alone cannot prove computational correctness. Keep failure-recovery and CPU-comparison results together.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In README.md, tabulate each module's inputs, outputs, and resource ownership.
2. Run five scenarios: unsupported environment, device loss, resize, N=0, and N=1003.
3. Export the current settings JSON and CPU-comparison results, then restore them in a new session.

## Variables to observe

| Variable       | Baseline         | Change                          | Expected change / hypothesis                                                 |
| -------------- | ---------------- | ------------------------------- | ---------------------------------------------------------------------------- |
| Starting state | Existing session | New session with saved settings | The same initial data is expected to be reproduced without hidden GPU state. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Each of the five scenarios has an actual observation or a reason it was not run.
- [ ] The seed and initial positions match after restart.

## Self-check

1. What computational errors can remain hidden in apparently normal animation?
2. Which GPU work need not be created for empty input?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Workgroup Size Experiments](../26/README.md) · [Next: Compute and Readback](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
