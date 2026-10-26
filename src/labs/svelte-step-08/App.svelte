<script>
  let {
    item = { id: 1, title: 'State', done: false },
    ontoggle = (id) => console.log(id),
  } = $props()
</script>

<button onclick={() => ontoggle(item.id)}
  >{item.title}: {String(item.done)}</button
>
