# SVG · 20 Connectors and Graph Layout

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility and Data Maps · Editable example · Storage ID: `svg-step-20`

## Goals and learning outcomes

- Reject edges that reference missing nodes.
- Connector endpoints match after moving a node.

## Prerequisites

Prerequisite concepts: Stable ids, Incremental updates. Prepare the result files and observation records from Unit 19.

## Key concepts and explanations

### Derived paths

Connectors are data calculated from the coordinates of two nodes. Storing them separately may leave stale coordinates after movement.

### Layer order

SVG draws in document order. Placing connectors first displays them beneath nodes and labels.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Implement this yourself in an HTML and ES module project on a separate local HTTP development server. Record the browser version, viewport, and DPR.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-20.js and index.html in an external practice project. Build a small learning map with a node array and an edge array using sourceId,targetId.
2. Update path d from both endpoints on every drag, and place the connector group before the nodes.
3. Save the output under the input condition Fixed, then run again with Move one node by 80 units. Compare the hypothesis, "Only paths connected to that node point toward its new position," against the display and logs, and record the actual result and the causes of any differences in day-20-notes.md.

## Variables to observe

| Variable      | Baseline | Change                    | Expected change / hypothesis                                    |
| ------------- | -------- | ------------------------- | --------------------------------------------------------------- |
| Node position | Fixed    | Move one node by 80 units | Only paths connected to that node point toward its new position |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Reject edges that reference missing nodes.
- [ ] Connector endpoints match after moving a node.

## Self-check

1. Why calculate connector coordinates instead of storing them?
2. Does changing layer order also affect selection?

## Official references

- [MDN SVG from Scratch Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svg-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

An editable browser experiment. Measurements vary with the current device and browser.

- [example.js](../../../../../../../src/labs/svg-step-20/example.js)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Data and DOM Updates](../19/README.md) · [Next: Animation and Reduced Motion](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
