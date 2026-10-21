<script>
let detailed=$state(false);const items=[{id:1,title:'State'},{id:2,title:'Canvas'}];
</script>
{#snippet row(item)}<p>{item.title}{#if detailed} / id {item.id}{/if}</p>{/snippet}<button onclick={()=>detailed=!detailed}>Detail</button>{#each items as item (item.id)}{@render row(item)}{/each}
