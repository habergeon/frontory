# WebGPU · 21 Instancing and Data Structures

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Compute and Data Movement · Editable example · Storage ID: `webgpu-step-21`

## Goals and learning outcomes

- Build instanced rendering.
- Distinguish call count from processing volume.

## Prerequisites

Continue using the output and notes from unit 20. Preserve the previous inputs and reference outputs before the Instancing and Data Structures experiment.

## Key concepts and explanations

### Instances

When drawing the same base shape repeatedly, instance indices can retrieve individual data. Draw-call count and screen fragment count are different costs.

### Array Structure

AoS and SoA differ in management and access patterns depending on data access. Measure structural benefits in the actual kernel.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In instance.wgsl, read position and color storage arrays using instance_index.
2. Draw a small quad as 256 instances in one draw.
3. Record draw counts and frame intervals for 64·256·512 particles.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Instance count | 64 | 512 | The draw count is expected to stay the same while vertex and fragment processing increases. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] There is one draw call at all three counts.
- [ ] Check four markers to confirm each instance reads its own position and color.

## Self-check

1. Does one draw call imply constant rendering cost?
2. Which is always faster, AoS or SoA?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Rendering Compute Results](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
