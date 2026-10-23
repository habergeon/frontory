# svelte-step-21 companion execution

Use an isolated Svelte 5 project. Copy all supplied companion files together; the built-in DOM/store preview does not compile App.svelte. Compile .svelte components and workspace.svelte.js with the appropriate Svelte compiler entry points, then verify interactions and cleanup in a browser.

In an existing Svelte 5 Vite project, copy App.svelte and every supplied .svelte/.svelte.js file into src/ together, keeping relative imports intact. Install that project’s dependencies with `npm install`, then run `npm run dev` and open the printed local URL. Use the Svelte Vite plugin so workspace.svelte.js uses compileModule. Test the controls, then unmount the component and inspect subscriptions, timers and event listeners.

- [App.svelte](./App.svelte) · preserved original
- [Editor.svelte](./Editor.svelte) · preserved original
