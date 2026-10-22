# PixiJS · 19 Filters and Their Scope

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility, Scene Composition, and Effects · Editable example · Storage ID: `pixijs-step-19`

## Goals and learning outcomes

- Record quality differences between the two scopes.
- Distinguish detaching a filter from destroying it.

## Prerequisites

Prerequisite concepts: Restricting Display, Input Policy. Prepare the output files and observation records from Unit 18.

## Key concepts and explanations

### Filter Passes

Filters such as blur may require intermediate rendering work. Processing area and quality settings affect cost as well as object count.

### Group Effects

A filter on a parent acts on the combined result. Edges and overlaps can differ from applying a filter to each child.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-19.js and index.html in the external practice project. Create BlurFilter({strength:3,quality:4}) and attach it to a Container.
2. Alternate between individual filters and a parent filter on the same Sprite list, recording the screen and frame intervals.
3. Save the output with the input condition One parent, then run again with Each Sprite. Expected: Effect boundaries and intermediate processing costs may differ. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-19-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Filter scope | One parent | Each Sprite | Effect boundaries and intermediate processing costs may differ |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record quality differences between the two scopes.
- [ ] Distinguish detaching a filter from destroying it.

## Self-check

1. Do blur strength and quality serve the same role?
2. When does a parent filter's processing area grow?

## Official references

- [PixiJS 8 filters](https://pixijs.com/8.x/guides/components/filters)
- [PixiJS 8 perf](https://pixijs.com/8.x/guides/concepts/performance-tips)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-19/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Masks and Scroll Regions](../18/README.md) · [Next: Blend Modes and Order](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
