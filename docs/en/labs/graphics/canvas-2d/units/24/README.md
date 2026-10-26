# Canvas 2D · 24 Particle State and Emission

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility, Particles, and Performance Verification · Editable example · Storage ID: `canvas-2d-step-24`

## Goals and learning outcomes

- Calculate the emission rate independently of frame rate.
- No expired particles remain even after a long run.

## Prerequisites

Prerequisite concepts: Raster Export, Validating Serialization. Prepare the result files and observation records from Unit 23.

## Key concepts and explanations

### Particle Lifetime

Particles are data with position, velocity, age, and lifetime. Remove expired items so the count does not keep growing.

### Emission Rate

Connect the per-second generation rate to dt. Keeping fractional accumulation lets you maintain the average emission rate even at low frame rates.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-24.js and index.html in the external practice project. Add rate*dt to emitAccumulator and add only the integer count to the particle array.
2. Remove particles when age exceeds lifetime, and display the live count in output.
3. Save the output with the input condition 20 particles/s, then run again with 80 particles/s. Expected: The average active particle count increases for the same lifetime. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-24-notes.md.

## Variables to observe

| Variable      | Baseline       | Change         | Expected change / hypothesis                                      |
| ------------- | -------------- | -------------- | ----------------------------------------------------------------- |
| Emission Rate | 20 particles/s | 80 particles/s | The average active particle count increases for the same lifetime |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Calculate the emission rate independently of frame rate.
- [ ] No expired particles remain even after a long run.

## Self-check

1. What problems arise if you discard fractional emissions?
2. Why does iteration direction matter when deleting particles?

## Official references

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/canvas-2d-step-24/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Exporting and Source Data](../23/README.md) · [Next: Particle Reuse and Allocation](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
