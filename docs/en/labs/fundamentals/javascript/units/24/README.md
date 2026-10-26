# JavaScript · 24 State Transitions and Undo

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Integrating and verifying the experiment log · Editable example · Storage ID: `javascript-step-24`

## Goals and learning outcomes

- After 3 undo operations, id and completion values match the initial state.
- State is preserved for an unknown action.

## Prerequisites

The work and experiment records from Unit 23, “File Import and Structure Validation”

## Key concepts and explanations

### Command Model

Use an action to express why a change occurs. A reducer takes state and an action to calculate the next state.

### Preserving History

Preserving previous states makes undo possible. Directly modifying nested objects also changes past history.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In reducer.js, prepare adding, completing, and deleting, followed by 3 undo operations.
2. Implement add, toggle, remove, and history, and connect the undo button.
3. Run by adding, completing, and deleting, followed by 3 undo operations. Results to check: After 3 undo operations, id and completion values match the initial state. State is preserved for an unknown action. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline               | Change              | Expected change / hypothesis                                                                                                                                |
| -------- | ---------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Update   | Modify an inner object | Create a new object | Hypothesis before running: Past completion states will be preserved. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] After 3 undo operations, id and completion values match the initial state.
- [ ] State is preserved for an unknown action.

## Self-check

1. Which objects are shared between the past and present?
2. How should redo history be handled after a new operation?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: File Import and Structure Validation](../23/README.md) · [Next: Storing Dates and Localized Display](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
