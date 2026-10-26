# WGSL · 03 Creating and Multiplying Vectors and Matrices

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Types and Shader Interfaces · Editable example · Storage ID: `wgsl-step-03`

## Goals and learning outcomes

- Write vector and matrix operations.
- Verify the matrix storage convention.

## Prerequisites

Continue using the output and records from Unit 2. Before experimenting with Creating and Multiplying Vectors and Matrices, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Vector Construction

vec2f, vec3f, and vec4f group components for computation. Distinguish the rules for reading and writing swizzles.

### Matrix Semantics

WGSL matrices consist of column vectors. The column order written by the CPU must match the shader's matrix multiplication for the intended transformation.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In math.wgsl, create functions that output vector construction, swizzle, and dot results.
2. Choose the two columns of a mat2x2f and a vec2f input, and calculate their product by hand.
3. Use readback to compare results from the correct input and an input with the CPU array order changed.

## Variables to observe

| Variable       | Baseline             | Change                              | Expected change / hypothesis                                             |
| -------------- | -------------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| Matrix columns | Correct column order | Array with rows and columns swapped | A nonsymmetric matrix is expected to produce a different transformation. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record expected values for four vector and matrix operations.
- [ ] The GPU result for a nonsymmetric matrix matches the hand calculation.

## Self-check

1. Why is it difficult to find row and column errors using only diagonal matrices?
2. What are the return types of vector multiplication and dot?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Literals and Explicit Numeric Types](../02/README.md) · [Next: Const, Let, Var, and Override](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
