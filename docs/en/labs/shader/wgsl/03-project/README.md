# WGSL · 28 Compute and Boundaries

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Numeric Verification and Kernel Design · Editable example · Storage ID: `wgsl-03`

## Goals and learning outcomes

- Apply a boundary strategy for each kernel.
- Verify layout, synchronization, and numeric correctness together.

## Prerequisites

Continue using the output and records from Unit 27. Before experimenting with Compute and Boundaries, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Combining Boundary Strategies

Logical element counts may differ from invocation counts. Apply early return for independent kernels separately from neutral-value participation in cooperative kernels.

### Combining Verification

Check correctness through the final element, partial workgroups, and repeated execution. Even with correct barriers and memory layout, incorrect formulas need separate CPU comparisons.

## Practice setup

The existing wgsl-03 preview is a starting point. It does not replace implementation or verification of the full subsequent assignment. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Run map, reduction, and stencil at lengths 1, 65, and 1003, and compare with CPU references.
2. Mark pre-access checks in independent kernels and all-lane barrier participation in reduction in the source.
3. In report.md, collect the final element, sentinel, maximum error, total latency, and device information, then judge the completion criteria.

## Variables to observe

| Variable      | Baseline       | Change      | Expected change / hypothesis                                                                          |
| ------------- | -------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| Element count | Multiple of 64 | 65 and 1003 | Correct handling of extra lanes is expected to produce CPU-matching results without missing elements. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Results and final-element checks are recorded for three kernels and three lengths.
- [ ] Synchronization paths contain neither nonuniform barriers nor wait loops between groups.

## Self-check

1. Why does copying a bounds return directly into reduction cause failure?
2. What must be saved for reproduction besides matching results?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../src/labs/wgsl-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Uses an actual WebGPU pipeline and requires a supported GPU and browser. Unsupported environments display guidance. Check WGSL errors with the GPU compiler.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Documenting Kernel Contracts](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
