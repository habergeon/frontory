# JavaScript · 15 Fetch Responses and HTTP Errors

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Modules and data boundaries · Editable example · Storage ID: `javascript-step-15`

## Goals and learning outcomes

- Check both the successful list and the 404 message.
- Record HTTP errors and JSON parsing errors separately.

## Prerequisites

The work and experiment records from Unit 14, “Asynchrony and Cancellation”

## Key concepts and explanations

### Response Status

fetch can return a Response even for an HTTP error. Use response.ok to determine success.

### Reading the Body

json is an asynchronous method that reads the body. There are restrictions on reading an already consumed body again.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In api.js, prepare data.json and the missing file missing.json.
2. Use fetch for same-origin files, check ok, then read json and display the list or an error.
3. Run with data.json and the missing file missing.json. Results to check: Check both the successful list and the 404 message. Record HTTP errors and JSON parsing errors separately. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Path | data.json | missing.json | Hypothesis before running: An HTTP error will not be treated as valid data. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Check both the successful list and the 404 message.
- [ ] Record HTTP errors and JSON parsing errors separately.

## Self-check

1. Can catch alone handle a 404?
2. What happens if you read the body twice?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

Because preview network access is restricted, this example runs 200/404 fixtures using real Response objects. Test fetch and HTTP requests on a local server.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Asynchrony and Cancellation](../../02-experiments/README.md) · [Next: Parallel Work and Partial Failure](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
