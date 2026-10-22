# PixiJS · 01 Application and Scene Graph

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Application, Coordinates, and Display Objects · Editable example · Storage ID: `pixijs-01`

## Goals and learning outcomes

- Use screen resources only after initialization completes.
- Compare manual Canvas drawing with scene graph updates.

## Prerequisites

You should understand JavaScript asynchronous functions and DOM events, and Canvas 2D coordinates and time-based loops.

## Key concepts and explanations

### Asynchronous Initialization

PixiJS 8 waits for init after creating an Application. Using canvas or renderer before initialization may access resources that are not ready.

### Parent Containers

A Container's transform combines with its children's displayed positions. You can move a group without moving each child's coordinates directly.

## Practice setup

The existing built-in example provides only a starting point. It does not implement all the extended requirements. Implement the work yourself in an HTML and ES module project served by a separate local HTTP development server. Pin and record the installed pixi.js 8.x version.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare day-01.js and index.html in the external practice project. Read the existing pixijs-01 and attach app.canvas after new Application and await app.init.
2. Add two Sprites with local textures to a Container and accept input for the parent's position and rotation.
3. Save the output with the input condition 0, then run again with PI/4. Expected: The entire group rotates while the children's local coordinates stay unchanged. Compare this with the actual screen and logs, and record the actual result and causes of any differences in day-01-notes.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Parent rotation | 0 | PI/4 | The entire group rotates while the children's local coordinates stay unchanged |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Use screen resources only after initialization completes.
- [ ] Compare manual Canvas drawing with scene graph updates.

## Self-check

1. What ordering problem occurs if you do not await init?
2. Do you also need to change each child's position when moving the parent?

## Official references

- [PixiJS 8 app](https://pixijs.com/8.x/guides/components/application)
- [PixiJS 8 container](https://pixijs.com/8.x/guides/components/scene-objects/container)

## Linked example and execution scope

[Example source](../../../../../../src/labs/pixijs-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: Sprites and Anchors](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
