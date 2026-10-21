<script>
let query=$state('');const items=['State','Effects','Canvas'];let matches=$derived(items.filter(v=>v.includes(query)));
</script>
<input aria-label="Query" bind:value={query}/>{#if matches.length}{#each matches as title}<p>{title}</p>{/each}{:else}<p>No matches</p><button onclick={()=>query=""}>Reset</button>{/if}
