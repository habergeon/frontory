# WebGPU · 18 Copy Alignment and Texture Rows

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Compute and Data Movement · Editable example · Storage ID: `webgpu-step-18`

## Goals and learning outcomes

- Calculate copy alignment.
- Remove texture readback padding.

## Prerequisites

Continue using the output and notes from unit 17. Preserve the previous inputs and reference outputs before the Copy Alignment and Texture Rows experiment.

## Key concepts and explanations

### Buffer Copies

copyBufferToBuffer offsets and sizes require 4-byte alignment. Record total buffer capacity separately from the valid data length.

### Texture Rows

For encoder buffer↔texture copies, use a bytesPerRow multiple of 256 bytes where required. Do not confuse this with queue.writeTexture row rules.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In copy-layout.js, for a 13-pixel RGBA8 row, calculate the 52 valid bytes and padded stride 256.
2. Reconstruct the CPU image by skipping padding in the copyTextureToBuffer result.
3. Compare buffer copy offset 4 and invalid offset 2 with an error scope.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Row stride | 52 bytes of valid data | 256-byte copy stride | Excluding padding is expected to restore the original 13-pixel row. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record valid row bytes and copy stride separately.
- [ ] The reconstructed image matches the original, and the invalid offset produces a validation error.

## Self-check

1. Must the multiple-of-256 rule always apply to writeTexture too?
2. What stripes appear if padding is read as pixels?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Mapping and Staging Buffers](../17/README.md) · [Next: Workgroup Shared Memory](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
