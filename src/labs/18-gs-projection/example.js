// alpha 합성은 교환법칙이 성립하지 않습니다. 빨강/파랑 순서와 depth를 바꾸세요.
export function mount({locale='ko',container}){
  const messages=locale==='en'?{"display001":"Reverse compositing order","display002":"Back→front: ","display003":"\nOverlap RGB over black = ","display004":"\nProjected 1σ radius f×scale/z = "}:{"display001":"합성 순서 뒤집기","display002":"뒤→앞: ","display003":"\n검정 위 겹침 RGB = ","display004":"\n투영 1σ 반경 f×scale/z = "};
  const canvas=document.createElement('canvas'),button=document.createElement('button'),output=document.createElement('pre');button.textContent=messages.display001;container.append(button,output,canvas)
  canvas.style.height='65%';const ctx=canvas.getContext('2d');let reverse=false
  const ALPHA=0.5,DEPTH=3,FOCAL=200,SCALE=0.5
  const draw=()=>{canvas.width=Math.max(1,container.clientWidth);canvas.height=Math.max(1,container.clientHeight*0.65);ctx.fillStyle='#000';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.globalAlpha=ALPHA
    const colors=reverse?['blue','red']:['red','blue'];colors.forEach((color,i)=>{ctx.fillStyle=color;ctx.fillRect(40+i*45,35+i*35,150,150)});ctx.globalAlpha=1
    output.textContent=messages.display002+colors.join(' → ')+messages.display003+(reverse?'(0.5,0,0.25)':'(0.25,0,0.5)')+messages.display004+(FOCAL*SCALE/DEPTH).toFixed(2)+' px'
  }
  button.onclick=()=>{reverse=!reverse;draw()};const observer=new ResizeObserver(draw);observer.observe(container);draw()
  return()=>{observer.disconnect();container.replaceChildren()}
}
