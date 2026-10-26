# WebGPU · 20 Rendering Compute Results

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Compute and Data Movement · Editable example · Storage ID: `webgpu-step-20`

## Goals and learning outcomes

- Connect compute and render passes.
- Reduce unnecessary data round trips.

## Prerequisites

Continue using the output and notes from unit 19. Preserve the previous inputs and reference outputs before the Rendering Compute Results experiment.

## Key concepts and explanations

### Connections Within the GPU

Compute results can be rendered directly as vertex or storage input. A later pass in the same submission can consume results without CPU readback.

### Usage Declarations

Declare the usages needed for both compute writes and render reads on the buffer. State roles between passes to avoid conflicts.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In particles.js, create a position STORAGE|VERTEX|COPY_SRC|COPY_DST buffer and a velocity STORAGE|COPY_DST buffer, and write initial data with writeBuffer.
2. Update positions in the compute pass, then use them as vertex positions in the following render pass.
3. Connect readback only to a validation button and display calls per frame.

## Variables to observe

| Variable        | Baseline    | Change                        | Expected change / hypothesis                                                            |
| --------------- | ----------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| Readback policy | Every frame | Only on the validation button | The visual result is expected to remain unchanged, while CPU waiting cost may decrease. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Ordinary frames make 0 mapAsync calls.
- [ ] The validation button's position values agree with the CPU reference within tolerance.

## Self-check

1. Why does overlapping reads and writes within one pass need review?
2. Does adding a usage automatically copy data?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Workgroup Shared Memory](../19/README.md) · [Next: Instancing and Data Structures](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
