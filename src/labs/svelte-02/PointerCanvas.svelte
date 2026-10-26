<script>
  import { onMount } from 'svelte'
  let { period = 100 } = $props()
  let canvas
  let ticks = $state(0)
  onMount(() => {
    const context = canvas.getContext('2d')
    let point = { x: 160, y: 90 }
    const move = (event) => {
      const rect = canvas.getBoundingClientRect()
      point = {
        x: ((event.clientX - rect.left) * 320) / rect.width,
        y: ((event.clientY - rect.top) * 180) / rect.height,
      }
    }
    canvas.addEventListener('pointermove', move)
    const timer = setInterval(() => {
      context.clearRect(0, 0, 320, 180)
      context.fillStyle = '#0891b2'
      context.beginPath()
      context.arc(point.x, point.y, 12, 0, Math.PI * 2)
      context.fill()
      ticks++
    }, period)
    return () => {
      clearInterval(timer)
      canvas.removeEventListener('pointermove', move)
    }
  })
</script>

<canvas
  bind:this={canvas}
  width="320"
  height="180"
  aria-label="포인터 위치의 원"
></canvas>
<p>현재 컴포넌트의 tick: {ticks}</p>
