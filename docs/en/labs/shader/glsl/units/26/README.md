# GLSL · 26 Editing Failures and Context Recovery

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Interaction, Postprocessing, and Cost Evaluation · Editable example · Storage ID: `glsl-step-26`

## Goals and learning outcomes

- Apply shader edits safely.
- Design GPU resource recovery.

## Prerequisites

Continue using the output and records from Unit 25. Before experimenting with Editing Failures and Context Recovery, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Safe Replacement

Keeping the last working program when a new shader fails lets editing continue. Replace the active program only with a validated new program.

### Context Lifetime

After WebGL context restoration, previous GPU resources must be recreated. Save source and CPU inputs to prepare a recreation path.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Compile and link a candidate program in editor.js, replacing the current program only on success.
2. Enter a syntax error and check the error line and whether the existing display is retained.
3. Handle webglcontextlost and webglcontextrestored, and list resources to recreate in README.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| New source | valid source | contains a syntax error | Expect an error display while retaining the last working image. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] An erroneous input does not delete the existing program.
- [ ] The recovery path recreates buffers, textures, and programs and looks up uniforms again.

## Self-check

1. When should failed candidate shaders be deleted?
2. Must UI state also be reset during context recovery?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: The Cost of Branches and Loops](../25/README.md) · [Next: Quality Criteria and Regression Records](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
