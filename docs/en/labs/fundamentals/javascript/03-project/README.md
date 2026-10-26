# JavaScript · 28 Modular Experiment Journal

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Integrating and verifying the experiment log · Editable example · Storage ID: `javascript-03`

## Goals and learning outcomes

- Record the four flows: add, filter, export, and restore.
- A single click adds only one item, and a failed import preserves existing state.

## Prerequisites

The work and experiment records from Unit 27, “Listener Cleanup and Repeated Mounting”

## Key concepts and explanations

### Combining Modules

Separating state, storage, and the DOM lets you verify each boundary independently. main handles wiring and cleanup.

### Verifying Flows

Successful individual features do not guarantee the full flow. Check everything from adding notes through export and restore using the same data.

## Practice setup

Frontory's existing preview is a limited starter example, not a complete solution to the assignment. Implement additional files and features yourself in a separate local project. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In main.js, prepare 10 notes, 5 remounts, and an import of a corrupted file.
2. Connect note creation, filtering, JSON saving, and restore, then remove and reconnect the event handlers.
3. Run with 10 notes, 5 remounts, and an import of a corrupted file. Results to check: Record the four flows: add, filter, export, and restore. A single click adds only one item, and a failed import preserves existing state. Record expected and actual results separately.

## Variables to observe

| Variable        | Baseline | Change    | Expected change / hypothesis                                                                                                                                   |
| --------------- | -------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Number of notes | 3 items  | 100 items | Hypothesis before running: Filter and restore results will match by id. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the four flows: add, filter, export, and restore.
- [ ] A single click adds only one item, and a failed import preserves existing state.

## Self-check

1. Where do responsibility for storage failures and responsibility for rendering failures belong?
2. Which boundaries have not been verified?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../src/labs/javascript-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Listener Cleanup and Repeated Mounting](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
