<script>
import {onDestroy} from 'svelte';let timer;function request(fail){clearTimeout(timer);return new Promise((resolve,reject)=>{timer=setTimeout(()=>fail?reject(Error('Request failed')):resolve(['State','Canvas']),400);});}let promise=$state(request(false));onDestroy(()=>clearTimeout(timer));
</script>
<button onclick={()=>promise=request(true)}>Fail</button><button onclick={()=>promise=request(false)}>Retry</button>{#await promise}<p>Loading</p>{:then items}{#each items as item}<p>{item}</p>{/each}{:catch error}<p role="alert">{error.message}</p>{/await}
