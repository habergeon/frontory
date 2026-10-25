# WGSL · 14 Bindings and Memory Layout

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Resource Declarations and Memory Layout · Editable example · Storage ID: `wgsl-02`

## Goals and learning outcomes

- Implement a mixed uniform layout.
- Verify that field updates are independent.

## Prerequisites

Continue using the output and records from Unit 13. Before experimenting with Bindings and Memory Layout, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Combined Contracts

Even when grouping color and transformation, calculate each alignment and offset. Writing a byte table first makes it easier to reproduce mixed-up values.

### Independent Updates

Two fields in the same buffer can be updated using the correct offsets and ranges. Check fields that should remain unchanged to detect overwrites.

## Practice setup

The existing wgsl-02 preview is a starting point. It does not replace implementation or verification of the full subsequent assignment. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Record Params color:vec4f and transform:mat4x4f offsets as 0 and 16, with a total of 80 bytes.
2. In host.js, writeBuffer only color, then update only transform.
3. Check the @group/@binding correspondence and fix an incorrect-offset case.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Update range | color: 16 bytes | Update 64 bytes of transform at offset16 | The color is expected to remain unchanged while only the transformation changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Updating color does not change the transformation, and updating the transformation does not change the color.
- [ ] Include a table of binding locations and the two fields' byte offsets and sizes.

## Self-check

1. How do you distinguish the units of TypedArray offsets and writeBuffer offsets?
2. Does an 80-byte structure mean that a dynamic uniform slot is also 80 bytes?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../src/labs/wgsl-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Uses an actual WebGPU pipeline and requires a supported GPU and browser. Unsupported environments display guidance. Check WGSL errors with the GPU compiler.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Runtime Arrays and Binding Ranges](../units/13/README.md) · [Next: Compute IDs and Indices](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
