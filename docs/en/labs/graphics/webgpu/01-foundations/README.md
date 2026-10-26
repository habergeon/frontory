# WebGPU · 01 Adapter·Device·Pipeline

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Device and Command Fundamentals · Editable example · Storage ID: `webgpu-01`

## Goals and learning outcomes

- Check support requirements.
- Handle initialization failure as a recoverable state.

## Prerequisites

TypedArray, asynchronous JavaScript, and the WebGL pipeline

## Key concepts and explanations

### Support Requirements

WebGPU requires both a secure context and browser and device support. Even when navigator.gpu exists, the adapter request can return null.

### Initialization

Obtain a device from the adapter, then create resources and pipelines with that device. Handle initialization failure as an on-screen state before starting the render loop.

## Practice setup

The existing webgpu-01 preview is a starting point. It does not replace implementation or validation of the entire subsequent assignment. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In main.js, check isSecureContext and navigator.gpu and display the status.
2. Call requestAdapter and requestDevice in order and record the reason for failure.
3. Separate normal, missing-API, and adapter-null cases into injectable functions and check each screen output.

## Variables to observe

| Variable         | Baseline     | Change      | Expected change / hypothesis                                                            |
| ---------------- | ------------ | ----------- | --------------------------------------------------------------------------------------- |
| Adapter response | Valid object | Inject null | An unsupported-environment message is expected instead of an exception or blank screen. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Display a status string in all three initialization branches.
- [ ] Create device resources only after success.

## Self-check

1. Which failures does checking API presence alone miss?
2. How do a secure context and device support differ?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../src/labs/webgpu-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Uses an actual WebGPU pipeline and requires a supported GPU and browser. Unsupported environments display guidance. Check WGSL errors with the GPU compiler.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Negotiating Features and limits](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
