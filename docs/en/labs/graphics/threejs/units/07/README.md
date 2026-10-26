# Three.js · 07 Shared Geometry and Cloning

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Scene Coordinates, Cameras, and Geometry · Editable example · Storage ID: `threejs-step-07`

## Goals and learning outcomes

- Reproduce the difference between shared and independent materials.
- Record the material owner.

## Prerequisites

Prerequisite concepts: The Role of Normals, Smoothing. Prepare the result files and observation notes from unit 6.

## Key concepts and explanations

### Shared References

Multiple Mesh objects can reference one geometry or material. Changing a shared resource affects every object that references it.

### Ownership

Cloning an object does not mean independently copying every GPU resource. Check the scope of sharing before modifying or releasing resources.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-07.js and index.html in the external exercise project. Place three cubes that use the same geometry and material.
2. Change the material color of one cube, then compare a version separated with material.clone.
3. Save the output under the Shared reference input condition, then run again under the Individual cloned materials condition. Expected: Changing one cube’s color does not propagate to the other cubes. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-07-notes.md.

## Variables to observe

| Variable | Baseline         | Change                      | Expected change / hypothesis                                     |
| -------- | ---------------- | --------------------------- | ---------------------------------------------------------------- |
| Material | Shared reference | Individual cloned materials | Changing one cube’s color does not propagate to the other cubes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Reproduce the difference between shared and independent materials.
- [ ] Record the material owner.

## Self-check

1. Does clone also deeply copy geometry?
2. When can shared resources be disposed of?

## Official references

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-07/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Normals and Surface Orientation](../06/README.md) · [Next: Light Types and Placement](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
