# WebGPU · 05 Shader Modules and Diagnostics

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Device and Command Fundamentals · Editable example · Storage ID: `webgpu-step-05`

## Goals and learning outcomes

- Display shader diagnostics.
- Distinguish module errors from pipeline errors.

## Prerequisites

Continue using the output and notes from unit 4. Preserve the previous inputs and reference outputs before the Shader Modules and Diagnostics experiment.

## Key concepts and explanations

### Module Diagnostics

WGSL syntax and type errors can be checked through the shader module's compilation info. Connect error line positions to the source.

### Pipeline Validation

Even a valid module can fail pipeline creation when its entry point or target contract does not match. Record compilation and pipeline validation separately.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Write minimal vertex and fragment functions in shader.wgsl.
2. Use getCompilationInfo to display messages and lineNum in the UI.
3. Introduce a typo and an incorrect entryPoint separately, then restore the code and display a triangle.

## Variables to observe

| Variable    | Baseline               | Change                    | Expected change / hypothesis                                                    |
| ----------- | ---------------------- | ------------------------- | ------------------------------------------------------------------------------- |
| Entry point | Existing function name | Nonexistent function name | The pipeline stage is expected to fail even if the module passes syntax checks. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record syntax errors and entry point errors separately.
- [ ] The triangle reappears after restoring the original source.

## Self-check

1. Why can a pipeline fail when the module has no errors?
2. How can asynchronous diagnostics be prevented from overwriting new-code messages with old ones?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Recording and Submitting Commands](../04/README.md) · [Next: Vertex Buffers and Attributes](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
