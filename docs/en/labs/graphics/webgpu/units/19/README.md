# WebGPU · 19 Workgroup Shared Memory

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Compute and Data Movement · Editable example · Storage ID: `webgpu-step-19`

## Goals and learning outcomes

- Create a shared-memory reduction.
- Maintain barrier reachability conditions.

## Prerequisites

Continue using the output and notes from unit 18. Preserve the previous inputs and reference outputs before the Workgroup Shared Memory experiment.

## Key concepts and explanations

### Sharing Scope

var<workgroup> is shared by invocations in the same workgroup. Different workgroups cannot communicate through this memory.

### Synchronization

Use workgroupBarrier to synchronize writes at that stage before reading shared values. The entire workgroup must reach the barrier in uniform control flow.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In reduce.wgsl, write a partial-sum kernel that places 64 values in a workgroup array.
2. Have out-of-range lanes write 0 and participate in the barrier too.
3. For N=65, sum the two partial sums on the CPU and compare with the full sum.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Length | 64 | 65 | Empty lanes in the second group are expected to participate with 0, producing the correct sum. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The CPU sum of 65 elements and the sum of GPU partial sums agree within tolerance.
- [ ] There is no path where only some lanes return before the barrier.

## Self-check

1. Does a barrier synchronize the entire dispatch?
2. Why fill out-of-range lanes with 0?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Copy Alignment and Texture Rows](../18/README.md) · [Next: Rendering Compute Results](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
