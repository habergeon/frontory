# WebGPU · 11 Textures and Samplers

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Render Resources and Display Configuration · Editable example · Storage ID: `webgpu-step-11`

## Goals and learning outcomes

- Connect texture input.
- Compare the effects of sampler settings.

## Prerequisites

Continue using the output and notes from unit 10. Preserve the previous inputs and reference outputs before the Textures and Samplers experiment.

## Key concepts and explanations

### Separate Roles

A texture stores texel data, while a sampler determines interpolation and boundary handling. Connect them through separate bindings.

### Input Color

The image color representation and texture format affect the displayed result. First check orientation and channels with a small pattern you create yourself.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In texture.js, create a 2×2 RGBA pattern and upload it with queue.writeTexture.
2. Connect texture_2d and sampler bindings to the fragment shader.
3. Compare UV orientation and nearest and linear sampling, and record the four corner colors.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| filter | nearest | linear | Colors are expected to blend smoothly at boundaries. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Check the positions of all four corner colors in the 2×2 pattern.
- [ ] Save the difference in boundary output between the two filters.

## Self-check

1. Why treat a texture and sampler as separate resources?
2. How do you distinguish a UV Y-direction error from an image row-order error?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Matrices and Cameras](../10/README.md) · [Next: Depth Attachments](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
