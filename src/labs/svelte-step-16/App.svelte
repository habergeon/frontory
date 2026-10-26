<script>
  import { createWorkspace } from './workspace.svelte.js'
  const a = createWorkspace(),
    b = createWorkspace()
</script>

<label>A <input bind:value={a.draft} /></label><label
  >B <input bind:value={b.draft} /></label
>
