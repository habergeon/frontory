# JavaScript · 10 Exceptions and Recovery Paths

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: DOM and asynchronous operations · Editable example · Storage ID: `javascript-step-10`

## Goals and learning outcomes

- The busy state ends after both success and failure.
- Read valid input again after a failure.

## Prerequisites

The work and experiment records from Unit 9, “Map and Set Indexes”

## Key concepts and explanations

### Exception Propagation

throw transfers control to the nearest catch. In catch, recover or add context and pass the exception on.

### Guaranteed Cleanup

finally runs after success and failure. A return here can override the original return value or exception.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In parse.js, prepare valid JSON and JSON with a missing closing bracket.
2. Wrap JSON.parse in try/catch and turn off the progress indicator in finally.
3. Run with valid JSON and JSON with a missing closing bracket. Results to check: The busy state ends after both success and failure. Read valid input again after a failure. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change          | Expected change / hypothesis                                                                                                                                                      |
| -------- | -------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JSON     | Valid    | Missing bracket | Hypothesis before running: The progress indicator will turn off after the failure message. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The busy state ends after both success and failure.
- [ ] Read valid input again after a failure.

## Self-check

1. What information does an empty catch lose?
2. Why must you be careful with return in finally?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Map and Set Indexes](../09/README.md) · [Next: Creating DOM Nodes and Inserting Text](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
