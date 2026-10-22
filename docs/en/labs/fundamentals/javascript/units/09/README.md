# JavaScript · 09 Map and Set Indexes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: DOM and asynchronous operations · Editable example · Storage ID: `javascript-step-09`

## Goals and learning outcomes

- Record the tag counts before and after removing duplicates.
- Verify a lookup for a missing id and an update to an existing id separately.

## Prerequisites

The work and experiment records from Unit 8, “Object Destructuring and Optional Access”

## Key concepts and explanations

### Key-Based Lookup

Map associates keys with values. Calling set with the same key replaces the existing value.

### Removing Duplicates

Set stores the same value only once. Objects are distinguished by reference rather than by their contents.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In index.js, prepare 6 tags containing duplicates and 3 notes.
2. Use Set to reduce the tags and Map to look up notes, then update an existing id.
3. Run with 6 tags containing duplicates and 3 notes. Results to check: Record the tag counts before and after removing duplicates. Verify a lookup for a missing id and an update to an existing id separately. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Key passed to set | New id 4 | Existing id 2 | Hypothesis before running: The size will stay the same, and the value for id 2 will change. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the tag counts before and after removing duplicates.
- [ ] Verify a lookup for a missing id and an update to an existing id separately.

## Self-check

1. How should duplicates be defined for object tags?
2. How do the purposes of Map and array searches differ?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Object Destructuring and Optional Access](../08/README.md) · [Next: Exceptions and Recovery Paths](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
