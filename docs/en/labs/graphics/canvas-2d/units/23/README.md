# Canvas 2D · 23 Exporting and Source Data

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility, Particles, and Performance Verification · Editable example · Storage ID: `canvas-2d-step-23`

## Goals and learning outcomes

- Distinguish the purposes of PNG and JSON.
- Existing work remains after an invalid import.

## Prerequisites

Prerequisite concepts: Alternative Representation, Shared Commands. Prepare the result files and observation records from Unit 22.

## Key concepts and explanations

### Raster Export

toBlob turns current pixels into an image. Save the source shape data separately if you want to edit it again.

### Validating Serialization

JSON input may have missing or invalid coordinates. Validate it before converting it to a scene to avoid corrupting the display.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-23.js and index.html in the external practice project. Create a PNG download with toBlob and save the shape array as JSON.
2. Read a JSON file, validate id, finite coordinates, and color fields, then pass it to renderScene.
3. Save the output with the input condition valid coordinates, then run again with a string in x. Expected: Invalid data is rejected, and the existing scene is preserved. Compare this with the actual screen and logs, and record the actual results and reasons for differences in day-23-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input JSON | valid coordinates | a string in x | Invalid data is rejected, and the existing scene is preserved |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish the purposes of PNG and JSON.
- [ ] Existing work remains after an invalid import.

## Self-check

1. Why consider toBlob rather than toDataURL?
2. How does a canvas tainted by an external image affect exporting?

## Official references

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/canvas-2d-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

PNG output is generated as a preview, and JSON is imported through an input field. File downloads may require an external environment depending on iframe policy.

- [example.js](../../../../../../../src/labs/canvas-2d-step-23/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Accessible Canvas Controls](../22/README.md) · [Next: Particle State and Emission](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
