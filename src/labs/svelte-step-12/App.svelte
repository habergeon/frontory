<script>
let period=$state(100),ticks=$state(0);$effect(()=>{const timer=setInterval(()=>ticks++,period);return ()=>clearInterval(timer);});
</script>
<button onclick={()=>period=period===100?500:100}>Period {period}ms</button><p>Ticks {ticks}</p>
