# SVG · 19 Data and DOM Updates

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility and Data Maps · Editable example · Storage ID: `svg-step-19`

## Goals and learning outcomes

- The selected id does not change after reordering.
- Clean up DOM and Map references for deleted ids.

## Prerequisites

Prerequisite concepts: Camera group, Pointer-centered zoom. Prepare the result files and observation records from Unit 18.

## Key concepts and explanations

### Stable ids

A data id connects a DOM element to its data. It identifies the same object even when array order changes.

### Incremental updates

Replacing all innerHTML may lose focus and event connections. Updating only necessary attributes and elements makes state easier to preserve.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-19.js and index.html in an external practice project. Implement node creation, modification, and deletion with an id→SVGElement Map.
2. Reorder the data, remove one node, and record whether selection and focus persist.
3. Save the output under the input condition Full replacement, then run again with id-based attribute updates. Compare the hypothesis, "Unchanged elements retain their identity and focus," against the display and logs, and record the actual result and the causes of any differences in day-19-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Update method | Full replacement | id-based attribute updates | Unchanged elements retain their identity and focus |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The selected id does not change after reordering.
- [ ] Clean up DOM and Map references for deleted ids.

## Self-check

1. How do you handle the same id arriving twice?
2. Is reusing DOM always the fastest option?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-19/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Zooming and Panning](../18/README.md) · [Next: Connectors and Graph Layout](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
