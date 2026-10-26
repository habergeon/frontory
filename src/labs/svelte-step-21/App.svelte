<script>
  import Editor from './Editor.svelte'
  let unit = $state('A'),
    drafts = $state({ A: '', B: '' })
</script>

<button onclick={() => (unit = unit === 'A' ? 'B' : 'A')}>Unit {unit}</button
>{#key unit}<Editor bind:value={drafts[unit]} />{/key}
<pre>{JSON.stringify(drafts)}</pre>
