# PixiJS · 06 Layers and Drawing Order

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Application, Coordinates, and Display Objects · Editable example · Storage ID: `pixijs-step-06`

## Goals and learning outcomes

- Keep the HUD from being covered by world objects.
- Explain that sorting is scoped to a parent.

## Prerequisites

Prerequisite concepts: Creating Text, Update Costs. Prepare the output files and observation records from Unit 5.

## Key concepts and explanations

### Child Order

The order of a container's children affects which objects cover others. Separating background, world, and UI makes the hierarchy easier to manage.

### zIndex Sorting

Enabling sortableChildren allows sorting by zIndex. Frequent order changes also affect cost and selection results.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-06.js and index.html in the external practice project. Add background,world,hud Containers to the stage in that order.
2. Enable world.sortableChildren and change the selected Sprite's zIndex.
3. Save the output with the input condition All 0, then run again with Selected object 10. Expected: The selected object appears in front of the other objects in the same container. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-06-notes.md.

## Variables to observe

| Variable | Baseline | Change             | Expected change / hypothesis                                                    |
| -------- | -------- | ------------------ | ------------------------------------------------------------------------------- |
| zIndex   | All 0    | Selected object 10 | The selected object appears in front of the other objects in the same container |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep the HUD from being covered by world objects.
- [ ] Explain that sorting is scoped to a parent.

## Self-check

1. Can a child's zIndex cross into another parent group?
2. Should selection results stay the same when overlap order changes?

## Official references

- [PixiJS 8 container](https://pixijs.com/8.x/guides/components/scene-objects/container)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-06/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Text and Style Updates](../05/README.md) · [Next: Responsive Screens and Resolution](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
