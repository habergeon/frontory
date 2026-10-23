# HTML · 21 iframe and Embedded Content Boundaries

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Native UI and Media · External example · preview instructions · Storage ID: `html-step-21`

## Goals and learning outcomes

- Check the frame’s purpose through its accessible name.
- Record whether the button runs under the two policies.

## Prerequisites

The work and experiment records from Unit 20, “picture and Format Fallbacks”.

## Key concepts and explanations

### Frame Names

An iframe’s title identifies the purpose of the embedded region. Its role differs from the title of the internal page.

### Restriction Policies

sandbox restricts features available to the embedded document. Select only necessary permissions and check their actual effects.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In embed.html, prepare a document without scripts and a document with a button script.
2. Embed a local guide document in an iframe and set title and sandbox.
3. Run with a document without scripts and a document with a button script. Results to check: Check the frame’s purpose through its accessible name. Record whether the button runs under the two policies. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| sandbox | Empty value | allow-scripts | Pre-run hypothesis: Whether the internal script runs will differ. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Check the frame’s purpose through its accessible name.
- [ ] Record whether the button runs under the two policies.

## Self-check

1. What remains if all sandbox tokens are allowed?
2. Where do you specify the parent document’s language and the frame’s language?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

External HTTP example: switches between sandbox="" and allow-scripts on the same guide.html and observes button·postMessage behavior.

- [index.html](../../../../../../../src/labs/html-step-21/index.html)
- [guide.html](../../../../../../../src/labs/html-step-21/guide.html)
- [README.md (Korean original)](../../../../../../../src/labs/html-step-21/README.md) · [English reading](../../../../../../../src/labs/html-step-21/README.en.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: picture and Format Fallbacks](../20/README.md) · [Next: template and Repeated Content](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
