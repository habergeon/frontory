# Three.js · 22 Render Targets and Minimap

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Lifetimes, Accessibility, and Measurement · Editable example · Storage ID: `threejs-step-22`

## Goals and learning outcomes

- Update the main view and minimap separately.
- Restore the render target and screen state.

## Prerequisites

Prerequisite concepts: Frustum Culling, Level of Detail. Prepare the result files and observation notes from unit 21.

## Key concepts and explanations

### Offscreen Output

WebGLRenderTarget renders to a texture instead of the screen. You can use another camera’s result on a surface within the screen.

### Restoring State

setRenderTarget(null) returns to the default screen. Missing this step makes subsequent renders keep writing to the target.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-22.js and index.html in the external exercise project. Render the scene to a render target with a camera looking down from above.
2. Connect the target texture to a minimap plane, and isolate that plane in the main scene so it is not seen again by the minimap camera.
3. Save the output under the 256×256 input condition, then run again under the 512×512 condition. Expected: Minimap sharpness and the number of processed pixels both increase. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-22-notes.md.

## Variables to observe

| Variable    | Baseline | Change  | Expected change / hypothesis                                        |
| ----------- | -------- | ------- | ------------------------------------------------------------------- |
| Target size | 256×256  | 512×512 | Minimap sharpness and the number of processed pixels both increase. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Update the main view and minimap separately.
- [ ] Restore the render target and screen state.

## Self-check

1. How do you avoid feedback from reading the texture being written?
2. When should a render target be disposed of?

## Official references

- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-22/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Offscreen Objects and Level of Detail](../21/README.md) · [Next: Resource Ownership Ledger](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
