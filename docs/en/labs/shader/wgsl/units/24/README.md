# WGSL · 24 Numeric Stability and Special Inputs

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Numeric Verification and Kernel Design · Editable example · Storage ID: `wgsl-step-24`

## Goals and learning outcomes

- Handle unstable inputs.
- Verify errors across input scales.

## Prerequisites

Continue using the output and records from Unit 23. Before experimenting with Numeric Stability and Special Inputs, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Unstable Operations

Normalizing a vector of length 0 or dividing by a small number can produce unstable results. Check valid ranges and define meaningful fallback values.

### Algorithmic Stability

Mathematically equivalent expressions can produce different floating-point errors. Compare different input scales rather than checking only whether results are close.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In numeric.wgsl, write a function that uses a fallback direction when squared length is below a threshold.
2. Compare vectors with 0, 1e-8, 1, and large coordinates against the CPU reference.
3. Reject NaN or infinite inputs on the host and record their failure locations.

## Variables to observe

| Variable      | Baseline | Change     | Expected change / hypothesis                                                            |
| ------------- | -------- | ---------- | --------------------------------------------------------------------------------------- |
| Vector length | 1        | 0 and 1e-8 | The chosen fallback direction is expected to be used instead of the normalization path. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The outputs for four valid inputs are finite and follow the rules.
- [ ] Invalid inputs are rejected before GPU submission with their field locations.

## Self-check

1. Can one small epsilon be used for every unit of measurement?
2. How does a small error differ from algorithmic stability?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Storage Texture Output](../23/README.md) · [Next: Kernel Tests and Sentinels](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
