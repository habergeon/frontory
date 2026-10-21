<script>
let unit=$state('A'),drafts=$state({A:'',B:''});function seed(){unit='A';drafts={A:'Saved A',B:''};}
</script>
<button onclick={seed}>Seed</button><button onclick={()=>unit=unit==="A"?"B":"A"}>Switch {unit}</button><input aria-label="Draft" bind:value={drafts[unit]}/><pre>{JSON.stringify(drafts)}</pre>
