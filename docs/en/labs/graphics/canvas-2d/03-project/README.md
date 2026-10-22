# Canvas 2D · 28 Particles and Cost

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Accessibility, Particles, and Performance Verification · Editable example · Storage ID: `canvas-2d-03`

## Goals and learning outcomes

- Keep before-and-after frame records and quality images under identical conditions.
- Explain improvements and remaining bottlenecks with evidence.

## Prerequisites

Prerequisite concepts: Reproducing Input, Lifetime Cleanup. Prepare the result files and observation records from Unit 27.

## Key concepts and explanations

### Three Axes of Cost

Particle count increases update work, and resolution increases the pixels to fill. State changes also matter, so a single number cannot explain a bottleneck.

### Evidence-Based Improvements

Separating a static background can reduce repeated work. The effect depends on scene composition and the browser, so judge it from records under the same conditions.

## Practice setup

The existing built-in example provides only a starting point. It does not implement all extended requirements. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-28.js and index.html in the external practice project. Use the existing canvas-2d-03 as a starting point to complete an experiment screen that adjusts particle count, DPR, and background caching.
2. Fix the particle seed and viewport, and save a report of frame distributions before and after caching, visual quality, and state after creation and deletion.
3. Save the output with the input condition draw paths every frame, then run again with reuse a static layer. Expected: Repeated path cost may decrease, but compare it together with the additional compositing cost. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-28-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Background Handling | draw paths every frame | reuse a static layer | Repeated path cost may decrease, but compare it together with the additional compositing cost |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Keep before-and-after frame records and quality images under identical conditions.
- [ ] Explain improvements and remaining bottlenecks with evidence.

## Self-check

1. How did you separate pixel costs from object update costs?
2. Can you explain conditions where caching did not help?

## Official references

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [MDN devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)

## Linked example and execution scope

[Example source](../../../../../../src/labs/canvas-2d-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Integrated Editor and Regression Checks](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
