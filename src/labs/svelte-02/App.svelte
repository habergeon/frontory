<script>
  import PointerCanvas from './PointerCanvas.svelte'
  let visible = $state(true)
  let period = $state(100)
</script>
<h1>이벤트와 자원 정리</h1>
<button onclick={() => visible = !visible}>{visible ? '숨기기' : '표시'}</button>
<label>주기 ms <input type="range" min="30" max="500" bind:value={period} /></label>
{#if visible}
  {#key period}<PointerCanvas {period} />{/key}
{/if}
