<script>
  let raw = $state(JSON.stringify({ A: 'Saved draft' })),
    draft = $state(''),
    error = $state('')
  function restore() {
    try {
      const data = JSON.parse(raw)
      if (typeof data.A !== 'string') throw Error('Expected string')
      draft = data.A
      error = ''
    } catch {
      draft = ''
      error = 'Invalid storage'
    }
  }
</script>

<input aria-label="Serialized data" bind:value={raw} /><button onclick={restore}
  >Restore</button
><textarea aria-label="Draft" bind:value={draft}></textarea>
<p>{error}</p>
