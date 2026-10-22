# JavaScript · 23 File Import and Structure Validation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Integrating and verifying the experiment log · Editable example · Storage ID: `javascript-step-23`

## Goals and learning outcomes

- Restore exactly the number of items in a valid file.
- The existing id array is unchanged after rejection.

## Prerequisites

The work and experiment records from Unit 22, “Exporting JSON with Blob”

## Key concepts and explanations

### Reading Files

File.text returns a Promise for a string. A file extension alone cannot establish that its contents are valid.

### Atomic Updates

Validate the entire input before replacing state. Prevent an error partway through from overwriting only part of the existing data.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In import.js, prepare a valid file and a file whose second title is a number.
2. Read the file, validate the array, id, and title, and apply only the entire array that passed validation.
3. Run with a valid file and a file whose second title is a number. Results to check: Restore exactly the number of items in a valid file. The existing id array is unchanged after rejection. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Type of title | String | Number | Hypothesis before running: The import will be rejected and the existing list preserved. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Restore exactly the number of items in a valid file.
- [ ] The existing id array is unchanged after rejection.

## Self-check

1. Why is it risky to modify state during validation?
2. What policy should handle duplicate id values?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Exporting JSON with Blob](../22/README.md) · [Next: State Transitions and Undo](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
