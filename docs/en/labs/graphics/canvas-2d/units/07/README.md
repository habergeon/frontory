# Canvas 2D · 07 Text and Badge Composition

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Pixels and Drawing State · Editable example · Storage ID: `canvas-2d-step-07`

## Goals and learning outcomes

- The background width adjusts to the text length.
- Record layout differences after changing the baseline.

## Prerequisites

Prerequisite concepts: Asynchronous Images, Source Rectangle. Prepare the result files and observation records from Unit 6.

## Key concepts and explanations

### Measuring Text

measureText returns measurements for the current font settings. Calculating from string length alone misestimates the widths of Korean and English text.

### Text Baseline

textBaseline determines what the y coordinate refers to. Centering requires consideration of the baseline as well as text width.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-07.js and index.html in the external practice project. Set font, calculate badge width with measureText, and display a name with fillText.
2. Accept a Korean name and a long English name, then compare the badge PNG appearances with consistent padding.
3. Save the output with the input condition 가나, then run again with WWW iii. Expected: Even with similar character counts, badge width varies with actual glyph widths. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-07-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input String | 가나 | WWW iii | Even with similar character counts, badge width varies with actual glyph widths |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The background width adjusts to the text length.
- [ ] Record layout differences after changing the baseline.

## Self-check

1. Why might measurements differ before a font loads?
2. Which names break a width calculation based only on character count?

## Official references

- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-07/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Loading and Cropping Images](../06/README.md) · [Next: The Animation Clock](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
