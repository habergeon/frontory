# HTML · 26 HTML Errors and Browser Recovery

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility Review and Card Integration · Editable example · Storage ID: `html-step-26`

## Goals and learning outcomes

- Record the recovered DOM for 2 errors.
- The corrected version has 0 of the relevant validation errors.

## Prerequisites

The work and experiment records from Unit 25, “Reading Order and Skip Links”.

## Key concepts and explanations

### Error Recovery

Browsers recover even invalid markup into a DOM. A visible page does not mean its syntax and structure are correct.

### Content Models

Each element has rules for allowed children and nesting. Invalid nesting can make the actual DOM differ from the source.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In invalid.html, prepare 2 errors and a corrected version.
2. Create error examples such as a div inside p and nested button elements, and compare the Elements tree with validator results.
3. Run with 2 errors and a corrected version. Results to check: Record the recovered DOM for 2 errors. The corrected version has 0 of the relevant validation errors. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline     | Change            | Expected change / hypothesis                                                                                                                     |
| -------- | ------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nesting  | div inside p | Sibling p and div | Pre-run hypothesis: The source and DOM structures will match. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the recovered DOM for 2 errors.
- [ ] The corrected version has 0 of the relevant validation errors.

## Self-check

1. Where did the browser insert closing tags?
2. Which errors can visual inspection alone miss?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

The inspection result displays the body tree recovered by the browser. Change p/div into siblings and compare the result with HTML validator diagnostics. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Reading Order and Skip Links](../25/README.md) · [Next: Checking Image Failure and Zoom](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
