# PixiJS · 27 Completing the 2D Scene Editor

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Ownership, Large-Scale Rendering, and Measurement · Editable example · Storage ID: `pixijs-step-27`

## Goals and learning outcomes

- Preserve ids and coordinates after restoring JSON.
- Make retry and shutdown work correctly after failure.

## Prerequisites

Prerequisite concepts: Timing Metrics, Controlling Variables. Prepare the output files and observation records from Unit 26.

## Key concepts and explanations

### Data and Display

Store object ids, positions, and frame names in JSON. Distinguish this from storing Sprite instances themselves.

### Lifetime Regression Checks

Repeated screen transitions and failures can reveal missed cleanup. Check owners of ticker callbacks, events, observers, and textures together.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-27.js and index.html in the external practice project. Integrate a scene editor with atlas selection, dragging, a keyboard list, and JSON saving.
2. Repeat create→delete→save→restore→loading failure→shutdown, recording callback counts and shared resource states.
3. Save the output with the input condition 1 run, then run again with 5 runs. Expected: With correct cleanup, commands per input and ticker callback counts do not increase. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-27-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Reruns | 1 run | 5 runs | With correct cleanup, commands per input and ticker callback counts do not increase |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Preserve ids and coordinates after restoring JSON.
- [ ] Make retry and shutdown work correctly after failure.

## Self-check

1. How do you handle a missing frame name in imported JSON?
2. Who shuts down directly created resources and the Assets cache?

## Official references

- [PixiJS 8 assets](https://pixijs.com/8.x/guides/components/assets)
- [PixiJS 8 gc](https://pixijs.com/8.x/guides/concepts/garbage-collection)
- [PixiJS 8 events](https://pixijs.com/8.x/guides/components/events)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/pixijs-step-27/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Profiling and Quality Budgets](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
