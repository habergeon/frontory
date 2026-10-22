# WGSL · 19 Atomics and Counters

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Parallel Computation and Synchronization · Editable example · Storage ID: `wgsl-step-19`

## Goals and learning outcomes

- Implement an atomic counter.
- Explain the scope of atomic guarantees.

## Prerequisites

Continue using the output and records from Unit 18. Before experimenting with Atomics and Counters, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Atomic Operations

atomicAdd handles conflicting updates to the same location atomically. This alone does not establish consistent state across multiple fields or create a global barrier.

### Integer Constraints

Ordinary WGSL atomics use specified integer types and address spaces. Do not simply replace a floating-point sum with atomic<f32>.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In atomic.wgsl, declare a storage atomic<u32> counter.
2. Use atomicAdd to count only positive elements, and initialize the counter to 0 before each run.
3. Run the same input five times and compare with the CPU count.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Positive fraction | Half | All positive | The counter value and contention for updates to the same address are expected to increase. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] All five runs exactly match the CPU count.
- [ ] The previous run's counter value does not accumulate into the next result.

## Self-check

1. How can the return value of atomicAdd be used to allocate IDs?
2. Does atomic counter ordering guarantee the original input order?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Barriers and Uniform Control Flow](../18/README.md) · [Next: Partial-Sum Reduction](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
