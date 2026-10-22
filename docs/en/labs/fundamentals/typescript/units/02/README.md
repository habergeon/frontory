# TypeScript · 02 strict Settings and Executable Code

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Type Checking and Data Models · Editable example · Storage ID: `typescript-step-02`

## Goals and learning outcomes

- Record the installed tsc version and diagnostics for both configurations.
- After correction, tsc --noEmit reports 0 errors.

## Prerequisites

Work and experiment records from Unit 1, “Types and Narrowing”

## Key concepts and explanations

### Compiler Options

strict enables a group of strict checks. Record diagnostics before and after changing options together with the project version.

### Type Erasure

Type annotations are removed from the emitted JavaScript. Check compilation success and runtime success separately.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In tsconfig.json, prepare conditions for an untyped parameter and a null assignment.
2. Set strict and noEmit, fix the unannotated function parameter, and also compare the emitted code for execution.
3. Run with an untyped parameter and a null assignment. Results to check: Record the installed tsc version and diagnostics for both configurations. After correction, tsc --noEmit reports 0 errors. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| strict | false | true | Pre-run hypothesis: diagnostics related to implicit any and null may increase. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the installed tsc version and diagnostics for both configurations.
- [ ] After correction, tsc --noEmit reports 0 errors.

## Self-check

1. Does strict add runtime code?
2. Which outputs does noEmit prevent?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-02/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-02/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Types and Narrowing](../../01-foundations/README.md) · [Next: Inference and Literal Types](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
