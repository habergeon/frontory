# HTML · 16 A Collapsible Table of Contents with details

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Native UI and Media · Editable example · Storage ID: `html-step-16`

## Goals and learning outcomes

- Toggle twice with the keyboard to return to the original state.
- Reach the 4 table-of-contents links while it is open.

## Prerequisites

The work and experiment records from Unit 15, “The Difference Between disabled and readonly”.

## Key concepts and explanations

### Disclosure State

details represents content that opens and closes natively. summary provides the control’s name and interactive surface.

### Document Flow

Arrange collapsed content so users can expand it when needed. Check whether hiding essential guidance causes users to miss it.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In details.html, prepare closed and open states.
2. Write the topic name in summary and add 4 table-of-contents links inside.
3. Run with closed and open states. Results to check: Toggle twice with the keyboard to return to the original state. Reach the 4 table-of-contents links while it is open. Record expected and actual results separately.

## Variables to observe

| Variable       | Baseline | Change  | Expected change / hypothesis                                                                                                                                          |
| -------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| open Attribute | Absent   | Present | Pre-run hypothesis: The internal table of contents will be visible from the start. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Toggle twice with the keyboard to return to the original state.
- [ ] Reach the 4 table-of-contents links while it is open.

## Self-check

1. What problems can complex controls inside summary cause?
2. How should you decide the initial open state?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable input with actual browser execution results. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: The Difference Between disabled and readonly](../15/README.md) · [Next: dialog and Modal Flow](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
