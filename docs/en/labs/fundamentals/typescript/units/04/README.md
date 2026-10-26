# TypeScript · 04 Object Contracts and Optional Fields

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Type Checking and Data Models · Editable example · Storage ID: `typescript-step-04`

## Goals and learning outcomes

- Display an object without tag safely.
- Record the diagnostic location for the misspelled object and the corrected result.

## Prerequisites

Work and experiment records from Unit 3, “Inference and Literal Types”

## Key concepts and explanations

### Optional Properties

An optional property may be absent. Handle the possibility of undefined when reading it.

### Structural Compatibility

Types determine compatibility from the required structure. Fresh object literals also undergo excess property checks.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In note.ts, prepare conditions for a valid object, an absent tag, and the typo titel.
2. Define Note with id·title·optional tag, and assign objects with missing or misspelled properties.
3. Run with a valid object, an absent tag, and the typo titel. Results to check: Display an object without tag safely. Record the diagnostic location for the misspelled object and the corrected result. Record expected and actual results separately.

## Variables to observe

| Variable      | Baseline | Change | Expected change / hypothesis                                                                                                                                                 |
| ------------- | -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Property Name | title    | titel  | Pre-run hypothesis: a missing required property or excess property diagnostic will occur. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Display an object without tag safely.
- [ ] Record the diagnostic location for the misspelled object and the corrected result.

## Self-check

1. Do optional and an empty string mean the same thing?
2. Why do assignment through a variable and object literal checking differ?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-04/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-04/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Inference and Literal Types](../03/README.md) · [Next: Positional Meaning in Arrays and Tuples](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
