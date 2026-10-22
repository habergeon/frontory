# WebGPU · 26 Workgroup Size Experiments

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Recovery, Measurement, and an Integrated Project · Editable example · Storage ID: `webgpu-step-26`

## Goals and learning outcomes

- Compare kernel configurations within limits.
- Measure costs while preserving correctness.

## Prerequisites

Continue using the output and notes from unit 25. Preserve the previous inputs and reference outputs before starting "Workgroup Size Experiments".

## Key concepts and explanations

### Configuration Constraints

Workgroup size must satisfy both device limits and the shader declaration. Larger sizes are not always faster.

### Fair Comparison

Compare identical inputs, operations, and readback policies. Changing the algorithm along with kernel configuration makes causes hard to isolate.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tuning.js, prepare 32·64·128-lane kernel variants and check limits.
2. Run the same N=1003 input with each configuration.
3. After checking correctness, save five end-to-end latency runs and the list of supported configurations.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Workgroup size | 64 | 32 and 128 | Execution efficiency is expected to depend on the device, while all configurations should produce the same results. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] All three configurations pass the CPU reference through the last element.
- [ ] Skip unsupported configurations and record why.

## Self-check

1. How does a larger workgroup affect shared-memory use?
2. Is it appropriate to fix one device's optimum as the default?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: CPU References and Error Budgets](../25/README.md) · [Next: Acceptance of the Integrated Particle Experiment](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
