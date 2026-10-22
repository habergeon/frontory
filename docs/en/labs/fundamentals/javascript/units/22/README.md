# JavaScript · 22 Exporting JSON with Blob

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Integrating and verifying the experiment log · Editable example · Storage ID: `javascript-step-22`

## Goals and learning outcomes

- The exported file contains 3 notes and a version value.
- Every generated object URL has a cleanup path.

## Prerequisites

The work and experiment records from Unit 21, “FormData and Domain Validation”

## Key concepts and explanations

### Serialization

JSON.stringify converts data into a string. Functions and undefined are not preserved in the way you might expect.

### Object URLs

A Blob URL refers to the generated file data. Release it with revokeObjectURL when you have finished using it.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In export.js, prepare 3 notes and titles containing Korean characters and line breaks.
2. Create a Blob containing the notes and schemaVersion, and save notes.json using a download link.
3. Run with 3 notes and titles containing Korean characters and line breaks. Results to check: The exported file contains 3 notes and a version value. Every generated object URL has a cleanup path. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Title | English text | Korean characters and line breaks | Hypothesis before running: The restored string will match the original. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The exported file contains 3 notes and a version value.
- [ ] Every generated object URL has a cleanup path.

## Self-check

1. Which values disappear during serialization?
2. What happens if the URL is released too early?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: FormData and Domain Validation](../21/README.md) · [Next: File Import and Structure Validation](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
