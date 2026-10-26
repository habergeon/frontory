# Three.js · 15 Model Size and Camera Fitting

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Animation, Instancing, and Render Passes · Editable example · Storage ID: `threejs-step-15`

## Goals and learning outcomes

- Center a model on screen even when it is far from the origin.
- Treat models with a size of 0 or empty models as errors.

## Prerequisites

Prerequisite concepts: Loading States, Selection Highlighting. Prepare the result files and observation notes from unit 14.

## Key concepts and explanations

### Bounding Boxes

Models have different units and centers. Calculating size and center from a world bounding box provides a consistent basis for viewing.

### Camera Framing

You can calculate distance from the target size and FOV. With a narrow aspect, consider the horizontal direction too.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-15.js and index.html in the external exercise project. Get the loaded model’s center and size with Box3.setFromObject.
2. Move controls.target to the center, and adjust camera distance and near and far based on model size.
3. Save the output under the 1 input condition, then run again under the 10 condition. Expected: After framing, the model occupies a similar proportion of the screen. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-15-notes.md.

## Variables to observe

| Variable    | Baseline | Change | Expected change / hypothesis                                          |
| ----------- | -------- | ------ | --------------------------------------------------------------------- |
| Model scale | 1        | 10     | After framing, the model occupies a similar proportion of the screen. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Center a model on screen even when it is far from the origin.
- [ ] Treat models with a size of 0 or empty models as errors.

## Self-check

1. How does this differ from moving the model itself to the origin?
2. What happens to a wide model if you consider only vertical FOV?

## Official references

- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)
- [Three.js OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

Reproduces Box3 framing with basic shapes. An arbitrary glTF loader is not injected into the preview runtime.

- [example.js](../../../../../../../src/labs/threejs-step-15/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Materials, Loading, and Selection](../../02-experiments/README.md) · [Next: Orbit Controls and On-Demand Rendering](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
