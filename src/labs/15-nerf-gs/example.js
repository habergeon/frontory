// 분석용 1D 밀도 예제입니다. NeRF 학습이나 실제 신경망 추론을 수행하지 않습니다.
export function mount({container}){
  const samples=document.createElement('input');samples.type='range';samples.min='4';samples.max='128';samples.value='24';samples.setAttribute('aria-label','광선 샘플 수')
  const canvas=document.createElement('canvas'),output=document.createElement('pre');container.append(samples,output,canvas);canvas.style.height='65%';const ctx=canvas.getContext('2d')
  const draw=()=>{const count=Number(samples.value),step=4/count;let transmittance=1,color=0;canvas.width=Math.max(1,container.clientWidth);canvas.height=Math.max(1,container.clientHeight*0.65);ctx.fillStyle='#edf2f7';ctx.fillRect(0,0,canvas.width,canvas.height)
    for(let i=0;i<count;i++){const x=(i+0.5)*step-2,density=Math.exp(-x*x*2),alpha=1-Math.exp(-density*step);color+=transmittance*alpha;transmittance*=1-alpha;ctx.fillStyle='#3179bf';ctx.fillRect(i/count*canvas.width,canvas.height*(1-density),Math.max(1,canvas.width/count-1),canvas.height*density)}
    output.textContent='광선 적분 샘플 '+count+' · 누적 밝기 '+color.toFixed(4)+'\nNeRF: 위치·시선 → 신경망 밀도/색 → 적분\n3DGS: 명시적 Gaussian → 화면 투영 → 정렬·합성\n여기서는 신경망 대신 분석 가능한 Gaussian 밀도를 사용합니다.'
  }
  samples.oninput=draw;const observer=new ResizeObserver(draw);observer.observe(container);draw();return()=>{observer.disconnect();container.replaceChildren()}
}
