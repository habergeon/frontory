<script>
let title=$state('Card title');
</script>
<input aria-label="Title" bind:value={title}/><p>{title}</p><button onclick={()=>title="<b>plain text</b>"}>HTML-looking text</button>
