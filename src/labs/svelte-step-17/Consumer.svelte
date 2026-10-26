<script>
  import { getContext } from 'svelte'
  const workspace = getContext('workspace')
</script>

<label>Consumer <input bind:value={workspace.draft} /></label>
