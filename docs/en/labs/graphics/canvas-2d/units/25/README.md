# Canvas 2D · 25 Particle Reuse and Allocation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility, Particles, and Performance Verification · Editable example · Storage ID: `canvas-2d-step-25`

## Goals and learning outcomes

- The policy for exceeding pool capacity is clear.
- Keep comparison records under the same input conditions.

## Prerequisites

Prerequisite concepts: Particle Lifetime, Emission Rate. Prepare the result files and observation records from Unit 24.

## Key concepts and explanations

### Object Reuse

Creating new objects every frame may increase garbage collection work. A pool reuses slots from dead particles.

### Separating Measurements

Fewer allocations do not guarantee better frame times. If drawing dominates the cost, total time may change little.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-25.js and index.html in the external practice project. Implement particle creation and return with a fixed-size pool and active flags.
2. Compare frame records for array allocation and pooling with the same seed and emission rate.
3. Save the output with the input condition new object for every emission, then run again with reuse inactive slots. Expected: Allocations decrease, but the degree of frame improvement must be measured. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-25-notes.md.

## Variables to observe

| Variable          | Baseline                      | Change               | Expected change / hypothesis                                               |
| ----------------- | ----------------------------- | -------------------- | -------------------------------------------------------------------------- |
| Allocation Policy | new object for every emission | reuse inactive slots | Allocations decrease, but the degree of frame improvement must be measured |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The policy for exceeding pool capacity is clear.
- [ ] Keep comparison records under the same input conditions.

## Self-check

1. What changes if you grow the pool indefinitely?
2. How do you compare the costs of compacting arrays and iterating inactive slots?

## Official references

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-25/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Particle State and Emission](../24/README.md) · [Next: Frame Measurement and Bottlenecks](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
