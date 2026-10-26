# WebGPU · 10 Matrices and Cameras

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Render Resources and Display Configuration · Editable example · Storage ID: `webgpu-step-10`

## Goals and learning outcomes

- Build camera transforms.
- Validate the depth-coordinate convention.

## Prerequisites

Continue using the output and notes from unit 9. Preserve the previous inputs and reference outputs before the Matrices and Cameras experiment.

## Key concepts and explanations

### Transform Order

The multiplication order of world, view, and projection matrices determines how positions are interpreted. Reordering the same matrices changes translation and the center of rotation.

### Depth Range

WebGPU's clip depth range differs from WebGL's. Check that the projection function follows the target API's depth convention.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Separate model, view, and projection matrices in camera.js.
2. Upload a 64-byte mat4x4f uniform and return the multiplied position from the vertex shader.
3. Print clip z/w for markers on the near and far planes and check the 0..1 range.

## Variables to observe

| Variable     | Baseline                                                     | Change                | Expected change / hypothesis                                 |
| ------------ | ------------------------------------------------------------ | --------------------- | ------------------------------------------------------------ |
| Matrix order | Product intended to produce translation followed by rotation | Swap the two matrices | The object center and orbital motion are expected to change. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record normalized depths for near-plane and far-plane markers.
- [ ] Compare the center positions of both matrix orders numerically.

## Self-check

1. Which range changes if you use a WebGL projection matrix unchanged?
2. How do you match CPU matrix storage order to shader operations?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Uniform Struct Alignment](../09/README.md) · [Next: Textures and Samplers](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
