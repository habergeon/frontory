# WGSL · 22 Stage Constraints on Texture Functions

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Numeric Verification and Kernel Design · Editable example · Storage ID: `wgsl-step-22`

## Goals and learning outcomes

- Choose texture functions appropriate to the stage.
- Distinguish texel and normalized coordinates.

## Prerequisites

Continue using the output and records from Unit 21. Before experimenting with Stage Constraints on Texture Functions, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Implicit Derivatives

textureSample is a sampling path that uses implicit derivatives. In compute, choose an appropriate function such as textureLoad or textureSampleLevel with an explicit level.

### Coordinate Units

textureLoad accesses integer texel coordinates, while filtered sampling uses normalized coordinates. The same numbers do not represent the same position.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In texture-kernel.wgsl, obtain the input dimensions using textureDimensions.
2. Use textureLoad to read a hand-built 4×4 texture and copy it to a storage output.
3. Compare corner and center values with a separate fragment path or an explicit-level sampling path.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Access method | Integer texel load | Normalized coordinates and linear sampling | Colors are expected to blend at interpolated positions, while texel load reads stored values. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The 16 texel load results match the original.
- [ ] Compute code does not depend on implicit-derivative sampling.

## Self-check

1. Why is a 0.5 offset needed when converting texel centers to UVs?
2. How does fixing the mipmap level affect minification quality?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Ping-pong and Data Races](../21/README.md) · [Next: Storage Texture Output](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
