# TypeScript · 21 Template Literal Event Names

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validation and Type Transformations · Editable example · Storage ID: `typescript-step-21`

## Goals and learning outcomes

- Distinguish payload types for 2 different events.
- Record name typos and payload errors separately.

## Prerequisites

Work and experiment records from Unit 20, “Conditional Types and Distribution”

## Key concepts and explanations

### String Contracts

Template literal types define permitted string combinations. Arbitrary strings still need their runtime contents checked.

### Event Mapping

Connect event names and payload types with a map. The relationship can be lost if names and values widen separately.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In event-names.ts, prepare conditions for a titleChanged string and an invalid numeric payload.
2. Create Changed names for note fields and write a function accepting the payload for each name.
3. Run with a titleChanged string and an invalid numeric payload. Results to check: Distinguish payload types for 2 different events. Record name typos and payload errors separately. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| payload | string | number | Pre-run hypothesis: the titleChanged call will be rejected. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish payload types for 2 different events.
- [ ] Record name typos and payload errors separately.

## Self-check

1. Can every string value fit a narrow event type?
2. Where do you preserve the relationship between name and payload?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-21/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-21/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Conditional Types and Distribution](../20/README.md) · [Next: DOM Types and null Checks](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
