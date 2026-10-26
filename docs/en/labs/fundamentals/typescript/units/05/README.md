# TypeScript · 05 Positional Meaning in Arrays and Tuples

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Type Checking and Data Models · Editable example · Storage ID: `typescript-step-05`

## Goals and learning outcomes

- Calculate the distance between two valid coordinates.
- Record the compiler diagnostic for an incorrect tuple length.

## Prerequisites

Work and experiment records from Unit 4, “Object Contracts and Optional Fields”

## Key concepts and explanations

### Array Elements

An array type defines a common contract for all elements. Index access does not guarantee that the index is in bounds.

### Tuples

A tuple expresses types by position and relationships involving length. It suits small data structures where order matters, such as coordinates.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In coordinates.ts, prepare conditions for two coordinates and an out-of-bounds index.
2. Create a number array and an x·y tuple, and compare calls with positions swapped.
3. Run with two coordinates and an out-of-bounds index. Results to check: Calculate the distance between two valid coordinates. Record the compiler diagnostic for an incorrect tuple length. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline     | Change           | Expected change / hypothesis                                                                                                                                          |
| -------- | ------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type     | number array | coordinate tuple | Pre-run hypothesis: access outside the defined positions will be detected earlier. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Calculate the distance between two valid coordinates.
- [ ] Record the compiler diagnostic for an incorrect tuple length.

## Self-check

1. Are tuple element labels runtime properties?
2. Does an array index always exist?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-05/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-05/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Object Contracts and Optional Fields](../04/README.md) · [Next: Function Arguments and Return Contracts](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
