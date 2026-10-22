# Three.js · 26 Render Statistics and Profiling

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Resource Lifetimes, Accessibility, and Measurement · Editable example · Storage ID: `threejs-step-26`

## Goals and learning outcomes

- State whether statistics include the whole frame.
- Do not express resource counts as bytes or total VRAM.

## Prerequisites

Prerequisite concepts: Alternative Controls, Status Announcements. Prepare the result files and observation notes from unit 25.

## Key concepts and explanations

### Statistics Scope

renderer.info reports render calls, triangles, and some resource counts. It does not measure total GPU VRAM or exact GPU execution time.

### Multiple Passes

With multiple render calls in a frame, reset timing matters. Adjust autoReset and reset once per frame to compare totals.

## Practice setup

First read the execution-scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in an HTML and ES module project served by a separate local HTTP development server. Pin three and addons to the same installed version and record it.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-26.js and index.html in the external exercise project. Group the main-view and minimap renders and collect statistics with info.autoReset=false.
2. Call info.reset at the start of the frame and save calls,triangles,memory fields separately from CPU frame intervals.
3. Save the output under the Main only input condition, then run again under the Main and minimap condition. Expected: The total calls and triangles for one frame may increase. Compare with the actual screen and logs, and record the actual result and reasons for any differences in day-26-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Render passes | Main only | Main and minimap | The total calls and triangles for one frame may increase. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] State whether statistics include the whole frame.
- [ ] Do not express resource counts as bytes or total VRAM.

## Self-check

1. Why is render-call time different from GPU completion time?
2. Can internal caches keep counts above 0 after dispose?

## Official references

- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/threejs-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/threejs-step-26/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: HTML Controls and Accessibility](../25/README.md) · [Next: Integrating the Scene Inspector](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
