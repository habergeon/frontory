<script>
import {tick} from 'svelte';let count=$state(100),elapsed=$state(0);let rows=$derived(Array.from({length:count},(_,id)=>id));async function measure(){const start=performance.now();count=count===100?1000:100;await tick();elapsed=performance.now()-start;}
</script>
<button onclick={measure}>100 / 1000 rows</button><p>Update to tick: {elapsed.toFixed(2)} ms</p>{#each rows as id (id)}<p>Card {id}</p>{/each}
