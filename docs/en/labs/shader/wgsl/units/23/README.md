# WGSL · 23 Storage Texture Output

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Numeric Verification and Kernel Design · Editable example · Storage ID: `wgsl-step-23`

## Goals and learning outcomes

- Configure image compute output.
- Verify format-dependent value conversions.

## Prerequisites

Continue using the output and records from Unit 22. Before experimenting with Storage Texture Output, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Output Format

The format in a storage texture declaration must match the host texture format. The format also determines the range and precision of stored values.

### Connecting Passes

A texture written by compute can be read in the next render pass. Avoid conflicting uses in the same operation and set resource usage accordingly.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In image.wgsl, declare a write storage texture with rgba8unorm format.
2. Convert global id x/y into colors and write them using textureStore.
3. On the host, create a texture with STORAGE_BINDING|TEXTURE_BINDING and display it in the next render pass.

## Variables to observe

| Variable     | Baseline   | Change                  | Expected change / hypothesis                                     |
| ------------ | ---------- | ----------------------- | ---------------------------------------------------------------- |
| Output color | Range 0..1 | Some components above 1 | The unorm format is expected to reveal its storage range limits. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The shader and host formats match.
- [ ] Check output at the four corners and the stored values of out-of-range components.

## Self-check

1. Are f32 computation results stored unchanged as f32 in the texture?
2. Which result structures suit a storage texture or a storage buffer?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Stage Constraints on Texture Functions](../22/README.md) · [Next: Numeric Stability and Special Inputs](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
