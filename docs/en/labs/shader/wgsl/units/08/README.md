# WGSL · 08 Address Spaces and Access Modes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Declarations and Memory Layout · Editable example · Storage ID: `wgsl-step-08`

## Goals and learning outcomes

- Choose address spaces.
- Respect resource access permissions.

## Prerequisites

Continue using the output and records from Unit 7. Before experimenting with Address Spaces and Access Modes, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Address Spaces

function, private, workgroup, uniform, and storage determine value lifetimes and sharing scopes. Even similar-looking names have different sets of invocations that can access them.

### Write Permissions

Writing to a uniform or read-only storage violates its contract. Specify storage read or read_write access according to the actual operation.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In spaces.wgsl, declare a read-only uniform, read storage, and a read_write output.
2. Add comments distinguishing a function-local accumulator from a private variable.
3. Create an error by writing to a read-only input, then restore the code by writing to the output.

## Variables to observe

| Variable     | Baseline | Change                        | Expected change / hypothesis                                                    |
| ------------ | -------- | ----------------------------- | ------------------------------------------------------------------------------- |
| Input access | read     | Attempt to write to the input | Validation or shader diagnostics are expected to reveal the contract violation. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Tabulate the sharing scopes of the five address spaces.
- [ ] Write results to a separate output without changing the read-only input.

## Self-check

1. Is a private variable shared by all invocations?
2. Can workgroup memory be used in the same way in the fragment stage?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Interpolation and Stage Interfaces](../07/README.md) · [Next: Groups, Bindings, and Host Connections](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
