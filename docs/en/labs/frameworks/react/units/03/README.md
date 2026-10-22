# React · 03 Events and state snapshots

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Components and state calculations · Editable example · Storage ID: `react-step-03`

## Goals and learning outcomes

- Display 3 after functional updates starting from 0.
- Record the results of the plain-value update control separately.

## Prerequisites

You should be able to store a number with useState and read JavaScript functions and arrow functions. Start this unit’s comparison using only the three buttons in the built-in example.

## Key concepts and explanations

### When event handlers run

The built-in example creates buttons with React.createElement. The button(label, onClick) helper attaches the received function to the button’s onClick, so the increment code does not run before a click. The arrow function in button('Snapshot +1 three times', () => { ... }) defers execution. Passing the result of a function call such as handleClick() to onClick runs it during rendering. If that function also changes state, it can trigger another render and repeat the same call. Pass a function such as handleClick or () => handleClick() to onClick.

### A state snapshot does not change during a click

const [count, setCount] = React.useState(0) provides count to read in the current render and setCount to request the next state. Inside the handler attached when the screen shows 0, count remains 0 even after calling setCount. setCount does not assign a new number to that local variable. When React supplies the new state in the next render, the screen and handlers use that value. Distinguishing count in the button code from the value displayed later explains why logs can show the previous value.

### Why scheduling the same value three times gives 1

The Snapshot button’s core is setCount(count + 1); setCount(count + 1); setCount(count + 1);. In a handler where count is 0, all three expressions evaluate to setCount(1). React batches updates from one event, and the expected final state here is 1. Read this as three requests carrying the same replacement value, rather than three calls being discarded. If the screen shows 4 and you click the same button once, all three requests carry 5, so the expected increase is still 1.

### Functional updaters receive the previous calculation result

The Updater button calls setCount(c => c + 1) three times. Here, c is the previous result React supplies while processing the update queue, rather than the count captured by the handler. Starting at 0, the first function returns 1, the next returns 2, and the last returns 3: 0 → 1 → 2 → 3. The expected display after one click is therefore 3. Return only the next number inside an updater; do not mutate its argument or create side effects such as appending logs to an external array. During development, Strict Mode may call updaters extra times to check purity. Counting function calls as screen updates can therefore be misleading.

### Reading the two paths side by side in the built-in code

The following code rewrites the two handlers inside the built-in example’s Experiment as named functions. To edit it, replace the entire existing Experiment function. It uses h, out, and button already defined by mount, so no JSX transformation is needed.

```js
function Experiment() {
  const [count, setCount] = React.useState(0);
  function snapshot() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }
  function updater() {
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
  }
  return h('div', null, out(count),
    button('Snapshot +1 three times', snapshot),
    button('Updater +1 three times', updater),
    button('Reset', () => setCount(0)));
}
```

The two functions differ in whether they calculate and pass the next value in advance or pass a function that calculates from the previous result. Keep the number of buttons and render structure the same to compare only the update method.

### Three requests in one click versus three separate clicks

One Snapshot click reads count from the same render three times. If you wait for the screen to update and click again, the new render’s handler reads the new count. After Reset, three separate Snapshot clicks are expected to display 1 → 2 → 3. One Updater click after Reset also ends at 3, but the number of inputs and the queued calculations differ. Recording only the final number cannot distinguish these processes, so also record the click order and the value shown after each click.

### Keeping predictions separate from observations

The baseline experiment’s predictions are Reset → 0, then one Snapshot click → 1. For the changed experiment, Reset again → 0, then one Updater click → 3. If you skip Reset and click Updater after Snapshot, the expected value is 4; do not record that as a failure. Leave observation fields blank until you actually click. For example, write baseline: predicted start 0 / observed start __ / predicted end 1 / observed end __; changed: predicted start 0 / observed start __ / predicted end 3 / observed end __. Also record the browser and execution date so you can repeat the same inputs.

### Checks that narrow down a failure

If Updater does not produce 3, first check that the screen shows 0 after Reset. Next, inspect whether all three lines use c => c + 1. If you read the outer count again inside the function, as in setCount(c => count + 1), all three functions return the same number and may produce the same result as Snapshot. Adding console.log(count) inside the handler and seeing the previous value immediately after a click does not mean the screen failed to update. That log reads the current handler’s snapshot. This experiment checks displayed values and queue calculations; it does not replace measurements of render counts or processing time.

### Recorded verification of the existing example

Verification of the existing mount on a local Vite page in HeadlessChrome 151.0.7922.34 confirmed initial 0 → 1 after one Snapshot click → 0 after Reset → 3 after one Updater click → 6 after another Updater click. After each click, the check waited for two requestAnimationFrame callbacks before reading the on-screen pre value. This records the displayed values for that input sequence. The replacement Experiment code in this lesson was also run in the same browser, confirming 1 → 2 → 3 for three separate Snapshot clicks and 3 for one Updater click after Reset. These results do not include measurements of Strict Mode call counts or rendering performance. The reproduction code is in [Representative lesson browser checks](../../../../../../../tests/browser/representative-lessons.js).

## Practice setup

The project dependencies are React 19.3.1 and react-dom 19.3.1. The built-in example src/labs/react-step-03/example.js runs with React and createRoot supplied to mount, using React.createElement. The button comparison in this unit does not require a separate project. Only when moving to a separate React Vite project do you need to prepare the React import and root mounting setup and record the versions and lockfile.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Check the built-in example’s initial number and the Snapshot +1 three times, Updater +1 three times, and Reset buttons. Keep the current code and write down predictions for the baseline and changed experiments first.
2. Click Reset and check that the screen shows 0, then click Snapshot once. Record the displayed value as an observation and expand the three requests calculated from the same render into numbers.
3. Click Reset again and confirm 0, then click Updater once. Record the displayed value and compare it with the queue’s intermediate calculations 0 → 1 → 2 → 3.
4. After Reset, click Snapshot three separate times, checking the screen update each time. Record the number after each click and explain how the number of inputs differs from one Updater click. If needed, replace the code with the Experiment above to read both handlers side by side.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Update method | Three snapshot-value updates | Three functional updates | The increase per click changes from 1 to 3. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Display 3 after functional updates starting from 0.
- [ ] Record the results of the plain-value update control separately.

## Self-check

1. When the screen shows 5, what are the three setCount arguments for one Snapshot click, and what is the expected final value?
2. Explain why setCount(c => count + 1) differs from setCount(c => c + 1), using the input and return value of each queued function.
3. What number do you expect if you click Updater after Snapshot without Reset? Record your actual observations separately from predictions.

## Official references

- [React state as a snapshot](https://react.dev/learn/state-as-a-snapshot)
- [React state update queues and batching](https://react.dev/learn/queueing-a-series-of-state-updates)
- [React passing event handlers](https://react.dev/learn/responding-to-events)
- [useState updaters and Strict Mode](https://react.dev/reference/react/useState#my-initializer-or-updater-function-runs-twice)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-03/example.js) · [Runtime environments and limits](../../../../../examples.md)

This experiment uses the actual React API. It uses createElement instead of JSX.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: JSX and Pure Rendering](../02/README.md) · [Next: Updating Objects and Arrays](../04/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
