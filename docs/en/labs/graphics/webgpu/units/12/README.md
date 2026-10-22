# WebGPU · 12 Depth Attachments

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Render Resources and Display Configuration · Editable example · Storage ID: `webgpu-step-12`

## Goals and learning outcomes

- Configure depth testing.
- Manage attachment sizes and lifetimes.

## Prerequisites

Continue using the output and notes from unit 11. Preserve the previous inputs and reference outputs before the Depth Attachments experiment.

## Key concepts and explanations

### Depth Testing

A depth texture stores the front-to-back relationship of fragments. A color attachment alone cannot provide occlusion independent of drawing order.

### Lifetime

When the size changes, recreate the depth texture at the same size. Release the replaced texture when it is no longer used.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Add a depth24plus texture and depthStencil settings in depth.js.
2. Place two overlapping triangles at different depths and reverse their draw order.
3. Record depthClearValue, depthCompare, and depthWriteEnabled while comparing results.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Depth testing | Disabled | less with writes enabled | Opaque-shape occlusion is expected to be independent of draw order. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The same shape is in front in both draw orders.
- [ ] The depth attachment size matches the color output size.

## Self-check

1. Is the same depth-write policy suitable for transparent objects?
2. Why must the depth clear value and comparison be chosen together?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Textures and Samplers](../11/README.md) · [Next: Resize and Sample Count](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
