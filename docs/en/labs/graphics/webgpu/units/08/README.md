# WebGPU · 08 Uniforms and Bind Groups

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Render Resources and Display Configuration · Editable example · Storage ID: `webgpu-step-08`

## Goals and learning outcomes

- Connect resources to bindings.
- Update small inputs without recreating resources.

## Prerequisites

Continue using the output and notes from unit 7. Preserve the previous inputs and reference outputs before the Uniforms and Bind Groups experiment.

## Key concepts and explanations

### Binding Contract

A bind group connects resources to the shader's group and binding locations. Resource types and shader visibility are also part of the layout.

### Small Updates

Uniforms suit small inputs shared by many invocations. Buffer values can be updated without creating a pipeline each time.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In uniform.wgsl, declare a vec4f color uniform at binding 0.
2. In uniforms.js, create a 16-byte UNIFORM|COPY_DST buffer and a bind group.
3. Connect color sliders to queue.writeBuffer and record the number of pipelines created.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Color input | [1,0,0,1] | [0,1,0,1] | Only the triangle color is expected to change, without recreating the pipeline. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Both color inputs are reflected correctly.
- [ ] Changing the color ten times does not increase the pipeline creation count.

## Self-check

1. Is a binding number an offset inside a buffer?
2. Can a uniform buffer be used in place of a vertex buffer?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Indices and Primitives](../07/README.md) · [Next: Uniform Struct Alignment](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
