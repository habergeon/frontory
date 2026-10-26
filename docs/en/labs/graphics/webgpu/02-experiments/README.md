# WebGPU · 14 Buffers and Render Passes

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Render Resources and Display Configuration · Editable example · Storage ID: `webgpu-02`

## Goals and learning outcomes

- Integrate the rendering path.
- Diagnose and recover from validation failures.

## Prerequisites

Continue using the output and notes from unit 13. Preserve the previous inputs and reference outputs before the Buffers and Render Passes experiment.

## Key concepts and explanations

### Integrated Path

CPU arrays become shader inputs through buffers and bindings. A render pass combines output attachments with pipeline and draw state.

### Error Scope

Place an error scope around operations that may fail validation. Record descriptors and messages together rather than hiding errors.

## Practice setup

The existing webgpu-02 preview is a starting point. It does not replace implementation or validation of the entire subsequent assignment. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In renderer.js, combine vertex, color-uniform, attachment, and draw paths into one function.
2. After pushErrorScope('validation'), create a minimal case using a buffer with incorrect usage and display the popErrorScope result.
3. Restore the usage, change color and resolution inputs, and rerun the same rendering path.

## Variables to observe

| Variable     | Baseline          | Change        | Expected change / hypothesis                                                                |
| ------------ | ----------------- | ------------- | ------------------------------------------------------------------------------------------- |
| buffer usage | UNIFORM\|COPY_DST | COPY_DST only | Uniform-binding validation is expected to fail, with color updates resuming after recovery. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Explain the five links from the CPU color value to screen output.
- [ ] Record the intentional validation error and recover normal rendering.

## Self-check

1. Where do pass settings and pipeline settings meet?
2. Does a successful submit alone guarantee rendering correctness?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../src/labs/webgpu-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Uses an actual WebGPU pipeline and requires a supported GPU and browser. Unsupported environments display guidance. Check WGSL errors with the GPU compiler.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Resize and Sample Count](../units/13/README.md) · [Next: A First Compute Array Transform](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
