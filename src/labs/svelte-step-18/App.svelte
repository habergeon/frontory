<script>
  let query = $state('A'),
    result = $state('Waiting')
  $effect(() => {
    const id = query
    let ignore = false
    const timer = setTimeout(
      () => {
        if (!ignore) result = id
      },
      id === 'A' ? 800 : 100,
    )
    return () => {
      ignore = true
      clearTimeout(timer)
    }
  })
</script>

<button onclick={() => (query = 'A')}>Slow A</button><button
  onclick={() => (query = 'B')}>Fast B</button
>
<p>{result}</p>
