<script>
  let { value = $bindable('') } = $props()
  let edits = $state(0)
</script>

<input aria-label="Draft" bind:value oninput={() => edits++} />
<p>Local edits {edits}</p>
