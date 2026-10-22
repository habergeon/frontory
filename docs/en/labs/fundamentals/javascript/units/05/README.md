# JavaScript · 05 Functions and Pure Calculations

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Values and calculations · Editable example · Storage ID: `javascript-step-05`

## Goals and learning outcomes

- Neither NaN nor Infinity is displayed for the three inputs.
- Record 3 calculation results obtained without the DOM.

## Prerequisites

The work and experiment records from Unit 4, “Branches and Early Returns”

## Key concepts and explanations

### Pure Calculations

A pure calculation returns the same result for the same input and does not change external state. A separate function can handle DOM display.

### Boundary Values

When the total count is 0, ordinary division cannot determine a ratio. Document the display policy for an empty list in the function contract.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In score.js, prepare the cases 0/0, 1/4, and 4/4.
2. Separate the completion ratio calculation from renderScore, and use console.assert to test only the calculation.
3. Run with 0/0, 1/4, and 4/4. Results to check: Neither NaN nor Infinity is displayed for the three inputs. Record 3 calculation results obtained without the DOM. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Total count | 4 | 0 | Hypothesis before running: The chosen empty-list policy will prevent NaN from being displayed. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Neither NaN nor Infinity is displayed for the three inputs.
- [ ] Record 3 calculation results obtained without the DOM.

## Self-check

1. How should 0 out of 0 be displayed?
2. What becomes harder when calculation and display are combined?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Branches and Early Returns](../04/README.md) · [Next: Scope and Closures](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
