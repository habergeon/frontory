<script>
  let items = $state([{ id: 1, title: '상태', done: false }, { id: 2, title: '파생 값', done: true }, { id: 3, title: '정리', done: false }])
  let filter = $state(false)
  let shown = $derived(items.filter(item => !filter || !item.done))
  let completed = $derived(items.filter(item => item.done).length)
</script>
<h1>Svelte 학습 카드</h1>
<label><input type="checkbox" bind:checked={filter} />미완료만</label>
<p>완료 {completed}/3</p>
{#each shown as item (item.id)}
  <button aria-pressed={item.done} onclick={() => item.done = !item.done}>{item.title} {item.done ? '✓' : '○'}</button>
{/each}
