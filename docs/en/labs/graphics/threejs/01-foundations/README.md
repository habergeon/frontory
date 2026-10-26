# Three.js · 01 Scene Graphs and Cameras

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Scene Coordinates, Cameras, and Geometry · Editable example · Storage ID: `threejs-01`

## Goals and learning outcomes

- Print changes in local and world coordinates.
- Distinguish the effects of FOV from camera movement.

## Prerequisites

You need to understand JavaScript ES modules, vector and matrix basics, and a first WebGL scene.

## Key concepts and explanations

### Parent Transforms

A Group transform accumulates into its children’s world coordinates. A child position is relative to its parent, so it is not the same as a screen position.

### View Direction and Position

The camera position and the point it looks at are different values. Changing FOV changes the projected size even when the position stays fixed.

## Practice setup

The existing built-in example provides only a starting point. It does not implement all expanded requirements. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-01.js and index.html in the external exercise project. Add two Mesh objects to the Group in the existing threejs-01 and add an AxesHelper.
2. Accept parent rotation and camera FOV as inputs, and display the getWorldPosition result in an HTML output.
3. Save the output under the 0 input condition, then run again under the PI/2 condition. Expected: The child’s local coordinates stay the same, but its world coordinates rotate. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-01-notes.md.

## Variables to observe

| Variable        | Baseline | Change | Expected change / hypothesis                                                   |
| --------------- | -------- | ------ | ------------------------------------------------------------------------------ |
| Parent rotation | 0        | PI/2   | The child’s local coordinates stay the same, but its world coordinates rotate. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Print changes in local and world coordinates.
- [ ] Distinguish the effects of FOV from camera movement.

## Self-check

1. Why does a child position stay unchanged when only its parent moves?
2. How do lookAt and position differ?

## Official references

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)

## Linked example and execution scope

[Example source](../../../../../../src/labs/threejs-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Renderer and Display Size](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
