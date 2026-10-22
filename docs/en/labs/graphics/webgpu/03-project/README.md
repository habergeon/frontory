# WebGPU · 28 Compute and Readback

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Recovery, Measurement, and an Integrated Project · Editable example · Storage ID: `webgpu-03`

## Goals and learning outcomes

- Compare compute correctness and overall cost.
- Decide when to use the GPU based on evidence.

## Prerequisites

Continue using the output and notes from unit 27. Preserve the previous inputs and reference outputs before the Compute and Readback experiment.

## Key concepts and explanations

### Combined Comparison

When moving array calculations to the GPU, data movement can determine the overall benefit. Compare both the compute interval and the latency until results reach the user.

### Adoption Evidence

Input sizes where the GPU path is not faster are results too. Define conditions for use that include correctness, support coverage, and recovery costs.

## Practice setup

The existing webgpu-03 preview is a starting point. It does not replace implementation or validation of the entire subsequent assignment. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Run the final kernel and CPU function with the same seed for 65·1003·65536 elements.
2. Record end-to-end latency for three readback policies: none, once at the end, and every step.
3. In report.md, document maximum error, environment, selected workgroup, device loss recovery results, and adoption conditions.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Readback frequency | Once at the end | Every step | Results are expected to remain the same, but repeated transfer and waiting may increase end-to-end latency. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Check the error criterion through the last element at all three lengths.
- [ ] Distinguish total costs for the three readback policies from unmeasured GPU items.

## Self-check

1. For which inputs is the CPU path more suitable?
2. How do comparison conditions change if results are drawn directly on the GPU?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../src/labs/webgpu-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Acceptance of the Integrated Particle Experiment](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
