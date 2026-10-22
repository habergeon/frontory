# WGSL · 10 Scalar and Vector Alignment

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Declarations and Memory Layout · Editable example · Storage ID: `wgsl-step-10`

## Goals and learning outcomes

- Calculate member layouts.
- Match byte writes to shader interpretation.

## Prerequisites

Continue using the output and records from Unit 9. Before experimenting with Scalar and Vector Alignment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Alignment and Size

Alignment constrains the multiples at which a starting address can occur; size is the space occupied by the data. Distinguish vec3f alignment 16 from size 12 to calculate the next member's position.

### Member Offsets

Round each member's start up from the previous end to its own alignment. Round the entire structure size up to the structure's alignment as well.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In layout.md, calculate offsets 0, 16, and 28 for a:f32,b:vec3f,c:f32 and a total size of 32.
2. Use DataView to write values at these byte offsets and create a storage buffer.
3. Copy the three fields into separate output positions in compute and read them back.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| b offset | 16 | Intentionally use 4 | b and c are expected to be read incorrectly because the positions differ from those expected by the shader. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The table of each member's alignment, size, and offset is correct.
- [ ] All components read from the correct layout match the input.

## Self-check

1. Does an f32 after a vec3 always occur 16 bytes later?
2. What changes if trailing structure padding is ignored in an array?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Groups, Bindings, and Host Connections](../09/README.md) · [Next: Matrix and Array Strides](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
