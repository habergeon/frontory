# Gaussian Splatting · 20 Color Space and Background

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Visibility and Quality Experiments · Editable example · Storage ID: `gaussian-splatting-step-20`

## Goals and learning outcomes

- Distinguish compositing space from display space.
- Control background conditions.

## Prerequisites

Continue using the output and records from Unit 19. Before the Color Space and Background experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Color calculations

Compositing in linear space and converting colors for display are different operations. Applying color conversion twice distorts brightness comparisons.

### Background dependence

Transparent regions look different depending on background color. Fix the background and alpha display policy for quality comparisons too.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In color.js, add comments specifying the compositing space and the location of the final display conversion.
2. Composite a gray translucent fixture over black and white backgrounds.
3. Save a table of input RGB, composited RGB, and display RGB at each stage.

## Variables to observe

| Variable   | Baseline | Change | Expected change / hypothesis                                                    |
| ---------- | -------- | ------ | ------------------------------------------------------------------------------- |
| Background | Black    | White  | Expect the brightness of transmitted regions to differ even for the same splat. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record values at the three color stages and the number of conversions.
- [ ] Confirm that the same opacity is used on both backgrounds.

## Self-check

1. Which test values can reveal duplicate color conversion?
2. Can two screenshots with different backgrounds be used to compare quality?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Reducing Gaussian Count](../19/README.md) · [Next: Defining Quality Evaluation Criteria](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
