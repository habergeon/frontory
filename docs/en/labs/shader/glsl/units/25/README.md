# GLSL · 25 The Cost of Branches and Loops

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Interaction, Postprocessing, and Cost Evaluation · Editable example · Storage ID: `glsl-step-25`

## Goals and learning outcomes

- Separate cost variables.
- Assess optimization hypotheses through measurement.

## Prerequisites

Continue using the output and records from Unit 24. Before experimenting with The Cost of Branches and Loops, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Conditional Execution

Branch cost depends on the distribution of conditions and the work performed. Replacing every if with mix is not always an optimization.

### Experimental Controls

Changing iteration count, sample count, and resolution together makes the cause of a change hard to identify. Change one at a time with the same static inputs.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Expose noise iterations and texture sample count as independent settings in cost.glsl.
2. Compare 1, 4, and 8 iterations with identical uTime and uPointer.
3. Record frame intervals at fixed resolution, changing resolution only in the next experiment.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Iteration count | 1 | 8 | Expect additional computation, while actual frame differences depend on the bottleneck. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep same-time images and frame records for all three iteration settings.
- [ ] State in the results that sample count and resolution were fixed.

## Self-check

1. Are expensive calculations in both arguments to mix skipped?
2. Can frame intervals be treated as pure shader GPU time?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Pointer Coordinates and Input Smoothing](../24/README.md) · [Next: Editing Failures and Context Recovery](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
