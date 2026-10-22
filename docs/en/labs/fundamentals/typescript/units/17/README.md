# TypeScript · 17 Editing Models with Utility Types

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validation and Type Transformations · Editable example · Storage ID: `typescript-step-17`

## Goals and learning outcomes

- Both valid patches preserve the existing id.
- Record the compiler error for an id patch.

## Prerequisites

Work and experiment records from Unit 16, “Passing Failures with Result Types”

## Key concepts and explanations

### Derived Models

Pick and Omit create new contracts from some properties of an existing type. They do not automatically remove properties from runtime objects.

### Partial Updates

Partial makes all properties optional. Decide first whether id should also be editable.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In patch.ts, prepare conditions for a title-only update, a completion-only update, and an attempted id change.
2. Create an editing type excluding id and a read-summary type, then implement applyPatch.
3. Run with a title-only update, a completion-only update, and an attempted id change. Results to check: Both valid patches preserve the existing id. Record the compiler error for an id patch. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Patch Key | title | id | Pre-run hypothesis: the non-editable field will be rejected. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Both valid patches preserve the existing id.
- [ ] Record the compiler error for an id patch.

## Self-check

1. Does Omit delete fields from JSON?
2. Can Partial alone prevent an empty patch?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-17/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-17/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Passing Failures with Result Types](../16/README.md) · [Next: Checking Configuration with satisfies](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
