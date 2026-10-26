# WebGPU · 17 Mapping and Staging Buffers

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Compute and Data Movement · Editable example · Storage ID: `webgpu-step-17`

## Goals and learning outcomes

- Implement safe readback.
- Manage the buffer mapping lifetime.

## Prerequisites

Continue using the output and notes from unit 16. Preserve the previous inputs and reference outputs before the Mapping and Staging Buffers experiment.

## Key concepts and explanations

### Readback Path

Reading a GPU storage buffer directly on the CPU differs from the usual readback contract. Copy to a COPY_DST|MAP_READ staging buffer, then map it.

### Mapped State

A mapped buffer cannot be used by the GPU. Copy the getMappedRange data for retention before calling unmap.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In readback.js, separate the result COPY_SRC buffer from the staging buffer.
2. Submit copyBufferToBuffer, then await mapAsync(GPUMapMode.READ).
3. Copy getMappedRange data, unmap, and then perform the next calculation.

## Variables to observe

| Variable   | Baseline        | Change     | Expected change / hypothesis                                              |
| ---------- | --------------- | ---------- | ------------------------------------------------------------------------- |
| Read count | Once at the end | Every step | Repeated mapping and waiting are expected to increase end-to-end latency. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Copied CPU results remain available after unmap.
- [ ] Do not reuse a mapped staging buffer in GPU commands.

## Self-check

1. What changes after unmap if you retain the getMappedRange view directly?
2. Is readback necessary when you only display GPU results?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Storage and Ping-Pong](../16/README.md) · [Next: Copy Alignment and Texture Rows](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
