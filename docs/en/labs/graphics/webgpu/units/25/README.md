# WebGPU · 25 CPU References and Error Budgets

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Recovery, Measurement, and an Integrated Project · Editable example · Storage ID: `webgpu-step-25`

## Goals and learning outcomes

- Write a CPU reference.
- Judge numerical error explicitly.

## Prerequisites

Continue using the output and notes from unit 24. Preserve the previous inputs and reference outputs before the CPU References and Error Budgets experiment.

## Key concepts and explanations

### Floating Point

CPU JavaScript number and GPU f32 operations have different precision. Summation with a different association order can produce small errors.

### Validation Criteria

Absolute and relative error serve different roles depending on magnitude. Define tolerances and special-value handling before viewing results.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In reference.js, write a CPU particle-update function and generate fixed-seed inputs.
2. Calculate per-element absolute and relative errors against the readback result.
3. For inputs containing 0, negative, small, and large values, print the maximum error and failing indices.

## Variables to observe

| Variable         | Baseline              | Change                               | Expected change / hypothesis                                                                          |
| ---------------- | --------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Validation input | Small positive values | Mix of 0, negative, and large values | Inputs of different magnitudes are expected to expose limitations of a relative-error-only criterion. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the tolerance abs<=1e-5+1e-4*abs(reference) in advance.
- [ ] On failure, print the element index, reference value, and GPU value.

## Self-check

1. Which tasks require exactly identical bit results?
2. Can including NaN in error comparisons allow a check to pass?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: The Scope of Timing](../24/README.md) · [Next: Workgroup Size Experiments](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
