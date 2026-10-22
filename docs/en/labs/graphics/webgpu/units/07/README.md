# WebGPU · 07 Indices and Primitives

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Device and Command Fundamentals · Editable example · Storage ID: `webgpu-step-07`

## Goals and learning outcomes

- Reuse vertices through indices.
- Validate primitive and front-face settings.

## Prerequisites

Continue using the output and notes from unit 6. Preserve the previous inputs and reference outputs before the Indices and Primitives experiment.

## Key concepts and explanations

### Reuse

An index buffer reuses the same vertex data across multiple triangles. Index values must fall within the actual vertex count.

### Primitive Interpretation

Primitive topology and front face settings affect vertex connectivity and front-face classification. The same data can produce different results with different settings.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In quad.js, write four vertices and six Uint16Array indices.
2. Connect an INDEX|COPY_DST buffer with setIndexBuffer('uint16') and call drawIndexed.
3. Reverse one triangle's index order, change cullMode, and compare the results.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| cullMode | none | back | Only the triangle with reversed winding is expected to disappear. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Draw a rectangle with four vertices and six indices.
- [ ] Record both winding cases and the culling results.

## Self-check

1. What goes wrong when the index format does not match the array's byte count?
2. Which coordinate transforms affect the front face on screen?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Vertex Buffers and Attributes](../06/README.md) · [Next: Uniforms and Bind Groups](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
