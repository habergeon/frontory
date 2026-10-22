# WGSL · 05 Function and Structure Contracts

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Types and Shader Interfaces · Editable example · Storage ID: `wgsl-step-05`

## Goals and learning outcomes

- Create computation functions with explicit types.
- Distinguish the purposes of structures.

## Prerequisites

Continue using the output and records from Unit 4. Before experimenting with Function and Structure Contracts, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Separating Functions

Separating pure computation functions makes it easier to verify the same mathematics in vertex and compute stages. Declare concrete input and return types.

### Structures

Structures group related fields, but stage attributes and memory conventions depend on where a structure is used. Do not assume a screen input/output structure is also a storage structure.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In functions.wgsl, write wave(x,time,amplitude) and a result structure.
2. Pass five x inputs to the function from a compute entry point and output the results.
3. Use the same function for vertex displacement, then compare the numeric output and maximum displacement.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Amplitude | 0.1 | 0.3 | The wavelength is expected to remain unchanged while maximum displacement triples. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The CPU and WGSL function values differ by no more than 1e-5 for five inputs.
- [ ] Separate the inputs of stage functions and pure computation functions.

## Self-check

1. Should stage attributes be attached to ordinary computation function arguments?
2. Does splitting functions always increase GPU call overhead?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Const, Let, Var, and Override](../04/README.md) · [Next: Conditions, Loops, and Termination](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
