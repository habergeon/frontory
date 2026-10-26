# 22 · React+Three.js component design

Week 4 / original Day 22 · Document and example provided · This is a learning sequence, not a fixed daily workload.

[Full roadmap](../README.md) · [Workspace usage](../../../../learning-workspace.md)

## Goal

Separate UI state from per-frame scene state and create an exercise contract.

## Prerequisites

React state/ref/effect, 07 and 21.

## Key concepts and explanations

React state can manage the selected exercise, input values, and error messages, while Three.js manages per-frame rotation and matrices. Separating responsibilities prevents UI updates from unnecessarily recreating the scene.

Keep the shared exercise contract minimal, such as mount/update/dispose. Move code to shared only after actual duplication appears. Tag asynchronous responses with a run identifier so that responses from a previous exercise cannot overwrite the current UI.

## Skills you will develop

- Separate UI state from per-frame scene state and create an exercise contract.
- Reproduce the completion criteria below and answer the self-check questions in your own words.

## Exercises

1. Read the current app's menu, storage, and preview code and create a state ownership table.
2. Define a minimal interface for connecting mesh and GS.
3. Write a scenario that switches to B while A has a slow response, and ignore stale responses.

## Variables to observe

Selected unit, run id, response order, UI input.

## Completion criteria

- [ ] Explained state ownership and lifetime boundaries.
- [ ] Documented the exercise contract.
- [ ] Verified how late responses are handled.

## Self-check questions

1. Should all per-frame values be put in React state?
2. What becomes difficult when code is abstracted before duplication exists?

## Official references

- [React useEffect](https://react.dev/reference/react/useEffect)
- [React useRef](https://react.dev/reference/react/useRef)

## Experiment notes — fill these in yourself

### Goal

<!-- The question you want to answer in this experiment -->

### Key concepts

<!-- Explain in your own words -->

### Changed variables and predictions

<!-- Baseline → changed value / fixed conditions / prediction before running -->

### Actual results

<!-- Actual observations, screenshots, and measurements. Leave blank before running. -->

### What I learned

<!-- Differences between predictions and actual results, and why -->

### Remaining questions

<!-- What to check in the next experiment -->

[Previous: GS viewer review and candidate comparison](../21-gs-review/README.md) · [Next: Loading UI and progress](../23-loading-ui/README.md)

## Linked example and execution scope

[Runnable source code](../../../../../../src/labs/22-react-viewer/example.js) · Workspace unit ID: `22-react-viewer`

Edit the linked source code in Monaco to apply it to the sandbox preview after checks. Perform the extension exercises and completion criteria yourself and record the results.

Any previously saved code is preserved. To use the new original source, first back up everything as a full JSON file, then select **Restore original code**. Your notes are not erased.
