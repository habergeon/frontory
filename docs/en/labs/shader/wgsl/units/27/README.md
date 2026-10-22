# WGSL · 27 Documenting Kernel Contracts

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Numeric Verification and Kernel Design · Editable example · Storage ID: `wgsl-step-27`

## Goals and learning outcomes

- Document kernel resource contracts.
- Manage reproduction and failure states.

## Prerequisites

Continue using the output and records from Unit 26. Before experimenting with Documenting Kernel Contracts, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Input Contracts

Specify kernel types, lengths, alignment, and access permissions to preserve results when the host implementation changes. A simple function description has difficulty conveying GPU resource contracts.

### Failure Contracts

Unsupported environments, compilation failures, and device loss differ from numeric errors. Distinguish their causes and unexecuted states in the result file.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In README.md, tabulate the inputs, outputs, layout, and synchronization scopes of three kernels: map, reduction, and stencil.
2. Review an intentional shader error and the recreation procedure after device loss.
3. In a new session, run tests with the saved seed, settings, and fixtures, then export the results.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Execution start | Existing device state | Reinitialized new session | The same results are expected to be reproducible if the CPU inputs and contracts are sufficient. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The document includes synchronization scopes and access permissions for three kernels.
- [ ] Show execution results separately from unsupported and unexecuted states.

## Self-check

1. Does successful compilation guarantee numeric correctness?
2. Which test should fail first if the host layout changes?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Workgroup Configuration and Measurement](../26/README.md) · [Next: Compute and Boundaries](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
