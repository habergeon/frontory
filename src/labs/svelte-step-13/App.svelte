<script>
  import { onMount } from 'svelte'
  let moves = $state(0)
  onMount(() => {
    const handler = () => moves++
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  })
</script>

<p>Pointer events {moves}; unmount this component to remove the listener.</p>
