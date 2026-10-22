# SVG · 14 DOM Interaction

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Styles, Effects, and DOM Input · Editable example · Storage ID: `svg-02`

## Goals and learning outcomes

- Select the same item with keyboard and pointer.
- Distinguish focus indicators from selection indicators.

## Prerequisites

Prerequisite concepts: Inverse matrix, Composing transforms. Prepare the result files and observation records from Unit 13.

## Key concepts and explanations

### Shared selection state

SVG elements are event targets, but you must define what selection means. Pointer input and HTML buttons produce consistent results when they share the same id state.

### Keyboard path

A visual path alone does not provide button behavior. A list of native buttons reliably connects keyboard interaction with accessible names.

## Practice setup

The existing built-in example provides only a starting point. It does not implement all the extended requirements. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-14.js and index.html in an external practice project. Read the existing svg-02 example and build a node map with a corresponding list of HTML button elements.
2. Connect click and button activation to selectNode(id), and update the selection border, description, and aria-pressed.
3. Save the output under the input condition Click a node, then run again with Tab and Enter. Compare the hypothesis, "The same node id and description are selected," against the display and logs, and record the actual result and the causes of any differences in day-14-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input path | Click a node | Tab and Enter | The same node id and description are selected |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Select the same item with keyboard and pointer.
- [ ] Distinguish focus indicators from selection indicators.

## Self-check

1. Why can selection state and focus state differ?
2. Where should focus move when a node is deleted?

## Official references

- [MDN SVG title Accessible Name](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title)
- [MDN getScreenCTM Coordinate Transformation](https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getScreenCTM)

## Linked example and execution scope

[Example source](../../../../../../src/labs/svg-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Screen Coordinates to SVG](../units/13/README.md) · [Next: Accessible Names and Descriptions](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
