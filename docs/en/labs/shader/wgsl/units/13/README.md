# WGSL · 13 Runtime Arrays and Binding Ranges

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Declarations and Memory Layout · Editable example · Storage ID: `wgsl-step-13`

## Goals and learning outcomes

- Declare runtime arrays.
- Distinguish binding ranges from logical lengths.

## Prerequisites

Continue using the output and records from Unit 12. Before experimenting with Runtime Arrays and Binding Ranges, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Runtime Length

The length of a runtime-sized storage array depends on the actual binding range and stride. Do not mistake the entire buffer capacity for the logical data length.

### Declaration Position

Place runtime arrays only in permitted storage declaration positions. When using a structure, keep the runtime array as its last member.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In runtime.wgsl, write a storage structure with array<f32> as the final member after a header.
2. Output the length visible through arrayLength and a separate logicalCount.
3. Keep the buffer capacity unchanged, reduce the bindGroup size, and compare the visible lengths.

## Variables to observe

| Variable      | Baseline     | Change         | Expected change / hypothesis                                    |
| ------------- | ------------ | -------------- | --------------------------------------------------------------- |
| Binding range | Entire array | Half the range | arrayLength is expected to decrease to match the exposed range. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Calculate the required binding size from the header offset and array stride.
- [ ] The host rejects input whose logical length exceeds the accessible length.

## Self-check

1. Can the shader always access extra space in a buffer?
2. Can another member follow a runtime array?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Additional Uniform Layout Constraints](../12/README.md) · [Next: Bindings and Memory Layout](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
