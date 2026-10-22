# SVG · 22 Exporting SVG Files

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Export and Large-Scale Comparisons · Editable example · Storage ID: `svg-step-22`

## Goals and learning outcomes

- The exported file opens independently.
- Revoke temporary Object URLs.

## Prerequisites

Prerequisite concepts: Interpolation, Motion preference. Prepare the result files and observation records from Unit 21.

## Key concepts and explanations

### Serialization

XMLSerializer turns DOM into a string. Styles specified only in external CSS may not be included in the file.

### Standalone resources

An exported SVG opens separately from its original page. Relative font and image references may change the result.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-22.js and index.html in an external practice project. Add xmlns and required styles to a cloned SVG, and save it with XMLSerializer.
2. Open the file downloaded through a Blob URL in a separate document, and check colors, text, and image references.
3. Save the output under the input condition Page CSS only, then run again with style inside SVG. Compare the hypothesis, "Specified colors and strokes persist in the standalone file," against the display and logs, and record the actual result and the causes of any differences in day-22-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Style location | Page CSS only | style inside SVG | Specified colors and strokes persist in the standalone file |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The exported file opens independently.
- [ ] Revoke temporary Object URLs.

## Self-check

1. How does text change without external fonts?
2. Does serialization guarantee the safety of user input?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

Outputs standalone SVG source in a text area. To save a file, copy the source and save it as a .svg file.

- [example.js](../../../../../../../src/labs/svg-step-22/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Animation and Reduced Motion](../21/README.md) · [Next: Large Datasets and Update Cost](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
