# WebGPU · 09 Uniform Struct Alignment

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Render Resources and Display Configuration · Editable example · Storage ID: `webgpu-step-09`

## Goals and learning outcomes

- Match host and shader layouts.
- Distinguish the two alignment rules.

## Prerequisites

Continue using the output and notes from unit 8. Preserve the previous inputs and reference outputs before the Uniform Struct Alignment experiment.

## Key concepts and explanations

### Internal Layout

WGSL struct member alignment and size determine the CPU byte layout. A vec3f alignment of 16 and size of 12 are different concepts.

### Binding Offset

Struct member alignment and dynamic uniform offset limits are separate rules. Dynamic offsets must follow the device's minimum alignment.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In layout.md, calculate offsets 0·12 and size 16 for a struct containing color:vec3f, gain:f32.
2. Write color and gain separately with DataView and check the output color.
3. When creating two struct slots, round the slot stride up using minUniformBufferOffsetAlignment.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| gain offset | 12 | Intentionally write at 16 | The gain read by the shader is expected to remain unchanged, exposing the layout error. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Provide a table of member offsets, sizes, and alignments.
- [ ] With the correct layout, the two slots' colors and gain values do not mix.

## Self-check

1. Does placing f32 after vec3 always require 4 bytes of padding?
2. Can dynamic offset alignment be treated as equal to struct size?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Uniforms and Bind Groups](../08/README.md) · [Next: Matrices and Cameras](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
