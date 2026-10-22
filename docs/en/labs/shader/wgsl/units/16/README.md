# WGSL · 16 Bounds Checks and Empty Input

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Parallel Computation and Synchronization · Editable example · Storage ID: `wgsl-step-16`

## Goals and learning outcomes

- Handle bounds in independent kernels.
- Define empty input explicitly.

## Prerequisites

Continue using the output and records from Unit 15. Before experimenting with Bounds Checks and Empty Input, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Extra Lanes

Dispatch works in workgroups, so the invocation count may exceed the input length. Kernels that process independent elements check bounds before access.

### Empty Work

The CPU path can skip submission for input of length 0. Handle minimum physical buffer size separately from the logical element count.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In bounds.wgsl, write an independent computation kernel that returns when id.x>=count.
2. On the host, add a branch that skips dispatch when count=0.
3. Run lengths 0, 1, 63, 64, and 65, and check the final element and canary region.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Length | 64 | 65 | An additional workgroup with one valid lane is expected to be needed. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] All five lengths match the CPU reference.
- [ ] Empty input is marked as submission skipped, and canary values are preserved.

## Self-check

1. Can this return be copied unchanged into a kernel with barriers?
2. Why is an algorithm fragile if it depends on out-of-bounds read results?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Compute IDs and Indices](../15/README.md) · [Next: Workgroup Memory and Cooperation](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
