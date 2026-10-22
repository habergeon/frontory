# JavaScript · 25 Storing Dates and Localized Display

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Integrating and verifying the experiment log · Editable example · Storage ID: `javascript-step-25`

## Goals and learning outcomes

- Record the two display values and the identical epoch value.
- Invalid dates are not saved.

## Prerequisites

The work and experiment records from Unit 24, “State Transitions and Undo”

## Key concepts and explanations

### Representing an Instant

Date represents an instant in milliseconds. Distinguish information that needs only a date from an instant with a time zone.

### Localized Display

Intl.DateTimeFormat displays values using the specified locale and time zone. Parsing a display string back as a storage format introduces ambiguity.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In date.js, prepare a valid ISO value and an invalid date.
2. Store a fixed ISO instant and display it with UTC and Asia/Seoul formatters.
3. Run with a valid ISO value and an invalid date. Results to check: Record the two display values and the identical epoch value. Invalid dates are not saved. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Time zone | UTC | Asia/Seoul | Hypothesis before running: The epoch value will be the same even when the displayed times differ. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the two display values and the identical epoch value.
- [ ] Invalid dates are not saved.

## Self-check

1. Does a study date necessarily need a time?
2. Why is parsing a localized display string again unreliable?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: State Transitions and Undo](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
