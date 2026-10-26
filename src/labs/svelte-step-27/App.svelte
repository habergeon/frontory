<script>
  let items = $state([
    { id: 1, title: 'State', done: false },
    { id: 2, title: 'Canvas', done: false },
  ])
  let done = $derived(items.filter((v) => v.done).length)
</script>

<p>Total {items.length}; done {done}</p>
{#each items as item (item.id)}<button
    aria-pressed={item.done}
    onclick={() => (item.done = !item.done)}>{item.title}</button
  >{/each}
