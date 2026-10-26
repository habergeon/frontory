# SVG · 26 Integrating the Map Editor

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Export and Large-Scale Comparisons · Editable example · Storage ID: `svg-step-26`

## Goals and learning outcomes

- Incomplete data does not overwrite the existing scene.
- You can recover from import errors using the keyboard.

## Prerequisites

Prerequisite concepts: Shared data, Implementing selection. Prepare the result files and observation records from Unit 25.

## Key concepts and explanations

### State consistency

Selection, scale, and node data affect one another. Collecting state changes into command functions can reduce differences between input paths.

### Recoverability

An invalid import must not damage existing work. Applying validated new data all at once can help.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-26.js and index.html in an external practice project. Combine JSON import, node dragging, keyboard selection, and SVG export.
2. Enter missing edge ids and duplicate nodes, and check error messages and preservation of the existing scene.
3. Save the output under the input condition Valid graph, then run again with Duplicate id. Compare the hypothesis, "Applying new data is rejected and the editing state is preserved," against the display and logs, and record the actual result and the causes of any differences in day-26-notes.md.

## Variables to observe

| Variable      | Baseline    | Change       | Expected change / hypothesis                                     |
| ------------- | ----------- | ------------ | ---------------------------------------------------------------- |
| Imported data | Valid graph | Duplicate id | Applying new data is rejected and the editing state is preserved |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Incomplete data does not overwrite the existing scene.
- [ ] You can recover from import errors using the keyboard.

## Self-check

1. At which stage before rendering do you validate input?
2. How do you avoid confusing scale with data coordinates when saving it?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)
- [MDN SVG title Accessible Name](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

An experiment with duplicate id validation, keyboard selection, movement, and serialization. You can combine free dragging from the Day 17 example.

- [example.js](../../../../../../../src/labs/svg-step-26/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Canvas Comparison Renderer](../25/README.md) · [Next: Reproducible Comparison Experiments](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
