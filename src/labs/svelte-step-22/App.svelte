<script>
import {onMount} from 'svelte';let canvas,speed=$state(1);onMount(()=>{const ctx=canvas.getContext('2d');let frame,last=0,angle=0;function draw(time){if(last)angle+=(time-last)/1000*speed;last=time;ctx.clearRect(0,0,300,180);ctx.save();ctx.translate(150,90);ctx.rotate(angle);ctx.fillRect(-40,-10,80,20);ctx.restore();frame=requestAnimationFrame(draw);}frame=requestAnimationFrame(draw);return ()=>cancelAnimationFrame(frame);});
</script>
<button onclick={()=>speed=speed===1?2:1}>Speed {speed}</button><canvas bind:this={canvas} width="300" height="180"></canvas>
