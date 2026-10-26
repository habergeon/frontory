# TypeScript · 07 unknown and Safe Access

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Type Checking and Data Models · Editable example · Storage ID: `typescript-step-07`

## Goals and learning outcomes

- Record success or failure for all four inputs.
- Pass tsc checking without any or unconditional assertions.

## Prerequisites

Work and experiment records from Unit 6, “Function Arguments and Return Contracts”

## Key concepts and explanations

### The unknown Boundary

unknown prevents property access before checking. any bypasses checking itself, losing information at the boundary.

### Basic Guards

Combine typeof and null checks to narrow values. Handle the fact that typeof null is object separately.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In unknown.ts, prepare conditions for a string, a number, null, and an object.
2. Write a function that accepts unknown and returns a string length using typeof branches.
3. Run with a string, a number, null, and an object. Results to check: Record success or failure for all four inputs. Pass tsc checking without any or unconditional assertions. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                                                                                                              |
| -------- | -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input    | string   | null   | Pre-run hypothesis: the value will be rejected before property access. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record success or failure for all four inputs.
- [ ] Pass tsc checking without any or unconditional assertions.

## Self-check

1. Can typeof object alone exclude null?
2. Does using unknown generate runtime checking code?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-07/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-07/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Function Arguments and Return Contracts](../06/README.md) · [Next: Modeling Async State with Discriminated Unions](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
