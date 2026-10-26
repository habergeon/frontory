# TypeScript · 25 Declaration Files and External Boundaries

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Module Contracts and Plugins · Editable example · Storage ID: `typescript-step-25`

## Goals and learning outcomes

- Record the diagnostic for a call with an invalid argument.
- Keep logs comparing the declared and actual return types.

## Prerequisites

Work and experiment records from Unit 24, “Modules and type-only import”

## Key concepts and explanations

### Declaration Contracts

d.ts describes an implementation's type contract. It does not create actual JavaScript behavior.

### Contract Mismatches

Incorrect declarations can still let consumer checks pass. Check implementation and declarations with the same call cases.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Set type: "module" in the separate project’s package.json. Put export function save(value) { if (typeof value !== "string") throw new TypeError("string required"); return value; } in legacy.js. Put only export declare function save(value: string): string; in legacy.d.ts, and call it from consumer.ts with import { save } from "./legacy.js".
2. In consumer.ts, log save("A") and place @ts-expect-error before save(42) inside an if (false) block. Temporarily remove the directive to record the argument diagnostic, then restore it. Check with tsc --noEmit after setting strict: true, module: "NodeNext", and moduleResolution: "NodeNext" under compilerOptions and files:["consumer.ts"] at the root of tsconfig.json.
3. Keep the string return in legacy.js fixed and change only the declaration return from string to number. Compare tsc --noEmit diagnostics with typeof save("A") at runtime. For execution, emit with noEmit false and copy legacy.js into the output folder. The original starter returns a numeric string length; this is a separate assignment.

## Variables to observe

| Variable        | Baseline      | Change                       | Expected change / hypothesis                                                                                                                                     |
| --------------- | ------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Declared Return | actual string | incorrect number declaration | Pre-run hypothesis: successful compilation and runtime behavior may disagree. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the diagnostic for a call with an invalid argument.
- [ ] Keep logs comparing the declared and actual return types.

## Self-check

1. Does shipping only d.ts also create the implementation?
2. How do you trace responsibility for an inaccurate declaration?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-25/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-25/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Modules and type-only import](../24/README.md) · [Next: Cases That Verify Compilation Failures](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
