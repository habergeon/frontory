# Motion · 12 Sharing LayoutId

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Layout and Presence · Editable example · Storage ID: `motion-step-12`

## Goals and learning outcomes

- Learning outcome: Explain the role of Visual connection. Input case: Selecting different cards in two lists.
- Deliverable: A table of indicator positions for each list. Connect your rationale for handling Separating regions to the code.

## Prerequisites

Prepare the results of the Concurrent transitions and Sequential transitions exercises from Unit 11, “Presence Modes”.

## Key concepts and explanations

### Visual connection

layoutId connects transitions between corresponding elements. Reusing the same ID for unrelated targets makes the relationship unclear.

### Separating regions

Matching layoutId values in independent lists can cause transition targets to collide. Separate their namespaces using distinct LayoutGroup id values or globally unique layoutId values.

## Practice setup

First check the execution scope guidance on the example screen. The following describes the environment needed to extend the assignment in a separate project. The existing motion-01·02·03 examples are limited examples based on Motion JS animate. For React layout, AnimatePresence, and hooks exercises, install motion in a separate local React project and import from motion/react. Do not assume JSX runs directly in the editor; preserve CSP and isolation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/day-12.tsx of a separate React project, use the same layoutId for the selection indicators in two lists. Wrap each list in a LayoutGroup and give them distinct id values, list-a and list-b. Distinguish this from merely creating two LayoutGroup instances.
2. Select different cards in the two lists. With LayoutGroup id omitted, record the origin and destination lists of the indicator in notes/day-12.md.
3. Set the LayoutGroup id values to list-a and list-b, then repeat the same selection sequence. Save the indicator positions for each list and check whether transition targets remain within their own namespaces. Also explain the alternative of using globally unique layoutId values.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| LayoutGroup id namespace | Two LayoutGroup instances with id omitted | Distinct id values: list-a and list-b | Even with the same layoutId, indicator transitions connect only within each list. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required deliverable: A table of indicator positions for each list. You have results for both the baseline and changed conditions, allowing a comparison of 2 conditions, and have recorded the input values and execution environment.
- [ ] Record both selection paths, with LayoutGroup id omitted and with distinct id values, and verify that the namespaced condition produces 0 transitions incorrectly linked to the other list.

## Self-check

1. Which processing stage does Visual connection affect in this exercise? Input case: Selecting different cards in two lists.
2. How does merely creating two LayoutGroup instances differ from assigning distinct id values? What alternative do globally unique layoutId values provide?

## Official references

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)
- [Motion LayoutGroup: namespace layoutId](https://motion.dev/docs/react-layout-group#namespace-layoutid)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/motion-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

Interactive Sharing LayoutId experiment with cleanup of the resources used.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Presence Modes](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
