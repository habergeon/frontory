# JavaScript · 03 Equality Comparisons and Defaults

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Values and calculations · Editable example · Storage ID: `javascript-step-03`

## Goals and learning outcomes

- Record 8 default-value outputs.
- Explain the comparison results for the same reference and different references.

## Prerequisites

The work and experiment records from Unit 2, “String input and number conversion”

## Key concepts and explanations

### Equality Comparisons

=== compares without type coercion. Objects with the same contents are different if their references differ.

### Nullish Defaults

?? applies a default only to null and undefined. Its results differ from logical OR when you want to preserve 0 and an empty string.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In defaults.js, prepare 0, an empty string, null, undefined, and 2 objects.
2. Apply the default value 10 using logical OR and ??, and also output the === comparison of objects with identical contents.
3. Run with 0, an empty string, null, undefined, and 2 objects. Results to check: Record 8 default-value outputs. Explain the comparison results for the same reference and different references. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Operator | Logical OR | ?? | Hypothesis before running: The setting of 0 will be preserved. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record 8 default-value outputs.
- [ ] Explain the comparison results for the same reference and different references.

## Self-check

1. What settings can validly be 0?
2. Why does checking content equality with === fail?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: String input and number conversion](../02/README.md) · [Next: Branches and Early Returns](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
