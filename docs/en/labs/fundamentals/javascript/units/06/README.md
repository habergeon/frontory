# JavaScript · 06 Scope and Closures

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Values and calculations · Editable example · Storage ID: `javascript-step-06`

## Goals and learning outcomes

- Verify A=2 and B=1 in the independent implementation.
- Compare logs from the shared and independent implementations.

## Prerequisites

The work and experiment records from Unit 5, “Functions and Pure Calculations”

## Key concepts and explanations

### Lexical Scope

A function refers to variables in the scope where it was defined. The scope it refers to stays the same even when the call site changes.

### Independent State

Each factory call can create its own local state. Using global state makes different widgets share values.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In counter.js, prepare the case of clicking A twice and B once.
2. Return increment and read functions from createCounter and connect them to buttons A and B.
3. Run with A clicked twice and B once. Results to check: Verify A=2 and B=1 in the independent implementation. Compare logs from the shared and independent implementations. Record expected and actual results separately.

## Variables to observe

| Variable       | Baseline           | Change                         | Expected change / hypothesis                                                                                                                           |
| -------------- | ------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| State location | Inside the factory | At the top level of the module | Hypothesis before running: The two counters will share a value. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Verify A=2 and B=1 in the independent implementation.
- [ ] Compare logs from the shared and independent implementations.

## Self-check

1. Which variables does the returned function remember?
2. Does calling the factory again also reset existing state?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Functions and Pure Calculations](../05/README.md) · [Next: Array Aggregation and Empty Input](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
