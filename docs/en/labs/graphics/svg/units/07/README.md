# SVG · 07 Symbols and Reuse

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Vector Paths and Coordinates · Editable example · Storage ID: `svg-step-07`

## Goals and learning outcomes

- Editing one definition updates its instances.
- Reference ids in the two SVGs do not collide.

## Prerequisites

Prerequisite concepts: Group transforms, Matrix order. Prepare the result files and observation records from Unit 6.

## Key concepts and explanations

### Definitions and instances

Content in defs is not visible by itself. When use references a definition, it displays the same shape in multiple places.

### Identifier scope

An id must not collide within the document. Combining multiple SVGs can mix up gradient or symbol references with identical names.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-07.js and index.html in an external practice project. Define a badge in symbol and create instances at three sizes using use href.
2. Choose an id prefix convention and place two SVGs in the same HTML.
3. Save the output under the input condition All use badge, then run again with A prefix for each SVG. Compare the hypothesis, "Collisions that incorrectly reference another definition are avoided," against the display and logs, and record the actual result and the causes of any differences in day-07-notes.md.

## Variables to observe

| Variable      | Baseline      | Change                | Expected change / hypothesis                                         |
| ------------- | ------------- | --------------------- | -------------------------------------------------------------------- |
| id convention | All use badge | A prefix for each SVG | Collisions that incorrectly reference another definition are avoided |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Editing one definition updates its instances.
- [ ] Reference ids in the two SVGs do not collide.

## Self-check

1. How would you design use so each instance can have a different color?
2. Why is a symbol viewBox useful?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-07/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Groups and Transform Order](../06/README.md) · [Next: Styles and Themes](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
