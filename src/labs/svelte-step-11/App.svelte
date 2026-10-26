<script>
  import { tick } from 'svelte'
  let visible = $state(false),
    editor
  async function reveal() {
    visible = true
    await tick()
    editor?.focus()
  }
</script>

<button onclick={reveal}>Show then focus</button>{#if visible}<textarea
    aria-label="Editor"
    bind:this={editor}></textarea>{/if}
