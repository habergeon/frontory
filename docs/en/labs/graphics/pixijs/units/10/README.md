# PixiJS · 10 Asynchronous Asset Loading

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Ticker, Assets, and Pointer Input · Editable example · Storage ID: `pixijs-step-10`

## Goals and learning outcomes

- Define a policy for duplicate requests during loading.
- Recover to a valid path after failure.

## Prerequisites

Prerequisite concepts: Ticker Ownership, Function References. Prepare the output files and observation records from Unit 9.

## Key concepts and explanations

### Cached Resources

Assets.load manages asynchronous loading and caching. Do not assume that requesting the same path again creates an independent texture every time.

### Error States

Loading failure is a normal UI state. An error message and retry path are needed to recover from an empty screen.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-10.js and index.html in the external practice project. Wrap Assets.load('/assets/hero.png') in try/catch and display loading, success, and error states.
2. Switch between an invalid URL and a valid URL, adding a Sprite to the stage only on success.
3. Save the output with the input condition Valid local path, then run again with Missing image. Expected: The error state appears and the retry button remains available. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-10-notes.md.

## Variables to observe

| Variable | Baseline         | Change        | Expected change / hypothesis                                   |
| -------- | ---------------- | ------------- | -------------------------------------------------------------- |
| URL      | Valid local path | Missing image | The error state appears and the retry button remains available |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Define a policy for duplicate requests during loading.
- [ ] Recover to a valid path after failure.

## Self-check

1. Does Sprite.from always wait for network loading?
2. Where does responsibility for unloading cached resources belong?

## Official references

- [PixiJS 8 assets](https://pixijs.com/8.x/guides/components/assets)
- [PixiJS 8 gc](https://pixijs.com/8.x/guides/concepts/garbage-collection)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/pixijs-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

Loads a local data URL with Assets. Reproduce the error state with a corrupted image; check external servers/CORS in a separate environment.

- [example.js](../../../../../../../src/labs/pixijs-step-10/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Starting, Stopping, and Callback Cleanup](../09/README.md) · [Next: Atlases and Frames](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
