# HTML · 25 Reading Order and Skip Links

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility Review and Card Integration · Editable example · Storage ID: `html-step-25`

## Goals and learning outcomes

- The shortcut link is available on the first keyboard interaction.
- Record focus and scroll positions before and after moving to the main content.

## Prerequisites

The work and experiment records from Unit 24, “Accessible Names and Descriptions”.

## Key concepts and explanations

### Source Order

Assistive technology and keyboard navigation are affected by document order. Changing only visual positions does not automatically fix the logical order.

### Shortcuts

A skip link bypasses repeated navigation to reach the main content. Check the destination and focus behavior in the browser.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In reading-order.html, prepare 10 lengthy navigation links and main content.
2. Put a skip-to-content link at the top, and create a main destination and a logical card order.
3. Run with 10 lengthy navigation links and main content. Results to check: The shortcut link is available on the first keyboard interaction. Record focus and scroll positions before and after moving to the main content. Record expected and actual results separately.

## Variables to observe

| Variable          | Baseline     | Change    | Expected change / hypothesis                                                                                                                                        |
| ----------------- | ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navigation Method | Repeated Tab | Skip link | Pre-run hypothesis: Fewer interactions will be needed to reach the main content. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The shortcut link is available on the first keyboard interaction.
- [ ] Record focus and scroll positions before and after moving to the main content.

## Self-check

1. What maintenance problems arise from fixing order with positive tabindex values?
2. Is the reading order still natural with CSS disabled?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable input with actual browser execution results. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Accessible Names and Descriptions](../24/README.md) · [Next: HTML Errors and Browser Recovery](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
