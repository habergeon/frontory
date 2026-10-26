<script>
  let selected = $state(false)
</script>

<button
  class:selected
  aria-pressed={selected}
  onclick={() => (selected = !selected)}>Select card</button
>

<style>
  button {
    padding: 1rem;
  }
  .selected {
    background: #9bdfff;
  }
  button:focus-visible {
    outline: 3px solid #174fc7;
  }
</style>
