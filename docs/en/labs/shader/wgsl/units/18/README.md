# WGSL · 18 Barriers and Uniform Control Flow

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Parallel Computation and Synchronization · Editable example · Storage ID: `wgsl-step-18`

## Goals and learning outcomes

- Write uniform barrier paths.
- Distinguish synchronization scopes.

## Prerequisites

Continue using the output and records from Unit 17. Before experimenting with Barriers and Uniform Control Flow, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Reachability

workgroupBarrier must be reached collectively by the workgroup's invocations. Placing it inside a condition entered by only some lanes can violate uniformity rules.

### Scope Limits

storageBarrier is not a global execution barrier for an entire dispatch either. Split algorithms that wait for other workgroups' results into separate dispatch stages.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In barrier.wgsl, diagnose an incorrect case with a barrier inside if(valid).
2. Wrap only memory accesses in if, and move the barrier so every lane passes through it.
3. In host.js, write two passes so the next dispatch reads each group's partial results.

## Variables to observe

| Variable         | Baseline               | Change                      | Expected change / hypothesis                                                                       |
| ---------------- | ---------------------- | --------------------------- | -------------------------------------------------------------------------------------------------- |
| Barrier position | Inside a nonuniform if | A common path for all lanes | The change is expected to resolve uniformity diagnostics and synchronize partial groups correctly. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Use a diagram to explain the erroneous and corrected control flow.
- [ ] Work with dependencies between groups does not rely on wait loops in the same dispatch.

## Self-check

1. Why is an early return before a barrier dangerous?
2. Why does storageBarrier not mean global synchronization?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Workgroup Memory and Cooperation](../17/README.md) · [Next: Atomics and Counters](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
