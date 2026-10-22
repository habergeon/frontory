# WebGPU · 06 Vertex Buffers and Attributes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Device and Command Fundamentals · Editable example · Storage ID: `webgpu-step-06`

## Goals and learning outcomes

- Design a vertex-data layout.
- Connect a CPU array to GPU vertex input.

## Prerequisites

Continue using the output and notes from unit 5. Preserve the previous inputs and reference outputs before the Vertex Buffers and Attributes experiment.

## Key concepts and explanations

### Byte Contract

A vertex buffer layout declares the stride and each attribute's offset and format. Confusing TypedArray element indices with byte offsets reads incorrect values.

### Upload

GPUBufferUsage specifies which commands may use a buffer. A queue.writeBuffer destination must include COPY_DST usage.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In vertices.js, create three vertices with two position components and three color components.
2. Declare a 20-byte stride and offsets of 0·8 bytes in the pipeline.
3. Upload to a VERTEX|COPY_DST buffer and inspect each vertex color on screen.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| arrayStride | 20 bytes | 24 bytes with matching padded data | The same triangle is expected when the data and layout are changed together. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Write a byte-offset table for the three vertices.
- [ ] Vertex positions and colors match across both layouts.

## Self-check

1. How are format and the TypedArray type related?
2. What happens if only the stride changes while the data stays unchanged?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Shader Modules and Diagnostics](../05/README.md) · [Next: Indices and Primitives](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
