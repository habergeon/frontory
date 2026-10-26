<script>
  let { value = $bindable('Shared draft') } = $props()
</script>

<input aria-label="Bindable editor" bind:value />
<p>{value}</p>
