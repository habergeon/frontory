# WGSL · 09 Groups, Bindings, and Host Connections

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Declarations and Memory Layout · Editable example · Storage ID: `wgsl-step-09`

## Goals and learning outcomes

- Connect resource locations to the host.
- Trace binding validation errors.

## Prerequisites

Continue using the output and records from Unit 8. Before experimenting with Groups, Bindings, and Host Connections, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Resource Locations

@group and @binding specify resource connection locations in the shader. Even with matching numbers, texture, sampler, and buffer types must satisfy the host contract.

### Minimum Size

A buffer binding must contain enough data for the shader to read. Check both the bind group layout's minimum size and the actual binding range.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In bindings.wgsl, declare a color uniform in group 0 and a storage array in group 1.
2. In host.js, write two bind group layouts and the corresponding resources.
3. Use error scopes to check cases with an incorrect binding number, visibility, or buffer type, one at a time.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Binding number | 0 on both sides | 1 on the host only | Validation is expected to fail because the resource connections do not match. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Create a correspondence table between shader declarations and host descriptors.
- [ ] Distinguish three error types and restore the correct values.

## Self-check

1. Does a group number represent a memory address?
2. Does automatic layout remove validation of shader and resource types?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Address Spaces and Access Modes](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
