# WGSL · 15 Compute IDs and Indices

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Parallel Computation and Synchronization · Editable example · Storage ID: `wgsl-step-15`

## Goals and learning outcomes

- Interpret invocation IDs.
- Flatten multidimensional indices.

## Prerequisites

Continue using the output and records from Unit 14. Before experimenting with Compute IDs and Indices, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### ID Ranges

local_invocation_id is a position within a workgroup, and workgroup_id is the group's position. global_invocation_id combines the two using the workgroup size to give the overall position.

### Flattening

Include the row stride when storing 2-dimensional input in a 1-dimensional array. Swapping x and y can transpose the data or go out of bounds.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation in a separate localhost or HTTPS project. Check the secure context, navigator.gpu, and adapter request result, and provide an unsupported-environment message. Retain device.lost handling and resource cleanup.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In ids.wgsl, declare @workgroup_size(8,8) and a global id input.
2. For width=13,height=9, output identifying values using index=y*width+x.
3. After dispatchWorkgroups(ceil(width/8),ceil(height/8)), exclude out-of-bounds invocations.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                                        |
| -------- | -------- | ------ | ----------------------------------------------------------------------------------- |
| Grid     | 8×8      | 13×9   | Partial workgroups are expected, but only the 117 valid elements should be written. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The 117 values match the CPU identifying values for each coordinate.
- [ ] Check the final row, final column, and four corners separately.

## Self-check

1. What happens across multiple groups if only local id is used as an index?
2. Must a 2D workgroup and 2D data have the same dimensions?

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/wgsl-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Bindings and Memory Layout](../../02-experiments/README.md) · [Next: Bounds Checks and Empty Input](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
