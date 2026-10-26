# JavaScript · 12 Event Propagation and Delegation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: DOM and asynchronous operations · Editable example · Storage ID: `javascript-step-12`

## Goals and learning outcomes

- Newly added items can also be deleted without individual listeners.
- A single click on a span leaves one processing log line.

## Prerequisites

The work and experiment records from Unit 11, “Creating DOM Nodes and Inserting Text”

## Key concepts and explanations

### Bubbling

Many events propagate from the target to its ancestors. target and currentTarget can be different elements.

### Delegated Handling

A parent listener handles actions on its children. Check that the result of closest is inside that parent.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In events.js, prepare clicks on a span inside a button and on a dynamically added item.
2. Attach a click listener to the ul, find the data-action button with closest, and delete the item.
3. Run with clicks on a span inside a button and on a dynamically added item. Results to check: Newly added items can also be deleted without individual listeners. A single click on a span leaves one processing log line. Record expected and actual results separately.

## Variables to observe

| Variable       | Baseline | Change     | Expected change / hypothesis                                                                                                                          |
| -------------- | -------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Click location | Button   | Inner span | Hypothesis before running: The same id will be processed once. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Newly added items can also be deleted without individual listeners.
- [ ] A single click on a span leaves one processing log line.

## Self-check

1. When are target and currentTarget the same?
2. How do you filter out results outside the delegation region?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Creating DOM Nodes and Inserting Text](../11/README.md) · [Next: Promises and Execution Order](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
