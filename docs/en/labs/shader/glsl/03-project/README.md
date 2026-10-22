# GLSL · 28 Interaction and Cost

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Interaction, Postprocessing, and Cost Evaluation · Editable example · Storage ID: `glsl-03`

## Goals and learning outcomes

- Integrate an interactive shader.
- Choose settings based on quality and cost.

## Prerequisites

Continue using the output and records from Unit 27. Before experimenting with Interaction and Cost, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Integrating Effects

Pointers, waves, noise, and texture samples have different inputs and costs. Separating effects so they can be disabled makes results and costs easier to track.

### Evidence for Results

Choosing a faster setting must account for quality loss and support requirements. Do not present estimates for untested environments as measured performance.

## Practice setup

The existing glsl-03 preview is a starting point. It does not replace implementation or verification of the full subsequent assignment. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Connect pointer waves and per-effect toggles to the final shader, and replay three presets.
2. Change resolution, iteration count, and sample count one at a time, recording images and frame-interval distributions.
3. Check compilation errors and recovery, then record the selected settings and remaining limitations in report.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Iteration count | 4 | 2 | Expect possible reductions in both computation and fine detail, and check with the same inputs. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep a separate controlled comparison for each of the three cost variables.
- [ ] Provide compilation-failure and recovery evidence and two quality-loss items.

## Self-check

1. How do you choose between disabling a feature and reducing resolution?
2. Which costs have you not yet isolated in this measurement?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../src/labs/glsl-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Quality Criteria and Regression Records](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
