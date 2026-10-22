# WebGPU · 24 The Scope of Timing

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Recovery, Measurement, and an Integrated Project · Editable example · Storage ID: `webgpu-step-24`

## Goals and learning outcomes

- State the measurement scope clearly.
- Use optional measurement features safely.

## Prerequisites

Continue using the output and notes from unit 23. Preserve the previous inputs and reference outputs before starting "The Scope of Timing".

## Key concepts and explanations

### End-to-End Latency

The interval from the CPU-side start to completed readback includes transfer and waiting. Do not interpret it as compute kernel execution time.

### Optional Measurement

Use timestamp-query only after checking support and requesting it. If unsupported, leave the GPU interval unmeasured and provide CPU elapsed time.

## Practice setup

First read the execution-scope guidance on the example screen. The following preparation is for extending the assignment in a separate project. This is a document-guided exercise to implement yourself in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Preserve device.lost handling and resource release.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In benchmark.js, separate input generation, upload, submission, and map-completion intervals.
2. Record timestamp-query support and configure pass timestamps and the resolve path only when supported.
3. After warmup, save end-to-end latencies for five runs and any available GPU interval values in separate columns.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Array size | 1024 | 65536 | Computation is expected to increase, while fixed transfer costs are more prominent for small inputs. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record end-to-end latency and GPU intervals under different names.
- [ ] Do not request unsupported features, and state which items remain unmeasured.

## Self-check

1. Is elapsed onSubmittedWorkDone time kernel time?
2. Why might the first run before warmup be slow?

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/webgpu-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Asynchronous Errors and Task Identity](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
