# SVG · 15 Accessible Names and Descriptions

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility and Data Maps · Editable example · Storage ID: `svg-step-15`

## Goals and learning outcomes

- Verify the accessible name of an informational SVG.
- Distinguish decoration from data graphics with reasons.

## Prerequisites

Prerequisite concepts: Shared selection state, Keyboard path. Prepare the result files and observation records from Unit 14.

## Key concepts and explanations

### Linking names

title is used for a short SVG description. When linking it with aria-labelledby, the id must be exact for the name to be found.

### Distinguishing decoration

Meaningless decoration can be excluded from assistive technology navigation. Hiding meaningful data graphics too removes information.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-15.js and index.html in an external practice project. Link title,desc and aria-labelledby on an informational SVG.
2. Create decorative aria-hidden and informational versions of the same badge, and inspect the accessibility tree.
3. Save the output under the input condition Informational, with a name, then run again with Decorative aria-hidden. Compare the hypothesis, "Decoration is excluded from navigation while the informational name remains," against the display and logs, and record the actual result and the causes of any differences in day-15-notes.md.

## Variables to observe

| Variable     | Baseline                   | Change                 | Expected change / hypothesis                                                |
| ------------ | -------------------------- | ---------------------- | --------------------------------------------------------------------------- |
| Graphic role | Informational, with a name | Decorative aria-hidden | Decoration is excluded from navigation while the informational name remains |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Verify the accessible name of an informational SVG.
- [ ] Distinguish decoration from data graphics with reasons.

## Self-check

1. Can title alone adequately describe a complex chart?
2. How do duplicate ids affect name associations?

## Official references

- [MDN SVG title Accessible Name](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-15/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: DOM Interaction](../../02-experiments/README.md) · [Next: Pointer Event Regions](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
