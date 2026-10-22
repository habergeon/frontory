# WebGPU · 02 Negotiating Features and limits

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Device and Command Fundamentals · Editable example · Storage ID: `webgpu-step-02`

## Goals and learning outcomes

- Negotiate device features.
- Write input checks based on limits.

## Prerequisites

Continue using the output and notes from unit 1. Preserve the previous inputs and reference outputs before the Negotiating Features and limits experiment.

## Key concepts and explanations

### Optional Features

Not every adapter provides the same optional features. Check the supported list before requesting a feature you need.

### Limits

Resource sizes and binding counts have device limits. Restrict inputs according to device.limits instead of guessing large values.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In capabilities.js, display only the required adapter.features and limits entries in a table.
2. Write a requestDevice descriptor that distinguishes required and optional features.
3. Disable unsupported optional features and validate the maximum buffer-size input.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Optional feature | Disabled | Request after checking support | The feature is expected to be enabled only on supported devices, with the default path retained elsewhere. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] State required and optional features separately.
- [ ] Reject inputs exceeding limits before creating resources.

## Self-check

1. Why distinguish adapter limits from requested device limits?
2. Must an optional-feature failure shut down the entire app?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Adapter·Device·Pipeline](../../01-foundations/README.md) · [Next: Canvas Configuration and the Current Texture](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
