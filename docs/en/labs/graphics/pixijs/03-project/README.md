# PixiJS · 28 Batching and Quality

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Resource Ownership, Large-Scale Rendering, and Measurement · Editable example · Storage ID: `pixijs-03`

## Goals and learning outcomes

- Test a bottleneck hypothesis by comparing before and after changing one variable.
- Separate measured values from estimates and unverified items.

## Prerequisites

Prerequisite concepts: Data and Display, Lifetime Regression Checks. Prepare the output files and observation records from Unit 27.

## Key concepts and explanations

### Multiple Dimensions of Cost

Filter area, texture changes, and object updates have different costs. Explaining a bottleneck only by Sprite count can miss the right improvement target.

### Measurement Limits

Frame observations show the experienced result. Leave internal calls and GPU time unverified without direct measurement evidence.

## Practice setup

The existing built-in example provides only a starting point. It does not implement all the extended requirements. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-28.js and index.html in the external practice project. Connect the existing pixijs-03 filter, texture, and DPR comparisons to the editor while retaining the same Sprite list.
2. Collect before-and-after records for one variable, quality images, and a resource ledger after reruns, then write optimization suggestions and their limitations.
3. Save the output with the input condition None, then run again with Parent BlurFilter. Expected: Quality and processing-area costs differ; frame changes must be measured for each environment. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-28-notes.md.

## Variables to observe

| Variable | Baseline | Change            | Expected change / hypothesis                                                                  |
| -------- | -------- | ----------------- | --------------------------------------------------------------------------------------------- |
| Filter   | None     | Parent BlurFilter | Quality and processing-area costs differ; frame changes must be measured for each environment |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Test a bottleneck hypothesis by comparing before and after changing one variable.
- [ ] Separate measured values from estimates and unverified items.

## Self-check

1. Why might improved batching fail to resolve a filter bottleneck?
2. Which screen did you use to judge how far quality could be reduced?

## Official references

- [PixiJS 8 perf](https://pixijs.com/8.x/guides/concepts/performance-tips)
- [PixiJS 8 filters](https://pixijs.com/8.x/guides/components/filters)
- [PixiJS 8 gc](https://pixijs.com/8.x/guides/concepts/garbage-collection)

## Linked example and execution scope

[Example source](../../../../../../src/labs/pixijs-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Completing the 2D Scene Editor](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
