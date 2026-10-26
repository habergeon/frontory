# Gaussian Splatting · 24 Keyboard Controls and Camera Recovery

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: A Measurable GS Exhibition Viewer · Editable example · Storage ID: `gaussian-splatting-step-24`

## Goals and learning outcomes

- Provide multiple input methods.
- Save the complete camera recovery state.

## Prerequisites

Continue using the output and records from Unit 23. Before the Keyboard Controls and Camera Recovery experiment, preserve the previous inputs and reference outputs.

## Key concepts and explanations

### Control paths

Camera controls tied only to the pointer make scene exploration difficult for some users. Provide keyboard movement and an explicit reset button.

### Range limits

Moving the camera too far inside the data makes the scene difficult to understand. Define movement limits together with data bounds.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. This is a document-guided exercise in a separate local project. Use only small data you create or local files whose usage permission you have checked. The existing preview is a CPU teaching viewer for .splat/ASCII GS PLY files of at most 1 MiB and 512 items; it is not a Spark GPU renderer.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In controls.js, define arrow-key movement, zoom, and reset actions.
2. Prevent camera shortcuts from running while a form is being edited.
3. Using only the keyboard, move to three viewpoints, reset, and compare camera.json.

## Variables to observe

| Variable       | Baseline              | Change | Expected change / hypothesis                                              |
| -------------- | --------------------- | ------ | ------------------------------------------------------------------------- |
| Movement speed | 1% of the bounds size | 10%    | Expect faster exploration but a greater chance of passing small features. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Perform movement, zoom, and reset without a mouse.
- [ ] Pressing arrow keys in an input field does not change camera values.

## Self-check

1. How does a fixed numeric movement unit affect different datasets?
2. Which values besides position does reset need?

## Official references

- [Spark Official Documentation](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting Research Project](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gaussian-splatting-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

CPU Canvas2D synthetic fixtures and contract checks. This does not provide Spark GPU rendering, training data, or claims about reconstruction quality or GPU performance.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Resource Lifetimes and Repeated Loading](../23/README.md) · [Next: Integrated Failure-State Tests](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
