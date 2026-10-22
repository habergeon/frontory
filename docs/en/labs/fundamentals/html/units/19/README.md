# HTML · 19 Responsive Image Selection

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Native UI and Media · Editable example · Storage ID: `html-step-19`

## Goals and learning outcomes

- Record currentSrc and the actual display width on two screens.
- Keep alt text with the same meaning for every candidate.

## Prerequisites

The work and experiment records from Unit 18, “Media Captions and Alternatives”.

## Key concepts and explanations

### Source Candidates

srcset provides image candidates by resolution or width. The browser considers both screen conditions and candidate information.

### Display Size

sizes specifies the expected display width when selecting width-descriptor candidates. A mismatch with the actual CSS display size can cause unnecessary downloads.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In responsive-images.html, prepare narrow and wide screens, and requests with the cache cleared.
2. Create 3 images of different widths and srcset·sizes, then check currentSrc and request sizes.
3. Run with narrow and wide screens, and requests with the cache cleared. Results to check: Record currentSrc and the actual display width on two screens. Keep alt text with the same meaning for every candidate. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Viewport | 360px | 1200px | Pre-run hypothesis: The selected candidate may change. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record currentSrc and the actual display width on two screens.
- [ ] Keep alt text with the same meaning for every candidate.

## Self-check

1. Does the browser always choose the smallest candidate?
2. How do sizes and the width attribute differ?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

300/600/1200w SVG candidates are selected through actual srcset behavior. sizes, DPR, and the preview viewport affect selection. The data URLs are not for comparing network transfer sizes. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Media Captions and Alternatives](../18/README.md) · [Next: picture and Format Fallbacks](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
