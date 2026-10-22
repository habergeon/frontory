# WGSL · 26 Workgroup Configuration and Measurement

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Numeric Verification and Kernel Design · Editable example · Storage ID: `wgsl-step-26`

## Goals and learning outcomes

- Validate kernel configuration candidates.
- Interpret results according to the measurement scope.

## Prerequisites

Continue using the output and records from Unit 25. Before experimenting with Workgroup Configuration and Measurement, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Choosing Configurations

Workgroup size changes parallel organization and shared memory usage. Create pipelines only for candidates that stay within device limits.

### Comparison Scope

Time from command submission to readback is not kernel-only time. If the GPU interval cannot be measured, label it total latency.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tune.wgsl, write override-based workgroup candidates of 32, 64, and 128.
2. Check limits on the host, then test correctness first using the same 1003 inputs.
3. After warmup, record five total-latency measurements and the shared array size in bytes.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Workgroup size | 64 | 32 and 128 | The computation results are expected to remain equal within tolerance even if costs differ by device. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Every supported candidate passes the CPU reference check.
- [ ] Record limits, shared memory, and total latency for each candidate.

## Self-check

1. Why are larger groups not always faster?
2. Can the optimal configuration change with the input length?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Kernel Tests and Sentinels](../25/README.md) · [Next: Documenting Kernel Contracts](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
