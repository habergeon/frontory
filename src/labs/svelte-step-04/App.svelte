<script>
  let query = $state('')
  let items = $state(['State', 'Effects', 'Canvas'])
  let matches = $derived(
    items.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
  )
</script>

<input
  aria-label="Query"
  bind:value={query}
/>{#each matches as title (title)}<p>{title}</p>{/each}
