# Three.js · 13 Normalized Coordinates and Selection

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Lighting, Materials, and Model Selection · Editable example · Storage ID: `threejs-step-13`

## Goals and learning outcomes

- Keep selection positions correct even with page margins.
- Select the nearest intersected target.

## Prerequisites

Prerequisite concepts: Additional Rendering, Shadow Coverage. Prepare the result files and observation notes from unit 12.

## Key concepts and explanations

### NDC Input

Raycaster.setFromCamera accepts normalized device coordinates. Calculate them relative to the canvas rectangle: x ranges from -1 to 1, and y is 1 at the top.

### Intersection Results

intersectObjects returns intersection information ordered by distance. Complex models need a rule for walking from a child Mesh up to the intended application selection target.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-13.js and index.html in the external exercise project. Convert pointerdown client coordinates to NDC and call raycaster.setFromCamera.
2. Display the intersection distances and names of two overlapping Mesh objects in an HTML list.
3. Save the output under the Canvas center input condition, then run again under the Top left condition. Expected: NDC changes approximately from 0,0 to -1,1. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-13-notes.md.

## Variables to observe

| Variable         | Baseline      | Change   | Expected change / hypothesis                |
| ---------------- | ------------- | -------- | ------------------------------------------- |
| Pointer position | Canvas center | Top left | NDC changes approximately from 0,0 to -1,1. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep selection positions correct even with page margins.
- [ ] Select the nearest intersected target.

## Self-check

1. When does normalization using the window size give incorrect results?
2. How does the recursive option differ from a parent-selection rule?

## Official references

- [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-13/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Shadow Maps](../12/README.md) · [Next: Materials, Loading, and Selection](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
