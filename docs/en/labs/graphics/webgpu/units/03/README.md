# WebGPU · 03 Canvas Configuration and the Current Texture

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Device and Command Fundamentals · Editable example · Storage ID: `webgpu-step-03`

## Goals and learning outcomes

- Connect the canvas to GPU output.
- Maintain the display-format contract.

## Prerequisites

Continue using the output and notes from unit 2. Preserve the previous inputs and reference outputs before the Canvas Configuration and the Current Texture experiment.

## Key concepts and explanations

### Display Target

The canvas context connects the device to the display format. Obtain the current frame texture each frame and use it as a render attachment.

### Matching Formats

The pipeline color target format must match the attachment format. Query the browser's preferred format through the API.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In canvas.js, call getContext('webgpu') and getPreferredCanvasFormat.
2. After configure, create a clear pass with getCurrentTexture().createView().
3. Change the background color, obtain a new view each frame, and record the configure values.

## Variables to observe

| Variable    | Baseline | Change    | Expected change / hypothesis                                             |
| ----------- | -------- | --------- | ------------------------------------------------------------------------ |
| Clear color | Black    | Dark blue | The entire attachment color is expected to change even without geometry. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Obtain the current texture view for each frame.
- [ ] Record the preferred format and pipeline target format as the same value.

## Self-check

1. Why is retaining a previous frame's texture a problem?
2. How does a CSS background color differ from an attachment clear?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Negotiating Features and limits](../02/README.md) · [Next: Recording and Submitting Commands](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
