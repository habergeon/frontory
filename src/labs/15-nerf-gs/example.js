// 분석용 1D 밀도 예제입니다. NeRF 학습이나 실제 신경망 추론을 수행하지 않습니다.
export function mount({locale='ko',container}){
  const messages=locale==='en'?{"display001":"Ray sample count","display002":"Ray integration samples ","display003":" · accumulated brightness ","display004":"\nNeRF: position/view direction → neural network density/color → integration\n3DGS: explicit Gaussians → screen projection → sorting/compositing\nThis example uses analytical Gaussian density instead of a neural network."}:{"display001":"광선 샘플 수","display002":"광선 적분 샘플 ","display003":" · 누적 밝기 ","display004":"\nNeRF: 위치·시선 → 신경망 밀도/색 → 적분\n3DGS: 명시적 Gaussian → 화면 투영 → 정렬·합성\n여기서는 신경망 대신 분석 가능한 Gaussian 밀도를 사용합니다."};
  const samples=document.createElement('input');samples.type='range';samples.min='4';samples.max='128';samples.value='24';samples.setAttribute('aria-label',messages.display001)
  const canvas=document.createElement('canvas'),output=document.createElement('pre');container.append(samples,output,canvas);canvas.style.height='65%';const ctx=canvas.getContext('2d')
  const draw=()=>{const count=Number(samples.value),step=4/count;let transmittance=1,color=0;canvas.width=Math.max(1,container.clientWidth);canvas.height=Math.max(1,container.clientHeight*0.65);ctx.fillStyle='#edf2f7';ctx.fillRect(0,0,canvas.width,canvas.height)
    for(let i=0;i<count;i++){const x=(i+0.5)*step-2,density=Math.exp(-x*x*2),alpha=1-Math.exp(-density*step);color+=transmittance*alpha;transmittance*=1-alpha;ctx.fillStyle='#3179bf';ctx.fillRect(i/count*canvas.width,canvas.height*(1-density),Math.max(1,canvas.width/count-1),canvas.height*density)}
    output.textContent=messages.display002+count+messages.display003+color.toFixed(4)+messages.display004
  }
  samples.oninput=draw;const observer=new ResizeObserver(draw);observer.observe(container);draw();return()=>{observer.disconnect();container.replaceChildren()}
}
