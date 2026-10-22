# WGSL · 02 Literals and Explicit Numeric Types

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Types and Shader Interfaces · Editable example · Storage ID: `wgsl-step-02`

## Goals and learning outcomes

- Choose numeric types.
- Make type conversions explicit.

## Prerequisites

Continue using the output and records from Unit 1. Before experimenting with Literals and Explicit Numeric Types, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Abstract Numbers

A literal without a fixed type can resolve to a concrete type according to its context. Make the intended f32, i32, or u32 explicit at variable and function boundaries.

### Conversions

Signed and unsigned integers have different ranges and operation semantics. Make conversions between indices and computed values explicit to avoid interpreting values unexpectedly.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In types.wgsl, write i32, u32, and f32 variables and explicit conversion functions.
2. Record positive, negative, and fractional inputs in a small compute output buffer.
3. Create an error case that directly adds different concrete types, then compare the results after conversion.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input type | i32(3) | f32(3.5) | The fractional part of the result and the available conversions are expected to differ. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Tabulate the ranges and uses of the three types.
- [ ] Record the mixed-type error and three values after correction.

## Self-check

1. Can converting a negative value to u32 replace input validation?
2. How does type resolution differ for the literals 1 and 1u?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Types and Entry Points](../../01-foundations/README.md) · [Next: Creating and Multiplying Vectors and Matrices](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
