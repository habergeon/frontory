# JavaScript · 18 Public Interfaces of ES Modules

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Modules and data boundaries · Editable example · Storage ID: `javascript-step-18`

## Goals and learning outcomes

- Call the calculations in state.js without the DOM.
- The initial list is displayed after the path is restored.

## Prerequisites

The work and experiment records from Unit 17, “Debouncing and Timer Cleanup”

## Key concepts and explanations

### Module Contracts

export and import define a file's public items. Paths and MIME types also affect loading in the browser.

### Separating Responsibilities

A calculation module can be called without knowing about the DOM. The view module receives and displays the calculation result.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In main.js, prepare a valid relative path and a missing.js path.
2. Separate state.js and view.js, import them, and load the modules through an HTTP server.
3. Run with a valid relative path and a missing.js path. Results to check: Call the calculations in state.js without the DOM. The initial list is displayed after the path is restored. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| import path | ./state.js | ./missing.js | Hypothesis before running: A module loading error will appear. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Call the calculations in state.js without the DOM.
- [ ] The initial list is displayed after the path is restored.

## Self-check

1. How does opening a file directly differ from using HTTP?
2. What initialization problems can circular imports cause?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

This example runs the public interface of a Blob ES module. Test actual separation into relative files and Network paths in an HTTP project.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Debouncing and Timer Cleanup](../17/README.md) · [Next: Storage and Restore Failures](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
