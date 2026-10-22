# WGSL · 17 Workgroup Memory and Cooperation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Parallel Computation and Synchronization · Editable example · Storage ID: `wgsl-step-17`

## Goals and learning outcomes

- Initialize shared memory.
- Implement cooperation within a group.

## Prerequisites

Continue using the output and records from Unit 16. Before experimenting with Workgroup Memory and Cooperation, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Shared Data

A workgroup array is used for cooperation among invocations in that group. It can reduce repeated reads from global storage.

### Initialization and Use

Each lane's value must be ready before another lane reads it. Inactive lanes in partial groups also write neutral values and participate in synchronization.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In shared.wgsl, declare var<workgroup> tile:array<f32,64>.
2. Write input values for valid lanes and 0 for the others, then read neighboring values after workgroupBarrier.
3. For length 65, compare outputs at group boundaries with the CPU reference.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Extra lane value | Initialize to 0 | Use non-neutral 1 | Incorrect values are expected to enter partial-group sums or averages. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Every lane reaches the shared array write and barrier.
- [ ] Padding values are not incorrectly included in partial-group outputs.

## Self-check

1. Is the neighbor at the end of a group the same as the first element of the next group?
2. Which device limit constrains shared memory usage?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Bounds Checks and Empty Input](../16/README.md) · [Next: Barriers and Uniform Control Flow](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
