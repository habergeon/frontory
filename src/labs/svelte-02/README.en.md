# Svelte component lab

`example.js` demonstrates an actual Svelte writable store and DOM adapter in the built-in runner. It is not a Svelte component.

In a Svelte 5 Vite project, replace `src/App.svelte` with this folder’s `App.svelte` and copy `PointerCanvas.svelte` to the same location. Run the project’s development server. Manage the external project’s packages and lockfile separately.

Repeatedly hide/show the component and change the period. The cleanup returned by `onMount` removes the timer and pointer listener. `#key period` creates a new component when the period changes. No Canvas timer should remain while it is hidden.
