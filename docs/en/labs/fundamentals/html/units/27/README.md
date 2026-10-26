# HTML · 27 Checking Image Failure and Zoom

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility Review and Card Integration · Editable example · Storage ID: `html-step-27`

## Goals and learning outcomes

- Card titles and action purposes remain with 6 failed images.
- There is a record of reaching every control at both zoom levels.

## Prerequisites

The work and experiment records from Unit 26, “HTML Errors and Browser Recovery”.

## Key concepts and explanations

### Alternatives

Essential information and the meaning of controls must remain when resources are missing. alt and body descriptions work together in failure cases.

### Zoomed Environments

Zoom reduces the area visible at once. Check clipped content and focus navigation problems through actual operation.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In audit.html, prepare 6 cards, image failure, and two zoom levels.
2. Break the image paths on the card page and navigate with the keyboard at 200%·400% zoom.
3. Run with 6 cards, image failure, and two zoom levels. Results to check: Card titles and action purposes remain with 6 failed images. There is a record of reaching every control at both zoom levels. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                                                                                                            |
| -------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zoom     | 100%     | 400%   | Pre-run hypothesis: More line wrapping and scrolling will be needed. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Card titles and action purposes remain with 6 failed images.
- [ ] There is a record of reaching every control at both zoom levels.

## Self-check

1. Do alternative text and body content repeat unnecessarily?
2. Should clipped controls be fixed in HTML or CSS?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

Reduce preview width to check reflow, and separately test actual browser zoom at 200%·400%. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: HTML Errors and Browser Recovery](../26/README.md) · [Next: Accessible Learning Cards](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
