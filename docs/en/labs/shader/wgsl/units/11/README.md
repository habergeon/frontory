# WGSL · 11 Matrix and Array Strides

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Declarations and Memory Layout · Editable example · Storage ID: `wgsl-step-11`

## Goals and learning outcomes

- Calculate matrix column layouts.
- Verify array strides.

## Prerequisites

Continue using the output and records from Unit 10. Before experimenting with Matrix and Array Strides, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Matrix Layout

mat3x3f stores three vec3f columns at aligned intervals. Although there are nine values, its storage layout differs from a simple contiguous 36-byte array.

### Array Spacing

An array element's stride is its size rounded up to its alignment. Use the same stride when moving to the next element on the CPU.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In matrix-layout.md, record mat3x3f column offsets 0, 16, and 32 and size 48.
2. Write two matrices with a 48-byte stride and multiply each by a different vector.
3. Compare normal readback results with a case incorrectly written at 36-byte intervals.

## Variables to observe

| Variable      | Baseline | Change                      | Expected change / hypothesis                                                   |
| ------------- | -------- | --------------------------- | ------------------------------------------------------------------------------ |
| Matrix stride | 48 bytes | Incorrectly assume 36 bytes | The second matrix and the values in each column are expected to be misaligned. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record padding for the three columns and starting positions of the two elements.
- [ ] The results for two nonsymmetric matrices match the CPU reference.

## Self-check

1. Which padding errors can be missed if you test only mat4x4f?
2. Are array stride and dynamic binding offset the same value?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Scalar and Vector Alignment](../10/README.md) · [Next: Additional Uniform Layout Constraints](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
