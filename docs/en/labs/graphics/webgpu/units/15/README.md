# WebGPU · 15 A First Compute Array Transform

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Compute and Data Movement · Editable example · Storage ID: `webgpu-step-15`

## Goals and learning outcomes

- Implement independent-element compute.
- Handle dispatch boundaries.

## Prerequisites

Continue using the output and notes from unit 14. Preserve the previous inputs and reference outputs before starting "A First Compute Array Transform".

## Key concepts and explanations

### Parallel Indices

global_invocation_id can identify the element to process. Dispatch size depends on both element count and workgroup size.

### Bounds Checks

The final workgroup may contain more invocations than actual data elements. In independent-element kernels, check the length before accessing data.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In compute.wgsl, write a kernel that doubles each input array element.
2. Create two storage buffers and a compute pipeline, and dispatch ceil(N/64) workgroups.
3. Use N=65 and copy the output to a staging buffer to check through the last element.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Array length | 64 | 65 | Only one element in the second workgroup is expected to perform a valid calculation. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] All 65 results match the CPU doubling results.
- [ ] Exclude invocations beyond the length before buffer access.

## Self-check

1. Does dispatchWorkgroups take an element count?
2. Does adding a barrier require reviewing early-return conditions?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Buffers and Render Passes](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
