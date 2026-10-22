# WebGPU · 16 Storage and Ping-Pong

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Compute and Data Movement · Editable example · Storage ID: `webgpu-step-16`

## Goals and learning outcomes

- Separate input and output states.
- Manage data dependencies in repeated computation.

## Prerequisites

Continue using the output and notes from unit 15. Preserve the previous inputs and reference outputs before the Storage and Ping-Pong experiment.

## Key concepts and explanations

### Write Conflicts

Reading neighboring values while updating the same array can make results depend on execution order. Separate input and output ping-pong buffers preserve the previous state.

### Swapping Steps

After one step, swap the read and write roles for the next. Two bind groups can be created beforehand and alternated.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In simulation.wgsl, write a kernel that outputs the average of three neighboring values.
2. Create A→B and B→A bind groups and alternate them each step.
3. Compare three steps with CPU calculations using separate input and output arrays.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input and output resources | Separate A/B | Conceptually review reading and writing the same array | The same-array approach is expected to have possible order dependence and will not be used as the reference. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The maximum error over three steps is within the chosen 1e-5 tolerance.
- [ ] Record each step's read and write buffer ids.

## Self-check

1. Can independent-element updates write in place?
2. Does workgroupBarrier guarantee the previous state of another workgroup?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: A First Compute Array Transform](../15/README.md) · [Next: Mapping and Staging Buffers](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
