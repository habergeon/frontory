# HTML · 07 Images and Alternative Text

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Document Meaning and Content · Editable example · Storage ID: `html-step-07`

## Goals and learning outcomes

- Record 3 alt policies for informative, decorative, and linked images.
- The link purpose and body content remain understandable when images fail.

## Prerequisites

The work and experiment records from Unit 6, “Link Paths and In-page Navigation”.

## Key concepts and explanations

### Alternative Information

alt expresses an image’s purpose in text. Use empty alt for decorative images to reduce redundant information.

### Reserving Space

width and height provide image aspect-ratio information. Appropriate dimensions can reduce layout shifts during loading.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In images.html, prepare 1 informative image, 1 decorative image, and 1 linked image.
2. Assign alt text and dimensions suited to the purpose of the explanatory, decorative, and linked images.
3. Run with 1 informative image, 1 decorative image, and 1 linked image. Results to check: Record 3 alt policies for informative, decorative, and linked images. The link purpose and body content remain understandable when images fail. Record expected and actual results separately.

## Variables to observe

| Variable      | Baseline  | Change           | Expected change / hypothesis                                                                                                                               |
| ------------- | --------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Image Request | Valid src | Nonexistent path | Pre-run hypothesis: Alternative text will let you identify the purpose. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record 3 alt policies for informative, decorative, and linked images.
- [ ] The link purpose and body content remain understandable when images fail.

## Self-check

1. Is an image filename sufficient as alt text?
2. How should content be divided between a caption and alt text?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable input with actual browser execution results. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Link Paths and In-page Navigation](../06/README.md) · [Next: figure and Combined Descriptions](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
