# SVG · 08 Styles and Themes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Styles, Effects, and DOM Input · Editable example · Storage ID: `svg-step-08`

## Goals and learning outcomes

- Icons change together with the theme.
- Find the source of the final color in developer tools.

## Prerequisites

Prerequisite concepts: Definitions and instances, Identifier scope. Prepare the result files and observation records from Unit 7.

## Key concepts and explanations

### Cascade

CSS affects SVG presentation attributes. Reading only an attribute value may not tell you the final color.

### Inherited color

currentColor uses the surrounding color. This makes it easy to match an icon theme to page text color.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-08.js and index.html in an external practice project. Create an icon that uses currentColor for stroke and fill.
2. Switch CSS variables with a theme button and record the final fill using getComputedStyle.
3. Save the output under the input condition fill attribute only, then run again with Add a CSS fill rule. Compare the hypothesis, "The cascade may make the displayed color differ from the attribute string," against the display and logs, and record the actual result and the causes of any differences in day-08-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Color specification | fill attribute only | Add a CSS fill rule | The cascade may make the displayed color differ from the attribute string |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Icons change together with the theme.
- [ ] Find the source of the final color in developer tools.

## Self-check

1. Does the same CSS apply to an external SVG in img?
2. Which element's color does currentColor use?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-08/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Symbols and Reuse](../07/README.md) · [Next: Gradient Coordinates](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
