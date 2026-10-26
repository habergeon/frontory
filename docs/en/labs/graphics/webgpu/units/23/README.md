# WebGPU · 23 Asynchronous Errors and Task Identity

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Recovery, Measurement, and an Integrated Project · Editable example · Storage ID: `webgpu-step-23`

## Goals and learning outcomes

- Connect asynchronous errors to tasks.
- Block stale results from being applied.

## Prerequisites

Continue using the output and notes from unit 22. Preserve the previous inputs and reference outputs before the Asynchronous Errors and Task Identity experiment.

## Key concepts and explanations

### Error Channels

Error scopes and uncapturederror are different error observation paths. Display expected validation failures separately from unexpected errors.

### Generation Numbers

Earlier asynchronous work can finish during reinitialization. Use a device generation number to prevent stale results from modifying new state.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In errors.js, add an uncapturederror listener and task labels.
2. Create a delayed fixture that requests reinitialization during pipeline creation.
3. Compare the completed result's generation and record discarded earlier results.

## Variables to observe

| Variable         | Baseline                 | Change                             | Expected change / hypothesis                                 |
| ---------------- | ------------------------ | ---------------------------------- | ------------------------------------------------------------ |
| Completion order | Current generation first | Previous generation completes late | The late result is expected not to replace the new pipeline. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Error logs display the task label and generation.
- [ ] Only current-generation resources are used in both completion orders.

## Self-check

1. Why does an overly broad error scope make tracing causes harder?
2. What cleanup is needed when discarding a stale pipeline result?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Device Loss and Reinitialization](../22/README.md) · [Next: The Scope of Timing](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
