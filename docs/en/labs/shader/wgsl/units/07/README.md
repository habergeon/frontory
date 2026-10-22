# WGSL · 07 Interpolation and Stage Interfaces

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Types and Shader Interfaces · Editable example · Storage ID: `wgsl-step-07`

## Goals and learning outcomes

- Configure interpolation between stages.
- Distinguish the meanings of system coordinates.

## Prerequisites

Continue using the output and records from Unit 6. Before experimenting with Interpolation and Stage Interfaces, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Interpolation Rules

Floating-point vertex outputs are interpolated in the fragment stage. Integer identifiers must explicitly use flat interpolation.

### System Coordinates

The vertex position output and fragment position input do not represent the same coordinates. Check screen coordinate conventions when using fragment positions.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In interface.wgsl, output both a color and an integer id with @interpolate(flat).
2. Display id-based colors and interpolated colors in separate fragment modes.
3. Compare screen UVs obtained by normalizing fragment position by resolution with vertex UVs.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Color interpolation | Default interpolation | flat interpolation | Color variation inside the triangle is expected to disappear, filling it with the value from the designated vertex. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Explicitly specify flat interpolation for an integer location.
- [ ] Compare the two modes: screen position and vertex UV.

## Self-check

1. When do perspective interpolation and linear screen interpolation differ?
2. Why must you check which vertex supplies the flat value?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Conditions, Loops, and Termination](../06/README.md) · [Next: Address Spaces and Access Modes](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
