# WGSL · 12 Additional Uniform Layout Constraints

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Declarations and Memory Layout · Editable example · Storage ID: `wgsl-step-12`

## Goals and learning outcomes

- Design uniform-compatible layouts.
- Reflect explicit padding in the host.

## Prerequisites

Continue using the output and records from Unit 11. Before experimenting with Additional Uniform Layout Constraints, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Uniform Rules

Additional layout constraints may apply to arrays and nested structures in the uniform address space. For a baseline compatible path, design array spacing in units of 16 bytes and check the rules actually supported.

### Explicit Padding

Matching padding declarations in the host and shader can produce a compatible layout. @size and @align do not automatically create the host bytes.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In uniform-array.wgsl, write an Element structure with a @size(16) value:f32 member and a fixed-size array.
2. In host.js, use DataView to place each value 16 bytes apart.
3. Compare readback results and diagnostics for a tightly packed 4-byte array and a compatible layout.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Element spacing | 16 bytes | Incorrectly write at 4-byte intervals | Values are expected to be incorrect because the element positions differ from those expected by the shader. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Specify offsets 0, 16, 32, and 48 for four elements.
- [ ] The four values update independently in the compatible layout.

## Self-check

1. Can storage and uniform arrays be assumed to have the same layout?
2. What problems arise if you change baseline rules without checking language extension support?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Matrix and Array Strides](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
