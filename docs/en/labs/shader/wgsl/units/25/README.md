# WGSL · 25 Kernel Tests and Sentinels

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Numeric Verification and Kernel Design · Editable example · Storage ID: `wgsl-step-25`

## Goals and learning outcomes

- Build tests focused on boundaries.
- Report numeric failures with reproducible information.

## Prerequisites

Continue using the output and records from Unit 24. Before experimenting with Kernel Tests and Sentinels, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Test Fixtures

Random input alone makes boundary errors difficult to find. Create fixed cases covering empty arrays, one element, lengths around multiples, negative values, and repeated values.

### Write Range

A sentinel region after the output helps detect unintended writes. An unchanged sentinel alone does not prove all memory safety.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In cases.json, record lengths 0, 1, 63, 64, 65, and 1003 and value distributions.
2. Initialize sentinel values after the logical output range and check them after execution.
3. For each kernel, save the CPU reference, maximum error, and first failing index in report.json.

## Variables to observe

| Variable | Baseline | Change    | Expected change / hypothesis                                                                                       |
| -------- | -------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| Length   | 64       | 63 and 65 | Missing elements or range errors at boundaries are expected to appear in reference comparisons or sentinel checks. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record results and sentinel states for six lengths.
- [ ] On failure, output the expected value, actual value, and index.

## Self-check

1. Can sentinels alone detect out-of-bounds reads?
2. Why must the same random seed be saved?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Numeric Stability and Special Inputs](../24/README.md) · [Next: Workgroup Configuration and Measurement](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
