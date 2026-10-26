<script>
  import { writable } from 'svelte/store'
  const title = writable('Store value')
</script>

<input aria-label="Store value" bind:value={$title} />
<p>Auto-subscription: {$title}</p>
