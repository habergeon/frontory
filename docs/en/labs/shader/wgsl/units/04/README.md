# WGSL · 04 Const, Let, Var, and Override

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Types and Shader Interfaces · Editable example · Storage ID: `wgsl-step-04`

## Goals and learning outcomes

- Choose declarations that match value lifetimes.
- Distinguish pipeline constants from runtime inputs.

## Prerequisites

Continue using the output and records from Unit 3. Before experimenting with Const, Let, Var, and Override, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Mutability

const and let express values that are not reassigned, but differ in evaluation time. Use var for state that changes during function execution.

### Pipeline Constants

override defines a value that can be supplied when creating a pipeline. A resource such as a uniform is more suitable than override for inputs that change every frame.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In constants.wgsl, distinguish a const coefficient, a let intermediate value, and a var accumulator.
2. Set override SCALE to 1 and 2 through pipeline constants.
3. Inspect a let reassignment error and move per-frame color input into a uniform.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| SCALE | 1 | Create a pipeline with 2 | The pipeline's result is expected to double, with a lifetime different from a uniform update. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Tabulate when the four declarations are evaluated and can change.
- [ ] Record the results for two pipeline constants and the let reassignment error.

## Self-check

1. Why does changing override require a different pipeline configuration?
2. Which declaration suits a value that stays unchanged during a function call?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Creating and Multiplying Vectors and Matrices](../03/README.md) · [Next: Function and Structure Contracts](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
