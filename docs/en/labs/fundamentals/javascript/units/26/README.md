# JavaScript · 26 Computational Cost and Splitting Work

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Integrating and verifying the experiment log · Editable example · Storage ID: `javascript-step-26`

## Goals and learning outcomes

- Measure each of the two paths 3 times using the same data.
- Record total time and input responsiveness as separate items.

## Prerequisites

The work and experiment records from Unit 25, “Storing Dates and Localized Display”

## Key concepts and explanations

### Measurement Scope

Use performance.now to measure elapsed time. Keep data size and execution conditions fixed to make comparisons.

### Input Responsiveness

Long synchronous operations delay input on the main thread. Splitting work can affect total processing time and responsiveness differently.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In perf.js, prepare searching 10000 notes, running each path 3 times.
2. Split the search into synchronous processing and timer-based batches, and observe the button's responsiveness during processing.
3. Run searches over 10000 notes, with each path run 3 times. Results to check: Measure each of the two paths 3 times using the same data. Record total time and input responsiveness as separate items. Record expected and actual results separately.

## Variables to observe

| Variable   | Baseline    | Change    | Expected change / hypothesis                                                                                                                                                                     |
| ---------- | ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Batch size | 10000 items | 500 items | Hypothesis before running: There will be more opportunities to handle input, and total time may increase. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Measure each of the two paths 3 times using the same data.
- [ ] Record total time and input responsiveness as separate items.

## Self-check

1. What delays can be missed by looking only at the average?
2. How should input changes be reflected while work is split into batches?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

Times are observations on the current device and do not establish performance superiority. Compare count and batch under the same conditions.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Storing Dates and Localized Display](../25/README.md) · [Next: Listener Cleanup and Repeated Mounting](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
