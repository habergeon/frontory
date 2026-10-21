// 실제 네트워크 없이 로딩 상태 전이와 취소 경계를 실험하는 지연 모델입니다.
export function mount({container}){
  container.innerHTML='<h2>로딩 상태 실험</h2><label><input type="checkbox" id="known" checked>전체 크기 알려짐</label><label><input type="checkbox" id="fail">실패 재현</label><button id="start">로드/재시도</button><button id="cancel">취소</button><progress max="100"></progress><pre aria-live="polite"></pre>'
  const output=container.querySelector('pre'),progress=container.querySelector('progress')
  const known=container.querySelector('#known'),fail=container.querySelector('#fail')
  let timer,request=0
  const stop=()=>{request++;clearInterval(timer);output.textContent='idle · 취소';progress.removeAttribute('value')}
  const start=()=>{
    clearInterval(timer);const current=++request;let bytes=0;output.textContent='loading'
    timer=setInterval(()=>{
      if(current!==request)return
      bytes+=10
      if(known['checked'])progress.value=bytes;else progress.removeAttribute('value')
      output.textContent='loading · '+(known['checked']?bytes+'%':'전체 크기를 모릅니다')
      if(fail['checked']&&bytes>=50){clearInterval(timer);output.textContent='error · 재시도 가능'}
      else if(bytes>=100){clearInterval(timer);output.textContent='ready'}
    },120)
  }
  container.querySelector('#start').addEventListener('click',start);container.querySelector('#cancel').addEventListener('click',stop)
  output.textContent='idle'
  return()=>{request++;clearInterval(timer);container.replaceChildren()}
}
