# WebGPU · 04 Recording and Submitting Commands

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Device and Command Fundamentals · Editable example · Storage ID: `webgpu-step-04`

## Goals and learning outcomes

- Build the command lifecycle.
- Distinguish submission from completion.

## Prerequisites

Continue using the output and notes from unit 3. Preserve the previous inputs and reference outputs before the Recording and Submitting Commands experiment.

## Key concepts and explanations

### Recording Stage

A command encoder does not complete work immediately. End the pass, create a command buffer, and submit it to the queue.

### Completion

Returning from submit does not mean GPU work has finished. Wait for completion only at observation points that require it.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In commands.js, write the createCommandEncoder·beginRenderPass·end·finish·submit sequence.
2. Record two clear colors in separate submissions and check the last color on screen.
3. Log the times before and after submit and when onSubmittedWorkDone completes.

## Variables to observe

| Variable         | Baseline | Change | Expected change / hypothesis                                                                   |
| ---------------- | -------- | ------ | ---------------------------------------------------------------------------------------------- |
| Submission count | Once     | Twice  | The last clear result is expected to be visible, with separate submission and completion logs. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Every pass reaches finish after end.
- [ ] Record submission and completion as separate items.

## Self-check

1. Is command-recording time GPU execution time?
2. What parallelism is reduced by waiting for completion every frame?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Canvas Configuration and the Current Texture](../03/README.md) · [Next: Shader Modules and Diagnostics](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
