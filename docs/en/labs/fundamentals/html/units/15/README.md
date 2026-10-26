# HTML · 15 The Difference Between disabled and readonly

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Native UI and Media · Editable example · Storage ID: `html-step-15`

## Goals and learning outcomes

- Record whether each of the three inputs is included in submission.
- Record which inputs are reachable through keyboard navigation.

## Prerequisites

The work and experiment records from Unit 14, “Forms and the Keyboard”.

## Key concepts and explanations

### Disabled Inputs

Disabled controls are generally excluded from submission data. They are also skipped in focus navigation, which may affect access to explanations.

### Read-only Inputs

readonly prevents editing on supported inputs. Submission and focus behavior may differ from disabled.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In readonly.html, prepare 3 text inputs with the same value.
2. Compare the same identifier input in normal·readonly·disabled states and display FormData.
3. Run with 3 text inputs with the same value. Results to check: Record whether each of the three inputs is included in submission. Record which inputs are reachable through keyboard navigation. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change   | Expected change / hypothesis                                                                                                                            |
| -------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| State    | readonly | disabled | Pre-run hypothesis: The input will be excluded from submission data. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record whether each of the three inputs is included in submission.
- [ ] Record which inputs are reachable through keyboard navigation.

## Self-check

1. Can the server trust a value just because it is hidden or disabled?
2. Can readonly be used with every input type?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable input with actual browser execution results. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Forms and the Keyboard](../../02-experiments/README.md) · [Next: A Collapsible Table of Contents with details](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
