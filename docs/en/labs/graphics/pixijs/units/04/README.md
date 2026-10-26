# PixiJS · 04 Graphics 8 Shape API

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Application, Coordinates, and Display Objects · Editable example · Storage ID: `pixijs-step-04`

## Goals and learning outcomes

- Draw using the v8 shape-then-fill order.
- Distinguish geometry changes from position changes.

## Prerequisites

Prerequisite concepts: Nested Transforms, Inverse Coordinate Transforms. Prepare the output files and observation records from Unit 3.

## Key concepts and explanations

### Style After Geometry

PixiJS 8 Graphics creates paths with rect or circle, then applies fill and stroke. Check the installed version to avoid copying the authoring order from older versions.

### Object Transforms

An existing shape can move through position and rotation. Clearing and rebuilding the path on every movement may be unnecessary.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-04.js and index.html in the external practice project. Draw a card background with new Graphics().roundRect(...).fill(...).stroke(...).
2. Move the same card by rebuilding its path and by changing position, and record call counts.
3. Save the output with the input condition clear and rebuild every frame, then run again with Change position only. Expected: The number of path reconstructions can be reduced. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-04-notes.md.

## Variables to observe

| Variable        | Baseline                      | Change               | Expected change / hypothesis                      |
| --------------- | ----------------------------- | -------------------- | ------------------------------------------------- |
| Movement method | clear and rebuild every frame | Change position only | The number of path reconstructions can be reduced |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Draw using the v8 shape-then-fill order.
- [ ] Distinguish geometry changes from position changes.

## Self-check

1. What does calling fill multiple times fill?
2. How do you separate changes in shape from changes in position alone?

## Official references

- [PixiJS 8 graphics](https://pixijs.com/8.x/guides/components/scene-objects/graphics)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-04/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Containers and Local Coordinates](../03/README.md) · [Next: Text and Style Updates](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
