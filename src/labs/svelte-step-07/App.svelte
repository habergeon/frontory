<script>
  let title = $state(''),
    items = $state([]),
    error = $state('')
  function submit(e) {
    e.preventDefault()
    if (!title.trim()) {
      error = 'Title required'
      return
    }
    items.push(title.trim())
    title = ''
    error = ''
  }
</script>

<form onsubmit={submit}>
  <input aria-label="Title" bind:value={title} /><button>Add</button>
  <p>{error}</p>
</form>
{#each items as item}<p>{item}</p>{/each}
