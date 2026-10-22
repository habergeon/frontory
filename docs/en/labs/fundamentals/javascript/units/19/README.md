# JavaScript · 19 Storage and Restore Failures

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Modules and data boundaries · Editable example · Storage ID: `javascript-step-19`

## Goals and learning outcomes

- The 3 note id values are the same before and after a refresh.
- The guidance differs for corrupted data and a valid empty list.

## Prerequisites

The work and experiment records from Unit 18, “Public Interfaces of ES Modules”

## Key concepts and explanations

### Storing Strings

localStorage stores strings. JSON serialization and parsing rules are part of the storage contract.

### Displaying Failures

Storage can fail because of environment policies or capacity limits. Distinguish an in-memory update from a successful save in the guidance.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In storage.js, prepare 3 notes and a corrupted stored string.
2. Save and restore with a practice-only key, and display parsing errors and write failures using catch.
3. Run with 3 notes and a corrupted stored string. Results to check: The 3 note id values are the same before and after a refresh. The guidance differs for corrupted data and a valid empty list. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Stored value | Valid JSON | Truncated JSON | Hypothesis before running: A restore failure will be reported while the screen remains available. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The 3 note id values are the same before and after a refresh.
- [ ] The guidance differs for corrupted data and a valid empty list.

## Self-check

1. Does valid JSON also mean that the note structure is valid?
2. What is lost when a storage failure is ignored?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

The practice-only key is removed after execution. SecurityError caused by the iframe storage policy is also displayed.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Public Interfaces of ES Modules](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
