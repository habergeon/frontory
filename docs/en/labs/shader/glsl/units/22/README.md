# GLSL · 22 Framebuffers and Screen Passes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Interaction, Postprocessing, and Cost Evaluation · Editable example · Storage ID: `glsl-step-22`

## Goals and learning outcomes

- Build multiple passes.
- Separate read and write targets.

## Prerequisites

Continue using the output and records from Unit 21. Before experimenting with Framebuffers and Screen Passes, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Intermediate Output

Rendering a scene to a framebuffer texture lets the next pass use that result as input. Avoid feedback from sampling an attachment while writing to it.

### Output Size

Each pass's viewport must match its target texture size. Make this explicit especially when screen and intermediate texture sizes differ.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This document-guided exercise requires your own implementation using WebGL2 and GLSL ES 3.00 in a separate localhost project. First check the GLSL version of existing examples and avoid mixing in 1.00 syntax.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create a color texture and framebuffer in post.js, and check completeness.
2. Draw the scene to the intermediate framebuffer, then sample it on a full-screen triangle in the default framebuffer.
3. Halve the intermediate resolution and set each viewport separately.

## Variables to observe

| Variable                | Baseline       | Change                | Expected change / hypothesis                                                   |
| ----------------------- | -------------- | --------------------- | ------------------------------------------------------------------------------ |
| Intermediate resolution | same as screen | half width and height | Expect reduced detail in the postprocessing input and fewer pixels to process. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] checkFramebufferStatus confirms completeness.
- [ ] No pass reads from a texture that overlaps its write attachment.

## Self-check

1. What appears if the final pass viewport is not updated?
2. Why use a large triangle instead of a rectangle for a screen copy?

## Official references

- [GLSL ES 3.00 Specification](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/glsl-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

Runs WebGL ShaderMaterial in the browser. Comparisons use a fixed 640×360 size; frame intervals are different from GPU time.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Alpha and Compositing State](../21/README.md) · [Next: Texel Size and Filters](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
