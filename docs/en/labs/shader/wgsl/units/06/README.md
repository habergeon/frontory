# WGSL · 06 Conditions, Loops, and Termination

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Types and Shader Interfaces · Editable example · Storage ID: `wgsl-step-06`

## Goals and learning outcomes

- Write explicit control flow.
- Maintain safe access conditions.

## Prerequisites

Continue using the output and records from Unit 5. Before experimenting with Conditions, Loops, and Termination, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Control Flow

if, switch, for, and loop express computation paths and iteration counts. Set an upper bound when connecting termination conditions to inputs to prevent unexpectedly long work.

### Branch Semantics

select is different from an ordinary short-circuiting if. Do not hide unsafe memory access in one of select's arguments.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In flow.wgsl, write an accumulating for loop with an upper bound of 8 and a mode switch.
2. Use if to branch before buffer access when the length is insufficient.
3. Compare the results for two modes and iteration counts 0, 1, and 8 with a CPU function.

## Variables to observe

| Variable        | Baseline | Change | Expected change / hypothesis                                                                             |
| --------------- | -------- | ------ | -------------------------------------------------------------------------------------------------------- |
| Iteration count | 1        | 8      | The accumulated result and workload are expected to increase; 0 is expected to return the initial value. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The results for six combinations match the CPU reference.
- [ ] Array bounds checks do not depend on select argument evaluation.

## Self-check

1. Can you assume that only one of the two expressions in select is evaluated?
2. What problems arise if loop termination depends only on external data?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Function and Structure Contracts](../05/README.md) · [Next: Interpolation and Stage Interfaces](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
