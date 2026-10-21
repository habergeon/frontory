<script>
let card=$state({done:false});const detached=card.done;let linked=$derived(card.done);
</script>
<button onclick={()=>card.done=!card.done}>Toggle</button><p>Detached {String(detached)} / derived {String(linked)}</p>
