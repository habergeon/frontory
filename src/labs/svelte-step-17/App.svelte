<script>
  import { setContext } from 'svelte'
  import Consumer from './Consumer.svelte'
  let workspace = $state({ draft: 'Provider draft' })
  setContext('workspace', workspace)
</script>

<Consumer />
<p>Provider: {workspace.draft}</p>
