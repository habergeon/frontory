# WebGPU · 13 Resize and Sample Count

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Render Resources and Display Configuration · Editable example · Storage ID: `webgpu-step-13`

## Goals and learning outcomes

- Update resolution safely.
- Maintain the MSAA attachment contract.

## Prerequisites

Continue using the output and notes from unit 12. Preserve the previous inputs and reference outputs before the Resize and Sample Count experiment.

## Key concepts and explanations

### Actual Resolution

CSS size and drawing buffer size may differ. Account for DPR while keeping within the device's texture-size limits.

### MSAA

A multisample attachment can pass its display result to a resolve target. The pipeline and attachment sampleCount must match.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In resize.js, read sizes with ResizeObserver and determine buffer dimensions using DPR and limits.
2. Create color and depth textures with sampleCount 4 and use the current canvas view as resolveTarget.
3. Replace attachments on resize and save edge images for sampleCount 1 and 4.

## Variables to observe

| Variable    | Baseline | Change | Expected change / hypothesis                                                          |
| ----------- | -------- | ------ | ------------------------------------------------------------------------------------- |
| sampleCount | 1        | 4      | Triangle-edge stair stepping is expected to decrease while attachment cost increases. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Attachment dimensions match at three canvas sizes.
- [ ] Compare edge images for 1·4 samples at the same point in time.

## Self-check

1. Does MSAA solve all shader aliasing?
2. How should texture creation be handled when the window size becomes 0?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Depth Attachments](../12/README.md) · [Next: Buffers and Render Passes](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
