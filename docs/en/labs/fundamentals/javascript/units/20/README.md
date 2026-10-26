# JavaScript · 20 URL Filters and Back Navigation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Modules and data boundaries · Editable example · Storage ID: `javascript-step-20`

## Goals and learning outcomes

- The address and selected filter match after a refresh.
- Restore the previous list after navigating back.

## Prerequisites

The work and experiment records from Unit 19, “Storage and Restore Failures”

## Key concepts and explanations

### Search Parameters

URLSearchParams handles query encoding. get and getAll read repeated keys differently.

### History

pushState adds a new history entry. Handle popstate on back navigation to synchronize the screen as well.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In route.js, prepare changing the topic twice, then navigating back and refreshing.
2. Read topic to apply the filter, update the URL when it changes, and handle popstate.
3. Run by changing the topic twice, then navigating back and refreshing. Results to check: The address and selected filter match after a refresh. Restore the previous list after navigating back. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change                       | Expected change / hypothesis                                                                                                                                         |
| -------- | -------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Topic    | css      | Korean characters and spaces | Hypothesis before running: The restored string will match the original value. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The address and selected filter match after a refresh.
- [ ] Restore the previous list after navigating back.

## Self-check

1. Does pushState immediately trigger popstate?
2. How should an unknown filter be handled?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

This example runs a URLSearchParams encoding round trip. Test the actual address bar and back navigation with popstate on a separate HTTP page.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Storage and Restore Failures](../19/README.md) · [Next: FormData and Domain Validation](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
