# createScene.ts — English reading guide

Read the [original source](./createScene.ts) and [execution guidance](./COMPANIONS.en.md). This guide translates prose and visible text; it is not an executable copy. Source line numbers identify the original reading locations.

- Line 22: Create the scene outside React and return a cleanup function for its resources to React.
- Line 29: First assignment: change only this position and compare which faces are visible.
- Line 49: A rotating blue cube and the X, Y, Z axes
- Line 64: CSS dimensions differ from the actual rendering pixel count. Measure the cost of high resolution in week 4.
- Line 79: Clamp the time interval to prevent excessive rotation when returning to the tab.
- Line 95: Clear the remaining damping first so the initial view remains stable after reset.
- Line 118: Release the unused WebGL context when switching labs.
