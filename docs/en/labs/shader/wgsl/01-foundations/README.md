# WGSL · 01 Types and Entry Points

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Types and Shader Interfaces · Editable example · Storage ID: `wgsl-01`

## Goals and learning outcomes

- Write the input and output contract for each stage.
- Diagnose interface errors.

## Prerequisites

WebGPU buffers and pipelines, and vector operations

## Key concepts and explanations

### Stage Contracts

@vertex, @fragment, and @compute specify the shader stage in which a function runs. Each stage permits different inputs, outputs, and builtins.

### Identifying Inputs and Outputs

@location specifies an interface location for user data, while @builtin passes a system-defined value. These attributes cannot be interchanged by simply renaming them.

## Practice setup

The existing wgsl-01 preview is a starting point. It does not replace implementation or verification of the full subsequent assignment. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In shader.wgsl, write an @vertex function that generates triangle positions using vertex_index.
2. Return @builtin(position) and a @location(0) color in a structure, and receive them in the fragment stage.
3. Introduce a location type mismatch, inspect getCompilationInfo and pipeline errors, and restore the correct types.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Color location | 0 on both sides | 1 in fragment only | A mismatch is expected to appear during stage linkage validation. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Explain builtin and location inputs in two items each.
- [ ] Distinguish diagnostics for valid source from diagnostics for erroneous source.

## Self-check

1. Can the position builtin be replaced with an ordinary location?
2. How does vertex_index differ from vertex buffer attributes?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../src/labs/wgsl-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Uses an actual WebGPU pipeline and requires a supported GPU and browser. Unsupported environments display guidance. Check WGSL errors with the GPU compiler.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Literals and Explicit Numeric Types](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
