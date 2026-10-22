# JavaScript · 08 Object Destructuring and Optional Access

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: DOM and asynchronous operations · Editable example · Storage ID: `javascript-step-08`

## Goals and learning outcomes

- Display the information without exceptions whether contact details are present or absent.
- A missing name is not saved as a valid name.

## Prerequisites

The work and experiment records from Unit 7, “Array Aggregation and Empty Input”

## Key concepts and explanations

### Destructuring

You can extract properties into local names. A default value applies when a property is undefined.

### Optional Access

?. stops access at a nullish value. Distinguish optional information from required fields so that missing required fields are not silently hidden.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In profile.js, prepare a valid author, an author without contact, and an author without name.
2. Destructure the name and use contact?.email to display supplementary information.
3. Run with a valid author, missing contact, and missing name. Results to check: Display the information without exceptions whether contact details are present or absent. A missing name is not saved as a valid name. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Contact details | Object present | Absent | Hypothesis before running: Only the supplementary information will change to the default guidance. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Display the information without exceptions whether contact details are present or absent.
- [ ] A missing name is not saved as a valid name.

## Self-check

1. Which missing values should not be hidden with ?.?
2. Do destructuring defaults also apply to null?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Array Aggregation and Empty Input](../07/README.md) · [Next: Map and Set Indexes](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
