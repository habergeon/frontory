# SVG · 28 Comparing with Canvas

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Export and Large-Scale Comparisons · Editable example · Storage ID: `svg-03`

## Goals and learning outcomes

- Choose based on the advantages and disadvantages of functionality, accessibility, and performance.
- Submit outputs and measurement records with the same data and conditions.

## Prerequisites

Prerequisite concepts: Comparison contract, Recording distributions. Prepare the result files and observation records from Unit 27.

## Key concepts and explanations

### Representation model

SVG retains individual elements as DOM. Canvas updates pixels and manages object meaning separately.

### Reasons for choosing

Performance alone makes it difficult to choose a representation. Evaluate accessibility, editing, export, and implementation complexity alongside requirements.

## Practice setup

The existing built-in example provides only a starting point. It does not implement all the extended requirements. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-28.js and index.html in an external practice project. Starting from the existing svg-03 comparison example, complete two implementations with the same point distribution, selection, and zoom.
2. Collect accessibility checks of the node map, a performance table, and export results into a renderer selection report.
3. Save the output under the input condition SVG DOM, then run again with Canvas pixels. Compare the hypothesis, "Element access and hit testing are implemented differently, and performance must be verified per scene," against the display and logs, and record the actual result and the causes of any differences in day-28-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Representation | SVG DOM | Canvas pixels | Element access and hit testing are implemented differently, and performance must be verified per scene |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Choose based on the advantages and disadvantages of functionality, accessibility, and performance.
- [ ] Submit outputs and measurement records with the same data and conditions.

## Self-check

1. What supports choosing SVG for this map?
2. How might the conclusion change with different scales or input requirements?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)
- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
- [MDN SVG title Accessible Name](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title)

## Linked example and execution scope

[Example source](../../../../../../src/labs/svg-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Reproducible Comparison Experiments](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
