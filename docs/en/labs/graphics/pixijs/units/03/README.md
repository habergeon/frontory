# PixiJS · 03 Containers and Local Coordinates

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Application, Coordinates, and Display Objects · Editable example · Storage ID: `pixijs-step-03`

## Goals and learning outcomes

- Check errors in coordinate round trips.
- Adjust parent and child transforms independently.

## Prerequisites

Prerequisite concepts: Texture Representation, Anchors. Prepare the output files and observation records from Unit 2.

## Key concepts and explanations

### Nested Transforms

A parent's scale and rotation affect a child's global position. Printing local and global coordinates separately lets you trace the transform path.

### Inverse Coordinate Transforms

toLocal converts a global point into the container's coordinates. This is useful when converting screen input into data positions.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-03.js and index.html in the external practice project. Put a Sprite inside two nested Containers and show each axis with Graphics.
2. Record getGlobalPosition and toLocal results side by side in an HTML output.
3. Save the output with the input condition 1, then run again with 2. Expected: The same local movement of the child appears twice as large on screen. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-03-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Parent scale | 1 | 2 | The same local movement of the child appears twice as large on screen |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Check errors in coordinate round trips.
- [ ] Adjust parent and child transforms independently.

## Self-check

1. What goes wrong if you convert a global point to local twice?
2. Is movement along the x axis still horizontal on screen when the parent rotates?

## Official references

- [PixiJS 8 container](https://pixijs.com/8.x/guides/components/scene-objects/container)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-03/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Sprites and Anchors](../02/README.md) · [Next: Graphics 8 Shape API](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
