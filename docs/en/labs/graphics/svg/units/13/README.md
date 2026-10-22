# SVG · 13 Screen Coordinates to SVG

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Styles, Effects, and DOM Input · Editable example · Storage ID: `svg-step-13`

## Goals and learning outcomes

- The crosshair follows the pointer even after zooming.
- Handle hidden states where a matrix cannot be obtained.

## Prerequisites

Prerequisite concepts: Text placement, Alternative information. Prepare the result files and observation records from Unit 12.

## Key concepts and explanations

### Inverse matrix

getScreenCTM is a matrix that maps SVG coordinates to the screen. Transforming with inverse maps the pointer position back into user coordinates.

### Composing transforms

Both viewBox and group transforms affect coordinates. Using the selected group's matrix can reduce manual ratio calculations.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-13.js and index.html in an external practice project. Transform the pointer using DOMPoint(clientX,clientY).matrixTransform(group.getScreenCTM().inverse()).
2. Rotate and scale the group, and add a local-coordinate crosshair at the pointer position.
3. Save the output under the input condition 1, then run again with 2. Compare the hypothesis, "The group's local displacement is half the screen displacement," against the display and logs, and record the actual result and the causes of any differences in day-13-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Group scale | 1 | 2 | The group's local displacement is half the screen displacement |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The crosshair follows the pointer even after zooming.
- [ ] Handle hidden states where a matrix cannot be obtained.

## Self-check

1. Which matrix should you use, the root SVG's or the inner g's?
2. Why does a simple boundingRect ratio calculation handle rotation poorly?

## Official references

- [MDN getScreenCTM Coordinate Transformation](https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getScreenCTM)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-13/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Text and Data Labels](../12/README.md) · [Next: DOM Interaction](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
