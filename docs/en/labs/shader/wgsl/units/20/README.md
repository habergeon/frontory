# WGSL · 20 Partial-Sum Reduction

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Parallel Computation and Synchronization · Editable example · Storage ID: `wgsl-step-20`

## Goals and learning outcomes

- Write cooperative reductions.
- Separate computation stages across groups.

## Prerequisites

Continue using the output and records from Unit 19. Before experimenting with Partial-Sum Reduction, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Tree Computation

Reduction combines multiple elements in stages. Each stage has read and write dependencies, so align shared memory use with barrier placement.

### Multiple Stages

After obtaining partial sums for each workgroup, finish with an additional dispatch or a CPU sum. Do not wait for other groups to finish within the same dispatch.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In reduce.wgsl, write a 64-lane shared array and reduction stages 32, 16, 8, 4, 2, and 1.
2. Place a common barrier after the conditional addition in each stage.
3. Read back partial sums for 1003 inputs and compare with the CPU sum.

## Variables to observe

| Variable    | Baseline | Change | Expected change / hypothesis                                                        |
| ----------- | -------- | ------ | ----------------------------------------------------------------------------------- |
| Input count | 64       | 1003   | Multiple partial sums and the final incomplete group are expected to need handling. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The final group uses 0 padding.
- [ ] The total result meets the predefined abs/relative error criteria.

## Self-check

1. Why can changing the order of addition slightly change f32 results?
2. What breaks if the final group uses early return?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Atomics and Counters](../19/README.md) · [Next: Ping-pong and Data Races](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
