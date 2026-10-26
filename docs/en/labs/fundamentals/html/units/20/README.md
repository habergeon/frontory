# HTML · 20 picture and Format Fallbacks

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Native UI and Media · Editable example · Storage ID: `html-step-20`

## Goals and learning outcomes

- Record the selected image and composition at two widths.
- img is displayed even when the source conditions do not match.

## Prerequisites

The work and experiment records from Unit 19, “Responsive Image Selection”.

## Key concepts and explanations

### Art Direction

The media conditions in picture let you select images with different compositions. This serves a different purpose from simple resolution selection.

### Fallback Images

img provides the default display and fallback in picture. The type attribute on source helps the browser determine format support.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In picture.html, prepare two images with narrow and wide compositions.
2. Use source elements for a mobile crop and a wide composition, and provide an img default.
3. Run with two images with narrow and wide compositions. Results to check: Record the selected image and composition at two widths. img is displayed even when the source conditions do not match. Record expected and actual results separately.

## Variables to observe

| Variable        | Baseline       | Change      | Expected change / hypothesis                                                                                                                                                    |
| --------------- | -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| media Condition | 600px or below | Above 600px | Pre-run hypothesis: A different composition that preserves the information will be selected. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the selected image and composition at two widths.
- [ ] img is displayed even when the source conditions do not match.

## Self-check

1. Is picture essential if only the resolution differs?
2. Does the alt text remain valid when the composition changes?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable input with actual browser execution results. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Responsive Image Selection](../19/README.md) · [Next: iframe and Embedded Content Boundaries](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
