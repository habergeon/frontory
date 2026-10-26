<script>
  let items = $state([
    { id: 1, note: '' },
    { id: 2, note: '' },
    { id: 3, note: '' },
  ])
</script>

<button onclick={() => (items = [...items].reverse())}>Reverse</button
>{#each items as item (item.id)}<label
    >Card {item.id}<input bind:value={item.note} /></label
  >{/each}
