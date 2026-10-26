# HTML · 17 dialog and Modal Flow

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Native UI and Media · Editable example · Storage ID: `html-step-17`

## Goals and learning outcomes

- Check keyboard operation inside the modal and closing with Escape.
- Record whether focus returns to the open button after closing.

## Prerequisites

The work and experiment records from Unit 16, “A Collapsible Table of Contents with details”.

## Key concepts and explanations

### Modal Behavior

showModal displays a dialog in the top layer and restricts outside interaction. Its modal behavior differs from setting only the open attribute.

### Returning Focus

Users must be able to return to their original task after closing a dialog. Check initial focus and Escape behavior in an actual browser.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In dialog.html, prepare opening and closing with the keyboard, and Escape.
2. Create a titled dialog and open/close buttons, and connect showModal and close with supporting JS.
3. Open with showModal and check closing, Escape, and focus returning to the opener. Close the modal, add the open attribute, and interact with outside elements without pressing the opener again. Remove open before reopening with showModal. Record expected and actual results separately.

## Variables to observe

| Variable       | Baseline  | Change         | Expected change / hypothesis                                                                                                                            |
| -------------- | --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Opening Method | showModal | open attribute | Pre-run hypothesis: Restrictions on outside interaction will differ. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Check keyboard operation inside the modal and closing with Escape.
- [ ] Record whether focus returns to the open button after closing.

## Self-check

1. How do you associate a dialog with its title?
2. Where is an appropriate place for initial focus inside a modal?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

Dedicated helper code connects the open button to showModal. Compare the dialog open attribute with modal focus behavior. Scope document body/html selectors within Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: A Collapsible Table of Contents with details](../16/README.md) · [Next: Media Captions and Alternatives](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
