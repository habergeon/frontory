# WGSL · 21 Ping-pong and Data Races

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Parallel Computation and Synchronization · Editable example · Storage ID: `wgsl-step-21`

## Goals and learning outcomes

- Avoid data races.
- Separate state for each time step.

## Prerequisites

Continue using the output and records from Unit 20. Before experimenting with Ping-pong and Data Races, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Neighbor Reads

Computation that reads each element's neighbors from the previous state can conflict with in-place updates. Separate input and output arrays to avoid depending on execution order.

### Time Steps

One dispatch transforms the state at one time into the next state. Swap the roles of the two buffers for the next dispatch.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In stencil.wgsl, write a function that stores the average of previous left and right neighbors in a new array.
2. Alternate A→B and B→A bindings on the host.
3. Compare three steps with a CPU implementation that copies state, and specify the endpoint policy.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Endpoint handling | Fixed boundaries | Periodic boundaries | Propagation at the two ends of the array is expected to differ. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] All elements in the three steps stay within the CPU reference error tolerance.
- [ ] Verify that the input and output bindings refer to different resources.

## Self-check

1. Do atomics preserve the neighbors' previous state?
2. How does independent x*=2 differ from averaging neighbors?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Partial-Sum Reduction](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
