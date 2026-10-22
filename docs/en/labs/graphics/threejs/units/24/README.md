# Three.js · 24 Asynchronous Scene Replacement

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Lifetimes, Accessibility, and Measurement · Editable example · Storage ID: `threejs-step-24`

## Goals and learning outcomes

- Prevent a late response from replacing the new model.
- Provide a cleanup path for discarded results.

## Prerequisites

Prerequisite concepts: Explicit Release, Shared Lifetimes. Prepare the result files and observation notes from unit 23.

## Key concepts and explanations

### Stale Results

A model from a previous request may arrive late. Compare request tokens to decide whether to attach it to the current scene.

### Discarded Resources

Unused loading results may still own resources. Clean up owned resources even when the result was never attached to the screen.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-24.js and index.html in the external exercise project. Store a requestId that increments on every model selection and compare it when loadAsync completes.
2. Alternate requests for slow model A and fast B, and log whether only B is visible and A’s resources are released.
3. Save the output under the Request order input condition, then run again under the Reverse order condition. Expected: A result that does not match the current request does not overwrite the scene. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-24-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Completion order | Request order | Reverse order | A result that does not match the current request does not overwrite the scene. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Prevent a late response from replacing the new model.
- [ ] Provide a cleanup path for discarded results.

## Self-check

1. Does a token check also cancel the network request?
2. Should an error from a previous failed request appear in the current UI?

## Official references

- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

Reproduces reverse completion order and disposal of stale results with delayed procedural geometry. Network model loading itself is not included.

- [example.js](../../../../../../../src/labs/threejs-step-24/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Resource Ownership Ledger](../23/README.md) · [Next: HTML Controls and Accessibility](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
