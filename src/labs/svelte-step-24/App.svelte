<script>
  import { fade } from 'svelte/transition'
  let visible = $state(true),
    duration = $state(300),
    draft = $state('')
</script>

<button onclick={() => (duration = duration ? 0 : 300)}
  >Duration {duration}</button
><button onclick={() => (visible = !visible)}>Toggle</button><input
  aria-label="Draft"
  bind:value={draft}
/>{#if visible}<p transition:fade={{ duration }}>Draft {draft}</p>{/if}
