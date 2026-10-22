# WebGPU · 22 Device Loss and Reinitialization

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Recovery, Measurement, and an Integrated Project · Editable example · Storage ID: `webgpu-step-22`

## Goals and learning outcomes

- Handle device loss.
- Validate the resource recreation path.

## Prerequisites

Continue using the output and notes from unit 21. Preserve the previous inputs and reference outputs before the Device Loss and Reinitialization experiment.

## Key concepts and explanations

### Lost State

device.lost signals that the device is no longer valid. Resources from the previous device cannot be reused unchanged on a new device.

### Recreation

Recovery needs a path that recreates shaders, buffers, and pipelines. Retain CPU settings and initial data in a reproducible form.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In device.js, connect device.lost handling to stopping the render loop.
2. Call device.destroy from a development button and display the loss reason.
3. On explicit user retry, create a new device and resources and restore saved settings.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Device state | Normal | Intentional loss through destroy | The loop is expected to stop and recover with new resources after an explicit retry. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Do not submit to the previous device after loss.
- [ ] After retry, create the same initial scene with a new device.

## Self-check

1. Should retry policies for a destroy reason and unexpected loss be identical?
2. What information must remain on the CPU for recovery?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Instancing and Data Structures](../21/README.md) · [Next: Asynchronous Errors and Task Identity](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
